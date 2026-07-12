import { SetPasswordForm } from "@/features/authentication/SetPasswordForm";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Criar senha",
  description: "Defina uma senha para acessar a plataforma.",
  path: "/set-password",
  noIndex: true,
});

/**
 * Reached via invite: api/admin/invite/route.ts → /callback?type=invite →
 * here. Deliberately no "already authenticated → redirect" guard (unlike
 * /login) — the invited user IS authenticated by the time they land here
 * (the PKCE exchange in /callback already ran), and that's expected, not a
 * reason to bounce them away before they've set a real password.
 */
export default function SetPasswordPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-foreground text-2xl font-semibold">Criar sua senha</h1>
        <p className="text-muted-foreground text-description mt-1">
          Defina uma senha para acessar a plataforma.
        </p>
      </div>
      <SetPasswordForm />
    </div>
  );
}
