import type { Metadata } from "next";
import { MagneticLink } from "@/components/MagneticLink";
import { ParallaxImage } from "@/components/ParallaxImage";
import { Reveal } from "@/components/Reveal";
import { SplitText } from "@/components/SplitText";
import { StickyStack } from "@/components/StickyStack";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Landscape architecture, construction, swimming pools and garden maintenance, designed and built in-house by BM.",
  openGraph: {
    title: "Services | BM",
    description: "Design, build, pools and maintenance, resolved by one in-house team.",
  },
};

const services = [
  {
    n: "01",
    t: "Landscape Architecture",
    img: "/images/earlwood-vid-yard-perspective-wide.webp",
    d: "The best gardens evolve over time, and it all starts with a considered concept. We design responsive landscapes that perform in our climate, lift the value of your property and, most of all, change how you live outdoors. Concept design, 3D modelling, CDC/DA/CC approvals and detailed documentation.",
  },
  {
    n: "02",
    t: "Landscape Construction",
    img: "/images/earlwood-vid-decking-work-wide.webp",
    d: "With years on the tools as a team, we bring a deep working knowledge of materials, methods and detailing. We build with our own carpenters and trusted specialists, never handed off, so the garden survives everything exterior construction throws at it. Built well, and built to last.",
  },
  {
    n: "03",
    t: "Swimming Pools",
    img: "/images/campsie-4.webp",
    d: "We are licensed pool builders, which lets us design and deliver the garden and the water as one project. From consultation and approvals through to material sourcing and construction, you get a single transparent process and a pool that ties straight back into the carpentry around it.",
  },
  {
    n: "04",
    t: "Garden Maintenance",
    img: "/images/avalon-6.webp",
    d: "Our horticulture team keeps the living parts of your landscape reading the way they were drawn. Tailored to each garden: pruning, planting, pest management, programmed feeding and the long-term planning that lets a place settle properly into itself.",
  },
];

const process = [
  {
    n: "01",
    t: "Consultation",
    d: "The initial onsite consultation is where it begins: understanding what you want from the garden, what the site will allow, and how we make the two meet. Our experience in planning and residential construction helps navigate the approvals along the way.",
  },
  {
    n: "02",
    t: "Design",
    d: "After we have walked the site, a fee proposal for the design works follows. From there our drawings move through concept to detailed plans, 3D modelling and the CDC/DA/CC approval stages, with nothing left unresolved on paper.",
  },
  {
    n: "03",
    t: "Construct",
    d: "Once the vision is set and the plans are resolved, we move to costing. With finalised numbers agreed, the build starts: our in-house crew builds your new outdoor space from first dig to final coat.",
  },
  {
    n: "04",
    t: "Maintenance",
    d: "Our horticulture team is equipped to care for everything that grows. A regular maintenance routine carries the garden through its early years until it reaches the full intent of the design.",
  },
];

const numbers = [
  { v: "147", l: "Built projects" },
  { v: "30+", l: "Years experience" },
  { v: "9", l: "In-house crew" },
  { v: "1", l: "Mosman workshop" },
];

export default function ServicesPage() {
  return (
    <>
      {/* HERO — tight, filled, editorial */}
      <section className="mx-auto max-w-[1600px] px-6 pb-12 pt-32 md:px-12 md:pb-16 md:pt-36">
        <p className="eyebrow text-muted-foreground">Services · What we do</p>
        <div className="mt-6 grid gap-x-12 gap-y-8 md:mt-7 md:grid-cols-12 md:items-end">
          <SplitText
            as="h1"
            className="font-display text-[2.5rem] leading-[1.03] md:col-span-8 md:text-[3.4rem]"
            stagger={16}
          >
            Gardens, pools and carpentry that respond to the architecture and the land.
          </SplitText>
          <Reveal delay={180} className="md:col-span-4 md:pb-2">
            <p className="text-base leading-relaxed text-muted-foreground">
              One Sydney studio, designing and building outdoors from a single
              workshop in Mosman. Four disciplines, one team: start to finish.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CENTRAL IMAGE — garden + timber, the idea of the whole site */}
      <section className="img-zoom mx-auto max-w-[1600px] px-6 md:px-12">
        <ParallaxImage
          src="/images/earlwood-vid-cladding-sunset-wide.webp"
          alt="Timber-clad home opening onto a designed garden at dusk"
          className="aspect-[16/9] w-full"
          imgClassName="h-full w-full object-cover"
          strength={110}
          zoomFrom={1.08}
        />
      </section>

      {/* SERVICES — sticky stack of panels */}
      <section className="mx-auto max-w-[1600px] px-6 pt-20 md:px-12 md:pt-28">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-3 border-b border-border pb-6">
          <SplitText as="h2" className="font-display text-3xl leading-tight md:text-4xl">
            Four disciplines.
          </SplitText>
          <p className="eyebrow text-muted-foreground">Designed &amp; built in-house</p>
        </div>
      </section>
      <StickyStack
        cards={services.map((s) => ({
          id: s.n,
          content: (
            <div className="border-t border-border bg-background">
              <div className="mx-auto grid max-w-[1600px] items-center gap-10 px-6 py-14 md:grid-cols-12 md:px-12 md:py-20">
                <div className="md:col-span-5">
                  <div className="img-zoom aspect-[4/5]">
                    <img
                      src={s.img}
                      alt={s.t}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex flex-col md:col-span-6 md:col-start-7">
                  <span className="font-display text-6xl leading-none text-muted-foreground/35 md:text-7xl">
                    {s.n}
                  </span>
                  <h3 className="mt-4 font-display text-4xl leading-[1.0] md:text-5xl">
                    {s.t}
                  </h3>
                  <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
                    {s.d}
                  </p>
                  <MagneticLink
                    href="/contact"
                    className="mt-8 inline-flex items-center gap-2 self-start border-b border-foreground pb-1 text-sm"
                  >
                    Learn more <span aria-hidden>→</span>
                  </MagneticLink>
                </div>
              </div>
            </div>
          ),
        }))}
        offset={0}
      />

      {/* PROCESS — sticky left, scrolling right */}
      <section className="mx-auto max-w-[1600px] px-6 pt-24 md:px-12 md:pt-36">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          {/* sticky rail */}
          <div className="md:col-span-4">
            <div className="md:sticky md:top-32">
              <p className="eyebrow text-muted-foreground">The process</p>
              <h2 className="mt-5 font-display text-4xl leading-[1.02] md:text-5xl">
                How it
                <br />
                comes together.
              </h2>
              <p className="mt-6 max-w-xs text-base leading-relaxed text-muted-foreground">
                Four stages, every project, from the first walk of the site to the
                garden settling into its full design intent.
              </p>
              <MagneticLink
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm"
              >
                Start a project <span aria-hidden>→</span>
              </MagneticLink>
            </div>
          </div>

          {/* scrolling steps */}
          <div className="md:col-span-7 md:col-start-6">
            {process.map((step, i) => (
              <Reveal key={step.n} delay={i * 60}>
                <div className="grid grid-cols-[auto_1fr] gap-6 border-t border-border py-10 first:border-t-0 first:pt-0 md:gap-10 md:py-12">
                  <span className="font-display text-3xl leading-none text-muted-foreground/40 md:text-4xl">
                    {step.n}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl leading-tight md:text-3xl">
                      {step.t}
                    </h3>
                    <p className="mt-4 max-w-lg text-[0.95rem] leading-relaxed text-muted-foreground">
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
      <section className="mx-auto max-w-[1600px] px-6 py-24 md:px-12 md:py-32">
        <div className="grid gap-y-10 border-t border-border pt-12 md:grid-cols-4 md:gap-x-12">
          {numbers.map((n, i) => (
            <Reveal key={n.l} delay={i * 70}>
              <p className="font-display text-5xl leading-none md:text-6xl">{n.v}</p>
              <p className="eyebrow mt-4 text-muted-foreground">{n.l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* OUTRO — quiet, premium, not loud */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1600px] px-6 py-24 md:px-12 md:py-28">
          <div className="grid items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="eyebrow text-muted-foreground">Get in touch</p>
              <h2 className="mt-6 font-display text-4xl leading-[1.04] md:text-5xl">
                Tell us about your site.
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
                Send us the place — its light, its slope, what you want from it.
                We&rsquo;ll walk it with you and take it from there.
              </p>
            </div>
            <div className="md:col-span-4 md:col-start-9 md:justify-self-end">
              <MagneticLink
                href="/contact"
                className="eyebrow inline-flex items-center gap-3 border-b border-foreground pb-1"
              >
                Start a project <span aria-hidden>→</span>
              </MagneticLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
