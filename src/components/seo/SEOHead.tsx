import { Metadata } from "next";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  noIndex?: boolean;
  canonical?: string;
}

export function generateSEOMetadata({
  title,
  description,
  keywords,
  noIndex = false,
  canonical,
}: SEOHeadProps): Metadata {
  return {
    title,
    description,
    keywords: keywords?.join(", "),
    robots: noIndex
      ? {
          index: false,
          follow: false,
          nocache: true,
        }
      : {
          index: true,
          follow: true,
        },
    alternates: canonical
      ? {
          canonical,
        }
      : undefined,
  };
}
