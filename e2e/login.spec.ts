import { test, expect } from "@playwright/test";

/**
 * Fase 13: "Testes Funcionais — Login". Runs against the real Supabase
 * project (Capítulo 6) using a made-up e2e-only address — safe because
 * `invalid_credentials` is what Supabase returns for any email/password
 * pair that doesn't match a real account, and resetPasswordForEmail never
 * reveals whether an email is registered (Capítulo 21 security), so no real
 * mailbox is ever touched. No real account exists to test a successful
 * login, so that path isn't covered here.
 */

test("invalid credentials show the mapped Portuguese error message", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("E-mail").fill("e2e-nonexistent-user@example.com");
  await page.getByLabel("Senha").fill("wrong-password-123");
  await page.getByRole("button", { name: "Entrar" }).click();

  // Scoped to the form — Next.js's own route announcer also has role="alert".
  const alert = page.locator("form").getByRole("alert");
  await expect(alert).toBeVisible({ timeout: 10_000 });
  await expect(alert).toHaveText("E-mail ou senha inválidos.");
});

test("Esqueci minha senha link navigates to the forgot-password flow", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("link", { name: "Esqueci minha senha" }).click();
  await expect(page).toHaveURL(/\/forgot-password$/);
  await expect(page.getByLabel("E-mail")).toBeVisible();
});

test("forgot-password always shows the same non-leaking success message", async ({ page }) => {
  await page.goto("/forgot-password");
  await page.getByLabel("E-mail").fill("e2e-nonexistent-user@example.com");
  await page.getByRole("button", { name: "Enviar link de recuperação" }).click();

  await expect(page.getByRole("status")).toContainText(
    "Se este e-mail estiver cadastrado, enviamos um link para redefinir sua senha.",
  );
});

test("reset-password without a valid token shows the expired-link state", async ({ page }) => {
  await page.goto("/reset-password");
  await expect(page.getByText("Este link é inválido ou expirou.")).toBeVisible({
    timeout: 10_000,
  });
  await expect(page.getByRole("link", { name: "Solicitar um novo link" })).toBeVisible();
});
