import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, Bolt, CarePlan, FaqList, Financing, PhoneButton, SectionHead } from "@/components/blocks";
import { Hero } from "@/components/hero";
import { LightCompare, QuickPrice, ServiceArea } from "@/components/home-tools";
import { Photo } from "@/components/media";
import { pageMeta } from "@/lib/meta";
import { asset, commercial, homeFaqs, residential, reviews, steps } from "@/lib/site";

export const metadata: Metadata = pageMeta(
  "/",
  "Home",
  "Panels, EV chargers, lighting, and repairs for Denver-metro homes, with a price range before anyone comes out.",
);

const featured = residential.filter((s) => s.photo);
const compact = [...residential.filter((s) => !s.photo), commercial[0], commercial[2]];

export default function HomePage() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href={asset("/images/house-off-1280.webp")}
        imageSrcSet={`${asset("/images/house-off-1280.webp")} 1280w, ${asset("/images/house-off-2048.webp")} 2048w`}
        imageSizes="(max-width: 760px) 240vw, 120vw"
        fetchPriority="high"
      />
      <Hero />

      <aside className="alert" aria-label="Electrical emergency">
        <div className="wrap alert-row">
          <p>
            <span className="alert-dot" aria-hidden="true" />
            <strong>Burning smell, sparks, or a hot panel?</strong> Get everyone out and call 911 first.
          </p>
          <Link href="/emergency/">
            What to do next <Arrow />
          </Link>
        </div>
      </aside>

      <section className="section paper" id="services">
        <div className="wrap">
          <SectionHead kicker="What we wire" title="Every circuit in the house, done like it matters.">
            Pick a breaker. Each one is a service with a sample price, so you know where you stand before you call.
          </SectionHead>
          <div className="board">
            {featured.map((s, i) => (
              <Link
                key={s.id}
                href={`/services/#${s.id}`}
                className={`breaker-card has-photo bc-${i}`}
                data-reveal
                style={{ ["--d" as string]: `${i * 60}ms` }}
              >
                <div className="bc-photo">
                  <Photo
                    name={s.photo!}
                    alt=""
                    sizes={i < 2 ? "(min-width: 900px) 50vw, 100vw" : "(min-width: 900px) 33vw, 100vw"}
                  />
                </div>
                <div className="bc-body">
                  <p className="bc-top">
                    <span className="ckt">CKT {s.ckt}</span>
                    <span className="flip" aria-hidden="true">
                      <span />
                    </span>
                  </p>
                  <h3>{s.name}</h3>
                  <p className="bc-short">{s.short}</p>
                  <p className="bc-price">{s.price}</p>
                </div>
              </Link>
            ))}
            {compact.map((s, i) => (
              <Link
                key={s.id}
                href={`/services/#${s.id}`}
                className="breaker-card"
                data-reveal
                style={{ ["--d" as string]: `${i * 60}ms` }}
              >
                <p className="bc-top">
                  <span className="ckt">CKT {s.ckt}</span>
                  <span className="flip" aria-hidden="true">
                    <span />
                  </span>
                </p>
                <h3>{s.name}</h3>
                <p className="bc-short">{s.short}</p>
                <p className="bc-price">{s.price}</p>
              </Link>
            ))}
          </div>
          <p className="board-foot" data-reveal>
            <Link className="link-arrow" href="/services/">
              All home and business services <Arrow />
            </Link>
          </p>
        </div>
      </section>

      <section className="section night" id="lighting">
        <div className="wrap">
          <SectionHead kicker="Lighting design" title={<>Same house. <span className="glow">Flip the breaker.</span></>}>
            Linear LED in the soffits, wall-wash uplights on the stone, and recessed cans on scenes. Lighting is the part
            of the job people actually see, so we treat it like design work.
          </SectionHead>
          <LightCompare />
          <ul className="spec-row" data-reveal>
            <li>
              <b>2700 K</b>
              <span>Warm white outside, so the house glows instead of glares</span>
            </li>
            <li>
              <b>4 circuits</b>
              <span>Soffit, eave, wash, and interior, each on its own dimmer</span>
            </li>
            <li>
              <b>Photocell</b>
              <span>On at dusk, off at midnight, without an app</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="section ink" id="price">
        <div className="wrap">
          <SectionHead kicker="Price it first" title="Know the number before we knock.">
            Most electricians won&apos;t say a price until they&apos;re standing in your garage. Here&apos;s a sample
            range right now.
          </SectionHead>
          <QuickPrice />
        </div>
      </section>

      <section className="section paper" id="process">
        <div className="wrap">
          <SectionHead kicker="How a job runs" title="Four steps. No surprises in any of them." />
          <ol className="steps" data-reveal>
            {steps.map((step, i) => (
              <li key={step.name} style={{ ["--d" as string]: `${i * 140}ms` }}>
                <span className="step-node">{String(i + 1).padStart(2, "0")}</span>
                <h3>{step.name}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section paper tight-top" id="reviews">
        <div className="wrap">
          <div className="reviews">
            {reviews.map((r, i) => (
              <figure key={r.who} className="review" data-reveal style={{ ["--d" as string]: `${i * 90}ms` }}>
                <p className="stars" aria-label="5 out of 5">
                  ★★★★★
                </p>
                <blockquote>{r.quote}</blockquote>
                <figcaption>
                  <b>{r.who}</b> · {r.where}
                  <span>{r.job}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="fine center">Sample reviews. MORAINEX is a concept company.</p>
        </div>
      </section>

      <section className="section night" id="plans">
        <div className="wrap">
          <SectionHead kicker="Plans and payments" title="Easier to say yes to." />
          <div className="plans">
            <CarePlan />
            <Financing />
          </div>
        </div>
      </section>

      <section className="section ink" id="area">
        <div className="wrap">
          <SectionHead kicker="Service area" title="Ten cities. One crew that knows them.">
            Denver, Aurora, Lakewood, and the rest of the metro, from Golden to the plains.
          </SectionHead>
          <ServiceArea />
        </div>
      </section>

      <section className="section paper" id="faq">
        <div className="wrap faq-grid">
          <SectionHead kicker="Before you call" title="Questions people ask us first." />
          <FaqList items={homeFaqs} />
        </div>
      </section>

      <section className="final">
        <div className="final-media" aria-hidden="true">
          <Photo name="hero" alt="" sizes="100vw" />
        </div>
        <div className="wrap final-copy" data-reveal>
          <p className="kicker">
            <Bolt /> Ready when you are
          </p>
          <h2>Let&apos;s get your house wired right.</h2>
          <div className="hero-actions">
            <Link className="btn btn-amber btn-lg" href="/book/">
              Book a visit <Arrow />
            </Link>
            <PhoneButton className="btn btn-glass btn-lg" />
          </div>
        </div>
      </section>
    </>
  );
}
