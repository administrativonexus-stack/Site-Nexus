import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Container } from "@/components/layout/Container";
import { CONTACT_CHANNELS, CONTACT_CONTENT, ContactForm } from "@/features/contact";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: CONTACT_CONTENT.title,
  description: CONTACT_CONTENT.subheadline,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="pb-24 md:pb-32">
      <Breadcrumb items={[{ name: "Contato", path: "/contact" }]} />
      <Container className="grid grid-cols-1 gap-16 pt-16 md:grid-cols-2 md:pt-24">
        <div>
          <h1 className="text-title text-foreground font-semibold">{CONTACT_CONTENT.headline}</h1>
          <p className="text-muted-foreground text-body mt-4 max-w-md">
            {CONTACT_CONTENT.subheadline}
          </p>

          <div className="mt-10 flex flex-col gap-4">
            {CONTACT_CHANNELS.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                className="border-border hover:border-primary/40 focus-visible:ring-ring/50 flex flex-col rounded-lg border p-4 outline-none transition-colors focus-visible:ring-3"
              >
                <span className="text-muted-foreground text-caption">{channel.label}</span>
                <span className="text-foreground text-sm font-medium">{channel.value}</span>
              </a>
            ))}
          </div>
        </div>

        <ContactForm />
      </Container>
    </div>
  );
}
