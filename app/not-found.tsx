import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-hero">
      <div className="wrap">
        <p className="kicker">404 · Open circuit</p>
        <h1>Nothing&apos;s wired to this page.</h1>
        <p className="lede">The link may be old, or the page never existed. MORAINEX is a concept site.</p>
        <div className="hero-actions">
          <Link className="btn btn-amber" href="/">
            Back to the home page
          </Link>
        </div>
      </div>
    </section>
  );
}
