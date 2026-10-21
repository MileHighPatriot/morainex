"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Photo } from "@/components/media";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

function HeroScene() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nav = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean };
    };
    const saveData = nav.connection?.saveData === true;
    const memory = nav.deviceMemory;
    if (reduce || saveData || typeof memory !== "number" || memory < 4) return;

    let stop = () => {};
    let dead = false;
    const start = () => {
      if (dead || !ref.current) return;
      const hero = ref.current.closest(".hero");
      if (!(hero instanceof HTMLElement)) return;
      import("@/lib/grid-scene")
        .then((mod) => {
          if (dead || !ref.current) return;
          stop = mod.mountGrid(ref.current, hero);
        })
        .catch(() => {});
    };

    const win = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    let idle = 0;
    let timer = 0;
    if (win.requestIdleCallback) idle = win.requestIdleCallback(start, { timeout: 1800 });
    else timer = window.setTimeout(start, 700);

    return () => {
      dead = true;
      if (idle && win.cancelIdleCallback) win.cancelIdleCallback(idle);
      if (timer) window.clearTimeout(timer);
      stop();
    };
  }, []);

  return <canvas ref={ref} className="hero-canvas" aria-hidden="true" />;
}

export function Hero() {
  return (
    <section className="hero" id="s1" aria-labelledby="hero-title">
      <div className="hero-media">
        <Photo
          name="hero"
          priority
          alt="Modern home at dusk with warm window light and a dark tree line, MORAINEX concept"
          className="hero-poster"
        />
        <HeroScene />
        <div className="hero-scrim" />
      </div>
      <div className="hero-card">
        <p className="section-key">S1</p>
        <p className="eyebrow">Concept project · Colorado electrician, Denver metro</p>
        <h1 id="hero-title">Panels, EV chargers, and repairs for Denver-metro homes.</h1>
        <p className="lede">
          Electrical repairs, upgrades, and installs for homes and businesses, with a written price before work starts.
        </p>
        <div className="hero-actions">
          <a className="btn btn-light btn-block" href={PHONE_TEL}>
            Call {PHONE_DISPLAY}
          </a>
          <a className="btn btn-ghost btn-block" href="#s2">
            Find a service
          </a>
          <Link className="text-link" href="/estimate">
            Get an estimate
          </Link>
        </div>
        <ul className="trust">
          <li>Sample license # (not real)</li>
          <li>Insured</li>
          <li>Same-week slots (example)</li>
        </ul>
      </div>
    </section>
  );
}
