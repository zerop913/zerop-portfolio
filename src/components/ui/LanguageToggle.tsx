"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { useTheme } from "@/hooks/useTheme";
import { useClientOnly } from "@/hooks/useClientOnly";

export default function LanguageToggle() {
  const { language, toggleLanguage, mounted } = useLanguage();
  const { isDark } = useTheme();
  const clientMounted = useClientOnly();

  if (!clientMounted || !mounted) {
    return (
      <div
        className={`flex items-center space-x-2 px-3 py-1.5 rounded-md font-mono text-xs border opacity-60 ${
          isDark
            ? "text-green-400 border-green-400/30"
            : "text-green-600 border-green-600/30"
        }`}
      >
        <div className="flex items-center space-x-1">
          <span>RU</span>
          <span
            className={`${isDark ? "text-green-400/60" : "text-green-600/60"}`}
          >
            /
          </span>
          <span>EN</span>
        </div>
      </div>
    );
  }

  const handleToggle = () => {
    toggleLanguage();
  };

  return (
    <button
      onClick={handleToggle}
      className={`flex items-center space-x-2 px-3 py-1.5 rounded-md font-mono text-xs transition-all duration-300 hover:scale-105 ${
        isDark
          ? "text-green-400 hover:bg-green-400/10 border border-green-400/30"
          : "text-green-600 hover:bg-green-600/10 border border-green-600/30"
      }`}
    >
      <div className="flex items-center space-x-1">
        <span
          className={`transition-all duration-300 ${
            language === "ru" ? "font-bold" : "opacity-60"
          }`}
        >
          RU
        </span>
        <span
          className={`${isDark ? "text-green-400/60" : "text-green-600/60"}`}
        >
          /
        </span>
        <span
          className={`transition-all duration-300 ${
            language === "en" ? "font-bold" : "opacity-60"
          }`}
        >
          EN
        </span>
      </div>
    </button>
  );
}
