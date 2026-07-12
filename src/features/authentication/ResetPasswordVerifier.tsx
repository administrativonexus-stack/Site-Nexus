"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { createClient as createBrowserSupabaseClient } from "@/services/supabase/client";
import { ResetPasswordForm } from "@/features/authentication/ResetPasswordForm";

type Status = "verifying" | "ready" | "invalid";

/**
 * Establishes the recovery session from the emailed link before rendering
 * the form — Supabase may deliver this as a PKCE `code` or a `token_hash`
 * depending on project auth settings, so both are handled.
 */
export function ResetPasswordVerifier() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<Status>("verifying");

  useEffect(() => {
    const supabase = createBrowserSupabaseClient();
    const code = searchParams.get("code");
    const tokenHash = searchParams.get("token_hash");

    async function verify() {
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        setStatus(error ? "invalid" : "ready");
        return;
      }
      if (tokenHash) {
        const { error } = await supabase.auth.verifyOtp({
          type: "recovery",
          token_hash: tokenHash,
        });
        setStatus(error ? "invalid" : "ready");
        return;
      }
      // Implicit flow: the SDK auto-detects the access_token in the URL hash on load.
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setStatus(session ? "ready" : "invalid");
    }

    verify();
  }, [searchParams]);

  if (status === "verifying") {
    return <p className="text-muted-foreground text-sm">Verificando link...</p>;
  }

  if (status === "invalid") {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-foreground text-sm">Este link é inválido ou expirou.</p>
        <Link href="/forgot-password" className="text-primary text-sm">
          Solicitar um novo link
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-foreground text-2xl font-semibold">Redefinir senha</h1>
        <p className="text-muted-foreground text-description mt-1">Escolha uma nova senha.</p>
      </div>
      <ResetPasswordForm />
    </div>
  );
}
