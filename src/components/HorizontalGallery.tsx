"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = { children: ReactNode };

/**
 * Horizontal scroll hijack — pins the section while the user scrolls
 * vertically, translating the inner rail horizontally by the rail's
 * overflow width. Falls back to a real horizontal scrollbar with snap on
 * touch / reduced-motion, so the rail is always fully reachable.
 */
export function HorizontalGallery({ children }: Props) {
  const stage = useRef<HTMLDivElement | null>(null);
  const rail = useRef<HTMLDivElement | null>(null);
  const [native, setNative] = useState(false);

  useEffect(() => {
    if (!stage.current || !rail.current) return;
    if (
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setNative(true);
      return;
    }

    const ctx = gsap.context(() => {
      const railEl = rail.current!;
      const stageEl = stage.current!;
      const getDistance = () => railEl.scrollWidth - stageEl.clientWidth;

      const tween = gsap.to(railEl, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: stageEl,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      return () => { tween.kill(); };
    }, stage);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={stage}
      className={`relative ${native ? "overflow-x-auto overscroll-x-contain [scrollbar-width:none]" : "overflow-hidden"}`}
    >
      <div
        ref={rail}
        className={`h-rail items-center min-h-[70svh] ${native ? "snap-x snap-mandatory" : ""}`}
      >
        {children}
      </div>
    </section>
  );
}
