"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalData } from "@/data/common/personal";
import { useI18n, getLocalizedText } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

export const Header: React.FC = () => {
  const { language } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showStatusTooltip, setShowStatusTooltip] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    // Закрываем мобильное меню при изменении размера экрана
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Получаем московское время
  const getMoscowTime = () => {
    const now = new Date();
    return new Date(
      now.toLocaleString("en-US", {
        timeZone: personalData.workSchedule.timezone,
      })
    );
  };

  // Конвертируем московские часы в локальное время пользователя
  const convertMoscowToUserTime = (moscowHour: number) => {
    const moscowDate = new Date();
    moscowDate.setUTCHours(moscowHour - 3, 0, 0, 0); // MSK = UTC+3

    return moscowDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  // Проверяем статус работы
  const getWorkStatus = () => {
    const moscowTime = getMoscowTime();
    const moscowHour = moscowTime.getHours();

    const { workStart, workEnd } = personalData.workSchedule;

    const isOnline = moscowHour >= workStart || moscowHour < workEnd;

    let timeUntilChange = 0;

    if (isOnline) {
      if (moscowHour >= workStart) {
        timeUntilChange = 24 - moscowHour + workEnd;
      } else {
        timeUntilChange = workEnd - moscowHour;
      }
    } else {
      timeUntilChange = workStart - moscowHour;
    }

    return {
      isOnline,
      timeUntilChange,
      userWorkStart: convertMoscowToUserTime(workStart),
      userWorkEnd: convertMoscowToUserTime(workEnd),
    };
  };

  const workStatus = getWorkStatus();

  const menuItems = [
    {
      label: { ru: "Проекты", en: "Projects" },
      href: "#projects",
      delay: 0.1,
    },
    {
      label: { ru: "Навыки", en: "Skills" },
      href: "#skills",
      delay: 0.2,
    },
    {
      label: { ru: "Прайс", en: "Pricing" },
      href: "#pricing",
      delay: 0.3,
    },
    {
      label: { ru: "FAQ", en: "FAQ" },
      href: "#faq",
      delay: 0.35,
    },
    {
      label: { ru: "Контакты", en: "Contact" },
      href: "#contact",
      delay: 0.4,
    },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo/Brand */}
            <div className="flex items-center">
              {/* Hexagon Logo */}
              <div className="relative mr-2 sm:mr-4">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 32 32"
                  className="text-white sm:w-8 sm:h-8"
                >
                  <path
                    d="M16 2 L28 9 L28 23 L16 30 L4 23 L4 9 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <text
                    x="16"
                    y="20"
                    textAnchor="middle"
                    className="text-xs font-mono fill-current"
                  >
                    /
                  </text>
                </svg>
              </div>

              {/* Text Block */}
              <div className="flex items-baseline space-x-1 sm:space-x-2">
                <span className="font-grotesk text-base sm:text-lg font-light text-white">
                  ivan
                </span>
                <span className="text-gray-600 text-sm">•</span>
                <span className="font-mono text-xs sm:text-sm text-gray-400">
                  dev
                </span>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-12">
              {menuItems.map((item, index) => (
                <motion.a
                  key={getLocalizedText(item.label, language)}
                  href={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: item.delay, duration: 0.5 }}
                  whileHover={{ y: -2 }}
                  className="font-mono text-sm text-gray-300 hover:text-white transition-colors duration-200 relative group"
                >
                  {getLocalizedText(item.label, language)}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
                </motion.a>
              ))}
            </nav>

            {/* Right Side - Portfolio Status */}
            <div className="flex items-center gap-6 sm:gap-8 lg:gap-10">
              {/* Portfolio Version */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="hidden lg:flex items-center space-x-3"
              >
                <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                <span className="font-mono text-xs text-gray-500 uppercase tracking-wider">
                  Portfolio v{currentYear}
                </span>
              </motion.div>

              {/* Language Switcher */}
              <LanguageSwitcher />

              {/* Work Status with Tooltip */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="hidden sm:flex items-center relative"
                onMouseEnter={() => setShowStatusTooltip(true)}
                onMouseLeave={() => setShowStatusTooltip(false)}
              >
                <div className="flex items-center space-x-3 px-3 py-1 border border-gray-800 rounded-full cursor-pointer">
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      workStatus.isOnline ? "bg-green-400" : "bg-red-400"
                    }`}
                  ></div>
                  <span className="font-mono text-xs text-gray-400">
                    {workStatus.isOnline
                      ? getLocalizedText(
                          personalData.workSchedule.messages.online,
                          language
                        )
                      : getLocalizedText(
                          personalData.workSchedule.messages.offline,
                          language
                        )}
                  </span>
                </div>

                {/* Tooltip */}
                <AnimatePresence>
                  {showStatusTooltip && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-2 w-72 bg-black/90 backdrop-blur-sm border border-gray-800 rounded-lg p-4 shadow-xl z-50"
                    >
                      <div className="space-y-3">
                        {/* Header */}
                        <div className="flex items-center space-x-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              workStatus.isOnline
                                ? "bg-green-400"
                                : "bg-red-400"
                            }`}
                          ></div>
                          <span className="font-mono text-sm text-white">
                            {workStatus.isOnline
                              ? language === "en"
                                ? `I'm currently ${getLocalizedText(
                                    personalData.workSchedule.messages.online,
                                    language
                                  ).toLowerCase()}`
                                : `Я сейчас ${getLocalizedText(
                                    personalData.workSchedule.messages.online,
                                    language
                                  ).toLowerCase()}`
                              : language === "en"
                                ? `I'm currently ${getLocalizedText(
                                    personalData.workSchedule.messages.offline,
                                    language
                                  ).toLowerCase()}`
                                : `Я сейчас ${getLocalizedText(
                                    personalData.workSchedule.messages.offline,
                                    language
                                  ).toLowerCase()}`}
                          </span>
                        </div>

                        {/* Schedule Info */}
                        <div className="space-y-2 text-xs font-mono text-gray-400">
                          <div className="flex">
                            <span className="flex-1">
                              {language === "en"
                                ? "Work hours:"
                                : "Рабочие часы:"}
                            </span>
                            <span className="text-gray-300 text-right">
                              {workStatus.userWorkStart} -{" "}
                              {workStatus.userWorkEnd}
                            </span>
                          </div>
                          <div className="flex">
                            <span className="flex-1">
                              {language === "en"
                                ? "Response time:"
                                : "Время ответа:"}
                            </span>
                            <span className="text-gray-300 text-right">
                              {getLocalizedText(
                                personalData.workSchedule.messages.responseTime,
                                language
                              )}
                            </span>
                          </div>
                          {!workStatus.isOnline && (
                            <div className="flex">
                              <span className="flex-1">
                                {language === "en"
                                  ? "Back online in:"
                                  : "Вернусь через:"}
                              </span>
                              <span className="text-green-400 text-right">
                                ~{workStatus.timeUntilChange}
                                {language === "en" ? "h" : "ч"}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* CTA */}
                        <div className="pt-2 border-t border-gray-800">
                          <a
                            href={personalData.telegramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-mono text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            {getLocalizedText(
                              personalData.workSchedule.messages.sendMessage,
                              language
                            )}
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden w-8 h-8 border border-white/30 flex items-center justify-center hover:bg-white/5 transition-colors relative"
              >
                <div className="relative w-4 h-4">
                  {isMobileMenuOpen ? (
                    // Крестик
                    <>
                      <span className="absolute top-1/2 left-0 w-full h-px bg-white transform -translate-y-1/2 rotate-45" />
                      <span className="absolute top-1/2 left-0 w-full h-px bg-white transform -translate-y-1/2 -rotate-45" />
                    </>
                  ) : (
                    // Гамбургер
                    <>
                      <span className="absolute top-0 left-0 w-full h-px bg-white" />
                      <span className="absolute top-1/2 left-0 w-3/4 h-px bg-white transform -translate-y-1/2" />
                      <span className="absolute bottom-0 left-0 w-1/2 h-px bg-white" />
                    </>
                  )}
                </div>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 overflow-hidden absolute top-full left-0 right-0"
              style={{ zIndex: 51 }}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Mobile Navigation */}
                <nav className="space-y-6">
                  {menuItems.map((item, index) => (
                    <motion.a
                      key={getLocalizedText(item.label, language)}
                      href={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      onClick={(e) => {
                        e.preventDefault();

                        // Закрываем меню
                        setIsMobileMenuOpen(false);

                        // Программный переход к секции
                        setTimeout(() => {
                          const element = document.querySelector(item.href);
                          if (element) {
                            element.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                          }
                        }, 300); // Даем время анимации закрытия меню
                      }}
                      className="block font-mono text-lg text-gray-300 hover:text-white transition-colors duration-200 border-b border-gray-800 pb-4 group"
                    >
                      <div className="flex items-center justify-between">
                        <span>{getLocalizedText(item.label, language)}</span>
                        <motion.div className="w-6 h-px bg-gray-600 group-hover:bg-white group-hover:w-8 transition-all duration-300" />
                      </div>
                    </motion.a>
                  ))}
                </nav>

                {/* Mobile Work Status */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                  className="mt-8 pt-6 border-t border-gray-800"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-sm text-gray-500 uppercase tracking-wider">
                      {language === "en" ? "Status" : "Статус"}
                    </span>
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          workStatus.isOnline ? "bg-green-400" : "bg-red-400"
                        }`}
                      ></div>
                      <span className="font-mono text-xs text-gray-400">
                        {workStatus.isOnline
                          ? getLocalizedText(
                              personalData.workSchedule.messages.online,
                              language
                            )
                          : getLocalizedText(
                              personalData.workSchedule.messages.offline,
                              language
                            )}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs font-mono text-gray-400">
                    <div className="flex justify-between">
                      <span>
                        {language === "en" ? "Work hours:" : "Рабочие часы:"}
                      </span>
                      <span className="text-gray-300">
                        {workStatus.userWorkStart} - {workStatus.userWorkEnd}
                      </span>
                    </div>
                    {!workStatus.isOnline && (
                      <div className="flex justify-between">
                        <span>
                          {language === "en" ? "Back in:" : "Вернусь через:"}
                        </span>
                        <span className="text-green-400">
                          ~{workStatus.timeUntilChange}
                          {language === "en" ? "h" : "ч"}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Mobile Contact Button */}
                  <motion.a
                    href={personalData.telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 5 }}
                    className="mt-6 flex items-center space-x-3 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <span className="font-mono text-sm tracking-wider">
                      {language === "en"
                        ? "Contact on Telegram"
                        : "Написать в Telegram"}
                    </span>
                    <div className="w-6 h-px bg-blue-400" />
                    <div className="w-1 h-1 bg-blue-400 rounded-full" />
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Background Overlay when mobile menu is open */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden"
            style={{ zIndex: 40, paddingTop: "80px" }}
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};
