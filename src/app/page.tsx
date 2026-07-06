import Link from "next/link";
import { MagneticLink } from "@/components/MagneticLink";
import { MaskHeading } from "@/components/MaskHeading";
import { ProjectTile } from "@/components/ProjectTile";
import { GetInTouch } from "@/components/GetInTouch";
import { Reveal } from "@/components/Reveal";
import { SplitText } from "@/components/SplitText";
import { WhatWeDo } from "@/components/WhatWeDo";
import { WorkshopProcess } from "@/components/WorkshopProcess";
import { brand } from "@/lib/brand";
import { posts } from "@/lib/journal";
import { projects } from "@/lib/projects";

const featured = projects.slice(0, 4);
const journalPosts = posts.slice(0, 3);

// Mixed-aspect, asymmetric rhythm for the Recent work grid. Feature tiles run
// wide; the middle tile is taller and drops to break the baseline.
const workLayout = [
  { col: "md:col-span-7", aspect: "aspect-[3/2]" },
  { col: "md:col-span-5 md:mt-28", aspect: "aspect-[4/5]" },
  { col: "md:col-span-7", aspect: "aspect-[4/3]" },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[100dvh] w-full overflow-hidden">
        <video
          src="https://xhhvokcsehxhjxabtvvw.supabase.co/storage/v1/object/public/dolobuck/17224715-uhd_3840_2160_30fps.mp4"
          poster="/images/earlwood-2.webp"
          autoPlay
          loop
          muted
          playsInline
          aria-label="A modern timber-clad home rising behind landscaped greenery at golden hour"
          className="absolute inset-0 h-full w-full scale-105 object-cover"
        />
        <div className="hero-veil absolute inset-0" />
        <div
          className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1600px] flex-col justify-between px-6 pb-14 pt-32 md:px-12 md:pb-20"
          style={{ color: "var(--surface-deep-foreground)" }}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="eyebrow opacity-80">{brand.tagline}</p>
            <p className="eyebrow opacity-70">Design &amp; build · 30+ years experience</p>
          </div>

          <div>
            <h1 className="hero-headline word-rise font-display text-[17vw] leading-[0.86] tracking-[-0.02em] md:text-[11.5vw]">
              <span style={{ animationDelay: "1.9s" }}>Gardens</span>{" "}
              <span style={{ animationDelay: "2.15s" }} className="italic font-[300]">that</span>
              <br />
              <span style={{ animationDelay: "2.4s" }} className="pl-[14%] md:pl-[24%]">belong.</span>
            </h1>
            <div className="mt-10 grid items-end gap-8 md:grid-cols-12">
              <p className="max-w-md text-base leading-relaxed opacity-90 md:col-span-5 md:col-start-7">
                Sydney-based construction company delivering high-quality carpentry,
                landscaping, and outdoor construction services across residential and commercial projects.
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

      {/* INTRO */}
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
              className="font-display text-3xl leading-tight md:text-4xl"
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

      {/* WHAT WE DO — interactive showcase */}
      <WhatWeDo />

      {/* FEATURED PROJECTS */}
      <section className="mx-auto max-w-[1600px] px-6 py-24 md:px-12 md:py-32">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="eyebrow text-muted-foreground">
              <span className="text-accent">Selected</span> · 0{featured.length}
            </p>
            <SplitText
              as="h2"
              className="mt-5 font-display text-[16vw] leading-[0.86] tracking-[-0.02em] sm:text-7xl md:text-[7.5rem]"
            >
              Recent work.
            </SplitText>
          </div>
          <Reveal delay={200} className="md:col-span-4 md:pb-4">
            <p className="max-w-xs leading-relaxed text-muted-foreground">
              A close selection of recent carpentry and landscape builds across Sydney,
              designed and built end to end by one crew.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-x-8 gap-y-14 md:mt-24 md:grid-cols-12 md:gap-y-10">
          {featured.map((p, i) => {
            const cfg = workLayout[i] ?? workLayout[0];
            return (
              <Reveal key={p.slug} delay={i * 90} className={`group ${cfg.col}`}>
                <div className="flex items-baseline justify-between border-t border-border pb-4 pt-3">
                  <span className="eyebrow font-display tabular-nums text-foreground">
                    {p.index}
                  </span>
                  <span className="eyebrow text-muted-foreground">{p.year}</span>
                </div>
                <ProjectTile
                  href={`/projects/${p.slug}`}
                  src={p.cover}
                  alt={p.title}
                  imgClassName={`${cfg.aspect} w-full object-cover`}
                  width={1200}
                  height={1500}
                />
                <div className="mt-5 flex items-start justify-between gap-4">
                  <Link
                    href={`/projects/${p.slug}`}
                    className="arrow-link inline-flex items-baseline gap-2.5"
                  >
                    <h3 className="font-display text-2xl md:text-[1.85rem]">{p.title}</h3>
                    <span aria-hidden className="text-accent">→</span>
                  </Link>
                  <span className="eyebrow shrink-0 pt-1.5 text-muted-foreground">
                    {p.location.split(",")[0]}
                  </span>
                </div>
                <p className="eyebrow mt-2 text-muted-foreground">{p.tag}</p>
              </Reveal>
            );
          })}

          {/* Closing note + CTA — fills the space beside the last project */}
          <Reveal
            delay={120}
            className="mt-2 flex flex-col justify-end md:col-span-4 md:col-start-9 md:mt-0 md:pb-3"
          >
            <span aria-hidden className="mb-7 hidden h-px w-14 bg-foreground/25 md:block" />
            <p className="max-w-xs leading-relaxed text-muted-foreground">
              More decking, cladding, stairs and gardens in the full archive.
            </p>
            <MagneticLink
              href="/projects"
              className="arrow-link mt-6 inline-flex items-center gap-3 font-display text-3xl md:text-4xl"
            >
              All projects <span aria-hidden className="text-accent">→</span>
            </MagneticLink>
          </Reveal>
        </div>
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

      {/* JOURNAL */}
      <section className="mx-auto max-w-[1600px] px-6 pb-24 md:px-12">
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

      {/* GET IN TOUCH */}
      <GetInTouch />
    </>
  );
}
