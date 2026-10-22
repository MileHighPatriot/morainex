"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Arrow } from "@/components/blocks";
import { houseSrc } from "@/components/media";
import { evReady, money, panelReady } from "@/lib/estimate";
import { asset } from "@/lib/site";
import { lookupZip, towns } from "@/lib/zips";

export function LightCompare() {
  const [pos, setPos] = useState(50);
  const off = houseSrc("off");
  return (
    <div className="compare" data-reveal>
      <div className="compare-frame" style={{ ["--pos" as string]: `${pos}%` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset("/images/hero-1600.webp")}
          srcSet={`${asset("/images/hero-1200.webp")} 1200w, ${asset("/images/hero-2048.webp")} 2048w`}
          sizes="(min-width: 1200px) 1160px, 100vw"
          alt="The house with its exterior and interior lighting on"
          width={2048}
          height={1152}
          loading="lazy"
          decoding="async"
        />
        <div className="compare-off">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            {...off}
            sizes="(min-width: 1200px) 1160px, 100vw"
            alt="The same house with the lights off"
            width={2048}
            height={1152}
            loading="lazy"
            decoding="async"
          />
        </div>
        <span className="compare-tag compare-tag-off">Before</span>
        <span className="compare-tag compare-tag-on">After</span>
        <span className="compare-handle" aria-hidden="true">
          <span />
        </span>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          aria-label="Drag to compare the house before and after the lighting work"
          onChange={(event) => setPos(Number(event.target.value))}
        />
      </div>
      <p className="compare-cap">Drag to compare. Sample project photo, not a real job.</p>
    </div>
  );
}

function useCountUp(target: number) {
  const [value, setValue] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }
    const start = from.current;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / 520);
      const eased = 1 - Math.pow(1 - k, 3);
      const v = Math.round((start + (target - start) * eased) / 10) * 10;
      setValue(v);
      from.current = v;
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return value;
}

const evDistances = [
  ["short", "Under 25 ft"],
  ["mid", "25 – 75 ft"],
  ["long", "Over 75 ft"],
] as const;

const panelSizes = [
  ["100", "100 A"],
  ["150", "150 A"],
  ["200", "200 A"],
] as const;

export function QuickPrice() {
  const [tab, setTab] = useState<"ev" | "panel">("ev");
  const [distance, setDistance] = useState("short");
  const [current, setCurrent] = useState("100");

  const result =
    tab === "ev"
      ? evReady({ owned: "yes", distance, amps: "200", place: "garage" })
      : panelReady({ current, target: current === "200" ? "400" : "200", age: "mid" });
  const low = useCountUp(result?.low ?? 0);
  const high = useCountUp(result?.high ?? 0);
  const target = current === "200" ? 400 : 200;
  const fill = tab === "ev" ? { short: 0.34, mid: 0.62, long: 0.94 }[distance] ?? 0.34 : Number(current) / target;

  return (
    <div className="quick" data-reveal>
      <div className="quick-controls">
        <div className="seg" role="tablist" aria-label="Project">
          <button type="button" role="tab" aria-selected={tab === "ev"} onClick={() => setTab("ev")}>
            EV charger
          </button>
          <button type="button" role="tab" aria-selected={tab === "panel"} onClick={() => setTab("panel")}>
            Panel upgrade
          </button>
        </div>
        <p className="quick-q">
          {tab === "ev" ? "How far is your panel from where you park?" : "What size is your panel now?"}
        </p>
        <div className="chips" role="group" aria-label={tab === "ev" ? "Distance" : "Current panel size"}>
          {(tab === "ev" ? evDistances : panelSizes).map(([value, text]) => {
            const selected = tab === "ev" ? distance === value : current === value;
            return (
              <button
                key={value}
                type="button"
                className="chip"
                aria-pressed={selected}
                onClick={() => (tab === "ev" ? setDistance(value) : setCurrent(value))}
              >
                {text}
              </button>
            );
          })}
        </div>
        <div className="meter" aria-hidden="true">
          <div className="meter-track">
            <span className="meter-fill" style={{ width: `${Math.round(fill * 100)}%` }} />
          </div>
          <div className="meter-scale">
            {tab === "ev" ? (
              <>
                <span>Panel</span>
                <span>Wire run</span>
                <span>Charger</span>
              </>
            ) : (
              <>
                <span>0 A</span>
                <span>Now {current} A</span>
                <span>{target} A</span>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="quick-out" aria-live="polite">
        <p className="kicker">Typical range</p>
        <p className="quick-range">
          {money(low)}
          <span> – </span>
          {money(high)}
        </p>
        <p className="quick-note">
          {tab === "ev"
            ? "Charger you already own, 200 A panel, garage install. Change any of that in the full tool."
            : `${current} A to ${target} A, 1970s house. Age, location, and the service mast can move it.`}
        </p>
        <Link className="btn btn-amber" href={`/estimate/?type=${tab}`}>
          Fine-tune my price <Arrow />
        </Link>
        <p className="fine">Sample ranges for a concept site, not a quote.</p>
      </div>
    </div>
  );
}

export function ServiceArea() {
  const [zip, setZip] = useState("");
  const [result, setResult] = useState<ReturnType<typeof lookupZip> | null>(null);
  const hit = result?.status === "in" ? result.town : null;

  return (
    <div className="area" data-reveal>
      <div className="area-copy">
        <form
          className="zip"
          onSubmit={(event) => {
            event.preventDefault();
            setResult(lookupZip(zip));
          }}
        >
          <label className="visually-hidden" htmlFor="zip">
            Your ZIP code
          </label>
          <input
            id="zip"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={10}
            placeholder="Your ZIP code"
            value={zip}
            onChange={(event) => setZip(event.target.value)}
          />
          <button className="btn btn-amber" type="submit">
            Check
          </button>
        </form>
        <p className={`zip-result${result ? ` is-${result.status}` : ""}`} role="status">
          {result?.status === "in" && (
            <>
              Yes, we cover {towns.find((t) => t.id === result.town)?.name}.{" "}
              <Link href="/book/">Pick a time</Link>
            </>
          )}
          {result?.status === "out" && "You may be outside our usual area. Call and we'll tell you straight."}
          {result?.status === "invalid" && "Enter a 5-digit ZIP."}
        </p>
        <ul className="town-list">
          {towns.map((t) => (
            <li key={t.id} className={hit === t.id ? "is-hit" : undefined}>
              {t.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="map">
        <svg viewBox="0 0 520 400" role="img" aria-label="Map of the Denver metro towns we serve">
          <defs>
            <radialGradient id="map-glow">
              <stop offset="0" stopColor="#f3b44a" stopOpacity="0.28" />
              <stop offset="1" stopColor="#f3b44a" stopOpacity="0" />
            </radialGradient>
            <pattern id="map-grid" width="26" height="26" patternUnits="userSpaceOnUse">
              <path d="M26 0H0V26" fill="none" stroke="rgba(255,255,255,0.05)" />
            </pattern>
          </defs>
          <rect width="520" height="400" fill="url(#map-grid)" />
          <circle cx="292" cy="188" r="200" fill="url(#map-glow)" />
          {[80, 140, 200].map((r) => (
            <circle key={r} cx="292" cy="188" r={r} className="ring" />
          ))}
          {towns.map((t) => (
            <path key={`l-${t.id}`} d={`M292 188 L${t.x} ${t.y}`} className={`spoke${hit === t.id ? " is-hit" : ""}`} />
          ))}
          {towns.map((t) => (
            <g key={t.id} className={`town${hit === t.id ? " is-hit" : ""}`}>
              <circle cx={t.x} cy={t.y} r={t.id === "denver" ? 7 : 5} />
              <text x={t.x + 11} y={t.y + 4}>
                {t.name}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
