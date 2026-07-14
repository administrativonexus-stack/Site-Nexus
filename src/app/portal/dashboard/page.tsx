import { PageHeader } from "@/components/layout/portal-page-header"
import { getDashboardMetrics } from "@/services/portal/queries/dashboard"
import { DashboardClient } from "@/features/portal-dashboard/dashboard-client"

export default async function DashboardPage() {
  let metrics = null
  try {
    metrics = await getDashboardMetrics()
  } catch {
    // No Supabase credentials yet — render with null
  }

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Visão geral da prospecção comercial"
      />
      <DashboardClient initialMetrics={metrics} />
    </div>
  )
}
