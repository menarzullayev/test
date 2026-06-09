"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Glass surface with a cursor-tracked spotlight.
 * The highlight position is written to CSS custom properties directly —
 * zero React re-renders on pointer move.
 */
export function GlassCard({
  children,
  className,
  interactive = true,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={interactive ? onMouseMove : undefined}
      className={cn(
        "spotlight relative overflow-hidden rounded-2xl border border-line bg-white/[0.03]",
        interactive &&
          "transition-[transform,border-color,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:border-white/[0.16] hover:shadow-[0_24px_64px_-32px_rgba(110,102,255,0.35)]",
        className
      )}
    >
      {children}
    </div>
  );
}
