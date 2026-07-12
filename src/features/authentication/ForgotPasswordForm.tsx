"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient as createBrowserSupabaseClient } from "@/services/supabase/client";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const supabase = createBrowserSupabaseClient();
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    // Always show the same success state, regardless of whether the email is
    // registered — don't leak account existence (Capítulo 21 security).
    setLoading(false);
    setSent(true);
  }

  if (sent) {
    return (
      <div role="status" className="flex flex-col gap-4">
        <p className="text-foreground text-sm">
          Se este e-mail estiver cadastrado, enviamos um link para redefinir sua senha.
        </p>
        <Link
          href="/login"
          className="text-primary focus-visible:ring-ring/50 w-fit rounded-sm text-sm outline-none focus-visible:ring-3"
        >
          Voltar para o login
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
      </div>

      <Button type="submit" isLoading={loading}>
        Enviar link de recuperação
      </Button>

      <Link
        href="/login"
        className="text-muted-foreground focus-visible:ring-ring/50 rounded-sm text-center text-sm outline-none focus-visible:ring-3"
      >
        Voltar para o login
      </Link>
    </form>
  );
}
