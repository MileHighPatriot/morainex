"use client";

import { useState } from "react";
import { DemoNote } from "@/components/blocks";
import { services, timeSlots } from "@/lib/site";

type Day = { iso: string; wd: string; mon: string; day: string };

export function BookForm({ days }: { days: Day[] }) {
  const [message, setMessage] = useState("");

  return (
    <form
      className="stack"
      method="dialog"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const service = String(data.get("service") || "selected service");
        const day = String(data.get("day") || "selected day");
        const time = String(data.get("time") || "selected time");
        const label = days.find((item) => item.iso === day);
        const dayText = label ? `${label.wd} ${label.mon} ${label.day}` : day;
        setMessage(
          `Demo booking: ${service}, ${dayText}, arrival window ${time} (example). On a real site, this is where you'd get a text before the electrician heads over. Nothing was sent, and no one is booked or charged.`,
        );
      }}
    >
      <DemoNote />
      <label className="field">
        Service
        <select name="service" defaultValue={services[0].name}>
          {services.map((service) => (
            <option key={service.id} value={service.name}>
              {service.code} {service.name}
            </option>
          ))}
        </select>
      </label>
      <fieldset>
        <legend>Date</legend>
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
        <legend>Time</legend>
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
        Notes
        <textarea name="notes" rows={4} />
      </label>
      <button className="btn btn-primary" type="submit">
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

export function MembershipForm({ months }: { months: string[] }) {
  const [done, setDone] = useState(false);
  return (
    <form
      className="stack"
      method="dialog"
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
        <legend>Start month</legend>
        <div className="options">
          {months.map((month) => (
            <label className="opt" key={month}>
              <input type="radio" name="month" value={month} />
              {month}
            </label>
          ))}
        </div>
      </fieldset>
      <button className="btn btn-primary" type="submit">
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
