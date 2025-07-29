"use client";

import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useI18n();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="relative"
    >
      <div className="flex items-center border border-white/20 rounded-sm overflow-hidden">
        <button
          onClick={() => setLanguage("ru")}
          className={`px-3 py-1.5 text-xs font-mono transition-all duration-200 ${
            language === "ru"
              ? "bg-white text-black"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          RU
        </button>
        <div className="w-px h-4 bg-white/20" />
        <button
          onClick={() => setLanguage("en")}
          className={`px-3 py-1.5 text-xs font-mono transition-all duration-200 ${
            language === "en"
              ? "bg-white text-black"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          EN
        </button>
      </div>
    </motion.div>
  );
};
