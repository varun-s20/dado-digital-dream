# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm install` — install dependencies
- `npm run dev` — start Next.js dev server (Turbopack)
- `npm run build` — production build (Turbopack)
- `npm run start` — serve the production build
- `npm run lint` — ESLint (flat config, native to Next.js 16)
- `npm run format` — Prettier write

No test suite.

## Stack

- **Next.js 16** App Router on **React 19** with **Turbopack** as the bundler.
- **Tailwind v4** via `@tailwindcss/postcss` — config is in `src/app/globals.css` (`@theme inline`); no `tailwind.config.*`.
- **shadcn/ui** (style: `new-york`, base color: `slate`, lucide icons) — components vendored in `src/components/ui/`. `components.json` is set up with the `@/*` alias.
- `@/*` path alias → `src/*` (`tsconfig.json`).

## Architecture

### Routing (App Router)
- `src/app/layout.tsx` — root layout: HTML shell, `<Loader>`, `<SiteNav>`, `<main>`, `<SiteFooter>`. Sets default `metadata` and `viewport`. Per-page metadata uses Next.js's `metadata` export with the template `"%s — Fieldcraft"`.
- One folder per route: `approach/`, `projects/`, `journal/`, `contact/`. Index is `src/app/page.tsx`.
- `not-found.tsx` and `error.tsx` provide branded fallbacks (the error file is a Client Component, as Next requires).

### Components
- `SiteNav` — `"use client"`; sticky header with scroll-state, mobile overlay; active-link state via `usePathname()`.
- `SiteFooter` — Server Component; pure markup.
- `Loader` — `"use client"`; brand splash that unmounts after 1.9s.
- `Reveal` — `"use client"`; IntersectionObserver-driven fade/translate. Uses a callback ref (`setNode`) instead of `useRef().current` so it complies with React 19's `react-hooks/refs` rule.

### Styling
- Tailwind v4 utilities + design tokens (oklch palette) defined in `globals.css` `:root`.
- Custom utilities live under `@layer utilities`: `.surface-deep`, `.eyebrow`, `.img-zoom`, `.reveal`, `.word-rise`, `.marquee`, `.loader-overlay`.
- The Google Fonts `@import url(...)` **must remain the first statement** in `globals.css` (before `@import "tailwindcss"`), or PostCSS warns and may drop the @import.

### Static assets
Images live in `public/images/` and are referenced as absolute URLs (`/images/hero.jpg`). The site uses plain `<img>` tags (the `@next/next/no-img-element` rule is disabled in `eslint.config.mjs`) to preserve the exact aspect-ratio-driven layout — swap to `next/image` only if you also accept layout changes.

### ESLint
Flat config in `eslint.config.mjs` consumes `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript` directly (do **not** wrap with `FlatCompat` — `eslint-config-next@16` ships flat configs natively and `FlatCompat` triggers a circular-JSON crash). Vendored shadcn/ui files and `use-mobile.tsx` have the new `react-hooks/{set-state-in-effect,refs,purity}` rules disabled — upstream shadcn templates trip them under React 19.

### Next 16 specifics
- `next lint` was removed in Next 16 — `package.json` runs `eslint .` directly.
- `next.config.ts` sets `turbopack.root` to silence the multi-lockfile workspace-root warning (a stray lockfile in `C:\Users\varun\` was being picked up).

## Project origin

Migrated from a TanStack Start + Vite + Cloudflare Workers + Lovable scaffold to Next.js 16. The design language ("Fieldcraft" — landscape/carpentry studio) was preserved verbatim during the migration.
