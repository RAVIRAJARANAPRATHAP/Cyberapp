import React, { useState, useEffect } from 'react';
import {
  Shield,
  ShieldAlert,
  AlertTriangle,
  Lock,
  Sparkles,
  Send,
  ArrowRight,
  Flame,
  Link2,
  Scale,
  X,
  WifiOff,
  Phone
} from 'lucide-react';
import { HistoryItem, SupportedLanguage } from './types.ts';
import { EmergencyWizardModal } from './components/EmergencyWizardModal.tsx';
import { LinkInspectorModal } from './components/LinkInspectorModal.tsx';
import { TrendingAlertsModal } from './components/TrendingAlertsModal.tsx';
import { CitizenRulesModal } from './components/CitizenRulesModal.tsx';
import { AppHeader } from './components/AppHeader.tsx';
import { AppSidebar } from './components/AppSidebar.tsx';
import { ResultCard } from './components/ResultCard.tsx';
import { copyToClipboard } from './utils/clipboard.ts';
import { TRANSLATIONS } from './i18n/translations.ts';

export default function App() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState<Record<string, boolean>>({});
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>('en');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(() => (typeof navigator !== 'undefined' ? navigator.onLine : true));

  // Modal Dialogs
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);
  const [linkInspectorOpen, setLinkInspectorOpen] = useState(false);
  const [trendingAlertsOpen, setTrendingAlertsOpen] = useState(false);
  const [citizenRulesOpen, setCitizenRulesOpen] = useState(false);

  // Network offline listener
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Theme
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('cyberrakshak_theme');
        if (saved !== null) {
          return saved === 'dark';
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
      } catch {
        return false;
      }
    }
    return false;
  });

  const t = TRANSLATIONS[selectedLanguage] || TRANSLATIONS.en;

  useEffect(() => {
    try {
      if (darkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('cyberrakshak_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('cyberrakshak_theme', 'light');
      }
    } catch (err) {
      console.warn('[Theme] Could not persist theme preference:', err);
    }
  }, [darkMode]);

  const handleCheck = async (textToCheck: string) => {
    const trimmed = textToCheck.trim();
    if (!trimmed || loading) return;

    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: trimmed, language: selectedLanguage }),
      });

      let resData: any = {};
      try {
        resData = await response.json();
      } catch {
        throw new Error('Server returned an invalid response format.');
      }

      if (response.ok && resData.ok && resData.data) {
        const newItem: HistoryItem = {
          id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          user_msg: resData.data.input_scrubbed || trimmed,
          result: resData.data,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setHistory(prev => [newItem, ...prev]);
        setInput('');
      } else {
        setErrorMessage(resData.error || 'Failed to analyze the description. Please try again or call 1930.');
      }
    } catch (err: any) {
      console.error('[CyberRakshak] Error analyzing message:', err);
      setErrorMessage(err?.message || 'Network connection error. Please verify your connection and retry.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (id: string, text: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const toggleDescription = (id: string) => {
    setExpandedDescriptions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div
      id="cyberrakshak-root"
      className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200"
    >
      {/* Sidebar Navigation */}
      <AppSidebar
        sidebarOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        selectedLanguage={selectedLanguage}
        t={t}
        onOpenEmergency={() => {
          setEmergencyModalOpen(true);
          setSidebarOpen(false);
        }}
        onOpenLinkInspector={() => {
          setLinkInspectorOpen(true);
          setSidebarOpen(false);
        }}
        onOpenTrendingAlerts={() => {
          setTrendingAlertsOpen(true);
          setSidebarOpen(false);
        }}
        onOpenCitizenRules={() => {
          setCitizenRulesOpen(true);
          setSidebarOpen(false);
        }}
      />

      {/* Main Content Area */}
      <main id="main-content-area" className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <AppHeader
          onOpenSidebar={() => setSidebarOpen(true)}
          selectedLanguage={selectedLanguage}
          onSelectLanguage={setSelectedLanguage}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          historyCount={history.length}
          onClearHistory={() => setHistory([])}
          t={t}
        />

        {/* Content Container */}
        <div className="max-w-4xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6 pb-24 sm:pb-8">
          {/* Offline Warning Alert Banner */}
          {!isOnline && (
            <div
              id="offline-banner"
              className="p-4 bg-amber-500 text-slate-950 rounded-2xl text-xs sm:text-sm font-semibold flex items-center justify-between gap-3 shadow-md animate-in fade-in"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <WifiOff className="w-5 h-5 flex-shrink-0" />
                <span>{t.offlineNotice}</span>
              </div>
              <a
                href="tel:1930"
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-950 text-white rounded-xl text-xs font-bold whitespace-nowrap shadow-xs hover:bg-slate-800 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{t.emergencyCall}</span>
              </a>
            </div>
          )}

          {/* Error Banner if any */}
          {errorMessage && (
            <div
              id="error-banner"
              className="p-4 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 rounded-2xl text-rose-950 dark:text-rose-200 text-xs font-semibold flex items-center justify-between gap-3 shadow-xs animate-in fade-in duration-200"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400 flex-shrink-0" />
                <span className="break-words">{errorMessage}</span>
              </div>
              <button
                onClick={() => setErrorMessage(null)}
                className="p-1 hover:bg-rose-100 dark:hover:bg-rose-900/40 rounded-lg text-rose-700 dark:text-rose-300 cursor-pointer flex-shrink-0"
                aria-label="Dismiss error"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Hero Banner */}
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xs">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-600/30 rounded-xl border border-blue-400/30 hidden sm:block">
                <Shield className="w-8 h-8 text-blue-300" />
              </div>
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-200 border border-blue-400/20 mb-2">
                  {t.heroBadge}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  {t.heroTitle}
                </h2>
                <p className="mt-2 text-sm sm:text-base text-blue-100/80 leading-relaxed max-w-2xl">
                  {t.heroDesc}
                </p>
              </div>
            </div>
          </div>

          {/* Citizen Quick Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <button
              id="btn-open-emergency-wizard"
              onClick={() => setEmergencyModalOpen(true)}
              className="p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/80 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-950/60 text-left transition-all group cursor-pointer flex items-center justify-between shadow-xs active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-rose-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-rose-950 dark:text-rose-200">{t.actionGoldenHourTitle}</h4>
                  <p className="text-[11px] text-rose-800 dark:text-rose-300 font-medium">{t.actionGoldenHourSub}</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-rose-600 dark:text-rose-400 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              id="btn-open-link-inspector"
              onClick={() => setLinkInspectorOpen(true)}
              className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/80 dark:bg-blue-950/30 hover:bg-blue-100 dark:hover:bg-blue-950/60 text-left transition-all group cursor-pointer flex items-center justify-between shadow-xs active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                  <Link2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-blue-950 dark:text-blue-200">{t.actionLinkInspectorTitle}</h4>
                  <p className="text-[11px] text-blue-800 dark:text-blue-300 font-medium">{t.actionLinkInspectorSub}</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              id="btn-open-trending-alerts"
              onClick={() => setTrendingAlertsOpen(true)}
              className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/80 dark:bg-amber-950/30 hover:bg-amber-100 dark:hover:bg-amber-950/60 text-left transition-all group cursor-pointer flex items-center justify-between shadow-xs active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-amber-950 dark:text-amber-200">{t.actionAlertsTitle}</h4>
                  <p className="text-[11px] text-amber-800 dark:text-amber-300 font-medium">{t.actionAlertsSub}</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-amber-600 dark:text-amber-400 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              id="btn-open-citizen-rules"
              onClick={() => setCitizenRulesOpen(true)}
              className="p-3.5 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/80 dark:bg-indigo-950/30 hover:bg-indigo-100 dark:hover:bg-indigo-950/60 text-left transition-all group cursor-pointer flex items-center justify-between shadow-xs active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-indigo-950 dark:text-indigo-200">{t.actionRulesTitle}</h4>
                  <p className="text-[11px] text-indigo-800 dark:text-indigo-300 font-medium">{t.actionRulesSub}</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-indigo-600 dark:text-indigo-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Input Form Card */}
          <div
            id="query-form-card"
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-4 sm:p-6 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="user-query-input"
                className="block text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100"
              >
                {t.inputLabel}
              </label>

              {input.trim().length > 0 && (
                <button
                  onClick={() => setInput('')}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 cursor-pointer"
                  title={t.clearInput}
                >
                  <X className="w-3.5 h-3.5" />
                  <span>{t.clearInput}</span>
                </button>
              )}
            </div>

            <div className="relative">
              <textarea
                id="user-query-input"
                value={input}
                onChange={e => setInput(e.target.value)}
                rows={4}
                placeholder={t.inputPlaceholder}
                className="w-full px-4 py-3 text-base sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 font-medium leading-relaxed"
                disabled={loading}
              />
            </div>

            <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <span>{t.inputPrivacyNote}</span>
              </div>

              <button
                id="check-button"
                onClick={() => handleCheck(input)}
                disabled={loading || !input.trim()}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 min-h-[44px] bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white text-sm font-bold rounded-xl shadow-xs transition-colors cursor-pointer disabled:cursor-not-allowed active:scale-[0.99]"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>{t.analyzingButton}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{t.checkButton}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Localized Sample Scenarios */}
          <div id="sample-scenarios-section" className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span>{t.sampleScenariosTitle}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {t.samplePrompts.map((prompt, index) => (
                <button
                  key={index}
                  id={`sample-prompt-${index}`}
                  onClick={() => {
                    setInput(prompt);
                    handleCheck(prompt);
                  }}
                  disabled={loading}
                  className="text-left p-3.5 min-h-[44px] rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50/50 dark:hover:bg-slate-800 transition-all text-xs font-medium text-slate-800 dark:text-slate-200 leading-snug group flex items-start gap-2.5 shadow-xs cursor-pointer active:scale-[0.99]"
                >
                  <span className="text-blue-600 dark:text-blue-400 font-bold group-hover:translate-x-0.5 transition-transform flex-shrink-0">
                    →
                  </span>
                  <span className="line-clamp-2">{prompt}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Evaluation Results Stream */}
          {history.length > 0 && (
            <div id="results-stream" className="space-y-6 pt-4">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                {t.resultsTitle} ({history.length})
              </h3>

              {history.map(item => (
                <ResultCard
                  key={item.id}
                  item={item}
                  selectedLanguage={selectedLanguage}
                  isExpanded={expandedDescriptions[item.id] ?? false}
                  onToggleExpand={() => toggleDescription(item.id)}
                  isCopied={copiedId === item.id}
                  onCopy={() => handleCopy(item.id, item.result.response)}
                  t={t}
                />
              ))}
            </div>
          )}

          {/* Footer Warning & Contacts */}
          <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400 space-y-2">
            <p>
              ⚠️ <strong>{t.disclaimer}</strong> {t.disclaimerNote}
            </p>
            <p className="font-semibold text-slate-700 dark:text-slate-300">
              {t.cyberCrimeHelpline}:{' '}
              <a href="tel:1930" className="text-rose-600 dark:text-rose-400 font-bold hover:underline">
                1930
              </a>{' '}
              · {t.officialPortal}:{' '}
              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                cybercrime.gov.in
              </a>
            </p>
          </div>
        </div>
      </main>

      {/* Emergency Golden Hour Wizard Modal */}
      <EmergencyWizardModal
        isOpen={emergencyModalOpen}
        onClose={() => setEmergencyModalOpen(false)}
        language={selectedLanguage}
      />

      {/* Suspicious Link & APK Inspector Modal */}
      <LinkInspectorModal
        isOpen={linkInspectorOpen}
        onClose={() => setLinkInspectorOpen(false)}
        language={selectedLanguage}
      />

      {/* Trending Active Scam Alerts Modal */}
      <TrendingAlertsModal
        isOpen={trendingAlertsOpen}
        onClose={() => setTrendingAlertsOpen(false)}
        language={selectedLanguage}
        onSelectScenario={scenarioText => {
          setInput(scenarioText);
          handleCheck(scenarioText);
        }}
      />

      {/* Citizen Legal Rights & Regulatory Rules Modal */}
      <CitizenRulesModal
        isOpen={citizenRulesOpen}
        onClose={() => setCitizenRulesOpen(false)}
        language={selectedLanguage}
      />

      {/* Persistent Floating Mobile Quick Action Bar */}
      <div
        id="mobile-quick-action-bar"
        className="sm:hidden fixed bottom-3 left-3 right-3 z-30 flex items-center gap-2 p-2 bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-md rounded-2xl border border-slate-700/70 shadow-2xl"
      >
        <a
          id="mobile-call-1930"
          href="tel:1930"
          className="flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs active:scale-95 transition-all text-center"
        >
          <Phone className="w-4 h-4" />
          <span>{t.emergencyCall}</span>
        </a>
        <button
          id="mobile-quick-freeze"
          onClick={() => setEmergencyModalOpen(true)}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs border border-amber-500/30 active:scale-95 transition-all cursor-pointer text-center"
        >
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          <span>{t.quickFreezeAction}</span>
        </button>
      </div>
    </div>
  );
}
