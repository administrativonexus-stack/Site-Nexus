export const AUTH_ERROR_MESSAGES: Record<string, string> = {
  invalid_credentials: "E-mail ou senha inválidos.",
  email_not_confirmed: "Confirme seu e-mail antes de entrar.",
  default: "Não foi possível entrar. Tente novamente.",
};

export function getAuthErrorMessage(code: string | undefined) {
  return AUTH_ERROR_MESSAGES[code ?? "default"] ?? AUTH_ERROR_MESSAGES.default;
}
