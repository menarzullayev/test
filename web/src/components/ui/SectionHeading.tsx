"use client";

import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * Standard section header: mono eyebrow, display title, supporting copy.
 * `titleId` ties the heading to its parent section via aria-labelledby.
 */
export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "center",
  titleId,
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: "center" | "left";
  titleId?: string;
}) {
  const centered = align === "center";
  return (
    <div className={cn("mb-14 md:mb-20", centered && "text-center")}>
      <Reveal>
        <p
          className={cn(
            "mb-4 flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-iris",
            centered && "justify-center"
          )}
        >
          <span aria-hidden className="inline-block size-1.5 rotate-45 bg-gradient-to-br from-iris to-cyan" />
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          id={titleId}
          className="text-balance text-4xl font-semibold leading-[1.06] tracking-[-0.025em] text-fg md:text-[3.4rem]"
        >
          {title}
        </h2>
      </Reveal>
      {sub ? (
        <Reveal delay={0.16}>
          <p
            className={cn(
              "mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted md:text-lg",
              centered && "mx-auto"
            )}
          >
            {sub}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
