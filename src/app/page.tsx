import Link from "next/link";
import { MagneticLink } from "@/components/MagneticLink";
import { MaskHeading } from "@/components/MaskHeading";
import { ParallaxImage } from "@/components/ParallaxImage";
import { ProjectTile } from "@/components/ProjectTile";
import { GetInTouch } from "@/components/GetInTouch";
import { Reveal } from "@/components/Reveal";
import { SplitText } from "@/components/SplitText";
import { WhatWeDo } from "@/components/WhatWeDo";
import { brand } from "@/lib/brand";
import { posts } from "@/lib/journal";
import { projects } from "@/lib/projects";

const [feature, ...secondary] = projects.slice(0, 4);
const journalPosts = posts.slice(0, 3);

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[100dvh] w-full overflow-hidden">
        <video
          src="/videos/hero-garden.mp4"
          poster="/images/hero-garden-poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          aria-label="A terraced garden of clipped hedges, stone steps and timber structures"
          className="absolute inset-0 h-full w-full scale-105 object-cover"
        />
        <div className="hero-veil absolute inset-0" />
        <div
          className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1600px] flex-col justify-between px-6 pb-14 pt-32 md:px-12 md:pb-20"
          style={{ color: "var(--surface-deep-foreground)" }}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="eyebrow opacity-80">{brand.tagline}</p>
            <p className="eyebrow opacity-70">Design &amp; build · est. 2009</p>
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
                An independent Sydney studio designing and building gardens, pools and
                bespoke timber structures across Sydney and the NSW South Coast.
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

      {/* WHAT WE DO — interactive showcase */}
      <WhatWeDo />

      {/* FEATURED PROJECTS */}
      <section className="mx-auto max-w-[1600px] px-6 py-20 md:px-12 md:py-28">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-muted-foreground">Selected · 0{secondary.length + 1}</p>
            <SplitText as="h2" className="mt-4 font-display text-5xl leading-[0.92] md:text-7xl">
              Featured projects.
            </SplitText>
          </div>
          <MagneticLink
            href="/projects"
            className="eyebrow inline-flex items-center gap-2 border-b border-foreground pb-1"
          >
            All projects <span aria-hidden>→</span>
          </MagneticLink>
        </div>

        <div className="grid gap-4 md:grid-cols-12 md:items-stretch md:gap-5">
          {/* Big feature — shrunk, fills column height so top/bottom align */}
          <Reveal className="flex md:col-span-5">
            <FeatureCard
              href={`/projects/${feature.slug}`}
              src={feature.cover}
              title={feature.title}
              tag={feature.tag}
              location={feature.location}
              index={feature.index}
              fill
              big
            />
          </Reveal>

          {/* Right cluster — enlarged: two on top + one wide */}
          <div className="flex flex-col gap-4 md:col-span-7 md:gap-5">
            <div className="grid grid-cols-2 gap-4 md:gap-5">
              {secondary.slice(0, 2).map((p, i) => (
                <Reveal key={p.slug} delay={80 + i * 80}>
                  <FeatureCard
                    href={`/projects/${p.slug}`}
                    src={p.cover}
                    title={p.title}
                    tag={p.tag}
                    location={p.location}
                    index={p.index}
                    aspect="aspect-[4/5] md:aspect-square"
                  />
                </Reveal>
              ))}
            </div>
            {secondary[2] && (
              <Reveal delay={240}>
                <FeatureCard
                  href={`/projects/${secondary[2].slug}`}
                  src={secondary[2].cover}
                  title={secondary[2].title}
                  tag={secondary[2].tag}
                  location={secondary[2].location}
                  index={secondary[2].index}
                  aspect="aspect-[16/10]"
                />
              </Reveal>
            )}
          </div>
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

      {/* WORKSHOP — minimal, offset landscape + carpentry */}
      <section className="mx-auto max-w-[1600px] px-6 py-20 md:px-12 md:py-32">
        <div className="grid items-center gap-14 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-4">
            <p className="eyebrow text-muted-foreground">The workshop</p>
            <h2 className="mt-6 font-display text-4xl leading-[1.02] md:text-5xl">
              Designed and
              <br />
              <em className="font-[300]">built in-house.</em>
            </h2>
            <p className="mt-6 max-w-[34ch] leading-relaxed text-muted-foreground">
              One team — designers, carpenters and landscapers — from first sketch to
              final planting.
            </p>
            <MagneticLink
              href="/services"
              className="mt-8 inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm"
            >
              What we do <span aria-hidden>→</span>
            </MagneticLink>
          </Reveal>

          <div className="relative md:col-span-7 md:col-start-6">
            <Reveal className="img-zoom ml-auto aspect-[5/4] w-full md:w-[86%]">
              <ParallaxImage
                src="/images/project-1.jpg"
                alt="Timber-clad garden room set among native planting"
                className="h-full w-full"
                imgClassName="h-full w-full object-cover"
                strength={70}
              />
            </Reveal>
            <Reveal
              delay={180}
              className="img-zoom relative mt-4 aspect-[4/5] w-[62%] border-[6px] border-background shadow-[0_24px_50px_-20px_rgba(0,0,0,0.35)] md:absolute md:-bottom-12 md:left-0 md:mt-0 md:w-[38%]"
            >
              <ParallaxImage
                src="/images/studio.jpg"
                alt="Carpenter shaping a hardwood joint at the workbench"
                className="h-full w-full"
                imgClassName="h-full w-full object-cover"
                strength={50}
              />
            </Reveal>
          </div>
        </div>
      </section>

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

function FeatureCard({
  href,
  src,
  title,
  tag,
  location,
  index,
  aspect = "aspect-[4/5]",
  big = false,
  fill = false,
}: {
  href: string;
  src: string;
  title: string;
  tag: string;
  location: string;
  index: string;
  aspect?: string;
  big?: boolean;
  fill?: boolean;
}) {
  return (
    <div className={`feat-card group flex w-full flex-col ${fill ? "md:h-full" : ""}`}>
      <ProjectTile
        href={href}
        src={src}
        alt={title}
        className={fill ? "aspect-[4/5] md:aspect-auto md:min-h-0 md:flex-1" : aspect}
        imgClassName="h-full w-full object-cover"
      />
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className={`font-display leading-tight ${big ? "text-2xl md:text-3xl" : "text-lg md:text-xl"}`}>
            {title}
          </h3>
          <p className="eyebrow mt-1.5 text-muted-foreground">{tag} · {location}</p>
        </div>
        <span className="eyebrow shrink-0 text-muted-foreground">{index}</span>
      </div>
    </div>
  );
}
