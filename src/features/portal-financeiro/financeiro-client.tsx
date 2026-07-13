"use client"

import { useState, useEffect, useCallback } from "react"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import {
  TrendingUp, TrendingDown, DollarSign, Wallet, Clock,
  Plus, Pencil, Trash2, CheckCircle2,
  Loader2, RefreshCw, ArrowUpRight, ArrowDownRight, X, ChevronDown, ChevronLeft, ChevronRight,
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { fmt, STATUS_CONFIG, type Transaction } from "./types"

// ─── Types ────────────────────────────────────────────────────────────────────

interface YearChartPoint { month: string; label: string; income: number; expense: number; profit: number }

interface Metrics {
  receita_mes: number
  despesas_mes: number
  lucro_liquido: number
  fluxo_caixa: number
  prev_income: number
  prev_expense: number
  prev_profit: number
  contas_pagar: number
  contas_receber: number
  chart: YearChartPoint[]
  year: number
  year_income: number
  year_expense: number
  year_profit: number
  year_chart: YearChartPoint[]
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const pct = (curr: number, prev: number) => {
  if (prev === 0) return curr > 0 ? 100 : 0
  return Math.round(((curr - prev) / prev) * 100)
}

const EXPENSE_CATEGORIES = [
  "Google Ads","Meta Ads","TikTok Ads","OpenAI","Claude","Gemini","Cursor","Lovable",
  "Cloudflare","Hospedagem","Domínio","Servidor","Internet","Energia","Telefone",
  "Notebook","Computador","Funcionários","Freelancers","Comissões","Salários",
  "Cursos","Mentorias","Assinaturas","Aluguel","Impostos","Contador","Marketing",
  "Viagens","Combustível","Alimentação","Outros",
]

const MONTH_SHORT = Array.from({ length: 12 }, (_, i) =>
  new Date(2024, i, 1).toLocaleDateString("pt-BR", { month: "short" }))
const MONTH_LONG = Array.from({ length: 12 }, (_, i) =>
  new Date(2024, i, 1).toLocaleDateString("pt-BR", { month: "long" }))

const PAYMENT_METHODS = [
  { value: "pix", label: "PIX" },
  { value: "card", label: "Cartão" },
  { value: "cash", label: "Dinheiro" },
  { value: "transfer", label: "Transferência" },
  { value: "boleto", label: "Boleto" },
]

// ─── Metric Card ──────────────────────────────────────────────────────────────

// Static Tailwind class map — dynamic interpolation is purged by JIT
const METRIC_COLOR: Record<string, { bg: string; icon: string }> = {
  violet:  { bg: "bg-violet-500/10",  icon: "text-violet-400" },
  emerald: { bg: "bg-emerald-500/10", icon: "text-emerald-400" },
  red:     { bg: "bg-red-500/10",     icon: "text-red-400" },
  blue:    { bg: "bg-blue-500/10",    icon: "text-blue-400" },
  cyan:    { bg: "bg-cyan-500/10",    icon: "text-cyan-400" },
}

function MetricCard({
  title, value, prev, icon: Icon, color = "violet", skeleton = false,
}: {
  title: string; value: number; prev?: number; icon: React.ElementType
  color?: string; skeleton?: boolean
}) {
  const change = prev !== undefined ? pct(value, prev) : null
  const up = change !== null && change >= 0
  const colors = METRIC_COLOR[color] ?? METRIC_COLOR.violet

  if (skeleton) {
    return (
      <Card className="border-border/40">
        <CardContent className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div className="h-3 w-24 bg-muted/50 rounded animate-pulse" />
            <div className="h-9 w-9 rounded-lg bg-muted/50 animate-pulse" />
          </div>
          <div className="h-8 w-32 bg-muted/50 rounded animate-pulse" />
          <div className="h-3 w-20 bg-muted/30 rounded animate-pulse mt-2" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border/40 bg-card/60 hover:bg-card/80 transition-all duration-200">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <p className="text-sm text-muted-foreground">{title}</p>
          <div className={cn("h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0", colors.bg)}>
            <Icon className={cn("h-4 w-4", colors.icon)} />
          </div>
        </div>
        <p className="text-2xl font-semibold text-foreground tabular-nums">{fmt(value)}</p>
        {change !== null && (
          <div className={cn("flex items-center gap-1 mt-1.5 text-xs font-medium",
            up ? "text-emerald-400" : "text-red-400")}>
            {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {Math.abs(change)}% vs mês anterior
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// ─── Chart Tooltip ────────────────────────────────────────────────────────────

function ChartTooltip({ active, payload, label }: {
  active?: boolean
  payload?: { name: string; value: number; color: string }[]
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-card border border-border/50 rounded-lg p-3 shadow-xl text-xs space-y-1.5">
      <p className="font-semibold text-foreground mb-2">{label}</p>
      {payload.map(p => (
        <div key={p.name} className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
          <span className="text-muted-foreground">
            {p.name === "income" ? "Receita" : p.name === "expense" ? "Despesas" : "Lucro"}
          </span>
          <span className="font-semibold text-foreground ml-auto">{fmt(p.value)}</span>
        </div>
      ))}
    </div>
  )
}

// ─── Transaction Modal ────────────────────────────────────────────────────────

interface TxFormData {
  type: "income" | "expense"
  description: string; category: string; client_name: string; amount: string
  payment_method: string; status: "paid" | "pending" | "overdue"
  due_date: string; paid_date: string; is_recurring: boolean; recurrence: string; notes: string
}

const emptyTxForm = (type: "income" | "expense"): TxFormData => ({
  type, description: "", category: type === "expense" ? "Outros" : "",
  client_name: "", amount: "", payment_method: "pix",
  status: "pending", due_date: format(new Date(), "yyyy-MM-dd"),
  paid_date: "", is_recurring: false, recurrence: "monthly", notes: "",
})

function TxModal({ open, onClose, onSaved, editTx, defaultType }: {
  open: boolean; onClose: () => void; onSaved: () => void
  editTx?: Transaction | null; defaultType?: "income" | "expense"
}) {
  const [form, setForm] = useState<TxFormData>(emptyTxForm(defaultType ?? "income"))
  const [saving, setSaving] = useState(false)
  const [syncedFor, setSyncedFor] = useState<string | null>(null)
  const [showMore, setShowMore] = useState(false)

  // Reset the form whenever the modal opens for a (possibly different)
  // transaction — done during render per React's "adjusting state when a
  // prop changes" pattern, not in an effect.
  const syncKey = open ? (editTx ? editTx.id : `new-${defaultType ?? "income"}`) : null
  if (syncKey !== null && syncKey !== syncedFor) {
    setSyncedFor(syncKey)
    setShowMore(!!editTx)
    if (editTx) {
      setForm({
        type: editTx.type, description: editTx.description, category: editTx.category,
        client_name: editTx.client_name ?? "", amount: String(editTx.amount),
        payment_method: editTx.payment_method ?? "pix", status: editTx.status,
        due_date: editTx.due_date ?? "", paid_date: editTx.paid_date ?? "",
        is_recurring: editTx.is_recurring, recurrence: editTx.recurrence ?? "monthly",
        notes: editTx.notes ?? "",
      })
    } else {
      setForm(emptyTxForm(defaultType ?? "income"))
    }
  }

  if (!open) return null
  const set = (patch: Partial<TxFormData>) => setForm(p => ({ ...p, ...patch }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      const body = { ...form, amount: parseFloat(form.amount) }
      const res = editTx
        ? await fetch(`/api/financeiro/transactions/${editTx.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
        : await fetch("/api/financeiro/transactions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      if (!res.ok) throw new Error((await res.json()).error)
      toast.success(editTx ? "Atualizado!" : form.type === "income" ? "Receita adicionada!" : "Despesa adicionada!")
      onSaved(); onClose()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao salvar")
    } finally { setSaving(false) }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
      role="dialog" aria-modal="true"
    >
      <div className="w-full max-w-lg bg-card border border-border/50 rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/40">
          <h2 className="text-sm font-semibold">
            {editTx ? "Editar" : "Nova"} {form.type === "income" ? "Receita" : "Despesa"}
          </h2>
          <div className="flex items-center gap-2">
            {!editTx && (
              <div className="flex gap-1">
                <Button size="sm" variant={form.type === "income" ? "default" : "outline"}
                  className="h-7 text-xs" onClick={() => set({ type: "income", category: "" })}>
                  Receita
                </Button>
                <Button size="sm" variant={form.type === "expense" ? "default" : "outline"}
                  className="h-7 text-xs" onClick={() => set({ type: "expense", category: "Outros" })}>
                  Despesa
                </Button>
              </div>
            )}
            <button onClick={onClose} aria-label="Fechar"
              className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
        <form onSubmit={submit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-1.5">
              <Label className="text-xs text-muted-foreground">Descrição *</Label>
              <Input value={form.description} onChange={e => set({ description: e.target.value })} required className="h-9" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Valor (R$) *</Label>
              <Input type="number" step="0.01" min="0" value={form.amount}
                onChange={e => set({ amount: e.target.value })} required className="h-9" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Status</Label>
              <select value={form.status} onChange={e => set({ status: e.target.value as TxFormData["status"] })}
                className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm">
                <option value="paid">Pago</option>
                <option value="pending">Pendente</option>
                <option value="overdue">Vencido</option>
              </select>
            </div>
            {form.type === "expense" ? (
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Categoria *</Label>
                <select value={form.category} onChange={e => set({ category: e.target.value })} required
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm">
                  <option value="">Selecione</option>
                  {EXPENSE_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            ) : (
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Categoria</Label>
                <Input value={form.category} onChange={e => set({ category: e.target.value })}
                  placeholder="Ex: Projeto, Mensalidade..." className="h-9" />
              </div>
            )}
          </div>

          <button type="button" onClick={() => setShowMore(s => !s)}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", showMore && "rotate-180")} />
            Mais opções
          </button>

          {showMore && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Forma de pagamento</Label>
                <select value={form.payment_method} onChange={e => set({ payment_method: e.target.value })}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm">
                  {PAYMENT_METHODS.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                </select>
              </div>
              {form.type === "income" && (
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Cliente</Label>
                  <Input value={form.client_name} onChange={e => set({ client_name: e.target.value })}
                    placeholder="Nome do cliente" className="h-9" />
                </div>
              )}
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Vencimento</Label>
                <Input type="date" value={form.due_date} onChange={e => set({ due_date: e.target.value })} className="h-9" />
              </div>
              {form.status === "paid" && (
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Data do pagamento</Label>
                  <Input type="date" value={form.paid_date} onChange={e => set({ paid_date: e.target.value })} className="h-9" />
                </div>
              )}
              <div className="col-span-2 flex items-center gap-3">
                <input type="checkbox" id="recurring" checked={form.is_recurring}
                  onChange={e => set({ is_recurring: e.target.checked })}
                  className="h-4 w-4 rounded border-border" />
                <Label htmlFor="recurring" className="text-xs text-muted-foreground cursor-pointer">Recorrente</Label>
                {form.is_recurring && (
                  <select value={form.recurrence} onChange={e => set({ recurrence: e.target.value })}
                    className="h-8 rounded-md border border-input bg-background px-2 text-xs ml-auto">
                    <option value="monthly">Mensal</option>
                    <option value="quarterly">Trimestral</option>
                    <option value="semiannual">Semestral</option>
                    <option value="annual">Anual</option>
                  </select>
                )}
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <Button type="submit" disabled={saving} className="flex-1">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Salvar"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">Cancelar</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ─── Quick Add Bar ────────────────────────────────────────────────────────────

function QuickAddBar({ onSaved }: { onSaved: () => void }) {
  const [type, setType] = useState<"income" | "expense">("income")
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")
  const [saving, setSaving] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!description.trim() || !amount) return
    setSaving(true)
    try {
      const today = format(new Date(), "yyyy-MM-dd")
      const res = await fetch("/api/financeiro/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type, description, amount: parseFloat(amount),
          category: type === "expense" ? "Outros" : "",
          payment_method: "pix", status: "paid",
          due_date: today, paid_date: today,
          is_recurring: false, recurrence: "monthly", notes: "",
        }),
      })
      if (!res.ok) throw new Error((await res.json()).error)
      toast.success(type === "income" ? "Receita adicionada!" : "Despesa adicionada!")
      setDescription(""); setAmount("")
      onSaved()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao salvar")
    } finally { setSaving(false) }
  }

  return (
    <form onSubmit={submit} className="flex flex-wrap items-center gap-2 rounded-lg border border-border/40 bg-card/40 p-2 mb-3">
      <div className="flex gap-1">
        <Button type="button" size="sm" variant={type === "income" ? "default" : "outline"}
          className={cn("h-8 text-xs", type === "income" && "bg-emerald-600 hover:bg-emerald-700")}
          onClick={() => setType("income")}>
          Entrada
        </Button>
        <Button type="button" size="sm" variant={type === "expense" ? "default" : "outline"}
          className={cn("h-8 text-xs", type === "expense" && "bg-red-600 hover:bg-red-700")}
          onClick={() => setType("expense")}>
          Saída
        </Button>
      </div>
      <Input value={description} onChange={e => setDescription(e.target.value)}
        placeholder="Lançamento rápido — descrição..." className="h-8 flex-1 min-w-[140px]" />
      <Input type="number" step="0.01" min="0" value={amount} onChange={e => setAmount(e.target.value)}
        placeholder="Valor" className="h-8 w-28" />
      <Button type="submit" size="sm" disabled={saving} className="h-8 gap-1">
        {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Plus className="h-3.5 w-3.5" />}
        Lançar
      </Button>
    </form>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────

export function FinanceiroClient() {
  const [metrics, setMetrics] = useState<Metrics | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [txLoading, setTxLoading] = useState(true)

  const [txModal, setTxModal] = useState(false)
  const [editTx, setEditTx] = useState<Transaction | null>(null)
  const [defaultType, setDefaultType] = useState<"income" | "expense">("income")

  const [txFilter, setTxFilter] = useState<"" | "income" | "expense">("")
  const [chartPeriod, setChartPeriod] = useState<"7d" | "month" | "6m" | "12m">("6m")

  const now = new Date()
  const [selectedPeriod, setSelectedPeriod] = useState<"year" | number>(now.getMonth() + 1)
  const [reportYear, setReportYear] = useState(now.getFullYear())
  const [yearReport, setYearReport] = useState<Pick<Metrics, "year_income" | "year_expense" | "year_profit" | "year_chart"> | null>(null)
  const [yearLoading, setYearLoading] = useState(true)
  const [pendOpen, setPendOpen] = useState(false)

  const loadMetrics = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/financeiro/metrics")
      if (res.ok) setMetrics(await res.json())
    } finally { setLoading(false) }
  }, [])

  const loadTransactions = useCallback(async () => {
    setTxLoading(true)
    try {
      const params = new URLSearchParams()
      if (txFilter) params.set("type", txFilter)
      const res = await fetch(`/api/financeiro/transactions?${params}`)
      if (res.ok) setTransactions(await res.json())
    } finally { setTxLoading(false) }
  }, [txFilter])

  const loadYearReport = useCallback(async (year: number) => {
    setYearLoading(true)
    try {
      const res = await fetch(`/api/financeiro/metrics?year=${year}`)
      if (res.ok) {
        const data: Metrics = await res.json()
        setYearReport({ year_income: data.year_income, year_expense: data.year_expense, year_profit: data.year_profit, year_chart: data.year_chart })
      }
    } finally { setYearLoading(false) }
  }, [])

  // Fetch-on-mount/filter-change: loadMetrics/loadTransactions set their own
  // loading flags synchronously, which is the point (show a loading state
  // immediately on refetch) — not an accidental cascading render.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { loadMetrics() }, [loadMetrics])
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { loadTransactions() }, [loadTransactions])
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { loadYearReport(reportYear) }, [reportYear, loadYearReport])

  function openNew(type: "income" | "expense") {
    setEditTx(null)
    setDefaultType(type)
    setTxModal(true)
  }

  function refreshAll() {
    loadMetrics()
    loadTransactions()
    loadYearReport(reportYear)
  }

  async function markPaid(tx: Transaction) {
    const res = await fetch(`/api/financeiro/transactions/${tx.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "paid", paid_date: format(new Date(), "yyyy-MM-dd") }),
    })
    if (res.ok) { toast.success("Marcado como pago!"); loadTransactions(); loadMetrics(); loadYearReport(reportYear) }
  }

  async function deleteTx(id: string) {
    if (!confirm("Excluir transação?")) return
    const res = await fetch(`/api/financeiro/transactions/${id}`, { method: "DELETE" })
    if (res.ok) { toast.success("Excluído"); loadTransactions(); loadMetrics(); loadYearReport(reportYear) }
  }

  const allChart = metrics?.chart ?? []
  const chartData =
    chartPeriod === "7d"    ? allChart.slice(-2)
    : chartPeriod === "month" ? allChart.slice(-1)
    : chartPeriod === "6m"    ? allChart.slice(-6)
    : allChart

  // The current-month figures come from `metrics` (which also carries the
  // vs-previous-month comparison); any other period is read from the
  // per-year monthly breakdown already fetched for the annual report card.
  const isCurrentMonthView = selectedPeriod !== "year" && selectedPeriod === now.getMonth() + 1 && reportYear === now.getFullYear()
  const periodStats = selectedPeriod === "year"
    ? { income: yearReport?.year_income ?? 0, expense: yearReport?.year_expense ?? 0, profit: yearReport?.year_profit ?? 0,
        prevIncome: undefined, prevExpense: undefined, prevProfit: undefined }
    : isCurrentMonthView
      ? { income: metrics?.receita_mes ?? 0, expense: metrics?.despesas_mes ?? 0, profit: metrics?.lucro_liquido ?? 0,
          prevIncome: metrics?.prev_income, prevExpense: metrics?.prev_expense, prevProfit: metrics?.prev_profit }
      : { income: yearReport?.year_chart?.[selectedPeriod - 1]?.income ?? 0,
          expense: yearReport?.year_chart?.[selectedPeriod - 1]?.expense ?? 0,
          profit: yearReport?.year_chart?.[selectedPeriod - 1]?.profit ?? 0,
          prevIncome: undefined, prevExpense: undefined, prevProfit: undefined }
  const periodCardsLoading = isCurrentMonthView ? loading : yearLoading
  const periodLabel = selectedPeriod === "year" ? "do ano" : isCurrentMonthView ? "do mês" : `de ${MONTH_LONG[selectedPeriod - 1]}`

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 border-b border-border/40">
        <div>
          <h1 className="text-lg font-semibold text-foreground">Financeiro</h1>
          <p className="text-xs text-muted-foreground">Controle financeiro da Nexus Digital</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" onClick={refreshAll} className="gap-1.5 h-8">
            <RefreshCw className="h-3.5 w-3.5" />
            Atualizar
          </Button>
          <Button size="sm" onClick={() => openNew("income")} className="gap-1.5 h-8 bg-emerald-600 hover:bg-emerald-700">
            <Plus className="h-3.5 w-3.5" /> Nova Receita
          </Button>
          <Button size="sm" onClick={() => openNew("expense")} className="gap-1.5 h-8 bg-red-600 hover:bg-red-700">
            <Plus className="h-3.5 w-3.5" /> Nova Despesa
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">

        {/* Period strip — pick a month or the whole year; updates the cards below in place */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <button onClick={() => setReportYear(y => y - 1)} aria-label="Ano anterior"
            className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex-shrink-0">
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <span className="text-xs text-muted-foreground tabular-nums flex-shrink-0 w-10 text-center">{reportYear}</span>
          <button onClick={() => setReportYear(y => y + 1)} aria-label="Próximo ano" disabled={reportYear >= now.getFullYear()}
            className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-30 disabled:pointer-events-none flex-shrink-0">
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
          <span className="w-px h-4 bg-border/50 mx-1 flex-shrink-0" />
          <button onClick={() => setSelectedPeriod("year")}
            className={cn("px-2.5 py-1 rounded-full text-xs border transition-colors flex-shrink-0",
              selectedPeriod === "year"
                ? "border-violet-500/60 bg-violet-500/10 text-violet-400"
                : "border-border/50 text-muted-foreground hover:border-border hover:text-foreground")}>
            Ano
          </button>
          {MONTH_SHORT.map((label, i) => {
            const m = i + 1
            const isActive = selectedPeriod === m
            return (
              <button key={m} onClick={() => setSelectedPeriod(m)}
                className={cn("px-2.5 py-1 rounded-full text-xs border transition-colors flex-shrink-0 capitalize",
                  isActive
                    ? "border-violet-500/60 bg-violet-500/10 text-violet-400"
                    : "border-border/50 text-muted-foreground hover:border-border hover:text-foreground")}>
                {label}
              </button>
            )
          })}
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard title={`Receita ${periodLabel}`}  value={periodStats.income}  prev={periodStats.prevIncome}  icon={TrendingUp}   color="emerald" skeleton={periodCardsLoading} />
          <MetricCard title={`Despesas ${periodLabel}`} value={periodStats.expense} prev={periodStats.prevExpense} icon={TrendingDown}  color="red"     skeleton={periodCardsLoading} />
          <MetricCard title="Lucro líquido"             value={periodStats.profit}  prev={periodStats.prevProfit}  icon={DollarSign}   color="violet"  skeleton={periodCardsLoading} />
          <MetricCard title="Fluxo de caixa"            value={metrics?.fluxo_caixa ?? 0}                          icon={Wallet}       color="blue"    skeleton={loading} />
        </div>

        {/* Pendências — collapsed by default, click to expand */}
        <Card className="border-border/40">
          <button onClick={() => setPendOpen(o => !o)}
            className="w-full flex items-center justify-between gap-2 px-4 py-2.5 text-left">
            <div className="flex items-center gap-2 text-xs min-w-0">
              <Clock className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
              <span className="font-medium text-foreground flex-shrink-0">Pendências</span>
              <span className="text-muted-foreground truncate">
                A receber <span className="text-emerald-400 font-medium">{fmt(metrics?.contas_receber ?? 0)}</span>
                {" · "}A pagar <span className="text-red-400 font-medium">{fmt(metrics?.contas_pagar ?? 0)}</span>
              </span>
            </div>
            <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform flex-shrink-0", pendOpen && "rotate-180")} />
          </button>
          {pendOpen && (
            <div className="grid grid-cols-3 gap-4 px-4 pb-4 pt-1 border-t border-border/40 mt-1">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">A receber</p>
                <p className="text-lg font-semibold text-emerald-400 tabular-nums">{fmt(metrics?.contas_receber ?? 0)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">A pagar</p>
                <p className="text-lg font-semibold text-red-400 tabular-nums">{fmt(metrics?.contas_pagar ?? 0)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Saldo pendente</p>
                <p className={cn("text-lg font-semibold tabular-nums",
                  (metrics?.contas_receber ?? 0) >= (metrics?.contas_pagar ?? 0) ? "text-foreground" : "text-red-400")}>
                  {fmt((metrics?.contas_receber ?? 0) - (metrics?.contas_pagar ?? 0))}
                </p>
              </div>
            </div>
          )}
        </Card>

        {/* Relatório anual */}
        <Card className="border-border/40">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <CardTitle className="text-sm font-medium">Relatório anual</CardTitle>
              <div className="flex items-center gap-1">
                <button onClick={() => setReportYear(y => y - 1)} aria-label="Ano anterior"
                  className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-sm font-medium text-foreground tabular-nums w-12 text-center">{reportYear}</span>
                <button onClick={() => setReportYear(y => y + 1)} aria-label="Próximo ano"
                  disabled={reportYear >= now.getFullYear()}
                  className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-30 disabled:pointer-events-none">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0 space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Entradas do ano</p>
                <p className="text-lg font-semibold text-emerald-400 tabular-nums">
                  {yearLoading ? <span className="h-6 w-24 bg-muted/50 rounded animate-pulse block" /> : fmt(yearReport?.year_income ?? 0)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Saídas do ano</p>
                <p className="text-lg font-semibold text-red-400 tabular-nums">
                  {yearLoading ? <span className="h-6 w-24 bg-muted/50 rounded animate-pulse block" /> : fmt(yearReport?.year_expense ?? 0)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Lucro do ano</p>
                <p className={cn("text-lg font-semibold tabular-nums",
                  (yearReport?.year_profit ?? 0) >= 0 ? "text-foreground" : "text-red-400")}>
                  {yearLoading ? <span className="h-6 w-24 bg-muted/50 rounded animate-pulse block" /> : fmt(yearReport?.year_profit ?? 0)}
                </p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={yearReport?.year_chart ?? []} margin={{ top: 8, right: 10, left: 0, bottom: 0 }} barSize={12}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" strokeOpacity={0.8} vertical={false} />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: "hsl(var(--muted))", opacity: 0.4 }} />
                <Bar dataKey="income" name="income" fill="#10b981" radius={[3, 3, 0, 0]} />
                <Bar dataKey="expense" name="expense" fill="#ef4444" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex gap-4 justify-center">
              {[
                { label: "Entradas", color: "#10b981" },
                { label: "Saídas", color: "#ef4444" },
              ].map(l => (
                <div key={l.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="h-2 w-2 rounded-full" style={{ background: l.color }} />
                  {l.label}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Evolução financeira */}
        <Card className="border-border/40">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <CardTitle className="text-sm font-medium">Evolução financeira</CardTitle>
              <div className="flex gap-1">
                {([
                  { value: "7d",    label: "7 dias" },
                  { value: "month", label: "Mês atual" },
                  { value: "6m",    label: "6 meses" },
                  { value: "12m",   label: "12 meses" },
                ] as const).map(o => (
                  <button key={o.value} onClick={() => setChartPeriod(o.value)}
                    className={cn("px-2.5 py-1 rounded-full text-xs border transition-colors",
                      chartPeriod === o.value
                        ? "border-violet-500/60 bg-violet-500/10 text-violet-400"
                        : "border-border/50 text-muted-foreground hover:border-border hover:text-foreground")}>
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="g-income" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#10b981" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g-expense" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#ef4444" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g-profit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#8b5cf6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" strokeOpacity={0.8} />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={v => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)}
                  tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} width={44} />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="income"  stroke="#10b981" strokeWidth={2} fill="url(#g-income)"  dot={false} activeDot={{ r: 4 }} />
                <Area type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={2} fill="url(#g-expense)" dot={false} activeDot={{ r: 4 }} />
                <Area type="monotone" dataKey="profit"  stroke="#8b5cf6" strokeWidth={2} fill="url(#g-profit)"  dot={false} activeDot={{ r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-2 justify-center">
              {[
                { label: "Receita",  color: "#10b981" },
                { label: "Despesas", color: "#ef4444" },
                { label: "Lucro",    color: "#8b5cf6" },
              ].map(l => (
                <div key={l.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="h-2 w-2 rounded-full" style={{ background: l.color }} />
                  {l.label}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Transactions */}
        <div>
          <QuickAddBar onSaved={refreshAll} />
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-medium text-foreground">Transações recentes</h2>
            <div className="flex gap-1">
              {(["", "income", "expense"] as const).map(v => (
                <button key={v} onClick={() => setTxFilter(v)}
                  className={cn("px-3 py-1 rounded-full text-xs border transition-colors",
                    txFilter === v
                      ? "border-violet-500/60 bg-violet-500/10 text-violet-400"
                      : "border-border/50 text-muted-foreground hover:border-border hover:text-foreground")}>
                  {v === "" ? "Todos" : v === "income" ? "Entradas" : "Saídas"}
                </button>
              ))}
            </div>
          </div>

          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border/40">
                    {["Data", "Descrição", "Categoria", "Tipo", "Valor", "Status", ""].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-muted-foreground font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {txLoading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <tr key={i} className="border-b border-border/20">
                        {Array.from({ length: 7 }).map((_, j) => (
                          <td key={j} className="px-4 py-3">
                            <div className="h-3 bg-muted/40 rounded animate-pulse" style={{ width: j === 1 ? "120px" : "64px" }} />
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : transactions.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-12 text-center text-muted-foreground">
                        Nenhuma transação encontrada.
                      </td>
                    </tr>
                  ) : transactions.map(tx => {
                    const sc = STATUS_CONFIG[tx.status]
                    return (
                      <tr key={tx.id} className="border-b border-border/20 hover:bg-muted/20 transition-colors">
                        <td className="px-4 py-3 text-muted-foreground tabular-nums whitespace-nowrap">
                          {tx.due_date ? format(new Date(tx.due_date + "T12:00:00"), "dd/MM/yy") : "-"}
                        </td>
                        <td className="px-4 py-3 font-medium text-foreground max-w-48 truncate">{tx.description}</td>
                        <td className="px-4 py-3 text-muted-foreground">{tx.category || "-"}</td>
                        <td className="px-4 py-3">
                          <Badge variant="outline" className={tx.type === "income"
                            ? "text-emerald-400 border-emerald-500/40 text-[10px]"
                            : "text-red-400 border-red-500/40 text-[10px]"}>
                            {tx.type === "income" ? "Entrada" : "Saída"}
                          </Badge>
                        </td>
                        <td className={cn("px-4 py-3 font-semibold tabular-nums whitespace-nowrap",
                          tx.type === "income" ? "text-emerald-400" : "text-red-400")}>
                          {tx.type === "income" ? "+" : "-"}{fmt(tx.amount)}
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="outline" className={cn("text-[10px]", sc.cls)}>{sc.label}</Badge>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1">
                            {tx.status !== "paid" && (
                              <button onClick={() => markPaid(tx)} aria-label="Marcar como pago"
                                className="p-1.5 rounded text-emerald-400 hover:bg-emerald-500/10 transition-colors min-w-[28px] min-h-[28px]">
                                <CheckCircle2 className="h-3.5 w-3.5" />
                              </button>
                            )}
                            <button onClick={() => { setEditTx(tx); setTxModal(true) }} aria-label="Editar transação"
                              className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors min-w-[28px] min-h-[28px]">
                              <Pencil className="h-3.5 w-3.5" />
                            </button>
                            <button onClick={() => deleteTx(tx.id)} aria-label="Excluir transação"
                              className="p-1.5 rounded text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-colors min-w-[28px] min-h-[28px]">
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>

      <TxModal
        open={txModal}
        onClose={() => { setTxModal(false); setEditTx(null) }}
        onSaved={() => { loadTransactions(); loadMetrics(); loadYearReport(reportYear) }}
        editTx={editTx}
        defaultType={defaultType}
      />
    </div>
  )
}
