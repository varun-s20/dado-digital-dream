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
      <span
        className="brand-logo brand-logo-reveal"
        role="img"
        aria-label={brand.fullName}
        style={{ width: 96, height: 96, transition: "none" }}
      />
      <span className="eyebrow loader-mask mt-7 opacity-70" style={{ display: "block" }}>
        <span>{brand.tagline}</span>
      </span>
    </div>
  );
}
