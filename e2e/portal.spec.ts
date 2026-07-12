import { test, expect } from "@playwright/test";

/**
 * Fase 13: "Testes Funcionais — Portal". The Portal (merged CRM, Nexus
 * Prospect System) lives under /portal and is guarded by proxy.ts via
 * PRIVATE_ROUTES (config/navigation.ts). No test account is provisioned in
 * this repo, so a successful-login → /portal/dashboard path isn't covered
 * here — only the route-guard behavior, and that /callback and /set-password
 * (the invite/PKCE flow) stay reachable without a session.
 */

test("unauthenticated visit to /portal/dashboard redirects to login", async ({ page }) => {
  await page.goto("/portal/dashboard");
  await expect(page).toHaveURL(/\/login\?next=%2Fportal%2Fdashboard/);
});

test("unauthenticated visit to /portal/crm redirects to login", async ({ page }) => {
  await page.goto("/portal/crm");
  await expect(page).toHaveURL(/\/login\?next=%2Fportal%2Fcrm/);
});

test("/callback stays reachable without a session", async ({ page }) => {
  const response = await page.goto("/callback");
  expect(response?.status()).toBeLessThan(400);
  await expect(page).not.toHaveURL(/\/login\?/);
});

test("/set-password stays reachable without a session", async ({ page }) => {
  await page.goto("/set-password");
  await expect(page).not.toHaveURL(/\/login\?/);
  await expect(page.getByRole("heading", { name: "Criar sua senha" })).toBeVisible();
});
