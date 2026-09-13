import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  Info,
  CheckCircle2,
  Copy,
  ChevronDown,
  ChevronUp,
  Phone,
  ExternalLink,
  Volume2,
  Square,
  Share2,
  Download,
  Check
} from 'lucide-react';
import { HistoryItem, SupportedLanguage } from '../types.ts';
import { getCategoryMeta } from '../utils/categoryMeta.ts';
import { TranslationStrings } from '../i18n/translations.ts';

interface ResultCardProps {
  item: HistoryItem;
  selectedLanguage: SupportedLanguage;
  isExpanded: boolean;
  onToggleExpand: () => void;
  isCopied: boolean;
  onCopy: () => void;
  t: TranslationStrings;
}

const VOICE_LANG_MAP: Record<SupportedLanguage, string> = {
  en: 'en-IN',
  hi: 'hi-IN',
  te: 'te-IN',
  ta: 'ta-IN',
  mr: 'mr-IN',
  bn: 'bn-IN',
};

/**
 * Cleanly renders advisory text by converting **bold** markers
 * and highlighting emergency hotlines (1930 / cybercrime.gov.in)
 */
function renderFormattedResponse(text: string) {
  const lines = text.split('\n');

  return lines.map((line, lineIdx) => {
    // Empty line spacer
    if (!line.trim()) {
      return <div key={lineIdx} className="h-2" />;
    }

    // Numbered Section Header (e.g. "1. Risk Assessment" or "2. Reasoning")
    const isSectionHeader = /^\d+\.\s+/.test(line.trim());

    // Process bold segments **text**
    const parts = line.split(/(\*\*[^*]+\*\*)/g);

    return (
      <div
        key={lineIdx}
        className={`${
          isSectionHeader
            ? 'font-bold text-slate-900 dark:text-white mt-3 mb-1 text-sm sm:text-base border-b border-slate-200 dark:border-slate-800/80 pb-1'
            : line.trim().startsWith('-')
            ? 'pl-4 relative text-slate-800 dark:text-slate-200 my-0.5'
            : 'text-slate-800 dark:text-slate-200 my-0.5'
        }`}
      >
        {line.trim().startsWith('-') && (
          <span className="absolute left-0 text-slate-400 dark:text-slate-500 font-bold">•</span>
        )}
        {parts.map((part, partIdx) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            const inner = part.slice(2, -2);
            if (inner === '1930') {
              return (
                <a
                  key={partIdx}
                  href="tel:1930"
                  className="inline-flex items-center gap-1 font-extrabold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-1.5 py-0.5 rounded border border-rose-200 dark:border-rose-900 mx-0.5 hover:underline"
                >
                  <Phone className="w-3 h-3" />
                  <span>1930</span>
                </a>
              );
            }
            if (inner.includes('cybercrime.gov.in')) {
              return (
                <a
                  key={partIdx}
                  href="https://cybercrime.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-1.5 py-0.5 rounded border border-blue-200 dark:border-blue-900 mx-0.5 hover:underline"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>cybercrime.gov.in</span>
                </a>
              );
            }
            return (
              <strong key={partIdx} className="font-bold text-slate-900 dark:text-slate-100">
                {inner}
              </strong>
            );
          }
          return <span key={partIdx}>{part}</span>;
        })}
      </div>
    );
  });
}

export const ResultCard: React.FC<ResultCardProps> = ({
  item,
  selectedLanguage,
  isExpanded,
  onToggleExpand,
  isCopied,
  onCopy,
  t,
}) => {
  const categoryKey = item.result.category || 'other';
  const meta = getCategoryMeta(categoryKey, selectedLanguage);

  const isError = meta.level === 'error';
  const isWarning = meta.level === 'warning';

  const bannerBg = isError
    ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/60 text-rose-900 dark:text-rose-200'
    : isWarning
    ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/60 text-amber-900 dark:text-amber-200'
    : 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900/60 text-blue-900 dark:text-blue-200';

  const badgeBg = isError
    ? 'bg-rose-600 text-white'
    : isWarning
    ? 'bg-amber-600 text-white'
    : 'bg-blue-600 text-white';

  const formatSourceName = (filename: string) => {
    return filename
      .replace('.txt', '')
      .replace('_scam', '')
      .replace(/_/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  };

  const [speaking, setSpeaking] = useState(false);
  const speechSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleToggleSpeech = () => {
    if (!speechSupported) return;

    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    // Clean text of bold asterisks and bullets for clear spoken delivery
    const cleanSpeech = item.result.response
      .replace(/\*\*/g, '')
      .replace(/[-•]/g, ' ')
      .replace(/\s+/g, ' ');

    const utterance = new SpeechSynthesisUtterance(cleanSpeech);
    utterance.lang = VOICE_LANG_MAP[selectedLanguage] || 'en-IN';
    utterance.rate = 0.95;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const [downloaded, setDownloaded] = useState(false);

  const handleShareWhatsApp = () => {
    const summary = `🚨 *CyberRakshak Alert: ${meta.label}*\n\n${item.result.response.slice(0, 350)}...\n\n⚠️ *If money was lost, call Cybercrime Helpline 1930 immediately or visit cybercrime.gov.in*`;
    const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(summary)}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadReport = () => {
    try {
      const categoryLabel = meta.label;
      const threatLevel = isError
        ? 'HIGH THREAT / ACTIVE CYBER FRAUD'
        : isWarning
        ? 'MEDIUM RISK / SUSPICIOUS MODUS OPERANDI'
        : 'LOW RISK / INFORMATIONAL ADVISORY';

      const cleanResponse = item.result.response
        .replace(/### /g, '\n[SECTION] ')
        .replace(/\*\*/g, '')
        .replace(/---/g, '------------------------------------------------------------');

      const sourcesList = item.result.sources && item.result.sources.length > 0
        ? item.result.sources.map(s => `  • ${formatSourceName(s)}`).join('\n')
        : '  • National Cybercrime Reporting Portal (I4C / MHA) Standard Operating Procedure';

      const reportContent = `================================================================================
CYBERRAKSHAK - NATIONAL CITIZEN CYBER SAFETY INCIDENT REPORT
Ministry of Home Affairs (I4C) & CERT-In Grounded Cybercrime Guidance
================================================================================

INCIDENT REFERENCE ID : ${item.id}
DATE & TIMESTAMP      : ${item.timestamp}
DETECTED FRAUD PATTERN: ${categoryLabel}
THREAT EVALUATION     : ${threatLevel}
SYSTEM ENGINE         : CyberRakshak AI (RAG Grounded Security System)

--------------------------------------------------------------------------------
1. CITIZEN INCIDENT STATEMENT (PRIVACY-PROTECTED & SCRUBBED)
--------------------------------------------------------------------------------
${item.user_msg}

--------------------------------------------------------------------------------
2. CYBER SAFETY ADVISORY & STATUTORY ASSESSMENT
--------------------------------------------------------------------------------
${cleanResponse}

--------------------------------------------------------------------------------
3. OFFICIAL ADVISORY SOURCES CONSULTED
--------------------------------------------------------------------------------
${sourcesList}

--------------------------------------------------------------------------------
4. CRITICAL CITIZEN ACTIONS & EMERGENCY CONTACTS
--------------------------------------------------------------------------------
• National Cyber Crime Reporting Helpline: 1930 (Toll-Free 24x7)
• Central Incident Reporting Portal      : https://cybercrime.gov.in
• Report Fraud Mobile Numbers (Chakshu)  : https://sancharsaathi.gov.in
• Reserve Bank of India Zero-Liability   : Notification DBR.No.Leg.BC.78/09.07.005/2017-18

LEGAL DISCLAIMER & CITIZEN GUIDANCE:
This report is generated for citizen documentation and awareness. If any financial
deduction occurred, immediately submit this record to your bank within the "Golden Hour"
(first 2-3 hours) to freeze the fraudster's beneficiary account, and file a formal FIR
at cybercrime.gov.in or your nearest Police Station.
================================================================================
`;

      const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
      const blobUrl = URL.createObjectURL(blob);
      const downloadLink = document.createElement('a');
      downloadLink.href = blobUrl;
      downloadLink.download = `CyberRakshak_Incident_Report_${item.id.slice(0, 10)}.txt`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(blobUrl);

      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2500);
    } catch (err) {
      console.error('[CyberRakshak] Download report error:', err);
      if (typeof window !== 'undefined' && 'print' in window) {
        window.print();
      }
    }
  };

  return (
    <div
      id={`result-card-${item.id}`}
      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden transition-colors"
    >
      {/* Urgency / Pattern Banner */}
      <div className={`p-4 border-b ${bannerBg} flex flex-col sm:flex-row sm:items-center justify-between gap-2`}>
        <div className="flex items-center gap-2.5">
          {isError ? (
            <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400 flex-shrink-0" />
          ) : isWarning ? (
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
          ) : (
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
          )}
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-sm tracking-tight">{meta.label}</span>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${badgeBg}`}>
                {isError ? t.riskHigh : isWarning ? t.riskMedium : t.riskLow}
              </span>
            </div>
            <p className="text-xs mt-0.5 opacity-90">{meta.tip}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-[11px] opacity-75 font-medium">{item.timestamp}</span>
          <button
            onClick={onCopy}
            className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-white/60 dark:hover:bg-slate-800/60 rounded-md transition-colors cursor-pointer"
            title={t.copy}
            aria-label="Copy analysis text"
          >
            {isCopied ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-4">
        {/* Description Accordion (Scrubbed) */}
        <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-950/60">
          <button
            onClick={onToggleExpand}
            className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
          >
            <span>📝 {t.userQueryScrubbed}</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {isExpanded && (
            <div className="px-4 py-3 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-mono leading-relaxed break-words">
              {item.user_msg}
            </div>
          )}
        </div>

        {/* Cited Sources */}
        {item.result.sources && item.result.sources.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap text-xs text-slate-500 dark:text-slate-400">
            <span className="font-medium text-slate-700 dark:text-slate-300">📎 {t.advisorySources}</span>
            {item.result.sources.map((src, i) => (
              <span
                key={i}
                className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[11px] border border-slate-200 dark:border-slate-700"
              >
                {formatSourceName(src)}
              </span>
            ))}
          </div>
        )}

        {/* Main Grounded Text Content */}
        <div className="text-slate-800 dark:text-slate-200 text-sm leading-relaxed bg-slate-50/50 dark:bg-slate-950/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800/80">
          {renderFormattedResponse(item.result.response)}
        </div>

        {/* Citizen Action & Sharing Toolbar */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 flex-wrap">
            {speechSupported && (
              <button
                id={`btn-listen-${item.id}`}
                onClick={handleToggleSpeech}
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  speaking
                    ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800'
                    : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
                }`}
                title={speaking ? t.stopAudio : t.listenAudio}
                aria-label={speaking ? t.stopAudio : t.listenAudio}
              >
                {speaking ? (
                  <>
                    <Square className="w-3.5 h-3.5 fill-current animate-pulse text-rose-600 dark:text-rose-400" />
                    <span>{t.stopAudio}</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>{t.listenAudio}</span>
                  </>
                )}
              </button>
            )}

            <button
              id={`btn-whatsapp-share-${item.id}`}
              onClick={handleShareWhatsApp}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 transition-colors cursor-pointer"
              title={t.shareWhatsApp}
              aria-label={t.shareWhatsApp}
            >
              <Share2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="hidden sm:inline">{t.shareWhatsApp}</span>
              <span className="sm:hidden">Share</span>
            </button>

            <button
              id={`btn-print-report-${item.id}`}
              onClick={handleDownloadReport}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                downloaded
                  ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700'
                  : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
              }`}
              title={t.printReport}
              aria-label={t.printReport}
            >
              {downloaded ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-700 dark:text-emerald-300">Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                  <span className="hidden sm:inline">{t.printReport}</span>
                  <span className="sm:hidden">Download</span>
                </>
              )}
            </button>
          </div>

          <a
            href="tel:1930"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg bg-rose-600 hover:bg-rose-700 text-white transition-colors shadow-2xs"
            title="National Cyber Crime Helpline"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>1930</span>
          </a>
        </div>
      </div>
    </div>
  );
};
