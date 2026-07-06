import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://bmcarpentry.com.au/sitemap.xml",
    host: "https://bmcarpentry.com.au",
  };
}
