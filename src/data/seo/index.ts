export interface SEOPageData {
  title: string;
  description: string;
  keywords?: string[];
  openGraph?: {
    title: string;
    description: string;
    image: string;
    type: string;
  };
  twitter?: {
    card: string;
    title: string;
    description: string;
    image: string;
  };
}

export interface SEOData {
  site: {
    name: string;
    domain: string;
    url: string;
    author: string;
    language: string;
    alternateLanguages: string[];
  };
  home: {
    ru: SEOPageData;
    en: SEOPageData;
  };
  privacy: {
    ru: SEOPageData;
    en: SEOPageData;
  };
  terms: {
    ru: SEOPageData;
    en: SEOPageData;
  };
  offer: {
    ru: SEOPageData;
    en: SEOPageData;
  };
  legalInfo: {
    ru: SEOPageData;
    en: SEOPageData;
  };
  jsonLd: {
    person: any;
    website: any;
    service: any;
    breadcrumb: any;
  };
}

export const seoData: SEOData = {
  // Основные метаданные сайта
  site: {
    name: "Ivan Smolin - Web Developer",
    domain: "ivan-smolin.ru",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://ivan-smolin.ru",
    author: "Ivan Smolin",
    language: "ru",
    alternateLanguages: ["en"],
  },

  // Главная страница
  home: {
    ru: {
      title: "Ivan Smolin - Web Developer | Разработка сайтов и веб-приложений",
      description:
        "Профессиональная веб-разработка на React, Next.js, TypeScript. Создание лендингов, интернет-магазинов, веб-приложений и ботов. 3+ года опыта, 40+ проектов.",
      keywords: [
        "веб-разработка",
        "веб-разработчик",
        "создание сайтов",
        "React",
        "Next.js",
        "TypeScript",
        "лендинг",
        "интернет-магазин",
        "веб-приложение",
        "бот разработка",
        "фриланс",
        "Иван Смолин",
      ],
      openGraph: {
        title: "Ivan Smolin - Веб-разработчик",
        description:
          "Профессиональная разработка сайтов, веб-приложений и ботов. Современные технологии, качественный код, соблюдение сроков.",
        image: "/og-image-ru.svg",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "Ivan Smolin - Веб-разработчик",
        description: "Профессиональная разработка сайтов и веб-приложений",
        image: "/twitter-image-ru.svg",
      },
    },
    en: {
      title:
        "Ivan Smolin - Web Developer | Website & Web Application Development",
      description:
        "Professional web development with React, Next.js, TypeScript. Creating landing pages, e-commerce stores, web applications and bots. 3+ years experience, 40+ projects.",
      keywords: [
        "web development",
        "web developer",
        "website creation",
        "React",
        "Next.js",
        "TypeScript",
        "landing page",
        "e-commerce",
        "web application",
        "bot development",
        "freelance",
        "Ivan Smolin",
      ],
      openGraph: {
        title: "Ivan Smolin - Web Developer",
        description:
          "Professional development of websites, web applications and bots. Modern technologies, quality code, meeting deadlines.",
        image: "/og-image-en.svg",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "Ivan Smolin - Web Developer",
        description: "Professional website and web application development",
        image: "/twitter-image-en.svg",
      },
    },
  },

  // Страницы юридических документов
  privacy: {
    ru: {
      title: "Политика конфиденциальности - Ivan Smolin",
      description:
        "Политика конфиденциальности сайта ivan-smolin.ru. Обработка персональных данных, использование cookies, права пользователей.",
      keywords: [
        "политика конфиденциальности",
        "персональные данные",
        "cookies",
        "GDPR",
      ],
    },
    en: {
      title: "Privacy Policy - Ivan Smolin",
      description:
        "Privacy policy of ivan-smolin.ru. Personal data processing, cookies usage, user rights.",
      keywords: ["privacy policy", "personal data", "cookies", "GDPR"],
    },
  },

  terms: {
    ru: {
      title: "Пользовательское соглашение - Ivan Smolin",
      description:
        "Пользовательское соглашение сайта ivan-smolin.ru. Условия использования, права и обязанности пользователей.",
      keywords: [
        "пользовательское соглашение",
        "условия использования",
        "права пользователей",
      ],
    },
    en: {
      title: "Terms of Service - Ivan Smolin",
      description:
        "Terms of service of ivan-smolin.ru. Usage conditions, user rights and obligations.",
      keywords: ["terms of service", "usage conditions", "user rights"],
    },
  },

  offer: {
    ru: {
      title: "Договор оферты - Ivan Smolin",
      description:
        "Публичная оферта на оказание услуг веб-разработки. Условия сотрудничества, цены, гарантии.",
      keywords: [
        "договор оферты",
        "веб-разработка",
        "услуги",
        "цены",
        "условия сотрудничества",
      ],
    },
    en: {
      title: "Offer Agreement - Ivan Smolin",
      description:
        "Public offer for web development services. Cooperation conditions, prices, guarantees.",
      keywords: [
        "offer agreement",
        "web development",
        "services",
        "prices",
        "cooperation conditions",
      ],
    },
  },

  legalInfo: {
    ru: {
      title: "Правовая информация - Ivan Smolin",
      description:
        "Информация о самозанятом статусе, налогообложении, документообороте. ИНН 531004773704.",
      keywords: [
        "самозанятый",
        "налог на профессиональный доход",
        "ИНН",
        "документооборот",
      ],
    },
    en: {
      title: "Legal Information - Ivan Smolin",
      description:
        "Information about self-employed status, taxation, document flow. Tax ID 531004773704.",
      keywords: [
        "self-employed",
        "professional income tax",
        "tax id",
        "document flow",
      ],
    },
  },

  // JSON-LD структурированные данные
  jsonLd: {
    person: {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Ivan Smolin",
      givenName: "Ivan",
      familyName: "Smolin",
      jobTitle: "Web Developer",
      description:
        "Professional web developer specializing in React, Next.js, and TypeScript development",
      url: "https://ivan-smolin.ru",
      sameAs: ["https://github.com/zerop913", "https://t.me/zerop913"],
      knowsAbout: [
        "Web Development",
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "Python",
        "PHP",
        "Bot Development",
      ],
      worksFor: {
        "@type": "Organization",
        name: "Freelance",
      },
      nationality: "Russian",
      workLocation: {
        "@type": "Country",
        name: "Russia",
      },
    },

    website: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Ivan Smolin - Web Developer",
      url: "https://ivan-smolin.ru",
      description: "Professional web development services",
      author: {
        "@type": "Person",
        name: "Ivan Smolin",
      },
      inLanguage: ["ru", "en"],
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://ivan-smolin.ru/?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },

    service: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Web Development Services",
      description:
        "Professional web development including landing pages, e-commerce stores, web applications, and bot development",
      provider: {
        "@type": "Person",
        name: "Ivan Smolin",
      },
      areaServed: {
        "@type": "Country",
        name: "Russia",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Web Development Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Landing Page Development",
              description: "Modern responsive landing pages",
            },
            priceRange: "15000-35000 RUB",
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Web Application Development",
              description: "Full-stack web applications with databases",
            },
            priceRange: "40000-120000 RUB",
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "E-commerce Development",
              description: "Online stores with payment systems",
            },
            priceRange: "80000-200000 RUB",
          },
        ],
      },
    },

    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Главная",
          item: "https://ivan-smolin.ru",
        },
      ],
    },
  },
};
