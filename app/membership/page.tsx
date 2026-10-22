import type { Metadata } from "next";
import { FaqList } from "@/components/blocks";
import { MembershipForm } from "@/components/book-form";
import { pageMeta } from "@/lib/meta";
import { CARE_PRICE, careFaqs } from "@/lib/site";

export const metadata: Metadata = pageMeta(
  "/membership/",
  "Morainex Care",
  "A yearly electrical safety check plus priority scheduling and repair discounts for Denver-metro homes. Sample plan.",
);

const rows = [
  ["Yearly safety check", "Included", "$199"],
  ["Scheduling", "Priority", "Next open slot"],
  ["Repairs", "15% off", "Standard price"],
  ["Whole-home surge check", "Included", "$89"],
  ["Diagnostic fee", "Waived", "$129"],
];

export default function MembershipPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="kicker">Morainex Care</p>
          <h1>
            {CARE_PRICE} a year to stop finding problems at 9 PM.
          </h1>
          <p className="lede">
            One visit a year to check the panel, breakers, and detectors, plus priority scheduling and lower repair
            prices when something does go wrong.
          </p>
          <div className="hero-actions">
            <a className="btn btn-amber" href="#join">
              Join Morainex Care
            </a>
          </div>
        </div>
      </section>
      <section className="section ink">
        <div className="wrap split">
          <div>
            <header className="section-head">
              <p className="kicker">Member vs. non-member</p>
              <h2>It pays for itself in one visit.</h2>
            </header>
            <table className="compare-table">
              <thead>
                <tr>
                  <th scope="col">
                    <span className="visually-hidden">Benefit</span>
                  </th>
                  <th scope="col">Member</th>
                  <th scope="col">Non-member</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([label, member, non]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    <td className="yes">{member}</td>
                    <td>{non}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="fine">Sample plan and prices for a concept site. A real company sets its own terms.</p>
          </div>
          <div className="card" id="join">
            <h2 style={{ fontSize: "1.6rem", marginBottom: 20 }}>Join Morainex Care</h2>
            <MembershipForm />
          </div>
        </div>
      </section>
      <section className="section night">
        <div className="wrap faq-grid">
          <header className="section-head">
            <p className="kicker">The fine print</p>
            <h2>Plan questions.</h2>
          </header>
          <FaqList items={careFaqs} />
        </div>
      </section>
    </>
  );
}
