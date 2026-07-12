import { Container } from "@/components/layout/Container";
import { Skeleton } from "@/components/ui/skeleton";

// Matches InteractiveDemo.tsx's `py-24 md:py-32` section padding so the
// dynamic import (see (marketing)/page.tsx) doesn't shift layout once it resolves.
export function InteractiveDemoSkeleton() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-2xl space-y-4 text-center">
          <Skeleton className="mx-auto h-4 w-32" />
          <Skeleton className="mx-auto h-10 w-3/4" />
          <Skeleton className="mx-auto h-6 w-2/3" />
        </div>
        <Skeleton className="mx-auto mt-16 h-96 max-w-4xl rounded-2xl" />
      </Container>
    </section>
  );
}
