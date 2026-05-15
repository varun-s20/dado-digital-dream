import { createFileRoute } from "@tanstack/react-router";
import studio from "@/assets/studio.jpg";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/_site/approach")({
  head: () => ({
    meta: [
      { title: "Approach — Atelier" },
      { name: "description", content: "How we design hospitality interiors: empathy, craft, story." },
      { property: "og:title", content: "Approach — Atelier" },
      { property: "og:description", content: "Empathy, craft, and story — our process for hospitality design." },
    ],
  }),
  component: ApproachPage,
});

function ApproachPage() {
  const principles = [
    { n: "01", t: "Listen first", d: "Every project starts with conversation. We learn how a space should feel before we draw a single line." },
    { n: "02", t: "Design with empathy", d: "Guests don’t remember floor plans — they remember how a place made them feel. We design for that memory." },
    { n: "03", t: "Craft the detail", d: "From hardware finish to lighting temperature, the smallest decisions carry the loudest weight." },
    { n: "04", t: "Tell a story", d: "Each space holds a narrative. We weave material, light and form so the story unfolds as guests move through it." },
  ];
  return (
    <>
      <section className="mx-auto max-w-[1600px] px-6 pb-20 pt-44 md:px-12 md:pb-32 md:pt-56">
        <Reveal>
          <p className="eyebrow text-muted-foreground">Approach</p>
          <h1 className="mt-6 max-w-5xl font-display text-6xl leading-[0.9] md:text-[9rem]">
            We design how a place <em className="font-light">feels.</em>
          </h1>
        </Reveal>
      </section>
      <section className="img-zoom mx-auto max-w-[1600px] px-6 md:px-12">
        <Reveal>
          <img src={studio} alt="Studio materials" className="aspect-[16/9] w-full object-cover" />
        </Reveal>
      </section>
      <section className="mx-auto max-w-[1600px] px-6 py-28 md:px-12 md:py-40">
        <div className="grid gap-y-20 md:grid-cols-2 md:gap-x-16">
          {principles.map((p, i) => (
            <Reveal key={p.n} delay={i * 80} className="border-t border-border pt-8">
              <div className="flex items-baseline justify-between">
                <h2 className="font-display text-4xl">{p.t}</h2>
                <span className="eyebrow text-muted-foreground">{p.n}</span>
              </div>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">{p.d}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
