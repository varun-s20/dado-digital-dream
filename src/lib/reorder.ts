/**
 * Move one item to a new index, returning a new array.
 *
 * Shared by every reorder surface in the admin (project list, gallery, slot
 * lists) so the index arithmetic exists once. Getting it wrong is quiet: the
 * list still renders, it is just in the wrong order, and on the project list
 * that order is what the public site publishes.
 *
 * Out-of-range indices return the list unchanged rather than throwing or
 * inserting undefined — a drag can end anywhere, including nowhere.
 */
export function moveItem<T>(list: readonly T[], from: number, to: number): T[] {
  if (
    from === to ||
    from < 0 ||
    to < 0 ||
    from >= list.length ||
    to >= list.length ||
    !Number.isInteger(from) ||
    !Number.isInteger(to)
  ) {
    return [...list];
  }
  const next = [...list];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next;
}
