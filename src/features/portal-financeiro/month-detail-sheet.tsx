"use client"

import { useState, useEffect, useCallback } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { CheckCircle2, Pencil, Trash2, Loader2 } from "lucide-react"
import { format, endOfMonth } from "date-fns"
import { cn } from "@/lib/utils"
import { fmt, STATUS_CONFIG, type Transaction } from "./types"

const MONTH_LABELS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
]

interface MonthDetailSheetProps {
  open: boolean
  month: number // 1-12
  year: number
  onClose: () => void
  onEdit: (tx: Transaction) => void
  onChanged: () => void
}

export function MonthDetailSheet({ open, month, year, onClose, onEdit, onChanged }: MonthDetailSheetProps) {
  const [loading, setLoading] = useState(true)
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const from = `${year}-${String(month).padStart(2, "0")}-01`
      const to = format(endOfMonth(new Date(year, month - 1, 1)), "yyyy-MM-dd")
      const res = await fetch(`/api/financeiro/transactions?from=${from}&to=${to}`)
      if (res.ok) setTransactions(await res.json())
    } finally {
      setLoading(false)
    }
  }, [month, year])

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { if (open) load() }, [open, load])

  async function markPaid(tx: Transaction) {
    const res = await fetch(`/api/financeiro/transactions/${tx.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "paid", paid_date: format(new Date(), "yyyy-MM-dd") }),
    })
    if (res.ok) { toast.success("Marcado como pago!"); load(); onChanged() }
  }

  async function deleteTx(id: string) {
    if (!confirm("Excluir transação?")) return
    const res = await fetch(`/api/financeiro/transactions/${id}`, { method: "DELETE" })
    if (res.ok) { toast.success("Excluído"); load(); onChanged() }
  }

  const paid = transactions.filter(t => t.status === "paid")
  const income = paid.filter(t => t.type === "income").reduce((s, t) => s + Number(t.amount), 0)
  const expense = paid.filter(t => t.type === "expense").reduce((s, t) => s + Number(t.amount), 0)

  return (
    <Sheet open={open} onOpenChange={o => !o && onClose()}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{MONTH_LABELS[month - 1]} de {year}</SheetTitle>
        </SheetHeader>

        <div className="px-4 grid grid-cols-3 gap-2">
          <div className="space-y-0.5">
            <p className="text-[11px] text-muted-foreground">Entradas</p>
            <p className="text-sm font-semibold text-emerald-400 tabular-nums">{fmt(income)}</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-[11px] text-muted-foreground">Saídas</p>
            <p className="text-sm font-semibold text-red-400 tabular-nums">{fmt(expense)}</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-[11px] text-muted-foreground">Lucro</p>
            <p className={cn("text-sm font-semibold tabular-nums", income - expense >= 0 ? "text-foreground" : "text-red-400")}>
              {fmt(income - expense)}
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-4">
          {loading ? (
            <div className="flex items-center justify-center py-12 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          ) : transactions.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-12">Nenhuma transação neste mês.</p>
          ) : (
            <div className="divide-y divide-border/40">
              {transactions.map(tx => {
                const sc = STATUS_CONFIG[tx.status]
                return (
                  <div key={tx.id} className="py-3 space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium text-foreground truncate">{tx.description}</p>
                      <p className={cn("text-sm font-semibold tabular-nums whitespace-nowrap",
                        tx.type === "income" ? "text-emerald-400" : "text-red-400")}>
                        {tx.type === "income" ? "+" : "-"}{fmt(tx.amount)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                      <span className="truncate">
                        {tx.category || "-"} · {tx.due_date ? format(new Date(tx.due_date + "T12:00:00"), "dd/MM") : "-"}
                      </span>
                      <Badge variant="outline" className={cn("text-[10px] flex-shrink-0", sc.cls)}>{sc.label}</Badge>
                    </div>
                    <div className="flex gap-1 justify-end">
                      {tx.status !== "paid" && (
                        <button onClick={() => markPaid(tx)} aria-label="Marcar como pago"
                          className="p-1.5 rounded text-emerald-400 hover:bg-emerald-500/10 transition-colors min-w-[28px] min-h-[28px]">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                      <button onClick={() => onEdit(tx)} aria-label="Editar transação"
                        className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors min-w-[28px] min-h-[28px]">
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button onClick={() => deleteTx(tx.id)} aria-label="Excluir transação"
                        className="p-1.5 rounded text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-colors min-w-[28px] min-h-[28px]">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
