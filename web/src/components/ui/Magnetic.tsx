"use client";

import { m, useReducedMotion, useSpring } from "framer-motion";
import { useRef, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const SPRING = { stiffness: 190, damping: 16, mass: 0.4 };

/**
 * Magnetic hover: children gently gravitate toward the cursor and
 * spring back on leave. Disabled for reduced-motion and touch input.
 */
export function Magnetic({
  children,
  strength = 0.32,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (reduced || e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  }

  function onPointerLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <m.div
      ref={ref}
      style={{ x, y }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn("inline-block", className)}
    >
      {children}
    </m.div>
  );
}
