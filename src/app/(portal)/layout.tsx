import { redirect } from "next/navigation";

import { Sidebar } from "@/components/navigation/Sidebar";
import { ProfileDropdown } from "@/components/navigation/ProfileDropdown";
import { createClient as createServerSupabaseClient } from "@/services/supabase/server";

/**
 * Server-side guard (Cap. 21's "AuthGuard"/"ProtectedRoute") — defense in
 * depth alongside src/middleware.ts. Sidebar (Dashboard/CRM/Configurações,
 * Perfil/Sair) is the shared navigation for the whole portal (Fase 7).
 */
export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <div className="flex min-h-screen">
      <Sidebar user={user} />
      <div className="flex flex-1 flex-col">
        <header className="border-border flex h-16 items-center justify-end border-b px-6">
          <ProfileDropdown user={user} />
        </header>
        <main id="main-content" className="flex flex-1 flex-col">
          {children}
        </main>
      </div>
    </div>
  );
}
