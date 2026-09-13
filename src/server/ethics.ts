/**
 * CyberRakshak Ethics & Transparency Guard
 * Enforces epistemic humility, avoids exaggerated claims,
 * and ensures mandatory statutory hotlines (1930 / cybercrime.gov.in) are always present.
 */

export function softenOverconfidence(text: string): string {
  if (!text) return '';

  const replacements: Record<string, string> = {
    'this is definitely a scam': 'this strongly matches a known scam pattern',
    'this is 100% fraud': 'this closely matches known fraud patterns',
    'you are being scammed': 'this appears to match a known scam pattern',
    'this is a scam': 'this closely matches a known scam pattern',
    'confirmed scam': 'pattern consistent with a known scam',
    'guaranteed fraud': 'strongly indicative of fraud',
    'we guarantee you will be refunded': 'you may be eligible for reversal under RBI guidelines',
    'you will definitely get your money back': 'you can file a dispute with your bank for potential reversal',
  };

  let res = text;
  for (const [phrase, safer] of Object.entries(replacements)) {
    const regex = new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    res = res.replace(regex, safer);
  }
  return res;
}

export function responseHasGrounding(responseText: string): boolean {
  if (!responseText) return false;
  const lower = responseText.toLowerCase();
  const hasHelpline = lower.includes('1930');
  const hasPortal = lower.includes('cybercrime.gov.in');
  return hasHelpline || hasPortal;
}

export function ensureStatutoryGrounding(text: string, language: string = 'en'): string {
  if (responseHasGrounding(text)) {
    return text;
  }

  const statutoryNotices: Record<string, string> = {
    hi: '\n\n⚠️ आपातकालीन सहायता: राष्ट्रीय साइबर अपराध हेल्पलाइन **1930** पर कॉल करें या **cybercrime.gov.in** पर शिकायत दर्ज करें।',
    te: '\n\n⚠️ అత్యవసర సహాయం: జాతీయ సైబర్ క్రైమ్ హెల్ప్‌లైన్ **1930** కు కాల్ చేయండి లేదా **cybercrime.gov.in** లో ఫిర్యాదు చేయండి.',
    ta: '\n\n⚠️ அவசர உதவி: தேசிய சைபர் குற்ற உதவி எண் **1930**-ஐ தொடர்பு கொள்ளவும் அல்லது **cybercrime.gov.in** இல் புகார் அளிக்கவும்.',
    mr: '\n\n⚠️ तातडीची मदत: राष्ट्रीय सायबर गुन्हे हेल्पलाइन **1930** वर कॉल करा किंवा **cybercrime.gov.in** वर तक्रार नोंदवा.',
    bn: '\n\n⚠️ জরুরি সহায়তা: জাতীয় সাইবার ক্রাইম হেল্পলাইন **1930**-এ কল করুন অথবা **cybercrime.gov.in**-এ অভিযোগ জানান।',
    en: '\n\n⚠️ Statutory Guidance: Please independently verify via the National Cybercrime Helpline **1930** (24x7) or report at **cybercrime.gov.in**.',
  };

  return text + (statutoryNotices[language] || statutoryNotices.en);
}
