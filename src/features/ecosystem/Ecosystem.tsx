"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";

import { Container } from "@/components/layout/Container";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { fadeUp } from "@/config/animations";
import {
  ECOSYSTEM_CONNECTIONS,
  ECOSYSTEM_CONTENT,
  ECOSYSTEM_NODES,
  type EcosystemNodeId,
} from "@/features/ecosystem/constants";
import { EcosystemNode } from "@/features/ecosystem/EcosystemNode";

const GRID_TEMPLATE = {
  gridTemplateAreas: `"whatsapp ai" "crm crm" "calendar dashboard" "automation automation"`,
  gridTemplateColumns: "1fr 1fr",
};

export function Ecosystem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const whatsappRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<HTMLDivElement>(null);
  const crmRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const automationRef = useRef<HTMLDivElement>(null);

  const nodeRefs: Record<EcosystemNodeId, React.RefObject<HTMLDivElement | null>> = {
    whatsapp: whatsappRef,
    ai: aiRef,
    crm: crmRef,
    calendar: calendarRef,
    dashboard: dashboardRef,
    automation: automationRef,
  };

  const [hovered, setHovered] = useState<EcosystemNodeId | null>(null);

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
          {ECOSYSTEM_CONTENT.headline}
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-muted-foreground text-body max-w-2xl"
        >
          {ECOSYSTEM_CONTENT.subheadline}
        </motion.p>
      </Container>

      <Container className="mt-16">
        <div
          ref={containerRef}
          className="relative mx-auto hidden max-w-2xl grid-cols-2 gap-6 md:grid"
          style={GRID_TEMPLATE}
        >
          {ECOSYSTEM_NODES.map((node) => (
            <EcosystemNode
              key={node.id}
              node={node}
              ref={nodeRefs[node.id]}
              active={hovered === null || hovered === node.id}
              onHoverChange={(hovering) => setHovered(hovering ? node.id : null)}
            />
          ))}

          {ECOSYSTEM_CONNECTIONS.map(([from, to]) => {
            const isHighlighted = hovered === from || hovered === to;
            const isDimmed = hovered !== null && !isHighlighted;
            return (
              <AnimatedBeam
                key={`${from}-${to}`}
                containerRef={containerRef}
                fromRef={nodeRefs[from]}
                toRef={nodeRefs[to]}
                pathColor="var(--border)"
                pathOpacity={isDimmed ? 0.08 : 0.3}
                gradientStartColor="#E6F101"
                gradientStopColor="#00C0D4"
                pathWidth={isHighlighted ? 2.5 : 1.5}
                duration={4}
              />
            );
          })}
        </div>

        <div className="mx-auto flex max-w-sm flex-col gap-3 md:hidden">
          {[
            ECOSYSTEM_NODES.find((n) => n.id === "crm")!,
            ECOSYSTEM_NODES.find((n) => n.id === "ai")!,
            ECOSYSTEM_NODES.find((n) => n.id === "whatsapp")!,
            ECOSYSTEM_NODES.find((n) => n.id === "calendar")!,
            ECOSYSTEM_NODES.find((n) => n.id === "dashboard")!,
            ECOSYSTEM_NODES.find((n) => n.id === "automation")!,
          ].map((node) => (
            <EcosystemNode key={node.id} node={node} active onHoverChange={() => {}} />
          ))}
        </div>
      </Container>
    </section>
  );
}
