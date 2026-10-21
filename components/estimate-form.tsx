"use client";

import Link from "next/link";
import { LoadVisual } from "@/components/load-visual";
import { useEffect, useState } from "react";
import { DemoNote, Disclaimer } from "@/components/blocks";
import {
  couldChange,
  evIncluded,
  evReady,
  panelIncluded,
  panelReady,
  PLACEHOLDER_RANGE,
  rangeText,
} from "@/lib/estimate";

function read(root: HTMLElement) {
  const value = (name: string) =>
    (root.querySelector(`input[name="${name}"]:checked`) as HTMLInputElement | null)?.value ?? "";
  return {
    type: value("type") || "ev",
    ev: {
      owned: value("owned"),
      distance: value("distance"),
      amps: value("amps"),
      place: value("place"),
    },
    panel: {
      current: value("current"),
      target: value("target"),
      age: value("age"),
    },
  };
}

export function EstimateForm() {
  const [label, setLabel] = useState(PLACEHOLDER_RANGE);
  const [ready, setReady] = useState(0);
  const [sent, setSent] = useState(false);
  const [vis, setVis] = useState<{ type: "ev" | "panel"; distance: string; amps: string; target: string }>({
    type: "ev",
    distance: "",
    amps: "",
    target: "",
  });

  const apply = (root: HTMLElement) => {
    const data = read(root);
    const result = data.type === "panel" ? panelReady(data.panel) : evReady(data.ev);
    setVis(
      data.type === "panel"
        ? { type: "panel", distance: "", amps: data.panel.current, target: data.panel.target }
        : { type: "ev", distance: data.ev.distance, amps: data.ev.amps, target: "" },
    );
    if (!result) {
      setLabel(PLACEHOLDER_RANGE);
      setReady(0);
      return;
    }
    setLabel(rangeText(result.low, result.high));
    setReady(result.ready);
  };

  useEffect(() => {
    const type = new URLSearchParams(window.location.search).get("type");
    const root = document.getElementById("estimator");
    if (!(root instanceof HTMLElement)) return;
    if (type === "panel") {
      const input = root.querySelector<HTMLInputElement>('input[name="type"][value="panel"]');
      if (input) input.checked = true;
    }
    apply(root);
  }, []);

  return (
    <div
      id="estimator"
      className="estimator"
      onChange={(event) => {
        const root = event.currentTarget;
        apply(root);
      }}
    >
      <ol className="step-rail">
        <li>
          <a href="#est-type">1 Type</a>
        </li>
        <li>
          <a href="#est-details">2 Details</a>
        </li>
        <li>
          <a href="#est-range">3 Range</a>
        </li>
        <li>
          <a href="#est-send">4 Send</a>
        </li>
      </ol>

      <section id="est-type">
        <h2>1 Type</h2>
        <div className="type-grid">
          <label className="type-tile">
            <input type="radio" name="type" value="ev" defaultChecked />
            EV charger install
          </label>
          <label className="type-tile">
            <input type="radio" name="type" value="panel" />
            Panel upgrade
          </label>
        </div>
      </section>

      <section id="est-details">
        <h2>2 Details</h2>
        <div className="detail-block detail-ev">
          <h3>EV charger install</h3>
          <fieldset>
            <legend>Do you already have the charger?</legend>
            <div className="options">
              <label className="opt">
                <input type="radio" name="owned" value="yes" />
                Yes
              </label>
              <label className="opt">
                <input type="radio" name="owned" value="no" />
                No
              </label>
            </div>
          </fieldset>
          <fieldset>
            <legend>How far is the panel from where you&apos;ll park?</legend>
            <div className="options">
              {[
                ["short", "Under 25 ft"],
                ["mid", "25 to 75 ft"],
                ["long", "Over 75 ft"],
              ].map(([value, text]) => (
                <label className="opt" key={value}>
                  <input type="radio" name="distance" value={value} />
                  {text}
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>Panel size</legend>
            <div className="options">
              {[
                ["100", "100 amps"],
                ["150", "150 amps"],
                ["200", "200 amps"],
                ["unsure", "Not sure"],
              ].map(([value, text]) => (
                <label className="opt" key={value}>
                  <input type="radio" name="amps" value={value} />
                  {text}
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>Garage or outdoor?</legend>
            <div className="options">
              <label className="opt">
                <input type="radio" name="place" value="garage" />
                Garage
              </label>
              <label className="opt">
                <input type="radio" name="place" value="outdoor" />
                Outdoor
              </label>
            </div>
          </fieldset>
        </div>
        <div className="detail-block detail-panel">
          <h3>Panel upgrade</h3>
          <fieldset>
            <legend>Current panel size</legend>
            <div className="options">
              {[
                ["100", "100 amps"],
                ["150", "150 amps"],
                ["200", "200 amps"],
                ["unsure", "Not sure"],
              ].map(([value, text]) => (
                <label className="opt" key={value}>
                  <input type="radio" name="current" value={value} />
                  {text}
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>Target size</legend>
            <div className="options">
              <label className="opt">
                <input type="radio" name="target" value="200" />
                200 amps
              </label>
              <label className="opt">
                <input type="radio" name="target" value="400" />
                400 amps
              </label>
            </div>
          </fieldset>
          <fieldset>
            <legend>About how old is the house?</legend>
            <div className="options">
              {[
                ["old", "Before 1970"],
                ["mid", "1970 to 1999"],
                ["new", "2000 or newer"],
                ["unsure", "Not sure"],
              ].map(([value, text]) => (
                <label className="opt" key={value}>
                  <input type="radio" name="age" value={value} />
                  {text}
                </label>
              ))}
            </div>
          </fieldset>
          <p>Permits: we handle them.</p>
        </div>
      </section>

      <section id="est-range" className="range-card">
        <h2>3 Range</h2>
        <LoadVisual {...vis} ready={ready} />
        <p className="range">Your estimate: {label}</p>
        <h3>What&apos;s included</h3>
        <ul className="plain-list include-ev">
          {evIncluded.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <ul className="plain-list include-panel">
          {panelIncluded.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>What could change it: {couldChange}.</p>
        <Disclaimer />
      </section>

      <section id="est-send">
        <h2>4 Send</h2>
        <form
          className="stack"
          method="dialog"
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
          <fieldset>
            <legend>Best time</legend>
            <div className="options">
              {["Morning", "Midday", "Afternoon", "Evening"].map((slot) => (
                <label className="opt" key={slot}>
                  <input type="radio" name="when" value={slot} />
                  {slot}
                </label>
              ))}
            </div>
          </fieldset>
          <button className="btn btn-primary" type="submit">
            Book a visit
          </button>
          <Link className="text-link" href="/book#financing">
            See financing
          </Link>
          {sent ? (
            <p className="confirm" role="status">
              Demo only. Nothing was sent, and no one is booked or charged.
            </p>
          ) : null}
        </form>
      </section>
    </div>
  );
}
