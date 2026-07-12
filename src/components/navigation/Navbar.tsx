"use client";

import * as React from "react";
import Link from "next/link";
import {
  Bot,
  Code2,
  LayoutDashboard,
  Menu,
  Plug,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useScrolled } from "@/hooks/use-scrolled";
import { NAV_LINKS, SOLUTIONS_MEGA_MENU } from "@/config/navigation";
import { Container } from "@/components/layout/Container";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const SOLUTIONS_ICONS: Record<string, LucideIcon> = {
  code: Code2,
  bot: Bot,
  users: Users,
  workflow: Workflow,
  "layout-dashboard": LayoutDashboard,
  plug: Plug,
};

// SheetClose ships with no default styling — match the ring the rest of the
// app's interactive elements use (Button, NavigationMenuLink) instead of
// falling back to the browser's unstyled default outline.
const mobileNavLinkClass =
  "rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50";

export function Navbar() {
  const scrolled = useScrolled();

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-250",
        scrolled
          ? "bg-background/80 border-border border-b shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container
        className={cn(
          "flex items-center justify-between transition-all duration-250",
          scrolled ? "h-16" : "h-20",
        )}
      >
        <Logo />

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Soluções</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[560px] grid-cols-2 gap-1 p-2">
                  {SOLUTIONS_MEGA_MENU.map((item) => {
                    const Icon = SOLUTIONS_ICONS[item.icon];
                    return (
                      <NavigationMenuLink
                        key={item.href}
                        render={<Link href={item.href} />}
                        className="flex-col items-start gap-1"
                      >
                        <span className="flex items-center gap-2 font-medium">
                          <Icon className="text-primary size-4" />
                          {item.title}
                        </span>
                        <span className="text-muted-foreground text-xs">{item.description}</span>
                      </NavigationMenuLink>
                    );
                  })}
                </div>
                <div className="border-border border-t p-2">
                  <NavigationMenuLink
                    render={<Link href="/portfolio" />}
                    className="text-primary text-sm font-medium"
                  >
                    Conheça nossos projetos →
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Empresa</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="flex w-48 flex-col gap-1 p-2">
                  {NAV_LINKS.company.map((item) => (
                    <NavigationMenuLink key={item.href} render={<Link href={item.href} />}>
                      {item.title}
                    </NavigationMenuLink>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                render={<Link href="/portfolio" />}
                className="h-9 px-2.5 text-sm font-medium"
              >
                Projetos
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <Sheet>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon" aria-label="Abrir menu" className="md:hidden" />
            }
          >
            <Menu />
          </SheetTrigger>
          <SheetContent side="right" className="w-full gap-0 sm:max-w-full">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav className="flex flex-col gap-2 p-6 pt-16 text-lg">
              <p className="text-muted-foreground text-caption mt-4 mb-1 uppercase">Soluções</p>
              {SOLUTIONS_MEGA_MENU.map((item) => (
                <SheetClose
                  key={item.href}
                  render={<Link href={item.href} />}
                  className={cn("py-2", mobileNavLinkClass)}
                >
                  {item.title}
                </SheetClose>
              ))}
              <p className="text-muted-foreground text-caption mt-6 mb-1 uppercase">Empresa</p>
              {NAV_LINKS.company.map((item) => (
                <SheetClose
                  key={item.href}
                  render={<Link href={item.href} />}
                  className={cn("py-2", mobileNavLinkClass)}
                >
                  {item.title}
                </SheetClose>
              ))}
              <SheetClose
                render={<Link href="/portfolio" />}
                className={cn("mt-6 py-2 font-medium", mobileNavLinkClass)}
              >
                Projetos
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </Container>
    </header>
  );
}
