# STLACCESS — Bing Webmaster Tools analysis & rebuild plan

Date: 2026-11-17
Source: 9 CSV exports in `~/Documents/stlaccess/` (data window 2026-08-17 → 2026-11-15 for the AI performance series).
Secondary research: Bing web search / Copilot-facing SERPs for the main query clusters (Nov 2026).

## 0. TL;DR

The site is not failing because the topic is wrong. It is failing because the "clean slate" in commit `58efa17` deleted the exact pages that were earning impressions and AI citations, and shipped no redirects for them.

- **53.6% of all AI citations (1,914 of 3,570)** and **62.8% of search impressions (1,897 of 3,022)** in the exports belong to URLs that are **not in the current sitemap**.
- The #1 AI-cited page (`/archive/guides/fdm-miniature-printing-guide/`, 546 citations) is a 404 today. Bing still shows `/archive/...` URLs in its index.
- The current 100-URL site is mostly thin, templated `/reference/*` and `/games/*` pages, while the content that answered real questions (Resin2FDM, Arachne vs Classic, size chart, FDM settings) is gone.
- Authority should be rebuilt around **four evidence-backed pillars**, not the current wargaming-calculator-only framing:
  1. Miniature scale & conversion math (the proven core)
  2. Resin → FDM conversion
  3. FDM miniature printing technique & slicer behaviour
  4. STL file fundamentals / browser-only tools
  ...with game-system scales as a supporting encyclopedia and a strict "educational hub, no models for sale" boundary.
- Before any content work: restore URLs with 301s / canonical equivalents, add real answer-first page structure, OG cards, real `lastmod` dates, and machine-readable pages for AI engines.

## 1. What the exports actually measure

| File | Rows | What it tells us |
|---|---:|---|
| KeywordReport | 1,045 queries, 1,657 impressions, 132 clicks | Extremely long-tail, question-shaped queries. No single head term dominates. |
| PageTrafficReport | 65 pages, 3,022 impressions, ~139 clicks | Half the traffic is on URLs that no longer exist. |
| AIPageStatsReport | 61 pages, 3,570 citations | AI engines heavily cite the guides that were deleted. |
| AIPerformanceOverviewStats | 91 days, 3,833 citations, 521 "cited pages" | Citations are volatile but real; the asset base is being lost. |
| AISearchQueriesReport | 13 grounding queries | Direct evidence of what AI engines "ask" when citing us. |
| AITopicsOverallPortfolio | 3 topics | Model Building & Miniatures is the only relevant topic (1M–5M volume). |
| AITopicsTopOpportunityQueries | 50 queries | Mostly off-brand commercial hobbies (LEGO, wooden kits, brushes). Use selectively. |
| CountryReport | 11 countries | US 2,164 / GB 503 / CA 202 impressions = 95%+ of measurable traffic. |
| DeviceReport | 2 rows | Desktop 3,670 imp / pos 5.01; Mobile 171 imp / pos 8.07. Content-heavy pages need mobile work. |

## 2. Findings by cluster

Clusters below are keyword groupings from the 1,045-row export (overlapping; counts are directional).

| Cluster | Queries | Impr. | Clicks | Evidence in AI data |
|---|---:|---:|---:|---|
| Scale conversion / sizing | 419 | 675 | 56 | "star wars legion scale" 58 citations / 38.67% share; "standard dnd mini size" 35; "what scale is 32mm" 9 |
| FDM settings & printing miniatures | 389 | 640 | 64 | `/guides/fdm-miniature-printing-guide` 413 + archive 546 citations |
| Filament / cost / density math | 43 | 55 | 2 | `/3d-math/filament-density-calculator` 46 citations (URL gone) |
| Resin → FDM conversion | 99 | 221 | 19 | `/guides/resin2fdm-convert-stl-to-fdm-ready` 280 + archive 79 citations; "resin to fdm blender" 14 citations / 51.85% share |
| STL file basics | 113 | 175 | 13 | "open stl file" 10 imp at pos 8.9; old `/stl-viewer/` 5 AI citations |
| Arachne vs Classic walls | 61 | 106 | 4 | 243 + 124 AI citations across live/archive variants; 4 distinct phrasings in top 20 |
| D&D / RPG scale | 48 | 69 | 3 | "standard dnd mini size" is a top grounding query |
| Star Wars / sci-fi games | 25 | 40 | 1 | top AI grounding query overall (58 citations) |
| Real-world → scale | 15 | 24 | 0 | "real-world objects to 28mm" 95 AI citations (URL gone) |

**Best quick wins** (ranking position 3–10, real question intent): `resin2fdm` (46 imp, pos 8.0), `fdm miniatures` (12, pos 8.7), `open stl file` (10, pos 8.9), `arachne wall generator vs classic` (9, pos 6.6), `what scale is star wars legion` (8, pos 4.5), `stl open online` (4, pos 10), `miniature scale conversion chart` (4, pos 7.5), `what scale are dnd miniatures` (3, pos 10).

**Do NOT chase from the opportunity export:** "wooden model kits for adults", "lego star wars moc", "car model", "best brushes for miniature painting", "warhammer 40k tyranids models", "游戏模型网站" etc. These are commercial/product or brand-fandom intents with no connection to a browser-only educational tool. The only useful ones are "what scale is warhammer 40k", "warhammer 40k scale", "open amf file", and "generate 3d models from photos methods" (as an explainer only).

## 3. The breakage, concretely

### 3.1 Lost URL equity (P0)
High-value pages referenced in the exports but absent from `dist/sitemap.xml` and with no redirect in `public/_redirects`:

| Old URL | AI citations | Search impressions | Suggested destination |
|---|---:|---:|---|
| `/archive/guides/fdm-miniature-printing-guide/` | 546 | 378 | `/guides/fdm-miniature-printing-guide` (restore) |
| `/guides/resin2fdm-convert-stl-to-fdm-ready` | 280 | 232 | restore at same path |
| `/guides/arachne-vs-classic-wall-generator-miniatures` | 243 | 172 | restore at same path |
| `/archive/guides/arachne-vs-classic-wall-generator-miniatures/` | 124 | 108 | 301 → live guide |
| `/archive/guides/chitubox-lychee-scaling-guide/` | 106 | 44 | 301 → `/guides/chitubox-lychee-scaling-guide` |
| `/guides/real-world-objects-to-28mm` | 95 | 36 | restore at same path |
| `/archive/guides/resin2fdm-convert-stl-to-fdm-ready/` | 79 | 136 | 301 → restored guide |
| `/miniature-size-chart` | 47 | 296 | restore + 301 from `/archive/miniature-size-chart/` |
| `/3d-math/filament-density-calculator` | 46 | 93 | restore as `/tools/filament-density-calculator` + 301 |
| `/fdm-printing-profiles`, `/fdm/*`, `/3d-math/*`, `/stl-viewer/`, `/stl-scale-inspector/` | 200+ | 250+ | restore as tools/hubs or 301 to closest live equivalent |

All source content is recoverable from git history: commit `6edf0a6` still contains `src/content/guides/*.md` (Resin2FDM, Arachne, FDM miniature printing, FDM vs resin, Cura tree supports, RPG scale, sci-fi scale), `src/content/fdm/*.md`, and `src/pages/archive/miniature-size-chart/index.astro`.

### 3.2 Technical / on-page gaps
- No Open Graph or Twitter/X card tags anywhere in `Layout.astro` or built HTML — social and AI unfurls render bare.
- `sitemap.xml` `lastmod` is set to the **build timestamp for every URL** (`astro.config.mjs` lines 11–14, 94–97). This is a false freshness signal; use real `modDate`/file mtime and keep one build timestamp only for the index.
- `public/llms.txt` is stale: says "6 deep-dive guides" (actual 11), "Umami" analytics (actual self-hosted `observatory.js`), and Astro 7.1.3 (actual ^7.2.3). `README.md` says 44 conversions (actual 46) and "no client framework" (React/Three.js ships for the 3D visualizer).
- `robots.txt` blocks Wayback/Internet Archive bots. For an educational reference hub that wants to be cited, blocking archival crawlers is counterproductive; allow all well-behaved crawlers and explicitly allow AI crawlers.
- No `llms-full.txt`, no machine-readable dataset endpoints (the old site had `/scale-standard` + open datasets; gone now).
- Huge templated thin-page surface: 46 near-identical `/reference/*` pages + 26 `/games/*` pages generate most of the 100 URLs but almost no impressions; they dilute the site's perceived focus.
- Local `npm run build` exits with `Illegal instruction (core dumped)` in this environment before Astro emits anything. Likely an incompatible native binary (Astro/sharp) on this CPU; verify on the deploy target before judging deploy health.

## 4. Bing / AI-surface research notes

- Bing SERPs for the priority clusters are dominated by **YouTube tutorials, Reddit threads, vendor marketing pages, and official docs** (e.g. Bambu Lab's Arachne wiki, Resin2FDM's own docs, STL viewer tools). There is no strong independent, ad-free, calculation-first educational source ranking consistently — that is the opening.
- Bing exposes an "AI Mode" for these queries; the Webmaster AI reports confirm our content is already used as grounding (38.67% citation share for "star wars legion scale", 51.85% for "resin to fdm blender"). Both signals say: **answer-first, sourceable, numeric content wins**.
- Competitor pages win with: explicit step lists, tables of numbers, plain-language "when to use X vs Y", machine-readable FAQ blocks, and clear authorship. Our site should match that format while keeping the no-upload/no-account privacy angle, which is a genuine differentiator.
- Data shows desktop-first consumption (pos 5.01) but mobile is worse (pos 8.07) — answer blocks and tables must work on small screens.

## 5. Proposed structure (topical authority, no commerce)

Keep the existing Astro/Tailwind stack; reorganise the **information architecture**, not the technology. Suggested final shape:

```
/                              Answer-first hub: "STL files & 3D print scale, explained"
/methodology/                   Source of truth: 175cm baseline, eye-level rules, formula, test prints
/learn/                         Pillar index (four cards, links to all clusters)
  /learn/scale/                 P1 — Scale & conversion math
  /learn/fdm/                   P3 — FDM miniature printing & slicer behaviour
  /learn/resin-to-fdm/          P2 — Resin → FDM conversion workflow
  /learn/stl-files/             P4 — STL formats, viewing, checking, fixing
/reference/                     Data layer: 46 conversions + complete size chart
/games/                         Supporting encyclopedia: 26 systems, scale answers first
/tools/                         Browser-only utilities (no upload, no login)
/answers/                       Short, query-led answer pages built from the 1,045 queries
/about, /faq, /privacy, /terms, /legal, /contact
```

Editorial rule: **no product roundups, no "best X to buy", no file marketplace**. Tools and explainers only.

### First 20 pieces to restore/write (ordered by evidence)
1. Restore + expand `fdm-miniature-printing-guide` (546+413 citations)
2. Restore + expand `resin2fdm-convert-stl-to-fdm-ready` (280+79)
3. Restore + expand `arachne-vs-classic-wall-generator-miniatures` (243+124)
4. Restore `miniature-size-chart` as an authoritative all-scales data page (47+296)
5. Restore `real-world-objects-to-28mm` and `-32mm` (95)
6. Restore `chitubox-lychee-scaling-guide` (343 AI citations on live URL already)
7. Restore `fdm-vs-resin-miniatures` (17+1), `how-to-measure-miniature-scale` (16+25), `175cm-baseline` (12)
8. Restore `cura-tree-support-settings-miniatures`, `classic-fantasy-rpg-miniature-scale-guide`, `sci-fi-mass-battle-35mm-scale-guide`
9. Rebuild `/3d-math/filament-density-calculator` as a tool + explainer (46 citations)
10. New: "How to open an STL file (offline and in-browser)" (10 imp, no strong independent ranking page)
11. New: "Why your STL looks tiny in Lychee/Chitubox" (4 imp, exact high-intent question)
12. New: "Resin2FDM support thickness by sculpt" (data from old guide: 0.05–0.2mm, Bite the Bullet ~0.05mm, Puppets War ~0.07mm)
13. New: "Slicer scale percentage formula & worked examples" (answers the 6-imp "what percentage..." query)
14. New: "75mm → 32mm shrink" and other single-conversion answer pages generated from the 46-pair dataset
15. New: "0.2mm vs 0.4mm nozzle for miniatures" (multiple nozzle queries)
16. New: "FDM print orientation & support angle for miniatures" (4 imp)
17. New: "PLA density: grams ↔ volume ↔ cost" (43 filament queries)
18. New: "What scale is Legions Imperialis?" (20 AI citations, 31.25% share)
19. New: "What scale is Star Wars Legion?" (58 AI citations — expand existing game page into a full guide)
20. New: "TTRPG scale: houses, furniture, terrain" (20 AI citations, 29.85% share)

## 6. SEO / AIO / GEO specification

**On every page**
- First screen: 40–60 word direct answer, then a `Key facts` table (numbers, units, source, date). No "In this article" preamble before the answer.
- Author/identity block: `kitsorix`, 3D printing hobbyist, real test setup (Bambu Lab A1 Mini, PARKSIDE caliper 0.01mm), last reviewed date.
- `How I calculated this` / `Sources` section with internal links to `/methodology/` and external links to primary docs where relevant.
- JSON-LD graph: `BreadcrumbList`, `Article` or `TechArticle`, `FAQPage` (only where visible Q&A exists), `Organization`, `WebSite` + `SearchAction`, `ItemList` on hubs, `SoftwareApplication` on tools.
- `og:title`, `og:description`, `og:type`, `og:url`, `og:image` (reuse `public/og-image.svg` or make a PNG), `twitter:card=summary_large_image`.
- Real `dateModified` from content frontmatter; sitemap `lastmod` must match it.

**Machine discoverability**
- Rewrite `llms.txt` as a concise map of hubs + canonical facts (fix stale counts and analytics name).
- Add `llms-full.txt` with the full text of key guides, or provide `/data/*.json|csv` clean datasets (scales, conversions, filament densities, game systems) and link them from `llms.txt`.
- Allow all AI/crawler user agents in `robots.txt`; keep one canonical sitemap and submit via IndexNow after each deploy (the workflow already exists).
- Keep `noindex` only for truly thin utility endpoints, never for guide hubs.
- Consistent entity: "STLACCESS" as the site/brand; "STL scale" only as a function. Apply to titles, JSON-LD, llms.txt, README, footer.

**Internal linking**
- Every guide links to: its pillar hub, `/methodology/`, 2–3 sibling guides, and 1 relevant tool/conversion page.
- Every tool links to the explainer that justifies its math.
- No orphan pages; generate a link graph check in CI.

**Measurement**
- Re-export Bing Webmaster data monthly; track AI citations per URL (the metric that actually moved here), impressions for the 20 target queries, and 404s in Bing's indexed pages report.
- Expect a dip first: removing thin pages/consolidating can temporarily reduce impressions. Judge by citations and clicks on the restored guide cluster.

## 7. Roadmap

- **P0 — stop the bleeding (day 1–2):** 301s for every retired high-value URL; restore the three biggest guides from git at their old paths; fix OG/Twitter tags; fix stale `llms.txt`/README numbers; real `lastmod`.
- **P1 — rebuild the core (week 1–2):** restore remaining guides from `6edf0a6`, modernise them to the answer-first template, add `/methodology/`, restore filament-density calculator, rewrite Bing-facing titles/descriptions around the actual queries.
- **P2 — build out authority (weeks 3–6):** four pillar hubs, 20 target pieces above, machine-readable datasets, `llms-full.txt`, internal link graph, mobile table/answer UX.
- **P3 — compound (ongoing):** monthly Bing data review, refresh guides with real test results, expand single-conversion answer pages from the 46-pair dataset, prune pages with zero impressions after 90 days.

## 8. Decisions needed before implementation

1. Full IA reset with 301 migration, or keep current `/guides|/tools|/reference|/games` paths and add pillars on top?
2. Restore old git content verbatim-then-expand, or rewrite from scratch using the old guides only as research notes?
3. Keep the first-person "I built this on my A1 Mini" voice, or move to neutral editorial "we tested"?
4. Should `/answers/*` short query-led pages be built programmatically from the keyword export, or hand-written only?
