import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ACTIVE_PROJECTS } from "@/features/dashboard/constants";

export function ActiveProjects() {
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>Projetos</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-4">
          {ACTIVE_PROJECTS.map((project) => (
            <li key={project.name}>
              <div className="flex items-center justify-between gap-2">
                <p className="text-foreground truncate text-sm font-medium">{project.name}</p>
                <span className="text-muted-foreground text-xs">{project.progress}%</span>
              </div>
              <div className="bg-muted mt-2 h-1.5 w-full overflow-hidden rounded-full">
                <div
                  className="bg-primary h-full rounded-full"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
