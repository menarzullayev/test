import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Infinite horizontal marquee. Pure CSS transform animation (GPU-only),
 * pauses on hover, edges masked. Content is duplicated once; the clone
 * is aria-hidden so screen readers hear the list exactly once.
 */
export function Marquee({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mask-fade-x overflow-hidden", className)}>
      <div className="marquee-track flex w-max">
        <div className="flex items-center gap-14 pr-14 md:gap-20 md:pr-20">{children}</div>
        <div aria-hidden className="flex items-center gap-14 pr-14 md:gap-20 md:pr-20">
          {children}
        </div>
      </div>
    </div>
  );
}
