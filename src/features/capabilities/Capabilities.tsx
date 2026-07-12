"use client";

import { motion } from "motion/react";
import { BarChart3, Bot, Check, Code2, Plug, Users, Workflow, type LucideIcon } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { fadeUp } from "@/config/animations";
import { CAPABILITIES_CONTENT, CAPABILITY_CARDS } from "@/features/capabilities/constants";

const CARD_ICONS: Record<string, LucideIcon> = {
  code: Code2,
  bot: Bot,
  users: Users,
  workflow: Workflow,
  plug: Plug,
  "bar-chart-3": BarChart3,
};

export function Capabilities() {
  return (
    <section className="py-24 md:py-32">
      <Container className="flex flex-col items-center gap-4 text-center">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-title text-foreground max-w-xl font-semibold"
        >
          {CAPABILITIES_CONTENT.headline}
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-muted-foreground text-body max-w-2xl"
        >
          {CAPABILITIES_CONTENT.subheadline}
        </motion.p>
      </Container>

      <Container className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2">
        {CAPABILITY_CARDS.map((card, i) => {
          const Icon = CARD_ICONS[card.icon];
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="group border-border hover:border-primary/40 hover:bg-card/60 flex flex-col gap-4 rounded-xl border p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="bg-muted group-hover:bg-primary group-hover:text-primary-foreground flex size-10 items-center justify-center rounded-lg transition-all duration-300 group-hover:rotate-3">
                <Icon className="size-5" />
              </span>
              <div>
                <h3 className="text-foreground font-medium">{card.title}</h3>
                <p className="text-muted-foreground text-description mt-1">{card.description}</p>
              </div>
              <ul className="mt-auto flex flex-wrap gap-x-4 gap-y-1.5">
                {card.tags.map((tag) => (
                  <li key={tag} className="text-muted-foreground flex items-center gap-1.5 text-xs">
                    <Check className="text-primary size-3.5" />
                    {tag}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </Container>
    </section>
  );
}
