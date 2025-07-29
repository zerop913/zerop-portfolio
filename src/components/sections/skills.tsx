"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalData } from "@/data/personal";
import { skillsData } from "@/data/skills";
import { useI18n } from "@/lib/i18n";

export const SkillsGrid: React.FC = () => {
  const { language } = useI18n();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section id="skills" className="py-32 bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 right-20 w-1 h-32 bg-gradient-to-b from-white/20 to-transparent" />
      <div className="absolute bottom-20 left-20 w-32 h-1 bg-gradient-to-r from-white/20 to-transparent" />

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
                02 / {language === "en" ? "Technologies" : "Технологии"}
              </span>
              <div className="relative mt-4">
                <h2 className="font-grotesk text-4xl sm:text-6xl font-light text-white relative z-10">
                  {language === "en" ? "My Stack" : "Мой стек"}
                </h2>
                {/* Тонкое свечение для лучшей видимости */}
                <div className="absolute inset-0 font-grotesk text-4xl sm:text-6xl font-light text-white/10 blur-sm">
                  {language === "en" ? "My Stack" : "Мой стек"}
                </div>
              </div>
            </div>
            <div className="hidden lg:block text-right">
              <div className="font-mono text-xs text-gray-500 mb-2">
                {language === "en" ? "Total Technologies" : "Всего технологий"}
              </div>
              <div className="font-mono text-2xl text-white">
                {personalData.skills.length}
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-white/20 via-white/5 to-transparent" />
        </motion.div>

        {/* Skills Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-20">
          {skillsData.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              className="space-y-6"
            >
              <h3 className="font-mono text-sm text-gray-400 uppercase tracking-wider">
                {category.title}
              </h3>

              <div className="space-y-4">
                {category.skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: categoryIndex * 0.2 + index * 0.1,
                    }}
                    onHoverStart={() => setHoveredSkill(skill)}
                    onHoverEnd={() => setHoveredSkill(null)}
                    className="group cursor-pointer"
                  >
                    <div className="flex items-center justify-between py-4 border-b border-gray-800 group-hover:border-gray-600 transition-all duration-300">
                      <span className="font-mono text-lg text-gray-300 group-hover:text-white transition-colors">
                        {skill}
                      </span>
                      <motion.div
                        className="flex items-center space-x-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredSkill === skill ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="w-2 h-2 bg-white rounded-full" />
                        <div className="w-1 h-1 bg-gray-500 rounded-full" />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Note */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center">
            <p className="text-gray-400 max-w-2xl mx-auto font-mono text-sm">
              {language === "en"
                ? personalData.contactNote.en
                : personalData.contactNote.ru}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
