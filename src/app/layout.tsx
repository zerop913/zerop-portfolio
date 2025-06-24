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
  title: "Иван Смолин - Веб-разработчик | Портфолио",
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
    title: "Иван Смолин - Веб-разработчик",
    description:
      "Портфолио веб-разработчика. Создание современных веб-приложений и ботов.",
    type: "website",
    locale: "ru_RU",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Иван Смолин - Веб-разработчик",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Иван Смолин - Веб-разработчик",
    description:
      "Портфолио веб-разработчика. Создание современных веб-приложений и ботов.",
    images: ["/logo.jpg"],
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
