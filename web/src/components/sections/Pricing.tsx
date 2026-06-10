"use client";

import { AnimatePresence, m } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { PRICING } from "@/lib/data";
import { EASE, cn } from "@/lib/utils";

export function Pricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" aria-labelledby="pricing-title" className="relative scroll-mt-24 py-24 md:py-36">
      <div aria-hidden className="hairline-h absolute inset-x-0 top-0" />
      <div
        aria-hidden
        className="animate-aurora absolute left-1/2 top-24 -z-10 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-violet/[0.08] blur-[130px]"
      />
      <div className="container-x">
        <SectionHeading
          titleId="pricing-title"
          eyebrow="Pricing"
          title="Start free. Scale when it works."
          sub="Every plan starts with a 14-day pilot on your real data — no credit card, no procurement maze."
        />

        {/* billing toggle */}
        <div className="mb-12 flex items-center justify-center gap-3">
          <button
            type="button"
            aria-pressed={!annual}
            onClick={() => setAnnual(false)}
            className={cn(
              "text-sm font-medium transition-colors",
              !annual ? "text-fg" : "text-faint hover:text-muted"
            )}
          >
            Monthly
          </button>
          <button
            type="button"
            role="switch"
            aria-checked={annual}
            aria-label="Bill annually"
            onClick={() => setAnnual((v) => !v)}
            className="glass relative h-7 w-12 rounded-full transition-colors"
          >
            <m.span
              layout
              transition={{ type: "spring", stiffness: 500, damping: 34 }}
              className={cn(
                "absolute top-1 size-5 rounded-full bg-gradient-to-br from-iris to-cyan",
                annual ? "left-6" : "left-1"
              )}
            />
          </button>
          <button
            type="button"
            aria-pressed={annual}
            onClick={() => setAnnual(true)}
            className={cn(
              "text-sm font-medium transition-colors",
              annual ? "text-fg" : "text-faint hover:text-muted"
            )}
          >
            Annual
            <span className="ml-1.5 rounded-full bg-mint/10 px-2 py-0.5 text-[11px] font-semibold text-mint">
              −20%
            </span>
          </button>
        </div>

        <Stagger className="grid items-stretch gap-5 lg:grid-cols-3">
          {PRICING.map((tier) => {
            const price = tier.monthly === null ? null : annual ? tier.annual : tier.monthly;
            const inner = (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium tracking-tight text-fg">{tier.name}</h3>
                  {tier.popular && (
                    <span className="rounded-full bg-gradient-to-r from-iris to-violet px-3 py-1 text-[11px] font-semibold text-white shadow-[0_0_20px_-4px_rgba(110,102,255,0.8)]">
                      Most popular
                    </span>
                  )}
                </div>
                <p className="mt-2 min-h-10 text-sm leading-relaxed text-muted">{tier.blurb}</p>

                <div className="mt-6 flex h-14 items-end gap-1.5">
                  {price === null ? (
                    <span className="text-4xl font-semibold tracking-tight text-fg">Custom</span>
                  ) : (
                    <>
                      <span className="overflow-hidden text-4xl font-semibold tabular-nums tracking-tight text-fg">
                        <AnimatePresence mode="popLayout" initial={false}>
                          <m.span
                            key={price}
                            initial={{ y: 22, opacity: 0, filter: "blur(5px)" }}
                            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                            exit={{ y: -22, opacity: 0, filter: "blur(5px)" }}
                            transition={{ duration: 0.45, ease: EASE }}
                            className="inline-block"
                          >
                            ${price}
                          </m.span>
                        </AnimatePresence>
                      </span>
                      <span className="pb-1.5 text-sm text-faint">/ seat / mo</span>
                    </>
                  )}
                </div>
                <p className="mt-1 h-4 text-xs text-faint">
                  {price !== null && (annual ? "billed annually" : "billed monthly")}
                </p>

                <ul className="mt-7 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-muted">
                      <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-mint" strokeWidth={2} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-2">
                  <Button
                    href="#book-demo"
                    variant={tier.popular ? "primary" : "secondary"}
                    magnetic={tier.popular}
                    className="w-full"
                  >
                    {tier.cta}
                  </Button>
                </div>
              </>
            );

            return (
              <StaggerItem key={tier.name} className={cn(tier.popular && "lg:-my-3")}>
                {tier.popular ? (
                  <div className="relative h-full rounded-3xl bg-gradient-to-b from-iris/70 via-violet/40 to-cyan/30 p-px shadow-[0_24px_90px_-30px_rgba(110,102,255,0.5)]">
                    {/* solid dark interior so the gradient reads as a border */}
                    <div className="flex h-full flex-col rounded-[calc(1.5rem-1px)] bg-ink p-8">
                      {inner}
                    </div>
                  </div>
                ) : (
                  <GlassCard className="flex h-full flex-col p-8">{inner}</GlassCard>
                )}
              </StaggerItem>
            );
          })}
        </Stagger>

        <p className="mt-10 text-center text-sm text-faint">
          Questions about volume pricing or migrations?{" "}
          <a href="#faq" className="text-muted underline decoration-line underline-offset-4 transition-colors hover:text-fg">
            Read the FAQ
          </a>{" "}
          or talk to us.
        </p>
      </div>
    </section>
  );
}
