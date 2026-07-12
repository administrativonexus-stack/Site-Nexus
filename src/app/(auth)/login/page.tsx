import { Suspense } from "react";

import { LoginForm } from "@/features/authentication/LoginForm";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Entrar",
  description: "Acesse o Portal Nexus com seu e-mail e senha.",
  path: "/login",
  noIndex: true,
});

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-foreground text-2xl font-semibold">Entrar</h1>
        <p className="text-muted-foreground text-description mt-1">
          Acesse o Portal Nexus com seu e-mail e senha.
        </p>
      </div>
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
