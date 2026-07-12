import Link from "next/link";
import { siteConfig } from "@/config/site";

/** Split-screen layout per Capítulo 21: 50/50 desktop, 60/40 tablet, 100% centered mobile. */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div className="from-primary/20 to-secondary/20 relative hidden w-full flex-col justify-between bg-gradient-to-br p-12 sm:flex sm:w-2/5 lg:w-1/2">
        <Link
          href="/"
          className="text-foreground focus-visible:ring-ring/50 w-fit rounded-sm text-lg font-semibold outline-none focus-visible:ring-3"
        >
          {siteConfig.name}
        </Link>
        <div>
          <p className="text-foreground text-title max-w-sm font-semibold">
            Engenharia de software e IA para empresas que decidiram crescer.
          </p>
        </div>
      </div>

      <main
        id="main-content"
        className="flex w-full flex-1 items-center justify-center p-8 sm:w-3/5 lg:w-1/2"
      >
        <div className="w-full max-w-sm">{children}</div>
      </main>
    </div>
  );
}
