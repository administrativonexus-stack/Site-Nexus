import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { JsonLd } from "@/components/layout/JsonLd";
import { breadcrumbSchema, type BreadcrumbItem } from "@/lib/seo";

/** Visible breadcrumb nav + matching JSON-LD BreadcrumbList (Capítulo 22). Always starts from Home. */
export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const fullItems: BreadcrumbItem[] = [{ name: "Home", path: "/" }, ...items];

  return (
    <>
      <JsonLd data={breadcrumbSchema(fullItems)} />
      <nav aria-label="Breadcrumb" className="pt-8">
        <Container>
          <ol className="text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm">
            {fullItems.map((item, index) => {
              const isLast = index === fullItems.length - 1;
              return (
                <li key={item.path} className="flex items-center gap-1.5">
                  {index > 0 && <ChevronRight className="size-3.5 shrink-0" aria-hidden="true" />}
                  {isLast ? (
                    <span aria-current="page" className="text-foreground">
                      {item.name}
                    </span>
                  ) : (
                    <Link href={item.path} className="hover:text-foreground transition-colors">
                      {item.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </Container>
      </nav>
    </>
  );
}
