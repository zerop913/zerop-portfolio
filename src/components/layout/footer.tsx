"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { personalData } from "@/data/common/personal";
import { useI18n } from "@/lib/i18n";

export const Footer: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<string>("");
  const { language } = useI18n();
  const version = "v1.5.0";
  const uptime = "99.9%";

  useEffect(() => {
    // Форматирование текущей даты
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();

    setCurrentDate(`${day}.${month}.${year}`);
  }, []);

  return (
    <footer className="bg-black py-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="font-mono text-gray-500 text-sm">
          <div className="mb-4 text-gray-400">
            user@portfolio:~$ cat /sys/info/copyright.txt
          </div>

          <div className="space-y-2 ml-4">
            <div className="text-gray-300">
              © 2025 ivan.dev - All rights reserved | Build {version}
            </div>
            <div className="flex flex-wrap gap-4 text-xs">
              <span className="text-gray-400">[STATUS: OPERATIONAL]</span>
              <span className="text-gray-400">[UPTIME: {uptime}]</span>
              <span className="text-gray-400">[LAST_BUILD: {currentDate}]</span>
            </div>
          </div>

          <div className="mt-8 text-gray-400">user@portfolio:~$</div>
        </div>

        <div className="flex justify-between items-center mt-12 pt-6 border-t border-gray-800">
          <div className="flex flex-wrap space-x-6">
            <Link
              href="/privacy"
              className="text-gray-500 hover:text-white transition-colors duration-300 text-sm"
            >
              {language === "ru"
                ? "Политика конфиденциальности"
                : "Privacy Policy"}
            </Link>
            <Link
              href="/terms"
              className="text-gray-500 hover:text-white transition-colors duration-300 text-sm"
            >
              {language === "ru"
                ? "Пользовательское соглашение"
                : "Terms of Service"}
            </Link>
            <Link
              href="/offer"
              className="text-gray-500 hover:text-white transition-colors duration-300 text-sm"
            >
              {language === "ru" ? "Договор-оферта" : "Offer Agreement"}
            </Link>
            <Link
              href="/legal-info"
              className="text-gray-500 hover:text-white transition-colors duration-300 text-sm"
            >
              {language === "ru" ? "Правовая информация" : "Legal Information"}
            </Link>
          </div>

          <div className="text-xs text-gray-600 font-mono">
            Design & Development -{" "}
            <a
              href={personalData.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              @zerop913
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
