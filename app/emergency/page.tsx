import { pageMeta } from "@/lib/meta";
import type { Metadata } from "next";
import Link from "next/link";
import { Dial911, DownedLine, PhoneButton } from "@/components/blocks";
import { emergencyNodes, PHONE_DISPLAY } from "@/lib/site";

export const metadata: Metadata = pageMeta("/emergency/", "Electrical emergency?", "What to do about smoke, a downed line, a hot panel, or water near wiring, and when to call.");

const questions = [
  ["q1", "Do you smell burning or see smoke from anything electrical?"],
  ["q2", "Are sparks coming from an outlet, switch, or panel?"],
  ["q3", "Is an outlet, switch, or panel hot to the touch?"],
  ["q4", "Is your home the only one on the street without power?"],
  ["q5", "Is there water on or near your panel or wiring?"],
  ["q6", "Does a breaker trip again right after you reset it?"],
] as const;

const staySafe = [
  "Don't touch a panel, outlet, or cord that's hot, wet, or sparking.",
  "If there's water near the panel, stay out of the water and keep everyone back.",
  "Keep people and pets away from the problem area.",
  "Wait outside or in another room until help arrives.",
];

export default function EmergencyPage() {
  return (
    <>
      <section className="section dark emergency-hero">
        <div className="wrap narrow">
          <h1>Electrical emergency?</h1>
          <PhoneButton className="btn btn-light btn-block" />
          <p className="lede">
            If there&apos;s fire, smoke, or a burning smell, get out now, then <Dial911 /> from outside.
          </p>
        </div>
      </section>
      <section className="section" id="s2">
        <div className="wrap">
          <div className="e-grid">
            {emergencyNodes.map((node) => (
              <a className="e-tile" href={`#${node.id}`} key={node.id}>
                <span className="node-code">{node.code}</span>
                {node.name}
              </a>
            ))}
          </div>
          <article className="card" id="e1">
            <h2 className="h3">E1 Burning smell or smoke</h2>
            <p>
              If there&apos;s fire, smoke, or a burning smell, get out now, then <Dial911 /> from outside.
            </p>
            <PhoneButton className="btn btn-primary btn-block">Call {PHONE_DISPLAY} now</PhoneButton>
          </article>
          <article className="card" id="e3">
            <h2 className="h3">E3 Hot or buzzing panel</h2>
            <p>A panel, breaker, or outlet that&apos;s warm or hot to the touch. Don&apos;t open it or touch it.</p>
            <PhoneButton className="btn btn-primary btn-block" />
          </article>
          <article className="card" id="e4">
            <h2 className="h3">E4 Water near wiring</h2>
            <p>If there&apos;s water near the panel, stay out of the water and keep everyone back.</p>
            <PhoneButton className="btn btn-primary btn-block" />
          </article>
        </div>
      </section>
      <section className="section dark" id="s3">
        <div className="wrap narrow yn">
          <h2>Is this an emergency?</h2>
          {questions.map(([id, text]) => (
            <fieldset key={id}>
              <legend>{text}</legend>
              <label className="choice">
                <input type="radio" name={id} id={`${id}y`} value="yes" />
                Yes
              </label>
              <label className="choice">
                <input type="radio" name={id} id={`${id}n`} value="no" />
                No
              </label>
            </fieldset>
          ))}
          <div className="yn-yes">
            <PhoneButton className="btn btn-light btn-block">Call {PHONE_DISPLAY} now</PhoneButton>
            <p>
              For smoke, fire, or a burning smell: get out first, then <Dial911 /> from outside.
            </p>
          </div>
          <div className="yn-no">
            <p>Sounds like it can wait a day. Book a visit.</p>
            <Link className="btn btn-ghost" href="/book">
              Book a visit
            </Link>
          </div>
        </div>
      </section>
      <section className="section" id="e2">
        <div className="wrap narrow">
          <h2>Line down outside</h2>
          <DownedLine />
        </div>
      </section>
      <section className="section" id="s5">
        <div className="wrap narrow">
          <h2>Stay safe while you wait</h2>
          <ul className="check-list">
            {staySafe.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section dark" id="s6">
        <div className="wrap narrow">
          <p className="hours">Hours: to be set (concept). This concept site doesn&apos;t list 24/7 service.</p>
          <p className="small">
            This page is general safety guidance for a concept site, not a diagnosis. When in doubt, get out and{" "}
            <Dial911 />.
          </p>
        </div>
      </section>
    </>
  );
}
