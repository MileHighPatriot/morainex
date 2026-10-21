"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { asset, nav, PHONE_DISPLAY, PHONE_TEL, EMAIL } from "@/lib/site";

export function MotionFlag() {
  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.documentElement.classList.add("can-motion");
    }
  }, []);
  return null;
}

export function ConceptBar() {
  return (
    <p className="concept">
      Concept project: MORAINEX is a fictional Colorado electrician, designed by 5280 Web Solutions to show what an
      electrical contractor site can do. It&apos;s not a real company. See more at{" "}
      <a href="https://5280webs.com">5280webs.com</a>
    </p>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.6 3.8c.3-.7 1-1.1 1.8-1l2.6.4c.7.1 1.2.7 1.3 1.4l.4 2.4c.1.7-.2 1.4-.8 1.8l-1.5 1a12.4 12.4 0 0 0 5.4 5.4l1-1.5c.4-.6 1.1-.9 1.8-.8l2.4.4c.7.1 1.3.6 1.4 1.3l.4 2.6c.1.8-.3 1.5-1 1.8l-1.6.7C14.2 22.2 2 10.4 3.5 5.4l.7-1.6z"
      />
    </svg>
  );
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="inner">
        <div className="brand-lockup">
          <Link className="brand" href="/">
            {/* SVG mark is already tiny and outlined. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="brand-mark" src={asset("/logos/mark.svg")} alt="" width={32} height={32} />
            <span className="brand-text">
              <span className="brand-name">
                MORAIN<span className="ex">EX</span>
              </span>
              <span className="brand-desc">Colorado electrician · Denver metro</span>
            </span>
          </Link>
          <span className="badge">Concept project</span>
        </div>
        <nav className="nav" aria-label="Primary">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>
        <a className="call-icon" href={PHONE_TEL} aria-label={`Call ${PHONE_DISPLAY}`}>
          <PhoneIcon />
        </a>
        <Link className="btn btn-primary header-cta" href="/estimate">
          Get an estimate
        </Link>
        <details className="menu">
          <summary>
            <span className="burger" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span className="visually-hidden">Menu</span>
          </summary>
          <nav className="menu-panel" aria-label="Mobile">
            {nav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            <Link className="btn btn-primary" href="/estimate">
              Get an estimate
            </Link>
            <Link href="/emergency">Emergency</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer" id="s18">
      <div className="wrap footer-grid">
        <div>
          <p className="footer-name">
            MORAIN<span className="ex">EX</span>
          </p>
          <p>MORAINEX · Colorado electrician · Denver metro (concept)</p>
          <p className="footer-contact">
            <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </p>
          <p>Sample license # (not real)</p>
        </div>
        <nav aria-label="Footer">
          {nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link href="/emergency">Emergency</Link>
        </nav>
        <p className="concept-note">
          Concept project: MORAINEX is a fictional company designed as a portfolio piece. Prices, reviews, license
          numbers, and photos are illustrative. Not affiliated with any other business named Morainex.
        </p>
      </div>
    </footer>
  );
}

export function CallBar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const isField = (node: EventTarget | null) =>
      node instanceof HTMLElement && node.matches("input, textarea, select");
    const onFocus = (event: FocusEvent) => {
      if (isField(event.target)) setHidden(true);
    };
    const onBlur = () => {
      window.setTimeout(() => {
        if (!isField(document.activeElement)) setHidden(false);
      }, 40);
    };
    document.addEventListener("focusin", onFocus);
    document.addEventListener("focusout", onBlur);
    return () => {
      document.removeEventListener("focusin", onFocus);
      document.removeEventListener("focusout", onBlur);
    };
  }, []);

  return (
    <div className={`callbar${hidden ? " is-hidden" : ""}`}>
      <a className="btn btn-primary" href={PHONE_TEL}>
        Call {PHONE_DISPLAY}
      </a>
      <Link className="btn btn-light" href="/estimate">
        Estimate
      </Link>
    </div>
  );
}
