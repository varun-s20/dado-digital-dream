"use client";

import { scrollToId } from "@/lib/lenis";

/**
 * A down-arrow cue that smooth-scrolls to a target section via the Lenis
 * singleton (cooperating with the document's inertial scroll instead of
 * fighting it with native scrollIntoView). Mirrors the "Who we are → arrow
 * down" continuation cue on formedgardens.com.au/about.
 */
export function ScrollCue({
  targetId,
  label = "Our story",
}: {
  targetId: string;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => scrollToId(targetId)}
      aria-label={`Scroll to ${label}`}
      data-cursor="hover"
      className="scroll-cue group mx-auto mt-14 flex flex-col items-center gap-3"
    >
      <span className="eyebrow text-muted-foreground/60 transition-colors duration-300 group-hover:text-foreground">
        {label}
      </span>
      <span className="scroll-cue-arrow" aria-hidden>
        &darr;
      </span>
    </button>
  );
}
