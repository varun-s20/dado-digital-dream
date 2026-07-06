"use client";

import { useCallback, useEffect, useState, type CSSProperties } from "react";

/**
 * A torn-page desk-calendar tile: sits blank until scrolled into view, then
 * turns like a real split-flap page — the top leaf tips away, the bottom
 * leaf falls into place a beat later — to reveal its chapter number. A
 * stack of "already flipped" pages peeks out behind each tile, so the
 * section reads as a trip down memory lane rather than a running clock.
 */
export function FlipNumeral({
  value,
  delay = 0,
  rotate = 0,
}: {
  value: string;
  delay?: number;
  rotate?: number;
}) {
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [flipped, setFlipped] = useState(false);

  const setRef = useCallback((el: HTMLElement | null) => setNode(el), []);

  useEffect(() => {
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            window.setTimeout(() => setFlipped(true), delay);
            io.disconnect();
          }
        });
      },
      { threshold: 0.5 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [node, delay]);

  const prev = "–";

  return (
    <span
      ref={setRef}
      aria-hidden
      className={`calendar-flip ${flipped ? "is-flipped" : ""}`}
      style={{ "--tile-rotate": `${rotate}deg` } as CSSProperties}
    >
      <span className="calendar-flip-card">
        <span className="calendar-flip-punch" />
        {/* static faces: what's revealed once the leaves clear */}
        <span className="flip-half flip-half-top flip-half-back">
          <span className="flip-digit">{value}</span>
        </span>
        <span className="flip-half flip-half-bottom flip-half-back">
          <span className="flip-digit">{prev}</span>
        </span>
        {/* animated leaves: top tips away, bottom falls into place */}
        <span className="flip-leaf flip-leaf-top">
          <span className="flip-digit">{prev}</span>
        </span>
        <span className="flip-leaf flip-leaf-bottom">
          <span className="flip-digit">{value}</span>
        </span>
        <span className="flip-fold" />
      </span>
    </span>
  );
}
