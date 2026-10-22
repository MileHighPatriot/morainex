export const basePath = "/morainex";

export function asset(path: string) {
  return `${basePath}${path}`;
}

export const PHONE_DISPLAY = "(720) 555-0193";
export const PHONE_TEL = "tel:+17205550193";
export const EMAIL = "hello@morainex.example";
export const DEMO_NOTE = "Demo form. Nothing is sent, and no one is booked or charged.";
export const DISCLAIMER =
  "Sample range for a concept site, not a quote. A real price is set after an on-site look, permits, and local code.";

export const nav = [
  { href: "/services/", label: "Services" },
  { href: "/estimate/", label: "Pricing" },
  { href: "/membership/", label: "Care plan" },
  { href: "/emergency/", label: "Emergency" },
] as const;

export type PhotoName = "hero" | "panel" | "ev-charger" | "solar" | "smart-control";

export type Svc = {
  id: string;
  ckt: string;
  name: string;
  short: string;
  scope: string;
  price: string;
  group: "r" | "c";
  photo?: PhotoName;
  includes?: string[];
};

export const residential: Svc[] = [
  {
    id: "panel",
    ckt: "01",
    name: "Panel upgrades",
    short: "100 to 200 amps, labeled breakers, permit pulled and closed.",
    scope:
      "Swap an old, full, or recalled panel for one sized to how you actually live now. Every breaker labeled, every permit pulled and closed.",
    price: "$2,800 – $4,700",
    group: "r",
    photo: "panel",
    includes: ["Load calculation first", "Utility disconnect scheduled for you", "Typed breaker directory"],
  },
  {
    id: "ev",
    ckt: "02",
    name: "EV chargers",
    short: "Level 2 at home, with a load check before you buy anything.",
    scope:
      "A 240-volt Level 2 charger on its own circuit, mounted where the cord actually reaches. We check your panel first, so you don't upgrade what you don't need to.",
    price: "$1,600 – $2,800",
    group: "r",
    photo: "ev-charger",
    includes: ["Load check before you buy", "Dedicated 50 or 60 A circuit", "Rebate paperwork help"],
  },
  {
    id: "lighting",
    ckt: "03",
    name: "Lighting",
    short: "Recessed, linear LED, landscape, and scenes on dimmers.",
    scope:
      "Recessed cans, linear LED in soffits and coves, under-cabinet strips, and landscape lights, all on dimmers and schedules that make sense.",
    price: "From $240 a fixture",
    group: "r",
    photo: "hero",
  },
  {
    id: "smart",
    ckt: "04",
    name: "Smart home",
    short: "Switches, sensors, and panel monitoring that still work offline.",
    scope:
      "Smart switches, leak and smoke sensors, and circuit-level energy monitoring, wired so every switch still works like a switch when the Wi-Fi is down.",
    price: "From $165 a switch",
    group: "r",
    photo: "smart-control",
  },
  {
    id: "solar",
    ckt: "05",
    name: "Solar and battery ready",
    short: "Panel prep, backup circuits, and inverter tie-in.",
    scope:
      "Get your service ready for solar and a home battery now, so you don't pay for a second panel upgrade later.",
    price: "$1,900 – $3,600",
    group: "r",
    photo: "solar",
  },
  {
    id: "repair",
    ckt: "06",
    name: "Repairs and troubleshooting",
    short: "Dead outlets, tripping breakers, flickering lights.",
    scope: "We trace the cause, not just the symptom, and fix it the same visit when we can.",
    price: "$129 diagnostic, credited to the repair",
    group: "r",
  },
  {
    id: "generator",
    ckt: "07",
    name: "Generators",
    short: "Inlet and interlock, or a full standby transfer switch.",
    scope: "Portable generator inlets with a code-legal interlock, or a standby unit with an automatic transfer switch.",
    price: "$1,400 – $3,200",
    group: "r",
  },
];

export const commercial: Svc[] = [
  {
    id: "finish",
    ckt: "C1",
    name: "Tenant finish-outs",
    short: "Circuits, lighting, and data for a fresh space.",
    scope: "New circuits, lighting, and outlets for an office or retail space, built to your plans and your move-in date.",
    price: "Quoted after a walkthrough",
    group: "c",
  },
  {
    id: "retrofit",
    ckt: "C2",
    name: "LED retrofits",
    short: "Lower bills, fewer ladders.",
    scope: "Swap old fixtures for LED with occupancy and daylight controls, plus help with utility rebates.",
    price: "Quoted after a walkthrough",
    group: "c",
  },
  {
    id: "fleet",
    ckt: "C3",
    name: "Fleet EV charging",
    short: "Chargers for company vehicles, planned to grow.",
    scope: "Chargers for company vehicles, with a load study and a plan for adding ports later.",
    price: "From $3,900 a port",
    group: "c",
  },
  {
    id: "code",
    ckt: "C4",
    name: "Code corrections",
    short: "Close out what an inspector or insurer flagged.",
    scope: "We walk the list with you, fix every item, and get it signed off.",
    price: "Quoted after a walkthrough",
    group: "c",
  },
];

export const services = [...residential, ...commercial];

export const reviews = [
  {
    quote: "They gave me a range on the phone and the bill landed inside it. Panel swapped and inspected the same week.",
    who: "Dana R.",
    where: "Lakewood",
    job: "200 A panel upgrade",
  },
  {
    quote: "We were sure we needed a new panel for the EV charger. They checked the load first and told us we didn't.",
    who: "Marcus T.",
    where: "Westminster",
    job: "Level 2 EV charger",
  },
  {
    quote: "The soffit lighting changed how the whole house looks at night. Clean runs, no visible wire anywhere.",
    who: "Priya S.",
    where: "Centennial",
    job: "Exterior lighting",
  },
] as const;

export const steps = [
  { name: "Call or price it", body: "Tell us what's going on, or use the price tool. You get a range and an arrival window." },
  { name: "Walkthrough", body: "A licensed electrician looks at it in person. No upsell script." },
  { name: "Written quote", body: "One price, in writing, before anything gets cut or pulled." },
  { name: "Wired and inspected", body: "Permit closed, panel labeled, and photos of the work sent to you." },
] as const;

export const homeFaqs: { q: string; a: string }[] = [
  {
    q: "How do I know if it's an emergency?",
    a: "A burning smell, smoke, sparks, or a hot panel means get everyone out and call 911 from outside. Then call us. The emergency page walks through the rest.",
  },
  {
    q: "Will I get a price before work starts?",
    a: "Yes. A range on the phone or from the price tool, then a written price after the walkthrough, before any work begins.",
  },
  {
    q: "Do you handle permits?",
    a: "Yes. We pull the permit, book the inspection, and close it out. You don't have to call the city.",
  },
  {
    q: "Do I need a panel upgrade for an EV charger?",
    a: "Often not. Many 150 and 200 A panels can carry a charger. We run a load check before you buy anything.",
  },
  {
    q: "Do you work on businesses?",
    a: "Yes. Finish-outs, LED retrofits, fleet charging, and code corrections, scheduled around your hours.",
  },
  {
    q: "Is MORAINEX a real company?",
    a: "No. MORAINEX is a concept site built to show what an electrician's website can do. Prices, reviews, and photos are samples.",
  },
];

export const careFaqs = [
  {
    q: "Can I cancel?",
    a: "Sample terms: cancel anytime before your next renewal. A real company sets its own terms.",
  },
  {
    q: "Does it renew on its own?",
    a: "Sample terms: yearly, with a text reminder two weeks before. A real company sets its own terms.",
  },
  {
    q: "What happens at the safety check?",
    a: "An electrician checks your panel, breakers, GFCI and AFCI protection, outlets, and smoke and CO detectors, then tells you what, if anything, needs work.",
  },
];

export const financeFaqs = [
  { q: "Who's the lender?", a: "None. This is a concept site, and no lender is connected." },
  { q: "Does checking hurt my credit?", a: "It depends on the lender. Ask before you apply." },
  { q: "Can I pay it off early?", a: "It depends on the lender's terms." },
];

export const CARE_PRICE = "$149";

export const timeSlots = ["8 – 10 AM", "10 AM – 12 PM", "12 – 2 PM", "2 – 4 PM"] as const;

export function upcomingDays(count = 8) {
  const days: { iso: string; wd: string; mon: string; day: string }[] = [];
  const now = new Date();
  for (let i = 1; days.length < count && i < 24; i += 1) {
    const d = new Date(now.getTime() + i * 86400000);
    const wd = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Denver",
      weekday: "short",
    }).format(d);
    if (wd === "Sun") continue;
    const mon = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Denver",
      month: "short",
    }).format(d);
    const day = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Denver",
      day: "numeric",
    }).format(d);
    const iso = new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/Denver",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(d);
    days.push({ iso, wd, mon, day });
  }
  return days;
}

export function upcomingMonths(count = 4) {
  const now = new Date();
  const months: string[] = [];
  for (let i = 0; i < count; i += 1) {
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + i, 1));
    months.push(new Intl.DateTimeFormat("en-US", { timeZone: "UTC", month: "long" }).format(d));
  }
  return months;
}
