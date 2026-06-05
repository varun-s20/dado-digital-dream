import type { Metadata } from "next";
import { Cursor } from "@/components/Cursor";
import { Loader } from "@/components/Loader";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { SmoothScroll } from "@/components/SmoothScroll";
import { brand } from "@/lib/brand";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://bmcarpentry.com.au"),
  title: {
    default: `${brand.mark} ${brand.fullName}`,
    template: `%s — ${brand.mark}`,
  },
  description:
    "An independent studio designing and building gardens, pools and bespoke timber structures across Sydney and the NSW South Coast.",
  openGraph: {
    title: `${brand.mark} ${brand.fullName}`,
    description: "Outdoor spaces that respond to architecture and nature.",
    type: "website",
  },
  twitter: { card: "summary" },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll />
        <Cursor />
        <Loader />
        <SiteNav />
        <main className="min-h-dvh">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
