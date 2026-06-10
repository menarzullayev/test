"use client";

import { AnimatePresence, m, useScroll, useTransform } from "framer-motion";
import { CircleCheck } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { ArrowIcon } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { EASE } from "@/lib/utils";

/**
 * Conversion finale: scroll-scrubbed headline + inline demo-booking form.
 * (Demo build — the form celebrates locally instead of POSTing anywhere.)
 */
export function CtaFooter() {
  const ref = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0.4, 1]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      ref={ref}
      id="book-demo"
      aria-labelledby="cta-title"
      className="relative scroll-mt-24 overflow-hidden py-28 md:py-44"
    >
      <div aria-hidden className="hairline-h absolute inset-x-0 top-0" />

      {/* concentric signal rings + glow */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {[300, 520, 760, 1020].map((d) => (
            <span
              key={d}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.05]"
              style={{ width: d, height: d }}
            />
          ))}
        </div>
        <div className="animate-aurora absolute left-1/2 top-1/2 h-[420px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-iris/[0.13] blur-[130px]" />
      </div>

      <m.div style={{ scale, opacity }} className="container-x text-center">
        <h2
          id="cta-title"
          className="mx-auto max-w-3xl text-balance text-5xl font-semibold leading-[1.04] tracking-[-0.035em] text-fg md:text-7xl"
        >
          Ready to see <span className="text-spectrum">clearly?</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted">
          Join 12,000+ teams running revenue on Prism. Your first live forecast
          is about 60 minutes away.
        </p>

        <div className="mx-auto mt-10 max-w-md">
          <AnimatePresence mode="wait">
            {submitted ? (
              <m.p
                key="done"
                role="status"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="glass inline-flex items-center gap-2.5 rounded-full px-5 py-3.5 text-sm text-fg"
              >
                <CircleCheck aria-hidden className="size-5 text-mint" />
                Thanks — we&apos;ll reach out within one business day.
              </m.p>
            ) : (
              <m.form
                key="form"
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                onSubmit={onSubmit}
                className="glass flex flex-col gap-2 rounded-2xl p-2 sm:flex-row sm:rounded-full"
              >
                <label htmlFor="cta-email" className="sr-only">
                  Work email
                </label>
                <input
                  id="cta-email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  autoComplete="email"
                  className="h-11 flex-1 rounded-full bg-transparent px-5 text-[15px] text-fg placeholder:text-faint focus:outline-none"
                />
                <Magnetic strength={0.25}>
                  <button
                    type="submit"
                    className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-medium tracking-tight text-ink transition-shadow duration-300 hover:shadow-[0_8px_44px_-8px_rgba(110,102,255,0.65)] sm:w-auto"
                  >
                    Book a demo
                    <ArrowIcon />
                  </button>
                </Magnetic>
              </m.form>
            )}
          </AnimatePresence>
          <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
            14-day pilot&ensp;·&ensp;No credit card&ensp;·&ensp;Cancel anytime
          </p>
        </div>
      </m.div>
    </section>
  );
}
