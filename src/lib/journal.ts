export type JournalBlock =
  | { type: "p"; text: string; lead?: boolean }
  | { type: "h"; text: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "image"; src: string; alt: string; aspect: "wide" | "tall" | "square" }
  | { type: "list"; items: string[] };

export type JournalPost = {
  slug: string;
  date: string;
  /** ISO date, used for sorting + <time> */
  iso: string;
  read: string;
  title: string;
  /** Standfirst / dek shown under the title */
  dek: string;
  excerpt: string;
  tag: string;
  author: { name: string; role: string };
  hero: string;
  body: JournalBlock[];
};

export const posts: JournalPost[] = [
  {
    slug: "choosing-hardwoods-for-the-coast",
    date: "Apr 27, 2026",
    iso: "2026-04-27",
    read: "8 min",
    title: "Choosing hardwoods for the coast",
    dek: "Spotted gum, blackbutt, silvertop ash — what we reach for, why, and how each weathers in a salt environment over a decade.",
    excerpt:
      "Spotted gum, blackbutt, silvertop ash — what we reach for, why, and how each weathers in a salt environment over a decade.",
    tag: "Materials",
    author: { name: "Michael", role: "Co-Founder, Lead Carpenter" },
    hero: "/images/earlwood-1.webp",
    body: [
      {
        type: "p",
        lead: true,
        text: "Every coastal job begins with the same argument at the workbench. The client has seen a deck the colour of honey in a magazine and wants it to stay that way. We know that within two summers the salt, the UV and the southerly will have other ideas. So before we cut anything, we talk about time — because choosing a hardwood for the coast is really a decision about how you want to age.",
      },
      {
        type: "h",
        text: "The three we keep coming back to",
      },
      {
        type: "p",
        text: "There are dozens of durable Australian hardwoods, but on a salt-exposed site we narrow the field to three. Each earns its place for a different reason, and each weathers along its own curve. The job is matching the timber to the elevation it has to live on, not to the swatch the client first fell for.",
      },
      {
        type: "list",
        items: [
          "Spotted gum — dense, oily, and almost unreasonably hard. It silvers slowly and evenly, which makes it our default for anything that catches full afternoon sun.",
          "Blackbutt — paler, straighter-grained, and a touch more forgiving to work. It holds warmth longer before it greys, so we lean on it where the deck reads up against pale render.",
          "Silvertop ash — the quiet achiever. Less famous, more affordable, and surprisingly stable underfoot once it has settled into the salt.",
        ],
      },
      {
        type: "image",
        src: "/images/campsie-1.webp",
        alt: "Spotted gum decking boards stacked in the workshop, ends sealed",
        aspect: "wide",
      },
      {
        type: "quote",
        text: "Timber on the coast does not fail because it is the wrong species. It fails because nobody planned for the way it would change.",
        cite: "Michael",
      },
      {
        type: "h",
        text: "Detailing for the salt, not against it",
      },
      {
        type: "p",
        text: "The species matters less than the detailing around it. We seal end grain twice before a board ever leaves the bench, because the cut end is where water and salt walk straight into the heartwood. We hold boards clear of the ground, ventilate the underside, and fix with marine-grade stainless rather than anything that will bleed a tannin stain down the face within a season.",
      },
      {
        type: "p",
        text: "And we oil — we never coat. A film finish on a coastal deck is a slow promise to fail: it traps moisture, lifts at the edges, and leaves you sanding the whole thing back in five years. Oil lets the board breathe, weather honestly, and take a refresh coat in an afternoon rather than a fortnight.",
      },
      {
        type: "image",
        src: "/images/earlwood-3.webp",
        alt: "Detail of an oiled hardwood board weathering to silver-grey",
        aspect: "tall",
      },
      {
        type: "h",
        text: "What it looks like in ten years",
      },
      {
        type: "p",
        text: "Hand a client a sample board and a photo of a ten-year-old deck on the same elevation, and the conversation changes entirely. They stop choosing a colour and start choosing a character. That is the whole point. The best coastal timber is not the one that resists the weather — it is the one that wears it well.",
      },
    ],
  },
  {
    slug: "a-field-guide-to-native-grasses",
    date: "Feb 26, 2026",
    iso: "2026-02-26",
    read: "6 min",
    title: "A field guide to native grasses",
    dek: "The unsung backbone of a garden that ages well — Lomandra, Themeda, Poa and the three we plant in every coastal job.",
    excerpt:
      "The unsung backbone of a garden that ages well — Lomandra, Themeda, Poa and the three we plant in every coastal job.",
    tag: "Planting",
    author: { name: "Ben", role: "Co-Founder, Lead Landscaper" },
    hero: "/images/avalon-6.webp",
    body: [
      {
        type: "p",
        lead: true,
        text: "Nobody photographs the grasses. They photograph the tree, the wall, the water. But walk a garden that has settled beautifully into a decade and look down — the reason it reads as a place rather than a planting is almost always the grass layer holding everything together.",
      },
      {
        type: "h",
        text: "Why grasses do the quiet work",
      },
      {
        type: "p",
        text: "Native grasses are the connective tissue of an Australian garden. They knit the soil, soften every hard edge, catch low light, and move in a way nothing else in the bed can. They also ask for almost nothing once established — no staking, no feeding, a single cut-back a year. For a garden meant to age without a full-time gardener, they are not decoration. They are structure.",
      },
      {
        type: "image",
        src: "/images/avalon-2.webp",
        alt: "Native grasses catching low afternoon light along a sandstone path",
        aspect: "wide",
      },
      {
        type: "h",
        text: "The three we plant in every coastal job",
      },
      {
        type: "list",
        items: [
          "Lomandra 'Tanika' — the workhorse. Fine-leaved, tough as nails, equally at ease in a raised bed or binding a slope. It is the first thing we draw on a coastal plan.",
          "Themeda triandra (kangaroo grass) — for movement and that red-bronze flush in late summer. It wants sun and patience, and rewards both.",
          "Poa labillardierei — soft, blue-green, and architectural in mass. We plant it in drifts where we want the eye to slow down.",
        ],
      },
      {
        type: "quote",
        text: "A garden without grasses is a garden holding its breath. The moment a southerly comes through, you see which one is alive.",
        cite: "Ben",
      },
      {
        type: "h",
        text: "Plant dense, cut once, leave alone",
      },
      {
        type: "p",
        text: "The single most common mistake we undo is grasses planted too sparse, too far apart, mulched like shrubs and left to look lonely for three years. We plant dense — close enough that the clumps touch within a season and read as a continuous field. Then we cut them back hard once, in late winter, and otherwise leave them entirely alone.",
      },
      {
        type: "image",
        src: "/images/avalon-4.webp",
        alt: "A dense drift of Poa massed against a timber screen",
        aspect: "tall",
      },
      {
        type: "p",
        text: "Get the grass layer right and everything above it — the tree, the wall, the water you actually photograph — finally has something to belong to.",
      },
    ],
  },
  {
    slug: "why-we-build-pools-in-timber",
    date: "Nov 12, 2025",
    iso: "2025-11-12",
    read: "11 min",
    title: "Why we build pools in timber",
    dek: "On warmth, weathering, and pools that feel like furniture. Notes from the Bowral build and what we'd do differently next time.",
    excerpt:
      "On warmth, weathering, and pools that feel like furniture. Notes from the Bowral build and what we'd do differently next time.",
    tag: "Build",
    author: { name: "Michael", role: "Co-Founder, Lead Carpenter" },
    hero: "/images/earlwood-3.webp",
    body: [
      {
        type: "p",
        lead: true,
        text: "The conventional pool surround is a slab of stone or a field of pavers — cool, hard, and faintly municipal. We keep coming back to timber for the opposite reason: a pool wrapped in spotted gum stops feeling like infrastructure and starts feeling like furniture you happen to swim in.",
      },
      {
        type: "h",
        text: "Warmth you can stand on",
      },
      {
        type: "p",
        text: "The first argument is purely physical. Stone bakes; timber doesn't. On a still February afternoon the difference between a paver and an oiled hardwood board is the difference between hopping to the water and walking to it. Timber holds its temperature, drains fast, and gives underfoot in a way that makes the whole edge of the pool somewhere you want to linger.",
      },
      {
        type: "image",
        src: "/images/earlwood-3.webp",
        alt: "Black-bottomed lap pool wrapped in spotted gum decking at dusk",
        aspect: "wide",
      },
      {
        type: "h",
        text: "The Bowral build",
      },
      {
        type: "p",
        text: "The Bowral pool was the project that taught us the most. Twenty-one metres of lap pool, a black mineral-rendered shell, and a spotted gum deck that returns flush to a single-step bluestone coping. We wanted the water to read as a still pond at last light, and the timber to disappear into the clipped hornbeam behind it.",
      },
      {
        type: "quote",
        text: "We stopped designing a pool with a surround, and started designing a single timber plane that happened to hold water.",
        cite: "Michael",
      },
      {
        type: "p",
        text: "The detail that made it work was the fall. We ran the deck away from the coping on a 1:120 grade — invisible to the eye, but enough that water lifts off the surface and never pools against the end grain. It is the kind of decision nobody notices, which is exactly why it was worth the extra week.",
      },
      {
        type: "image",
        src: "/images/avalon-2.webp",
        alt: "Bluestone coping meeting flush spotted gum decking at the pool edge",
        aspect: "tall",
      },
      {
        type: "h",
        text: "What we'd do differently",
      },
      {
        type: "list",
        items: [
          "Specify the substructure in steel from the outset — we replaced a timber bearer mid-build once we modelled the long-term movement, and wished we'd drawn it that way first.",
          "Wider expansion gaps at the coping junction. Hardwood moves more than the client expects, and a hairline today is a finger-width in a dry March.",
          "Plan the refresh-oil access before planting the hedge. We boxed ourselves into a tight working margin we now regret every two years.",
        ],
      },
      {
        type: "p",
        text: "None of it changed our mind about the material. A timber pool asks more of you in the drawing and more of the client in the upkeep. In return it gives you an edge that ages, warms, and belongs — which a slab of stone, however beautiful, never quite manages.",
      },
    ],
  },
  {
    slug: "on-finishing-oil-not-coating",
    date: "Aug 03, 2025",
    iso: "2025-08-03",
    read: "5 min",
    title: "On finishing — oil, not coating",
    dek: "Why every piece of hardwood that leaves our workshop is oiled, never sealed, and how that decision affects the project ten years out.",
    excerpt:
      "Why every piece of hardwood that leaves our workshop is oiled, never sealed, and how that decision affects the project ten years out.",
    tag: "Craft",
    author: { name: "Michael", role: "Co-Founder, Lead Carpenter" },
    hero: "/images/campsie-1.webp",
    body: [
      {
        type: "p",
        lead: true,
        text: "There is a fork in the road at the end of every timber project, and most people take the wrong branch. A film finish — a sealer, a varnish, a hard coat — looks spectacular on day one. Oil looks quieter. Ten years later, only one of them has aged with any grace.",
      },
      {
        type: "h",
        text: "What a coating actually does",
      },
      {
        type: "p",
        text: "A film finish sits on top of the timber like a layer of glass. It is brilliant until the first moment it is breached — a scratch, a dropped pot, a season of UV — and then water gets underneath and cannot get out. The coating lifts, clouds and flakes, and the only honest repair is to sand the whole surface back to bare wood and start again.",
      },
      {
        type: "image",
        src: "/images/campsie-1.webp",
        alt: "Hand rubbing penetrating oil into a hardwood handrail",
        aspect: "wide",
      },
      {
        type: "quote",
        text: "A coating is a promise to look perfect for two years and terrible for eight. Oil is a promise to look honest the whole way through.",
        cite: "Michael",
      },
      {
        type: "h",
        text: "Why we oil instead",
      },
      {
        type: "p",
        text: "A penetrating oil does the opposite of a coat. It soaks into the fibres rather than bridging across them, so it cannot lift or peel — there is no film to fail. The timber is free to take on and give up moisture with the weather, which is exactly what a board wants to do. When it dries out, you wipe on another coat in an afternoon. No sanding, no stripping, no scaffolding of regret.",
      },
      {
        type: "p",
        text: "It is not the finish that photographs best the day the client moves in. It is the finish that still looks like itself when we drive past the house a decade later — and that, in the end, is the only review we care about.",
      },
    ],
  },
];

export function getPost(slug: string): JournalPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getNextPost(slug: string): JournalPost {
  const i = posts.findIndex((p) => p.slug === slug);
  return posts[(i + 1) % posts.length];
}

/** Slugify a heading into a stable anchor id. */
export function headingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
