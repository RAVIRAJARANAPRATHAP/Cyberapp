/**
 * CyberRakshak Link & APK Threat Inspector
 * Inspects URLs, phishing domains, typosquatting, APK direct downloads,
 * and masqueraded Indian public and financial services.
 */

import { GoogleGenAI } from '@google/genai';
import { getGenAIClient, generateWithModelFallback } from './responder.ts';

export interface LinkInspectorOutput {
  url: string;
  isHighRisk: boolean;
  riskScore: number;
  verdict: string;
  redFlags: string[];
  claimedEntity?: string;
  isApk: boolean;
  isShortlink: boolean;
  isHttp: boolean;
  recommendations: string[];
  backendUsed: string;
}

const SHORTLINK_DOMAINS = new Set([
  'bit.ly', 'tinyurl.com', 'is.gd', 't.co', 'cutt.ly', 'rb.gy', 'goo.gl',
  'ow.ly', 'buff.ly', 't.me', 'wa.me', 'qr.net', 'v.gd', 'shorturl.at', 'hyperurl.co'
]);

const SUSPICIOUS_TLDS = new Set([
  'xyz', 'top', 'club', 'work', 'click', 'download', 'app', 'gq', 'cf',
  'ml', 'ga', 'tk', 'buzz', 'rest', 'icu', 'cam', 'online', 'site', 'vip', 'link', 'cc', 'pw'
]);

interface SpoofableEntity {
  keyword: string;
  displayName: string;
  authenticDomains: string[];
}

const SPOOFABLE_ENTITIES: SpoofableEntity[] = [
  { keyword: 'sbi', displayName: 'State Bank of India', authenticDomains: ['onlinesbi.sbi', 'sbi.co.in', 'statebankofindia.com'] },
  { keyword: 'rbi', displayName: 'Reserve Bank of India', authenticDomains: ['rbi.org.in'] },
  { keyword: 'cbi', displayName: 'Central Bureau of Investigation', authenticDomains: ['cbi.gov.in'] },
  { keyword: 'trai', displayName: 'Telecom Regulatory Authority of India', authenticDomains: ['trai.gov.in'] },
  { keyword: 'uidai', displayName: 'Aadhaar (UIDAI)', authenticDomains: ['uidai.gov.in'] },
  { keyword: 'incometax', displayName: 'Income Tax Department', authenticDomains: ['incometax.gov.in', 'incometaxindia.gov.in'] },
  { keyword: 'epfo', displayName: 'EPFO India', authenticDomains: ['epfindia.gov.in'] },
  { keyword: 'irctc', displayName: 'IRCTC Indian Railways', authenticDomains: ['irctc.co.in'] },
  { keyword: 'paytm', displayName: 'Paytm', authenticDomains: ['paytm.com', 'paytmbank.com'] },
  { keyword: 'phonepe', displayName: 'PhonePe', authenticDomains: ['phonepe.com'] },
  { keyword: 'hdfc', displayName: 'HDFC Bank', authenticDomains: ['hdfcbank.com'] },
  { keyword: 'icici', displayName: 'ICICI Bank', authenticDomains: ['icicibank.com'] },
  { keyword: 'police', displayName: 'Police Department', authenticDomains: ['gov.in', 'nic.in'] },
  { keyword: 'challan', displayName: 'Parivahan Traffic Challan', authenticDomains: ['parivahan.gov.in', 'echallan.parivahan.gov.in'] },
  { keyword: 'bijli', displayName: 'Electricity Discom', authenticDomains: ['gov.in'] },
  { keyword: 'electricity', displayName: 'Electricity Discom', authenticDomains: ['gov.in'] },
];

/**
 * Checks for Cyrillic/Greek characters visually identical to Latin (Homograph attack)
 */
function hasHomographCharacters(str: string): boolean {
  // Checks for Cyrillic characters commonly used to spoof Latin (а, с, е, о, р, ѕ, х, etc.)
  return /[\u0400-\u04FF]/.test(str);
}

export async function inspectLink(
  rawInput: string,
  apiKey?: string,
  isDemoMode: boolean = false,
  language: string = 'en'
): Promise<LinkInspectorOutput> {
  const cleanInput = (rawInput || '').trim();

  // 1. Guard against dangerous pseudo-protocols (XSS / Code execution payload)
  if (/^(javascript|data|vbscript|file|intent):/i.test(cleanInput)) {
    return {
      url: cleanInput,
      isHighRisk: true,
      riskScore: 100,
      verdict: 'CRITICAL RISK: Malicious Script Execution Protocol',
      redFlags: ['Exploit Payload: Dangerous pseudo-protocol designed to execute arbitrary code on your device.'],
      isApk: false,
      isShortlink: false,
      isHttp: false,
      recommendations: [
        'Do NOT open or execute this link under any circumstances.',
        'Delete the message and block the sender immediately.',
        'If you suspect a breach, call the Cybercrime Helpline at 1930.'
      ],
      backendUsed: 'Protocol Security Guard',
    };
  }

  // Normalize candidate URL
  let candidateUrl = cleanInput;
  if (!/^https?:\/\//i.test(candidateUrl)) {
    candidateUrl = 'https://' + candidateUrl;
  }

  let hostname = '';
  let pathname = '';
  let isHttp = false;

  try {
    const parsed = new URL(candidateUrl);
    // Strip credentials if present (e.g. https://sbi.co.in@evil.com)
    hostname = parsed.hostname.toLowerCase();
    pathname = parsed.pathname.toLowerCase();
    isHttp = parsed.protocol === 'http:';
  } catch {
    // Graceful fallback for non-standard or malformed strings
    const withoutScheme = cleanInput.replace(/^https?:\/\//i, '');
    const firstSlash = withoutScheme.indexOf('/');
    hostname = (firstSlash !== -1 ? withoutScheme.slice(0, firstSlash) : withoutScheme).toLowerCase();
    pathname = firstSlash !== -1 ? withoutScheme.slice(firstSlash).toLowerCase() : '';
  }

  // Remove trailing dots or ports from hostname
  hostname = hostname.replace(/:\d+$/, '').replace(/\.+$/, '');

  const redFlags: string[] = [];
  let riskScore = 10;
  let isApk = false;
  let isShortlink = false;
  let claimedEntityMatch: SpoofableEntity | undefined;

  // 2. Homograph / Punycode Check
  if (hasHomographCharacters(hostname) || hostname.startsWith('xn--')) {
    riskScore += 60;
    redFlags.push('Homograph Attack (Punycode): Domain uses lookalike non-Latin characters to impersonate legitimate brand domains.');
  }

  // 3. Embedded userinfo deception check (e.g. sbi.co.in@malicious.com)
  if (cleanInput.includes('@') && cleanInput.indexOf('@') < cleanInput.indexOf('/', 8)) {
    riskScore += 50;
    redFlags.push('URL Authority Masking: Link contains "@" character attempting to trick users with a fake prefix.');
  }

  // 4. APK Download Detection
  if (pathname.endsWith('.apk') || cleanInput.toLowerCase().includes('.apk')) {
    isApk = true;
    riskScore += 50;
    redFlags.push('Direct APK File Download: Malicious Android package. Often used in fake KYC, electricity bill, and banking frauds to intercept SMS OTPs.');
  }

  // 5. Masked Shortlink Detection
  if (SHORTLINK_DOMAINS.has(hostname) || Array.from(SHORTLINK_DOMAINS).some(d => hostname.endsWith('.' + d))) {
    isShortlink = true;
    riskScore += 25;
    redFlags.push('Masked Shortlink: The true destination URL is hidden behind a redirector to evade security scanners.');
  }

  // 6. Unencrypted HTTP
  if (isHttp) {
    riskScore += 20;
    redFlags.push('Unencrypted HTTP: Banking and government portals strictly use HTTPS (SSL/TLS). Legitimate services never request personal data over unencrypted HTTP.');
  }

  // 7. Direct IP Address Hostname
  if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname)) {
    riskScore += 45;
    redFlags.push('Direct IP Address Host: Points directly to a numerical IP address, a hallmark of rogue or temporary phishing servers.');
  }

  // 8. High-Risk Disposable TLD
  const parts = hostname.split('.');
  const tld = parts.length > 1 ? parts[parts.length - 1] : '';
  if (SUSPICIOUS_TLDS.has(tld)) {
    riskScore += 30;
    redFlags.push(`High-Risk Domain Extension (.${tld}): Frequently exploited by fraudsters for cheap, disposable phishing websites.`);
  }

  // 9. Typosquatting / Brand Impersonation
  for (const entity of SPOOFABLE_ENTITIES) {
    if (hostname.includes(entity.keyword) || pathname.includes(entity.keyword)) {
      const isAuthentic = entity.authenticDomains.some(auth => hostname === auth || hostname.endsWith('.' + auth));
      if (!isAuthentic) {
        claimedEntityMatch = entity;
        riskScore += 50;
        redFlags.push(
          `Impersonation of ${entity.displayName}: The link references "${entity.keyword}", but does not belong to the authentic official domain (${entity.authenticDomains.join(', ')}).`
        );
        break;
      }
    }
  }

  // 10. Verified Government Domain Whitelist Check
  const isRealGov =
    (hostname === 'gov.in' || hostname.endsWith('.gov.in') ||
     hostname === 'nic.in' || hostname.endsWith('.nic.in')) &&
    !hasHomographCharacters(hostname);

  if (isRealGov && !isApk && !isHttp) {
    riskScore = 5;
    redFlags.length = 0; // Clear false positives for authentic gov domains
  }

  riskScore = Math.min(100, Math.max(5, riskScore));
  const isHighRisk = riskScore >= 40;

  let verdict = '';
  if (riskScore >= 70) {
    verdict = 'HIGH RISK: Highly Likely Malicious / Phishing Threat';
  } else if (riskScore >= 40) {
    verdict = 'SUSPICIOUS: Unverified / Masked Link';
  } else {
    verdict = 'LOW RISK: Appears Standard (Always verify sender identity)';
  }

  const recommendations: string[] = [];
  if (isApk) {
    recommendations.push('DO NOT install or download this APK. Delete the message and block the sender immediately.');
  }
  if (claimedEntityMatch) {
    recommendations.push(`Only visit the verified official portal: https://${claimedEntityMatch.authenticDomains[0]}`);
  }
  recommendations.push('Never enter NetBanking passwords, UPI PINs, or Aadhaar numbers on unverified links.');
  recommendations.push('If unauthorized money deduction occurs, immediately dial 1930 or report at cybercrime.gov.in.');

  let backendUsed = 'Rule-based Security Heuristics';

  // Optional AI Enrichment if API key is present
  if (apiKey && !isDemoMode) {
    try {
      const ai = getGenAIClient(apiKey);

      const langNameMap: Record<string, string> = {
        en: 'English',
        hi: 'Hindi',
        te: 'Telugu',
        ta: 'Tamil',
        mr: 'Marathi',
        bn: 'Bengali',
      };
      const targetLangName = langNameMap[language] || 'English';

      const prompt = `Analyze this link for an Indian citizen: "${cleanInput}".
Hostname: ${hostname}
Is APK: ${isApk}
Is Shortlink: ${isShortlink}
Entity spoofed: ${claimedEntityMatch ? claimedEntityMatch.displayName : 'None'}
Provide a concise 2-sentence safety warning explaining the risk and action in ${targetLangName} language.`;

      const aiResult = await generateWithModelFallback(ai, prompt);

      if (aiResult && aiResult.text) {
        recommendations.unshift(aiResult.text.trim());
        backendUsed = `Gemini (${aiResult.modelUsed}) + Security Heuristics`;
      }
    } catch {
      // Fallback silently to heuristics
    }
  }

  return {
    url: cleanInput,
    isHighRisk,
    riskScore,
    verdict,
    redFlags,
    claimedEntity: claimedEntityMatch ? claimedEntityMatch.displayName : undefined,
    isApk,
    isShortlink,
    isHttp,
    recommendations,
    backendUsed,
  };
}
