import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { Project } from "@/features/portfolio/constants";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group border-border hover:border-primary/40 focus-visible:ring-ring/50 flex flex-col overflow-hidden rounded-xl border outline-none transition-colors focus-visible:ring-3"
    >
      <div
        className={`from-primary/20 to-secondary/20 relative overflow-hidden bg-gradient-to-br ${
          project.tall ? "h-64" : "h-44"
        }`}
      >
        {project.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element -- arbitrary external URL from the Portal, not whitelistable for next/image
          <img
            src={project.coverImage}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <>
            <div className="via-background/0 to-background/80 absolute inset-0 bg-gradient-to-t from-transparent" />
            <span
              aria-hidden="true"
              className="text-foreground/10 absolute -right-4 -bottom-6 text-8xl font-bold select-none"
            >
              {project.title.slice(0, 2).toUpperCase()}
            </span>
          </>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <Badge variant="outline" className="w-fit">
          {project.category}
        </Badge>
        <h3 className="text-foreground font-medium">{project.title}</h3>
        <p className="text-muted-foreground text-description line-clamp-2">{project.summary}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="bg-muted text-muted-foreground rounded-full px-2.5 py-1 text-xs"
              >
                {tech}
              </span>
            ))}
          </div>
          <ArrowUpRight className="text-primary size-4 shrink-0 -translate-x-0.5 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100" />
        </div>
      </div>
    </Link>
  );
}
