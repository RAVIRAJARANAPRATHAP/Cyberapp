# 🛡️ CyberRakshak (साइबर रक्षक) — Citizen Cyber Safety Assistant

> **Tagline:** *Apka Cyber Suraksha Sahayak* — An AI-powered shield against digital fraud for Indian citizens.

CyberRakshak is a production-ready, full-stack application built with **React 18, TypeScript, Tailwind CSS, and Google Gemini**. It combines **Retrieval-Augmented Generation (RAG)**, a **4-stage Responsible AI pipeline**, and statutory Indian cybersecurity advisories to help citizens evaluate suspicious calls, messages, links, and transactions in real time.

---

## 🌟 Key Features

- **🔍 Natural Language Scam Evaluation**: Describe any suspicious call, SMS, WhatsApp message, or video call in plain English or Indian regional languages.
- **🌐 6 Indian Languages Supported**: Full UI localization and multilingual response capability in **English, हिन्दी (Hindi), తెలుగు (Telugu), தமிழ் (Tamil), मराठी (Marathi), and বাংলা (Bengali)**.
- **🔗 Deep Link & Domain Inspector**: Analyzes suspicious URLs and APK download links for homoglyph/punycode attacks, raw IP addresses, deceptive subdomains, suspicious TLDs, and known URL shorteners.
- **⚡ Emergency "Golden Hour" Action Wizard**: Step-by-step guidance for citizens who have lost money within the critical first 2–4 hours (freezing accounts, contacting banks, dialing 1930).
- **🏦 Direct Indian Bank Helplines**: Instant one-click calling numbers and block SMS codes for major banks (SBI, HDFC, ICICI, Axis, PNB, Bank of Baroda, Kotak, Canara, IndusInd, and Union Bank).
- **📢 Real-Time Trending Fraud Alerts**: Live intelligence on ongoing crime waves (Digital Arrest, WhatsApp Stock Trading scams, Fake Electricity Bill APKs, FedEx narcotics parcel scams, illegal lending apps).
- **📜 Citizen Golden Rules Checklist**: Simple, actionable security protocols compliant with RBI Zero Liability guidelines and CERT-In advisories.

---

## 🛡️ Responsible AI & Privacy Pipeline

CyberRakshak enforces strict safety, privacy, and ethics safeguards **in code** before any user query ever reaches an AI model:

```
Citizen Query (Text / Message / URL)
       │
       ▼
┌─────────────────────────────────────────────────────────────┐
│ 1. PRIVACY GUARD (scrubSensitiveInfo)                       │
│    Redacts: Aadhaar, PAN card, 16-digit Debit/Credit cards, │
│    UPI IDs, 6-digit OTPs, and 10-digit mobile numbers       │
└──────────────────────────────┬──────────────────────────────┘
                               │ Clean Scrubbed Text
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. MULTILINGUAL CLASSIFIER (classifyQuery)                  │
│    Detects fraud category: Digital Arrest, Fake KYC,        │
│    Investment/Crypto, Voice Clone, Lottery, Part-Time Job   │
└──────────────────────────────┬──────────────────────────────┘
                               │ Category + Terms
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. GROUNDED RAG RETRIEVER (retrieveContext)                 │
│    Fetches official statutory SOPs and advisories from MHA, │
│    I4C, RBI, and CERT-In without hallucination              │
└──────────────────────────────┬──────────────────────────────┘
                               │ Grounded Chunks + Clean Input
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. GEMINI REASONING & ETHICS GUARD (assessAndRespond)       │
│    • Powered by Google Gemini (gemini-3.1-flash-lite)       │
│    • softenOverconfidence: Replaces absolute pronouncements │
│    • Statutory Grounding: Ensures 1930 & cybercrime.gov.in  │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
                   Structured Citizen Report
```

---

## 💻 Tech Stack

| Component | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React 18, TypeScript, Tailwind CSS v4, Lucide React | High-contrast, mobile-first accessible citizen UI |
| **Backend & API** | Express.js, TypeScript, Node.js | REST API, rate limiting, and security headers |
| **AI Engine** | Google Gemini (`@google/genai` — `gemini-3.1-flash-lite`) | RAG-grounded contextual reasoning |
| **Serverless** | Vercel Serverless Functions (`/api/index.ts`) | Zero-configuration auto-scaling deployment |
| **Knowledge Base** | Curated MHA / I4C / RBI Statutory Advisories | Verified sovereign fraud detection rules |

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory (or configure in your deployment dashboard):

```env
# Google Gemini API Key (Server-side secret)
GEMINI_API_KEY=AIzaSy...

# Demo mode (Optional):
# - Set to 0 (or omit) for live AI using Gemini
# - Set to 1 for offline deterministic fallback (no API quota used)
DEMO_MODE=0
```

### `DEMO_MODE` Explained:
- **`DEMO_MODE=0` (or omitted)**: The app runs in full production mode, invoking Gemini with RAG grounding for personalized, conversational risk assessments.
- **`DEMO_MODE=1`**: The app runs offline using built-in deterministic rule engines. Perfect for testing without consuming API credits or when offline.
- *Note:* If `GEMINI_API_KEY` is missing or invalid, CyberRakshak automatically falls back to demo mode without crashing.

---

## 🚀 Deployment

### Option 1: Deploy to Vercel (Recommended)

CyberRakshak includes built-in Vercel configuration (`vercel.json` and `api/index.ts`):

1. Push your repository to **GitHub**:
   ```bash
   git push -u origin main
   ```
2. Open [vercel.com](https://vercel.com) and click **"Add New Project"** → **Import** your repository.
3. Configure settings:
   - **Framework Preset**: `Vite` (auto-detected)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add your **Environment Variables**:
   - `GEMINI_API_KEY`: Your Gemini API key
   - `DEMO_MODE`: `0`
5. Click **Deploy**. Your app and API will be live instantly!

---

### Option 2: Run with Docker or Cloud Run

The project includes production bundling via `esbuild` and Node.js:

```bash
# Build frontend and compile backend
npm run build

# Start production server on port 3000
npm start
```

---

### Option 3: Local Development

```bash
# 1. Install dependencies
npm install

# 2. Set environment variables
cp .env.example .env
# Add your GEMINI_API_KEY in .env

# 3. Start development server (boots Express backend + Vite on port 3000)
npm run dev
```

Visit **http://localhost:3000** in your browser.

---

## 📂 Project Structure

```
cyberrakshak/
├── api/
│   └── index.ts                 # Vercel serverless entry point
├── knowledge_base/              # Grounding documents (MHA, I4C, RBI advisories)
│   ├── digital_arrest_scam.txt
│   ├── fake_govt_lottery_scam.txt
│   ├── fake_kyc_scam.txt
│   ├── investment_scam.txt
│   ├── reporting_procedure.txt
│   └── voice_clone_relative_scam.txt
├── src/
│   ├── components/              # UI components
│   │   ├── AppHeader.tsx        # Navigation, language picker, emergency CTA
│   │   ├── AppSidebar.tsx       # Desktop quick-access menu
│   │   ├── CitizenRulesModal.tsx # Safety guidelines & RBI rules
│   │   ├── EmergencyWizardModal.tsx # Golden-Hour action wizard & bank lines
│   │   ├── LinkInspectorModal.tsx # URL & APK link security scanner
│   │   ├── ResultCard.tsx       # AI risk assessment & action report
│   │   └── TrendingAlertsModal.tsx # Live scam wave bulletins
│   ├── data/
│   │   ├── bankHelplines.ts     # National bank helplines & block SMS
│   │   └── trendingAlerts.ts    # Advisory database
│   ├── i18n/                    # Multilingual strings (6 Indian languages)
│   │   ├── modalTranslations.ts
│   │   └── translations.ts
│   ├── server/                  # Backend agent & API logic
│   │   ├── agent.ts             # Pipeline orchestrator
│   │   ├── app.ts               # Express application routes & rate limiting
│   │   ├── classifier.ts        # Intent & scam categorization
│   │   ├── ethics.ts            # Responsible AI filters & grounding validator
│   │   ├── linkInspector.ts     # URL heuristic inspection logic
│   │   ├── privacy.ts           # PII redaction (Aadhaar, PAN, OTP, Cards)
│   │   ├── responder.ts         # Gemini LLM caller & fallback synthesizer
│   │   └── retriever.ts         # In-memory keyword & semantic RAG matcher
│   ├── App.tsx                  # Main frontend layout
│   └── main.tsx                 # React entry point
├── server.ts                    # Local & container server entry point
├── vercel.json                  # Vercel deployment rewrites & serverless configuration
├── package.json
└── README.md
```

---

## 🚨 Official Indian Cybercrime Helplines

CyberRakshak provides automated guidance and awareness. For actual financial loss or active harassment, contact official authorities immediately:

- 📞 **National Cyber Crime Helpline:** **1930** (24x7 Toll-Free)
- 🌐 **National Cybercrime Reporting Portal:** [https://cybercrime.gov.in](https://cybercrime.gov.in)
- 📲 **Telecom Fraud Reporting (Chakshu Facility):** [https://sancharsaathi.gov.in](https://sancharsaathi.gov.in)
- 🏦 **RBI Sachet Portal (Unauthorised Financial Schemes):** [https://sachet.rbi.org.in](https://sachet.rbi.org.in)

---

## ⚖️ Disclaimer

CyberRakshak is an educational and digital safety awareness assistant. It does not replace formal law enforcement, legal counsel, or official bank intervention. Never share your passwords, PINs, or OTPs with anyone.
