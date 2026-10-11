import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/config";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  return base
    ? [
        { url: base, priority: 1, changeFrequency: "monthly" },
        { url: `${base}/contact`, priority: 0.8 },
        { url: `${base}/privacy`, priority: 0.3 },
      ]
    : [];
}
