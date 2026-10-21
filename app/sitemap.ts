import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://milehighpatriot.github.io/morainex";
  return ["", "/services", "/estimate", "/book", "/emergency", "/membership"].map((path) => ({
    url: `${base}${path}/`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
