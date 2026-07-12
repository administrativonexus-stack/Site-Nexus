import { redirect } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient as createServerSupabaseClient } from "@/services/supabase/server";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Configurações",
  description: "Configurações da sua conta no Portal Nexus.",
  path: "/settings",
  noIndex: true,
});

export default async function SettingsPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const expiresAt = session?.expires_at
    ? new Date(session.expires_at * 1000).toLocaleString("pt-BR", {
        dateStyle: "long",
        timeStyle: "short",
      })
    : null;

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-6 px-6 py-16">
      <h1 className="text-foreground text-2xl font-semibold">Configurações</h1>

      <Card>
        <CardHeader>
          <CardTitle>Conta</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-caption">E-mail</p>
          <p className="text-foreground text-sm font-medium">{user.email}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sessão</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-description">
            {expiresAt
              ? `Sua sessão atual expira em ${expiresAt}. Se você marcou "Lembrar de mim" no login, a duração é de 30 dias — caso contrário, 7 dias (Capítulo 21).`
              : "Não foi possível ler os dados da sessão."}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Em breve</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-description">
            Notificações, integrações e preferências de conta chegam em uma próxima fase.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
