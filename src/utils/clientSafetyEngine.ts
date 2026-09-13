/**
 * CyberRakshak Client-Side Safety Engine (Resilience Fallback)
 * Provides instant in-browser privacy scrubbing, classification,
 * statutory RAG retrieval, and risk assessment whenever the remote
 * serverless backend is unreachable, cold-starting, or misconfigured.
 */

import { scrubSensitiveInfo } from '../server/privacy.ts';
import { classifyQuery } from '../server/classifier.ts';
import { retrieveContext } from '../server/retriever.ts';
import { softenOverconfidence, ensureStatutoryGrounding } from '../server/ethics.ts';
import { AgentResponse } from '../server/agent.ts';

const CATEGORY_LABELS: Record<string, Record<string, string>> = {
  en: {
    digital_arrest: 'Digital Arrest / Impersonation Scam',
    fake_kyc: 'Fake KYC / Phishing Scam',
    investment_scam: 'Fake Investment / Stock Market Scam',
    voice_clone_relative: 'Voice Clone / Emergency Impersonation Scam',
    fake_govt_lottery: 'Fake Government Scheme / Lottery Scam',
    other: 'Suspicious Fraud Pattern',
  },
  hi: {
    digital_arrest: 'डिजिटल अरेस्ट / पुलिस प्रतिरूपण फ्रॉड',
    fake_kyc: 'फर्जी केवाईसी / फ़िशिंग फ्रॉड',
    investment_scam: 'फर्जी निवेश / शेयर बाजार फ्रॉड',
    voice_clone_relative: 'वॉइस क्लोनिंग / आपातकालीन फ्रॉड',
    fake_govt_lottery: 'फर्जी सरकारी योजना / लॉटरी फ्रॉड',
    other: 'संदिग्ध साइबर फ्रॉड पैटर्न',
  },
  te: {
    digital_arrest: 'డిజిటల్ అరెస్ట్ / నకిలీ అధికారి మోసం',
    fake_kyc: 'ఫేక్ కేవైసీ / ఫిషింగ్ మోసం',
    investment_scam: 'నకిలీ పెట్టుబడి / స్టాక్ మార్కెట్ మోసం',
    voice_clone_relative: 'వాయిస్ క్లోనింగ్ / అత్యవసర మోసం',
    fake_govt_lottery: 'నకిలీ ప్రభుత్వ పథకం / లాటరీ మోసం',
    other: 'అనుమానాస్పద సైబర్ మోసం',
  },
  ta: {
    digital_arrest: 'டிஜிட்டல் கைது / போலி அதிகாரி மோசடி',
    fake_kyc: 'போலி கேஒய்சி / ஃபிஷிங் மோசடி',
    investment_scam: 'போலி முதலீடு / பங்குச் சந்தை மோசடி',
    voice_clone_relative: 'குரல் குளோனிங் மோசடி',
    fake_govt_lottery: 'போலி அரசு திட்டம் / லாட்டரி மோசடி',
    other: 'சந்தேகத்திற்கிடமான இணைய மோசடி',
  },
  mr: {
    digital_arrest: 'डिजिटल अटक / बनावट अधिकारी फसवणूक',
    fake_kyc: 'बनावट केवायसी / फिशिंग फसवणूक',
    investment_scam: 'बनावट गुंतवणूक / शेअर मार्केट फसवणूक',
    voice_clone_relative: 'व्हॉईस क्लोनिंग फसवणूक',
    fake_govt_lottery: 'बनावट सरकारी योजना / लॉटरी फसवणूक',
    other: 'संशयास्पद सायबर फसवणूक',
  },
  bn: {
    digital_arrest: 'ডিজিটাল অ্যারেস্ট / ভুয়া পুলিশ প্রতারণা',
    fake_kyc: 'ভুয়া কেওয়াইসি / ফিশিং প্রতারণা',
    investment_scam: 'ভুয়া বিনিয়োগ / শেয়ার বাজার প্রতারণা',
    voice_clone_relative: 'ভয়েস ক্লোনিং প্রতারণা',
    fake_govt_lottery: 'ভুয়া সরকারি প্রকল্প / লটারি প্রতারণা',
    other: 'সন্দেহজনক সাইবার প্রতারণা',
  },
};

export function evaluateLocally(userInput: string, language: string = 'en'): AgentResponse {
  const cleanInput = scrubSensitiveInfo(userInput || '');
  const category = classifyQuery(cleanInput);
  const { context, sources } = retrieveContext(cleanInput, category);

  const langKey = CATEGORY_LABELS[language] ? language : 'en';
  const label = CATEGORY_LABELS[langKey][category] || CATEGORY_LABELS[langKey].other;

  let raw = '';
  if (language === 'hi') {
    raw = `1. जोखिम मूल्यांकन (Risk Assessment)
यह स्थिति जाने-पहचाने साइबर फ्रॉड पैटर्न से मेल खाती है: **${label}**। इसके धोखाधड़ी होने की प्रबल संभावना (**HIGH RISK**) है।

2. मुख्य संकेत (Reasoning)
- आधिकारिक कानून प्रवर्तन एजेंसियां (CBI/पुलिस/ED/TRAI) कभी भी फोन या वीडियो कॉल पर गिरफ़्तारी या 'डिजिटल अरेस्ट' नहीं करती हैं।
- बैंक और सरकारी योजनाएं कभी भी टेलीग्राम या व्हाट्सएप पर अग्रिम फीस या ओटीपी नहीं मांगती हैं।
- आधिकारिक सुरक्षा संदर्भ:
  ${context.slice(0, 300).trim()}...

3. तुरंत उठाए जाने वाले कदम (Recommended Action)
- फोन तुरंत काट दें या संदेश भेजने वाले को तुरंत ब्लॉक करें।
- अपना कोई भी OTP, आधार, पैन या बैंक विवरण किसी के साथ साझा न करें।
- किसी भी खाते में 'सुरक्षा जांच' या 'क्लियरेंस' के नाम पर पैसे न भेजें।
- राष्ट्रीय साइबर अपराध हेल्पलाइन **1930** पर तुरंत कॉल करें या **cybercrime.gov.in** पर शिकायत दर्ज करें।`;
  } else if (language === 'te') {
    raw = `1. ప్రమాద అంచనా (Risk Assessment)
ఈ సంఘటన తీవ్రమైన సైబర్ నేరాల శైలికి సరిపోలుతుంది: **${label}**। ఇది మోసపూరితమైనదని భావించడానికి తీవ్ర అవకాశం (**HIGH RISK**) ఉంది.

2. ముఖ్య కారణాలు (Reasoning)
- భారతదేశంలో ఏ చట్టం ప్రకారమూ ఫోన్ లేదా వీడియో కాల్ ద్వారా అరెస్ట్ చేసే నిబంధన లేదు.
- ఏ బ్యాంకు లేదా చట్టపరమైన సంస్థ కూడా ఓటీపీ లేదా పాస్‌వర్డ్ అడగదు.
- అధికారిక సలహా:
  ${context.slice(0, 300).trim()}...

3. తక్షణ చర్యలు (Recommended Action)
- కాల్ వెంటనే కట్ చేయండి లేదా ఆ నంబర్‌ను బ్లాక్ చేయండి.
- ఎవరితోనూ OTP, ఆధార్ లేదా బ్యాంక్ వివరాలు పంచుకోవద్దు.
- ఎటువంటి అపరిచిత ఖాతాకూ డబ్బు బదిలీ చేయవద్దు.
- జాతీయ సైబర్ క్రైమ్ హెల్ప్‌లైన్ **1930** కు వెంటనే కాల్ చేయండి లేదా **cybercrime.gov.in** లో ఫిర్యాదు చేయండి.`;
  } else if (language === 'ta') {
    raw = `1. ஆபத்து மதிப்பீடு (Risk Assessment)
இந்த நிலைமை அறியப்பட்ட மோசடி வகையுடன் ஒத்துப்போகிறது: **${label}**. இது ஒரு இணைய மோசடியாக இருக்க அதிக வாய்ப்புள்ளது (**HIGH RISK**).

2. முக்கிய காரணங்கள் (Reasoning)
- எந்தவொரு அரசு நிறுவனமும் அல்லது காவல்துறையும் வீடியோ அழைப்பில் கைது செய்யவோ பணம் கேட்கவோ செய்யாது.
- அதிகாரப்பூர்வ தகவல்:
  ${context.slice(0, 300).trim()}...

3. உடனடி நடவடிக்கைகள் (Recommended Action)
- உடனடியாக அழைப்பை துண்டிக்கவும் அல்லது தொடர்பை தடுக்கவும் (Block).
- எந்தவொரு OTP, ஆதார் அல்லது வங்கி விவரங்களையும் பகிர வேண்டாம்.
- தேசிய சைபர் குற்ற உதவி எண் **1930**-ஐ உடனடியாக தொடர்பு கொள்ளவும் அல்லது **cybercrime.gov.in** இல் புகார் அளிக்கவும்.`;
  } else if (language === 'mr') {
    raw = `1. जोखीम मूल्यांकन (Risk Assessment)
ही परिस्थिती सायबर फसवणुकीच्या प्रकाराशी जुळते: **${label}**. ही फसवणूक असण्याची दाट शक्यता (**HIGH RISK**) आहे.

2. मुख्य कारणे (Reasoning)
- कोणतीही सरकारी यंत्रणा, पोलिस किंवा सीबीआय व्हिडिओ कॉलवर अटक करत नाही किंवा पैशांची मागणी करत नाही.
- अधिकृत संदर्भ:
  ${context.slice(0, 300).trim()}...

3. त्वरित करायच्या उपाययोजना (Recommended Action)
- कॉल लगेच कट करा. कोणाशीही OTP, आधार किंवा बँक तपशील शेअर करू नका.
- कोणत्याही अनोळखी खात्यात पैसे पाठवू नका.
- राष्ट्रीय सायबर हेल्पलाइन **1930** वर तात्काळ कॉल करा किंवा **cybercrime.gov.in** वर तक्रार नोंदवा.`;
  } else if (language === 'bn') {
    raw = `1. ঝুঁকি মূল্যায়ন (Risk Assessment)
এই ঘটনাটি পরিচিত সাইবার জালিয়াতির ধরণের সাথে মেলে: **${label}**। এটি একটি প্রতারণা হওয়ার প্রবল সম্ভাবনা (**HIGH RISK**) রয়েছে।

2. মূল কারণ (Reasoning)
- কোনও সরকারী সংস্থা, পুলিশ বা সিবিআই ভিডিও কলে গ্রেপ্তার করে না বা টাকা দাবি করে না।
- অফিসিয়াল রেফারেন্স:
  ${context.slice(0, 300).trim()}...

3. অবিলম্বে করণীয় (Recommended Action)
- তৎক্ষণাৎ কল কেটে দিন। কোনও OTP, আধার বা ব্যাংক বিবরণ শেয়ার করবেন না।
- জাতীয় সাইবার ক্রাইম হেল্পলাইন **1930**-এ অবিলম্বে কল করুন অথবা **cybercrime.gov.in**-এ অভিযোগ জানান।`;
  } else {
    // English default
    const isOther = category === 'other';
    const riskVerdict = isOther ? 'MODERATE RISK' : 'HIGH RISK / FRAUDULENT';

    raw = `1. Risk Assessment
Status: **${riskVerdict}**
Classification: **${label}**
Under Indian statutory rules (CERT-In / I4C / MHA), this pattern matches documented cyber fraud techniques designed to intimidate, trick, or manipulate citizens.

2. Reasoning
- Legitimate law enforcement, judicial bodies, and telecom authorities NEVER conduct arrests, trials, or asset audits via WhatsApp, Skype, or phone calls.
- Legitimate employers or investment brokers never demand upfront deposits, Telegram task investments, or gift card recharges.
- Statutory guidance from National Knowledge Base:
  ${context.slice(0, 320).trim()}...

3. Recommended Immediate Action
- **Hang Up & Block:** Immediately disconnect the call or block the sender. Do not engage further.
- **Never Share Credentials:** Do not disclose OTPs, UPI PINs, NetBanking passwords, Aadhaar, or Debit Card numbers.
- **Do Not Pay:** Never transfer funds to "clearance accounts" or for "review tasks".
- **Contact Authorities:** Call **1930** (24x7 National Cybercrime Helpline) or report at **cybercrime.gov.in**.
- **Report Mobile Number:** File the fraudulent number on the Chakshu facility at **sancharsaathi.gov.in**.`;
  }

  raw = softenOverconfidence(raw);
  raw = ensureStatutoryGrounding(raw, language);

  return {
    category,
    sources,
    response: raw,
    input_scrubbed: cleanInput,
    backendUsed: 'Sovereign Knowledge Base (Instant Defense Engine)',
  };
}

export interface LocalLinkInspectorOutput {
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

export function inspectLinkLocally(rawInput: string): LocalLinkInspectorOutput {
  const cleanInput = (rawInput || '').trim();
  let candidateUrl = cleanInput;
  if (!/^https?:\/\//i.test(candidateUrl)) {
    candidateUrl = 'https://' + candidateUrl;
  }

  let hostname = '';
  let pathname = '';
  let isHttp = false;

  try {
    const parsed = new URL(candidateUrl);
    hostname = parsed.hostname.toLowerCase();
    pathname = parsed.pathname.toLowerCase();
    isHttp = parsed.protocol === 'http:';
  } catch {
    const withoutScheme = cleanInput.replace(/^https?:\/\//i, '');
    const firstSlash = withoutScheme.indexOf('/');
    hostname = (firstSlash !== -1 ? withoutScheme.slice(0, firstSlash) : withoutScheme).toLowerCase();
    pathname = firstSlash !== -1 ? withoutScheme.slice(firstSlash).toLowerCase() : '';
  }

  hostname = hostname.replace(/:\d+$/, '').replace(/\.+$/, '');

  const redFlags: string[] = [];
  let riskScore = 15;
  let isApk = false;
  let isShortlink = false;

  if (/[\u0400-\u04FF]/.test(hostname) || hostname.startsWith('xn--')) {
    riskScore += 60;
    redFlags.push('Homograph / Punycode Attack: Uses lookalike non-Latin characters to spoof legitimate brand domains.');
  }

  if (pathname.endsWith('.apk') || cleanInput.toLowerCase().includes('.apk')) {
    isApk = true;
    riskScore += 50;
    redFlags.push('Direct APK Download: Untrusted Android package download. Often used to install SMS forwarders or remote Trojans.');
  }

  if (SHORTLINK_DOMAINS.has(hostname) || Array.from(SHORTLINK_DOMAINS).some(d => hostname.endsWith('.' + d))) {
    isShortlink = true;
    riskScore += 25;
    redFlags.push('Masked Shortlink: Hides true destination URL to bypass security filters.');
  }

  if (isHttp) {
    riskScore += 20;
    redFlags.push('Unencrypted HTTP: Banking and government portals strictly mandate HTTPS.');
  }

  if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname)) {
    riskScore += 45;
    redFlags.push('Raw IP Address Hostname: Directly targets an IP address without domain registration.');
  }

  const parts = hostname.split('.');
  const tld = parts.length > 1 ? parts[parts.length - 1] : '';
  if (SUSPICIOUS_TLDS.has(tld)) {
    riskScore += 30;
    redFlags.push(`High-Risk Domain Extension (.${tld}): Frequently exploited for cheap disposable phishing pages.`);
  }

  const isRealGov =
    (hostname === 'gov.in' || hostname.endsWith('.gov.in') ||
     hostname === 'nic.in' || hostname.endsWith('.nic.in')) &&
    !/[\u0400-\u04FF]/.test(hostname);

  if (isRealGov && !isApk && !isHttp) {
    riskScore = 5;
    redFlags.length = 0;
  }

  riskScore = Math.min(100, Math.max(5, riskScore));
  const isHighRisk = riskScore >= 50;

  return {
    url: cleanInput,
    isHighRisk,
    riskScore,
    verdict: isHighRisk
      ? 'SUSPICIOUS / HIGH RISK DETECTED'
      : (riskScore > 25 ? 'POTENTIAL RISK — EXERCISE CAUTION' : 'LOW RISK / STANDARD DOMAIN'),
    redFlags: redFlags.length > 0 ? redFlags : ['No immediate technical exploit patterns discovered in domain structure.'],
    isApk,
    isShortlink,
    isHttp,
    recommendations: [
      'Do NOT enter passwords, OTPs, or NetBanking credentials on this page.',
      'Always access official banking services directly via verified apps or bookmarks.',
      'Report malicious Indian links via the Chakshu facility at sancharsaathi.gov.in.'
    ],
    backendUsed: 'Sovereign Threat Heuristics Engine',
  };
}
