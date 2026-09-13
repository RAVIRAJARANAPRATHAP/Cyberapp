/**
 * CyberRakshak Intent & Scam Pattern Classifier
 * Supports multilingual classification (English, Hindi, Telugu, Tamil, Marathi, Bengali)
 * with Unicode-safe boundaries and Gemini zero-shot classification fallback.
 */

export const VALID_CATEGORIES = [
  'digital_arrest',
  'fake_kyc',
  'investment_scam',
  'voice_clone_relative',
  'fake_govt_lottery',
  'other',
] as const;

export type ScamCategory = typeof VALID_CATEGORIES[number];

// Multilingual keyword dictionary for offline/instant classification
const CATEGORY_KEYWORDS: Record<ScamCategory, string[]> = {
  digital_arrest: [
    // English
    'digital arrest', 'cbi', 'customs', 'narcotics', 'drug parcel', 'trai', 'police warrant',
    'arrest warrant', 'video call arrest', 'skype call', 'money laundering case', 'ed officer',
    'stay on video call', 'do not disconnect', 'illegal sim', 'courier parcel',
    // Hindi
    'डिजिटल अरेस्ट', 'सीबीआई', 'कस्टम', 'ड्रग पार्सल', 'गिरफ्तारी', 'वारंट', 'वीडियो कॉल',
    'मनी लॉन्ड्रिंग', 'पुलिस केस', 'अवैध सिम',
    // Telugu
    'డిజిటల్ అరెస్ట్', 'సిబిఐ', 'కస్టమ్స్', 'డ్రగ్స్', 'పోలీస్ వారెంట్', 'వీడియో కాల్', 'మనీ లాండరింగ్',
    // Tamil
    'டிஜிட்டல் கைது', 'காவல்துறை', 'சிபிஐ', 'வாரண்ட்', 'வீடியோ அழைப்பு', 'பார்சல்',
    // Marathi
    'डिजिटल अटक', 'पोलिस वॉरंट', 'व्हिडिओ कॉल', 'कस्टम्स', 'मनी लाँडरिंग',
    // Bengali
    'ডিজিটাল অ্যারেস্ট', 'গ্রেপ্তার', 'ওয়ারেন্ট', 'ভিডিও কল', 'কাস্টমস', 'মাদক পার্সেল'
  ],

  fake_kyc: [
    // English
    'kyc update', 'kyc expire', 'account blocked', 'pan update', 'aadhaar link', 'debit card blocked',
    'sim kyc', 'electricity bill cutoff', 'power disconnect', 'light bill', 'bill unpaid',
    'apk download', 'install anydesk', 'install teamviewer', 'quicksupport', 'screen share',
    'netbanking password', 'atm pin', 'unblock account', 'yono update',
    // Hindi
    'केवाईसी', 'केवाईसी अपडेट', 'खाता ब्लॉक', 'बिजली बिल', 'बिजली कट', 'पैन लिंक', 'ओटीपी शेयर',
    'एनीडेस्क', 'ऐप डाउनलोड',
    // Telugu
    'కేవైసీ', 'ఖాతా బ్లాక్', 'కరెంట్ బిల్లు', 'ఓటీపీ', 'యాప్ డౌన్‌లోడ్', 'పాన్ లింక్',
    // Tamil
    'கேஒய்சி', 'வங்கி கணக்கு முடக்கம்', 'மின்சார கட்டணம்', 'ஓடிபி', 'செயலி பதிவிறக்கம்',
    // Marathi
    'केवायसी', 'खाते ब्लॉक', 'लाईट बिल', 'ओटीपी', 'अॅप डाउनलोड',
    // Bengali
    'কেওয়াইসি', 'অ্যাকাউন্ট ব্লক', 'বিদ্যুৎ বিল', 'ওটিপি', 'অ্যাপ ডাউনলোড'
  ],

  investment_scam: [
    // English
    'stock tips', 'trading group', 'telegram group', 'guaranteed returns', 'crypto profit',
    'daily profit', 'ipo allotment', 'forex trading', 'sebi certified', 'double money',
    'vip trading group', 'investment scheme', 'part time job', 'youtube task', 'hotel review task',
    // Hindi
    'शेयर बाजार', 'ट्रेडिंग ग्रुप', 'टेलीग्राम ग्रुप', 'गारंटीड रिटर्न', 'पार्ट टाइम जॉब', 'टास्क फ्रॉड',
    'मुनाफा', 'निवेश स्कीम',
    // Telugu
    'స్టాక్ మార్కెట్', 'ట్రేడింగ్ గ్రూప్', 'టెలిగ్రామ్ గ్రూప్', 'లాభం గ్యారెంటీ', 'పార్ట్ టైమ్ జాబ్',
    // Tamil
    'பங்குச் சந்தை', 'முதலீடு', 'தந்தி குழு', 'உத்தரவாத லாபம்', 'பகுதி நேர வேலை',
    // Marathi
    'शेअर मार्केट', 'गुंतवणूक', 'नफा हमी', 'टेलिग्राम ग्रुप', 'पार्ट टाईम काम',
    // Bengali
    'শেয়ার বাজার', 'বিনিয়োগ', 'টেলিগ্রাম গ্রুপ', 'নিশ্চিত মুনাফা', 'পার্ট টাইম জব'
  ],

  voice_clone_relative: [
    // English
    'voice clone', 'relative arrested', 'son in hospital', 'daughter accident', 'bail money',
    'crying voice', 'kidnapped', 'stranded abroad', 'accident hospital', 'friend emergency money',
    // Hindi
    'आवाज क्लोन', 'बेटा जेल में', 'बेटी का एक्सीडेंट', 'अस्पताल में भर्ती', 'जमानत के पैसे', 'परिजन संकट में',
    // Telugu
    'వాయిస్ క్లోన్', 'కొడుకు అరెస్ట్', 'కూతురు ప్రమాదం', 'హాస్పిటల్ బిల్లు', 'బంధువు ఆపదలో',
    // Tamil
    'குரல் நகல்', 'மகன் கைது', 'விபத்து', 'மருத்துவமனை', 'உறவினர் ஆபத்து',
    // Marathi
    'व्हॉइस क्लोन', 'मुलगा संकटात', 'अपघात', 'रुग्णालयात भरती', 'जामीन पैसे',
    // Bengali
    'ভয়েস ক্লোন', 'ছেলে গ্রেপ্তার', 'দুর্ঘটনা', 'হাসপাতাল', 'জামিনের টাকা'
  ],

  fake_govt_lottery: [
    // English
    'lottery won', 'lucky draw', 'pm awas yojana', 'pm kisan', 'kbc lottery', 'processing fee',
    'claim prize', 'winner list', 'gift car', 'congratulations you won', 'free mobile',
    // Hindi
    'लॉटरी लगी', 'लकी ड्रा', 'पीएम आवास योजना', 'केबीसी लॉटरी', 'इनाम जीता', 'प्रोसेसिंग फीस',
    // Telugu
    'లాటరీ గెలిచారు', 'లక్కీ డ్రా', 'బహుమతి', 'ప్రాసెసింగ్ ఫీజు',
    // Tamil
    'லாட்டரி பரிசு', 'அதிர்ஷ்ட குலுக்கல்', 'பரிசு தொகை', 'கட்டணம் செலுத்தவும்',
    // Marathi
    'लॉटरी लागली', 'बक्षीस', 'लकी ड्रॉ', 'नोंदणी फी',
    // Bengali
    'লটারি জিতেছেন', 'লাকি ড্র', 'পুরস্কার', 'প্রসেসিং ফি'
  ],

  other: []
};

/**
 * Unicode-safe keyword presence check
 */
function containsKeyword(text: string, keyword: string): boolean {
  const normText = text.toLowerCase();
  const normKeyword = keyword.toLowerCase();

  // If keyword contains space or non-ASCII characters, use simple string includes
  if (normKeyword.includes(' ') || /[^\u0000-\u007F]/.test(normKeyword)) {
    return normText.includes(normKeyword);
  }

  // For ASCII single words, enforce word boundary
  const escaped = normKeyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`, 'i');
  return regex.test(normText);
}

export function classifyQuery(userInput: string): ScamCategory {
  if (!userInput || !userInput.trim()) return 'other';

  const text = userInput.trim();

  // Score each category based on keyword hits
  const scores: Record<ScamCategory, number> = {
    digital_arrest: 0,
    fake_kyc: 0,
    investment_scam: 0,
    voice_clone_relative: 0,
    fake_govt_lottery: 0,
    other: 0,
  };

  for (const category of VALID_CATEGORIES) {
    if (category === 'other') continue;
    const keywords = CATEGORY_KEYWORDS[category];
    for (const kw of keywords) {
      if (containsKeyword(text, kw)) {
        // Multi-word matches get higher weight
        scores[category] += kw.includes(' ') ? 3 : 1;
      }
    }
  }

  // Cross-category priority heuristics
  if (containsKeyword(text, 'digital arrest') || (containsKeyword(text, 'cbi') && containsKeyword(text, 'call'))) {
    scores.digital_arrest += 5;
  }
  if (containsKeyword(text, 'electricity') && (containsKeyword(text, 'disconnect') || containsKeyword(text, 'bill'))) {
    scores.fake_kyc += 4;
  }
  if (containsKeyword(text, 'apk') || containsKeyword(text, 'anydesk') || containsKeyword(text, 'teamviewer')) {
    scores.fake_kyc += 3;
  }

  // Find category with highest score
  let maxCategory: ScamCategory = 'other';
  let maxScore = 0;

  for (const category of VALID_CATEGORIES) {
    if (category === 'other') continue;
    if (scores[category] > maxScore) {
      maxScore = scores[category];
      maxCategory = category;
    }
  }

  return maxScore > 0 ? maxCategory : 'other';
}
