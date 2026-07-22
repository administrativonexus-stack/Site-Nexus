import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import wordmark from "@/assets/logos/trx-digital-wordmark.png";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "focus-visible:ring-ring/50 w-fit rounded-sm outline-none transition-opacity hover:opacity-80 focus-visible:ring-3",
        className,
      )}
    >
      <Image src={wordmark} alt={siteConfig.name} height={28} className="h-7 w-auto" priority />
    </Link>
  );
}
