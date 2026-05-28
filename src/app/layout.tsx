import type { Metadata } from "next";
import { Loader } from "@/components/Loader";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Fieldcraft — Carpentry & landscape design",
    template: "%s — Fieldcraft",
  },
  description:
    "An independent studio designing and building gardens, pools and bespoke timber structures across Sydney and the NSW South Coast.",
  openGraph: {
    title: "Fieldcraft — Carpentry & landscape design",
    description: "Outdoor spaces that respond to architecture and nature.",
    type: "website",
  },
  twitter: {
    card: "summary",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Loader />
        <SiteNav />
        <main className="min-h-screen">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
