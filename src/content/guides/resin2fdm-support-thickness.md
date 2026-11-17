---
title: "How Thick Should Resin Supports Be for FDM Printing?"
description: "Resin2FDM support thickening explained: the 0.05–0.2mm range, a test matrix, and how to find the balance between a successful print and easy cleanup."
tldr: "Thicken resin supports to roughly 0.05–0.2mm before FDM printing. Start at 0.07mm for fine sculpts and 0.1mm for heavier models, then print a support-only test strip: too thin and the slicer drops it, too thick and it scars the model."
pubDate: 2026-11-17
modDate: 2026-11-17
faq:
  - question: How much should I thicken resin supports for FDM?
    answer: >-
      Usually 0.05–0.2mm. Delicate sculpts can work around 0.05–0.07mm,
      while heavier models often need 0.1–0.2mm. The right value is the
      smallest thickness your nozzle actually lays down as a continuous line.
  - question: Why are resin supports too thin for FDM?
    answer: >-
      Resin supports are designed for a laser or LCD light source, not a
      0.2mm or 0.4mm nozzle. A slicer may skip them entirely, or extrude a
      blob that fuses to the miniature. Thickening gives the slicer a real
      path to follow and makes removal predictable.
  - question: Does every sculptor need the same support thickness?
    answer: >-
      No. In my tests, Bite the Bullet models needed only about 0.05mm while
      Puppets War models were closer to 0.07mm. Support diameter, model weight
      and contact angle all matter, so treat published numbers as starting
      points rather than rules.
  - question: How do I test support thickness without wasting a model?
    answer: >-
      Export a small strip of the model with four support groups at 0.05,
      0.10, 0.15 and 0.20mm. Print it at your normal FDM settings, then check
      which lines formed cleanly and peeled off without leaving scars.
  - question: Should I thicken supports on FDM-ready files?
    answer: >-
      No. Files sold as FDM-ready already have nozzle-compatible supports.
      Thicken only resin pre-supported files. Doubling up just creates chunky
      supports and extra cleanup.
tags: ["resin2fdm", "supports", "FDM", "Blender", "troubleshooting"]
---

Resin supports are built for a light source, not an extruder. Their contact points and columns can be thinner than a single FDM line, so the slicer either ignores them or prints them as blobs. The Resin2FDM workflow solves this by thickening them before export.

The useful range is **0.05–0.2mm**. That sounds tiny, but remember that this is an offset applied to supports that are already fractions of a millimetre across — not the final support diameter.

## Start with the model, not the number

Different sculptors use very different support strategies:

- **Fine, lightly supported sculpts** — start at **0.05mm**. Bite the Bullet models sat near this value in my tests.
- **Medium detail with several contact points** — start at **0.07mm**. Puppets War models needed about this much.
- **Heavy armour, large bases or long unsupported spans** — try **0.1mm** and work up.
- **Very heavy or top-heavy models** — up to **0.2mm**, accepting more cleanup.

These are starting points. The correct value is the smallest offset that prints as a continuous line and holds the model without scarring it.

## Run a four-step test strip

Before converting a whole model:

1. Split a small section of the model and its supports in Blender.
2. Duplicate the supports into four groups: **0.05**, **0.10**, **0.15** and **0.20mm**.
3. Export them as separate STLs, or place them at known positions on one build plate.
4. Print at the same nozzle, layer height and speed you will use for the real model.
5. Peel each group off and compare the line quality and surface marks.

Pick the thinnest group that printed every support and came off cleanly. If 0.05mm vanished and 0.10mm worked, use 0.10mm — do not chase a smaller number just because it looks tidier in Blender.

## What goes wrong at each extreme

| Setting | Symptom | Fix |
| --- | --- | --- |
| Too thin | Slicer drops supports; model fails mid-print | Increase by 0.02–0.05mm |
| Too thin | Supports snap during removal | Increase thickness or add more contact points |
| Too thick | White stress marks on the model | Reduce thickness or increase support Z gap |
| Too thick | Supports fuse into one block | Reduce thickness; use fewer, better-placed supports |

## Print settings interact with thickness

Support thickness does not work alone:

- A **0.2mm nozzle** reproduces fine supports much better than a 0.4mm nozzle.
- **0.16mm layers** were my baseline for support prints; finer layers help with small contact points.
- **Two walls** are enough for most thickened resin supports. More walls make removal harder.
- Keep supports on a **separate object** in the slicer so you can print them with coarser settings and slower model cooling.
- After conversion, choose the wall generator carefully — see [Arachne vs Classic](/guides/arachne-vs-classic-wall-generator-miniatures), or generate fresh supports with my [Cura tree support settings](/guides/cura-tree-support-settings-miniatures).

## When not to convert

Skip the thickening step when:

- the file is already labelled FDM-ready;
- the model has no resin supports and prints flat;
- supports touch visible faces and a different orientation would avoid them;
- the model is so fine that even 0.05mm supports would dominate the detail.

Sometimes a fresh set of tree supports prints better than rescuing the original resin ones. The decision tree is in the [full Resin2FDM guide](/guides/resin2fdm-convert-stl-to-fdm-ready) and the [resin-to-FDM pillar](/learn/resin-to-fdm).

## How I verify the numbers

I print the test strip, measure the resulting support lines with a PARKSIDE digital caliper, and keep the thinnest setting that survives a full model print. The 175cm baseline does not change any of these values — support thickness is a printer and geometry problem, not a scale-conversion problem. See [methodology](/methodology) for the measurements that are tied to that baseline.
