/**
 * All data on this page is mock/placeholder — there is no CRM database yet
 * (Fase 8). Widgets match Capítulo 21's "Dashboard Inicial" list: Últimos
 * Leads, Conversas, Reuniões, Projetos, Indicadores, Atividades recentes.
 */

export const DASHBOARD_STATS = [
  { label: "Leads no mês", value: "128", change: "+12%" },
  { label: "Conversas ativas", value: "24", change: "+3" },
  { label: "Reuniões agendadas", value: "9", change: "esta semana" },
  { label: "Taxa de conversão", value: "18%", change: "+2pp" },
] as const;

export const RECENT_LEADS = [
  { name: "Marina Costa", company: "Studio Belezza", status: "Novo" },
  { name: "Rafael Nogueira", company: "Contábil Prime", status: "Qualificando" },
  { name: "Empresa 3 Irmãos", company: "Restaurante 3 Irmãos", status: "Convertido" },
] as const;

export const RECENT_CONVERSATIONS = [
  { name: "Marina Costa", preview: "Quero saber mais sobre o CRM...", time: "há 12 min" },
  { name: "João Pedro", preview: "Vocês fazem integração com WhatsApp?", time: "há 1 h" },
  { name: "Ana Beatriz", preview: "Podemos agendar uma call amanhã?", time: "há 3 h" },
] as const;

export const UPCOMING_MEETINGS = [
  { title: "Apresentação Nexus CRM", withWhom: "Studio Belezza", when: "Hoje, 15:00" },
  { title: "Kickoff do projeto", withWhom: "Contábil Prime", when: "Amanhã, 10:00" },
] as const;

export const ACTIVE_PROJECTS = [
  { name: "CRM Nexus — Cliente Barberflix", progress: 72 },
  { name: "Landing Page — Studio Belezza", progress: 40 },
] as const;

export const RECENT_ACTIVITY = [
  { text: "Novo lead recebido via site", time: "há 12 min" },
  { text: "Reunião agendada com Contábil Prime", time: "há 2 h" },
  { text: "Projeto Barberflix atualizado para 72%", time: "ontem" },
] as const;
