---
title: "How to Scale Real-World Objects to Miniature Scale (The Math Explained)"
description: "The formula to convert real-world heights to 32mm miniature scale. Charts for humans, horses, monsters, and terrain for Warhammer, D&D, and Bolt Action."
tldr: "(real height in inches × scale ÷ 63 = height in mm). An 18-foot dragon at 32mm scale stands about 110mm tall — roughly the height of a soda can."
pubDate: 2026-06-28
modDate: 2026-08-10
faq:
  - question: How do I convert a real-world height into 32mm miniature scale?
    answer: >-
      Use the formula (real height in inches x 32) divided by 63 = height in mm.
      An 18-foot dragon (216 inches) works out to approximately 110mm — about
      the height of a soda can.
  - question: How tall should an average human be at 32mm scale?
    answer: >-
      About 35mm. At 32mm scale the eyes sit at 32mm on a 175cm human, so the
      full figure including the skull and hair stands closer to 35mm.
  - question: Why is 28mm scale the same as 1:56 scale?
    answer: >-
      A 28mm eye-level measurement maps to roughly 1:56 top-of-head on the same
      175cm baseline, which is why Bolt Action treats the two as equivalent.
  - question: How do I scale terrain to match my miniatures?
    answer: >-
      Apply the same formula: a 20-foot building wall (240 inches) at 32mm
      scale is 122mm tall. Terrain needs no heroic-proportion adjustment, so
      the math is direct.
tags: ["scale theory", "32mm", "monster scaling", "terrain"]
---

If you need to know how big an 18-foot-tall monster should be in 32mm scale, here is the formula:

```
(real_height_inches × 32) ÷ 63 = height_in_mm
```

So for an 18-foot monster (216 inches):

```
(216 × 32) ÷ 63 = 110mm
```

A 32mm 18-foot monster should stand approximately **110mm tall** — about the height of a soda can.

## Why 63?

The number 63 is the conversion constant that maps real-world inches to tabletop millimetres. It comes from the 175cm human baseline this site uses for every conversion:

- 32mm scale means a human's eyes — at 160cm on a 175cm figure — sit 32mm above the base.
- So at 32mm scale, 160cm of real height is represented by 32mm. The scale factor is 32 ÷ 1600 = 0.02, or **20mm per real metre**.
- 160cm is 63 inches (25.4mm per inch), which is why the inch version of the same formula reads **(inches × 32) ÷ 63 = mm**.

For practical use, just remember: **(real inches × 32) ÷ 63 = mm on the tabletop** at 32mm scale.

## Quick Reference Chart

All values below are at 32mm scale, calculated with the formula above.

| Real Object | Height | In 32mm Scale |
|-------------|--------|---------------|
| Goblin / Halfling | 4 ft | **24mm** |
| Average Human | 5'9" | **35mm** |
| Space Marine (heroic) | ~7 ft | **43mm** |
| Horse (to shoulder) | 5 ft | **30mm** |
| Horse (to head) | 8 ft | **49mm** |
| Ogre / Troll | 10 ft | **61mm** |
| Giant | 14 ft | **85mm** |
| Dragon (to shoulder) | 18 ft | **110mm** |
| Dragon (total height) | 24 ft | **146mm** |
| Barn / Shed | 12 ft | **73mm** |
| Two-story building | 20 ft | **122mm** |
| Church tower | 60 ft | **366mm** |

Notice the average human works out to about 35mm tall — that is correct. At 32mm scale the *eyes* are at 32mm, so the full figure (skull and hair included) stands closer to 35mm. It matches the top-of-head values used in the reference library.

## Converting Any Scale

The formula works for any miniature scale. For gaming scales (eye level) swap the middle number; for ratio scales divide directly by the ratio:

| Scale | Formula |
|-------|---------|
| 28mm true | (inches × 28) ÷ 63 |
| 32mm heroic | (inches × 32) ÷ 63 |
| 35mm (Star Wars Legion) | (inches × 35) ÷ 63 |
| 1:56 | (inches ÷ 56) × 25.4 — or just (inches × 0.454) |
| 1:48 | (inches ÷ 48) × 25.4 — or (inches × 0.529) |

For 28mm scale, the same 18-foot monster becomes:

```
(216 × 28) ÷ 63 = 96mm
```

Notice 28mm and 1:56 come out almost identical (96mm vs 98mm). That is no accident — 28mm eye level maps to roughly 1:56 top of head on the 175cm baseline, which is exactly why Bolt Action treats the two as the same thing.

## Why the 175cm Baseline Matters

Gaming scales like 28mm and 32mm are measured to the eye (160cm on a 175cm human), not the top of the head. If your game system uses a different baseline — some older games measure against a 6-foot human — the monster will come out slightly different.

STLACCESS uses the 175cm baseline for all conversions. You can read more about [why that number was chosen](/guides/175cm-baseline) and how it affects every percentage in the [reference library](/reference).

## Terrain and Buildings

Terrain is easier to scale than creatures because you don't need to account for heroic proportions. A 20-foot building wall at 32mm scale:

```
(240 × 32) ÷ 63 = 122mm
```

Print a wall that is 122mm tall and place a 32mm miniature next to it — the proportions match a 20-foot wall in real life.

To convert any real measurement to miniature millimetres on the fly, use the [real-world scale converter](/tools/real-world-scale-converter) or the [STL scale engine](/).
