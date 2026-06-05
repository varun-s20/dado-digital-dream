"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  alt: string;
  /** Wrapper classes — aspect ratio, masonry break rules, background. */
  className?: string;
  loading?: "lazy" | "eager";
  style?: React.CSSProperties;
};

/**
 * Image that fades + settles in once it has actually loaded. The reveal is
 * keyed to the image's own load event (which always fires) rather than a
 * scroll observer, so an image is never stranded behind its grey skeleton.
 * It always fills its box (absolute inset-0 + object-cover). A restrained
 * hover zoom finishes it. CSS-only motion: transform / opacity. (emil.)
 */
export function RevealImage({ src, alt, className = "", loading = "lazy", style }: Props) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Covers cached images whose `load` fires before hydration attaches it.
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  return (
    <figure className={`reveal-shot ${className}`} data-loaded={loaded} style={style}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        onLoad={() => setLoaded(true)}
      />
    </figure>
  );
}
