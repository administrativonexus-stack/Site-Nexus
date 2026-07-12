import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { MotionConfig } from "motion/react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { siteConfig } from "@/config/site";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { JsonLd } from "@/components/layout/JsonLd";
import { SkipLink } from "@/components/layout/SkipLink";
import { organizationSchema, websiteSchema } from "@/lib/seo";
import { SessionProvider } from "@/features/authentication/SessionProvider";
import "./globals.css";

// Nexus Design System (Capítulo 17): Geist primary, Inter fallback.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Portal (merged CRM) uses this for tabular numeric displays — Financeiro/Dashboard.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  openGraph: {
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // No server-side user fetch here on purpose: reading cookies() in the root
  // layout would opt every route (including static marketing pages) out of
  // static rendering (Capítulo 23 priority). SessionProvider hydrates the
  // real auth state client-side instead — routes that need a per-request
  // session check (e.g. /login's already-authenticated guard) do their own
  // server-side fetch.
  return (
    <html
      lang="pt-BR"
      className={`dark ${geistSans.variable} ${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SkipLink />
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        {/* Capítulo 24: makes every Motion animation in the app (fadeUp,
            hoverScale, AnimatedBeam, etc.) respect the OS prefers-reduced-motion
            setting automatically — no per-component changes needed. GSAP-driven
            animations (DotGrid, SplitText) aren't covered by this and handle
            the same preference themselves. */}
        <MotionConfig reducedMotion="user">
          <SessionProvider initialUser={null}>
            <TooltipProvider>{children}</TooltipProvider>
            {/* top-center avoids colliding with the public site's fixed
                bottom-right WhatsAppButton (sonner's own default is bottom-right). */}
            <Toaster position="top-center" />
          </SessionProvider>
        </MotionConfig>
        {/* Fase 14 "Monitoramento ativo" — both no-op outside a Vercel deployment,
            safe to always render (no env gating needed). */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
