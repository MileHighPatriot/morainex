import type { Metadata } from "next";
import { DownedLine, EmergencyTiers, PhoneButton } from "@/components/blocks";
import { EmergencyCheck } from "@/components/emergency-check";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta(
  "/emergency/",
  "Electrical emergency?",
  "What to do about smoke, a downed line, a hot panel, or water near wiring, and when to call.",
);

const staySafe = [
  "Don't touch a panel, outlet, or cord that's hot, wet, or sparking.",
  "If there's water near the panel, stay out of the water and keep everyone back.",
  "Keep people and pets away from the problem area.",
  "Wait outside or in another room until help arrives.",
];

export default function EmergencyPage() {
  return (
    <>
      <section className="page-hero danger">
        <div className="wrap">
          <p className="kicker">Electrical emergency</p>
          <h1>Fire, smoke, or a burning smell? Get out, then call 911.</h1>
          <p className="lede">
            Once everyone is safe, call us. For anything below that line, this page helps you decide how fast you need
            an electrician.
          </p>
          <div className="hero-actions">
            <PhoneButton className="btn btn-amber btn-lg" />
          </div>
        </div>
      </section>
      <section className="section night">
        <div className="wrap">
          <EmergencyTiers />
          <DownedLine />
        </div>
      </section>
      <section className="section ink">
        <div className="wrap narrow">
          <header className="section-head">
            <p className="kicker">Quick check</p>
            <h2>Not sure how urgent it is?</h2>
          </header>
          <EmergencyCheck />
        </div>
      </section>
      <section className="section night">
        <div className="wrap narrow">
          <header className="section-head">
            <p className="kicker">While you wait</p>
            <h2>Stay safe until we get there.</h2>
          </header>
          <ul className="ticks">
            {staySafe.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="fine">
            General safety guidance for a concept site, not a diagnosis. When in doubt, get out and call 911.
          </p>
        </div>
      </section>
    </>
  );
}
