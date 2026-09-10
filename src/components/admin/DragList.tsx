"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";

type Props<T> = {
  items: T[];
  /** Stable key per item — never the index, see SlotList's note on why. */
  itemKey: (item: T, index: number) => string;
  onReorder: (from: number, to: number) => void;
  /**
   * `handle` must be spread onto whatever starts the drag. Put it on a grab
   * handle rather than the whole row: the rows contain inputs and buttons that
   * still need their own pointer events.
   */
  renderItem: (
    item: T,
    index: number,
    handle: React.HTMLAttributes<HTMLElement> & { style: React.CSSProperties },
  ) => React.ReactNode;
  /** Container classes — works for a vertical list or a wrapping grid. */
  className?: string;
  itemClassName?: string;
};

/**
 * Reorder by dragging, for both the vertical slot lists and the gallery grid.
 *
 * Pointer Events, not HTML5 drag-and-drop: HTML5 DnD does not fire on touch at
 * all, so an iPad admin would be left with no way to reorder. Pointer events
 * cover mouse, touch and pen from one code path.
 *
 * Movement is animated with FLIP — measure before, measure after, then play the
 * difference back as a transform — so rows slide to their new places instead of
 * teleporting. The dragged element follows the pointer directly and is exempt.
 *
 * No drag-and-drop library: this is ~100 lines and adds nothing to the public
 * bundle, where none of it ships.
 */
export function DragList<T>({
  items,
  itemKey,
  onReorder,
  renderItem,
  className = "",
  itemClassName = "",
}: Props<T>) {
  const containerRef = useRef<HTMLUListElement>(null);
  const [dragging, setDragging] = useState<number | null>(null);
  const [over, setOver] = useState<number | null>(null);
  const offset = useRef({ x: 0, y: 0 });
  const start = useRef({ x: 0, y: 0 });
  const rects = useRef<Map<string, DOMRect>>(new Map());

  const nodes = useCallback(
    () =>
      Array.from(containerRef.current?.children ?? []).filter(
        (el): el is HTMLElement => el instanceof HTMLElement,
      ),
    [],
  );

  // FLIP: replay the layout change as a transform so items slide into place.
  useLayoutEffect(() => {
    const els = nodes();
    els.forEach((el, i) => {
      const key = itemKey(items[i], i);
      const prev = rects.current.get(key);
      const next = el.getBoundingClientRect();
      if (prev && (prev.left !== next.left || prev.top !== next.top) && dragging === null) {
        el.style.transition = "none";
        el.style.transform = `translate(${prev.left - next.left}px, ${prev.top - next.top}px)`;
        requestAnimationFrame(() => {
          el.style.transition = "transform 260ms cubic-bezier(0.22, 1, 0.36, 1)";
          el.style.transform = "";
        });
      }
      rects.current.set(key, next);
    });
  });

  function beginDrag(index: number, e: React.PointerEvent) {
    // Left button / primary contact only — never a right-click or scroll.
    if (e.button !== 0) return;
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    start.current = { x: e.clientX, y: e.clientY };
    offset.current = { x: 0, y: 0 };
    setDragging(index);
    setOver(index);
  }

  function moveDrag(e: React.PointerEvent) {
    if (dragging === null) return;
    offset.current = { x: e.clientX - start.current.x, y: e.clientY - start.current.y };
    const el = nodes()[dragging];
    if (el) {
      el.style.transition = "none";
      el.style.transform = `translate(${offset.current.x}px, ${offset.current.y}px)`;
    }
    // Whichever row's box the pointer is inside becomes the drop target.
    const target = nodes().findIndex((n, i) => {
      if (i === dragging) return false;
      const r = n.getBoundingClientRect();
      return e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    });
    setOver(target === -1 ? dragging : target);
  }

  function endDrag() {
    if (dragging === null) return;
    const el = nodes()[dragging];
    if (el) {
      el.style.transition = "transform 220ms cubic-bezier(0.22, 1, 0.36, 1)";
      el.style.transform = "";
    }
    // Drop the measurements taken mid-drag, or FLIP replays the drag itself.
    rects.current.clear();
    const from = dragging;
    const to = over;
    setDragging(null);
    setOver(null);
    if (to !== null && to !== from) onReorder(from, to);
  }

  return (
    <ul ref={containerRef} className={className}>
      {/*
        react-hooks/refs flags this map because the component reads refs at all.
        Nothing below reads `.current` — every ref read happens in the layout
        effect or in a pointer handler, which is exactly where the rule wants
        them. FLIP cannot be written without measuring the DOM, so the rule has
        no version of this it would accept.
      */}
      {/* eslint-disable-next-line react-hooks/refs */}
      {items.map((item, i) => {
        const isDragging = dragging === i;
        const isOver = over === i && dragging !== null && dragging !== i;
        return (
          <li
            key={itemKey(item, i)}
            className={`${itemClassName} ${isOver ? "ring-2 ring-foreground/30" : ""}`}
            style={{
              zIndex: isDragging ? 30 : undefined,
              position: isDragging ? "relative" : undefined,
              opacity: isDragging ? 0.85 : 1,
              cursor: isDragging ? "grabbing" : undefined,
              touchAction: dragging !== null ? "none" : undefined,
            }}
            onPointerMove={moveDrag}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            {renderItem(item, i, {
              onPointerDown: (e: React.PointerEvent) => beginDrag(i, e),
              style: { cursor: dragging === null ? "grab" : "grabbing", touchAction: "none" },
              role: "button",
              tabIndex: -1,
              "aria-label": "Drag to reorder",
            } as React.HTMLAttributes<HTMLElement> & { style: React.CSSProperties })}
          </li>
        );
      })}
    </ul>
  );
}
