import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NotFoundContent } from "@/components/layout/NotFoundContent";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

/**
 * Global fallback for routes that don't match any segment at all (e.g. a
 * typo'd top-level path) — these never enter the (marketing) route group,
 * so its not-found.tsx doesn't apply and Navbar/Footer must be rendered here
 * directly instead of relying on (marketing)/layout.tsx.
 */
export default function GlobalNotFound() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex flex-1 flex-col pt-20">
        <NotFoundContent />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
