---
title: "How to Scale Real-World Objects to 32mm Miniatures (The Math Explained)"
description: "The formula to convert real-world heights to 32mm miniature scale. Charts for humans, horses, monsters, and terrain for Warhammer, D&D, and Bolt Action."
tldr: "(real inches ÷ 72) × 32 = height in mm. An 18-foot dragon at 32mm scale stands about 96mm tall — roughly the height of a soda can."
pubDate: 2026-06-28
tags: ["scale theory", "32mm", "monster scaling", "terrain"]
---

If you need to know how big an 18-foot-tall monster should be in 32mm scale, here is the formula:

```
(real_world_height_inches ÷ 72) × 32 = height_in_mm
```

So for an 18-foot monster (216 inches):

```
(216 ÷ 72) × 32 = 96mm
```

A 32mm 18-foot monster should stand approximately **96mm tall** — about the height of a soda can.

## Why 72?

The number 72 is the conversion constant that maps real-world feet to tabletop millimetres for 32mm scale. It comes from:

- 1 real-world inch = 25.4mm
- But a 72-inch (6-foot) human should be 32mm on the tabletop
- 72 real inches ÷ 32 miniature mm = 2.25 real inches per miniature mm
- 25.4mm per inch × 2.25 = 57.15 — the constant

For practical use, just remember: **(real inches) ÷ 72 × 32 = mm on the tabletop**.

## Quick Reference Chart

| Real Object | Height | In 32mm Scale |
|-------------|--------|---------------|
| Goblin / Halfling | 4 ft | **21mm** |
| Average Human | 5'9" | **31mm** |
| Space Marine (heroic) | ~7 ft | **37mm** |
| Horse (to shoulder) | 5 ft | **27mm** |
| Horse (to head) | 8 ft | **43mm** |
| Ogre / Troll | 10 ft | **53mm** |
| Giant | 14 ft | **75mm** |
| Dragon (to shoulder) | 18 ft | **96mm** |
| Dragon (total height) | 24 ft | **128mm** |
| Barn / Shed | 12 ft | **64mm** |
| Two-story building | 20 ft | **107mm** |
| Church tower | 60 ft | **320mm** |

## Converting Any Scale

The formula works for any miniature scale, not just 32mm. Swap the last number:

| Scale | Formula |
|-------|---------|
| 28mm true | (inches ÷ 72) × 28 |
| 32mm heroic | (inches ÷ 72) × 32 |
| 35mm (Star Wars Legion) | (inches ÷ 72) × 35 |
| 1:56 | (inches ÷ 56) × 25.4 — or just (inches × 0.454) |
| 1:48 | (inches ÷ 48) × 25.4 — or (inches × 0.529) |

For 28mm scale, the same 18-foot monster becomes:

```
(216 ÷ 72) × 28 = 84mm
```

## Why the 175cm Baseline Matters

This formula assumes the 32mm scale is based on the standard 175cm (5'9") human figure measured to eye level. If your game system uses a different baseline (some older games use 6ft), the monster will come out slightly different.

STLACCESS uses the 175cm baseline for all conversions. You can read more about [why that number was chosen](/blog/175cm-baseline) and how it affects every percentage in the reference library.

## Terrain and Buildings

Terrain is easier to scale than creatures because you don't need to account for heroic proportions. A 20-foot building wall at 32mm scale:

```
(240 ÷ 72) × 32 = 107mm
```

Print a wall that is 107mm tall and place a 32mm miniature next to it — the proportions match a 20-foot wall in real life.

For a full size reference, check the [STL scale conversion chart](/blog/stl-scale-conversion-chart) and the [scale reference library](/reference). To calculate any conversion on the fly, use the [STL scale engine](/).
