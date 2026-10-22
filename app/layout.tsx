import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { CallBar, ConceptBar, Footer, Header, Reveal } from "@/components/chrome";
import "./globals.css";

const display = Inter_Tight({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://milehighpatriot.github.io/morainex"),
  title: {
    default: "MORAINEX · Colorado electrician, Denver metro",
    template: "%s · MORAINEX",
  },
  description:
    "Concept project. MORAINEX is a fictional Colorado electrician serving the Denver metro.",
  icons: { icon: [{ url: "/morainex/favicon.ico", sizes: "any" }] },
  other: { "build-hash": (process.env.GITHUB_SHA || "local").slice(0, 7) },
  applicationName: "MORAINEX",
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Electrician",
  name: "MORAINEX (concept project)",
  description:
    "Concept project. MORAINEX is a fictional Colorado electrician built as a portfolio piece. It is not a real company.",
  url: "https://milehighpatriot.github.io/morainex/",
  telephone: "+1-720-555-0193",
  email: "hello@morainex.example",
  image: "https://milehighpatriot.github.io/morainex/og.jpg",
  areaServed: { "@type": "Place", name: "Denver metro, Colorado (example area)" },
  slogan: "Concept project",
  additionalType: "https://schema.org/HomeAndConstructionBusiness",
  disambiguatingDescription: "Fictional business for a concept website. No real address, license, or reviews.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0b0e12",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('can-motion')}catch(e){}",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Reveal />
        <a className="skip" href="#main">
          Skip to content
        </a>
        <ConceptBar />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <CallBar />
      </body>
    </html>
  );
}
