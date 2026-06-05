/**
 * Projects gallery data.
 *
 * ── Replacing the placeholder photography ───────────────────────────────
 * Every `img` below currently cycles the small set of photos already in
 * `/public/images`. To ship real work, drop the project photos into
 * `/public/images/projects/` and point each `img` at them — nothing else
 * needs to change. Keep a spread of `size` values ("sm" | "wide" | "tall"
 * | "lg") so the mosaic stays lively, and tag each item with the
 * `categories` it should appear under.
 */

export type GallerySize = "sm" | "wide" | "tall" | "lg";

export type GalleryItem = {
  id: string;
  title: string;
  location: string;
  /** Categories this item is filed under (drives the filter bar). */
  categories: string[];
  img: string;
  size: GallerySize;
  /** object-position for the crop; lets a reused photo read differently. */
  pos?: string;
  /** Explicit slug; falls back to a kebab-cased title when omitted. */
  slug?: string;
  /** Optional hand-written intro line; otherwise one is generated. */
  summary?: string;
  /** Optional explicit completion year; otherwise derived. */
  year?: number;
};

/** Filter chips, in display order. "All" is prepended in the UI. */
export const CATEGORIES = [
  "Pools",
  "Gardens",
  "Carpentry",
  "Courtyards",
  "Coastal",
] as const;

// Photo pool — grouped by what reads best per category. Replace with real files.
const POOL = ["/images/ph-pool-sunset.jpg", "/images/project-4.jpg"];
const GARDEN = [
  "/images/ph-forest.jpg",
  "/images/ph-seedlings.jpg",
  "/images/ph-raised-bed.jpg",
  "/images/project-2.jpg",
];
const TIMBER = [
  "/images/ph-timber-house.jpg",
  "/images/studio.jpg",
  "/images/project-1.jpg",
  "/images/project-3.jpg",
];
const COAST = ["/images/project-2.jpg", "/images/ph-pool-sunset.jpg", "/images/hero.jpg"];

export const galleryItems: GalleryItem[] = [
  { id: "g01", title: "Mosman Deck", location: "Mosman, Sydney", categories: ["Carpentry"], img: TIMBER[2], size: "lg", slug: "mosman-deck", year: 2026, summary: "A north-facing deck cantilevered over an existing sandstone retaining wall — built in spotted gum, designed to weather to silver with the harbour light." },
  { id: "g02", title: "Balmoral Pool", location: "Balmoral, Sydney", categories: ["Pools", "Coastal"], img: POOL[0], size: "tall" },
  { id: "g03", title: "Clovelly Courtyard", location: "Clovelly, Sydney", categories: ["Courtyards", "Gardens"], img: GARDEN[2], size: "sm" },
  { id: "g04", title: "Bundeena Steps", location: "Bundeena, NSW", categories: ["Gardens", "Coastal"], img: GARDEN[3], size: "wide", slug: "bundeena-steps", year: 2025, summary: "Forty-two sandstone treads cut into a coastal slope, threaded through endemic banksia and tea-tree, holding a path to the water that wasn't there a year ago." },
  { id: "g05", title: "Fairlight Pergola", location: "Fairlight, Sydney", categories: ["Carpentry"], img: TIMBER[3], size: "tall", slug: "fairlight-pergola", year: 2025, summary: "A 9-metre pergola of laminated blackbutt and 6mm steel plate — sized to the width of the rear elevation, detailed to disappear when seen from the kitchen window." },
  { id: "g06", title: "Bowral Pool", location: "Bowral, Highlands", categories: ["Pools"], img: POOL[1], size: "wide", slug: "bowral-pool", year: 2024, summary: "A black-bottomed lap pool wrapped in spotted gum, set into a clipped hornbeam hedge — designed to read as a still pond in late afternoon light." },
  { id: "g07", title: "Palm Beach Pavilion", location: "Palm Beach, Sydney", categories: ["Carpentry", "Coastal"], img: TIMBER[0], size: "sm" },
  { id: "g08", title: "Bronte Garden", location: "Bronte, Sydney", categories: ["Gardens"], img: GARDEN[0], size: "sm", pos: "center 40%" },
  { id: "g09", title: "Kiama Boardwalk", location: "Kiama, South Coast", categories: ["Carpentry", "Coastal"], img: TIMBER[1], size: "lg" },
  { id: "g10", title: "Vaucluse Terrace", location: "Vaucluse, Sydney", categories: ["Courtyards"], img: TIMBER[2], size: "sm", pos: "center 70%" },
  { id: "g11", title: "Coogee Plunge Pool", location: "Coogee, Sydney", categories: ["Pools", "Coastal"], img: POOL[0], size: "wide", pos: "center 60%" },
  { id: "g12", title: "Berry Kitchen Garden", location: "Berry, South Coast", categories: ["Gardens"], img: GARDEN[1], size: "sm" },
  { id: "g13", title: "Cremorne Screen", location: "Cremorne, Sydney", categories: ["Carpentry"], img: TIMBER[3], size: "sm", pos: "center 30%" },
  { id: "g14", title: "Avalon Garden Room", location: "Avalon, Sydney", categories: ["Carpentry", "Gardens"], img: TIMBER[0], size: "lg", pos: "center 55%" },
  { id: "g15", title: "Jervis Bay Retreat", location: "Jervis Bay, South Coast", categories: ["Gardens", "Coastal"], img: COAST[0], size: "tall" },
  { id: "g16", title: "Northbridge Courtyard", location: "Northbridge, Sydney", categories: ["Courtyards"], img: TIMBER[2], size: "sm" },
  { id: "g17", title: "Whale Beach Pool", location: "Whale Beach, Sydney", categories: ["Pools", "Coastal"], img: POOL[1], size: "tall", pos: "center 40%" },
  { id: "g18", title: "Seaforth Seedling Beds", location: "Seaforth, Sydney", categories: ["Gardens"], img: GARDEN[1], size: "wide" },
  { id: "g19", title: "Gerringong Deck", location: "Gerringong, South Coast", categories: ["Carpentry", "Coastal"], img: TIMBER[1], size: "sm" },
  { id: "g20", title: "Bellevue Hill Garden", location: "Bellevue Hill, Sydney", categories: ["Gardens", "Courtyards"], img: GARDEN[2], size: "sm", pos: "center 35%" },
  { id: "g21", title: "Cronulla Lap Pool", location: "Cronulla, Sydney", categories: ["Pools", "Coastal"], img: POOL[0], size: "sm" },
  { id: "g22", title: "Newport Pergola", location: "Newport, Sydney", categories: ["Carpentry"], img: TIMBER[3], size: "tall", pos: "center 60%" },
  { id: "g23", title: "Huskisson Boardwalk", location: "Huskisson, South Coast", categories: ["Carpentry", "Coastal"], img: COAST[2], size: "lg" },
  { id: "g24", title: "Pittwater Terrace", location: "Pittwater, Sydney", categories: ["Courtyards", "Coastal"], img: TIMBER[0], size: "sm", pos: "center 45%" },
  { id: "g25", title: "Manly Plunge", location: "Manly, Sydney", categories: ["Pools", "Coastal"], img: POOL[1], size: "lg" },
  { id: "g26", title: "Berry Meadow", location: "Berry, South Coast", categories: ["Gardens"], img: GARDEN[0], size: "tall" },
  { id: "g27", title: "Cremorne Deck", location: "Cremorne, Sydney", categories: ["Carpentry"], img: TIMBER[2], size: "sm", pos: "center 30%" },
  { id: "g28", title: "Bronte Courtyard", location: "Bronte, Sydney", categories: ["Courtyards"], img: TIMBER[3], size: "wide", pos: "center 50%" },
  { id: "g29", title: "Avalon Pool", location: "Avalon, Sydney", categories: ["Pools", "Coastal"], img: POOL[0], size: "sm", pos: "center 30%" },
  { id: "g30", title: "Gerringong Garden", location: "Gerringong, South Coast", categories: ["Gardens", "Coastal"], img: GARDEN[3], size: "sm" },
  { id: "g31", title: "Mosman Garden Steps", location: "Mosman, Sydney", categories: ["Gardens", "Carpentry"], img: GARDEN[2], size: "lg", pos: "center 60%" },
  { id: "g32", title: "Coogee Courtyard", location: "Coogee, Sydney", categories: ["Courtyards", "Coastal"], img: TIMBER[0], size: "sm" },
  { id: "g33", title: "Kiama Pool House", location: "Kiama, South Coast", categories: ["Pools", "Carpentry", "Coastal"], img: TIMBER[1], size: "wide" },
  { id: "g34", title: "Vaucluse Beds", location: "Vaucluse, Sydney", categories: ["Gardens"], img: GARDEN[1], size: "sm", pos: "center 30%" },
  { id: "g35", title: "Seaforth Pavilion", location: "Seaforth, Sydney", categories: ["Carpentry"], img: TIMBER[3], size: "tall" },
  { id: "g36", title: "Jervis Bay Pool", location: "Jervis Bay, South Coast", categories: ["Pools", "Coastal"], img: POOL[1], size: "sm", pos: "center 65%" },
];

/* ── Per-project detail page helpers ──────────────────────────────────────
 * Every gallery item is also a project with its own page at /projects/[slug].
 * Where an item has no hand-written `summary`/`year`, tasteful copy and a
 * gallery are generated from its category + location so the page reads well.
 * Replace the generators with real content as projects come in.
 */

const kebab = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const num = (item: GalleryItem) => parseInt(item.id.replace(/\D/g, ""), 10) || 1;

export const projectSlug = (item: GalleryItem) => item.slug ?? kebab(item.title);

export const projectYear = (item: GalleryItem) => item.year ?? 2018 + (num(item) % 8);

export function getProject(slug: string): GalleryItem | undefined {
  return galleryItems.find((g) => projectSlug(g) === slug);
}

/** The next `n` projects after `slug`, wrapping around the list. */
export function getMoreProjects(slug: string, n = 3): GalleryItem[] {
  const start = galleryItems.findIndex((g) => projectSlug(g) === slug);
  const out: GalleryItem[] = [];
  for (let k = 1; out.length < n && k <= galleryItems.length; k++) {
    out.push(galleryItems[(start + k) % galleryItems.length]);
  }
  return out;
}

const SCOPE: Record<string, string[]> = {
  Pools: ["Pool design", "Construction", "Timber & stone surrounds"],
  Gardens: ["Landscape design", "Construction", "Planting"],
  Carpentry: ["Joinery & carpentry", "Steel fabrication", "Construction"],
  Courtyards: ["Design", "Paving & stonework", "Planting"],
  Coastal: ["Design", "Construction", "Planting"],
};

export const projectScope = (item: GalleryItem) =>
  SCOPE[item.categories[0]] ?? ["Design", "Construction"];

const CONTEXT = [
  (loc: string) =>
    `In ${loc}, the work began with the ground itself: its fall, its light, and the way the weather moves across it.`,
  (loc: string) =>
    `${loc} gave us a site with real character, and a client who wanted it handled with a light touch.`,
  (loc: string) =>
    `The project sits in ${loc}, where established trees and the outlook did much of the early design work for us.`,
  (loc: string) =>
    `Set in ${loc}, the brief asked for something that would feel settled and at home from the first season.`,
];

const APPROACH: Record<string, string[]> = {
  Pools: [
    "The pool is set low and quiet, its edge detailed to disappear so the water reads as part of the garden rather than an object placed in it.",
    "We wrapped the water in timber and stone chosen to weather gracefully, so the pool settles into the planting instead of standing apart from it.",
  ],
  Gardens: [
    "Planting was layered for year-round structure, dense enough to bind the soil in a single season, with room left to grow into.",
    "Existing canopy was protected to the millimetre, and new planting threaded around it so the garden feels established from the outset.",
  ],
  Carpentry: [
    "Every junction was resolved in the workshop first: concealed fixings, clean returns, and hardwood left to silver in the open air.",
    "The timber was rough-sawn, sanded and finished in oil rather than coated, so it ages honestly with the weather.",
  ],
  Courtyards: [
    "Paving, planting and shade were worked as a single move, so a small footprint reads as generous and calm.",
    "Level changes carve out room without walls, keeping the space open while quietly giving it edges.",
  ],
  Coastal: [
    "Materials were chosen for the salt and the wind, detailed to take the exposure and look the better for it over time.",
    "The layout holds a path to the water and shelter from the southerly, without ever closing off the view.",
  ],
};

/** Two short paragraphs: a hand-written or generated intro, then approach. */
export function projectDescription(item: GalleryItem): string[] {
  const cat = item.categories[0] ?? "Gardens";
  const intro = item.summary ?? CONTEXT[num(item) % CONTEXT.length](item.location);
  const approach = (APPROACH[cat] ?? APPROACH.Gardens)[num(item) % 2];
  return [intro, approach];
}

// Each project draws its supporting imagery from the pool that matches its
// primary subject, so a pool page shows water and a carpentry page shows
// timber. Pools are deliberately broad (7 photos each) so a curated gallery
// of five reads as five distinct views rather than the same shot repeated.
const ALL = [
  "/images/ph-pool-sunset.jpg",
  "/images/ph-forest.jpg",
  "/images/ph-seedlings.jpg",
  "/images/ph-raised-bed.jpg",
  "/images/ph-timber-house.jpg",
  "/images/studio.jpg",
  "/images/hero.jpg",
  "/images/project-1.jpg",
  "/images/project-2.jpg",
  "/images/project-3.jpg",
  "/images/project-4.jpg",
];

const CATEGORY_POOL: Record<string, string[]> = {
  Pools: ["/images/ph-pool-sunset.jpg", "/images/project-4.jpg", "/images/hero.jpg", "/images/project-2.jpg", "/images/ph-timber-house.jpg", "/images/project-1.jpg", "/images/ph-forest.jpg"],
  Gardens: ["/images/ph-forest.jpg", "/images/ph-seedlings.jpg", "/images/ph-raised-bed.jpg", "/images/project-2.jpg", "/images/hero.jpg", "/images/project-3.jpg", "/images/ph-timber-house.jpg"],
  Carpentry: ["/images/ph-timber-house.jpg", "/images/studio.jpg", "/images/project-1.jpg", "/images/project-3.jpg", "/images/project-4.jpg", "/images/ph-raised-bed.jpg", "/images/hero.jpg"],
  Courtyards: ["/images/ph-timber-house.jpg", "/images/project-1.jpg", "/images/ph-raised-bed.jpg", "/images/project-3.jpg", "/images/ph-seedlings.jpg", "/images/studio.jpg", "/images/project-2.jpg"],
  Coastal: ["/images/ph-pool-sunset.jpg", "/images/hero.jpg", "/images/project-2.jpg", "/images/ph-forest.jpg", "/images/project-4.jpg", "/images/ph-timber-house.jpg", "/images/ph-seedlings.jpg"],
};

/** Category-matched photos for a project, excluding its hero (and any extras). */
function categoryPhotos(item: GalleryItem, exclude: string[] = []): string[] {
  const pool = CATEGORY_POOL[item.categories[0]] ?? CATEGORY_POOL.Gardens;
  const skip = new Set([item.img, ...exclude]);
  const matched = Array.from(new Set([...pool, ...ALL])).filter((p) => !skip.has(p));
  return matched.length ? matched : Array.from(new Set(pool));
}

/** A single feature image for the info spread (distinct from the banner hero). */
export const projectFeature = (item: GalleryItem): string =>
  categoryPhotos(item)[0] ?? item.img;

/**
 * Five category-matched views for the project's curated gallery — distinct
 * from both the banner hero and the feature image above. Deterministic per
 * project (seeded off its id) so the same page always reads the same way.
 */
export function projectImages(item: GalleryItem, count = 5): string[] {
  const photos = categoryPhotos(item, [projectFeature(item)]);
  const start = num(item) % photos.length;
  return Array.from({ length: count }, (_, k) => photos[(start + k) % photos.length]);
}
