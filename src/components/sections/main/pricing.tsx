"use client";

import React from "react";
import { motion } from "framer-motion";
import { pricingData, pricingNotes } from "@/data/main/pricing";
import { useI18n, getLocalizedText } from "@/lib/i18n";
import { useElementTracking } from "@/components/analytics/AnalyticsTracker";

export const PricingSection: React.FC = () => {
  const { language, isHydrated } = useI18n();
  const { trackClick, trackHover, trackScroll } = useElementTracking();

  // Показываем заглушку до полной гидратации
  if (!isHydrated) {
    return (
      <section id="pricing" className="py-32 bg-black relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-800 rounded mb-4 w-1/3"></div>
            <div className="h-4 bg-gray-800 rounded mb-8 w-2/3"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-96 bg-gray-800 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const formatPrice = (tier: (typeof pricingData)[0]) => {
    if (tier.price.to) {
      return `${tier.price.from.toLocaleString()} - ${tier.price.to.toLocaleString()} ${
        tier.price.currency
      }`;
    }
    return `${
      language === "en" ? "from" : "от"
    } ${tier.price.from.toLocaleString()} ${tier.price.currency}`;
  };

  const handlePricingCardClick = (tier: (typeof pricingData)[0]) => {
    trackClick("pricing", `pricing_${tier.id}`, {
      priceFrom: tier.price.from,
      priceTo: tier.price.to,
      features: tier.features[language].length,
      technologies: tier.technologies,
    });
  };

  const handlePricingCardHover = (
    tier: (typeof pricingData)[0],
    isEntering: boolean
  ) => {
    if (isEntering) {
      const hoverStartTime = Date.now();
      setTimeout(() => {
        const hoverDuration = Date.now() - hoverStartTime;
        if (hoverDuration > 1500) {
          trackHover(`pricing_${tier.id}`, hoverDuration);
        }
      }, 1500);
    }
  };

  return (
    <section id="pricing" className="py-32 bg-black relative">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

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
                04 / {language === "en" ? "Pricing" : "Прайс"}
              </span>
              <div className="relative mt-4">
                <h2 className="font-grotesk text-4xl sm:text-6xl font-light text-white relative z-10">
                  {language === "en" ? "Service Costs" : "Стоимость работ"}
                </h2>
                {/* Тонкое свечение для лучшей видимости */}
                <div className="absolute inset-0 font-grotesk text-4xl sm:text-6xl font-light text-white/10 blur-sm">
                  {language === "en" ? "Service Costs" : "Стоимость работ"}
                </div>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden sm:block"
            >
              <p className="font-mono text-sm text-gray-400 max-w-md text-right">
                {getLocalizedText(pricingNotes.disclaimer, language)}
              </p>
            </motion.div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-white/20 via-white/5 to-transparent" />
        </motion.div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {pricingData.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              onHoverStart={() => handlePricingCardHover(tier, true)}
              onHoverEnd={() => handlePricingCardHover(tier, false)}
              onClick={() => handlePricingCardClick(tier)}
              className={`group relative cursor-pointer ${
                tier.popular ? "lg:col-span-1" : ""
              }`}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-3 left-6 bg-white text-black px-4 py-1 text-xs font-mono uppercase tracking-wider z-10">
                  Популярно
                </div>
              )}

              <div className="border border-gray-800 group-hover:border-gray-600 transition-all duration-300 bg-gray-900/20 p-8 h-full">
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-sm text-gray-500 uppercase tracking-wider">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-sm text-gray-400">
                      {getLocalizedText(tier.timeline, language)}
                    </span>
                  </div>
                  <h3 className="font-grotesk text-2xl font-light text-white mb-2">
                    {getLocalizedText(tier.title, language)}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {getLocalizedText(tier.description, language)}
                  </p>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="font-mono text-3xl text-white mb-1">
                      {formatPrice(tier)}
                    </div>
                    <div className="font-mono text-xs text-gray-500 uppercase tracking-wider">
                      {getLocalizedText(tier.price.period, language)}
                    </div>
                    {tier.note && (
                      <div className="font-mono text-xs text-gray-400 mt-2">
                        {getLocalizedText(tier.note, language)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <span className="font-mono text-xs text-gray-500 uppercase tracking-wider block mb-4">
                    {language === "en" ? "What's included" : "Что входит"}
                  </span>
                  <ul className="space-y-3">
                    {(language === "en"
                      ? tier.features.en
                      : tier.features.ru
                    ).map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start space-x-3"
                      >
                        <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="mb-8">
                  <span className="font-mono text-xs text-gray-500 uppercase tracking-wider block mb-4">
                    {language === "en" ? "Technologies" : "Технологии"}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {tier.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 border border-gray-700 text-gray-300 text-xs font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <motion.div className="mt-auto" whileHover={{ x: 10 }}>
                  <a
                    href="#contact"
                    className="group/cta flex items-center space-x-4 text-white hover:text-gray-300 transition-colors"
                  >
                    <span className="font-mono text-sm tracking-wider uppercase">
                      {language === "en"
                        ? "Discuss project"
                        : "Обсудить проект"}
                    </span>
                    <div className="w-12 h-px bg-white" />
                    <div className="w-1 h-1 bg-white rounded-full group-hover/cta:rotate-45 group-hover/cta:rounded-none group-hover/cta:scale-110 transition-all duration-300" />
                  </a>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="border-t border-gray-800 pt-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group">
              <div className="py-6 border-b border-gray-800 group-hover:border-gray-600 transition-all duration-300 h-32">
                <span className="font-mono text-sm text-gray-500 uppercase tracking-wider block mb-3">
                  {language === "en" ? "Discussion" : "Обсуждение"}
                </span>
                <span className="text-white text-sm leading-relaxed">
                  {getLocalizedText(pricingNotes.consultation, language)}
                </span>
              </div>
            </div>

            <div className="group">
              <div className="py-6 border-b border-gray-800 group-hover:border-gray-600 transition-all duration-300 h-32">
                <span className="font-mono text-sm text-gray-500 uppercase tracking-wider block mb-3">
                  {language === "en" ? "Payment" : "Оплата"}
                </span>
                <span className="text-white text-sm leading-relaxed">
                  {getLocalizedText(pricingNotes.payment, language)}
                </span>
              </div>
            </div>

            <div className="group">
              <div className="py-6 border-b border-gray-800 group-hover:border-gray-600 transition-all duration-300 h-32">
                <span className="font-mono text-sm text-gray-500 uppercase tracking-wider block mb-3">
                  {language === "en" ? "Warranty" : "Гарантия"}
                </span>
                <span className="text-white text-sm leading-relaxed">
                  {getLocalizedText(pricingNotes.warranty, language)}
                </span>
              </div>
            </div>

            <div className="group">
              <div className="py-6 border-b border-gray-800 group-hover:border-gray-600 transition-all duration-300 h-32">
                <span className="font-mono text-sm text-gray-500 uppercase tracking-wider block mb-3">
                  {language === "en" ? "Support" : "Поддержка"}
                </span>
                <span className="text-white text-sm leading-relaxed">
                  {getLocalizedText(pricingNotes.support, language)}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
