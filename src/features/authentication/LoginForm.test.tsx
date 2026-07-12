import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { CRM_URL } from "@/config/navigation";

const signInWithPasswordMock = vi.fn();

vi.mock("@/services/supabase/client", () => ({
  createSignInClient: () => ({
    auth: { signInWithPassword: signInWithPasswordMock },
  }),
}));

import { LoginForm } from "./LoginForm";

describe("LoginForm", () => {
  beforeEach(() => {
    signInWithPasswordMock.mockReset();
    // jsdom's window.location isn't reassignable by default — replace it
    // with a plain writable stub so `window.location.href = CRM_URL` in the
    // component can be asserted on without triggering a real navigation.
    Object.defineProperty(window, "location", {
      writable: true,
      value: { href: "" },
    });
  });

  it("shows the mapped Portuguese error and does not navigate on invalid credentials", async () => {
    signInWithPasswordMock.mockResolvedValue({
      error: { code: "invalid_credentials" },
    });
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText("E-mail"), "wrong@example.com");
    await user.type(screen.getByLabelText("Senha"), "wrong-password");
    await user.click(screen.getByRole("button", { name: "Entrar" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("E-mail ou senha inválidos.");
    expect(window.location.href).toBe("");
  });

  it("redirects to the CRM on a successful sign-in", async () => {
    signInWithPasswordMock.mockResolvedValue({ error: null });
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText("E-mail"), "user@example.com");
    await user.type(screen.getByLabelText("Senha"), "correct-password");
    await user.click(screen.getByRole("button", { name: "Entrar" }));

    await vi.waitFor(() => expect(window.location.href).toBe(CRM_URL));
  });
});
