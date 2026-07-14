export interface ParsedInboundMessage {
  phone: string
  text: string
  messageId: string
  timestamp: number
  contactName?: string
}
