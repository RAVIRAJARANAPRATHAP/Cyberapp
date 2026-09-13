import React, { useState, useEffect } from 'react';
import {
  Link2,
  X,
  Search,
  AlertTriangle,
  ShieldCheck,
  ShieldAlert
} from 'lucide-react';
import { SupportedLanguage } from '../types.ts';
import { MODAL_TRANSLATIONS } from '../i18n/modalTranslations.ts';

interface LinkInspectorOutput {
  url: string;
  isHighRisk: boolean;
  riskScore: number;
  verdict: string;
  redFlags: string[];
  claimedEntity?: string;
  isApk: boolean;
  isShortlink: boolean;
  isHttp: boolean;
  recommendations: string[];
  backendUsed?: string;
}

interface LinkInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  language?: SupportedLanguage;
}

export const LinkInspectorModal: React.FC<LinkInspectorModalProps> = ({
  isOpen,
  onClose,
  language = 'en',
}) => {
  const [urlInput, setUrlInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LinkInspectorOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const t = MODAL_TRANSLATIONS[language] || MODAL_TRANSLATIONS.en;
  const li = t.linkInspector;

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

  const handleInspect = async (targetUrl: string) => {
    if (!targetUrl.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/inspect-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: targetUrl.trim(), language }),
      });

      let data: any = {};
      try {
        data = await res.json();
      } catch {
        throw new Error('Received unexpected non-JSON response from server.');
      }

      if (!res.ok) {
        throw new Error(data.error || 'Inspection failed. Please try again.');
      }
      setResult(data.data);
    } catch (err: any) {
      setError(err?.message || 'Failed to inspect the link. Please try again.');
    } finally {
      setLoading(false);
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
      aria-labelledby="link-inspector-title"
    >
      <div
        id="link-inspector-dialog"
        className="bg-white dark:bg-slate-900 border-t sm:border border-slate-200 dark:border-slate-800 rounded-t-3xl sm:rounded-2xl w-full max-w-2xl h-[92vh] sm:h-auto sm:max-h-[90vh] flex flex-col shadow-2xl overflow-hidden transition-colors"
      >
        {/* Mobile drag handle */}
        <div className="pt-2 pb-1 sm:hidden flex justify-center bg-blue-50/60 dark:bg-blue-950/30">
          <div className="w-12 h-1.5 bg-blue-300 dark:bg-blue-800 rounded-full" />
        </div>

        {/* Header */}
        <div className="px-4 py-3 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-blue-50/60 dark:bg-blue-950/30 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <Link2 className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h2 id="link-inspector-title" className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate">
                {li.title}
              </h2>
              <p className="text-[11px] sm:text-xs text-blue-950 dark:text-blue-200 mt-0.5 font-medium truncate sm:whitespace-normal">
                {li.subtitle}
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

        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-5 flex-1 text-xs text-slate-800 dark:text-slate-200 touch-scroll">
          {/* Input Box */}
          <div className="space-y-2.5">
            <label className="block font-bold text-slate-900 dark:text-slate-100 text-sm">
              {li.inputLabel}
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={urlInput}
                onChange={e => setUrlInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleInspect(urlInput);
                }}
                placeholder={li.inputPlaceholder}
                className="flex-1 px-3.5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-base sm:text-xs placeholder-slate-500 dark:placeholder-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => handleInspect(urlInput)}
                disabled={loading || !urlInput.trim()}
                className="w-full sm:w-auto px-5 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white font-bold rounded-xl text-sm sm:text-xs flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed min-h-[44px] transition-transform active:scale-[0.99]"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{li.analyzingButton}</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>{li.inspectButton}</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Sample Links */}
            <div className="pt-1 flex items-center gap-1.5 flex-wrap text-xs sm:text-[11px]">
              <span className="text-slate-700 dark:text-slate-300 font-bold">{li.quickTestLabel}</span>
              {li.samples.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setUrlInput(sample.url);
                    handleInspect(sample.url);
                  }}
                  className="px-2.5 py-1.5 min-h-[34px] rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-semibold cursor-pointer transition-colors"
                >
                  {sample.label}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-900/60 rounded-xl text-rose-900 dark:text-rose-200 font-medium flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Results Output */}
          {result && (
            <div className="space-y-4 pt-2 border-t border-slate-200 dark:border-slate-800">
              {/* Verdict Header Banner */}
              <div
                className={`p-4 rounded-xl border flex items-start justify-between gap-3 ${
                  result.riskScore >= 60
                    ? 'bg-rose-100 dark:bg-rose-950/50 border-rose-300 dark:border-rose-900 text-rose-950 dark:text-rose-100'
                    : result.riskScore >= 30
                    ? 'bg-amber-100 dark:bg-amber-950/50 border-amber-300 dark:border-amber-900 text-amber-950 dark:text-amber-100'
                    : 'bg-emerald-100 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-900 text-emerald-950 dark:text-emerald-100'
                }`}
              >
                <div className="flex items-start gap-3">
                  {result.riskScore >= 60 ? (
                    <ShieldAlert className="w-6 h-6 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
                  ) : result.riskScore >= 30 ? (
                    <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h3 className="text-sm font-bold text-slate-950 dark:text-white">
                      {result.verdict}
                    </h3>
                    <p className="text-[11px] text-slate-800 dark:text-slate-200 mt-0.5 font-mono font-medium break-all">{result.url}</p>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className="text-xl font-extrabold text-slate-950 dark:text-white">{result.riskScore}%</span>
                  <span className="block text-[10px] uppercase font-bold text-slate-800 dark:text-slate-200">
                    {li.riskScoreLabel}
                  </span>
                </div>
              </div>

              {/* Red Flags List */}
              {result.redFlags.length > 0 && (
                <div className="p-3.5 rounded-xl border border-rose-300 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/20 space-y-2">
                  <h4 className="font-bold text-rose-950 dark:text-rose-200 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                    <span>{li.redFlagsTitle} ({result.redFlags.length})</span>
                  </h4>
                  <ul className="space-y-1.5 list-disc pl-4 text-rose-950 dark:text-rose-200 font-medium">
                    {result.redFlags.map((flag, i) => (
                      <li key={i} className="leading-snug">
                        {flag}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recommendations */}
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-slate-100">{li.recommendationsTitle}</h4>
                <ul className="space-y-1 text-slate-800 dark:text-slate-200 list-disc pl-4 leading-relaxed font-medium">
                  {result.recommendations.map((rec, i) => (
                    <li key={i}>{rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 flex items-center justify-between text-xs text-slate-700 dark:text-slate-300">
          <span>{li.helplineText}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg font-bold cursor-pointer transition-colors"
          >
            {li.closeButton}
          </button>
        </div>
      </div>
    </div>
  );
};
