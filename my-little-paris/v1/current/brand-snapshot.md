# Brand Snapshot — My Little Paris Café & Play (Current State)

- **Source:** https://www.my-little-paris.com/
- **Scraped:** 2026-07-20
- **Platform:** Squarespace 7.0 (template 5c5a5197…) + one custom-coded landing page (/party)
- **Purpose:** Factual documentation of the site's visual identity as it exists today. This is a record of the current state, not a recommendation.

---

## 1. Overview

My Little Paris Café & Play is a French-themed children's café and indoor playground in San Gabriel, CA. The current website presents **two coexisting visual systems**:

1. **Core Squarespace site** (every page except /party): an essentially two-color navy-and-white identity. Deep navy `#001D61` serves as the full-bleed background for the hero, nav, and alternating section bands, **and** as the heading color on white sections. White is used for text and pill-shaped buttons on navy.
2. **/party custom landing page** (the newest page): a custom-coded design with serif display headings (Playfair Display), DM Sans body text, and an extended palette of creams, powder blues, french blues, soft pinks, and deep navy.

The French identity is carried mainly through naming, menu content, and the script logo rather than through graphic devices.

---

## 2. Logo

- **Primary wordmark:** white script/brush lettering "My Little Paris" with "CAFÉ & PLAY" below in letter-spaced small caps. It is an **image file**, not live text or a webfont.
  - Local copy: `scraped/logo.png` (source 514×118 PNG; the Squarespace CDN serves it as WebP)
  - Source: `https://images.squarespace-cdn.com/content/v1/6000f0aa4bb94555a9ebdbe8/1610945926136-IS0O2E9ASWQ8J828ON6A/MyLittleParis_White.png`
- **Variant:** logo composited on a blue background — `scraped/assets/logo-blue-back.png` (used in the footer).
- **Favicon:** `scraped/assets/favicon.ico`
- **Social sharing image (og:image):** `Logo_Social-Sharing-Image.png`
- Because the artwork is white-only, the logo always appears on navy/blue backgrounds throughout the site.

---

## 3. Current Color Palette

### Core site (all Squarespace pages)

| Role | Hex | Where Used | Notes |
|------|-----|-----------|-------|
| Primary — Navy | `#001D61` | Hero, nav, and section backgrounds; heading color on white sections | Dominant brand color. Computed h2 style = rgb(0,29,97) |
| White | `#FFFFFF` | Text and buttons on navy; page/section backgrounds; button backgrounds (white pill, navy text) | The only other core color — the base site is effectively two-color |
| Template accent (unused) | `#F0523D` | Squarespace `site.css` template default only | Not visibly used anywhere in the design |

### /party landing page (extended palette, newest design direction)

| Role | Hex | Where Used |
|------|-----|-----------|
| Deep navy (text / dark accents) | `#152238` / `#1E2D4A` / `#2C3240` | Headings, body text, dark accents |
| French blue accents | `#3D6B9E` / `#2E5A8A` / `#6A9BBF` | Accents and secondary elements |
| Powder blue backgrounds | `#C8DAEA` / `#EAF1F7` | Section backgrounds |
| Soft pink accents | `#F6A6C9` / `#F0A0BC` / `#E08AAD` | Celebration accents |
| Blush pink backgrounds | `#FCECF3` / `#F0D5D2` | Section backgrounds |
| Cream / warm off-whites | `#FDFBF8` / `#F9F6F1` / `#F5F2EE` / `#E8E2DB` | Page and section backgrounds |

---

## 4. Typography

- **Site-wide (Squarespace pages):** `aktiv-grotesk` (Adobe Typekit), a sans-serif, used for **both headings and body** text.
- **/party landing page:** `'Playfair Display'` (serif) for headings + `'DM Sans'` for body, loaded via Google Fonts. This pairing exists only on this custom page.
- **Logo:** script/brush lettering delivered as an image (no matching webfont in use).
- **Hierarchy observed:** page H1s are single all-caps category words (EAT, PLAY, PARTY, DRINK, KID'S MENU); headings on white sections render in navy `#001D61`; menus are presented as item/description/price tables.
- Exact font-size and font-weight scales were not captured during scraping (only the computed h2 color was recorded). Visual inspection of the live site would be needed for a precise type scale.

---

## 5. Imagery Style

The site relies on **real photography of the actual venue**, plus designed event posters and one stock image:

- **Venue/interior:** café interior, play space, and gallery shots (`scraped/assets/cafe-interior.jpg`, `playspace.jpg`, `gallery-1..3.jpg`; homepage carries ~15 additional casual gallery JPEGs with `IMG_*.JPEG` filenames).
- **Food:** dish photos and image-based menu tiles (`pesto-sandwich.jpg`, `toast.jpg`, `eat-menu-tile.jpg`, `drink-menu-tile.jpg` — the /menu hub page uses two large photo tiles as its only navigation).
- **Party:** balloons, decorated rooms, and package promos (`party-balloon.jpg`, `party-package.jpg`, `party-photo-1..3.jpg`).
- **Character event posters:** designed promo graphics featuring licensed characters — Moana/Island tea party, Island Princess, Bluey (`bluedog.jpg`), Baby Shark. (Flagged in `sitemap.md` red flags as licensed-character IP risk.)
- **Stock:** the Events page banner is an Unsplash photo (`unsplash-image-H5Ffv4I5ZMI.jpg`) — the only stock image identified on the site.
- **Social:** an Instagram feed is embedded on the homepage (anniversary promos, membership offers, event announcements).

**Overall style:** authentic, casual, warm — real families, real food, real space. Production quality varies from professional-looking food shots to phone-style gallery photos; there is no single art-directed photography style.

---

## 6. Tone of Voice

- **Formality:** casual and conversational — parent-to-parent, not corporate.
- **Person:** first-person plural "we" addressing "you"; the kids' menu extends the brand name into item naming ("My Little Nuggets", "My Little Combo & Play", "My Mini Burger").
- **Emotional register:** warm, playful, and reassuring. Safety and cleanliness are recurring themes (a dedicated "Cleaning & Sanitizing" homepage section, a 9-point playground policy, mandatory Smartwaiver). The /party page layers in gentle urgency ("Weekend slots are filling fast — book your party today").
- **Emoji:** used freely in promos, events, and throughout the /party page (☀️ 🌺 🎈 🍽️ ✨ 🚪 🏰 🎀 ⭐).
- **French "art de vivre" flavor:** party packages are named after Paris landmarks (Opéra, Concorde, Saint-Germain, Vendôme, Champs-Élysée, Versailles); the menu leans French (Croque Monsieur/Madame, macarons, mini croissants and pains au chocolat, Kir Royal, all-French wine list); Our Story explicitly invokes sharing "French 'art de vivre'".
- **CTA style:** direct but soft — "Make a Reservation", "Reserve Now", "View our Play Admission", "Book Opéra", "RESERVE YOUR DATE". No hard-sell language.
- **Copy quality:** the writing includes occasional grammatical slips and typos (e.g., "nothing worst", "every parents always have", the duplicated "Party Party"), consistent with owner-written copy; documented in `sitemap.md` red flags.

**Representative quotes:**

> "Where Kids Laugh and Grown-Ups Relax" — /play hero

> "Celebrate without the stress — we handle everything." — homepage Party card

> "Through our café and play, we want to share some French 'art de vivre' experience with you!" — Our Story

---

## 7. UI Patterns

- Full-bleed navy hero with centered white script logo and white pill buttons (navy text).
- Alternating navy/white horizontal section bands on core pages.
- Four-pillar card grid on the homepage (Play / Party / Eat / Drinks), each with one CTA.
- Menu pages: anchor jump-navs at top and bottom; item/description/price tables; footnote-style dietary flags (*contains gluten, GF bread +$1.50).
- Accordions for fine print (Play Pass rules, membership terms, party guidelines and fees).
- **/party page only:** announcement bar, eyebrow label, emoji badge row, three-tab pricing UI (🚪 Private Room / 🏰 Full Space / 🎀 Venue Rental Only), package cards with "⭐ MOST POPULAR" flags, numbered 4-step "How It Works", and an SEO footer paragraph with service-area city list.
- Site-wide footer: phone (call/text), address, email, waiver link, "check Google/Yelp for hours" (no hours published on-site), reservation link, social icons (Facebook, Instagram, Yelp), Squarespace cart link.
- Third-party embeds: Acuity Scheduling iframe (reservations), Smartwaiver, Instagram feed, Squarespace newsletter form and commerce cart.

---

## 8. Inconsistencies & Notes (factual observations)

- **Two design systems coexist:** the aktiv-grotesk navy/white Squarespace site vs. the Playfair Display + DM Sans cream/blue/pink /party landing page. The /party page is the newest intentional design work on the site and does not match the rest.
- **Address discrepancy:** site-wide footer says 416 E. Las Tunas Drive, Unit C; the /party SEO footer says 232 W. Valley Blvd Suite 108 (both San Gabriel). Flagged in `sitemap.md` for client verification.
- **Logo formats:** white-only artwork (plus a blue-background composite); no dark-on-light version appears on the site.
- **Unused template color:** `#F0523D` exists in the Squarespace template CSS but is not used in the visible design.
- **Imagery outliers:** one Unsplash stock banner (Events) amid otherwise real photography; event posters use licensed characters (Moana, Bluey, Baby Shark).
- **No published hours** on the site (delegated to Google/Yelp); **no privacy policy or terms pages** found.
- **Copy typos** on several pages (Our Story, Reservations, homepage promo) — itemized in `sitemap.md` red flags.
- H1s are plain all-caps category words (EAT, PLAY, PARTY…).

---

## 9. Overall Impression

The core site is a simple, consistent, two-color (navy `#001D61` / white) Squarespace build with warm, personal, emoji-friendly copy and authentic owner-shot photography — it reads as friendly and family-run rather than professionally art-directed. The /party landing page is noticeably more designed (serif/sans font pairing, layered cream–powder blue–soft pink palette, tabbed pricing UI) and represents the newest visual direction on the site, visually distinct from every other page. Frenchness lives in the words — landmark-named party packages, croques and macarons, "art de vivre" — and in the script logo, while the overall graphic language of the core site remains minimal navy-and-white.
