import { createClient } from "@supabase/supabase-js";
import { getSupabaseAnonKey, getSupabaseUrl } from "@/services/supabase/env";

/**
 * Anonymous, cookie-less client for public-facing Server Components (e.g. the
 * marketing site's /portfolio pages). Unlike `server.ts`'s `createClient()`,
 * this never touches `next/headers`' `cookies()` — using that inside a Server
 * Component opts the whole route out of static rendering (the exact bug the
 * root layout avoided in Fase 6, see CLAUDE.md). Relies on a public RLS
 * policy (`portfolio_public_read`) to expose only intentionally-public rows.
 */
export function createPublicClient() {
  return createClient(getSupabaseUrl(), getSupabaseAnonKey());
}
