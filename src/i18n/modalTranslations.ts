import { SupportedLanguage } from '../types.ts';

export interface ModalTranslations {
  emergencyWizard: {
    title: string;
    goldenHourBadge: string;
    subtitle: string;
    close: string;
    tabs: {
      checklist: string;
      banks: string;
      fir: string;
    };
    checklistTitle: string;
    checklistDesc: string;
    checklistSteps: Array<{
      title: string;
      desc: string;
      highlight: string;
      actionText?: string;
      actionUrl?: string;
      isTel?: boolean;
    }>;
    searchBankPlaceholder: string;
    freezeNotice: string;
    tollFreeBadge: string;
    copyNumber: string;
    copied: string;
    freezeActionLabel: string;
    officialPortalLabel: string;
    firHeading: string;
    firSubheading: string;
    fields: {
      victimName: string;
      victimNamePlaceholder: string;
      incidentDate: string;
      incidentTime: string;
      fraudType: string;
      amountLost: string;
      amountLostPlaceholder: string;
      bankName: string;
      bankNamePlaceholder: string;
      suspectContact: string;
      suspectContactPlaceholder: string;
      suspectAccountOrUpi: string;
      suspectAccountOrUpiPlaceholder: string;
      transactionRef: string;
      transactionRefPlaceholder: string;
      description: string;
      descriptionPlaceholder: string;
    };
    generateFirButton: string;
    firGeneratedNotice: string;
    copyStatement: string;
    copiedStatement: string;
    helplineFooter: string;
  };

  linkInspector: {
    title: string;
    subtitle: string;
    inputLabel: string;
    inputPlaceholder: string;
    inspectButton: string;
    analyzingButton: string;
    quickTestLabel: string;
    samples: Array<{ label: string; url: string }>;
    riskScoreLabel: string;
    redFlagsTitle: string;
    recommendationsTitle: string;
    helplineText: string;
    closeButton: string;
  };

  trendingAlerts: {
    title: string;
    badge: string;
    subtitle: string;
    tip: string;
    testInCyberRakshak: string;
    keyWarningSigns: string;
    officialSafeAction: string;
    sourceLabel: string;
    helplineFooter: string;
    closeButton: string;
    alerts: Array<{
      id: string;
      title: string;
      agency: string;
      tag: string;
      severity: 'critical' | 'high';
      tactic: string;
      warningSigns: string[];
      safeAction: string;
      summary: string;
    }>;
  };

  citizenRules: {
    title: string;
    badge: string;
    subtitle: string;
    closeButton: string;
    tabs: {
      rbi: string;
      laws: string;
      sanchar: string;
      ombudsman: string;
    };
    rbiTitle: string;
    rbiSubtitle: string;
    txnDateLabel: string;
    accountTypeLabel: string;
    accountTypes: {
      savings: string;
      bsbda: string;
      creditLarge: string;
    };
    liabilityTitle: string;
    statutoryClause: string;
    formalNoticeDraftTitle: string;
    copyNoticeButton: string;
    copiedNotice: string;
    rbiRulesSummaryTitle: string;
    rbiRules: Array<{
      title: string;
      liability: string;
      desc: string;
    }>;
    lawsTitle: string;
    lawsSubtitle: string;
    lawsList: Array<{
      code: string;
      title: string;
      penalty: string;
      desc: string;
    }>;
    sancharTitle: string;
    sancharSubtitle: string;
    sancharPortals: Array<{
      name: string;
      badge: string;
      desc: string;
      actionText: string;
      url: string;
    }>;
    ombudsmanTitle: string;
    ombudsmanSubtitle: string;
    ombudsmanSteps: Array<{
      step: string;
      title: string;
      desc: string;
    }>;
    cmsPortalLabel: string;
    helplineFooter: string;
  };
}

export const MODAL_TRANSLATIONS: Record<SupportedLanguage, ModalTranslations> = {
  // ── ENGLISH ────────────────────────────────────────────────────────────────
  en: {
    emergencyWizard: {
      title: 'Emergency Action Wizard',
      goldenHourBadge: 'Golden Hour',
      subtitle: 'Critical immediate steps within the first 60 minutes of financial cyber fraud',
      close: 'Close',
      tabs: {
        checklist: 'Golden Hour Checklist',
        banks: 'Freeze Bank Accounts',
        fir: 'Generate 1930 Cyber FIR',
      },
      checklistTitle: 'Golden Hour Checklist (First 60 Minutes)',
      checklistDesc: 'If money was debited fraudulently, follow these 4 steps immediately to freeze illicit transfers before cash-out:',
      checklistSteps: [
        {
          title: 'Dial 1930 Cyber Fraud Helpline',
          desc: 'National Cyber Crime Reporting Portal helpline. The operator directly alerts bank nodal officers to freeze recipient wallets and bank accounts in real time.',
          highlight: 'Free & 24x7 Across All Telecom Operators',
          actionText: 'Dial 1930 Now',
          actionUrl: 'tel:1930',
          isTel: true,
        },
        {
          title: 'Emergency Freeze with Your Bank',
          desc: 'Call your bank immediate fraud desk or use netbanking / mobile app to block debit card, UPI ID, and disable international / contactless transactions.',
          highlight: 'Blocks further unauthorized auto-debits',
        },
        {
          title: 'Collect Transaction Identifiers (UTR / Ref)',
          desc: 'Note down: Date, exact timestamp, amount, 12-digit UTR/Reference number, suspect UPI ID, and suspect mobile number from debit SMS / bank statement.',
          highlight: 'Crucial for 1930 tracking & police FIR',
        },
        {
          title: 'File Statutory Cyber Report on Portal',
          desc: 'Lodge formal complaint on cybercrime.gov.in. Upload bank statements, suspect chat screenshots, and note down the formal acknowledgement number.',
          highlight: 'Provides legal protection under RBI rules',
          actionText: 'Open cybercrime.gov.in',
          actionUrl: 'https://cybercrime.gov.in',
        },
      ],
      searchBankPlaceholder: 'Search bank name or toll-free number (e.g. SBI, HDFC, ICICI, PhonePe)...',
      freezeNotice: 'Call your bank helpline immediately and ask to "Block all digital banking channels and freeze account debits due to unauthorized cyber fraud".',
      tollFreeBadge: '24/7 Toll Free',
      copyNumber: 'Copy Number',
      copied: 'Copied!',
      freezeActionLabel: 'Emergency Freeze Action',
      officialPortalLabel: 'Bank Portal / Netbanking',
      firHeading: '1930 / Police Incident Statement Generator',
      firSubheading: 'Generate a structured, ready-to-submit complaint letter citing Section 66D IT Act and RBI Circulars:',
      fields: {
        victimName: 'Complainant / Account Holder Name *',
        victimNamePlaceholder: 'e.g. Ramesh Kumar',
        incidentDate: 'Date of Incident *',
        incidentTime: 'Time of Incident *',
        fraudType: 'Cyber Fraud Classification *',
        amountLost: 'Financial Loss Claimed (₹) *',
        amountLostPlaceholder: 'e.g. 45000',
        bankName: 'Your Bank / Account Provider *',
        bankNamePlaceholder: 'e.g. State Bank of India',
        suspectContact: 'Suspect Phone / WhatsApp / Telegram',
        suspectContactPlaceholder: 'e.g. +91 98765 43210 or @spoofed_cbi',
        suspectAccountOrUpi: 'Suspect UPI ID or Beneficiary Account',
        suspectAccountOrUpiPlaceholder: 'e.g. fraudster@paytm or A/C 987654321',
        transactionRef: 'UTR / Transaction Reference Number(s)',
        transactionRefPlaceholder: 'e.g. 405623984125, 405623984126',
        description: 'Brief Incident Narrative *',
        descriptionPlaceholder: 'e.g. Received a call claiming my Aadhaar was linked to money laundering. Fraudster forced me to transfer funds to verify authenticity...',
      },
      generateFirButton: 'Generate Structured Complaint Draft',
      firGeneratedNotice: 'Ready for cybercrime.gov.in and Bank Nodal Officer submission:',
      copyStatement: 'Copy Complaint Statement',
      copiedStatement: 'Copied to Clipboard!',
      helplineFooter: 'National Cyber Fraud Helpline: 1930 (Toll-Free, 24x7)',
    },

    linkInspector: {
      title: 'Link & APK Inspector',
      subtitle: 'Detect fake banking domains, brand typosquatting & malicious APKs',
      inputLabel: 'Paste web link, domain, or APK download URL:',
      inputPlaceholder: 'e.g. sbi-kyc-update.xyz or bijli-bill.top/app.apk',
      inspectButton: 'Inspect Link',
      analyzingButton: 'Analyzing Link...',
      quickTestLabel: 'Quick test:',
      samples: [
        { label: 'Fake SBI KYC', url: 'http://sbi-kyc-pan-update.xyz/login.html' },
        { label: 'Malicious Electricity APK', url: 'https://bijli-bill-cutoff.top/Mahavitaran_Update.apk' },
        { label: 'Lottery Masked Link', url: 'bit.ly/claim-lottery-crore' },
        { label: 'Official Portal (Safe)', url: 'https://cybercrime.gov.in' },
      ],
      riskScoreLabel: 'Risk Score',
      redFlagsTitle: 'Identified Risk Indicators',
      recommendationsTitle: 'Recommended Safety Steps',
      helplineText: 'Official Helpline: 1930',
      closeButton: 'Close',
    },

    trendingAlerts: {
      title: 'Scam Advisories',
      badge: 'Live Bulletins',
      subtitle: 'Official advisories from I4C, CERT-In, and Ministry of Home Affairs',
      tip: 'Click "Test in CyberRakshak" on any alert below to load the scenario directly into the scanner.',
      testInCyberRakshak: 'Test in CyberRakshak',
      keyWarningSigns: 'Key Warning Signs:',
      officialSafeAction: 'Official Safe Action:',
      sourceLabel: 'Source:',
      helplineFooter: 'National Cyber Helpline: 1930 · cybercrime.gov.in',
      closeButton: 'Close',
      alerts: [
        {
          id: 'digital-arrest',
          title: 'Fake "Digital Arrest" by Impersonators of CBI, ED, Police',
          agency: 'MHA / I4C Alert',
          tag: 'Digital Arrest',
          severity: 'critical',
          tactic: 'Fraudsters video call victims wearing police/customs uniforms or showing forged Supreme Court/CBI documents. They claim an illegal courier with narcotics or your Aadhaar was seized, putting you under "digital arrest" and demanding fund transfers.',
          warningSigns: [
            'Video call on WhatsApp/Skype showing a police station or official emblem',
            'Demanding you stay on camera 24/7 in isolation without contacting family',
            'Pressure to transfer money into "safe government escrow accounts" for verification',
          ],
          safeAction: 'Disconnect immediately. No Indian police or judicial body conducts trials or arrests via video call. Dial 1930.',
          summary: 'Received a video call claiming to be from CBI or Police alleging my Aadhaar was involved in an illegal parcel and placing me under digital arrest.',
        },
        {
          id: 'electricity-apk',
          title: 'Electricity Bill Disconnection APK Phishing Scam',
          agency: 'CERT-In Advisory',
          tag: 'Malicious APK',
          severity: 'critical',
          tactic: 'Citizens receive urgent SMS: "Dear Consumer, your electricity will be disconnected at 9:30 PM tonight due to unpaid bill. Update via this APK link immediately."',
          warningSigns: [
            'Urgent threat of power disconnection tonight from personal mobile number (not DISCOM 6-character header)',
            'Link ends in .apk or directs to third-party file sharing sites (not Google Play / App Store)',
            'The APK demands accessibility permissions or SMS forwarding permissions',
          ],
          safeAction: 'Never install .apk files sent via SMS or WhatsApp. Pay bills strictly through authorized state electricity portals or Bharat BillPay (BBPS).',
          summary: 'Got SMS saying electricity will be disconnected tonight unless I install an APK file from a link.',
        },
        {
          id: 'trading-pre-ipo',
          title: 'Fake WhatsApp & Telegram Pre-IPO Stock Investment Scam',
          agency: 'SEBI & I4C Alert',
          tag: 'Stock Fraud',
          severity: 'critical',
          tactic: 'Scammers add victims to WhatsApp groups claiming to be institutional investors from prominent brokerages. They showcase fake profit screenshots and instruct transfers to individual bank accounts.',
          warningSigns: [
            'Promises of guaranteed 200% to 500% weekly profits or exclusive pre-IPO institutional allocation',
            'Instructing you to transfer money to savings accounts registered in individual third-party names',
            'Withdrawal blocked unless you pay extra "tax," "processing fees," or "unlock fee"',
          ],
          safeAction: 'Only invest through SEBI-registered brokers. Never transfer investment funds into personal savings accounts.',
          summary: 'Joined a Telegram stock investment group where admin promises guaranteed 300% returns and asks to transfer money to an individual bank account.',
        },
        {
          id: 'ai-voice-clone',
          title: 'AI Voice Clone Emergency Distress Scam',
          agency: 'DoT / MHA Warning',
          tag: 'AI Clone',
          severity: 'high',
          tactic: 'Scammers use AI audio tools trained on short public social media videos to clone the exact voice of a son, brother, or friend, claiming an urgent road accident or police custody.',
          warningSigns: [
            'Caller speaks in familiar voice crying or panicking, with background sirens or hospital noise',
            'Demands immediate UPI or cash transfer to an unknown medical or lawyer number',
            'Refusal to allow you to call back on the original known phone number',
          ],
          safeAction: 'Stay calm. Disconnect and call your relative on their regular mobile number or contact other family members to verify.',
          summary: 'Got a voice call that sounded exactly like my son crying that he was arrested in an accident and needs immediate money sent via UPI.',
        },
        {
          id: 'part-time-job',
          title: 'YouTube Like / Telegram Part-Time Review Scam',
          agency: 'I4C Bulletin',
          tag: 'Job Fraud',
          severity: 'high',
          tactic: 'Unsolicited WhatsApp message offering ₹2,000–₹5,000 daily for liking YouTube videos, rating Google Maps locations, or reviewing hotels. Small initial payouts are made to build trust, followed by a trap.',
          warningSigns: [
            'Messages from international country codes (+62, +84, +234, etc.) offering easy work-from-home tasks',
            'Initial small payout (₹150–₹500) to establish psychological trust',
            'Promptly redirected to "prepaid task" or "merchant VIP upgrade" requiring your own money',
          ],
          safeAction: 'Legitimate companies never ask you to pay money to complete tasks or withdraw your earned salary. Block and report on 1930.',
          summary: 'Offered a part-time job liking YouTube videos and rating hotels on WhatsApp, now they are asking for prepaid deposit to withdraw my earnings.',
        },
      ],
    },

    citizenRules: {
      title: 'Citizen Legal Rights & Rules',
      badge: 'Statutory Guide',
      subtitle: 'RBI Zero-Liability, BNS 2023 / IT Act, & DoT Chakshu portal',
      closeButton: 'Close',
      tabs: {
        rbi: 'RBI Zero-Liability',
        laws: 'BNS 2023 & IT Act',
        sanchar: 'DoT Chakshu Portal',
        ombudsman: 'RBI Ombudsman',
      },
      rbiTitle: 'RBI Customer Protection & Zero-Liability Calculator',
      rbiSubtitle: 'Under Reserve Bank of India Circular DBR.No.Leg.BC.78/09.07.005/2017-18, your liability for unauthorized electronic transactions is legally defined by reporting time:',
      txnDateLabel: 'Date of Unauthorized Transaction:',
      accountTypeLabel: 'Account / Card Type:',
      accountTypes: {
        savings: 'Savings Account / Prepaid Wallet (Standard)',
        bsbda: 'Basic Savings (BSBDA / Jan Dhan / RuPay)',
        creditLarge: 'Current Account / Credit Card (Limit > ₹5 Lakh)',
      },
      liabilityTitle: 'Statutory Liability Verdict:',
      statutoryClause: 'Governing Statutory Regulation:',
      formalNoticeDraftTitle: 'Generate Statutory Notice to Bank Nodal Officer',
      copyNoticeButton: 'Copy Formal Bank Notice',
      copiedNotice: 'Notice Copied to Clipboard!',
      rbiRulesSummaryTitle: 'Statutory RBI Circular Framework (Summary Schedule):',
      rbiRules: [
        {
          title: '0 to 3 Working Days (Immediate Notification)',
          liability: '₹0 (Zero Liability)',
          desc: 'Where the fraud is due to third-party breach where neither the bank nor the customer is at fault, customer liability is completely ZERO. Bank must reverse funds within 10 working days.',
        },
        {
          title: '4 to 7 Working Days (Delayed Notification)',
          liability: 'Capped Statutory Liability',
          desc: 'Max ₹5,000 for BSBDA / Jan Dhan accounts; max ₹10,000 for standard savings accounts; max ₹25,000 for credit cards / current accounts.',
        },
        {
          title: 'Beyond 7 Working Days',
          liability: 'Per Bank Board Approved Policy',
          desc: 'Determined per bank board policy. The citizen retains full right to appeal directly to the RBI Banking Ombudsman if unsatisfied.',
        },
      ],
      lawsTitle: 'Indian Penal Code & Cyber Law Protections',
      lawsSubtitle: 'Statutory provisions under Bharatiya Nyaya Sanhita (BNS 2023) and Information Technology Act 2000:',
      lawsList: [
        {
          code: 'BNS Section 318(4) (formerly IPC 420)',
          title: 'Cheating and Dishonestly Inducing Delivery of Property',
          penalty: 'Rigorous imprisonment up to 7 years + fine',
          desc: 'Applies to online phishing, fake investment schemes, fraudulent loan apps, and fraudulent UPI transfers.',
        },
        {
          code: 'BNS Section 319 (formerly IPC 419)',
          title: 'Cheating by Personation',
          penalty: 'Imprisonment up to 3 years + fine',
          desc: 'Applies to scammers impersonating Police, CBI, ED, bank managers, courier staff, or telecom officials.',
        },
        {
          code: 'IT Act Section 66C',
          title: 'Identity Theft',
          penalty: 'Imprisonment up to 3 years + fine up to ₹1,00,000',
          desc: 'Covers fraudulent acquisition or use of digital signatures, passwords, Aadhaar, OTPs, or unique identification features.',
        },
        {
          code: 'IT Act Section 66D',
          title: 'Cheating by Personation using Computer Resource',
          penalty: 'Imprisonment up to 3 years + fine up to ₹1,00,000',
          desc: 'The primary cybercrime charge for social engineering, fake websites, APK trojans, and phishing links.',
        },
      ],
      sancharTitle: 'Department of Telecommunications (DoT) Citizen Portals',
      sancharSubtitle: 'Official government tools on Sanchar Saathi (sancharsaathi.gov.in) to protect telecom identities:',
      sancharPortals: [
        {
          name: 'Chakshu Portal',
          badge: 'Report Fraud Calls & SMS',
          desc: 'Citizen reporting facility for suspected fraudulent calls, fake SMS, WhatsApp impersonators, and deceptive lottery/job calls. The government blocks offending numbers nationwide.',
          actionText: 'Open Chakshu Portal',
          url: 'https://sancharsaathi.gov.in/sfc/',
        },
        {
          name: 'TAFCOP (Know Your Mobile Connections)',
          badge: 'SIM Verification',
          desc: 'Verify all mobile connections registered against your Aadhaar. Report and disconnect unauthorized SIM cards operating in your name without your knowledge.',
          actionText: 'Open TAFCOP',
          url: 'https://tafcop.sancharsaathi.gov.in/',
        },
        {
          name: 'CEIR (Block Lost / Stolen Mobile)',
          badge: 'Handset Blocking',
          desc: 'Block IMEI numbers of lost or snatched mobile phones across all Indian telecom operators to prevent misuse of your device and banking apps.',
          actionText: 'Open CEIR Portal',
          url: 'https://ceir.sancharsaathi.gov.in/',
        },
      ],
      ombudsmanTitle: 'RBI Integrated Ombudsman Scheme (2021)',
      ombudsmanSubtitle: 'How to escalate unresolved bank disputes to the Reserve Bank of India:',
      ombudsmanSteps: [
        {
          step: 'Step 1: Lodge Complaint with Bank',
          title: 'Written Grievance to Branch / Nodal Officer',
          desc: 'Submit written notification and obtain a grievance reference number from your bank. Keep bank statements and 1930 complaint acknowledgement ready.',
        },
        {
          step: 'Step 2: 30-Day Resolution Window',
          title: 'Bank Must Investigate and Respond',
          desc: 'Banks have 30 days to resolve unauthorized transaction claims. Under RBI rules, shadow reversal should be credited within 10 working days.',
        },
        {
          step: 'Step 3: Escalate to RBI Ombudsman',
          title: 'File on RBI CMS Portal (cms.rbi.org.in)',
          desc: 'If the bank rejects your claim, fails to respond in 30 days, or offers inadequate compensation, lodge a zero-cost complaint directly with the RBI Ombudsman.',
        },
      ],
      cmsPortalLabel: 'RBI Complaint Management Portal (CMS): cms.rbi.org.in',
      helplineFooter: 'Statutory Grievance: RBI Ombudsman (cms.rbi.org.in) · Cyber Crime Helpline: 1930',
    },
  },

  // ── TELUGU (తెలుగు) ────────────────────────────────────────────────────────
  te: {
    emergencyWizard: {
      title: 'అత్యవసర కార్యాచరణ విజార్డ్',
      goldenHourBadge: 'గోల్డెన్ అవర్',
      subtitle: 'ఆర్థిక సైబర్ మోసం జరిగిన మొదటి 60 నిమిషాల్లో తీసుకోవలసిన తక్షణ చర్యలు',
      close: 'మూసివేయండి',
      tabs: {
        checklist: 'గోల్డెన్ అవర్ చెక్‌లిస్ట్',
        banks: 'బ్యాంక్ ఖాతాలను ఫ్రీజ్ చేయండి',
        fir: '1930 సైబర్ FIR రూపొందించండి',
      },
      checklistTitle: 'గోల్డెన్ అవర్ చెక్‌లిస్ట్ (మొదటి 60 నిమిషాలు)',
      checklistDesc: 'మీ ఖాతా నుండి అనధికారికంగా డబ్బు డెబిట్ అయితే, మోసగాళ్లు ఆ డబ్బును విత్‌డ్రా చేయకముందే వెంటనే ఈ 4 దశలను పూర్తి చేయండి:',
      checklistSteps: [
        {
          title: '1930 నేషనల్ సైబర్ క్రైమ్ హెల్ప్‌లైన్‌కు వెంటనే కాల్ చేయండి',
          desc: 'జాతీయ సైబర్ క్రైమ్ పోర్టల్ హెల్ప్‌లైన్. ఆపరేటర్ నేరుగా సంబంధిత బ్యాంక్ నోడల్ అధికారులను సంప్రదించి, నిందితుడి బ్యాంక్ ఖాతా లేదా వాలెట్‌ను అక్కడికక్కడే ఫ్రీజ్ చేస్తారు.',
          highlight: 'ఉచితం & 24x7 అన్ని మొబైల్ నెట్‌వర్క్‌ల నుండి అందుబాటులో ఉంది',
          actionText: 'ఇప్పుడే 1930 కి కాల్ చేయండి',
          actionUrl: 'tel:1930',
          isTel: true,
        },
        {
          title: 'మీ బ్యాంక్ ఖాతా & కార్డులను అత్యవసరంగా బ్లాక్ చేయండి',
          desc: 'మీ బ్యాంక్ కస్టమర్ కేర్‌కు కాల్ చేసి లేదా మొబైల్ బ్యాంకింగ్ యాప్ ద్వారా డెబిట్ కార్డు, నెట్ బ్యాంకింగ్, UPI ఐడీలను తక్షణమే తాత్కాలికంగా బ్లాక్ చేయండి.',
          highlight: 'మరిన్ని అనధికారిక డెబిట్‌లను అడ్డుకుంటుంది',
        },
        {
          title: 'లావాదేవీ వివరాలు (UTR / రిఫరెన్స్ నంబర్లు) సేకరించండి',
          desc: 'తేదీ, ఖచ్చితమైన సమయం, మొత్తం, బ్యాంక్ SMS లేదా స్టేట్‌మెంట్‌లోని 12 అంకెల UTR నంబర్, నిందితుడి UPI లేదా ఫోన్ నంబర్‌ను భద్రపరచండి.',
          highlight: '1930 ట్రాకింగ్ మరియు పోలీసు FIR కోసం అత్యంత కీలకం',
        },
        {
          title: 'అధికారిక సైబర్ క్రైమ్ పోర్టల్‌లో ఫిర్యాదు నమోదు చేయండి',
          desc: 'cybercrime.gov.in లో లాగిన్ అయి పూర్తి వివరాలతో ఫిర్యాదు చేయండి. బ్యాంక్ స్టేట్‌మెంట్, స్క్రీన్‌షాట్‌లు అప్‌లోడ్ చేసి రసీదు నంబర్ (Acknowledgement Number) తీసుకోండి.',
          highlight: 'RBI నిబంధనల ప్రకారం పూర్తి చట్టపరమైన రక్షణను అందిస్తుంది',
          actionText: 'cybercrime.gov.in తెరవండి',
          actionUrl: 'https://cybercrime.gov.in',
        },
      ],
      searchBankPlaceholder: 'బ్యాంక్ పేరు లేదా టోల్-ఫ్రీ నంబర్ శోధించండి (ఉదా. SBI, HDFC, ICICI, PhonePe)...',
      freezeNotice: 'మీ బ్యాంక్ హెల్ప్‌లైన్‌కు వెంటనే కాల్ చేసి: "సైబర్ మోసం వల్ల నా ఖాతా నుండి అనధికారిక లావాదేవీ జరిగింది, దయచేసి అన్ని డిజిటల్ ఛానెల్‌లను వెంటనే బ్లాక్ చేయండి" అని చెప్పండి.',
      tollFreeBadge: '24/7 ఉచిత కాల్',
      copyNumber: 'నంబర్ కాపీ చేయండి',
      copied: 'కాపీ అయింది!',
      freezeActionLabel: 'అత్యవసర ఫ్రీజ్ చర్య',
      officialPortalLabel: 'బ్యాంక్ అధికారిక పోర్టల్',
      firHeading: '1930 / పోలీస్ ఫిర్యాదు పత్రం (FIR డ్రాఫ్ట్ జనరేటర్)',
      firSubheading: 'IT చట్టం సెక్షన్ 66D మరియు RBI సర్క్యులర్‌ల ఆధారంగా సిద్ధంగా ఉన్న అధికారిక ఫిర్యాదు లేఖను రూపొందించండి:',
      fields: {
        victimName: 'ఫిర్యాదుదారు / ఖాతాదారుని పూర్తి పేరు *',
        victimNamePlaceholder: 'ఉదా. రమేష్ కుమార్',
        incidentDate: 'సంఘటన జరిగిన తేదీ *',
        incidentTime: 'సంఘటన జరిగిన సమయం *',
        fraudType: 'సైబర్ మోసం వర్గం *',
        amountLost: 'కోల్పోయిన మొత్తం (₹) *',
        amountLostPlaceholder: 'ఉదా. 45000',
        bankName: 'మీ బ్యాంక్ లేదా పేమెంట్ యాప్ *',
        bankNamePlaceholder: 'ఉదా. స్టేట్ బ్యాంక్ ఆఫ్ ఇండియా',
        suspectContact: 'నిందితుడి ఫోన్ / వాట్సాప్ / టెలిగ్రామ్ నంబర్',
        suspectContactPlaceholder: 'ఉదా. +91 98765 43210',
        suspectAccountOrUpi: 'నిందితుడి UPI ఐడీ లేదా బ్యాంక్ ఖాతా సంఖ్య',
        suspectAccountOrUpiPlaceholder: 'ఉదా. fraudster@upi లేదా A/C 987654321',
        transactionRef: 'UTR / లావాదేవీ రిఫరెన్స్ నంబర్లు',
        transactionRefPlaceholder: 'ఉదా. 405623984125, 405623984126',
        description: 'ఏమి జరిగిందో సంక్షిప్తంగా వివరించండి *',
        descriptionPlaceholder: 'ఉదా. సీబీఐ అధికారిని అని ఫోన్ చేసి, నా ఆధార్‌తో నార్కోటిక్స్ పార్సెల్ పట్టుబడిందని బెదిరించి ఖాతా వెరిఫికేషన్ పేరుతో డబ్బు ట్రాన్స్‌ఫర్ చేయించారు...',
      },
      generateFirButton: 'అధికారిక ఫిర్యాదు డ్రాఫ్ట్ రూపొందించండి',
      firGeneratedNotice: 'cybercrime.gov.in మరియు బ్యాంక్ నోడల్ ఆఫీసర్‌కు సమర్పించడానికి సిద్ధం:',
      copyStatement: 'ఫిర్యాదు పత్రాన్ని కాపీ చేయండి',
      copiedStatement: 'క్లిప్‌బోర్డ్‌కి కాపీ అయింది!',
      helplineFooter: 'జాతీయ సైబర్ క్రైమ్ హెల్ప్‌లైన్: 1930 (ఉచితం, 24x7)',
    },

    linkInspector: {
      title: 'లింక్ & APK తనిఖీ సాధనం',
      subtitle: 'నకిలీ బ్యాంకింగ్ లింకులు, బ్రాండ్ మోసాలు మరియు ప్రమాదకర APK ఫైళ్లను గుర్తించండి',
      inputLabel: 'వెబ్‌సైట్ లింక్, డొమైన్ లేదా APK డౌన్‌లోడ్ URL ఇక్కడ పేస్ట్ చేయండి:',
      inputPlaceholder: 'ఉదా. sbi-kyc-update.xyz లేదా bijli-bill.top/app.apk',
      inspectButton: 'లింక్ పరిశీలించండి',
      analyzingButton: 'లింక్ విశ్లేషిస్తోంది...',
      quickTestLabel: 'త్వరిత పరీక్ష:',
      samples: [
        { label: 'నకిలీ SBI KYC', url: 'http://sbi-kyc-pan-update.xyz/login.html' },
        { label: 'విద్యుత్ బిల్లు APK మోసం', url: 'https://bijli-bill-cutoff.top/Mahavitaran_Update.apk' },
        { label: 'లాటరీ మోసపూరిత లింక్', url: 'bit.ly/claim-lottery-crore' },
        { label: 'అధికారిక పోర్టల్ (సురక్షితం)', url: 'https://cybercrime.gov.in' },
      ],
      riskScoreLabel: 'ప్రమాద స్థాయి',
      redFlagsTitle: 'గుర్తించిన ప్రమాద సూచికలు',
      recommendationsTitle: 'సిఫార్సు చేసిన రక్షణ చర్యలు',
      helplineText: 'అధికారిక హెల్ప్‌లైన్: 1930',
      closeButton: 'మూసివేయండి',
    },

    trendingAlerts: {
      title: 'తాజా సైబర్ మోసాల హెచ్చరికలు',
      badge: 'ప్రత్యక్ష హెచ్చరికలు',
      subtitle: 'I4C, CERT-In మరియు కేంద్ర హోం మంత్రిత్వ శాఖ అధికారిక మార్గదర్శకాలు',
      tip: 'కింద ఉన్న హెచ్చరికలో "సైబర్ రక్షక్‌లో పరీక్షించండి" బటన్ నొక్కి నేరుగా స్కాన్ చేయండి.',
      testInCyberRakshak: 'సైబర్ రక్షక్‌లో పరీక్షించండి',
      keyWarningSigns: 'ముఖ్యమైన హెచ్చరిక గుర్తులు:',
      officialSafeAction: 'అధికారిక రక్షణ చర్య:',
      sourceLabel: 'మూలం:',
      helplineFooter: 'జాతీయ సైబర్ హెల్ప్‌లైన్: 1930 · cybercrime.gov.in',
      closeButton: 'మూసివేయండి',
      alerts: [
        {
          id: 'digital-arrest',
          title: 'నకిలీ సీబీఐ, ఈడీ, పోలీస్ అధికారుల "డిజిటల్ అరెస్ట్" మోసం',
          agency: 'MHA / I4C హెచ్చరిక',
          tag: 'డిజిటల్ అరెస్ట్',
          severity: 'critical',
          tactic: 'పోలీస్ యూనిఫాంలో వాట్సాప్ లేదా స్కైప్ వీడియో కాల్ చేసి, మీ ఆధార్‌తో చట్టవిరుద్ధ పార్సెల్ లేదా మనీ లాండరింగ్ జరిగిందని, మిమ్మల్ని డిజిటల్ అరెస్ట్ చేస్తున్నామని బెదిరించి డబ్బులు లాక్కుంటారు.',
          warningSigns: [
            'పోలీస్ స్టేషన్ సెట్టింగ్ లేదా అధికారిక చిహ్నాలు చూపుతూ వాట్సాప్/స్కైప్ వీడియో కాల్',
            'కుటుంబ సభ్యులకు చెప్పకుండా 24 గంటలు కెమెరా ముందే ఉండాలని బెదిరించడం',
            'వెరిఫికేషన్ లేదా సురక్షిత ప్రభుత్వ ఖాతా పేరుతో డబ్బు ట్రాన్స్‌ఫర్ చేయమని బలవంతం చేయడం',
          ],
          safeAction: 'వెంటనే కాల్ కట్ చేయండి. భారతదేశంలో ఏ పోలీసు లేదా న్యాయవ్యవస్థ కూడా వీడియో కాల్ ద్వారా విచారణ లేదా అరెస్ట్ చేయదు. వెంటనే 1930 కి కాల్ చేయండి.',
          summary: 'సీబీఐ లేదా పోలీస్ అధికారినని వీడియో కాల్ చేసి నా ఆధార్‌తో అక్రమ పార్సెల్ పట్టుబడిందని, నన్ను డిజిటల్ అరెస్ట్ చేస్తున్నామని బెదిరించారు.',
        },
        {
          id: 'electricity-apk',
          title: 'విద్యుత్ బిల్లు బకాయి పేరుతో APK మాల్వేర్ మోసం',
          agency: 'CERT-In మార్గదర్శకం',
          tag: 'ప్రమాదకర APK',
          severity: 'critical',
          tactic: '"ప్రియమైన వినియోగదారుడా, మీ విద్యుత్ బిల్లు చెల్లించనందున ఈ రాత్రి 9:30 గంటలకు విద్యుత్ నిలిపివేయబడుతుంది. వెంటనే ఈ లింక్ ద్వారా APK అప్‌డేట్ చేయండి" అంటూ నకిలీ SMS పంపుతారు.',
          warningSigns: [
            'వ్యక్తిగత మొబైల్ నంబర్ నుండి వెంటనే పవర్ కట్ అవుతుందనే అత్యవసర సందేశం',
            'లింక్ చివరలో .apk ఉండడం లేదా బయటి సైట్ల నుండి యాప్ డౌన్‌లోడ్ చేయమనడం',
            'యాప్ ఇన్‌స్టాల్ చేయగానే SMS మరియు స్క్రీన్ పర్మిషన్లు అడగడం',
          ],
          safeAction: 'SMS లేదా వాట్సాప్‌లో వచ్చే APK ఫైళ్లను ఎప్పుడూ ఇన్‌స్టాల్ చేయవద్దు. అధికారిక విద్యుత్ వెబ్‌సైట్ లేదా భారత్ బిల్ పే (BBPS) ద్వారానే బిల్లులు చెల్లించండి.',
          summary: 'విద్యుత్ బిల్లు చెల్లించకపోతే ఈ రాత్రికే కరెంట్ కట్ చేస్తామని APK లింక్ పంపించారు.',
        },
        {
          id: 'trading-pre-ipo',
          title: 'వాట్సాప్, టెలిగ్రామ్ నకిలీ షేర్ మార్కెట్ & ప్రీ-IPO పెట్టుబడి స్కామ్',
          agency: 'SEBI & I4C హెచ్చరిక',
          tag: 'స్టాక్ ఫ్రాడ్',
          severity: 'critical',
          tactic: 'ప్రముఖ బ్రోకరేజ్ సంస్థల పేరుతో వాట్సాప్ గ్రూపుల్లో చేర్చి, నకిలీ లాభాల స్క్రీన్‌షాట్‌లు చూపిస్తారు. అధిక లాభాల ఆశ చూపి వ్యక్తిగత సేవింగ్స్ ఖాతాలకు డబ్బులు బదిలీ చేయిస్తారు.',
          warningSigns: [
            'వారంలో 200% నుండి 500% గ్యారంటీ లాభాలు లేదా ప్రత్యేక ప్రీ-IPO షేర్ల హామీ',
            'కంపెనీ ఖాతా కాకుండా వ్యక్తుల పేర్లతో ఉన్న సేవింగ్స్ ఖాతాలకు డబ్బు ట్రాన్స్‌ఫర్ చేయమనడం',
            'లాభాలు విత్‌డ్రా చేసుకోవాలంటే అదనపు టాక్స్ లేదా అన్‌లాక్ ఫీజు చెల్లించాలని నిరాకరించడం',
          ],
          safeAction: 'SEBI రిజిస్టర్డ్ బ్రోకర్ల ద్వారా మాత్రమే ట్రేడింగ్ చేయండి. వ్యక్తుల వ్యక్తిగత ఖాతాలకు ఎప్పుడూ పెట్టుబడి డబ్బులు పంపవద్దు.',
          summary: 'టెలిగ్రామ్ స్టాక్ గ్రూప్‌లో 3 రోజుల్లో 300% లాభాలు ఇస్తామని చెప్పి వ్యక్తిగత ఖాతాకు డబ్బులు వేయమంటున్నారు.',
        },
        {
          id: 'ai-voice-clone',
          title: 'AI వాయిస్ క్లోనింగ్ ద్వారా అత్యవసర ప్రమాదం పేరుతో మోసం',
          agency: 'DoT / MHA హెచ్చరిక',
          tag: 'AI వాయిస్ క్లోన్',
          severity: 'high',
          tactic: 'సోషల్ మీడియా వీడియోలలోని వాయిస్‌ను ఉపయోగించి మీ కొడుకు, సోదరుడు లేదా బంధువు వాయిస్‌ను AI ద్వారా తయారుచేసి, యాక్సిడెంట్ లేదా పోలీస్ కస్టడీలో ఉన్నామని భయపెడతారు.',
          warningSigns: [
            'బంధువు గొంతుతో ఏడుస్తూ లేదా భయపడుతూ మాట్లాడటం, వెనుక సైరన్లు లేదా హాస్పిటల్ శబ్దాలు రావడం',
            'అత్యవసరంగా తెలియని నంబర్‌కు ఆస్పత్రి లేదా లాయర్ ఫీజు పేరుతో UPI చేయమనడం',
            'వారి అసలు ఫోన్ నంబర్‌కు తిరిగి కాల్ చేయడానికి అనుమతించకపోవడం',
          ],
          safeAction: 'భయపడకండి. కాల్ కట్ చేసి మీ బంధువు అసలు మొబైల్ నంబర్‌కు లేదా ఇతర కుటుంబ సభ్యులకు కాల్ చేసి ధృవీకరించుకోండి.',
          summary: 'నా కొడుకు గొంతుతోనే ఏడుస్తూ యాక్సిడెంట్ అయిందని, వెంటనే ఆస్పత్రి కోసం UPI ద్వారా డబ్బులు పంపమని కాల్ వచ్చింది.',
        },
        {
          id: 'part-time-job',
          title: 'యూట్యూబ్ లైక్‌లు / రివ్యూ పార్ట్‌టైమ్ జాబ్ మోసం',
          agency: 'I4C బులెటిన్',
          tag: 'ఉద్యోగ మోసం',
          severity: 'high',
          tactic: 'యూట్యూబ్ వీడియోలను లైక్ చేయడం, గూగుల్ మ్యాప్స్‌లో రివ్యూ ఇవ్వడం ద్వారా రోజుకు ₹2,000–₹5,000 సంపాదించవచ్చని వాట్సాప్ మెసేజ్ పంపుతారు. మొదట్లో చిన్న మొత్తం ఇచ్చి నమ్మకం కుదిర్చి భారీగా మోసం చేస్తారు.',
          warningSigns: [
            'విదేశీ కంట్రీ కోడ్‌లు (+62, +84, +234 మొదలైనవి) నుండి ఇంట్లోనే సులభంగా సంపాదించవచ్చనే మెసేజ్‌లు',
            'నమ్మకం కోసం మొదట్లో ₹150–₹500 చెల్లించడం',
            'ఎక్కువ లాభాల కోసం మీరే ముందుగా డిపాజిట్ చేయాలని ప్రీపెయిడ్ టాస్క్‌లు ఇవ్వడం',
          ],
          safeAction: 'ఏ నిజమైన కంపెనీ కూడా డబ్బులు చెల్లిస్తేనే ఉద్యోగం లేదా జీతం ఇస్తామని చెప్పదు. ఇలాంటి నంబర్లను బ్లాక్ చేసి 1930 కి నివేదించండి.',
          summary: 'యూట్యూబ్ వీడియోలు లైక్ చేస్తే డబ్బులు ఇస్తామన్నారు, ఇప్పుడు నా సంపాదన విత్‌డ్రా చేసుకోవాలంటే ముందే డిపాజిట్ చేయమంటున్నారు.',
        },
      ],
    },

    citizenRules: {
      title: 'పౌర చట్టపరమైన హక్కులు & నిబంధనలు',
      badge: 'చట్టపరమైన మార్గదర్శి',
      subtitle: 'RBI జీరో-లయబిలిటీ, BNS 2023 / IT చట్టం మరియు DoT చక్షు పోర్టల్',
      closeButton: 'మూసివేయండి',
      tabs: {
        rbi: 'RBI జీరో-లయబిలిటీ',
        laws: 'BNS 2023 & IT చట్టం',
        sanchar: 'DoT చక్షు పోర్టల్',
        ombudsman: 'RBI అంబుడ్స్‌మన్',
      },
      rbiTitle: 'RBI కస్టమర్ రక్షణ & జీరో-లయబిలిటీ కాలిక్యులేటర్',
      rbiSubtitle: 'రిజర్వ్ బ్యాంక్ ఆఫ్ ఇండియా సర్క్యులర్ DBR.No.Leg.BC.78/09.07.005/2017-18 ప్రకారం, అనధికారిక లావాదేవీల బాధ్యత మీరు నివేదించే సమయంపై ఆధారపడి చట్టబద్ధంగా నిర్ణయించబడుతుంది:',
      txnDateLabel: 'అనధికారిక లావాదేవీ జరిగిన తేదీ:',
      accountTypeLabel: 'ఖాతా / కార్డ్ రకం:',
      accountTypes: {
        savings: 'పొదుపు ఖాతా / ప్రీపెయిడ్ వాలెట్ (సాధారణ సేవింగ్స్)',
        bsbda: 'బేసిక్ సేవింగ్స్ (BSBDA / జన్ ధన్ / రూపే)',
        creditLarge: 'కరెంట్ ఖాతా / క్రెడిట్ కార్డ్ (పరిమితి > ₹5 లక్షలు)',
      },
      liabilityTitle: 'చట్టబద్ధమైన లయబిలిటీ తీర్పు:',
      statutoryClause: 'వర్తించే చట్టపరమైన నిబంధన:',
      formalNoticeDraftTitle: 'బ్యాంక్ నోడల్ ఆఫీసర్‌కు అధికారిక చట్టపరమైన నోటీసు డ్రాఫ్ట్',
      copyNoticeButton: 'అధికారిక నోటీసును కాపీ చేయండి',
      copiedNotice: 'నోటీసు కాపీ చేయబడింది!',
      rbiRulesSummaryTitle: 'RBI చట్టబద్ధమైన మార్గదర్శకాల షెడ్యూల్ (సారాంశం):',
      rbiRules: [
        {
          title: '0 నుండి 3 పనిదినాలు (తక్షణ సమాచారం)',
          liability: '₹0 (పూర్తి జీరో లయబిలిటీ)',
          desc: 'బ్యాంక్ లేదా కస్టమర్ నిర్లక్ష్యం కాకుండా మూడవ వ్యక్తి మోసం వల్ల జరిగితే, కస్టమర్‌కు బాధ్యత సున్నా. బ్యాంక్ 10 పనిదినాల్లో డబ్బును ఖాతాలో తిరిగి జమ చేయాలి.',
        },
        {
          title: '4 నుండి 7 పనిదినాలు (ఆలస్యంగా సమాచారం)',
          liability: 'పరిమిత చట్టబద్ధమైన లయబిలిటీ',
          desc: 'జన్ ధన్ / BSBDA ఖాతాలకు గరిష్టంగా ₹5,000; సాధారణ సేవింగ్స్ ఖాతాలకు గరిష్టంగా ₹10,000; క్రెడిట్ కార్డ్ లేదా కరెంట్ ఖాతాలకు గరిష్టంగా ₹25,000.',
        },
        {
          title: '7 పనిదినాల దాటిన తర్వాత',
          liability: 'బ్యాంక్ బోర్డు ఆమోదించిన విధానం ప్రకారం',
          desc: 'బ్యాంక్ బోర్డు పాలసీ ప్రకారం నిర్ణయించబడుతుంది. అయితే అసంతృప్తిగా ఉంటే ఆర్బీఐ అంబుడ్స్‌మన్‌కు ఫిర్యాదు చేసే పూర్తి హక్కు పౌరునికి ఉంటుంది.',
        },
      ],
      lawsTitle: 'భారతీయ చట్టాలు & సైబర్ క్రైమ్ సెక్షన్లు',
      lawsSubtitle: 'భారతీయ న్యాయ సంహిత (BNS 2023) మరియు ఇన్ఫర్మేషన్ టెక్నాలజీ (IT) చట్టం 2000 నిబంధనలు:',
      lawsList: [
        {
          code: 'BNS సెక్షన్ 318(4) (గతంలో IPC 420)',
          title: 'మోసం మరియు ఆస్తి అప్పగించేలా వంచన చేయడం',
          penalty: '7 సంవత్సరాల వరకు కఠిన కారాగార శిక్ష + జరిమానా',
          desc: 'ఆన్‌లైన్ ఫిషింగ్, నకిలీ పెట్టుబడి స్కామ్‌లు, మోసపూరిత లోన్ యాప్‌లు మరియు UPI మోసాలకు వర్తిస్తుంది.',
        },
        {
          code: 'BNS సెక్షన్ 319 (గతంలో IPC 419)',
          title: 'మరొకరిలా నటిస్తూ మోసగించడం (ఇంపర్సనేషన్)',
          penalty: '3 సంవత్సరాల వరకు జైలు శిక్ష + జరిమానా',
          desc: 'పోలీస్, సీబీఐ, ఈడీ, బ్యాంక్ మేనేజర్లు, కొరియర్ సిబ్బందిలా నటిస్తూ ప్రజలను మోసగించే వారికి వర్తిస్తుంది.',
        },
        {
          code: 'IT చట్టం సెక్షన్ 66C',
          title: 'గుర్తింపు దొంగతనం (Identity Theft)',
          penalty: '3 సంవత్సరాల వరకు జైలు శిక్ష + ₹1,00,000 వరకు జరిమానా',
          desc: 'పాస్‌వర్డ్‌లు, ఆధార్, OTPలు లేదా డిజిటల్ సిగ్నేచర్‌లను దొంగిలించి దుర్వినియోగం చేయడానికి వర్తిస్తుంది.',
        },
        {
          code: 'IT చట్టం సెక్షన్ 66D',
          title: 'కంప్యూటర్ లేదా మొబైల్ సాధనాలతో మరొకరిలా నటిస్తూ మోసం',
          penalty: '3 సంవత్సరాల వరకు జైలు శిక్ష + ₹1,00,000 వరకు జరిమానా',
          desc: 'నకిలీ వెబ్‌సైట్లు, APK ట్రోజన్లు, ఫిషింగ్ లింకులు మరియు సోషల్ ఇంజనీరింగ్ మోసాలకు ప్రాథమిక సెక్షన్.',
        },
      ],
      sancharTitle: 'టెలికాం శాఖ (DoT) అధికారిక పౌర పోర్టల్స్',
      sancharSubtitle: 'సంచార్ సాథీ (sancharsaathi.gov.in) ద్వారా మొబైల్ మరియు టెలికాం మోసాలను అడ్డుకోండి:',
      sancharPortals: [
        {
          name: 'చక్షు పోర్టల్ (Chakshu)',
          badge: 'ఫ్రాడ్ కాల్స్ & SMS రిపోర్ట్',
          desc: 'అనుమానాస్పద కాల్స్, నకిలీ బ్యాంకింగ్ SMSలు, వాట్సాప్ మోసాలు మరియు లాటరీ కాల్స్‌ను నివేదించండి. ప్రభుత్వం ఆ నంబర్లను దేశవ్యాప్తంగా బ్లాక్ చేస్తుంది.',
          actionText: 'చక్షు పోర్టల్ తెరవండి',
          url: 'https://sancharsaathi.gov.in/sfc/',
        },
        {
          name: 'TAFCOP (మీ పేరుతో ఉన్న సిమ్‌లు)',
          badge: 'సిమ్ కార్డుల ధృవీకరణ',
          desc: 'మీ ఆధార్ కార్డుపై ఎన్ని మొబైల్ నంబర్లు యాక్టివ్‌గా ఉన్నాయో తనిఖీ చేయండి. మీకు తెలియకుండా మీ పేరుతో ఉన్న నకిలీ సిమ్‌లను వెంటనే రద్దు చేయండి.',
          actionText: 'TAFCOP తెరవండి',
          url: 'https://tafcop.sancharsaathi.gov.in/',
        },
        {
          name: 'CEIR (పోయిన మొబైల్ బ్లాకింగ్)',
          badge: 'హ్యాండ్‌సెట్ బ్లాక్ చేయండి',
          desc: 'మీ మొబైల్ పోయినా లేదా దొంగిలించబడినా, దాని IMEI నంబర్‌ను దేశవ్యాప్తంగా అన్ని నెట్‌వర్క్‌లలో బ్లాక్ చేసి బ్యాంకింగ్ యాప్స్ దుర్వినియోగం కాకుండా కాపాడండి.',
          actionText: 'CEIR పోర్టల్ తెరవండి',
          url: 'https://ceir.sancharsaathi.gov.in/',
        },
      ],
      ombudsmanTitle: 'RBI ఇంటిగ్రేటెడ్ అంబుడ్స్‌మన్ పథకం (2021)',
      ombudsmanSubtitle: 'బ్యాంక్ సమస్యను పరిష్కరించకపోతే రిజర్వ్ బ్యాంక్ ఆఫ్ ఇండియాకు ఫిర్యాదు చేసే విధానం:',
      ombudsmanSteps: [
        {
          step: 'దశ 1: బ్యాంక్‌లో అధికారిక ఫిర్యాదు',
          title: 'బ్రాంచ్ మేనేజర్ / నోడల్ ఆఫీసర్‌కు లిఖితపూర్వక నోటీసు',
          desc: 'బ్యాంక్‌లో ఫిర్యాదు చేసి గ్రీవెన్స్ రిఫరెన్స్ నంబర్ తీసుకోండి. బ్యాంక్ స్టేట్‌మెంట్ మరియు 1930 రశీదును భద్రపరచండి.',
        },
        {
          step: 'దశ 2: 30 రోజుల పరిష్కార వ్యవధి',
          title: 'బ్యాంక్ దర్యాప్తు చేసి పరిష్కరించాలి',
          desc: 'బ్యాంకులకు 30 రోజుల గడువు ఉంటుంది. ఆర్బీఐ నిబంధనల ప్రకారం 10 పనిదినాల్లో తాత్కాలిక క్రెడిట్ ఇవ్వాలి.',
        },
        {
          step: 'దశ 3: ఆర్బీఐ అంబుడ్స్‌మన్‌కు అప్పీల్',
          title: 'ఆర్బీఐ CMS పోర్టల్‌లో ఫిర్యాదు (cms.rbi.org.in)',
          desc: 'బ్యాంక్ తిరస్కరించినా లేదా 30 రోజుల్లో స్పందించకపోయినా, ఎటువంటి ఖర్చు లేకుండా నేరుగా ఆర్బీఐ అంబుడ్స్‌మన్‌కు ఆన్‌లైన్‌లో ఫిర్యాదు చేయవచ్చు.',
        },
      ],
      cmsPortalLabel: 'ఆర్బీఐ కంప్లయింట్ మేనేజ్‌మెంట్ పోర్టల్ (CMS): cms.rbi.org.in',
      helplineFooter: 'చట్టబద్ధమైన అప్పీల్: ఆర్బీఐ అంబుడ్స్‌మన్ (cms.rbi.org.in) · సైబర్ క్రైమ్ హెల్ప్‌లైన్: 1930',
    },
  },

  // ── HINDI (हिन्दी) ────────────────────────────────────────────────────────
  hi: {
    emergencyWizard: {
      title: 'आपातकालीन सहायता विज़ार्ड',
      goldenHourBadge: 'गोल्डन ऑवर',
      subtitle: 'वित्तीय साइबर धोखाधड़ी के पहले 60 मिनट में उठाने योग्य अनिवार्य कदम',
      close: 'बंद करें',
      tabs: {
        checklist: 'गोल्डन ऑवर चेकलिस्ट',
        banks: 'बैंक खाते फ्रीज़ करें',
        fir: '1930 साइबर FIR बनाएं',
      },
      checklistTitle: 'गोल्डन ऑवर चेकलिस्ट (पहले 60 मिनट)',
      checklistDesc: 'यदि आपके खाते से धोखे से पैसे कटे हैं, तो तुरंत इन 4 कदमों का पालन करें ताकि पैसे निकाले जाने से पहले रुक सकें:',
      checklistSteps: [
        {
          title: '1930 नेशनल साइबर हेल्पलाइन पर तुरंत कॉल करें',
          desc: 'राष्ट्रीय साइबर अपराध रिपोर्टिंग पोर्टल की हेल्पलाइन। ऑपरेटर तुरंत बैंक नोडल अधिकारियों को अलर्ट कर फ्रॉड खाते या वॉलेट को तत्काल फ्रीज़ करवाता है।',
          highlight: 'निःशुल्क व 24x7 सभी टेलीकॉम ऑपरेटरों पर उपलब्ध',
          actionText: 'अभी 1930 पर कॉल करें',
          actionUrl: 'tel:1930',
          isTel: true,
        },
        {
          title: 'अपने बैंक में आपातकालीन फ्रीज़ करवाएं',
          desc: 'अपने बैंक के कस्टमर केयर पर कॉल करें या मोबाइल बैंकिंग से डेबिट कार्ड, यूपीआई और नेट बैंकिंग तुरंत ब्लॉक करें।',
          highlight: 'आगे होने वाले अनधिकृत लेन-देन को रोकता है',
        },
        {
          title: 'लेन-देन विवरण (UTR / रेफरेंस नंबर) एकत्र करें',
          desc: 'तारीख, सटीक समय, राशि, 12 अंकों का UTR नंबर, धोखेबाज का मोबाइल नंबर या यूपीआई आईडी सुरक्षित रखें।',
          highlight: '1930 ट्रैकिंग व पुलिस FIR के लिए अति आवश्यक',
        },
        {
          title: 'cybercrime.gov.in पर औपचारिक रिपोर्ट दर्ज करें',
          desc: 'राष्ट्रीय पोर्टल पर शिकायत दर्ज करें। बैंक स्टेटमेंट, चैट स्क्रीनशॉट अपलोड करें और पावती संख्या (Acknowledgement) सुरक्षित रखें।',
          highlight: 'RBI नियमों के तहत पूर्ण कानूनी सुरक्षा प्रदान करता है',
          actionText: 'cybercrime.gov.in खोलें',
          actionUrl: 'https://cybercrime.gov.in',
        },
      ],
      searchBankPlaceholder: 'बैंक का नाम या टोल-फ्री नंबर खोजें (उदा. SBI, HDFC, ICICI)...',
      freezeNotice: 'तुरंत अपने बैंक को कॉल कर कहें: "साइबर फ्रॉड के कारण मेरे खाते से अनधिकृत लेन-देन हुआ है, कृपया खाते के सभी डिजिटल लेनदेन तत्काल फ्रीज़ करें।"',
      tollFreeBadge: '24/7 टोल फ्री',
      copyNumber: 'नंबर कॉपी करें',
      copied: 'कॉपी हो गया!',
      freezeActionLabel: 'आपातकालीन फ्रीज़ प्रक्रिया',
      officialPortalLabel: 'बैंक आधिकारिक पोर्टल',
      firHeading: '1930 / पुलिस शिकायत पत्र (FIR ड्राफ्ट)',
      firSubheading: 'IT एक्ट धारा 66D और RBI सर्कुलर के तहत तैयार आधिकारिक शिकायत पत्र बनाएं:',
      fields: {
        victimName: 'शिकायतकर्ता / खाताधारक का नाम *',
        victimNamePlaceholder: 'उदा. रमेश कुमार',
        incidentDate: 'घटना की तारीख *',
        incidentTime: 'घटना का समय *',
        fraudType: 'साइबर अपराध का प्रकार *',
        amountLost: 'धोखाधड़ी में गई राशि (₹) *',
        amountLostPlaceholder: 'उदा. 45000',
        bankName: 'आपका बैंक / पेमेंट ऐप *',
        bankNamePlaceholder: 'उदा. स्टेट बैंक ऑफ इंडिया',
        suspectContact: 'धोखेबाज का फोन / व्हाट्सएप / टेलीग्राम',
        suspectContactPlaceholder: 'उदा. +91 98765 43210',
        suspectAccountOrUpi: 'धोखेबाज का बैंक खाता या UPI ID',
        suspectAccountOrUpiPlaceholder: 'उदा. fraudster@upi',
        transactionRef: 'UTR / लेन-देन रेफरेंस नंबर',
        transactionRefPlaceholder: 'उदा. 405623984125',
        description: 'घटना का संक्षिप्त विवरण *',
        descriptionPlaceholder: 'उदा. सीबीआई अधिकारी बनकर फोन आया और डिजिटल अरेस्ट की धमकी देकर पैसे ट्रांसफर करवाए...',
      },
      generateFirButton: 'शिकायत ड्राफ्ट तैयार करें',
      firGeneratedNotice: 'cybercrime.gov.in और बैंक नोडल ऑफिसर को भेजने हेतु तैयार:',
      copyStatement: 'शिकायत पत्र कॉपी करें',
      copiedStatement: 'क्लिपबोर्ड पर कॉपी किया गया!',
      helplineFooter: 'राष्ट्रीय साइबर अपराध हेल्पलाइन: 1930 (टोल-फ्री, 24x7)',
    },

    linkInspector: {
      title: 'लिंक और APK जांच टूल',
      subtitle: 'फर्जी बैंकिंग डोमेन, ब्रांड स्पूफिंग और खतरनाक APK फाइलों की तुरंत जांच करें',
      inputLabel: 'वेबसाइट लिंक, डोमेन या APK डाउनलोड URL यहां पेस्ट करें:',
      inputPlaceholder: 'उदा. sbi-kyc-update.xyz या bijli-bill.top/app.apk',
      inspectButton: 'लिंक की जांच करें',
      analyzingButton: 'विश्लेषण हो रहा है...',
      quickTestLabel: 'त्वरित परीक्षण:',
      samples: [
        { label: 'फर्जी SBI KYC', url: 'http://sbi-kyc-pan-update.xyz/login.html' },
        { label: 'बिजली बिल APK फ्रॉड', url: 'https://bijli-bill-cutoff.top/Mahavitaran_Update.apk' },
        { label: 'लॉटरी लिंक', url: 'bit.ly/claim-lottery-crore' },
        { label: 'आधिकारिक पोर्टल (सुरक्षित)', url: 'https://cybercrime.gov.in' },
      ],
      riskScoreLabel: 'जोखिम स्कोर',
      redFlagsTitle: 'पहचाने गए खतरे',
      recommendationsTitle: 'सुरक्षात्मक सुझाव',
      helplineText: 'आधिकारिक हेल्पलाइन: 1930',
      closeButton: 'बंद करें',
    },

    trendingAlerts: {
      title: 'सक्रिय साइबर अलर्ट और एडवाइजरी',
      badge: 'लाइव बुलेटिन',
      subtitle: 'I4C, CERT-In और गृह मंत्रालय की आधिकारिक चेतावनियां',
      tip: 'नीचे किसी भी अलर्ट पर "साइबर रक्षक में जांचें" पर क्लिक करके सीधे स्कैनर में परीक्षण करें।',
      testInCyberRakshak: 'साइबर रक्षक में जांचें',
      keyWarningSigns: 'प्रमुख चेतावनी संकेत:',
      officialSafeAction: 'आधिकारिक सुरक्षित कदम:',
      sourceLabel: 'स्रोत:',
      helplineFooter: 'राष्ट्रीय साइबर हेल्पलाइन: 1930 · cybercrime.gov.in',
      closeButton: 'बंद करें',
      alerts: [
        {
          id: 'digital-arrest',
          title: 'फर्जी सीबीआई, ईडी या पुलिस अधिकारियों का "डिजिटल अरेस्ट" फ्रॉड',
          agency: 'गृह मंत्रालय / I4C अलर्ट',
          tag: 'डिजिटल अरेस्ट',
          severity: 'critical',
          tactic: 'धोखेबाज पुलिस या कस्टम्स वर्दी में वीडियो कॉल कर दावा करते हैं कि आपके आधार से नशीले पदार्थों का पार्सल पकड़ा गया है और आपको डिजिटल अरेस्ट में रखकर पैसे ट्रांसफर करवाते हैं।',
          warningSigns: [
            'व्हाट्सएप या स्काइप पर पुलिस स्टेशन या आधिकारिक लोगो दिखाते हुए वीडियो कॉल',
            'बिना किसी से संपर्क किए 24 घंटे कैमरे के सामने रहने का दबाव',
            'सत्यापन के नाम पर पैसे सरकारी खातों में ट्रांसफर करने की मांग',
          ],
          safeAction: 'तुरंत कॉल काटें। भारत में कोई भी पुलिस या अदालत वीडियो कॉल पर गिरफ़्तारी या जांच नहीं करती। 1930 पर शिकायत करें।',
          summary: 'सीबीआई या पुलिस अधिकारी बनकर वीडियो कॉल आया और आधार अवैध पार्सल में फंसा होने का झांसा देकर डिजिटल अरेस्ट की धमकी दी।',
        },
        {
          id: 'electricity-apk',
          title: 'बिजली बिल कटने का संदेश और APK मैलवेयर फ्रॉड',
          agency: 'CERT-In एडवाइजरी',
          tag: 'खतरनाक APK',
          severity: 'critical',
          tactic: '"प्रिय उपभोक्ता, आपका बिजली बिल बकाया होने के कारण आज रात 9:30 बजे बिजली काट दी जाएगी। तुरंत लिंक से APK अपडेट करें" जैसे संदेश भेजे जाते हैं।',
          warningSigns: [
            'व्यक्तिगत मोबाइल नंबर से तत्काल बिजली कटने का संदेश आना',
            'लिंक के अंत में .apk होना या बाहरी वेबसाइटों से ऐप डाउनलोड करने को कहना',
            'ऐप इंस्टॉल होते ही एसएमएस और स्क्रीन परमिशन मांगना',
          ],
          safeAction: 'एसएमएस या व्हाट्सएप पर आई APK फाइल कभी इंस्टॉल न करें। बिजली बिल केवल आधिकारिक पोर्टल या BBPS से ही भरें।',
          summary: 'बिजली बिल न भरने पर आज रात बिजली काटने का मैसेज आया और APK लिंक डाउनलोड करने को कहा गया।',
        },
        {
          id: 'trading-pre-ipo',
          title: 'व्हाट्सएप व टेलीग्राम पर फर्जी स्टॉक निवेश व प्री-IPO घोटाला',
          agency: 'SEBI व I4C अलर्ट',
          tag: 'शेयर फ्रॉड',
          severity: 'critical',
          tactic: 'नामी ब्रोकरेज फर्म के नाम से व्हाट्सएप ग्रुप बनाकर भारी मुनाफे के फर्जी स्क्रीनशॉट दिखाए जाते हैं और व्यक्तिगत खातों में पैसे डलवाए जाते हैं।',
          warningSigns: [
            'हफ्ते में 200% से 500% मुनाफे की गारंटी या प्री-IPO शेयर का लालच',
            'कंपनी खाते के बजाय किसी अनजान व्यक्ति के सेविंग्स अकाउंट में पैसे डलवाना',
            'पैसे निकालने पर टैक्स या अनलॉकिंग फीस के नाम पर और पैसे मांगना',
          ],
          safeAction: 'केवल सेबी पंजीकृत ब्रोकर्स के जरिए ही निवेश करें। किसी व्यक्तिगत खाते में कभी पैसे न भेजें।',
          summary: 'टेलीग्राम ग्रुप में 3 दिन में 300% गारंटीड मुनाफे का झांसा देकर व्यक्तिगत खाते में पैसे ट्रांसफर करने को कहा गया।',
        },
        {
          id: 'ai-voice-clone',
          title: 'AI वॉयस क्लोनिंग द्वारा आपातकालीन दुर्घटना फ्रॉड',
          agency: 'DoT / MHA चेतावनी',
          tag: 'AI वॉयस क्लोन',
          severity: 'high',
          tactic: 'सोशल मीडिया से आवाज कॉपी कर बेटे या रिश्तेदार की हूबहू आवाज बनाकर एक्सीडेंट या पुलिस में फंसने की बात कहकर तुरंत पैसे मांगे जाते हैं।',
          warningSigns: [
            'रोती या घबराई हुई आवाज में परिचित की आवाज आना और पृष्ठभूमि में सायरन की आवाज होना',
            'अस्पताल या वकील के नाम पर तुरंत यूपीआई से पैसे भेजने की मांग',
            'उनके मूल नंबर पर वापस कॉल करने से रोकना',
          ],
          safeAction: 'घबराएं नहीं। फोन काटकर रिश्तेदार के असली नंबर पर फोन कर पुष्टि करें।',
          summary: 'बेटे की आवाज में फोन आया कि उसका एक्सीडेंट हो गया है और तुरंत अस्पताल के लिए यूपीआई से पैसे भेजें।',
        },
        {
          id: 'part-time-job',
          title: 'यूट्यूब लाइक व होटल रिव्यू पार्ट-टाइम जॉब फ्रॉड',
          agency: 'I4C बुलेटिन',
          tag: 'जॉब फ्रॉड',
          severity: 'high',
          tactic: 'यूट्यूब वीडियो लाइक करने पर रोज 2000-5000 रुपये देने का वादा कर पहले थोड़ा पैसा देकर विश्वास जीता जाता है, फिर प्रीपेड टास्क के नाम पर लाखों ठग लिए जाते हैं।',
          warningSigns: [
            'विदेशी नंबरों (+62, +84 आदि) से वर्क फ्रॉम होम के लुभावने संदेश',
            'शुरुआत में विश्वास दिलाने के लिए 200-500 रुपये भेजना',
            'बाद में कमाई निकालने के लिए पहले पैसे जमा करने का दबाव बनाना',
          ],
          safeAction: 'कोई भी वैध कंपनी काम देने या वेतन देने के लिए पैसे नहीं मांगती। नंबर ब्लॉक करें व 1930 पर रिपोर्ट करें।',
          summary: 'यूट्यूब वीडियो लाइक करने का काम दिया और अब पैसे निकालने के लिए पहले खुद का पैसा जमा करने को कह रहे हैं।',
        },
      ],
    },

    citizenRules: {
      title: 'नागरिक कानूनी अधिकार व नियम',
      badge: 'संवैधानिक गाइड',
      subtitle: 'RBI ज़ीरो-लायबिलिटी, BNS 2023 / IT एक्ट और DoT चक्षु पोर्टल',
      closeButton: 'बंद करें',
      tabs: {
        rbi: 'RBI ज़ीरो-लायबिलिटी',
        laws: 'BNS 2023 व IT एक्ट',
        sanchar: 'DoT चक्षु पोर्टल',
        ombudsman: 'RBI ओंबुड्समैन',
      },
      rbiTitle: 'RBI ग्राहक सुरक्षा व ज़ीरो-लायबिलिटी कैलकुलेटर',
      rbiSubtitle: 'भारतीय रिज़र्व बैंक के सर्कुलर DBR.No.Leg.BC.78/09.07.005/2017-18 के अनुसार अनधिकृत लेनदेन पर आपकी देनदारी रिपोर्ट करने के समय पर तय होती है:',
      txnDateLabel: 'अनधिकृत लेनदेन की तारीख:',
      accountTypeLabel: 'खाता / कार्ड का प्रकार:',
      accountTypes: {
        savings: 'बचत खाता / प्रीपेड वॉलेट (मानक)',
        bsbda: 'मूल बचत (BSBDA / जन धन / RuPay)',
        creditLarge: 'चालू खाता / क्रेडिट कार्ड (सीमा > 5 लाख)',
      },
      liabilityTitle: 'कानूनी देनदारी निर्णय:',
      statutoryClause: 'संबंधित कानूनी नियम:',
      formalNoticeDraftTitle: 'बैंक नोडल अधिकारी हेतु कानूनी नोटिस ड्राफ्ट बनाएं',
      copyNoticeButton: 'नोटिस कॉपी करें',
      copiedNotice: 'नोटिस कॉपी हो गया!',
      rbiRulesSummaryTitle: 'RBI के कानूनी नियम (संक्षिप्त विवरण):',
      rbiRules: [
        {
          title: '0 से 3 कार्य दिवस (तत्काल सूचना)',
          liability: '₹0 (शून्य देनदारी)',
          desc: 'यदि धोखाधड़ी तीसरे पक्ष की वजह से हुई है जिसमें न तो बैंक की गलती है न ग्राहक की, तो ग्राहक की देनदारी बिल्कुल शून्य होगी। बैंक 10 दिनों में पैसे वापस करेगा।',
        },
        {
          title: '4 से 7 कार्य दिवस (देर से सूचना)',
          liability: 'सीमित कानूनी देनदारी',
          desc: 'जन धन खातों पर अधिकतम ₹5,000; बचत खातों पर अधिकतम ₹10,000; चालू व बड़े क्रेडिट कार्डों पर अधिकतम ₹25,000।',
        },
        {
          title: '7 कार्य दिवस के बाद',
          liability: 'बैंक बोर्ड की नीति अनुसार',
          desc: 'बैंक नीति अनुसार निर्णय लिया जाएगा, परंतु ग्राहक को असंतोष होने पर सीधे RBI ओंबुड्समैन में जाने का पूरा अधिकार है।',
        },
      ],
      lawsTitle: 'भारतीय दंड संहिता व साइबर कानून',
      lawsSubtitle: 'भारतीय न्याय संहिता (BNS 2023) और सूचना प्रौद्योगिकी (IT) अधिनियम 2000 के प्रावधान:',
      lawsList: [
        {
          code: 'BNS धारा 318(4) (पूर्व में IPC 420)',
          title: 'धोखाधड़ी और बेईमानी से संपत्ति प्राप्त करना',
          penalty: '7 वर्ष तक का कठोर कारावास + जुर्माना',
          desc: 'ऑनलाइन फ़िशिंग, फ़र्ज़ी निवेश, अवैध लोन ऐप व अनधिकृत यूपीआई लेनदेन पर लागू होती है।',
        },
        {
          code: 'BNS धारा 319 (पूर्व में IPC 419)',
          title: 'प्रतिरूपण (भेष बदलकर) द्वारा धोखाधड़ी',
          penalty: '3 वर्ष तक का कारावास + जुर्माना',
          desc: 'पुलिस, सीबीआई, बैंक अधिकारी या कूरियर कर्मचारी बनकर ठगने वालों पर लगाई जाती है।',
        },
        {
          code: 'IT एक्ट धारा 66C',
          title: 'पहचान की चोरी (Identity Theft)',
          penalty: '3 वर्ष तक का कारावास + 1 लाख रुपये तक जुर्माना',
          desc: 'पासवर्ड, आधार, ओटीपी या डिजिटल हस्ताक्षर चुराकर उपयोग करने पर लागू होती है।',
        },
        {
          code: 'IT एक्ट धारा 66D',
          title: 'कंप्यूटर संसाधन के जरिए प्रतिरूपण कर ठगी',
          penalty: '3 वर्ष तक का कारावास + 1 लाख रुपये तक जुर्माना',
          desc: 'फ़र्ज़ी वेबसाइट, मैलवेयर एपीके व फ़िशिंग लिंक के माध्यम से ठगी करने पर मुख्य धारा।',
        },
      ],
      sancharTitle: 'दूरसंचार विभाग (DoT) के नागरिक पोर्टल',
      sancharSubtitle: 'संचार साथी (sancharsaathi.gov.in) के माध्यम से अपनी पहचान सुरक्षित रखें:',
      sancharPortals: [
        {
          name: 'चक्षु पोर्टल (Chakshu)',
          badge: 'फ्रॉड कॉल व SMS रिपोर्ट',
          desc: 'संदिग्ध कॉल, फर्जी एसएमएस, व्हाट्सएप स्पूफिंग व लॉटरी कॉल की शिकायत दर्ज करें। सरकार इन नंबरों को ब्लॉक करती है।',
          actionText: 'चक्षु पोर्टल खोलें',
          url: 'https://sancharsaathi.gov.in/sfc/',
        },
        {
          name: 'TAFCOP (आपके नाम पर कितने सिम हैं)',
          badge: 'सिम कार्ड सत्यापन',
          desc: 'अपने आधार पर चालू सभी मोबाइल नंबर जांचें और बिना जानकारी के चल रहे फर्जी सिम तुरंत बंद करवाएं।',
          actionText: 'TAFCOP खोलें',
          url: 'https://tafcop.sancharsaathi.gov.in/',
        },
        {
          name: 'CEIR (खोया हुआ मोबाइल ब्लॉक करें)',
          badge: 'हैंडसेट ब्लॉकिंग',
          desc: 'खोए या चोरी हुए मोबाइल फोन का IMEI ब्लॉक करें ताकि उसका व बैंकिंग ऐप्स का दुरुपयोग न हो सके।',
          actionText: 'CEIR पोर्टल खोलें',
          url: 'https://ceir.sancharsaathi.gov.in/',
        },
      ],
      ombudsmanTitle: 'RBI एकीकृत लोकपाल (ओंबुड्समैन) योजना (2021)',
      ombudsmanSubtitle: 'बैंक द्वारा समस्या न सुलझाने पर भारतीय रिज़र्व बैंक में शिकायत कैसे करें:',
      ombudsmanSteps: [
        {
          step: 'चरण 1: बैंक में औपचारिक शिकायत',
          title: 'शाखा प्रबंधक / नोडल अधिकारी को लिखित सूचना',
          desc: 'बैंक में लिखित शिकायत देकर पावती (Grievance Ref Number) लें। 1930 की पावती सुरक्षित रखें।',
        },
        {
          step: 'चरण 2: 30 दिनों का समय',
          title: 'बैंक को समाधान का अवसर',
          desc: 'बैंक के पास 30 दिन का समय होता है। RBI नियमों के अनुसार 10 दिनों में अनंतिम क्रेडिट मिलना चाहिए।',
        },
        {
          step: 'चरण 3: RBI ओंबुड्समैन में अपील',
          title: 'RBI CMS पोर्टल पर निःशुल्क शिकायत (cms.rbi.org.in)',
          desc: 'यदि बैंक 30 दिन में जवाब न दे या समाधान न करे, तो बिना किसी शुल्क के सीधे RBI लोकपाल को ऑनलाइन शिकायत भेजें।',
        },
      ],
      cmsPortalLabel: 'RBI शिकायत प्रबंधन पोर्टल (CMS): cms.rbi.org.in',
      helplineFooter: 'कानूनी अपील: RBI ओंबुड्समैन (cms.rbi.org.in) · साइबर क्राइम हेल्पलाइन: 1930',
    },
  },

  // ── TAMIL (தமிழ்) ──────────────────────────────────────────────────────────
  ta: {
    emergencyWizard: {
      title: 'அவசர நடவடிக்கை வழிகாட்டி',
      goldenHourBadge: 'கோல்டன் ஹவர்',
      subtitle: 'நிதி இணைய மோசடி நடந்த முதல் 60 நிமிடங்களுக்குள் எடுக்க வேண்டிய அவசர நடவடிக்கைகள்',
      close: 'மூடுக',
      tabs: {
        checklist: 'கோல்டன் ஹவர் பட்டியல்',
        banks: 'வங்கி கணக்குகளை முடக்குக',
        fir: '1930 சைபர் FIR உருவாக்கு',
      },
      checklistTitle: 'கோல்டன் ஹவர் சரிபார்ப்பு பட்டியல் (முதல் 60 நிமிடங்கள்)',
      checklistDesc: 'உங்கள் கணக்கிலிருந்து பணம் திருடப்பட்டால், குற்றவாளிகள் பணத்தை எடுப்பதற்குள் உடனடியாக இந்த 4 படிகளைச் செய்யுங்கள்:',
      checklistSteps: [
        {
          title: '1930 சைபர் க்ரைம் உதவி எண்ணை உடனடியாக அழைக்கவும்',
          desc: 'தேசிய சைபர் கிரைம் போர்டல் உதவி எண். ஆப்பரேட்டர் உடனடியாக வங்கி அதிகாரிகளைத் தொடர்பு கொண்டு பணப்பரிமாற்றத்தை நிறுத்துவார்.',
          highlight: 'கட்டணமில்லா 24x7 சேவை',
          actionText: 'இப்போது 1930 ஐ அழைக்கவும்',
          actionUrl: 'tel:1930',
          isTel: true,
        },
        {
          title: 'உங்கள் வங்கியில் அவசர கணக்கு முடக்கம்',
          desc: 'வங்கி வாடிக்கையாளர் சேவைக்கு அழைத்து டெபிட் கார்டு, நெட் பேங்கிங், UPI ஐ உடனடியாக பிளாக் செய்யவும்.',
          highlight: 'கூடுதல் பண இழப்பைத் தடுக்கிறது',
        },
        {
          title: 'பரிவர்த்தனை UTR எண்களைச் சேகரிக்கவும்',
          desc: 'தேதி, நேரம், தொகை, 12 இலக்க UTR எண், மோசடி நபரின் எண் அல்லது UPI ஐ பாதுகாப்பாகக் குறிக்கவும்.',
          highlight: 'போலீஸ் FIR க்கு மிகவும் முக்கியமானது',
        },
        {
          title: 'cybercrime.gov.in இல் புகார் அளிக்கவும்',
          desc: 'தேசிய போர்ட்டலில் புகார் பதிவு செய்து வங்கி அறிக்கைகளை பதிவேற்றி ஒப்புகைச் சீட்டைப் பெறுங்கள்.',
          highlight: 'RBI விதிகளின்படி முழு சட்டப் பாதுகாப்பு',
          actionText: 'cybercrime.gov.in திறக்கவும்',
          actionUrl: 'https://cybercrime.gov.in',
        },
      ],
      searchBankPlaceholder: 'வங்கி பெயர் அல்லது கட்டணமில்லா எண்ணைத் தேடுங்கள்...',
      freezeNotice: 'உங்கள் வங்கி உதவி எண்ணை அழைத்து கணக்கையும் டிஜிட்டல் பரிவர்த்தனைகளையும் உடனடியாக முடக்குமாறு கோருங்கள்.',
      tollFreeBadge: '24/7 இலவச அழைப்பு',
      copyNumber: 'எண்ணை நகலெடு',
      copied: 'நகலெடுக்கப்பட்டது!',
      freezeActionLabel: 'அவசர முடக்க நடவடிக்கை',
      officialPortalLabel: 'வங்கி அதிகாரப்பூர்வ தளம்',
      firHeading: '1930 / காவல் துறை புகார் கடிதம் (FIR வரைவு)',
      firSubheading: 'IT சட்டம் பிரிவு 66D மற்றும் RBI வழிகாட்டுதலின்படி தயார் செய்யப்பட்ட புகார் படிவம்:',
      fields: {
        victimName: 'பாதிக்கப்பட்டவர் / கணக்கு உரிமையாளர் பெயர் *',
        victimNamePlaceholder: 'எ.கா. ரமேஷ் குமார்',
        incidentDate: 'சம்பவம் நடந்த தேதி *',
        incidentTime: 'சம்பவம் நடந்த நேரம் *',
        fraudType: 'மோசடி வகை *',
        amountLost: 'இழந்த தொகை (₹) *',
        amountLostPlaceholder: 'எ.கா. 45000',
        bankName: 'உங்கள் வங்கி / பேமெண்ட் ஆப் *',
        bankNamePlaceholder: 'எ.கா. ஸ்டேட் பாங்க் ஆஃப் இந்தியா',
        suspectContact: 'மோசடி நபரின் தொலைபேசி / வாட்ஸ்அப்',
        suspectContactPlaceholder: 'எ.கா. +91 98765 43210',
        suspectAccountOrUpi: 'மோசடி நபரின் UPI அல்லது வங்கி கணக்கு',
        suspectAccountOrUpiPlaceholder: 'எ.கா. fraudster@upi',
        transactionRef: 'UTR / பரிவர்த்தனை குறிப்பு எண்',
        transactionRefPlaceholder: 'எ.கா. 405623984125',
        description: 'சம்பவ விளக்கம் *',
        descriptionPlaceholder: 'எ.கா. போலீஸ் எனக்கூறி வீடியோ அழைப்பு விடுத்து மிரட்டி பணத்தை அனுப்பச் செய்தனர்...',
      },
      generateFirButton: 'புகார் வரைவை உருவாக்கு',
      firGeneratedNotice: 'cybercrime.gov.in மற்றும் வங்கிக்கு சமர்ப்பிக்க தயார்:',
      copyStatement: 'புகாரை நகலெடு',
      copiedStatement: 'நகலெடுக்கப்பட்டது!',
      helplineFooter: 'தேசிய சைபர் கிரைம் உதவி எண்: 1930 (கட்டணமில்லா, 24x7)',
    },

    linkInspector: {
      title: 'இணைப்பு & APK ஆய்வு கருவி',
      subtitle: 'போலி வங்கி இணையதளங்கள் மற்றும் தீங்கிழைக்கும் APK கோப்புகளைக் கண்டறியவும்',
      inputLabel: 'இணையதள இணைப்பு, டொமைன் அல்லது APK பதிவிறக்க URL ஐ உள்ளிடவும்:',
      inputPlaceholder: 'எ.கா. sbi-kyc-update.xyz அல்லது bijli-bill.top/app.apk',
      inspectButton: 'ஆய்வு செய்',
      analyzingButton: 'ஆய்வு செய்கிறது...',
      quickTestLabel: 'விரைவு சோதனை:',
      samples: [
        { label: 'போலி SBI KYC', url: 'http://sbi-kyc-pan-update.xyz/login.html' },
        { label: 'மின்சார கட்டண APK மோசடி', url: 'https://bijli-bill-cutoff.top/Mahavitaran_Update.apk' },
        { label: 'லாட்டரி இணைப்பு', url: 'bit.ly/claim-lottery-crore' },
        { label: 'அதிகாரப்பூர்வ தளம் (பாதுகாப்பானது)', url: 'https://cybercrime.gov.in' },
      ],
      riskScoreLabel: 'அபாய அளவு',
      redFlagsTitle: 'கண்டறியப்பட்ட அபாயங்கள்',
      recommendationsTitle: 'பரிந்துரைக்கப்படும் பாதுகாப்பு நடவடிக்கைகள்',
      helplineText: 'அதிகாரப்பூர்வ உதவி எண்: 1930',
      closeButton: 'மூடுக',
    },

    trendingAlerts: {
      title: 'சைபர் மோசடி எச்சரிக்கைகள்',
      badge: 'நேரலை அறிவிப்புகள்',
      subtitle: 'I4C, CERT-In மற்றும் உள்துறை அமைச்சகத்தின் அதிகாரப்பூர்வ எச்சரிக்கைகள்',
      tip: 'எந்தவொரு எச்சரிக்கையிலும் "சைபர் ரக்ஷக்கில் சோதிக்கவும்" என்பதைக் கிளிக் செய்து நேரடியாக சோதிக்கவும்.',
      testInCyberRakshak: 'சைபர் ரக்ஷக்கில் சோதிக்கவும்',
      keyWarningSigns: 'முக்கிய எச்சரிக்கை அறிகுறிகள்:',
      officialSafeAction: 'அதிகாரப்பூர்வ பாதுகாப்பு நடவடிக்கை:',
      sourceLabel: 'மூலம்:',
      helplineFooter: 'தேசிய சைபர் உதவி எண்: 1930 · cybercrime.gov.in',
      closeButton: 'மூடுக',
      alerts: [
        {
          id: 'digital-arrest',
          title: 'போலி சிபிஐ, போலீஸ் அதிகாரிகளின் "டிஜிட்டல் கைது" மோசடி',
          agency: 'MHA / I4C எச்சரிக்கை',
          tag: 'டிஜிட்டல் கைது',
          severity: 'critical',
          tactic: 'போலீஸ் சீருடையில் வீடியோ அழைப்பு செய்து, உங்கள் ஆதார் சட்டவிரோத செயலில் சிக்கியுள்ளதாகக் கூறி டிஜிட்டல் கைது செய்து பணம் பறிப்பார்கள்.',
          warningSigns: [
            'வாட்ஸ்அப் அல்லது ஸ்கைப்பில் போலீஸ் நிலையம் போல் காட்டி வீடியோ அழைப்பு',
            '24 மணி நேரமும் கேமரா முன் இருக்க வேண்டும் என்று அச்சுறுத்துதல்',
            'சரிபார்ப்புக்காக பணத்தை அரசு கணக்கிற்கு அனுப்பக் கோருதல்',
          ],
          safeAction: 'உடனடியாக அழைப்பைத் துண்டிக்கவும். இந்தியாவில் எந்த காவல் அமைப்பும் வீடியோ அழைப்பில் கைது செய்யாது. 1930 ஐ அழைக்கவும்.',
          summary: 'போலீஸ் அல்லது சிபிஐ எனக் கூறி வீடியோ அழைப்பில் மிரட்டி டிஜிட்டல் கைது செய்வதாகக் கூறினர்.',
        },
        {
          id: 'electricity-apk',
          title: 'மின் கட்டண பாக்கி பெயரில் APK மால்வேர் மோசடி',
          agency: 'CERT-In எச்சரிக்கை',
          tag: 'தீங்கிழைக்கும் APK',
          severity: 'critical',
          tactic: 'மின் கட்டணம் செலுத்தாததால் இன்றிரவு மின்சாரம் துண்டிக்கப்படும் என்று கூறி APK இணைப்பை அனுப்பி ஏமாற்றுவார்கள்.',
          warningSigns: [
            'தனிநபர் எண்ணிலிருந்து மின்சாரம் துண்டிக்கப்படும் என்ற அவசர செய்தி',
            '.apk இல் முடியும் இணைப்பு அல்லது மூன்றாம் தரப்பு தளங்களில் இருந்து பதிவிறக்கக் கோருதல்',
            'ஆப் நிறுவியவுடன் எஸ்எம்எஸ் அனுமதிகளைக் கோருதல்',
          ],
          safeAction: 'எஸ்எம்எஸ் அல்லது வாட்ஸ்அப்பில் வரும் APK கோப்புகளை ஒருபோதும் நிறுவ வேண்டாம். அதிகாரப்பூர்வ தளம் வழியாகவே கட்டணம் செலுத்தவும்.',
          summary: 'மின்சாரம் துண்டிக்கப்படும் என்று கூறி APK கோப்பை நிறுவச் சொன்னார்கள்.',
        },
        {
          id: 'trading-pre-ipo',
          title: 'வாட்ஸ்அப் மற்றும் டெலிகிராம் பங்குச்சந்தை போலி முதலீட்டு மோசடி',
          agency: 'SEBI & I4C எச்சரிக்கை',
          tag: 'பங்கு மோசடி',
          severity: 'critical',
          tactic: 'பிரபல முதலீட்டு நிறுவனங்களின் பெயரில் வாட்ஸ்அப் குழுக்களில் சேர்த்து அதிக லாபம் தருவதாகக் கூறி தனிநபர் கணக்குகளுக்கு பணம் அனுப்பச் செய்வார்கள்.',
          warningSigns: [
            'வாரத்தில் 200% முதல் 500% வரை உத்தரவாத லாபம் அல்லது பிரத்யேக முன்-IPO பங்குகள் தருவதாகக் கூறுதல்',
            'தனிநபர்களின் சேமிப்பு கணக்குகளுக்கு பணம் அனுப்பக் கோருதல்',
            'பணத்தை திரும்பப் பெற கூடுதல் வரி அல்லது கட்டணம் செலுத்தக் கோருதல்',
          ],
          safeAction: 'செபி பதிவு செய்த தரகர்கள் மூலமாக மட்டுமே முதலீடு செய்யுங்கள். தனிநபர் கணக்குகளுக்கு பணம் அனுப்பாதீர்கள்.',
          summary: 'டெலிகிராமில் பங்குச்சந்தை முதலீட்டில் அதிக லாபம் தருவதாகக் கூறி தனிநபர் கணக்கிற்கு பணம் அனுப்பச் சொன்னார்கள்.',
        },
        {
          id: 'ai-voice-clone',
          title: 'AI குரல் குளோனிங் அவசர விபத்து மோசடி',
          agency: 'DoT / MHA எச்சரிக்கை',
          tag: 'AI குரல் குளோன்',
          severity: 'high',
          tactic: 'சமூக ஊடக வீடியோக்களில் உள்ள உங்கள் உறவினரின் குரலை AI மூலம் குளோன் செய்து விபத்தில் சிக்கியதாகக் கூறி அவசரமாகப் பணம் கேட்பார்கள்.',
          warningSigns: [
            'உறவினரின் குரலில் அழுது கொண்டு மருத்துவமனை அல்லது அவசர உதவி கோருதல்',
            'அறியாத எண்ணிற்கு அவசரமாக UPI மூலம் பணம் அனுப்பக் கோருதல்',
            'அவர்களின் வழக்கமான தொலைபேசி எண்ணிற்கு அழைக்க விடாமல் தடுத்தல்',
          ],
          safeAction: 'பயப்பட வேண்டாம். அழைப்பைத் துண்டித்து உங்கள் உறவினரின் உண்மையான எண்ணிற்கு அழைத்து உறுதிப்படுத்தவும்.',
          summary: 'என் மகன் குரலில் அழுது கொண்டே விபத்து நடந்ததாகக் கூறி மருத்துவமனைக்கு உடனடியாக பணம் அனுப்பச் சொன்னார்கள்.',
        },
        {
          id: 'part-time-job',
          title: 'யூடியூப் லைக் மற்றும் ஹோட்டல் மதிப்பாய்வு வேலை மோசடி',
          agency: 'I4C அறிவிப்பு',
          tag: 'வேலை மோசடி',
          severity: 'high',
          tactic: 'வீடியோக்களை லைக் செய்தால் தினமும் ₹2000-₹5000 வரை சம்பாதிக்கலாம் என ஆசை காட்டி, பிறகு அதிக பணம் முதலீடு செய்யச் சொல்லி ஏமாற்றுவார்கள்.',
          warningSigns: [
            'வெளிநாட்டு எண்களிலிருந்து வீட்டிலிருந்தே வேலை என்ற குறுஞ்செய்தி',
            'நம்பிக்கை ஏற்படுத்த முதலில் ₹150-₹500 அனுப்புதல்',
            'சம்பாதித்த பணத்தை எடுக்க நீங்களே முன்பணம் செலுத்த வேண்டும் என்று கோருதல்',
          ],
          safeAction: 'எந்தவொரு உண்மையான நிறுவனமும் வேலை தருவதற்கு முன்பணம் கேட்காது. எண்ணை பிளாக் செய்து 1930 இல் புகாரளிக்கவும்.',
          summary: 'யூடியூப் லைக் செய்தால் பணம் தருவதாகக் கூறி இப்போது பணத்தை எடுக்க முன்வைப்புத் தொகை கேட்கிறார்கள்.',
        },
      ],
    },

    citizenRules: {
      title: 'குடிமக்கள் சட்ட உரிமைகள் & விதிகள்',
      badge: 'சட்ட வழிகாட்டி',
      subtitle: 'RBI ஜீரோ லயபிலிட்டி, BNS 2023 / IT சட்டம் மற்றும் DoT சக்ஷு போர்ட்டல்',
      closeButton: 'மூடுக',
      tabs: {
        rbi: 'RBI ஜீரோ லயபிலிட்டி',
        laws: 'BNS 2023 & IT சட்டம்',
        sanchar: 'DoT சக்ஷு போர்ட்டல்',
        ombudsman: 'RBI ஒம்புட்ஸ்மேன்',
      },
      rbiTitle: 'RBI வாடிக்கையாளர் பாதுகாப்பு & பொறுப்புக் கணிப்பான்',
      rbiSubtitle: 'ரிசர்வ் வங்கியின் சுற்றறிக்கை DBR.No.Leg.BC.78/09.07.005/2017-18 இன் படி உங்கள் புகார் நேரத்தைப் பொறுத்து பணப் பொறுப்பு தீர்மானிக்கப்படுகிறது:',
      txnDateLabel: 'அனுமதியற்ற பரிவர்த்தனை நடந்த தேதி:',
      accountTypeLabel: 'கணக்கு / அட்டை வகை:',
      accountTypes: {
        savings: 'சேமிப்பு கணக்கு / ப்ரீபெய்ட் வாலட்',
        bsbda: 'அடிப்படை சேமிப்பு (ஜன் தன் / RuPay)',
        creditLarge: 'நடப்புக் கணக்கு / கிரெடிட் கார்டு (> ₹5 லட்சம்)',
      },
      liabilityTitle: 'சட்டப்பூர்வ பொறுப்பு முடிவு:',
      statutoryClause: 'பொருந்தும் சட்ட விதி:',
      formalNoticeDraftTitle: 'வங்கி நோடல் அதிகாரிக்கு சட்டப்பூர்வ அறிவிப்பு கடிதம்',
      copyNoticeButton: 'அறிவிப்பை நகலெடு',
      copiedNotice: 'நகலெடுக்கப்பட்டது!',
      rbiRulesSummaryTitle: 'RBI சட்டப்பூர்வ கால அட்டவணை:',
      rbiRules: [
        {
          title: '0 முதல் 3 வேலை நாட்கள் (உடனடி தகவல்)',
          liability: '₹0 (முழு ஜீரோ லயபிலிட்டி)',
          desc: 'மூன்றாம் தரப்பு மோசடிக்கு வாடிக்கையாளருக்கு எந்தப் பொறுப்பும் இல்லை. வங்கி 10 வேலை நாட்களுக்குள் பணத்தைத் திரும்பச் செலுத்த வேண்டும்.',
        },
        {
          title: '4 முதல் 7 வேலை நாட்கள் (தாமதமான தகவல்)',
          liability: 'வரையறுக்கப்பட்ட சட்டப் பொறுப்பு',
          desc: 'ஜன் தன் கணக்குகளுக்கு அதிகபட்சம் ₹5,000; சேமிப்பு கணக்குகளுக்கு அதிகபட்சம் ₹10,000; கிரெடிட் கார்டுகளுக்கு ₹25,000.',
        },
        {
          title: '7 வேலை நாட்களுக்குப் பிறகு',
          liability: 'வங்கி வாரியக் கொள்கையின்படி',
          desc: 'வங்கியின் கொள்கையின்படி தீர்மானிக்கப்படும். எனினும் ஆர்பிஐ ஒம்புட்ஸ்மேனிடம் மேல்முறையீடு செய்ய முழு உரிமை உண்டு.',
        },
      ],
      lawsTitle: 'இந்திய சட்டங்கள் மற்றும் சைபர் பாதுகாப்புப் பிரிவுகள்',
      lawsSubtitle: 'பாரதிய நியாய சன்ஹிதா (BNS 2023) மற்றும் தகவல் தொழில்நுட்பச் சட்டம் (IT Act 2000):',
      lawsList: [
        {
          code: 'BNS பிரிவு 318(4) (முந்தைய IPC 420)',
          title: 'ஏமாற்றுதல் மற்றும் சொத்து பறித்தல்',
          penalty: '7 ஆண்டுகள் வரை சிறைக்காவல் + அபராதம்',
          desc: 'ஆன்லைன் பிஷிங், போலி முதலீட்டுத் திட்டங்கள் மற்றும் யுபிஐ மோசடிகளுக்குப் பொருந்தும்.',
        },
        {
          code: 'BNS பிரிவு 319 (முந்தைய IPC 419)',
          title: 'ஆள்மாறாட்டம் செய்து ஏமாற்றுதல்',
          penalty: '3 ஆண்டுகள் வரை சிறைக்காவல் + அபராதம்',
          desc: 'காவல்துறை, சிபிஐ, வங்கி மேலாளர்கள் போல் நடித்து மக்களை ஏமாற்றுபவர்களுக்குப் பொருந்தும்.',
        },
        {
          code: 'IT சட்டம் பிரிவு 66C',
          title: 'அடையாளத் திருட்டு (Identity Theft)',
          penalty: '3 ஆண்டுகள் சிறை + ₹1,00,000 வரை அபராதம்',
          desc: 'கடவுச்சொற்கள், ஆதார், OTP அல்லது டிஜிட்டல் கையொப்பங்களைத் திருடிப் பயன்படுத்துவதைக் குறிக்கும்.',
        },
        {
          code: 'IT சட்டம் பிரிவு 66D',
          title: 'கணினி அல்லது தொலைபேசி மூலம் ஆள்மாறாட்டம் செய்து மோசடி',
          penalty: '3 ஆண்டுகள் சிறை + ₹1,00,000 வரை அபராதம்',
          desc: 'போலி இணையதளங்கள், APK மால்வேர் மற்றும் பிஷிங் இணைப்புகளுக்கான முதன்மைப் பிரிவு.',
        },
      ],
      sancharTitle: 'தொலைத்தொடர்புத் துறை (DoT) குடிமக்கள் சேவைகள்',
      sancharSubtitle: 'சஞ்சார் சாதி (sancharsaathi.gov.in) தளத்தின் மூலமாக மோசடிகளைத் தடுக்கவும்:',
      sancharPortals: [
        {
          name: 'சக்ஷு தளம் (Chakshu)',
          badge: 'மோசடி அழைப்புகள் & எஸ்எம்எஸ் புகார்',
          desc: 'மோசடி அழைப்புகள், போலி எஸ்எம்எஸ் மற்றும் வாட்ஸ்அப் மோசடிகளைப் புகாரளிக்கவும். அரசு அந்த எண்களை முடக்கும்.',
          actionText: 'சக்ஷு தளம் திறக்கவும்',
          url: 'https://sancharsaathi.gov.in/sfc/',
        },
        {
          name: 'TAFCOP (உங்கள் பெயரில் உள்ள சிம் கார்டுகள்)',
          badge: 'சிம் சரிபார்ப்பு',
          desc: 'உங்கள் ஆதார் எண்ணில் எத்தனை மொபைல் எண்கள் உள்ளன என்பதைச் சரிபார்த்து தேவையற்ற எண்களைத் துண்டிக்கவும்.',
          actionText: 'TAFCOP திறக்கவும்',
          url: 'https://tafcop.sancharsaathi.gov.in/',
        },
        {
          name: 'CEIR (தொலைந்த மொபைல் போன் முடக்கம்)',
          badge: 'மொபைல் போன் முடக்கம்',
          desc: 'தொலைந்துபோன அல்லது திருடப்பட்ட மொபைலின் IMEI எண்ணை நாடு முழுவதும் முடக்கி தவறான பயன்பாட்டைத் தடுக்கவும்.',
          actionText: 'CEIR தளம் திறக்கவும்',
          url: 'https://ceir.sancharsaathi.gov.in/',
        },
      ],
      ombudsmanTitle: 'RBI ஒருங்கிணைந்த ஒம்புட்ஸ்மேன் திட்டம் (2021)',
      ombudsmanSubtitle: 'வங்கி புகாரைத் தீர்க்காவிட்டால் ரிசர்வ் வங்கியிடம் புகார் செய்யும் முறை:',
      ombudsmanSteps: [
        {
          step: 'படி 1: வங்கியில் எழுத்துப்பூர்வ புகார்',
          title: 'கிளை மேலாளர் / நோடல் அதிகாரிக்கு புகார்',
          desc: 'வங்கிக்கு புகார் அளித்து ரசீது எண்ணைப் பெறுங்கள். 1930 புகாரின் நகலையும் பாதுகாக்கவும்.',
        },
        {
          step: 'படி 2: 30 நாட்கள் அவகாசம்',
          title: 'வங்கி விசாரணை செய்து பதிலளிக்க வேண்டும்',
          desc: 'வங்கிக்கு 30 நாட்கள் அவகாசம் உண்டு. ஆர்பிஐ விதிகளின்படி 10 நாட்களில் தற்காலிக வரவு வைக்க வேண்டும்.',
        },
        {
          step: 'படி 3: ஆர்பிஐ ஒம்புட்ஸ்மேனிடம் மேல்முறையீடு',
          title: 'RBI CMS தளத்தில் புகார் (cms.rbi.org.in)',
          desc: 'வங்கி தீர்க்காவிட்டால் எவ்வித கட்டணமும் இன்றி நேரடியாக ரிசர்வ் வங்கி ஒம்புட்ஸ்மேனிடம் ஆன்லைனில் புகாரளிக்கலாம்.',
        },
      ],
      cmsPortalLabel: 'ரிசர்வ் வங்கி புகார் தளம் (CMS): cms.rbi.org.in',
      helplineFooter: 'சட்டப்பூர்வ மேல்முறையீடு: RBI ஒம்புட்ஸ்மேன் (cms.rbi.org.in) · சைபர் க்ரைம் உதவி: 1930',
    },
  },

  // ── MARATHI (मराठी) ────────────────────────────────────────────────────────
  mr: {
    emergencyWizard: {
      title: 'आणीबाणी कृती विझार्ड',
      goldenHourBadge: 'गोल्डन अवर',
      subtitle: 'आर्थिक सायबर फसवणुकीच्या पहिल्या ६० मिनिटांत घ्यावयाची तत्काळ पावले',
      close: 'बंद करा',
      tabs: {
        checklist: 'गोल्डन अवर चेकलिस्ट',
        banks: 'बँक खाती गोठवा',
        fir: '१९३० सायबर FIR तयार करा',
      },
      checklistTitle: 'गोल्डन अवर चेकलिस्ट (पहिली ६० मिनिटे)',
      checklistDesc: 'आपल्या खात्यातून फसवणुकीने पैसे कापले गेल्यास, पैसे काढण्यापूर्वी ते थांबवण्यासाठी लगेच पुढील ४ पावले उचला:',
      checklistSteps: [
        {
          title: '१९३० राष्ट्रीय सायबर हेल्पलाईनवर तत्काळ कॉल करा',
          desc: 'नॅशनल सायबर क्राईम रिपोर्टिंग पोर्टलची हेल्पलाईन. ऑपरेटर थेट बँक नोडल अधिकाऱ्यांना अलर्ट करून फसवणूक झालेल्या खात्यात पैसे गोठवतो.',
          highlight: 'मोफत आणि २४x७ सेवा',
          actionText: 'आता १९३० डायल करा',
          actionUrl: 'tel:1930',
          isTel: true,
        },
        {
          title: 'आपल्या बँकेमध्ये खाती व कार्ड ब्लॉक करा',
          desc: 'बँकेच्या कस्टमर केअरला कॉल करून डेबिट कार्ड, यूपीआय व नेट बँकिंग त्वरित ब्लॉक करा.',
          highlight: 'पुढील अनधिकृत व्यवहार रोखते',
        },
        {
          title: 'व्यवहार तपशील (UTR / संदर्भ क्रमांक) मिळवा',
          desc: 'तारीख, वेळ, रक्कम, १२ अंकी UTR क्रमांक व फसवणूक करणाऱ्याचा क्रमांक जतन करा.',
          highlight: 'पोलीस FIR साठी अत्यंत महत्त्वाचे',
        },
        {
          title: 'cybercrime.gov.in वर अधिकृत तक्रार नोंदवा',
          desc: 'पोर्टलवर तक्रार नोंदवून बँक स्टेटमेंट व स्क्रीनशॉट जोडा आणि पावती क्रमांक सुरक्षित ठेवा.',
          highlight: 'RBI नियमांनुसार पूर्ण कायदेशीर संरक्षण',
          actionText: 'cybercrime.gov.in उघडा',
          actionUrl: 'https://cybercrime.gov.in',
        },
      ],
      searchBankPlaceholder: 'बँकेचे नाव किंवा टोल-फ्री क्रमांक शोधा...',
      freezeNotice: 'आपल्या बँकेला त्वरित कॉल करून सांगा: "सायबर फसवणुकीमुळे माझ्या खात्यातून अनधिकृत व्यवहार झाला आहे, कृपया सर्व डिजिटल व्यवहार गोठवा."',
      tollFreeBadge: '२४/७ टोल फ्री',
      copyNumber: 'क्रमांक कॉपी करा',
      copied: 'कॉपी झाले!',
      freezeActionLabel: 'आणीबाणी ब्लॉक कृती',
      officialPortalLabel: 'बँकेचे अधिकृत पोर्टल',
      firHeading: '१९३० / पोलीस तक्रार पत्र (FIR ड्राफ्ट)',
      firSubheading: 'IT कायदा कलम 66D आणि RBI परिपत्रकानुसार तयार तक्रार पत्र:',
      fields: {
        victimName: 'तक्रारदार / खातेदाराचे नाव *',
        victimNamePlaceholder: 'उदा. रमेश कुमार',
        incidentDate: 'घटनेची तारीख *',
        incidentTime: 'घटनेची वेळ *',
        fraudType: 'सायबर फसवणुकीचा प्रकार *',
        amountLost: 'नुकसान झालेली रक्कम (₹) *',
        amountLostPlaceholder: 'उदा. ४५०००',
        bankName: 'आपली बँक / पेमेंट ॲप *',
        bankNamePlaceholder: 'उदा. स्टेट बँक ऑफ इंडिया',
        suspectContact: 'संशयिताचा फोन / व्हॉट्सॲप',
        suspectContactPlaceholder: 'उदा. +९१ ९८७६५ ४३२१०',
        suspectAccountOrUpi: 'संशयिताचा बँक खाते किंवा UPI आयडी',
        suspectAccountOrUpiPlaceholder: 'उदा. fraudster@upi',
        transactionRef: 'UTR / व्यवहार संदर्भ क्रमांक',
        transactionRefPlaceholder: 'उदा. ४०५६२३९८४१२५',
        description: 'घटनेचे संक्षिप्त वर्णन *',
        descriptionPlaceholder: 'उदा. पोलीस असल्याचे सांगून व्हिडिओ कॉल केला आणि डिजिटल अरेस्टची धमकी देऊन पैसे पाठवायला लावले...',
      },
      generateFirButton: 'तक्रार मसुदा तयार करा',
      firGeneratedNotice: 'cybercrime.gov.in आणि बँक अधिकाऱ्याकडे सादर करण्यासाठी तयार:',
      copyStatement: 'तक्रार मसुदा कॉपी करा',
      copiedStatement: 'क्लिपबोर्डवर कॉपी झाले!',
      helplineFooter: 'राष्ट्रीय सायबर क्राईम हेल्पलाईन: १९३० (टोल-फ्री, २४x७)',
    },

    linkInspector: {
      title: 'दुवा आणि APK तपासणी साधन',
      subtitle: 'बनावट बँकिंग डोमेन, ब्रँड फसवणूक व घातक APK फाइल्स ओळखा',
      inputLabel: 'संशयास्पद लिंक किंवा APK डाऊनलोड URL येथे पेस्ट करा:',
      inputPlaceholder: 'उदा. sbi-kyc-update.xyz किंवा bijli-bill.top/app.apk',
      inspectButton: 'लिंक तपासा',
      analyzingButton: 'तपासणी सुरू आहे...',
      quickTestLabel: 'जलद चाचणी:',
      samples: [
        { label: 'बनावट SBI KYC', url: 'http://sbi-kyc-pan-update.xyz/login.html' },
        { label: 'वीज बिल APK फसवणूक', url: 'https://bijli-bill-cutoff.top/Mahavitaran_Update.apk' },
        { label: 'लॉटरी लिंक', url: 'bit.ly/claim-lottery-crore' },
        { label: 'अधिकृत पोर्टल (सुरक्षित)', url: 'https://cybercrime.gov.in' },
      ],
      riskScoreLabel: 'धोका पातळी',
      redFlagsTitle: 'ओळखलेले धोके',
      recommendationsTitle: 'सुरक्षा मार्गदर्शक तत्त्वे',
      helplineText: 'अधिकृत हेल्पलाईन: १९३०',
      closeButton: 'बंद करा',
    },

    trendingAlerts: {
      title: 'सायबर फसवणूक सूचना व इशारे',
      badge: 'थेट बुलेटिन',
      subtitle: 'I4C, CERT-In आणि गृह मंत्रालयाच्या अधिकृत सूचना',
      tip: 'कोणत्याही अलर्टवरील "सायबर रक्षक मध्ये तपासा" वर क्लिक करून थेट स्कॅन करा.',
      testInCyberRakshak: 'सायबर रक्षक मध्ये तपासा',
      keyWarningSigns: 'महत्त्वाचे धोक्याचे संकेत:',
      officialSafeAction: 'अधिकृत सुरक्षित कृती:',
      sourceLabel: 'स्रोत:',
      helplineFooter: 'राष्ट्रीय सायबर हेल्पलाईन: १९३० · cybercrime.gov.in',
      closeButton: 'बंद करा',
      alerts: [
        {
          id: 'digital-arrest',
          title: 'बनावट सीबीआय, ईडी किंवा पोलीस अधिकाऱ्यांची "डिजिटल अरेस्ट" फसवणूक',
          agency: 'गृह मंत्रालय / I4C इशारा',
          tag: 'डिजिटल अरेस्ट',
          severity: 'critical',
          tactic: 'पोलीस गणवेशात व्हिडिओ कॉल करून तुमच्या आधारवरून बेकायदेशीर पार्सल सापडल्याचे सांगून डिजिटल अरेस्टमध्ये ठेवून पैसे उकळतात.',
          warningSigns: [
            'व्हॉट्सॲप किंवा स्काईपवर पोलीस स्टेशन दाखवणारा व्हिडिओ कॉल',
            'कुणाशीही संपर्क न करता २४ तास कॅमेऱ्यासमोर राहण्याची सक्ती',
            'तपासणीसाठी पैसे सरकारी खात्यात भरण्याची मागणी',
          ],
          safeAction: 'त्वरित कॉल बंद करा. भारतातील कोणतीही यंत्रणा व्हिडिओ कॉलवर अटक करत नाही. १९३० वर संपर्क साधा.',
          summary: 'सीबीआय किंवा पोलीस अधिकारी असल्याचे सांगून व्हिडिओ कॉलवरून डिजिटल अरेस्टची धमकी दिली.',
        },
        {
          id: 'electricity-apk',
          title: 'वीज बिल कट होण्याच्या नावाखाली APK मालवेअर फसवणूक',
          agency: 'CERT-In सल्ला',
          tag: 'घातक APK',
          severity: 'critical',
          tactic: 'वीज बिल न भरल्याने आज रात्री वीज कापली जाईल असा खोटा मेसेज पाठवून APK लिंक डाऊनलोड करायला लावतात.',
          warningSigns: [
            'वैयक्तिक मोबाईल नंबरवरून वीज कापण्याचा तातडीचा मेसेज',
            'लिंकच्या शेवटी .apk असणे किंवा अनोळखी साइटवरून ॲप डाऊनलोड करायला सांगणे',
            'ॲप इंस्टॉल करताच एसएमएस आणि स्क्रीन परवानग्या मागणे',
          ],
          safeAction: 'मेसेज किंवा व्हॉट्सॲपवर आलेली कोणतीही APK फाईल इंस्टॉल करू नका. अधिकृत पोर्टलवरूनच वीज बिल भरा.',
          summary: 'वीज बिल न भरल्याने आज रात्री वीज खंडित होईल असा मेसेज आला आणि APK इन्स्टॉल करायला सांगितले.',
        },
        {
          id: 'trading-pre-ipo',
          title: 'व्हॉट्सॲप आणि टेलिग्रामवरील शेअर मार्केट व प्री-IPO गुंतवणूक घोटाळा',
          agency: 'SEBI व I4C इशारा',
          tag: 'शेअर घोटाळा',
          severity: 'critical',
          tactic: 'प्रसिद्ध ब्रोकरेजच्या नावाखाली ग्रुपमध्ये जोडून खोट्या नफ्याचे स्क्रीनशॉट दाखवले जातात आणि वैयक्तिक खात्यावर पैसे भरायला लावले जातात.',
          warningSigns: [
            'आठवड्यात २००% ते ५००% नफ्याची हमी किंवा विशेष प्री-IPO शेअर्सची लालूच',
            'कंपनीच्या खात्याऐवजी अनोळखी व्यक्तींच्या बचत खात्यात पैसे पाठवायला सांगणे',
            'नफा काढताना अतिरिक्त कर किंवा अनलॉकिंग फी मागणे',
          ],
          safeAction: 'केवळ सेबी नोंदणीकृत ब्रोकर्समार्फतच गुंतवणूक करा. कोणत्याही वैयक्तिक खात्यावर पैसे पाठवू नका.',
          summary: 'टेलिग्राम ग्रुपमध्ये ३ दिवसांत ३००% नफ्याचे आमिष दाखवून वैयक्तिक खात्यावर पैसे पाठवण्यास सांगितले जात आहे.',
        },
        {
          id: 'ai-voice-clone',
          title: 'AI व्हॉईस क्लोनिंग द्वारे आणीबाणीचा अपघात घोटाळा',
          agency: 'DoT / MHA इशारा',
          tag: 'AI व्हॉईस क्लोन',
          severity: 'high',
          tactic: 'सोशल मीडियावरील व्हिडिओवरून नातेवाईकाचा हुबेहूब आवाज तयार करून अपघातात अडकल्याचे सांगून तातडीने पैसे मागितले जातात.',
          warningSigns: [
            'ओळखीच्या व्यक्तीच्या रडणाऱ्या आवाजात फोन येणे आणि सायरनचे आवाज येणे',
            'तातडीने अनोळखी क्रमांकावर हॉस्पिटलसाठी यूपीआयने पैसे मागणे',
            'त्यांच्या मूळ फोन नंबरवर पुन्हा कॉल करू न देणे',
          ],
          safeAction: 'घाबरू नका. फोन कट करून नातेवाईकाच्या मूळ नंबरवर फोन करा व खात्री करा.',
          summary: 'मुलाच्या आवाजात फोन आला की त्याचा अपघात झाला आहे आणि हॉस्पिटलसाठी तातडीने पैसे पाठवा.',
        },
        {
          id: 'part-time-job',
          title: 'यूट्यूब लाईक आणि हॉटेल रिव्ह्यू पार्ट-टाईम जॉब फ्रॉड',
          agency: 'I4C बुलेटिन',
          tag: 'नोकरी फसवणूक',
          severity: 'high',
          tactic: 'व्हिडिओ लाईक केल्यास दररोज ₹२०००-₹५००० देण्याचे आमिष दाखवून आधी थोडे पैसे दिले जातात आणि नंतर प्रीपेड टास्कच्या नावाखाली मोठी फसवणूक केली जाते.',
          warningSigns: [
            'परदेशी क्रमांकांवरून घरात बसून कामाचे मेसेज येणे',
            'विश्वास बसण्यासाठी सुरुवातीला २००-५०० रुपये देणे',
            'कमवलेले पैसे काढण्यासाठी आधी स्वतःचे पैसे गुंतवण्याची सक्ती करणे',
          ],
          safeAction: 'कोणतीही खरी कंपनी काम किंवा पगार देण्यासाठी पैसे मागत नाही. नंबर ब्लॉक करा व १९३० वर कळवा.',
          summary: 'यूट्यूब लाईक करण्याचे काम दिले आणि आता कमवलेले पैसे काढण्यासाठी आधी पैसे भरायला सांगत आहेत.',
        },
      ],
    },

    citizenRules: {
      title: 'नागरिकांचे कायदेशीर अधिकार व नियम',
      badge: 'कायदेशीर मार्गदर्शक',
      subtitle: 'RBI झिरो-लायबिलिटी, BNS 2023 / IT कायदा व DoT चक्षू पोर्टल',
      closeButton: 'बंद करा',
      tabs: {
        rbi: 'RBI झिरो-लायबिलिटी',
        laws: 'BNS 2023 व IT कायदा',
        sanchar: 'DoT चक्षू पोर्टल',
        ombudsman: 'RBI लोकपाल',
      },
      rbiTitle: 'RBI ग्राहक संरक्षण व झिरो-लायबिलिटी कॅल्क्युलेटर',
      rbiSubtitle: 'रिझर्व्ह बँक ऑफ इंडियाच्या परिपत्रकानुसार अनधिकृत व्यवहाराची जबाबदारी आपण दिलेल्या माहितीच्या वेळेवर अवलंबून असते:',
      txnDateLabel: 'अनधिकृत व्यवहाराची तारीख:',
      accountTypeLabel: 'खाते / कार्ड प्रकार:',
      accountTypes: {
        savings: 'बचत खाते / प्रीपेड वॉलेट (मानक)',
        bsbda: 'मूलभूत बचत (BSBDA / जन धन / RuPay)',
        creditLarge: 'चालू खाते / क्रेडिट कार्ड (> ₹५ लाख)',
      },
      liabilityTitle: 'कायदेशीर जबाबदारी निर्णय:',
      statutoryClause: 'लागू होणारा कायदेशीर नियम:',
      formalNoticeDraftTitle: 'बँक नोडल अधिकाऱ्यासाठी कायदेशीर नोटीस मसुदा',
      copyNoticeButton: 'नोटीस कॉपी करा',
      copiedNotice: 'कॉपी झाले!',
      rbiRulesSummaryTitle: 'RBI कायदेशीर नियमांचे वेळापत्रक:',
      rbiRules: [
        {
          title: '० ते ३ कामकाजाचे दिवस (तत्काळ माहिती)',
          liability: '₹० (शून्य जबाबदारी)',
          desc: 'तिसऱ्या व्यक्तीच्या फसवणुकीमुळे व्यवहार झाला असल्यास ग्राहकाची जबाबदारी शून्य असते. बँकेने १० दिवसांत पैसे परत करणे बंधनकारक आहे.',
        },
        {
          title: '४ ते ७ कामकाजाचे दिवस (उशिरा माहिती)',
          liability: 'मर्यादित कायदेशीर जबाबदारी',
          desc: 'जन धन खात्यांवर जास्तीत जास्त ₹५,०००; बचत खात्यांवर ₹१०,०००; क्रेडिट कार्डवर ₹२५,०००.',
        },
        {
          title: '७ कामकाजाच्या दिवसांनंतर',
          liability: 'बँक बोर्डाच्या धोरणानुसार',
          desc: 'बँकेच्या धोरणानुसार निर्णय होतो, परंतु समाधानी नसल्यास थेट RBI लोकपालकडे दाद मागण्याचा पूर्ण अधिकार आहे.',
        },
      ],
      lawsTitle: 'भारतीय कायदे आणि सायबर गुन्हे कलमे',
      lawsSubtitle: 'भारतीय न्याय संहिता (BNS 2023) आणि माहिती तंत्रज्ञान (IT) कायदा 2000 चे नियम:',
      lawsList: [
        {
          code: 'BNS कलम 318(4) (पूर्वीचे IPC 420)',
          title: 'फसवणूक आणि अप्रामाणिकपणे मालमत्ता देणे',
          penalty: '७ वर्षांपर्यंत सक्तमजुरी + दंड',
          desc: 'ऑनलाइन फिशिंग, बनावट गुंतवणूक योजना व अनधिकृत यूपीआय व्यवहारांवर लागू होते.',
        },
        {
          code: 'BNS कलम 319 (पूर्वीचे IPC 419)',
          title: 'तोतयागिरी करून फसवणूक करणे',
          penalty: '३ वर्षांपर्यंत कारावास + दंड',
          desc: 'पोलीस, सीबीआय, बँक अधिकारी असल्याचे भासवून ठकवणाऱ्यांवर लावले जाते.',
        },
        {
          code: 'IT कायदा कलम 66C',
          title: 'ओळख चोरी (Identity Theft)',
          penalty: '३ वर्षांपर्यंत कारावास + १ लाख रुपयांपर्यंत दंड',
          desc: 'पासवर्ड, आधार, ओटीपी किंवा डिजिटल स्वाक्षरी चोरून वापरण्यावर लागू होते.',
        },
        {
          code: 'IT कायदा कलम 66D',
          title: 'संगणक किंवा फोनद्वारे तोतयागिरी करून ठकवणे',
          penalty: '३ वर्षांपर्यंत कारावास + १ लाख रुपयांपर्यंत दंड',
          desc: 'बनावट वेबसाइट, एपीके मालवेअर व फिशिंग लिंकद्वारे फसवणुकीचे मुख्य कलम.',
        },
      ],
      sancharTitle: 'दूरसंचार विभाग (DoT) नागरिक पोर्टल्स',
      sancharSubtitle: 'संचार साथी (sancharsaathi.gov.in) द्वारे आपली दूरसंचार ओळख सुरक्षित ठेवा:',
      sancharPortals: [
        {
          name: 'चक्षू पोर्टल (Chakshu)',
          badge: 'फसव्या कॉल व SMS ची तक्रार',
          desc: 'संशयास्पद कॉल, बनावट एसएमएस आणि व्हॉट्सॲप फसवणुकीची तक्रार नोंदवा. सरकार ते नंबर ब्लॉक करते.',
          actionText: 'चक्षू पोर्टल उघडा',
          url: 'https://sancharsaathi.gov.in/sfc/',
        },
        {
          name: 'TAFCOP (आपल्या नावावरील सिम कार्ड)',
          badge: 'सिम कार्ड पडताळणी',
          desc: 'आपल्या आधारवर किती मोबाईल नंबर सुरू आहेत ते तपासा आणि अनोळखी सिम त्वरित बंद करा.',
          actionText: 'TAFCOP उघडा',
          url: 'https://tafcop.sancharsaathi.gov.in/',
        },
        {
          name: 'CEIR (हरवलेला मोबाईल ब्लॉक करा)',
          badge: 'हँडसेट ब्लॉकिंग',
          desc: 'चोरीला गेलेल्या मोबाईलचा IMEI ब्लॉक करा जेणेकरून बँकिंग ॲप्सचा गैरवापर रोखता येईल.',
          actionText: 'CEIR पोर्टल उघडा',
          url: 'https://ceir.sancharsaathi.gov.in/',
        },
      ],
      ombudsmanTitle: 'RBI एकात्मिक लोकपाल योजना (2021)',
      ombudsmanSubtitle: 'बँकेने तक्रार न सोडवल्यास रिझर्व्ह बँकेकडे तक्रार कशी करावी:',
      ombudsmanSteps: [
        {
          step: 'पायरी १: बँकेत औपचारिक तक्रार',
          title: 'शाखा व्यवस्थापक / नोडल अधिकाऱ्याकडे लेखी तक्रार',
          desc: 'बँकेत तक्रार नोंदवून तक्रार क्रमांक (Grievance Ref) घ्या. १९३० ची पावती जवळ ठेवा.',
        },
        {
          step: 'पायरी २: ३० दिवसांची मुदत',
          title: 'बँकेने तपास करून उत्तर देणे आवश्यक',
          desc: 'बँकेला ३० दिवसांची मुदत असते. नियमांनुसार १० दिवसांत तात्पुरते पैसे जमा झाले पाहिजेत.',
        },
        {
          step: 'पायरी ३: RBI लोकपालकडे दाद मागा',
          title: 'RBI CMS पोर्टलवर मोफत तक्रार (cms.rbi.org.in)',
          desc: 'बँकेने तक्रार फेटाळल्यास किंवा ३० दिवसांत समाधान न झाल्यास थेट रिझर्व्ह बँक लोकपालकडे ऑनलाईन तक्रार करा.',
        },
      ],
      cmsPortalLabel: 'रिझर्व्ह बँक तक्रार व्यवस्थापन पोर्टल (CMS): cms.rbi.org.in',
      helplineFooter: 'कायदेशीर अपील: RBI लोकपाल (cms.rbi.org.in) · सायबर क्राईम हेल्पलाईन: १९३०',
    },
  },

  // ── BENGALI (বাংলা) ────────────────────────────────────────────────────────
  bn: {
    emergencyWizard: {
      title: 'জরুরি পদক্ষেপ উইজার্ড',
      goldenHourBadge: 'গোল্ডেন আওয়ার',
      subtitle: 'আর্থিক সাইবার প্রতারণার প্রথম ৬০ মিনিটের মধ্যে অবিলম্বে করণীয় পদক্ষেপ',
      close: 'বন্ধ করুন',
      tabs: {
        checklist: 'গোল্ডেন আওয়ার চেকলিস্ট',
        banks: 'ব্যাংক অ্যাকাউন্ট ফ্রিজ করুন',
        fir: '১৯৩০ সাইবার FIR তৈরি করুন',
      },
      checklistTitle: 'গোল্ডেন আওয়ার চেকলিস্ট (প্রথম ৬০ মিনিট)',
      checklistDesc: 'আপনার অ্যাকাউন্ট থেকে প্রতারণামূলকভাবে টাকা কেটে নেওয়া হলে, প্রতারকরা টাকা তোলার আগেই তৎক্ষণাৎ এই ৪টি পদক্ষেপ নিন:',
      checklistSteps: [
        {
          title: '১৯৩০ ন্যাশনাল সাইবার ক্রাইম হেল্পলাইনে অবিলম্বে কল করুন',
          desc: 'ন্যাশনাল সাইবার ক্রাইম রিপোর্টিং পোর্টালের হেল্পলাইন। অপারেটর সরাসরি সংশ্লিষ্ট ব্যাংক নোডাল অফিসারদের সতর্ক করে টাকা ফ্রিজ করান।',
          highlight: 'টোল-ফ্রি ও ২৪x৭ সকল নেটওয়ার্কে উপলব্ধ',
          actionText: 'এখনই ১৯৩০ ডায়াল করুন',
          actionUrl: 'tel:1930',
          isTel: true,
        },
        {
          title: 'আপনার ব্যাংকে জরুরি ভিত্তিতে লেনদেন বন্ধ করুন',
          desc: 'ব্যাংক কাস্টমার কেয়ারে কল করে বা মোবাইল ব্যাংকিং অ্যাপ দিয়ে ডেবিট কার্ড ও ইউপিআই তাৎক্ষণিকভাবে ব্লক করুন।',
          highlight: 'অতিরিক্ত আর্থিক ক্ষতি প্রতিরোধ করে',
        },
        {
          title: 'লেনদেনের তথ্য (UTR / রেফারেন্স নম্বর) সংগ্রহ করুন',
          desc: 'তারিখ, সঠিক সময়, টাকার পরিমাণ, ১২ সংখ্যার UTR নম্বর ও প্রতারকের ফোন বা UPI আইডি লিখে রাখুন।',
          highlight: 'পুলিশি FIR এবং ১৯৩০ ট্র্যাকিংয়ের জন্য অত্যন্ত জরুরি',
        },
        {
          title: 'cybercrime.gov.in এ আনুষ্ঠানিক অভিযোগ দায়ের করুন',
          desc: 'জাতীয় পোর্টালে গিয়ে অভিযোগ নথিভুক্ত করুন এবং ব্যাংক স্টেটমেন্ট ও প্রমাণপত্র আপলোড করে প্রাপ্তিস্বীকার নম্বর রাখুন।',
          highlight: 'RBI নিয়মানুযায়ী সম্পূর্ণ আইনি সুরক্ষা প্রদান করে',
          actionText: 'cybercrime.gov.in খুলুন',
          actionUrl: 'https://cybercrime.gov.in',
        },
      ],
      searchBankPlaceholder: 'ব্যাংকের নাম বা টোল-ফ্রি নম্বর খুঁজুন...',
      freezeNotice: 'অবিলম্বে আপনার ব্যাংকে কল করে জানান: "সাইবার প্রতারণার কারণে আমার অ্যাকাউন্ট থেকে অননুমোদিত লেনদেন হয়েছে, অনুগ্রহ করে সমস্ত ডিজিটাল লেনদেন বন্ধ করুন।"',
      tollFreeBadge: '২৪/৭ টোল ফ্রি',
      copyNumber: 'নম্বর কপি করুন',
      copied: 'কপি হয়েছে!',
      freezeActionLabel: 'জরুরি অ্যাকাউন্ট ফ্রিজ অ্যাকশন',
      officialPortalLabel: 'ব্যাংকের অফিসিয়াল পোর্টাল',
      firHeading: '১৯৩০ / পুলিশ অভিযোগ পত্র (FIR ড্রাফট)',
      firSubheading: 'IT আইন ধারা 66D এবং RBI সার্কুলার অনুযায়ী প্রস্তুত আনুষ্ঠানিক অভিযোগ পত্র:',
      fields: {
        victimName: 'অভিযোগকারী / অ্যাকাউন্টধারীর নাম *',
        victimNamePlaceholder: 'যেমন: রমেশ কুমার',
        incidentDate: 'ঘটনার তারিখ *',
        incidentTime: 'ঘটনার সময় *',
        fraudType: 'সাইবার প্রতারণার ধরন *',
        amountLost: 'হারিয়ে যাওয়া টাকা (₹) *',
        amountLostPlaceholder: 'যেমন: ৪৫০০০',
        bankName: 'আপনার ব্যাংক / পেমেন্ট অ্যাপ *',
        bankNamePlaceholder: 'যেমন: স্টেট ব্যাংক অফ ইন্ডিয়া',
        suspectContact: 'প্রতারকের ফোন / হোয়াটসঅ্যাপ',
        suspectContactPlaceholder: 'যেমন: +৯১ ৯৮৭৬৫ ৪৩২১০',
        suspectAccountOrUpi: 'প্রতারকের ব্যাংক অ্যাকাউন্ট বা UPI ID',
        suspectAccountOrUpiPlaceholder: 'যেমন: fraudster@upi',
        transactionRef: 'UTR / লেনদেন রেফারেন্স নম্বর',
        transactionRefPlaceholder: 'যেমন: ৪০৫৬২৩৯৮৪১২৫',
        description: 'ঘটনার সংক্ষিপ্ত বিবরণ *',
        descriptionPlaceholder: 'যেমন: সিবিআই অফিসার সেজে ভিডিও কল করে ডিজিটাল অ্যারেস্টের ভয় দেখিয়ে টাকা পাঠাতে বাধ্য করে...',
      },
      generateFirButton: 'অভিযোগ ড্রাফট তৈরি করুন',
      firGeneratedNotice: 'cybercrime.gov.in এবং ব্যাংক নোডাল অফিসারের কাছে জমা দেওয়ার জন্য প্রস্তুত:',
      copyStatement: 'অভিযোগ পত্র কপি করুন',
      copiedStatement: 'ক্লিপবোর্ডে কপি হয়েছে!',
      helplineFooter: 'জাতীয় সাইবার হেল্পলাইন: ১৯৩০ (টোল-ফ্রি, ২৪x৭)',
    },

    linkInspector: {
      title: 'লিঙ্ক ও APK পরীক্ষক',
      subtitle: 'ভুয়া ব্যাংকিং ডোমেইন, ব্র্যান্ড প্রতারণা ও ক্ষতিকর APK ফাইল শনাক্ত করুন',
      inputLabel: 'ওয়েবসাইট লিঙ্ক বা APK ডাউনলোড URL পেস্ট করুন:',
      inputPlaceholder: 'যেমন: sbi-kyc-update.xyz বা bijli-bill.top/app.apk',
      inspectButton: 'লিঙ্ক পরীক্ষা করুন',
      analyzingButton: 'বিশ্লেষণ চলছে...',
      quickTestLabel: 'দ্রুত পরীক্ষা:',
      samples: [
        { label: 'ভুয়া SBI KYC', url: 'http://sbi-kyc-pan-update.xyz/login.html' },
        { label: 'বিদ্যুৎ বিল APK ফ্রড', url: 'https://bijli-bill-cutoff.top/Mahavitaran_Update.apk' },
        { label: 'লটারি লিঙ্ক', url: 'bit.ly/claim-lottery-crore' },
        { label: 'অফিসিয়াল পোর্টাল (নিরাপদ)', url: 'https://cybercrime.gov.in' },
      ],
      riskScoreLabel: 'ঝুঁকির মাত্রা',
      redFlagsTitle: 'চিহ্নিত ঝুঁকির লক্ষণ',
      recommendationsTitle: 'প্রস্তাবিত সুরক্ষামূলক পদক্ষেপ',
      helplineText: 'অফিসিয়াল হেল্পলাইন: ১৯৩০',
      closeButton: 'বন্ধ করুন',
    },

    trendingAlerts: {
      title: 'সাইবার প্রতারণার সতর্কতা ও বিজ্ঞপ্তি',
      badge: 'লাইভ বুলেটিন',
      subtitle: 'I4C, CERT-In এবং স্বরাষ্ট্র মন্ত্রকের অফিশিয়াল সতর্কতা',
      tip: 'যেকোনো সতর্কতার নিচে "সাইবার রক্ষকে পরীক্ষা করুন" এ ক্লিক করে সরাসরি স্ক্যানারে লোড করুন।',
      testInCyberRakshak: 'সাইবার রক্ষকে পরীক্ষা করুন',
      keyWarningSigns: 'মূল সতর্কতামূলক লক্ষণ:',
      officialSafeAction: 'অফিসিয়াল নিরাপদ পদক্ষেপ:',
      sourceLabel: 'উৎস:',
      helplineFooter: 'জাতীয় সাইবার হেল্পলাইন: ১৯৩০ · cybercrime.gov.in',
      closeButton: 'বন্ধ করুন',
      alerts: [
        {
          id: 'digital-arrest',
          title: 'ভুয়া সিবিআই বা পুলিশ অফিসারদের "ডিজিটাল অ্যারেস্ট" প্রতারণা',
          agency: 'স্বরাষ্ট্র মন্ত্রক / I4C সতর্কতা',
          tag: 'ডিজিটাল অ্যারেস্ট',
          severity: 'critical',
          tactic: 'পুলিশ পোশাকে ভিডিও কল করে দাবি করা হয় আপনার আধার দিয়ে মাদক পার্সেল ধরা পড়েছে এবং ডিজিটাল অ্যারেস্টে রেখে টাকা দিতে বাধ্য করা হয়।',
          warningSigns: [
            'হোয়াটসঅ্যাপ বা স্কাইপে থানার দৃশ্য দেখিয়ে ভিডিও কল করা',
            'কারো সাথে যোগাযোগ না করে ২৪ ঘণ্টা ক্যামেরার সামনে থাকার হুমকি দেওয়া',
            'যাচাইয়ের নামে সরকারি নিরাপদ অ্যাকাউন্টে টাকা ট্রান্সফার করতে বলা',
          ],
          safeAction: 'অবিলম্বে কল কেটে দিন। ভারতে কোনো পুলিশ বা আদালত ভিডিও কলে গ্রেপ্তার বা বিচার করে না। ১৯৩০ নম্বরে কল করুন।',
          summary: 'সিবিআই বা পুলিশ পরিচয় দিয়ে ভিডিও কলে ডিজিটাল অ্যারেস্টের ভয় দেখিয়ে টাকা দাবি করেছে।',
        },
        {
          id: 'electricity-apk',
          title: 'বিদ্যুৎ বিল বকেয়ার নামে APK ম্যালওয়্যার প্রতারণা',
          agency: 'CERT-In পরামর্শ',
          tag: 'ক্ষতিকারক APK',
          severity: 'critical',
          tactic: 'বিদ্যুৎ বিল না দিলে আজ রাতেই লাইন কেটে দেওয়া হবে এই মর্মে ভুয়া মেসেজ পাঠিয়ে APK ডাউনলোড করতে বলা হয়।',
          warningSigns: [
            'ব্যক্তিগত মোবাইল নম্বর থেকে বিদ্যুৎ সংযোগ কাটার জরুরি মেসেজ',
            '.apk দিয়ে শেষ হওয়া লিঙ্ক বা বাইরের কোনো সাইট থেকে অ্যাপ ডাউনলোড করতে বলা',
            'অ্যাপ ইনস্টল হতেই এসএমএস ও স্ক্রিন পারমিশন চাওয়া',
          ],
          safeAction: 'এসএমএস বা হোয়াটসঅ্যাপে আসা কোনো APK ফাইল ইনস্টল করবেন না। বিদ্যুৎ বিল শুধুমাত্র অফিশিয়াল পোর্টালেই জমা দিন।',
          summary: 'বিদ্যুৎ বিল বকেয়া থাকায় বিদ্যুৎ কেটে দেওয়ার হুমকি দিয়ে APK লিঙ্ক পাঠিয়েছে।',
        },
        {
          id: 'trading-pre-ipo',
          title: 'হোয়াটসঅ্যাপ ও টেলিগ্রামে ভুয়া শেয়ার বাজার ও প্রি-আইপিও বিনিয়োগ প্রতারণা',
          agency: 'SEBI ও I4C সতর্কতা',
          tag: 'শেয়ার প্রতারণা',
          severity: 'critical',
          tactic: 'বিখ্যাত ব্রোকারেজ সংস্থার নামে গ্রুপে যুক্ত করে অতিরিক্ত মুনাফার ভুয়া ছবি দেখিয়ে ব্যক্তিগত ব্যাংক অ্যাকাউন্টে টাকা জমা দিতে বলা হয়।',
          warningSigns: [
            'সপ্তাহে ২০০% থেকে ৫০০% নিশ্চিত লাভের প্রতিশ্রুতি দেওয়া',
            'কোম্পানির পরিবর্তে অন্য কোনো ব্যক্তির সেভিংস অ্যাকাউন্টে টাকা পাঠাতে বলা',
            'লাভের টাকা তোলার সময় অতিরিক্ত ট্যাক্স বা আনলক ফি দাবি করা',
          ],
          safeAction: 'শুধুমাত্র সেবি নিবন্ধিত ব্রোকারদের মাধ্যমেই বিনিয়োগ করুন। কোনো ব্যক্তিগত অ্যাকাউন্টে টাকা পাঠাবেন না।',
          summary: 'টেলিগ্রাম গ্রুপে ৩ দিনে ৩০০% নিশ্চিত লাভের লোভ দেখিয়ে ব্যক্তিগত অ্যাকাউন্টে টাকা পাঠাতে বলছে।',
        },
        {
          id: 'ai-voice-clone',
          title: 'AI ভয়েস ক্লোনিং দিয়ে জরুরি দুর্ঘটনা প্রতারণা',
          agency: 'DoT / MHA সতর্কতা',
          tag: 'AI ভয়েস ক্লোন',
          severity: 'high',
          tactic: 'সোশ্যাল মিডিয়ার ভিডিও থেকে আত্মীয়ের কণ্ঠ নকল করে দুর্ঘটনায় পড়ার কথা বলে জরুরি ভিত্তিতে টাকা চাওয়া হয়।',
          warningSigns: [
            'আত্মীয়ের কান্নার গলায় ফোন আসা এবং পেছনে সাইরেন বা হাসপাতালের শব্দ শোনা যাওয়া',
            'হাসপাতাল বা আইনজীবীর নামে দ্রুত ইউপিআইতে টাকা পাঠানোর চাপ দেওয়া',
            'তাদের পরিচিত আসল নম্বরে ফেরত কল করতে বাধা দেওয়া',
          ],
          safeAction: 'শান্ত থাকুন। ফোন কেটে আত্মীয়ের আসল ফোন নম্বরে কল করে সত্যতা যাচাই করুন।',
          summary: 'ছেলের গলায় ফোন করে বলা হলো তার দুর্ঘটনা ঘটেছে এবং অবিলম্বে চিকিৎসার জন্য ইউপিআইতে টাকা পাঠাতে হবে।',
        },
        {
          id: 'part-time-job',
          title: 'ইউটিউব লাইক ও হোটেল রিভিউ পার্ট-টাইম চাকরি প্রতারণা',
          agency: 'I4C বুলেটিন',
          tag: 'চাকরি প্রতারণা',
          severity: 'high',
          tactic: 'ভিডিও লাইক করলে প্রতিদিন ২০০০-৫০০০ টাকা দেওয়ার কথা বলে প্রথমে সামান্য টাকা দেওয়া হয়, পরে প্রিপেইড টাস্কের নামে টাকা হাতিয়ে নেওয়া হয়।',
          warningSigns: [
            'বিদেশি নম্বর থেকে ঘরে বসে সহজ কাজের প্রলোভন দেখানো মেসেজ',
            'বিশ্বাস অর্জনের জন্য প্রথমে ১৫০-৫০০ টাকা পাঠানো',
            'উপার্জিত টাকা তোলার জন্য উল্টে নিজের টাকা জমা করতে বলা',
          ],
          safeAction: 'কোনো বৈধ সংস্থা কাজ দেওয়ার বা বেতন দেওয়ার জন্য টাকা চায় না। নম্বর ব্লক করুন ও ১৯৩০ নম্বরে রিপোর্ট করুন।',
          summary: 'ইউটিউব ভিডিও লাইক করার কাজ দিয়েছিল, এখন অর্জিত টাকা তোলার জন্য প্রিপেইড ডিপোজিট চাইছে।',
        },
      ],
    },

    citizenRules: {
      title: 'নাগরিকের আইনি অধিকার ও নিয়মাবলী',
      badge: 'আইনি নির্দেশিকা',
      subtitle: 'RBI জিরো-লায়াবিলিটি, BNS 2023 / IT আইন এবং DoT চক্ষু পোর্টাল',
      closeButton: 'বন্ধ করুন',
      tabs: {
        rbi: 'RBI জিরো-লায়াবিলিটি',
        laws: 'BNS 2023 ও IT আইন',
        sanchar: 'DoT চক্ষু পোর্টাল',
        ombudsman: 'RBI ন্যায়পাল',
      },
      rbiTitle: 'RBI গ্রাহক সুরক্ষা ও জিরো-লায়াবিলিটি ক্যালকুলেটর',
      rbiSubtitle: 'রিজার্ভ ব্যাংক অফ ইন্ডিয়ার সার্কুলার অনুযায়ী অননুমোদিত লেনদেনের দায়িত্ব আপনার রিপোর্ট করার সময়ের উপর নির্ধারিত হয়:',
      txnDateLabel: 'অননুমোদিত লেনদেনের তারিখ:',
      accountTypeLabel: 'অ্যাকাউন্ট / কার্ডের ধরন:',
      accountTypes: {
        savings: 'সঞ্চয়ী অ্যাকাউন্ট / প্রিপেইড ওয়ালেট (সাধারণ)',
        bsbda: 'বেসিক সেভিংস (BSBDA / জন ধন / RuPay)',
        creditLarge: 'কারেন্ট অ্যাকাউন্ট / ক্রেডিট কার্ড (> ₹৫ লাখ)',
      },
      liabilityTitle: 'আইনি দায়বদ্ধতার সিদ্ধান্ত:',
      statutoryClause: 'প্রযোজ্য আইনি ধারা:',
      formalNoticeDraftTitle: 'ব্যাংক নোডাল অফিসারের জন্য আইনি নোটিশের ড্রাফট তৈরি করুন',
      copyNoticeButton: 'নোটিশ কপি করুন',
      copiedNotice: 'কপি হয়েছে!',
      rbiRulesSummaryTitle: 'RBI আইনি নিয়মের সময়সূচি:',
      rbiRules: [
        {
          title: '০ থেকে ৩ কার্যদিবস (অবিলম্বে তথ্য দিলে)',
          liability: '₹০ (সম্পূর্ণ শূন্য দায়বদ্ধতা)',
          desc: 'তৃতীয় পক্ষের প্রতারণার ক্ষেত্রে গ্রাহকের কোনো দায় থাকে না। ব্যাংককে ১০ কার্যদিবসের মধ্যে টাকা ফেরত দিতে হবে।',
        },
        {
          title: '৪ থেকে ৭ কার্যদিবস (দেরিতে তথ্য দিলে)',
          liability: 'সীমাবদ্ধ আইনি দায়বদ্ধতা',
          desc: 'জন ধন অ্যাকাউন্টে সর্বোচ্চ ₹৫,০০০; সাধারণ সেভিংস অ্যাকাউন্টে সর্বোচ্চ ₹১০,০০০; ক্রেডিট কার্ডে ₹২৫,০০০।',
        },
        {
          title: '৭ কার্যদিবসের পর',
          liability: 'ব্যাংক বোর্ডের নীতি অনুযায়ী',
          desc: 'ব্যাংকের নিজস্ব নীতিমালা অনুসারে নির্ধারিত হবে, তবে অসন্তুষ্ট হলে সরাসরি আরবিআই ওম্বুডসম্যানের কাছে যাওয়ার পূর্ণ অধিকার রয়েছে।',
        },
      ],
      lawsTitle: 'ভারতীয় আইন ও সাইবার অপরাধের ধারাসমূহ',
      lawsSubtitle: 'ভারতীয় ন্যায় সংহিতা (BNS 2023) এবং তথ্য প্রযুক্তি (IT) আইন 2000 এর ধারাসমূহ:',
      lawsList: [
        {
          code: 'BNS ধারা 318(4) (পূর্বে IPC 420)',
          title: 'প্রতারণা ও অসদুপায়ে সম্পত্তি আদায়',
          penalty: '৭ বছর পর্যন্ত সশ্রম কারাদণ্ড + জরিমানা',
          desc: 'অনলাইন ফিশিং, ভুয়া বিনিয়োগ স্কিম ও অননুমোদিত ইউপিআই লেনদেনে প্রযোজ্য।',
        },
        {
          code: 'BNS ধারা 319 (পূর্বে IPC 419)',
          title: 'ছদ্মবেশ বা অন্য সেজে প্রতারণা করা',
          penalty: '৩ বছর পর্যন্ত কারাদণ্ড + জরিমানা',
          desc: 'পুলিশ, সিবিআই বা ব্যাংক আধিকারিক সেজে প্রতারণা করলে প্রযোজ্য হয়।',
        },
        {
          code: 'IT আইন ধারা 66C',
          title: 'পরিচয় চুরি (Identity Theft)',
          penalty: '৩ বছর পর্যন্ত কারাদণ্ড + ১ লাখ টাকা পর্যন্ত জরিমানা',
          desc: 'পাসওয়ার্ড, আধার, ওটিপি বা ডিজিটাল স্বাক্ষর চুরি করে অপব্যবহার করার শাস্তি।',
        },
        {
          code: 'IT আইন ধারা 66D',
          title: 'কম্পিউটার বা ফোনের মাধ্যমে অন্য সেজে প্রতারণা',
          penalty: '৩ বছর পর্যন্ত কারাদণ্ড + ১ লাখ টাকা পর্যন্ত জরিমানা',
          desc: 'ভুয়া ওয়েবসাইট, ক্ষতিকারক এপিকে ও ফিশিং লিঙ্কের জন্য প্রধান ধারা।',
        },
      ],
      sancharTitle: 'টেলিকম বিভাগ (DoT) এর নাগরিক পোর্টালসমূহ',
      sancharSubtitle: 'সঞ্চার সাথী (sancharsaathi.gov.in) দিয়ে নিজের সুরক্ষা নিশ্চিত করুন:',
      sancharPortals: [
        {
          name: 'চক্ষু পোর্টাল (Chakshu)',
          badge: 'ভুয়া কল ও SMS অভিযোগ',
          desc: 'সন্দেহজনক কল, ভুয়া এসএমএস ও হোয়াটসঅ্যাপ প্রতারণার অভিযোগ জানান। সরকার এই নম্বরগুলো ব্লক করে দেয়।',
          actionText: 'চক্ষু পোর্টাল খুলুন',
          url: 'https://sancharsaathi.gov.in/sfc/',
        },
        {
          name: 'TAFCOP (আপনার নামে কয়টি সিম আছে)',
          badge: 'সিম কার্ড যাচাইকরণ',
          desc: 'আপনার আধারে কয়টি মোবাইল সংযোগ সক্রিয় আছে তা যাচাই করুন এবং অপরিচিত সিম বন্ধ করুন।',
          actionText: 'TAFCOP খুলুন',
          url: 'https://tafcop.sancharsaathi.gov.in/',
        },
        {
          name: 'CEIR (হারিয়ে যাওয়া মোবাইল ব্লক করুন)',
          badge: 'মোবাইল ফোন ব্লকিং',
          desc: 'হারিয়ে যাওয়া বা চুরি হওয়া মোবাইলের IMEI ব্লক করে ব্যাংকিং অ্যাপের অপব্যবহার বন্ধ করুন।',
          actionText: 'CEIR খুলুন',
          url: 'https://ceir.sancharsaathi.gov.in/',
        },
      ],
      ombudsmanTitle: 'RBI সমন্বিত ন্যায়পাল (ওম্বুডসম্যান) প্রকল্প (2021)',
      ombudsmanSubtitle: 'ব্যাংক সমস্যা সমাধান না করলে রিজার্ভ ব্যাংকে অভিযোগ জানানোর উপায়:',
      ombudsmanSteps: [
        {
          step: 'ধাপ ১: ব্যাংকে লিখিত অভিযোগ',
          title: 'শাখা ব্যবস্থাপক / নোডাল অফিসারকে নোটিশ',
          desc: 'ব্যাংকে লিখিত অভিযোগ দিয়ে অভিযোগ নম্বর (Grievance Ref) সংগ্রহ করুন।',
        },
        {
          step: 'ধাপ ২: ৩০ দিনের সময়সীমা',
          title: 'ব্যাংককে অনুসন্ধানের সুযোগ দিন',
          desc: 'ব্যাংকের কাছে ৩০ দিনের সময় থাকে। আরবিআই নিয়ম অনুযায়ী ১০ দিনের মধ্যে অন্তর্বর্তী ক্রেডিট দেওয়া উচিত।',
        },
        {
          step: 'ধাপ ৩: আরবিআই ন্যায়পালের কাছে আবেদন',
          title: 'RBI CMS পোর্টালে বিনামূল্যে অভিযোগ (cms.rbi.org.in)',
          desc: 'ব্যাংক সমাধান না করলে কোনো খরচ ছাড়াই সরাসরি রিজার্ভ ব্যাংক ওম্বুডসম্যানের কাছে অনলাইন অভিযোগ জানান।',
        },
      ],
      cmsPortalLabel: 'রিজার্ভ ব্যাংক অভিযোগ ব্যবস্থাপনা পোর্টাল (CMS): cms.rbi.org.in',
      helplineFooter: 'আইনি আবেদন: RBI ওম্বুডসম্যান (cms.rbi.org.in) · সাইবার হেল্পলাইন: ১৯৩০',
    },
  },
};
