export type Project = {
  slug: string;
  title: string;
  location: string;
  year: string;
  tag: string;
  services: string[];
  intro: string;
  body: { heading?: string; paragraph: string }[];
  cover: string;
  gallery: { src: string; alt: string; aspect: "tall" | "wide" | "square"; full?: boolean }[];
  index: string;
};

export const projects: Project[] = [
  {
    slug: "mosman-deck",
    title: "Mosman Deck",
    location: "Mosman, Sydney",
    year: "2026",
    tag: "Carpentry & Decking",
    services: ["Site analysis", "Carpentry", "Hardwood decking", "Joinery", "Planting"],
    index: "01",
    cover: "/images/project-1.jpg",
    intro:
      "A north-facing deck cantilevered over an existing sandstone retaining wall — built in spotted gum, designed to weather to silver with the harbour light.",
    body: [
      {
        heading: "The brief",
        paragraph:
          "The clients wanted to recover the harbour view their courtyard had lost to a pair of mature jacarandas. The brief was to bring the seating plane up to meet the canopy line, without removing a single tree.",
      },
      {
        heading: "The build",
        paragraph:
          "We resolved the structure as a low-profile platform set on galvanised steel stanchions pinned into the original sandstone wall — letting the deck float clear of the garden floor and protect the roots beneath. The hardwood was rough-sawn, sanded twice, and finished only with oil.",
      },
      {
        paragraph:
          "Detailing is purposely quiet: invisible fixings, a single-line balustrade in 12mm flat bar, and a continuous return into the threshold of the house so the inside floor plane reads as one with the deck.",
      },
    ],
    gallery: [
      { src: "/images/project-1.jpg", alt: "Mosman deck looking toward the harbour at dusk", aspect: "wide", full: true },
      { src: "/images/project-3.jpg", alt: "Spotted gum boards meeting the sandstone wall", aspect: "tall" },
      { src: "/images/project-2.jpg", alt: "Detail of the flat-bar balustrade return", aspect: "tall" },
      { src: "/images/studio.jpg", alt: "Carpenter sanding the boards on-site", aspect: "wide" },
    ],
  },
  {
    slug: "bundeena-steps",
    title: "Bundeena Steps",
    location: "Bundeena, NSW",
    year: "2025",
    tag: "Coastal Garden",
    services: ["Stonework", "Planting design", "Drainage", "Retaining"],
    index: "02",
    cover: "/images/project-2.jpg",
    intro:
      "Forty-two sandstone treads cut into a coastal slope, threaded through endemic banksia and tea-tree, holding a path to the water that wasn't there a year ago.",
    body: [
      {
        heading: "The slope",
        paragraph:
          "Bundeena's coastal sandstone is brittle near the surface and brutally hard at depth. We mapped the slope at 1:50 with a drone and a hand level, then set every tread off a single datum so the cadence stays true across the full descent.",
      },
      {
        heading: "The planting",
        paragraph:
          "Existing canopy was protected to the millimetre — every tread laid out around the trunks rather than removing them. The understory was rebuilt with coastal rosemary, dianella, lomandra and pig face, planted dense to bind the disturbed soil within a single season.",
      },
    ],
    gallery: [
      { src: "/images/project-2.jpg", alt: "Sandstone steps descending through coastal planting", aspect: "wide", full: true },
      { src: "/images/project-4.jpg", alt: "Tread detail with embedded drainage channel", aspect: "square" },
      { src: "/images/project-1.jpg", alt: "View from the lower landing back up the slope", aspect: "square" },
      { src: "/images/project-3.jpg", alt: "Tea-tree and banksia overhanging the path", aspect: "wide" },
    ],
  },
  {
    slug: "fairlight-pergola",
    title: "Fairlight Pergola",
    location: "Fairlight, Sydney",
    year: "2025",
    tag: "Bespoke Timberwork",
    services: ["Joinery", "Steel fabrication", "Carpentry"],
    index: "03",
    cover: "/images/project-3.jpg",
    intro:
      "A 9-metre pergola of laminated blackbutt and 6mm steel plate — sized to the width of the rear elevation, detailed to disappear when seen from the kitchen window.",
    body: [
      {
        heading: "The geometry",
        paragraph:
          "The clients wanted shade for an exposed western terrace without losing the view to the bay. We worked the rafter spacing back from the camera angle of the kitchen sight-line — denser at the far edge, sparser overhead.",
      },
      {
        paragraph:
          "Beams are laminated blackbutt over a fully concealed steel armature, finished in matt black so the structural members read as one line. Plant rails are built into the lower stringers, ready for an espaliered fig planted the same week.",
      },
    ],
    gallery: [
      { src: "/images/project-3.jpg", alt: "Pergola viewed from the terrace at golden hour", aspect: "wide", full: true },
      { src: "/images/project-1.jpg", alt: "Steel-to-timber junction at the column head", aspect: "tall" },
      { src: "/images/project-4.jpg", alt: "Rafter cadence from below", aspect: "tall" },
    ],
  },
  {
    slug: "bowral-pool",
    title: "Bowral Pool",
    location: "Bowral, Southern Highlands",
    year: "2024",
    tag: "Pool & Landscape",
    services: ["Pool design", "Carpentry surround", "Planting", "Lighting"],
    index: "04",
    cover: "/images/project-4.jpg",
    intro:
      "A black-bottomed lap pool wrapped in spotted gum, set into a clipped hornbeam hedge — designed to read as a still pond in late afternoon light.",
    body: [
      {
        heading: "The geometry",
        paragraph:
          "21 metres long, 3 metres wide, a single-step coping in honed bluestone. The hedge wall behind the pool sits exactly at eye height when standing in the water — a deliberate compression that lets the sky and the water do all the talking.",
      },
      {
        heading: "The surround",
        paragraph:
          "Spotted gum decking returns flush with the bluestone, falling away on a 1:120 grade so water lifts off the surface without anyone noticing the slope. The pool's blackness comes from a hand-troweled mineral render — no coating, no liner.",
      },
    ],
    gallery: [
      { src: "/images/project-4.jpg", alt: "Pool at dusk with the hornbeam wall behind", aspect: "wide", full: true },
      { src: "/images/project-2.jpg", alt: "Bluestone coping meeting the spotted gum deck", aspect: "tall" },
      { src: "/images/project-3.jpg", alt: "Long view down the lap line", aspect: "wide" },
      { src: "/images/project-1.jpg", alt: "Detail of the underwater step in mineral render", aspect: "tall" },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
