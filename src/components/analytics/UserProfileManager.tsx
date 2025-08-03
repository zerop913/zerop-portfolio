"use client";

import { useEffect, useState } from "react";
import { getUserAnalyticsData, trackUserAction } from "@/lib/analytics";

interface UserProfile {
  interests: string[];
  visitCount: number;
  lastVisit: number;
  totalTimeSpent: number;
  topSections: { [key: string]: number };
  preferredLanguage: string;
  deviceType: "mobile" | "tablet" | "desktop";
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export function UserProfileManager() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    initializeUserProfile();
    trackSessionStart();
    trackDeviceInfo();
    trackUTMParameters();

    // Трекинг времени на сайте
    const sessionStart = Date.now();

    const handleBeforeUnload = () => {
      const sessionDuration = Date.now() - sessionStart;
      updateTimeSpent(sessionDuration);
      trackUserAction(
        "session_end",
        "engagement",
        Math.floor(sessionDuration / 1000)
      );
    };

    // Трекинг активности пользователя
    const handleUserActivity = () => {
      trackUserAction("user_active", "engagement");
    };

    // События для определения активности
    const events = ["click", "scroll", "keydown", "mousemove"];
    events.forEach((event) => {
      document.addEventListener(event, handleUserActivity, { passive: true });
    });

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleUserActivity);
      });
      window.removeEventListener("beforeunload", handleBeforeUnload);
      handleBeforeUnload();
    };
  }, []);

  const initializeUserProfile = () => {
    // Проверяем, что мы на клиенте
    if (typeof window === "undefined") return;

    const saved = localStorage.getItem("user_profile");
    const existing = saved ? JSON.parse(saved) : null;

    const profile: UserProfile = {
      interests: existing?.interests || [],
      visitCount: (existing?.visitCount || 0) + 1,
      lastVisit: Date.now(),
      totalTimeSpent: existing?.totalTimeSpent || 0,
      topSections: existing?.topSections || {},
      preferredLanguage: existing?.preferredLanguage || "ru",
      deviceType: getDeviceType(),
      utmSource: existing?.utmSource,
      utmMedium: existing?.utmMedium,
      utmCampaign: existing?.utmCampaign,
    };

    setUserProfile(profile);
    if (typeof window !== "undefined") {
      localStorage.setItem("user_profile", JSON.stringify(profile));
    }
  };

  const trackSessionStart = () => {
    const isReturningUser = userProfile && userProfile.visitCount > 1;
    trackUserAction("session_start", "engagement", {
      returning_user: isReturningUser,
      visit_count: userProfile?.visitCount || 1,
    });
  };

  const trackDeviceInfo = () => {
    const deviceType = getDeviceType();
    const screenResolution = `${window.screen.width}x${window.screen.height}`;
    const userAgent = navigator.userAgent;

    trackUserAction("device_info", "technical", {
      device_type: deviceType,
      screen_resolution: screenResolution,
      user_agent_hash: btoa(userAgent).substring(0, 20), // Хешированный user agent для приватности
    });
  };

  const trackUTMParameters = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get("utm_source");
    const utmMedium = urlParams.get("utm_medium");
    const utmCampaign = urlParams.get("utm_campaign");
    const utmContent = urlParams.get("utm_content");
    const utmTerm = urlParams.get("utm_term");

    if (utmSource || utmMedium || utmCampaign) {
      trackUserAction("utm_tracking", "marketing", {
        source: utmSource,
        medium: utmMedium,
        campaign: utmCampaign,
        content: utmContent,
        term: utmTerm,
      });

      // Обновляем профиль с UTM данными
      if (userProfile) {
        const updatedProfile = {
          ...userProfile,
          utmSource: utmSource || userProfile.utmSource,
          utmMedium: utmMedium || userProfile.utmMedium,
          utmCampaign: utmCampaign || userProfile.utmCampaign,
        };
        setUserProfile(updatedProfile);
        if (typeof window !== "undefined") {
          localStorage.setItem("user_profile", JSON.stringify(updatedProfile));
        }
      }
    }
  };

  const updateTimeSpent = (sessionDuration: number) => {
    if (userProfile) {
      const updatedProfile = {
        ...userProfile,
        totalTimeSpent: userProfile.totalTimeSpent + sessionDuration,
      };
      setUserProfile(updatedProfile);
      if (typeof window !== "undefined") {
        localStorage.setItem("user_profile", JSON.stringify(updatedProfile));
      }
    }
  };

  const getDeviceType = (): "mobile" | "tablet" | "desktop" => {
    if (typeof window === "undefined") return "desktop";
    const width = window.innerWidth;
    if (width < 768) return "mobile";
    if (width < 1024) return "tablet";
    return "desktop";
  };

  // Экспорт профиля для Яндекс.Метрики
  const exportForYandexMetrica = () => {
    if (!userProfile || typeof window === "undefined") return null;

    const interests = JSON.parse(
      localStorage.getItem("user_interests") || "[]"
    );
    const analyticsData = getUserAnalyticsData();

    return {
      device_type: userProfile.deviceType,
      visit_count: userProfile.visitCount,
      interests: interests.slice(0, 5), // Топ 5 интересов
      engagement_level: analyticsData.engagementLevel,
      time_spent_category: getTimeSpentCategory(userProfile.totalTimeSpent),
      returning_visitor: userProfile.visitCount > 1,
      primary_interest: interests[0] || "web_development",
      utm_source: userProfile.utmSource,
      utm_medium: userProfile.utmMedium,
      utm_campaign: userProfile.utmCampaign,
    };
  };

  const getTimeSpentCategory = (totalTime: number): string => {
    const minutes = totalTime / (1000 * 60);
    if (minutes < 1) return "quick_browse";
    if (minutes < 5) return "casual_visitor";
    if (minutes < 15) return "engaged_visitor";
    return "highly_engaged";
  };

  const getEngagementLevel = (
    totalTime: number,
    visitCount: number
  ): string => {
    const avgSessionTime = totalTime / visitCount / (1000 * 60); // в минутах

    if (visitCount === 1 && avgSessionTime < 2) return "low";
    if (visitCount < 3 && avgSessionTime < 5) return "medium";
    if (visitCount >= 3 || avgSessionTime >= 10) return "high";
    return "medium";
  };

  // Отправляем данные в Яндекс.Метрику при изменении профиля
  useEffect(() => {
    if (
      userProfile &&
      typeof window !== "undefined" &&
      window.ym &&
      process.env.NEXT_PUBLIC_YANDEX_METRICA_ID &&
      process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true"
    ) {
      const metricaData = exportForYandexMetrica();
      if (metricaData) {
        // Устанавливаем параметры пользователя в Яндекс.Метрике
        window.ym(
          parseInt(process.env.NEXT_PUBLIC_YANDEX_METRICA_ID),
          "userParams",
          metricaData
        );
      }
    }
  }, [userProfile]);

  return null; // Этот компонент невидимый
}

// Расширения глобальных типов для TypeScript
declare global {
  interface Window {
    ym?: any;
  }
}
