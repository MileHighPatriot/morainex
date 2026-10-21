import Link from "next/link";
import { commercial, emergencyNodes, residential } from "@/lib/site";

const catalog = [...residential, ...commercial];

export function ServiceFinder() {
  return (
    <section className="section finder" id="s2" aria-labelledby="finder-title">
      <div className="wrap">
        <p className="section-key">S2</p>
        <h2 id="finder-title">What do you need?</h2>
        <div className="chips" role="group" aria-label="Services">
          {residential.map((service) => (
            <label className="chip" key={service.id}>
              <input type="radio" name="need" value={service.id} />
              {service.name}
            </label>
          ))}
        </div>
        <div className="path-tabs" role="group" aria-label="Service paths">
          <label className="tab">
            <input type="radio" name="path" value="e" defaultChecked />
            Emergency
          </label>
          <label className="tab">
            <input type="radio" name="path" value="r" />
            Residential
          </label>
          <label className="tab">
            <input type="radio" name="path" value="c" />
            Commercial
          </label>
        </div>
        <div className="paths">
          <div className="path path-e">
            <h3>Emergency</h3>
            {emergencyNodes.map((node) => (
              <Link className="node" href={`/emergency#${node.id}`} key={node.id}>
                <span className="node-code">{node.code}</span>
                <span>{node.name}</span>
              </Link>
            ))}
          </div>
          <div className="path path-r">
            <h3>Residential</h3>
            {residential.map((service) => (
              <label className="node" key={service.id}>
                <input type="radio" name="need" value={service.id} />
                <span className="node-code">{service.code}</span>
                <span>{service.name}</span>
              </label>
            ))}
          </div>
          <div className="path path-c">
            <h3>Commercial</h3>
            {commercial.map((service) => (
              <label className="node" key={service.id}>
                <input type="radio" name="need" value={service.id} />
                <span className="node-code">{service.code}</span>
                <span>{service.name}</span>
              </label>
            ))}
          </div>
        </div>
        <fieldset className="safety">
          <legend>Is anything unsafe right now?</legend>
          <a className="seg" href="#s3">
            Yes
          </a>
          <label className="seg">
            <input type="radio" name="safe" value="no" />
            No
          </label>
        </fieldset>
        <p className="hint-pick">Pick a service to see a typical scope.</p>
        {catalog.map((service) => (
          <article className={`result result-${service.id}`} key={service.id}>
            <h3>
              {service.name}
              <span className="dot-sep"> · </span>
              <span className="scope-label">Typical scope:</span>
            </h3>
            <p>{service.scope}</p>
            {service.range ? <p className="range">{service.range}</p> : null}
            <div className="row-actions">
              <Link className="btn btn-primary" href="/estimate">
                See a price range
              </Link>
              <Link className="btn btn-ghost" href="/book">
                Book a visit
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
