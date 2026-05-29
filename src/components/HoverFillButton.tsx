"use client";

import { useCallback, useRef, type ButtonHTMLAttributes, type ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  /** Initial idle position of the fill. Default "bottom" — slides up on hover. */
  rest?: "top" | "right" | "bottom" | "left";
};

/**
 * Directional hover-fill button — the fill enters from the side the
 * pointer crossed the edge, exits the opposite way. Per Awwwards
 * classic; uses CSS vars set in pointer handlers so animation runs on
 * the compositor, not the React render cycle.
 */
export function HoverFillButton({
  children,
  className = "",
  rest = "bottom",
  ...rest_
}: Props) {
  const ref = useRef<HTMLButtonElement | null>(null);

  const computeSide = useCallback((e: React.PointerEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 2 - 1;
    const y = ((e.clientY - r.top) / r.height) * 2 - 1;
    return Math.abs(x) > Math.abs(y) ? (x > 0 ? "right" : "left") : y > 0 ? "bottom" : "top";
  }, []);

  const setVars = useCallback((side: "top" | "right" | "bottom" | "left" | null) => {
    const el = ref.current;
    if (!el) return;
    const map = { top: ["0%", "-100%"], right: ["100%", "0%"], bottom: ["0%", "100%"], left: ["-100%", "0%"] } as const;
    const k = side ?? rest;
    el.style.setProperty("--fx", map[k][0]);
    el.style.setProperty("--fy", map[k][1]);
  }, [rest]);

  const onEnter = useCallback((e: React.PointerEvent<HTMLButtonElement>) => {
    setVars(computeSide(e));
  }, [computeSide, setVars]);

  const onLeave = useCallback((e: React.PointerEvent<HTMLButtonElement>) => {
    const side = computeSide(e);
    const opposite = { top: "bottom", bottom: "top", left: "right", right: "left" } as const;
    setVars(side ? opposite[side] : rest);
  }, [computeSide, setVars, rest]);

  return (
    <button
      {...rest_}
      ref={ref}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      className={`fill-btn ${className}`}
      style={{ ["--fx" as string]: "0%", ["--fy" as string]: "100%" }}
    >
      <span className="fill-bg" aria-hidden />
      <span className="fill-label relative inline-flex items-center gap-3">{children}</span>
    </button>
  );
}
