---
title: "Star Wars: Legion Scale Guide — What Scale Are Legion Miniatures?"
description: "Star Wars: Legion miniatures are 35mm scale (1:47), measured to eye level at 35.7mm. Full height about 40mm. Exact slicer percentages to convert Legion STLs and proxies."
tldr: "Legion minis are 35mm scale measured to the eyes (about 35.7mm, roughly 40mm total height), around 1:47 — between Warhammer's 32mm and Shatterpoint's 40mm. To proxy into a Legion army, scale 32mm STLs to 109.4% or 28mm STLs to 125%. Print a scale standee and compare in your slicer before committing."
pubDate: 2026-08-15
modDate: 2026-08-15
faq:
  - question: What scale is Star Wars Legion?
    answer: >-
      35mm measured to eye level, about 1:47 scale. A Stormtrooper's eyes
      sit roughly 35.7mm above the base, and the full figure reaches
      about 40mm to the top of the helmet. Bandai and Revell Star Wars
      kits at 1:48 are the closest compatible model kits.
  - question: How big are Star Wars Legion miniatures?
    answer: >-
      Troopers are about 35mm to the eyes and around 40mm tall overall.
      They sit noticeably taller than 32mm Warhammer miniatures (scale
      32mm STLs to 109.4%) and smaller than 40mm Shatterpoint figures
      (scale Legion STLs to 40mm at 114.3%).
  - question: What base sizes does Star Wars Legion use?
    answer: >-
      Infantry and characters use 27mm round bases. Speeder bikes and
      cavalry use 50mm, emplacements and light walkers like the AT-RT use
      70mm, and heavy vehicles like the AT-ST use 100mm. The largest
      tanks and transports run 150mm or pill-shaped bases.
  - question: How do I scale a 3D print to Star Wars Legion?
    answer: >-
      Match the 35mm eye-level height. A 28mm STL scales to 125%, a 32mm
      STL to 109.4%. Print a reference standee at known heights, or use
      the reference-bar generator, and compare in your slicer or on a
      test print first.
tags: ["star wars legion", "35mm", "scale guide", "proxy", "slicer settings"]
---

Every time I build a Legion proxy army, someone asks the same two questions: how big are these guys, and what percentage do I type in? Legion sits in an awkward spot between the two big fantasy scales — bigger than Warhammer, smaller than Shatterpoint — so the conversions never feel obvious.

I measured my own Stormtrooper core set with my PARKSIDE calipers, cross-checked against my [Warhammer scale notes](/games/warhammer-40000), and here's the honest version of what I found.

## What Scale Are Star Wars: Legion Miniatures?

### 35mm to the eyes, about 40mm tall

Legion's "35mm" designation is an **eye-level measurement**. A Stormtrooper's eyes sit roughly **35.7mm above the base**, and the full figure — helmet and all — reaches about **40mm**. That's the same convention as every other gaming scale on the [175cm human baseline](/guides/175cm-baseline): you measure to the eye line, not the top of the head, which is why the numbers in the box and the ruler never quite agree.

For comparison, that makes Legion troopers noticeably taller than a 32mm Warhammer miniature and noticeably shorter than Shatterpoint's 40mm figures. On the table the difference reads instantly — a Stormtrooper next to a Primaris marine looks a head more imposing, which is exactly the vibe the game wants for heroes of the Rebellion.

### The 1:47 math behind the label

Atomic Mass Games works Legion from a slightly taller eye-height reference than my usual 160cm — they use **1678mm**, the measured average adult eye height. Divide 35.7mm by that and you get **1:47 scale**. It's a hair larger than the 1:48 Star Wars model kits from Bandai and Revell, which is why those kits are the community's favourite way to add vehicles and terrain to a Legion table. My [reference](/reference) treats Legion at 35mm eye level, and the difference between 1:47 and 1:48 is small enough to be invisible at the table.

## How Big Is a Legion Mini Compared to Warhammer or D&D?

### Legion vs 32mm Warhammer — scale to 109.4%

If you're printing Warhammer-scaled STLs as Legion proxies, the number is **109.4%** (35 ÷ 32 × 100), axes locked. That's the same jump, in reverse, as scaling a Legion mini down to sit in a 40k army — I keep both directions on the [scale conversion chart](/reference).

A tip from my own painting desk: before scaling a whole squad, run the [miniature scale identifier](/tools/miniature-scale-identifier) on the STL. A lot of sculptors label "35mm" files that are actually 32mm heroic or vice versa, and it changes the percentage you need.

### Legion vs 28mm D&D — scale to 125%

The big jump is from D&D's true 28mm scale: **125%** (35 ÷ 28 × 100). A 28mm figure scaled to 125% matches a Legion trooper at the eyes. Going the other way — Legion into a 28mm army — is **80%** (28 ÷ 35 × 100).

Both numbers are in the [reference matrix](/reference), and both assume true 28mm to begin with. Since most third-party D&D-style STLs are actually sculpted at 32mm heroic these days, I always measure the model's Z-height in my slicer before I trust a 125% scaling.

## How Do I Scale a 3D Print to Match Legion?

### The exact slicer percentages

Here's the set I use, all with X, Y, and Z locked:

| Source scale | Slicer percentage | Use case |
| --- | --- | --- |
| 28mm (D&D / Bolt Action) | 125.0% | Classic infantry to Legion |
| 32mm (Warhammer / heroic) | 109.4% | The most common proxy jump |
| 1:48 (Bandai / Revell kits) | 96.0% | Scale model kits down to infantry match |
| 40mm (Shatterpoint) | 87.5% | Shrinking big Star Wars sculpts to Legion |

Every one of these is the same formula — target eye height ÷ source eye height × 100 — which is what the [slicer percentage calculator](/tools/slicer-percentage-calculator) does for you if you ever need a pair I haven't listed.

### Print a scale standee and check it in the slicer

The honest version of the "measure twice, cut once" rule for Legion proxies: print a **reference standee** — a plain 35mm-tall bar — and import it next to your model in the slicer. The [reference-bar generator](/tools/reference-bar-generator) creates one at any scale, with tick marks and an end tab exactly as tall as a figure at that scale. Select your model, read its current height, compare it to the tab, and you'll know the exact percentage without a single guess. I print one 35mm standee alongside the first test model of every Legion batch, and it has caught more wrong assumptions than I care to count.

## What Vehicles and Bases Does Legion Use?

### Base sizes: 27mm, 50mm, and up

Infantry and characters sit on **27mm round bases** — the same footprint across every faction, from a Stormtrooper to Darth Vader. From there it scales up:

| Base size | What uses it |
| --- | --- |
| 27mm | All infantry, heroes, operatives |
| 50mm | Speeder bikes, tauntaun and dewback riders |
| 70mm | AT-RT, E-Web and other emplacement teams |
| 100mm | AT-ST, T-47 airspeeder |
| 150mm | Heavy tanks (AAT, TX-130) |

If you're printing proxies, matching the base size matters more than the infantry height — the base is what the movement tools measure, so a 27mm base with the right silhouette plays correctly even if the sculpt is slightly off.

### Vehicles slide between scales

The vehicles are where Legion's 1:47 scale shines for printing. Because the game's walkers and speeders are oversized on purpose (they're designed to be readable at table distance, not accurate to the films), you have a lot of room to work with. The community's favourite trick is printing Star Wars vehicle STLs that are *supposed* to be display-scaled and shrinking them to fit a Legion table — 1:48 kits at 96% are the closest fit, and the [real-world scale converter](/tools/real-world-scale-converter) gives you the exact millimetre height of any vehicle at Legion scale before you commit to the plate.

That's the Legion conversion. 35mm to the eyes, 109.4% from Warhammer, 125% from D&D, and a printed standee to keep you honest. The full set of percentages across every scale sits on the [miniature scale conversion chart](/reference).
