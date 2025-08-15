import type { Metadata, Viewport } from "next";
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
import { AuthProvider } from "@/lib/auth/AuthContext";
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark" suppressHydrationWarning>
      <body
        className="font-sans antialiased bg-black text-white selection:bg-white selection:text-black"
        suppressHydrationWarning
      >
        <I18nProvider>
          <AuthProvider>
            <AnalyticsTracker>
              <UserProfileManager />
              {children}
              <CookieBanner />
            </AnalyticsTracker>
          </AuthProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
