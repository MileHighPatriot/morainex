import { pageMeta } from "@/lib/meta";
import type { Metadata } from "next";
import Link from "next/link";
import { EmergencyChecklist, FaqList } from "@/components/blocks";
import { commercial, PHONE_DISPLAY, PHONE_TEL, residential, serviceFaqs } from "@/lib/site";

export const metadata: Metadata = pageMeta("/services/", "Services", "Residential and commercial electrical services: panels, EV chargers, lighting, smart home, solar ready, and repairs.");

export default function ServicesPage() {
  return (
    <div className="services">
      <input className="sr-only" type="radio" name="mode" id="mode-e" />
      <input className="sr-only" type="radio" name="mode" id="mode-r" defaultChecked />
      <input className="sr-only" type="radio" name="mode" id="mode-c" />
      <section className="section finder" id="svc-finder">
        <div className="wrap">
          <h1>What do you need?</h1>
          <div className="path-tabs">
            <label className="tab" htmlFor="mode-e">
              Emergency
            </label>
            <label className="tab" htmlFor="mode-r">
              Residential
            </label>
            <label className="tab" htmlFor="mode-c">
              Commercial
            </label>
          </div>
          <div className="chips">
            {residential.map((service) => (
              <a className="chip only-r" href={`#${service.id}`} key={service.id}>
                {service.name}
              </a>
            ))}
            {commercial.map((service) => (
              <a className="chip only-c" href={`#${service.id}`} key={service.id}>
                {service.name}
              </a>
            ))}
            <a className="chip only-e" href="#urgent">
              Is this an emergency?
            </a>
          </div>
          <fieldset className="safety">
            <legend>Is anything unsafe right now?</legend>
            <a className="seg" href="#urgent">
              Yes
            </a>
            <a className="seg" href="#results">
              No
            </a>
          </fieldset>
        </div>
      </section>
      <section className="section dark" id="urgent">
        <div className="wrap">
          <EmergencyChecklist callCard />
        </div>
      </section>
      <section className="section" id="results">
        <div className="wrap">
          <div className="mode-toggle" role="group" aria-label="Home or business">
            <label className="tab" htmlFor="mode-r">
              Home
            </label>
            <label className="tab" htmlFor="mode-c">
              Business
            </label>
          </div>
          <div className="catalog only-r">
            <h2>Residential</h2>
            {residential.map((service) => (
              <article className="card service-card" id={service.id} key={service.id}>
                <p className="node-code">{service.code}</p>
                <h3>{service.name}</h3>
                <p>{service.scope}</p>
                {service.range ? <p className="range">{service.range}</p> : null}
                <div className="row-actions">
                  <Link className="btn btn-primary" href="/book">
                    Book
                  </Link>
                  <Link className="btn btn-ghost" href="/estimate">
                    Estimate
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <div className="catalog only-c">
            <h2>Commercial</h2>
            {commercial.map((service) => (
              <article className="card service-card" id={service.id} key={service.id}>
                <p className="node-code">{service.code}</p>
                <h3>{service.name}</h3>
                <p>{service.scope}</p>
                {service.range ? <p className="range">{service.range}</p> : null}
                <div className="row-actions">
                  <Link className="btn btn-primary" href="/book">
                    Request a walkthrough
                  </Link>
                  <a className="btn btn-ghost" href={PHONE_TEL}>
                    Call {PHONE_DISPLAY}
                  </a>
                </div>
              </article>
            ))}
          </div>
          <div className="card empty-state" id="s5">
            <h2>Not listed?</h2>
            <p>Not listed? Tell us what&apos;s going on and we&apos;ll call you back.</p>
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
                What&apos;s going on?
                <textarea rows={4} />
              </label>
              <button className="btn btn-primary" type="button">
                Send
              </button>
            </form>
          </div>
        </div>
      </section>
      <section className="section" id="s6">
        <div className="wrap narrow">
          <h2>Questions before you call</h2>
          <FaqList items={serviceFaqs} />
        </div>
      </section>
    </div>
  );
}
