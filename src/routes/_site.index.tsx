import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";
import studio from "@/assets/studio.jpg";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/_site/")({
  head: () => ({
    meta: [
      { title: "Atelier — Interior design for hospitality" },
      {
        name: "description",
        content:
          "An independent studio crafting hospitality interiors that feel intuitive, personal and alive.",
      },
      { property: "og:title", content: "Atelier — Interior design for hospitality" },
      {
        property: "og:description",
        content: "Form follows feeling. Hospitality interiors built around human experience.",
      },
    ],
  }),
  component: HomePage,
});

const projects = [
  { img: p1, title: "Vista House", tag: "Guestrooms & Suites", to: "/projects" },
  { img: p2, title: "Serene Spa", tag: "Spa & Wellness", to: "/projects" },
  { img: p3, title: "Grand Atrium", tag: "Public Spaces", to: "/projects" },
  { img: p4, title: "Casa Lucenta", tag: "Restaurant & Bar", to: "/projects" },
];

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative h-[100svh] w-full overflow-hidden">
        <img
          src={hero}
          alt="Sunlit lounge interior with sculptural olive velvet chair and travertine floor"
          className="absolute inset-0 h-full w-full object-cover"
          width={1600}
          height={1024}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40" />
        <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-between px-6 pb-10 pt-32 md:px-12 md:pb-16">
          <div className="text-[var(--surface-deep-foreground)]">
            <p className="eyebrow opacity-80">Interior design</p>
            <p className="eyebrow opacity-80">for hospitality</p>
          </div>

          <div className="text-[var(--surface-deep-foreground)]">
            <h1 className="word-rise font-display text-[18vw] leading-[0.85] tracking-tight md:text-[12vw]">
              <span style={{ animationDelay: "0.6s" }}>Form&nbsp;&nbsp;&nbsp;</span>
              <span style={{ animationDelay: "0.85s" }} className="italic">Follows</span>
              <br />
              <span style={{ animationDelay: "1.1s" }} className="pl-[20%] md:pl-[30%]">Feeling</span>
            </h1>
            <div className="mt-10 grid gap-8 md:grid-cols-12">
              <p className="md:col-span-5 md:col-start-7 max-w-md text-base leading-relaxed opacity-90">
                Empathy shapes everything we create — from the first impression
                to the final detail.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="mx-auto max-w-[1600px] px-6 py-28 md:px-12 md:py-44">
        <div className="grid gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <p className="eyebrow text-muted-foreground">About</p>
            <p className="mt-6 font-display text-3xl leading-tight">
              We design innovative, thought-provoking environments that foster
              deeper human experiences.
            </p>
            <Link
              to="/approach"
              className="mt-8 inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm"
            >
              Approach <span aria-hidden>→</span>
            </Link>
          </Reveal>
          <Reveal delay={150} className="md:col-span-7 md:col-start-6 space-y-6 text-lg leading-relaxed">
            <p>
              Atelier is a small team of designers working to deepen the human
              experience of hospitality. We build worlds where empathy is
              embedded in every interaction — spaces that feel intuitive,
              personal, and alive.
            </p>
            <p className="text-muted-foreground">
              Each project begins with how a space should feel. From there, the
              client’s vision, the energy they want to create, and the moments
              they hope to inspire combine into something original and
              unforgettable.
            </p>
          </Reveal>
        </div>
      </section>

      {/* MARQUEE */}
      <Reveal>
        <div className="surface-deep py-10">
          <div className="marquee font-display text-5xl md:text-7xl">
            <div className="marquee-track">
              {Array.from({ length: 2 }).flatMap((_, i) =>
                ["Hospitality", "·", "Wellness", "·", "Restaurants", "·", "Residences", "·", "Resorts", "·"].map(
                  (w, j) => (
                    <span key={`${i}-${j}`} className="opacity-90">
                      {w}
                    </span>
                  ),
                ),
              )}
            </div>
          </div>
        </div>
      </Reveal>

      {/* FEATURED PROJECTS */}
      <section className="mx-auto max-w-[1600px] px-6 py-28 md:px-12 md:py-40">
        <Reveal className="flex items-end justify-between">
          <h2 className="font-display text-6xl leading-[0.9] md:text-[7rem]">
            Featured&nbsp;&nbsp;&nbsp;<em className="font-light">Projects</em>
          </h2>
          <Link to="/projects" className="eyebrow hidden border-b border-foreground pb-1 md:inline-block">
            All projects →
          </Link>
        </Reveal>

        <div className="mt-16 grid gap-x-8 gap-y-20 md:grid-cols-12">
          {projects.map((p, i) => (
            <Reveal
              key={p.title}
              delay={i * 80}
              className={`group ${
                i % 2 === 0 ? "md:col-span-7" : "md:col-span-5 md:mt-32"
              }`}
            >
              <Link to={p.to} className="block img-zoom">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  width={1200}
                  height={1500}
                  className="aspect-[4/5] w-full object-cover"
                />
              </Link>
              <div className="mt-5 flex items-end justify-between">
                <div>
                  <h3 className="font-display text-2xl">{p.title}</h3>
                  <p className="eyebrow mt-1 text-muted-foreground">{p.tag}</p>
                </div>
                <span className="eyebrow text-muted-foreground">0{i + 1}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* STUDIO */}
      <section className="mx-auto max-w-[1600px] px-6 py-28 md:px-12 md:py-40">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-7 img-zoom">
            <img
              src={studio}
              alt="Designer arranging material samples on a studio table"
              loading="lazy"
              width={1600}
              height={1100}
              className="aspect-[16/11] w-full object-cover"
            />
          </Reveal>
          <Reveal delay={150} className="md:col-span-4 md:col-start-9 flex flex-col justify-end">
            <p className="eyebrow text-muted-foreground">The Studio</p>
            <h2 className="mt-4 font-display text-5xl leading-[0.95] md:text-6xl">
              A true creative<br /><em className="font-light">partnership.</em>
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Our clients understand what their spaces need to feel like — and
              to uncover that, we take the time to truly understand them. We
              stay close, from early visioning to the last material decision.
            </p>
            <Link
              to="/approach"
              className="mt-8 inline-flex items-center gap-2 self-start border-b border-foreground pb-1 text-sm"
            >
              Read our approach <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* JOURNAL */}
      <section className="mx-auto max-w-[1600px] px-6 pb-32 md:px-12">
        <Reveal>
          <h2 className="max-w-4xl font-display text-4xl leading-tight md:text-6xl">
            Our journal is a bright, ever-evolving platform where ideas, culture
            and perspective live and breathe.
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {[
            { date: "Apr 27, 2026", title: "The Return of Authenticity", img: p1 },
            { date: "Feb 26, 2026", title: "What Luxury Trains Can Teach Hospitality", img: p4 },
            { date: "Nov 12, 2025", title: "More Is More: Maximalism Returns", img: p3 },
          ].map((post, i) => (
            <Reveal key={post.title} delay={i * 80} className="img-zoom">
              <Link to="/journal">
                <img
                  src={post.img}
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
