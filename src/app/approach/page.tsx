import type { Metadata } from "next";
import { MagneticLink } from "@/components/MagneticLink";
import { MaskHeading } from "@/components/MaskHeading";
import { ParallaxImage } from "@/components/ParallaxImage";
import { Reveal } from "@/components/Reveal";
import { SplitText } from "@/components/SplitText";
import { StickyStack } from "@/components/StickyStack";

export const metadata: Metadata = {
  title: "Studio",
  description: "How BM designs and builds gardens, pools and bespoke carpentry.",
  openGraph: {
    title: "Studio — BM.",
    description: "Site-led design, in-house carpentry, planting that belongs.",
  },
};

const principles = [
  {
    n: "01",
    t: "Read the site",
    img: "/images/project-2.jpg",
    d: "Light, slope, soil, outlook. Every project starts with what is already there — and what the place wants to become. We map the brief against the constraints before we draw a single line.",
  },
  {
    n: "02",
    t: "Design with restraint",
    img: "/images/project-3.jpg",
    d: "We resolve gardens and structures into their surrounds rather than impose on them. Quiet decisions made carefully, instead of loud ones made fast. Less material, sized more accurately, finished more thoroughly.",
  },
  {
    n: "03",
    t: "Build it in-house",
    img: "/images/project-1.jpg",
    d: "Our carpenters and landscape crew work from our own drawings. Details get refined on the workbench and on site — never handed off to a third party, never lost in translation between a designer's sketch and a contractor's quote.",
  },
  {
    n: "04",
    t: "Plant for time",
    img: "/images/project-4.jpg",
    d: "Gardens that evolve. We plant ecosystems that mature into the place, not displays that peak in week one. Hand back a five-year vision with the keys, not a magazine cover that fades.",
  },
];

const process = [
  {
    n: "01",
    t: "Listen",
    d: "We walk the site with you before we draw anything — through every season you can describe to us. What you love, what you avoid, where the afternoon sun lands.",
  },
  {
    n: "02",
    t: "Draw",
    d: "Sketches become measured drawings become a single fixed price. Nothing goes to the crew that hasn't been resolved on paper and agreed with you first.",
  },
  {
    n: "03",
    t: "Build",
    d: "One in-house team from first dig to final coat of oil. Your designer is on site weekly, so the detail that was drawn is the detail that gets built.",
  },
  {
    n: "04",
    t: "Hand over",
    d: "We leave you with a planting calendar, a five-year vision and an open line. Most of our work comes back to us as the garden matures.",
  },
];

const numbers = [
  { v: "147", l: "Built projects" },
  { v: "16", l: "Years building" },
  { v: "9", l: "In-house crew" },
  { v: "1", l: "Mosman workshop" },
];

export default function ApproachPage() {
  return (
    <>
      <section className="mx-auto max-w-[1600px] px-6 pb-16 pt-44 md:px-12 md:pb-24 md:pt-56">
        <p className="eyebrow text-muted-foreground">Studio</p>
        <SplitText
          as="h1"
          className="mt-6 max-w-6xl font-display text-6xl leading-[0.9] md:text-[10rem]"
          stagger={28}
        >
          We work with the site.
        </SplitText>
        <div className="mt-16 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5 md:col-start-7">
            <MaskHeading
              as="p"
              lines={[
                "Not in spite of it. Not over the top of it.",
                "With it — slope, light, drainage, outlook —",
                "until the work resolves into the place",
                "and you can no longer see the join.",
              ]}
              className="font-display text-2xl leading-snug md:text-3xl"
              stagger={120}
            />
          </div>
        </div>
      </section>

      {/* Workshop photo with parallax */}
      <section className="img-zoom mx-auto max-w-[1600px] px-6 md:px-12">
        <ParallaxImage
          src="/images/studio.jpg"
          alt="Carpenter at the workbench"
          className="aspect-[16/9] w-full"
          imgClassName="h-full w-full object-cover"
          strength={120}
          zoomFrom={1.08}
        />
      </section>

      {/* PRINCIPLES — sticky stack */}
      <section className="mx-auto max-w-[1600px] px-6 pt-28 md:px-12 md:pt-44">
        <div className="mb-16 flex items-end justify-between gap-10">
          <SplitText as="h2" className="font-display text-5xl leading-[0.95] md:text-7xl">
            Four principles.
          </SplitText>
          <p className="eyebrow text-muted-foreground">Hold across every project</p>
        </div>
      </section>
      <StickyStack
        cards={principles.map((p) => ({
          id: p.n,
          content: (
            <div className="border-t border-border bg-background">
              <div className="mx-auto grid max-w-[1600px] items-start gap-10 px-6 py-16 md:grid-cols-12 md:px-12 md:py-24">
                <div className="md:col-span-5">
                  <div className="img-zoom aspect-[4/5]">
                    <img
                      src={p.img}
                      alt={p.t}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex flex-col md:col-span-6 md:col-start-7 md:pt-6">
                  <span className="font-display text-7xl leading-none text-muted-foreground/40 md:text-8xl">{p.n}</span>
                  <h3 className="mt-4 font-display text-5xl leading-[0.95] md:text-7xl">{p.t}</h3>
                  <p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">
                    {p.d}
                  </p>
                </div>
              </div>
            </div>
          ),
        }))}
        offset={0}
      />

      {/* PROCESS — numbered rhythm, no cards */}
      <section className="mx-auto max-w-[1600px] px-6 pt-28 md:px-12 md:pt-44">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow text-muted-foreground">The process</p>
            <SplitText as="h2" className="mt-6 font-display text-5xl leading-[0.95] md:text-6xl">
              Four moves, every time.
            </SplitText>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            {process.map((step, i) => (
              <Reveal key={step.n} delay={i * 70}>
                <div className="group grid grid-cols-[auto_1fr] gap-6 border-t border-border py-8 md:gap-10 md:py-10">
                  <span className="eyebrow pt-2 text-muted-foreground transition-colors duration-500 group-hover:text-foreground">
                    {step.n}
                  </span>
                  <div>
                    <h3 className="font-display text-3xl leading-tight transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 md:text-4xl">
                      {step.t}
                    </h3>
                    <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                      {step.d}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* NUMBERS — quiet metrics */}
      <section className="mx-auto max-w-[1600px] px-6 py-28 md:px-12 md:py-40">
        <div className="grid gap-y-12 md:grid-cols-4 md:gap-x-12">
          {numbers.map((n, i) => (
            <Reveal key={n.l} delay={i * 80} className="border-t border-border pt-6">
              <p className="font-display text-6xl leading-none md:text-7xl">{n.v}</p>
              <p className="eyebrow mt-4 text-muted-foreground">{n.l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* OUTRO CTA */}
      <section className="mx-auto max-w-[1600px] px-6 pb-32 md:px-12">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <SplitText as="h2" className="font-display text-5xl leading-[0.95] md:text-8xl" stagger={26}>
              Tell us about your site.
            </SplitText>
          </div>
          <div className="md:col-span-4 md:col-start-9 flex items-end">
            <MagneticLink
              href="/contact"
              className="eyebrow inline-flex items-center gap-3 border-b border-foreground pb-1"
            >
              Start a project <span aria-hidden>→</span>
            </MagneticLink>
          </div>
        </div>
      </section>
    </>
  );
}
