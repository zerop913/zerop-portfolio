"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Settings } from "lucide-react";
import Link from "next/link";
import { useCookieConsent, CookieConsent } from "@/lib/analytics";
import { useI18n } from "@/lib/i18n";
import { translations } from "@/data/translations";

export function CookieBanner() {
  const { consent, showBanner, updateConsent, acceptAll, declineAll } =
    useCookieConsent();
  const { language } = useI18n();
  const [showSettings, setShowSettings] = useState(false);
  const [tempConsent, setTempConsent] = useState<CookieConsent>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  const t = translations[language];

  if (!showBanner) return null;

  const handleSaveSettings = () => {
    updateConsent(tempConsent);
    setShowSettings(false);
  };

  const toggleSetting = (key: keyof Omit<CookieConsent, "necessary">) => {
    setTempConsent((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-black border-t border-gray-800"
        >
          <div className="max-w-7xl mx-auto">
            {!showSettings ? (
              // Основной баннер
              <div className="px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-8">
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-xs text-gray-500 tracking-wider uppercase mt-1 flex-shrink-0">
                        Cookies
                      </span>
                      <div>
                        <p className="text-sm text-gray-300 leading-relaxed max-w-3xl">
                          {t.cookieMessage}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {language === "ru"
                            ? "Подробнее в нашей "
                            : "Learn more in our "}
                          <Link
                            href="/privacy"
                            className="text-gray-400 hover:text-white underline transition-colors"
                          >
                            {language === "ru"
                              ? "политике конфиденциальности"
                              : "privacy policy"}
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row gap-3 lg:flex-shrink-0">
                    <button
                      onClick={() => setShowSettings(true)}
                      className="px-4 py-2 text-xs font-mono text-gray-400 border border-gray-700 hover:border-gray-500 hover:text-gray-300 transition-all duration-200 tracking-wider uppercase"
                    >
                      {t.cookieSettings}
                    </button>

                    <button
                      onClick={declineAll}
                      className="px-4 py-2 text-xs font-mono text-gray-400 border border-gray-700 hover:border-gray-500 hover:text-gray-300 transition-all duration-200 tracking-wider uppercase"
                    >
                      {t.cookieDecline}
                    </button>

                    <button
                      onClick={acceptAll}
                      className="px-4 py-2 text-xs font-mono text-white border border-white hover:bg-white hover:text-black transition-all duration-200 tracking-wider uppercase"
                    >
                      {t.cookieAccept}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // Настройки cookie
              <div className="px-4 sm:px-6 lg:px-8 py-6 border-t border-gray-800">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-gray-500 tracking-wider uppercase">
                      {t.settingsTitle}
                    </span>
                    <button
                      onClick={() => setShowSettings(false)}
                      className="p-1 text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {/* Необходимые cookie */}
                    <div className="flex items-start justify-between py-3 border-b border-gray-800">
                      <div className="flex-1">
                        <h4 className="text-sm text-white font-mono tracking-wider uppercase mb-1">
                          {t.cookieNecessary}
                        </h4>
                        <p className="text-xs text-gray-400 leading-relaxed">
                          {t.cookieNecessaryDesc}
                        </p>
                      </div>
                      <div className="flex items-center ml-4">
                        <div className="w-4 h-4 border border-gray-600 bg-gray-700 flex items-center justify-center">
                          <div className="w-2 h-2 bg-white"></div>
                        </div>
                      </div>
                    </div>

                    {/* Аналитические cookie */}
                    <div className="flex items-start justify-between py-3 border-b border-gray-800">
                      <div className="flex-1">
                        <h4 className="text-sm text-white font-mono tracking-wider uppercase mb-1">
                          {t.cookieAnalytics}
                        </h4>
                        <p className="text-xs text-gray-400 leading-relaxed">
                          {t.cookieAnalyticsDesc}
                        </p>
                      </div>
                      <div className="flex items-center ml-4">
                        <button
                          onClick={() => toggleSetting("analytics")}
                          className="w-4 h-4 border border-gray-600 hover:border-gray-500 transition-colors flex items-center justify-center"
                        >
                          {tempConsent.analytics && (
                            <div className="w-2 h-2 bg-white"></div>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Маркетинговые cookie */}
                    <div className="flex items-start justify-between py-3">
                      <div className="flex-1">
                        <h4 className="text-sm text-white font-mono tracking-wider uppercase mb-1">
                          {t.cookieMarketing}
                        </h4>
                        <p className="text-xs text-gray-400 leading-relaxed">
                          {t.cookieMarketingDesc}
                        </p>
                      </div>
                      <div className="flex items-center ml-4">
                        <button
                          onClick={() => toggleSetting("marketing")}
                          className="w-4 h-4 border border-gray-600 hover:border-gray-500 transition-colors flex items-center justify-center"
                        >
                          {tempConsent.marketing && (
                            <div className="w-2 h-2 bg-white"></div>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-gray-800">
                    <a
                      href="/privacy"
                      className="text-xs font-mono text-gray-500 hover:text-gray-300 transition-colors tracking-wider uppercase"
                    >
                      {t.privacyPolicy}
                    </a>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowSettings(false)}
                        className="px-4 py-2 text-xs font-mono text-gray-400 border border-gray-700 hover:border-gray-500 hover:text-gray-300 transition-all duration-200 tracking-wider uppercase"
                      >
                        {t.cancel}
                      </button>

                      <button
                        onClick={handleSaveSettings}
                        className="px-4 py-2 text-xs font-mono text-white border border-white hover:bg-white hover:text-black transition-all duration-200 tracking-wider uppercase"
                      >
                        {t.saveSettings}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
