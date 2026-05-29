import Link from "next/link";
import { MagneticLink } from "@/components/MagneticLink";
import { MarqueeBand } from "@/components/MarqueeBand";
import { MaskHeading } from "@/components/MaskHeading";
import { ParallaxImage } from "@/components/ParallaxImage";
import { ProjectTile } from "@/components/ProjectTile";
import { Reveal } from "@/components/Reveal";
import { SplitText } from "@/components/SplitText";
import { brand } from "@/lib/brand";
import { posts } from "@/lib/journal";
import { projects } from "@/lib/projects";

const services = [
  {
    n: "01",
    title: "Landscape",
    body: "Site-led garden design from first sketch to mature planting — for harbour-front terraces, coastal slopes, courtyards and country properties.",
    img: "/images/project-2.jpg",
  },
  {
    n: "02",
    title: "Carpentry",
    body: "Decks, pergolas, screens, joinery and bespoke timber structures — designed for the elevation they sit against and built in-house in spotted gum, blackbutt and silvertop.",
    img: "/images/project-3.jpg",
  },
  {
    n: "03",
    title: "Pools",
    body: "Concrete pools detailed as still water — mineral-rendered, stone-coped, wrapped in carpentry that integrates with the surrounding garden.",
    img: "/images/project-4.jpg",
  },
  {
    n: "04",
    title: "Stone & build",
    body: "Sandstone steps, retaining, paving and dry-laid walls — set off datum, drained properly, planted dense enough to bind the slope within the first season.",
    img: "/images/project-1.jpg",
  },
];

const featured = projects.slice(0, 4);
const journalPosts = posts.slice(0, 3);

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[100dvh] w-full overflow-hidden">
        <ParallaxImage
          src="/images/hero.jpg"
          alt="Contemporary landscaped garden with timber-clad pool and sandstone steps"
          className="absolute inset-0 h-full w-full"
          imgClassName="h-full w-full object-cover"
          strength={150}
          zoomFrom={1.1}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/55" />
        <div
          className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1600px] flex-col justify-between px-6 pb-12 pt-32 md:px-12 md:pb-16"
          style={{ color: "var(--surface-deep-foreground)" }}
        >
          <div>
            <p className="eyebrow opacity-80">{brand.tagline}</p>
            <p className="eyebrow opacity-80">design and build · est. since 2009</p>
          </div>

          <div>
            <h1 className="word-rise font-display text-[18vw] leading-[0.85] tracking-tight md:text-[12vw]">
              <span style={{ animationDelay: "1.9s" }}>Gardens&nbsp;&nbsp;&nbsp;</span>
              <span style={{ animationDelay: "2.15s" }} className="italic">that</span>
              <br />
              <span style={{ animationDelay: "2.4s" }} className="pl-[20%] md:pl-[30%]">belong.</span>
            </h1>
            <div className="mt-10 grid items-end gap-8 md:grid-cols-12">
              <p className="md:col-span-5 md:col-start-7 max-w-md text-base leading-relaxed opacity-90">
                {brand.fullName.split(" ").slice(0, 2).join(" ")} — an independent studio designing and building gardens, pools and bespoke
                timber structures across Sydney and the NSW South Coast.
              </p>
              <MagneticLink
                href="/projects"
                className="eyebrow md:col-span-3 md:col-start-10 inline-flex items-center gap-2 self-end border-b border-current pb-1"
              >
                Selected work <span aria-hidden>→</span>
              </MagneticLink>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="mx-auto max-w-[1600px] px-6 py-28 md:px-12 md:py-44">
        <div className="grid gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <p className="eyebrow text-muted-foreground">Studio</p>
            <p className="mt-6 font-display text-3xl leading-tight">
              Design and build, in-house, from a single workshop in Mosman.
            </p>
            <MagneticLink
              href="/approach"
              className="mt-8 inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm"
            >
              How we work <span aria-hidden>→</span>
            </MagneticLink>
          </Reveal>
          <div className="md:col-span-7 md:col-start-6 space-y-6 text-lg leading-relaxed">
            <MaskHeading
              as="p"
              lines={[
                `${brand.fullName.split(" ").slice(0, 2).join(" ")} is a small studio of designers,`,
                "carpenters and stone-workers resolving",
                "gardens, pools and bespoke timberwork",
                "into the places they belong.",
              ]}
              className="font-display text-3xl leading-tight md:text-4xl"
            />
            <Reveal delay={300}>
              <p className="text-muted-foreground">
                We start with the site — its light, slope, soil and outlook — and let
                the solution emerge from there. Successful gardens combine
                functionality, aesthetics and sustainability. Ours stay structured but
                retain that sense of wildness that nature does best.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* KINETIC MARQUEE BAND */}
      <section className="surface-deep relative overflow-hidden py-8 md:py-10">
        <MarqueeBand
          words={["Landscape", "Carpentry", "Pools", "Decking", "Pergolas", "Stonework", "Planting", "Joinery"]}
          className="font-display text-[14vw] leading-none md:text-[9rem]"
        />
      </section>

      {/* SERVICES — zig-zag */}
      <section className="mx-auto max-w-[1600px] px-6 py-28 md:px-12 md:py-40">
        <div className="mb-20 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SplitText as="h2" className="max-w-3xl font-display text-5xl leading-[0.9] md:text-7xl">
            What we make.
          </SplitText>
          <p className="max-w-sm text-base leading-relaxed text-muted-foreground">
            Four practices, one workshop. Every project draws on more than one.
          </p>
        </div>
        <div className="space-y-28 md:space-y-44">
          {services.map((s, i) => (
            <article key={s.n} className={`service-row ${i % 2 === 1 ? "flip" : ""}`}>
              <Reveal className="img-zoom" delay={i * 60}>
                <ParallaxImage
                  src={s.img}
                  alt={s.title}
                  className={`${i % 2 === 1 ? "aspect-[4/5]" : "aspect-[5/4]"}`}
                  imgClassName="h-full w-full object-cover"
                  strength={70}
                  zoomFrom={1.05}
                />
              </Reveal>
              <div className={`flex flex-col gap-6 ${i % 2 === 1 ? "md:items-start" : "md:items-end md:text-right"}`}>
                <span className="eyebrow text-muted-foreground">{s.n}</span>
                <SplitText
                  as="h3"
                  className="font-display text-5xl leading-[0.95] md:text-7xl"
                  stagger={24}
                >
                  {s.title}
                </SplitText>
                <p className="max-w-md text-lg leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="relative">
        <div className="mx-auto flex max-w-[1600px] items-end justify-between px-6 pt-8 md:px-12">
          <div>
            <p className="eyebrow text-muted-foreground">Selected · {featured.length}</p>
            <SplitText as="h2" className="mt-4 font-display text-6xl leading-[0.9] md:text-[7rem]">
              Recent work.
            </SplitText>
          </div>
          <MagneticLink href="/projects" className="eyebrow hidden border-b border-foreground pb-1 md:inline-block">
            All projects <span aria-hidden>→</span>
          </MagneticLink>
        </div>

        <div className="mx-auto mt-16 grid max-w-[1600px] gap-x-8 gap-y-20 px-6 md:grid-cols-12 md:px-12">
          {featured.map((p, i) => (
            <Reveal
              key={p.slug}
              delay={i * 80}
              className={`group ${i % 2 === 0 ? "md:col-span-7" : "md:col-span-5 md:mt-32"}`}
            >
              <ProjectTile href={`/projects/${p.slug}`} src={p.cover} alt={p.title} width={1200} height={1500} />
              <div className="mt-5 flex items-end justify-between">
                <div>
                  <h3 className="font-display text-2xl md:text-3xl">{p.title}</h3>
                  <p className="eyebrow mt-1 text-muted-foreground">{p.tag} · {p.location}</p>
                </div>
                <span className="eyebrow text-muted-foreground">{p.index}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* COVERAGE MARQUEE (REVERSE) */}
      <section className="mt-32 border-y border-border py-10 md:py-14">
        <div className="mb-6 flex items-center justify-between px-6 md:px-12">
          <p className="eyebrow text-muted-foreground">Working across</p>
          <p className="eyebrow text-muted-foreground">{brand.coverage.length} regions</p>
        </div>
        <MarqueeBand
          words={brand.coverage}
          direction={-1}
          className="font-display text-[12vw] leading-none md:text-[8rem]"
          speed={36}
        />
      </section>

      {/* STUDIO */}
      <section className="mx-auto max-w-[1600px] px-6 py-28 md:px-12 md:py-40">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <div className="img-zoom aspect-[16/11]">
              <ParallaxImage
                src="/images/studio.jpg"
                alt="Carpenter shaping a hardwood timber joint at the workbench"
                className="h-full w-full"
                imgClassName="h-full w-full object-cover"
                strength={80}
              />
            </div>
          </Reveal>
          <Reveal delay={150} className="md:col-span-4 md:col-start-9 flex flex-col justify-end">
            <p className="eyebrow text-muted-foreground">The workshop</p>
            <MaskHeading
              as="h2"
              lines={["Designed and", <em key="i" className="font-light">built in-house.</em>]}
              className="mt-4 font-display text-5xl leading-[0.95] md:text-6xl"
            />
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Our designers work alongside our carpenters and landscape team
              from first sketch to final planting. Detailing happens in the
              workshop, on the site, and in close conversation with you.
            </p>
            <MagneticLink
              href="/approach"
              className="mt-8 inline-flex items-center gap-2 self-start border-b border-foreground pb-1 text-sm"
            >
              The studio <span aria-hidden>→</span>
            </MagneticLink>
          </Reveal>
        </div>
      </section>

      {/* JOURNAL */}
      <section className="mx-auto max-w-[1600px] px-6 pb-32 md:px-12">
        <Reveal>
          <SplitText as="h2" className="max-w-4xl font-display text-4xl leading-tight md:text-6xl">
            Notes from the workshop and the field — on plants, timber and the slow craft of building outdoors.
          </SplitText>
        </Reveal>
        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {journalPosts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 80} className="img-zoom">
              <Link href={`/journal/${post.slug}`} className="arrow-link block">
                <img
                  src={post.hero}
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
