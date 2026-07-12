import { PROJECTS, type Project } from "@/features/portfolio/constants";

/**
 * Fase 9 (CMS, Capítulo 25): the portfolio is meant to be served by the CRM's
 * API, not hardcoded here. That API doesn't exist yet — the CRM is a
 * separate, already-built app (see config/navigation.ts's CRM_URL) whose
 * team is building it later. Until NEXT_PUBLIC_CRM_API_URL is set, every
 * function here transparently falls back to the local PROJECTS placeholder
 * data, so the site keeps working exactly as before.
 *
 * Expected contract once the API exists (matches the `Project` type):
 *   GET {NEXT_PUBLIC_CRM_API_URL}/projects       → Project[]
 *   GET {NEXT_PUBLIC_CRM_API_URL}/projects/:slug → Project | 404
 */

const CRM_API_URL = process.env.NEXT_PUBLIC_CRM_API_URL;

export async function getProjects(): Promise<Project[]> {
  if (!CRM_API_URL) return [...PROJECTS];

  try {
    const res = await fetch(`${CRM_API_URL}/projects`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`CRM API respondeu ${res.status} em /projects`);
    return await res.json();
  } catch (error) {
    console.error("Falha ao buscar projetos no CRM, usando dados locais:", error);
    return [...PROJECTS];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  if (!CRM_API_URL) return PROJECTS.find((project) => project.slug === slug);

  try {
    const res = await fetch(`${CRM_API_URL}/projects/${slug}`, { next: { revalidate: 60 } });
    if (res.status === 404) return undefined;
    if (!res.ok) throw new Error(`CRM API respondeu ${res.status} em /projects/${slug}`);
    return await res.json();
  } catch (error) {
    console.error("Falha ao buscar projeto no CRM, usando dados locais:", error);
    return PROJECTS.find((project) => project.slug === slug);
  }
}
