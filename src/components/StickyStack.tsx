"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Card = { id: string; content: ReactNode };

type Props = {
  cards: Card[];
  /** Vertical offset between stacked tops, in vh. */
  offset?: number;
};

/**
 * Sticky-stack of full-width panels. Each card sticks to the top, the
 * next one slides up over it, and each lower card gets very subtly
 * scaled down + faded as it disappears underneath. A classic
 * scrolltelling pattern: think Apple keynote chapter cards.
 */
export function StickyStack({ cards, offset = 6 }: Props) {
  const root = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const items = el.querySelectorAll<HTMLElement>("[data-stack-card]");
      items.forEach((card, i) => {
        if (i === items.length - 1) return;
        gsap.to(card, {
          scale: 0.94,
          opacity: 0.45,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top top+=80",
            endTrigger: items[i + 1],
            end: "top top+=80",
            scrub: 0.6,
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, [cards]);

  return (
    <div ref={root} className="relative">
      {cards.map((card, i) => (
        <div
          key={card.id}
          data-stack-card
          className="stack-card sticky"
          style={{ top: `${i * offset}vh` }}
        >
          {card.content}
        </div>
      ))}
    </div>
  );
}
