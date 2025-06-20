"use client";

import { faqData } from "@/data/faq";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useTheme } from "@/hooks/useTheme";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQ() {
  const { ref, isVisible } = useScrollAnimation();
  const { isDark } = useTheme();
  const [openItem, setOpenItem] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className={`py-20 relative overflow-hidden transition-colors duration-300 ${
        isDark ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {" "}
        {/* Code Editor Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div
            className={`max-w-2xl mx-auto mb-8 rounded-lg border overflow-hidden ${
              isDark
                ? "bg-gray-900 border-green-400/30"
                : "bg-gray-100 border-green-600/30"
            }`}
          >
            <div
              className={`px-4 py-2 border-b ${
                isDark
                  ? "bg-black border-green-400/20"
                  : "bg-white border-green-600/20"
              }`}
            >
              <span
                className={`font-mono text-sm ${
                  isDark ? "text-green-300" : "text-green-700"
                }`}
              >
                faq.md
              </span>
            </div>
            <div className="p-6 text-left">
              <div
                className={`font-mono text-sm ${
                  isDark ? "text-green-300" : "text-green-700"
                }`}
              >
                <div># Frequently Asked Questions</div>
                <div
                  className={`text-xs mt-2 ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Documentation for common inquiries
                </div>
              </div>
            </div>
          </div>

          <h2
            className={`text-5xl md:text-6xl font-black font-mono mb-8 ${
              isDark ? "text-green-400" : "text-green-600"
            }`}
          >
            FAQ.md
          </h2>

          <p
            className={`font-mono text-sm max-w-2xl mx-auto ${
              isDark ? "text-green-300" : "text-green-700"
            }`}
          >
            {" "}
            // Ответы на часто задаваемые вопросы о разработке и сотрудничестве
          </p>
        </motion.div>{" "}
        {/* FAQ Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={
                  isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                }
                transition={{
                  duration: 0.5,
                  delay: 0.5 + index * 0.1,
                  ease: "easeOut",
                }}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
                className={`rounded-lg border overflow-hidden ${
                  isDark
                    ? "bg-gray-900 border-green-400/30 hover:border-green-400/60"
                    : "bg-white border-green-600/30 hover:border-green-600/60"
                }`}
              >
                {/* Question Header */}
                <button
                  onClick={() => setOpenItem(openItem === index ? null : index)}
                  className={`w-full p-6 text-left transition-colors duration-300 ${
                    isDark ? "hover:bg-gray-800" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div
                        className={`font-mono text-xs mb-2 ${
                          isDark ? "text-green-400" : "text-green-600"
                        }`}
                      >
                        // Question #{(index + 1).toString().padStart(2, "0")}
                      </div>
                      <h3
                        className={`font-mono text-lg font-bold ${
                          isDark ? "text-green-300" : "text-green-700"
                        }`}
                      >
                        {item.question}
                      </h3>
                    </div>{" "}
                    <motion.div
                      animate={{ rotate: openItem === index ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className={`ml-4 ${
                        isDark ? "text-green-400" : "text-green-600"
                      }`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />{" "}
                      </svg>
                    </motion.div>
                  </div>
                </button>{" "}
                {/* Answer */}
                <AnimatePresence>
                  {openItem === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div
                        className={`px-6 pb-6 border-t ${
                          isDark ? "border-green-400/20" : "border-green-600/20"
                        }`}
                      >
                        <motion.div
                          initial={{ y: -10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.1, duration: 0.2 }}
                          className={`font-mono text-sm pt-4 ${
                            isDark ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          <div
                            className={`text-xs mb-2 ${
                              isDark ? "text-green-400" : "text-green-600"
                            }`}
                          >
                            /* Answer */
                          </div>
                          <p className="leading-relaxed">{item.answer}</p>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>{" "}
        {/* Terminal Output */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={
            isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
          }
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div
            className={`max-w-md mx-auto rounded-lg border overflow-hidden ${
              isDark
                ? "bg-gray-900 border-green-400/30"
                : "bg-gray-100 border-green-600/30"
            }`}
          >
            <div className="p-4 text-left">
              <div
                className={`font-mono text-sm space-y-1 ${
                  isDark ? "text-green-300" : "text-green-700"
                }`}
              >
                <div>$ grep -c "question" faq.md</div>
                <div className={isDark ? "text-green-400" : "text-green-600"}>
                  {faqData.length}
                </div>{" "}
                <div>$ echo "Questions answered successfully"</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
