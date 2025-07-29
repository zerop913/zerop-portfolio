"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqData } from "@/data/faq";
import { personalData } from "@/data/personal";
import { useI18n, getLocalizedText } from "@/lib/i18n";

export const FaqSection: React.FC = () => {
  const { language } = useI18n();
  const [openItemId, setOpenItemId] = useState<number | null>(1);

  const toggleItem = (id: number) => {
    setOpenItemId(openItemId === id ? null : id);
  };

  return (
    <section id="faq" className="py-32 bg-black relative">
      {/* Background Elements */}
      <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-transparent via-white/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="font-mono text-sm text-gray-500 tracking-wider uppercase">
                05 / FAQ
              </span>
              <div className="relative mt-4">
                <h2 className="font-grotesk text-4xl sm:text-6xl font-light text-white relative z-10">
                  {language === "en"
                    ? "Questions & Answers"
                    : "Вопросы и ответы"}
                </h2>
                {/* Тонкое свечение для лучшей видимости */}
                <div className="absolute inset-0 font-grotesk text-4xl sm:text-6xl font-light text-white/10 blur-sm">
                  {language === "en"
                    ? "Questions & Answers"
                    : "Вопросы и ответы"}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-white/20 via-white/5 to-transparent" />
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-12">
          {faqData.map((faqItem, index) => (
            <motion.div
              key={faqItem.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              {/* Question Number */}
              <div className="flex items-center mb-4">
                <span className="font-mono text-sm text-gray-500 mr-4">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="w-8 h-px bg-gray-700 group-hover:bg-gray-600 transition-colors"></div>
              </div>

              {/* Question */}
              <motion.button
                onClick={() => toggleItem(faqItem.id)}
                className="w-full flex items-start justify-between text-left group/button"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="font-grotesk text-xl sm:text-2xl font-light text-white group-hover/button:text-gray-300 transition-colors pr-8">
                  {getLocalizedText(faqItem.question, language)}
                </h3>
                <div className="relative flex-shrink-0 mt-1">
                  <motion.div
                    className="w-6 h-6 border border-gray-600 group-hover/button:border-gray-400 transition-colors flex items-center justify-center"
                    whileHover={{ rotate: 45 }}
                  >
                    <span
                      className={`block w-3 h-px bg-gray-400 transition-all duration-300`}
                    ></span>
                    <span
                      className={`absolute w-px h-3 bg-gray-400 transition-all duration-300 ${
                        openItemId === faqItem.id
                          ? "opacity-0 rotate-90"
                          : "opacity-100"
                      }`}
                    ></span>
                  </motion.div>
                </div>
              </motion.button>

              {/* Answer */}
              <AnimatePresence>
                {openItemId === faqItem.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-8">
                      <div className="relative pl-8">
                        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-gray-600 via-gray-700 to-transparent"></div>
                        <p className="text-gray-400 leading-relaxed">
                          {getLocalizedText(faqItem.answer, language)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom divider */}
              <div className="mt-8 w-full h-px bg-gray-800"></div>
            </motion.div>
          ))}
        </div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 pt-16 border-t border-gray-800"
        >
          <div className="max-w-2xl mx-auto">
            {/* Section header */}
            <div className="mb-12">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-8 h-px bg-gray-600"></div>
                <span className="font-mono text-sm text-gray-500 tracking-wider uppercase">
                  {language === "en" ? "Need help" : "Нужна помощь"}
                </span>
              </div>
              <h3 className="font-grotesk text-3xl sm:text-4xl font-light text-white mb-6">
                {language === "en"
                  ? "Still have questions?"
                  : "Остались вопросы?"}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {language === "en"
                  ? "If you still have questions or want to discuss project details, contact me directly."
                  : "Если у вас остались вопросы или вы хотите обсудить детали проекта, свяжитесь со мной напрямую."}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6">
              <motion.a
                href="#contact"
                whileHover={{ x: 10 }}
                className="group flex items-center space-x-4 text-white hover:text-gray-300 transition-colors"
              >
                <span className="font-mono text-sm tracking-wider uppercase">
                  {language === "en" ? "Contact" : "Связаться"}
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
                  Telegram
                </span>
                <div className="w-10 h-px bg-gray-400 group-hover:bg-white transition-colors" />
                <div className="w-1 h-1 bg-gray-400 group-hover:bg-white rounded-full group-hover:rotate-45 group-hover:rounded-none group-hover:scale-110 transition-all duration-300" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
