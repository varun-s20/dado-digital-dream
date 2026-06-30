import type { Metadata } from "next";
import { CountUp } from "@/components/CountUp";
import { HorizontalGallery } from "@/components/HorizontalGallery";
import { MagneticLink } from "@/components/MagneticLink";
import { MaskHeading } from "@/components/MaskHeading";
import { Reveal } from "@/components/Reveal";
import { SplitText } from "@/components/SplitText";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "About",
  description:
    "The people, the workshop and the craftsmanship behind BM Carpentry & Landscaping.",
  openGraph: {
    title: "About BM",
    description: "One workshop, a passion for carpentry and landscape design.",
  },
};

const timeline = [
  {
    year: "2012",
    t: "The beginning",
    d: "Michael and Ben start a carpentry and garden round out of Mosman, building custom decks, privacy screens, and timber pergolas.",
  },
  {
    year: "2015",
    t: "Bespoke landscape stairs",
    d: "The Avalon Beach project: our first major curved landscape stairs and retaining wall setup, blending carpentry with garden topography.",
  },
  {
    year: "2018",
    t: "In-house design",
    d: "We bring design and estimating in-house to manage the complete client experience from initial concept through to completion.",
  },
  {
    year: "2022",
    t: "Seamless outdoor spaces",
    d: "We combine structural carpentry, paving, concreting, and softscape planting under a single, unified B.M. Carpentry team.",
  },
  {
    year: "2026",
    t: "Extraordinary transformations",
    d: "A crew of skilled carpenters and landscapers delivering premium, design-led outdoor transformations across Sydney.",
  },
];

const crew = [
  { name: "Michael", role: "Co-Founder · Lead Carpenter", img: "/images/campsie-2.webp" },
  { name: "Ben", role: "Co-Founder · Lead Landscaper", img: "/images/avalon-1.webp" },
  { name: "Declan", role: "Site Foreman", img: "/images/earlwood-1.webp" },
  { name: "Mei-Lin", role: "Horticulture Lead", img: "/images/avalon-6.webp" },
  { name: "Tomas", role: "Stonemason", img: "/images/campsie-3.webp" },
  { name: "Priya", role: "Design Coordinator", img: "/images/studio-1.webp" },
];

const values = [
  {
    t: "We design and construct responsibly.",
    d: "Every decision weighed for how it ages, what it costs the site, and what it leaves behind.",
    icon: "leaf",
  },
  {
    t: "We source locally wherever possible.",
    d: "Timber, stone and plants sourced locally for the climate, footprint, and community.",
    icon: "sprout",
  },
  {
    t: "We have a love for recycled materials.",
    d: "Reclaimed hardwood and salvaged stone carry a patina new material can’t fake, and keep good material in use.",
    icon: "recycle",
  },
] as const;

function ValueIcon({ name }: { name: "leaf" | "sprout" | "recycle" }) {
  const common = {
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (name === "leaf") {
    return (
      <svg {...common}>
        <path d="M5 19c0-7 5-12 14-13-1 9-6 14-13 13Z" />
        <path d="M5 19c3-4 6-6 10-7.5" />
      </svg>
    );
  }
  if (name === "sprout") {
    return (
      <svg {...common}>
        <path d="M12 20v-7" />
        <path d="M12 13c0-3-2-5-5-5 0 3 2 5 5 5Z" />
        <path d="M12 12c0-3 2-5 5-5 0 3-2 5-5 5Z" />
        <path d="M7 20h10" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M8 5.5 10 2l2 3.5" />
      <path d="m4.5 14-2 3.5h4" />
      <path d="m19.5 14 2 3.5h-4" />
      <path d="M10 2 4.5 11.5M14 2l5.5 9.5M6.5 30.5H30.5" />
    </svg>
  );
}

const stats = [
  { to: 2012, suffix: "", l: "Founded in Mosman" },
  { to: 147, suffix: "", l: "Gardens built" },
  { to: 9, suffix: "", l: "On the crew" },
  { to: 30, suffix: "", l: "Years in the field" },
];

export default function AboutPage() {
  return (
    <>
      {/* HERO - quiet, type-only; faint garden behind for depth */}
      <section className="relative overflow-hidden border-b border-border">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <img
            src="/images/earlwood-3.webp"
            alt=""
            className="h-full w-full object-cover opacity-[0.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
        </div>
        <div className="relative mx-auto max-w-[1600px] px-6 pb-16 pt-32 md:px-12 md:pb-24 md:pt-40">
          <div className="flex items-center gap-4">
            <span className="eyebrow text-muted-foreground">About</span>
            <span className="h-px flex-1 bg-border" />
            <span className="eyebrow text-muted-foreground">Mosman, Sydney</span>
          </div>
          <SplitText
            as="h1"
            className="mt-8 max-w-3xl font-display text-[2.1rem] leading-[1.04] tracking-[-0.02em] md:text-[3.4rem] md:leading-[1.0]"
            stagger={16}
          >
            Gardens that belong, built by the same hands that draw them.
          </SplitText>
          <Reveal delay={260}>
            <p className="mt-7 max-w-xl text-base leading-snug tracking-[-0.01em] text-muted-foreground md:text-lg">
              A small, in-house studio of designers, carpenters and landscapers,
              building across Sydney&rsquo;s harbour and the NSW South Coast for
              seventeen years, and still answering the phone ourselves.
            </p>
          </Reveal>
        </div>
      </section>

      {/* STORY */}
      <section className="mx-auto max-w-[1600px] px-6 py-16 md:px-12 md:py-24">
        <div className="grid gap-x-12 gap-y-8 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <p className="eyebrow text-muted-foreground">Who we are</p>
          </Reveal>
          <div className="md:col-span-8 md:col-start-5">
            <MaskHeading
              as="p"
              lines={[
                "We started as carpenters, which",
                "is why we still think with our hands.",
                "Everything we design, we can build,",
                "and everything we build, we drew.",
              ]}
              className="font-display text-[1.9rem] leading-[1.08] tracking-[-0.02em] md:text-[2.9rem]"
              stagger={100}
            />
            <Reveal delay={300}>
              <p className="mt-6 max-w-xl text-base leading-snug tracking-[-0.01em] text-muted-foreground md:text-lg">
                That single fact shapes how the studio works. There is no handoff
                between the person who imagines a garden and the people who make it,
                no quote that quietly value-engineers the detail away. The designer
                who walked your site is on it again the week we start digging.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* VALUES — sustainability */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1600px] px-6 py-16 md:px-12 md:py-24">
          <div className="flex items-end justify-between gap-10">
            <div>
              <p className="eyebrow text-muted-foreground">Sustainability</p>
              <SplitText
                as="h2"
                className="mt-4 font-display text-4xl leading-[0.98] tracking-[-0.02em] md:text-6xl"
              >
                Our values.
              </SplitText>
            </div>
          </div>
          <div className="mt-12 grid gap-x-12 gap-y-12 md:mt-16 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.t} delay={i * 90}>
                <div className="flex flex-col border-t border-border pt-7">
                  <span className="text-foreground/85">
                    <ValueIcon name={v.icon} />
                  </span>
                  <h3 className="mt-6 font-display text-2xl leading-[1.1] tracking-[-0.02em] md:text-[1.7rem]">
                    {v.t}
                  </h3>
                  <p className="mt-4 max-w-xs text-base leading-snug tracking-[-0.01em] text-muted-foreground">
                    {v.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STATS — animated count-up */}
      <section className="border-y border-border">
        <div className="mx-auto grid max-w-[1600px] gap-y-10 px-6 py-12 md:grid-cols-4 md:gap-x-12 md:px-12 md:py-16">
          {stats.map((s, i) => (
            <Reveal key={s.l} delay={i * 90}>
              <p className="font-display text-5xl leading-none tabular-nums tracking-[-0.02em] md:text-7xl">
                <CountUp to={s.to} suffix={s.suffix} />
              </p>
              <p className="eyebrow mt-3 text-muted-foreground">{s.l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TIMELINE — sticky left, scrolling right */}
      <section className="mx-auto max-w-[1600px] px-6 py-16 md:px-12 md:py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="md:sticky md:top-28">
              <p className="eyebrow text-muted-foreground">A short history</p>
              <SplitText as="h2" className="mt-5 font-display text-4xl leading-[0.98] tracking-[-0.02em] md:text-6xl">
                Our journey, told briefly.
              </SplitText>
            </div>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            {timeline.map((item, i) => (
              <Reveal key={item.year} delay={i * 60}>
                <div className="grid grid-cols-[auto_1fr] gap-6 border-t border-border py-7 first:border-t-0 first:pt-0 md:gap-12 md:py-9">
                  <span className="font-display text-2xl tracking-[-0.02em] text-muted-foreground/70 md:text-3xl">{item.year}</span>
                  <div>
                    <h3 className="font-display text-2xl leading-[1.04] tracking-[-0.02em] md:text-3xl">{item.t}</h3>
                    <p className="mt-3 max-w-xl text-base leading-snug tracking-[-0.01em] text-muted-foreground">
                      {item.d}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER QUOTE */}
      <section className="surface-deep">
        <div className="mx-auto max-w-[1600px] px-6 py-16 md:px-12 md:py-24">
          <div className="grid gap-x-12 gap-y-6 md:grid-cols-12">
            <p className="eyebrow opacity-70 md:col-span-3 md:pt-2">In Michael's words</p>
            <blockquote className="md:col-span-9">
              <MaskHeading
                as="p"
                lines={[
                  "“The best compliment we get",
                  "isn't the day we hand over.",
                  "It's five years later, when a",
                  "garden looks like it grew there",
                  "on its own.”",
                ]}
                className="font-display text-[1.9rem] leading-[1.08] tracking-[-0.02em] md:text-[3.4rem]"
                stagger={90}
              />
              <footer className="eyebrow mt-7 opacity-70">
                Michael, Co-Founder
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* THE CREW — horizontal scroll */}
      <section className="pt-16 md:pt-24">
        <div className="mx-auto mb-8 flex max-w-[1600px] items-end justify-between px-6 md:mb-10 md:px-12">
          <div>
            <p className="eyebrow text-muted-foreground">The crew · {crew.length}</p>
            <SplitText as="h2" className="mt-3 font-display text-4xl leading-[0.94] tracking-[-0.02em] md:text-6xl">
              The hands on it.
            </SplitText>
          </div>
          <p className="eyebrow hidden text-muted-foreground md:block">Scroll →</p>
        </div>
        <HorizontalGallery>
          {crew.map((person, i) => (
            <div key={person.name} className="h-tile snap-start">
              <div className="img-zoom aspect-[4/5] w-full">
                <img
                  src={person.img}
                  alt={person.name}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <div>
                  <h3 className="font-display text-xl tracking-[-0.02em] md:text-2xl">{person.name}</h3>
                  <p className="eyebrow mt-1 text-muted-foreground">{person.role}</p>
                </div>
                <span className="eyebrow text-muted-foreground">0{i + 1}</span>
              </div>
            </div>
          ))}
        </HorizontalGallery>
      </section>

      {/* CTA — quiet, premium; matches the Services page outro */}
      <section className="mt-16 border-t border-border md:mt-24">
        <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-12 md:py-24">
          <div className="grid items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="eyebrow text-muted-foreground">Get in touch</p>
              <h2 className="mt-5 font-display text-4xl leading-[1.02] tracking-[-0.02em] md:text-5xl">
                Come and meet the workshop.
              </h2>
              <p className="mt-5 max-w-md text-base leading-snug tracking-[-0.01em] text-muted-foreground">
                {brand.address.line1}, {brand.address.line2}. Site visits by
                appointment: tell us about the place and we&rsquo;ll walk it with you.
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
