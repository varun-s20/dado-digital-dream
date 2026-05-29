"use client";

import { useEffect, useState } from "react";
import { brand } from "@/lib/brand";

export function Loader() {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setGone(true), 2750);
    return () => clearTimeout(t);
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden
      className="loader-curtain fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ background: "var(--surface-deep)", color: "var(--surface-deep-foreground)" }}
    >
      <div className="flex items-baseline font-display text-6xl leading-none md:text-7xl">
        <span className="loader-mask">
          <span>B</span>
        </span>
        <span className="loader-mask is-down">
          <span>M</span>
        </span>
        <span className="loader-mask" style={{ marginLeft: "-0.05em" }}>
          <span>.</span>
        </span>
      </div>
      <span
        className="eyebrow mt-6 opacity-70 loader-mask"
        style={{ display: "block" }}
      >
        <span>{brand.tagline}</span>
      </span>
    </div>
  );
}
