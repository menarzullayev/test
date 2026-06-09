import { cn } from "@/lib/utils";

/** Prism wordmark: refraction glyph + name. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="size-6" />
      <span className="text-[17px] font-semibold tracking-tight text-fg">Prism</span>
    </span>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden className={className}>
      <defs>
        <linearGradient id="prism-g" x1="4" y1="28" x2="28" y2="6" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6e66ff" />
          <stop offset="0.55" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      {/* prism */}
      <path
        d="M16 4 28 26H4L16 4Z"
        stroke="url(#prism-g)"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="rgba(110,102,255,0.08)"
      />
      {/* refracted beam */}
      <path d="M16 12v8" stroke="#9aa3ff" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
    </svg>
  );
}
