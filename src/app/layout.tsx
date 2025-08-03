import type { Metadata } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/space-grotesk/300.css";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/700.css";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";
import { CookieBanner } from "@/components/ui/CookieBanner";
import { AnalyticsTracker } from "@/components/analytics/AnalyticsTracker";
import { UserProfileManager } from "@/components/analytics/UserProfileManager";

export const metadata: Metadata = {
  title: "Ivan Smolin - Web Developer",
  description:
    "Специализируюсь на веб-разработке и создании ботов. Работаю с современными технологиями для создания качественных цифровых решений.",
  keywords: [
    "Web Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Bot Development",
  ],
  authors: [{ name: "Ivan Smolin" }],
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.svg", sizes: "16x16", type: "image/svg+xml" },
      { url: "/favicon-32x32.svg", sizes: "32x32", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark">
      <body className="font-sans antialiased bg-black text-white selection:bg-white selection:text-black">
        <I18nProvider>
          <AnalyticsTracker>
            <UserProfileManager />
            {children}
            <CookieBanner />
          </AnalyticsTracker>
        </I18nProvider>
      </body>
    </html>
  );
}
