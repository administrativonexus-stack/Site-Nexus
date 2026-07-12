import { redirect } from "next/navigation";

import { LoginForm } from "@/features/authentication/LoginForm";
import { buildMetadata } from "@/lib/metadata";
import { createClient as createServerSupabaseClient } from "@/services/supabase/server";

export const metadata = buildMetadata({
  title: "Entrar",
  description: "Acesse sua conta para continuar.",
  path: "/login",
  noIndex: true,
});

export default async function LoginPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Already-authenticated users go straight to the Portal instead of seeing
  // the form again.
  if (user) redirect("/portal/dashboard");

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-foreground text-2xl font-semibold">Entrar</h1>
        <p className="text-muted-foreground text-description mt-1">
          Acesse sua conta para continuar.
        </p>
      </div>
      <LoginForm />
    </div>
  );
}
