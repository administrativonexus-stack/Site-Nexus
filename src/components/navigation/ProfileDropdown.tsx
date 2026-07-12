"use client";

import type { User } from "@supabase/supabase-js";
import { LogOut, Users } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CRM_URL } from "@/config/navigation";
import { useLogout } from "@/features/authentication/use-logout";

function initials(email: string) {
  return email.slice(0, 2).toUpperCase();
}

export function ProfileDropdown({ user }: { user: User }) {
  const logout = useLogout();
  const email = user.email ?? "";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label="Menu do perfil"
          />
        }
      >
        <Avatar className="size-8">
          <AvatarFallback>{initials(email)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="text-muted-foreground truncate text-xs font-normal">
          {email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem render={<a href={CRM_URL} />}>
          <Users />
          Ir para o CRM
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <LogOut />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
