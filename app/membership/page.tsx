import type { Metadata } from "next";
import Link from "next/link";
import { FaqList } from "@/components/blocks";
import { MembershipForm } from "@/components/book-form";
import { careFaqs, upcomingMonths } from "@/lib/site";

export const metadata: Metadata = { title: "Morainex Care (concept)" };

const rows = [
  ["Yearly safety check", "Included", "$[X] (sample)"],
  ["Scheduling", "Priority", "Next open slot"],
  ["Repairs", "[X]% off (sample)", "Standard price (sample)"],
  ["Surge check", "Included", "$[X] (sample)"],
];

export default function MembershipPage() {
  const months = upcomingMonths();
  return (
    <>
      <section className="section dark">
        <div className="wrap narrow">
          <p className="section-key">S1</p>
          <h1>Morainex Care (concept)</h1>
          <p className="lede">One electrical safety check a year, plus a few perks when you need us.</p>
          <p className="price">$[X]/yr (sample)</p>
          <a className="btn btn-light" href="#join">
            Join Morainex Care
          </a>
        </div>
      </section>
      <section className="section" id="s2">
        <div className="wrap narrow">
          <p className="section-key">S2</p>
          <h2>What&apos;s included</h2>
          <ul className="plain-list">
            <li>A yearly safety check of your panel, breakers, outlets, and smoke and CO detectors</li>
            <li>Priority scheduling when something breaks</li>
            <li>[X]% off repairs (sample)</li>
            <li>A surge check, so you know what&apos;s protecting your electronics</li>
            <li>A reminder text before your yearly visit</li>
          </ul>
        </div>
      </section>
      <section className="section" id="s3">
        <div className="wrap">
          <p className="section-key">S3</p>
          <h2>Member vs non-member</h2>
          <div className="compare">
            <table>
              <thead>
                <tr>
                  <th scope="col"> </th>
                  <th scope="col">Member</th>
                  <th scope="col">Non-member</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row[0]}>
                    <th scope="row">{row[0]}</th>
                    <td data-label="Member">{row[1]}</td>
                    <td data-label="Non-member">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="section dark" id="join">
        <div className="wrap narrow">
          <p className="section-key">S4</p>
          <h2>Join Morainex Care</h2>
          <MembershipForm months={months} />
        </div>
      </section>
      <section className="section" id="s5">
        <div className="wrap narrow">
          <p className="section-key">S5</p>
          <h2>Questions</h2>
          <FaqList items={careFaqs} />
          <p>
            <Link className="text-link" href="/book#financing">
              See financing
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
