import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Projects",
  description: "Recent gardens, pools and carpentry projects across Sydney and the NSW South Coast.",
  openGraph: {
    title: "Projects — Fieldcraft",
    description: "Selected landscape and carpentry work.",
  },
};

const all = [
  { img: "/images/project-1.jpg", title: "Mosman Deck", tag: "Carpentry & Decking", year: "2026" },
  { img: "/images/project-3.jpg", title: "Fairlight Pergola", tag: "Bespoke Timberwork", year: "2025" },
  { img: "/images/project-2.jpg", title: "Bundeena Steps", tag: "Coastal Garden", year: "2025" },
  { img: "/images/project-4.jpg", title: "Bowral Pool", tag: "Pool & Landscape", year: "2024" },
  { img: "/images/project-3.jpg", title: "Avalon Pavilion", tag: "Outdoor Structure", year: "2024" },
  { img: "/images/project-1.jpg", title: "Hunters Hill Courtyard", tag: "Garden & Joinery", year: "2023" },
];

export default function ProjectsPage() {
  return (
    <>
      <section className="mx-auto max-w-[1600px] px-6 pb-16 pt-44 md:px-12 md:pb-24 md:pt-56">
        <Reveal>
          <p className="eyebrow text-muted-foreground">Projects</p>
          <h1 className="mt-6 font-display text-6xl leading-[0.9] md:text-[8rem]">
            Built into <em className="font-light">place.</em>
          </h1>
        </Reveal>
      </section>
      <section className="mx-auto max-w-[1600px] px-6 pb-32 md:px-12">
        <div className="grid gap-x-8 gap-y-20 md:grid-cols-2">
          {all.map((p, i) => (
            <Reveal
              key={`${p.title}-${i}`}
              delay={(i % 2) * 100}
              className={`group ${i % 2 === 1 ? "md:mt-24" : ""}`}
            >
              <Link href="/projects" className="img-zoom block">
                <img src={p.img} alt={p.title} loading="lazy" className="aspect-[4/5] w-full object-cover" />
              </Link>
              <div className="mt-5 flex items-end justify-between">
                <div>
                  <h3 className="font-display text-3xl">{p.title}</h3>
                  <p className="eyebrow mt-1 text-muted-foreground">{p.tag}</p>
                </div>
                <span className="eyebrow text-muted-foreground">{p.year}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
