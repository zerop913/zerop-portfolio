import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "../../node_modules/geist/dist/fonts/geist-sans/Geist-Variable.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../../node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Иван - Веб-разработчик | Портфолио",
  description:
    "Веб-разработчик специализирующийся на React, Next.js, TypeScript. Создание сайтов, интернет-магазинов и ботов.",
  keywords: [
    "веб-разработчик",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "PHP",
    "Python",
  ],
  authors: [{ name: "Иван Смолин" }],
  openGraph: {
    title: "Иван - Веб-разработчик",
    description:
      "Портфолио веб-разработчика. Создание современных веб-приложений и ботов.",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
