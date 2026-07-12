import { redirect } from "next/navigation"
import { createClient } from "@/services/supabase/server"
import { PortfolioClient } from "@/features/portal-portfolio/portfolio-client"

export default async function PortfolioPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")
  return <PortfolioClient />
}
