"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Bolt, PhoneIcon } from "@/components/blocks";
import { EMAIL, nav, PHONE_DISPLAY, PHONE_TEL, residential, commercial } from "@/lib/site";

export function ConceptBar() {
  return (
    <p className="concept">
      Concept site. MORAINEX is a fictional electrician; prices, reviews, and photos are samples.
    </p>
  );
}

export function Logo() {
  return (
    <span className="logo">
      <svg className="logo-mark" viewBox="0 0 32 32" width="30" height="30" aria-hidden="true">
        <rect x="1" y="1" width="30" height="30" rx="8" fill="none" stroke="currentColor" strokeOpacity="0.25" />
        <path d="M8 23V9l8 9 8-9v14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
        <circle cx="24" cy="9" r="2.6" fill="var(--amber)" />
      </svg>
      <span className="logo-word">MORAINEX</span>
    </span>
  );
}

const norm = (path: string) => path.replace(/\/$/, "") || "/";

export function Header() {
  const pathname = norm(usePathname());
  const [scrolled, setScrolled] = useState(false);
  const menu = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menu.current) menu.current.open = false;
  }, [pathname]);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}${pathname === "/" ? " is-home" : ""}`}>
      <div className="wrap header-row">
        <Link className="brand" href="/" aria-label="MORAINEX home">
          <Logo />
        </Link>
        <nav className="nav" aria-label="Primary">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} aria-current={pathname === norm(item.href) ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <a className="header-phone" href={PHONE_TEL}>
            <PhoneIcon size={16} />
            <span>{PHONE_DISPLAY}</span>
          </a>
          <Link className="btn btn-amber btn-sm" href="/book/">
            Book a visit
          </Link>
          <details className="menu" ref={menu}>
            <summary aria-label="Menu">
              <span className="burger" aria-hidden="true">
                <span />
                <span />
              </span>
            </summary>
            <nav className="menu-panel" aria-label="Mobile">
              {nav.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
              <Link href="/book/">Book a visit</Link>
              <a className="btn btn-amber" href={PHONE_TEL}>
                <PhoneIcon /> Call {PHONE_DISPLAY}
              </a>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Logo />
          <p>Licensed electricians for Denver-metro homes and businesses.</p>
          <a className="footer-phone" href={PHONE_TEL}>
            {PHONE_DISPLAY}
          </a>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </div>
        <nav aria-label="Home services">
          <p className="footer-key">Homes</p>
          {residential.map((s) => (
            <Link key={s.id} href={`/services/#${s.id}`}>
              {s.name}
            </Link>
          ))}
        </nav>
        <nav aria-label="Business services">
          <p className="footer-key">Businesses</p>
          {commercial.map((s) => (
            <Link key={s.id} href={`/services/#${s.id}`}>
              {s.name}
            </Link>
          ))}
        </nav>
        <nav aria-label="Company">
          <p className="footer-key">Plan a job</p>
          <Link href="/estimate/">Price my project</Link>
          <Link href="/book/">Book a visit</Link>
          <Link href="/membership/">Care plan</Link>
          <Link href="/emergency/">Emergency help</Link>
        </nav>
      </div>
      <div className="wrap footer-base">
        <p>
          <Bolt size={13} /> Colorado master electrician license (sample) · Serving Denver, Aurora, Lakewood, Arvada,
          Westminster, Thornton, Centennial, Littleton, Englewood, and Golden
        </p>
        <p>
          Concept project. MORAINEX is a fictional company built as a portfolio piece. Prices, reviews, license numbers,
          and photos are illustrative. Not affiliated with any business of the same name.
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
      <a className="btn btn-glass" href={PHONE_TEL}>
        <PhoneIcon /> Call
      </a>
      <Link className="btn btn-amber" href="/estimate/">
        Price my project
      </Link>
    </div>
  );
}

// Adds .is-in to [data-reveal] elements as they scroll into view.
export function Reveal() {
  const pathname = usePathname();
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
