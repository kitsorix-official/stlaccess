# 4 — Route map

**Built output:** 49 HTML routes + `404.html` (50 files). Every route below exists in `dist/`.
**Rule:** nothing may disappear. A route can move, but it must keep a reachable home and a 301 from
its old URL.

---

## 1. Foreground tools (4)

| Route | H1 / job | Primary action | Keep as |
| --- | --- | --- | --- |
| `/stl-viewer/` | Open an STL in 3D; read the bounding box | Choose file / demo → orbit, pan, zoom, wireframe | Top-level tool tab |
| `/stl-scale-inspector/` | Check scale; get the slicer percentage | Pick source + target → copy / swap / estimate cost; or drop a file → target height → copy % | Top-level tool tab (flagship) |
| `/stl-converter/` | STL → OBJ / PLY / binary STL / ASCII STL | Choose file → format + tolerance → convert & download | Top-level tool tab |
| `/stl-printability-checker/` | Find open edges, non-manifold edges, winding, shells | Choose file → tolerance → re-check → read verdict | Top-level tool tab |

These four are the only items in the current desktop nav and the mobile bottom bar. They must stay
one tap away in every direction.

---

## 2. Core, utility, and legal (9 + widget + 404)

| Route | Purpose | Primary action |
| --- | --- | --- |
| `/` | Entry point; four tool cards; trust line; archive link | Open a tool |
| `/about/` | Who runs it; method; printer; baseline | Read; contact |
| `/contact/` | Contact form / email | Open Google Form or copy address |
| `/support/` | Donation page (Bitcoin only) | Copy BTC address |
| `/privacy/` | Privacy policy; observer; storage | Read |
| `/terms/` | Terms of service | Read |
| `/legal/` | Legal & disclaimers | Read |
| `/embed/` | Embed landing page; iframe snippet | Copy iframe code; preview widget |
| `/widget/` | Standalone embeddable scale converter (noindex) | Use the calculator |
| `/404.html` | Not found | Links to 4 tools + size-chart anchors |

**Gaps:** `/widget/` has no `<title>` or `<h1>`; `/404` has no search or archive-hub link. See
`2-page-forensics.md` U1/U3.

---

## 3. Archive hubs and reference (7)

| Route | Purpose | Inbound today |
| --- | --- | --- |
| `/archive/3d-math/` | Hub for 8 print-math calculators | 8 |
| `/archive/fdm/` | Hub for 5 FDM guides | 5 |
| `/archive/guides/` | Hub for 16 scale/print guides | 16 |
| `/archive/fdm-printing-profiles/` | 26 FDM profiles (≈21k words) | 1 |
| `/archive/miniature-size-chart/` | Full percentage table (≈11k words) | 12 |
| `/archive/scale-standard/` | The 175cm baseline and formula | 3 |
| `/archive/faq/` | Scale conversion FAQ | **0 — orphan** |

`/archive/faq/` is the only true orphan. It is in the sitemap and schema, but no page links to it.
Fix by linking from the footer/“More”, the guide FAQ blocks, and the size chart.

---

## 4. Archived calculators (8)

| Route | Action |
| --- | --- |
| `/archive/3d-math/filament-cost-calculator/` | Filament mass + spool price → cost per print; electricity optional |
| `/archive/3d-math/filament-density-calculator/` | Volume + material density → grams; prints per spool |
| `/archive/3d-math/layer-resolution-angle-calculator/` | Height + layer height → layer count; angle/step/faceting; overhang limits |
| `/archive/3d-math/miniature-resin-weight-cost-calculator/` | Volume / hollow shell + bottle preset → mL, grams, cost, army planner |
| `/archive/3d-math/reference-bar-generator/` | Generate and download a calibration bar STL (16 scales, 30–100mm) |
| `/archive/3d-math/resin-shrinkage-compensation-calculator/` | Shrink preset / measured coupon → XY/Z compensation; fit clearance |
| `/archive/3d-math/slicer-percentage-calculator/` | Source mm + target mm → percentage; 12 presets; copy/swap |
| `/archive/3d-math/eu-3d-printing-import-cost-calculator/` | Item + shipping + duty + 27 EU VAT rates → landed cost |

All eight are reachable from `/archive/3d-math/`. Seven of the hub links omit the trailing slash
(e.g. `.../filament-cost-calculator`), so they rely on a redirect; normalize in Phase 3.

---

## 5. Archived FDM guides (5)

| Route | Job |
| --- | --- |
| `/archive/fdm/what-is-fdm-3d-printing-guide/` | Beginner explainer |
| `/archive/fdm/fdm-3d-printer-filament-guide/` | Materials, nozzles, settings |
| `/archive/fdm/fdm-vs-resin-sla-sls-3d-printing/` | Technology choice |
| `/archive/fdm/best-fdm-printer-miniatures-and-terrain/` | Printer/settings guide |
| `/archive/fdm/how-to-sand-and-paint-fdm-prints/` | Post-processing |

Each has contextual tool CTAs, a related-reading block, and the archive bar.

---

## 6. Archived scale / print guides (16)

| Route | Job |
| --- | --- |
| `/archive/guides/175cm-baseline/` | Why the 175cm baseline |
| `/archive/guides/28mm-to-32mm-scale-conversion/` | 114.3% upscale |
| `/archive/guides/32mm-to-28mm-scale-conversion/` | 87.5% downscale |
| `/archive/guides/arachne-vs-classic-wall-generator-miniatures/` | Arachne vs classic |
| `/archive/guides/best-budget-3d-printers-wargaming/` | Budget printers |
| `/archive/guides/chitubox-lychee-scaling-guide/` | Slicer scaling steps |
| `/archive/guides/classic-fantasy-rpg-miniature-scale-guide/` | Generic fantasy RPG scale |
| `/archive/guides/cura-tree-support-settings-miniatures/` | Tree supports |
| `/archive/guides/fdm-miniature-printing-guide/` | FDM miniature printing |
| `/archive/guides/fdm-vs-resin-miniatures/` | FDM vs resin |
| `/archive/guides/how-to-measure-miniature-scale/` | Eye level vs top of head |
| `/archive/guides/real-world-objects-to-28mm/` | Feet → mm at 28mm |
| `/archive/guides/real-world-objects-to-32mm/` | Feet → mm at 32mm |
| `/archive/guides/resin2fdm-convert-stl-to-fdm-ready/` | Resin supports → FDM |
| `/archive/guides/sci-fi-mass-battle-35mm-scale-guide/` | Generic 35mm mass battle |
| `/archive/guides/upscaling-3d-prints-detail-limit/` | How far can you upscale |

**IP note:** these are the de-branded rewrites. Do not reintroduce game names, publishers, factions,
or “proxy” framing. The old game-system data stays retired.

---

## 7. Actions inventory (nothing may disappear)

### Global
- Logo → `/`
- Desktop nav: Viewer, Scale Inspector, Converter, Printability, Support
- Mobile nav: Viewer, Inspector, Converter, Checks
- Footer: About, Contact, Support, Privacy, Terms, Legal, archive/reference links
- Support nudge: collapse/expand, copy BTC, open `/support/`
- Feedback banner: dismiss, open `/#feedback`
- Observer opt-out: `?admin=1` (documented on `/privacy/`)
- Skip-to-content link

### Scale Inspector
- Source select (16 baselines, grouped)
- Target select (16 baselines)
- Eye Level / Top of Head radio
- Shrinkage toggle + rate
- Copy percentage
- Swap source/target
- Estimate cost → `/archive/3d-math/filament-cost-calculator/`
- File: choose / drag-drop / demo 20mm cube
- Target height input
- Copy percentage (file result)
- Unit mismatch warning
- Result formula + context

### Viewer
- Choose / drag-drop / demo
- Reset camera
- Wireframe toggle
- Orbit (drag, arrow keys), pan (shift/right drag), zoom (wheel/pinch/+−), reset (double-click/0)
- Stats: name, format, triangles, size, dimensions

### Converter
- Choose / drag-drop / demo cube
- Output format: OBJ, PLY, binary STL, ASCII STL
- Vertex merge tolerance
- Convert & download
- Status + saved-file summary
- Format guide links
- FAQ (includes “no reverse conversion”)

### Printability Checker
- Choose / drag-drop / demo cube / demo broken
- Merge tolerance (auto re-runs on change)
- Re-check
- Verdict + 5 checks + findings + stats (name, format, size, triangles, vertices, dimensions, volume, area)
- Next-step links / related guides

### Archive calculators
- Each has its own inputs, preset buttons, copy/swap, download (reference bar), and FAQ.
- All are linked from their hub; preserve their input IDs and scripts when moving them into the new
  shell.

### Guide template
- Breadcrumb, archive bar, primary CTA, in-body CTA, FAQ, follow-up CTA, related reading, next steps
- Table of contents (where present)
- Download/print? (verify per guide; no global action today)

### Support
- Copy BTC address
- Copy contact address (if present)
- Open explorer link (if present)
- Back to tools

### Embed / Widget
- Copy iframe snippet
- Preview iframe
- URL parameters: `source`, `target`, `logic`, `shrinkage`, `rate`

---

## 8. Legacy URLs and redirects

`public/_redirects` is the source of truth. The main families:

| Old | New |
| --- | --- |
| `/calculator`, `/calculator/*` | `/archive/3d-math/…` |
| `/library`, `/reference`, `/reference/*` | `/archive/miniature-size-chart/` |
| `/tools`, `/tools/*` | `/archive/3d-math/…` or `/stl-scale-inspector/` |
| `/guides`, `/guides/*` | `/archive/guides/…` |
| `/blog/*` | `/archive/fdm/` (with specific guide mappings first) |
| `/games/*` | `/archive/fdm-printing-profiles/` (with specific generic guide mappings first) |
| `/cookies` | `/privacy/` |
| `/llm.txt` | `/llms.txt` |

Do not delete a redirect when a route moves again. Add a new rule in front of it.

---

## 9. Proposed Phase 3 areas (provisional)

The brief asks for 4–7 sidebar areas. The prior constraint says archived content must stay
**unlinked from the nav**. These conflict. Proposed resolution:

| Area | Contains | Nav treatment |
| --- | --- | --- |
| **Tools** | Viewer, Inspector, Converter, Checker | Always visible; 4 tabs |
| **Print** | FDM hub + 5 FDM guides + 26 profiles | Under “Library” |
| **Scale** | Size chart, scale standard, 28→32, 32→28, measuring, 175cm | Under “Library” |
| **Math** | 8 calculators + 3D math hub | Under “Library” |
| **Learn** | Remaining guides, FAQ | Under “Library” |
| **About** | About, Support, Contact, Privacy, Terms, Legal, Embed | Footer / “More” |

**One nav entry, “Library”**, opens a searchable index. Individual archive pages are never listed in
the global nav, so the old constraint holds. If you prefer the literal 4–7 visible areas, the archive
constraint has to be relaxed — decide in Phase 3.

---

## 10. The orphan test (required in Phase 3)

Add `scripts/check-routes.mjs`:

1. Read the route manifest generated from `dist/` (every `index.html` + `404.html`).
2. Parse every internal `href` and normalize trailing slashes.
3. Fail if any route has **zero** inbound links from another route.
4. Fail if any internal link points to a missing route.
5. Fail if any legacy redirect target is missing.
6. Fail if a route is not in the sitemap (except noindex `/widget/` and `/404`).

Current status: 49 routes, 1 orphan (`/archive/faq/`), 29 links without trailing slashes, 0 missing
targets. The existing discovery audit checks links resolve; it does not check inbound reachability.
