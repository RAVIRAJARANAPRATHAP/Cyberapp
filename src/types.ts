export type ScamCategory =
  | 'digital_arrest'
  | 'fake_kyc'
  | 'investment_scam'
  | 'voice_clone_relative'
  | 'fake_govt_lottery'
  | 'other';

export type SupportedLanguage = 'en' | 'hi' | 'te' | 'ta' | 'mr' | 'bn';

export interface LanguageOption {
  code: SupportedLanguage;
  label: string;
  nativeLabel: string;
}

export interface CategoryMeta {
  label: string;
  level: 'error' | 'warning' | 'info';
  tip: string;
}

export interface AgentResult {
  category: ScamCategory;
  sources: string[];
  response: string;
  input_scrubbed: string;
  backendUsed?: string;
  language?: SupportedLanguage;
}

export interface HistoryItem {
  id: string;
  user_msg: string;
  result: AgentResult;
  timestamp: string;
}

export interface LinkAnalysisResult {
  url: string;
  isHighRisk: boolean;
  riskScore: number; // 0 to 100
  verdict: string;
  redFlags: string[];
  claimedEntity?: string;
  isApk: boolean;
  isShortlink: boolean;
  isHttp: boolean;
  recommendations: string[];
  backendUsed?: string;
}

export interface BankHelpline {
  name: string;
  category: 'bank' | 'upi' | 'wallet';
  tollFree: string;
  altPhone?: string;
  freezeAction: string;
  portalUrl: string;
}

export interface IncidentReportDraft {
  victimName: string;
  incidentDate: string;
  incidentTime: string;
  fraudType: string;
  amountLost: string;
  suspectContact: string; // phone/email/telegram
  suspectAccountOrUpi: string;
  transactionRef: string; // UTR / Txn ID
  bankName: string;
  description: string;
}
