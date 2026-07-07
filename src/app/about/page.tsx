import type { Metadata } from "next";
import { CountUp } from "@/components/CountUp";
import { MagneticLink } from "@/components/MagneticLink";
import { MaskHeading } from "@/components/MaskHeading";
import { Reveal } from "@/components/Reveal";
import { SplitText } from "@/components/SplitText";
import { StoryChapter } from "@/components/StoryChapter";
import { ValueReveal, type ValueItem } from "@/components/ValueReveal";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "About",
  description: "The people, the workshop and the craftsmanship behind BM Carpentry & Landscaping.",
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
  { name: "Michael", role: "Co-Founder · Lead Carpenter" },
  { name: "Ben", role: "Co-Founder · Lead Landscaper" },
  { name: "Declan", role: "Site Foreman" },
  { name: "Mei-Lin", role: "Horticulture Lead" },
  { name: "Tomas", role: "Stonemason" },
  { name: "Priya", role: "Design Coordinator" },
];

/* Studio story, told as a clean centred column of four numbered chapters
   (01–04) running one below the other — no imagery. Uniform, calm rhythm:
   a small index label over a centred kicker and a centred paragraph, hairline
   dividers between. Carries the carpentry-led, design-build philosophy. */
const storyBeats = [
  {
    index: "01",
    kicker: "We started as carpenters.",
    text: "Which is why we still think with our hands. Everything we design, we can build — and everything we build, we drew first.",
    img: "/images/earlwood-2.webp",
  },
  {
    index: "02",
    kicker: "So we drew our own gardens.",
    text: "Design and estimating came in-house, closing the gap between the person who imagines a garden and the people who make it.",
    img: "/images/avalon-6.webp",
  },
  {
    index: "03",
    kicker: "No detail gets value-engineered away.",
    text: "The designer who walked your site is on it again the week we start digging — the same eyes from first sketch to final planting.",
    img: "/images/campsie-3.webp",
  },
  {
    index: "04",
    kicker: "One team, start to finish.",
    text: "Structural carpentry, stonework, paving and planting under a single crew — so the vision that opens a project is the one that closes it.",
    img: "/images/earlwood-1.webp",
  },
];

const valueItems: ValueItem[] = [
  {
    icon: "leaf",
    title: "Design & construct responsibly.",
    desc: "Every decision weighed for how it ages, what it costs the site, and what it leaves behind.",
  },
  {
    icon: "pin",
    title: "Source close to home.",
    desc: "Timber, stone and plants chosen for the climate, the footprint, and the community they come from.",
  },
  {
    icon: "recycle",
    title: "Give good material a second life.",
    desc: "Salvaged hardwood and stone carry a patina new material can’t fake — and keep good material in use.",
  },
];

/** Per-portrait rest tilt / vertical offset — pinned like snapshots on a
 * workshop corkboard rather than a uniform grid. */
const CREW_LAYOUT = [
  { rotate: -3, lift: 6 },
  { rotate: 2.5, lift: 24 },
  { rotate: -2.5, lift: -6 },
  { rotate: 3, lift: 20 },
  { rotate: -3.5, lift: 2 },
  { rotate: 2, lift: -12 },
] as const;

const stats = [
  { to: 2012, suffix: "", l: "Founded in Mosman" },
  { to: 147, suffix: "", l: "Gardens built" },
  { to: 9, suffix: "", l: "On the crew" },
  { to: 30, suffix: "", l: "Years in the field" },
];

export default function AboutPage() {
  return (
    <>
      {/* HERO — type-led masthead: centred eyebrow, oversized statement with
          a single italic-light accent, one lead paragraph — then a single
          full-bleed photograph so the page has weight without going busy. */}
      <section className="border-b border-border">
        <img
          src="/images/earlwood-2.webp"
          alt="A landscaped garden and timber build by BM Carpentry at golden hour"
          className="h-[30vh] w-full object-cover md:h-[50vh]"
        />

        <div className="mx-auto flex max-w-[1180px] flex-col items-center px-6 py-14 md:py-14 text-center md:px-12">
          <p className="eyebrow text-muted-foreground">Who we are</p>

          <MaskHeading
            as="h1"
            lines={[
              <span key="l1">
                Gardens that <span className="italic font-[300] text-accent">belong</span>,
              </span>,
              <span key="l2">built by the people who design them.</span>,
            ]}
            className="mt-8 font-display leading-[1.02] tracking-[-0.03em] text-[clamp(2.4rem,6.2vw,4.6rem)]"
            stagger={90}
          />

          <Reveal delay={220} className="mt-10 max-w-4xl">
            <p className="text-base leading-relaxed tracking-[-0.01em] text-muted-foreground">
              A small, in-house studio of designers, carpenters and landscapers building across
              Sydney&rsquo;s harbour and the NSW South Coast for seventeen years, and still
              answering the phone ourselves.
            </p>
          </Reveal>
        </div>
      </section>

      {/* STORY — type-led, centred column. A masthead, then four numbered
          chapters in one calm rhythm (kicker · paragraph) over a giant ghosted
          chapter numeral, on a warm atmosphere wash so the wide side gutters
          read intentional, not empty. No imagery, nothing scattered. */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "radial-gradient(58% 44% at 12% 16%, oklch(0.65 0.118 62 / 0.06), transparent 68%), radial-gradient(52% 46% at 88% 84%, oklch(0.65 0.118 62 / 0.05), transparent 70%)",
        }}
      >
        <div className="mx-auto max-w-[1180px] px-6 pt-24 text-center md:px-12 md:pt-36">
          <p className="eyebrow text-muted-foreground">Our story</p>
          <SplitText
            as="h2"
            className="mx-auto mt-6 block max-w-3xl font-display font-semibold leading-[1.0] tracking-[-0.045em] text-[clamp(2.4rem,5.6vw,4rem)]"
            stagger={12}
          >
            From first sketch to
          </SplitText>
          <SplitText
            as="span"
            delay={120}
            className="mx-auto block max-w-3xl font-display font-semibold italic leading-[1.0] tracking-[-0.045em] text-[clamp(2.4rem,5.6vw,4rem)]"
          >
            finished garden.
          </SplitText>
          <p className="eyebrow mt-6 tabular-nums text-muted-foreground/50">
            2012 &ndash; {new Date().getFullYear()}
          </p>

          <div className="mx-auto mt-14 max-w-4xl md:mt-20">
            {storyBeats.map((beat, i) => (
              <Reveal
                key={beat.index}
                delay={i * 70}
                className="relative border-t border-border py-14 first:border-t-0 first:pt-0 md:py-20"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none font-display font-medium leading-none tabular-nums tracking-tight text-accent/[0.07] text-[34vw] md:text-[18rem]"
                >
                  {beat.index}
                </span>
                <div className="relative">
                  <StoryChapter
                    index={beat.index}
                    kicker={beat.kicker}
                    text={beat.text}
                    img={beat.img}
                    side={i % 2 === 0 ? "left" : "right"}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES — formedgardens-style: a centred intro above an equal-weight
          three-column icon grid. No cards, no borders, no imagery. */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-12 md:py-28">
          <div className="mx-auto max-w-xl text-center">
            <p className="eyebrow text-muted-foreground">Sustainability</p>
            <h2 className="mt-4 font-display font-light leading-[1.06] tracking-[-0.03em] text-[clamp(2rem,4.4vw,3.2rem)]">
              Our values.
            </h2>
          </div>

          <div className="mt-16 md:mt-20">
            <ValueReveal items={valueItems} />
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
              <SplitText
                as="h2"
                className="mt-5 font-display text-4xl leading-[0.98] tracking-[-0.02em] md:text-6xl"
              >
                Our journey, told briefly.
              </SplitText>
            </div>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            {timeline.map((item, i) => (
              <Reveal key={item.year} delay={i * 60}>
                <div className="grid grid-cols-[auto_1fr] gap-6 border-t border-border py-7 first:border-t-0 first:pt-0 md:gap-12 md:py-9">
                  <span className="font-display text-2xl tracking-[-0.02em] text-muted-foreground/70 md:text-3xl">
                    {item.year}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl leading-[1.04] tracking-[-0.02em] md:text-3xl">
                      {item.t}
                    </h3>
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
            <p className="eyebrow opacity-70 md:col-span-3 md:pt-2">In Michael&rsquo;s words</p>
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
              <footer className="eyebrow mt-7 opacity-70">Michael, Co-Founder</footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* THE CREW — pinned like snapshots on the workshop corkboard */}
      <section className="pt-16 md:pt-24">
        <div className="mx-auto mb-4 px-6 text-center md:mb-2 md:px-12">
          <p className="eyebrow text-muted-foreground">The crew</p>
          <SplitText
            as="h2"
            className="mt-3 font-display text-4xl leading-[0.94] tracking-[-0.02em] md:text-6xl"
          >
            The hands on it.
          </SplitText>
        </div>
        <div className="crew-board mx-auto grid max-w-[1400px] grid-cols-1 items-start justify-center gap-x-10 gap-y-16 px-6 pb-10 pt-16 sm:grid-cols-2 md:grid-cols-3 md:gap-x-14 md:gap-y-24 md:px-12 md:pb-16 md:pt-24">
          {crew.map((person, i) => {
            const layout = CREW_LAYOUT[i % CREW_LAYOUT.length];
            return (
              <Reveal key={person.name} delay={i * 80} className="mx-auto w-[90%]">
                <div
                  className="crew-card group relative flex flex-col bg-card p-3 pb-5 md:p-4 md:pb-6"
                  style={{ transform: `rotate(${layout.rotate}deg) translateY(${layout.lift}px)` }}
                >
                  <span aria-hidden className="crew-tape" />
                  {/* ponytail: no crew photography yet — placeholder initial card; swap for a real portrait via an `img` field on `crew` when photos land */}
                  <div className="img-zoom flex aspect-square w-full items-center justify-center overflow-hidden bg-muted transition-colors duration-500 ease-out md:group-hover:bg-accent/10">
                    <span className="font-display text-[5rem] font-light leading-none tracking-[-0.02em] text-muted-foreground/40 md:text-[6.5rem]">
                      {person.name[0]}
                    </span>
                  </div>
                  <div className="mt-4 flex items-baseline justify-between px-1 md:mt-5">
                    <div>
                      <h3 className="font-display text-xl tracking-[-0.02em] md:text-2xl">
                        {person.name}
                      </h3>
                      <p className="eyebrow mt-1.5 text-muted-foreground">{person.role}</p>
                    </div>
                    <span className="eyebrow text-muted-foreground/50">0{i + 1}</span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
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
                {brand.address.line1}, {brand.address.line2}. Site visits by appointment: tell us
                about the place and we&rsquo;ll walk it with you.
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
