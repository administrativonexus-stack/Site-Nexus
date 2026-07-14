import { createPublicClient } from "@/services/supabase/public";
import { PROJECTS, type Project } from "@/features/portfolio/constants";

/**
 * The public portfolio is sourced from the Portal's own `portfolio_projects`
 * table (Supabase) — the same one managed at /portal/portfolio — via a
 * public RLS policy (`portfolio_public_read`, `supabase/migrations/
 * 20240012_portfolio_public_read.sql`) that only exposes rows with
 * status = 'active'. If that policy hasn't been applied yet, or there are no
 * active projects, this transparently falls back to the local PROJECTS
 * placeholder data, so the site keeps working either way.
 */

const CATEGORY_LABEL: Record<string, string> = {
  landing_page: "Landing Pages",
  site: "Websites",
  system: "Sistemas",
  app: "Aplicativos",
  ecommerce: "E-commerce",
};

interface PortfolioProjectRow {
  id: string;
  name: string;
  category: string;
  description: string | null;
  technologies: string[] | null;
  thumbnail_url: string | null;
  url: string | null;
  is_favorite: boolean;
  created_at: string;
}

const COMBINING_DIACRITICS = /[̀-ͯ]/g;

function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(COMBINING_DIACRITICS, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function mapRowToProject(row: PortfolioProjectRow, usedSlugs: Set<string>): Project {
  const base = slugify(row.name) || row.id;
  const slug = usedSlugs.has(base) ? `${base}-${row.id.slice(0, 4)}` : base;
  usedSlugs.add(slug);

  return {
    slug,
    title: row.name,
    category: CATEGORY_LABEL[row.category] ?? row.category,
    summary: row.description ?? "",
    technologies: row.technologies ?? [],
    results: [],
    tall: row.is_favorite,
    coverImage: row.thumbnail_url ?? undefined,
    url: row.url ?? undefined,
  };
}

async function fetchPortalProjects(): Promise<Project[] | null> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("portfolio_projects")
      .select("id, name, category, description, technologies, thumbnail_url, url, is_favorite, created_at")
      .eq("status", "active")
      .order("is_favorite", { ascending: false })
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) return null;

    const usedSlugs = new Set<string>();
    return data.map((row) => mapRowToProject(row as PortfolioProjectRow, usedSlugs));
  } catch (error) {
    console.error("Falha ao buscar projetos do Portal, usando dados locais:", error);
    return null;
  }
}

export async function getProjects(): Promise<Project[]> {
  const portalProjects = await fetchPortalProjects();
  return portalProjects ?? [...PROJECTS];
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug);
}
