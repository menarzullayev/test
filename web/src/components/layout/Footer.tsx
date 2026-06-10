import { Logo } from "@/components/ui/Logo";
import { FOOTER_COLS, SITE } from "@/lib/data";

const SOCIALS = [
  {
    label: "X (Twitter)",
    href: "https://x.com",
    path: "M13.8 10.5 21.3 2h-1.8l-6.5 7.4L7.8 2H2l7.9 11.3L2 22h1.8l6.9-7.8L16.2 22H22l-8.2-11.5Zm-2.4 2.8-.8-1.1L4.4 3.3h2.7l5.1 7.2.8 1.1 6.7 9.4H17l-5.6-7.7Z",
  },
  {
    label: "GitHub",
    href: "https://github.com",
    path: "M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.3 6.8 9.7.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.3-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5a10.2 10.2 0 0 0 6.8-9.7C22 6.6 17.5 2 12 2Z",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    path: "M20.4 2H3.6A1.6 1.6 0 0 0 2 3.6v16.8A1.6 1.6 0 0 0 3.6 22h16.8a1.6 1.6 0 0 0 1.6-1.6V3.6A1.6 1.6 0 0 0 20.4 2ZM8 19H5V9.7h3V19ZM6.5 8.4a1.7 1.7 0 1 1 0-3.5 1.7 1.7 0 0 1 0 3.5ZM19 19h-3v-4.7c0-1.1 0-2.6-1.6-2.6s-1.8 1.2-1.8 2.5V19h-3V9.7h2.9V11h.1a3.1 3.1 0 0 1 2.8-1.6c3 0 3.6 2 3.6 4.6V19Z",
  },
];

export function Footer() {
  return (
    <footer aria-label="Footer" className="relative overflow-hidden border-t border-line">
      <div className="container-x pb-12 pt-16 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-faint">
              {SITE.tagline}. Built for teams who&apos;d rather act on the
              number than argue about it.
            </p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-xs text-muted">
              <span className="animate-pulse-dot size-1.5 rounded-full bg-mint" />
              All systems operational
            </p>
          </div>

          {FOOTER_COLS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-faint">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#top"
                      className="text-sm text-muted transition-colors duration-300 hover:text-fg"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-line pt-7 sm:flex-row">
          <p className="text-[13px] text-faint">
            © 2026 {SITE.company} All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex size-9 items-center justify-center rounded-full border border-line text-faint transition-all duration-300 hover:border-white/20 hover:text-fg"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-4">
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* oversized watermark */}
      <div
        aria-hidden
        className="pointer-events-none select-none bg-gradient-to-b from-white/[0.055] to-transparent bg-clip-text text-center text-[21vw] font-bold leading-[0.78] tracking-[-0.06em] text-transparent"
      >
        PRISM
      </div>
    </footer>
  );
}
