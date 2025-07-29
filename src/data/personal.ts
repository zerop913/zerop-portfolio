import { getAllSkills } from "./skills";

export const personalData = {
  name: "Ivan Smolin",
  title: {
    ru: "Web Developer",
    en: "Web Developer",
  },
  description: {
    ru: "Специализируюсь на веб-разработке и создании ботов. Работаю с современными технологиями для создания качественных цифровых решений.",
    en: "I specialize in web development and bot creation. I work with modern technologies to create high-quality digital solutions.",
  },
  telegramUrl: "https://t.me/zerop913",
  workSchedule: {
    timezone: "Europe/Moscow",
    workStart: 12,
    workEnd: 3,
    responseTime: 60,
    messages: {
      online: {
        ru: "На связи",
        en: "Online",
      },
      offline: {
        ru: "Не на связи",
        en: "Offline",
      },
      responseTime: {
        ru: "~1 час",
        en: "~1 hour",
      },
      sendMessage: {
        ru: "→ Написать в любом случае",
        en: "→ Send message anyway",
      },
    },
  },
  skills: getAllSkills(),
  contactNote: {
    ru: "Если в перечисленных технологиях нет нужных, напишите лично для уточнения",
    en: "If the required technologies are not listed, please contact me personally for clarification",
  },
};
