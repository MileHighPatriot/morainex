"use client";

import { useEffect, useRef } from "react";

const stats = [
  { value: 2, suffix: "-year", label: "Workmanship warranty (example)" },
  { value: 10, suffix: "", label: "Towns in the example service area" },
  { value: 30, suffix: " ft", label: "Distance to keep from a downed line" },
  { value: 4, suffix: " steps", label: "From your call to inspected (sample)" },
];

export function StatsBand() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const nums = Array.from(root.querySelectorAll<HTMLElement>("[data-to]"));
    nums.forEach((n) => (n.textContent = "0"));
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const k = Math.min(1, (t - t0) / 1400);
          const ease = 1 - Math.pow(1 - k, 3);
          nums.forEach((n) => (n.textContent = String(Math.round(Number(n.dataset.to) * ease))));
          if (k < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);
  return (
    <section className="stats-band" aria-label="Sample figures">
      <div className="wrap">
        <div className="stats" ref={ref}>
          {stats.map((s) => (
            <div className="stat" key={s.label}>
              <p className="stat-num">
                <span data-to={s.value}>{s.value}</span>
                <span className="stat-suf">{s.suffix}</span>
              </p>
              <p className="stat-label">{s.label}</p>
            </div>
          ))}
        </div>
        <p className="stats-note">Sample figures for a concept site.</p>
      </div>
    </section>
  );
}
