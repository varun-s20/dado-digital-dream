import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleRail } from "@/components/ArticleRail";
import { ParallaxImage } from "@/components/ParallaxImage";
import { ReadingProgress } from "@/components/ReadingProgress";
import { Reveal } from "@/components/Reveal";
import { SplitText } from "@/components/SplitText";
import { brand } from "@/lib/brand";
import { getNextPost, getPost, headingId, posts } from "@/lib/journal";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article not found" };
  return {
    title: post.title,
    description: post.dek,
    openGraph: {
      title: post.title,
      description: post.dek,
      type: "article",
      images: [post.hero],
    },
  };
}

const imgAspect = {
  wide: "aspect-[16/9]",
  tall: "aspect-[4/5]",
  square: "aspect-square",
} as const;

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const next = getNextPost(slug);

  const chapters = post.body
    .filter((b): b is Extract<typeof b, { type: "h" }> => b.type === "h")
    .map((b) => ({ id: headingId(b.text), text: b.text }));

  return (
    <article id="article-root" className="relative">
      <ReadingProgress targetId="article-root" />

      {/* HERO — editorial, deliberately unlike the case-study pinned hero */}
      <header className="mx-auto max-w-[1600px] px-6 pt-36 md:px-12 md:pt-52">
        <Link href="/journal" className="arrow-link eyebrow inline-flex items-center gap-2 text-muted-foreground">
          <span aria-hidden>←</span> The journal
        </Link>

        <div className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-2">
          <span className="eyebrow rounded-full border border-border px-3 py-1">{post.tag}</span>
          <time dateTime={post.iso} className="eyebrow text-muted-foreground">{post.date}</time>
          <span aria-hidden className="eyebrow text-muted-foreground/40">·</span>
          <span className="eyebrow text-muted-foreground">{post.read} read</span>
        </div>

        <SplitText
          as="h1"
          className="mt-8 max-w-[18ch] font-display text-5xl leading-[0.95] tracking-tight md:text-[7.5rem] md:leading-[0.9]"
          stagger={22}
        >
          {post.title}
        </SplitText>

        <div className="mt-12 grid gap-8 border-t border-border pt-8 md:grid-cols-12">
          <Reveal delay={120} className="md:col-span-7">
            <p className="font-display text-2xl leading-snug md:text-3xl">{post.dek}</p>
          </Reveal>
          <Reveal delay={220} className="md:col-span-3 md:col-start-10 flex items-end">
            <div>
              <p className="eyebrow text-muted-foreground">Words by</p>
              <p className="mt-2 font-display text-xl">{post.author.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{post.author.role}</p>
            </div>
          </Reveal>
        </div>
      </header>

      {/* COVER */}
      <div className="img-zoom mx-auto mt-14 max-w-[1600px] px-6 md:mt-20 md:px-12">
        <ParallaxImage
          src={post.hero}
          alt={post.title}
          className="aspect-[16/10] w-full md:aspect-[16/8]"
          imgClassName="h-full w-full object-cover"
          strength={110}
          zoomFrom={1.08}
        />
      </div>

      {/* BODY */}
      <div className="mx-auto max-w-[1600px] px-6 py-24 md:px-12 md:py-36">
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-12 lg:items-start">
          <aside className="lg:col-span-3 lg:sticky lg:top-32 lg:self-start">
            <ArticleRail chapters={chapters} />
          </aside>

          <div className="article-body lg:col-span-8 lg:col-start-5">
            {post.body.map((block, i) => {
              switch (block.type) {
                case "h": {
                  const id = headingId(block.text);
                  return (
                    <Reveal key={i}>
                      <h2
                        id={id}
                        data-chapter
                        className="mt-20 scroll-mt-32 font-display text-3xl leading-tight md:text-5xl"
                      >
                        {block.text}
                      </h2>
                    </Reveal>
                  );
                }
                case "p":
                  return (
                    <Reveal key={i} delay={40}>
                      <p
                        className={
                          block.lead
                            ? "drop-cap text-xl leading-relaxed text-foreground md:text-[1.65rem] md:leading-[1.7]"
                            : "mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl"
                        }
                      >
                        {block.text}
                      </p>
                    </Reveal>
                  );
                case "quote":
                  return (
                    <Reveal key={i} delay={40}>
                      <figure className="my-16 border-l border-foreground pl-8 md:my-20 md:pl-12">
                        <blockquote className="font-display text-3xl leading-snug md:text-[2.6rem] md:leading-[1.15]">
                          “{block.text}”
                        </blockquote>
                        {block.cite && (
                          <figcaption className="eyebrow mt-6 text-muted-foreground">— {block.cite}</figcaption>
                        )}
                      </figure>
                    </Reveal>
                  );
                case "image":
                  return (
                    <Reveal key={i} delay={40} className="my-14 md:my-20">
                      <div className={`img-zoom ${imgAspect[block.aspect]} w-full`}>
                        <ParallaxImage
                          src={block.src}
                          alt={block.alt}
                          imgClassName="h-full w-full object-cover"
                          strength={70}
                          zoomFrom={1.06}
                        />
                      </div>
                      <p className="eyebrow mt-4 text-muted-foreground">{block.alt}</p>
                    </Reveal>
                  );
                case "list":
                  return (
                    <Reveal key={i} delay={40}>
                      <ul className="mt-8 space-y-5">
                        {block.items.map((item, j) => (
                          <li key={j} className="flex gap-5 border-t border-border pt-5 text-lg leading-relaxed text-muted-foreground md:text-xl">
                            <span className="eyebrow shrink-0 pt-1 text-foreground">0{j + 1}</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </Reveal>
                  );
                default:
                  return null;
              }
            })}

            {/* sign-off */}
            <div className="mt-20 flex items-center gap-4 border-t border-border pt-8">
              <span className="font-display text-2xl">{brand.mark}</span>
              <p className="text-sm text-muted-foreground">
                {post.author.name} — {brand.fullName}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CONTINUE READING */}
      <section className="relative overflow-hidden">
        <Link href={`/journal/${next.slug}`} className="group block">
          <div className="parallax-stage relative h-[70vh] min-h-[420px]">
            <img
              src={next.hero}
              alt={next.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/55 transition-opacity duration-700 group-hover:bg-black/40" />
            <div
              className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-between px-6 py-14 md:px-12 md:py-20"
              style={{ color: "var(--surface-deep-foreground)" }}
            >
              <p className="eyebrow opacity-80">Continue reading — {next.tag}</p>
              <div>
                <p className="eyebrow opacity-80">{next.date} · {next.read} read</p>
                <h2 className="mt-4 max-w-[16ch] font-display text-4xl leading-[0.95] md:text-7xl">
                  {next.title}
                </h2>
                <div className="mt-6 inline-flex items-center gap-3 border-b border-current pb-1 text-sm transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
                  Read article <span aria-hidden>→</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </section>
    </article>
  );
}
