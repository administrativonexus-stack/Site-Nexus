"use client";

import { motion } from "motion/react";
import {
  BarChart3,
  Bot,
  Calendar,
  LayoutDashboard,
  MessageSquare,
  type LucideIcon,
} from "lucide-react";

import { HERO_MOCKUP_STATS, HERO_MOCKUP_TABS } from "@/features/hero/constants";

const TAB_ICONS: Record<string, LucideIcon> = {
  "layout-dashboard": LayoutDashboard,
  "message-square": MessageSquare,
  bot: Bot,
  calendar: Calendar,
  "bar-chart-3": BarChart3,
};

const CHART_BARS = [40, 65, 45, 80, 60, 90, 70];

export function HeroMockup() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div
        className="bg-primary/25 absolute inset-8 -z-10 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [0, -8, 0],
          rotate: [-2, 2, -2],
        }}
        transition={{
          opacity: { duration: 0.6 },
          scale: { duration: 0.6 },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 9, repeat: Infinity, ease: "easeInOut" },
        }}
        className="bg-card border-border overflow-hidden rounded-xl border shadow-2xl"
      >
        <div className="border-border bg-muted/40 flex items-center gap-1.5 border-b px-4 py-3">
          <span className="size-2.5 rounded-full bg-red-400/70" />
          <span className="size-2.5 rounded-full bg-yellow-400/70" />
          <span className="size-2.5 rounded-full bg-green-400/70" />
          <span className="text-muted-foreground text-caption ml-2">CRM TRX</span>
        </div>

        <div className="flex">
          <nav className="border-border flex flex-col gap-1 border-r px-2 py-4">
            {HERO_MOCKUP_TABS.map((tab, i) => {
              const Icon = TAB_ICONS[tab.icon];
              return (
                <span
                  key={tab.label}
                  className={`flex size-8 items-center justify-center rounded-lg ${
                    i === 0 ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                  }`}
                >
                  <Icon className="size-4" />
                </span>
              );
            })}
          </nav>

          <div className="flex-1 space-y-4 p-4">
            <div className="grid grid-cols-2 gap-2">
              {HERO_MOCKUP_STATS.map((stat) => (
                <div key={stat.label} className="bg-muted/40 rounded-lg p-3">
                  <p className="text-foreground text-lg font-semibold">{stat.value}</p>
                  <p className="text-muted-foreground text-caption">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="bg-muted/40 flex h-24 items-end gap-1.5 rounded-lg p-3">
              {CHART_BARS.map((height, i) => (
                <span
                  key={i}
                  className="bg-primary/70 flex-1 rounded-sm"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
