import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MagneticLink } from "@/components/MagneticLink";
import { MaskHeading } from "@/components/MaskHeading";
import { ParallaxImage } from "@/components/ParallaxImage";
import { PinnedHero } from "@/components/PinnedHero";
import { Reveal } from "@/components/Reveal";
import { SplitText } from "@/components/SplitText";
import { getNextProject, getProject, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} — ${project.tag}`,
    description: project.intro,
    openGraph: {
      title: project.title,
      description: project.intro,
      images: [project.cover],
    },
  };
}

const aspectMap = {
  tall: "aspect-[4/5]",
  wide: "aspect-[16/10]",
  square: "aspect-square",
} as const;

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = getNextProject(slug);

  return (
    <>
      <PinnedHero image={project.cover} alt={project.title}>
        <div className="grid items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="eyebrow opacity-80">{project.tag} · {project.year}</p>
            <SplitText
              as="h1"
              className="mt-4 font-display text-6xl leading-[0.9] md:text-[9rem]"
              stagger={26}
            >
              {project.title}
            </SplitText>
          </div>
          <div className="md:col-span-3 md:col-start-10 self-end">
            <p className="eyebrow opacity-80">Location</p>
            <p className="mt-2 font-display text-xl">{project.location}</p>
          </div>
        </div>
      </PinnedHero>

      {/* INTRO + DETAILS */}
      <section className="mx-auto max-w-[1600px] px-6 py-28 md:px-12 md:py-40">
        <div className="grid gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <p className="eyebrow text-muted-foreground">{project.index} · Project</p>
            <dl className="mt-10 space-y-6 text-sm">
              <div>
                <dt className="eyebrow text-muted-foreground">Year</dt>
                <dd className="mt-2 font-display text-2xl">{project.year}</dd>
              </div>
              <div>
                <dt className="eyebrow text-muted-foreground">Location</dt>
                <dd className="mt-2 font-display text-2xl">{project.location}</dd>
              </div>
              <div>
                <dt className="eyebrow text-muted-foreground">Services</dt>
                <dd className="mt-2 space-y-1">
                  {project.services.map((s) => (
                    <div key={s} className="font-display text-2xl leading-tight">{s}</div>
                  ))}
                </dd>
              </div>
            </dl>
          </Reveal>
          <div className="md:col-span-7 md:col-start-6 space-y-10">
            <MaskHeading
              as="p"
              lines={project.intro.split(/(?<=\.)\s+/)}
              className="font-display text-3xl leading-tight md:text-4xl"
              stagger={120}
            />
            <div className="space-y-8 text-lg leading-relaxed text-muted-foreground">
              {project.body.map((b, i) => (
                <Reveal key={i} delay={i * 100}>
                  {b.heading && (
                    <p className="eyebrow mb-3 text-foreground">{b.heading}</p>
                  )}
                  <p>{b.paragraph}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY — mixed layouts */}
      <section className="mx-auto max-w-[1600px] px-6 pb-32 md:px-12">
        <div className="grid gap-8 md:grid-cols-12">
          {project.gallery.map((img, i) => {
            const span = img.full
              ? "md:col-span-12"
              : img.aspect === "tall"
                ? "md:col-span-6"
                : img.aspect === "wide"
                  ? "md:col-span-8"
                  : "md:col-span-4";
            const offset = i % 3 === 1 ? "md:mt-24" : i % 3 === 2 ? "md:mt-12" : "";
            return (
              <Reveal key={i} delay={(i % 3) * 100} className={`${span} ${offset}`}>
                <div className={`img-zoom ${aspectMap[img.aspect]}`}>
                  <ParallaxImage src={img.src} alt={img.alt} strength={60} zoomFrom={1.06} />
                </div>
                <p className="eyebrow mt-3 text-muted-foreground">{img.alt}</p>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* NEXT PROJECT */}
      <section className="relative overflow-hidden">
        <Link href={`/projects/${next.slug}`} className="group block">
          <div className="parallax-stage relative h-[80vh]">
            <img
              src={next.cover}
              alt={next.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/50 transition-opacity duration-700 group-hover:bg-black/35" />
            <div
              className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-between px-6 py-16 md:px-12 md:py-20"
              style={{ color: "var(--surface-deep-foreground)" }}
            >
              <p className="eyebrow opacity-80">Next project — {next.index}</p>
              <div>
                <p className="eyebrow opacity-80">{next.tag}</p>
                <h2 className="mt-4 font-display text-6xl leading-[0.9] md:text-[8rem]">
                  {next.title}
                </h2>
                <div className="mt-6 inline-flex items-center gap-3 border-b border-current pb-1 text-sm transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
                  Open <span aria-hidden>→</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* BACK TO INDEX */}
      <section className="mx-auto max-w-[1600px] px-6 py-20 md:px-12">
        <MagneticLink href="/projects" className="eyebrow inline-flex items-center gap-3">
          <span aria-hidden>←</span> All projects
        </MagneticLink>
      </section>
    </>
  );
}
