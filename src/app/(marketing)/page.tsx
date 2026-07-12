import dynamic from "next/dynamic";

import { Hero } from "@/features/hero";
import { EcosystemSkeleton } from "@/features/ecosystem";
import { Capabilities } from "@/features/capabilities";
import { PortfolioSection } from "@/features/portfolio";
import { Process } from "@/features/process";
import { InteractiveDemoSkeleton } from "@/features/interactive-demo";
import { Cta } from "@/features/cta";
import { getProjects } from "@/services/portfolio";

// Ecosystem and InteractiveDemo are the heaviest below-the-fold sections
// (AnimatedBeam + Motion, per Capítulo 23's explicit code-splitting call-out
// for "Demonstração Interativa") — code-split them out of the main bundle
// instead of importing directly. `ssr: false` isn't allowed for dynamic()
// inside a Server Component like this page, so they still render on the
// server; the `loading` skeleton only appears on slow client hydration.
const Ecosystem = dynamic(
  () => import("@/features/ecosystem").then((mod) => mod.Ecosystem),
  { loading: () => <EcosystemSkeleton /> },
);

const InteractiveDemo = dynamic(
  () =>
    import("@/features/interactive-demo").then((mod) => mod.InteractiveDemo),
  { loading: () => <InteractiveDemoSkeleton /> },
);

export default async function Home() {
  const projects = await getProjects();

  return (
    <>
      <Hero />
      <Ecosystem />
      <Capabilities />
      <PortfolioSection projects={projects} />
      <Process />
      <InteractiveDemo />
      <Cta />
    </>
  );
}
