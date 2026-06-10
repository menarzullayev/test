# Prism — 3D SaaS Landing Page

A dark, premium, 3D-driven landing page for **Prism**, a fictional revenue-intelligence
platform. Built to feel like Apple polish × Stripe clarity × Linear restraint × Vercel
engineering — and to convert visitors into booked demos.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (fully static)
```

Stack: **Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
Framer Motion 12 (LazyMotion) · Three.js + React Three Fiber 9 + drei 10**

---

## 1 · UX strategy

**Primary conversion goal:** demo bookings.
**Audience:** founders, SMB owners, agencies, technical decision makers — people who
are skeptical of dashboards, allergic to fluff, and decide quickly.

The page is built as a **light narrative** (the brand is a prism):

| Act | Sections | Job |
|---|---|---|
| Hook | Hero | Emotional first impression + immediate CTA. The 3D prism *is* the value prop: scattered light → one beam. |
| Trust | Social proof | De-risk in 5 seconds: logos + hard numbers ($4.2B, 99.99%). |
| Tension | Problem | Mirror the visitor's pain in their own words ("negotiation theater"). |
| Release | Solution → Demo | Show, don't claim: bento proof points, then a clickable product. |
| Evidence | Features → Case studies | Rational backup for the champion who must convince others. |
| Commit | Pricing → FAQ → CTA | Remove friction (pilot, no card), answer objections, ask once more. |

**Conversion mechanics:** a "Book a demo" path is always ≤ 1 interaction away
(persistent navbar CTA → hero CTA → pricing CTAs → final email capture). The
closing CTA is a real form with a success state, so the page *ends in an action*,
not a footer.

## 2 · Visual direction

- **Theme:** near-black with a blue undertone (`#05060A`), not pure black — gives
  glows room to bloom. One spectral accent ramp: **iris `#6E66FF` → violet `#8B5CF6`
  → cyan `#22D3EE`**, with mint reserved for "positive" data and rose for "pain".
- **Type:** Geist Sans (display tightened to −0.04em) + Geist Mono for eyebrows,
  KPIs and microcopy — the "instrument panel" voice.
- **Surfaces:** glassmorphism done quietly — 3–4% white fills, 8% hairline borders,
  16–22px backdrop blur. Depth comes from light (spotlights, halos, contact
  shadow), not from drop-shadow soup.
- **Texture:** SVG film grain at 3.5% over everything; hairline gradient seams
  between sections; a 64px grid floor that fades radially under the hero.
- **3D:** a refractive glass icosahedron (`MeshTransmissionMaterial`, chromatic
  aberration ≈ dispersion) with a glowing core, two orbit rings with satellites,
  metallic shards, and a drifting particle field — lit by a custom Lightformer
  environment (no external HDR fetch).

## 3 · Component hierarchy

```
RootLayout (fonts · metadata · skip-link · noise · <Providers> = LazyMotion + MotionConfig)
└── Home (server component · JSON-LD)
    ├── Navbar ─ Logo · NavLinks · Button(magnetic) · MobileMenu(AnimatePresence)
    ├── main#main
    │   ├── Hero ─ HeroScene(lazy ssr:false) ─ Scene ─ Rig · Prism · Ring×2 · Shards · Sparkles · Env
    │   │        └ headline word-mask · FloatCard×3(parallax) · scroll cue
    │   ├── SocialProof ─ Marquee(BrandMark×8) · Stats(Counter×4)
    │   ├── Problem ─ SectionHeading · GlassCard×3
    │   ├── Solution ─ bento: live-model(SVG draw) · AI bars · orbit · alerts · trust chips
    │   ├── ProductDemo ─ a11y tablist · tilt shell · animated KPI/bars/movers/insight
    │   ├── Features ─ GlassCard×6
    │   ├── CaseStudies ─ GlassCard×3 (Counter metrics, gradient avatars)
    │   ├── Pricing ─ billing switch · price-morph digits · gradient-border popular card
    │   ├── Faq ─ sticky rail + height-auto accordion
    │   └── CtaFooter ─ scroll-scrub headline · email form → success state
    └── Footer ─ link columns · status pill · socials · giant watermark
```

Reusable primitives (`src/components/ui/`): `Button` (3 variants × 3 sizes,
optional magnetic), `Magnetic`, `Reveal` / `Stagger` / `StaggerItem`,
`SectionHeading`, `GlassCard` (cursor spotlight), `Counter`, `Marquee`, `Logo`.
All copy lives in `src/lib/data.ts` — sections are purely presentational.

## 4 · Page wireframe

```
┌──────────────────────────────────────────────┐
│ ◇ Prism   Product Features … Pricing  [Demo] │  fixed, glass on scroll
├──────────────────────────────────────────────┤
│ [badge: Prism 2.0]              ╭─────────╮  │
│ EVERY SIGNAL.                   │  3D     │  │  100svh · grid floor
│ ONE FOCUS. (spectrum)           │  prism  │  │  floating KPI cards
│ sub · [Book a demo] [Explore]   ╰─────────╯  │  scroll cue ↓
├──────────────────────────────────────────────┤
│  trusted by … ←·logo marquee·→               │
│  $4.2B │ 12,000+ │ 99.99% │ 38ms             │
├──────────────────────────────────────────────┤
│  PROBLEM: 3 pain cards (rose accents)        │
├──────────────────────────────────────────────┤
│  SOLUTION bento: [ live model 2×2 ][ AI ]    │
│                  [               ][orbit]    │
│                  [ alerts ][ trust chips ]   │
├──────────────────────────────────────────────┤
│  DEMO: (Forecast|Pipeline|Signals|Reports)   │
│  ┌ tilting dashboard mock ─ KPIs/bars/...┐   │
├──────────────────────────────────────────────┤
│  FEATURES 3×2 │ CASE STUDIES 1×3            │
├──────────────────────────────────────────────┤
│  PRICING: monthly⇄annual · ★Growth elevated  │
├──────────────────────────────────────────────┤
│  FAQ: sticky intro ‖ accordion               │
├──────────────────────────────────────────────┤
│  READY TO SEE CLEARLY?  [email → Book demo]  │  concentric rings
│  footer columns · status · PRISM watermark   │
└──────────────────────────────────────────────┘
```

## 5 · Animation map

| Where | Animation | Implementation |
|---|---|---|
| 3D scene | float, orbit rings, mouse parallax, scroll dolly-out | `useFrame` + `MathUtils.damp`, scroll `MotionValue` read per-frame |
| Hero headline | per-word mask rise (110% → 0) | `overflow-hidden` lines, staggered 85ms, ease `[0.16,1,0.3,1]` |
| Floating cards | pointer parallax (3 depths) + CSS drift loops | springs on transformed motion values; decorative → `aria-hidden` |
| Navbar | slide-in on load; glass + hairline after 12px scroll | `useMotionValueEvent(scrollY)` |
| Section reveals | fade + 26px rise + 4px unblur, 90ms stagger, once | shared `Stagger`/`Reveal` primitives, `whileInView` |
| Logo marquee | infinite translateX(−50%), pause on hover | pure CSS keyframes (compositor-only) |
| Stats / metrics | count-up on view | `animate()` → `textContent` (zero re-renders) |
| Bento | SVG `pathLength` draw · scaleY bars · CSS orbit dots | framer + CSS custom-prop orbits |
| Demo tabs | sliding pill `layoutId` · panel swap · re-staggering charts · cursor tilt ±7° | `AnimatePresence mode="wait"`, springs on `rotateX/Y` |
| Cards (global) | hover lift −4px, border lighten, cursor spotlight | CSS vars written in `onMouseMove`, `::before` radial |
| Pricing | knob spring · digit morph (rise/blur out-in) · animated gradient border | `layout` spring, keyed `AnimatePresence popLayout` |
| FAQ | height-auto unfold, + → × rotation | `AnimatePresence` + `height:"auto"` |
| Final CTA | scroll-scrubbed scale 0.92→1 / opacity · magnetic submit · success morph | `useScroll`+`useTransform`, `Magnetic`, keyed swap |
| Buttons | magnetic attraction, arrow nudge, tap 0.97, glow shadow | `Magnetic` springs, `group-hover`, `whileTap` |

**Reduced motion:** `MotionConfig reducedMotion="user"` (kills transform tweens),
a global CSS `prefers-reduced-motion` clamp for keyframe loops, and explicit
`useReducedMotion` gates for the canvas (scene not mounted), tilt, magnetic, and
count-ups.

## 6 · Performance playbook (built for LH ≥ 95 / < 2s)

- **Fully static page** — every route prerendered; `/` first-load JS ≈ **159 kB**
  (verified via `next build`), with hero copy in the HTML for instant LCP.
- **Three.js never blocks**: `next/dynamic` + `ssr:false` + mounted on
  `requestIdleCallback`; a CSS poster gradient holds the composition, then the
  canvas cross-fades in. WebGL-unsupported browsers simply keep the poster.
- **Adaptive quality**: DPR clamp (≤1.75), `PerformanceMonitor` downgrade,
  cheaper material + fewer particles on coarse-pointer/low-core devices,
  `frameloop="never"` via IntersectionObserver once the hero scrolls away.
- **GPU-only ambient animation** (transform/opacity keyframes), pointer effects
  written to CSS vars or motion values — no React re-renders per frame.
- **LazyMotion (`domMax`) + strict `m`** components; `optimizePackageImports`
  for drei; self-hosted fonts via `next/font` (`display: swap`); zero external
  images, HDRs, or third-party scripts.

## 7 · Accessibility

Skip-link · semantic landmarks + `aria-labelledby` sections · real `<button>`s ·
WAI-ARIA tabs with roving tabindex & arrow keys · accordion with
`aria-expanded`/`region` · `role="switch"` billing toggle · labeled form input ·
focus-visible rings everywhere · marquee duplicate + all decorative layers
`aria-hidden` · AA-checked text contrast · `<noscript>` style reset so content
is never hidden without JS.

## 8 · Notes

- All brands, customers, metrics, and quotes are **fictional** (demo content).
- The demo-booking form intentionally does not POST anywhere; wire it to your
  scheduler/CRM in `CtaFooter.tsx`.
- Set the real domain in `src/lib/data.ts` (`SITE.url`) before deploying —
  metadata, sitemap, robots, and JSON-LD all derive from it.
