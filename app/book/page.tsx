import type { Metadata } from "next";
import { CarePlan, FaqList, Financing } from "@/components/blocks";
import { BookForm } from "@/components/book-form";
import { pageMeta } from "@/lib/meta";
import { financeFaqs, steps } from "@/lib/site";

export const metadata: Metadata = pageMeta(
  "/book/",
  "Book a visit",
  "Pick a day and an arrival window for an electrician visit in the Denver metro. Demo booking only.",
);

export default function BookPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="kicker">Book a visit</p>
          <h1>Pick a day. Get a two-hour window.</h1>
          <p className="lede">Not an all-day wait. You get a text when your electrician is on the way.</p>
        </div>
      </section>
      <section className="section ink" style={{ paddingTop: 48 }}>
        <div className="wrap split">
          <div className="card">
            <BookForm />
          </div>
          <div>
            <p className="kicker">What happens next</p>
            <ol className="steps book-steps">
              {steps.map((step, i) => (
                <li key={step.name}>
                  <span className="step-node">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{step.name}</h3>
                    <p>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
      <section className="section night">
        <div className="wrap plans">
          <Financing />
          <CarePlan />
        </div>
      </section>
      <section className="section ink">
        <div className="wrap faq-grid">
          <header className="section-head">
            <p className="kicker">Financing</p>
            <h2>Financing questions.</h2>
          </header>
          <FaqList items={financeFaqs} />
        </div>
      </section>
    </>
  );
}
