import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Политика конфиденциальности | Ivan Smolin",
  description:
    "Политика конфиденциальности сайта Ivan Smolin. Информация о сборе, использовании и защите персональных данных пользователей.",
  keywords: [
    "политика конфиденциальности",
    "защита данных",
    "GDPR",
    "cookie",
    "персональные данные",
    "веб-разработка",
  ],
  openGraph: {
    title: "Политика конфиденциальности | Ivan Smolin",
    description:
      "Подробная информация о том, как мы собираем, используем и защищаем ваши персональные данные.",
    type: "website",
    locale: "ru_RU",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/privacy",
  },
};
