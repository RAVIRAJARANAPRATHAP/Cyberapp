/**
 * CyberRakshak Assessment and Advisory Responder
 * Combines Gemini LLM generation with multi-model fallback and deterministic multilingual RAG.
 */

import { GoogleGenAI } from '@google/genai';
import { softenOverconfidence, ensureStatutoryGrounding } from './ethics.ts';

const CANDIDATE_GEMINI_MODELS = [
  'gemini-3.1-flash-lite',
  'gemini-flash-latest',
  'gemini-3.8-flash',
];

const modelCooldownMap = new Map<string, number>();

let cachedClient: GoogleGenAI | null = null;
let cachedApiKey: string | null = null;

export function getGenAIClient(apiKey: string): GoogleGenAI {
  if (!cachedClient || cachedApiKey !== apiKey) {
    cachedClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
    cachedApiKey = apiKey;
  }
  return cachedClient;
}

export async function generateWithModelFallback(
  ai: GoogleGenAI,
  prompt: string
): Promise<{ text: string; modelUsed: string } | null> {
  const now = Date.now();
  for (const model of CANDIDATE_GEMINI_MODELS) {
    const cooldownUntil = modelCooldownMap.get(model);
    if (cooldownUntil && now < cooldownUntil) {
      continue;
    }

    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
      });

      if (response.text && response.text.trim()) {
        modelCooldownMap.delete(model);
        return { text: response.text.trim(), modelUsed: model };
      }
    } catch (err: any) {
      const errMsg = err?.message || String(err);
      const isQuotaOrRateLimit =
        errMsg.includes('429') ||
        errMsg.includes('quota') ||
        errMsg.includes('RESOURCE_EXHAUSTED') ||
        errMsg.includes('ResourceExhausted');

      if (isQuotaOrRateLimit) {
        // Cooldown for 3 minutes to avoid hammering exhausted model
        modelCooldownMap.set(model, now + 3 * 60 * 1000);
      }
    }
  }
  return null;
}

export async function assessAndRespond(
  userInput: string,
  context: string,
  category: string,
  apiKey?: string,
  isDemoMode: boolean = false,
  language: string = 'en'
): Promise<{ response: string; backendUsed: string }> {
  const languageNames: Record<string, string> = {
    en: 'English',
    hi: 'Hindi (हिन्दी)',
    te: 'Telugu (తెలుగు)',
    ta: 'Tamil (தமிழ்)',
    mr: 'Marathi (मराठी)',
    bn: 'Bengali (বাংলা)',
  };

  const languagePrompt =
    language && language !== 'en'
      ? `\n\nLANGUAGE DIRECTIVE: You MUST write your ENTIRE response in ${languageNames[language] || language} script and natural phrasing. Ensure key statutory numbers like 1930 and portals like cybercrime.gov.in remain prominent.`
      : '';

  // 1. If Gemini API Key is available and not in Demo Mode, use Gemini 2.5 Flash
  if (apiKey && !isDemoMode) {
    try {
      const ai = getGenAIClient(apiKey);
      const prompt = `You are CyberRakshak, an authoritative, calm, and highly knowledgeable fraud prevention assistant for Indian citizens.

Use the provided RETRIEVED ADVISORY INFORMATION to evaluate the user's situation.
Strictly adhere to Indian legal realities (e.g. no police or CBI arrests over video calls).
State likelihood and patterns, not dogmatic 100% absolutes.

RETRIEVED ADVISORY INFORMATION:
${context}

USER'S REPORT: "${userInput}"
CLASSIFIED CATEGORY: ${category}

Format your response in three clearly numbered sections:
1. Risk Assessment — State whether this matches known fraud modus operandi and the risk tier (High / Medium / Low).
2. Reasoning — Detail specific red flags matching the situation (e.g., urgency, impersonation, illegal demands).
3. Recommended Immediate Action — Specific steps: hang up, block, do not send money/OTP, and mandatory reporting via 1930 / cybercrime.gov.in.${languagePrompt}

Tone: Calm, clear, empathetic, and protective.`;

      const aiResult = await generateWithModelFallback(ai, prompt);

      if (aiResult && aiResult.text) {
        let raw = aiResult.text;
        raw = softenOverconfidence(raw);
        raw = ensureStatutoryGrounding(raw, language);

        return {
          response: raw,
          backendUsed: `${aiResult.modelUsed} (RAG Grounded)`,
        };
      }
    } catch (err: any) {
      console.warn('[CyberRakshak] Gemini models unavailable, engaging offline RAG fallback:', err?.message || err);
    }
  }

  // 2. Deterministic Multilingual RAG Fallback
  const categoryLabels: Record<string, string> = {
    digital_arrest: 'Digital Arrest / Impersonation Scam',
    fake_kyc: 'Fake KYC / Phishing Scam',
    investment_scam: 'Fake Investment / Stock Market Scam',
    voice_clone_relative: 'Voice Clone / Emergency Impersonation Scam',
    fake_govt_lottery: 'Fake Government Scheme / Lottery Scam',
    other: 'Unclassified Suspicious Query',
  };

  const label = categoryLabels[category] || 'Suspicious Pattern';
  let raw = '';

  if (language === 'hi') {
    raw = `1. जोखिम मूल्यांकन (Risk Assessment)
यह स्थिति जाने-पहचाने साइबर फ्रॉड पैटर्न से मेल खाती है: ${label}। इसके धोखाधड़ी होने की प्रबल संभावना (HIGH RISK) है।

2. मुख्य संकेत (Reasoning)
- आधिकारिक कानून प्रवर्तन एजेंसियां (CBI/पुलिस/ED/TRAI) कभी भी फोन या वीडियो कॉल पर गिरफ़्तारी का दावा नहीं करती हैं।
- बैंक और सरकारी योजनाएं कभी भी अग्रिम शुल्क (processing fee) या पासवर्ड/OTP नहीं मांगती हैं।
- आधिकारिक संदर्भ: ${context.slice(0, 320).trim()}...

3. तुरंत उठाए जाने वाले कदम (Recommended Action)
- फोन तुरंत काट दें। कॉलर द्वारा दिए गए किसी भी नंबर पर वापस कॉल न करें।
- अपना कोई भी OTP, आधार, पैन या बैंक विवरण किसी के साथ साझा न करें।
- किसी भी खाते में 'सुरक्षा जांच' या 'क्लियरेंस' के नाम पर पैसे न भेजें।
- राष्ट्रीय साइबर अपराध हेल्पलाइन 1930 पर तुरंत कॉल करें या cybercrime.gov.in पर रिपोर्ट दर्ज करें।`;
  } else if (language === 'te') {
    raw = `1. ప్రమాద అంచనా (Risk Assessment)
ఈ సంఘటన తెలిసిన సైబర్ నేరాల శైలికి దగ్గరగా ఉంది: ${label}। ఇది సైబర్ మోసం కావడానికి తీవ్ర అవకాశం (HIGH RISK) ఉంది.

2. ముఖ్య కారణాలు (Reasoning)
- భారతదేశంలో ఏ చట్ట ప్రకారం కూడా వీడియో కాల్ ద్వారా 'డిజిటల్ అరెస్ట్' చేసే నిబంధన లేదు.
- ఏ బ్యాంకు అధికారి లేదా ప్రభుత్వ ఉద్యోగి కూడా ఓటీపీ లేదా పాస్‌వర్డ్ అడగరు.
- అధికారిక సలహా: ${context.slice(0, 320).trim()}...

3. తక్షణ చర్యలు (Recommended Action)
- కాల్ వెంటనే కట్ చేయండి. భయపడవద్దు.
- ఎవరితోనూ OTP, ఆధార్ లేదా బ్యాంక్ వివరాలు పంచుకోవద్దు.
- ఎటువంటి అపరిచిత ఖాతాకూ డబ్బు బదిలీ చేయవద్దు.
- జాతీయ సైబర్ క్రైమ్ హెల్ప్‌లైన్ 1930 కు వెంటనే కాల్ చేయండి లేదా cybercrime.gov.in లో ఫిర్యాదు చేయండి.`;
  } else if (language === 'ta') {
    raw = `1. ஆபத்து மதிப்பீடு (Risk Assessment)
இந்த நிலைமை அறியப்பட்ட மோசடி வகையுடன் ஒத்துப்போகிறது: ${label}. இது ஒரு இணைய மோசடியாக இருக்க அதிக வாய்ப்புள்ளது (HIGH RISK).

2. முக்கிய காரணங்கள் (Reasoning)
- எந்தவொரு அரசு நிறுவனமும் அல்லது காவல்துறையும் வீடியோ அழைப்பில் கைது செய்யவோ பணம் கேட்கவோ செய்யாது.
- அதிகாரப்பூர்வ தகவல்: ${context.slice(0, 320).trim()}...

3. உடனடி நடவடிக்கைகள் (Recommended Action)
- உடனடியாக அழைப்பை துண்டிக்கவும். பயப்பட வேண்டாம்.
- எந்தவொரு OTP, ஆதார் அல்லது வங்கி விவரங்களையும் பகிர வேண்டாம்.
- தேசிய சைபர் குற்ற உதவி எண் 1930-ஐ உடனடியாக தொடர்பு கொள்ளவும் அல்லது cybercrime.gov.in இல் புகார் அளிக்கவும்.`;
  } else if (language === 'mr') {
    raw = `1. जोखीम मूल्यांकन (Risk Assessment)
ही परिस्थिती सायबर फसवणुकीच्या प्रकाराशी जुळते: ${label}. ही फसवणूक असण्याची दाट शक्यता (HIGH RISK) आहे.

2. मुख्य कारणे (Reasoning)
- कोणतीही सरकारी यंत्रणा, पोलिस किंवा सीबीआय व्हिडिओ कॉलवर अटक करत नाही किंवा पैशांची मागणी करत नाही.
- अधिकृत संदर्भ: ${context.slice(0, 320).trim()}...

3. त्वरित करायच्या उपाययोजना (Recommended Action)
- कॉल लगेच कट करा. कोणाशीही OTP, आधार किंवा बँक तपशील शेअर करू नका.
- कोणत्याही अनोळखी खात्यात पैसे पाठवू नका.
- राष्ट्रीय सायबर हेल्पलाइन 1930 वर तात्काळ कॉल करा किंवा cybercrime.gov.in वर तक्रार नोंदवा.`;
  } else if (language === 'bn') {
    raw = `1. ঝুঁকি মূল্যায়ন (Risk Assessment)
এই ঘটনাটি পরিচিত সাইবার জালিয়াতির ধরণের সাথে মেলে: ${label}। এটি একটি প্রতারণা হওয়ার প্রবল সম্ভাবনা (HIGH RISK) রয়েছে।

2. মূল কারণ (Reasoning)
- কোনও সরকারী সংস্থা, পুলিশ বা সিবিআই ভিডিও কলে গ্রেপ্তার করে না বা টাকা দাবি করে না।
- অফিসিয়াল রেফারেন্স: ${context.slice(0, 320).trim()}...

3. অবিলম্বে করণীয় (Recommended Action)
- তৎক্ষণাৎ কল কেটে দিন। কোনও OTP, আধার বা ব্যাংক বিবরণ শেয়ার করবেন না।
- জাতীয় সাইবার ক্রাইম হেল্পলাইন 1930-এ অবিলম্বে কল করুন অথবা cybercrime.gov.in-এ অভিযোগ জানান।`;
  } else {
    // English default
    const isOther = category === 'other';
    const riskDesc = isOther
      ? 'This query does not directly match standard high-risk fraud triggers, but vigilance is strongly advised.'
      : `This situation strongly matches a recognized fraud modus operandi: ${label}. The likelihood of fraud is HIGH.`;

    raw = `1. Risk Assessment
${riskDesc}

2. Reasoning
- Legitimate law enforcement, judicial bodies, and telecom authorities NEVER conduct arrests or demand money via WhatsApp, Skype, or phone calls.
- Genuine institutions never require you to transfer funds to "verification accounts" or disclose confidential OTPs/passwords.
- Official statutory context:
  ${context.slice(0, 320).trim()}...

3. Recommended Immediate Action
- Hang up immediately and do not engage further with the caller or message.
- NEVER share any OTP, UPI PIN, NetBanking password, or Aadhaar number.
- Never download external APK files or remote access apps (e.g., AnyDesk, TeamViewer) from unverified links.
- Report immediately to the National Cybercrime Helpline: 1930 (available 24x7).
- File an official complaint at: https://cybercrime.gov.in`;
  }

  raw = softenOverconfidence(raw);
  raw = ensureStatutoryGrounding(raw, language);

  return {
    response: raw,
    backendUsed: 'Deterministic Sovereign RAG',
  };
}
