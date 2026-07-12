import { cn } from "@/lib/utils";

/**
 * Grid container (Capítulo 17): max-width 1280px, horizontal padding
 * 24px mobile / 64px tablet (md, 768px) / 120px desktop (lg, 1024px+).
 * The PRD only defines 3 padding tiers, so "notebook" and "desktop"
 * share the 120px tier here.
 */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1280px] px-6 md:px-16 lg:px-[120px]", className)}
      {...props}
    />
  );
}
