"use client";

import {
  AnimatePresence,
  m,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { NAV_LINKS } from "@/lib/data";
import { EASE, cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 12));

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <m.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={cn(
          "transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled
            ? "glass-strong border-x-0 border-t-0 rounded-none"
            : "border-b border-transparent"
        )}
      >
        <nav aria-label="Main" className="container-x flex h-16 items-center justify-between">
          <a
            href="#top"
            className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-iris"
            aria-label="Prism — home"
          >
            <Logo />
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-3.5 py-2 text-sm text-muted transition-colors duration-300 hover:text-fg"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 md:flex">
            <Button href="#faq" variant="ghost" size="sm">
              Sign in
            </Button>
            <Button href="#book-demo" size="sm" magnetic>
              Book a demo
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-label="Open menu"
            className="glass inline-flex size-10 items-center justify-center rounded-full text-fg md:hidden"
          >
            <Menu aria-hidden className="size-5" />
          </button>
        </nav>
      </div>

      {/* ---- mobile menu ---- */}
      <AnimatePresence>
        {open && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="glass-strong fixed inset-0 z-50 flex flex-col bg-void/90 md:hidden"
          >
            <div className="container-x flex h-16 items-center justify-between">
              <Logo />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="glass inline-flex size-10 items-center justify-center rounded-full text-fg"
              >
                <X aria-hidden className="size-5" />
              </button>
            </div>
            <nav aria-label="Mobile" className="container-x mt-10 flex-1">
              <ul className="space-y-2">
                {NAV_LINKS.map((link, i) => (
                  <m.li
                    key={link.href}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.05, duration: 0.45, ease: EASE }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-2 py-3 text-3xl font-semibold tracking-tight text-fg/90 transition-colors hover:text-fg"
                    >
                      {link.label}
                    </a>
                  </m.li>
                ))}
              </ul>
            </nav>
            <m.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5, ease: EASE }}
              className="container-x pb-10"
            >
              <Button href="#book-demo" size="lg" className="w-full" onClick={() => setOpen(false)}>
                Book a demo
              </Button>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </m.header>
  );
}
