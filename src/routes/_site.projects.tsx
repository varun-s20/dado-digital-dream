import { createFileRoute, Link } from "@tanstack/react-router";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/_site/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Fieldcraft" },
      { name: "description", content: "Recent gardens, pools and carpentry projects across Sydney and the NSW South Coast." },
      { property: "og:title", content: "Projects — Fieldcraft" },
      { property: "og:description", content: "Selected landscape and carpentry work." },
    ],
  }),
  component: ProjectsPage,
});

const all = [
  { img: p1, title: "Mosman Deck", tag: "Carpentry & Decking", year: "2026" },
  { img: p3, title: "Fairlight Pergola", tag: "Bespoke Timberwork", year: "2025" },
  { img: p2, title: "Bundeena Steps", tag: "Coastal Garden", year: "2025" },
  { img: p4, title: "Bowral Pool", tag: "Pool & Landscape", year: "2024" },
  { img: p3, title: "Avalon Pavilion", tag: "Outdoor Structure", year: "2024" },
  { img: p1, title: "Hunters Hill Courtyard", tag: "Garden & Joinery", year: "2023" },
];

function ProjectsPage() {
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
              <Link to="/projects" className="img-zoom block">
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
