import type { MetadataRoute } from "next";

import { PRIVATE_ROUTES } from "@/config/navigation";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [...PRIVATE_ROUTES],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
