# 1 — Usage audit

**Date:** 2026-10-30
**Scope:** all routes in `dist/` (49 HTML pages + `404.html`)
**Verdict:** there is no pageview, time-on-page, click, or device dataset available locally. The
ranking below is a **provisional, evidence-weighted ranking**, not a measurement. Do not present it
as analytics.

## 1. What exists

| Source | What it holds | Available today? |
| --- | --- | --- |
| Custom observer (`public/js/observatory.js` v4) | One row per page view: `timestamp_utc`, `date`, `page`, `agent` (human/crawler/automation), `source` (direct/search/ai/social/referral), `source_name`, `referrer` | Script is in the repo; the exported CSV is **not** on disk. |
| Bing Webmaster AI citation export (2026-10-24) | Cited pages, cited queries, AI citation counts, opportunity queries | CSV is **not** on disk. Figures below are from the earlier read in this session. |
| Browser/DB logs | — | None. No PostHog, GA, server logs, or database. |
| Repo structure | Routes, internal links (`toolGraph.json`), page depth, data counts | Yes, fully auditable. |

**Checked 2026-10-30:** `~/Downloads` contains only `cpagrip_offers.csv`. No observer CSV, no Bing CSV.
If you still have either export, re-drop it and this audit can become measured.

## 2. What the observer can and cannot answer

It **can** answer, per day:

- page views and relative page popularity
- human vs crawler vs automation split
- arrival channel (direct, search, AI, social, referral) and operator (Google, Bing, ChatGPT, etc.)

It **cannot** answer:

- time on page
- rage clicks or dead clicks
- which button was pressed
- phone vs desktop share
- file size, tool completion, or conversion success
- return-visitor behaviour (by design: no identifier, nothing stored on the device)

The brief's Phase 1 asks for all of these. Four of the six are not collectable with the current
observer, and the fifth (device share) would require a new field. **Do not claim mobile share from
this data.** Mobile priority is justified by the task context (one-handed use, picking a file on a
phone), not by a measured percentage.

## 3. Historical Bing AI signals (2026-10-24 export)

These are directional, not auditable from disk:

- AI citations were rising into the **55–133 per day** range.
- The most-cited pages were **guides**, not the four tool pages.
- The strongest cited queries were: **Star Wars Legion, Arachne, D&D, resin → FDM, slicer scaling**.
- The largest opportunity queries were dominated by **Warhammer 40k, model kits, and LEGO MOCs** —
  demand the site can serve generically, without naming the IP.

Implication: **article-led discovery is currently stronger than tool-led discovery.** People arrive
on a guide, get an answer, and leave. The redesign should make the guide → tool hand-off a
one-tap action, and should not assume the homepage is the front door.

## 4. Structural proxy: what the site itself treats as important

This is not usage. It is the owner's deliberate linking, which is the best available stand-in until
the observer export returns.

- `toolGraph.json` gives every tool three "next step" links, so all four tools have equal graph
  weight (3 inbound next-steps each).
- Ten guides are linked from tool pages; five are linked from **two** tools:
  `how-to-measure-miniature-scale`, `fdm-miniature-printing-guide`,
  `upscaling-3d-prints-detail-limit`, `resin2fdm-convert-stl-to-fdm-ready`,
  `cura-tree-support-settings-miniatures`.
- The four foreground tools are in the global header and the mobile bottom bar on every page.
  Archive pages are reachable only through in-body links (by design), so their inbound counts are
  content-graph weight, not traffic.
- Page depth (visible words) is highest on reference pages: the size chart (~11,000 words) and the
  FDM profiles hub (~21,000 words). These are reference surfaces, not task surfaces.

## 5. Provisional screen ranking

Confidence is about the *ranking*, not about measured traffic.

| # | Screen | Evidence | Confidence | Why it matters |
| --- | --- | --- | --- | --- |
| 1 | `/stl-scale-inspector/` | Flagship; homepage primary CTA; scale queries in Bing; most "next step" links point here | High | The core job: "what percentage do I type into my slicer?" |
| 2 | `/stl-converter/` | High-intent query class ("STL converter"); distinct job; top-nav slot | Medium-high | A clear, finishable task with a download at the end. |
| 3 | `/stl-printability-checker/` | Differentiator; "will this print?" intent; top-nav slot | Medium | Prevents wasted resin; a natural next step after scale. |
| 4 | `/stl-viewer/` | Commodity, but top-nav slot and first in the homepage grid | Medium | High volume potential, low differentiation; must feel instant. |
| 5 | `/` | Entry point and router; 4 tool cards; brand | High (visits), low (task depth) | Must put the four jobs above the fold on a phone. |
| 6 | `/archive/guides/28mm-to-32mm-scale-conversion/` | Top cited conversion query | High (Bing) | The article that currently wins AI citations. |
| 7 | `/archive/guides/32mm-to-28mm-scale-conversion/` | Companion query | Medium-high | Same intent in reverse. |
| 8 | `/archive/guides/arachne-vs-classic-wall-generator-miniatures/` | Top cited query ("Arachne") | High (Bing) | A guide with no obvious tool hand-off; needs a printer/profile CTA. |
| 9 | `/archive/guides/resin2fdm-convert-stl-to-fdm-ready/` | Top cited query ("resin → FDM") | Medium-high | Strong hand-off to the converter and checker. |
| 10 | `/archive/miniature-size-chart/` | "Most searched" table; ~11k words; reference hub | Medium | A reference surface that should link every row to the inspector. |
| 11 | `/archive/3d-math/*` (8 calculators) | Long tail; deliberate CTAs from hubs | Low | Keep, but do not lead the redesign with them. |
| 12 | Support / privacy / terms / legal / contact | Low frequency, high trust | — | Must remain reachable and calm, not prominent. |

### What goes first in Phase 4

1. **Shell** (top bar, phone bottom bar, search, support nudge, footer) — one PR.
2. **Scale Inspector** — the busiest job and the flagship.
3. **Converter** — the clearest finishable task.
4. **Printability Checker** — the differentiator.
5. **Viewer** — commodity, but must stay one tap away.
6. **Guide template + size chart** — the AI-citation front door.
7. **Archive calculators + hubs** — long tail, no visual deep work beyond the shell.
8. **Utility/legal** — last.

## 6. Metrics to add before Phase 4 (privacy-safe, needs approval)

The observer is privacy-first by design; keep it that way. Add **aggregate events with no
identifier and no filename**, and update the privacy page in the same PR:

| Event | Payload | Why |
| --- | --- | --- |
| `tool_opened` | tool slug | Which tool is actually used |
| `file_selected` | tool slug, format, size bucket (not filename) | Empty-state vs real use |
| `parse_ok` / `parse_error` | tool slug, error class | Dead-end rate |
| `result_copied` | tool slug | Did the user get the answer out? |
| `conversion_downloaded` | tool slug, output format | Task completion |
| `check_completed` | tool slug, verdict bucket | Task completion |
| `demo_used` | tool slug | Onboarding effectiveness |
| `next_step_clicked` | from slug, to slug | Which hand-offs work |
| `viewport_bucket` | `narrow` / `wide` (no dimensions, no ID) | Coarse phone vs desktop share |

Do **not** add session IDs, scroll depth, click coordinates, or a device fingerprint. Those would
break the site's stated privacy position and create a consent obligation it does not currently have.

## 7. What this audit does not decide

- It does **not** prove which tool is busiest. Confirm with a fresh observer export.
- It does **not** prove phone share. Treat mobile as a first-class constraint because of the task,
  not because of a number.
- It does **not** rank the archive by traffic. The Bing signals are directional and the CSVs are
  gone.

## 8. One request

Re-export the observer CSV (and the Bing AI CSV if you still have it). With page views by page and
agent, the Phase 4 order can be locked to measured demand instead of inference.
