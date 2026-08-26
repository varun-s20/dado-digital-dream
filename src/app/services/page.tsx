import type { Metadata } from "next";
import { CtaOutro } from "@/components/CtaOutro";
import { DisciplineCard } from "@/components/DisciplineCard";
import { MagneticLink } from "@/components/MagneticLink";
import { ParallaxImage } from "@/components/ParallaxImage";
import { Reveal } from "@/components/Reveal";
import { SplitText } from "@/components/SplitText";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Design, landscaping, carpentry and garden maintenance, designed and built in-house by BM.",
  openGraph: {
    title: "Services | BM",
    description: "Design, landscaping, carpentry and maintenance, resolved by one in-house team.",
  },
};

const services = [
  {
    n: "01",
    t: "Design",
    img: "/images/dsc09432_hdr.webp",
    d: "From your initial consultation through to the finished product, we guide you through all the steps needed to achieve your vision.",
  },
  {
    n: "02",
    t: "Landscaping",
    img: "/images/avalon-3.webp",
    d: "From retaining walls and paving to hardscapes and softscapes, we provide complete landscaping solutions tailored to your space.",
  },
  {
    n: "03",
    t: "Carpentry",
    img: "/images/page_4_img_6.jpg",
    d: "Structural and finish carpentry, decking and cladding, every aspect hand built by our own team.",
  },
  {
    n: "04",
    t: "Garden Maintenance",
    img: "/images/campsie-2.webp",
    d: "Whether it's maintaining your garden after installation or giving an existing outdoor space the care it needs, our team can help keep your landscape looking its best all year round.",
  },
];

const process = [
  {
    n: "01",
    t: "Consultation",
    d: "The initial onsite consultation is where it begins: understanding what you want from the landscape, what the site will allow, and how we make the two meet. Our experience in planning and residential construction helps navigate the approvals along the way.",
  },
  {
    n: "02",
    t: "Design",
    d: "We provide a range of design solutions for your project: detailed architectural drawings and documentation where a project needs the full approvals process, or simple, tailored designs for projects that call for a lighter touch.",
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

export default function ServicesPage() {
  return (
    <>
      {/* HERO — two staggered images flanking a stacked header/subhead */}
      <section className="mx-auto max-w-[1600px] pb-16 md:px-12 md:pb-24 md:pt-28">
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-12 ">
          {/* image A — offset down, narrower, sits under the middle words */}
          <div className="img-zoom relative md:col-span-4 md:mt-28 ">
            <ParallaxImage
              src="/images/earlwood-home-cover.webp"
              alt="Timber-clad home and garden, Earlwood"
              className="w-full"
              strength={90}
              zoomFrom={1.08}
            />
            <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/55 via-black/0 to-transparent">
              <p className="eyebrow p-5 text-white/90">Earlwood</p>
            </div>
          </div>

          {/* middle — two stacked words, sitting a little above centre */}
          <div className="hidden flex-col items-center justify-center md:col-span-3 md:col-start-5 md:flex md:h-full md:pb-56">
            <SplitText
              as="p"
              className="text-center font-display leading-[0.95] tracking-[-0.03em] text-[clamp(2.5rem,6vw,5.5rem)]"
            >
              Our
              <br />
              craft
            </SplitText>
          </div>

          {/* image B — top-aligned, taller; header + copy + CTA continue beneath it */}
          <div className="md:col-span-5 md:col-start-8 px-6 md:px-0">
            <div className="img-zoom relative hidden md:block">
              <ParallaxImage
                src="/images/from-live-site/live-site-16-cara-deck.webp"
                alt="BM Carpentry and Landscaping"
                className="aspect-square w-full"
                strength={90}
                zoomFrom={1.08}
              />
              <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/55 via-black/0 to-transparent">
                <p className="eyebrow p-5 text-white/90">Sydney</p>
              </div>
            </div>
            <Reveal delay={180} className="md:mt-8">
              <h1 className="font-display text-[clamp(1.6rem,4vw,2rem)] leading-[1.15] md:text-[1.9rem]">
                Gardens, carpentry and landscaping that respond to the architecture and the land.
              </h1>
              <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
                One Sydney team, designing and building outdoors from carpentry through
                to landscaping. Four disciplines, one crew: start to finish.
              </p>
              <MagneticLink
                href="/projects"
                className="mt-6 inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm"
              >
                See our work <span aria-hidden>→</span>
              </MagneticLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SERVICES — sticky stack of panels */}
      <section className="mx-auto max-w-[1600px] px-6 pt-12 md:px-12">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-3">
          <SplitText as="h2" className="font-display text-3xl leading-tight md:text-6xl">
            Four disciplines.
          </SplitText>
          <p className="eyebrow text-muted-foreground">Designed &amp; built in-house</p>
        </div>
      </section>
      {services.map((s) => (
        <DisciplineCard key={s.n} n={s.n} t={s.t} img={s.img} d={s.d} />
      ))}

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
                Four stages, every project, from the first conversation to the
                unveiling of your new design space.
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

      {/* NUMBERS — disabled 2026-08, keep for later.
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
      */}

      {/* OUTRO — matches the homepage/about outro */}
      <CtaOutro />
    </>
  );
}
