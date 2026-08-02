# STLACCESS — The STL Scale Calculator for Tabletop Miniatures

**Get your miniatures the right size before you waste filament.**

STLACCESS is a fast, browser-based tool suite for scaling 3D-printable miniatures between the many scales
used in tabletop gaming — Warhammer, D&D, Bolt Action, Star Wars Legion & Shatterpoint, historical wargaming,
and display figures. It exists because getting a printed proxy to match your army shouldn't require guesswork
or a pile of failed prints.

No file uploads, no user accounts, no cookies. Privacy-first, cookie-free analytics (Umami) for anonymous
pageviews only. Every calculation runs directly in your browser — your STLs and dimensions never leave your
machine.

## Why I Built This

Messing with scale adjustments is one of the most tedious parts of 3D printing miniatures. I got tired of
guessing percentage slides inside my slicer or getting mixed results because different sculptors treat heights
differently.

I put this engine together using a flat 175cm human baseline as my starting index, calculating changes from
eye-level height rather than the top of a helmet or hair. It gives consistent results across different
creators — so I figured other folks in the hobby could use it too.

## The Methodology

Every conversion on the site starts from the same reference point:

- **175cm human baseline (5'9"), eyes at 160cm.**
- **Gaming scales** (28mm, 32mm, 35mm, 40mm, 75mm…) are measured to **eye level**.
- **Ratio scales** (1:35, 1:48, 1:56, 1:72, 1:100…) are measured to the **top of the head**.
- The formula is dead simple: **(target ÷ source) × 100 = slicer percentage**.

This shared baseline is why 28mm scales up to 32mm at exactly **114.3%**, and why mixing eye-level and
top-of-head scales without adjusting produces undersized or oversized prints. All percentages are verified
with physical test prints on a Bambu Lab A1 Mini, measured with calipers.

## What's Inside

- **Scale Engine** (`/`) — 16 tabletop scales, eye-level/top-of-head measurement modes, resin shrinkage
  compensation (1–3%), copy-to-clipboard, and bookmarkable URL params. Powered by the community's most-asked
  conversion, 28mm → 32mm.
- **Scale Conversion Reference** (`/reference`) — 44 verified conversion pairs with full math breakdowns and
  FDM printing notes.
- **Tabletop Game Scale Guide** (`/games`) — 26 game systems (Warhammer 40k, Age of Sigmar, D&D, Bolt Action,
  Legion, Shatterpoint, BattleTech, Flames of War, and more), each with its scale, base sizes, conversion
  table, and FDM printing tips.
- **Guides** (`/guides`) — 11 in-depth articles on scale theory, measurement, slicer workflow, and FDM
  settings. Every guide opens with a **Direct Answer box** so you get the number immediately, before the deep
  dive.
- **Filament Cost Calculator** (`/tools/filament-cost-calculator`) — know what a print costs (filament +
  electricity) before you start.
- **Slicer Percentage Calculator** (`/tools/slicer-percentage-calculator`) — two measurements in, one exact
  percentage out.

## Privacy

Your project files and dimensions stay on your hardware. Nothing is uploaded to a server — the only
third-party request is an anonymous, cookie-free pageview count.

## Try the Tool

👉 **[Launch STLACCESS](https://stlaccess.com)**

## The Stack

- Built with **Astro** (content collections), **Tailwind CSS v4** (`@tailwindcss/vite`), and **TypeScript**.
- Static-first: every page pre-rendered, no client framework, no backend database.
- Sitemap + RSS feed generated at build time.
- Structured site data (scales, conversions, games, tools, presets) lives in `src/data/*.json`; guide
  articles live in `src/content/guides/*.md` with a `tldr` field that powers each guide's Direct Answer box.

### Local Development

```bash
npm install
npm run dev     # start the dev server
npm run build   # build the static site
npm run preview # preview the production build
```

## Project Structure

```
src/
├── layouts/       Layout.astro — global header, masthead, nav, footer
├── pages/         Routes (/, /reference, /games, /guides, /tools, /about, …)
├── content/       Guides collection (markdown, content collections schema in content.config.ts)
├── data/          Structured data: scales, conversions, gameSystems, tools, filamentPresets, …
└── styles/        global.css — theme tokens + prose/table styling
```

## Updates, Tweaks, & Suggestions

If you run into an inaccurate calculation or want to suggest a new preset scale layout, use the input forms
directly on the website to submit your notes. I monitor those requests and push out regular manual updates
whenever there's strong demand from the community for a specific conversion.

For bug reports or code-level changes, feel free to open a ticket or a pull request right here on the
repository.

## Recent Updates

- **Guide redesign** — Direct Answer boxes with jump-to-section navigation, reading time, H1-first reading
  order, and restyled prose (card-style tables, accent-bar headings, custom list markers).
- **SEO pass** — keyword-first titles, all 26 game meta descriptions rewritten to ≤155 characters, and a
  homepage H1 that says exactly what the tool does.
- **Layout & navigation** — sticky desktop nav, mobile bottom nav, breadcrumbs, skip link, and every page's
  H1 moved up into the masthead.

---

**Built by [kitsorix](https://github.com/kitsorix-official)** — because getting miniatures to look right next
to each other shouldn't be a chore.
