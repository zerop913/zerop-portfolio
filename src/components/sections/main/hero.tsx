"use client";

import React from "react";
import { motion } from "framer-motion";
import { personalData } from "@/data/common/personal";
import { getTopSkills } from "@/data/main/skills";
import { useI18n, getLocalizedText } from "@/lib/i18n";

export const HeroSection: React.FC = () => {
  const { language } = useI18n();
  const topSkills = getTopSkills(4);

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
                  href={personalData.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 10 }}
                  className="group flex items-center space-x-4 text-gray-400 hover:text-white transition-colors"
                >
                  <span className="font-mono text-sm tracking-wider uppercase">
                    {language === "en" ? "Contact" : "Контакт"}
                  </span>
                  <div className="w-10 h-px bg-gray-400 group-hover:bg-white transition-colors" />
                  <div className="w-1 h-1 bg-gray-400 group-hover:bg-white rounded-full group-hover:rotate-45 group-hover:rounded-none group-hover:scale-110 transition-all duration-300" />
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Навыки превью */}
          <div className="col-span-12 lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1.4 }}
            >
              <h3 className="font-mono text-base text-gray-500 uppercase tracking-wider mb-8">
                {language === "en" ? "Core Skills" : "Основные навыки"}
              </h3>
              <div className="space-y-4">
                {topSkills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.6 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="group cursor-pointer"
                  >
                    <div className="flex items-center justify-between py-4 border-b border-gray-800 group-hover:border-gray-600 transition-all duration-300">
                      <span className="font-mono text-base text-gray-300 group-hover:text-white transition-colors">
                        {skill}
                      </span>
                      <motion.div
                        className="w-2 h-2 border border-gray-600 group-hover:border-white transition-colors"
                        whileHover={{ rotate: 45, scale: 1.2 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.a
                href="#skills"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2 }}
                whileHover={{ x: 5 }}
                className="inline-flex items-center space-x-2 mt-8 text-gray-500 hover:text-gray-300 transition-colors group"
              >
                <span className="font-mono text-sm uppercase tracking-wider">
                  {language === "en" ? "All Skills" : "Все навыки"}
                </span>
                <motion.div
                  className="w-6 h-px bg-gray-500 group-hover:bg-gray-300"
                  whileHover={{ scaleX: 1.3 }}
                />
              </motion.a>

              {/* Stats под навыками */}
              <div className="flex space-x-8 justify-between mt-12 pt-8 border-t border-gray-800">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.4 }}
                  className="text-center"
                >
                  <div className="font-mono text-2xl text-white mb-2">10+</div>
                  <div className="font-mono text-xs text-gray-500 uppercase tracking-wider">
                    {language === "en" ? "Technologies" : "Технологий"}
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.6 }}
                  className="text-center"
                >
                  <div className="font-mono text-2xl text-white mb-2">3+</div>
                  <div className="font-mono text-xs text-gray-500 uppercase tracking-wider">
                    {language === "en" ? "Years Experience" : "Года опыта"}
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.8 }}
                  className="text-center"
                >
                  <div className="font-mono text-2xl text-white mb-2">40+</div>
                  <div className="font-mono text-xs text-gray-500 uppercase tracking-wider">
                    {language === "en" ? "Projects" : "Проектов"}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator - Внизу */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4 }}
          className="flex justify-center mt-16 pt-8 border-t border-gray-800"
        >
          <div className="flex items-center space-x-3 text-gray-500">
            <span className="font-mono text-xs uppercase tracking-wider">
              {language === "en"
                ? "Scroll for details"
                : "Скролл для подробностей"}
            </span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-gray-500"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 3V13M8 13L4 9M8 13L12 9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
