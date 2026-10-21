type Props = {
  type: "ev" | "panel";
  distance?: string;
  amps?: string;
  target?: string;
  ready: number;
};

const ampsToSlots: Record<string, number> = { "100": 12, "150": 16, "200": 20, "400": 28, unsure: 16 };

export function LoadVisual({ type, distance = "", amps = "", target = "", ready }: Props) {
  const cur = ampsToSlots[amps] ?? 14;
  const tgt = type === "panel" ? ampsToSlots[target] ?? cur : cur;
  const slots = Math.max(cur, tgt);
  const len = distance === "short" ? 120 : distance === "long" ? 300 : distance === "mid" ? 210 : 160;
  const rows = Math.ceil(slots / 2);
  const cell = Math.min(14, 196 / rows);
  const live = ready > 0;
  const cable = `M96 ${118} H${96 + len * 0.5} V176 H${96 + len}`;
  return (
    <figure className={`load-vis${live ? " is-live" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 440 260" role="presentation">
        <defs>
          <linearGradient id="lv-g" x1="0" x2="1">
            <stop offset="0" stopColor="#3a8fd9" />
            <stop offset="1" stopColor="#a9cdee" />
          </linearGradient>
          <filter id="lv-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g className="lv-grid">
          {Array.from({ length: 12 }).map((_, i) => (
            <path key={i} d={`M${i * 40} 0V260`} />
          ))}
          {Array.from({ length: 7 }).map((_, i) => (
            <path key={`h${i}`} d={`M0 ${i * 40}H440`} />
          ))}
        </g>
        <rect x="20" y="24" width="76" height="216" rx="8" className="lv-box" />
        {Array.from({ length: slots }).map((_, i) => {
          const on = i < cur;
          const added = !on && i < tgt;
          return (
            <rect
              key={i}
              x={28 + (i % 2) * 32}
              y={32 + Math.floor(i / 2) * cell}
              width="28"
              height={cell - 4}
              rx="2"
              className={added ? "lv-slot lv-new" : i % 5 === 0 && on ? "lv-slot lv-hot" : "lv-slot"}
            />
          );
        })}
        {type === "ev" ? (
          <>
            <path d={cable} className="lv-cable" />
            <path d={cable} className="lv-flow" filter="url(#lv-glow)" />
            <g transform={`translate(${96 + len - 14} 150)`}>
              <rect width="28" height="52" rx="6" className="lv-box" />
              <circle cx="14" cy="18" r="6" className="lv-dot" filter="url(#lv-glow)" />
            </g>
            <text x={96 + len * 0.5 + 8} y="150" className="lv-label">
              {distance === "short" ? "Under 25 ft" : distance === "long" ? "Over 75 ft" : distance === "mid" ? "25 to 75 ft" : "Pick a distance"}
            </text>
          </>
        ) : (
          <>
            <path d="M96 60 H180 V200 H260" className="lv-cable" />
            <path d="M96 60 H180 V200 H260" className="lv-flow" filter="url(#lv-glow)" />
            <text x="190" y="120" className="lv-label">
              {amps ? `${amps === "unsure" ? "Current" : amps + " A"} to ${target || "?"} A` : "Pick a panel size"}
            </text>
          </>
        )}
        <g transform="translate(300 24)">
          <text className="lv-label" y="0">Ready</text>
          <rect y="10" width="120" height="8" rx="4" className="lv-track" />
          <rect y="10" width={(120 * ready) / 100} height="8" rx="4" fill="url(#lv-g)" className="lv-bar" />
        </g>
      </svg>
      <figcaption>Sample visual. Not a load calculation.</figcaption>
    </figure>
  );
}
