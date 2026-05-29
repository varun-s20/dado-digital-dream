import type Lenis from "lenis";

/**
 * Module-singleton handle to the document's Lenis instance. SmoothScroll
 * registers it on mount; any client component (e.g. the article chapter
 * rail) can read it to drive a programmatic smooth scroll that cooperates
 * with Lenis instead of fighting it via native scrollIntoView.
 */
let instance: Lenis | null = null;

export function setLenis(l: Lenis | null): void {
  instance = l;
}

export function getLenis(): Lenis | null {
  return instance;
}

/**
 * Scroll to an element (by id) accounting for the fixed nav. Uses Lenis
 * when available, otherwise falls back to native smooth scrolling.
 */
export function scrollToId(id: string, offset = -128): void {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = instance;
  if (lenis) {
    lenis.scrollTo(el, { offset, duration: 1.0 });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
