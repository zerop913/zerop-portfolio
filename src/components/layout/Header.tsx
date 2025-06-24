"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";

interface HeaderProps {
  onMenuToggle?: (isOpen: boolean) => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const handleMenuToggle = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    onMenuToggle?.(newState);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navItems = [
    { href: "#hero", label: "home", file: ".tsx" },
    { href: "#projects", label: "work", file: ".json" },
    { href: "#faq", label: "info", file: ".md" },
    { href: "#contact", label: "contact", file: ".sh" },
  ];
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setIsMenuOpen(false);
    onMenuToggle?.(false);
  };
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? `backdrop-blur-xl border-b ${
              isDark
                ? "bg-gray-950/80 border-green-400/20"
                : "bg-white/80 border-green-600/20"
            }`
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <div
            className="flex items-center space-x-3 group cursor-pointer"
            onClick={() => scrollToSection("#hero")}
          >
            <div
              className={`w-9 h-9 lg:w-10 lg:h-10 rounded-md border flex items-center justify-center transition-all duration-300 group-hover:scale-105 ${
                isDark
                  ? "bg-green-400/10 border-green-400/30 group-hover:border-green-400/60"
                  : "bg-green-600/10 border-green-600/30 group-hover:border-green-600/60"
              }`}
            >
              {" "}
              <span
                className={`font-mono text-sm lg:text-base font-bold ${
                  isDark ? "text-green-400" : "text-green-600"
                }`}
              >
                &lt;/&gt;
              </span>
            </div>{" "}
            <div className="hidden sm:flex flex-col">
              <span
                className={`font-mono text-sm lg:text-base xl:text-lg font-bold leading-none ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                ivan
              </span>
              <span
                className={`font-mono text-xs ${
                  isDark ? "text-green-400/80" : "text-green-600/80"
                }`}
              >
                ./dev
              </span>
            </div>
          </div>{" "}
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(item.href)}
                className={`group relative font-mono text-sm py-2 px-3 lg:px-4 ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                <span>
                  {item.label}
                  <span
                    className={`${
                      isDark ? "text-green-400/80" : "text-green-600/80"
                    }`}
                  >
                    {item.file}
                  </span>
                </span>
                {/* Анимированное подчёркивание */}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r transition-all duration-300 ease-out w-0 group-hover:w-full ${
                    isDark
                      ? "from-green-400/80 to-green-400"
                      : "from-green-600/80 to-green-600"
                  }`}
                ></span>
              </button>
            ))}
          </div>{" "}
          {/* Controls */}
          <div className="flex items-center space-x-3">
            {/* Status Indicator */}
            <div
              className={`hidden lg:flex items-center space-x-2 font-mono text-xs px-3 py-1.5 rounded-md border ${
                isDark
                  ? "text-green-400 border-green-400/30 bg-green-400/5"
                  : "text-green-600 border-green-600/30 bg-green-600/5"
              }`}
            >
              <div
                className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                  isDark ? "bg-green-400" : "bg-green-600"
                }`}
              ></div>
              <span>online</span>
            </div>{" "}
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-md font-mono text-xs transition-all duration-300 hover:scale-105 ${
                isDark
                  ? "text-green-400 hover:bg-green-400/10 border border-green-400/30"
                  : "text-green-600 hover:bg-green-600/10 border border-green-600/30"
              }`}
            >
              <span>{isDark ? "●" : "○"}</span>
              <span className="hidden sm:inline">
                {isDark ? "dark" : "light"}
              </span>
            </button>
            {/* Mobile Menu Button */}
            <button
              className={`md:hidden p-2 rounded-md transition-all duration-300 hover:scale-105 ${
                isDark
                  ? "text-green-400 hover:bg-green-400/10"
                  : "text-green-600 hover:bg-green-600/10"
              }`}
              onClick={handleMenuToggle}
            >
              <div className="w-5 h-5 flex flex-col justify-center space-y-1">
                <div
                  className={`w-full h-0.5 bg-current transition-all duration-300 ${
                    isMenuOpen ? "rotate-45 translate-y-1.5" : ""
                  }`}
                ></div>
                <div
                  className={`w-full h-0.5 bg-current transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                ></div>
                <div
                  className={`w-full h-0.5 bg-current transition-all duration-300 ${
                    isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                  }`}
                ></div>
              </div>
            </button>
          </div>{" "}
        </div>{" "}
        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed top-16 left-0 right-0 z-50 transition-all duration-300 overflow-hidden ${
            isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div
            className={`mx-4 my-4 py-8 px-6 border rounded-xl backdrop-blur-lg shadow-2xl ${
              isDark
                ? "border-green-400/30 bg-gray-900/98"
                : "border-green-600/30 bg-white/98"
            }`}
          >
            <div className="space-y-4">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(item.href)}
                  className={`w-full flex items-center justify-between transition-all duration-300 font-mono text-base py-4 px-5 rounded-xl text-left group ${
                    isDark
                      ? "text-gray-300 hover:text-green-400 hover:bg-green-400/10 border border-transparent hover:border-green-400/20"
                      : "text-gray-600 hover:text-green-600 hover:bg-green-600/10 border border-transparent hover:border-green-600/20"
                  }`}
                >
                  <span className="flex flex-col">
                    <span className="font-semibold">
                      {item.label}
                      <span
                        className={`${
                          isDark ? "text-green-400/80" : "text-green-600/80"
                        }`}
                      >
                        {item.file}
                      </span>
                    </span>
                    <span
                      className={`text-xs mt-1 ${
                        isDark ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      {item.label === "home" && "Главная страница"}
                      {item.label === "work" && "Портфолио проектов"}
                      {item.label === "info" && "Часто задаваемые вопросы"}
                      {item.label === "contact" && "Связаться со мной"}
                    </span>
                  </span>
                  <span
                    className={`text-lg transition-transform duration-300 group-hover:translate-x-1 ${
                      isDark ? "text-green-400/60" : "text-green-600/60"
                    }`}
                  >
                    →
                  </span>
                </button>
              ))}
            </div>

            {/* Mobile Controls */}
            <div
              className={`mt-8 pt-8 border-t space-y-4 ${
                isDark ? "border-green-400/20" : "border-green-600/20"
              }`}
            >
              {/* Status */}
              <div
                className={`flex items-center justify-center space-x-3 font-mono text-sm px-4 py-3 rounded-xl border ${
                  isDark
                    ? "text-green-400 border-green-400/30 bg-green-400/5"
                    : "text-green-600 border-green-600/30 bg-green-600/5"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full animate-pulse ${
                    isDark ? "bg-green-400" : "bg-green-600"
                  }`}
                ></div>
                <span>status: online</span>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`w-full flex items-center justify-between px-5 py-4 rounded-xl font-mono text-base transition-all duration-300 border group ${
                  isDark
                    ? "text-green-400 hover:bg-green-400/10 border-green-400/30 hover:border-green-400/50"
                    : "text-green-600 hover:bg-green-600/10 border-green-600/30 hover:border-green-600/50"
                }`}
              >
                <span className="flex flex-col">
                  <span className="font-semibold">theme.switch()</span>
                  <span
                    className={`text-xs mt-1 ${
                      isDark ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    Переключить тему оформления
                  </span>
                </span>
                <span className="flex items-center space-x-3">
                  <span className="text-lg">{isDark ? "●" : "○"}</span>
                  <span
                    className={`text-sm transition-all duration-300 group-hover:scale-110 ${
                      isDark ? "text-green-400" : "text-green-600"
                    }`}
                  >
                    {isDark ? "темная" : "светлая"}
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
