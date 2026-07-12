import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

interface BuildMetadataOptions {
  /** Bare page title — the root layout's title template appends " | Nexus". */
  title: string;
  description: string;
  /** Path used for the canonical URL and og:url, e.g. "/about" or "/" — resolved against metadataBase. */
  path: string;
  /** Private/draft pages (Capítulo 22: noindex/nofollow). */
  noIndex?: boolean;
}

/**
 * Single source of truth for page <meta> tags (Capítulo 22): title,
 * description, canonical, Open Graph, Twitter Card. og:image is not set
 * here — Next.js's opengraph-image.tsx file convention handles that
 * automatically per route (see app/opengraph-image.tsx).
 */
export function buildMetadata({
  title,
  description,
  path,
  noIndex = false,
}: BuildMetadataOptions): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    ...(noIndex && { robots: { index: false, follow: false } }),
  };
}
