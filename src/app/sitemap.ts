import type { MetadataRoute } from "next";
import { galleryItems, projectSlug } from "@/lib/gallery";
import { posts } from "@/lib/journal";

const base = "https://bmcarpentry.com.au";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { url: "", priority: 1, changeFrequency: "monthly" as const },
    { url: "/services", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/projects", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/about", priority: 0.7, changeFrequency: "yearly" as const },
    { url: "/journal", priority: 0.6, changeFrequency: "weekly" as const },
    { url: "/contact", priority: 0.8, changeFrequency: "yearly" as const },
  ].map((r) => ({ ...r, url: `${base}${r.url}`, lastModified: new Date() }));

  const projectRoutes = galleryItems.map((item) => ({
    url: `${base}/projects/${projectSlug(item)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const journalRoutes = posts.map((p) => ({
    url: `${base}/journal/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...projectRoutes, ...journalRoutes];
}
