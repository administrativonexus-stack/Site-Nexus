import { notFound } from "next/navigation"
import { createClient } from "@/services/supabase/server"
import { getConversationList, getConversationsByLead, markMessagesRead } from "@/services/portal/queries/conversations"
import { getLeadById } from "@/services/portal/queries/leads"
import { ConversationListPanel } from "@/features/portal-conversations/conversation-list-panel"
import { ChatWindow } from "@/features/portal-conversations/chat-window"
import { LeadInfoPanel } from "@/features/portal-conversations/lead-info-panel"

interface Props {
  params: Promise<{ leadId: string }>
}

export default async function ConversationPage({ params }: Props) {
  const { leadId } = await params

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const [lead, messages, list] = await Promise.all([
    getLeadById(leadId).catch(() => null),
    getConversationsByLead(leadId).catch(() => []),
    getConversationList().catch(() => []),
  ])

  if (!lead) notFound()

  // Mark as read server-side
  await markMessagesRead(leadId).catch(() => {})

  return (
    <div className="flex h-[calc(100vh-4rem)] -mx-4 -mt-4 md:-mx-6 md:-mt-6 overflow-hidden">
      <ConversationListPanel leads={list} selectedLeadId={leadId} />
      <ChatWindow lead={lead} initialMessages={messages} />
      <LeadInfoPanel lead={lead} />
    </div>
  )
}
