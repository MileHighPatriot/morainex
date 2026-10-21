export type EvInput = {
  owned: string;
  distance: string;
  amps: string;
  place: string;
};

export type PanelInput = {
  current: string;
  target: string;
  age: string;
};

export type RangeResult = {
  low: number;
  high: number;
  ready: number;
};

function clamp(n: number) {
  return Math.max(8, Math.min(96, Math.round(n)));
}

export function money(n: number) {
  return `$${n.toLocaleString("en-US")}`;
}

export function rangeText(low: number, high: number) {
  return `${money(low)} to ${money(high)} (sample)`;
}

export const PLACEHOLDER_RANGE = "$[low] to $[high] (sample)";

export function evReady(input: EvInput, partial = false): RangeResult | null {
  if (!partial && (!input.owned || !input.distance || !input.amps || !input.place)) return null;
  if (partial && !input.distance && !input.owned && !input.amps && !input.place) return null;
  let low = 1600;
  let high = 2800;
  let ready = 50;
  if (input.distance === "short") ready += 16;
  else if (input.distance === "mid") {
    low += 700;
    high += 1200;
    ready += 4;
  } else if (input.distance === "long") {
    low += 1500;
    high += 2500;
    ready -= 10;
  }
  if (input.owned === "no") {
    low += 800;
    high += 1400;
    ready -= 4;
  } else if (input.owned === "yes") ready += 8;
  if (input.place === "outdoor") {
    low += 400;
    high += 800;
    ready -= 4;
  } else if (input.place === "garage") ready += 6;
  if (input.amps === "100") {
    low += 2600;
    high += 4400;
    ready -= 22;
  } else if (input.amps === "150") {
    low += 1000;
    high += 1800;
    ready -= 8;
  } else if (input.amps === "200") ready += 14;
  else if (input.amps === "unsure") {
    high += 2100;
    ready -= 6;
  }
  return { low, high, ready: clamp(ready) };
}

export function panelReady(input: PanelInput, partial = false): RangeResult | null {
  if (!partial && (!input.current || !input.target || !input.age)) return null;
  if (partial && !input.current && !input.target && !input.age) return null;
  let low = 2800;
  let high = 4700;
  let ready = 46;
  const current = input.current || "100";
  const target = input.target || "200";
  if (current === "150" && target === "200") {
    low = 2100;
    high = 3600;
    ready = 64;
  } else if (current === "100" && target === "200") {
    low = 2800;
    high = 4700;
    ready = 50;
  } else if (current === "200" && target === "200") {
    low = 2400;
    high = 4100;
    ready = 58;
  } else if (current === "200" && target === "400") {
    low = 4300;
    high = 7100;
    ready = 54;
  } else if (current === "150" && target === "400") {
    low = 4600;
    high = 7600;
    ready = 38;
  } else if (current === "100" && target === "400") {
    low = 5200;
    high = 8400;
    ready = 30;
  } else if (current === "unsure") {
    low = 2100;
    high = 8400;
    ready = 36;
  }
  if (input.age === "old") {
    low += 600;
    high += 1200;
    ready -= 10;
  } else if (input.age === "mid") {
    low += 300;
    high += 700;
    ready -= 4;
  } else if (input.age === "new") ready += 8;
  else if (input.age === "unsure") {
    high += 900;
    ready -= 4;
  }
  return { low, high, ready: clamp(ready) };
}

export const evIncluded = [
  "Level 2 charger on its own circuit",
  "Load check first",
  "Mounting where the cord reaches",
  "Permit handling when the work needs one",
];

export const panelIncluded = [
  "Panel sized to the target you pick",
  "Labeled breakers",
  "Permit and inspection booking when the work needs one",
];

export const couldChange = "panel condition, wire run length, permit requirements";
