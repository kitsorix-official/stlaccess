---
title: "28mm to 32mm Scale: The Exact Percentage You Need for Your Slicer"
description: "The exact slicer percentage to scale 28mm miniatures to 32mm heroic scale: 114.3%. Plus a cheat sheet for 28mm to 35mm, 32mm to 35mm, and more."
tldr: "Type 114.3% into your slicer: 32 ÷ 28 × 100. Both scales share the 175cm eye-level baseline. For resin, add 1-3% shrinkage — 115.8% is typical."
pubDate: 2026-06-20
tags: ["scale conversion", "28mm", "32mm", "slicer settings"]
---

The answer you came here for: **type 114.3% into your slicer** to scale a 28mm miniature to 32mm heroic scale.

That's it. That's the number. Here is why it works and how to apply it to other conversions.

## The Math

The formula is dead simple:

```
(target scale) ÷ (source scale) × 100 = percentage to type into your slicer
```

For 28mm to 32mm:

```
32 ÷ 28 = 1.1428
1.1428 × 100 = 114.3%
```

This works because both 28mm (true scale) and 32mm (heroic scale like Warhammer 40k) use the same 175cm human baseline with eye-level measurement. You are not changing the underlying proportions — you are moving from one measurement convention to another.

For a full breakdown of how these scales relate, see the [28mm to 32mm reference page](/reference/28mm-to-32mm).

## Quick Cheat Sheet

Keep these on your wall:

| Conversion | Calculation | Slicer % |
|------------|-------------|----------|
| 28mm → 32mm | 32 ÷ 28 | **114.3%** |
| 28mm → 35mm | 35 ÷ 28 | **125.0%** |
| 28mm → 40mm | 40 ÷ 28 | **142.9%** |
| 28mm → 75mm | 75 ÷ 28 | **267.9%** |
| 32mm → 28mm | 28 ÷ 32 | **87.5%** |
| 32mm → 35mm | 35 ÷ 32 | **109.4%** |
| 32mm → 40mm | 40 ÷ 32 | **125.0%** |
| 32mm → 75mm | 75 ÷ 32 | **234.4%** |
| 35mm → 28mm | 28 ÷ 35 | **80.0%** |
| 35mm → 32mm | 32 ÷ 35 | **91.4%** |

## Where To Type This Number

In **Chitubox**: select the model, press T (transform), make sure the chain icon is locked so all axes scale together, then type 114.3 into the Scale X field. The other fields update automatically.

In **Lychee Slicer**: select the model, open the Transform panel, click the lock to maintain proportions, and enter 114.3 in any scale field.

## Important: Resin Shrinkage Compensation

If you are printing with resin, add 1-3% to account for UV curing shrinkage. The exact compensation depends on your resin brand — check the manufacturer's recommended shrinkage percentage. Most standard resins need about 1.5% extra.

So for 28mm to 32mm with a typical resin: **115.8%** (114.3% + 1.5%).

The STL scale calculator has a built-in [resin shrinkage toggle](/tools/stl-scale-engine) that handles this automatically.

## Related Conversions

Every conversion percentage on STLACCESS is [verified with physical test prints](/about). If you need a less common scale, browse the full [scale reference library](/reference) or use the [STL scale calculator](/).
