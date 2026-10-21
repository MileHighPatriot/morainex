import Link from "next/link";
import { CareTeaser, EmergencyChecklist, Financing, FaqList } from "@/components/blocks";
import { ServiceFinder } from "@/components/finder";
import { Hero } from "@/components/hero";
import { EstimateTeaser, Gallery, JobTracker, ServiceArea, SmartHome } from "@/components/home-islands";
import { Photo } from "@/components/media";
import { asset, homeFaqs, reviews } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href={asset("/images/hero-1200.webp")}
        imageSrcSet={`${asset("/images/hero-1200.webp")} 1200w, ${asset("/images/hero-1600.webp")} 1600w, ${asset("/images/hero-2048.webp")} 2048w`}
        imageSizes="100vw"
        fetchPriority="high"
      />
      <Hero />
      <ServiceFinder />
      <section className="section dark">
        <div className="wrap">
          <EmergencyChecklist />
        </div>
      </section>
      <section className="section" id="s4" aria-label="Proof">
        <div className="wrap">
          <p className="section-key">S4</p>
          <ul className="proof">
            <li>2-year workmanship warranty (example)</li>
            <li>Arrival window given when you book (example)</li>
            <li>Licensed and insured · Sample license # (not real)</li>
          </ul>
        </div>
      </section>
      <section className="section dark" id="s5">
        <div className="wrap">
          <p className="section-key">S5</p>
          <h2>See a price range before anyone comes out.</h2>
          <EstimateTeaser />
        </div>
      </section>
      <section className="section" id="ev">
        <div className="wrap">
          <p className="section-key">S6</p>
          <div className="ev-grid">
            <div>
              <h2>EV charging at home</h2>
              <ol className="steps">
                <li>
                  <span>1</span>
                  <div>
                    <h3>Level 2 install</h3>
                    <p>A 240-volt charger in your garage or driveway, mounted where your cord actually reaches.</p>
                  </div>
                </li>
                <li>
                  <span>2</span>
                  <div>
                    <h3>Load check</h3>
                    <p>We check whether your panel can carry a charger before you buy one, so there are no surprises.</p>
                  </div>
                </li>
                <li>
                  <span>3</span>
                  <div>
                    <h3>Rebate help</h3>
                    <p>
                      We point you to the utility and state rebates you may qualify for and help with the paperwork.
                      (Example. Rebates change, so check current programs.)
                    </p>
                  </div>
                </li>
              </ol>
              <Link className="btn btn-primary" href="/estimate?type=ev">
                Price an EV charger
              </Link>
            </div>
            <div className="ev-visual">
              <Photo
                name="ev-charger"
                alt="Wall-mounted electric vehicle charger beside a pale sedan in a garage, MORAINEX concept"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="section dark" id="s7">
        <div className="wrap">
          <p className="section-key">S7</p>
          <h2>Smart home</h2>
          <SmartHome />
          <Photo
            name="smart-control"
            alt="Wall-mounted smart home control screen in a dim room, MORAINEX concept"
            className="smart-photo"
          />
        </div>
      </section>
      <section className="section" id="s8">
        <div className="wrap solar-grid">
          <div>
            <p className="section-key">S8</p>
            <h2>Get your house ready for solar</h2>
            <ul className="plain-list solar-list">
              <li>Panel prep, so your service can take solar later without a second upgrade</li>
              <li>Battery backup wiring for the circuits you can&apos;t lose</li>
              <li>Inverter tie-in, done to code and inspected</li>
            </ul>
            <Link className="btn btn-primary" href="/book">
              Book a solar-ready check
            </Link>
          </div>
          <Photo name="solar" alt="Dark rooftop solar array on a house with a mountain view, MORAINEX concept" />
        </div>
      </section>
      <section className="section dark" id="s9" aria-label="Process">
        <div className="wrap">
          <p className="section-key">S9</p>
          <ol className="process">
            <li>
              <h3>Call</h3>
              <p>Tell us what&apos;s going on. We give you a price range and an arrival window.</p>
            </li>
            <li>
              <h3>Visit</h3>
              <p>A licensed electrician checks it in person.</p>
            </li>
            <li>
              <h3>Quote</h3>
              <p>You get a written price before any work starts.</p>
            </li>
            <li>
              <h3>Done</h3>
              <p>Work finished, permit closed, and inspected when it&apos;s required.</p>
            </li>
          </ol>
          <div className="rail" aria-hidden="true">
            <span className="rail-fill" />
          </div>
        </div>
      </section>
      <section className="section" id="s10">
        <div className="wrap">
          <p className="section-key">S10</p>
          <h2>Know where your job is.</h2>
          <p>Every job gets a tracker you can check from your phone.</p>
          <JobTracker />
          <p className="small">Sample job. Times and numbers are examples.</p>
        </div>
      </section>
      <section className="section" id="s11">
        <div className="wrap">
          <p className="section-key">S11</p>
          <h2>Before and after</h2>
          <Gallery />
        </div>
      </section>
      <section className="section dark" id="s12">
        <div className="wrap">
          <p className="section-key">S12</p>
          <h2>Sample reviews</h2>
          <div className="reviews">
            {reviews.map((review) => (
              <figure key={review.who} className="review">
                <p className="review-label">Sample review. MORAINEX is a concept company.</p>
                <blockquote>{review.quote}</blockquote>
                <figcaption>{review.who}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <section className="section" id="s13-wrap">
        <div className="wrap split-2">
          <CareTeaser />
          <Financing />
        </div>
      </section>
      <section className="section dark" id="service-area">
        <div className="wrap">
          <p className="section-key">S15</p>
          <h2>Do we serve you?</h2>
          <p>MORAINEX works across the Denver metro.</p>
          <ServiceArea />
          <p className="map-caption">
            Denver · Aurora · Lakewood · Arvada · Westminster · Thornton · Centennial · Littleton · Englewood · Golden
            (example area)
          </p>
        </div>
      </section>
      <section className="section" id="s16">
        <div className="wrap narrow">
          <p className="section-key">S16</p>
          <h2>Book a visit</h2>
          <form className="stack" method="dialog">
            <p className="demo-note">Demo form: nothing is sent and no one is booked or charged.</p>
            <label className="field">
              Name
              <input type="text" autoComplete="name" />
            </label>
            <label className="field">
              Phone
              <input type="tel" autoComplete="tel" inputMode="tel" />
            </label>
            <label className="field">
              What do you need?
              <input type="text" />
            </label>
            <Link className="btn btn-primary" href="/book">
              Pick a time
            </Link>
          </form>
        </div>
      </section>
      <section className="section" id="s17">
        <div className="wrap narrow">
          <p className="section-key">S17</p>
          <h2>Questions before you call</h2>
          <FaqList items={homeFaqs} />
        </div>
      </section>
    </>
  );
}
