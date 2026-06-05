"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  src: string;
  alt: string;
  /** Small editorial caption masked up over the image (e.g. "Pools — 2024"). */
  eyebrow: string;
  /** object-position for the crop. */
  pos?: string;
};

/**
 * Full-bleed project banner. A clip-path curtain unveils the frame on mount
 * (CSS), the image rests slightly zoomed and settles toward 1 as the page
 * scrolls (GSAP scrub) for a slow Ken Burns drift, and the caption rises
 * through its own mask. All motion targets transform/opacity/clip-path only.
 */
export function ProjectBanner({ src, alt, eyebrow, pos }: Props) {
  const stage = useRef<HTMLDivElement | null>(null);
  const img = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!stage.current || !img.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        img.current,
        { yPercent: -6, scale: 1.12 },
        {
          yPercent: 9,
          scale: 1.02,
          ease: "none",
          scrollTrigger: {
            trigger: stage.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        },
      );
    }, stage);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full overflow-hidden">
      <div
        ref={stage}
        className="banner-reveal relative aspect-[3/4] w-full overflow-hidden bg-muted sm:aspect-[16/10] lg:aspect-[21/9]"
      >
        <img
          ref={img}
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: pos }}
        />
        {/* Top scrim keeps the floating nav legible; bottom scrim seats the caption. */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
        <div
          className="banner-cap absolute bottom-0 left-0 px-6 pb-7 md:px-12 md:pb-10"
          style={{ color: "var(--surface-deep-foreground)" }}
        >
          <span className="block text-[0.72rem] font-medium uppercase tracking-[0.04em]">
            {eyebrow}
          </span>
        </div>
      </div>
    </section>
  );
}
