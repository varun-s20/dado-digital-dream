"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticLink } from "@/components/MagneticLink";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  n: string;
  t: string;
  img: string;
  d: string;
};

/**
 * Pinned panel: image fills the frame full-width, contracts to the
 * left as the text reveals bottom-mounted on the right, then holds
 * (fully visible, readable) before releasing the pin to scroll on to
 * the next panel. Desktop-only; mobile gets plain stacked flow.
 */
export function DisciplineCard({ n, t, img, d }: Props) {
  const root = useRef<HTMLDivElement | null>(null);
  const imgWrap = useRef<HTMLDivElement | null>(null);
  const textWrap = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const el = root.current;
    const imageEl = imgWrap.current;
    const textEl = textWrap.current;
    if (!el || !imageEl || !textEl) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const mm = gsap.matchMedia(root);
    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=150%",
          scrub: 0.6,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });
      tl.fromTo(
        imageEl,
        { width: "100%" },
        { width: "58.3333%", ease: "none", duration: 0.35 },
        0,
      ).fromTo(
        textEl,
        { autoAlpha: 0, y: 32 },
        { autoAlpha: 1, y: 0, ease: "none", duration: 0.35 },
        0.12,
      );
      // 0.47 -> 1: hold, fully revealed and readable, before the pin releases
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={root} className="relative w-full overflow-hidden bg-background md:h-dvh">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-8 p-6 md:h-full md:flex-row md:items-stretch md:p-12">
        <div
          ref={imgWrap}
          className="img-zoom aspect-[4/3] w-full shrink-0 grow-0 md:aspect-auto md:h-full"
        >
          <img src={img} alt={t} loading="lazy" className="h-full w-full object-cover" />
        </div>
        <div ref={textWrap} className="flex min-w-0 flex-col justify-end md:h-full md:flex-1">
          <span className="font-display text-6xl leading-none text-muted-foreground/35 md:text-7xl">
            {n}
          </span>
          <h3 className="mt-4 font-display text-4xl leading-[1.0] md:text-5xl">{t}</h3>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">{d}</p>
          <MagneticLink
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 self-start border-b border-foreground pb-1 text-sm"
          >
            Learn more <span aria-hidden>→</span>
          </MagneticLink>
        </div>
      </div>
    </div>
  );
}
