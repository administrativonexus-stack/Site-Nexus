import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Toaster } from "@/components/ui/sonner";
import { ContactForm } from "./ContactForm";

function renderForm() {
  return render(
    <>
      <ContactForm />
      <Toaster />
    </>,
  );
}

describe("ContactForm", () => {
  it("shows a role=alert error per empty required field on submit", async () => {
    const user = userEvent.setup();
    renderForm();

    await user.click(screen.getByRole("button", { name: "Enviar mensagem" }));

    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(3);
    expect(screen.getByText("Informe seu nome.")).toBeInTheDocument();
    expect(screen.getByText("Informe um e-mail.")).toBeInTheDocument();
    expect(screen.getByText("Conte um pouco sobre o seu projeto.")).toBeInTheDocument();
  });

  it("rejects a malformed e-mail with a specific message", async () => {
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByLabelText("Nome"), "Ana Silva");
    await user.type(screen.getByLabelText("E-mail"), "not-an-email");
    await user.type(screen.getByLabelText("Mensagem"), "Quero conversar sobre um projeto.");
    await user.click(screen.getByRole("button", { name: "Enviar mensagem" }));

    expect(await screen.findByText("Informe um endereço de e-mail válido.")).toBeInTheDocument();
  });

  it("clears the errors for a field as soon as it's edited", async () => {
    const user = userEvent.setup();
    renderForm();

    await user.click(screen.getByRole("button", { name: "Enviar mensagem" }));
    expect(await screen.findByText("Informe seu nome.")).toBeInTheDocument();

    await user.type(screen.getByLabelText("Nome"), "Ana");
    expect(screen.queryByText("Informe seu nome.")).not.toBeInTheDocument();
  });

  it("submits successfully, resets the form, and shows a success toast", async () => {
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByLabelText("Nome"), "Ana Silva");
    await user.type(screen.getByLabelText("E-mail"), "ana@example.com");
    await user.type(screen.getByLabelText("Mensagem"), "Quero conversar sobre um projeto.");
    await user.click(screen.getByRole("button", { name: "Enviar mensagem" }));

    await waitFor(() =>
      expect(screen.getByLabelText("Nome")).toHaveValue(""),
    );
    expect(
      await screen.findByText("Mensagem enviada! Retornaremos em até 1 dia útil."),
    ).toBeInTheDocument();
  });
});
