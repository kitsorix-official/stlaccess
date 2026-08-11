---
title: "How to Scale Miniatures in Chitubox & Lychee Slicer (Without Messing Up the Base)"
description: "Step-by-step guide to scaling STL files in Chitubox and Lychee. Lock aspect ratios, scale without stretching the base, and understand the unit conversion — from my own slicer."
tldr: "Click the chain-link to lock the aspect ratio, then type your percentage into any scale field. Chitubox: press T then Transform. Lychee: Transform then uniform scaling. If a model imports tiny, it was exported in inches — scale up 2540%."
pubDate: 2026-06-22
faq:
  - question: How do I scale a miniature in Chitubox?
    answer: >-
      Select the model, open the Transform panel (press T), click the chain
      icon to lock the aspect ratio, type your percentage into the Scale X
      field (114.3 for a 28mm to 32mm conversion), then click Apply. This is
      the exact sequence I run every time.
  - question: Why does my STL import looking tiny in the slicer?
    answer: >-
      The file was almost certainly exported in inches instead of millimetres.
      Scale everything up by 2540% (25.4 x 100) to convert inches to millimetres.
      I hit this with a tank kit and spent an hour convinced the slicer was
      broken.
  - question: How do I scale a miniature without scaling its integral base?
    answer: >-
      Separate the base from the model in MeshLab or Blender before importing,
      then scale only the miniature body and leave the base at 100%. Print them
      as separate pieces and glue after. I ruined a hero's scenic base this way
      once — never again.
  - question: How does uniform scaling work in Lychee Slicer?
    answer: >-
      Enable the uniform scaling toggle, then enter your percentage either as
      114.3% or as the multiplier 1.143. Lychee applies the change automatically
      and shows the resulting dimensions in millimetres, so you can sanity-check
      the height before slicing.
tags: ["slicer settings", "chitubox", "lychee", "tutorial"]
---

If your STL file has an X-axis of 30mm, that is exactly **1.18 inches wide**. This unit confusion — mixing millimetres and inches — is the most common mistake people make when scaling miniatures in slicer software, and it's the one that taught me to never trust an import at face value.

The first time a file imported into Chitubox as a grain of rice, I spent an hour convinced the slicer was broken. It wasn't. The sculptor had exported in inches, and my slicer was dutifully reading inches as millimetres. The fix took one number: scale everything up by 2540%. Since then I've developed a full routine that works in both Chitubox and Lychee every time, including how to scale a model without distorting the base.

## The Golden Rule: Lock The Aspect Ratio

Before you type any number into a scale field, **find the chain link icon and click it**. When the chain is locked, changing one axis automatically updates the other two. This is how you avoid ending up with a miniature that looks like it was stepped on. I learned this one from a print that came off the plate looking like it had been through a hydraulic press — one axis at 114%, the others at 100%.

| Slicer | Where to find the lock |
|--------|----------------------|
| Chitubox | Transform panel → Scale section → chain icon next to X/Y/Z |
| Lychee | Transform panel → Uniform scaling toggle (looks like a chain or a percentage sign with arrows) |

## Scaling in Chitubox

Chitubox is what I use for most of my proxy slicing. Here is the exact sequence I run:

1. **Import your STL** (File → Import → STL)
2. **Select the model** — click it in the viewport
3. **Open the Transform panel** (press `T` or click the Transform icon on the left toolbar)
4. **Lock the aspect ratio** — click the chain icon so it shows as connected
5. **Type your percentage** in the Scale X field — for a 28mm → 32mm conversion, enter `114.3`
6. **Check the height** — the Z field should show the new height in mm
7. **Click Apply** (the checkmark) to confirm

### Pro Tip: Scale Without Scaling the Base

If your miniature has an integral base that you do not want to scale, listen closely, because I ruined a hero's scenic base this way once:

1. Before importing, use MeshLab or Blender to separate the base from the model
2. Import both pieces separately
3. Scale only the miniature body, leave the base at 100%
4. Merge them back together or print them as separate pieces and glue after

This is a common ask in the miniature printing community — a 32mm hero should not end up standing on a comically oversized 40mm base just because you scaled the whole model up. Trust me, nothing kills a good print faster than a base that dwarfs the model standing on it.

## Scaling in Lychee Slicer

Lychee is my go-to for bigger batch prints because the interface feels faster. The steps mirror Chitubox:

1. **Import your STL** (the plus icon or drag-and-drop)
2. **Select the model** in the 3D viewport
3. **Open the Transform panel** (right sidebar, looks like a move/scale/rotate icon)
4. **Enable uniform scaling** — click the lock or chain icon
5. **Enter your percentage** — Lychee shows the scale as a multiplier, so `114.3%` can be entered as either `114.3%` or `1.143`
6. **Confirm** — Lychee applies changes automatically

Lychee also shows you the real-world dimensions of the model in mm, so you can sanity-check your scale. A 32mm model should measure approximately 32mm in the Z-axis (plus or minus the base thickness). I always glance at that Z value before slicing — it has caught more mistakes than I care to admit.

## When to Use mm vs Inches

Slicers display model dimensions in millimetres by default. If your STL was exported in inches, it will import looking either tiny (an inch-miniature showing as 1.2mm tall) or enormous (a mm-miniature showing as 25 feet tall).

**Quick rule of thumb:** A 28-32mm miniature should be roughly the height of your thumb. If it comes in looking like a grain of rice, it was likely exported in inches. Scale everything up by 2540% (25.4 × 100) to convert inches to millimetres.

## Chitubox Unit Conversion Helper

If your file's X-axis shows as, for example, 30mm:

| Measurement | Value |
|-------------|-------|
| Millimetres | 30 mm |
| Inches | 1.18 in |
| Scale to 32mm (from 28mm) | 114.3% |
| Scale to 35mm (from 28mm) | 125.0% |

Use the [STLACCESS scale engine](/) to calculate any conversion, or browse the [reference library](/reference) for pre-calculated percentages. I use both constantly — that's the whole reason I built them.

## Common Mistakes to Avoid

These are the mistakes I've personally made, so you don't have to:

- **Forgetting to lock the aspect ratio** — results in a squashed or stretched miniature. My hydraulic-press print was the teacher here.
- **Scaling the base with the model** — makes the base look wrong for the game system. Separate it first.
- **Distinguishing between eye-level and top-of-head** — 28mm refers to eye level; ratio scales like 1:56 are top-of-head. The [scale reference](/reference) has notes for each
- **Skipping the test print** — I always print one test piece and measure it with calipers before committing to a full squad. The STL scale calculator has a [shrinkage compensation toggle](/) for filaments that shrink more than the usual 0.2-0.5%
