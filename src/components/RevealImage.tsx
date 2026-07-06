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
  const isVideo = src.endsWith(".mp4");
  const imgRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (isVideo) {
      if (videoRef.current && videoRef.current.readyState >= 2) {
        setLoaded(true);
      }
    } else {
      if (imgRef.current?.complete) setLoaded(true);
    }
  }, [isVideo]);

  return (
    <figure className={`reveal-shot ${className}`} data-loaded={loaded} style={style}>
      {isVideo ? (
        <video
          ref={videoRef}
          src={src}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setLoaded(true)}
          className="absolute inset-0 h-full w-full object-cover"
          aria-label={alt}
        />
      ) : (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          onLoad={() => setLoaded(true)}
        />
      )}
    </figure>
  );
}
