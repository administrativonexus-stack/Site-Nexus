import { NextResponse } from "next/server"
import { createServiceClient } from "@/services/supabase/server"
import { getSetting } from "@/services/portal/settings"
import { autoRespondSDR } from "@/services/portal/sdr/auto-respond"
import {
  verifyHandshake,
  verifySignature,
  parseInboundMessages,
} from "@/services/portal/whatsapp-cloud/webhook-parser"

// GET — one-time handshake when registering the webhook URL in the Meta App Dashboard
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const mode = searchParams.get("hub.mode")
  const token = searchParams.get("hub.verify_token")
  const challenge = searchParams.get("hub.challenge")

  const expectedToken = await getSetting("whatsapp_cloud_verify_token")

  console.log(
    `[whatsapp-cloud webhook] handshake params: mode=${mode} token=${token} challenge=${challenge} expectedToken=${expectedToken}`
  )

  if (!expectedToken) return new NextResponse(null, { status: 403 })

  const result = verifyHandshake(mode, token, challenge, expectedToken)
  console.log("[whatsapp-cloud webhook] verifyHandshake returned null:", result === null)
  if (result === null) return new NextResponse(null, { status: 403 })

  return new NextResponse(result, { status: 200, headers: { "Content-Type": "text/plain" } })
}

export async function POST(request: Request) {
  const rawBody = await request.text()

  const appSecret = await getSetting("whatsapp_cloud_app_secret")
  if (appSecret) {
    const signature = request.headers.get("x-hub-signature-256")
    if (!verifySignature(rawBody, signature, appSecret)) {
      return new NextResponse(null, { status: 401 })
    }
  }

  try {
    const body = JSON.parse(rawBody)
    const supabase = await createServiceClient()

    // Inbound replies — dual-write into the regular conversations inbox
    const inboundMessages = parseInboundMessages(body)
    for (const msg of inboundMessages) {
      const { data: lead } = await supabase
        .from("leads")
        .select("id")
        .eq("phone", msg.phone)
        .maybeSingle()

      let leadId: string
      if (!lead) {
        const { data: newLead, error: createError } = await supabase
          .from("leads")
          .insert({
            company_name: msg.contactName || `Contato (${msg.phone})`,
            phone: msg.phone,
            status: "replied",
          })
          .select("id")
          .single()
        if (createError || !newLead) continue
        leadId = newLead.id
      } else {
        leadId = lead.id
      }

      await supabase.from("conversations").insert({
        lead_id: leadId,
        message: msg.text,
        sender: "lead",
        whatsapp_message_id: msg.messageId,
        read: false,
      })

      void autoRespondSDR(leadId, msg.text, "")
    }

    return new NextResponse(null, { status: 200 })
  } catch {
    return new NextResponse(null, { status: 200 }) // Always 200 to Meta to avoid retry storms
  }
}
