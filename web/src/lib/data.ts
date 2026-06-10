/**
 * Single source of truth for all page copy and content.
 * Keeping it here means sections stay purely presentational,
 * and the FAQ JSON-LD never drifts from the visible FAQ.
 */

export const SITE = {
  name: "Prism",
  tagline: "Revenue intelligence in full spectrum",
  description:
    "Prism unifies your CRM, billing, and product data into one live revenue model — AI forecasts, real-time pipeline analytics, and alerts your team can actually trust.",
  url: "https://prism-landing.example.com",
  company: "Prism Labs, Inc.",
} as const;

export const NAV_LINKS = [
  { label: "Product", href: "#product" },
  { label: "Features", href: "#features" },
  { label: "Customers", href: "#customers" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const;

/* ----------------------------- Social proof ----------------------------- */

export const LOGOS = [
  { name: "Vertex", mark: "triangle" },
  { name: "Quantia", mark: "rings" },
  { name: "Northwind", mark: "wind" },
  { name: "Helixa", mark: "helix" },
  { name: "Lumora", mark: "sun" },
  { name: "Kontur", mark: "hex" },
  { name: "Altitude", mark: "peak" },
  { name: "Meridian", mark: "globe" },
] as const;

export const STATS = [
  { value: 4.2, decimals: 1, prefix: "$", suffix: "B", label: "Pipeline under management" },
  { value: 12000, decimals: 0, prefix: "", suffix: "+", label: "Revenue teams in production" },
  { value: 99.99, decimals: 2, prefix: "", suffix: "%", label: "Uptime, last 12 months" },
  { value: 38, decimals: 0, prefix: "", suffix: "ms", label: "Median sync latency" },
] as const;

/* ------------------------------- Problem -------------------------------- */

export const PROBLEMS = [
  {
    icon: "unplug",
    title: "Fragmented tools",
    body: "CRM says one thing, billing says another, product analytics says a third. Every team ships its own version of the truth.",
  },
  {
    icon: "hourglass",
    title: "Stale dashboards",
    body: "Weekly CSV exports and brittle BI pipelines mean every decision runs on last quarter's reality, not this morning's.",
  },
  {
    icon: "dices",
    title: "Gut-feel forecasts",
    body: "Commit calls turn into negotiation theater when nobody trusts the number. Hope is not a forecasting methodology.",
  },
] as const;

/* ----------------------------- Product demo ----------------------------- */

export type DemoTab = {
  id: string;
  label: string;
  url: string;
  kpis: { label: string; value: string; delta: string; up: boolean }[];
  bars: number[];
  insight: string;
  movers: { name: string; detail: string; delta: string; up: boolean }[];
};

export const DEMO_TABS: DemoTab[] = [
  {
    id: "forecast",
    label: "Forecast",
    url: "app.prism.io/forecast",
    kpis: [
      { label: "Commit", value: "$2.41M", delta: "+8.2%", up: true },
      { label: "Best case", value: "$3.18M", delta: "+12.4%", up: true },
      { label: "AI forecast", value: "$2.67M", delta: "94.2% conf.", up: true },
    ],
    bars: [42, 55, 48, 62, 58, 71, 66, 78, 74, 86, 82, 94],
    insight:
      "Forecast confidence rose 3.1 pts this week — driven by multi-threading on 6 enterprise deals.",
    movers: [
      { name: "Acme Corp · $480K", detail: "Champion went dark 9 days", delta: "−12%", up: false },
      { name: "Borealis · $320K", detail: "Security review cleared", delta: "+18%", up: true },
      { name: "Cobalt AI · $210K", detail: "Usage up 3.4× this month", delta: "+9%", up: true },
    ],
  },
  {
    id: "pipeline",
    label: "Pipeline",
    url: "app.prism.io/pipeline",
    kpis: [
      { label: "Open pipeline", value: "$8.93M", delta: "+4.1%", up: true },
      { label: "Coverage", value: "3.4×", delta: "+0.3×", up: true },
      { label: "Avg. velocity", value: "31 days", delta: "−6 days", up: true },
    ],
    bars: [88, 72, 80, 64, 70, 56, 61, 48, 52, 40, 44, 36],
    insight:
      "Stage 3 → 4 conversion improved to 41% after the new security one-pager shipped.",
    movers: [
      { name: "Stage 2 · Discovery", detail: "38 deals · $2.6M", delta: "+11%", up: true },
      { name: "Stage 4 · Proposal", detail: "14 deals · $1.9M", delta: "+6%", up: true },
      { name: "Stalled > 21 days", detail: "9 deals · $840K", delta: "−23%", up: true },
    ],
  },
  {
    id: "signals",
    label: "Signals",
    url: "app.prism.io/signals",
    kpis: [
      { label: "Active signals", value: "127", delta: "+23 today", up: true },
      { label: "At-risk deals", value: "9", delta: "−4 this week", up: true },
      { label: "Expansion-ready", value: "17", delta: "+5 this week", up: true },
    ],
    bars: [30, 44, 38, 52, 60, 47, 65, 58, 72, 66, 81, 76],
    insight:
      "17 accounts crossed the expansion threshold — combined whitespace of $1.2M ARR.",
    movers: [
      { name: "Delta Freight", detail: "Exec sponsor changed", delta: "Risk", up: false },
      { name: "Evergreen Health", detail: "Seat usage at 96%", delta: "Expand", up: true },
      { name: "Fathom Robotics", detail: "Invoice 14 days overdue", delta: "Watch", up: false },
    ],
  },
  {
    id: "reports",
    label: "Reports",
    url: "app.prism.io/reports",
    kpis: [
      { label: "Net revenue retention", value: "118%", delta: "+3 pts", up: true },
      { label: "Gross margin", value: "81.4%", delta: "+0.8 pts", up: true },
      { label: "CAC payback", value: "11.2 mo", delta: "−1.4 mo", up: true },
    ],
    bars: [50, 54, 58, 56, 63, 67, 64, 70, 75, 73, 80, 85],
    insight:
      "Board pack generated in 41 seconds — every figure traced to source systems.",
    movers: [
      { name: "ARR bridge", detail: "Auto-reconciled to billing", delta: "Live", up: true },
      { name: "Segment: Mid-market", detail: "NRR 124% · best cohort", delta: "+6%", up: true },
      { name: "Churn forecast", detail: "Q3 risk concentrated in SMB", delta: "−2%", up: false },
    ],
  },
];

/* ------------------------------- Features ------------------------------- */

export const FEATURES = [
  {
    icon: "sparkles",
    title: "AI forecasting",
    body: "Per-deal win probabilities roll up into a forecast you can defend to the board — with the drivers behind every number.",
  },
  {
    icon: "zap",
    title: "Real-time sync",
    body: "Every field, every system, current within 38 milliseconds. No nightly batch jobs, no \"refresh tomorrow.\"",
  },
  {
    icon: "chart",
    title: "Pipeline analytics",
    body: "Conversion, velocity, and slippage cut by segment, rep, and source. Find the leak before the quarter does.",
  },
  {
    icon: "bell",
    title: "Revenue alerts",
    body: "Slack and email nudges the moment a deal stalls, a champion goes quiet, or product usage spikes.",
  },
  {
    icon: "branch",
    title: "Scenario planning",
    body: "Model hiring plans, quota changes, and market shifts before you commit to them. Branch reality, compare, decide.",
  },
  {
    icon: "shield",
    title: "Enterprise security",
    body: "SOC 2 Type II, SSO/SAML, role-based access, and EU or US data residency. Secure by default, not by add-on.",
  },
] as const;

/* ----------------------------- Case studies ----------------------------- */

export const CASE_STUDIES = [
  {
    company: "Quantia",
    industry: "Fintech infrastructure",
    metric: 38,
    metricPrefix: "+",
    metricSuffix: "%",
    metricLabel: "forecast accuracy",
    quote:
      "We went from arguing about the number to acting on it. Board meetings take half the time they used to.",
    person: "Maya Chen",
    role: "VP Revenue Operations",
    accent: "iris",
  },
  {
    company: "Northwind",
    industry: "B2B logistics",
    metric: 2.4,
    metricPrefix: "",
    metricSuffix: "×",
    metricLabel: "pipeline coverage",
    quote:
      "Prism surfaced $3M of stalled pipeline we simply couldn't see. We re-engaged and closed a third of it in one quarter.",
    person: "Daniel Okafor",
    role: "Chief Revenue Officer",
    accent: "cyan",
  },
  {
    company: "Helixa",
    industry: "Healthcare AI",
    metric: 41,
    metricPrefix: "−",
    metricSuffix: "%",
    metricLabel: "sales cycle length",
    quote:
      "Every rep starts the day knowing exactly which three deals need attention. That focus changed everything.",
    person: "Sofia Marques",
    role: "Head of Sales",
    accent: "mint",
  },
] as const;

/* -------------------------------- Pricing ------------------------------- */

export const PRICING = [
  {
    name: "Starter",
    blurb: "For small teams getting their first single source of truth.",
    monthly: 29,
    annual: 23,
    cta: "Start free pilot",
    popular: false,
    features: [
      "Up to 5 seats",
      "3 integrations",
      "Live dashboards",
      "90-day history",
      "Email support",
    ],
  },
  {
    name: "Growth",
    blurb: "For scaling teams that forecast every week and miss nothing.",
    monthly: 79,
    annual: 63,
    cta: "Book a demo",
    popular: true,
    features: [
      "Up to 50 seats",
      "All 60+ integrations",
      "AI forecasting & alerts",
      "Scenario planning",
      "Unlimited history",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    blurb: "For organizations with serious scale, security, and SLAs.",
    monthly: null,
    annual: null,
    cta: "Talk to sales",
    popular: false,
    features: [
      "Unlimited seats",
      "SSO/SAML & RBAC",
      "EU / US data residency",
      "Dedicated CSM",
      "Custom contracts & SLAs",
      "White-glove onboarding",
    ],
  },
] as const;

/* --------------------------------- FAQ ----------------------------------- */

export const FAQS = [
  {
    q: "How long does implementation take?",
    a: "Most teams connect their CRM and billing system in under an hour using native integrations — no engineering required. Your first live forecast is typically ready the same day, and our team handles historical backfill for you.",
  },
  {
    q: "Do I need to replace my CRM?",
    a: "No. Prism sits on top of your existing stack — Salesforce, HubSpot, Stripe, your data warehouse, and 60+ other tools. It reads, reconciles, and writes back where you allow it. Your team keeps the workflows they already know.",
  },
  {
    q: "How does the AI forecasting actually work?",
    a: "Prism builds a win probability for every open deal from activity signals, historical outcomes, and deal metadata, then rolls them up into team and company forecasts. Every number comes with its drivers — you always see why, not just what.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. Prism is SOC 2 Type II certified, encrypts data in transit and at rest, and supports SSO/SAML, role-based access control, and regional data residency in the EU or US. We run annual third-party penetration tests.",
  },
  {
    q: "What does the 14-day pilot include?",
    a: "Everything in Growth, on your real data, with white-glove setup from our team. No credit card required. If Prism doesn't change how your Monday pipeline review feels, walk away — your data is deleted on request, immediately.",
  },
  {
    q: "Can Prism handle usage-based or hybrid pricing?",
    a: "Yes. Prism models seats, usage, tiers, and hybrid contracts natively, and reconciles booked revenue against actual billing — so finance and sales finally agree on the same number.",
  },
] as const;

/* -------------------------------- Footer --------------------------------- */

export const FOOTER_COLS = [
  {
    title: "Product",
    links: ["Features", "Integrations", "Pricing", "Changelog", "Roadmap"],
  },
  {
    title: "Company",
    links: ["About", "Customers", "Careers", "Press", "Contact"],
  },
  {
    title: "Resources",
    links: ["Documentation", "API reference", "Guides", "Status", "Community"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Security", "DPA"],
  },
] as const;
