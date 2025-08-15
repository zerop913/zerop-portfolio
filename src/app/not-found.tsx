"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function NotFound() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header с логотипом */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="font-grotesk text-xl font-light">
              Ivan Smolin
            </Link>
            <div className="text-xs font-mono text-gray-500">
              {t("errorCode")}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-2xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Error Code */}
                <div className="mb-8">
                  <motion.div
                    className="inline-block border border-gray-800 px-4 py-2 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span className="font-mono text-sm text-gray-400">
                      {t("errorCode")}
                    </span>
                  </motion.div>

                  <motion.h1
                    className="font-grotesk text-4xl sm:text-5xl md:text-6xl font-light text-white mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {t("notFoundTitle")}
                  </motion.h1>
                </div>

                {/* Description */}
                <motion.div
                  className="mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <p className="text-lg text-gray-400 leading-relaxed mb-4">
                    {t("notFoundDescription")}
                  </p>
                  <p className="text-sm font-mono text-gray-500">
                    {t("notFoundHint")}
                  </p>
                </motion.div>

                {/* Navigation */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <Link
                    href="/"
                    className="group inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-3 font-mono text-sm hover:bg-gray-200 transition-colors duration-300"
                  >
                    <Home className="w-4 h-4" />
                    {t("homeButton")}
                    <motion.div className="w-0 h-px bg-black transition-all duration-300 group-hover:w-4" />
                  </Link>

                  <button
                    onClick={() => window.history.back()}
                    className="group inline-flex items-center justify-center gap-3 border border-gray-600 text-white px-8 py-3 font-mono text-sm hover:border-gray-400 hover:bg-gray-900 transition-colors duration-300"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    {t("backButton")}
                    <motion.div className="w-0 h-px bg-white transition-all duration-300 group-hover:w-4" />
                  </button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6 text-sm font-mono text-gray-500">
              <span>404</span>
              <div className="w-px h-4 bg-gray-700"></div>
              <span>{t("notFoundStatus")}</span>
              <div className="w-px h-4 bg-gray-700"></div>
              <span>{new Date().getFullYear()}</span>
            </div>
            <div className="text-xs text-gray-600">© Ivan Smolin</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
