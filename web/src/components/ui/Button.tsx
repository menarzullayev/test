"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";
import { Magnetic } from "@/components/ui/Magnetic";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  magnetic?: boolean;
  className?: string;
  ariaLabel?: string;
};

const base =
  "group inline-flex select-none items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-[background-color,box-shadow,color,border-color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-iris";

const variants = {
  primary:
    "bg-white text-ink hover:bg-[#e8ebf5] shadow-[0_0_0_0_rgba(110,102,255,0)] hover:shadow-[0_8px_44px_-8px_rgba(110,102,255,0.65)]",
  secondary:
    "glass text-fg hover:bg-white/[0.09] hover:border-white/20",
  ghost: "text-muted hover:text-fg",
} as const;

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-7 text-[15px]",
} as const;

export function Button({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  magnetic = false,
  className,
  ariaLabel,
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const tap = { scale: 0.97 };

  const el = href ? (
    <m.a href={href} aria-label={ariaLabel} whileTap={tap} className={classes} onClick={onClick}>
      {children}
    </m.a>
  ) : (
    <m.button type={type} aria-label={ariaLabel} whileTap={tap} className={classes} onClick={onClick}>
      {children}
    </m.button>
  );

  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}

/** Arrow that nudges right on hover of the parent `group`. */
export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      fill="none"
      className={cn(
        "size-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5",
        className
      )}
    >
      <path
        d="M3 8h10m0 0L9 4m4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
