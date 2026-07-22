import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Container } from "@/components/layout/Container";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Política de Privacidade",
  description:
    "Como a TRX Digital coleta, utiliza e protege os dados pessoais dos visitantes e clientes.",
  path: "/privacy-policy",
  noIndex: true,
});

export default function PrivacyPolicyPage() {
  return (
    <div className="pb-24 md:pb-32">
      <Breadcrumb items={[{ name: "Política de Privacidade", path: "/privacy-policy" }]} />
      <Container className="max-w-2xl pt-16 md:pt-24">
        <h1 className="text-title text-foreground font-semibold">Política de Privacidade</h1>
        <p className="text-muted-foreground text-caption mt-2">Última atualização: a definir.</p>

        <p className="border-warning/40 bg-warning/10 text-warning mt-6 rounded-lg border p-4 text-sm">
          Este documento é um modelo inicial gerado durante o desenvolvimento e deve ser revisado
          por um advogado antes da publicação em produção.
        </p>

        <div className="text-muted-foreground text-body mt-8 flex flex-col gap-8">
          <section>
            <h2 className="text-foreground text-lg font-medium">1. Dados coletados</h2>
            <p className="mt-2">
              Coletamos informações fornecidas voluntariamente em formulários de contato (nome,
              e-mail, empresa e mensagem), além de dados de navegação para fins de melhoria do site.
            </p>
          </section>
          <section>
            <h2 className="text-foreground text-lg font-medium">2. Uso dos dados</h2>
            <p className="mt-2">
              Os dados são utilizados exclusivamente para responder solicitações, agendar reuniões e
              melhorar a experiência no site. Não vendemos dados pessoais a terceiros.
            </p>
          </section>
          <section>
            <h2 className="text-foreground text-lg font-medium">3. Cookies</h2>
            <p className="mt-2">
              Utilizamos cookies essenciais ao funcionamento do site e, quando aplicável, cookies
              analíticos para entender como o site é utilizado.
            </p>
          </section>
          <section>
            <h2 className="text-foreground text-lg font-medium">4. Seus direitos</h2>
            <p className="mt-2">
              Nos termos da Lei Geral de Proteção de Dados (LGPD), você pode solicitar acesso,
              correção ou exclusão dos seus dados a qualquer momento pelos canais de contato.
            </p>
          </section>
          <section>
            <h2 className="text-foreground text-lg font-medium">5. Contato</h2>
            <p className="mt-2">
              Dúvidas sobre esta política podem ser enviadas para{" "}
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
