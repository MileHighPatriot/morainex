import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Manrope, Sora } from "next/font/google";
import { CallBar, ConceptBar, Footer, Header, MotionFlag } from "@/components/chrome";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-sora",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://milehighpatriot.github.io/morainex"),
  title: {
    default: "MORAINEX · Colorado electrician, Denver metro",
    template: "%s · MORAINEX",
  },
  description:
    "Concept project. Panels, EV chargers, and repairs for Denver-metro homes. MORAINEX is a fictional Colorado electrician.",
  applicationName: "MORAINEX",
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#1c2024",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${manrope.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('can-motion')}catch(e){}",
          }}
        />
      </head>
      <body>
        <MotionFlag />
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
