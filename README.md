# STLACCESS — STL Files, Scale Maths and 3D Printing Guides

**Tools and hand-written guides for getting a printed miniature to the right size — without uploading a file or buying anything.**

STLACCESS is an educational hub for 3D printing hobbyists. It started as a scale calculator and now covers four connected questions: how to open and inspect an STL, how scale conversion maths works, how to print miniatures on FDM, and how to convert pre-supported resin STLs for FDM. Everything is written and tested by one hobbyist on a Bambu Lab A1 Mini. I do not sell STL files, models, filament or printers.

No file uploads, no user accounts, no cookies. Calculations run in the browser. Analytics are anonymous and cookie-free.

## Why I Built This

I got tired of guessing percentage values in my slicer and printing proxies that towered over the rest of my army. I bought digital calipers, printed test pieces, and worked out the actual math behind every conversion. The site is the record of that work: tools, charts and guides with the numbers visible rather than hidden.

## The Methodology

The full write-up lives at `/methodology`. The short version:

- **175cm human baseline, eyes at 160cm.**
- **Gaming/display scales** (28mm, 32mm, 35mm, 40mm, 75mm, 6mm, 8mm, 10mm, 15mm, 30mm) are measured to **eye level**.
- **Ratio scales** (1:35, 1:27, 1:48, 1:56, 1:72, 1:100) are measured to the **top of the head**.
- The formula is **(target ÷ source) × 100 = slicer percentage**.
- Every guide links back to that standard, to its learning pillar and to the relevant tool.

## What's Inside

- **Learning hubs** (`/learn`, `/learn/scale`, `/learn/fdm`, `/learn/resin-to-fdm`, `/learn/stl-files`) — four tracks that group the tools and guides around the questions people actually ask.
- **Methodology** (`/methodology`) — the 175cm baseline, measurement rules, worked examples, print verification and limits.
- **Miniature size chart** (`/miniature-size-chart`) — all 46 verified conversion percentages and 16 scale baselines on one searchable page.
- **Scale Engine** (`/`) — 16 tabletop scales, eye-level/top-of-head measurement, shrinkage compensation toggle, copy-to-clipboard and bookmarkable URL parameters.
- **Scale Conversion Reference** (`/reference`) — 46 verified conversion pairs with math breakdowns and FDM testing notes.
- **Game systems** (`/games`) — 26 tabletop systems with their scales, base sizes and conversion tables.
- **Guides** (`/guides`) — 22 hand-written articles grouped by learning track. Every guide opens with a Direct Answer box and closes with related guides, tools and methodology links.
- **Tools** (`/tools`) — nine browser-only tools, including the slicer percentage calculator, filament cost calculator, filament density calculator, miniature scale identifier, real-world scale converter, reference bar generator and 3D scale visualizer.

## Open Data

Canonical data lives in `src/data/*.json` and is exported to `public/data/` as JSON and CSV:

```bash
npm run export:data
```

The exports cover scale baselines, the conversion matrix, game systems, material densities, filament presets and tools. They are published under CC BY 4.0 and linked from `public/llms.txt` and `public/llms-full.txt` so answer engines can verify the numbers directly.

## Privacy

Your project files and measurements stay on your hardware. Nothing is uploaded. The only third-party-free exception is anonymous, cookie-free pageview counting.

## Try It

👉 **[Launch STLACCESS](https://stlaccess.com)**

## The Stack

- Astro 7 with content collections and static rendering.
- Tailwind CSS v4 via `@tailwindcss/vite`, TypeScript and self-hosted fonts.
- React + Three.js are used only for the interactive 3D scale visualizer.
- Sitemap, RSS and open datasets are generated at build/export time.
- Structured site data lives in `src/data/*.json`; guides live in `src/content/guides/*.md`; shared pillar IA lives in `src/lib/learningPaths.ts`.

### Local Development

```bash
npm install
npm run dev          # start the dev server
npm run export:data  # regenerate public/data/*.json|csv
npm run build        # build the static site
npm run preview      # preview the production build
```

## Project Structure

```
src/
├── components/    Shared UI, including PillarHub and browser-only tools
├── layouts/       Layout.astro — global nav, footer, meta and structured data slots
├── pages/         Routes (/, /learn, /methodology, /miniature-size-chart, /guides, /tools, …)
├── content/       Guides collection (frontmatter schema in content.config.ts)
├── data/          Scales, conversions, games, tools, densities, presets, site config
├── lib/           Schema builders, freshness logic and the shared pillar map
└── styles/        Theme tokens, prose styles and self-hosted font declarations
```

## Updates, Tweaks & Suggestions

If a calculation looks wrong or a scale is missing, use the feedback form on the site. For code-level changes, open an issue or pull request here.

---

**Built by [kitsorix](https://github.com/kitsorix-official)** — because getting miniatures to look right next to each other should not be a chore.
