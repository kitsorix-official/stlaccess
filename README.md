# STLACCESS — The STL Scale Calculator for Tabletop Miniatures

**Get your miniatures the right size before you waste filament.**

STLACCESS is a fast, browser-based tool suite for scaling 3D-printable miniatures between the many scales
used in tabletop gaming — 6mm epic, 28mm true scale, 32mm heroic, 35mm eye level, historical wargaming,
and display figures. It exists because getting a printed proxy to match your army shouldn't require guesswork
or a pile of failed prints.

No file uploads, no user accounts, no cookies. The only network requests are an anonymous, cookie-free
pageview counter (a small custom script writing pageview counts to a private Google Sheet) and, if you choose
to use one of the feedback forms, a submission to the same private sheet. Every calculation runs directly in
your browser — your STLs and dimensions never leave your machine.

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

This shared baseline is why 28mm scales up to 32mm at exactly **114.3%** (116.1% measured to the top of the
head), and why mixing eye-level and top-of-head scales without adjusting produces undersized or oversized
prints. All percentages are verified with physical test prints on a Bambu Lab A1 Mini, measured with a
PARKSIDE digital caliper (0.01mm resolution, 0–150mm range, all-metal construction).

## What's Inside

- **STL Scale Engine** (`/`) — 16 tabletop scales, eye-level/top-of-head measurement modes, adjustable
  shrinkage compensation, copy-to-clipboard, and bookmarkable URL params. Powered by the community's most-asked
  conversion, 28mm → 32mm. This is the **fast-numbers** option.
- **3D Math & Calculators** (`/3d-math`) — the full tool suite:
  - Slicer Percentage Calculator — two measurements in, one exact percentage out.
  - Filament Cost Calculator — know what a print costs (filament + electricity) before you start.
  - Filament Density Calculator — grams from any shape or volume, with hollow-shell math.
  - EU Import & Landed Cost Calculator — true EUR cost of 3D printing supplies shipped into the EU (€3 duty + VAT).
  - Resin Shrinkage Calculator — dimensional compensation for resin and FDM materials, 13 presets plus a
    measured-coupon back-solve mode.
  - Miniature Resin Weight & Cost Calculator — weight and cost per miniature, with an army planner.
  - Layer Resolution & Angle Calculator — layer height, stair-step faceting, and overhang math.
  - Scale Reference Bar Generator — download a printable STL ruler bar (5mm ticks + a figure-height end tab)
    to identify unknown scales in Lychee or Chitubox.
- **Guides** (`/guides`) — 16 in-depth articles on scale theory, FDM printing, and the methodology behind
  every percentage on the site (Chitubox/Lychee scaling, FDM vs resin, real-world objects to 28mm/32mm,
  and more).
- **Miniature Size Chart** (`/miniature-size-chart`) — 46 verified conversion pairs with full math breakdowns
  and FDM printing notes.
- **Scale Standard** (`/scale-standard`) — the named reference behind every number: 175cm baseline, eyes at
  160cm, gaming scales to eye level, ratio scales to top of head. Includes the open dataset downloads.
- **FDM Printing Profiles** (`/fdm-printing-profiles`) — 26 anonymized profile scale guides (modern sci-fi epic
  32mm, fantasy epic 32mm, 28mm true scale, 35mm eye level, WWII, mech tactical, epic 6–10mm, and more), each
  with its scale, base sizes, and FDM printing tips.
- **FDM Hub** (`/fdm`) — FDM-focused math, calculators, and 5 articles on FDM printing for miniatures and terrain.

## Privacy

Your project files and dimensions stay on your hardware. Nothing is uploaded to a server — the only network
requests are an anonymous, cookie-free pageview count and optional feedback-form submissions, both writing to
a private Google Sheet. No tracking cookies, no analytics SDKs, no third-party embeds.

## Try the Tool

👉 **[Launch STLACCESS](https://stlaccess.com)**

## The Stack

- Built with **Astro** (content collections for `/guides` and `/fdm`), **Tailwind CSS v4**
  (`@tailwindcss/vite`), and **TypeScript**.
- Static-first: every page pre-rendered, no client framework, no backend database.
- Sitemap, RSS feed (21 items), `llms.txt`, `urls.txt`, and the open datasets in `public/data/`
  (baselines, conversions, profiles — JSON + CSV under CC BY 4.0, regenerated by `npm run export:data`)
  are all generated at build time.
- Structured site data (scales, conversions, profiles, tools, presets, FAQs) lives in `src/data/`
  as `.json` and `.js` modules.
- Security headers (`public/_headers`), explicit legacy redirects (`public/_redirects`), and a
  `robots.txt` with AI-crawler opt-outs are deployed with the site on Netlify.

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
├── components/    FeedbackBanner, JsonLd, tool components
├── content/       content collections: guides/ (16), fdm/ (5)
├── data/          Structured data: scales, conversions, profiles, tools, presets, FAQs
├── layouts/       Layout.astro — global header, masthead, nav, footer
├── lib/           schema helpers (JSON-LD), content freshness
├── pages/         Routes (/, /3d-math, /guides, /miniature-size-chart, /fdm, /fdm-printing-profiles, …)
└── styles/        global.css — theme tokens + prose/table styling
public/
├── _headers       security headers
├── _redirects     explicit legacy 301s (no catch-alls over live pages)
├── js/            mathscaler.js, observatory.js, adblock-detect.js
└── llms.txt       machine-readable site index
```

## Updates, Tweaks, & Suggestions

If you run into an inaccurate calculation or want to suggest a new preset scale layout, use the input forms
directly on the website to submit your notes. I monitor those requests and push out regular manual updates
whenever there's strong demand from the community for a specific conversion.

For bug reports or code-level changes, feel free to open a ticket or a pull request right here on the
repository.

## Recent Updates

- **Full debug pass** — fixed the empty RSS feed (now 21 items), corrected `llms.txt`, tightened conversion
  math precision so displayed equations balance, dropped dead React/three dependencies, added security
  headers, and added honeypot fields to the feedback forms.
- **Guides restored and de-duplicated** — the 16 `/guides` articles are live again and kept separate from the
  FDM hub articles; legacy guide URLs 301 to their live equivalents instead of the `/fdm` hub.
- **Ko-fi removed** — no longer referenced anywhere on the site.
- **Redirects audited** — retired tool slugs redirect individually and properly (`/tools/*` → `/3d-math/*`,
  one-off legacy slugs → their live pages); no catch-all shadows real pages.
- **SEO pass** — keyword-first titles, all game meta descriptions rewritten to ≤155 characters, and a
  homepage H1 that says exactly what the tool does.
- **Layout & navigation** — sticky desktop nav, mobile bottom nav, breadcrumbs, skip link, and every page's
  H1 moved up into the masthead.

---

**Built by [kitsorix](https://github.com/kitsorix-official)** — because getting miniatures to look right next
to each other shouldn't be a chore.