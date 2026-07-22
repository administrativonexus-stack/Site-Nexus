/**
 * Single source of truth for route lists (PRD Capítulo 18/21/22 disagreed on
 * the exact private-route set — reconciled here per the architecture review).
 * Middleware, sitemap generation, and robots.txt should all read from here
 * instead of hand-listing routes independently.
 */

export const PUBLIC_ROUTES = [
  "/",
  "/solutions",
  "/portfolio",
  "/about",
  "/contact",
  "/blog",
  "/login",
  "/forgot-password",
  "/reset-password",
  "/privacy-policy",
  "/terms-of-use",
] as const;

/**
 * Public pages that should actually be indexed (excludes the auth flow and
 * legal pages). No `/blog` yet — that route doesn't exist until Fase 9 CMS
 * builds it; listing it here would put a 404 in the sitemap.
 */
export const SITEMAP_ROUTES = ["/", "/solutions", "/portfolio", "/about", "/contact"] as const;

/**
 * Protected routes (Supabase session required, enforced by middleware).
 * `/portal` is the merged CRM (TRX Digital Prospect System) — brought into this
 * app as a real path prefix rather than a separate deployment, so a single
 * Supabase session covers both the marketing site's auth and the CRM.
 * `isPrivateRoute()` in `proxy.ts` does prefix matching, so this alone
 * protects every route under `/portal/*`.
 */
export const PRIVATE_ROUTES = ["/portal"] as const;

/** Icon keys map to lucide-react components in the Navbar (kept as strings so this stays plain data). */
export const SOLUTIONS_MEGA_MENU = [
  {
    title: "Engenharia de Software",
    description: "Sistemas web, aplicativos, painéis e APIs.",
    href: "/solutions#software",
    icon: "code",
  },
  {
    title: "Inteligência Artificial",
    description: "Atendimento, agentes, SDR e copilotos.",
    href: "/solutions#ai",
    icon: "bot",
  },
  {
    title: "CRM Inteligente",
    description: "Leads, funil, WhatsApp, agenda e analytics.",
    href: "/solutions#crm",
    icon: "users",
  },
  {
    title: "Automações",
    description: "Google Workspace, Meta, ERP e integrações.",
    href: "/solutions#automations",
    icon: "workflow",
  },
  {
    title: "Dashboards",
    description: "BI, indicadores e financeiro.",
    href: "/solutions#dashboards",
    icon: "layout-dashboard",
  },
  {
    title: "Integrações",
    description: "Webhooks e conexões entre sistemas.",
    href: "/solutions#integrations",
    icon: "plug",
  },
] as const;

export const NAV_LINKS = {
  company: [
    { title: "Sobre", href: "/about" },
    { title: "Processo", href: "/#process" },
    { title: "Contato", href: "/contact" },
  ],
} as const;

export const FOOTER_LINKS = {
  company: [
    { title: "Sobre", href: "/about" },
    { title: "Processo", href: "/#process" },
  ],
  solutions: SOLUTIONS_MEGA_MENU.map(({ title, href }) => ({ title, href })),
  projects: [{ title: "Portfólio", href: "/portfolio" }],
  resources: [
    { title: "Documentação", href: "#", roadmap: true },
    { title: "Central de Ajuda", href: "#", roadmap: true },
    { title: "Status", href: "#", roadmap: true },
    { title: "Portal do Cliente", href: "#", roadmap: true },
  ],
  legal: [
    { title: "Política de Privacidade", href: "/privacy-policy" },
    { title: "Termos de Uso", href: "/terms-of-use" },
  ],
} as const;
