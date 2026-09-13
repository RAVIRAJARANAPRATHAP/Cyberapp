export interface TrendingScamAlert {
  id: string;
  title: string;
  agency: string;
  tag: string;
  severity: 'high' | 'critical' | 'moderate';
  summary: string;
  tactic: string;
  warningSigns: string[];
  safeAction: string;
}

export const TRENDING_SCAM_ALERTS: TrendingScamAlert[] = [
  {
    id: 'digital-arrest',
    title: 'Digital Arrest & Virtual Police Interrogation Scam',
    agency: 'I4C / Ministry of Home Affairs & Supreme Court',
    tag: 'Extortion Call',
    severity: 'critical',
    summary: 'Fraudsters impersonate CBI, Mumbai Police, Narcotics Bureau, or TRAI claiming your Aadhaar or SIM was found in illegal cargo/money laundering.',
    tactic: 'They place video calls on WhatsApp/Skype wearing fake police uniforms with logos and demand you stay isolated on camera ("digital arrest") while transferring your savings into "safe RBI clearing accounts" for verification.',
    warningSigns: [
      'Demand to stay on video call in a locked room',
      'Forged arrest warrants with Supreme Court or CBI logos sent on WhatsApp',
      'Threat of immediate arrest unless funds are moved to a "secret security account"',
      'Claims that TRAI will disconnect all your SIM cards in 2 hours',
    ],
    safeAction: 'Hang up immediately. No Indian police officer or court can place anyone under "digital arrest" or demand money over a video call. Call 1930.',
  },
  {
    id: 'electricity-bill',
    title: 'Electricity Bill Cut-Off Tonight SMS',
    agency: 'CERT-In / State Electricity Boards',
    tag: 'Phishing / Malware',
    severity: 'high',
    summary: 'SMS warning that your electricity power will be disconnected at 9:30 PM tonight due to an unpaid bill.',
    tactic: 'Victim is told to call a mobile number or click a link to install an APK file (e.g. BijliUpdate.apk) or install TeamViewer/AnyDesk to pay a ₹10 update charge, draining their bank accounts.',
    warningSigns: [
      'Sent from personal 10-digit mobile number, not official discom SMS header (e.g., BESCOM, TATA, BSES)',
      'Artificial deadline like "Tonight 9:30 PM electricity will be disconnected"',
      'Instruction to download an APK file or install quick-support apps',
    ],
    safeAction: 'Never call personal phone numbers or install APKs. Always pay or check bills only through the official state power distribution website or trusted utility apps.',
  },
  {
    id: 'part-time-task',
    title: 'YouTube Review / Hotel Rating "Work from Home" Task Scam',
    agency: 'I4C / State Cyber Police',
    tag: 'Investment Fraud',
    severity: 'critical',
    summary: 'Offers ₹2,000–₹5,000 daily for liking YouTube videos, reviewing hotels on Google Maps, or rating products.',
    tactic: 'Initial small rewards (₹150–₹500) are paid to build confidence. Victims are then shifted to Telegram VIP groups and coerced to deposit large sums into "cryptocurrency prepaid tasks" with no withdrawal possible.',
    warningSigns: [
      'Unsolicited WhatsApp or Telegram message from international numbers (+62, +84, +92, +44)',
      'Offers high daily income for trivial tasks like liking video clips',
      'Invitation to join private Telegram group for "Crypto Trading" tasks',
      'Demands you deposit money to release your earned balance',
    ],
    safeAction: 'Legitimate companies never pay via Telegram for liking videos or ask you to pay money to withdraw your salary. Block and report.',
  },
  {
    id: 'apk-wedding-challan',
    title: 'Malicious Android APKs (Wedding Card / E-Challan / Speed Post)',
    agency: 'CERT-In Advisory',
    tag: 'Android Malware / Spyware',
    severity: 'critical',
    summary: 'Attackers send files disguised as "Wedding_Invitation.apk" or "Traffic_Challan_Notice.apk" or "IndiaPost_Delivery.apk".',
    tactic: 'Installing the APK gives hackers SMS permissions, allowing them to intercept OTPs silently in the background while monitoring bank notifications.',
    warningSigns: [
      'File extension ends in .apk instead of .pdf or .jpg for a card or notice',
      'Phone prompts "Install unknown apps" with warning dialogs',
      'Sender asks you to install the file to view wedding photos or pay a nominal fine',
    ],
    safeAction: 'Never tap or install APK files received on WhatsApp or Telegram. Government traffic challans are only viewed on echallan.parivahan.gov.in.',
  },
  {
    id: 'ai-voice-clone',
    title: 'AI Voice Clone of Relative in Police Custody / Accident',
    agency: 'I4C / Delhi Police Cyber Cell',
    tag: 'Deepfake Extortion',
    severity: 'high',
    summary: 'A panicked voice sounding identical to your son, daughter, or nephew calls saying they have been arrested or met with a fatal accident.',
    tactic: 'Scammers clone voice snippets from social media videos using generative AI and demand immediate money transfer to a fake lawyer or police bail account.',
    warningSigns: [
      'Extreme emotional distress and shouting to mask synthetic voice glitches',
      'Demand for immediate UPI transfer within 10 minutes to prevent jail time',
      'Incoming call comes from an unknown number or spoofed caller ID',
    ],
    safeAction: 'Do not panic. Hang up and call your family member directly on their usual mobile number or reach out to their friends/hostel before sending any money.',
  },
];
