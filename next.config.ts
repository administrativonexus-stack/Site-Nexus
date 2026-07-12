import type { NextConfig } from "next";
import createBundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

// Security headers (Capítulo 23) — applied to every route.
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    // 'unsafe-inline'/'unsafe-eval' are required by Next.js's own dev/hydration
    // scripts and the inline JSON-LD <script> tags (Capítulo 22) — a stricter
    // nonce-based CSP would need per-request nonces threaded through the app.
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      // wss: variant is for the Portal's Supabase Realtime subscriptions
      // (use-realtime-campaigns/use-realtime-messages) — the merged CRM's
      // only client-side third-party connections; every other integration
      // (OpenAI, Google Calendar, Evolution/WhatsApp Cloud, Apify) runs
      // exclusively in Route Handlers, never subject to browser CSP.
      `connect-src 'self' ${process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""} ${(process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").replace("https://", "wss://")}`,
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
