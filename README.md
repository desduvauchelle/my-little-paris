# My Little Paris Café & Play — Client Site

Clone of [my-little-paris.com](https://www.my-little-paris.com/) (family café + indoor playground, San Gabriel, CA) rebuilt on the Growth Engine client-app template (Next.js 16 · Tailwind 4 · DaisyUI 5 · GSAP · EN/FR i18n).

## Run

```bash
pnpm install
pnpm dev          # note: port 3000 may be taken on this machine — use PORT=3311 pnpm dev
pnpm build && PORT=3311 pnpm start
pnpm typecheck && pnpm test -- --run
```

## Pages (mirroring the live site)

`/` home · `/reservations` (Acuity embed) · `/menu` hub · `/eat` · `/kidsmenu` · `/drink` · `/play` · `/party` (tabbed packages) · `/party-reservation` (inquiry form) · `/events` · `/our-story` + template pages (`/blog`, `/contact`, `/forms`, `/privacy`, `/legal`, `/cookies`). French versions under `/fr/...`.

## Where content lives

| Content | File |
|---|---|
| Contact, address, socials, external links (Acuity/Smartwaiver/Maps) | `src/data/site.ts` |
| Food / kids / drinks menus | `src/data/menu.ts` |
| Play admission, play pass, memberships, playground policy | `src/data/play.ts` |
| Party packages, process, policies, form options | `src/data/party.ts` |
| All UI copy (EN + FR) | `src/i18n/dictionaries/{en,fr}.ts` |
| Photos (from the live site, WebP) + original SVG posters | `public/images/` |

Brand: navy `#001d61` + cream/pink/french-blue (from their custom /party landing page), DM Sans + Playfair Display. Theme tokens in `src/app/globals.css`.

## Before launch — open items

1. **⚠️ Address conflict**: site-wide footer of the live site says **416 E. Las Tunas Drive, Unit C** but its /party page says **232 W. Valley Blvd Suite 108**. `src/data/site.ts` uses the site-wide one — confirm with the client.
2. **Growth Engine credentials**: `.env.local` has placeholders for `BRAIN_API_URL`, `BRAIN_API_KEY`, `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN` (agency admin provides). Until then, blog/contact/forms SDK features render fallbacks; all marketing pages are fully static and work now.
3. **Forms to seed in the Brain backend**: `contact-form` (template default), `newsletter` (email field), `party-inquiry` (fields matching `src/components/party/PartyInquiryForm.tsx`). The UI already degrades gracefully with call/text/email fallbacks.
4. **Party extra-time price inconsistency on the live site** (tab header vs. accordion: $180/hr vs $150/30min–$280/hr) — cloned as-is from the accordion; confirm correct rates with the client.
5. Event posters are original SVG art (`event-tea-party.svg`, `event-superhero.svg`) replacing the live site's licensed-character posters (Moana/Bluey/Baby Shark — IP risk).
6. `SITE_URL` in `.env.local` is set to localhost; set the production domain before deploy.
7. The scrape that fed this build lives at `my-little-paris/v1/current/` (sitemap, brand snapshot, business info, all page content).
