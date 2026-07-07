"use client";

import { useEffect, useRef, useState } from "react";

/* Inline pixelate→refine reveal for the Our Story chapters. On desktop hover
   a thumbnail slides in to the left of the title (shifting the title right,
   slide-reveal) and resolves from chunky pixels to the sharp photo, driven by
   a canvas (real nearest-neighbour pixelation, not a blur fake). Touch / no-
   hover devices render the title alone; reduced-motion snaps straight to sharp. */

const BACKING = 2; // fixed 2x backing store — no window read, no hydration drift

function PixelImage({
  src,
  w,
  h,
  active,
  reduced,
}: {
  src: string;
  w: number;
  h: number;
  active: boolean;
  reduced: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const offRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef(0);

  const render = (p: number) => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (!offRef.current) offRef.current = document.createElement("canvas");
    const off = offRef.current;
    const octx = off.getContext("2d");
    if (!octx) return;

    const W = canvas.width;
    const H = canvas.height;
    const e = 1 - Math.pow(1 - p, 3); // ease-out cubic
    const MIN = 5; // blocks across when fully pixelated
    const blocks = Math.max(1, Math.round(MIN + (W - MIN) * e));
    const bh = Math.max(1, Math.round((blocks * H) / W));

    // cover-fit the source into the tiny blocks×bh buffer, then blow it up
    const or = blocks / bh;
    let sw = img.width;
    let sh = img.height;
    let sx = 0;
    let sy = 0;
    if (img.width / img.height > or) {
      sw = img.height * or;
      sx = (img.width - sw) / 2;
    } else {
      sh = img.width / or;
      sy = (img.height - sh) / 2;
    }
    off.width = blocks;
    off.height = bh;
    octx.imageSmoothingEnabled = true;
    octx.clearRect(0, 0, blocks, bh);
    octx.drawImage(img, sx, sy, sw, sh, 0, 0, blocks, bh);

    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, W, H);
    ctx.drawImage(off, 0, 0, blocks, bh, 0, 0, W, H);
  };

  // load once
  useEffect(() => {
    const img = new Image();
    img.src = src;
    const onLoad = () => {
      imgRef.current = img;
      render(reduced ? 1 : 0.001);
    };
    if (img.complete) onLoad();
    else img.onload = onLoad;
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  // animate on hover in/out
  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    if (reduced) {
      render(1);
      return;
    }
    const DUR = 520;
    let start = 0;
    const tick = (t: number) => {
      if (!start) start = t;
      const raw = Math.min(1, (t - start) / DUR);
      render(Math.max(0.001, active ? raw : 1 - raw));
      if (raw < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
    // re-run on w/h so a resize redraws the (now-cleared) canvas
  }, [active, reduced, w, h]);

  return (
    <canvas
      ref={canvasRef}
      width={Math.max(1, Math.round(w * BACKING))}
      height={Math.max(1, Math.round(h * BACKING))}
      style={{ width: w, height: h, display: "block" }}
    />
  );
}

export function StoryChapter({
  index,
  kicker,
  text,
  img,
  side = "left",
}: {
  index: string;
  kicker: string;
  text: string;
  img: string;
  side?: "left" | "right";
}) {
  const [hoverable, setHoverable] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [active, setActive] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHoverable(window.matchMedia("(hover: hover) and (pointer: fine)").matches);

    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Thumb spans the text block height (a uniform min-height on the content
  // div below keeps every chapter's box — and so every thumb — the same
  // size, regardless of how much its own kicker/paragraph wrap).
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const h = el.offsetHeight;
      setBox({ h, w: Math.round(h * 1.8) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const thumb = hoverable && box.h > 0 && (
    <span
      aria-hidden
      className="shrink-0 overflow-hidden rounded-[3px]"
      style={{
        width: active ? box.w : 0,
        marginRight: side === "left" && active ? 32 : 0,
        marginLeft: side === "right" && active ? 32 : 0,
        transition: "width .55s var(--ease-out-expo), margin .55s var(--ease-out-expo)",
      }}
    >
      <PixelImage src={img} w={box.w} h={box.h} active={active} reduced={reduced} />
    </span>
  );

  const content = (
    <div ref={contentRef} className="min-h-[180px] max-w-xl text-center md:min-h-[230px]">
      <p className="eyebrow tabular-nums text-accent">Chapter {index}</p>
      <h3 className="mt-5 font-display font-light leading-[1.14] tracking-[-0.025em] text-[clamp(1.5rem,3.2vw,2.15rem)]">
        {kicker}
      </h3>
      <p className="mx-auto mt-5 max-w-md text-base leading-relaxed tracking-[-0.01em] text-muted-foreground">
        {text}
      </p>
    </div>
  );

  return (
    <div
      className="flex items-center justify-center"
      onMouseEnter={hoverable ? () => setActive(true) : undefined}
      onMouseLeave={hoverable ? () => setActive(false) : undefined}
    >
      {side === "left" ? (
        <>
          {thumb}
          {content}
        </>
      ) : (
        <>
          {content}
          {thumb}
        </>
      )}
    </div>
  );
}
