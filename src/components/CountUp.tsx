"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  /** Final integer to count to. */
  to: number;
  /** Optional suffix, e.g. "+". */
  suffix?: string;
  /** Duration in ms. */
  duration?: number;
  className?: string;
};

/**
 * Counts from 0→`to` once, the first time it scrolls into view. Uses a
 * single rAF loop with an eased curve and cleans up on unmount. Respects
 * reduced-motion by snapping straight to the final value.
 */
export function CountUp({ to, suffix = "", duration = 1600, className = "" }: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setValue(to);
      return;
    }

    let raf = 0;
    let start = 0;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const run = (now: number) => {
      if (!start) start = now;
      const p = Math.min(1, (now - start) / duration);
      setValue(Math.round(ease(p) * to));
      if (p < 1) raf = requestAnimationFrame(run);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !done.current) {
            done.current = true;
            raf = requestAnimationFrame(run);
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}
