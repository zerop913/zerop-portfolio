import { Metadata } from "next";
import { seoData } from "@/data/seo";

export type PageType = "home" | "privacy" | "terms" | "offer" | "legalInfo";
export type Language = "ru" | "en";

export function generatePageMetadata(
  page: PageType,
  language: Language = "ru"
): Metadata {
  const pageData = seoData[page][language];
  const site = seoData.site;

  const metadata: Metadata = {
    title: pageData.title,
    description: pageData.description,
    keywords: pageData.keywords?.join(", "),
    authors: [{ name: site.author }],
    creator: site.author,
    publisher: site.author,

    alternates: {
      canonical: `${site.url}${page === "home" ? "/" : `/${page}/`}`,
      languages: {
        ru: `${site.url}${page === "home" ? "/" : `/${page}/`}`,
        en: `${site.url}${page === "home" ? "/" : `/${page}/`}`,
        "x-default": `${site.url}${page === "home" ? "/" : `/${page}/`}`,
      },
    },

    openGraph: pageData.openGraph
      ? {
          title: pageData.openGraph.title,
          description: pageData.openGraph.description,
          url: `${site.url}${page === "home" ? "" : `/${page}`}`,
          siteName: site.name,
          images: [
            {
              url: `${site.url}${pageData.openGraph.image}`,
              width: 1200,
              height: 630,
              alt: pageData.openGraph.title,
            },
          ],
          locale: language === "ru" ? "ru_RU" : "en_US",
          type: pageData.openGraph.type as "website",
        }
      : undefined,

    twitter: pageData.twitter
      ? {
          card: "summary_large_image",
          title: pageData.twitter.title,
          description: pageData.twitter.description,
          images: [`${site.url}${pageData.twitter.image}`],
          creator: "@zerop913",
        }
      : undefined,

    robots: {
      index: true,
      follow: true,
      nocache: page === "home" ? false : true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    },
  };

  return metadata;
}

export function generateJsonLd(type: keyof typeof seoData.jsonLd) {
  return JSON.stringify(seoData.jsonLd[type]);
}

export function generateRobotsTxt(): string {
  const site = seoData.site;

  return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${site.url}/sitemap.xml

# Crawl-delay for polite crawling
Crawl-delay: 1

# Allow all major search engines
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: YandexBot
Allow: /

User-agent: facebookexternalhit
Allow: /

# Disallow crawling of admin and private areas
User-agent: *
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /.well-known/

# Allow crawling of important static assets
User-agent: *
Allow: /favicon.ico
Allow: /robots.txt
Allow: /sitemap.xml
Allow: /manifest.json`;
}

export function generateSitemap(): string {
  const site = seoData.site;
  const currentDate = new Date().toISOString().split("T")[0];

  const urls = [
    {
      loc: site.url,
      lastmod: currentDate,
      changefreq: "weekly",
      priority: "1.0",
      alternates: true,
    },
    {
      loc: `${site.url}/privacy`,
      lastmod: currentDate,
      changefreq: "monthly",
      priority: "0.3",
      alternates: true,
    },
    {
      loc: `${site.url}/terms`,
      lastmod: currentDate,
      changefreq: "monthly",
      priority: "0.3",
      alternates: true,
    },
    {
      loc: `${site.url}/offer`,
      lastmod: currentDate,
      changefreq: "monthly",
      priority: "0.4",
      alternates: true,
    },
    {
      loc: `${site.url}/legal-info`,
      lastmod: currentDate,
      changefreq: "monthly",
      priority: "0.3",
      alternates: true,
    },
  ];

  const urlElements = urls
    .map(
      (url) => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>${
      url.alternates
        ? `
    <xhtml:link rel="alternate" hreflang="ru" href="${url.loc}?lang=ru"/>
    <xhtml:link rel="alternate" hreflang="en" href="${url.loc}?lang=en"/>`
        : ""
    }
  </url>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">${urlElements}
</urlset>`;
}
