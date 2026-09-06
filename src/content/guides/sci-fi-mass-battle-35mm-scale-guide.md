---
title: "35mm Sci-Fi Mass-Battle Game Scale Guide — What Scale Are Its Miniatures?"
description: "Miniatures for the 35mm sci-fi mass-battle game are 35mm scale (1:47), measured to eye level at 35.7mm. Full height about 40mm. Exact slicer percentages to convert its STLs and proxies for space opera armies."
tldr: "The 35mm sci-fi mass-battle game's minis are 35mm scale measured to the eyes (about 35.7mm, roughly 40mm total height), around 1:47 — between the modern sci-fi epic wargame's 32mm and the 40mm sci-fi skirmish game's 40mm. To proxy into a 35mm sci-fi mass-battle army, scale 32mm STLs to 109.4% or 28mm STLs to 125%. Print a scale standee and compare in your slicer before committing."
pubDate: 2026-08-15
modDate: 2026-08-15
faq:
  - question: What scale is the 35mm sci-fi mass-battle game?
    answer: >-
      35mm measured to eye level, about 1:47 scale. An armoured trooper's eyes
      sit roughly 35.7mm above the base, and the full figure reaches
      about 40mm to the top of the helmet. Space opera
      model kits at 1:48 from major manufacturers are the closest compatible model kits.
  - question: How big are its miniatures?
    answer: >-
      Troopers are about 35mm to the eyes and around 40mm tall overall.
      They sit noticeably taller than 32mm modern sci-fi epic wargame miniatures (scale
      32mm STLs to 109.4%) and smaller than 40mm sci-fi skirmish game figures
      (scale its STLs up to 40mm at 114.3%).
  - question: What base sizes does the 35mm sci-fi mass-battle game use?
    answer: >-
      Infantry and characters use 27mm round bases. Speeder bikes and
      cavalry use 50mm, emplacements and light walker vehicles use
      70mm, and heavy walker vehicles use 100mm. The largest
      tanks and transports run 150mm or pill-shaped bases.
  - question: How do I scale a 3D print to this game's scale?
    answer: >-
      Match the 35mm eye-level height. A 28mm STL scales to 125%, a 32mm
      STL to 109.4%. Print a reference standee at known heights, or use
      the reference-bar generator, and compare in your slicer or on a
      test print first.
tags: ["35mm mass-battle", "35mm", "scale guide", "proxy", "slicer settings"]
---

Every time I build a proxy army for the 35mm sci-fi mass-battle game, someone asks the same two questions: how big are these guys, and what percentage do I type in? This game sits in an awkward spot between the two big fantasy scales — bigger than the modern sci-fi epic wargame, smaller than the 40mm sci-fi skirmish game — so the conversions never feel obvious.

I measured my own armoured trooper core set with my PARKSIDE calipers, cross-checked against my [scale notes for the modern sci-fi epic wargame](/games/sci-fi-epic-32mm), and here's the honest version of what I found.

## What Scale Are the 35mm Sci-Fi Mass-Battle Game's Miniatures?

### 35mm to the eyes, about 40mm tall

The game's "35mm" designation is an **eye-level measurement**. An armoured trooper's eyes sit roughly **35.7mm above the base**, and the full figure — helmet and all — reaches about **40mm**. That's the same convention as every other gaming scale on the [175cm human baseline](/guides/175cm-baseline): you measure to the eye line, not the top of the head, which is why the numbers in the box and the ruler never quite agree.

For comparison, that makes this game's troopers noticeably taller than a 32mm modern sci-fi epic wargame miniature and noticeably shorter than the 40mm sci-fi skirmish game's figures. On the table the difference reads instantly — an armoured trooper next to a modern heroic (32mm) power-armoured soldier looks a head more imposing, which is exactly the vibe the game wants for its heroes.

### The 1:47 math behind the label

The publisher works this game from a slightly taller eye-height reference than my usual 160cm — they use **1678mm**, the measured average adult eye height. Divide 35.7mm by that and you get **1:47 scale**. It's a hair larger than the 1:48 space opera model kits from major manufacturers, which is why those kits are the community's favourite way to add vehicles and terrain to this game's table. My [reference](/reference) treats this game at 35mm eye level, and the difference between 1:47 and 1:48 is small enough to be invisible at the table.

## How Big Is This Game's Mini Compared to the Classic Fantasy RPG or the Modern Sci-Fi Epic Wargame?

### Compared to the 32mm modern sci-fi epic wargame — scale to 109.4%

If you're printing modern sci-fi epic wargame-scaled STLs as proxies for this game, the number is **109.4%** (35 ÷ 32 × 100), axes locked. That's the same jump, in reverse, as scaling one of these minis down to sit in a 32mm heroic sci-fi army — I keep both directions on the [scale conversion chart](/reference).

A tip from my own painting desk: before scaling a whole squad, run the [miniature scale identifier](/tools/miniature-scale-identifier) on the STL. A lot of sculptors label "35mm" files that are actually 32mm heroic or vice versa, and it changes the percentage you need.

### Compared to the classic fantasy RPG's true 28mm — scale to 125%

The big jump is from the classic fantasy RPG's true 28mm scale: **125%** (35 ÷ 28 × 100). A 28mm figure scaled to 125% matches this game's trooper at the eyes. Going the other way — from this game into a 28mm army — is **80%** (28 ÷ 35 × 100).

Both numbers are in the [reference matrix](/reference), and both assume true 28mm to begin with. Since most third-party classic-fantasy-RPG-style STLs are actually sculpted at 32mm heroic these days, I always measure the model's Z-height in my slicer before I trust a 125% scaling.

## How Do I Scale a 3D Print to Match This Game?

### The exact slicer percentages

Here's the set I use, all with X, Y, and Z locked:

| Source scale | Slicer percentage | Use case |
| --- | --- | --- |
| 28mm (classic fantasy RPG / WWII platoon wargame) | 125.0% | Classic infantry to this game |
| 32mm (modern sci-fi epic wargame / heroic) | 109.4% | The most common proxy jump |
| 1:48 (space opera model kits) | 96.0% | Scale model kits down to infantry match |
| 40mm (sci-fi skirmish game) | 87.5% | Shrinking big space opera sculpts to this game |

Every one of these is the same formula — target eye height ÷ source eye height × 100 — which is what the [slicer percentage calculator](/tools/slicer-percentage-calculator) does for you if you ever need a pair I haven't listed.

### Print a scale standee and check it in the slicer

The honest version of the "measure twice, cut once" rule for this game's proxies: print a **reference standee** — a plain 35mm-tall bar — and import it next to your model in the slicer. The [reference-bar generator](/tools/reference-bar-generator) creates one at any scale, with tick marks and an end tab exactly as tall as a figure at that scale. Select your model, read its current height, compare it to the tab, and you'll know the exact percentage without a single guess. I print one 35mm standee alongside the first test model of every batch, and it has caught more wrong assumptions than I care to count.

## What Vehicles and Bases Does This Game Use?

### Base sizes: 27mm, 50mm, and up

Infantry and characters sit on **27mm round bases** — the same footprint across every faction, from an armoured trooper to the commander. From there it scales up:

| Base size | What uses it |
| --- | --- |
| 27mm | All infantry, heroes, operatives |
| 50mm | Speeder bikes, cavalry riders |
| 70mm | Light walker vehicles, emplacement teams |
| 100mm | Heavy walker vehicles, airspeeders |
| 150mm | Heavy tanks |

If you're printing proxies, matching the base size matters more than the infantry height — the base is what the movement tools measure, so a 27mm base with the right silhouette plays correctly even if the sculpt is slightly off.

### Vehicles slide between scales

The vehicles are where this game's 1:47 scale shines for printing. Because the game's walkers and speeders are oversized on purpose (they're designed to be readable at table distance, not accurate to the films), you have a lot of room to work with. The community's favourite trick is printing space opera vehicle STLs that are *supposed* to be display-scaled and shrinking them to fit this game's table — 1:48 kits at 96% are the closest fit, and the [real-world scale converter](/tools/real-world-scale-converter) gives you the exact millimetre height of any vehicle at this game's scale before you commit to the plate.

That's the conversion. 35mm to the eyes, 109.4% from the modern sci-fi epic wargame, 125% from the classic fantasy RPG, and a printed standee to keep you honest. The full set of percentages across every scale sits on the [miniature scale conversion chart](/reference).
