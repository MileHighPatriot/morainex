"use client";

import { useEffect, useState } from "react";
import { DemoNote } from "@/components/blocks";
import { services, timeSlots, upcomingDays, upcomingMonths } from "@/lib/site";

type Day = ReturnType<typeof upcomingDays>[number];

export function BookForm() {
  // Dates are computed in the browser; a static export would otherwise freeze them at build time.
  const [days, setDays] = useState<Day[]>([]);
  const [service, setService] = useState(services[0].id);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setDays(upcomingDays());
    const pick = new URLSearchParams(window.location.search).get("service");
    if (pick && services.some((s) => s.id === pick)) setService(pick);
  }, []);

  return (
    <form
      className="stack"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const name = services.find((s) => s.id === service)?.name ?? "Selected service";
        const day = days.find((d) => d.iso === data.get("day"));
        const time = String(data.get("time") || "an open window");
        setMessage(
          `Demo booking: ${name}${day ? `, ${day.wd} ${day.mon} ${day.day}` : ""}, arrival ${time}. On a real site you'd get a text when the electrician heads over. Nothing was sent, and no one is booked or charged.`,
        );
      }}
    >
      <DemoNote />
      <label className="field">
        What do you need?
        <select name="service" value={service} onChange={(event) => setService(event.target.value)}>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </label>
      <fieldset>
        <legend>Day</legend>
        <div className="days">
          {days.map((day) => (
            <label className="day" key={day.iso}>
              <input type="radio" name="day" value={day.iso} />
              <span>{day.wd}</span>
              <strong>{day.day}</strong>
              <span>{day.mon}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend>Arrival window</legend>
        <div className="slots">
          {timeSlots.map((slot) => (
            <label className="slot" key={slot}>
              <input type="radio" name="time" value={slot} />
              {slot}
            </label>
          ))}
        </div>
      </fieldset>
      <label className="field">
        Name
        <input name="name" type="text" autoComplete="name" />
      </label>
      <label className="field">
        Phone
        <input name="phone" type="tel" autoComplete="tel" inputMode="tel" />
      </label>
      <label className="field">
        Anything we should know?
        <textarea name="notes" rows={3} />
      </label>
      <button className="btn btn-amber btn-lg" type="submit">
        Book my visit
      </button>
      {message ? (
        <p className="confirm" role="status">
          {message}
        </p>
      ) : null}
    </form>
  );
}

export function MembershipForm() {
  const [months, setMonths] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  useEffect(() => setMonths(upcomingMonths()), []);

  return (
    <form
      className="stack"
      onSubmit={(event) => {
        event.preventDefault();
        setDone(true);
      }}
    >
      <DemoNote />
      <label className="field">
        Name
        <input type="text" autoComplete="name" />
      </label>
      <label className="field">
        Phone
        <input type="tel" autoComplete="tel" inputMode="tel" />
      </label>
      <label className="field">
        ZIP
        <input inputMode="numeric" autoComplete="postal-code" maxLength={10} />
      </label>
      <fieldset>
        <legend>First safety check</legend>
        <div className="options">
          {months.map((month) => (
            <label className="opt" key={month}>
              <input type="radio" name="month" value={month} />
              {month}
            </label>
          ))}
        </div>
      </fieldset>
      <button className="btn btn-amber btn-lg" type="submit">
        Join Morainex Care
      </button>
      {done ? (
        <p className="confirm" role="status">
          Demo only. Nothing was sent, and no one is booked or charged.
        </p>
      ) : null}
    </form>
  );
}
