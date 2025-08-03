"use client";

import React, { createContext, useContext } from "react";
import { useLocalStorage } from "./useLocalStorage";

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

  const t = (key: string, fallback?: string) => {
    return fallback || key;
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
