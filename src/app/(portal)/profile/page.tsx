import { redirect } from "next/navigation";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { createClient as createServerSupabaseClient } from "@/services/supabase/server";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Meu Perfil",
  description: "Suas informações de conta no Portal Nexus.",
  path: "/profile",
  noIndex: true,
});

export default async function ProfilePage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const email = user.email ?? "";
  const memberSince = new Date(user.created_at).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mx-auto w-full max-w-lg px-6 py-16">
      <h1 className="text-foreground text-2xl font-semibold">Meu Perfil</h1>

      <div className="border-border mt-8 flex items-center gap-4 rounded-xl border p-6">
        <Avatar className="size-14">
          <AvatarFallback className="text-lg">{email.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-foreground font-medium">{email}</p>
          <p className="text-muted-foreground text-description">Membro desde {memberSince}</p>
        </div>
      </div>
    </div>
  );
}
