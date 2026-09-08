# STLACCESS — The STL Scale Calculator for Tabletop Miniatures

**Get your miniatures the right size before you waste filament.**

STLACCESS is a fast, browser-based tool suite for scaling 3D-printable miniatures between the many scales
used in tabletop gaming — 6mm epic, 28mm true scale, 32mm heroic, 35mm eye level, historical wargaming,
and display figures. It exists because getting a printed proxy to match your army shouldn't require guesswork
or a pile of failed prints.

No file uploads, no user accounts, no cookies. Privacy-first, cookie-free visitor counter (a small custom script writing anonymous pageview stats to a private Google Sheet) for pageview counts only. Every calculation runs directly in your browser — your STLs and dimensions never leave your machine.

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
with physical test prints on a Bambu Lab A1 Mini, measured with a PARKSIDE digital caliper (0.01mm resolution, 0–150mm range, all-metal construction).

## What's Inside

- **Scale Engine** (`/`) — 16 tabletop scales, eye-level/top-of-head measurement modes, adjustable shrinkage
  compensation (for PETG and other cooling-shrink materials), copy-to-clipboard, and bookmarkable URL params.
  Powered by the community's most-asked
  conversion, 28mm → 32mm. This is the **fast-numbers** option.
- **Miniature Size Chart** (`/miniature-size-chart`) — 46 verified conversion pairs with full math breakdowns and
  FDM printing notes.
- **FDM Printing Profiles** (`/fdm-printing-profiles`) — 26 anonymized profile scale guides (modern sci-fi epic
  32mm, fantasy epic 32mm,
  28mm true scale, 35mm eye level, WWII, mech tactical, epic 6–10mm, and more), each with its scale, base sizes,
  and FDM printing tips.
- **FDM** (`/fdm`) — FDM-focused scale math and conversion resources hub (placeholder while this section grows).
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
- Structured site data (scales, conversions, profiles, tools, presets) lives in `src/data/*.json`.

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
├── pages/         Routes (/, /miniature-size-chart, /fdm-printing-profiles, /fdm, /tools, /about, …)
├── data/          Structured data: scales, conversions, profiles, tools, filamentPresets, …
└── styles/        global.css — theme tokens + prose/table styling
```

## Updates, Tweaks, & Suggestions

If you run into an inaccurate calculation or want to suggest a new preset scale layout, use the input forms
directly on the website to submit your notes. I monitor those requests and push out regular manual updates
whenever there's strong demand from the community for a specific conversion.

For bug reports or code-level changes, feel free to open a ticket or a pull request right here on the
repository.

## Recent Updates

- **Guides retired; `/guides` → `/fdm`** — the long-form /guides articles were removed; all 16 guide URLs and
  `/blog/*` now 301-redirect to the new `/fdm` FDM scale math hub (placeholder for future math-only content).
- **3D Scale Visualizer retired** — `/tools/3d-scale-visualizer` now 301-redirects to `/tools`; announcement
  banner disabled (reserved for future announcements). The visualizer components are removed from the source tree.
- **Scale Identifier & Real-World Converter retired** — `/tools/miniature-scale-identifier` and
  `/tools/real-world-scale-converter` now 301-redirect to `/tools`; their components are removed from the source tree.
- **SEO pass** — keyword-first titles, all 26 game meta descriptions rewritten to ≤155 characters, and a
  homepage H1 that says exactly what the tool does.
- **Layout & navigation** — sticky desktop nav, mobile bottom nav, breadcrumbs, skip link, and every page's
  H1 moved up into the masthead.

---

**Built by [kitsorix](https://github.com/kitsorix-official)** — because getting miniatures to look right next
to each other shouldn't be a chore.
