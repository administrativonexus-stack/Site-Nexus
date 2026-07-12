function requireEnv(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(
      `Missing ${name}. Copy .env.local.example to .env.local and fill in your Supabase project's URL and publishable key.`,
    );
  }
  return value;
}

export function getSupabaseUrl() {
  return requireEnv("NEXT_PUBLIC_SUPABASE_URL", process.env.NEXT_PUBLIC_SUPABASE_URL);
}

export function getSupabaseAnonKey() {
  return requireEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

/**
 * Only set in Production (`.teamnexus.com.br`) — a shared, dot-prefixed
 * cookie domain is what lets the CRM subdomain (crm.teamnexus.com.br) see
 * the same session cookie for real SSO. Left unset on localhost and Preview
 * deployments, where the page's own host can't set a cookie for a different
 * domain — doing so there would just silently break login.
 */
export function getCookieDomain(): string | undefined {
  return process.env.NEXT_PUBLIC_COOKIE_DOMAIN || undefined;
}
