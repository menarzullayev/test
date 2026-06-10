"use client";

import { Dices, Hourglass, Unplug } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { PROBLEMS } from "@/lib/data";

const ICONS = {
  unplug: Unplug,
  hourglass: Hourglass,
  dices: Dices,
} as const;

export function Problem() {
  return (
    <section aria-labelledby="problem-title" className="relative py-24 md:py-36">
      <div aria-hidden className="hairline-h absolute inset-x-0 top-0" />
      <div className="container-x">
        <SectionHeading
          titleId="problem-title"
          eyebrow="The problem"
          title={
            <>
              Your data is everywhere.
              <br />
              <span className="text-muted">Your answers are nowhere.</span>
            </>
          }
          sub="Modern go-to-market stacks scatter the truth across a dozen tools. By the time it reaches a dashboard, it's already history."
        />

        <Stagger className="grid gap-5 md:grid-cols-3">
          {PROBLEMS.map((problem) => {
            const Icon = ICONS[problem.icon as keyof typeof ICONS];
            return (
              <StaggerItem key={problem.title}>
                <GlassCard className="group h-full p-7">
                  <div className="mb-14 flex size-11 items-center justify-center rounded-xl border border-rose/20 bg-rose/[0.07] text-rose transition-colors duration-500 group-hover:border-rose/40 group-hover:bg-rose/[0.14]">
                    <Icon aria-hidden className="size-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-lg font-medium tracking-tight text-fg">
                    {problem.title}
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-muted">
                    {problem.body}
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
