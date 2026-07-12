import { test, expect } from "@playwright/test";

/** Fase 13: "Testes Funcionais — Formulários". Submission is simulated
 * (Fase 5 — no services/contact/ backend exists yet), so this only covers
 * client-side validation and the success feedback, not a real send. */

test("submitting the contact form empty shows all three field errors", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: "Enviar mensagem" }).click();

  // Scoped to the form — Next.js's own route announcer also has role="alert".
  const alerts = page.locator("form").getByRole("alert");
  await expect(alerts).toHaveCount(3);
  await expect(page.getByText("Informe seu nome.")).toBeVisible();
  await expect(page.getByText("Informe um e-mail.")).toBeVisible();
  await expect(page.getByText("Conte um pouco sobre o seu projeto.")).toBeVisible();
});

test("an invalid e-mail format shows the specific validation message", async ({ page }) => {
  await page.goto("/contact");
  await page.getByLabel("Nome").fill("Ana Silva");
  await page.getByLabel("E-mail").fill("not-an-email");
  await page.getByLabel("Mensagem").fill("Quero conversar sobre um projeto.");
  await page.getByRole("button", { name: "Enviar mensagem" }).click();

  await expect(page.getByText("Informe um endereço de e-mail válido.")).toBeVisible();
});

test("a valid submission clears the form and shows a success toast", async ({ page }) => {
  await page.goto("/contact");
  await page.getByLabel("Nome").fill("Ana Silva");
  await page.getByLabel("E-mail").fill("ana@example.com");
  await page.getByLabel("Mensagem").fill("Quero conversar sobre um projeto.");
  await page.getByRole("button", { name: "Enviar mensagem" }).click();

  await expect(page.getByText("Mensagem enviada! Retornaremos em até 1 dia útil.")).toBeVisible({
    timeout: 10_000,
  });
  await expect(page.getByLabel("Nome")).toHaveValue("");
});
