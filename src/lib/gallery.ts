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
  /** Optional project-specific custom gallery images/videos. */
  images?: string[];
  /** Optional custom feature image for the editorial spread. */
  featureImg?: string;
  /** Optional hand-written scope-of-work lines; otherwise derived from category. */
  scope?: string[];
};

/** Filter chips, in display order. "All" is prepended in the UI. */
export const CATEGORIES = ["Pools", "Gardens", "Carpentry", "Courtyards", "Coastal"] as const;

export const galleryItems: GalleryItem[] = [
  {
    id: "g01",
    title: "Kiama Boardwalk",
    location: "Kiama, South Coast",
    categories: ["Carpentry", "Coastal"],
    img: "/images/earlwood-3.webp",
    size: "lg",
  },
  {
    id: "g02",
    title: "Campsie Deck & Garden",
    location: "Campsie, Sydney",
    categories: ["Carpentry", "Gardens"],
    img: "/images/campsie-2.webp",
    size: "sm",
    slug: "campsie",
    year: 2026,
    summary:
      "An integrated timber deck and stair installation featuring custom-engineered drainage systems and structural planter boxes built to border the outdoor area.",
  },
  {
    id: "g03",
    title: "Bronte Courtyard",
    location: "Bronte, Sydney",
    categories: ["Courtyards", "Gardens"],
    img: "/images/campsie-4.webp",
    size: "wide",
  },
  {
    id: "g04",
    title: "Mosman Deck Details",
    location: "Mosman, Sydney",
    categories: ["Carpentry"],
    img: "/images/earlwood-1.webp",
    size: "tall",
  },
  {
    id: "g05",
    title: "Balmoral Poolside",
    location: "Balmoral, Sydney",
    categories: ["Pools", "Coastal"],
    img: "/images/campsie-3.webp",
    size: "wide",
  },
  {
    id: "g06",
    title: "Palm Beach Pergola",
    location: "Palm Beach, Sydney",
    categories: ["Carpentry", "Coastal"],
    img: "/images/studio-1.webp",
    size: "sm",
  },
  {
    id: "g07",
    title: "Vaucluse Garden Walkway",
    location: "Vaucluse, Sydney",
    categories: ["Gardens"],
    img: "/images/avalon-3.webp",
    size: "sm",
    pos: "center 40%",
  },
  {
    id: "g08",
    title: "Avalon Beach Stairs",
    location: "Avalon Beach, Sydney",
    categories: ["Gardens", "Coastal"],
    img: "/images/avalon-1.webp",
    size: "sm",
    slug: "avalon-beach",
    year: 2026,
    summary:
      "Bespoke carpentry and garden engineering featuring closed stringer stairs, curved steps, structural retaining walls, and raised timber garden beds.",
  },
  {
    id: "g09",
    title: "Clovelly Terraces",
    location: "Clovelly, Sydney",
    categories: ["Courtyards"],
    img: "/images/avalon-4.webp",
    size: "sm",
    pos: "center 70%",
  },
  {
    id: "g10",
    title: "Coogee Garden Steps",
    location: "Coogee, Sydney",
    categories: ["Gardens", "Coastal"],
    img: "/images/avalon-2.webp",
    size: "wide",
    pos: "center 60%",
  },
  {
    id: "g11",
    title: "Berry Meadow Planters",
    location: "Berry, South Coast",
    categories: ["Gardens"],
    img: "/images/avalon-5.webp",
    size: "sm",
  },
  {
    id: "g12",
    title: "Cremorne Timber Wall",
    location: "Cremorne, Sydney",
    categories: ["Carpentry"],
    img: "/images/studio-2.webp",
    size: "sm",
    pos: "center 30%",
  },
  {
    id: "g13",
    title: "Avalon Screen",
    location: "Avalon Beach, Sydney",
    categories: ["Carpentry", "Gardens"],
    img: "/images/avalon-6.webp",
    size: "lg",
    pos: "center 55%",
  },
  {
    id: "g14",
    title: "Jervis Bay Decking",
    location: "Jervis Bay, South Coast",
    categories: ["Gardens", "Coastal"],
    img: "/images/earlwood-2.webp",
    size: "tall",
  },
  {
    id: "g15",
    title: "Northbridge Courtyard",
    location: "Northbridge, Sydney",
    categories: ["Courtyards"],
    img: "/images/campsie-1.webp",
    size: "sm",
  },
  {
    id: "g16",
    title: "Earlwood Deck & Garden",
    location: "Earlwood, Sydney",
    categories: ["Carpentry", "Gardens"],
    img: "/images/earlwood-home-cover.webp",
    size: "lg",
    slug: "earlwood",
    year: 2026,
    summary:
      "A full carpentry-led rebuild across three terraced levels: structural framing, vertical timber cladding, hand-laid hardwood decking and zoned garden planting, built and planted by one crew from first dig to final coat.",
  },
  {
    id: "g17",
    title: "Paddington Courtyard",
    location: "Paddington, Sydney",
    categories: ["Courtyards", "Carpentry"],
    // ponytail: placeholder photo — swap for real Paddington site photography once supplied
    img: "/images/from-live-site/live-site-4-hero.webp",
    size: "wide",
    slug: "paddington",
  },
];

/* ── Per-project detail page helpers ────────────────────────────────────── */

const kebab = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const num = (item: GalleryItem) => parseInt(item.id.replace(/\D/g, ""), 10) || 1;

export const projectSlug = (item: GalleryItem) => item.slug ?? kebab(item.title);

/** The authored completion year, or undefined. Never derived — a made-up year
 *  on a real job is a false claim, and it is indistinguishable from a true one
 *  once stored. */
export const projectYear = (item: GalleryItem): number | undefined => item.year;

export function getProject(slug: string): GalleryItem | undefined {
  return galleryItems.find((g) => projectSlug(g) === slug);
}

/** The next `n` projects after `slug`, wrapping around the list. */
export function getMoreProjects(items: GalleryItem[], slug: string, n = 3): GalleryItem[] {
  const start = items.findIndex((g) => projectSlug(g) === slug);
  const out: GalleryItem[] = [];
  for (let k = 1; out.length < n && k <= items.length; k++) {
    const item = items[(start + k) % items.length];
    if (item) out.push(item);
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
  item.scope && item.scope.length > 0
    ? item.scope
    : (SCOPE[item.categories[0] ?? "Gardens"] ?? ["Design", "Construction"]);

/**
 * The project's description, exactly as written in the admin — split into
 * paragraphs on blank lines. Empty when nothing was written: the page then
 * shows no description rather than prose generated from the location and
 * category, which reads as a claim about a real job that nobody made.
 */
export function projectDescription(item: GalleryItem): string[] {
  return (item.summary ?? "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

/**
 * The project's feature image, or undefined when none was chosen.
 *
 * Not filled in from a shared pool: an absent feature photo renders as an
 * absent feature photo, so what the admin picked is what the site shows.
 */
export const projectFeature = (item: GalleryItem): string | undefined => item.featureImg;

/**
 * The project's gallery, exactly as chosen in the admin — no generated fill.
 *
 * An empty array is a valid, meaningful state: it means "this project has no
 * selected views yet", and the detail page omits the whole section rather than
 * inventing photos from other projects. Callers must handle 0..n, not assume a
 * fixed count.
 */
export function projectImages(item: GalleryItem): string[] {
  return item.images ?? [];
}
