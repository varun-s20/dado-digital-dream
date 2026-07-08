export const brand = {
  mark: "BM.",
  tagline: "carpentry & landscape",
  fullName: "BM Carpentry & Landscaping",
  email: "info@bmcl.au",
  phone: "Michael: +61 411 180 617 / Ben: +61 420 803 048",
  phoneHref: "tel:+61411180617",
  phones: [
    { name: "Michael", number: "+61 411 180 617", href: "tel:+61411180617" },
    { name: "Ben", number: "+61 420 803 048", href: "tel:+61420803048" }
  ],
  address: {
    line1: "Sydney, NSW",
    line2: "Australia",
  },
  social: [
    { label: "Instagram", href: "https://instagram.com/bm_carpentryandlandscaping" },
  ],
  /** Service areas — used in hero scroll marquee and footer */
  coverage: [
    "Sydney",
    "Mosman",
    "Earlwood",
    "Campsie",
    "Avalon Beach",
    "Hunters Hill",
    "Fairlight",
  ],
} as const;
