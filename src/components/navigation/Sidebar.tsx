"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import {
  ExternalLink,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Shield,
  User as UserIcon,
  Users,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { PORTAL_ADMIN_LINK, PORTAL_NAV_LINKS } from "@/config/navigation";
import { useLogout } from "@/features/authentication";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const ICONS: Record<string, LucideIcon> = {
  "layout-dashboard": LayoutDashboard,
  users: Users,
  settings: Settings,
  shield: Shield,
};

const navItemFocusClass = "outline-none focus-visible:ring-3 focus-visible:ring-ring/50";

function SidebarLinks({ user, onNavigate }: { user: User; onNavigate?: () => void }) {
  const pathname = usePathname();
  const logout = useLogout();
  const isAdmin = user.user_metadata?.role === "admin";

  const items = isAdmin ? [...PORTAL_NAV_LINKS, PORTAL_ADMIN_LINK] : PORTAL_NAV_LINKS;

  return (
    <nav className="flex h-full flex-col gap-1 p-3">
      {items.map((item) => {
        const Icon = ICONS[item.icon];

        if (item.external) {
          return (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "text-muted-foreground hover:bg-muted hover:text-foreground flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                navItemFocusClass,
              )}
            >
              <Icon className="size-4" />
              {item.title}
              <ExternalLink className="ml-auto size-3.5" />
            </a>
          );
        }

        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
              active
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
              navItemFocusClass,
            )}
          >
            <Icon className="size-4" />
            {item.title}
          </Link>
        );
      })}

      <div className="border-border mt-auto flex flex-col gap-1 border-t pt-3">
        <Link
          href="/profile"
          onClick={onNavigate}
          aria-current={pathname === "/profile" ? "page" : undefined}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
            pathname === "/profile"
              ? "bg-primary/10 text-primary font-medium"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
            navItemFocusClass,
          )}
        >
          <UserIcon className="size-4" />
          Perfil
        </Link>
        <button
          onClick={() => {
            onNavigate?.();
            logout();
          }}
          className={cn(
            "text-muted-foreground hover:bg-muted hover:text-foreground flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors",
            navItemFocusClass,
          )}
        >
          <LogOut className="size-4" />
          Sair
        </button>
      </div>
    </nav>
  );
}

/** `user` comes from the (portal) layout's server-side getUser() — avoids a
 * client-only session flash that would briefly hide the Admin link on load. */
export function Sidebar({ user }: { user: User }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <aside className="border-border bg-card/40 hidden w-60 shrink-0 border-r md:flex md:flex-col">
        <div className="border-border flex h-16 items-center border-b px-5">
          <Logo />
        </div>
        <SidebarLinks user={user} />
      </aside>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={
            <Button variant="ghost" size="icon" aria-label="Abrir menu" className="md:hidden" />
          }
        >
          <Menu />
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
          <SheetTitle className="sr-only">Menu do Portal</SheetTitle>
          <div className="border-border flex h-16 items-center border-b px-5">
            <Logo />
          </div>
          <SidebarLinks user={user} onNavigate={() => setOpen(false)} />
        </SheetContent>
      </Sheet>
    </>
  );
}
