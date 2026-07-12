import { NextResponse } from "next/server";
import { createClient } from "@/services/supabase/server";

/**
 * Supabase PKCE code exchange — reached from password-reset and admin-invite
 * emails (`api/admin/invite/route.ts` builds `${origin}/callback?type=invite`).
 * Ported from the merged CRM's own `(auth)/callback/route.ts`.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const type = searchParams.get("type");
  const next = type === "invite" ? "/set-password" : (searchParams.get("next") ?? "/portal/dashboard");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}
