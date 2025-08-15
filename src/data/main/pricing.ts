export interface PricingTier {
  id: string;
  title: {
    ru: string;
    en: string;
  };
  description: {
    ru: string;
    en: string;
  };
  price: {
    from: number;
    to?: number;
    currency: string;
    period: {
      ru: string;
      en: string;
    };
  };
  features: {
    ru: string[];
    en: string[];
  };
  technologies: string[];
  timeline: {
    ru: string;
    en: string;
  };
  popular?: boolean;
  note?: {
    ru: string;
    en: string;
  };
}

export const pricingData: PricingTier[] = [
  {
    id: "landing",
    title: {
      ru: "Landing Page",
      en: "Landing Page",
    },
    description: {
      ru: "Современная посадочная страница для вашего бизнеса",
      en: "Modern landing page for your business",
    },
    price: {
      from: 15000,
      to: 35000,
      currency: "₽",
      period: {
        ru: "за проект",
        en: "per project",
      },
    },
    features: {
      ru: [
        "Адаптивный дизайн",
        "SEO-оптимизация",
        "Анимации и интерактивность",
        "Форма обратной связи",
        "Интеграция с аналитикой",
        "Настройка хостинга",
      ],
      en: [
        "Responsive design",
        "SEO optimization",
        "Animations and interactivity",
        "Contact form",
        "Analytics integration",
        "Hosting setup",
      ],
    },
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
    timeline: {
      ru: "5-10 дней",
      en: "5-10 days",
    },
  },
  {
    id: "webapp",
    title: {
      ru: "Web-приложение",
      en: "Web Application",
    },
    description: {
      ru: "Полнофункциональное веб-приложение с современным стеком",
      en: "Full-featured web application with modern stack",
    },
    price: {
      from: 50000,
      to: 150000,
      currency: "₽",
      period: {
        ru: "за проект",
        en: "per project",
      },
    },
    features: {
      ru: [
        "Пользовательская аутентификация",
        "База данных и API",
        "Админ-панель",
        "Мобильная адаптация",
        "Деплой и настройка",
        "Документация",
      ],
      en: [
        "User authentication",
        "Database and API",
        "Admin panel",
        "Mobile adaptation",
        "Deployment and setup",
        "Documentation",
      ],
    },
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Python", "FastAPI"],
    timeline: {
      ru: "3-8 недель",
      en: "3-8 weeks",
    },
    popular: true,
  },
  {
    id: "ecommerce",
    title: {
      ru: "E-commerce решение",
      en: "E-commerce Solution",
    },
    description: {
      ru: "Интернет-магазин с системой платежей и управлением товарами",
      en: "Online store with payment system and product management",
    },
    price: {
      from: 80000,
      to: 200000,
      currency: "₽",
      period: {
        ru: "за проект",
        en: "per project",
      },
    },
    features: {
      ru: [
        "Каталог товаров",
        "Корзина и оформление заказов",
        "Система платежей",
        "Панель управления товарами",
        "Уведомления и email-рассылка",
        "Аналитика продаж",
      ],
      en: [
        "Product catalog",
        "Shopping cart and checkout",
        "Payment system",
        "Product management panel",
        "Notifications and email campaigns",
        "Sales analytics",
      ],
    },
    technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Redis"],
    timeline: {
      ru: "6-12 недель",
      en: "6-12 weeks",
    },
  },
  {
    id: "maintenance",
    title: {
      ru: "Поддержка и доработка",
      en: "Support & Development",
    },
    description: {
      ru: "Техническая поддержка и развитие существующих проектов",
      en: "Technical support and development of existing projects",
    },
    price: {
      from: 30000,
      currency: "₽",
      period: {
        ru: "в месяц",
        en: "per month",
      },
    },
    features: {
      ru: [
        "Исправление багов",
        "Добавление новых функций",
        "Обновление зависимостей",
        "Мониторинг производительности",
        "Резервное копирование",
        "Техническая поддержка",
      ],
      en: [
        "Bug fixes",
        "Adding new features",
        "Dependency updates",
        "Performance monitoring",
        "Backup",
        "Technical support",
      ],
    },
    technologies: ["React", "Vue.js", "Node.js", "Python"],
    timeline: {
      ru: "Постоянно",
      en: "Ongoing",
    },
    note: {
      ru: "Минимальный срок 3 месяца",
      en: "Minimum term 3 months",
    },
  },
];

export const pricingNotes = {
  disclaimer: {
    ru: "Все цены и технологии являются примерными и обсуждаются индивидуально",
    en: "All prices and technologies are approximate and discussed individually",
  },
  consultation: {
    ru: "Обсуждение проекта — бесплатно",
    en: "Project discussion is free",
  },
  payment: {
    ru: "Оплата: 50% предоплата, 50% по завершении",
    en: "Payment: 50% prepayment, 50% upon completion",
  },
  warranty: {
    ru: "Гарантия на все проекты — 3 месяца",
    en: "Warranty on all projects — 3 months",
  },
  support: {
    ru: "Техническая поддержка в течение месяца после сдачи проекта",
    en: "Technical support for a month after project delivery",
  },
};
