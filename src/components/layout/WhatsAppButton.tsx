import Link from "next/link";
import { WhatsappIcon } from "@/components/icons/social";
import { CONTACT_CHANNELS } from "@/features/contact";

const whatsapp = CONTACT_CHANNELS.find((channel) => channel.label === "WhatsApp")!;

export function WhatsAppButton() {
  return (
    <Link
      href={whatsapp.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      title="Falar no WhatsApp"
      className="bg-success hover:bg-success/90 focus-visible:ring-ring/50 fixed right-6 bottom-6 z-40 flex size-14 items-center justify-center rounded-full text-white shadow-lg outline-none transition-transform hover:scale-105 focus-visible:ring-3 active:scale-95"
    >
      <WhatsappIcon className="size-7" />
    </Link>
  );
}
