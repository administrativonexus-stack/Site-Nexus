import { BarChart3, Bot, Check, Code2, Plug, Users, Workflow, type LucideIcon } from "lucide-react";

import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Container } from "@/components/layout/Container";
import { CAPABILITY_CARDS } from "@/features/capabilities";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Soluções",
  description:
    "Engenharia de software, inteligência artificial, CRM, automações, integrações e dashboards sob medida para sua empresa.",
  path: "/solutions",
});

const ICONS: Record<string, LucideIcon> = {
  code: Code2,
  bot: Bot,
  users: Users,
  workflow: Workflow,
  plug: Plug,
  "bar-chart-3": BarChart3,
};

export default function SolutionsPage() {
  return (
    <div className="pb-24 md:pb-32">
      <Breadcrumb items={[{ name: "Soluções", path: "/solutions" }]} />
      <Container className="flex flex-col items-center gap-4 pt-16 text-center md:pt-24">
        <h1 className="text-title text-foreground max-w-xl font-semibold">
          Tecnologia para resolver problemas reais.
        </h1>
        <p className="text-muted-foreground text-body max-w-2xl">
          Desenvolvemos soluções sob medida que conectam pessoas, processos e inteligência
          artificial para impulsionar empresas.
        </p>
      </Container>

      <Container className="mt-20 flex flex-col divide-y divide-[var(--border)]">
        {CAPABILITY_CARDS.map((card) => {
          const Icon = ICONS[card.icon];
          return (
            <div
              key={card.id}
              id={card.id}
              className="grid scroll-mt-24 grid-cols-1 gap-6 py-12 first:pt-0 last:pb-0 md:grid-cols-[auto_1fr]"
            >
              <span className="bg-muted text-primary flex size-12 items-center justify-center rounded-xl">
                <Icon className="size-6" />
              </span>
              <div>
                <h2 className="text-foreground text-lg font-medium">{card.title}</h2>
                <p className="text-muted-foreground text-body mt-2 max-w-2xl">{card.description}</p>
                <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                  {card.tags.map((tag) => (
                    <li
                      key={tag}
                      className="text-muted-foreground flex items-center gap-1.5 text-sm"
                    >
                      <Check className="text-primary size-4" />
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </Container>
    </div>
  );
}
