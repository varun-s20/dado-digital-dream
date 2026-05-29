"use client";

import Link from "next/link";
import { useCallback, useRef, type ComponentProps, type ReactNode } from "react";

type Props = Omit<ComponentProps<typeof Link>, "children"> & {
  children: ReactNode;
  /** Strength of the magnetic pull, 0–1. Default 0.18 — Emil-level subtle. */
  strength?: number;
  className?: string;
};

export function MagneticLink({ children, strength = 0.18, className = "", ...linkProps }: Props) {
  const wrapRef = useRef<HTMLAnchorElement | null>(null);
  const innerRef = useRef<HTMLSpanElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const apply = useCallback((mx: number, my: number) => {
    const inner = innerRef.current;
    if (!inner) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      inner.style.setProperty("--mx", `${mx}px`);
      inner.style.setProperty("--my", `${my}px`);
    });
  }, []);

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLAnchorElement>) => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      apply((e.clientX - cx) * strength, (e.clientY - cy) * strength);
    },
    [apply, strength],
  );

  const reset = useCallback(() => apply(0, 0), [apply]);

  return (
    <Link
      {...linkProps}
      ref={wrapRef}
      onPointerMove={onMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
      className={`magnetic arrow-link ${className}`}
    >
      <span ref={innerRef} className="magnetic-inner">
        {children}
      </span>
    </Link>
  );
}
