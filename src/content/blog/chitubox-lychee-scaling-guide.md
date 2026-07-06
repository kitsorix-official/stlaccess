---
title: "How to Scale Miniatures in Chitubox & Lychee Slicer (Without Messing Up the Base)"
description: "Step-by-step guide to scaling STL files in Chitubox and Lychee. Lock aspect ratios, scale without stretching the base, and understand the unit conversion."
pubDate: 2026-06-22
tags: ["slicer settings", "chitubox", "lychee", "tutorial"]
---

If your STL file has an X-axis of 30mm, that is exactly **1.18 inches wide**. This unit confusion — mixing millimetres and inches — is the most common mistake people make when scaling miniatures in slicer software.

Here is how to get it right in Chitubox and Lychee every time, including how to scale a model without distorting the base.

## The Golden Rule: Lock The Aspect Ratio

Before you type any number into a scale field, **find the chain link icon and click it**. When the chain is locked, changing one axis automatically updates the other two. This is how you avoid ending up with a miniature that looks like it was stepped on.

| Slicer | Where to find the lock |
|--------|----------------------|
| Chitubox | Transform panel → Scale section → chain icon next to X/Y/Z |
| Lychee | Transform panel → Uniform scaling toggle (looks like a chain or a percentage sign with arrows) |

## Scaling in Chitubox

1. **Import your STL** (File → Import → STL)
2. **Select the model** — click it in the viewport
3. **Open the Transform panel** (press `T` or click the Transform icon on the left toolbar)
4. **Lock the aspect ratio** — click the chain icon so it shows as connected
5. **Type your percentage** in the Scale X field — for a 28mm → 32mm conversion, enter `114.3`
6. **Check the height** — the Z field should show the new height in mm
7. **Click Apply** (the checkmark) to confirm

### Pro Tip: Scale Without Scaling the Base

If your miniature has an integral base that you do not want to scale:

1. Before importing, use MeshLab or Blender to separate the base from the model
2. Import both pieces separately
3. Scale only the miniature body, leave the base at 100%
4. Merge them back together or print them as separate pieces and glue after

This is a common ask in the miniature printing community — a 32mm hero should not end up standing on a comically oversized 40mm base just because you scaled the whole model up.

## Scaling in Lychee Slicer

1. **Import your STL** (the plus icon or drag-and-drop)
2. **Select the model** in the 3D viewport
3. **Open the Transform panel** (right sidebar, looks like a move/scale/rotate icon)
4. **Enable uniform scaling** — click the lock or chain icon
5. **Enter your percentage** — Lychee shows the scale as a multiplier, so `114.3%` can be entered as either `114.3%` or `1.143`
6. **Confirm** — Lychee applies changes automatically

Lychee also shows you the real-world dimensions of the model in mm, so you can sanity-check your scale. A 32mm model should measure approximately 32mm in the Z-axis (plus or minus the base thickness).

## When to Use mm vs Inches

Slicers display model dimensions in millimetres by default. If your STL was exported in inches, it will import looking either tiny (an inch-miniature showing as 1.2mm tall) or enormous (a mm-miniature showing as 25 feet tall).

**Quick rule of thumb:** A 28-32mm figure should be roughly the height of your thumb. If it comes in looking like a grain of rice, it was likely exported in inches. Scale everything up by 2540% (25.4 × 100) to convert inches to millimetres.

## Chitubox Unit Conversion Helper

If your file's X-axis shows as, for example, 30mm:

| Measurement | Value |
|-------------|-------|
| Millimetres | 30 mm |
| Inches | 1.18 in |
| Scale to 32mm (from 28mm) | 114.3% |
| Scale to 35mm (from 28mm) | 125.0% |

Use the [STLACCESS scale engine](/) to calculate any conversion, or browse the [reference library](/reference) for pre-calculated percentages.

## Common Mistakes to Avoid

- **Forgetting to lock the aspect ratio** — results in a squashed or stretched miniature
- **Scaling the base with the model** — makes the base look wrong for the game system
- **Distinguishing between eye-level and top-of-head** — 28mm refers to eye level; ratio scales like 1:56 are top-of-head. The [scale reference](/reference) has notes for each
- **Ignoring resin shrinkage** — always add 1-3% if printing with resin. The STLACCESS engine has a [shrinkage compensation toggle](/tools/stlscale-engine) built in
