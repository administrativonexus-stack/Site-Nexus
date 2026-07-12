import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Container } from "@/components/layout/Container";
import { PORTFOLIO_PAGE_CONTENT, ProjectCard } from "@/features/portfolio";
import { buildMetadata } from "@/lib/metadata";
import { getProjects } from "@/services/portfolio";

export const metadata = buildMetadata({
  title: PORTFOLIO_PAGE_CONTENT.title,
  description: PORTFOLIO_PAGE_CONTENT.subheadline,
  path: "/portfolio",
});

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <div className="pb-24 md:pb-32">
      <Breadcrumb items={[{ name: "Portfólio", path: "/portfolio" }]} />
      <Container className="flex flex-col items-center gap-4 pt-16 text-center md:pt-24">
        <h1 className="text-title text-foreground max-w-xl font-semibold">
          {PORTFOLIO_PAGE_CONTENT.headline}
        </h1>
        <p className="text-muted-foreground text-body max-w-2xl">
          {PORTFOLIO_PAGE_CONTENT.subheadline}
        </p>
      </Container>

      <Container className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </Container>
    </div>
  );
}
