import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { getCookieDomain, getSupabaseAnonKey, getSupabaseUrl } from "@/services/supabase/env";

/**
 * Refreshes the Supabase session cookie on every request and returns the
 * current user (or null). `getUser()` — not `getSession()` — is used because
 * it revalidates the token against the Auth server instead of trusting the
 * cookie blindly (Capítulo 21 security requirement).
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(getSupabaseUrl(), getSupabaseAnonKey(), {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
    cookieOptions: { domain: getCookieDomain() },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { response, user };
}
