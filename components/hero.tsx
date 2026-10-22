"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Arrow } from "@/components/blocks";
import { houseSrc, LIGHT_ZONES } from "@/components/media";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

// Callouts sit in photo coordinates (fractions of the 2048 x 1152 frame).
const callouts = [
  { x: 0.863, y: 0.152, label: "Eave line", spec: "24 V LED · CKT 09", side: "left" },
  { x: 0.792, y: 0.466, label: "Soffit strip", spec: "2700 K · dimmable · CKT 07", side: "left" },
  { x: 0.735, y: 0.598, label: "Recessed cans", spec: "Scene: Evening · CKT 12", side: "left" },
  { x: 0.905, y: 0.74, label: "Wall wash", spec: "Photocell · CKT 14", side: "left" },
] as const;

const sizes = "(max-width: 760px) 240vw, 120vw";

export function Hero() {
  const [on, setOn] = useState(false);
  const [ready, setReady] = useState(false);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = stage.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const imgs = Array.from(root.querySelectorAll("img"));
    let done = false;
    const go = () => {
      if (done) return;
      done = true;
      setReady(true);
      if (reduce) setOn(true);
      else window.setTimeout(() => setOn(true), 450);
    };
    Promise.all(imgs.map((img) => img.decode().catch(() => undefined))).then(go);
    const fallback = window.setTimeout(go, 2600);
    return () => window.clearTimeout(fallback);
  }, []);

  return (
    <section
      className={`hero${on ? " is-on" : ""}${ready ? " is-ready" : ""}`}
      aria-labelledby="hero-title"
    >
      <div className="hero-visual">
        <div className="stage" ref={stage}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="stage-base"
            {...houseSrc("off")}
            sizes={sizes}
            alt="A modern two-story house at dusk with linear LED soffit lights, recessed lights, and wall-wash uplights, MORAINEX concept"
            width={2048}
            height={1152}
            fetchPriority="high"
          />
          {LIGHT_ZONES.map((zone, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={zone}
              className="stage-light"
              style={{ ["--i" as string]: i }}
              {...houseSrc(zone)}
              sizes={sizes}
              alt=""
              aria-hidden="true"
              width={2048}
              height={1152}
              decoding="async"
            />
          ))}
          <ul className="callouts" aria-hidden="true">
            {callouts.map((c, i) => (
              <li
                key={c.label}
                className={`callout callout-${c.side}`}
                style={{ left: `${c.x * 100}%`, top: `${c.y * 100}%`, ["--i" as string]: i }}
              >
                <span className="callout-dot" />
                <span className="callout-text">
                  <b>{c.label}</b>
                  <span>{c.spec}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="hero-scrim" />
      </div>

      <div className="hero-copy wrap">
        <p className="eyebrow">
          <span className="live-dot" aria-hidden="true" /> Licensed electricians · Denver metro
        </p>
        <h1 id="hero-title">
          Wiring you&apos;ll never <span className="glow">think about</span> again.
        </h1>
        <p className="lede">
          Panels, EV chargers, lighting, and repairs for Front Range homes. A price range before we come out, a written
          quote before we start, and a permit closed when we leave.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-amber btn-lg" href="/estimate/">
            Price my project
            <Arrow />
          </Link>
          <a className="btn btn-glass btn-lg" href={PHONE_TEL}>
            Call {PHONE_DISPLAY}
          </a>
        </div>
        <button
          type="button"
          className="breaker"
          aria-pressed={on}
          onClick={() => setOn((v) => !v)}
        >
          <span className="breaker-track" aria-hidden="true">
            <span className="breaker-handle" />
          </span>
          <span className="breaker-label">
            Lights <b>{on ? "on" : "off"}</b>
          </span>
        </button>
      </div>

      <div className="hero-foot">
        <ul className="wrap trust">
          <li>
            <b>2-year</b> workmanship warranty
          </li>
          <li>
            <b>Permits</b> pulled and closed
          </li>
          <li>
            <b>Arrival windows</b>, not all-day waits
          </li>
          <li>
            <b>Written quote</b> before work starts
          </li>
        </ul>
      </div>
    </section>
  );
}
