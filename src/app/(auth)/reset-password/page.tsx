import { Suspense } from "react";

import { ResetPasswordVerifier } from "@/features/authentication/ResetPasswordVerifier";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Redefinir senha",
  description: "Defina uma nova senha para sua conta Nexus.",
  path: "/reset-password",
  noIndex: true,
});

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordVerifier />
    </Suspense>
  );
}
