import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Container } from "@/components/layout/Container";
import { JsonLd } from "@/components/layout/JsonLd";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/metadata";
import { projectSchema } from "@/lib/seo";
import { getProjectBySlug, getProjects } from "@/services/portfolio";

// Projects are now managed live in the Portal (/portal/portfolio) — revalidate
// periodically instead of only at build time.
export const revalidate = 60;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return buildMetadata({
    title: project.title,
    description: project.summary,
    path: `/portfolio/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="pb-24 md:pb-32">
      <Breadcrumb
        items={[
          { name: "Portfólio", path: "/portfolio" },
          { name: project.title, path: `/portfolio/${project.slug}` },
        ]}
      />
      <JsonLd data={projectSchema(project)} />

      <div className="pt-16 md:pt-24">
        <Container className="flex flex-col items-center gap-4 text-center">
          <Badge variant="outline">{project.category}</Badge>
          <h1 className="text-title text-foreground max-w-2xl font-semibold">{project.title}</h1>
          <p className="text-muted-foreground text-body max-w-2xl">{project.summary}</p>
          {project.url && (
            <Button
              variant="outline"
              className="gap-2"
              render={<a href={project.url} target="_blank" rel="noopener noreferrer" />}
            >
              Visitar site
              <ExternalLink className="size-4" />
            </Button>
          )}
        </Container>

        <Container className="mt-16">
          <div
            className={`from-primary/20 to-secondary/20 relative h-72 overflow-hidden rounded-xl bg-gradient-to-br md:h-96`}
          >
            {project.coverImage ? (
              // eslint-disable-next-line @next/next/no-img-element -- arbitrary external URL from the Portal, not whitelistable for next/image
              <img
                src={project.coverImage}
                alt={project.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <span
                aria-hidden="true"
                className="text-foreground/10 absolute -right-6 -bottom-10 text-9xl font-bold select-none"
              >
                {project.title.slice(0, 2).toUpperCase()}
              </span>
            )}
          </div>
        </Container>

        {project.challenge && project.solution && (
          <Container className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-foreground text-lg font-medium">Problema</h2>
              <p className="text-muted-foreground text-body mt-3">{project.challenge}</p>
            </div>
            <div>
              <h2 className="text-foreground text-lg font-medium">Solução</h2>
              <p className="text-muted-foreground text-body mt-3">{project.solution}</p>
            </div>
          </Container>
        )}

        <Container className="mt-16">
          <h2 className="text-foreground text-lg font-medium">Tecnologias</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="bg-muted text-muted-foreground rounded-full px-3 py-1.5 text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </Container>

        {project.results.length > 0 && (
          <Container className="mt-16">
            <h2 className="text-foreground text-lg font-medium">Resultados</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {project.results.map((result) => (
                <div key={result.label} className="border-border rounded-xl border p-6">
                  <p className="text-primary text-3xl font-semibold">{result.value}</p>
                  <p className="text-muted-foreground text-description mt-1">{result.label}</p>
                </div>
              ))}
            </div>
          </Container>
        )}

        <Container className="mt-20 flex flex-col items-center gap-4 text-center">
          <p className="text-muted-foreground text-body">Quer um projeto parecido com este?</p>
          <Button render={<Link href="/contact" />}>Solicitar um projeto semelhante</Button>
        </Container>
      </div>
    </div>
  );
}
