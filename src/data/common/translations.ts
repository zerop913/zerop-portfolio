export type Language = "ru" | "en";

export interface Translations {
  ru: {
    [key: string]: string;
  };
  en: {
    [key: string]: string;
  };
}

export const translations: Translations = {
  ru: {
    projectDetails: "Детали проекта",
    aboutProject: "О проекте",
    technologies: "Технологии",
    keyFeatures: "Ключевые особенности",
    timeline: "Время",
    role: "Роль",
    projectType: "Тип проекта",
    results: "Результаты",
    openWebsite: "Открыть сайт",
    sourceCode: "Исходный код",
    preview: "Предпросмотр",
    previewUnavailable: "Предпросмотр недоступен",
    commercialOrder: "Коммерческий заказ",
    personalProject: "Личный проект",

    // Cookie Consent & Analytics
    cookieTitle: "Использование файлов cookie",
    cookieMessage:
      "Мы используем файлы cookie и аналитические инструменты для улучшения работы сайта, анализа трафика и показа релевантной рекламы. Это помогает нам лучше понимать ваши интересы.",
    cookieAccept: "Принять все",
    cookieDecline: "Отклонить",
    cookieSettings: "Настройки",
    cookieNecessary: "Необходимые",
    cookieAnalytics: "Аналитика",
    cookieMarketing: "Маркетинг",
    cookieNecessaryDesc: "Необходимые для работы сайта",
    cookieAnalyticsDesc: "Помогают понять, как посетители используют сайт",
    cookieMarketingDesc: "Используются для показа релевантной рекламы",
    privacyPolicy: "Политика конфиденциальности",
    saveSettings: "Сохранить настройки",
    cancel: "Отмена",
    settingsTitle: "Настройки файлов cookie",

    // 404 Page
    notFoundTitle: "Страница не найдена",
    notFoundDescription:
      "Запрашиваемая страница не существует или была перемещена.",
    notFoundHint: "Проверьте правильность введённого адреса.",
    backButton: "Назад",
    homeButton: "Главная",
    errorCode: "ERROR 404",
    notFoundStatus: "Not Found",
  },
  en: {
    projectDetails: "Project Details",
    aboutProject: "About Project",
    technologies: "Technologies",
    keyFeatures: "Key Features",
    timeline: "Timeline",
    role: "Role",
    projectType: "Project Type",
    results: "Results",
    openWebsite: "Open Website",
    sourceCode: "Source Code",
    preview: "Preview",
    previewUnavailable: "Preview Unavailable",
    commercialOrder: "Commercial Order",
    personalProject: "Personal Project",

    // Cookie Consent & Analytics
    cookieTitle: "Cookie Usage",
    cookieMessage:
      "We use cookies and analytics tools to improve website performance, analyze traffic, and show relevant advertising. This helps us better understand your interests.",
    cookieAccept: "Accept All",
    cookieDecline: "Decline",
    cookieSettings: "Settings",
    cookieNecessary: "Necessary",
    cookieAnalytics: "Analytics",
    cookieMarketing: "Marketing",
    cookieNecessaryDesc: "Required for the website to function",
    cookieAnalyticsDesc: "Help understand how visitors use the site",
    cookieMarketingDesc: "Used to show relevant advertising",
    privacyPolicy: "Privacy Policy",
    saveSettings: "Save Settings",
    cancel: "Cancel",
    settingsTitle: "Cookie Settings",

    // 404 Page
    notFoundTitle: "Page Not Found",
    notFoundDescription: "The requested page does not exist or has been moved.",
    notFoundHint: "Please check the entered address for correctness.",
    backButton: "Back",
    homeButton: "Home",
    errorCode: "ERROR 404",
    notFoundStatus: "Not Found",
  },
};
