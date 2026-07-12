import { redirect, notFound } from "next/navigation"
import { createClient } from "@/services/supabase/server"
import { getCampaignDetail } from "@/services/portal/queries/campaigns"
import { CampaignDetailClient } from "@/features/portal-campaigns/campaign-detail-client"

interface Props {
  params: Promise<{ id: string }>
}

export default async function CampaignDetailPage({ params }: Props) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { id } = await params
  const detail = await getCampaignDetail(id)
  if (!detail) notFound()

  return <CampaignDetailClient initialDetail={detail} campaignId={id} />
}
