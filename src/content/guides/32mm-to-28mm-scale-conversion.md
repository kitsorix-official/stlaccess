---
title: "How to Downscale 32mm to 28mm (87.5% Slicer Percentage, Explained)"
description: "Shrink 32mm miniatures down to true 28mm scale with an 87.5% slicer percentage. Fits more minis on a resin plate and mixes D&D proxies into true-scale armies."
tldr: "Type 87.5% with X, Y, and Z locked — that's 28mm ÷ 32mm × 100 on the 175cm baseline. Downscaling also shrinks supports and fine detail, so print a test piece, lower layer height if needed, and re-orient before batch printing."
pubDate: 2026-08-15
modDate: 2026-08-15
faq:
  - question: What percentage do I scale 32mm down to 28mm?
    answer: >-
      87.5% with all three axes locked. 28 ÷ 32 = 0.875, so you scale the
      model to 87.5% of its original size. The number is the eye-level
      ratio on a 175cm baseline; measured to the top of the head it
      shifts by about a point.
  - question: How do I shrink a 3D printed miniature to a smaller scale?
    answer: >-
      Lock the X/Y/Z axes in your slicer, type 87.5 into the scale field,
      and apply. Then re-generate supports and check layer height —
      smaller minis need finer layers and lighter supports than their
      bigger versions.
  - question: Can I scale a 32mm mini down to 28mm on a resin printer?
    answer: >-
      Yes, and it's the most common reason people do it: an 87.5% scale
      leaves more room on the build plate and lets you fit more minis per
      run. Just re-generate supports after scaling — old supports won't
      resize correctly.
  - question: What's the difference between 32mm and 28mm minis?
    answer: >-
      32mm measures to the eye on a 175cm human; 28mm does the same but
      smaller — so the 32mm figure is 14.3% taller. The published numbers
      are eye-level, but most 32mm minis are also heroic, meaning chunkier
      heads, hands, and weapons.
tags: ["scale conversion", "32mm", "28mm", "downscale", "resin printing"]
---

The internet is full of guides for scaling miniatures up — D&D party meeting a Warhammer army, small scale jumping to heroic scale, all that. But shrinking a miniature is just as common, and it's harder to get right. Scale a model down by 12.5% and every support point, every thin blade, and every layer line has to work at the smaller size.

This guide covers the number (87.5%, same as it ever was), the slicer routine that keeps detail intact, and the practical reasons you'd downscale at all. If you're going the other way, my [28mm to 32mm guide](/guides/28mm-to-32mm-scale-conversion) has the full walkthrough.

## What Percentage Do I Scale 32mm Down to 28mm?

### The number: 87.5%

Type **87.5%** into your slicer with X, Y, and Z locked. That's 28 ÷ 32 × 100 — the exact reverse of the 28mm-to-32mm upscale, which is [114.3%](/guides/28mm-to-32mm-scale-conversion). Where the upscale grows a model by 14.3%, the downscale shrinks it by 12.5%, so a heroic 32mm figure lands at true 28mm eye level on the [175cm baseline](/guides/175cm-baseline).

This is the conversion I reach for when a Warhammer proxy needs to stand next to a D&D party, or when a sculpt I love only exists in 32mm and I play Bolt Action. The number shows up in the [slicer percentage calculator](/tools/slicer-percentage-calculator) and in every row of the [miniature scale conversion chart](/reference), always with the axes locked and always measured to the eyes.

### Why 87.5% and not 90%?

Same reason the upscale isn't 115%: because both scales measure the same 175cm human to the eyes, the ratio between them is fixed at 28/32. Deviating from it shifts every figure off the intended eye line. 90% sounds friendlier and is close enough to pass the eye test on a single model, but batch-scaling a squad to 90% leaves you with a 28.8mm figure — small enough that nobody will measure it, wrong enough that I won't recommend it.

The one thing that *does* change the number is the measurement convention. If a sculptor measures to the top of the head instead of the eyes, the downscale percentage shifts by about a point in the other direction. The [scale conversion chart](/reference) lists both where it matters, but gaming convention says the eyes, so 87.5% is my default.

## Why Would I Shrink a 32mm Miniature to 28mm?

### Fitting more minis on the plate

The most practical reason, especially on resin: an 87.5% miniature takes up about 67% of the volume of the original (0.875³ ≈ 0.67), so you fit noticeably more minis per build plate per run. Once you're printing rank-and-file infantry in batches, that's real time and real resin saved. I use the [slicer percentage calculator](/tools/slicer-percentage-calculator) to plan batch spacing, and the [reference](/reference) page has the full matrix if you want to see every pairing at once.

### Mixing with a true-scale collection

The other reason is consistency. Games Workshop moved to 32mm heroic in 2014-2015, but D&D, Bolt Action, and most historical games stayed true 28mm. If your collection is 28mm and you find an STL that only ships in 32mm heroic — common with popular sci-fi and fantasy sculptors — 87.5% is what makes it look at home in the display cabinet next to everything else.

There's a caveat I have to flag: shrinking a 32mm heroic sculpt to 87.5% gives you a *smaller heroic sculpt*, not a true-scale 28mm sculpt. The proportions stay chunky — the head is still 1:6 of the height, the hands are still oversized. For most hobbyists that's fine, because it reads as "detailed 28mm". If you're a stickler for anatomical proportions, the heroism is baked into the model and no percentage will remove it.

## How Do I Downscale a Mini Without Ruining the Detail?

### The slicer routine for shrinking

Lock the axes, type 87.5, apply. Then the steps that actually matter when you're going *down*, because the problems are different from an upscale:

1. **Re-generate supports.** Supports generated for the original size won't scale sensibly — gaps get too tight and contact points get too small. Deleting and re-supporting takes two minutes and saves a failed print.
2. **Check the layer height.** Detail that printed cleanly at 32mm is 12.5% smaller now. On resin I drop to a finer layer height for the batch; on FDM I switch to a 0.2mm nozzle if the model has faces worth saving.
3. **Re-check orientation.** A 12.5% smaller footprint changes the balance of the model, and thin blades or antennae that survived at 32mm may need a tilt to survive at 28mm.
4. **Print one test piece** and measure it with calipers before committing to a full squad — same rule as every conversion on this site.

### What gets lost when you shrink a miniature

Two things, predictably: surface detail and mechanical strength. Fine features get denser relative to the nozzle or resin pixel, so a face that printed cleanly at 32mm can lose its expression at 87.5%. On FDM, thinner features also mean more fragile prints — swords, rifles, and capes are the first casualties. That's the trade you're accepting for a cheaper, denser plate.

The good news is that everything shrinks uniformly, so proportions never distort. If the original was well-sculpted, the 87.5% version is the same sculpt with less material. That's exactly why the [reference page](/reference) treats downscale as the mirror of upscale rather than a separate skill — the math is the same, only the print settings change.

## Are 32mm and 28mm Miniatures Really That Different?

### The 14.3% height difference in practice

Side by side, the difference reads as much bigger than 14.3%. Hold a Firstborn Space Marine next to a Primaris and the Primaris looks a third larger — because the height ratio compounds across all three dimensions. A 32mm figure at 1:50 has nearly 50% more volume than a 28mm figure at 1:56, and most 32mm sculpts pile heroic proportions on top of that. When you downscale, you're removing volume, and the model's *presence* drops faster than its height.

### Heroic proportions vs true scale when going down

This is the one thing nobody warns you about: scale is not the same as proportion. 28mm and 32mm describe where a figure's eyes sit; heroic describes how the sculptor shaped the body inside that height. A 32mm heroic miniature downscaled to 87.5% still has the big head and oversized hands — it's a heroic 28mm figure. My [miniature scale identifier](/tools/miniature-scale-identifier) tells you which of the two you're holding before you type in a percentage, and it's worth running it on any unlabelled STL.

If you mostly play 28mm systems, my [D&D miniature scale guide](/guides/dnd-miniature-scale-guide) shows what a true 28mm army looks like across every size category, from Tiny to Gargantuan. Compare it against your shrunken 32mm squad and you'll see the proportions instantly.

That's the downscale. 87.5%, axes locked, supports re-generated, one test print. If you want the full set of percentages — including how the same ratio behaves between Legion's 35mm, Shatterpoint's 40mm, and the rest — the [miniature scale conversion chart](/reference) has the master list.
