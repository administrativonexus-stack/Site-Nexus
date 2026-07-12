"use client";

import { forwardRef } from "react";
import { motion } from "motion/react";
import {
  Bot,
  Calendar,
  LayoutDashboard,
  MessageCircle,
  Network,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { ECOSYSTEM_NODES } from "@/features/ecosystem/constants";

const NODE_ICONS: Record<string, LucideIcon> = {
  "message-circle": MessageCircle,
  bot: Bot,
  network: Network,
  calendar: Calendar,
  "layout-dashboard": LayoutDashboard,
  workflow: Workflow,
};

type EcosystemNodeData = (typeof ECOSYSTEM_NODES)[number];

interface EcosystemNodeProps {
  node: EcosystemNodeData;
  active: boolean;
  onHoverChange: (hovering: boolean) => void;
}

export const EcosystemNode = forwardRef<HTMLDivElement, EcosystemNodeProps>(
  ({ node, active, onHoverChange }, ref) => {
    const Icon = NODE_ICONS[node.icon];

    return (
      <motion.div
        ref={ref}
        style={{ gridArea: node.gridArea }}
        onHoverStart={() => onHoverChange(true)}
        onHoverEnd={() => onHoverChange(false)}
        whileHover={{ y: -2 }}
        className={cn(
          "bg-card/60 flex items-center gap-3 rounded-lg border px-4 py-3 backdrop-blur-sm transition-colors",
          active ? "border-primary/60 bg-card/90" : "border-border",
        )}
      >
        <span
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-lg",
            active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
          )}
        >
          <Icon className="size-4" />
        </span>
        <div className="min-w-0">
          <p className="text-foreground truncate text-sm font-medium">{node.title}</p>
          <p className="text-muted-foreground truncate text-xs">{node.description}</p>
        </div>
      </motion.div>
    );
  },
);

EcosystemNode.displayName = "EcosystemNode";
