import { useEffect, useState } from "react";

export function Loader() {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGone(true), 1900);
    return () => clearTimeout(t);
  }, []);
  if (gone) return null;
  return (
    <div
      aria-hidden
      className="loader-overlay fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: "var(--surface-deep)" }}
    >
      <div className="grid grid-cols-2 gap-1 text-[var(--surface-deep-foreground)]">
        <span className="font-display text-3xl leading-none">field</span>
        <span className="font-display text-3xl leading-none">craft</span>
      </div>
    </div>
  );
}
