"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  words: readonly string[];
  /** Direction: 1 = leftward, -1 = rightward */
  direction?: 1 | -1;
  className?: string;
  /** Base speed in seconds for one loop. */
  speed?: number;
};

/**
 * Kinetic marquee — base translateX loop that picks up extra velocity
 * (and a tiny skew) from the scroll velocity. Two duplicates of the
 * track ensure a seamless loop. Pauses on hover.
 */
export function MarqueeBand({ words, direction = 1, className = "", speed = 30 }: Props) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let baseX = 0;
    let raf = 0;
    let last = performance.now();
    let extra = 0;
    let skew = 0;

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      const half = track.scrollWidth / 2;
      if (half > 0) {
        const baseSpeed = (half / speed) * direction;
        baseX -= (baseSpeed + extra) * dt;
        // Normalize into [-half, 0) so the track stays fully covered in
        // either direction — positive offsets would otherwise leave the
        // leading edge empty and let words scroll off into blank space.
        baseX = (((baseX % half) + half) % half) - half;
      }
      extra *= 0.92;
      skew *= 0.9;
      track.style.transform = `translate3d(${baseX}px, 0, 0) skewX(${skew}deg)`;
      raf = requestAnimationFrame(tick);
    };

    let lastScroll = window.scrollY;
    const onScroll = () => {
      const dy = window.scrollY - lastScroll;
      lastScroll = window.scrollY;
      extra += dy * 12 * direction;
      skew = Math.max(-6, Math.min(6, -dy * 0.4 * direction));
    };

    raf = requestAnimationFrame(tick);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [direction, speed]);

  // Duplicate words so the track is always ≥2× the viewport width.
  const doubled = [...words, ...words];

  return (
    <div ref={stageRef} className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div ref={trackRef} className="kinetic-track" style={{ willChange: "transform" }}>
        {doubled.map((w, i) => (
          <span key={i} className="inline-flex items-baseline gap-16">
            <span>{w}</span>
            <span aria-hidden className="opacity-40">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
