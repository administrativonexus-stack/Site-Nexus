import { test, expect } from "@playwright/test";

/**
 * Fase 13: "Testes Visuais — Desktop, Tablet, Mobile". Breakpoints match
 * Capítulo 27's own responsiveness table; separate from browser-engine
 * coverage (see playwright.config.ts) since mixing the two would make the
 * desktop-nav-only tests in navigation.spec.ts fail spuriously on a
 * phone-sized project.
 */

test.describe("desktop (1440px)", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("shows the desktop mega menu nav, not the mobile menu button", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("button", { name: "Soluções" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Abrir menu" })).toBeHidden();
  });
});

test.describe("tablet (768px)", () => {
  test.use({ viewport: { width: 768, height: 1024 } });

  test("still shows the desktop nav at the md breakpoint", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("button", { name: "Soluções" })).toBeVisible();
  });

  test("no horizontal overflow on the homepage", async ({ page }) => {
    await page.goto("/");
    const hasOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(hasOverflow).toBe(false);
  });
});

test.describe("mobile (375px)", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("hides the desktop nav and shows the mobile menu button instead", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("button", { name: "Soluções" })).toBeHidden();
    await expect(page.getByRole("button", { name: "Abrir menu" })).toBeVisible();
  });

  test("opens the mobile sheet, navigates, and closes it", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Abrir menu" }).click();
    // Scoped to the sheet's dialog — the footer also has a "Sobre" link.
    const sheetSobreLink = page.getByRole("dialog").getByRole("link", { name: "Sobre" });
    await expect(sheetSobreLink).toBeVisible();
    await sheetSobreLink.click();
    await expect(page).toHaveURL(/\/about$/);
  });

  test("Esc closes the mobile sheet", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Abrir menu" }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog.getByRole("link", { name: "Sobre" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });

  test("no horizontal overflow on the homepage", async ({ page }) => {
    await page.goto("/");
    const hasOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(hasOverflow).toBe(false);
  });
});

test.describe("minimum supported mobile width (320px, Capítulo 27)", () => {
  test.use({ viewport: { width: 320, height: 720 } });

  async function expectNoOverflow(page: import("@playwright/test").Page) {
    const hasOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(hasOverflow).toBe(false);
  }

  test("homepage and contact form remain usable with no overflow", async ({ page }) => {
    await page.goto("/");
    await expectNoOverflow(page);

    await page.goto("/contact");
    await expect(page.getByLabel("Nome")).toBeVisible();
    await expectNoOverflow(page);
  });

  test("solutions, about, and portfolio pages have no overflow", async ({ page }) => {
    await page.goto("/solutions");
    await expectNoOverflow(page);

    await page.goto("/about");
    await expectNoOverflow(page);

    await page.goto("/portfolio");
    await expectNoOverflow(page);
  });

  test("login page has no overflow and the form stays usable", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByLabel("E-mail")).toBeVisible();
    await expectNoOverflow(page);
  });
});
