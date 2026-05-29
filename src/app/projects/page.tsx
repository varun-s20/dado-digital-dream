import type { Metadata } from "next";
import Link from "next/link";
import { MaskHeading } from "@/components/MaskHeading";
import { ProjectTile } from "@/components/ProjectTile";
import { Reveal } from "@/components/Reveal";
import { SplitText } from "@/components/SplitText";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Recent gardens, pools and carpentry projects across Sydney and the NSW South Coast.",
  openGraph: {
    title: "Projects — BM.",
    description: "Selected landscape and carpentry work.",
  },
};

export default function ProjectsPage() {
  return (
    <>
      <section className="mx-auto max-w-[1600px] px-6 pb-20 pt-44 md:px-12 md:pb-32 md:pt-56">
        <p className="eyebrow text-muted-foreground">Projects · {projects.length} selected</p>
        <SplitText
          as="h1"
          className="mt-6 font-display text-6xl leading-[0.9] md:text-[10rem]"
          stagger={30}
        >
          Built into place.
        </SplitText>
        <div className="mt-16 grid gap-10 md:grid-cols-12">
          <MaskHeading
            as="p"
            lines={[
              "Each project is shaped by where it sits —",
              "its slope, its light, its weather, the way",
              "people will end up moving through it.",
            ]}
            className="md:col-span-6 md:col-start-7 font-display text-2xl leading-snug md:text-3xl"
            stagger={120}
          />
        </div>
      </section>

      {/* LIST — alternating zig-zag with big index numerals */}
      <section className="mx-auto max-w-[1600px] px-6 pb-32 md:px-12">
        <div className="space-y-32 md:space-y-44">
          {projects.map((p, i) => {
            const flip = i % 2 === 1;
            return (
              <article key={p.slug}>
                <Reveal>
                  <div className={`grid items-end gap-x-8 gap-y-6 md:grid-cols-12`}>
                    <div className={`${flip ? "md:order-2 md:col-span-7" : "md:col-span-7"}`}>
                      <ProjectTile
                        href={`/projects/${p.slug}`}
                        src={p.cover}
                        alt={p.title}
                        imgClassName={`${i % 3 === 0 ? "aspect-[4/5]" : i % 3 === 1 ? "aspect-[5/4]" : "aspect-[16/11]"} w-full object-cover`}
                      />
                    </div>
                    <div
                      className={`flex flex-col gap-4 ${
                        flip ? "md:order-1 md:col-span-4 md:col-start-1" : "md:col-span-4 md:col-start-9"
                      }`}
                    >
                      <div className="flex items-baseline justify-between gap-6">
                        <span className="font-display text-7xl leading-none text-muted-foreground/40 md:text-[7rem]">
                          {p.index}
                        </span>
                        <span className="eyebrow text-muted-foreground">{p.year}</span>
                      </div>
                      <Link href={`/projects/${p.slug}`} className="arrow-link mt-6 block">
                        <h2 className="font-display text-4xl leading-tight md:text-5xl">{p.title}</h2>
                        <p className="eyebrow mt-2 text-muted-foreground">{p.tag} · {p.location}</p>
                        <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
                          {p.intro}
                        </p>
                        <span className="mt-6 inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm">
                          Open project <span aria-hidden>→</span>
                        </span>
                      </Link>
                    </div>
                  </div>
                </Reveal>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
