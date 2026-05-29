"use client";

import Link from "next/link";
import { useCallback, useRef } from "react";

type Props = {
  href: string;
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  /** Label shown inside the cursor pill on hover. */
  label?: string;
  width?: number;
  height?: number;
};

/**
 * Project image with a cursor-following "View" pill. The pill scales
 * from 0 on enter and tracks the pointer with translate3d via CSS
 * custom properties (no React re-renders, kept at 60fps).
 */
export function ProjectTile({
  href,
  src,
  alt,
  className = "",
  imgClassName = "aspect-[4/5] w-full object-cover",
  label = "View",
  width,
  height,
}: Props) {
  const stageRef = useRef<HTMLAnchorElement | null>(null);
  const pillRef = useRef<HTMLSpanElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const move = useCallback((e: React.PointerEvent<HTMLAnchorElement>) => {
    const stage = stageRef.current;
    const pill = pillRef.current;
    if (!stage || !pill) return;
    const r = stage.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      pill.style.setProperty("--cx", `${x}px`);
      pill.style.setProperty("--cy", `${y}px`);
    });
  }, []);

  const enter = useCallback(() => {
    pillRef.current?.style.setProperty("--cs", "1");
  }, []);

  const leave = useCallback(() => {
    pillRef.current?.style.setProperty("--cs", "0");
  }, []);

  return (
    <Link
      ref={stageRef}
      href={href}
      className={`cursor-stage img-zoom block ${className}`}
      onPointerEnter={enter}
      onPointerMove={move}
      onPointerLeave={leave}
    >
      <img src={src} alt={alt} loading="lazy" width={width} height={height} className={imgClassName} />
      <span ref={pillRef} className="cursor-pill" aria-hidden>
        {label}
      </span>
    </Link>
  );
}
