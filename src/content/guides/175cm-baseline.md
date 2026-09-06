---
title: "Why Miniature Scales Use a 175cm Human Baseline"
description: "Most tabletop miniature scales are built around a 175cm (5'9) human. Here is why I chose that number for every STLACCESS scale conversion."
tldr: "All STLACCESS scale conversions start from a 175cm (5'9) human with eyes at 160cm — the same baseline the tabletop industry uses. Gaming scales like 28mm and 32mm measure to eye level; ratio scales like 1:35 and 1:56 measure to the top of the head. Same baseline = consistent slicer percentages."
pubDate: 2026-06-15
faq:
  - question: Why does STLACCESS use a 175cm human baseline for every scale conversion?
    answer: >-
      A 175cm (5'9") human with eyes at 160cm is the reference point used across
      the tabletop industry. Because every gaming and ratio scale is measured
      against the same baseline, the ratios between scales stay mathematically
      consistent — which is what makes the slicer percentages reliable. It's the
      baseline I converged on after years of scale creep on my own build plate.
  - question: What is the difference between eye level and top of head in miniature scale?
    answer: >-
      Eye level measures a 175cm figure at 160cm and is used for gaming scales
      like 28mm, 32mm, and 35mm. Top of head measures the full 175cm and is used
      for ratio scales like 1:35 and 1:56. The 15cm gap creates a 5-10%
      difference in the calculated percentage. Mixing them is how I got a
      bobblehead power-armoured soldier.
  - question: Why is scaling 32mm down to 28mm exactly 87.5%?
    answer: >-
      Both scales reference the same 175cm baseline, so the conversion is a pure
      ratio: 28 divided by 32 equals 0.875, or 87.5%. Consistent baselines are
      what make these percentages exact. That exactness is the entire point.
  - question: Are the STLACCESS conversion percentages tested in real prints?
    answer: >-
      Yes. Every published percentage has been physically printed and measured
      with my PARKSIDE digital calipers across hundreds of test prints on my Bambu Lab A1
      Mini. I don't publish a number I haven't held in my hands.
tags: ["scale theory", "methodology", "reference"]
---

Every scale conversion on STLACCESS starts from the same reference point: a human figure that is **175cm tall (5'9")** with eyes at **160cm**.

I chose this number the hard way. Before I picked a single baseline, my army suffered from what I call scale creep — one sculptor measures to the eye, another to the crown, and suddenly your "32mm" squad has one guy who towers over the rest. I spent my 2019 print service days in Enschede dealing with customers who wanted their proxies to match games that each used a slightly different standard. Eventually I sat down and worked out that the industry had already converged on a baseline, and locking every conversion to it made the whole mess predictable.

This isn't arbitrary. It's the baseline used by most of the tabletop miniatures industry, and understanding why will help you get better results when you scale STL files.

## Where 175cm Comes From

Historical wargaming scales like 28mm and 32mm didn't start as precise measurements. A "28mm miniature" was loosely defined as a miniature whose height (from sole to eye level) measured approximately 28mm. Over time, the community converged on a standard reference height to make cross-system scaling predictable.

The 175cm baseline emerged because:

- It represents a realistic average human height across global populations
- It aligns with the reference miniatures used by manufacturers across the tabletop industry
- It produces clean conversion percentages between the most popular gaming scales — and I'm a sucker for a percentage that comes out even

## Eye Level vs Top of Head

When you convert a miniature's scale, you have two choices: measure to the eyes or to the top of the head.

| Method | Baseline | Used For |
|--------|----------|----------|
| Eye level | 160cm (175cm figure) | 28mm, 32mm, 35mm heroic scales |
| Top of head | 175cm | 1:35, 1:48, 1:56 ratio scales |

The eye-level convention matches how manufacturers historically measured their sculpts. Models like the modern sci-fi epic wargame's power-armoured soldiers are intentionally "heroic" — their proportions are exaggerated so details read at arm's length. Using the eye-level baseline preserves those proportions when scaling. This is exactly where my bobblehead mistake came from: I measured a power-armoured soldier to the top of the head, treated it as eye level, and everything shifted.

## What This Means for 3D Printing

When you upload an STL and use the STLACCESS scale engine:

1. The tool assumes the original file was sculpted to one of the supported scales using the 175cm baseline
2. It calculates the ratio between the source and target eye-level or top-of-head measurements
3. The resulting percentage compensates for the difference

If a file was originally designed for 32mm heroic (the modern sci-fi epic wargame) and you want to print it at 28mm true scale, the engine calculates `(28 / 32) = 87.5%` — but only because both 28mm and 32mm reference the same 175cm baseline.

This is also why ratio scales like 1:56 behave differently — they measure to the top of the head, not eye level. Mixing the two without adjusting would give you undersized or oversized prints. That one distinction is behind more failed tabletop prints than any slicer setting I know.

## Testing the Baseline

Every conversion percentage published on STLACCESS is physically printed and measured with my PARKSIDE digital calipers (0.01mm resolution, all-metal construction). The 175cm baseline has held up across hundreds of test prints on my Bambu Lab A1 Mini. I don't publish a number I haven't held in my hands and measured against the rest of my army. If you find a conversion that doesn't look right, the reference library includes a feedback form — submitting a correction helps improve the data for everyone, and I genuinely test every submission that comes in.
