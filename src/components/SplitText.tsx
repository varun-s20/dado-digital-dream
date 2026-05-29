"use client";

import {
  createElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Stagger per character, in ms. Default 20. */
  stagger?: number;
  /** Delay before the first character starts, in ms. Default 0. */
  delay?: number;
};

/**
 * Wraps each word in a span and each character in another span so each
 * char can be translated/faded independently. The reveal triggers when
 * the element enters the viewport. Whitespace and explicit line breaks
 * (<br/>) are preserved.
 */
export function SplitText({
  children,
  as: Tag = "span",
  className = "",
  stagger = 20,
  delay = 0,
}: Props) {
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  const setRef = useCallback((el: HTMLElement | null) => setNode(el), []);

  useEffect(() => {
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.2 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [node]);

  const rendered = useMemo(() => {
    let i = 0;
    const wrap = (nodes: ReactNode): ReactNode => {
      if (Array.isArray(nodes)) return nodes.map((n, k) => <span key={k}>{wrap(n)}</span>);
      if (typeof nodes === "string") {
        return nodes.split(/(\s+)/).map((token, k) => {
          if (/^\s+$/.test(token)) return token;
          if (token === "") return null;
          const chars = Array.from(token);
          return (
            <span key={k} className="split-word">
              {chars.map((c, ci) => {
                const idx = i++;
                return (
                  <span
                    key={ci}
                    className="split-char"
                    style={{ ["--i" as string]: idx + Math.round(delay / stagger) }}
                  >
                    {c}
                  </span>
                );
              })}
            </span>
          );
        });
      }
      return nodes;
    };
    return wrap(children);
  }, [children, delay, stagger]);

  return createElement(
    Tag,
    {
      ref: setRef,
      className: `split-text ${visible ? "is-visible" : ""} ${className}`,
      style: { ["--stagger" as string]: `${stagger}ms` },
    },
    rendered,
  );
}
