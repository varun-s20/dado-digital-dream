import { createFileRoute, Link } from "@tanstack/react-router";
import p1 from "@/assets/project-1.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/_site/journal")({
  head: () => ({
    meta: [
      { title: "Journal — Atelier" },
      { name: "description", content: "Ideas, culture and perspective from Atelier." },
      { property: "og:title", content: "Journal — Atelier" },
      { property: "og:description", content: "Writing on hospitality, craft and design." },
    ],
  }),
  component: JournalPage,
});

const posts = [
  { date: "Apr 27, 2026", title: "The Return of Authenticity", excerpt: "Why guests are craving spaces that feel honestly made.", img: p1 },
  { date: "Feb 26, 2026", title: "What Luxury Trains Can Teach Hospitality", excerpt: "Lessons from the slow romance of long-distance travel.", img: p4 },
  { date: "Nov 12, 2025", title: "More Is More: Maximalism Returns", excerpt: "A bold new chapter for layered, generous interiors.", img: p3 },
];

function JournalPage() {
  return (
    <>
      <section className="mx-auto max-w-[1600px] px-6 pb-16 pt-44 md:px-12 md:pb-24 md:pt-56">
        <Reveal>
          <p className="eyebrow text-muted-foreground">Journal</p>
          <h1 className="mt-6 font-display text-6xl leading-[0.9] md:text-[8rem]">
            Ideas, in <em className="font-light">progress.</em>
          </h1>
        </Reveal>
      </section>
      <section className="mx-auto max-w-[1600px] px-6 pb-32 md:px-12">
        <div className="space-y-20">
          {posts.map((post, i) => (
            <Reveal key={post.title} delay={i * 80}>
              <Link to="/journal" className="grid items-center gap-10 md:grid-cols-12">
                <div className="img-zoom md:col-span-5">
                  <img src={post.img} alt={post.title} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                </div>
                <div className="md:col-span-6 md:col-start-7">
                  <p className="eyebrow text-muted-foreground">{post.date}</p>
                  <h2 className="mt-3 font-display text-4xl leading-tight md:text-5xl">{post.title}</h2>
                  <p className="mt-4 text-muted-foreground">{post.excerpt}</p>
                  <span className="mt-6 inline-block border-b border-foreground pb-1 text-sm">Read article →</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
