import React, { useState, useEffect } from 'react';
import {
  X,
  PhoneCall,
  ShieldAlert,
  Copy,
  CheckCircle2,
  ExternalLink,
  Clock,
  FileText,
  Building2,
  AlertTriangle,
  Search,
  Lock
} from 'lucide-react';
import { BANK_HELPLINES } from '../data/bankHelplines.ts';
import { IncidentReportDraft, SupportedLanguage } from '../types.ts';
import { copyToClipboard } from '../utils/clipboard.ts';
import { MODAL_TRANSLATIONS } from '../i18n/modalTranslations.ts';

interface EmergencyWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  language?: SupportedLanguage;
}

export const EmergencyWizardModal: React.FC<EmergencyWizardModalProps> = ({ isOpen, onClose, language = 'en' }) => {
  const [activeTab, setActiveTab] = useState<'checklist' | 'banks' | 'fir'>('checklist');
  const [bankSearch, setBankSearch] = useState('');
  const [copiedBank, setCopiedBank] = useState<string | null>(null);
  const [copiedFir, setCopiedFir] = useState(false);

  const t = MODAL_TRANSLATIONS[language] || MODAL_TRANSLATIONS.en;
  const ew = t.emergencyWizard;

  // FIR generator state
  const [firData, setFirData] = useState<IncidentReportDraft>({
    victimName: '',
    incidentDate: new Date().toISOString().split('T')[0],
    incidentTime: new Date().toTimeString().slice(0, 5),
    fraudType: 'Digital Arrest / Impersonation Scam',
    amountLost: '',
    suspectContact: '',
    suspectAccountOrUpi: '',
    transactionRef: '',
    bankName: 'State Bank of India (SBI)',
    description: '',
  });

  const [generatedFir, setGeneratedFir] = useState<string | null>(null);

  // Lock body scroll and listen for Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredBanks = BANK_HELPLINES.filter(
    b =>
      b.name.toLowerCase().includes(bankSearch.toLowerCase()) ||
      b.tollFree.includes(bankSearch) ||
      b.category.toLowerCase().includes(bankSearch.toLowerCase())
  );

  const handleCopyPhone = async (bankName: string, phone: string) => {
    const success = await copyToClipboard(phone.replace(/\s+/g, ''));
    if (success) {
      setCopiedBank(bankName);
      setTimeout(() => setCopiedBank(null), 2000);
    }
  };

  const generateComplaintStatement = () => {
    const statement = `FORMAL INCIDENT COMPLAINT FOR CYBERCRIME REPORTING PORTAL (1930 / cybercrime.gov.in)
================================================================================
Reference: Initial Report under Section 66D of Information Technology Act 2000 / BNS 2023
Date & Time of Incident: ${firData.incidentDate || 'Recent'} at ${firData.incidentTime || 'N/A'}
Complaint Filed By: ${firData.victimName.trim() || 'Complainant (Citizen)'}

1. INCIDENT CLASSIFICATION:
- Nature of Cybercrime: ${firData.fraudType}
- Total Financial Loss Claimed: ₹${firData.amountLost.trim() || '0 (Attempted/Unknown)'}
- Complainant Bank / Payment App: ${firData.bankName}

2. PERPETRATOR / SUSPECT PARTICULARS:
- Suspect Contact No / Channel: ${firData.suspectContact.trim() || 'Not Provided / Spoofed Call'}
- Suspect Beneficiary Account / UPI ID: ${firData.suspectAccountOrUpi.trim() || 'N/A'}
- Disputed Transaction Reference / UTR Number(s): ${firData.transactionRef.trim() || 'Pending bank statement receipt'}

3. FACTUAL SUMMARY OF INCIDENT:
${firData.description.trim() || 'The complainant received a deceptive communication falsely claiming urgency/coercion, which resulted in unauthorized fund transfers and financial loss.'}

4. IMMEDIATE STEPS TAKEN BY COMPLAINANT:
- Incident reported to National Cyber Crime Helpline (1930).
- Immediate freeze request placed with ${firData.bankName}.
- All transaction screenshots, chat logs, and caller IDs preserved as annexures.

5. STATUTORY RELIEF REQUESTED:
- Immediate lien/freeze on the suspect beneficiary bank account / UPI VPA to prevent cash withdrawal.
- Formal registration and investigation by jurisdictional Cyber Crime Police Station under Section 66D IT Act and relevant provisions of Bharatiya Nyaya Sanhita (BNS 2023).`;

    setGeneratedFir(statement);
  };

  const handleCopyFir = async () => {
    if (!generatedFir) return;
    const success = await copyToClipboard(generatedFir);
    if (success) {
      setCopiedFir(true);
      setTimeout(() => setCopiedFir(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="emergency-wizard-title"
    >
      <div
        id="emergency-wizard-dialog"
        className="bg-white dark:bg-slate-900 border-t sm:border border-slate-200 dark:border-slate-800 rounded-t-3xl sm:rounded-2xl w-full max-w-3xl h-[92vh] sm:h-auto sm:max-h-[90vh] flex flex-col shadow-2xl overflow-hidden transition-colors"
      >
        {/* Mobile drag handle */}
        <div className="pt-2 pb-1 sm:hidden flex justify-center bg-rose-50/80 dark:bg-rose-950/40">
          <div className="w-12 h-1.5 bg-rose-300 dark:bg-rose-800 rounded-full" />
        </div>

        {/* Header */}
        <div className="px-4 py-3 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-rose-50/80 dark:bg-rose-950/40 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <ShieldAlert className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 id="emergency-wizard-title" className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate">
                  {ew.title}
                </h2>
                <span className="bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide flex-shrink-0">
                  {ew.goldenHourBadge}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-rose-950 dark:text-rose-200 mt-0.5 truncate sm:whitespace-normal font-medium">
                {ew.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-white/80 dark:bg-slate-800/80 sm:bg-transparent hover:bg-white dark:hover:bg-slate-800 cursor-pointer transition-colors flex-shrink-0"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div
          id="wizard-tab-container"
          role="tablist"
          aria-label="Emergency Action Wizard Navigation"
          className="flex overflow-x-auto no-scrollbar border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 px-3 sm:px-5 gap-1.5 sm:gap-2 text-xs font-semibold whitespace-nowrap touch-scroll items-center"
        >
          <button
            id="wizard-tab-checklist"
            role="tab"
            aria-selected={activeTab === 'checklist'}
            onClick={() => setActiveTab('checklist')}
            className={`-mb-px py-3 px-3.5 sm:px-4 min-h-[44px] border-b-2 flex items-center gap-2 rounded-t-lg transition-all cursor-pointer flex-shrink-0 active:scale-[0.98] ${
              activeTab === 'checklist'
                ? 'border-rose-600 text-rose-700 dark:text-rose-400 font-bold bg-white dark:bg-slate-900 shadow-2xs'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-900/50'
            }`}
          >
            <Clock className="w-4 h-4 flex-shrink-0" />
            <span>{ew.tabs.checklist}</span>
          </button>
          <button
            id="wizard-tab-banks"
            role="tab"
            aria-selected={activeTab === 'banks'}
            onClick={() => setActiveTab('banks')}
            className={`-mb-px py-3 px-3.5 sm:px-4 min-h-[44px] border-b-2 flex items-center gap-2 rounded-t-lg transition-all cursor-pointer flex-shrink-0 active:scale-[0.98] ${
              activeTab === 'banks'
                ? 'border-rose-600 text-rose-700 dark:text-rose-400 font-bold bg-white dark:bg-slate-900 shadow-2xs'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-900/50'
            }`}
          >
            <Building2 className="w-4 h-4 flex-shrink-0" />
            <span>{ew.tabs.banks}</span>
          </button>
          <button
            id="wizard-tab-fir"
            role="tab"
            aria-selected={activeTab === 'fir'}
            onClick={() => setActiveTab('fir')}
            className={`-mb-px py-3 px-3.5 sm:px-4 min-h-[44px] border-b-2 flex items-center gap-2 rounded-t-lg transition-all cursor-pointer flex-shrink-0 active:scale-[0.98] ${
              activeTab === 'fir'
                ? 'border-rose-600 text-rose-700 dark:text-rose-400 font-bold bg-white dark:bg-slate-900 shadow-2xs'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-900/50'
            }`}
          >
            <FileText className="w-4 h-4 flex-shrink-0" />
            <span>{ew.tabs.fir}</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 text-sm text-slate-700 dark:text-slate-300 touch-scroll">
          {/* TAB 1: Golden Hour Checklist */}
          {activeTab === 'checklist' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-amber-950 dark:text-amber-100 leading-relaxed font-medium">
                  {ew.checklistDesc}
                </div>
              </div>

              <ol className="space-y-3">
                {ew.checklistSteps.map((step, idx) => (
                  <li
                    key={idx}
                    className="p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/40 flex items-start gap-3 shadow-2xs"
                  >
                    <span
                      className={`w-7 h-7 rounded-full font-bold flex items-center justify-center text-xs flex-shrink-0 text-white ${
                        idx === 0
                          ? 'bg-rose-600'
                          : idx === 1
                          ? 'bg-blue-600'
                          : idx === 2
                          ? 'bg-indigo-600'
                          : 'bg-emerald-600'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <div className="space-y-1.5 min-w-0 flex-1">
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">{step.title}</h4>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                        {step.desc}
                      </p>
                      <div className="flex items-center gap-2 pt-0.5 flex-wrap">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                          {step.highlight}
                        </span>
                        {step.actionText && step.isTel && (
                          <a
                            href={step.actionUrl}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white rounded-lg text-xs font-bold min-h-[36px] cursor-pointer shadow-xs active:scale-[0.98] transition-transform"
                          >
                            <PhoneCall className="w-3.5 h-3.5" />
                            <span>{step.actionText}</span>
                          </a>
                        )}
                        {step.actionText && !step.isTel && (
                          <a
                            href={step.actionUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-lg text-xs font-bold min-h-[36px] cursor-pointer shadow-xs active:scale-[0.98] transition-transform"
                          >
                            <span>{step.actionText}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {idx === 1 && (
                          <button
                            onClick={() => setActiveTab('banks')}
                            className="inline-flex items-center gap-1 text-xs text-blue-700 dark:text-blue-400 font-bold hover:underline cursor-pointer min-h-[36px]"
                          >
                            <span>{ew.tabs.banks} →</span>
                          </button>
                        )}
                        {idx === 3 && (
                          <button
                            onClick={() => setActiveTab('fir')}
                            className="inline-flex items-center gap-1 text-xs text-emerald-700 dark:text-emerald-400 font-bold hover:underline cursor-pointer min-h-[36px]"
                          >
                            <span>{ew.tabs.fir} →</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* TAB 2: Bank & UPI Directory */}
          {activeTab === 'banks' && (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 text-xs text-blue-950 dark:text-blue-200 leading-relaxed font-medium">
                {ew.freezeNotice}
              </div>

              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500 dark:text-slate-400" />
                <input
                  type="text"
                  placeholder={ew.searchBankPlaceholder}
                  value={bankSearch}
                  onChange={e => setBankSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-base sm:text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[50vh] sm:max-h-[380px] overflow-y-auto pr-1 touch-scroll">
                {filteredBanks.map((bank, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/40 flex flex-col justify-between gap-3 shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">{bank.name}</h4>
                        <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                          {bank.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 leading-snug font-medium">
                        {bank.freezeAction}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                      <a
                        href={`tel:${bank.tollFree.replace(/\s+/g, '')}`}
                        className="font-bold text-blue-700 dark:text-blue-400 hover:underline flex items-center gap-1.5 min-h-[38px] px-2.5 py-1 bg-blue-50 dark:bg-blue-950/40 rounded-lg"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>{bank.tollFree}</span>
                      </a>
                      <button
                        onClick={() => handleCopyPhone(bank.name, bank.tollFree)}
                        className="min-w-[38px] min-h-[38px] flex items-center justify-center text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                        title={ew.copyNumber}
                        aria-label={`Copy ${bank.name} helpline number`}
                      >
                        {copiedBank === bank.name ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: FIR Complaint Draft Generator */}
          {activeTab === 'fir' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-950/40 p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>
                  {ew.firSubheading}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    {ew.fields.victimName}
                  </label>
                  <input
                    type="text"
                    placeholder={ew.fields.victimNamePlaceholder}
                    value={firData.victimName}
                    onChange={e => setFirData({ ...firData, victimName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 font-medium text-base sm:text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    {ew.fields.amountLost}
                  </label>
                  <input
                    type="text"
                    placeholder={ew.fields.amountLostPlaceholder}
                    value={firData.amountLost}
                    onChange={e => setFirData({ ...firData, amountLost: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 font-medium text-base sm:text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    {ew.fields.fraudType}
                  </label>
                  <select
                    value={firData.fraudType}
                    onChange={e => setFirData({ ...firData, fraudType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-medium text-base sm:text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="Digital Arrest / Impersonation Scam" className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">Digital Arrest / Virtual Police Extortion</option>
                    <option value="Fake KYC / Banking Phishing" className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">Fake KYC / Banking Phishing</option>
                    <option value="Work from Home / Telegram Task Scam" className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">Work from Home / Telegram Task Scam</option>
                    <option value="Electricity Bill Cutoff Fraud" className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">Electricity Bill Cutoff Fraud</option>
                    <option value="AI Voice Clone / Relative Emergency" className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">AI Voice Clone / Relative Emergency</option>
                    <option value="Other Unauthorized UPI / NetBanking Debit" className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">Other Unauthorized UPI / NetBanking Debit</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    {ew.fields.bankName}
                  </label>
                  <input
                    type="text"
                    placeholder={ew.fields.bankNamePlaceholder}
                    value={firData.bankName}
                    onChange={e => setFirData({ ...firData, bankName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 font-medium text-base sm:text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    {ew.fields.suspectContact}
                  </label>
                  <input
                    type="text"
                    placeholder={ew.fields.suspectContactPlaceholder}
                    value={firData.suspectContact}
                    onChange={e => setFirData({ ...firData, suspectContact: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 font-medium text-base sm:text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    {ew.fields.suspectAccountOrUpi}
                  </label>
                  <input
                    type="text"
                    placeholder={ew.fields.suspectAccountOrUpiPlaceholder}
                    value={firData.suspectAccountOrUpi}
                    onChange={e => setFirData({ ...firData, suspectAccountOrUpi: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 font-medium text-base sm:text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                  {ew.fields.transactionRef}
                </label>
                <input
                  type="text"
                  placeholder={ew.fields.transactionRefPlaceholder}
                  value={firData.transactionRef}
                  onChange={e => setFirData({ ...firData, transactionRef: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 font-medium text-base sm:text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="text-xs">
                <label className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                  {ew.fields.description}
                </label>
                <textarea
                  rows={3}
                  placeholder={ew.fields.descriptionPlaceholder}
                  value={firData.description}
                  onChange={e => setFirData({ ...firData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 font-medium leading-relaxed text-base sm:text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <button
                onClick={generateComplaintStatement}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl text-xs sm:text-sm font-bold min-h-[48px] shadow-sm transition-transform active:scale-[0.99] cursor-pointer"
              >
                {ew.generateFirButton}
              </button>

              {generatedFir && (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {ew.firGeneratedNotice}
                    </span>
                    <button
                      onClick={handleCopyFir}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-700 dark:text-slate-200 min-h-[40px] transition-colors cursor-pointer"
                    >
                      {copiedFir ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>{ew.copiedStatement}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>{ew.copyStatement}</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="text-xs sm:text-[11px] font-mono bg-slate-100 dark:bg-slate-950 p-3 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 whitespace-pre-wrap max-h-56 overflow-y-auto leading-relaxed touch-scroll">
                    {generatedFir}
                  </pre>
                  <div className="flex items-center justify-end pt-1">
                    <a
                      href="https://cybercrime.gov.in"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm transition-transform active:scale-[0.99] min-h-[44px]"
                    >
                      <span>cybercrime.gov.in</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <span>{ew.helplineFooter}</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 min-h-[40px] bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg font-bold cursor-pointer transition-colors"
          >
            {ew.close}
          </button>
        </div>
      </div>
    </div>
  );
};

