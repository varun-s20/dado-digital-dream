import type { CSSProperties } from "react";

export type PolaroidSide = "left" | "right";

/**
 * Two snapshots stacked and tilted like photos pulled from a shoebox — the
 * back print peeks out toward the page edge, the front sits on top with a
 * strip of tape and settles flat + lifts on hover. Purely decorative; used
 * to flank each "Our story" chapter so the side gutters read as a trip down
 * memory lane rather than empty margin.
 *
 * `photos` is `[front, back]`; `tilt` is `[frontDeg, backDeg]`.
 */
export function PolaroidStack({
  photos,
  tilt,
  side,
}: {
  photos: readonly [string, string];
  tilt: readonly [number, number];
  side: PolaroidSide;
}) {
  const [front, back] = photos;
  return (
    <div className={`polaroid-stack polaroid-stack-${side}`} aria-hidden>
      <div
        className="polaroid polaroid-back"
        style={{ "--r": `${tilt[1]}deg` } as CSSProperties}
      >
        <img src={back} alt="" loading="lazy" />
      </div>
      <div
        className="polaroid polaroid-front"
        style={{ "--r": `${tilt[0]}deg` } as CSSProperties}
      >
        <span className="polaroid-tape" aria-hidden />
        <img src={front} alt="" loading="lazy" />
      </div>
    </div>
  );
}
