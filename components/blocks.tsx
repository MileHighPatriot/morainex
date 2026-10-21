import type { ReactNode } from "react";
import Link from "next/link";
import { DEMO_NOTE, DISCLAIMER, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

export function DemoNote() {
  return <p className="demo-note">{DEMO_NOTE}</p>;
}

export function Disclaimer() {
  return <p className="disclaimer">{DISCLAIMER}</p>;
}

export function PhoneButton({
  children,
  className = "btn btn-primary",
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <a className={className} href={PHONE_TEL}>
      {children ?? `Call ${PHONE_DISPLAY}`}
    </a>
  );
}

export function DownedLine() {
  return (
    <p className="downed">
      <strong>Power line down or sagging?</strong> Stay at least 30 feet away from it and anything it&apos;s touching,
      and keep people and pets back. Treat it as live. <strong>Dial 911</strong>, then report it to Xcel Energy at
      1-800-895-1999. If a line is on your car, stay inside until first responders say it&apos;s safe.
    </p>
  );
}

export function Dial911() {
  return <strong>Dial 911</strong>;
}

const getOut = [
  "A burning smell from an outlet, switch, panel, or appliance",
  "Sparks, smoke, or flames from anything electrical",
  "An outlet or cord that's melting or scorched",
];

const callToday = [
  "Lights that flicker or dim when something turns on",
  "A panel, breaker, or outlet that's warm or hot to the touch. Don't open it or touch it.",
  "A breaker that keeps tripping",
  "Outlets or switches that buzz, crackle, or spark when you plug in",
  "Shocks or tingles from a switch, appliance, or faucet",
  "Part of the house went dead and resetting the breaker didn't fix it",
];

export function EmergencyChecklist({ callCard = false }: { callCard?: boolean }) {
  return (
    <div className="check" id="s3">
      {callCard && (
        <div className="call-card">
          <PhoneButton className="btn btn-light btn-block" />
        </div>
      )}
      <h2>Is this an emergency?</h2>
      <p className="lede">Safety first. If any of these is happening, don&apos;t wait for us.</p>
      <div className="tier tier-hot">
        <p className="tier-lead">
          Get out now, then <Dial911 /> from outside:
        </p>
        <ul className="check-list">
          {getOut.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <DownedLine />
      <div className="tier">
        <h3>Call us today (not an emergency, but don&apos;t put it off):</h3>
        <ul className="check-list">
          {callToday.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="row-actions">
        <PhoneButton className="btn btn-light btn-block" />
        <Link className="btn btn-ghost btn-block" href="/book">
          Book a visit
        </Link>
      </div>
      <p className="small">
        This checklist is general safety guidance, not a diagnosis. When in doubt, get out and <Dial911 />.
      </p>
    </div>
  );
}

export function FaqList({
  items,
}: {
  items: { q: string; a: string; dial?: boolean }[];
}) {
  return (
    <div className="faq-list">
      {items.map((item) => (
        <details key={item.q} className="faq">
          <summary>{item.q}</summary>
          <p>
            {item.dial ? (
              <>
                Use the &quot;Is this an emergency?&quot; checklist above. For smoke, fire, or a burning smell, get out
                and <Dial911 />.
              </>
            ) : (
              item.a
            )}
          </p>
        </details>
      ))}
    </div>
  );
}

export function Financing({ id = "financing" }: { id?: string }) {
  return (
    <section className="card finance" id={id}>
      <h2>Pay over time</h2>
      <p className="price">As low as $[X]/mo for [N] months (sample)</p>
      <p className="disclaimer">Subject to credit approval. Terms vary. Sample only; no lender is connected.</p>
      <details className="demo-reveal">
        <summary className="btn btn-primary">Check options</summary>
        <form className="stack" method="dialog">
          <DemoNote />
          <label className="field">
            Name
            <input type="text" autoComplete="name" />
          </label>
          <label className="field">
            Phone
            <input type="tel" autoComplete="tel" inputMode="tel" />
          </label>
          <button className="btn btn-primary" type="button">
            Send
          </button>
        </form>
      </details>
    </section>
  );
}

export function CareTeaser() {
  return (
    <section className="card plan" id="s13">
      <h2>Morainex Care (concept)</h2>
      <p>One visit a year to catch problems early, plus a few perks when you need us.</p>
      <ul className="plain-list">
        <li>A yearly electrical safety check: panel, breakers, outlets, and smoke and CO detectors</li>
        <li>Priority scheduling</li>
        <li>[X]% off repairs (sample)</li>
        <li>Reminder text before your yearly check</li>
      </ul>
      <p className="price">$[X]/yr (sample; the client sets real prices)</p>
      <Link className="btn btn-primary" href="/membership">
        See Morainex Care
      </Link>
      <p className="small">Example plan for a concept site. Not a real offer.</p>
    </section>
  );
}
