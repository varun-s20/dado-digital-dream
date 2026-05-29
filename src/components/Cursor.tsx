"use client";

import { useEffect, useRef } from "react";

/**
 * Subtle two-part custom cursor: a hard dot tracking the pointer in
 * real time and a softer trailing ring that lags via lerp. Ring scales
 * up over interactive elements (anything with `[data-cursor="hover"]`
 * or anchors/buttons). Hidden on touch devices.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const move = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      }
    };

    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(var(--ring-scale, 1))`;
      }
      raf = requestAnimationFrame(tick);
    };

    const enterInteractive = (e: Event) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      if (t.closest('a, button, [data-cursor="hover"]')) {
        ringRef.current?.style.setProperty("--ring-scale", "1.8");
      }
    };
    const leaveInteractive = (e: Event) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      if (t.closest('a, button, [data-cursor="hover"]')) {
        ringRef.current?.style.setProperty("--ring-scale", "1");
      }
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", enterInteractive, true);
    document.addEventListener("pointerout", leaveInteractive, true);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", enterInteractive, true);
      document.removeEventListener("pointerout", leaveInteractive, true);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden />
      <div ref={dotRef} className="cursor-dot" aria-hidden />
    </>
  );
}
