"use client";

import {
  m,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { ChevronRight, TrendingUp } from "lucide-react";
import { ArrowIcon, Button } from "@/components/ui/Button";
import { EASE } from "@/lib/utils";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
});

const HEADLINE: { text: string; className: string }[] = [
  { text: "Every signal.", className: "text-fg" },
  { text: "One focus.", className: "text-spectrum" },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [sceneMounted, setSceneMounted] = useState(false);

  // Mount the WebGL scene only after the main thread goes idle — keeps
  // LCP/TBT clean while the poster gradient holds the composition.
  useEffect(() => {
    const start = () => setSceneMounted(true);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(start, { timeout: 1200 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(start, 350);
    return () => window.clearTimeout(id);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  // Pointer-driven parallax for the floating metric cards.
  const mx = useSpring(0, { stiffness: 50, damping: 18 });
  const my = useSpring(0, { stiffness: 50, damping: 18 });
  function onPointerMove(e: PointerEvent<HTMLElement>) {
    if (reduced || e.pointerType !== "mouse") return;
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  }
  const card1x = useTransform(mx, (v) => v * -34);
  const card1y = useTransform(my, (v) => v * -22);
  const card2x = useTransform(mx, (v) => v * -56);
  const card2y = useTransform(my, (v) => v * -36);
  const card3x = useTransform(mx, (v) => v * -20);
  const card3y = useTransform(my, (v) => v * -14);

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-label="Intro"
      onPointerMove={onPointerMove}
      className="relative flex min-h-svh items-center overflow-hidden"
    >
      {/* ---- atmosphere: poster gradient, auroras, grid floor ---- */}
      <div aria-hidden className="absolute inset-0">
        <div className="grid-bg absolute inset-0" />
        <div className="animate-aurora absolute -top-32 right-[-10%] h-[560px] w-[720px] rounded-full bg-iris/20 blur-[140px]" />
        <div
          className="animate-aurora absolute bottom-[-20%] left-[-8%] h-[440px] w-[560px] rounded-full bg-cyan/10 blur-[130px]"
          style={{ animationDelay: "-11s" }}
        />
        {/* poster glow that holds the frame until WebGL fades in */}
        <div className="absolute right-[-6%] top-1/2 hidden size-[640px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(110,102,255,0.16),rgba(34,211,238,0.05)_45%,transparent_70%)] lg:block" />
      </div>

      {/* ---- 3D scene ---- */}
      {sceneMounted && !reduced ? <HeroScene scrollProgress={scrollYProgress} /> : null}

      {/* legibility scrim on small screens where the artifact sits behind text */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-void/80 via-void/30 to-transparent lg:from-void/40 lg:via-transparent"
      />

      {/* ---- content ---- */}
      <m.div
        style={{ y: contentY }}
        className="container-x pointer-events-none relative z-10 pb-28 pt-36"
      >
        <div className="max-w-2xl">
          <m.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          >
            <a
              href="#product"
              className="glass group pointer-events-auto inline-flex items-center gap-2.5 rounded-full py-1.5 pl-2 pr-3.5 text-[13px] text-muted transition-colors duration-300 hover:border-white/20 hover:text-fg"
            >
              <span className="rounded-full bg-gradient-to-r from-iris to-violet px-2 py-0.5 text-[11px] font-semibold text-white">
                New
              </span>
              Prism 2.0 — AI forecasts that explain themselves
              <ChevronRight
                aria-hidden
                className="size-3.5 text-faint transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </a>
          </m.div>

          <h1 className="mt-7 text-[2.9rem] font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl md:text-7xl lg:text-[5.4rem]">
            {HEADLINE.map((line, i) => (
              /* Gradient + transform must live on the same element, or
                 background-clip:text stops clipping under composited children. */
              <span key={i} className="block overflow-hidden pb-[0.08em]">
                <m.span
                  className={`block will-change-transform ${line.className}`}
                  initial={{ y: "115%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.18 + i * 0.17, ease: EASE }}
                >
                  {line.text}
                </m.span>
              </span>
            ))}
          </h1>

          <m.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.62, ease: EASE }}
            className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted"
          >
            Prism unifies your CRM, billing, and product data into one live
            revenue model — so your team forecasts with confidence instead of
            gut feel.
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.74, ease: EASE }}
            className="pointer-events-auto mt-9 flex flex-wrap items-center gap-4"
          >
            <Button href="#book-demo" size="lg" magnetic>
              Book a demo
              <ArrowIcon />
            </Button>
            <Button href="#product" size="lg" variant="secondary">
              Explore the product
            </Button>
          </m.div>

          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.95 }}
            className="mt-7 font-mono text-[11px] uppercase tracking-[0.18em] text-faint"
          >
            14-day pilot&ensp;·&ensp;No credit card&ensp;·&ensp;SOC 2 Type II
          </m.p>
        </div>
      </m.div>

      {/* ---- floating metric cards (desktop) ---- */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden xl:block">
        <FloatCard
          x={card1x}
          y={card1y}
          delay={1.1}
          drift="7.5s"
          className="right-[7%] top-[22%] w-60"
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-faint">
            AI forecast
          </p>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="text-2xl font-semibold tracking-tight text-fg">$2.67M</span>
            <span className="text-xs font-medium text-mint">94.2% conf.</span>
          </div>
          <svg viewBox="0 0 200 44" className="mt-3 h-9 w-full" aria-hidden>
            <defs>
              <linearGradient id="spark" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#6e66ff" />
                <stop offset="1" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
            <polyline
              points="0,36 22,30 44,33 66,24 88,27 110,18 132,21 154,12 176,15 200,5"
              fill="none"
              stroke="url(#spark)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </FloatCard>

        <FloatCard
          x={card2x}
          y={card2y}
          delay={1.25}
          drift="9.5s"
          className="bottom-[31%] right-[24%] w-48"
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-faint">
            Pipeline coverage
          </p>
          <div className="mt-1.5 flex items-center gap-2">
            <span className="text-2xl font-semibold tracking-tight text-fg">3.4×</span>
            <TrendingUp aria-hidden className="size-4 text-mint" />
          </div>
        </FloatCard>

        <FloatCard
          x={card3x}
          y={card3y}
          delay={1.4}
          drift="11s"
          className="bottom-[14%] right-[6%] w-56"
        >
          <div className="flex items-center gap-2.5">
            <span className="animate-pulse-dot inline-block size-2 rounded-full bg-mint" />
            <p className="text-[13px] text-muted">
              Closed-won this week
              <span className="ml-1.5 font-semibold text-fg">+$1.28M</span>
            </p>
          </div>
        </FloatCard>
      </div>

      {/* ---- scroll cue ---- */}
      <m.div
        style={{ opacity: cueOpacity }}
        aria-hidden
        className="absolute inset-x-0 bottom-7 z-10 flex flex-col items-center gap-3"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint">
          Scroll
        </span>
        <span className="block h-10 w-px overflow-hidden">
          <span className="animate-scroll-line block h-full w-full bg-gradient-to-b from-iris to-transparent" />
        </span>
      </m.div>

      {/* fade into the next section */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-void" />
    </section>
  );
}

/* ------------------------------------------------------------------------ */

function FloatCard({
  children,
  className,
  x,
  y,
  delay,
  drift,
}: {
  children: ReactNode;
  className?: string;
  x: MotionValue<number>;
  y: MotionValue<number>;
  delay: number;
  drift: string;
}) {
  return (
    <m.div
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay, ease: EASE }}
      className={`absolute ${className ?? ""}`}
    >
      <div
        className="glass-strong animate-drift rounded-2xl p-4 shadow-[0_24px_80px_-24px_rgba(5,6,10,0.9)]"
        style={{ animationDuration: drift }}
      >
        {children}
      </div>
    </m.div>
  );
}
