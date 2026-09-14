import React from 'react';
import {
  Menu,
  ShieldAlert,
  Languages,
  Sun,
  Moon,
  Trash2
} from 'lucide-react';
import { SupportedLanguage, LanguageOption } from '../types.ts';

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
  { code: 'te', label: 'Telugu', nativeLabel: 'తెలుగు' },
  { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்' },
  { code: 'mr', label: 'Marathi', nativeLabel: 'मराठी' },
  { code: 'bn', label: 'Bengali', nativeLabel: 'বাংলা' },
];

interface AppHeaderProps {
  onOpenSidebar: () => void;
  sidebarOpen?: boolean;
  selectedLanguage: SupportedLanguage;
  onSelectLanguage: (lang: SupportedLanguage) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  historyCount: number;
  onClearHistory: () => void;
  t: {
    headerTitle: string;
    headerSubtitle: string;
    clearHistory: string;
  };
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  onOpenSidebar,
  sidebarOpen,
  selectedLanguage,
  onSelectLanguage,
  darkMode,
  onToggleDarkMode,
  historyCount,
  onClearHistory,
  t,
}) => {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <button
          id="open-sidebar-btn"
          onClick={onOpenSidebar}
          className="w-10 h-10 min-w-[40px] min-h-[40px] flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer flex-shrink-0 transition-colors"
          aria-label={sidebarOpen ? "Close navigation sidebar" : "Open navigation sidebar"}
          title={sidebarOpen ? "Close navigation sidebar" : "Open navigation sidebar"}
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate">
              {t.headerTitle}
            </h2>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 hidden sm:block font-medium truncate">
            {t.headerSubtitle}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
        {/* Language Selector */}
        <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 min-h-[38px] text-xs font-semibold rounded-xl border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-800">
          <Languages className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
          <select
            id="language-select"
            value={selectedLanguage}
            onChange={e => onSelectLanguage(e.target.value as SupportedLanguage)}
            className="bg-transparent border-none text-xs font-bold focus:outline-none cursor-pointer text-slate-900 dark:text-slate-100"
            title="Select Language"
            aria-label="Select Language"
          >
            {LANGUAGES.map(lang => (
              <option
                key={lang.code}
                value={lang.code}
                className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
              >
                {lang.nativeLabel} ({lang.label})
              </option>
            ))}
          </select>
        </div>

        {/* Dark Mode Toggle Button */}
        <button
          id="dark-mode-toggle-btn"
          onClick={onToggleDarkMode}
          className="flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-1.5 min-h-[38px] min-w-[38px] text-xs font-bold rounded-xl border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? (
            <>
              <Sun className="w-4 h-4 text-amber-400" />
              <span className="hidden md:inline">Light</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-slate-700 dark:text-slate-300" />
              <span className="hidden md:inline">Dark</span>
            </>
          )}
        </button>

        {historyCount > 0 && (
          <button
            id="clear-history-btn"
            onClick={onClearHistory}
            className="flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-1.5 min-h-[38px] text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-rose-600 dark:hover:text-rose-400 bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors cursor-pointer"
            aria-label={t.clearHistory}
            title={t.clearHistory}
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{t.clearHistory}</span>
          </button>
        )}
      </div>
    </header>
  );
};
