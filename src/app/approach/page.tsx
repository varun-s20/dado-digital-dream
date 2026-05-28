import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Studio",
  description: "How Fieldcraft designs and builds gardens, pools and bespoke carpentry.",
  openGraph: {
    title: "Studio — Fieldcraft",
    description: "Site-led design, in-house carpentry, planting that belongs.",
  },
};

const principles = [
  { n: "01", t: "Read the site", d: "Light, slope, soil, outlook. Every project starts with what is already there — and what the place wants to become." },
  { n: "02", t: "Design with restraint", d: "We resolve gardens and structures into their surrounds rather than impose on them. Quiet decisions, made carefully." },
  { n: "03", t: "Build it in-house", d: "Our carpenters and landscape crew work from our drawings. Details get refined on the workbench and on site, together." },
  { n: "04", t: "Plant for time", d: "Gardens that evolve. We plant ecosystems that mature into the place, not displays that peak in week one." },
];

export default function ApproachPage() {
  return (
    <>
      <section className="mx-auto max-w-[1600px] px-6 pb-20 pt-44 md:px-12 md:pb-32 md:pt-56">
        <Reveal>
          <p className="eyebrow text-muted-foreground">Studio</p>
          <h1 className="mt-6 max-w-5xl font-display text-6xl leading-[0.9] md:text-[9rem]">
            We work with the <em className="font-light">site.</em>
          </h1>
        </Reveal>
      </section>
      <section className="img-zoom mx-auto max-w-[1600px] px-6 md:px-12">
        <Reveal>
          <img src="/images/studio.jpg" alt="Carpenter at the workbench" className="aspect-[16/9] w-full object-cover" />
        </Reveal>
      </section>
      <section className="mx-auto max-w-[1600px] px-6 py-28 md:px-12 md:py-40">
        <div className="grid gap-y-20 md:grid-cols-2 md:gap-x-16">
          {principles.map((p, i) => (
            <Reveal key={p.n} delay={i * 80} className="border-t border-border pt-8">
              <div className="flex items-baseline justify-between">
                <h2 className="font-display text-4xl">{p.t}</h2>
                <span className="eyebrow text-muted-foreground">{p.n}</span>
              </div>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">{p.d}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
