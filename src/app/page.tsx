import Link from "next/link";
import { Reveal } from "@/components/Reveal";

const projects = [
  { img: "/images/project-1.jpg", title: "Mosman Deck", tag: "Carpentry & Decking", to: "/projects" },
  { img: "/images/project-2.jpg", title: "Bundeena Steps", tag: "Coastal Garden", to: "/projects" },
  { img: "/images/project-3.jpg", title: "Fairlight Pergola", tag: "Bespoke Timberwork", to: "/projects" },
  { img: "/images/project-4.jpg", title: "Bowral Pool", tag: "Pool & Landscape", to: "/projects" },
];

const journalPosts = [
  { date: "Apr 27, 2026", title: "Choosing Hardwoods for the Coast", img: "/images/project-1.jpg" },
  { date: "Feb 26, 2026", title: "A Field Guide to Native Grasses", img: "/images/project-2.jpg" },
  { date: "Nov 12, 2025", title: "Why We Build Pools in Timber", img: "/images/project-4.jpg" },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative h-[100svh] w-full overflow-hidden">
        <img
          src="/images/hero.jpg"
          alt="Contemporary landscaped garden with timber-clad pool and sandstone steps"
          className="absolute inset-0 h-full w-full object-cover"
          width={1600}
          height={1024}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40" />
        <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-between px-6 pb-10 pt-32 md:px-12 md:pb-16">
          <div className="text-[var(--surface-deep-foreground)]">
            <p className="eyebrow opacity-80">Carpentry &amp; landscape</p>
            <p className="eyebrow opacity-80">design and build</p>
          </div>

          <div className="text-[var(--surface-deep-foreground)]">
            <h1 className="word-rise font-display text-[18vw] leading-[0.85] tracking-tight md:text-[12vw]">
              <span style={{ animationDelay: "0.6s" }}>Gardens&nbsp;&nbsp;&nbsp;</span>
              <span style={{ animationDelay: "0.85s" }} className="italic">that</span>
              <br />
              <span style={{ animationDelay: "1.1s" }} className="pl-[20%] md:pl-[30%]">belong.</span>
            </h1>
            <div className="mt-10 grid gap-8 md:grid-cols-12">
              <p className="md:col-span-5 md:col-start-7 max-w-md text-base leading-relaxed opacity-90">
                Outdoor spaces that respond to architecture and nature —
                designed and crafted in timber, stone and living planting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="mx-auto max-w-[1600px] px-6 py-28 md:px-12 md:py-44">
        <div className="grid gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <p className="eyebrow text-muted-foreground">Who we are</p>
            <p className="mt-6 font-display text-3xl leading-tight">
              We design and build personalised outdoor spaces across Sydney
              and the NSW South Coast.
            </p>
            <Link
              href="/approach"
              className="mt-8 inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm"
            >
              The studio <span aria-hidden>→</span>
            </Link>
          </Reveal>
          <Reveal delay={150} className="md:col-span-7 md:col-start-6 space-y-6 text-lg leading-relaxed">
            <p>
              Fieldcraft is a small studio of designers and carpenters working
              to resolve gardens, pools and bespoke timberwork into the places
              they belong. We start with the site — its light, slope, soil and
              outlook — and let the solution emerge from there.
            </p>
            <p className="text-muted-foreground">
              Successful gardens combine functionality, aesthetics and
              sustainability. Ours stay structured but retain that sense of
              wildness that nature does best, and that we aspire to recreate.
            </p>
          </Reveal>
        </div>
      </section>

      {/* MARQUEE */}
      <Reveal>
        <div className="surface-deep py-10">
          <div className="marquee font-display text-5xl md:text-7xl">
            <div className="marquee-track">
              {Array.from({ length: 2 }).flatMap((_, i) =>
                ["Landscape", "·", "Carpentry", "·", "Pools", "·", "Decking", "·", "Pergolas", "·", "Stonework", "·"].map(
                  (w, j) => (
                    <span key={`${i}-${j}`} className="opacity-90">
                      {w}
                    </span>
                  ),
                ),
              )}
            </div>
          </div>
        </div>
      </Reveal>

      {/* FEATURED PROJECTS */}
      <section className="mx-auto max-w-[1600px] px-6 py-28 md:px-12 md:py-40">
        <Reveal className="flex items-end justify-between">
          <h2 className="font-display text-6xl leading-[0.9] md:text-[7rem]">
            Selected&nbsp;&nbsp;&nbsp;<em className="font-light">Work</em>
          </h2>
          <Link href="/projects" className="eyebrow hidden border-b border-foreground pb-1 md:inline-block">
            All projects →
          </Link>
        </Reveal>

        <div className="mt-16 grid gap-x-8 gap-y-20 md:grid-cols-12">
          {projects.map((p, i) => (
            <Reveal
              key={p.title}
              delay={i * 80}
              className={`group ${
                i % 2 === 0 ? "md:col-span-7" : "md:col-span-5 md:mt-32"
              }`}
            >
              <Link href={p.to} className="block img-zoom">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  width={1200}
                  height={1500}
                  className="aspect-[4/5] w-full object-cover"
                />
              </Link>
              <div className="mt-5 flex items-end justify-between">
                <div>
                  <h3 className="font-display text-2xl">{p.title}</h3>
                  <p className="eyebrow mt-1 text-muted-foreground">{p.tag}</p>
                </div>
                <span className="eyebrow text-muted-foreground">0{i + 1}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* STUDIO */}
      <section className="mx-auto max-w-[1600px] px-6 py-28 md:px-12 md:py-40">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-7 img-zoom">
            <img
              src="/images/studio.jpg"
              alt="Carpenter shaping a hardwood timber joint at the workbench"
              loading="lazy"
              width={1600}
              height={1100}
              className="aspect-[16/11] w-full object-cover"
            />
          </Reveal>
          <Reveal delay={150} className="md:col-span-4 md:col-start-9 flex flex-col justify-end">
            <p className="eyebrow text-muted-foreground">The Workshop</p>
            <h2 className="mt-4 font-display text-5xl leading-[0.95] md:text-6xl">
              Designed and<br /><em className="font-light">built in-house.</em>
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Our designers work alongside our carpenters and landscape team
              from first sketch to final planting. Detailing happens in the
              workshop, on the site, and in close conversation with you.
            </p>
            <Link
              href="/approach"
              className="mt-8 inline-flex items-center gap-2 self-start border-b border-foreground pb-1 text-sm"
            >
              How we work <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* JOURNAL */}
      <section className="mx-auto max-w-[1600px] px-6 pb-32 md:px-12">
        <Reveal>
          <h2 className="max-w-4xl font-display text-4xl leading-tight md:text-6xl">
            Notes from the workshop and the field — on plants, timber and the
            slow craft of building outdoors.
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {journalPosts.map((post, i) => (
            <Reveal key={post.title} delay={i * 80} className="img-zoom">
              <Link href="/journal">
                <img
                  src={post.img}
                  alt={post.title}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover"
                />
                <p className="eyebrow mt-4 text-muted-foreground">{post.date}</p>
                <h3 className="mt-2 font-display text-2xl leading-snug">{post.title}</h3>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
