# Client-editable image labels — design

**Date:** 2026-08-14
**Status:** approved for planning

## Problem

Project photos are captioned by nobody. The client knows what each photo shows
("closed stringer stairs", "spotted gum decking, hand-laid"); the site currently
renders only the project title and location. The client must be able to write
those captions themselves, without a developer and without a deploy.

## Scope

**In:** a caption per photo, written by the client through a password-protected
`/admin` page, rendered on project detail galleries and on the project tiles
across the homepage, `/projects`, and the "More projects" strip.

**Out:** photo upload, gallery reordering, editing project titles / summaries /
locations, per-user accounts, alt-text editing, captions on the full-bleed
project hero banner, captions on non-project imagery (about, services, hero
video).

## Decisions

| Decision | Choice | Why |
| --- | --- | --- |
| Who edits | Client, through `/admin` | They hold the knowledge; a data file would need a developer for every change. |
| What a label is | Visible caption only | `alt` stays the project title, so an empty label never degrades accessibility. |
| Key | Image path | A caption describes the photo, not the page. Photos repeat across projects, so path-keying means ~35 labels instead of ~60 placements, and no orphan rows when a gallery composition changes. |
| Freshness | Instant, on save | Server action upserts then revalidates inline. Visitors still get static HTML. |
| Auth | One shared password | One client. No user table, no reset flow. |

## Data model

Supabase table:

```sql
create table image_labels (
  path       text primary key,           -- "/images/campsie-2.webp"
  label      text not null default '',
  updated_at timestamptz not null default now()
);

alter table image_labels enable row level security;

-- Public site reads labels with the anon key.
create policy "public read" on image_labels for select to anon using (true);
-- No insert/update/delete policy: writes only via the service-role key,
-- which never leaves the server.
```

`path` is the exact string used as an image `src` in `src/lib/gallery.ts`
(leading slash, `.webp` extension included). Rows for paths no longer rendered
are harmless — they are simply never read.

## Read path

`src/lib/labels.ts` (server-only):

- `getLabels(): Promise<Record<string, string>>` — one `select path,label`,
  wrapped in `React.cache` so a page renders it once regardless of how many
  components ask.
- On any error (network, misconfigured env, table missing) it logs once and
  returns `{}`. A label store that is down must never take the site down.
- Empty string is treated as "no label" — identical to a missing row.

Consumers:

| Surface | Component | How labels arrive |
| --- | --- | --- |
| `/projects/[slug]` gallery + feature image | server page → `RevealImage` | awaited in the page |
| `/` Recent work tiles | server page (`src/app/page.tsx`) | awaited in the page |
| `/projects` masonry | `ProjectGallery` (client) | awaited in `src/app/projects/page.tsx`, passed as a prop |
| `/projects/[slug]` More projects strip | server page | already in the awaited map |

No component fetches labels itself; every one receives them as props. That keeps
`ProjectGallery` a pure client component and keeps the number of queries at one
per request.

## Rendering

**Project detail images.** `RevealImage` already renders a `<figure>`. It gains
an optional `caption?: string`; when non-empty it renders a `<figcaption>` below
the image — muted, small, tracking to match the existing detail-table type. No
caption, no element (no reserved empty space, no layout shift between captioned
and uncaptioned shots).

**Tiles** (homepage Recent work, `/projects` masonry, More projects). The
existing `.gallery-cap` overlay shows title over location. When a label exists it
replaces the location line; otherwise the location renders as today. The tile
markup, hover reveal, and scrim are unchanged.

**Hero banner.** Unchanged — its eyebrow already carries category, year and
location.

## Admin

Route: `/admin`, `robots: noindex`, excluded from `sitemap.ts`.

**Auth.** `ADMIN_PASSWORD` in env. `POST /admin/login` compares with a
timing-safe equality check, then sets an httpOnly, `secure`, `sameSite=lax`
cookie holding `exp` plus an HMAC-SHA256 signature over it, keyed by
`ADMIN_COOKIE_SECRET` (node `crypto`, no dependency). 30-day expiry. Middleware
guards `/admin/*` except the login route and rejects a cookie whose signature or
expiry fails. Wrong password returns a generic failure with no detail.

**UI.** Server component lists every labelable image path with its current
label. The list is **derived from `src/lib/gallery.ts` helpers** — the same
`projectFeature`, `projectImages`, `galleryItems`, and homepage tile data the
pages render — never hand-maintained, so it cannot drift from what is on the
site. Rows are grouped by project, each showing a thumbnail, the path, and a
text input.

**Save.** A per-row client form calls a server action `saveLabel(path, label)`:

1. Re-checks the admin cookie (a server action is a public endpoint; middleware alone is not the authorization boundary).
2. Validates `path` is a member of the derived labelable set — an arbitrary path is rejected, so the action cannot be used to write junk rows.
3. Trims the label and caps it at 120 characters.
4. Upserts with the service-role client.
5. `revalidatePath("/")`, `revalidatePath("/projects")`, and `revalidatePath("/projects/[slug]", "page")`.

## Environment

New dependency: `@supabase/supabase-js`.

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=      # server only, never imported into a client component
ADMIN_PASSWORD=
ADMIN_COOKIE_SECRET=
```

Committed as `.env.example` with empty values; real values in `.env.local` and in
the host's env settings. `SUPABASE_SERVICE_ROLE_KEY` is read only from files that
are server-only.

## Failure behaviour

| Failure | Result |
| --- | --- |
| Supabase unreachable / env missing | `getLabels()` returns `{}`; every surface renders exactly as it does today. |
| Label exists for a path no longer rendered | Row ignored. |
| Empty or whitespace-only label | Treated as no label; tile falls back to location, figure renders no caption. |
| Admin cookie invalid or expired | Redirect to login; server action rejects independently. |

## Verification

One check, run in CI or by hand, asserting the piece that rots silently: the
admin's derived labelable-path set covers every path the pages actually render —
each project's feature image and five gallery shots, the ten homepage tiles, the
seventeen `/projects` tiles, and the three-item More-projects strip — with no
duplicates. If a page starts rendering a photo the admin does not list, the check
fails.

Manual pass before shipping: save a label, confirm it appears on the project page
and its tile without a redeploy; clear it, confirm the location line returns.
