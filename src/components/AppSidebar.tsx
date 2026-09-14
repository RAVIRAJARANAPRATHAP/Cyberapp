import React from 'react';
import {
  Shield,
  ShieldAlert,
  PhoneCall,
  Link2,
  Flame,
  Scale,
  Globe,
  Lock,
  X,
  ExternalLink
} from 'lucide-react';
import { SupportedLanguage } from '../types.ts';

interface AppSidebarProps {
  sidebarOpen: boolean;
  onClose: () => void;
  selectedLanguage: SupportedLanguage;
  t: any;
  onOpenEmergency: () => void;
  onOpenLinkInspector: () => void;
  onOpenTrendingAlerts: () => void;
  onOpenCitizenRules: () => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  sidebarOpen,
  onClose,
  selectedLanguage,
  t,
  onOpenEmergency,
  onOpenLinkInspector,
  onOpenTrendingAlerts,
  onOpenCitizenRules,
}) => {
  const getShieldStatusText = () => {
    switch (selectedLanguage) {
      case 'hi':
        return 'साइबर सुरक्षा प्रणाली सक्रिय';
      case 'te':
        return 'సైబర్ రక్షణ వ్యవస్థ అందుబాటులో ఉంది';
      case 'ta':
        return 'இணைய பாதுகாப்பு சேவை செயலில் உள்ளது';
      case 'mr':
        return 'सायबर सुरक्षा यंत्रणा कार्यरत';
      case 'bn':
        return 'সাইবার নিরাপত্তা ব্যবস্থা সক্রিয়';
      default:
        return 'National Cyber Safety Shield Active';
    }
  };

  const getPrivacyText = () => {
    switch (selectedLanguage) {
      case 'hi':
        return 'आधार, बैंक विवरण व पासवर्ड सुरक्षित रखे जाते हैं। कोई भी व्यक्तिगत डेटा रिकॉर्ड नहीं किया जाता।';
      case 'te':
        return 'ఆధార్, బ్యాంక్ వివరాలు, పాస్‌వర్డ్‌లు రక్షించబడతాయి. వ్యక్తిగత డేటా రికార్డ్ చేయబడదు.';
      case 'ta':
        return 'ஆதார், வங்கி விவரங்கள் மற்றும் கடவுச்சொற்கள் முழுமையாகப் பாதுகாக்கப்படுகின்றன.';
      case 'mr':
        return 'आधार, बँक तपशील व पासवर्ड सुरक्षित ठेवले जातात. कोणताही वैयक्तिक डेटा साठवला जात नाही.';
      case 'bn':
        return 'আধার, ব্যাংক তথ্য ও পাসওয়ার্ড সুরক্ষিত রাখা হয়। কোনও ব্যক্তিগত তথ্য সংরক্ষণ করা হয় না।';
      default:
        return 'Aadhaar, card numbers, and passwords are automatically scrubbed. No personal data is stored.';
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {sidebarOpen && (
        <div
          id="mobile-overlay"
          className="fixed inset-0 z-40 bg-black/50 lg:hidden backdrop-blur-xs"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        id="app-sidebar"
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between overflow-y-auto transform transition-all duration-200 ease-in-out lg:static ${
          sidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full lg:hidden opacity-0'
        }`}
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs flex-shrink-0">
                <Shield className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white leading-none">
                  {t.appName}
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">{t.appTagline}</p>
              </div>
            </div>
            <button
              id="close-sidebar-btn"
              onClick={onClose}
              className="w-10 h-10 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer flex-shrink-0 transition-colors"
              aria-label="Close sidebar"
              title="Close sidebar navigation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Verification Status */}
          <div className="text-xs bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700/70 flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
            <span className="font-semibold text-slate-900 dark:text-slate-100 text-xs">
              {getShieldStatusText()}
            </span>
          </div>

          {/* Tools & Emergency Action Center */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              <span>{t.toolsTitle}</span>
            </div>
            <div className="space-y-1.5">
              <button
                id="sidebar-golden-hour-btn"
                onClick={onOpenEmergency}
                className="w-full text-left p-3 min-h-[44px] rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/80 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-950/60 text-rose-950 dark:text-rose-100 text-xs font-bold flex items-center justify-between cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <PhoneCall className="w-4 h-4 text-rose-600" />
                  <span>{t.actionGoldenHourTitle}</span>
                </div>
                <span className="text-[10px] bg-rose-200 dark:bg-rose-900 text-rose-900 dark:text-rose-100 px-2 py-0.5 rounded-md font-bold">1930</span>
              </button>

              <button
                id="sidebar-link-inspector-btn"
                onClick={onOpenLinkInspector}
                className="w-full text-left p-3 min-h-[44px] rounded-xl border border-blue-200 dark:border-blue-900/50 bg-blue-50/80 dark:bg-blue-950/30 hover:bg-blue-100 dark:hover:bg-blue-950/60 text-blue-950 dark:text-blue-100 text-xs font-bold flex items-center justify-between cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Link2 className="w-4 h-4 text-blue-600" />
                  <span>{t.actionLinkInspectorTitle}</span>
                </div>
                <span className="text-[10px] bg-blue-200 dark:bg-blue-900 text-blue-900 dark:text-blue-100 px-2 py-0.5 rounded-md font-bold">Scan</span>
              </button>

              <button
                id="sidebar-trending-alerts-btn"
                onClick={onOpenTrendingAlerts}
                className="w-full text-left p-3 min-h-[44px] rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/80 dark:bg-amber-950/30 hover:bg-amber-100 dark:hover:bg-amber-950/60 text-amber-950 dark:text-amber-100 text-xs font-bold flex items-center justify-between cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Flame className="w-4 h-4 text-amber-600" />
                  <span>{t.actionAlertsTitle}</span>
                </div>
                <span className="text-[10px] bg-amber-200 dark:bg-amber-900 text-amber-950 dark:text-amber-100 px-2 py-0.5 rounded-md font-bold">Live</span>
              </button>

              <button
                id="sidebar-citizen-rules-btn"
                onClick={onOpenCitizenRules}
                className="w-full text-left p-3 min-h-[44px] rounded-xl border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50/80 dark:bg-indigo-950/30 hover:bg-indigo-100 dark:hover:bg-indigo-950/60 text-indigo-950 dark:text-indigo-100 text-xs font-bold flex items-center justify-between cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Scale className="w-4 h-4 text-indigo-600" />
                  <span>{t.actionRulesTitle}</span>
                </div>
                <span className="text-[10px] bg-indigo-200 dark:bg-indigo-900 text-indigo-950 dark:text-indigo-100 px-2 py-0.5 rounded-md font-bold">RBI</span>
              </button>
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              <PhoneCall className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              <span>{t.emergencyTitle}</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-lg">
                <p className="font-semibold text-rose-900 dark:text-rose-200">{t.cyberCrimeHelpline}</p>
                <div className="flex items-center justify-between mt-1">
                  <a href="tel:1930" className="text-base font-bold text-rose-700 dark:text-rose-300 hover:underline">📞 1930</a>
                  <span className="text-[10px] bg-rose-200/70 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200 px-2 py-0.5 rounded font-medium">{t.tollFree24x7}</span>
                </div>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-lg">
                <p className="font-semibold text-blue-900 dark:text-blue-200">{t.officialPortal}</p>
                <a
                  href="https://cybercrime.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-blue-700 dark:text-blue-400 font-semibold hover:underline mt-1"
                >
                  <Globe className="w-3.5 h-3.5" />
                  cybercrime.gov.in
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Privacy & Safety Guarantee */}
          <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 text-xs space-y-1 text-emerald-900 dark:text-emerald-200">
            <div className="flex items-center gap-1.5 font-bold">
              <Lock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{t.privacyBadge}</span>
            </div>
            <p className="text-[11px] text-emerald-800 dark:text-emerald-300 leading-relaxed">
              {getPrivacyText()}
            </p>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
          <span>{t.disclaimerNote}</span>
        </div>
      </aside>
    </>
  );
};
