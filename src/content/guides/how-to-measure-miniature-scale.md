---
title: "How to Measure a Miniature's Scale: Eye Level vs Top of Head Explained"
description: "How I measure miniature scale for 3D printing — eye level vs top of head, PARKSIDE digital calipers, and why the 175cm baseline works."
tldr: "Measure from the foot to eye level, not the top of the head. A 28mm mini is about 31-32mm to the top of the head. Use calipers and ignore weapons, horns, and dynamic-pose extensions."
pubDate: "2026-07-11"
modDate: "2026-07-11"
faq:
  - question: How do I measure a miniature's scale correctly?
    answer: >-
      Place the miniature flat on the table and measure from the surface to the
      centre of the eye with digital calipers (I use a PARKSIDE with 0.01mm resolution). A 28mm miniature should read
      approximately 28mm to the eyes — about 31-32mm to the top of the head.
      This is the exact routine I use before I publish any percentage.
  - question: Should I measure to eye level or the top of the head?
    answer: >-
      Eye level (160cm on a 175cm figure) is the standard for gaming scales like
      the modern sci-fi epic wargame, the classic fantasy RPG, and the 35mm sci-fi mass-battle game. Top of head (175cm) is used for
      historical miniatures and ratio scales like 1:35 and 1:56. Mixing the two
      is how I ended up with a bobblehead power-armoured soldier.
  - question: How do I measure a miniature in a dynamic pose?
    answer: >-
      Measure from the foot contact point to the eye position, ignoring
      everything above the eyes — weapons, horns, and banners make the bounding
      box misleading. A raised sword can double the bounding box height.
  - question: What is the total height of a 28mm miniature?
    answer: >-
      About 31-32mm to the top of the head. The eyes sit at 28mm and the
      forehead and skull add roughly 3-4mm. I've confirmed this with my PARKSIDE calipers on
      countless prints.
tags: ["scale theory", "measurement", "eye level", "methodology", "175cm baseline"]
---

If you have ever printed a miniature and it looked wrong next to your other models, the problem is probably not the percentage you typed into your slicer. I know because it happened to me. The problem is probably how you measured the scale in the first place.

My moment of clarity came from a power-armoured soldier that looked like a bobblehead. I'd eyeballed 115% for a 28mm→32mm conversion because "it looked close enough." The print came out the correct height, but the proportions were all wrong — a head too big for the body, everything slightly off. I took out my PARKSIDE digital calipers and found the real problem: I'd been measuring to the top of the head the whole time, not the eyes. The model wasn't wrong. My measurement was.

## Eye Level vs Top of Head

There are two ways to define a miniature's scale, and they give different numbers:

**Eye level (160cm on a 175cm human).** You measure from the bottom of the foot (or the base contact point) to the centre of the eye. This is the standard for fantasy and sci-fi miniatures—the modern sci-fi epic wargame, the classic fantasy RPG, the 35mm sci-fi mass-battle game. It ignores helmets, top-knots, and decorative headgear. This is what I use for every gaming-scale conversion now.

**Top of head (175cm).** You measure from the foot to the highest point of the head. This is used for historical miniatures, display busts, and ratio scales like 1:35 and 1:56. The full height of the miniature matters because historical accuracy demands it.

## Why This Matters for 3D Printing

A 28mm miniature measured to the eyes is actually about 31-32mm tall to the top of the head once you account for the forehead and skull. If you measure that same model by its total height and treat it as a 32mm miniature, you will scale it incorrectly. That 4mm of skull is exactly the gap that created my bobblehead.

The STL scale converter uses eye-level measurement by default because that is what the tabletop industry uses for gaming scales. The top-of-head option is available for ratio-scale conversions.

## How to Measure with Digital Calipers

A good digital caliper is the best tool for checking a miniature's actual scale. I use a PARKSIDE caliper — all-metal construction, 0.01mm resolution, 0–150mm range, and it costs under 15 euro. It ended my guessing for good. Here is the process I follow on every test print:

1. **Zero the calipers** with the jaws closed.
2. **Place the miniature on a flat surface.** The base should sit flat on the table.
3. **Measure from the table surface to the centre of the eye.** This is your eye-level measurement.
4. **Record the number.** A "28mm" miniature should read approximately 28mm. A "32mm" miniature should read approximately 32mm.

If you do not have calipers, most slicers have a measurement tool. Import the STL and measure the Z-axis distance from the lowest point of the foot to the eye. I use this when a file isn't printed yet and I want to check what the sculptor actually made.

## What About Dynamic Poses?

A miniature with a raised sword, a lunging pose, or a flying base cannot be measured by bounding box alone. The bounding box might be 45mm tall because of the sword, but the miniature itself might only be 28mm to the eyes. I learned this the hard way with a cavalry model whose lance made it look like a 50mm piece.

To measure a dynamic pose:

1. Find the foot contact point—the part of the model that touches the base.
2. Find the eye position.
3. Measure the vertical distance between these two points.
4. Ignore everything above the eyes (weapons, horns, banners).

## How the 175cm Baseline Works

The 175cm human baseline is a reference height that lets us convert between any two scales consistently. Here is the logic:

1. Assume a human figure is 175cm tall in real life (5 feet 9 inches).
2. That human's eyes are at approximately 160cm.
3. A "28mm" miniature represents this human at 28mm from foot to eye.
4. A "32mm" miniature represents the same human at 32mm from foot to eye.
5. The ratio between 32mm and 28mm is 32 ÷ 28 = 1.143 = 114.3%.

The actual height of the average human does not matter for this calculation. What matters is that every conversion uses the same starting point, so the ratios between scales are mathematically consistent. That consistency is the whole reason I can trust the percentages on this site.

## Quick Measurement Reference

This is the chart I use when a sculptor's label is vague:

| Label on Package | Likely Eye Level | Likely Total Height |
|---|---|---|
| 28mm true scale | 28mm | ~31mm |
| 32mm heroic scale | 32mm | ~35mm |
| 35mm scale | 35mm | ~38mm |
| 40mm scale | 40mm | ~44mm |
| 75mm scale | 75mm | ~82mm |

## Summary

- Measure to the eyes, not the top of the head
- Use digital calipers (a PARKSIDE with 0.01mm resolution works perfectly) or your slicer's measurement tool
- Ignore weapons, banners, and dynamic pose extensions when measuring
- The 175cm baseline keeps ratios consistent between any two scales
- If your print looks wrong, measure the eye level first — before you change anything else
