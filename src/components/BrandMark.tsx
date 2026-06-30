import { brand } from "@/lib/brand";

const SIZES = { sm: 26, md: 34, lg: 52, xl: 72 } as const;

/**
 * The BMCL square monogram, rendered as a CSS-masked element so it inherits
 * the current text colour (white on dark surfaces, ink on light) and warms to
 * brand orange on hover. `withName` appends the uppercase wordmark lockup.
 */
export function BrandMark({
  size = "md",
  withName = false,
  className = "",
}: {
  size?: keyof typeof SIZES;
  withName?: boolean;
  className?: string;
}) {
  const px = SIZES[size];
  const mark = (
    <span
      className="brand-logo"
      role="img"
      aria-label={brand.fullName}
      style={{ width: px, height: px }}
    />
  );

  if (!withName) return <span className={`brand-mark ${className}`}>{mark}</span>;

  return (
    <span className={`brand-mark flex items-center gap-3.5 ${className}`}>
      {mark}
      <span className="flex flex-col leading-[1.05]">
        <span className="font-display text-[0.95rem] font-medium tracking-[0.02em]">
          BM Carpentry
        </span>
        <span className="eyebrow text-[0.62rem] opacity-60">&amp; Landscaping</span>
      </span>
    </span>
  );
}
