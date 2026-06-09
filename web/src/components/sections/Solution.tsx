"use client";

import { m } from "framer-motion";
import {
  BellRing,
  Globe,
  Lock,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { LogoMark } from "@/components/ui/Logo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { EASE } from "@/lib/utils";

export function Solution() {
  return (
    <section aria-labelledby="solution-title" className="relative py-24 md:py-36">
      <div aria-hidden className="hairline-h absolute inset-x-0 top-0" />
      <div
        aria-hidden
        className="animate-aurora absolute left-1/2 top-0 -z-10 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-iris/[0.07] blur-[130px]"
      />
      <div className="container-x">
        <SectionHeading
          titleId="solution-title"
          eyebrow="The solution"
          title={
            <>
              One lens for your entire
              <br />
              <span className="text-iris-glow">revenue engine.</span>
            </>
          }
          sub="Prism plugs into your stack, builds a live model of every deal, dollar, and signal — then keeps it current to the millisecond."
        />

        <Stagger className="grid gap-5 lg:grid-cols-6">
          {/* ---- A · live revenue model ---- */}
          <StaggerItem className="lg:col-span-4 lg:row-span-2">
            <GlassCard className="flex h-full flex-col p-7 md:p-9">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-medium tracking-tight text-fg">
                    A live model, not a report
                  </h3>
                  <p className="mt-2 max-w-md text-[15px] leading-relaxed text-muted">
                    Every deal, invoice, and product event reconciled into one
                    moving picture of revenue — recalculated 24/7.
                  </p>
                </div>
                <span className="glass hidden shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-xs text-mint sm:inline-flex">
                  <span className="animate-pulse-dot size-1.5 rounded-full bg-mint" />
                  Live
                </span>
              </div>

              <div className="mt-8 flex flex-1 flex-col justify-end">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "ARR", value: "$24.8M" },
                    { label: "Net new, Q3", value: "$3.42M" },
                    { label: "Forecast Δ", value: "±1.8%" },
                  ].map((kpi) => (
                    <div key={kpi.label}>
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                        {kpi.label}
                      </p>
                      <p className="mt-1 text-lg font-semibold tabular-nums tracking-tight text-fg md:text-2xl">
                        {kpi.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* animated revenue curve */}
                <svg viewBox="0 0 600 160" className="mt-6 h-36 w-full" aria-hidden>
                  <defs>
                    <linearGradient id="rev-line" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0" stopColor="#6e66ff" />
                      <stop offset="1" stopColor="#22d3ee" />
                    </linearGradient>
                    <linearGradient id="rev-fill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#6e66ff" stopOpacity="0.22" />
                      <stop offset="1" stopColor="#6e66ff" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <m.path
                    d="M0 150 C60 138 90 126 140 120 S230 108 280 92 S380 70 430 56 S540 28 600 14 L600 160 L0 160 Z"
                    fill="url(#rev-fill)"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.7 }}
                  />
                  <m.path
                    d="M0 150 C60 138 90 126 140 120 S230 108 280 92 S380 70 430 56 S540 28 600 14"
                    fill="none"
                    stroke="url(#rev-line)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.8, delay: 0.25, ease: EASE }}
                  />
                </svg>
              </div>
            </GlassCard>
          </StaggerItem>

          {/* ---- B · AI forecasting ---- */}
          <StaggerItem className="lg:col-span-2">
            <GlassCard className="flex h-full flex-col p-7">
              <div className="mb-5 flex size-10 items-center justify-center rounded-xl border border-iris/25 bg-iris/10 text-iris">
                <Sparkles aria-hidden className="size-5" strokeWidth={1.75} />
              </div>
              <h3 className="text-lg font-medium tracking-tight text-fg">
                Forecasts that explain themselves
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Win probabilities with drivers attached — never a black box.
              </p>
              <div className="mt-6 flex flex-1 items-end gap-2" aria-hidden>
                {[34, 52, 44, 68, 60, 82, 74, 92].map((h, i) => (
                  <m.span
                    key={i}
                    className="w-full rounded-t-sm bg-gradient-to-t from-iris/25 to-iris"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    style={{ height: `${h}%`, transformOrigin: "bottom" }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.06, ease: EASE }}
                  />
                ))}
              </div>
            </GlassCard>
          </StaggerItem>

          {/* ---- C · integrations orbit ---- */}
          <StaggerItem className="lg:col-span-2">
            <GlassCard className="flex h-full flex-col p-7">
              <h3 className="text-lg font-medium tracking-tight text-fg">
                60+ integrations, 5-minute setup
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                CRM, billing, warehouse, product — native and two-way.
              </p>
              <div
                aria-hidden
                className="relative mx-auto mt-6 flex size-44 items-center justify-center"
              >
                <span className="absolute size-20 rounded-full border border-line" />
                <span className="absolute size-32 rounded-full border border-line" />
                <span className="absolute size-44 rounded-full border border-line" />
                <LogoMark className="size-8" />
                {[
                  { r: "2.5rem", d: "9s", label: "S", delay: "0s" },
                  { r: "4rem", d: "13s", label: "H", delay: "-4s" },
                  { r: "5.5rem", d: "17s", label: "W", delay: "-9s" },
                  { r: "4rem", d: "13s", label: "B", delay: "-10.5s" },
                ].map((dot, i) => (
                  <span
                    key={i}
                    className="animate-orbit absolute flex size-7 items-center justify-center rounded-full border border-white/15 bg-surface font-mono text-[10px] font-semibold text-muted"
                    style={
                      {
                        "--orbit-r": dot.r,
                        animationDuration: dot.d,
                        animationDelay: dot.delay,
                      } as React.CSSProperties
                    }
                  >
                    {dot.label}
                  </span>
                ))}
              </div>
            </GlassCard>
          </StaggerItem>

          {/* ---- D · anomaly alerts ---- */}
          <StaggerItem className="lg:col-span-3">
            <GlassCard className="h-full p-7">
              <div className="mb-5 flex size-10 items-center justify-center rounded-xl border border-cyan/25 bg-cyan/10 text-cyan">
                <BellRing aria-hidden className="size-5" strokeWidth={1.75} />
              </div>
              <h3 className="text-lg font-medium tracking-tight text-fg">
                Know the moment a deal goes quiet
              </h3>
              <ul className="mt-5 space-y-2.5">
                {[
                  { tone: "bg-rose", text: "Acme Corp · champion inactive 9 days", time: "2m" },
                  { tone: "bg-mint", text: "Borealis · security review cleared", time: "1h" },
                  { tone: "bg-cyan", text: "Cobalt AI · usage spike +340%", time: "3h" },
                ].map((alert) => (
                  <li
                    key={alert.text}
                    className="flex items-center gap-3 rounded-xl border border-line bg-white/[0.025] px-4 py-3 text-[13px] text-muted"
                  >
                    <span className={`size-1.5 shrink-0 rounded-full ${alert.tone}`} />
                    <span className="truncate">{alert.text}</span>
                    <span className="ml-auto shrink-0 font-mono text-[11px] text-faint">
                      {alert.time}
                    </span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </StaggerItem>

          {/* ---- E · enterprise trust ---- */}
          <StaggerItem className="lg:col-span-3">
            <GlassCard className="flex h-full flex-col p-7">
              <div className="mb-5 flex size-10 items-center justify-center rounded-xl border border-mint/25 bg-mint/10 text-mint">
                <ShieldCheck aria-hidden className="size-5" strokeWidth={1.75} />
              </div>
              <h3 className="text-lg font-medium tracking-tight text-fg">
                Enterprise-grade by default
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                The controls your security team will ask about — already on.
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {[
                  { icon: ShieldCheck, label: "SOC 2 Type II" },
                  { icon: Lock, label: "SSO / SAML" },
                  { icon: Users, label: "RBAC" },
                  { icon: Globe, label: "EU / US residency" },
                  { icon: ShieldCheck, label: "GDPR" },
                ].map((chip) => (
                  <li
                    key={chip.label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.03] px-3 py-1.5 text-xs text-muted"
                  >
                    <chip.icon aria-hidden className="size-3.5 text-mint/80" strokeWidth={1.75} />
                    {chip.label}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
