"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Play } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { fadeUp } from "@/config/animations";
import {
  DEMO_CONNECTIONS,
  DEMO_CONTENT,
  DEMO_NODES,
  DEMO_STEP_DURATION_MS,
  DEMO_TIMELINE,
  type DemoNodeId,
  type DemoNodeStatus,
} from "@/features/interactive-demo/constants";
import { DemoNode } from "@/features/interactive-demo/DemoNode";

const IDLE_STATUSES: Record<DemoNodeId, DemoNodeStatus> = {
  whatsapp: "idle",
  ia: "idle",
  crm: "idle",
  agenda: "idle",
  dashboard: "idle",
};

export function InteractiveDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const whatsappRef = useRef<HTMLDivElement>(null);
  const iaRef = useRef<HTMLDivElement>(null);
  const crmRef = useRef<HTMLDivElement>(null);
  const agendaRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);

  const nodeRefs: Record<DemoNodeId, React.RefObject<HTMLDivElement | null>> = {
    whatsapp: whatsappRef,
    ia: iaRef,
    crm: crmRef,
    agenda: agendaRef,
    dashboard: dashboardRef,
  };

  const [statuses, setStatuses] = useState<Record<DemoNodeId, DemoNodeStatus>>(IDLE_STATUSES);
  const [message, setMessage] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  function clearTimers() {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }

  function reset() {
    clearTimers();
    setStatuses(IDLE_STATUSES);
    setMessage(null);
    setRunning(false);
  }

  function run() {
    reset();
    setRunning(true);
    let elapsed = 0;

    DEMO_TIMELINE.forEach((step, i) => {
      const id = setTimeout(() => {
        setStatuses((prev) => {
          const next = { ...prev };
          if (i > 0) DEMO_TIMELINE[i - 1].nodes.forEach((n) => (next[n] = "success"));
          step.nodes.forEach((n) => (next[n] = "processing"));
          return next;
        });
        setMessage(step.message);
      }, elapsed);
      timeoutsRef.current.push(id);
      elapsed += DEMO_STEP_DURATION_MS;
    });

    const finalId = setTimeout(() => {
      setStatuses((prev) => {
        const next = { ...prev };
        DEMO_TIMELINE[DEMO_TIMELINE.length - 1].nodes.forEach((n) => (next[n] = "success"));
        return next;
      });
      setRunning(false);
    }, elapsed);
    timeoutsRef.current.push(finalId);
  }

  useEffect(() => clearTimers, []);

  const hasRun = message !== null;

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
          {DEMO_CONTENT.headline}
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-muted-foreground text-body max-w-2xl"
        >
          {DEMO_CONTENT.subheadline}
        </motion.p>
      </Container>

      <Container className="mt-16 flex flex-col items-center gap-10">
        <div ref={containerRef} className="relative flex flex-col items-center gap-10">
          <DemoNode node={DEMO_NODES[0]} ref={whatsappRef} status={statuses.whatsapp} />
          <DemoNode node={DEMO_NODES[1]} ref={iaRef} status={statuses.ia} />
          <DemoNode node={DEMO_NODES[2]} ref={crmRef} status={statuses.crm} />
          <div className="flex gap-16">
            <DemoNode node={DEMO_NODES[3]} ref={agendaRef} status={statuses.agenda} />
            <DemoNode node={DEMO_NODES[4]} ref={dashboardRef} status={statuses.dashboard} />
          </div>

          {DEMO_CONNECTIONS.map(([from, to]) => (
            <AnimatedBeam
              key={`${from}-${to}`}
              containerRef={containerRef}
              fromRef={nodeRefs[from]}
              toRef={nodeRefs[to]}
              pathColor="var(--border)"
              pathOpacity={0.3}
              gradientStartColor="#6C63FF"
              gradientStopColor="#8B5CF6"
              duration={2.5}
              repeat={running ? Infinity : 0}
            />
          ))}
        </div>

        <p className="text-muted-foreground text-description h-5">{message}</p>

        <Button onClick={run} disabled={running} isLoading={running}>
          {!running && <Play className="size-4" />}
          {hasRun ? "Executar novamente" : DEMO_CONTENT.cta}
        </Button>
      </Container>
    </section>
  );
}
