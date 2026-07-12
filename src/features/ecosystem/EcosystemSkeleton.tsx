import { Container } from "@/components/layout/Container";
import { Skeleton } from "@/components/ui/skeleton";

// Matches Ecosystem.tsx's `py-24 md:py-32` section padding so the dynamic
// import (see (marketing)/page.tsx) doesn't shift layout once it resolves.
export function EcosystemSkeleton() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-2xl space-y-4 text-center">
          <Skeleton className="mx-auto h-4 w-32" />
          <Skeleton className="mx-auto h-10 w-3/4" />
          <Skeleton className="mx-auto h-6 w-2/3" />
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <Skeleton className="h-40 rounded-xl" />
          <Skeleton className="h-40 rounded-xl" />
          <Skeleton className="h-40 rounded-xl" />
        </div>
      </Container>
    </section>
  );
}
