# Phase 2 mockups — review notes

Open `index.html` directly in a browser. It is self-contained: no server, no build step.

```bash
xdg-open docs/redesign/mockups/index.html
```

## What you are looking at

Three directions, six screens each, desktop and phone:

- **A — Brand, lightly trimmed.** Current orange/black identity, fewer duplicate sections.
- **B — Calm minimal.** Warm paper, serif headings, hairline rules, one accent.
- **C — Bold product.** Oversized numbers, solid orange, controls secondary.

The toolbar switches **screen**, **device**, and **view**. Scroll inside a column. The phone panel
is a real 390px viewport: the screen scrolls internally and the five-item bottom bar stays put.

Same data in every panel: `28mm → 32mm = 114.3%`, `32mm → 28mm = 87.5%`, demo file
`41.2 × 28.6 × 28.0mm` with `1,842` binary triangles (`90 KB`). The conversion table rows are copied
from `src/data/conversionMatrix.json`. No prices, analytics, accounts, uploads, or game names.

**Historical note:** these mockups were frozen before the conversion-data correction. Their table rows show the old percentages so the Phase 2 review stays reproducible; they are not a current data source. The published site uses the eye-level conversion rules in `/methodology` and the regenerated `public/data/` exports.

## Recommendation

**Use A as the base, borrow B's summary strip and C's oversized result.**

The brand is already distinctive. The real problems are state, duplicate flows, and phone friction,
not the palette. A gives continuity and the lowest risk; B's `answer first, detail on demand` strip
is the clearest structural improvement; C's single oversized result is the right phone treatment.

If the goal is the biggest visible departure, choose B. If the goal is an instrument-like tool,
choose C.

## Phone checks that are deliberate

- Result comes first; the form follows. The desktop version keeps the form first where there is room.
- Bottom bar: **Home / View / Scale / Convert / Check**. Home is added so the bar is not a dead end;
  `Check` replaces the ambiguous `Checks`.
- The support card is home-only, sits above the bottom bar, and never covers it.
- No feedback strip, no "Most used" chip, no fake search. `Start here` is an editorial choice, not a
  usage claim.
- The guide earns a tool CTA in the body; the guide is not in the nav.

## What still needs your approval

1. **Direction:** A, B, C, or the A+B+C mix above.
2. **Phone rules:** result-first, five-item bar, `Check` label, home-only support card.
3. **Numbers audit:** the three head-override values and the `130.4%` quick-reference row are listed
   in `../3-numbers-audit.md` but **not changed**. Approve or reject them separately.
4. **Copy removals:** retire the unsupported "Most used" chip and the feedback banner.
5. **No new features:** the mockups do not add search, accounts, saved files, or analytics.

## What the mockups do not decide

- Final type scale, spacing, and motion.
- Phase 3 information architecture, search, or the route-manifest test.
- The analytics instrumentation proposed in `../1-usage-audit.md`.

No app code has been changed for Phase 2. `npm run build` was re-run and passed (50 pages, discovery
and redirect audits green). The only working-tree changes are `docs/` plus the regenerated `dist/`
output from that build.
