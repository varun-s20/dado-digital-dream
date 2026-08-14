import Link from "next/link";
import { CtaOutro } from "@/components/CtaOutro";
import { MagneticLink } from "@/components/MagneticLink";
import { Reveal } from "@/components/Reveal";
import { SplitText } from "@/components/SplitText";
import { WhatWeDo } from "@/components/WhatWeDo";
import { WorkshopProcess } from "@/components/WorkshopProcess";
import { brand } from "@/lib/brand";
import { getProject, projectSlug, type GallerySize } from "@/lib/gallery";

// Recent work: the original ten-tile bento mosaic, but every tile is one of
// the four real projects — a different photo each, all captioned and linked
// back to Earlwood / Campsie / Paddington / Avalon Beach.
//
// The size sequence tiles a perfect rectangle with zero gaps on both the
// 2-col and 4-col grids (verified by hand — do not reorder without
// re-checking the packing).
const WORK_SIZES: GallerySize[] = [
  "sm", "tall", "lg", "wide", "tall", "sm", "tall", "lg", "lg", "wide",
];
const WORK_TILES: { slug: string; img: string; pos?: string }[] = [
  { slug: "earlwood", img: "/images/earlwood-vid-framing-detail-square.webp" },
  { slug: "campsie", img: "/images/campsie-2.webp" },
  // ponytail: Paddington photos are placeholders — swap once the real shoot lands
  { slug: "paddington", img: "/images/from-live-site/live-site-4-hero.webp" },
  { slug: "avalon-beach", img: "/images/avalon-2.webp", pos: "center 60%" },
  { slug: "earlwood", img: "/images/earlwood-planting-tall.webp" },
  { slug: "campsie", img: "/images/campsie-1.webp" },
  { slug: "avalon-beach", img: "/images/avalon-1.webp" },
  { slug: "earlwood", img: "/images/earlwood-home-cover.webp" },
  { slug: "campsie", img: "/images/campsie-4.webp" },
  { slug: "paddington", img: "/images/from-live-site/live-site-16-cara-deck.webp" },
];
const work = WORK_TILES.map((tile) => ({ ...tile, project: getProject(tile.slug)! }));
// Counts projects, not tiles — several tiles share a project.
const workCount = new Set(WORK_TILES.map((t) => t.slug)).size;
const SPAN: Record<GallerySize, string> = {
  sm: "col-span-1 row-span-1",
  wide: "col-span-2 row-span-1",
  tall: "col-span-1 row-span-2",
  lg: "col-span-2 row-span-2",
};

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[100dvh] w-full overflow-hidden">
        <video
          src="/videos/home-hero.mp4"
          poster="/images/home-hero-poster.webp"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-label="A slow glide across a landscaped backyard — lawn and garden beds, stone walls, a pool and paved terrace"
          className="absolute inset-0 h-full w-full scale-105 object-cover"
        />
        <div className="hero-veil absolute inset-0" />
        <div
          className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1600px] flex-col justify-between px-6 pb-14 pt-32 md:px-12 md:pb-20"
          style={{ color: "var(--surface-deep-foreground)" }}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="eyebrow opacity-80">{brand.tagline}</p>
            <p className="eyebrow opacity-70">Delivering unique designs</p>
          </div>

          <div>
            <h1 className="hero-headline word-rise font-display text-[17vw] leading-[0.86] tracking-[-0.02em] md:text-[11.5vw]">
              <span style={{ animationDelay: "1.9s" }}>Dream.</span>{" "}
              <span style={{ animationDelay: "2.15s" }} className="italic font-[300]">Design.</span>
              <br />
              <span style={{ animationDelay: "2.4s" }} className="pl-[14%] md:pl-[24%]">Deliver.</span>
            </h1>
            <div className="mt-10 grid items-end gap-8 md:grid-cols-12">
              <p className="max-w-md text-base leading-relaxed opacity-90 md:col-span-5 md:col-start-7">
                Sydney-based landscape company focused on delivering high-quality carpentry
                and landscaping services across residential and commercial projects.
              </p>
              <MagneticLink
                href="/projects"
                className="eyebrow inline-flex items-center gap-2 self-end border-b border-current pb-1 md:col-span-3 md:col-start-10"
              >
                Selected work <span aria-hidden>→</span>
              </MagneticLink>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO — no direct "Studio" offering; disabled 2026-08, keep for later.
      <section className="mx-auto max-w-[1600px] px-6 py-20 md:px-12 md:py-28">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <p className="eyebrow text-muted-foreground">Studio</p>
            <p className="mt-6 font-display text-3xl leading-tight">
              Design and build, in-house, from a single workshop in Mosman.
            </p>
            <MagneticLink
              href="/services"
              className="mt-8 inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm"
            >
              What we do <span aria-hidden>→</span>
            </MagneticLink>
          </Reveal>
          <div className="space-y-6 text-lg leading-relaxed md:col-span-7 md:col-start-6">
            <MaskHeading
              as="p"
              lines={[
                "We specialise in structural and finish",
                "carpentry, decking, cladding, retaining walls,",
                "paving, concreting, and hardscapes & softscapes",
                "with a strong focus on craftsmanship.",
              ]}
              className="font-display text-[clamp(1.6rem,6.2vw,1.875rem)] leading-tight md:text-4xl"
            />
            <Reveal delay={300}>
              <p className="text-muted-foreground">
                Our vision is to bring landscaping and carpentry together through one seamless service.
                Rather than managing multiple contractors, clients can rely on us to handle every aspect
                from start to finish. By combining these services, we create a smoother, more efficient process
                that saves our clients valuable time, reduces unnecessary costs, and ensures greater consistency.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
      */}

      {/* WHAT WE DO — interactive showcase */}
      <WhatWeDo />

      {/* RECENT WORK — Earlwood, Campsie, Paddington, Avalon */}
      <section className="mx-auto max-w-[1600px] px-6 py-24 md:px-12 md:py-32">
        <div>
          <p className="eyebrow text-muted-foreground">
            <span className="text-accent">Selected</span> · {workCount}
          </p>
          <SplitText
            as="h2"
            className="mt-5 font-display text-[16vw] leading-[0.86] tracking-[-0.02em] sm:text-7xl md:text-[7.5rem]"
          >
            Recent work.
          </SplitText>
        </div>

        <div className="mt-10 grid auto-rows-[8.5rem] grid-flow-dense grid-cols-2 gap-1.5 sm:auto-rows-[10rem] md:mt-16 md:auto-rows-[11rem] md:grid-cols-4 md:gap-2">
          {work.map(({ project, img, pos }, i) => (
            <Link
              key={`${project.id}-${i}`}
              href={`/projects/${projectSlug(project)}`}
              aria-label={`${project.title}, ${project.location}`}
              style={{ ["--d" as string]: `${Math.min(i, 12) * 45}ms` }}
              className={`gallery-tile gallery-enter group relative block overflow-hidden bg-muted ${SPAN[WORK_SIZES[i]]}`}
            >
              <img
                src={img}
                alt={project.title}
                loading={i < 4 ? "eager" : "lazy"}
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                style={{ objectPosition: pos }}
              />
              <div className="gallery-scrim pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div
                className="gallery-cap pointer-events-none absolute inset-x-0 bottom-0 p-3 md:p-4"
                style={{ color: "var(--surface-deep-foreground)" }}
              >
                <h3 className="font-display text-base font-[400] leading-[1.05] tracking-[-0.025em] md:text-lg">
                  {project.title}
                </h3>
                <p className="eyebrow mt-1 truncate opacity-80">{project.location}</p>
              </div>
            </Link>
          ))}
        </div>

        <Reveal delay={120} className="mt-12 flex justify-end border-t border-border pt-8">
          <MagneticLink
            href="/projects"
            className="arrow-link inline-flex items-center gap-3 font-display text-3xl md:text-4xl"
          >
            All projects <span aria-hidden className="text-accent">→</span>
          </MagneticLink>
        </Reveal>
      </section>

      {/* WORKING ACROSS — quiet coverage band */}
      <section className="border-y border-border">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-5 px-6 py-9 md:flex-row md:items-center md:justify-between md:px-12 md:py-11">
          <p className="eyebrow shrink-0 text-muted-foreground">Working across</p>
          <ul className="flex flex-wrap items-center gap-x-3 gap-y-1 md:justify-end">
            {brand.coverage.map((region, i) => (
              <li key={region} className="flex items-center gap-x-3 font-display text-lg leading-tight md:text-xl">
                {region}
                {i < brand.coverage.length - 1 && (
                  <span aria-hidden className="text-muted-foreground/50">·</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WORKSHOP — pinned horizontal build-sequence filmstrip, in-house crew */}
      <WorkshopProcess />

      {/* JOURNAL — page disabled 2026-08, keep for later.
      <section className="mx-auto max-w-[1600px] px-6 pb-24 pt-24 md:px-12 md:pt-32">
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow text-muted-foreground">Journal</p>
              <h2 className="mt-4 font-display text-4xl leading-[0.98] md:text-6xl">
                Notes from the workshop.
              </h2>
            </div>
            <p className="max-w-sm leading-relaxed text-muted-foreground">
              On plants, timber and the slow craft of building outdoors.
            </p>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {journalPosts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 80} className="img-zoom">
              <Link href={`/journal/${post.slug}`} className="arrow-link block">
                <img
                  src={post.hero}
                  alt={post.title}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover"
                />
                <p className="eyebrow mt-4 text-muted-foreground">{post.tag} · {post.date}</p>
                <h3 className="mt-2 font-display text-2xl leading-snug">{post.title}</h3>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      */}

      {/* GET IN TOUCH — matches the Services/About outro */}
      <CtaOutro />
    </>
  );
}
