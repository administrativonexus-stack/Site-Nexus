export const DEMO_CONTENT = {
  headline: "Veja como a tecnologia trabalha por você.",
  subheadline:
    "Uma única interação pode iniciar uma sequência inteligente de processos totalmente automatizados.",
  cta: "Executar demonstração",
} as const;

export type DemoNodeId = "whatsapp" | "ia" | "crm" | "agenda" | "dashboard";
export type DemoNodeStatus = "idle" | "processing" | "success";

export const DEMO_NODES: Array<{
  id: DemoNodeId;
  title: string;
  icon: "message-circle" | "bot" | "network" | "calendar" | "layout-dashboard";
}> = [
  { id: "whatsapp", title: "WhatsApp", icon: "message-circle" },
  { id: "ia", title: "IA TRX", icon: "bot" },
  { id: "crm", title: "CRM", icon: "network" },
  { id: "agenda", title: "Agenda", icon: "calendar" },
  { id: "dashboard", title: "Dashboard", icon: "layout-dashboard" },
];

export const DEMO_CONNECTIONS: Array<[DemoNodeId, DemoNodeId]> = [
  ["whatsapp", "ia"],
  ["ia", "crm"],
  ["crm", "agenda"],
  ["crm", "dashboard"],
];

/** Sequential timeline: which node activates at each step, and the status message shown. */
export const DEMO_TIMELINE: Array<{ nodes: DemoNodeId[]; message: string }> = [
  { nodes: ["whatsapp"], message: "Mensagem recebida" },
  { nodes: ["ia"], message: "IA interpretando a intenção" },
  { nodes: ["crm"], message: "Lead criado no CRM" },
  { nodes: ["agenda", "dashboard"], message: "Reunião agendada e dashboard atualizado" },
];

export const DEMO_STEP_DURATION_MS = 1400;
