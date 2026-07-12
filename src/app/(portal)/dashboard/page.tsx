import { redirect } from "next/navigation";

import { createClient as createServerSupabaseClient } from "@/services/supabase/server";
import { Dashboard } from "@/features/dashboard";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Dashboard",
  description: "Painel do Portal Nexus.",
  path: "/dashboard",
  noIndex: true,
});

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return <Dashboard userEmail={user.email ?? ""} />;
}
