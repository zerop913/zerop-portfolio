export interface BudgetOption {
  value: string;
  label: string;
}

export interface TimelineOption {
  value: string;
  label: string;
}

export interface CommercialProjectContent {
  title: string;
  description: string;
  form: {
    name: string;
    email: string;
    company: string;
    projectDescription: string;
    budget: string;
    timeline: string;
    budgetOptions: BudgetOption[];
    timelineOptions: TimelineOption[];
    submit: string;
    sending: string;
    note: string;
  };
  validation: {
    nameRequired: string;
    emailRequired: string;
    emailInvalid: string;
    descriptionRequired: string;
  };
  errors: {
    general: string;
  };
  success: {
    title: string;
    message: string;
    autoClose: string;
  };
}

export const commercialProjectContent: {
  ru: CommercialProjectContent;
  en: CommercialProjectContent;
} = {
  ru: {
    title: "Коммерческий проект",
    description:
      "Расскажите о вашем проекте, и я свяжусь с вами для обсуждения деталей сотрудничества. Все запросы обрабатываются в течение 1-2 часов.",
    form: {
      name: "Ваше имя",
      email: "Email для связи",
      company: "Компания (необязательно)",
      projectDescription: "Описание проекта и требования",
      budget: "Планируемый бюджет",
      timeline: "Временные рамки",
      budgetOptions: [
        { value: "under-50k", label: "До 50 000 ₽" },
        { value: "50k-100k", label: "50 000 - 100 000 ₽" },
        { value: "100k-250k", label: "100 000 - 250 000 ₽" },
        { value: "250k-500k", label: "250 000 - 500 000 ₽" },
        { value: "500k-1m", label: "500 000 - 1 000 000 ₽" },
        { value: "over-1m", label: "Свыше 1 000 000 ₽" },
        { value: "discuss", label: "Обсуждается" },
      ],
      timelineOptions: [
        { value: "urgent", label: "Срочно (до 1 недели)" },
        { value: "1-2weeks", label: "1-2 недели" },
        { value: "1month", label: "1 месяц" },
        { value: "2-3months", label: "2-3 месяца" },
        { value: "3-6months", label: "3-6 месяцев" },
        { value: "6months+", label: "Более 6 месяцев" },
        { value: "flexible", label: "Гибкие сроки" },
      ],
      submit: "Отправить заявку",
      sending: "Отправка...",
      note: "Нажимая кнопку, вы соглашаетесь с Политикой конфиденциальности и Пользовательским соглашением",
    },
    validation: {
      nameRequired: "Укажите ваше имя",
      emailRequired: "Укажите email для связи",
      emailInvalid: "Некорректный email адрес",
      descriptionRequired: "Опишите ваш проект",
    },
    errors: {
      general: "Произошла ошибка при отправке. Попробуйте еще раз.",
    },
    success: {
      title: "Заявка отправлена!",
      message:
        "Ваш запрос успешно отправлен. Я свяжусь с вами в ближайшее время для обсуждения деталей.",
      autoClose: "Окно закроется автоматически через 3 секунды",
    },
  },
  en: {
    title: "Commercial Project",
    description:
      "Tell me about your project, and I'll get in touch with you to discuss cooperation details. All requests are processed within 1-2 hours.",
    form: {
      name: "Your name",
      email: "Contact email",
      company: "Company (optional)",
      projectDescription: "Project description and requirements",
      budget: "Expected budget",
      timeline: "Timeline",
      budgetOptions: [
        { value: "under-2k", label: "Under $2,000" },
        { value: "2k-5k", label: "$2,000 - $5,000" },
        { value: "5k-10k", label: "$5,000 - $10,000" },
        { value: "10k-25k", label: "$10,000 - $25,000" },
        { value: "25k-50k", label: "$25,000 - $50,000" },
        { value: "over-50k", label: "Over $50,000" },
        { value: "discuss", label: "To be discussed" },
      ],
      timelineOptions: [
        { value: "urgent", label: "Urgent (within 1 week)" },
        { value: "1-2weeks", label: "1-2 weeks" },
        { value: "1month", label: "1 month" },
        { value: "2-3months", label: "2-3 months" },
        { value: "3-6months", label: "3-6 months" },
        { value: "6months+", label: "More than 6 months" },
        { value: "flexible", label: "Flexible timeline" },
      ],
      submit: "Send Request",
      sending: "Sending...",
      note: "By clicking the button, you agree to Privacy Policy and Terms of Service",
    },
    validation: {
      nameRequired: "Please enter your name",
      emailRequired: "Please enter your email",
      emailInvalid: "Invalid email address",
      descriptionRequired: "Please describe your project",
    },
    errors: {
      general: "An error occurred while sending. Please try again.",
    },
    success: {
      title: "Request sent!",
      message:
        "Your request has been successfully sent. I'll contact you soon to discuss the details.",
      autoClose: "Window will close automatically in 3 seconds",
    },
  },
};
