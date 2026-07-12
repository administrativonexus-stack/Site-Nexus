export const CAPABILITIES_CONTENT = {
  headline: "Tecnologia para resolver problemas reais.",
  subheadline:
    "Desenvolvemos soluções sob medida que conectam pessoas, processos e inteligência artificial para impulsionar empresas.",
} as const;

/** `id` matches the Navbar mega menu hash anchors (config/navigation.ts SOLUTIONS_MEGA_MENU). */
export const CAPABILITY_CARDS = [
  {
    id: "software",
    title: "Engenharia de Software",
    description: "Construímos sistemas modernos, escaláveis e preparados para crescer.",
    icon: "code",
    tags: ["Next.js", "React", "APIs", "Banco de Dados"],
  },
  {
    id: "ai",
    title: "Inteligência Artificial",
    description: "Automatize atendimento, prospecção e processos internos.",
    icon: "bot",
    tags: ["SDR IA", "Chatbots", "OpenAI", "Claude"],
  },
  {
    id: "crm",
    title: "CRM Inteligente",
    description: "Centralize leads, funil de vendas e atendimento em um único lugar.",
    icon: "users",
    tags: ["Leads", "Funil", "WhatsApp", "Agenda"],
  },
  {
    id: "automations",
    title: "Automações",
    description: "Conectamos Google Workspace, Meta e ERPs para eliminar tarefas manuais.",
    icon: "workflow",
    tags: ["Google Workspace", "Meta", "ERP"],
  },
  {
    id: "integrations",
    title: "Integrações",
    description: "Conectamos seus sistemas para eliminar tarefas manuais.",
    icon: "plug",
    tags: ["Webhooks", "Google Calendar", "WhatsApp"],
  },
  {
    id: "dashboards",
    title: "Dashboards",
    description: "Indicadores e BI para decisões mais rápidas.",
    icon: "bar-chart-3",
    tags: ["BI", "Indicadores", "Financeiro"],
  },
] as const;
