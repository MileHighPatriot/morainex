import type { Metadata } from "next";
import { EstimateForm } from "@/components/estimate-form";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta(
  "/estimate/",
  "Price my project",
  "See a sample price range for an EV charger or panel upgrade before anyone comes out.",
);

export default function EstimatePage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="kicker">Price it first</p>
          <h1>See a price range before anyone comes out.</h1>
          <p className="lede">Answer a few questions. The range tightens as you go. No email required.</p>
        </div>
      </section>
      <section className="section ink" style={{ paddingTop: 48 }}>
        <div className="wrap">
          <EstimateForm />
        </div>
      </section>
    </>
  );
}
