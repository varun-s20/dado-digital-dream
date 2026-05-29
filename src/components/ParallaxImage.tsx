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
  className?: string;
  imgClassName?: string;
  /** Pixel range the image translates over the full scroll-through. Default 120. */
  strength?: number;
  /** Optional starting zoom — image renders at scale + 1, then settles to 1 on scroll. */
  zoomFrom?: number;
};

export function ParallaxImage({
  src,
  alt,
  className = "",
  imgClassName = "h-full w-full object-cover",
  strength = 120,
  zoomFrom = 1.08,
}: Props) {
  const stage = useRef<HTMLDivElement | null>(null);
  const target = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!stage.current || !target.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        target.current,
        { yPercent: -strength / 10, scale: zoomFrom },
        {
          yPercent: strength / 10,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: stage.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        },
      );
    }, stage);

    return () => ctx.revert();
  }, [strength, zoomFrom]);

  return (
    <div ref={stage} className={`parallax-stage ${className}`}>
      <img
        ref={target}
        src={src}
        alt={alt}
        loading="lazy"
        className={`parallax-target ${imgClassName}`}
      />
    </div>
  );
}
