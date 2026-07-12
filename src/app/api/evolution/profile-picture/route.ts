import { NextResponse } from "next/server"
import { createClient } from "@/services/supabase/server"
import { getSetting } from "@/services/portal/settings"
import { getProfilePicture } from "@/services/portal/evolution/client"

export async function GET(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const phone = searchParams.get("phone")
  if (!phone) return NextResponse.json({ error: "phone required" }, { status: 400 })

  const instanceName = (await getSetting("evolution_instance", user.id)) ?? "nexus"
  const url = await getProfilePicture(instanceName, phone, user.id)

  return NextResponse.json({ url })
}
