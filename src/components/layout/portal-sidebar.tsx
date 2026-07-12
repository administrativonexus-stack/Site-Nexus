"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Search,
  Kanban,
  MessageCircle,
  Megaphone,
  Bot,
  Settings,
  LogOut,
  DollarSign,
  Briefcase,
  Menu,
} from "lucide-react"
import { createClient } from "@/services/supabase/client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const NAV_GROUPS = [
  {
    label: "Prospecção",
    items: [
      { href: "/portal/dashboard",     label: "Dashboard",   icon: LayoutDashboard },
      { href: "/portal/prospecting",   label: "Prospecção",  icon: Search },
      { href: "/portal/crm",           label: "CRM",         icon: Kanban },
      { href: "/portal/conversations", label: "Conversas",   icon: MessageCircle },
    ],
  },
  {
    label: "Automação",
    items: [
      { href: "/portal/campaigns", label: "Campanhas", icon: Megaphone },
      { href: "/portal/sdr",       label: "SDR IA",    icon: Bot },
    ],
  },
  {
    label: "Agência",
    items: [
      { href: "/portal/financeiro", label: "Financeiro", icon: DollarSign },
      { href: "/portal/portfolio",  label: "Portfólio",  icon: Briefcase },
    ],
  },
]

const mobileNavLinkClass =
  "rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50"

function SidebarLogo() {
  return (
    <div className="flex items-center gap-2.5 px-2">
      <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-sm shadow-violet-500/25">
        <span className="text-[11px] font-black text-white" aria-hidden="true">N</span>
      </div>
      <span className="text-sm font-semibold text-sidebar-foreground tracking-tight">
        Nexus Portal
      </span>
    </div>
  )
}

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push("/login")
  }

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/")
  }

  const settingsActive = pathname.startsWith("/portal/settings")

  return (
    <>
      {/* Mobile top bar — the fixed desktop sidebar below is hidden below md,
          so mobile needs its own persistent header with a menu trigger. */}
      <header className="flex md:hidden items-center justify-between border-b border-sidebar-border bg-sidebar px-4 py-3">
        <SidebarLogo />
        <Sheet>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon" aria-label="Abrir menu do Portal" />
            }
          >
            <Menu />
          </SheetTrigger>
          <SheetContent side="right" className="w-full gap-0 sm:max-w-xs">
            <SheetTitle className="sr-only">Menu do Portal</SheetTitle>
            <nav aria-label="Navegação principal" className="flex h-full flex-col gap-2 p-6 pt-16">
              <div className="flex-1 space-y-4 overflow-y-auto">
                {NAV_GROUPS.map((group, gi) => (
                  <div key={gi}>
                    <p className="text-muted-foreground mb-1 px-2 text-[10px] font-semibold tracking-widest uppercase select-none">
                      {group.label}
                    </p>
                    <div className="space-y-0.5">
                      {group.items.map(({ href, label, icon: Icon }) => {
                        const active = isActive(href)
                        return (
                          <SheetClose
                            key={href}
                            render={<Link href={href} />}
                            aria-current={active ? "page" : undefined}
                            className={cn(
                              "flex min-h-[44px] items-center gap-2.5 px-2 py-2 text-sm transition-colors",
                              active
                                ? "text-foreground font-medium"
                                : "text-muted-foreground hover:text-foreground",
                              mobileNavLinkClass,
                            )}
                          >
                            <Icon className="size-4 flex-shrink-0" />
                            {label}
                          </SheetClose>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-0.5 border-t border-border pt-3">
                <SheetClose
                  render={<Link href="/portal/settings" />}
                  aria-current={settingsActive ? "page" : undefined}
                  className={cn(
                    "flex min-h-[44px] items-center gap-2.5 px-2 py-2 text-sm transition-colors",
                    settingsActive
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground",
                    mobileNavLinkClass,
                  )}
                >
                  <Settings className="size-4 flex-shrink-0" />
                  Configurações
                </SheetClose>
                <button
                  onClick={handleLogout}
                  aria-label="Sair da conta"
                  className={cn(
                    "text-muted-foreground hover:text-red-400 flex min-h-[44px] w-full items-center gap-2.5 px-2 py-2 text-left text-sm transition-colors",
                    mobileNavLinkClass,
                  )}
                >
                  <LogOut className="size-4 flex-shrink-0" />
                  Sair
                </button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </header>

      {/* Desktop fixed sidebar */}
      <aside className="hidden md:flex h-full w-56 flex-shrink-0 flex-col border-r border-sidebar-border bg-sidebar px-3 py-4">
        <div className="mb-6">
          <SidebarLogo />
        </div>

        <nav aria-label="Navegação principal" className="flex-1 space-y-4">
          {NAV_GROUPS.map((group, gi) => (
            <div key={gi}>
              {group.label && (
                <p className="px-2 mb-1 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/30 select-none">
                  {group.label}
                </p>
              )}
              <div className="space-y-0.5">
                {group.items.map(({ href, label, icon: Icon }) => {
                  const active = isActive(href)
                  return (
                    <Link
                      key={href}
                      href={href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-2.5 rounded-md px-2 py-2 text-sm transition-colors min-h-[36px]",
                        active
                          ? "bg-sidebar-accent text-sidebar-foreground font-medium"
                          : "text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-4 w-4 flex-shrink-0 transition-colors",
                          active ? "text-violet-400" : "text-sidebar-foreground/40"
                        )}
                      />
                      {label}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="space-y-0.5 border-t border-sidebar-border pt-3 mt-3">
          <Link
            href="/portal/settings"
            aria-current={settingsActive ? "page" : undefined}
            className={cn(
              "flex items-center gap-2.5 rounded-md px-2 py-2 text-sm transition-colors min-h-[36px]",
              settingsActive
                ? "bg-sidebar-accent text-sidebar-foreground font-medium"
                : "text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
            )}
          >
            <Settings
              className={cn(
                "h-4 w-4 flex-shrink-0 transition-colors",
                settingsActive ? "text-violet-400" : "text-sidebar-foreground/40"
              )}
            />
            Configurações
          </Link>
          <button
            onClick={handleLogout}
            aria-label="Sair da conta"
            className="flex w-full items-center gap-2.5 rounded-md px-2 py-2 text-sm text-sidebar-foreground/60 transition-colors hover:bg-red-500/10 hover:text-red-400 min-h-[36px]"
          >
            <LogOut className="h-4 w-4 flex-shrink-0 text-sidebar-foreground/40" />
            Sair
          </button>
        </div>
      </aside>
    </>
  )
}
