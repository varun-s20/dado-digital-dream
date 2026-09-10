"use client";

import { Button } from "@/components/ui/button";
import { DragList } from "./DragList";

type Props<T extends { id: string }> = {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  onReorder: (from: number, to: number) => void;
  label: (index: number) => string;
};

/**
 * A fixed-length list, reordered by dragging the handle in each row's header.
 *
 * The ↑/↓ buttons stay: they are the keyboard-reachable path, which a pointer
 * gesture cannot replace.
 *
 * Keyed by `item.id`, not index: renderItem's inputs are often uncontrolled
 * (`form.register(...)`), so on move() an index key lets React reuse the same
 * DOM node for a different array element and the uncontrolled input keeps its
 * stale text while any controlled sibling (e.g. an ImageSlot on `watch`)
 * updates instantly — the row visibly mismatches until save/discard. Every
 * caller already passes `fields` from `useFieldArray`, which carries a stable
 * generated `id`, so keying on it costs nothing at the call sites.
 */
export function SlotList<T extends { id: string }>({ items, renderItem, onReorder, label }: Props<T>) {
  return (
    <DragList
      items={items}
      itemKey={(item) => item.id}
      onReorder={onReorder}
      className="space-y-6"
      itemClassName="rounded border border-border p-4"
      renderItem={(item, i, handle) => (
        <>
          <div className="mb-3 flex items-center gap-2">
            <span
              {...handle}
              aria-hidden
              title="Drag to reorder"
              className="select-none text-muted-foreground/70 transition-colors hover:text-foreground"
            >
              ⠿
            </span>
            <span className="eyebrow flex-1 text-muted-foreground">{label(i)}</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              aria-label={`Move ${label(i)} up`}
              disabled={i === 0}
              onClick={() => onReorder(i, i - 1)}
            >
              ↑
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              aria-label={`Move ${label(i)} down`}
              disabled={i === items.length - 1}
              onClick={() => onReorder(i, i + 1)}
            >
              ↓
            </Button>
          </div>
          {renderItem(item, i)}
        </>
      )}
    />
  );
}
