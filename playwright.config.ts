import { defineConfig, devices } from "@playwright/test";

/**
 * Fase 13 (Capítulo 28): "Testes de Compatibilidade — Chrome, Edge, Firefox,
 * Safari" and "Testes Visuais — Desktop, Tablet, Mobile". Chromium stands in
 * for Chrome/Edge (same rendering engine); WebKit stands in for Safari since
 * this environment has no macOS to run real Safari against. Viewport sizes
 * match Capítulo 27's own responsiveness breakpoints.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  // `next dev` compiles each route on first hit — under full parallelism
  // across 3 browser projects, many workers can cold-hit different routes
  // at once and a slow compile trips a navigation timeout that isn't a real
  // bug. One retry absorbs that; a real bug still fails twice.
  retries: 1,
  workers: 4,
  timeout: 45_000,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3100",
    trace: "on-first-retry",
    navigationTimeout: 30_000,
  },
  webServer: {
    command: "npm run dev -- -p 3100",
    url: "http://localhost:3100",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  // Browser-engine coverage (Chrome/Edge ≈ chromium, Safari ≈ webkit) — all
  // desktop-sized. Viewport/breakpoint coverage (Desktop/Tablet/Mobile) is
  // handled inside e2e/responsive.spec.ts via per-test test.use({ viewport }),
  // not via separate projects — several nav tests assume the desktop
  // `md:flex` navigation is visible, which would spuriously fail if those
  // same specs ran again under a phone-sized project.
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "firefox", use: { ...devices["Desktop Firefox"], viewport: { width: 1440, height: 900 } } },
    { name: "webkit", use: { ...devices["Desktop Safari"], viewport: { width: 1440, height: 900 } } },
  ],
});
