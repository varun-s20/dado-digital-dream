import { brand } from "@/lib/brand";

export function BrandMark({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const cls = size === "sm" ? "text-xl" : size === "lg" ? "text-4xl md:text-5xl" : "text-2xl md:text-[28px]";
  // Mark is "BM." — the period is animated separately on hover.
  const mark = brand.mark.replace(/\.$/, "");
  return (
    <span className={`brand-mark font-display tracking-tight ${cls}`}>
      <span>{mark}</span>
      <span className="dot">.</span>
    </span>
  );
}
