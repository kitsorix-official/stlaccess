---
title: "FDM Miniature Printing: Complete Guide to Layer Height, Nozzles, and Settings"
description: "How to get the best results printing tabletop miniatures on an FDM printer. Nozzle sizes, layer heights, orientation tips, and post-processing for 28mm and 32mm models."
pubDate: "2026-07-09"
modDate: "2026-07-09"
tags: ["FDM printing", "slicer settings", "miniature printing", "layer height", "nozzle size"]
---

You do not need a resin printer to print good-looking tabletop miniatures. With the right FDM settings, you can produce 28mm and 32mm models that look great at arm's length and survive regular handling on the tabletop.

This guide covers everything I have learned from printing hundreds of miniatures on my Bambu Lab A1 Mini.

## The Ideal FDM Setup for Miniatures

| Component | Recommendation | Why |
|---|---|---|
| Nozzle | 0.2mm for characters, 0.4mm for rank-and-file | Smaller nozzle = finer detail, longer print time |
| Layer height | 0.06mm (0.2mm nozzle) or 0.08mm (0.4mm nozzle) | Balances detail against print duration |
| Filament | PLA or PLA+ | Easy to print, low shrinkage, good layer adhesion |
| Cooling | 100% fan from layer 3 | Sharp overhangs need maximum cooling at small layer heights |

## Layer Height and Detail

The most important setting for miniature quality is layer height. Here is what happens at each range:

| Layer Height | Result | Best For |
|---|---|---|
| 0.04mm | Near-resin quality, very slow (12+ hours for 32mm) | Display pieces, competition models |
| 0.06mm | Excellent detail, 6-8 hours for 32mm | Character models, officers, heroes |
| 0.08mm | Good detail, 4-5 hours for 32mm | Rank-and-file infantry, monsters |
| 0.12mm | Noticeable layer lines, 2-3 hours | Terrain, vehicles, test prints |
| 0.2mm | Very rough, fast | Large terrain, bases, quick prototypes |

## Orientation Matters

How you orient the model on the build plate affects surface quality more than any setting:

- **Tilt the model 15-20 degrees backward.** This hides layer lines on the front of the model (chest, face) and puts them on the back where they are less visible.
- **Place the most detailed surface facing up.** The top surface of an FDM print is always cleaner than the bottom (which rests on supports).
- **Use tree (organic) supports.** They touch the model at fewer points and leave less scarring than standard supports.

## Post-Processing for FDM Miniatures

Three steps that transform an FDM miniature from okay to tabletop-ready:

1. **Remove supports carefully.** Flush cutters are better than pulling. Clip supports away from the model in small pieces rather than ripping them off. This prevents snapped bayonets and stretched plastic.

2. **Sand the layer lines (optional).** For character models, a quick pass with 400-grit sandpaper on flat surfaces (shoulder pads, helmet tops) removes visible layer lines. Avoid sanding faces and detail areas.

3. **Prime with filler primer.** A coat of automotive filler primer fills micro-gaps between layers and gives you a smooth painting surface. Spray from 20cm away in quick passes. One coat is usually enough for 0.06mm layer heights.

## Common FDM Miniature Problems

**Stringing between arms and body.** This happens when the nozzle moves across an open gap. Fix it by enabling retraction (5mm at 40mm/s for Bowden, 1mm at 30mm/s for direct drive) and increasing travel speed to 200mm/s.

**Supports fusing to the model.** Reduce support interface density to 50% and increase the support Z distance to 0.2mm. The supports will still hold the model up but will break away much more cleanly.

**Warped bases.** Print the base flat on the build plate with a brim. A 5mm brim around a 25mm or 32mm base prevents the corners from lifting during printing.

## Summary

- 0.2mm nozzle at 0.06mm layer height for characters
- 0.4mm nozzle at 0.08mm layer height for rank-and-file
- Tilt models 15-20 degrees, use tree supports
- Filler primer hides remaining layer lines
- PLA works great—no special filament needed
