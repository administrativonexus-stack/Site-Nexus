import { PageHeader } from "@/components/layout/portal-page-header"
import { KanbanBoard } from "@/features/portal-crm/kanban-board"
import { getLeads } from "@/services/portal/queries/leads"

export default async function CRMPage() {
  const leads = await getLeads({ limit: 200 })

  return (
    <div className="h-full">
      <PageHeader
        title="CRM"
        description="Pipeline de vendas com 7 estágios"
      />
      <KanbanBoard initialLeads={leads} />
    </div>
  )
}
