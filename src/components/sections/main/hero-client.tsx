"use client";

import React from "react";
import { motion } from "framer-motion";
import { useI18n, getLocalizedText } from "@/lib/i18n";

interface PersonalData {
  name: string;
  title: {
    ru: string;
    en: string;
  };
  description: {
    ru: string;
    en: string;
  };
  telegramUrl: string | null;
  workSchedule: any;
  contactNote: any;
  socialLinks: any[];
}

interface HeroSectionProps {
  personalData: PersonalData;
  topSkills: string[];
}

export const HeroSectionClient: React.FC<HeroSectionProps> = ({ personalData, topSkills }) => {
  const { language } = useI18n();

  return (
    <section className="min-h-screen bg-black text-white overflow-hidden relative">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-16">
        {/* Header Info - Компактная верхняя строка */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-between mb-12 sm:mb-16"
        >
          <span className="font-mono text-xs sm:text-sm text-gray-500 tracking-wider uppercase">
            01 / {language === "en" ? "Home" : "Главная"}
          </span>
        </motion.div>

        {/* Main Content - Двухколоночная компоновка */}
        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center min-h-[60vh]">
          {/* Left Column - Основная информация */}
          <div className="col-span-12 lg:col-span-8">
            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mb-6 sm:mb-8"
            >
              <h1 className="font-grotesk text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-light leading-none">
                <motion.span
                  className="block"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Ivan
                </motion.span>
                <motion.span
                  className="block text-gradient-primary"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Smolin
                </motion.span>
              </h1>
            </motion.div>

            {/* Title & Description - Элегантное оформление */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mb-12 sm:mb-16 max-w-4xl"
            >
              {/* Специализация */}
              <div className="mb-6 sm:mb-8 relative">
                <div className="flex items-center space-x-4">
                  <div className="w-6 sm:w-8 h-px bg-gray-600"></div>
                  <h2 className="font-mono text-sm sm:text-lg text-gray-300 tracking-wider uppercase">
                    {getLocalizedText(personalData.title, language)}
                  </h2>
                </div>
              </div>

              {/* Описание */}
              <div className="relative max-w-3xl">
                <div className="absolute -left-4 sm:-left-8 top-0 bottom-0 w-px bg-gradient-to-b from-gray-600 via-gray-700 to-transparent"></div>
                <div className="pl-4 sm:pl-8">
                  <p className="text-lg sm:text-xl text-gray-400 leading-relaxed font-light">
                    {getLocalizedText(personalData.description, language)}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* CTA Section - Компактные действия */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
            >
              {/* CTA Section - Компактные действия */}
              <div className="flex flex-col sm:flex-row gap-6">
                <motion.a
                  href="#projects"
                  whileHover={{ x: 10 }}
                  className="group flex items-center space-x-4 text-white hover:text-gray-300 transition-colors"
                >
                  <span className="font-mono text-sm tracking-wider uppercase">
                    {language === "en" ? "Projects" : "Проекты"}
                  </span>
                  <div className="w-12 h-px bg-white" />
                  <div className="w-1 h-1 bg-white rounded-full group-hover:rotate-45 group-hover:rounded-none group-hover:scale-110 transition-all duration-300" />
                </motion.a>

                <motion.a
                  href={personalData.telegramUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 10 }}
                  className="group flex items-center space-x-4 text-gray-400 hover:text-white transition-colors"
                >
                  <span className="font-mono text-sm tracking-wider uppercase">
                    {language === "en" ? "Contact" : "Связаться"}
                  </span>
                  <div className="w-8 h-px bg-gray-400 group-hover:bg-white transition-colors" />
                  <div className="w-1 h-1 bg-gray-400 group-hover:bg-white rounded-full group-hover:rotate-45 group-hover:rounded-none group-hover:scale-110 transition-all duration-300" />
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Навыки и статистика */}
          <div className="col-span-12 lg:col-span-4">
            {/* Top Skills Widget */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1.6 }}
              className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 sm:p-8"
            >
              <div className="mb-6">
                <span className="font-mono text-xs text-gray-500 uppercase tracking-wider">
                  {language === "en" ? "Core Technologies" : "Основные технологии"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {topSkills.slice(0, 4).map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 2 + index * 0.1 }}
                    className="group cursor-default"
                  >
                    <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-600/30 group-hover:border-gray-500/50 transition-all duration-300">
                      <span className="font-mono text-sm text-gray-300 group-hover:text-white transition-colors">
                        {skill}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Skills Link */}
              <motion.a
                href="#skills"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 2.5 }}
                className="group flex items-center justify-center mt-6 py-3 text-gray-400 hover:text-white transition-colors"
              >
                <span className="font-mono text-xs uppercase tracking-wider">
                  {language === "en" ? "View All Skills" : "Все навыки"}
                </span>
                <motion.div
                  className="ml-2 w-4 h-px bg-gray-400 group-hover:bg-white transition-colors"
                  whileHover={{ width: "1.5rem" }}
                />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)
            `,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Gradient overlays */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/5 via-transparent to-purple-900/5" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-gray-900/50 via-transparent to-transparent" />

        {/* Floating elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 right-1/4 w-1 h-32 bg-gradient-to-b from-white/20 to-transparent"
        />

        <motion.div
          animate={{
            x: [0, 20, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/3 left-1/4 w-32 h-1 bg-gradient-to-r from-white/20 to-transparent"
        />
      </div>
    </section>
  );
};
