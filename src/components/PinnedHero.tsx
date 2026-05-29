"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  image: string;
  alt: string;
  children: ReactNode;
};

/**
 * Pinned full-bleed hero — image is held in place while the content
 * scrolls over it; image scales/shifts slightly as the hero exits.
 * Used on case study pages.
 */
export function PinnedHero({ image, alt, children }: Props) {
  const stage = useRef<HTMLElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!stage.current || !imgRef.current || !contentRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        scale: 1.15,
        ease: "none",
        scrollTrigger: {
          trigger: stage.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });
      gsap.to(contentRef.current, {
        yPercent: -25,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: {
          trigger: stage.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    }, stage);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={stage} className="relative min-h-[100dvh] w-full overflow-hidden">
      <img
        ref={imgRef}
        src={image}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/60" />
      <div
        ref={contentRef}
        className="relative z-10 mx-auto flex h-[100dvh] max-w-[1600px] flex-col justify-end px-6 pb-16 md:px-12 md:pb-24"
        style={{ color: "var(--surface-deep-foreground)" }}
      >
        {children}
      </div>
    </section>
  );
}
