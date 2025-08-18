"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCookieConsent } from "@/lib/analytics";
import { useI18n } from "@/lib/i18n";
import { translations } from "@/data/common/translations";

export function CookieBanner() {
  const { consent, showBanner, acceptAll } = useCookieConsent();
  const { language } = useI18n();

  const t = translations[language];

  if (!showBanner) return null;

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
            {/* Простой баннер с одной кнопкой */}
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
                    onClick={acceptAll}
                    className="px-4 py-2 text-xs font-mono text-white border border-white hover:bg-white hover:text-black transition-all duration-200 tracking-wider uppercase"
                  >
                    {t.cookieAccept}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
