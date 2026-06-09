"use client";

import { AnimatePresence, m } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowIcon } from "@/components/ui/Button";
import { FAQS } from "@/lib/data";
import { EASE, cn } from "@/lib/utils";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" aria-labelledby="faq-title" className="relative scroll-mt-24 py-24 md:py-36">
      <div aria-hidden className="hairline-h absolute inset-x-0 top-0" />
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        {/* left rail */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <p className="mb-4 flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-iris">
              <span aria-hidden className="inline-block size-1.5 rotate-45 bg-gradient-to-br from-iris to-cyan" />
              FAQ
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="faq-title"
              className="text-balance text-4xl font-semibold leading-[1.06] tracking-[-0.025em] text-fg md:text-5xl"
            >
              Answers, before you even ask.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 text-pretty leading-relaxed text-muted">
              Anything else? Our team replies within one business day — usually
              much faster.
            </p>
            <a
              href="#book-demo"
              className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-fg transition-colors hover:text-iris"
            >
              Talk to a human
              <ArrowIcon />
            </a>
          </Reveal>
        </div>

        {/* accordion */}
        <Reveal delay={0.1}>
          <div className="divide-y divide-line border-y border-line">
            {FAQS.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div key={faq.q}>
                  <h3>
                    <button
                      type="button"
                      id={`faq-btn-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                    >
                      <span
                        className={cn(
                          "text-[15px] font-medium leading-snug transition-colors duration-300 md:text-base",
                          isOpen ? "text-fg" : "text-fg/80 group-hover:text-fg"
                        )}
                      >
                        {faq.q}
                      </span>
                      <m.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className={cn(
                          "flex size-7 shrink-0 items-center justify-center rounded-full border transition-colors duration-300",
                          isOpen
                            ? "border-iris/40 bg-iris/10 text-iris"
                            : "border-line text-faint group-hover:border-white/20 group-hover:text-muted"
                        )}
                      >
                        <Plus aria-hidden className="size-4" strokeWidth={1.75} />
                      </m.span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <m.div
                        id={`faq-panel-${i}`}
                        role="region"
                        aria-labelledby={`faq-btn-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-7 text-[15px] leading-relaxed text-muted">
                          {faq.a}
                        </p>
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
