import type { MetadataRoute } from "next";
import { brand } from "@/lib/brand";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${brand.fullName} — Sydney Carpentry & Landscaping`,
    short_name: "BM Carpentry",
    description:
      "Decking, pergolas, cladding, fencing and complete outdoor living spaces across Sydney.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f5f1",
    theme_color: "#231F20",
    icons: [
      { src: "/icon.png", sizes: "any", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
