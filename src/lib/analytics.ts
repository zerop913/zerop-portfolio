import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const COOKIE_CONSENT_NAME = "cookie-consent";
const COOKIE_CONSENT_EXPIRES = 365;

export const initYandexMetrica = () => {
  if (
    typeof window === "undefined" ||
    !process.env.NEXT_PUBLIC_YANDEX_METRICA_ID ||
    process.env.NEXT_PUBLIC_ENABLE_ANALYTICS !== "true"
  )
    return;

  const id = process.env.NEXT_PUBLIC_YANDEX_METRICA_ID;
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.innerHTML = `
    (function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${id}', 'ym');

    ym(${id}, 'init', {
        ssr: true,
        webvisor: true,
        clickmap: true,
        ecommerce: "dataLayer",
        accurateTrackBounce: true,
        trackLinks: true
    });
  `;
  document.head.appendChild(script);

  const noscript = document.createElement("noscript");
  noscript.innerHTML = `<div><img src="https://mc.yandex.ru/watch/${id}" style="position:absolute; left:-9999px;" alt="" /></div>`;
  document.body.appendChild(noscript);
};

export const reachGoal = (target: string, params?: any) => {
  if (
    typeof window !== "undefined" &&
    window.ym &&
    process.env.NEXT_PUBLIC_YANDEX_METRICA_ID &&
    process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true"
  ) {
    window.ym(
      parseInt(process.env.NEXT_PUBLIC_YANDEX_METRICA_ID),
      "reachGoal",
      target,
      params
    );
  }
};

export const setUserParams = (params: any) => {
  if (
    typeof window !== "undefined" &&
    window.ym &&
    process.env.NEXT_PUBLIC_YANDEX_METRICA_ID &&
    process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true"
  ) {
    window.ym(
      parseInt(process.env.NEXT_PUBLIC_YANDEX_METRICA_ID),
      "userParams",
      params
    );
  }
};

export const trackUserInterest = (interest: string, context?: string) => {
  reachGoal("user_interest", {
    interest,
    context,
    timestamp: Date.now(),
  });

  const existingInterests = JSON.parse(
    localStorage.getItem("user_interests") || "[]"
  );
  const newInterests = Array.from(new Set([...existingInterests, interest]));
  localStorage.setItem("user_interests", JSON.stringify(newInterests));
};

export const trackUserAction = (
  action: string,
  element?: string,
  value?: any
) => {
  let goalName = "user_action";

  if (action === "click" && element?.includes("project")) {
    goalName = "project_click";
  } else if (action === "click" && element?.includes("pricing")) {
    goalName = "pricing_view";
  } else if (action === "form_interaction" || element?.includes("contact")) {
    goalName = "contact_interaction";
  }

  reachGoal(goalName, {
    action,
    element,
    value,
    timestamp: Date.now(),
    path: typeof window !== "undefined" ? window.location.pathname : "",
  });

  const actionData = {
    action,
    element,
    value,
    timestamp: Date.now(),
    path: typeof window !== "undefined" ? window.location.pathname : "",
  };

  const actions = JSON.parse(localStorage.getItem("user_actions") || "[]");
  actions.push(actionData);

  if (actions.length > 100) {
    actions.shift();
  }

  localStorage.setItem("user_actions", JSON.stringify(actions));
};

export const trackPageView = (path: string, title?: string) => {
  reachGoal("page_view", {
    path,
    title,
    timestamp: Date.now(),
  });
};

export const useCookieConsent = () => {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const savedConsent = Cookies.get(COOKIE_CONSENT_NAME);

    if (savedConsent) {
      const parsedConsent = JSON.parse(savedConsent);
      setConsent(parsedConsent);

      if (parsedConsent.analytics) {
        initYandexMetrica();
      }
    } else {
      setShowBanner(true);
    }
  }, []);

  const updateConsent = (newConsent: CookieConsent) => {
    setConsent(newConsent);
    setShowBanner(false);

    Cookies.set(COOKIE_CONSENT_NAME, JSON.stringify(newConsent), {
      expires: COOKIE_CONSENT_EXPIRES,
      sameSite: "lax",
    });

    if (newConsent.analytics) {
      initYandexMetrica();
      trackPageView(
        typeof window !== "undefined" ? window.location.pathname : ""
      );
    }
  };

  const acceptAll = () => {
    updateConsent({
      necessary: true,
      analytics: true,
      marketing: true,
    });
  };

  const declineAll = () => {
    updateConsent({
      necessary: true,
      analytics: false,
      marketing: false,
    });
  };

  return {
    consent,
    showBanner,
    updateConsent,
    acceptAll,
    declineAll,
  };
};

export const getUserAnalyticsData = () => {
  const interests = JSON.parse(localStorage.getItem("user_interests") || "[]");
  const actions = JSON.parse(localStorage.getItem("user_actions") || "[]");

  const analyticsData = {
    interests: interests.slice(0, 10),
    engagementLevel: calculateEngagementLevel(actions),
    preferredSections: getTopSections(actions),
    sessionData: getSessionAnalytics(actions),
  };

  return analyticsData;
};

const calculateEngagementLevel = (
  actions: any[]
): "low" | "medium" | "high" => {
  if (actions.length < 5) return "low";
  if (actions.length < 20) return "medium";
  return "high";
};

const getTopSections = (actions: any[]): string[] => {
  const sectionCounts: { [key: string]: number } = {};

  actions.forEach((action: any) => {
    if (action.element) {
      const section = action.element.split("_")[0];
      sectionCounts[section] = (sectionCounts[section] || 0) + 1;
    }
  });

  return Object.entries(sectionCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([section]) => section);
};

const getSessionAnalytics = (actions: any[]): any => {
  const recentActions = actions.slice(-50);
  return {
    totalActions: actions.length,
    recentActions: recentActions.length,
    averageSessionLength:
      recentActions.length > 0
        ? recentActions.reduce(
            (sum: number, action: any) => sum + (action.timestamp || 0),
            0
          ) / recentActions.length
        : 0,
  };
};

declare global {
  interface Window {
    ym?: any;
  }
}
