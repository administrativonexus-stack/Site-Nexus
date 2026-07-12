"use client";

import Link from "next/link";
import { motion } from "motion/react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { fadeUp } from "@/config/animations";
import { PORTFOLIO_CONTENT, type Project } from "@/features/portfolio/constants";
import { ProjectCard } from "@/features/portfolio/ProjectCard";

export function PortfolioSection({ projects }: { projects: Project[] }) {
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
          {PORTFOLIO_CONTENT.headline}
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-muted-foreground text-body max-w-2xl"
        >
          {PORTFOLIO_CONTENT.subheadline}
        </motion.p>
      </Container>

      <Container className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </Container>

      <div className="mt-12 flex justify-center">
        <Button variant="outline" render={<Link href="/portfolio" />}>
          Ver todos os projetos
        </Button>
      </div>
    </section>
  );
}
