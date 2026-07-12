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
 * `/admin` is a dedicated area (resolved decision). `/client` stays out —
 * Capítulo 21 marks it "(Roadmap)". `/crm` isn't here — the CRM is an
 * already-built, separately-hosted app (see CRM_URL below), not a route in
 * this codebase, so there's nothing here for our middleware to protect.
 */
export const PRIVATE_ROUTES = [
  "/dashboard",
  "/settings",
  "/profile",
  "/developer",
  "/admin",
] as const;

/**
 * The CRM is a separate, already-built app with its own login (not part of
 * this codebase, no SSO) — the Sidebar just links out to it.
 */
export const CRM_URL = "https://nexus-prospect-zeta.vercel.app/login";

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

/**
 * Portal Sidebar (Capítulo 21). "CRM" links out to CRM_URL (external =
 * true → Sidebar renders it as a plain <a target="_blank">, not a Next
 * <Link>, and skips active-route highlighting for it). Agenda / IA SDR /
 * Clientes from the PRD's sidebar diagram live inside that external app,
 * not as separate links here.
 */
export const PORTAL_NAV_LINKS = [
  { title: "Dashboard", href: "/dashboard", icon: "layout-dashboard", external: false },
  { title: "CRM", href: CRM_URL, icon: "users", external: true },
  { title: "Configurações", href: "/settings", icon: "settings", external: false },
] as const;

/** Only shown to users with `user_metadata.role === "admin"` (Capítulo 21 profile: Administrador). */
export const PORTAL_ADMIN_LINK = {
  title: "Admin",
  href: "/admin",
  icon: "shield",
  external: false,
} as const;

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
