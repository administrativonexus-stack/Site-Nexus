import { describe, expect, it } from "vitest";
import { getAuthErrorMessage } from "./constants";

describe("getAuthErrorMessage", () => {
  it("maps known Supabase error codes to Portuguese messages", () => {
    expect(getAuthErrorMessage("invalid_credentials")).toBe("E-mail ou senha inválidos.");
    expect(getAuthErrorMessage("email_not_confirmed")).toBe("Confirme seu e-mail antes de entrar.");
  });

  it("falls back to the default message for unknown or missing codes", () => {
    expect(getAuthErrorMessage("some_unmapped_code")).toBe("Não foi possível entrar. Tente novamente.");
    expect(getAuthErrorMessage(undefined)).toBe("Não foi possível entrar. Tente novamente.");
  });
});
