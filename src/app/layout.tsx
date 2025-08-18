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
import { CookieBanner } from "@/components/ui/CookieBanner";
import { AnalyticsTracker } from "@/components/analytics/AnalyticsTracker";
import { UserProfileManager } from "@/components/analytics/UserProfileManager";
import { generatePageMetadata, generateJsonLd } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata("home", "ru");

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
      <head>
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />

        {/* Языковые альтернативы */}
        <link rel="alternate" hrefLang="ru" href="https://ivan-smolin.ru/" />
        <link rel="alternate" hrefLang="en" href="https://ivan-smolin.ru/" />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://ivan-smolin.ru/"
        />

        {/* JSON-LD структурированные данные */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: generateJsonLd("person") }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: generateJsonLd("website") }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: generateJsonLd("service") }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: generateJsonLd("breadcrumb") }}
        />
      </head>
      <body
        className="font-sans antialiased bg-black text-white selection:bg-white selection:text-black"
        suppressHydrationWarning
      >
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
