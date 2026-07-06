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
    slug: "earlwood",
    title: "Earlwood Transformation",
    location: "Earlwood, Sydney",
    year: "2026",
    tag: "Framing, Cladding & Landscaping",
    services: [
      "Heavy framing",
      "Timber cladding",
      "Architectural paving",
      "Landscape construction",
      "Irrigation systems",
    ],
    index: "01",
    cover: "/images/earlwood-home-cover.webp",
    intro:
      "A comprehensive, large-scale residential renovation combining structural timber framing, premium external cladding, stone paving, and fully automated irrigation.",
    body: [
      {
        heading: "The brief",
        paragraph:
          "The homeowners needed a complete outdoor transition that would seamlessly tie their home extension into a multi-tiered backyard. They required heavy timber framing to support the new deck levels, along with high-end timber cladding to unify the facade.",
      },
      {
        heading: "The build",
        paragraph:
          "We executed custom structural framing across three distinct terrace levels, finished with matching vertical cladding. The hardscape paving was laid using premium stone to create clean walkways, leading down to the newly landscaped garden beds supported by smart, sub-surface irrigation.",
      },
      {
        paragraph:
          "Craftsmanship was key in handling the complex junctions where the timber cladding meets the stone paving. Every joint was hand-mitered, and the irrigation was zoned dynamically to match the local microclimates of the terraced gardens.",
      },
    ],
    gallery: [
      { src: "/images/earlwood-vid-hero-dusk-wide.webp", alt: "Earlwood completed deck and framing perspective", aspect: "wide", full: true },
      { src: "/images/earlwood-vid-framing-detail-tall.webp", alt: "Detail of the timber cladding meeting the structural frame", aspect: "tall" },
      { src: "/images/earlwood-vid-paving-detail-wide.webp", alt: "Overview of the paved walkways and garden borders", aspect: "wide" },
    ],
  },
  {
    slug: "avalon-beach",
    title: "Avalon Beach Stairs & Retaining",
    location: "Avalon Beach, Sydney",
    year: "2026",
    tag: "Landscape Stairs & Retaining Walls",
    services: [
      "Closed stringer stairs",
      "Curved landscape stairs",
      "Retaining walls",
      "Raised garden beds",
    ],
    index: "02",
    cover: "/images/avalon-1.webp",
    intro:
      "Bespoke carpentry and garden engineering featuring closed stringer stairs, curved steps, structural retaining walls, and raised timber garden beds.",
    body: [
      {
        heading: "The slope",
        paragraph:
          "A steep coastal slope in Avalon Beach required a functional and visually striking access path to the lower garden. The brief was to craft a set of timber stairs that follow the natural topography, combined with retaining walls to secure the shifting soil.",
      },
      {
        heading: "The steps",
        paragraph:
          "We built robust closed stringer stairs transitioning into curved, organic landscape steps that wind naturally down the garden slope. To retain the hillside, we constructed durable timber retaining walls that also function as raised garden beds, filled with dense coastal plantings.",
      },
    ],
    gallery: [
      { src: "/images/avalon-1.webp", alt: "Closed stringer stairs descending through the Avalon garden", aspect: "wide", full: true },
      { src: "/images/avalon-2.webp", alt: "Detail of the curved timber step transition", aspect: "square" },
      { src: "/images/avalon-3.webp", alt: "Top view of the stairs winding down the slope", aspect: "square" },
      { src: "/images/avalon-4.webp", alt: "Sandstone retaining wall meeting timber stairs", aspect: "wide" },
      { src: "/images/avalon-5.webp", alt: "Close-up of the timber grain on the handrails", aspect: "tall" },
      { src: "/images/avalon-6.webp", alt: "Curved landscape stairs blending into dense native shrubs", aspect: "wide" },
    ],
  },
  {
    slug: "campsie",
    title: "Campsie Deck & Garden",
    location: "Campsie, Sydney",
    year: "2026",
    tag: "Decking, Drainage & Planters",
    services: [
      "Custom deck & frame",
      "Timber stairs",
      "Landscape design",
      "Site drainage",
      "Planter boxes",
    ],
    index: "03",
    cover: "/images/campsie-1.webp",
    intro:
      "An integrated timber deck and stair installation featuring custom-engineered drainage systems and structural planter boxes built to border the outdoor area.",
    body: [
      {
        heading: "The geometry",
        paragraph:
          "The client requested a clean, modern timber deck to extend the living room into the backyard. However, poor natural drainage and a heavy clay soil profile required an integrated drainage strategy to protect both the deck frame and the lawn.",
      },
      {
        heading: "The integration",
        paragraph:
          "We built a low-profile deck with custom-framed stairs returning flush into the grass. Beneath the deck boards, we integrated a comprehensive drainage system that feeds water directly into surrounding timber planter boxes, resolving the water logging issues and framing the lawn.",
      },
    ],
    gallery: [
      { src: "/images/campsie-2.webp", alt: "Campsie deck overview at sunset", aspect: "wide", full: true },
      { src: "/images/campsie-1.webp", alt: "Detail of the hardwood deck framing joints", aspect: "tall" },
      { src: "/images/campsie-3.webp", alt: "Handcrafted timber stairs returning to the lawn", aspect: "tall" },
      { src: "/images/campsie-4.webp", alt: "Integrated timber planter boxes outlining the deck", aspect: "wide" },
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
