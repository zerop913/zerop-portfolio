"use client";

import { useI18n } from "@/lib/i18n";
import { offerAgreementData } from "@/data/common/offer";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";

export default function OfferAgreementPage() {
  const { language } = useI18n();
  const data = offerAgreementData[language as keyof typeof offerAgreementData];

  useEffect(() => {
    document.title = language === "ru" ? "Договор-оферта" : "Offer Agreement";
  }, [language]);

  // Функция для форматирования текста с markdown
  const formatText = (text: string) => {
    return text
      .replace(
        /\*\*(.*?)\*\*/g,
        '<strong class="text-white font-semibold">$1</strong>'
      )
      .replace(/\*(.*?)\*/g, '<em class="text-white/90 italic">$1</em>');
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const renderSection = (title: string, content: string) => (
    <motion.section variants={fadeInUp}>
      <h2 className="font-grotesk text-2xl font-light mb-6 border-b border-white/20 pb-2">
        {title}
      </h2>
      <div className="prose prose-invert max-w-none">
        <div
          className="text-white/80 leading-relaxed whitespace-pre-line"
          dangerouslySetInnerHTML={{
            __html: formatText(content),
          }}
        />
      </div>
    </motion.section>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 font-mono text-sm"
          >
            <ArrowLeft size={16} />
            {language === "ru" ? "Назад на главную" : "Back to home"}
          </Link>

          <h1 className="font-grotesk text-4xl md:text-5xl font-light mb-4">
            {data.title}
          </h1>

          <p className="font-mono text-white/60 text-sm">{data.lastUpdated}</p>
        </motion.div>

        {/* Content */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="space-y-12"
        >
          {renderSection(data.introduction.title, data.introduction.content)}
          {renderSection(data.parties.title, data.parties.content)}
          {renderSection(data.services.title, data.services.content)}
          {renderSection(data.terms.title, data.terms.content)}
          {renderSection(data.payment.title, data.payment.content)}
          {renderSection(data.obligations.title, data.obligations.content)}
          {renderSection(data.delivery.title, data.delivery.content)}
          {renderSection(data.warranty.title, data.warranty.content)}
          {renderSection(
            data.intellectualProperty.title,
            data.intellectualProperty.content
          )}
          {renderSection(data.liability.title, data.liability.content)}
          {renderSection(data.termination.title, data.termination.content)}
          {renderSection(data.disputes.title, data.disputes.content)}
          {renderSection(data.final.title, data.final.content)}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 pt-8 border-t border-white/20"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors font-mono text-sm"
          >
            <ArrowLeft size={16} />
            {language === "ru"
              ? "Вернуться на главную страницу"
              : "Return to homepage"}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
