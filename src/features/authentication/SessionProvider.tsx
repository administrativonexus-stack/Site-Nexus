"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient as createBrowserSupabaseClient } from "@/services/supabase/client";

interface SessionContextValue {
  user: User | null;
  loading: boolean;
}

const SessionContext = createContext<SessionContextValue>({ user: null, loading: true });

/**
 * Cap. 21's "SessionProvider". `initialUser` is always null (root layout
 * stays cookie-free so public pages keep static rendering — see
 * app/layout.tsx) — the real state resolves client-side on mount via
 * onAuthStateChange, which supabase-js fires immediately with the current
 * session and then again on every future login/logout.
 */
export function SessionProvider({
  initialUser,
  children,
}: {
  initialUser: User | null;
  children: React.ReactNode;
}) {
  const [user, setUser] = useState(initialUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createBrowserSupabaseClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return <SessionContext.Provider value={{ user, loading }}>{children}</SessionContext.Provider>;
}

export function useSession() {
  return useContext(SessionContext);
}
