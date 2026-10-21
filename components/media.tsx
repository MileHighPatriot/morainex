import { asset } from "@/lib/site";

type PhotoProps = {
  name: "hero" | "panel" | "ev-charger" | "solar" | "smart-control";
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

export function Photo({ name, alt, priority = false, sizes, className }: PhotoProps) {
  const src = (width: number) => asset(`/images/${name}-${width}.webp`);
  const hero = name === "hero";
  const srcSet = hero
    ? `${src(800)} 800w, ${src(1200)} 1200w, ${src(1600)} 1600w, ${src(2048)} 2048w`
    : `${src(160)} 160w, ${src(240)} 240w, ${src(1200)} 1200w`;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      src={src(hero ? 1200 : 1200)}
      srcSet={srcSet}
      sizes={sizes ?? (hero ? "100vw" : "(min-width: 900px) 480px, 100vw")}
      alt={alt}
      width={hero ? 2048 : 1200}
      height={hero ? 1152 : 900}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
    />
  );
}

export function Diagram({ kind, phase }: { kind: string; phase: "before" | "after" }) {
  const after = phase === "after";
  const stroke = after ? "#a9cdee" : "#39424c";
  const accent = after ? "#3a8fd9" : "#39424c";
  return (
    <svg className="diagram" viewBox="0 0 320 220" role="img" aria-label={`${phase} diagram, sample`}>
      <rect width="320" height="220" fill="#1c2024" />
      {kind === "panel" && (
        <>
          <rect x="90" y="24" width="140" height="172" rx="6" fill="none" stroke={stroke} strokeWidth="2" />
          {Array.from({ length: after ? 8 : 10 }).map((_, i) => (
            <rect
              key={i}
              x={108 + (i % 2) * 52}
              y={40 + Math.floor(i / 2) * 28}
              width="36"
              height="16"
              rx="2"
              fill={i % 3 === 0 ? accent : "none"}
              stroke={stroke}
            />
          ))}
        </>
      )}
      {kind === "ev" &&
        (after ? (
          <>
            <rect x="46" y="36" width="70" height="120" rx="8" fill="none" stroke={stroke} strokeWidth="2" />
            <circle cx="81" cy="78" r="10" fill="#a9cdee" />
            <path d="M70 150h160" stroke={stroke} strokeWidth="2" />
            <rect x="150" y="96" width="110" height="54" rx="8" fill="none" stroke={stroke} />
          </>
        ) : (
          <path d="M30 150 C 80 150, 90 70, 150 90 S 240 40, 300 120" fill="none" stroke={stroke} strokeWidth="4" />
        ))}
      {kind === "kitchen" &&
        (after ? (
          <>
            {Array.from({ length: 6 }).map((_, i) => (
              <circle key={i} cx={70 + (i % 3) * 70} cy={60 + Math.floor(i / 3) * 60} r="8" fill="#a9cdee" />
            ))}
            <rect x="40" y="170" width="240" height="8" rx="2" fill="#3a8fd9" />
          </>
        ) : (
          <circle cx="160" cy="90" r="16" fill="none" stroke={stroke} strokeWidth="2" />
        ))}
      {kind === "outlet" &&
        (after ? (
          <>
            <rect x="118" y="48" width="84" height="110" rx="8" fill="none" stroke="#a9cdee" strokeWidth="3" />
            <rect x="138" y="78" width="44" height="54" rx="4" fill="none" stroke="#3a8fd9" strokeWidth="2" />
            <circle cx="152" cy="96" r="3" fill="#a9cdee" />
            <circle cx="168" cy="96" r="3" fill="#a9cdee" />
          </>
        ) : (
          <path d="M128 50 l64 8 -8 100 -70 -6 z" fill="none" stroke={stroke} strokeWidth="2" />
        ))}
      {kind === "mast" && (
        <>
          <path
            d={after ? "M70 190 H250" : "M70 190 H250"}
            stroke={stroke}
            strokeWidth="2"
          />
          <path
            d={after ? "M168 190 V36" : "M150 190 L196 48"}
            stroke={accent}
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx={after ? 168 : 196} cy={after ? 36 : 48} r="7" fill={after ? "#a9cdee" : "#39424c"} />
        </>
      )}
    </svg>
  );
}
