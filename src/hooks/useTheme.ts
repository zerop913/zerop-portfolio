"use client";

import { useContext } from "react";
import { ThemeContext } from "@/providers/ThemeProvider";

export function useTheme() {
  const context = useContext(ThemeContext);

  // Если контекст недоступен, возвращаем значения по умолчанию
  if (context === undefined) {
    return {
      isDark: false,
      toggleTheme: () => {},
    };
  }

  return context;
}
