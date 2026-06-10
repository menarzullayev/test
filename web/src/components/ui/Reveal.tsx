"use client";

import { m, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { EASE, cn } from "@/lib/utils";

const VIEWPORT = { once: true, margin: "-12% 0px" } as const;

/** Single-element scroll reveal: fade + rise + slight unblur. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(5px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={VIEWPORT}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </m.div>
  );
}

/** Orchestrated group reveal: parent staggers, children use `itemVariants`. */
export const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.08 },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: EASE },
  },
};

export function Stagger({
  children,
  className,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  role?: string;
  "aria-label"?: string;
}) {
  return (
    <m.div
      className={cn(className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      {...rest}
    >
      {children}
    </m.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <m.div className={className} variants={itemVariants}>
      {children}
    </m.div>
  );
}
