"use client";

import { useRouter } from "next/navigation";
import { createClient as createBrowserSupabaseClient } from "@/services/supabase/client";

/** Capítulo 21: sign out removes the session, and the user is redirected Home. */
export function useLogout() {
  const router = useRouter();

  return async function logout() {
    const supabase = createBrowserSupabaseClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };
}
