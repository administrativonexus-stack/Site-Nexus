"use client";

import { motion } from "motion/react";
import {
  Code2,
  Compass,
  Rocket,
  Sparkles,
  Target,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/layout/Container";
import { fadeUp } from "@/config/animations";
import { PROCESS_CONTENT, PROCESS_STEPS } from "@/features/process/constants";

const STEP_ICONS: Record<string, LucideIcon> = {
  target: Target,
  compass: Compass,
  sparkles: Sparkles,
  code: Code2,
  rocket: Rocket,
  "trending-up": TrendingUp,
};

export function Process() {
  return (
    <section id="process" className="scroll-mt-24 py-24 md:py-32">
      <Container className="flex flex-col items-center gap-4 text-center">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-title text-foreground max-w-xl font-semibold"
        >
          {PROCESS_CONTENT.headline}
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-muted-foreground text-body max-w-2xl"
        >
          {PROCESS_CONTENT.subheadline}
        </motion.p>
      </Container>

      {/* Desktop: horizontal timeline */}
      <Container className="mt-20 hidden md:block">
        <div className="relative grid grid-cols-6 gap-4">
          <div className="bg-border absolute top-6 right-0 left-0 h-px" aria-hidden="true" />
          {PROCESS_STEPS.map((step, i) => {
            const Icon = STEP_ICONS[step.icon];
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group flex flex-col items-center gap-3 text-center"
              >
                <span className="bg-card border-border group-hover:border-primary group-hover:text-primary relative z-10 flex size-12 items-center justify-center rounded-full border transition-colors">
                  <Icon className="size-5" />
                </span>
                <div>
                  <p className="text-foreground text-sm font-medium">{step.title}</p>
                  <p className="text-muted-foreground mt-1 text-xs">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>

      {/* Mobile: vertical cards */}
      <Container className="mt-12 flex flex-col gap-4 md:hidden">
        {PROCESS_STEPS.map((step) => {
          const Icon = STEP_ICONS[step.icon];
          return (
            <div
              key={step.title}
              className="border-border flex items-start gap-4 rounded-lg border p-4"
            >
              <span className="bg-muted text-primary flex size-10 shrink-0 items-center justify-center rounded-full">
                <Icon className="size-4" />
              </span>
              <div>
                <p className="text-foreground text-sm font-medium">{step.title}</p>
                <p className="text-muted-foreground mt-1 text-xs">{step.description}</p>
              </div>
            </div>
          );
        })}
      </Container>
    </section>
  );
}
