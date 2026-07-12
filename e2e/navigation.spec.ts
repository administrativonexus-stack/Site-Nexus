import { test, expect } from "@playwright/test";

/**
 * Fase 13 (Capítulo 28): "Testes Funcionais — Navegação". Capítulo 27 also
 * requires every public page to be reachable in at most three interactions —
 * since Navbar/Footer link to every public route directly from any page,
 * that's satisfied by construction; these tests exercise the actual clicks
 * rather than just asserting hrefs exist.
 */

test("homepage loads with the expected hero content", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Nexus/);
  await expect(page.getByRole("main")).toBeVisible();
});

test("Soluções mega menu opens and navigates to a solution anchor", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Soluções" }).click();
  // Scoped to the popup content — "Inteligência Artificial" also appears in
  // the footer's Soluções column and in a Home portfolio card's category.
  const link = page
    .locator('[data-slot="navigation-menu-content"]')
    .getByRole("link", { name: /Inteligência Artificial/ });
  await expect(link).toBeVisible();
  await link.click();
  await expect(page).toHaveURL(/\/solutions#ai$/);
});

test("Empresa dropdown opens and navigates to Sobre", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Empresa" }).click();
  const link = page.getByRole("link", { name: "Sobre" }).first();
  await expect(link).toBeVisible();
  await link.click();
  await expect(page).toHaveURL(/\/about$/);
});

test("Navbar Projetos link navigates to the portfolio grid", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("navigation").getByRole("link", { name: "Projetos" }).click();
  await expect(page).toHaveURL(/\/portfolio$/);
});

test("Footer legal links reach Privacy Policy and Terms of Use", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("contentinfo").getByRole("link", { name: "Política de Privacidade" }).click();
  await expect(page).toHaveURL(/\/privacy-policy$/);

  await page.goto("/");
  await page.getByRole("contentinfo").getByRole("link", { name: "Termos de Uso" }).click();
  await expect(page).toHaveURL(/\/terms-of-use$/);
});

test("an unknown top-level path renders the global 404 with Navbar and Footer", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByText("Página não encontrada.")).toBeVisible();
  await expect(page.getByRole("banner")).toBeVisible();
  await expect(page.getByRole("contentinfo")).toBeVisible();
});

test("an unknown portfolio slug renders the marketing 404", async ({ page }) => {
  const response = await page.goto("/portfolio/this-slug-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByText("Página não encontrada.")).toBeVisible();
});

test("the retired mock Portal routes are gone (404), not silently broken", async ({ page }) => {
  // The Portal (Dashboard/Perfil/Configurações) was retired in favor of
  // real SSO into the external CRM — PRIVATE_ROUTES is now empty, so there's
  // no local private route left for middleware to protect/redirect.
  const response = await page.goto("/dashboard");
  expect(response?.status()).toBe(404);
});
