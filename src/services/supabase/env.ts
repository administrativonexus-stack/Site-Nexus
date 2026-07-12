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
 * Service-role key — bypasses RLS. Only for server-only code that genuinely
 * needs to (webhook handlers, admin invite flow) via `createServiceClient()`
 * in `server.ts`. Never expose to a Client Component, never log.
 */
export function getServiceRoleKey() {
  return requireEnv("SUPABASE_SERVICE_ROLE_KEY", process.env.SUPABASE_SERVICE_ROLE_KEY);
}

/**
 * Vestigial: built for a cross-subdomain SSO design (site + CRM as separate
 * hosts sharing a session cookie) that was superseded once the CRM was
 * merged into this app at /portal — everything is one origin now, so this
 * has no reason to ever be set again. Left in place rather than removed
 * since deleting it would touch every Supabase client constructor for no
 * behavioral gain; harmless as long as it stays unset.
 */
export function getCookieDomain(): string | undefined {
  return process.env.NEXT_PUBLIC_COOKIE_DOMAIN || undefined;
}
