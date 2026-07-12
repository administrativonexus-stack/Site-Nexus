export const ECOSYSTEM_CONTENT = {
  headline: "Um ecossistema conectado para sua empresa.",
  subheadline:
    "Sites, CRM, inteligência artificial, WhatsApp e automações trabalhando juntos para reduzir tarefas manuais e acelerar o crescimento.",
} as const;

export type EcosystemNodeId = "whatsapp" | "ai" | "crm" | "calendar" | "dashboard" | "automation";

export const ECOSYSTEM_NODES: Array<{
  id: EcosystemNodeId;
  title: string;
  description: string;
  icon: "message-circle" | "bot" | "network" | "calendar" | "layout-dashboard" | "workflow";
  gridArea: string;
}> = [
  {
    id: "whatsapp",
    title: "WhatsApp",
    description: "Atendimento 24 horas",
    icon: "message-circle",
    gridArea: "whatsapp",
  },
  { id: "ai", title: "IA SDR", description: "Atendimento 24 horas", icon: "bot", gridArea: "ai" },
  {
    id: "crm",
    title: "CRM Nexus",
    description: "Gestão de leads",
    icon: "network",
    gridArea: "crm",
  },
  {
    id: "calendar",
    title: "Google Calendar",
    description: "Agendamento automático",
    icon: "calendar",
    gridArea: "calendar",
  },
  {
    id: "dashboard",
    title: "Dashboard",
    description: "Indicadores em tempo real",
    icon: "layout-dashboard",
    gridArea: "dashboard",
  },
  {
    id: "automation",
    title: "Automações",
    description: "Processos conectados",
    icon: "workflow",
    gridArea: "automation",
  },
];

/** Beam connections drawn between nodes, matching the Capítulo 12 diagram. */
export const ECOSYSTEM_CONNECTIONS: Array<[EcosystemNodeId, EcosystemNodeId]> = [
  ["whatsapp", "crm"],
  ["ai", "crm"],
  ["crm", "calendar"],
  ["crm", "dashboard"],
  ["calendar", "automation"],
  ["dashboard", "automation"],
];
