import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap narrow">
        <h1>That page is not on this concept site.</h1>
        <p>MORAINEX is a fictional Colorado electrician. Nothing here was moved.</p>
        <Link className="btn btn-primary" href="/">
          Back to the home page
        </Link>
      </div>
    </section>
  );
}
