import { CategoryMeta, SupportedLanguage } from '../types.ts';

export function getCategoryMeta(category: string, lang: SupportedLanguage): CategoryMeta {
  const metaMap: Record<
    string,
    { label: Record<SupportedLanguage, string>; tip: Record<SupportedLanguage, string>; level: 'error' | 'warning' | 'info' }
  > = {
    digital_arrest: {
      level: 'error',
      label: {
        en: '🚨 Digital Arrest Scam',
        hi: '🚨 डिजिटल अरेस्ट फ्रॉड',
        te: '🚨 డిజిటల్ అరెస్ట్ మోసం',
        ta: '🚨 டிஜிட்டல் கைது மோசடி',
        mr: '🚨 डिजिटल अरेस्ट फसवणूक',
        bn: '🚨 ডিজিটাল অ্যারেস্ট প্রতারণা',
      },
      tip: {
        en: 'No government agency in India conducts arrests over a video call. This is always a scam.',
        hi: 'भारत में कोई भी सरकारी एजेंसी वीडियो कॉल पर गिरफ़्तारी नहीं करती। यह हमेशा फर्जी होता है।',
        te: 'భారతదేశంలో ఏ ప్రభుత్వ సంస్థ కూడా వీడియో కాల్ ద్వారా అరెస్ట్ చేయదు. ఇది నకిలీ.',
        ta: 'இந்தியாவில் எந்த அரசு அமைப்பும் வீடியோ அழைப்பில் கைது செய்யாது. இது முற்றிலும் மோசடி.',
        mr: 'भारतातील कोणतीही यंत्रणा व्हिडिओ कॉलवर अटक करत नाही. हा पूर्णपणे बनाव आहे.',
        bn: 'ভারতে কোনও সরকারি সংস্থা ভিডিও কলে গ্রেপ্তার করে না। এটি নিশ্চিত প্রতারণা।',
      },
    },
    fake_kyc: {
      level: 'error',
      label: {
        en: '🏦 Fake KYC / Bank Phishing',
        hi: '🏦 फर्जी KYC / बैंक फिशिंग',
        te: '🏦 నకిలీ KYC / బ్యాంక్ ఫిషింగ్',
        ta: '🏦 போலி KYC / வங்கி மோசடி',
        mr: '🏦 बनावट KYC / बँक फिशिंग',
        bn: '🏦 ভুয়া KYC / ব্যাংক ফিশিং',
      },
      tip: {
        en: 'Banks never ask for OTPs, passwords, or KYC updates via SMS links or phone calls.',
        hi: 'बैंक कभी भी SMS लिंक या फोन कॉल पर OTP, पासवर्ड या KYC नहीं मांगते।',
        te: 'బ్యాంకులు ఎప్పుడూ SMS లింక్‌లు లేదా ఫోన్ కాల్స్ ద్వారా OTPలు అడగవు.',
        ta: 'வங்கிகள் ஒருபோதும் SMS இணைப்புகள் மூலம் OTP அல்லது கடவுச்சொல்லைக் கேட்காது.',
        mr: 'बँका कधीही SMS लिंक किंवा फोनवरून OTP किंवा पासवर्ड मागत नाहीत.',
        bn: 'ব্যাংক কখনই SMS লিঙ্ক বা ফোনের মাধ্যমে OTP বা পাসওয়ার্ড চায় না।',
      },
    },
    investment_scam: {
      level: 'warning',
      label: {
        en: '📈 Investment / Trading Scam',
        hi: '📈 फर्जी निवेश / ट्रेडिंग स्कीम',
        te: '📈 నకిలీ పెట్టుబడి / ట్రేడింగ్ స్కామ్',
        ta: '📈 முதலீட்டு மோசடி',
        mr: '📈 बनावट गुंतवणूक फसवणूक',
        bn: '📈 ভুয়া বিনিয়োগ প্রতারণা',
      },
      tip: {
        en: 'Guaranteed high returns are always a red flag. No legitimate investment promises fixed profits.',
        hi: 'गारंटीड भारी मुनाफे का लालच हमेशा धोखाधड़ी होता है।',
        te: 'అధిక రాబడి గ్యారెంటీ ఎల్లప్పుడూ ఒక మోసపూరిత సూచన.',
        ta: 'உத்தரவாதமான அதிக லாபம் எப்போதும் ஒரு மோசடி அறிகுறியாகும்.',
        mr: 'निश्चित भरघोस परताव्याचे आश्वासन नेहमी फसवणूक असते.',
        bn: 'নিশ্চিত উচ্চ মুনাফার প্রতিশ্রুতি সর্বদাই প্রতারণার লক্ষণ।',
      },
    },
    voice_clone_relative: {
      level: 'error',
      label: {
        en: '🎭 Voice Clone / Relative in Trouble',
        hi: '🎭 AI वॉइस क्लोन / परिजन संकट में',
        te: '🎭 వాయిస్ క్లోన్ / ఆపదలో బంధువు',
        ta: '🎭 குரல் நகல் / உறவினர் சிக்கலில்',
        mr: '🎭 व्हॉइस क्लोन / नातेवाईक संकटात',
        bn: '🎭 ভয়েস ক্লোন / বিপদে আত্মীয়',
      },
      tip: {
        en: 'Hang up and call your relative directly on their known regular phone number.',
        hi: 'फोन काटें और अपने परिजन के पुराने सामान्य नंबर पर सीधे कॉल करके पुष्टि करें।',
        te: 'కాల్ కట్ చేసి మీ బంధువు అసలు నంబర్‌కు నేరుగా కాల్ చేయండి.',
        ta: 'அழைப்பை துண்டித்து உங்கள் உறவினரின் வழக்கமான எண்ணுக்கு நேரடியாக அழைக்கவும்.',
        mr: 'कॉल कट करा आणि नातेवाईकाच्या मूळ नंबरवर थेट संपर्क साधा.',
        bn: 'কল কেটে সরাসরি আপনার আত্মীয়ের পরিচিত মূল নম্বরে ফোন করুন।',
      },
    },
    fake_govt_lottery: {
      level: 'warning',
      label: {
        en: '🎰 Fake Government Lottery',
        hi: '🎰 फर्जी सरकारी लॉटरी',
        te: '🎰 నకిలీ ప్రభుత్వ లాటరీ',
        ta: '🎰 போலி அரசு லாட்டரி',
        mr: '🎰 बनावट सरकारी लॉटरी',
        bn: '🎰 ভুয়া সরকারি লটারি',
      },
      tip: {
        en: 'The Indian Government does not organize online lotteries. Demands for processing fees are scams.',
        hi: 'भारत सरकार कोई लॉटरी नहीं चलाती। फीस मांगने वाले सभी मैसेज फ्रॉड हैं।',
        te: 'భారత ప్రభుత్వం ఎలాంటి ఆన్‌లైన్ లాటరీలను నిర్వహించదు. ఫీజులు అడిగితే మోసం.',
        ta: 'இந்திய அரசு ஆன்லைன் லாட்டரிகளை நடத்துவதில்லை. கட்டணம் கோருவது மோசடி.',
        mr: 'भारत सरकार कोणतीही लॉटरी चालवत नाही. शुल्क मागणे ही फसवणूक आहे.',
        bn: 'ভারত সরকার কোনও লটারি পরিচালনা করে না। ফি দাবি করা প্রতারণা।',
      },
    },
    other: {
      level: 'info',
      label: {
        en: '❓ Unclassified Suspicious Activity',
        hi: '❓ संदेहास्पद गतिविधि',
        te: '❓ అనుమానాస్పద చర్య',
        ta: '❓ சந்தேகத்திற்கிடமான செயல்பாடு',
        mr: '❓ संशयास्पद हालचाल',
        bn: '❓ সন্দেহজনক কার্যকলাপ',
      },
      tip: {
        en: 'Stay vigilant. Do not share OTPs, passwords, or personal details with unverified contacts.',
        hi: 'सतर्क रहें। किसी अनजान व्यक्ति को OTP, पासवर्ड या व्यक्तिगत जानकारी न दें।',
        te: 'అప్రమత్తంగా ఉండండి. ఎవరితోనూ OTPలు లేదా వ్యక్తిగత వివరాలను పంచుకోవద్దు.',
        ta: 'எச்சரிக்கையாக இருங்கள். யாருடனும் OTP அல்லது ரகசிய எண்களைப் பகிர வேண்டாம்.',
        mr: 'सावध राहा. कोणाशीही OTP किंवा वैयक्तिक माहिती शेअर करू नका.',
        bn: 'সতর্ক থাকুন। অচেনা কারও সাথে OTP বা ব্যক্তিগত তথ্য শেয়ার করবেন না।',
      },
    },
  };

  const item = metaMap[category] || metaMap.other;
  return {
    label: item.label[lang] || item.label.en,
    tip: item.tip[lang] || item.tip.en,
    level: item.level,
  };
}
