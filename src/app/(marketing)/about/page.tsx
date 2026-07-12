import { Check } from "lucide-react";

import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Container } from "@/components/layout/Container";
import { buildMetadata } from "@/lib/metadata";
import { ABOUT_CONTENT, VALUES } from "./constants";

export const metadata = buildMetadata({
  title: "Empresa",
  description: ABOUT_CONTENT.subheadline,
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="pb-24 md:pb-32">
      <Breadcrumb items={[{ name: "Empresa", path: "/about" }]} />
      <Container className="flex flex-col items-center gap-4 pt-16 text-center md:pt-24">
        <h1 className="text-title text-foreground max-w-xl font-semibold">
          {ABOUT_CONTENT.headline}
        </h1>
        <p className="text-muted-foreground text-body max-w-2xl">{ABOUT_CONTENT.subheadline}</p>
      </Container>

      <Container className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="border-border rounded-xl border p-8">
          <h2 className="text-foreground text-lg font-medium">{ABOUT_CONTENT.mission.title}</h2>
          <p className="text-muted-foreground text-body mt-3">{ABOUT_CONTENT.mission.text}</p>
        </div>
        <div className="border-border rounded-xl border p-8">
          <h2 className="text-foreground text-lg font-medium">{ABOUT_CONTENT.vision.title}</h2>
          <p className="text-muted-foreground text-body mt-3">{ABOUT_CONTENT.vision.text}</p>
        </div>
      </Container>

      <Container className="mt-16">
        <h2 className="text-foreground text-center text-lg font-medium">Valores</h2>
        <ul className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
          {VALUES.map((value) => (
            <li key={value} className="text-muted-foreground flex items-start gap-2 text-sm">
              <Check className="text-primary mt-0.5 size-4 shrink-0" />
              {value}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
