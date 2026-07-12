import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {/*
       * pt-20 offsets the fixed Navbar's initial 80px height for regular content pages.
       * The Hero section (Fase 4, Capítulo 11) is 100vh and meant to sit behind the
       * transparent Navbar — it will need to counteract this with a negative margin.
       */}
      <main id="main-content" className="flex flex-1 flex-col pt-20">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
