"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { personalData } from "@/data/common/personal";
import { useI18n } from "@/lib/i18n";

export const ContactSection: React.FC = () => {
  const { language } = useI18n();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(personalData.telegramUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Получаем московское время
  const getMoscowTime = () => {
    const now = new Date();
    return new Date(
      now.toLocaleString("en-US", {
        timeZone: personalData.workSchedule.timezone,
      })
    );
  };

  // Проверяем статус работы
  const getWorkStatus = () => {
    const moscowTime = getMoscowTime();
    const moscowHour = moscowTime.getHours();

    const { workStart, workEnd } = personalData.workSchedule;

    const isOnline = moscowHour >= workStart || moscowHour < workEnd;

    return { isOnline };
  };

  const workStatus = getWorkStatus();

  return (
    <section id="contact" className="py-32 bg-black relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                06 / {language === "en" ? "Contact" : "Контакт"}
              </span>
              <div className="relative mt-4">
                <h2 className="font-grotesk text-4xl sm:text-6xl font-light text-white relative z-10">
                  {language === "en" ? "Get in touch" : "Связаться со мной"}
                </h2>
                <div className="absolute inset-0 font-grotesk text-4xl sm:text-6xl font-light text-white/10 blur-sm">
                  {language === "en" ? "Get in touch" : "Связаться со мной"}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-white/20 via-white/5 to-transparent" />
        </motion.div>

        {/* Contact Content */}
        <div className="max-w-4xl mx-auto">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-20"
          >
            <h3 className="font-grotesk text-3xl font-light text-white mb-8">
              {language === "en"
                ? "Ready to discuss your project"
                : "Готов обсудить ваш проект"}
            </h3>
            <div className="relative pl-8 mb-16">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-gray-600 via-gray-700 to-transparent"></div>
              <p className="text-gray-400 leading-relaxed text-lg">
                {language === "en"
                  ? "Contact me via Telegram to discuss details. I usually respond within an hour during working hours."
                  : "Свяжитесь со мной через Telegram для обсуждения деталей. Обычно отвечаю в течение часа в рабочее время."}
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-8">
              {/* Telegram */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="group cursor-pointer"
              >
                <div className="flex items-center justify-between py-6 border-b border-gray-800 group-hover:border-gray-600 transition-all duration-300">
                  <div className="flex items-center space-x-6">
                    <span className="font-mono text-sm text-gray-500 w-20">
                      01
                    </span>
                    <div>
                      <span className="font-mono text-sm text-gray-500 uppercase tracking-wider block mb-1">
                        Telegram
                      </span>
                      <a
                        href={personalData.telegramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xl text-white group-hover:text-gray-300 transition-colors"
                      >
                        {personalData.telegramUrl.replace("https://t.me/", "@")}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          workStatus.isOnline ? "bg-green-400" : "bg-red-400"
                        }`}
                      ></div>
                      <span className="font-mono text-xs text-gray-400">
                        {workStatus.isOnline
                          ? language === "en"
                            ? "Online"
                            : "На связи"
                          : language === "en"
                          ? "Offline"
                          : "Не на связи"}
                      </span>
                    </div>
                    <motion.div
                      className="w-6 h-6 border border-gray-600 group-hover:border-gray-400 transition-colors flex items-center justify-center"
                      whileHover={{ rotate: 45 }}
                    >
                      <span className="block w-3 h-px bg-gray-400"></span>
                      <span className="absolute w-px h-3 bg-gray-400"></span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-6 pl-26"
              >
                <motion.a
                  href={personalData.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 10 }}
                  className="group flex items-center space-x-4 text-white hover:text-gray-300 transition-colors"
                >
                  <span className="font-mono text-sm tracking-wider uppercase">
                    {language === "en" ? "Send message" : "Написать сообщение"}
                  </span>
                  <div className="w-12 h-px bg-white" />
                  <div className="w-1 h-1 bg-white rounded-full group-hover:rotate-45 group-hover:rounded-none group-hover:scale-110 transition-all duration-300" />
                </motion.a>

                <motion.button
                  onClick={handleCopy}
                  whileHover={{ x: 10 }}
                  className="group flex items-center space-x-4 text-gray-400 hover:text-white transition-colors"
                >
                  <span className="font-mono text-sm tracking-wider uppercase">
                    {copied
                      ? language === "en"
                        ? "Copied!"
                        : "Скопировано!"
                      : language === "en"
                      ? "Copy username"
                      : "Скопировать ник"}
                  </span>
                  <div className="w-10 h-px bg-gray-400 group-hover:bg-white transition-colors" />
                  <div className="w-1 h-1 bg-gray-400 group-hover:bg-white rounded-full group-hover:rotate-45 group-hover:rounded-none group-hover:scale-110 transition-all duration-300" />
                </motion.button>
              </motion.div>
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="border-t border-gray-800 pt-16"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="group">
                <div className="flex items-center justify-between py-4 border-b border-gray-800 group-hover:border-gray-600 transition-all duration-300">
                  <div>
                    <span className="font-mono text-sm text-gray-500 uppercase tracking-wider block mb-1">
                      {language === "en" ? "Working hours" : "Рабочие часы"}
                    </span>
                    <span className="font-mono text-lg text-white">
                      12:00 - 03:00 MSK
                    </span>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="flex items-center justify-between py-4 border-b border-gray-800 group-hover:border-gray-600 transition-all duration-300">
                  <div>
                    <span className="font-mono text-sm text-gray-500 uppercase tracking-wider block mb-1">
                      {language === "en" ? "Response time" : "Время ответа"}
                    </span>
                    <span className="font-mono text-lg text-white">
                      {language === "en" ? "~1 hour" : "~1 час"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="flex items-center justify-between py-4 border-b border-gray-800 group-hover:border-gray-600 transition-all duration-300">
                  <div>
                    <span className="font-mono text-sm text-gray-500 uppercase tracking-wider block mb-1">
                      {language === "en" ? "Timezone" : "Часовой пояс"}
                    </span>
                    <span className="font-mono text-lg text-white">UTC+3</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
