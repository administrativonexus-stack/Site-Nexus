"use client";

import { motion } from "motion/react";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import SplitText from "@/components/animations/SplitText";
import { fadeUp } from "@/config/animations";
import { HERO_CONTENT } from "@/features/hero/constants";
import { HeroBackground } from "@/features/hero/HeroBackground";
import { HeroMockup } from "@/features/hero/HeroMockup";
import { ScrollIndicator } from "@/features/hero/ScrollIndicator";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

export function Hero() {
  return (
    <section className="relative -mt-20 flex min-h-screen items-center overflow-hidden">
      <HeroBackground />

      <Container className="relative grid grid-cols-1 items-center gap-16 py-32 md:grid-cols-[45%_55%]">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={container}
          className="flex flex-col items-start gap-6"
        >
          <motion.div variants={fadeUp}>
            <SplitText
              text={HERO_CONTENT.headline}
              tag="h1"
              textAlign="left"
              className="text-hero text-foreground max-w-lg leading-[1.05] font-semibold"
              splitType="words"
              delay={40}
            />
          </motion.div>

          <motion.p variants={fadeUp} className="text-muted-foreground text-body max-w-md">
            {HERO_CONTENT.subheadline}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <Button render={<Link href={HERO_CONTENT.primaryCta.href} />}>
              {HERO_CONTENT.primaryCta.label}
            </Button>
            <Button variant="outline" render={<Link href={HERO_CONTENT.secondaryCta.href} />}>
              {HERO_CONTENT.secondaryCta.label}
            </Button>
          </motion.div>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="visible">
          <HeroMockup />
        </motion.div>
      </Container>

      <ScrollIndicator />
    </section>
  );
}
