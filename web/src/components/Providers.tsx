"use client";

import { LazyMotion, MotionConfig, domMax } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Global motion context.
 * - LazyMotion + `m` components keep framer-motion out of the critical bundle.
 * - MotionConfig reducedMotion="user" makes every transform animation
 *   respect OS-level "reduce motion" automatically (opacity still animates).
 */
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
