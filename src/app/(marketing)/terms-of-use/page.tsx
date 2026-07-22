import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Container } from "@/components/layout/Container";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Termos de Uso",
  description: "Termos e condições de uso do site institucional da TRX Digital.",
  path: "/terms-of-use",
  noIndex: true,
});

export default function TermsOfUsePage() {
  return (
    <div className="pb-24 md:pb-32">
      <Breadcrumb items={[{ name: "Termos de Uso", path: "/terms-of-use" }]} />
      <Container className="max-w-2xl pt-16 md:pt-24">
        <h1 className="text-title text-foreground font-semibold">Termos de Uso</h1>
        <p className="text-muted-foreground text-caption mt-2">Última atualização: a definir.</p>

        <p className="border-warning/40 bg-warning/10 text-warning mt-6 rounded-lg border p-4 text-sm">
          Este documento é um modelo inicial gerado durante o desenvolvimento e deve ser revisado
          por um advogado antes da publicação em produção.
        </p>

        <div className="text-muted-foreground text-body mt-8 flex flex-col gap-8">
          <section>
            <h2 className="text-foreground text-lg font-medium">1. Aceitação dos termos</h2>
            <p className="mt-2">
              Ao acessar este site, você concorda com estes Termos de Uso. Caso não concorde,
              recomendamos que não utilize o site.
            </p>
          </section>
          <section>
            <h2 className="text-foreground text-lg font-medium">2. Uso do site</h2>
            <p className="mt-2">
              O conteúdo deste site é destinado a fins informativos e comerciais. É proibido
              utilizá-lo para fins ilícitos ou que violem direitos de terceiros.
            </p>
          </section>
          <section>
            <h2 className="text-foreground text-lg font-medium">3. Propriedade intelectual</h2>
            <p className="mt-2">
              Marca, textos, imagens e código deste site pertencem à TRX Digital ou a seus licenciadores e
              não podem ser reproduzidos sem autorização.
            </p>
          </section>
          <section>
            <h2 className="text-foreground text-lg font-medium">
              4. Limitação de responsabilidade
            </h2>
            <p className="mt-2">
              A TRX Digital não se responsabiliza por danos decorrentes do uso indevido das informações
              disponibilizadas neste site.
            </p>
          </section>
          <section>
            <h2 className="text-foreground text-lg font-medium">5. Alterações</h2>
            <p className="mt-2">
              Estes termos podem ser atualizados periodicamente. A versão vigente estará sempre
              disponível nesta página.
            </p>
          </section>
          <section>
            <h2 className="text-foreground text-lg font-medium">6. Contato</h2>
            <p className="mt-2">
              Dúvidas sobre estes termos podem ser enviadas para{" "}
              <a href="mailto:contato@trxdigital.com.br" className="text-primary">
                contato@trxdigital.com.br
              </a>
              .
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
