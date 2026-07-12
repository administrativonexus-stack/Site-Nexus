import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

/**
 * Text wordmark placeholder — Capítulo 20 calls for an SVG logo (white version)
 * that doesn't exist as a design asset yet. Swap this for the real SVG under
 * src/assets/logos/ once it's available; keep the same link-to-home behavior.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "text-foreground focus-visible:ring-ring/50 w-fit rounded-sm text-lg font-semibold tracking-tight outline-none transition-opacity hover:opacity-80 focus-visible:ring-3",
        className,
      )}
    >
      {siteConfig.name}
    </Link>
  );
}
