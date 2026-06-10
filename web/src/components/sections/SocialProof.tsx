"use client";

import { Counter } from "@/components/ui/Counter";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { LOGOS, STATS } from "@/lib/data";

/** Distinct geometric marks so the fictional logo wall reads as real brands. */
function BrandMark({ kind }: { kind: string }) {
  const stroke = "currentColor";
  switch (kind) {
    case "triangle":
      return <path d="M12 4 21 20H3L12 4Z" stroke={stroke} strokeWidth="2" strokeLinejoin="round" />;
    case "rings":
      return (
        <>
          <circle cx="9" cy="12" r="5.5" stroke={stroke} strokeWidth="2" />
          <circle cx="15" cy="12" r="5.5" stroke={stroke} strokeWidth="2" />
        </>
      );
    case "wind":
      return (
        <path d="M4 8h12a3 3 0 1 0-3-3M4 13h15a3 3 0 1 1-3 3" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      );
    case "helix":
      return (
        <path d="M7 4c0 5 10 6 10 11M17 4c0 5-10 6-10 11M7 19h10M7 9h10" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      );
    case "sun":
      return (
        <>
          <circle cx="12" cy="12" r="4" stroke={stroke} strokeWidth="2" />
          <path d="M12 3v3m0 12v3M3 12h3m12 0h3" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
        </>
      );
    case "hex":
      return (
        <path d="M12 3l7.8 4.5v9L12 21l-7.8-4.5v-9L12 3Z" stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
      );
    case "peak":
      return <path d="M3 19 9 7l4 7 3-4 5 9H3Z" stroke={stroke} strokeWidth="2" strokeLinejoin="round" />;
    default:
      return (
        <>
          <circle cx="12" cy="12" r="8.5" stroke={stroke} strokeWidth="2" />
          <path d="M3.5 12h17M12 3.5c3 2.5 3 14.5 0 17" stroke={stroke} strokeWidth="2" />
        </>
      );
  }
}

export function SocialProof() {
  return (
    <section aria-labelledby="socialproof-title" className="relative py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <h2
            id="socialproof-title"
            className="text-center font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-faint"
          >
            Trusted in production by 12,000+ revenue teams
          </h2>
        </Reveal>

        <Reveal delay={0.12} className="mt-10">
          <Marquee>
            {LOGOS.map((logo) => (
              <span
                key={logo.name}
                className="flex items-center gap-2.5 text-faint transition-colors duration-300 hover:text-muted"
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden className="size-5 shrink-0">
                  <BrandMark kind={logo.mark} />
                </svg>
                <span className="text-lg font-semibold tracking-tight">{logo.name}</span>
              </span>
            ))}
          </Marquee>
        </Reveal>

        <Stagger className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
          {STATS.map((stat) => (
            <StaggerItem key={stat.label} className="bg-ink px-6 py-9 text-center md:px-8">
              <Counter
                to={stat.value}
                decimals={stat.decimals}
                prefix={stat.prefix}
                suffix={stat.suffix}
                className="block text-3xl font-semibold tabular-nums tracking-tight text-fg md:text-4xl"
              />
              <span className="mt-2 block text-[13px] leading-snug text-faint">{stat.label}</span>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
