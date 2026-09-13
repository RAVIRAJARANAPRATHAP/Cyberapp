import React, { useEffect } from 'react';
import { Flame, X, AlertTriangle, ArrowRight, Info } from 'lucide-react';
import { SupportedLanguage } from '../types.ts';
import { MODAL_TRANSLATIONS } from '../i18n/modalTranslations.ts';

interface TrendingAlertsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectScenario: (scenarioText: string) => void;
  language?: SupportedLanguage;
}

export const TrendingAlertsModal: React.FC<TrendingAlertsModalProps> = ({
  isOpen,
  onClose,
  onSelectScenario,
  language = 'en',
}) => {
  const t = MODAL_TRANSLATIONS[language] || MODAL_TRANSLATIONS.en;
  const ta = t.trendingAlerts;

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

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="trending-alerts-title"
    >
      <div
        id="trending-alerts-dialog"
        className="bg-white dark:bg-slate-900 border-t sm:border border-slate-200 dark:border-slate-800 rounded-t-3xl sm:rounded-2xl w-full max-w-2xl h-[92vh] sm:h-auto sm:max-h-[90vh] flex flex-col shadow-2xl overflow-hidden transition-colors"
      >
        {/* Mobile drag handle */}
        <div className="pt-2 pb-1 sm:hidden flex justify-center bg-amber-50/60 dark:bg-amber-950/30">
          <div className="w-12 h-1.5 bg-amber-300 dark:bg-amber-800 rounded-full" />
        </div>

        {/* Header */}
        <div className="px-4 py-3 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-amber-50/60 dark:bg-amber-950/30 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <Flame className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 id="trending-alerts-title" className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate">
                  {ta.title}
                </h2>
                <span className="bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide flex-shrink-0">
                  {ta.badge}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-amber-950 dark:text-amber-200 mt-0.5 font-medium truncate sm:whitespace-normal">
                {ta.subtitle}
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
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1 text-xs text-slate-800 dark:text-slate-200 touch-scroll">
          <div className="text-xs text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-950/40 p-3 rounded-xl border border-slate-300 dark:border-slate-800 flex items-center gap-2 font-medium">
            <Info className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <span>
              {ta.tip}
            </span>
          </div>

          <div className="space-y-4">
            {ta.alerts.map(alert => (
              <div
                key={alert.id}
                className="p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/50 space-y-3 hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        alert.severity === 'critical'
                          ? 'bg-rose-100 text-rose-900 dark:bg-rose-950/80 dark:text-rose-200 border border-rose-200 dark:border-rose-800'
                          : 'bg-amber-100 text-amber-950 dark:bg-amber-950/80 dark:text-amber-200 border border-amber-200 dark:border-amber-800'
                      }`}
                    >
                      {alert.tag}
                    </span>
                    <span className="text-slate-700 dark:text-slate-300 text-[11px] font-semibold">
                      {ta.sourceLabel}: {alert.agency}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onSelectScenario(alert.title + ' - ' + alert.tactic);
                    }}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:p-0 min-h-[40px] sm:min-h-0 bg-blue-50 sm:bg-transparent dark:bg-blue-950/40 sm:dark:bg-transparent text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 font-bold text-xs rounded-lg sm:rounded-none cursor-pointer active:scale-[0.99]"
                  >
                    <span>{ta.testInCyberRakshak}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">{alert.title}</h3>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-normal">{alert.tactic}</p>

                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                  <span className="font-bold text-xs text-slate-900 dark:text-slate-100 uppercase tracking-wide flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    {ta.keyWarningSigns}
                  </span>
                  <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300 text-xs font-medium leading-snug">
                    {alert.warningSigns.map((sign, idx) => (
                      <li key={idx}>{sign}</li>
                    ))}
                  </ul>
                </div>

                <div className="text-xs bg-emerald-50 dark:bg-emerald-950/30 text-emerald-950 dark:text-emerald-200 p-3 rounded-lg border border-emerald-300 dark:border-emerald-900/60 font-medium">
                  <strong>{ta.officialSafeAction}:</strong> {alert.safeAction}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 flex items-center justify-between text-xs text-slate-700 dark:text-slate-300">
          <span className="truncate pr-2">{ta.helplineFooter}</span>
          <button
            onClick={onClose}
            className="px-4 py-2 min-h-[40px] bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg font-bold cursor-pointer transition-colors flex-shrink-0"
          >
            {ta.closeButton}
          </button>
        </div>
      </div>
    </div>
  );
};
