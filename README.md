# 🛡️ CyberRakshak — AI Cyber Fraud Awareness Assistant

> **Tagline:** *Apka Cyber Suraksha Sahayak* — Your AI-powered shield against digital fraud.

CyberRakshak is a Retrieval-Augmented Generation (RAG) + Agentic AI application that
helps Indian citizens identify and respond to cyber fraud in plain language. It checks
your description of a suspicious call, SMS, or message against a curated knowledge base
of verified fraud advisories and tells you what to do next — calmly, clearly, and without
storing any of your personal data.

> **Submission note:** Prototype currently uses a rule-based demo fallback for
> classification and response generation. The production architecture is designed for
> **IBM Granite via watsonx.ai** — see the Tech Stack section below.

---

## Table of Contents

1. [Project Purpose](#project-purpose)
2. [Architecture](#architecture)
3. [Tech Stack](#tech-stack)
4. [Deployment — Streamlit Community Cloud](#deployment--streamlit-community-cloud)
5. [Setup Instructions](#setup-instructions)
6. [Running the App](#running-the-app)
7. [Responsible AI Safeguards](#responsible-ai-safeguards)
8. [Knowledge Base Coverage](#knowledge-base-coverage)
9. [Project Structure](#project-structure)

---

## Project Purpose

India recorded over **1.5 million cybercrime complaints** in 2023, with elderly and
rural citizens disproportionately targeted. Most victims do not recognise scam patterns
in the moment. CyberRakshak bridges this gap by:

- Identifying the scam type from a natural-language description
- Retrieving the most relevant advisory evidence from a local knowledge base
- Generating a grounded, cited, plain-language response
- Enforcing responsible AI safeguards *in code* — not just in policy

---

## Architecture

CyberRakshak uses a **4-step agentic pipeline** where each step has a single, testable
responsibility and feeds its output directly into the next.

```
User Input
    │
    ▼  [Privacy guard: scrub_sensitive_info() applied first]
    │
┌───────────┐
│ STEP 1    │  classify_query()
│ CLASSIFY  │  → Detects scam category (digital_arrest, fake_kyc, etc.)
│           │  → IBM Granite LLM prompt  /  keyword fallback in demo mode
└─────┬─────┘
      │  category
      ▼
┌───────────┐
│ STEP 2    │  retrieve_context()
│ RETRIEVE  │  → Semantic similarity search over Chroma vector DB
│           │  → Returns top-3 advisory chunks + source filenames
└─────┬─────┘
      │  context chunks, sources
      ▼
┌────────────────┐
│ STEPS 3 + 4    │  assess_and_respond()
│ ASSESS +       │  → Single grounded IBM Granite prompt
│ RESPOND        │  → Compares user situation against retrieved red flags
│                │  → Produces: Risk Assessment / Reasoning / Action
└───────┬────────┘
        │  raw response
        ▼
┌─────────────────────────────────────┐
│ RESPONSIBLE AI FILTERS              │
│  soften_overconfidence()            │  ← Ethics
│  response_has_grounding() + append  │  ← Transparency
└──────────────────┬──────────────────┘
                   │  final response
                   ▼
              User sees output
         (scrubbed input stored in session)
```

See [`architecture.md`](architecture.md) for the Mermaid flowchart version.

---

## Tech Stack

| Layer | Technology | Role |
|-------|-----------|------|
| **LLM** | IBM Granite (`granite-13b-instruct-v2`) via **watsonx.ai** | Classification, assessment, response generation |
| **Agentic framework** | Python function chaining | 4-step classify → retrieve → assess → respond |
| **RAG / Vector DB** | [Chroma](https://www.trychroma.com/) | Persistent vector store for advisory documents |
| **Embeddings** | `all-MiniLM-L6-v2` (SentenceTransformers) | Local, free, no API key needed |
| **Web UI** | [Streamlit](https://streamlit.io/) | Chat-style browser interface |
| **Document loading** | LangChain (`TextLoader`, `RecursiveCharacterTextSplitter`) | Ingestion pipeline |
| **Responsible AI** | Custom Python functions in `agent.py` | Privacy, transparency, ethics guards |

### Why IBM Granite?

IBM Granite models are designed for enterprise trust — they are trained on
business-safe data, include built-in content filtering, and are accessible via the
IBM watsonx.ai platform that students can access through IBM SkillsBuild.

### Switching between backends

The backend is selected **automatically at startup** — no code change required:

| Scenario | What to set | Backend used |
|----------|------------|-------------|
| IBM watsonx.ai credentials available | `WATSONX_API_KEY` + `WATSONX_PROJECT_ID` | **IBM Granite** (primary) |
| Only Gemini key available | `GEMINI_API_KEY` (watsonx vars unset) | **Google Gemini 2.5 Flash** (fallback) |
| No API keys / offline demo | `DEMO_MODE=1` | Rule-based keyword classifier |

```powershell
# Use IBM Granite (production)
setx WATSONX_API_KEY  "your_key"
setx WATSONX_PROJECT_ID "your_project_id"
streamlit run app.py

# Use Gemini fallback (local dev)
setx GEMINI_API_KEY "your_gemini_key"
streamlit run app.py

# Use demo mode (no API key at all)
$env:DEMO_MODE="1"; streamlit run app.py
```

The startup banner always tells you which backend is active:
```
[CyberRakshak] Using backend: watsonx/Granite (ibm/granite-13b-instruct-v2)
[CyberRakshak] Using backend: Gemini (gemini-2.5-flash) (fallback — set WATSONX_API_KEY...)
[CyberRakshak] Using backend: DEMO_MODE (rule-based fallback — no LLM calls)
```

All three paths go through the same `generate_text()` wrapper in [`agent.py`](agent.py),
so the Responsible AI functions (`scrub_sensitive_info`, `response_has_grounding`,
`soften_overconfidence`) apply identically regardless of which backend is active.

---

## Deployment — Streamlit Community Cloud

> **Why not Vercel?** Vercel is a serverless/static platform. It does not support
> Python long-running servers (Streamlit requires one), local filesystem writes
> (ChromaDB needs them), or the large binary wheels in `requirements.txt`.
> Streamlit Community Cloud is the official free hosting for Streamlit apps and
> supports all of these out of the box.

### Deploy in ~5 minutes

1. **Push to GitHub** — make sure `vector_db/` is committed (it contains the
   pre-built embeddings; no rebuild step needed on the server):

   ```bash
   git add .
   git commit -m "ready for Streamlit Cloud deploy"
   git push origin main
   ```

2. **Go to [share.streamlit.io](https://share.streamlit.io)** → sign in with GitHub →
   click **"New app"**.

3. **Fill in the form:**
   - Repository: `your-username/CyberRakshak`
   - Branch: `main`
   - Main file path: `app.py`

4. **Add secrets** — click **"Advanced settings"** → **"Secrets"** → paste:

   ```toml
   # Paste your key(s) — only the ones you have
   GEMINI_API_KEY = "your-gemini-api-key"

   # IBM watsonx (optional, primary backend)
   # WATSONX_API_KEY    = "your-watsonx-api-key"
   # WATSONX_PROJECT_ID = "your-watsonx-project-id"
   # WATSONX_URL        = "https://us-south.ml.cloud.ibm.com"

   # No API key? Use demo mode:
   # DEMO_MODE = "1"
   ```

5. Click **"Deploy!"** — your app will be live at
   `https://your-username-cyberrakshak-app-xxxx.streamlit.app` in ~2 minutes.

### Alternative free platforms

| Platform | Notes |
|----------|-------|
| [Render](https://render.com) | Free tier, set start command to `streamlit run app.py --server.port $PORT --server.address 0.0.0.0` |
| [Railway](https://railway.app) | $5 free credit/month, similar setup |
| [Hugging Face Spaces](https://huggingface.co/spaces) | Free Streamlit hosting, 16 GB RAM tier available |

---

## Setup Instructions

### Prerequisites

- Python 3.10 or higher
- `pip` package manager

### 1. Install dependencies

```bash
pip install -r requirements.txt
```

### 2. Set environment variables

Copy `.env.example` to `.env` and fill in your values:

```bash
# IBM Granite (primary backend) — Windows PowerShell
setx WATSONX_API_KEY  "your_ibm_cloud_api_key"
setx WATSONX_PROJECT_ID "your_watsonx_project_id"
setx WATSONX_URL "https://us-south.ml.cloud.ibm.com"

# Google Gemini (fallback backend, used when watsonx vars are absent)
setx GEMINI_API_KEY "your_gemini_api_key"
```

> **No watsonx access yet?** Set only `GEMINI_API_KEY` and the system will
> automatically use Gemini as a working fallback.
> Set `DEMO_MODE=1` to skip all LLM calls entirely — keyword classifier and
> templated responses only. Perfect for offline demos and submission screenshots.

### 3. Build the knowledge base (run once)

```bash
python build_knowledge_base.py
```

This embeds all `.txt` files from `knowledge_base/` into `vector_db/` using the
local `all-MiniLM-L6-v2` model. Re-run any time you add or edit knowledge base files.

---

## Running the App

### Web UI (recommended for demos)

```bash
# With watsonx credentials
streamlit run app.py

# Demo mode (no API key needed)
$env:DEMO_MODE="1"; streamlit run app.py          # Windows PowerShell
DEMO_MODE=1 streamlit run app.py                  # Linux / macOS
```

Opens at **http://localhost:8501**

### CLI (for testing / scripting)

```bash
python agent.py
# or pass input directly:
python agent.py "A man on video call says I am under digital arrest"
```

---

## Responsible AI Safeguards

These are **enforced in code**, not just stated in policy. All three functions live in
[`agent.py`](agent.py) under the `# RESPONSIBLE AI LAYER` section and run on every
query regardless of DEMO_MODE or LLM backend.

### 1. Privacy — `scrub_sensitive_info(text)`

```python
# Called as the very first action in run_agent(), before any LLM call or log
user_input_clean = scrub_sensitive_info(user_input)
```

Automatically redacts personal/financial identifiers via regex **before** they are
passed to any model, stored in session history, or echoed back in the UI:

| Pattern | Regex approach | Example |
|---------|---------------|---------|
| Aadhaar-like 12-digit | 3×4-digit groups, spaces/hyphens | `1234 5678 9012` → `[AADHAAR REDACTED]` |
| 16-digit card number | 4×4-digit groups (runs before Aadhaar rule) | `4111 1111 1111 1111` → `[CARD NUMBER REDACTED]` |
| 6-digit OTP | Standalone, word-boundary anchored | `847291` → `[OTP REDACTED]` |
| 10-digit phone | Standalone, word-boundary anchored | `9876543210` → `[PHONE REDACTED]` |

### 2. Transparency — `response_has_grounding(response_text)`

```python
# Called in assess_and_respond() after every LLM generation
if not response_has_grounding(raw):
    raw += "\n\n⚠️ Please independently verify via helpline 1930 or cybercrime.gov.in."
```

Verifies the response contains at least one grounding signal (`1930`,
`cybercrime.gov.in`, `advisory`, `report`). If the model omits them, a fallback
notice is **automatically appended** — the action information is never absent.

### 3. Ethics — `soften_overconfidence(text)`

```python
# Called in assess_and_respond() before returning any response
raw = soften_overconfidence(raw)
```

Post-processes the LLM output to replace absolute phrasing with probabilistic language:

| Before | After |
|--------|-------|
| "this is definitely a scam" | "this strongly matches a known scam pattern" |
| "you are being scammed" | "this appears to match a known scam pattern" |
| "confirmed scam" | "pattern consistent with a known scam" |

### 4. Fairness — tested across literacy levels

The classifier uses **word-boundary regex matching** (not simple substring search)
to avoid false positives on benign messages. It has been explicitly tested with:

- Well-written English queries
- Informal Hindi-English mixed input (`"bhai CBI officer bol raha hai digital arrest"`)
- Broken English from a low-literacy user (`"someone call me say police case money send"`)
- A **benign bank SMS** (`"scheduled maintenance, no links or payment requested"`) —
  confirmed **does not over-flag** as a scam (classified `other`, LOW risk).

---

## Knowledge Base Coverage

| File | Scam type covered |
|------|-------------------|
| `digital_arrest_scam.txt` | CBI/police video-call coercion, customs parcels, digital arrest |
| `fake_kyc_scam.txt` | Bank KYC phishing, OTP harvesting, fake links |
| `investment_scam.txt` | WhatsApp group stock tips, guaranteed returns, crypto fraud |
| `voice_clone_relative_scam.txt` | AI voice cloning, relative-in-trouble, fake emergencies |
| `fake_govt_lottery_scam.txt` | Lucky draw, government prize, processing fee demand |
| `reporting_procedure.txt` | Helpline 1930, cybercrime.gov.in, step-by-step reporting |

---

## Project Structure

```
CyberRakshak/
├── agent.py                        # Core 4-step agentic pipeline + Responsible AI layer
├── app.py                          # Streamlit web interface
├── build_knowledge_base.py         # One-time ingestion: txt → Chroma vector DB
├── test_retrieval.py               # Smoke-tests for the vector store
├── requirements.txt                # Python dependencies
├── .env.example                    # Environment variable template (copy to .env)
├── .streamlit/
│   └── secrets.toml.example        # Streamlit Cloud secrets template
├── README.md                       # This file
├── architecture.md                 # Mermaid architecture diagram
├── knowledge_base/                 # Advisory text documents
│   ├── digital_arrest_scam.txt
│   ├── fake_kyc_scam.txt
│   ├── investment_scam.txt
│   ├── voice_clone_relative_scam.txt
│   ├── fake_govt_lottery_scam.txt
│   └── reporting_procedure.txt
└── vector_db/                      # Chroma persisted vector store (committed, no rebuild needed)
```

---

## Disclaimer

CyberRakshak provides awareness guidance only — not a legal verdict or official advice.
Always verify suspicious activity through official channels:

- **National Cyber Crime Helpline:** 📞 1930
- **Online complaint:** 🌐 [cybercrime.gov.in](https://cybercrime.gov.in)
