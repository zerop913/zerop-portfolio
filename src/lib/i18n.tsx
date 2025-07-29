"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "ru" | "en";

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("ru");

  useEffect(() => {
    // Загружаем сохраненный язык из localStorage
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && (savedLanguage === "ru" || savedLanguage === "en")) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    // Сохраняем выбранный язык в localStorage
    localStorage.setItem("language", language);
  }, [language]);

  // Простая функция перевода для прямых текстов
  const t = (key: string, fallback?: string) => {
    // Эта функция пока что просто возвращает ключ или fallback
    // В будущем можно расширить для более сложных переводов
    return fallback || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
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
