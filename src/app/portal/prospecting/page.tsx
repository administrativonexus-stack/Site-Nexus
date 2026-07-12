import { PageHeader } from "@/components/layout/portal-page-header"
import { ProspectingForm } from "@/features/portal-prospecting/prospecting-client"

export default function ProspectingPage() {
  return (
    <div>
      <PageHeader
        title="Prospecção"
        description="Buscar empresas no Google Maps e importar como leads"
      />
      <ProspectingForm />
    </div>
  )
}
