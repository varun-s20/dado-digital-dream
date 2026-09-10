"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MediaPicker } from "./MediaPicker";
import { DragList } from "./DragList";
import { moveItem } from "@/lib/reorder";

/**
 * Ordered list of gallery images.
 *
 * Empty is a valid, meaningful state: the project simply has no Selected views,
 * and the public page omits that whole section. Nothing is generated to fill it.
 */
export function GalleryEditor({
  value,
  onChange,
}: {
  value: string[];
  onChange: (next: string[]) => void;
}) {
  const [adding, setAdding] = useState(false);

  const move = (from: number, to: number) => onChange(moveItem(value, from, to));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label>Gallery ({value.length}/24)</Label>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={value.length >= 24}
          onClick={() => setAdding(true)}
        >
          Add photo
        </Button>
      </div>

      {value.length === 0 ? (
        <p className="rounded border border-dashed border-border p-4 text-sm text-muted-foreground">
          No photos chosen. The Selected views section will not appear on this project&rsquo;s page
          at all — add photos here to show it.
        </p>
      ) : (
        <p className="text-xs text-muted-foreground">
          Drag a photo by its handle to reorder. These are the only photos shown, in this order.
        </p>
      )}

      <DragList
        items={value}
        itemKey={(url, i) => `${url}-${i}`}
        onReorder={move}
        className="grid gap-3 sm:grid-cols-3"
        itemClassName="space-y-1 rounded"
        renderItem={(url, i, handle) => (
          <>
            <div
              {...handle}
              className="aspect-[4/3] overflow-hidden rounded border border-border bg-muted"
            >
              <img src={url} alt="" draggable={false} className="h-full w-full object-cover" />
            </div>
            <div className="flex items-center gap-1">
              <span className="flex-1 text-xs text-muted-foreground">{i + 1}</span>
              {/* Kept alongside dragging, not replaced by it: these are the
                  keyboard-reachable path to reordering. */}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                aria-label={`Move photo ${i + 1} earlier`}
                disabled={i === 0}
                onClick={() => move(i, i - 1)}
              >
                ←
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                aria-label={`Move photo ${i + 1} later`}
                disabled={i === value.length - 1}
                onClick={() => move(i, i + 1)}
              >
                →
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                aria-label={`Remove photo ${i + 1}`}
                onClick={() => onChange(value.filter((_, k) => k !== i))}
              >
                ✕
              </Button>
            </div>
          </>
        )}
      />

      <MediaPicker
        open={adding}
        onOpenChange={setAdding}
        onSelect={(row) => onChange([...value, row.url])}
      />
    </div>
  );
}
