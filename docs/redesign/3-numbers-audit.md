# 3 — Numbers audit

**Date:** 2026-10-30
**Source of truth:** `src/data/scaleBaselines.json` (16), `src/data/conversionMatrix.json` (46),
`src/data/fdmProfiles.json` (26), `src/data/materialDensities.json` (12),
`src/data/shrinkageRates.json` (13), `src/data/filamentPresets.json` (6),
`src/data/euVatRates.json` (27), and `src/data/site.json`.
**Formula (same as `mathscaler.js`):** ratio scales use `topOfHeadMm` as the standard; gaming/display
scales use `eyeLevelMm`; percentage = `(target standard ÷ source standard) × 100`, rounded with
JavaScript `toFixed(1)`.

**Verdict:** all 46 **eye-level** percentages reproduce exactly. Three **top-of-head overrides** and
one **quick-reference row** do not. Nothing has been changed.

---

## 1. Eye-level conversions: 46 / 46 pass

Recomputed every entry from `scaleBaselines.json` with the same `toFixed(1)` rounding the browser
uses. **0 mismatches.** This includes the entry that looks wrong in Python
(`32mm-to-1-35` = `156.3`): Python's `round()` uses banker's rounding and returns `156.2`, but
`(50 / 32 * 100).toFixed(1)` in JavaScript returns `"156.3"`. The site is correct; the audit
method needed JS rounding.

**Conclusion:** the eye-level table is internally consistent. Do not “fix” it.

---

## 2. Top-of-head overrides: 3 mismatches

`conversionMatrix.json` carries three `topHeadPercentage` overrides. The calculator uses them
verbatim and labels them “Validated by my test prints.” They do not reproduce from the baseline
table.

| Slug | Stored | Formula: target top ÷ source standard | Formula: target top ÷ source top | Reading |
| --- | --- | --- | --- | --- |
| `28mm-to-32mm` | **116.1** | 125.0 | 114.8 | 116.1 ≈ 32.5 ÷ 28.0. Neither published baseline produces it. |
| `1-35-to-28mm` | **61.3** | 61.0 | 61.0 | 61.3 ≈ 28.0 ÷ 45.7 (eye ÷ eye), i.e. it is an **eye-level** number labelled “Top of Head.” |
| `32mm-to-28mm` | **95.4** | 95.3 | 95.3 | 95.4 is a 0.1 rounding/override difference; low risk. |

### Where `28mm-to-32mm` 116.1 is published

- `src/data/conversionMatrix.json:594`
- `src/data/site.json:117` — “If you measure to the top of the head instead, use **116.1%**. I have
  tested this on PLA…”
- `src/pages/archive/scale-standard.astro:51` — `topHead: "116.1%"`
- The Scale Inspector, whenever the user selects **Top of Head** for 28mm → 32mm.

This is the single most repeated number in the scale cluster. If it is a test-print value, the
baseline table (`32mm` top = 35.0mm, `28mm` top = 30.5mm) is what is wrong. If the baseline is
right, the override is wrong. **One of the two has to be declared the authority.** Do not change it
until you decide which.

### Why `1-35-to-28mm` 61.3 is mislabelled

`28.0 ÷ 45.7 × 100 = 61.27 → 61.3`. That is **eye level ÷ eye level** (`28mm` eye 28.0, `1:35` eye
45.7). The top-of-head formula is `30.5 ÷ 50.0 × 100 = 61.0`. The override is a valid eye-level
number wearing a top-of-head label. Either relabel it or recompute it.

### `32mm-to-28mm` 95.4

`30.5 ÷ 32.0 × 100 = 95.3125 → 95.3`. The stored 95.4 is 0.1 high. Low materiality, but it is still
not reproducible. Include it in the same decision as the other two.

---

## 3. Quick-reference row: `28mm → 1:48` is 130.2%, not 130.4%

| Field | Value |
| --- | --- |
| Published | `130.4%` (`src/data/site.json:111`) |
| Recomputed | `36.458 ÷ 28.0 × 100 = 130.207… → 130.2%` |
| Source of 130.4 | Appears to round the numerator to `36.5` first (`36.5 ÷ 28.0 = 130.357 → 130.4`), which the calculator's `fmtMm` does **not** do (it prints `36.458`). |

The row renders on `/archive/faq/` and in `SlicerPercentageTool.astro` (the archive slicer
calculator). The displayed formula and the displayed result do not divide out.

**Also fix the labels in the same row:**

- `28mm (Heroic)` → `28mm (True)`. 32mm is the heroic scale; 28mm is true scale.
- `1:48 (True)` → `1:48 (Quarter / Aircraft)`. “True” is not a 1:48 label.

The other five quick-reference rows recompute correctly: 87.5, 116.7, 62.5, 87.5, 85.7.

---

## 4. Count claims

| Claim | Where | Data | Verdict |
| --- | --- | --- | --- |
| 16 tabletop scales | `tools.json:8`, `embed.astro`, `reference-bar-generator` | 16 baselines | True if “tabletop” includes the 6 ratio scales; acceptable. |
| **15+ gaming scales** | `tools.json:12` | 10 gaming/display + 6 ratio | **Misleading.** There are 16 standards, but only 10 are gaming/display. |
| **46 verified conversion pairs** | `tools.json:30` | 46 matrix entries | Count is true; “verified” implies a test-print log that is not in the repo. |
| 26 FDM profiles | `site.json`, schema | 26 | True. |
| 12 material densities | `tools.json:104` | 12 | True. |
| 13 shrink presets | `tools.json:144` | 13 | True. |
| 6 bottle presets | `tools.json:167` | 6 | True. |
| 27 EU member states | `tools.json:125` | 27 | True. |
| 12 conversion presets | `tools.json:49` | 12 buttons in `SlicerPercentageTool.astro` | True. |
| 7 materials (overhang) | `LayerResolutionTool.astro` | 7 `overhangLimits` | True. |

**“Verified on physical test prints”** appears in the size chart, scale standard, and multiple
metadata descriptions. There is no verification log in the repo. Either add the log (date, printer,
material, measured result) or soften the claim to “calculated from the STLACCESS baseline.”

---

## 5. Competing / duplicated numbers

| Issue | Where | Recommendation |
| --- | --- | --- |
| **Shrinkage default 1.5% vs published range 0.2–0.5%** | `stl-scale-inspector/index.astro:247` (`value="1.5"`) vs `site.json:10` (`"0.2-0.5%"`) | Default to 0.4% (mid-range) or change the range copy. **Needs approval** — it changes a default value. |
| **114.3% appears 4× on the Inspector page** | Result card, “Most searched” table, related-guide title, related-guide description | The result card is the only one on the tool surface. The other three are content. If “no number printed twice” is strict, collapse the “Most searched” table into the related-guide cards. |
| **“115%” vs “114.3%”** | Homepage (`index.astro:199`) | Say “about 115%” or use only 114.3%. |
| **28mm labelled “Heroic”** in quickRef | `site.json:111` | 28mm is true scale; 32mm is heroic. Fix the label. |
| **1:48 labelled “True”** in quickRef | `site.json:111` | 1:48 is quarter scale / aircraft. Fix the label. |

---

## 6. Rounding convention (so future audits don't re-flag it)

- The site uses JavaScript `toFixed(1)`. For exact halves, that rounds away from zero in V8
  (`156.25 → 156.3`).
- Python's `round()` uses banker's rounding (`156.25 → 156.2`). Any audit script must use JS or
  `Decimal` with `ROUND_HALF_UP`.
- The inspector's `fmtMm` prints up to 3 decimals and trims trailing zeros, but always keeps one
  decimal (`32.0`, `36.458`). The visible formula must divide out to the visible result; that is why
  the 130.4 row is wrong.

---

## 7. Recommended fixes (approval required — not applied)

1. **Decide the top-of-head authority.** Either:
   - (a) recompute all three overrides from the baseline table, or
   - (b) keep the test-print overrides and add a visible “Measured override” note with the test
     conditions, and stop claiming the baseline table alone produces them.
2. **Fix `28mm-to-32mm` head** to one of: `114.8%` (top ÷ top), `125.0%` (target top ÷ source
   standard), or keep `116.1%` with a documented test-print basis.
3. **Fix `1-35-to-28mm` head** to `61.0%`, or relabel it as an eye-level override at `61.3%`.
4. **Fix `32mm-to-28mm` head** to `95.3%`, or document the override.
5. **Fix the quickRef row** to `130.2%` and correct the two labels.
6. **Replace “15+ gaming scales”** with “16 scale standards (10 gaming/display + 6 ratio)”.
7. **Soften “46 verified”** to “46 conversion pairs” unless a verification log exists.
8. **Align shrinkage default and range.**
9. **Add an automated numbers test** (`scripts/audit-numbers.mjs`) that:
   - recomputes every eye-level percentage and fails on mismatch;
   - validates every `topHeadPercentage` against a documented override list;
   - checks the quickRef rows against the baseline;
   - checks the count claims against the JSON lengths.
   Run it in `postbuild` next to the discovery audit.

## 8. What the redesign must preserve

The redesign must import the **same JSON** and the **same formula**. No component may recompute a
percentage from rounded display values (the 130.4 bug). If a number moves, it moves in the JSON and
every consumer follows.
