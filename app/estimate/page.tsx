import { pageMeta } from "@/lib/meta";
import type { Metadata } from "next";
import { EstimateForm } from "@/components/estimate-form";

export const metadata: Metadata = pageMeta("/estimate/", "Estimate", "See a sample price range for an EV charger or panel upgrade before anyone comes out.");

export default function EstimatePage() {
  return (
    <section className="section page-hero-lite">
      <div className="wrap">
        <h1>See a price range before anyone comes out.</h1>
        <EstimateForm />
      </div>
    </section>
  );
}
