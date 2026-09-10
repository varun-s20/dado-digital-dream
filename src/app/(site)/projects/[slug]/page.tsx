import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MagneticLink } from "@/components/MagneticLink";
import { ProjectBanner } from "@/components/ProjectBanner";
import { Reveal } from "@/components/Reveal";
import { RevealImage } from "@/components/RevealImage";
import { SplitText } from "@/components/SplitText";
import { getProject, getProjects } from "@/lib/content";
import {
  getMoreProjects,
  projectDescription,
  projectFeature,
  projectImages,
  projectScope,
  projectSlug,
  projectYear,
} from "@/lib/gallery";

export const dynamicParams = true;

export async function generateStaticParams() {
  const items = await getProjects();
  return items.map((item) => ({ slug: projectSlug(item) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project not found" };
  // No authored summary: fall back to the plain facts rather than leaving the
  // meta description empty, which is what search results would show.
  const [intro] = projectDescription(project);
  const description =
    intro ?? `${project.title} — ${project.categories.join(", ")} in ${project.location}.`;
  return {
    title: project.title,
    description,
    openGraph: { title: project.title, description, images: [project.img] },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const description = projectDescription(project);
  const scope = projectScope(project);
  const year = projectYear(project);
  const feature = projectFeature(project);
  const shots = projectImages(project);
  const more = getMoreProjects(await getProjects(), slug, 3);

  return (
    <>
      {/* BANNER — full-bleed hero, consistent crop across every project */}
      <ProjectBanner
        src={project.img}
        alt={project.title}
        pos={project.pos}
        eyebrow={[project.categories[0], year, project.location]
          .filter(Boolean)
          .join(" · ")}
      />

      {/* INFO — editorial spread mirroring the reference: title + copy + details · feature image */}
      <section className="mx-auto max-w-[1400px] px-6 pb-24 pt-14 md:px-12 md:pb-32 md:pt-20">
        <MagneticLink
          href="/projects"
          className="inline-flex items-center gap-2 text-[0.72rem] font-medium uppercase tracking-[0.04em] text-muted-foreground"
        >
          <span aria-hidden>←</span> Projects
        </MagneticLink>

        <div className="mt-11 grid gap-x-16 gap-y-12 md:mt-16 md:grid-cols-2">
          {/* Left — information, tightly set */}
          <div className="flex flex-col">
            <SplitText
              as="h1"
              className="font-display text-[2.4rem] font-[500] leading-[1.02] tracking-[-0.035em] md:text-[3.4rem]"
              stagger={22}
            >
              {project.title}
            </SplitText>

            {description.length > 0 && (
              <div className="mt-7 max-w-[46ch] space-y-4 text-[0.95rem] leading-[1.6] tracking-[-0.006em] text-muted-foreground">
                {description.map((p, i) => (
                  <Reveal key={i} delay={i * 90}>
                    <p>{p}</p>
                  </Reveal>
                ))}
              </div>
            )}

            <dl className="mt-14 md:mt-20">
              <Detail label="Location" value={project.location} />
              {/* No authored year means no row — not a guess dressed as a fact. */}
              {year !== undefined && <Detail label="Completed" value={String(year)} />}
              <Detail label="Scope of work" value={scope} />
            </dl>
          </div>

          {/* Right — feature image at a fixed aspect, identical on every project.
              No feature photo chosen means an empty column, not a stand-in
              borrowed from another project. */}
          <div className="md:pt-1">
            {feature && (
              <RevealImage
                src={feature}
                alt={`${project.title} — feature`}
                loading="eager"
                className="aspect-[4/3] w-full bg-muted"
              />
            )}
          </div>
        </div>
      </section>

      {/* GALLERY — exactly the photos chosen in the admin, however many.
          Column masonry (the same device as /projects): equal column widths,
          each photo keeping its own height, so 1 and 24 both read as composed
          and a part-full last row is impossible. Omitted entirely when the
          project has no selected views. */}
      {shots.length > 0 && (
        <section className="mx-auto max-w-[1400px] px-6 pb-24 md:px-12 md:pb-32">
          <div className="mb-8 flex items-end justify-between gap-6 border-t border-border pt-8 md:mb-12 md:pt-10">
            <h2 className="font-display text-2xl leading-[0.98] tracking-[-0.035em] md:text-[2rem]">
              Selected views
            </h2>
            <span className="eyebrow text-muted-foreground">
              {String(shots.length).padStart(2, "0")} — {project.location}
            </span>
          </div>

          {/* A lone photo has no column rhythm to join, so it runs full width. */}
          {shots.length === 1 ? (
            <RevealImage
              src={shots[0]}
              alt={`${project.title} — view 1`}
              loading="eager"
              className="reveal-shot--flow w-full bg-muted"
            />
          ) : (
            <div className="columns-1 gap-3 sm:columns-2 md:gap-4 lg:columns-3">
              {shots.map((src, i) => (
                <RevealImage
                  key={`${src}-${i}`}
                  src={src}
                  alt={`${project.title} — view ${i + 1}`}
                  loading={i < 3 ? "eager" : "lazy"}
                  className="reveal-shot--flow mb-3 w-full break-inside-avoid bg-muted md:mb-4"
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* MORE PROJECTS */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-12 md:py-28">
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-display text-3xl font-[500] leading-[0.98] tracking-[-0.03em] md:text-5xl">
              More projects
            </h2>
            <MagneticLink
              href="/projects"
              className="eyebrow hidden items-center gap-2 border-b border-foreground pb-1 md:inline-flex"
            >
              View all <span aria-hidden>→</span>
            </MagneticLink>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3 md:mt-14 md:gap-5">
            {more.map((item) => (
              <Link
                key={item.id}
                href={`/projects/${projectSlug(item)}`}
                aria-label={`${item.title}, ${item.location}`}
                className="gallery-tile group relative block aspect-[4/5] w-full overflow-hidden bg-muted"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                  style={{ objectPosition: item.pos }}
                />
                <div className="gallery-scrim pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div
                  className="gallery-cap pointer-events-none absolute inset-x-0 bottom-0 p-4 md:p-5"
                  style={{ color: "var(--surface-deep-foreground)" }}
                >
                  <h3 className="font-display text-lg font-[500] leading-[1.05] tracking-[-0.02em] md:text-xl">
                    {item.title}
                  </h3>
                  <p className="eyebrow mt-1 truncate opacity-80">{item.location}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Detail({ label, value }: { label: string; value: string | string[] }) {
  return (
    <div className="grid grid-cols-[6rem_1fr] items-baseline gap-4 border-t border-border/80 py-4 sm:grid-cols-2 sm:gap-8">
      <dt className="text-[0.7rem] font-medium uppercase tracking-[0.04em] text-muted-foreground">
        {label}
      </dt>
      <dd className="text-[0.9rem] leading-snug tracking-[-0.01em]">
        {Array.isArray(value)
          ? value.map((v) => (
              <span key={v} className="block">
                {v}
              </span>
            ))
          : value}
      </dd>
    </div>
  );
}
