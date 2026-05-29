"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenis } from "@/lib/lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Inertial smooth scroll for the entire document. Driven by Lenis; its
 * raf is delegated to GSAP's ticker so ScrollTrigger updates are
 * perfectly in sync with the scroll position (no jitter).
 *
 * Honors prefers-reduced-motion by skipping initialization entirely.
 * Resets to the top of the page on every client-side navigation —
 * Lenis otherwise keeps the previous scroll offset.
 */
export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Stop the browser from restoring the previous page's scroll position.
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;
    setLenis(lenis);

    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  // Jump to the top whenever the route changes. We re-assert across the
  // next two frames because Lenis recomputes its target after the new
  // page mounts and would otherwise snap back to the old offset.
  useEffect(() => {
    let frame2 = 0;

    const toTop = () => {
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.resize();
        lenis.scrollTo(0, { immediate: true, force: true });
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    toTop();
    const frame1 = requestAnimationFrame(() => {
      toTop();
      frame2 = requestAnimationFrame(() => {
        toTop();
        ScrollTrigger.refresh();
      });
    });

    return () => {
      cancelAnimationFrame(frame1);
      cancelAnimationFrame(frame2);
    };
  }, [pathname]);

  return null;
}
