import type { Metadata } from "next";
import Link from "next/link";
import { FaqList, Financing } from "@/components/blocks";
import { BookForm } from "@/components/book-form";
import { Photo } from "@/components/media";
import { financeFaqs, upcomingDays } from "@/lib/site";

export const metadata: Metadata = { title: "Book a visit" };

export default function BookPage() {
  const days = upcomingDays();
  return (
    <>
      <section className="section">
        <div className="wrap booking-grid">
          <div>
            <p className="section-key">S1</p>
            <h1>Pick a time</h1>
            <BookForm days={days} />
          </div>
          <Photo
            name="panel"
            alt="Open residential electrical panel with labeled breakers and colored wires, MORAINEX concept"
          />
        </div>
      </section>
      <section className="section dark" id="s2">
        <div className="wrap">
          <p className="section-key">S2</p>
          <h2>What to expect</h2>
          <ul className="plain-list">
            <li>You get an arrival window, not an all-day wait.</li>
            <li>We check it in person before we quote.</li>
            <li>You get a written price before any work starts.</li>
          </ul>
        </div>
      </section>
      <section className="section">
        <div className="wrap split-2">
          <Financing />
          <article className="card plan" id="s4">
            <p className="section-key">S4</p>
            <h2>Morainex Care (concept)</h2>
            <p>One electrical safety check a year, plus a few perks when you need us.</p>
            <p className="price">$[X]/yr (sample)</p>
            <Link className="btn btn-primary" href="/membership">
              See Morainex Care
            </Link>
            <p className="small">Example plan for a concept site. Not a real offer.</p>
          </article>
        </div>
      </section>
      <section className="section" id="s5">
        <div className="wrap narrow">
          <p className="section-key">S5</p>
          <h2>Financing questions</h2>
          <FaqList items={financeFaqs} />
        </div>
      </section>
    </>
  );
}
