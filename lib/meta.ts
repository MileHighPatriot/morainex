import type { Metadata } from "next";

export const SITE_URL = "https://milehighpatriot.github.io/morainex";
const CONCEPT = "Concept project: MORAINEX is a fictional Colorado electrician.";

export function pageMeta(path: string, title: string, description: string): Metadata {
  const full = `${description} ${CONCEPT}`;
  const url = `${SITE_URL}${path}`;
  const ogTitle = path === "/" ? "MORAINEX · Colorado electrician, Denver metro (concept)" : `${title} · MORAINEX (concept)`;
  return {
    title: path === "/" ? { absolute: "MORAINEX · Colorado electrician, Denver metro" } : title,
    description: full,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: "MORAINEX (concept)",
      title: ogTitle,
      description: full,
      url,
      locale: "en_US",
      images: [{ url: `${SITE_URL}/og.jpg`, width: 1200, height: 630, alt: "MORAINEX concept project card with a Concept project label" }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: full,
      images: [`${SITE_URL}/og.jpg`],
    },
  };
}
