# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm install` — install dependencies
- `npm run dev` — start Next.js dev server (Turbopack)
- `npm run build` — production build (Turbopack, generates static pages for `/projects/[slug]` and `/journal/[slug]`)
- `npm run start` — serve the production build
- `npm run lint` — ESLint (flat config, native to Next.js 16)
- `npm run format` — Prettier write

No test suite.

## Stack

- **Next.js 16** App Router on **React 19** with **Turbopack**.
- **Tailwind v4** via `@tailwindcss/postcss` — config in `src/app/globals.css` (`@theme inline`).
- **Lenis** for inertial smooth scroll + **GSAP** (with `ScrollTrigger`) for scrub-tied/pinned scroll choreography. Lenis's RAF is delegated to `gsap.ticker` so ScrollTrigger stays in sync.
- **shadcn/ui** (style: `new-york`) vendored in `src/components/ui/` — not used by the site pages currently.
- `@/*` path alias → `src/*`.

## Brand

The site is for **BM Carpentry & Landscaping** (Sydney). Brand display rules: short mark `BM.` (with the period animated on hover), tagline `carpentry & landscape`, full company name only in metadata/contact/footer copyright. All brand strings live in `src/lib/brand.ts` — change them there.

## Architecture

### Routing (App Router)
- `src/app/layout.tsx` — HTML shell, mounts `<SmoothScroll>`, `<Cursor>`, `<Loader>`, `<SiteNav>`, `<main>`, `<SiteFooter>`. Sets root metadata (template: `"%s — BM."`) and `metadataBase`.
- Static routes: `/`, `/services`, `/about`, `/projects`, `/journal`, `/contact`. Plus `not-found.tsx` and `error.tsx`. (`/services` is the former `/approach` "Studio" page, rebuilt as the services page.)
- **Dynamic case studies**: `/projects/[slug]` driven by `generateStaticParams()` over `src/lib/projects.ts`. Each page renders `<PinnedHero>` → narrative → mixed-aspect gallery (each gallery image is a `<ParallaxImage>`) → next-project peek → back link.
- **Dynamic journal articles**: `/journal/[slug]` via `generateStaticParams()` over `src/lib/journal.ts`. Renders a `ReadingProgress` bar, an editorial hero, the typed `body` blocks, a sticky `ArticleRail` chapter nav (scroll-spies `<h>` anchors keyed by `headingId`), next-article peek, and "more" links.

### Data
- `src/lib/brand.ts` — single source of truth for brand/contact strings.
- `src/lib/projects.ts` — case study data (slug, title, location, year, services, body paragraphs, gallery with mixed aspects). Exports `getProject(slug)` and `getNextProject(slug)` (with wrap-around).
- `src/lib/journal.ts` — journal/blog data: `JournalPost`s with a typed `body` block list (`JournalBlock` union: `p`/`h`/`quote`/`image`/`list`). Exports `posts`, `getPost(slug)`, `getNextPost(slug)` (wrap-around), and `headingId(text)` — the latter is the single source for chapter anchor ids, shared by the article page and the `ArticleRail` scroll-spy.
- `src/lib/lenis.ts` — module-singleton handle to the document's Lenis instance. `SmoothScroll` registers it via `setLenis`; any client component reads it with `getLenis`/`scrollToId` to drive programmatic smooth scroll that cooperates with Lenis instead of fighting it via native `scrollIntoView`.
- `src/lib/gallery.ts` — single source for **all** projects: 30+ `GalleryItem`s (title, location, `categories[]`, `img`, `size`, optional `pos`/`slug`/`summary`/`year`). `CATEGORIES` drives the filter bar. Helpers turn every item into a detail page: `projectSlug` (explicit or kebab-cased title), `getProject`, `getMoreProjects`, `projectYear`, `projectScope`, `projectDescription` (uses a hand-written `summary` if present, else generates two tasteful paragraphs from category + location), and `projectImages` (deterministic mixed-size gallery from the photo pool). Images currently cycle the small `/public/images` pool — **placeholders to be swapped for real project photography** (drop files in `/public/images/projects/` and repoint each `img`). `src/lib/projects.ts` is now only used by the homepage's featured cards (display data); its slugs match gallery items so those links resolve.

### Projects index (`/projects`)
A filterable column-masonry — referenced from formedgardens.com.au/projects. `ProjectGallery` (client) renders the filter chips + a CSS `columns-2 sm:columns-3` masonry (size variants `sm`/`wide`/`tall`/`lg` → `aspect-*`; `break-inside-avoid`). Changing a filter remounts the grid via a React `key`, replaying the staggered `.gallery-enter` entrance. Tiles are `next/image` `fill` (responsive `sizes`, first 4 `priority`, rest lazy) wrapped in a `<Link>` to `/projects/[slug]`; the name reveals over a bottom gradient on hover (`.gallery-tile`/`.gallery-cap`/`.gallery-scrim`, always visible on touch).

### Project detail (`/projects/[slug]`)
`generateStaticParams` over every gallery item. Structure mirrors formedgardens.com.au/project/*: full-bleed `ParallaxImage` hero (with a back link) → info section (category eyebrow, `SplitText` title, 2-paragraph description, and a Location/Completed/Scope-of-work details table beside a feature image) → mixed-size gallery (`projectImages`, full-width + half tiles via `ParallaxImage`) → "More projects" (3 next items as hover-caption tiles). All copy/images for items without a `summary` are generated — replace with real content.

### Motion components (every interactive piece is `"use client"`)

**System primitives** — used everywhere
- `SmoothScroll` — Lenis init; honors `prefers-reduced-motion` by skipping; delegates RAF to `gsap.ticker`.
- `Cursor` — 8px dot tracking real-time + 36px lerped trailing ring with `mix-blend-mode: difference`. Ring scales 1.8× over anchors / buttons / any `[data-cursor="hover"]`. Hidden on touch + reduced-motion.
- `Loader` — masked-text reveal of `BM.` (each letter rises through its own clip), then a `clip-path` curtain wipes upward at ~1.8s, component unmounts at 2.75s.

**Entrance / reveal**
- `Reveal` — IntersectionObserver fade-up; callback-ref so it complies with React 19's `react-hooks/refs` rule.
- `SplitText` — splits children into `.split-word` → `.split-char` spans; per-char `translateY(110%)` → 0 with CSS-var stagger.
- `MaskHeading` — line-by-line mask reveal where each line slides up through its own `overflow:hidden` clip with delay stagger.
- `RevealImage` — clip-path/scale image reveal on scroll-in (image-specific counterpart to `Reveal`).
- `CountUp` — counts `0→to` once on first scroll-into-view via a single eased rAF loop; snaps to the final value under reduced-motion. Used for stat blocks.

**Pointer-driven**
- `MagneticLink` — Next `<Link>` with cursor-magnetic inner span (default strength 0.18); pointer position written to CSS vars via `requestAnimationFrame` (no React re-render).
- `ProjectTile` — image link with 96px circular `cursor-pill` that follows the pointer inside the tile; `cursor: none` while hovering; falls back to default on `(hover: none)`.
- `HoverFillButton` — directional hover-fill; bg slides in from whichever edge the pointer crossed and exits the opposite way.

**Scroll choreography (GSAP)**
- `ParallaxImage` — scrub-tied translateY + scale-to-1 on the image; uses `gsap.context()` for clean unmount.
- `PinnedHero` — pinned full-bleed image + scaling on scrolldown; content fades / translates as the hero exits.
- `StickyStack` — N panels each `position: sticky` with stepped `top` offsets; lower panels scale down + fade as the next one slides over.
- `HorizontalGallery` — pins a section and translates an inner rail by its overflow width on scroll; gracefully falls back to native horizontal scroll on touch / reduced-motion.
- `MarqueeBand` — continuous translateX loop driven by RAF; scroll velocity feeds extra speed + a small skewX for kinetic feel; auto-decays via lerp.
- `ReadingProgress` — fixed top progress bar tracking scroll through a target element (`targetId`); used on journal articles.
- `ArticleRail` — sticky chapter rail for long-form articles; IntersectionObserver scroll-spy over `<h>` anchors (ids from `headingId`), click-to-scroll via `scrollToId` (Lenis singleton). Hidden on small viewports.

**Layout/structural**
- `BrandMark` — renders `BM.` with the period in its own span for the hover-lift animation.
- `SiteNav` — sliding underline indicator (measures link rects in `useLayoutEffect`, animates a single absolute span via CSS vars), morph hamburger, masked overlay menu, body-scroll lock, ESC to close, auto-close on route change.
- `SiteFooter` — Server Component; pure markup; footer-list links translate-right on hover; `<BrandMark>` next to copyright.

### Styling
- Tailwind v4 utilities + design tokens (oklch palette) in `globals.css` `:root`.
- Motion tokens alongside the palette: `--ease-out-expo`, `--ease-out-quart`, `--ease-spring`, `--ease-vercel`, `--dur-fast/med/slow`. Never use linear easing; pick a token.
- Motion-system classes under `@layer utilities`: `.loader-mask/.loader-curtain`, `.split-text/.split-word/.split-char`, `.mask-line`, `.magnetic/.magnetic-inner`, `.fill-btn/.fill-bg/.fill-label`, `.nav-track/.nav-indicator/.nav-link`, `.hamburger`, `.menu-mask`, `.cursor-stage/.cursor-pill`, `.cursor-dot/.cursor-ring`, `.field-line`, `.arrow-link`, `.parallax-stage/.parallax-target`, `.stack-card`, `.h-rail/.h-tile`, `.kinetic-track`, `.brand-mark`, `.service-row` (zig-zag), `.divider-line`, `.marquee` (legacy CSS marquee — still used by the old marquee section).
- `prefers-reduced-motion` honored globally in `@layer base` (collapses all motion to ~0).
- The Google Fonts `@import url(...)` **must remain the first statement** in `globals.css` (before `@import "tailwindcss"`).

### Motion philosophy
Subtle, physical, never linear. All animations target `transform` and `opacity` only. High-frequency pointer interactions (magnetic, cursor pill, custom cursor) write to CSS custom properties from `requestAnimationFrame` so React never re-renders during motion. Long-form entrance reveals are driven by `IntersectionObserver` + class toggles; complex scroll choreography (pinning, scrub, parallax) is delegated to GSAP through `gsap.context()` with `revert()` cleanup. Lenis drives the document's smooth-scroll and feeds ScrollTrigger via `gsap.ticker`.

### Next 16 specifics
- `next lint` removed — `package.json` runs `eslint .` directly.
- `eslint-config-next@16` ships flat configs natively; don't wrap with `FlatCompat`.
- `next.config.ts` sets `turbopack.root` to silence the multi-lockfile workspace-root warning.
- Vendored shadcn/ui files + `use-mobile.tsx` have the new React 19 `react-hooks/{set-state-in-effect,refs,purity}` rules disabled in `eslint.config.mjs` — upstream shadcn templates trip them.

## Project origin

Migrated from a TanStack Start + Vite + Cloudflare Workers + Lovable scaffold to Next.js 16, then rebuilt for BM Carpentry & Landscaping with an Awwwards-targeted motion architecture (Lenis + GSAP). Design language: warm naturalistic oklch palette, editorial layout, image-led storytelling. Type system follows formedgardens.com.au — a single clean grotesque, **Hanken Grotesk**, used for both display and body (`--font-display` and `--font-sans` both point at it). Display type runs light/medium weight (400–500) with tight tracking (~-0.025em); the `.font-display` utility and base `h*` tags share that weight/tracking so headings read consistently whether on an `h*` tag or a `<p>`/`<span>`. Headings stay restrained in scale — quiet negative space and the photography carry the page (no oversized hero type). (Earlier iterations used Fraunces serif / Cormorant Garamond / Inter Tight display — all replaced by the unified Hanken Grotesk grotesque.)
