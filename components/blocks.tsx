import type { ReactNode } from "react";
import Link from "next/link";
import { CARE_PRICE, DEMO_NOTE, DISCLAIMER, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

export function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
      <path
        d="M4 10h11m-4-4 4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Bolt({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path fill="currentColor" d="M13.2 2 4.5 13.4h6.1L9.8 22l8.7-11.4h-6.1L13.2 2z" />
    </svg>
  );
}

export function PhoneIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.6 3.8c.3-.7 1-1.1 1.8-1l2.6.4c.7.1 1.2.7 1.3 1.4l.4 2.4c.1.7-.2 1.4-.8 1.8l-1.5 1a12.4 12.4 0 0 0 5.4 5.4l1-1.5c.4-.6 1.1-.9 1.8-.8l2.4.4c.7.1 1.3.6 1.4 1.3l.4 2.6c.1.8-.3 1.5-1 1.8l-1.6.7C14.2 22.2 2 10.4 3.5 5.4l.7-1.6z"
      />
    </svg>
  );
}

export function DemoNote() {
  return <p className="demo-note">{DEMO_NOTE}</p>;
}

export function Disclaimer() {
  return <p className="fine">{DISCLAIMER}</p>;
}

export function PhoneButton({
  children,
  className = "btn btn-amber",
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <a className={className} href={PHONE_TEL}>
      <PhoneIcon />
      {children ?? `Call ${PHONE_DISPLAY}`}
    </a>
  );
}

export function Dial911() {
  return <strong>call 911</strong>;
}

export function DownedLine() {
  return (
    <p className="downed">
      <strong>Power line down or sagging?</strong> Stay at least 30 feet from it and anything it&apos;s touching, and
      keep people and pets back. Treat it as live. Call 911, then report it to Xcel Energy at 1-800-895-1999. If a line
      is on your car, stay inside until first responders say it&apos;s safe.
    </p>
  );
}

export const getOut = [
  "A burning smell from an outlet, switch, panel, or appliance",
  "Sparks, smoke, or flames from anything electrical",
  "An outlet or cord that's melting or scorched",
];

export const callToday = [
  "Lights that flicker or dim when something turns on",
  "A panel, breaker, or outlet that's warm to the touch (don't open it)",
  "A breaker that trips again right after you reset it",
  "Outlets or switches that buzz, crackle, or spark",
  "Shocks or tingles from a switch, appliance, or faucet",
  "Part of the house went dead and the breaker didn't fix it",
];

export function EmergencyTiers() {
  return (
    <div className="tiers">
      <div className="tier tier-hot">
        <p className="tier-key">Get out first</p>
        <h3>
          Leave the house, then <Dial911 /> from outside.
        </h3>
        <ul className="ticks">
          {getOut.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="tier">
        <p className="tier-key">Call us today</p>
        <h3>Not an emergency, but don&apos;t sit on it.</h3>
        <ul className="ticks">
          {callToday.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="faq-list">
      {items.map((item) => (
        <details key={item.q} className="faq">
          <summary>
            {item.q}
            <span className="faq-icon" aria-hidden="true" />
          </summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export function SectionHead({
  kicker,
  title,
  children,
  center = false,
}: {
  kicker: string;
  title: ReactNode;
  children?: ReactNode;
  center?: boolean;
}) {
  return (
    <header className={`section-head${center ? " center" : ""}`} data-reveal>
      <p className="kicker">{kicker}</p>
      <h2>{title}</h2>
      {children ? <p className="lede">{children}</p> : null}
    </header>
  );
}

export function CarePlan() {
  return (
    <article className="plan-card" data-reveal>
      <div className="plan-top">
        <p className="kicker">Morainex Care</p>
        <p className="plan-price">
          {CARE_PRICE}
          <span>/year</span>
        </p>
      </div>
      <p>One visit a year to catch problems before they become a 9 PM phone call.</p>
      <ul className="ticks">
        <li>Yearly safety check of panel, breakers, GFCI and AFCI, and detectors</li>
        <li>Priority scheduling when something breaks</li>
        <li>15% off repairs</li>
        <li>Whole-home surge check</li>
      </ul>
      <Link className="btn btn-amber" href="/membership/">
        See the plan <Arrow />
      </Link>
      <p className="fine">Sample plan and price for a concept site.</p>
    </article>
  );
}

export function Financing() {
  return (
    <article className="plan-card plan-alt" id="financing" data-reveal>
      <div className="plan-top">
        <p className="kicker">Pay over time</p>
        <p className="plan-price">
          ~$85<span>/month</span>
        </p>
      </div>
      <p>Spread a panel upgrade or a whole-house project across monthly payments.</p>
      <ul className="ticks">
        <li>Example: $4,000 over 60 months at 9.99% APR</li>
        <li>Check options without slowing down the job</li>
        <li>Same written quote either way</li>
      </ul>
      <Link className="btn btn-glass" href="/book/#financing">
        Financing details <Arrow />
      </Link>
      <p className="fine">Subject to credit approval. Sample terms; no lender is connected.</p>
    </article>
  );
}
