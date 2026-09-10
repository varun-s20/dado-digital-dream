import { test } from "node:test";
import assert from "node:assert/strict";
import { moveItem } from "../src/lib/reorder.ts";

const L = ["a", "b", "c", "d", "e"];

test("moves an item forwards, closing the gap behind it", () => {
  assert.deepEqual(moveItem(L, 0, 3), ["b", "c", "d", "a", "e"]);
});

test("moves an item backwards", () => {
  assert.deepEqual(moveItem(L, 4, 1), ["a", "e", "b", "c", "d"]);
});

test("adjacent swaps match what the arrow buttons used to do", () => {
  assert.deepEqual(moveItem(L, 2, 1), ["a", "c", "b", "d", "e"]);
  assert.deepEqual(moveItem(L, 2, 3), ["a", "b", "d", "c", "e"]);
});

test("moving to the same index is a no-op", () => {
  assert.deepEqual(moveItem(L, 2, 2), L);
});

test("out-of-range indices leave the list intact — a drag can end nowhere", () => {
  for (const [from, to] of [
    [-1, 2],
    [2, -1],
    [5, 1],
    [1, 5],
    [0, 99],
  ]) {
    assert.deepEqual(moveItem(L, from, to), L, `moveItem(${from}, ${to})`);
  }
});

test("never mutates the input", () => {
  const original = [...L];
  moveItem(L, 0, 4);
  assert.deepEqual(L, original);
});

test("every item survives the move — nothing dropped or duplicated", () => {
  for (let from = 0; from < L.length; from++) {
    for (let to = 0; to < L.length; to++) {
      const out = moveItem(L, from, to);
      assert.equal(out.length, L.length, `length at ${from}->${to}`);
      assert.deepEqual([...out].sort(), [...L].sort(), `members at ${from}->${to}`);
    }
  }
});
