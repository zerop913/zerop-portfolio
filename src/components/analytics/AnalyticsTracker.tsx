"use client";

import { useEffect } from "react";
import {
  trackUserInterest,
  trackUserAction,
  trackPageView,
} from "@/lib/analytics";
import { useI18n } from "@/lib/i18n";

interface AnalyticsTrackerProps {
  children: React.ReactNode;
}

export function AnalyticsTracker({ children }: AnalyticsTrackerProps) {
  const { language } = useI18n();

  useEffect(() => {
    // Трекинг просмотра страницы
    trackPageView(window.location.pathname, document.title);

    // Трекинг времени на странице
    const startTime = Date.now();

    const handleBeforeUnload = () => {
      const timeSpent = Date.now() - startTime;
      trackUserAction("page_time", "engagement", Math.floor(timeSpent / 1000));
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      handleBeforeUnload();
    };
  }, []);

  useEffect(() => {
    // Трекинг смены языка
    trackUserAction("language_change", "preference", language);
  }, [language]);

  return <>{children}</>;
}

// HOC для автоматического трекинга интересов на основе контента
export function withInterestTracking<T extends object>(
  Component: React.ComponentType<T>,
  interests: string[]
) {
  return function TrackedComponent(props: T) {
    useEffect(() => {
      // Автоматически трекуем интересы при рендере компонента
      interests.forEach((interest) => {
        trackUserInterest(interest, "component_view");
      });
    }, []);

    return <Component {...props} />;
  };
}

// Хук для трекинга взаимодействий с элементами
export function useElementTracking() {
  const trackClick = (element: string, context?: string, value?: any) => {
    trackUserAction("click", element, value);

    // Определяем интерес на основе элемента
    const interestMap: { [key: string]: string } = {
      project: "interestWeb",
      bot: "interestBot",
      design: "interestDesign",
      mobile: "interestMobile",
      ecommerce: "interestEcommerce",
      landing: "interestLanding",
      analytics: "interestAnalytics",
      seo: "interestSeo",
      pricing: "interestConsultation",
      contact: "interestConsultation",
    };

    // Автоматически определяем интерес
    Object.entries(interestMap).forEach(([keyword, interest]) => {
      if (element.toLowerCase().includes(keyword)) {
        trackUserInterest(interest, context || "click");
      }
    });
  };

  const trackHover = (element: string, duration: number) => {
    if (duration > 2000) {
      // Если наведение больше 2 секунд
      trackUserAction("hover", element, duration);
    }
  };

  const trackScroll = (section: string, percentage: number) => {
    if (percentage > 50) {
      // Если пролистали больше 50%
      trackUserAction("scroll", section, percentage);

      // Трекуем интерес к секции
      const sectionInterests: { [key: string]: string } = {
        skills: "interestWeb",
        projects: "interestWeb",
        pricing: "interestConsultation",
        contact: "interestConsultation",
        faq: "interestSupport",
      };

      if (sectionInterests[section]) {
        trackUserInterest(sectionInterests[section], "section_view");
      }
    }
  };

  const trackFormInteraction = (
    formType: string,
    field: string,
    action: string
  ) => {
    trackUserAction("form_interaction", `${formType}_${field}_${action}`);

    // Трекуем интерес к определенным услугам на основе взаимодействия с формой
    if (formType === "contact") {
      trackUserInterest("interestConsultation", "form_engagement");
    }
  };

  return {
    trackClick,
    trackHover,
    trackScroll,
    trackFormInteraction,
  };
}
