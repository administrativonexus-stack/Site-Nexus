import { CheckCircle2, Clock, XCircle } from "lucide-react"

export interface Transaction {
  id: string
  type: "income" | "expense"
  amount: number
  description: string
  category: string
  client_name?: string
  payment_method?: string
  status: "paid" | "pending" | "overdue"
  due_date?: string
  paid_date?: string
  is_recurring: boolean
  recurrence?: string
  notes?: string
  created_at: string
}

export const fmt = (v: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(v)

export const STATUS_CONFIG = {
  paid:    { label: "Pago",     icon: CheckCircle2, cls: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10" },
  pending: { label: "Pendente", icon: Clock,         cls: "text-amber-400 border-amber-500/40 bg-amber-500/10" },
  overdue: { label: "Vencido",  icon: XCircle,       cls: "text-red-400 border-red-500/40 bg-red-500/10" },
}
