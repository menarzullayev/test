"use client";

import {
  BellRing,
  ChartColumn,
  GitBranch,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { FEATURES } from "@/lib/data";

const ICONS = {
  sparkles: Sparkles,
  zap: Zap,
  chart: ChartColumn,
  bell: BellRing,
  branch: GitBranch,
  shield: ShieldCheck,
} as const;

export function Features() {
  return (
    <section id="features" aria-labelledby="features-title" className="relative scroll-mt-24 py-24 md:py-36">
      <div aria-hidden className="hairline-h absolute inset-x-0 top-0" />
      <div className="container-x">
        <SectionHeading
          titleId="features-title"
          eyebrow="Capabilities"
          title={
            <>
              Everything a revenue team needs.
              <br />
              <span className="text-muted">Nothing it doesn&apos;t.</span>
            </>
          }
          sub="Six capabilities, one coherent system — designed to replace the spreadsheet sprawl, not add to it."
        />

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = ICONS[feature.icon as keyof typeof ICONS];
            return (
              <StaggerItem key={feature.title}>
                <GlassCard className="group h-full p-7">
                  <div className="mb-12 flex size-11 items-center justify-center rounded-xl border border-iris/20 bg-iris/[0.08] text-iris transition-all duration-500 group-hover:border-iris/45 group-hover:bg-iris/[0.16] group-hover:shadow-[0_0_24px_-4px_rgba(110,102,255,0.5)]">
                    <Icon aria-hidden className="size-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-lg font-medium tracking-tight text-fg">
                    {feature.title}
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-muted">
                    {feature.body}
                  </p>
                </GlassCard>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
