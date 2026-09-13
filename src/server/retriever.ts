/**
 * CyberRakshak Knowledge Base and RAG Retrieval Engine
 * Houses statutory SOPs, RBI circulars, and MHA/I4C fraud advisories.
 */

export interface AdvisoryDoc {
  id: string;
  source: string;
  title: string;
  category: string;
  content: string;
}

export const KNOWLEDGE_BASE: AdvisoryDoc[] = [
  {
    id: "digital_arrest",
    source: "mha_i4c_digital_arrest_advisory_2024.txt",
    title: "MHA/I4C Advisory: Digital Arrest Scams",
    category: "digital_arrest",
    content: `DOCUMENT: Ministry of Home Affairs / I4C Advisory on "Digital Arrest" Scams
DATE: October 2024 (Updated November 2024 following Prime Minister's Mann Ki Baat address)

WHAT IS "DIGITAL ARREST"?
"Digital Arrest" is a complete fraud. Under Indian law — including the Bharatiya Nagarik Suraksha Sanhita (BNSS), Indian Penal Code (IPC), Code of Criminal Procedure (CrPC), and Information Technology Act — there is NO provision for "digital arrest." No police officer, CBI agent, ED official, Customs officer, or court judge can arrest anyone over a phone call, WhatsApp video call, or Skype.

HOW THE SCAM WORKS:
1. The victim receives a phone call, often automated (IVR), claiming:
   - A courier parcel sent in their name (to Taiwan, Thailand, Cambodia, etc.) containing drugs, fake passports, or illegal SIM cards has been intercepted.
   - Their Aadhaar number or mobile number has been used in money laundering (commonly referencing Naresh Goyal/Jet Airways or similar high-profile cases).
   - An arrest warrant has been issued in their name by the Supreme Court, CBI, or Mumbai Police.
2. The caller claims to "transfer" the call to the "CBI," "Mumbai Police Crime Branch," or "Cyber Crime Cell."
3. The victim is forced to move to a video call (WhatsApp or Skype) and ordered to stay in a closed room with the camera on.
4. Fraudsters wear fake police uniforms and display fake arrest warrants, Supreme Court notices, or RBI letters.
5. The victim is told their bank accounts will be seized unless they transfer their funds to a "government secret supervision account" or "RBI verification account" for "financial auditing." They are promised the money will be returned within 30 minutes. Once sent, the money is gone.

RED FLAGS — IMMEDIATE WARNING SIGNS:
- Any caller claiming you are under "digital arrest."
- Any video call showing people in police uniforms asking about your bank accounts.
- Any demand to stay on a video call and not speak to family members or lawyers.
- Any instruction to transfer money to ANY account for "verification," "clearance," or "RBI auditing."
- Letters bearing fake seals of CBI, ED, Supreme Court, or RBI sent via WhatsApp.
- Urgency and threats of immediate physical arrest if you disconnect.

STATUTORY ADVICE — WHAT TO DO:
- Stop. Think. Take Action.
- Hang up immediately. You cannot be arrested over a video call.
- Do not transfer any money, regardless of threats.
- Take screenshots of the caller's number and any documents sent.
- Immediately call the National Cybercrime Helpline: 1930.
- Report at: cybercrime.gov.in
- Report the mobile number on the Chakshu facility at: sancharsaathi.gov.in`
  },
  {
    id: "fake_kyc",
    source: "rbi_fake_kyc_advisory_2024.txt",
    title: "RBI Advisory: Fake KYC and Phishing Scams",
    category: "fake_kyc",
    content: `DOCUMENT: Reserve Bank of India (RBI) Advisory on Fake KYC and Phishing Frauds
DATE: August 2024

WHAT IS A FAKE KYC SCAM?
Fraudsters send unsolicited SMS, WhatsApp messages, or make phone calls impersonating banks, telecom service providers (Jio, Airtel, Vi), payment apps (Paytm, Google Pay, PhonePe), or electricity distribution companies (Discoms). They claim the victim's account, SIM card, or electricity connection will be suspended/blocked immediately unless "KYC verification" or a bill payment is completed.

HOW THE SCAM WORKS:
1. The victim receives a message like: "Dear customer, your SBI account has been blocked today. Please update your PAN/KYC immediately by clicking: [suspicious link]" or "Electricity will be disconnected at 9:30 PM due to unpaid bill. Call 98xxxxxxxx."
2. The link leads to a phishing website that looks identical to the real bank or utility portal.
3. The victim is asked to enter NetBanking credentials, debit card number, ATM PIN, CVV, or Aadhaar.
4. Alternatively, the victim is asked to download an APK file or remote access apps such as AnyDesk, TeamViewer, or QuickSupport.
5. Once installed, fraudsters view OTPs in real time and drain bank accounts within minutes.

RED FLAGS:
- SMS from personal mobile numbers (10-digit numbers) rather than official bank SMS sender IDs (e.g., VM-SBIINB, AD-HDFCBK).
- Threats of immediate account suspension or service disconnection within hours.
- Requests to click a link to "update KYC" or "link PAN with Aadhaar."
- Requests to share OTP, ATM PIN, CVV, or passwords.
- Requests to download any APK file or screen-sharing application.

WHAT TO DO:
- Never click links in SMS or WhatsApp claiming your bank account or SIM is blocked.
- Banks never send links to update KYC. KYC is updated at your branch or via the official bank app.
- Never share OTP, UPI PIN, or ATM PIN with anyone.
- If money is deducted, call your bank immediately to freeze the account/card.
- Report immediately to 1930 and cybercrime.gov.in.`
  },
  {
    id: "investment_scam",
    source: "sebi_fake_trading_apps_advisory_2024.txt",
    title: "SEBI Advisory: Fraudulent Trading Apps & Investment Scams",
    category: "investment_scam",
    content: `DOCUMENT: SEBI Advisory on Unregistered Trading Platforms & Social Media Fraud
DATE: September 2024

WHAT ARE FAKE INVESTMENT / TRADING SCAMS?
Fraudsters exploit public interest in the stock market, IPOs, and cryptocurrency by running fake investment schemes through WhatsApp, Telegram, Facebook, and Instagram. They promise guaranteed high returns, "institutional trading accounts," or pre-allotment of IPO shares.

HOW THE SCAM WORKS:
1. The victim is invited to a WhatsApp or Telegram group offering "free stock tips" or "institutional trading insights."
2. Group members (who are fake accounts / confederates) post screenshots of massive daily profits.
3. The victim is lured to deposit a small amount (Rs. 5,000 to 10,000) into a custom trading app provided as an APK link.
4. The app falsely shows profits multiplying rapidly.
5. When the victim attempts to withdraw funds, they are told they must pay "20% SEBI tax," "brokerage clearance," or "capital gains advance deposit."
6. Once large sums are deposited, the fraudsters block the victim and delete the group.

RED FLAGS:
- Promises of "guaranteed" daily or monthly returns (e.g. 5% daily, 100% monthly).
- Invitations to WhatsApp/Telegram groups for exclusive institutional trading.
- Instructions to transfer investment money to individual personal bank accounts or unknown UPI IDs.
- Trading apps distributed via APK links rather than official Google Play Store or Apple App Store.
- Demands for additional fees or "taxes" before you can withdraw your own money.

WHAT TO DO:
- Only invest through SEBI-registered brokers (verify at sebi.gov.in).
- Never transfer money to an individual's personal account for stock market investments.
- Do not install trading APK files from social media groups.
- Report immediately to 1930 and cybercrime.gov.in.`
  },
  {
    id: "voice_clone_relative",
    source: "cert_in_ai_voice_cloning_advisory_2024.txt",
    title: "CERT-In Advisory: AI Voice Cloning & Relative in Trouble Scams",
    category: "voice_clone_relative",
    content: `DOCUMENT: CERT-In Advisory on AI Voice Cloning and Emergency Impersonation Frauds
DATE: July 2024

WHAT IS THE AI VOICE CLONING / RELATIVE SCAM?
Using Artificial Intelligence voice synthesis tools, fraudsters clone the voice of a family member (son, daughter, grandchild studying abroad or in another city) using short audio clips gathered from social media videos. They call parents or grandparents pretending to be the relative or a police officer / lawyer, claiming an urgent emergency requiring immediate money transfer.

HOW THE SCAM WORKS:
1. The victim receives a panicked call. The voice sounds remarkably like their relative, crying or in distress: "Papa, please help me! I'm in big trouble."
2. Another person takes the phone claiming to be a police officer, doctor, or embassy official.
3. They claim the relative has been arrested for a fatal accident, caught with narcotics, or hospitalized with life-threatening injuries.
4. They demand an immediate money transfer via UPI or RTGS to settle the matter or pay for emergency surgery.
5. They warn the victim not to call anyone or the relative will go to jail.

RED FLAGS:
- The caller demands immediate secrecy ("Do not tell your spouse or family").
- Urgent demand for money via UPI, crypto, or cash transfer to a third-party account.
- The call originates from an unknown international or virtual number.
- High emotional pressure and refusal to let you speak clearly to the relative.

WHAT TO DO:
- Stay calm. Hang up immediately.
- Independently dial your relative on their known phone number saved in your phonebook.
- Establish a "family safe word" in advance to verify identity during emergencies.
- Do not send money under emotional pressure without independent physical verification.
- Report the incident to 1930 and cybercrime.gov.in.`
  },
  {
    id: "fake_govt_lottery",
    source: "fake_govt_lottery_scam.txt",
    title: "Fake Government Scheme / Lottery Scam",
    category: "fake_govt_lottery",
    content: `DOCUMENT: Advisory on Fake Government Schemes and Lottery Frauds
DATE: 2024

WHAT IS A FAKE GOVERNMENT / LOTTERY SCAM?
Victims receive calls, SMS, or WhatsApp messages claiming they have won a lottery (e.g. KBC, telecom lucky draw) or have been selected for a government grant/subsidy (e.g. PM Awas Yojana, PM Kisan, free laptop). To claim the funds, they are asked to pay an upfront "processing fee" or "GST deposit."

RED FLAGS:
- Winning a lottery you never bought a ticket for.
- Government schemes requiring upfront fee transfer to personal UPI handles.
- Demands for Aadhaar, PAN, and bank details sent over WhatsApp.

WHAT TO DO:
- Government subsidies are credited directly via DBT (Direct Benefit Transfer) to verified accounts without any upfront fee.
- Never pay fees to receive prize money.
- Report immediately to 1930 and cybercrime.gov.in.`
  },
  {
    id: "reporting_procedure",
    source: "national_cybercrime_reporting_sop.txt",
    title: "Standard Operating Procedure: Reporting Cybercrime in India",
    category: "reporting",
    content: `DOCUMENT: Standard Operating Procedure for Reporting Cyber Fraud in India
HELPLINE: 1930 (Available 24x7)
PORTAL: https://cybercrime.gov.in

THE GOLDEN HOUR (FIRST 2 TO 4 HOURS):
If money was deducted fraudulently:
1. Immediately dial 1930. The Citizen Financial Cyber Fraud Reporting and Management System (CFCFRMS) can coordinate with beneficiary banks to freeze the stolen funds before the fraudster withdraws them from an ATM.
2. Call your bank's 24x7 fraud helpline to block debit cards, net banking, and UPI access.
3. Under RBI circular on Customer Protection (RBI/2017-18/15):
   - Zero Liability: If you report an unauthorized electronic transaction within 3 working days, your liability is ZERO.
   - Limited Liability: If reported within 4 to 7 working days, liability is capped at Rs. 5,000 to Rs. 25,000 depending on account type.

EVIDENCE TO PRESERVE:
- Exact date, time, and transaction reference numbers (UTR / UPI Ref No).
- Screenshots of fraudulent messages, caller ID, and payment confirmations.
- Bank statement showing the debit entry.`
  }
];

export function retrieveContext(
  userInput: string,
  targetCategory?: string
): { context: string; sources: string[] } {
  const text = userInput.toLowerCase();
  const tokens = text.match(/[\p{L}\p{N}]{3,}/gu) || [];

  const scoredDocs = KNOWLEDGE_BASE.map(doc => {
    let score = 0;
    const docLower = doc.content.toLowerCase();
    const titleLower = doc.title.toLowerCase();

    // High boost if matching detected category
    if (targetCategory && doc.category === targetCategory) {
      score += 150;
    }

    // Always include reporting SOP as grounding support
    if (doc.category === "reporting") {
      score += 25;
    }

    // Token frequency matching
    for (const token of tokens) {
      if (docLower.includes(token)) {
        score += 8;
        if (titleLower.includes(token)) {
          score += 15;
        }
      }
    }

    return { doc, score };
  });

  scoredDocs.sort((a, b) => b.score - a.score);

  // Return top 3 most relevant documents
  const topDocs = scoredDocs.slice(0, 3).map(s => s.doc);
  const context = topDocs.map(d => `--- SOURCE: ${d.source} ---\n${d.content}`).join("\n\n");
  const sources = Array.from(new Set(topDocs.map(d => d.source)));

  return { context, sources };
}
