import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { getCookieDomain, getSupabaseAnonKey, getSupabaseUrl } from "@/services/supabase/env";

/**
 * Server Component / layout client. `setAll` is wrapped in try/catch because
 * Server Components can't write cookies — session refresh there is a no-op
 * and relies on the middleware (src/proxy.ts) to refresh on navigation.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(getSupabaseUrl(), getSupabaseAnonKey(), {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Called from a Server Component — safe to ignore, middleware handles refresh.
        }
      },
    },
    cookieOptions: { domain: getCookieDomain() },
  });
}
