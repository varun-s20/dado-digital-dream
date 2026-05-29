"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hairline reading-progress bar pinned to the very top edge. Scales
 * horizontally from 0→1 across the article's scroll length. Driven by a
 * single ScrollTrigger (no scroll listener) so it stays in lockstep with
 * Lenis via gsap.ticker.
 */
export function ReadingProgress({ targetId }: { targetId: string }) {
  const bar = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = bar.current;
    const target = document.getElementById(targetId);
    if (!el || !target) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.transform = "scaleX(0)";
      return;
    }

    const st = ScrollTrigger.create({
      trigger: target,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        el.style.transform = `scaleX(${self.progress})`;
      },
    });

    return () => st.kill();
  }, [targetId]);

  return (
    <div className="fixed inset-x-0 top-0 z-[55] h-[2px] bg-transparent" aria-hidden>
      <div
        ref={bar}
        className="h-full origin-left bg-foreground"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
