import { ForgotPasswordForm } from "@/features/authentication/ForgotPasswordForm";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Recuperar senha",
  description: "Informe seu e-mail para receber um link de redefinição de senha.",
  path: "/forgot-password",
  noIndex: true,
});

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-foreground text-2xl font-semibold">Esqueci minha senha</h1>
        <p className="text-muted-foreground text-description mt-1">
          Informe seu e-mail para receber um link de redefinição.
        </p>
      </div>
      <ForgotPasswordForm />
    </div>
  );
}
