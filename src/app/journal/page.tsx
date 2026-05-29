import type { Metadata } from "next";
import Link from "next/link";
import { MaskHeading } from "@/components/MaskHeading";
import { ParallaxImage } from "@/components/ParallaxImage";
import { Reveal } from "@/components/Reveal";
import { SplitText } from "@/components/SplitText";
import { posts } from "@/lib/journal";

export const metadata: Metadata = {
  title: "Journal",
  description: "Notes from the workshop and the field.",
  openGraph: {
    title: "Journal — BM.",
    description: "Writing on plants, timber and the craft of building outdoors.",
  },
};

export default function JournalPage() {
  return (
    <>
      <section className="mx-auto max-w-[1600px] px-6 pb-16 pt-44 md:px-12 md:pb-24 md:pt-56">
        <p className="eyebrow text-muted-foreground">Journal · field notes</p>
        <SplitText
          as="h1"
          className="mt-6 font-display text-6xl leading-[0.9] md:text-[10rem]"
          stagger={26}
        >
          Notes from the field.
        </SplitText>
        <div className="mt-16 grid gap-10 md:grid-cols-12">
          <MaskHeading
            as="p"
            lines={[
              "Writing from the workshop, from sites,",
              "from the back of the ute. On materials,",
              "planting and the slow craft of building",
              "in the open air.",
            ]}
            className="md:col-span-6 md:col-start-7 font-display text-2xl leading-snug md:text-3xl"
            stagger={120}
          />
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 pb-32 md:px-12">
        <div className="space-y-24 md:space-y-32">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 60}>
              <Link href={`/journal/${post.slug}`} className={`arrow-link grid items-center gap-10 md:grid-cols-12 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                <div className={`${i % 2 === 1 ? "md:order-2 md:col-span-6" : "md:col-span-6"}`}>
                  <div className="img-zoom">
                    <ParallaxImage
                      src={post.hero}
                      alt={post.title}
                      className="aspect-[4/3] w-full"
                      imgClassName="h-full w-full object-cover"
                      strength={60}
                      zoomFrom={1.05}
                    />
                  </div>
                </div>
                <div className={`${i % 2 === 1 ? "md:order-1 md:col-span-5" : "md:col-span-5 md:col-start-8"}`}>
                  <div className="flex items-center gap-6 text-muted-foreground">
                    <p className="eyebrow">{post.date}</p>
                    <span className="eyebrow opacity-50">·</span>
                    <p className="eyebrow">{post.tag}</p>
                    <span className="eyebrow opacity-50">·</span>
                    <p className="eyebrow">{post.read}</p>
                  </div>
                  <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">{post.title}</h2>
                  <p className="mt-4 text-muted-foreground">{post.excerpt}</p>
                  <span className="mt-6 inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm">
                    Read article <span aria-hidden>→</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
