import type { Metadata } from "next";
import { CountUp } from "@/components/CountUp";
import { HorizontalGallery } from "@/components/HorizontalGallery";
import { MagneticLink } from "@/components/MagneticLink";
import { MarqueeBand } from "@/components/MarqueeBand";
import { MaskHeading } from "@/components/MaskHeading";
import { ParallaxImage } from "@/components/ParallaxImage";
import { Reveal } from "@/components/Reveal";
import { SplitText } from "@/components/SplitText";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "About",
  description:
    "The people, the workshop and the seventeen years behind BM Carpentry & Landscaping.",
  openGraph: {
    title: "About — BM.",
    description: "Nine people, one Mosman workshop, a coastline we know by heart.",
  },
};

const timeline = [
  {
    year: "2009",
    t: "Two people and a ute",
    d: "Brendan starts a small carpentry round out of a Mosman lock-up — decks, screens, the odd pergola.",
  },
  {
    year: "2013",
    t: "The first whole garden",
    d: "The Bundeena slope: forty-two sandstone treads and a planting plan. The studio stops being only carpentry.",
  },
  {
    year: "2017",
    t: "Design comes in-house",
    d: "We hire our first landscape designer rather than subcontract the drawings. Nothing has left the building since.",
  },
  {
    year: "2021",
    t: "Stone and water",
    d: "A dedicated stone team and our first timber-wrapped pools. The four practices finally sit under one roof.",
  },
  {
    year: "2026",
    t: "Nine on the crew",
    d: "A waitlist we're quietly proud of, and a habit of being called back as the gardens mature.",
  },
];

const crew = [
  { name: "Brendan Mostyn", role: "Founder · lead carpenter", img: "/images/studio.jpg" },
  { name: "Saskia Veldt", role: "Landscape designer", img: "/images/project-2.jpg" },
  { name: "Declan Fitzhardinge", role: "Site foreman", img: "/images/project-1.jpg" },
  { name: "Mei-Lin Ang", role: "Planting & horticulture", img: "/images/project-4.jpg" },
  { name: "Tomas Wieczorek", role: "Stonemason", img: "/images/project-3.jpg" },
  { name: "Priya Raghunathan", role: "Studio & drawings", img: "/images/hero.jpg" },
];

const stats = [
  { to: 2009, suffix: "", l: "Founded in Mosman" },
  { to: 147, suffix: "", l: "Gardens built" },
  { to: 9, suffix: "", l: "On the crew" },
  { to: 17, suffix: "", l: "Years in the field" },
];

export default function AboutPage() {
  return (
    <>
      {/* HERO — asymmetric split, image-led: distinct from the Studio page */}
      <section className="mx-auto grid max-w-[1600px] gap-10 px-6 pb-20 pt-36 md:grid-cols-12 md:px-12 md:pb-28 md:pt-52">
        <div className="flex flex-col justify-between md:col-span-7">
          <div className="flex items-center gap-4">
            <span className="eyebrow text-muted-foreground">About</span>
            <span className="h-px flex-1 bg-border" />
            <span className="eyebrow text-muted-foreground">Est. 2009 · Mosman</span>
          </div>
          <MaskHeading
            as="h1"
            lines={["Nine people,", "one workshop,", <em key="i" className="font-light">a coastline</em>, "we know by heart."]}
            className="mt-10 font-display text-5xl leading-[0.95] tracking-tight md:mt-0 md:text-[6.5rem] md:leading-[0.88]"
            stagger={110}
          />
          <Reveal delay={400}>
            <p className="mt-10 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
              We are a small, in-house studio of designers, carpenters and
              stone-workers. We have built across Sydney&rsquo;s harbour and the
              NSW South Coast for seventeen years — and we still answer the phone
              ourselves.
            </p>
          </Reveal>
        </div>
        <Reveal delay={150} className="md:col-span-4 md:col-start-9">
          <div className="img-zoom aspect-[3/4] w-full">
            <ParallaxImage
              src="/images/studio.jpg"
              alt="A carpenter at the Mosman workbench"
              imgClassName="h-full w-full object-cover"
              strength={120}
              zoomFrom={1.1}
            />
          </div>
        </Reveal>
      </section>

      {/* KINETIC BAND — different texture from the homepage */}
      <section className="surface-deep relative overflow-hidden py-7 md:py-9">
        <MarqueeBand
          words={["Designers", "Carpenters", "Stone-workers", "Horticulturists", "Builders", "Neighbours"]}
          direction={-1}
          speed={40}
          className="font-display text-[12vw] leading-none md:text-[7rem]"
        />
      </section>

      {/* STORY */}
      <section className="mx-auto max-w-[1600px] px-6 py-28 md:px-12 md:py-40">
        <div className="grid gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <p className="eyebrow text-muted-foreground">Who we are</p>
          </Reveal>
          <div className="md:col-span-8 md:col-start-5">
            <MaskHeading
              as="p"
              lines={[
                "We started as carpenters, which",
                "is why we still think with our hands.",
                "Everything we design, we can build —",
                "and everything we build, we drew.",
              ]}
              className="font-display text-3xl leading-tight md:text-5xl"
              stagger={110}
            />
            <Reveal delay={300}>
              <p className="mt-10 max-w-xl text-lg leading-relaxed text-muted-foreground">
                That single fact shapes how the studio works. There is no handoff
                between the person who imagines a garden and the people who make it,
                no quote that quietly value-engineers the detail away. The designer
                who walked your site is on it again the week we start digging.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* STATS — animated count-up, the About page's own signature */}
      <section className="border-y border-border">
        <div className="mx-auto grid max-w-[1600px] gap-y-12 px-6 py-20 md:grid-cols-4 md:gap-x-12 md:px-12 md:py-24">
          {stats.map((s, i) => (
            <Reveal key={s.l} delay={i * 90}>
              <p className="font-display text-6xl leading-none tabular-nums md:text-7xl">
                <CountUp to={s.to} suffix={s.suffix} />
              </p>
              <p className="eyebrow mt-4 text-muted-foreground">{s.l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TIMELINE */}
      <section className="mx-auto max-w-[1600px] px-6 py-28 md:px-12 md:py-40">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="md:sticky md:top-32">
              <p className="eyebrow text-muted-foreground">A short history</p>
              <SplitText as="h2" className="mt-6 font-display text-5xl leading-[0.95] md:text-7xl">
                Seventeen years, told briefly.
              </SplitText>
            </div>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            {timeline.map((item, i) => (
              <Reveal key={item.year} delay={i * 60}>
                <div className="grid grid-cols-[auto_1fr] gap-6 border-t border-border py-10 md:gap-12">
                  <span className="font-display text-2xl text-muted-foreground md:text-3xl">{item.year}</span>
                  <div>
                    <h3 className="font-display text-3xl leading-tight md:text-4xl">{item.t}</h3>
                    <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
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
        <div className="mx-auto max-w-[1600px] px-6 py-28 md:px-12 md:py-40">
          <div className="grid gap-10 md:grid-cols-12">
            <p className="eyebrow opacity-70 md:col-span-3">In Brendan&rsquo;s words</p>
            <blockquote className="md:col-span-9">
              <MaskHeading
                as="p"
                lines={[
                  "“The best compliment we get",
                  "isn't on the day we hand over.",
                  "It's five years later, when a",
                  "garden looks like it grew there",
                  "on its own.”",
                ]}
                className="font-display text-4xl leading-[1.05] md:text-7xl"
                stagger={100}
              />
              <footer className="eyebrow mt-10 opacity-70">
                Brendan Mostyn — Founder
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* THE CREW — horizontal scroll */}
      <section className="pt-28 md:pt-40">
        <div className="mx-auto mb-12 flex max-w-[1600px] items-end justify-between px-6 md:mb-16 md:px-12">
          <div>
            <p className="eyebrow text-muted-foreground">The crew · {crew.length}</p>
            <SplitText as="h2" className="mt-4 font-display text-5xl leading-[0.9] md:text-7xl">
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
              <div className="mt-5 flex items-baseline justify-between">
                <div>
                  <h3 className="font-display text-2xl md:text-3xl">{person.name}</h3>
                  <p className="eyebrow mt-1 text-muted-foreground">{person.role}</p>
                </div>
                <span className="eyebrow text-muted-foreground">0{i + 1}</span>
              </div>
            </div>
          ))}
        </HorizontalGallery>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1600px] px-6 py-28 md:px-12 md:py-40">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <SplitText as="h2" className="font-display text-5xl leading-[0.95] md:text-8xl" stagger={24}>
              Come and meet the workshop.
            </SplitText>
          </div>
          <div className="flex items-end md:col-span-3 md:col-start-10">
            <MagneticLink
              href="/contact"
              className="eyebrow inline-flex items-center gap-3 border-b border-foreground pb-1"
            >
              Get in touch <span aria-hidden>→</span>
            </MagneticLink>
          </div>
        </div>
        <p className="mt-12 max-w-md text-sm text-muted-foreground">
          {brand.address.line1}, {brand.address.line2}. Site visits by appointment.
        </p>
      </section>
    </>
  );
}
