"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Arrow, DemoNote, Disclaimer } from "@/components/blocks";
import { couldChange, evIncluded, evReady, panelIncluded, panelReady, rangeText } from "@/lib/estimate";

type Choice = readonly (readonly [string, string])[];

const ev: { name: "owned" | "distance" | "amps" | "place"; legend: string; options: Choice }[] = [
  { name: "owned", legend: "Do you already have the charger?", options: [["yes", "Yes"], ["no", "Not yet"]] },
  {
    name: "distance",
    legend: "How far is the panel from where you park?",
    options: [["short", "Under 25 ft"], ["mid", "25 – 75 ft"], ["long", "Over 75 ft"]],
  },
  {
    name: "amps",
    legend: "Panel size",
    options: [["100", "100 A"], ["150", "150 A"], ["200", "200 A"], ["unsure", "Not sure"]],
  },
  { name: "place", legend: "Garage or outdoor?", options: [["garage", "Garage"], ["outdoor", "Outdoor"]] },
];

const panel: { name: "current" | "target" | "age"; legend: string; options: Choice }[] = [
  {
    name: "current",
    legend: "Panel size now",
    options: [["100", "100 A"], ["150", "150 A"], ["200", "200 A"], ["unsure", "Not sure"]],
  },
  { name: "target", legend: "Size you want", options: [["200", "200 A"], ["400", "400 A"]] },
  {
    name: "age",
    legend: "About how old is the house?",
    options: [["old", "Before 1970"], ["mid", "1970 – 1999"], ["new", "2000 or newer"], ["unsure", "Not sure"]],
  },
];

function Options({
  name,
  legend,
  options,
  value,
  onPick,
}: {
  name: string;
  legend: string;
  options: Choice;
  value: string;
  onPick: (v: string) => void;
}) {
  return (
    <fieldset>
      <legend>{legend}</legend>
      <div className="options">
        {options.map(([v, text]) => (
          <label className="opt" key={v}>
            <input type="radio" name={name} value={v} checked={value === v} onChange={() => onPick(v)} />
            {text}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function EstimateForm() {
  const [type, setType] = useState<"ev" | "panel">("ev");
  const [evIn, setEv] = useState({ owned: "", distance: "", amps: "", place: "" });
  const [panelIn, setPanel] = useState({ current: "", target: "", age: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("type") === "panel") setType("panel");
  }, []);

  const result = type === "ev" ? evReady(evIn) : panelReady(panelIn);
  const preview = type === "ev" ? evReady(evIn, true) : panelReady(panelIn, true);
  const answers = type === "ev" ? Object.values(evIn) : Object.values(panelIn);
  const answered = answers.filter(Boolean).length;

  return (
    <div className="estimator">
      <div className="est-steps">
        <section className="card est-block">
          <h2>
            <span>1</span> What are we pricing?
          </h2>
          <div className="type-grid">
            {(
              [
                ["ev", "EV charger"],
                ["panel", "Panel upgrade"],
              ] as const
            ).map(([v, text]) => (
              <label className="opt type-tile" key={v}>
                <input type="radio" name="type" value={v} checked={type === v} onChange={() => setType(v)} />
                {text}
              </label>
            ))}
          </div>
        </section>

        <section className="card est-block">
          <h2>
            <span>2</span> A few details
          </h2>
          {type === "ev"
            ? ev.map((q) => (
                <Options
                  key={q.name}
                  {...q}
                  value={evIn[q.name]}
                  onPick={(v) => setEv((s) => ({ ...s, [q.name]: v }))}
                />
              ))
            : panel.map((q) => (
                <Options
                  key={q.name}
                  {...q}
                  value={panelIn[q.name]}
                  onPick={(v) => setPanel((s) => ({ ...s, [q.name]: v }))}
                />
              ))}
        </section>

        <section className="card est-block" id="send">
          <h2>
            <span>3</span> Send it to us
          </h2>
          <form
            className="stack"
            onSubmit={(event) => {
              event.preventDefault();
              setSent(true);
            }}
          >
            <DemoNote />
            <label className="field">
              Name
              <input type="text" autoComplete="name" />
            </label>
            <label className="field">
              Phone
              <input type="tel" autoComplete="tel" inputMode="tel" />
            </label>
            <label className="field">
              ZIP
              <input inputMode="numeric" autoComplete="postal-code" maxLength={10} />
            </label>
            <button className="btn btn-amber" type="submit">
              Request a walkthrough
            </button>
            {sent ? (
              <p className="confirm" role="status">
                Demo only. Nothing was sent, and no one is booked or charged.
              </p>
            ) : null}
          </form>
        </section>
      </div>

      <aside className="card est-result" aria-live="polite">
        <div className="progress" aria-hidden="true">
          {answers.map((a, i) => (
            <span key={i} className={i < answered ? "is-on" : undefined} />
          ))}
        </div>
        <p className="kicker">{result ? "Your sample range" : "Ballpark so far"}</p>
        <p className="quick-range">
          {result
            ? rangeText(result.low, result.high)
            : preview
              ? rangeText(preview.low, preview.high)
              : type === "ev"
                ? "$1,600 – $11,900"
                : "$2,100 – $9,600"}
        </p>
        <p className="quick-note">
          {result
            ? "Every question answered. A walkthrough turns this into a written price."
            : `Answer ${answers.length - answered} more ${answers.length - answered === 1 ? "question" : "questions"} to narrow it down.`}
        </p>
        <h3>What&apos;s included</h3>
        <ul className="ticks">
          {(type === "ev" ? evIncluded : panelIncluded).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="fine">What could change it: {couldChange}.</p>
        <Disclaimer />
        <p style={{ marginTop: 18 }}>
          <Link className="link-arrow" href="/book/#financing">
            See financing <Arrow />
          </Link>
        </p>
      </aside>
    </div>
  );
}
