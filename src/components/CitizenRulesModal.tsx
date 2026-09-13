import React, { useState, useEffect } from 'react';
import {
  Scale,
  X,
  ShieldCheck,
  Clock,
  FileText,
  ExternalLink,
  BookOpen,
  CheckCircle2,
  Copy
} from 'lucide-react';
import { copyToClipboard } from '../utils/clipboard.ts';
import { SupportedLanguage } from '../types.ts';
import { MODAL_TRANSLATIONS } from '../i18n/modalTranslations.ts';

interface CitizenRulesModalProps {
  isOpen: boolean;
  onClose: () => void;
  language?: SupportedLanguage;
}

export const CitizenRulesModal: React.FC<CitizenRulesModalProps> = ({ isOpen, onClose, language = 'en' }) => {
  const [activeTab, setActiveTab] = useState<'rbi' | 'laws' | 'sanchar' | 'ombudsman'>('rbi');
  const [transactionDate, setTransactionDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [accountType, setAccountType] = useState<string>('savings');
  const [copiedDraft, setCopiedDraft] = useState(false);

  const t = MODAL_TRANSLATIONS[language] || MODAL_TRANSLATIONS.en;
  const cr = t.citizenRules;

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

  // Calculate elapsed days accurately
  const calculateLiability = () => {
    const [y, m, d] = transactionDate.split('-').map(Number);
    const txnDate = new Date(y, (m || 1) - 1, d || 1);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const diffMs = now.getTime() - txnDate.getTime();
    const diffDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));

    if (diffDays <= 3) {
      return {
        status: 'zero',
        badge: '0-3 Days: Zero Liability',
        color: 'emerald',
        liabilityText: '₹0 (Zero Customer Liability)',
        summary: 'Under RBI rules, you have ZERO liability. The bank is required to credit a shadow reversal within 10 working days.',
        timeframe: `${diffDays} days elapsed`,
        action: 'Notify bank in writing and obtain written grievance number.',
        rbiClause: 'RBI Circular DBR.No.Leg.BC.78/09.07.005/2017-18 Para 6(b)'
      };
    } else if (diffDays <= 7) {
      let cap = '₹10,000';
      if (accountType === 'bsbda') cap = '₹5,000';
      if (accountType === 'creditLarge') cap = '₹25,000';

      return {
        status: 'limited',
        badge: '4-7 Days: Limited Statutory Liability',
        color: 'amber',
        liabilityText: `Capped at ${cap}`,
        summary: `Maximum statutory liability is strictly limited to ${cap}. Any excess loss must be reversed by the bank.`,
        timeframe: `${diffDays} days elapsed`,
        action: 'Submit formal demand for capping and immediate reversal.',
        rbiClause: 'RBI Circular DBR.No.Leg.BC.78/09.07.005/2017-18 Table 1'
      };
    } else {
      return {
        status: 'policy',
        badge: '> 7 Days: Bank Board Policy',
        color: 'rose',
        liabilityText: 'Per Bank Board Policy',
        summary: 'Governed by bank policy. You retain full right to escalate to the RBI Ombudsman after 30 days.',
        timeframe: `${diffDays} days elapsed`,
        action: 'Escalate to Principal Nodal Officer and prepare RBI Ombudsman filing.',
        rbiClause: 'RBI Circular DBR.No.Leg.BC.78/09.07.005/2017-18 Para 8'
      };
    }
  };

  const liability = calculateLiability();

  const handleCopyNotice = async () => {
    const notice = `To: The Branch Manager / Nodal Officer, Bank\nSubject: Formal Notice under RBI Circular DBR.No.Leg.BC.78/09.07.005/2017-18 (Unauthorized Electronic Banking Transaction)\n\nDear Sir/Madam,\nI am writing to formally report an unauthorized transaction of ₹[Amount] debited from my account on ${transactionDate}. This incident was not authorized by me and occurred due to fraudulent third-party deceit.\n\nAs per RBI Circular DBR.No.Leg.BC.78/09.07.005/2017-18:\n1. This notice is submitted within the prescribed regulatory reporting window.\n2. The bank is requested to credit the shadow reversal into my account within 10 working days as mandated under Paragraph 9 of the circular.\n3. Complaint Reference / 1930 Cyber Crime Acknowledgement: [Number]\n\nKindly acknowledge receipt and initiate credit reversal.\nSincerely,\n[Citizen Name]`;
    const success = await copyToClipboard(notice);
    if (success) {
      setCopiedDraft(true);
      setTimeout(() => setCopiedDraft(false), 2500);
    }
  };

  return (
    <div
      id="citizen-rules-modal-backdrop"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="citizen-rules-modal-container"
        className="bg-white dark:bg-slate-900 border-t sm:border border-slate-200 dark:border-slate-800 rounded-t-3xl sm:rounded-2xl w-full max-w-3xl h-[92vh] sm:h-auto sm:max-h-[90vh] flex flex-col shadow-2xl overflow-hidden transition-colors"
      >
        {/* Mobile drag handle */}
        <div className="pt-2 pb-1 sm:hidden flex justify-center bg-indigo-50/70 dark:bg-indigo-950/30">
          <div className="w-12 h-1.5 bg-indigo-300 dark:bg-indigo-800 rounded-full" />
        </div>

        {/* Modal Header */}
        <div className="px-4 py-3 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-indigo-50/70 dark:bg-indigo-950/30 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <Scale className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate">
                  {cr.title}
                </h2>
                <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide flex-shrink-0">
                  {cr.badge}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-indigo-950 dark:text-indigo-200 mt-0.5 font-medium truncate sm:whitespace-normal">
                {cr.subtitle}
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

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto no-scrollbar border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 gap-1 sm:gap-2 text-xs font-semibold whitespace-nowrap touch-scroll">
          <button
            onClick={() => setActiveTab('rbi')}
            className={`py-3 px-3 min-h-[44px] border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 flex-shrink-0 ${
              activeTab === 'rbi'
                ? 'border-indigo-600 text-indigo-700 dark:text-indigo-300 font-bold'
                : 'border-transparent text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>{cr.tabs.rbi}</span>
          </button>
          <button
            onClick={() => setActiveTab('laws')}
            className={`py-3 px-3 min-h-[44px] border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 flex-shrink-0 ${
              activeTab === 'laws'
                ? 'border-indigo-600 text-indigo-700 dark:text-indigo-300 font-bold'
                : 'border-transparent text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{cr.tabs.laws}</span>
          </button>
          <button
            onClick={() => setActiveTab('sanchar')}
            className={`py-3 px-3 min-h-[44px] border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 flex-shrink-0 ${
              activeTab === 'sanchar'
                ? 'border-indigo-600 text-indigo-700 dark:text-indigo-300 font-bold'
                : 'border-transparent text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{cr.tabs.sanchar}</span>
          </button>
          <button
            onClick={() => setActiveTab('ombudsman')}
            className={`py-3 px-3 min-h-[44px] border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 flex-shrink-0 ${
              activeTab === 'ombudsman'
                ? 'border-indigo-600 text-indigo-700 dark:text-indigo-300 font-bold'
                : 'border-transparent text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>{cr.tabs.ombudsman}</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 text-xs text-slate-800 dark:text-slate-200 touch-scroll">
          {/* TAB 1: RBI ZERO LIABILITY CALCULATOR */}
          {activeTab === 'rbi' && (
            <div className="space-y-4">
              <div className="p-3.5 sm:p-4 rounded-xl bg-slate-100 dark:bg-slate-950/40 border border-slate-300 dark:border-slate-800 text-xs leading-relaxed font-medium">
                {cr.rbiSubtitle}
              </div>

              {/* Calculator Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40">
                <div>
                  <label className="font-bold text-slate-900 dark:text-slate-100 block mb-1">
                    {cr.txnDateLabel}
                  </label>
                  <input
                    type="date"
                    value={transactionDate}
                    onChange={e => setTransactionDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-base sm:text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-900 dark:text-slate-100 block mb-1">
                    {cr.accountTypeLabel}
                  </label>
                  <select
                    value={accountType}
                    onChange={e => setAccountType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-base sm:text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="savings">{cr.accountTypes.savings}</option>
                    <option value="bsbda">{cr.accountTypes.bsbda}</option>
                    <option value="creditLarge">{cr.accountTypes.creditLarge}</option>
                  </select>
                </div>
              </div>

              {/* Statutory Verdict Banner */}
              <div
                className={`p-4 rounded-xl border ${
                  liability.color === 'emerald'
                    ? 'bg-emerald-100 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100'
                    : liability.color === 'amber'
                    ? 'bg-amber-100 dark:bg-amber-950/50 border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-100'
                    : 'bg-rose-100 dark:bg-rose-950/50 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-100'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-white/70 dark:bg-black/40">
                      {liability.badge}
                    </span>
                    <h3 className="text-base font-bold mt-1">
                      {cr.liabilityTitle} {liability.liabilityText}
                    </h3>
                    <p className="text-xs font-medium leading-relaxed mt-1">{liability.summary}</p>
                    <p className="text-[11px] font-semibold opacity-90 mt-1">
                      ⚡ {liability.action}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-xs font-bold block">{liability.timeframe}</span>
                    <span className="text-[10px] font-mono opacity-80 block mt-1">{liability.rbiClause}</span>
                  </div>
                </div>
              </div>

              {/* Formal Notice Draft Section */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs">
                    {cr.formalNoticeDraftTitle}
                  </h4>
                  <button
                    onClick={handleCopyNotice}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors"
                  >
                    {copiedDraft ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{cr.copiedNotice}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{cr.copyNoticeButton}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* RBI Rules Summary Schedule */}
              <div className="space-y-2 pt-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-xs">
                  {cr.rbiRulesSummaryTitle}
                </h4>
                <div className="space-y-2">
                  {cr.rbiRules.map((rule, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 space-y-1"
                    >
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="font-bold text-slate-900 dark:text-white text-xs">{rule.title}</span>
                        <span className="text-[11px] font-bold text-indigo-700 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-950 px-2 py-0.5 rounded">
                          {rule.liability}
                        </span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                        {rule.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BNS 2023 & IT ACT PROVISIONS */}
          {activeTab === 'laws' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-950/40 border border-slate-300 dark:border-slate-800 text-xs font-medium leading-relaxed text-slate-800 dark:text-slate-200">
                {cr.lawsSubtitle}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {cr.lawsList.map((law, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 space-y-2"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-200">
                      {law.code}
                    </span>
                    <h4 className="font-bold text-slate-900 dark:text-white text-xs">
                      {law.title}
                    </h4>
                    <span className="inline-block text-[10px] font-bold text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-1.5 py-0.5 rounded">
                      {law.penalty}
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed font-normal">
                      {law.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SANCHAR SAATHI & CHAKSHU */}
          {activeTab === 'sanchar' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-950/40 border border-slate-300 dark:border-slate-800 text-xs font-medium leading-relaxed text-slate-800 dark:text-slate-200">
                {cr.sancharSubtitle}
              </div>

              <div className="space-y-3">
                {cr.sancharPortals.map((portal, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-200">
                        {portal.badge}
                      </span>
                      <h4 className="font-bold text-slate-900 dark:text-white text-xs">
                        {portal.name}
                      </h4>
                      <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed font-normal">
                        {portal.desc}
                      </p>
                    </div>
                    <a
                      href={portal.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex-shrink-0 cursor-pointer transition-colors"
                    >
                      <span>{portal.actionText}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: OMBUDSMAN REDRESSAL */}
          {activeTab === 'ombudsman' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-950/40 border border-slate-300 dark:border-slate-800 text-xs font-medium leading-relaxed text-slate-800 dark:text-slate-200">
                {cr.ombudsmanSubtitle}
              </div>

              <div className="space-y-3">
                {cr.ombudsmanSteps.map((stepItem, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 space-y-1"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
                        {idx + 1}
                      </span>
                      <h4 className="font-bold text-slate-900 dark:text-white text-xs">
                        {stepItem.title}
                      </h4>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 text-[11px] pl-7 font-normal">
                      {stepItem.desc}
                    </p>
                  </div>
                ))}

                <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900 flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-indigo-950 dark:text-indigo-200">
                    {cr.cmsPortalLabel}
                  </span>
                  <a
                    href="https://cms.rbi.org.in"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-indigo-700 dark:text-indigo-400 font-bold text-xs hover:underline flex-shrink-0"
                  >
                    <span>cms.rbi.org.in</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 flex items-center justify-between text-xs text-slate-700 dark:text-slate-300">
          <span className="truncate pr-2">
            {cr.helplineFooter}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 min-h-[40px] bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg font-bold cursor-pointer transition-colors flex-shrink-0"
          >
            {cr.closeButton}
          </button>
        </div>
      </div>
    </div>
  );
};
