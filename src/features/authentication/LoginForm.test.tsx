import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const signInWithPasswordMock = vi.fn();
const routerPushMock = vi.fn();

vi.mock("@/services/supabase/client", () => ({
  createSignInClient: () => ({
    auth: { signInWithPassword: signInWithPasswordMock },
  }),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: routerPushMock }),
}));

import { LoginForm } from "./LoginForm";

describe("LoginForm", () => {
  beforeEach(() => {
    signInWithPasswordMock.mockReset();
    routerPushMock.mockReset();
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
    expect(routerPushMock).not.toHaveBeenCalled();
  });

  it("redirects to the Portal on a successful sign-in", async () => {
    signInWithPasswordMock.mockResolvedValue({ error: null });
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText("E-mail"), "user@example.com");
    await user.type(screen.getByLabelText("Senha"), "correct-password");
    await user.click(screen.getByRole("button", { name: "Entrar" }));

    await vi.waitFor(() => expect(routerPushMock).toHaveBeenCalledWith("/portal/dashboard"));
  });
});
