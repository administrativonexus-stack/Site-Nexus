import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";

export function NotFoundContent() {
  return (
    <div className="flex flex-1 items-center py-24 md:py-32">
      <Container className="flex flex-col items-center gap-4 text-center">
        <p className="text-primary text-sm font-medium">404</p>
        <h1 className="text-title text-foreground font-semibold">Página não encontrada.</h1>
        <p className="text-muted-foreground text-body max-w-md">
          O endereço que você tentou acessar não existe ou foi movido.
        </p>
        <Button render={<Link href="/" />} className="mt-4">
          Voltar para a Home
        </Button>
      </Container>
    </div>
  );
}
