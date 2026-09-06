---
title: "Classic Fantasy RPG Miniature Scale Guide — What Size Are Classic Fantasy RPG Minis?"
description: "What scale is the classic fantasy RPG? Medium humanoids are 28mm to the eyes on the 175cm baseline. The full classic fantasy RPG size chart: Tiny, Small, Medium, Large, Huge, Gargantuan with mini heights and base sizes."
tldr: "The classic fantasy RPG is 28mm true scale: a Medium humanoid measures 28mm to the eyes, about 30-32mm total height. The publisher's official minis run true 28mm, while most printed STLs are 32mm heroic. Bases: 1-inch Medium, 2-inch Large, 3-inch Huge, 4-inch Gargantuan."
pubDate: 2026-08-15
modDate: 2026-08-15
faq:
  - question: What scale are classic fantasy RPG miniatures?
    answer: >-
      True 28mm scale. A Medium humanoid measures 28mm from the feet to
      the eyes on the 175cm baseline, about 30-32mm to the top of the
      head. The publisher's official lines are true 28mm; most
      third-party STLs are 32mm heroic.
  - question: How tall are classic fantasy RPG minis?
    answer: >-
      It depends on size category. A Medium humanoid is about 30-32mm
      total. Large creatures are roughly 44mm, Huge about 59mm, and
      Gargantuan 90-120mm or more. What matters on the table is the base:
      1-inch Medium, 2-inch Large, 3-inch Huge, 4-inch Gargantuan.
  - question: What base sizes do classic fantasy RPG minis use?
    answer: >-
      Tiny minis fit on 1-inch squares or smaller, Small and Medium use
      1-inch (25mm) round bases, Large uses 2-inch (50mm), Huge uses
      3-inch (75mm), and Gargantuan uses 4-inch (100mm) or larger.
  - question: Are classic fantasy RPG minis 28mm or 32mm?
    answer: >-
      Officially, the classic fantasy RPG is 28mm true scale — a Medium mini is 28mm to the
      eyes. Many third-party STL designers sculpt in 32mm heroic because
      it carries more detail; if you mix them, scale 28mm to 114.3%.
tags: ["fantasy rpg", "28mm", "miniature scale", "size chart"]
---

The classic fantasy RPG is the easiest game to answer "what scale am I playing?" for, and the hardest to answer "how big should this miniature be?" for — because the answer changes depending on whether you're talking about a halfling, an ogre, or an ancient dragon. Officially it's all one scale. In practice you're juggling six size categories, two measurement conventions, and a whole industry of sculptors who quietly drifted away from true 28mm.

This guide untangles it. I measured the publisher's official minis against my own prints, and here's the version of the classic fantasy RPG scale question that actually helps at the slicer.

## What Scale Are Classic Fantasy RPG Miniatures?

### 28mm to the eyes, about 30-32mm tall

The classic fantasy RPG is **true 28mm scale**. On the [175cm human baseline](/guides/175cm-baseline) I use across this site, a Medium humanoid measures **28mm from the feet to the eyes** — which works out to about **30-32mm to the top of the head**, because the forehead and hair add a few millimetres past the eye line. That's the same convention as every other tabletop scale: eyes, not crown.

The publisher's official minis match this. Its flagship product lines are branded and sculpted at true 28mm, which is one reason they slot into a classic fantasy RPG table so seamlessly. If you pick up any of the official lines, you can print and play at 28mm without converting anything.

### Why so many printed classic fantasy RPG minis are 32mm

Here's the trap. A huge share of the STLs sold "for the classic fantasy RPG" — especially the popular fantasy sculptors on the usual platforms — are actually sculpted at **32mm heroic**. It's not malicious; bigger models carry more detail, print more forgivingly, and look better in renders. But it means a party printed from mixed sources will show two generations of height side by side.

The fix is the same one as everywhere else on this site: measure the model's Z-height in your slicer, then use [114.3% to go 28mm to 32mm](/guides/28mm-to-32mm-scale-conversion) or [87.5% to go back down](/guides/32mm-to-28mm-scale-conversion). Both percentages, plus the reasoning, are covered in their own guides.

## How Tall Are Classic Fantasy RPG Minis by Size Category?

### The classic fantasy RPG size chart

The classic fantasy RPG defines size by the space a creature controls on a 5-foot grid, which translates directly to base size and roughly to miniature height. These are the heights I use, worked out from real-world creature sizes at 28mm scale:

| Size | Map space | Example creatures | Mini height | Base |
| --- | --- | --- | --- | --- |
| Tiny | 2.5 × 2.5 ft | Rat, imp, familiar | ~10-25mm | Under 1-inch |
| Small | 5 × 5 ft | Halfling, goblin, kobold | ~25-28mm | 1-inch (25mm) |
| Medium | 5 × 5 ft | Human, elf, orc | ~30-32mm | 1-inch (25mm) |
| Large | 10 × 10 ft | Ogre, troll, horse | ~44mm | 2-inch (50mm) |
| Huge | 15 × 15 ft | Hill giant, young dragon | ~59mm | 3-inch (75mm) |
| Gargantuan | 20 × 20+ ft | Ancient dragon, kraken | 90-120mm+ | 4-inch+ (100mm+) |

The heights aren't magic numbers — they're the real creature's height divided by 63, which is what 28mm scale means for a 175cm human. An ogre at 9 feet tall lands at about 44mm; a hill giant at 12 feet lands at about 59mm. The publisher's own giants and dragons often run a touch bigger for shelf presence, which is fine — the base, not the height, is what governs play.

### Base sizes are what matter on the table

In actual play, the base is the rule. A creature occupies the squares its base covers — a 2-inch base is "Large" no matter how tall the sculpt is — so when you're printing replacements or proxies, match the base first and the height second. A Huge creature on a 3-inch base with a 55mm sculpt plays identically to the official mini; a Medium minion that towers over the goblins beside it will bother you more than it bothers the rules.

That's also the reason the official lines are internally consistent even though sculptors' proportions drift: every mini ships with the correct base for its category, and the categories are locked to the grid.

## How Do I Scale a Classic Fantasy RPG STL to the Right Size?

### The slicer percentages I use for heroes and monsters

With axes locked, these are the numbers that cover almost every classic fantasy RPG situation:

| What you have | What you want | Percentage |
| --- | --- | --- |
| 28mm true-scale STL | 32mm heroic look | 114.3% |
| 32mm heroic STL | True 28mm table | 87.5% |
| Medium humanoid | Large creature | 200.0% |
| Medium humanoid | Huge creature | ~300.0% |

The Medium-to-Large jump is just scaling a humanoid figure to double height, since a 9-foot ogre is twice a 4.5-foot human. The Medium-to-Huge jump (~59mm from ~30mm) lands around 200% to 300% depending on how big you want your giant — the [slicer percentage calculator](/tools/slicer-percentage-calculator) gives you the exact number for any target height, and the [scale conversion chart](/reference) has the full table.

### Scaling monster STLs to match official minis

The one place I'm careful is monsters. Ancient dragons and krakens from third-party sculptors range wildly — I've seen "Gargantuan" dragons from 80mm to 180mm, because there's no single answer for "how tall is a dragon". My rule: decide your target base (4-inch for Gargantuan) and scale the STL so the *footprint* fits, then let the height be whatever proportion the sculptor chose. That keeps the mini legal on the table and stops you from obsessing over a number nobody official publishes.

If a dragon STL has no scale listed at all, the [miniature scale identifier](/tools/miniature-scale-identifier) will tell you what scale it's actually sculpted at by matching its height to the baseline — then you scale from there instead of guessing.

## How Do I Measure a Classic Fantasy RPG Mini to Find Its Scale?

### Measure to the eyes, not the top of the head

The single most useful habit for classic fantasy RPG printing: **measure to the eyes**. A humanoid is "28mm" when its eye line is 28mm above the base, and the 2-4mm between the eyes and the top of the head is exactly where the confusion comes from. When you read a Z-height in your slicer, you're reading total height including the head and the base — so subtract the base and eyeball the eye line before you decide a model is "the wrong scale".

This is the same convention the [175cm baseline guide](/guides/175cm-baseline) explains in full, and it's why two minis that are both "28mm" can measure 30mm and 32mm total and still be exactly the same scale.

### What if my STL has no scale listed?

You have three options, in order of how much I trust them. First, check the model description — many sculptors state the intended height even if not the scale word. Second, measure the printed or sliced height and compare it to this guide's chart; a Medium humanoid at 30-32mm is true 28mm, at 34.5mm total it's 32mm heroic. Third, use the [miniature scale identifier](/tools/miniature-scale-identifier), which does that comparison for you and hands you the exact percentage to hit whatever game you're printing for.

That's the classic fantasy RPG scale answer. True 28mm to the eyes, bases over heights, and one measurement before you type any percentage. The complete set of conversions across every tabletop scale — the classic fantasy RPG, the modern sci-fi epic wargame, the 35mm sci-fi mass-battle game, and the ratio scales — is on the [miniature scale conversion chart](/reference).
