import { createBrowserClient } from "@supabase/ssr";
import { getCookieDomain, getSupabaseAnonKey, getSupabaseUrl } from "@/services/supabase/env";

/** Shared singleton — use in Client Components to read the current session. */
export function createClient() {
  return createBrowserClient(getSupabaseUrl(), getSupabaseAnonKey(), {
    cookieOptions: { domain: getCookieDomain() },
  });
}

const SEVEN_DAYS = 60 * 60 * 24 * 7;
const THIRTY_DAYS = 60 * 60 * 24 * 30;

/**
 * One-off (non-singleton) client for the sign-in call itself, so the auth
 * cookie's maxAge reflects "Lembrar de mim" (Capítulo 21: 30 dias vs 7 dias).
 * Every other client in the app just reads whatever cookie is already there.
 */
export function createSignInClient(rememberMe: boolean) {
  return createBrowserClient(getSupabaseUrl(), getSupabaseAnonKey(), {
    isSingleton: false,
    cookieOptions: {
      maxAge: rememberMe ? THIRTY_DAYS : SEVEN_DAYS,
      domain: getCookieDomain(),
    },
  });
}
