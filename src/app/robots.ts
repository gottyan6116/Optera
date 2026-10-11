import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/config";
export default function robots(): MetadataRoute.Robots {
  const base = siteUrl();
  return base
    ? {
        rules: { userAgent: "*", allow: "/", disallow: "/api/" },
        sitemap: `${base}/sitemap.xml`,
      }
    : { rules: { userAgent: "*", disallow: "/" } };
}
