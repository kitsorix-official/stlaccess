# 2 — Page forensics

**Method:** source inspection of `src/pages`, `src/components`, `src/layouts`, and `public/js`, plus
the built HTML in `dist/`. Every issue below is reproducible from the cited file. Severity is about
user harm, not visual taste.

**Severity:** **P0** = lost work / wrong answer / blocked task. **P1** = user gets stuck or misled.
**P2** = friction or distrust. **P3** = polish.

---

## Global shell

| # | Issue | Sev | Evidence | Fix |
| --- | --- | --- | --- | --- |
| G1 | **No search.** 49 routes, and the only way to find an archived calculator or guide is an in-body link. | P1 | No search component or `/search` route exists. | Phase 3: add ⌘K search over a generated route manifest. It must find every route, including `/archive/faq/`. |
| G2 | **`/archive/faq/` is orphaned.** It exists, is indexable, and has zero inbound links. | P1 | `grep -rl 'href="/archive/faq/"' dist` returns nothing. | Link it from the footer/“More” and from the FAQ blocks; add the route-manifest test in Phase 3. |
| G3 | **Mobile nav has four tools but no Home.** The logo is the only home affordance, and it is at the top of the page, not in the thumb zone. | P2 | `src/layouts/Layout.astro:500-552`. | Add a Home tab, or make the first tab a “Home” icon and move one tool into “More”; do not drop a tool. |
| G4 | **“Checks” is ambiguous.** It is the only label that is not a noun for the tool. | P2 | `Layout.astro:549`. | Rename to “Print check” or “Checker”. |
| G5 | **Support nudge can be clipped by the mobile nav on safe-area phones.** Nudge is `bottom-16` (64px); nav is `h-16` **plus** `env(safe-area-inset-bottom)` (~34px). Nav `z-50` is above nudge `z-40`, so the bottom of the card is hidden behind the nav. | P2 | `SupportNudge.astro:44`; `Layout.astro:504`. | Use `bottom-[calc(4rem+env(safe-area-inset-bottom))]` on mobile, or `bottom-20`. Verify on an iPhone-sized viewport. |
| G6 | **Support nudge is not disclosed in the privacy page.** Privacy lists LocalStorage (feedback/banner + observer opt-out) but the nudge writes `sessionStorage`. | P2 | `SupportNudge.astro:23,31-33,120-133`; `privacy.astro:177-195`. | Add one sentence for the session-only nudge choice, or move the nudge to the same disclosed LocalStorage key. |
| G7 | **Feedback banner is the loudest element on the page.** Full-width orange gradient above the footer on every page, duplicating the support nudge. | P2 | `FeedbackBanner.astro` (`bg-gradient-to-r from-[#ff6b35]`), rendered by `Layout.astro`. | Make it a quiet one-line link, or retire it now that the support nudge exists. Keep the dismissal. |
| G8 | **Spinners, not skeletons.** Every tool shows an `animate-spin` ring while parsing. | P2 | `stl-scale-inspector/index.astro:354`; `stl-converter/index.astro:113`; `stl-printability-checker/index.astro:121`; `stl-viewer/index.astro:135`. | Use a skeleton of the result strip (name, format, dimensions) with a quiet “reading locally…” label. |
| G9 | **29 internal links omit the trailing slash.** Astro is configured with `trailingSlash: 'always'`; these links rely on a redirect. | P3 | Mostly archive hub → calculator links, e.g. `dist/archive/3d-math/index.html` links to `/archive/3d-math/eu-3d-printing-import-cost-calculator` (no slash). | Normalize links at build time; add a check to the discovery audit. |
| G10 | **“Most used” is an unsupported usage claim.** The chip is hard-coded on the Scale Inspector. | P2 | `src/pages/index.astro:27,107`. | Until the observer export exists, say “Start here” or “Flagship”, not “Most used”. |

---

## Home (`/`)

| # | Issue | Sev | Evidence | Fix |
| --- | --- | --- | --- | --- |
| H1 | **The four tools may be below the phone fold.** Hero is `pt-24 pb-16` plus an 80px sticky nav, then a large headline and tagline before the tool grid. | P1 | `index.astro` hero + tool grid; `Layout.astro` h-20 nav. | Put a compact 2×2 tool grid (or one “Start here” row) in the first viewport on phones. Keep the long copy below. |
| H2 | **The page repeats the tool pages.** Privacy proof, how-it-works, use cases, FAQ, and feedback all sit on the homepage. | P2 | `index.astro` sections after the grid. | Keep one trust line + the tool grid + one “how it works” strip. Move the rest to About. |
| H3 | **“115%” reads like a number claim.** The sentence contrasts “a close-enough 115%” with “the exact 114.3%”. | P2 | `index.astro:199`. | Say “about 115%” or use only 114.3%. |
| H4 | **“15+ gaming scales” is misleading.** There are 16 baselines, but only 10 are gaming/display and 6 are ratio scales. | P2 | `tools.json:12`; `scaleBaselines.json`. | “16 scale standards (10 gaming/display + 6 ratio)” or “16 scales”. |
| H5 | **No recent/continue affordance.** Returning users start from zero. | P3 | No storage by design. | Use URL state and browser history; do not add tracking storage. A “last used” chip would require storage and should be rejected. |
| H6 | **The old scale reference is a paragraph below the grid.** Returning users may not scroll. | P2 | `index.astro` “Looking for the old scale reference?” paragraph. | Move it into the footer’s “Archive” link, or make it a quiet secondary card next to the grid. |

---

## Scale Inspector (`/stl-scale-inspector/`)

| # | Issue | Sev | Evidence | Fix |
| --- | --- | --- | --- | --- |
| I1 | **State is lost on Back and refresh.** `mathscaler.js` reads `source`, `target`, `logic`, `shrinkage`, `rate` from the URL on load but never writes them back. | P0 | `public/js/mathscaler.js:103,152`; no `history.replaceState`/`pushState`. | On every change, `history.replaceState` the current state. Then Back/refresh/share all work. |
| I2 | **Two competing flows on one page.** A scale calculator at the top and a file inspector below, each with its own percentage. | P1 | `stl-scale-inspector/index.astro` `#engine` and `#file-inspector`. | One primary surface with a mode switch: “I know the scale” / “I have a file”. Share the result strip. |
| I3 | **Dropzone is a partial click trap.** Only clicks on the outer padding (`event.target === drop`) open the picker; clicking the icon, text, or buttons inside does not. After a file loads, the dropzone click does nothing. | P2 | `public/js/stl-inspector.js:183-185`; same pattern in converter/checker. | Make the whole dropzone a `<label>`/button, or attach the click to the container and ignore only the explicit buttons. After load, show a “Replace file” action. |
| I4 | **The default result can be mistaken for the user's data.** A server-rendered 114.3% card is visible before any input. | P2 | `stl-scale-inspector/index.astro` `defaultResultText` + result card. | Label it “Example: 28mm → 32mm” until the user changes an input; then switch to “Your result”. |
| I5 | **Three equal actions in the result card.** “Estimate Cost” (navigation) is styled like “Copy” and “Swap” (in-place actions). | P2 | `stl-scale-inspector/index.astro` result card buttons. | One primary: “Copy 114.3%”. Put “Estimate cost” and “Swap” in a quiet secondary row. |
| I6 | **Shrinkage default contradicts the published range.** The input defaults to 1.5% while `site.json` says `shrinkageRange: "0.2-0.5%"`. | P2 | `stl-scale-inspector/index.astro` `value="1.5"`; `src/data/site.json:10`. | Default to 0.4% (mid-range) or change the copy. Needs approval because it changes a number. |
| I7 | **The calculator and the file inspector do not share state.** Changing one does not update the other. | P2 | Separate JS modules and result elements. | A single result model: file height + target height → percentage; the scale pair is another input to the same model. |
| I8 | **Trust copy sits inside the result card.** “Tested on Bambu A1 Mini” + “My Methodology” compete with the answer. | P3 | `stl-scale-inspector/index.astro` result card footer. | Move to a quiet footnote under the card. |
| I9 | **The “Top of Head” result has no visible formula.** Head overrides are rendered as “Validated by my test prints”, so the user cannot check the math. | P2 | `mathscaler.js` override branch; `conversionMatrix.json` `topHeadPercentage`. | Show “Measured override” + the formula basis, or recompute from the baseline and show the formula. See `3-numbers-audit.md`. |
| I10 | **No reset.** “Swap” is not a reset; there is no way back to the default pair except reload. | P3 | Result card actions. | Add a quiet “Reset” link. |

---

## Viewer (`/stl-viewer/`)

| # | Issue | Sev | Evidence | Fix |
| --- | --- | --- | --- | --- |
| V1 | **No state persistence.** Wireframe, camera, and file reset on reload/Back. | P2 | `stl-viewer.js` keeps state in memory; no URL writes. | Persist `wireframe` and camera in the URL hash; the file cannot persist for privacy. |
| V2 | **The canvas blocks page scroll on phones.** `touch-none` on a 420px stage means a one-finger drag rotates instead of scrolling; users can get stuck. | P1 | `stl-viewer/index.astro:117`. | Use `touch-pan-y` or a two-finger gesture for orbit, or add a visible “scroll the page” affordance outside the stage. |
| V3 | **Empty state is a black rectangle.** The first screen is a large dark canvas with a toolbar; the “choose/demo” actions are above it, not inside it. | P2 | `stl-viewer/index.astro:120-134`. | Put the choose/demo actions in the empty canvas, centered, like the other tools. |
| V4 | **Five equal stat tiles.** Name, format, triangles, size, dimensions all have the same weight. | P3 | `stl-viewer/index.astro:154-176`. | One summary line: “knight_28mm.stl · Binary · 1,842 tris · 41.2 × 28.6 × 28.0 mm”. |
| V5 | **“Works offline after first load” is not guaranteed.** There is no service worker; it depends on the browser cache. | P2 | `tools.json` feature list; no service worker registered. | Remove the claim, or add a service worker (scope: privacy and cache). |
| V6 | **No fullscreen on phones.** 420px stage + toolbar + stats is a lot of vertical chrome. | P3 | `stl-viewer/index.astro` stage height. | Add an expand toggle; keep the bottom nav visible. |

---

## Converter (`/stl-converter/`)

| # | Issue | Sev | Evidence | Fix |
| --- | --- | --- | --- | --- |
| C1 | **No state persistence for format/tolerance.** Reload resets to OBJ / 0.001. | P2 | `stl-converter.js` reads DOM defaults; no URL writes. | Put `format` and `tolerance` in the URL. The file stays local and is never persisted. |
| C2 | **Dropzone click trap.** Same `event.target === drop` pattern; inner content does not open the picker. | P2 | `stl-converter.js:177-179`. | Make the whole zone a label, with explicit “Choose” and “Demo” buttons. |
| C3 | **Reverse conversion is only explained in the FAQ.** Users arriving from “OBJ to STL” may not scroll. | P2 | `stl-converter/index.astro:28` (FAQ). | Put “STL in → OBJ/PLY/STL out. No OBJ→STL.” under the dropzone. |
| C4 | **“No file size cap” is not true.** The browser's memory is the cap; very large files can crash the tab. | P2 | `stl-converter/index.astro` dropzone note. | Say “No server limit; very large files depend on your browser's memory.” |
| C5 | **The output summary can outlive the file.** If a new file is chosen, does the green “Saved…” box clear? | P3 | `stl-converter.js` reset logic — verify on change. | Clear the summary on every new file and on format change. |
| C6 | **No “start over” after download.** The only way to convert another file is the choose button. | P3 | Converter UI. | Add a quiet “Convert another” link. |
| C7 | **Format choice is a `<select>` with long descriptions.** On a phone it becomes a native picker with truncated labels. | P3 | `stl-converter/index.astro` output format select. | Use four radio cards with short labels + one-line descriptions. |

---

## Printability Checker (`/stl-printability-checker/`)

| # | Issue | Sev | Evidence | Fix |
| --- | --- | --- | --- | --- |
| K1 | **No state persistence for tolerance.** Reload resets to 0.001. | P2 | `stl-printability-checker.js`; no URL writes. | Put `tolerance` in the URL; re-run on load after a file is chosen. |
| K2 | **Five equal check tiles.** Open edges, non-manifold, degenerate, winding, shells all have the same weight; the verdict is a separate card above. | P2 | `stl-printability-checker/index.astro:150-170`. | A summary strip: “Watertight · 0 open edges · 1 shell” + one primary next action; details expand. |
| K3 | **No next action after a finding.** The verdict text explains, but the only actions are “Re-check” and the next-step rail far below. | P1 | `stl-printability-checker/index.astro` results block. | Add one-tap actions: “Open in Viewer”, “Convert to OBJ”, “Read the non-manifold guide”. |
| K4 | **Dropzone click trap.** Same pattern. | P2 | `stl-printability-checker.js:199-201`. | Whole-zone label. |
| K5 | **Tolerance changes auto-rerun silently.** `change` triggers `runCheck`; there is no “re-checking” state, so the numbers can change without a cue. | P2 | `stl-printability-checker.js:178-182`. | Show a subtle “Re-checking…” status and keep the previous result until the new one lands. |
| K6 | **“Analysis complete” is a weak verdict title.** It says the process finished, not whether the file is printable. | P2 | `stl-printability-checker/index.astro:143`. | Use “Watertight” / “Needs attention” as the title; keep “Analysis complete” as a timestamp line. |

---

## Archive guide template (`/archive/guides/[slug]/`)

| # | Issue | Sev | Evidence | Fix |
| --- | --- | --- | --- | --- |
| A1 | **Primary CTA is above the article, follow-up below.** For AI-referred readers, the top CTA is good; but it is a generic card, not the exact answer. | P2 | `archive/guides/[slug].astro:165,193`. | Lead with an answer card: the exact number + “Open the inspector with 28mm → 32mm”. Keep the generic CTA below. |
| A2 | **No sticky “answer” on long guides.** A 2,600-word guide loses the number on scroll. | P2 | `28mm-to-32mm` guide is ~2,605 words. | A compact sticky summary on desktop; a “back to the answer” chip on phone. |
| A3 | **Wide tables can still overflow.** The global fix exists, but each new table must be checked. | P3 | `prose` table styles; mobile audit. | Add a build-time check for tables without a scroll wrapper. |
| A4 | **Archive bar + support nudge + feedback banner + footer = four competing bottom surfaces.** | P2 | `ArchiveToolBar.astro`, `SupportNudge.astro`, `FeedbackBanner.astro`, footer. | On archive pages, suppress the feedback banner and/or the nudge; keep one support surface. |
| A5 | **No “back to guides” in the thumb zone.** Breadcrumb is at the top. | P3 | Guide hero breadcrumb. | Add a compact “All guides” link in the archive bar. |

---

## Utility / legal / 404

| # | Issue | Sev | Evidence | Fix |
| --- | --- | --- | --- | --- |
| U1 | **`/widget/` has no `<title>` or `<h1>`.** It is noindex, but it is iframed and still needs an accessible name. | P2 | Route scan: `/widget/` title and h1 empty. | Add `title="STL Scale Converter"` and a visually hidden `<h1>`. |
| U2 | **`/archive/faq/` is orphaned** (see G2). | P1 | No inbound links. | Link from the footer/“More” and from tool FAQs. |
| U3 | **`/404` links to tools and size-chart anchors, but not to search or the archive hubs.** | P2 | `404.astro` links. | Add search (Phase 3) and “Browse guides / calculators”. |
| U4 | **Support page is excluded from the nudge, but the feedback banner still runs.** | P3 | `Layout.astro` exclusion list only covers the nudge. | Exclude the feedback banner on `/support/` too, or make it a thank-you line. |

---

## Highest-severity shortlist (fix first)

1. **I1** — URL state on the Scale Inspector (Back/refresh/share).
2. **H1** — four tools above the phone fold.
3. **K3** — a next action after a checker finding.
4. **V2** — canvas scroll trap on phones.
5. **G2 / U2** — orphaned `/archive/faq/`.
6. **G1** — search over the full route manifest.
7. **I2 / I3** — one Inspector flow, whole dropzone clickable.
8. **G5 / G6** — support nudge safe-area and privacy disclosure.
9. **G7 / A4** — one support surface, not three.
10. **G8** — skeletons instead of spinners.
