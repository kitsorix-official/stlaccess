---
title: "Why Miniature Scales Use a 175cm Human Baseline"
description: "Most tabletop miniature scales are built around a 175cm (5'9) human. Here is why that number matters for 3D printing accurate scale conversions."
tldr: "All STLACCESS scale conversions start from a 175cm (5'9) human with eyes at 160cm — the same baseline the tabletop industry uses. Gaming scales like 28mm and 32mm measure to eye level; ratio scales like 1:35 and 1:56 measure to the top of the head. Same baseline = consistent slicer percentages."
pubDate: 2026-06-15
tags: ["scale theory", "methodology", "reference"]
---

Every scale conversion on STLACCESS starts from the same reference point: a human figure that is **175cm tall (5'9")** with eyes at **160cm**.

This isn't arbitrary. It's the baseline used by most of the tabletop miniatures industry, and understanding why will help you get better results when you scale STL files.

## Where 175cm Comes From

Historical wargaming scales like 28mm and 32mm didn't start as precise measurements. A "28mm miniature" was loosely defined as a miniature whose height (from sole to eye level) measured approximately 28mm. Over time, the community converged on a standard reference height to make cross-system scaling predictable.

The 175cm baseline emerged because:

- It represents a realistic average human height across global populations
- It aligns with the reference miniatures used by manufacturers like Games Workshop, Warlord Games, and Atomic Mass Games
- It produces clean conversion percentages between the most popular gaming scales

## Eye Level vs Top of Head

When you convert a miniature's scale, you have two choices: measure to the eyes or to the top of the head.

| Method | Baseline | Used For |
|--------|----------|----------|
| Eye level | 160cm (175cm figure) | 28mm, 32mm, 35mm heroic scales |
| Top of head | 175cm | 1:35, 1:48, 1:56 ratio scales |

The eye-level convention matches how manufacturers historically measured their sculpts. Models like Warhammer 40k Space Marines are intentionally "heroic" — their proportions are exaggerated so details read at arm's length. Using the eye-level baseline preserves those proportions when scaling.

## What This Means for 3D Printing

When you upload an STL and use the STLACCESS scale engine:

1. The tool assumes the original file was sculpted to one of the supported scales using the 175cm baseline
2. It calculates the ratio between the source and target eye-level or top-of-head measurements
3. The resulting percentage compensates for the difference

If a file was originally designed for 32mm heroic (Warhammer) and you want to print it at 28mm true scale, the engine calculates `(28 / 32) = 87.5%` — but only because both 28mm and 32mm reference the same 175cm baseline.

This is also why ratio scales like 1:56 behave differently — they measure to the top of the head, not eye level. Mixing the two without adjusting would give you undersized or oversized prints.

## Testing the Baseline

Every conversion percentage published on STLACCESS is physically printed and measured with digital calipers. The 175cm baseline has held up across hundreds of test prints on FDM and resin printers. If you find a conversion that doesn't look right, the reference library includes a feedback form — submitting a correction helps improve the data for everyone.
