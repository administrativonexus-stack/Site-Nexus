"use client";

import { forwardRef } from "react";
import { motion } from "motion/react";
import {
  Bot,
  Calendar,
  Check,
  LayoutDashboard,
  Loader2,
  MessageCircle,
  Network,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { DemoNodeStatus, DEMO_NODES } from "@/features/interactive-demo/constants";

const NODE_ICONS: Record<string, LucideIcon> = {
  "message-circle": MessageCircle,
  bot: Bot,
  network: Network,
  calendar: Calendar,
  "layout-dashboard": LayoutDashboard,
};

interface DemoNodeProps {
  node: (typeof DEMO_NODES)[number];
  status: DemoNodeStatus;
}

export const DemoNode = forwardRef<HTMLDivElement, DemoNodeProps>(({ node, status }, ref) => {
  const Icon = NODE_ICONS[node.icon];

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <motion.span
        animate={status === "processing" ? { scale: [1, 1.08, 1] } : { scale: 1 }}
        transition={{ duration: 0.8, repeat: status === "processing" ? Infinity : 0 }}
        className={cn(
          "flex size-14 items-center justify-center rounded-xl border transition-colors",
          status === "idle" && "bg-card border-border text-muted-foreground",
          status === "processing" && "bg-primary/10 border-primary text-primary",
          status === "success" && "bg-primary text-primary-foreground border-primary",
        )}
      >
        {status === "processing" ? (
          <Loader2 className="size-5 animate-spin" />
        ) : status === "success" ? (
          <Check className="size-5" />
        ) : (
          <Icon className="size-5" />
        )}
      </motion.span>
      <p className="text-muted-foreground text-xs">{node.title}</p>
    </div>
  );
});

DemoNode.displayName = "DemoNode";
