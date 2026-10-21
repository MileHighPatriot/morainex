import type { Metadata } from "next";
import { EstimateForm } from "@/components/estimate-form";

export const metadata: Metadata = { title: "Estimate" };

export default function EstimatePage() {
  return (
    <section className="section">
      <div className="wrap narrow">
        <p className="section-key">S1</p>
        <h1>See a price range before anyone comes out.</h1>
        <EstimateForm />
      </div>
    </section>
  );
}
