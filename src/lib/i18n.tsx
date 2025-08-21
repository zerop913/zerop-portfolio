"use client";

import React, { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { translations } from "@/data/common/translations";

type Language = "ru" | "en";

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
  isHydrated: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage, isHydrated] = useLocalStorage<Language>(
    "language",
    "ru"
  );

  useEffect(() => {
    if (typeof window !== "undefined" && isHydrated) {
      const urlParams = new URLSearchParams(window.location.search);
      const langParam = urlParams.get("lang") as Language;

      if (langParam && (langParam === "ru" || langParam === "en")) {
        setLanguage(langParam);
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete("lang");
        window.history.replaceState({}, "", newUrl.toString());
      }
    }
  }, [isHydrated, setLanguage]);

  const t = (key: string, fallback?: string) => {
    return (
      translations[language]?.[key] || translations.ru?.[key] || fallback || key
    );
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t, isHydrated }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
};

// Хелпер функция для получения локализованного текста из объектов с ru/en
export const getLocalizedText = (
  textObj: { ru: string; en: string },
  language: Language
): string => {
  return textObj[language] || textObj.ru;
};

// Хелпер функция для получения локализованного массива из объектов с ru/en
export const getLocalizedArray = (
  arrayObj: { ru: string[]; en: string[] },
  language: Language
): string[] => {
  return arrayObj[language] || arrayObj.ru;
};
