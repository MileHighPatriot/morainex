import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, FaqList, PhoneButton } from "@/components/blocks";
import { Photo } from "@/components/media";
import { pageMeta } from "@/lib/meta";
import { commercial, homeFaqs, residential, type Svc } from "@/lib/site";

export const metadata: Metadata = pageMeta(
  "/services/",
  "Services",
  "Residential and commercial electrical work: panels, EV chargers, lighting, smart home, solar ready, generators, and repairs.",
);

function ServiceRow({ s }: { s: Svc }) {
  return (
    <article className={`svc-row${s.photo ? "" : " no-photo"}`} id={s.id} data-reveal>
      {s.photo ? (
        <div className={`svc-media${s.photo === "hero" ? " is-hero" : ""}`}>
          <Photo name={s.photo} alt="" sizes="(min-width: 860px) 45vw, 100vw" />
        </div>
      ) : null}
      <div className="svc-copy">
        <p className="bc-top">
          <span className="ckt">CKT {s.ckt}</span>
        </p>
        <h3>{s.name}</h3>
        <p>{s.scope}</p>
        {s.includes ? (
          <ul className="ticks">
            {s.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
        <div className="svc-meta">
          <p className="price">{s.price}</p>
          <Link className="btn btn-amber btn-sm" href={s.group === "c" ? "/book/" : `/book/?service=${s.id}`}>
            {s.group === "c" ? "Request a walkthrough" : "Book"}
          </Link>
          {s.id === "ev" || s.id === "panel" ? (
            <Link className="link-arrow" href={`/estimate/?type=${s.id}`}>
              Price it <Arrow />
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="kicker">Services</p>
          <h1>Everything behind the walls, and the light in front of them.</h1>
          <p className="lede">
            Every service lists a sample price. If you don&apos;t see your problem here, call and describe it. We&apos;ll
            tell you if it&apos;s ours.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-amber" href="/estimate/">
              Price my project <Arrow />
            </Link>
            <PhoneButton className="btn btn-glass" />
          </div>
        </div>
      </section>

      <nav className="svc-tabs paper" aria-label="Jump to a service">
        <div className="wrap">
          {[...residential, ...commercial].map((s) => (
            <a key={s.id} href={`#${s.id}`}>
              {s.name}
            </a>
          ))}
        </div>
      </nav>

      <section className="section paper">
        <div className="wrap">
          <div className="svc-group">
            <header className="section-head" data-reveal>
              <p className="kicker">For homes</p>
              <h2>Residential</h2>
            </header>
            <div className="svc-list">
              {residential.map((s) => (
                <ServiceRow key={s.id} s={s} />
              ))}
            </div>
          </div>
          <div className="svc-group">
            <header className="section-head" data-reveal>
              <p className="kicker">For businesses</p>
              <h2>Commercial</h2>
              <p className="lede">Scheduled around your hours, with one point of contact from walkthrough to sign-off.</p>
            </header>
            <div className="svc-list">
              {commercial.map((s) => (
                <ServiceRow key={s.id} s={s} />
              ))}
            </div>
          </div>
          <p className="fine">Sample prices for a concept site, not quotes.</p>
        </div>
      </section>

      <section className="section ink">
        <div className="wrap faq-grid">
          <header className="section-head">
            <p className="kicker">Before you call</p>
            <h2>Questions people ask us first.</h2>
          </header>
          <FaqList items={homeFaqs.slice(0, 5)} />
        </div>
      </section>
    </>
  );
}
