"use client";

import Link from "next/link";
import { motion } from "motion/react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { fadeUp } from "@/config/animations";
import { CTA_CONTENT } from "@/features/cta/constants";

export function Cta() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="border-border bg-card/40 flex flex-col items-center gap-6 rounded-2xl border px-6 py-16 text-center"
        >
          <h2 className="text-title text-foreground max-w-xl font-semibold">
            {CTA_CONTENT.headline}
          </h2>
          <p className="text-muted-foreground text-body max-w-md">{CTA_CONTENT.subheadline}</p>
          <Button render={<Link href={CTA_CONTENT.cta.href} />}>{CTA_CONTENT.cta.label}</Button>
        </motion.div>
      </Container>
    </section>
  );
}
