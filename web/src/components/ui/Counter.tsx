"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { EASE } from "@/lib/utils";

/**
 * Count-up number. Server-renders the final value (SEO / no-JS correct),
 * then animates from 0 when scrolled into view. Writes to textContent
 * directly — no re-renders during the tween.
 */
export function Counter({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.6,
  className,
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || reduced) return;
    const format = (v: number) =>
      `${prefix}${v.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}${suffix}`;
    const controls = animate(0, to, {
      duration,
      ease: EASE,
      onUpdate: (v) => {
        el.textContent = format(v);
      },
    });
    return () => controls.stop();
  }, [inView, reduced, to, decimals, prefix, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {to.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}
