import { test, expect } from "@playwright/test";

/**
 * Fase 13: "Testes Funcionais — CMS". No real CRM-hosted API exists yet
 * (Fase 9) — NEXT_PUBLIC_CRM_API_URL is unset in this environment, so
 * services/portfolio always falls back to the local PROJECTS placeholder
 * data. This exercises that fallback path end-to-end (the only one that's
 * actually wired up right now), not a real CMS integration.
 */

test("portfolio grid renders the local placeholder projects", async ({ page }) => {
  await page.goto("/portfolio");
  await expect(page.getByRole("link", { name: /CRM Nexus/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /Barberflix/ })).toBeVisible();
});

test("a project card navigates to its detail page with challenge/solution/results", async ({
  page,
}) => {
  await page.goto("/portfolio");
  await page.getByRole("link", { name: /CRM Nexus/ }).click();
  await expect(page).toHaveURL(/\/portfolio\/crm-nexus$/);

  await expect(page.getByRole("heading", { name: "CRM Nexus" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Problema" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Solução" })).toBeVisible();
});

test("Home's portfolio teaser links into the same project detail page", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /CRM Nexus/ }).first().click();
  await expect(page).toHaveURL(/\/portfolio\/crm-nexus$/);
});
