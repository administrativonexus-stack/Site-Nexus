import type { Metadata } from "next";
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

// Home doesn't call buildMetadata() — title/description/OG defaults already
// come from the root layout and shouldn't get "TRX Digital | TRX Digital" from the title
// template. It still needs its own canonical though (Capítulo 22 requires
// every page to have one). Deliberately NOT setting `openGraph.url` here:
// doing so replaces (rather than merges with) the root opengraph-image.tsx
// file-convention image instead of just adding a URL — confirmed by a build
// A/B test where og:image disappeared entirely the moment `openGraph` was
// set at all on this page. og:url is a smaller loss than a missing preview
// image on social shares.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// The Portfolio teaser below pulls live projects from the Portal
// (services/portfolio/get-projects.ts) — revalidate periodically instead of
// only at build time, same as /portfolio and /portfolio/[slug].
export const revalidate = 60;

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
