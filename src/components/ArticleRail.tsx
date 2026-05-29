"use client";

import { useEffect, useRef, useState } from "react";
import { scrollToId } from "@/lib/lenis";

type Chapter = { id: string; text: string };

/**
 * Sticky chapter rail for long-form articles. Scroll-spies the article's
 * `<h2 data-chapter>` anchors via IntersectionObserver and highlights the
 * active section; the marker line scales to mark reading depth. Clicking a
 * chapter scrolls smoothly to it. Hidden on small viewports.
 */
export function ArticleRail({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = useState(chapters[0]?.id ?? "");
  const observed = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (!chapters.length) return;
    const els = chapters
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => Boolean(el));
    observed.current = els;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [chapters]);

  if (chapters.length < 2) return null;

  const activeIndex = Math.max(0, chapters.findIndex((c) => c.id === active));

  return (
    <nav aria-label="Article sections" className="hidden lg:block">
      <div>
        <p className="eyebrow text-muted-foreground">Contents</p>
        <ol className="mt-6 space-y-3">
          {chapters.map((c, i) => {
            const isActive = c.id === active;
            return (
              <li key={c.id} className="flex items-start gap-3">
                <span
                  aria-hidden
                  className={`mt-[0.55em] h-px w-6 shrink-0 origin-left transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive ? "w-10 bg-foreground" : "bg-border"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => scrollToId(c.id)}
                  className={`text-left text-sm leading-snug transition-colors duration-300 ${
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="eyebrow mr-2 opacity-50">0{i + 1}</span>
                  {c.text}
                </button>
              </li>
            );
          })}
        </ol>
        <div className="mt-8 flex items-center gap-3">
          <div className="h-px flex-1 bg-border">
            <div
              className="h-px origin-left bg-foreground transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ transform: `scaleX(${(activeIndex + 1) / chapters.length})` }}
            />
          </div>
          <span className="eyebrow text-muted-foreground">
            {String(activeIndex + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </nav>
  );
}
