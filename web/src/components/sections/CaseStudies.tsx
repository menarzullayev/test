"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { Counter } from "@/components/ui/Counter";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ArrowIcon } from "@/components/ui/Button";
import { CASE_STUDIES } from "@/lib/data";
import { cn } from "@/lib/utils";

const ACCENTS = {
  iris: {
    text: "text-iris",
    ring: "from-iris/80 to-violet/60",
    border: "hover:border-iris/30",
  },
  cyan: {
    text: "text-cyan",
    ring: "from-cyan/80 to-iris/60",
    border: "hover:border-cyan/30",
  },
  mint: {
    text: "text-mint",
    ring: "from-mint/80 to-cyan/60",
    border: "hover:border-mint/30",
  },
} as const;

export function CaseStudies() {
  return (
    <section id="customers" aria-labelledby="customers-title" className="relative scroll-mt-24 py-24 md:py-36">
      <div aria-hidden className="hairline-h absolute inset-x-0 top-0" />
      <div className="container-x">
        <SectionHeading
          titleId="customers-title"
          eyebrow="Customers"
          title={
            <>
              Teams that stopped guessing.
            </>
          }
          sub="Real numbers from teams who replaced spreadsheet forecasting with a live revenue model."
        />

        <Stagger className="grid gap-5 lg:grid-cols-3">
          {CASE_STUDIES.map((cs) => {
            const accent = ACCENTS[cs.accent as keyof typeof ACCENTS];
            const initials = cs.person
              .split(" ")
              .map((n) => n[0])
              .join("");
            return (
              <StaggerItem key={cs.company}>
                <GlassCard className={cn("flex h-full flex-col p-7", accent.border)}>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold tracking-tight text-fg">
                      {cs.company}
                    </span>
                    <span className="rounded-full border border-line px-2.5 py-1 text-[11px] text-faint">
                      {cs.industry}
                    </span>
                  </div>

                  <div className="mt-8">
                    <p
                      className={cn(
                        "text-5xl font-semibold tabular-nums tracking-tight",
                        accent.text
                      )}
                    >
                      {cs.metricPrefix}
                      <Counter to={cs.metric} decimals={cs.metric % 1 === 0 ? 0 : 1} />
                      {cs.metricSuffix}
                    </p>
                    <p className="mt-1.5 text-sm text-faint">{cs.metricLabel}</p>
                  </div>

                  <blockquote className="mt-7 flex-1">
                    <p className="text-pretty text-[15px] leading-relaxed text-muted">
                      &ldquo;{cs.quote}&rdquo;
                    </p>
                  </blockquote>

                  <figcaption className="mt-7 flex items-center gap-3 border-t border-line pt-5">
                    <span
                      aria-hidden
                      className={cn(
                        "flex size-9 items-center justify-center rounded-full bg-gradient-to-br text-xs font-semibold text-white",
                        accent.ring
                      )}
                    >
                      {initials}
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-fg">{cs.person}</span>
                      <span className="block text-xs text-faint">{cs.role}</span>
                    </span>
                    <span className="group ml-auto inline-flex items-center gap-1 text-xs font-medium text-muted transition-colors hover:text-fg">
                      Read story
                      <ArrowIcon className="size-3.5" />
                    </span>
                  </figcaption>
                </GlassCard>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
