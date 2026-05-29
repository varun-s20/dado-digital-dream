export const brand = {
  mark: "BM.",
  tagline: "carpentry & landscape",
  fullName: "BM Carpentry & Landscaping",
  email: "studio@bmcarpentry.com.au",
  phone: "+61 2 9123 4567",
  phoneHref: "tel:+61291234567",
  address: {
    line1: "14 Wharf Road",
    line2: "Mosman, NSW 2088",
  },
  social: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
  ],
  /** Service areas — used in hero scroll marquee and footer */
  coverage: [
    "Sydney",
    "Mosman",
    "Bundeena",
    "Avalon",
    "Bowral",
    "Southern Highlands",
    "South Coast",
    "Hunters Hill",
    "Fairlight",
  ],
} as const;
