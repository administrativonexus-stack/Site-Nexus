import { NextResponse } from "next/server"
import { createClient } from "@/services/supabase/server"
import { updateLeadStatus } from "@/services/portal/queries/leads"
import type { UpdateLeadStatusRequest } from "@/types/api"

type Params = { params: Promise<{ leadId: string }> }

export async function PATCH(request: Request, { params }: Params) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { leadId } = await params
    const { status }: UpdateLeadStatusRequest = await request.json()

    const lead = await updateLeadStatus(leadId, status, user.id)
    return NextResponse.json(lead)
  } catch (error) {
    // Supabase's PostgrestError is a plain object (has .message, .code,
    // .details) — not `instanceof Error` — so that check alone was falling
    // through to the generic fallback for every real DB error.
    const message =
      error instanceof Error
        ? error.message
        : error && typeof error === "object" && "message" in error && typeof error.message === "string"
          ? error.message
          : "Failed to update status"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
