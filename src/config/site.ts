// NEXT_PUBLIC_SITE_URL drives metadataBase/canonical/OG/sitemap URLs (Fase 10) —
// must be set per-environment (Vercel prod, previews) or every one of those
// would point at the placeholder domain instead of where the site actually
// lives. Falls back to the placeholder only for local dev / when unset.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://trxdigital.com.br";

export const siteConfig = {
  name: "TRX Digital",
  title: "TRX Digital",
  description:
    "Desenvolvemos software, inteligência artificial e automações para empresas que desejam crescer através da tecnologia.",
  locale: "pt-BR",
  url: SITE_URL,
  keywords: [
    "software",
    "desenvolvimento web",
    "crm",
    "inteligência artificial",
    "automação",
    "next.js",
    "aplicativos",
    "dashboard",
    "integrações",
    "whatsapp",
    "openai",
  ],
} as const;
