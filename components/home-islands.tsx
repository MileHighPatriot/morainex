"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Diagram, Photo } from "@/components/media";
import { LoadVisual } from "@/components/load-visual";
import { Disclaimer } from "@/components/blocks";
import {
  evReady,
  panelReady,
  PLACEHOLDER_RANGE,
  rangeText,
} from "@/lib/estimate";
import { galleryItems, hotspots, trackerSteps } from "@/lib/site";
import { lookupZip, towns } from "@/lib/zips";

export function EstimateTeaser() {
  const [tab, setTab] = useState<"ev" | "panel">("ev");
  const [distance, setDistance] = useState("");
  const [current, setCurrent] = useState("");

  const ev = evReady({ owned: "", distance, amps: "", place: "" }, true);
  const panel = panelReady({ current, target: current === "200" ? "400" : "200", age: "" }, true);
  const active = tab === "ev" ? ev : panel;
  const label = active ? rangeText(active.low, active.high) : PLACEHOLDER_RANGE;
  const ready = active?.ready ?? 0;

  return (
    <div className="teaser">
      <div className="path-tabs" role="tablist" aria-label="Estimate type">
        <button className="tab" type="button" role="tab" aria-selected={tab === "ev"} onClick={() => setTab("ev")}>
          EV charger
        </button>
        <button className="tab" type="button" role="tab" aria-selected={tab === "panel"} onClick={() => setTab("panel")}>
          Panel upgrade
        </button>
      </div>
      {tab === "ev" ? (
        <div className="options" role="group" aria-label="How far is the panel from where you'll park?">
          {[
            ["short", "Under 25 ft"],
            ["mid", "25 to 75 ft"],
            ["long", "Over 75 ft"],
          ].map(([value, text]) => (
            <button
              key={value}
              type="button"
              className={`opt${distance === value ? " is-on" : ""}`}
              aria-pressed={distance === value}
              onClick={() => setDistance(value)}
            >
              {text}
            </button>
          ))}
        </div>
      ) : (
        <div className="options" role="group" aria-label="Current panel size">
          {[
            ["100", "100 amps"],
            ["150", "150 amps"],
            ["200", "200 amps"],
          ].map(([value, text]) => (
            <button
              key={value}
              type="button"
              className={`opt${current === value ? " is-on" : ""}`}
              aria-pressed={current === value}
              onClick={() => setCurrent(value)}
            >
              {text}
            </button>
          ))}
        </div>
      )}
      <LoadVisual type={tab} distance={distance} amps={current} target={current === "200" ? "400" : current ? "200" : ""} ready={ready} />
      <p className="range">{label}</p>
      <Disclaimer />
      <Link className="btn btn-light" href={`/estimate?type=${tab}`}>
        Open the full calculator
      </Link>
    </div>
  );
}

export function JobTracker() {
  const [active, setActive] = useState(0);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const node = document.getElementById("s10");
    if (!node) return;
    let timer = 0;
    const start = () => {
      setLive(true);
      timer = window.setInterval(() => {
        setActive((n) => (n + 1) % trackerSteps.length);
      }, 2500);
    };
    const stop = () => {
      window.clearInterval(timer);
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) start();
        else stop();
      },
      { threshold: 0.4 },
    );
    io.observe(node);
    return () => {
      stop();
      io.disconnect();
    };
  }, []);

  return (
    <ol className={`tracker${live ? " is-live" : ""}`}>
      {trackerSteps.map((step, index) => (
        <li key={step.name} className={live && index === active ? "is-active" : undefined}>
          <span className="node-code">{index + 1}</span>
          <div>
            <h3>{step.name}</h3>
            <p>{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

const kindFor = (id: string) => (id === "ev" ? "ev" : id);

export function Gallery() {
  const [index, setIndex] = useState(0);
  const [pos, setPos] = useState(56);
  const item = galleryItems[index];

  return (
    <div>
      <div className="ba-slider">
        <div className="ba-frame">
          <div className="ba-layer">
            {item.photo ? (
              <Photo name={item.photo} alt={`${item.after} Sample after.`} />
            ) : (
              <Diagram kind={kindFor(item.id)} phase="after" />
            )}
          </div>
          <div className="ba-layer ba-clip" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <Diagram kind={kindFor(item.id)} phase="before" />
          </div>
          <span className="ba-tag ba-tag-before">Before</span>
          <span className="ba-tag ba-tag-after">After</span>
          <input
            type="range"
            min={0}
            max={100}
            value={pos}
            aria-label={`Before and after: ${item.title}`}
            onChange={(event) => setPos(Number(event.target.value))}
          />
          <span className="ba-handle" style={{ left: `${pos}%` }} aria-hidden="true" />
        </div>
        <p className="caption">
          <strong>{item.title}</strong> {item.before} {item.after}
        </p>
      </div>
      <div className="ba-stack">
        {galleryItems.map((entry) => (
          <article key={entry.id} className="ba-pair">
            <figure>
              <Diagram kind={kindFor(entry.id)} phase="before" />
              <figcaption>{entry.before}</figcaption>
            </figure>
            <figure>
              {entry.photo ? (
                <Photo name={entry.photo} alt={`${entry.after} Sample photo, not a real job.`} />
              ) : (
                <Diagram kind={kindFor(entry.id)} phase="after" />
              )}
              <figcaption>{entry.after}</figcaption>
            </figure>
            <p>
              <strong>{entry.title}</strong>
            </p>
          </article>
        ))}
      </div>
      <div className="thumbs" role="group" aria-label="Sample projects">
        {galleryItems.map((entry, i) => (
          <button
            key={entry.id}
            type="button"
            className={i === index ? "is-on" : undefined}
            aria-pressed={i === index}
            onClick={() => {
              setIndex(i);
              setPos(56);
            }}
          >
            {entry.title.replace(".", "")}
          </button>
        ))}
      </div>
      <p className="small">Sample photos for a concept site. Not real jobs.</p>
    </div>
  );
}

export function ServiceArea() {
  const [zip, setZip] = useState("");
  const [result, setResult] = useState<ReturnType<typeof lookupZip> | null>(null);

  return (
    <div>
      <form
        className="zip-row"
        method="dialog"
        onSubmit={(event) => {
          event.preventDefault();
          setResult(lookupZip(zip));
        }}
      >
        <label className="field grow">
          <span className="visually-hidden">Enter your ZIP</span>
          <input
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={10}
            placeholder="Enter your ZIP"
            value={zip}
            onChange={(event) => setZip(event.target.value)}
          />
        </label>
        <button className="btn btn-light" type="submit">
          Check
        </button>
      </form>
      <p className="result-line" role="status">
        {result?.status === "in" && "Yes, you're in our area. Pick a time."}
        {result?.status === "out" && "You may be outside our usual area. Call and we'll tell you straight."}
        {result?.status === "invalid" && "Enter a 5-digit ZIP."}
      </p>
      {result?.status === "in" ? (
        <p>
          <Link className="btn btn-light" href="/book">
            Pick a time
          </Link>
        </p>
      ) : null}
      <div className="map" data-town={result?.town ?? ""}>
        <svg viewBox="0 0 520 400" role="img" aria-label="Abstract Denver metro service area">
          <circle cx="292" cy="188" r="78" fill="none" stroke="#a9cdee" strokeOpacity="0.45" />
          <circle cx="292" cy="188" r="140" fill="none" stroke="#a9cdee" strokeOpacity="0.3" />
          <circle cx="292" cy="188" r="198" fill="none" stroke="#a9cdee" strokeOpacity="0.18" />
          {towns.map((town) => (
            <g key={town.id} id={`town-${town.id}`} className="town">
              <circle cx={town.x} cy={town.y} r="6" />
              <text x={town.x + 10} y={town.y + 4}>
                {town.name}
              </text>
            </g>
          ))}
        </svg>
        <p className="small">Abstract map. Drive-time rings (example).</p>
      </div>
    </div>
  );
}

export function SmartHome() {
  return (
    <div className="smart-grid">
      <div className="floor">
        <svg viewBox="0 0 640 460" role="img" aria-label="Sample floor plan">
          <defs>
            <pattern id="fp-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M20 0H0V20" fill="none" stroke="rgba(169,205,238,0.07)" />
            </pattern>
          </defs>
          <rect width="640" height="460" fill="url(#fp-grid)" />
          <g className="fp-walls">
            <path d="M40 40 H600 V420 H40 Z" />
            <path d="M250 40 V250 M40 250 H600 M400 250 V420 M250 300 V420" />
            <path d="M430 40 V180 M430 220 V250" />
          </g>
          <g className="fp-wires">
            <path d="M192 340 V230 H179 V147" />
            <path d="M192 340 V230 H307 V212" />
            <path d="M192 340 V230 H448 V129" />
          </g>
          <g className="fp-flow">
            <path d="M192 340 V230 H179 V147" />
            <path d="M192 340 V230 H307 V212" />
            <path d="M192 340 V230 H448 V129" />
          </g>
          <g className="fp-labels">
            <text x="64" y="76">LIVING</text>
            <text x="274" y="76">KITCHEN</text>
            <text x="454" y="76">BED</text>
            <text x="274" y="286">HALL</text>
            <text x="64" y="286">GARAGE</text>
            <text x="424" y="286">BATH</text>
          </g>
        </svg>
        {hotspots.map((spot) => (
          <label key={spot.id} className="hotspot" style={{ left: spot.x, top: spot.y }}>
            <input type="radio" name="hot" id={`hot-${spot.id}`} />
            <span className="visually-hidden">{spot.title}</span>
          </label>
        ))}
      </div>
      <div className="hot-copy">
        {hotspots.map((spot) => (
          <p key={spot.id} className={`hot-panel hot-item-${spot.id}`}>
            <strong>{spot.title}:</strong> {spot.body}
          </p>
        ))}
      </div>
    </div>
  );
}
