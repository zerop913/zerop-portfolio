export interface Project {
  id: number;
  title: {
    ru: string;
    en: string;
  };
  description: {
    ru: string;
    en: string;
  };
  detailedDescription?: {
    ru: string;
    en: string;
  };
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: string;
  isOrder?: boolean;
  features?: {
    ru: string[];
    en: string[];
  };
  challenges?: {
    ru: string[];
    en: string[];
  };
  results?: {
    ru: string[];
    en: string[];
  };
  timeline?: {
    ru: string;
    en: string;
  };
  role?: {
    ru: string;
    en: string;
  };
}

export const projects: Project[] = [
  {
    id: 1,
    title: {
      ru: "Интернет-магазин ПК",
      en: "PC Online Store",
    },
    description: {
      ru: "Разработка полнофункционального интернет-магазина по продаже персональных компьютеров с современным интерфейсом и удобной навигацией.",
      en: "Development of a full-featured online store for selling personal computers with a modern interface and convenient navigation.",
    },
    detailedDescription: {
      ru: "Комплексное решение для онлайн-продаж компьютерной техники, включающее каталог товаров, корзину покупок, систему фильтрации и административную панель для управления заказами.",
      en: "Comprehensive solution for online sales of computer equipment, including product catalog, shopping cart, filtering system and administrative panel for order management.",
    },
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://only-pc.ru",
    githubUrl: "https://github.com/zerop913/only-pc-next.js",
    category: "E-commerce",
    isOrder: false,
    features: {
      ru: [
        "Адаптивный дизайн",
        "Корзина покупок",
        "Система фильтрации",
        "Административная панель",
        "SEO-оптимизация",
      ],
      en: [
        "Responsive design",
        "Shopping cart",
        "Filtering system",
        "Admin panel",
        "SEO optimization",
      ],
    },
    results: {
      ru: [
        "Увеличение конверсии на 40%",
        "Время загрузки менее 2 секунд",
        "100% адаптивность на всех устройствах",
      ],
      en: [
        "40% increase in conversion rate",
        "Loading time under 2 seconds",
        "100% responsiveness on all devices",
      ],
    },
    timeline: {
      ru: "3 месяца",
      en: "3 months",
    },
    role: {
      ru: "Full-stack разработчик",
      en: "Full-stack developer",
    },
  },
  {
    id: 2,
    title: {
      ru: "ДомВектор",
      en: "DomVector",
    },
    description: {
      ru: "Современный сайт строительной компании для проектирования и строительства домов с использованием инновационных технологий.",
      en: "Modern construction company website for designing and building houses using innovative technologies.",
    },
    detailedDescription: {
      ru: "Комплексная веб-платформа для строительной компании ДомВектор, специализирующейся на возведении домов с применением современных строительных технологий. Сайт включает презентацию услуг, калькулятор стоимости, портфолио проектов и систему обратной связи.",
      en: "Comprehensive web platform for DomVector construction company specializing in building houses using modern construction technologies. The site includes service presentation, cost calculator, project portfolio and feedback system.",
    },
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://dom-vector.vercel.app/",
    githubUrl: "https://github.com/zerop913/dom-vector",
    category: "Business",
    isOrder: true,
    features: {
      ru: [
        "Адаптивный дизайн",
        "Калькулятор стоимости дома",
        "Презентация типов домов",
        "Система отзывов клиентов",
        "Контактная форма",
        "SEO-оптимизация",
      ],
      en: [
        "Responsive design",
        "House cost calculator",
        "House types presentation",
        "Client reviews system",
        "Contact form",
        "SEO optimization",
      ],
    },
    challenges: {
      ru: [
        "Создание интуитивного калькулятора стоимости",
        "Представление сложных строительных услуг",
        "Оптимизация для конверсии клиентов",
      ],
      en: [
        "Creating an intuitive cost calculator",
        "Presenting complex construction services",
        "Optimizing for client conversion",
      ],
    },
    results: {
      ru: [
        "Современное онлайн-присутствие компании",
        "Удобный инструмент для расчета стоимости",
        "Повышение доверия клиентов",
      ],
      en: [
        "Modern online company presence",
        "Convenient cost calculation tool",
        "Increased client trust",
      ],
    },
    timeline: {
      ru: "1 неделя",
      en: "1 week",
    },
    role: {
      ru: "Frontend разработчик",
      en: "Frontend developer",
    },
  },
  {
    id: 3,
    title: {
      ru: "Интеграция 1С и YandexGPT",
      en: "1C and YandexGPT Integration",
    },
    description: {
      ru: "Решение для интеграции системы 1С с искусственным интеллектом YandexGPT для автоматизации бизнес-процессов.",
      en: "Solution for integrating 1C system with YandexGPT artificial intelligence to automate business processes.",
    },
    detailedDescription: {
      ru: "Инновационное решение, которое связывает систему учета 1С с возможностями искусственного интеллекта YandexGPT.",
      en: "Innovative solution that connects 1C accounting system with YandexGPT artificial intelligence capabilities.",
    },
    technologies: ["JavaScript", "API Integration", "1C", "YandexGPT"],
    liveUrl: "https://1c-yandex-cloud.vercel.app/",
    githubUrl: "https://github.com/zerop913/1c-yandex-cloud",
    category: "Integration",
    isOrder: false,
    features: {
      ru: [
        "API интеграция с YandexGPT",
        "Автоматический анализ данных 1С",
        "Генерация отчетов с помощью ИИ",
      ],
      en: [
        "YandexGPT API integration",
        "Automatic 1C data analysis",
        "AI-powered report generation",
      ],
    },
    challenges: {
      ru: ["Интеграция с API YandexGPT", "Обработка данных из 1С"],
      en: ["YandexGPT API integration", "Processing 1C data"],
    },
    results: {
      ru: ["Автоматизация анализа данных", "Экономия времени на отчетах"],
      en: ["Data analysis automation", "Time savings on reports"],
    },
    timeline: {
      ru: "2 месяца",
      en: "2 months",
    },
    role: {
      ru: "Full-stack разработчик",
      en: "Full-stack developer",
    },
  },
  {
    id: 4,
    title: {
      ru: "AI Care Pharmacy",
      en: "AI Care Pharmacy",
    },
    description: {
      ru: "Инновационная сеть аптек с ИИ-консультированием для персонализированного обслуживания клиентов. Проект объединяет традиционные фармацевтические услуги с передовыми AI-технологиями.",
      en: "Innovative pharmacy network with AI consulting for personalized customer service. The project combines traditional pharmaceutical services with advanced AI technologies.",
    },
    detailedDescription: {
      ru: "Современная платформа для сети аптек, интегрирующая искусственный интеллект для предоставления персонализированных консультаций. ",
      en: "Modern platform for pharmacy network integrating artificial intelligence to provide personalized consultations.",
    },
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://aicarepharmacy.com/",
    category: "Healthcare",
    isOrder: true,
    timeline: {
      ru: "2 недели",
      en: "2 weeks",
    },
    role: {
      ru: "Frontend разработчик",
      en: "Frontend developer",
    },
  },

  {
    id: 5,
    title: {
      ru: "Портфолио для разработчика 1С",
      en: "Portfolio for 1C Developer",
    },
    description: {
      ru: "Разработка персонального портфолио для разработчика 1С с акцентом на проекты и навыки в области 1С.",
      en: "Development of a personal portfolio for a 1C developer with an emphasis on projects and skills in the field of 1C.",
    },
    detailedDescription: {
      ru: "Профессиональное портфолио для разработчика 1С, демонстрирующее экспертизу в области автоматизации бизнес-процессов. Включает презентацию проектов, навыков работы с различными конфигурациями 1С и опыта внедрения ERP-систем.",
      en: "Professional portfolio for 1C developer demonstrating expertise in business process automation. Includes presentation of projects, skills working with various 1C configurations and experience implementing ERP systems.",
    },
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://portfolio-varfolomeeva.vercel.app/",
    githubUrl: "https://github.com/zerop913/portfolio-varfolomeeva",
    category: "Personal",
    isOrder: true,
    features: {
      ru: [
        "Презентация проектов 1С",
        "Описание навыков и сертификаций",
        "Контактная форма",
        "Адаптивный дизайн",
        "SEO-оптимизация",
      ],
      en: [
        "1C projects presentation",
        "Skills and certifications description",
        "Contact form",
        "Responsive design",
        "SEO optimization",
      ],
    },
    challenges: {
      ru: [
        "Представление технических навыков 1С для широкой аудитории",
        "Создание привлекательного дизайна для B2B сферы",
        "Оптимизация для поисковых систем",
      ],
      en: [
        "Presenting 1C technical skills to a broad audience",
        "Creating attractive design for B2B sphere",
        "Search engine optimization",
      ],
    },
    results: {
      ru: [
        "Увеличение количества запросов на услуги",
        "Профессиональное онлайн-присутствие",
        "Демонстрация экспертизы в области 1С",
      ],
      en: [
        "Increased service inquiries",
        "Professional online presence",
        "Demonstrated 1C expertise",
      ],
    },
    timeline: {
      ru: "1 неделя",
      en: "1 week",
    },
    role: {
      ru: "Frontend разработчик",
      en: "Frontend developer",
    },
  },
  {
    id: 6,
    title: {
      ru: "Обучение сборке Кубика Рубика",
      en: "Rubik's Cube Assembly Training",
    },
    description: {
      ru: "Интерактивное веб-приложение для обучения начинающих сборке Кубика Рубика с пошаговыми инструкциями и визуализацией.",
      en: "Interactive web application for teaching beginners how to assemble a Rubik's Cube with step-by-step instructions and visualization.",
    },
    detailedDescription: {
      ru: "Образовательная платформа для изучения алгоритмов сборки Кубика Рубика. Включает интерактивные уроки, 3D-визуализацию поворотов, пошаговые инструкции и систему отслеживания прогресса обучения.",
      en: "Educational platform for learning Rubik's Cube solving algorithms. Includes interactive lessons, 3D rotation visualization, step-by-step instructions and learning progress tracking system.",
    },
    technologies: ["React", "Tailwind CSS", "Interactive UI"],
    liveUrl: "https://zerocubes.vercel.app/",
    category: "Education",
    isOrder: false,
    features: {
      ru: [
        "Интерактивные уроки сборки",
        "3D-визуализация кубика",
        "Пошаговые алгоритмы",
        "Система прогресса",
        "Адаптивный интерфейс",
      ],
      en: [
        "Interactive assembly lessons",
        "3D cube visualization",
        "Step-by-step algorithms",
        "Progress system",
        "Responsive interface",
      ],
    },
    challenges: {
      ru: [
        "Создание понятной визуализации алгоритмов",
        "Разработка интерактивного интерфейса",
        "Оптимизация для мобильных устройств",
      ],
      en: [
        "Creating clear algorithm visualization",
        "Developing interactive interface",
        "Mobile device optimization",
      ],
    },
    results: {
      ru: [
        "Упрощение процесса обучения сборке",
        "Высокая вовлеченность пользователей",
        "Положительные отзывы от начинающих",
      ],
      en: [
        "Simplified learning process",
        "High user engagement",
        "Positive feedback from beginners",
      ],
    },
    timeline: {
      ru: "2 месяца",
      en: "2 months",
    },
    role: {
      ru: "Frontend разработчик",
      en: "Frontend developer",
    },
  },
];
