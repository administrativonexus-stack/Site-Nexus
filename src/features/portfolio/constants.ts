export const PORTFOLIO_CONTENT = {
  headline: "Projetos que transformam negócios.",
  subheadline:
    "Cada projeto é desenvolvido para resolver problemas reais, automatizar processos e gerar resultados.",
} as const;

export const PORTFOLIO_PAGE_CONTENT = {
  title: "Portfólio",
  headline: "Projetos que transformam negócios.",
  subheadline:
    "Conheça os sistemas, automações e produtos de IA que desenvolvemos para empresas que decidiram crescer com tecnologia.",
} as const;

export interface ProjectResult {
  label: string;
  value: string;
}

/**
 * `challenge`/`solution`/`coverImage` are optional: real projects synced from
 * the Portal (`services/portfolio/get-projects.ts`) only carry a name,
 * category, description and thumbnail — not a full case-study writeup, so
 * the detail page (`/portfolio/[slug]`) skips those sections when absent.
 */
export interface Project {
  slug: string;
  title: string;
  category: string;
  summary: string;
  challenge?: string;
  solution?: string;
  technologies: string[];
  results: ProjectResult[];
  tall: boolean;
  coverImage?: string;
}

/**
 * Fallback data — used whenever the Portal has no active projects yet, or
 * the public-read query fails (see `services/portfolio/get-projects.ts`).
 * Names/categories match Capítulo 13's "Projetos Iniciais" list.
 */
export const PROJECTS: Project[] = [
  {
    slug: "crm-nexus",
    title: "CRM Nexus",
    category: "CRM",
    summary: "Sistema interno de prospecção, CRM, SDR com IA e integrações.",
    challenge:
      "A equipe comercial perdia leads por falta de um funil centralizado e dependia de planilhas manuais para acompanhar conversas no WhatsApp.",
    solution:
      "Desenvolvemos um CRM completo com captura automática de leads, SDR com IA para qualificação inicial e integração nativa com WhatsApp e Google Calendar.",
    technologies: ["Next.js", "Supabase", "OpenAI"],
    results: [
      { label: "Tempo de resposta a leads", value: "-70%" },
      { label: "Reuniões agendadas por mês", value: "+3x" },
    ],
    tall: true,
  },
  {
    slug: "barberflix",
    title: "Barberflix",
    category: "Aplicativos",
    summary: "Plataforma de gestão para barbearias.",
    challenge:
      "Barbearias dependiam de agendamento por telefone, gerando conflitos de horário e perda de clientes.",
    solution:
      "Criamos um app de agendamento self-service com gestão de agenda, comissões e lembretes automáticos via WhatsApp.",
    technologies: ["Next.js", "Supabase", "WhatsApp"],
    results: [{ label: "Faltas em agendamentos", value: "-45%" }],
    tall: false,
  },
  {
    slug: "landing-pages",
    title: "Landing Pages",
    category: "Websites",
    summary: "Galeria com diferentes páginas desenvolvidas.",
    challenge:
      "Clientes precisavam validar ofertas rapidamente sem depender de um novo projeto do zero a cada campanha.",
    solution:
      "Construímos um sistema de landing pages performáticas e reutilizáveis, com Design System próprio e otimização de conversão.",
    technologies: ["Next.js", "Motion"],
    results: [{ label: "Lighthouse Performance", value: "98+" }],
    tall: false,
  },
  {
    slug: "atendimento-ia",
    title: "Sistema de Atendimento com IA",
    category: "Inteligência Artificial",
    summary: "Projeto demonstrando automações e integração com WhatsApp.",
    challenge:
      "Atendimento 100% humano limitava o horário de resposta e sobrecarregava a equipe com perguntas repetitivas.",
    solution:
      "Implementamos um agente de IA integrado ao WhatsApp via Evolution API, capaz de responder dúvidas frequentes e escalar para humanos quando necessário.",
    technologies: ["OpenAI", "Evolution API", "Docker"],
    results: [
      { label: "Atendimento", value: "24/7" },
      { label: "Mensagens automatizadas", value: "60%" },
    ],
    tall: true,
  },
];
