"use client";

import {
  createElement,
  useCallback,
  useEffect,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

type Props = {
  /** Each entry becomes a masked line. */
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  /** Stagger between lines, in ms. Default 90. */
  stagger?: number;
};

/**
 * Multi-line heading where each line slides up from below its own
 * `overflow:hidden` clip. The clip itself sits on its line-height so
 * descenders aren't truncated.
 */
export function MaskHeading({ lines, as: Tag = "h2", className = "", stagger = 90 }: Props) {
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const setRef = useCallback((el: HTMLElement | null) => setNode(el), []);

  useEffect(() => {
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { setVisible(true); io.disconnect(); }
      }),
      { threshold: 0.25 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [node]);

  return createElement(
    Tag,
    { ref: setRef, className },
    lines.map((line, i) => (
      <span
        key={i}
        className={`mask-line ${visible ? "is-visible" : ""}`}
        style={{ ["--i" as string]: i, transitionDelay: `${i * stagger}ms` }}
      >
        <span>{line}</span>
      </span>
    )),
  );
}
