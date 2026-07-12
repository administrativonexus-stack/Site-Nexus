"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BrainCircuit, MessageCircle, Calendar, Megaphone, Users } from "lucide-react"

const settingsNav = [
  { href: "/portal/settings/openai",         label: "OpenAI",         icon: BrainCircuit },
  { href: "/portal/settings/whatsapp",       label: "WhatsApp",       icon: MessageCircle },
  { href: "/portal/settings/whatsapp-cloud", label: "WhatsApp Cloud", icon: Megaphone },
  { href: "/portal/settings/calendar",       label: "Calendário",     icon: Calendar },
  { href: "/portal/settings/users",          label: "Usuários",       icon: Users },
]

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col gap-4 md:flex-row md:gap-8">
      {/* Sub-nav — horizontal scrollable pills on mobile, vertical list at md+ */}
      <nav className="flex gap-2 overflow-x-auto pb-2 md:w-44 md:flex-shrink-0 md:flex-col md:gap-0 md:space-y-0.5 md:overflow-visible md:pb-0 md:pt-1">
        {settingsNav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-shrink-0 items-center gap-2.5 rounded-md px-3 py-2 text-sm whitespace-nowrap transition-colors",
                active
                  ? "bg-accent text-foreground font-medium"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Page content */}
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  )
}
