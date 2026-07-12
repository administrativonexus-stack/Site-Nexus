import Link from "next/link";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/icons/social";

import { Container } from "@/components/layout/Container";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { FOOTER_LINKS } from "@/config/navigation";
import { SOCIAL_LINKS } from "@/config/social";
import { CONTACT_CHANNELS } from "@/features/contact";

const SOCIALS = [
  { name: "LinkedIn", href: SOCIAL_LINKS.linkedin, icon: LinkedinIcon },
  { name: "Instagram", href: SOCIAL_LINKS.instagram, icon: InstagramIcon },
  { name: "GitHub", href: SOCIAL_LINKS.github, icon: GithubIcon },
] as const;

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-caption text-foreground font-medium">{title}</p>
      {children}
    </div>
  );
}

const linkClass =
  "text-muted-foreground hover:text-foreground text-description transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50 rounded-sm";

export function Footer() {
  return (
    <footer className="border-border border-t">
      <Container className="grid grid-cols-1 gap-10 py-16 md:grid-cols-3 lg:grid-cols-6">
        <div className="flex flex-col gap-3 md:col-span-3 lg:col-span-1">
          <Logo />
          <p className="text-muted-foreground text-description max-w-xs">
            {siteConfig.description}
          </p>
        </div>

        <FooterColumn title="Empresa">
          {FOOTER_LINKS.company.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass}>
              {item.title}
            </Link>
          ))}
        </FooterColumn>

        <FooterColumn title="Soluções">
          {FOOTER_LINKS.solutions.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass}>
              {item.title}
            </Link>
          ))}
        </FooterColumn>

        <FooterColumn title="Projetos">
          {FOOTER_LINKS.projects.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass}>
              {item.title}
            </Link>
          ))}
        </FooterColumn>

        <FooterColumn title="Recursos">
          {FOOTER_LINKS.resources.map((item) => (
            <span
              key={item.title}
              aria-disabled="true"
              className="text-muted-foreground/75 text-description cursor-default"
            >
              {item.title}
            </span>
          ))}
        </FooterColumn>

        <FooterColumn title="Contato">
          {CONTACT_CHANNELS.map((channel) => (
            <a
              key={channel.label}
              href={channel.href}
              target={channel.label === "WhatsApp" ? "_blank" : undefined}
              rel={channel.label === "WhatsApp" ? "noopener noreferrer" : undefined}
              className={linkClass}
            >
              {channel.label}
            </a>
          ))}
          <Button render={<Link href="/contact" />} size="sm" className="mt-2 w-fit">
            Agendar uma reunião →
          </Button>
        </FooterColumn>
      </Container>

      <Container className="border-border flex flex-col gap-4 border-t py-6">
        <div className="flex gap-2">
          {SOCIALS.map(({ name, href, icon: Icon }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className="text-muted-foreground hover:text-primary focus-visible:ring-ring/50 flex size-11 items-center justify-center rounded-md outline-none transition-colors focus-visible:ring-3"
            >
              <Icon className="size-4" />
            </a>
          ))}
        </div>
        <div className="text-muted-foreground text-caption flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Todos os direitos reservados.
          </p>
          <div className="flex gap-4">
            {FOOTER_LINKS.legal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-foreground focus-visible:ring-ring/50 rounded-sm outline-none transition-colors focus-visible:ring-3"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
