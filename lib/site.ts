export const basePath = "/morainex";

export function asset(path: string) {
  return `${basePath}${path}`;
}

export const PHONE_DISPLAY = "(720) 555-0193";
export const PHONE_TEL = "tel:+17205550193";
export const EMAIL = "hello@morainex.example";
export const DEMO_NOTE = "Demo form: nothing is sent and no one is booked or charged.";
export const DISCLAIMER =
  "Range is an estimate only, not a quote. Final price set after on-site inspection, permits, and local code requirements.";

export const nav = [
  { href: "/services", label: "Services" },
  { href: "/estimate", label: "Estimate" },
  { href: "/#ev", label: "EV charging" },
  { href: "/membership", label: "Membership" },
  { href: "/#service-area", label: "Service area" },
  { href: "/book", label: "Book" },
] as const;

export type Svc = {
  id: string;
  code: string;
  name: string;
  scope: string;
  range?: string;
  group: "r" | "c";
};

export const residential: Svc[] = [
  {
    id: "r01",
    code: "R01",
    name: "Panel upgrade",
    scope:
      "Swap an old or full panel for one sized to your house. We apply for the permit and book the inspection when the work needs one.",
    range: "$[low] to $[high] (sample)",
    group: "r",
  },
  {
    id: "r02",
    code: "R02",
    name: "EV charger",
    scope: "Level 2 charger on its own circuit, with a load check first.",
    range: "$[low] to $[high] (sample)",
    group: "r",
  },
  {
    id: "r03",
    code: "R03",
    name: "Lighting",
    scope: "Recessed, under-cabinet, and outdoor lighting, with dimmers and schedules.",
    group: "r",
  },
  {
    id: "r04",
    code: "R04",
    name: "Smart home",
    scope: "Smart switches, sensors, and panel monitoring, wired so they still work offline.",
    group: "r",
  },
  {
    id: "r05",
    code: "R05",
    name: "Solar ready",
    scope: "Panel prep, battery backup circuits, and inverter tie-in.",
    group: "r",
  },
  {
    id: "r06",
    code: "R06",
    name: "Repair or troubleshooting",
    scope: "Dead outlets, tripping breakers, flickering lights. We find the cause and fix it.",
    group: "r",
  },
  {
    id: "r07",
    code: "R07",
    name: "Generator",
    scope: "Standby or portable hookup with a transfer switch, done to code.",
    group: "r",
  },
];

export const commercial: Svc[] = [
  {
    id: "c01",
    code: "C01",
    name: "Tenant finish-outs",
    scope:
      "New circuits, lighting, and outlets for a fresh office or retail space. Built to your plans and your move-in date.",
    group: "c",
  },
  {
    id: "c02",
    code: "C02",
    name: "Lighting retrofits",
    scope:
      "Swap old fixtures for LED, with controls and sensors where they help. Lower bills and fewer burned-out bulbs.",
    group: "c",
  },
  {
    id: "c03",
    code: "C03",
    name: "Service upgrades",
    scope: "Bigger service for new equipment or a growing space. We plan the shutdown around your hours.",
    group: "c",
  },
  {
    id: "c04",
    code: "C04",
    name: "EV fleet charging",
    scope:
      "Chargers for company vehicles, with a load check and a plan for adding more later.",
    range: "$[low] to $[high] (sample)",
    group: "c",
  },
  {
    id: "c05",
    code: "C05",
    name: "Code-violation corrections",
    scope: "Fix the items an inspector or insurer flagged. We walk the list with you and close it out.",
    group: "c",
  },
];

export const services = [...residential, ...commercial];

export const emergencyNodes = [
  { id: "e1", code: "E1", name: "Burning smell or smoke" },
  { id: "e2", code: "E2", name: "Line down outside" },
  { id: "e3", code: "E3", name: "Hot or buzzing panel" },
  { id: "e4", code: "E4", name: "Water near wiring" },
] as const;

export const chips = [
  "Panel upgrade",
  "EV charger",
  "Lighting",
  "Smart home",
  "Solar ready",
  "Repair or troubleshooting",
  "Generator",
] as const;

export const trackerSteps = [
  {
    name: "Booked",
    body: "You're on the schedule. Arrival window: [Tue, 8-10 AM] (example).",
  },
  {
    name: "En route",
    body: "Your electrician is on the way. Expected in about [25 minutes] (example).",
  },
  {
    name: "Permit",
    body: "Permit pulled with the city. Permit #[000000] (example).",
  },
  {
    name: "Inspected",
    body: "Inspection passed. Your job is closed out, and the paperwork is in your account.",
  },
] as const;

export const galleryItems = [
  {
    id: "panel",
    title: "Panel upgrade.",
    before: "Before: a crowded 100-amp panel with doubled-up breakers.",
    after: "After: a labeled 200-amp panel with room to grow.",
    photo: "panel" as const,
  },
  {
    id: "ev",
    title: "EV charger.",
    before: "Before: an extension cord across the garage floor.",
    after: "After: a Level 2 charger on its own circuit, mounted by the door.",
    photo: "ev-charger" as const,
  },
  {
    id: "kitchen",
    title: "Kitchen lighting.",
    before: "Before: one ceiling fixture and dark counters.",
    after: "After: recessed lights and under-cabinet strips on dimmers.",
    photo: null,
  },
  {
    id: "outlet",
    title: "Outdoor outlets.",
    before: "Before: a cracked outlet with no cover.",
    after: "After: a weatherproof GFCI outlet with an in-use cover.",
    photo: null,
  },
  {
    id: "mast",
    title: "Service mast.",
    before: "Before: a leaning mast pulling away from the roof.",
    after: "After: a new mast and meter base, inspected.",
    photo: null,
  },
] as const;

export const reviews = [
  {
    quote:
      "They told me the range on the phone, and the bill landed inside it. The panel swap was done and inspected the same week.",
    who: "Homeowner, Lakewood (sample)",
  },
  {
    quote:
      "We wanted an EV charger. They checked the panel first and told us we didn't need an upgrade.",
    who: "Homeowner, Westminster (sample)",
  },
  {
    quote: "The tracker showed when he was on the way, so I wasn't stuck waiting all morning.",
    who: "Homeowner, Centennial (sample)",
  },
] as const;

export const homeFaqs: { q: string; a: string; dial?: boolean }[] = [
  {
    q: "How do I know if it's an emergency?",
    a: 'Use the "Is this an emergency?" checklist above. For smoke, fire, or a burning smell, get out and Dial 911.',
    dial: true,
  },
  {
    q: "Will I get a price before work starts?",
    a: "Yes. You'll get a range first, then a written price before any work begins.",
  },
  {
    q: "Do you handle permits?",
    a: "When the work needs one, we apply for it and book the inspection.",
  },
  {
    q: "Do you work on businesses too?",
    a: "Yes. See commercial services for finish-outs, retrofits, and fleet charging.",
  },
  {
    q: "When can someone come out?",
    a: "You'll get an arrival window when you book (example).",
  },
  {
    q: "Is this a real company?",
    a: "No. MORAINEX is a concept project built to show what an electrician's site can do.",
  },
];

export const serviceFaqs = [
  {
    q: "Can I get a price before you come out?",
    a: "You'll get a range on the phone or from the calculator, and a written price before any work starts.",
  },
  {
    q: "Do I need a panel upgrade for an EV charger?",
    a: "Not always. We check your panel's load first and tell you straight.",
  },
  {
    q: "Do you work with property managers?",
    a: "Yes. One contact for every unit, and a written scope for each job.",
  },
];

export const financeFaqs = [
  {
    q: "Who's the lender?",
    a: "None. This is a demo, and no lender is connected.",
  },
  {
    q: "Does checking hurt my credit?",
    a: "Depends on the lender. Ask before you apply.",
  },
  {
    q: "Can I pay off early?",
    a: "Depends on the lender's terms.",
  },
];

export const careFaqs = [
  {
    q: "Can I cancel?",
    a: "Sample terms: cancel anytime before your next renewal. A real company sets its own terms.",
  },
  {
    q: "Does it renew on its own?",
    a: "Sample terms: it renews yearly, with a reminder first. A real company sets its own terms.",
  },
  {
    q: "What happens at the safety check?",
    a: "An electrician looks over your panel, breakers, outlets, and detectors and tells you what, if anything, needs work.",
  },
  {
    q: "Is this a real plan?",
    a: "No. MORAINEX is a concept project, and this plan is a sample.",
  },
];

export const hotspots = [
  {
    id: "lighting",
    title: "Lighting",
    body: "Dimmers, scenes, and outdoor lights on a schedule.",
    x: "28%",
    y: "32%",
  },
  {
    id: "switches",
    title: "Switches",
    body: "Smart switches that still work like a normal switch when the Wi-Fi is down.",
    x: "48%",
    y: "46%",
  },
  {
    id: "sensors",
    title: "Sensors",
    body: "Smoke, CO, and water-leak sensors tied together.",
    x: "70%",
    y: "28%",
  },
  {
    id: "panel",
    title: "Panel monitoring",
    body: "See what's using power, circuit by circuit.",
    x: "30%",
    y: "74%",
  },
] as const;

export const timeSlots = ["8-10 AM", "10 AM-12 PM", "12-2 PM", "2-4 PM"] as const;

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

export function upcomingMonths(count = 6) {
  const now = new Date();
  const months: string[] = [];
  for (let i = 0; i < count; i += 1) {
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + i, 1));
    months.push(
      new Intl.DateTimeFormat("en-US", { timeZone: "UTC", month: "long", year: "numeric" }).format(d),
    );
  }
  return months;
}
