"use client";

import { AnimatePresence, m, useReducedMotion, useSpring } from "framer-motion";
import {
  Activity,
  Inbox,
  LayoutDashboard,
  Search,
  Settings,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { DEMO_TABS } from "@/lib/data";
import { EASE, cn } from "@/lib/utils";

const TILT = { stiffness: 120, damping: 18, mass: 0.4 };

export function ProductDemo() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduced = useReducedMotion();

  // Cursor-tracked tilt on the dashboard shell.
  const rx = useSpring(0, TILT);
  const ry = useSpring(0, TILT);
  function onTilt(e: PointerEvent<HTMLDivElement>) {
    if (reduced || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(nx * 7);
    rx.set(ny * -7);
  }
  function resetTilt() {
    rx.set(0);
    ry.set(0);
  }

  // Roving-tabindex keyboard support.
  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const last = DEMO_TABS.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next !== null) {
      e.preventDefault();
      setActive(next);
      tabRefs.current[next]?.focus();
    }
  }

  const tab = DEMO_TABS[active];

  return (
    <section id="product" aria-labelledby="demo-title" className="relative scroll-mt-24 py-24 md:py-36">
      <div aria-hidden className="hairline-h absolute inset-x-0 top-0" />
      <div className="container-x">
        <SectionHeading
          titleId="demo-title"
          eyebrow="Product"
          title={
            <>
              Mission control,
              <br />
              not another dashboard.
            </>
          }
          sub="Four views, one model. Click through the live demo — every number traces back to a source system."
        />

        {/* ---- tabs ---- */}
        <Reveal className="mb-8 flex justify-center">
          <div
            role="tablist"
            aria-label="Product views"
            onKeyDown={onKeyDown}
            className="glass flex flex-wrap justify-center gap-1 rounded-full p-1"
          >
            {DEMO_TABS.map((t, i) => (
              <button
                key={t.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={active === i}
                aria-controls={`panel-${t.id}`}
                tabIndex={active === i ? 0 : -1}
                onClick={() => setActive(i)}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 md:px-5",
                  active === i ? "text-fg" : "text-muted hover:text-fg"
                )}
              >
                {active === i && (
                  <m.span
                    layoutId="demo-tab-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.08]"
                  />
                )}
                <span className="relative z-10">{t.label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* ---- dashboard shell ---- */}
        <Reveal delay={0.1}>
          <div className="perspective-1200 relative mx-auto max-w-5xl">
            {/* halo */}
            <div
              aria-hidden
              className="absolute -inset-10 -z-10 rounded-[40px] bg-[radial-gradient(closest-side,rgba(110,102,255,0.16),rgba(34,211,238,0.06)_55%,transparent)] blur-2xl"
            />
            <m.div
              onPointerMove={onTilt}
              onPointerLeave={resetTilt}
              style={{ rotateX: rx, rotateY: ry }}
              className="glass-strong overflow-hidden rounded-2xl shadow-[0_48px_120px_-32px_rgba(3,4,12,0.9)] will-change-transform"
            >
              {/* window chrome */}
              <div className="flex items-center gap-3 border-b border-line px-5 py-3.5">
                <span aria-hidden className="flex gap-1.5">
                  <i className="size-2.5 rounded-full bg-white/15" />
                  <i className="size-2.5 rounded-full bg-white/15" />
                  <i className="size-2.5 rounded-full bg-white/15" />
                </span>
                <AnimatePresence mode="wait">
                  <m.span
                    key={tab.url}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.25 }}
                    className="mx-auto hidden rounded-md border border-line bg-void/60 px-3 py-1 font-mono text-[11px] text-faint sm:block"
                  >
                    {tab.url}
                  </m.span>
                </AnimatePresence>
                <span aria-hidden className="hidden w-14 sm:block" />
              </div>

              <div className="flex">
                {/* mini sidebar */}
                <div
                  aria-hidden
                  className="hidden w-14 flex-col items-center gap-5 border-r border-line py-6 text-faint md:flex"
                >
                  <LayoutDashboard className="size-[18px] text-fg/80" strokeWidth={1.75} />
                  <Activity className="size-[18px]" strokeWidth={1.75} />
                  <Inbox className="size-[18px]" strokeWidth={1.75} />
                  <Users className="size-[18px]" strokeWidth={1.75} />
                  <Search className="size-[18px]" strokeWidth={1.75} />
                  <Settings className="mt-auto size-[18px]" strokeWidth={1.75} />
                </div>

                {/* panel */}
                <div className="min-h-[420px] flex-1 p-5 md:p-7">
                  <AnimatePresence mode="wait">
                    <m.div
                      key={tab.id}
                      role="tabpanel"
                      id={`panel-${tab.id}`}
                      aria-labelledby={`tab-${tab.id}`}
                      tabIndex={0}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35, ease: EASE }}
                    >
                      {/* KPI row */}
                      <div className="grid gap-3 sm:grid-cols-3">
                        {tab.kpis.map((kpi, i) => (
                          <m.div
                            key={kpi.label}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 + i * 0.06, duration: 0.45, ease: EASE }}
                            className="rounded-xl border border-line bg-white/[0.025] p-4"
                          >
                            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                              {kpi.label}
                            </p>
                            <p className="mt-1.5 text-xl font-semibold tabular-nums tracking-tight text-fg">
                              {kpi.value}
                            </p>
                            <p
                              className={cn(
                                "mt-1 flex items-center gap-1 text-xs font-medium",
                                kpi.up ? "text-mint" : "text-rose"
                              )}
                            >
                              {kpi.up ? (
                                <TrendingUp aria-hidden className="size-3.5" />
                              ) : (
                                <TrendingDown aria-hidden className="size-3.5" />
                              )}
                              {kpi.delta}
                            </p>
                          </m.div>
                        ))}
                      </div>

                      <div className="mt-4 grid gap-3 lg:grid-cols-5">
                        {/* bar chart */}
                        <div className="rounded-xl border border-line bg-white/[0.025] p-4 lg:col-span-3">
                          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                            Trailing 12 weeks
                          </p>
                          <div className="mt-4 flex h-36 items-end gap-1.5" aria-hidden>
                            {tab.bars.map((h, i) => (
                              <m.span
                                key={i}
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: 1 }}
                                transition={{ delay: 0.12 + i * 0.035, duration: 0.6, ease: EASE }}
                                style={{ height: `${h}%`, transformOrigin: "bottom" }}
                                className={cn(
                                  "w-full rounded-t",
                                  i === tab.bars.length - 1
                                    ? "bg-gradient-to-t from-iris/40 to-cyan"
                                    : "bg-gradient-to-t from-iris/20 to-iris/70"
                                )}
                              />
                            ))}
                          </div>
                        </div>

                        {/* top movers */}
                        <div className="rounded-xl border border-line bg-white/[0.025] p-4 lg:col-span-2">
                          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                            Top movers
                          </p>
                          <ul className="mt-3 space-y-2">
                            {tab.movers.map((mover, i) => (
                              <m.li
                                key={mover.name}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.18 + i * 0.07, duration: 0.4, ease: EASE }}
                                className="rounded-lg border border-line bg-void/40 px-3 py-2.5"
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <span className="truncate text-[13px] font-medium text-fg">
                                    {mover.name}
                                  </span>
                                  <span
                                    className={cn(
                                      "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                                      mover.up
                                        ? "bg-mint/10 text-mint"
                                        : "bg-rose/10 text-rose"
                                    )}
                                  >
                                    {mover.delta}
                                  </span>
                                </div>
                                <p className="mt-0.5 truncate text-xs text-faint">{mover.detail}</p>
                              </m.li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* AI insight */}
                      <m.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35, duration: 0.5, ease: EASE }}
                        className="mt-4 flex items-start gap-3 rounded-xl border border-iris/20 bg-iris/[0.06] px-4 py-3.5"
                      >
                        <Sparkles aria-hidden className="mt-0.5 size-4 shrink-0 text-iris" />
                        <p className="text-[13px] leading-relaxed text-fg/85">{tab.insight}</p>
                      </m.div>
                    </m.div>
                  </AnimatePresence>
                </div>
              </div>
            </m.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
