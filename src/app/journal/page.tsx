import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Journal",
  description: "Notes from the workshop and the field.",
  openGraph: {
    title: "Journal — Fieldcraft",
    description: "Writing on plants, timber and the craft of building outdoors.",
  },
};

const posts = [
  { date: "Apr 27, 2026", title: "Choosing Hardwoods for the Coast", excerpt: "Spotted gum, blackbutt, silvertop ash — what we reach for, and why.", img: "/images/project-1.jpg" },
  { date: "Feb 26, 2026", title: "A Field Guide to Native Grasses", excerpt: "The unsung backbone of a garden that ages well.", img: "/images/project-2.jpg" },
  { date: "Nov 12, 2025", title: "Why We Build Pools in Timber", excerpt: "On warmth, weathering, and pools that feel like furniture.", img: "/images/project-4.jpg" },
];

export default function JournalPage() {
  return (
    <>
      <section className="mx-auto max-w-[1600px] px-6 pb-16 pt-44 md:px-12 md:pb-24 md:pt-56">
        <Reveal>
          <p className="eyebrow text-muted-foreground">Journal</p>
          <h1 className="mt-6 font-display text-6xl leading-[0.9] md:text-[8rem]">
            Notes from the <em className="font-light">field.</em>
          </h1>
        </Reveal>
      </section>
      <section className="mx-auto max-w-[1600px] px-6 pb-32 md:px-12">
        <div className="space-y-20">
          {posts.map((post, i) => (
            <Reveal key={post.title} delay={i * 80}>
              <Link href="/journal" className="grid items-center gap-10 md:grid-cols-12">
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
