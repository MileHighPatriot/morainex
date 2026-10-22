"use client";

import Link from "next/link";
import { useState } from "react";
import { PhoneButton } from "@/components/blocks";

const questions = [
  ["q1", "Do you smell burning or see smoke from anything electrical?"],
  ["q2", "Are sparks coming from an outlet, switch, or panel?"],
  ["q3", "Is an outlet, switch, or panel hot to the touch?"],
  ["q4", "Is your home the only one on the street without power?"],
  ["q5", "Is there water on or near your panel or wiring?"],
  ["q6", "Does a breaker trip again right after you reset it?"],
] as const;

// The first two answers mean leave the house; the rest mean call now.
const leave = new Set(["q1", "q2"]);

export function EmergencyCheck() {
  const [answers, setAnswers] = useState<Record<string, "yes" | "no">>({});
  const yes = questions.filter(([id]) => answers[id] === "yes").map(([id]) => id);
  const allNo = questions.every(([id]) => answers[id] === "no");

  return (
    <div className="yn">
      {questions.map(([id, text]) => (
        <fieldset key={id}>
          <legend>{text}</legend>
          <div className="options">
            {(["yes", "no"] as const).map((v) => (
              <label className="opt" key={v}>
                <input
                  type="radio"
                  name={id}
                  value={v}
                  checked={answers[id] === v}
                  onChange={() => setAnswers((a) => ({ ...a, [id]: v }))}
                />
                {v === "yes" ? "Yes" : "No"}
              </label>
            ))}
          </div>
        </fieldset>
      ))}
      <div className="yn-out" role="status">
        {yes.some((id) => leave.has(id)) ? (
          <div className="tier tier-hot">
            <p className="tier-key">Get out now</p>
            <h3>Leave the house, then call 911 from outside.</h3>
            <p>Call us once everyone is safe and the fire department has cleared it.</p>
          </div>
        ) : yes.length ? (
          <div className="tier">
            <p className="tier-key">Call now</p>
            <h3>Don&apos;t wait on this one.</h3>
            <p>Stay clear of the panel and anything warm or wet, and call us.</p>
            <PhoneButton className="btn btn-amber" />
          </div>
        ) : allNo ? (
          <div className="tier">
            <p className="tier-key">It can wait a day</p>
            <h3>Book a visit at a time that suits you.</h3>
            <Link className="btn btn-amber" href="/book/">
              Book a visit
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
