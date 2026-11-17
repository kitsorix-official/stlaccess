---
title: "Cura Tree Support Settings: How to Make Supports Easy to Remove"
description: "The exact Cura tree (organic) support settings for 3D printing miniatures that come off clean — Z distance, interface layers, branch distance and angle, and painting supports on manually."
tldr: "In Cura, use tree supports on the build plate only, overhang threshold 20, top Z distance 0.25, 3 top + 3 bottom interface layers, branch distance 2.0, branch diameter 1.0, branch angle 60, no prime tower. For problem models, paint supports on by hand instead of trusting auto."
pubDate: "2026-08-30"
faq:
  - question: What are the best Cura tree support settings for miniatures?
    answer: >-
      Enable tree (organic) supports, restrict them to the build plate, set the
      overhang threshold to 20, top Z distance to 0.25, 3 top and 3 bottom
      interface layers, and use a branch distance of 2.0mm with a 1.0mm branch
      diameter at a 60-degree angle. Skip the prime tower. These values came
      out of a long series of test prints.
  - question: How do I stop tree supports from fusing to my model?
    answer: >-
      Increase the top Z distance (0.25mm is a sweet spot with tree supports)
      and make sure the interface layers are set in the middle range — 3 top
      and 3 bottom works best. Supports that still stick can be thinned by
      painting supports on only where the model genuinely needs them instead of
      letting auto place them everywhere.
  - question: Should I let Cura auto-place tree supports on a miniature?
    answer: >-
      Auto works for simple models, but for detailed minis it places supports
      in all sorts of awkward spots, including across faces. Set the overhang
      threshold to 20 to cut way back on support, then paint supports on by
      hand only where the model actually needs holding up. It's tedious, but it
      gives you a model with almost no support scarring.
  - question: Why do tree supports print faster than normal supports?
    answer: >-
      Tree supports touch the model at far fewer points and only grow where
      the model genuinely overhangs, so there's much less material and far less
      to remove. Combined with printing the supports coarser than the model,
      tree supports can shave a big chunk off total print time.
tags: ["Cura", "support settings", "tree supports", "FDM printing", "miniature printing"]
---

Every time I've pulled a failed miniature off my Bambu Lab A1 Mini, the culprit was almost never the model and almost always the supports. Either they never formed, they snapped mid-print, or they fused to the model so hard I destroyed the detail removing them. Getting tree supports right changed all three of those failures at once.

This guide distills the settings I finally settled on after a long run of test prints. They're the values I now trust for miniatures in Cura, and they transfer to most printers with a 0.2mm or 0.4mm nozzle.

## The Settings That Worked

Here's the whole setup, in one table. These are the numbers I keep coming back to:

| Setting | Value | Why |
|---|---|---|
| Support type | Tree (organic) | Touches the model at few points, easy to remove |
| Support placement | Only build plate | Keeps supports off the model's sides entirely |
| Overhang threshold | 20 | Stops Cura from supporting every little detail |
| Top Z distance | 0.25 | Small enough to hold, big enough to break away clean |
| Top interface layers | 3 | A thin, removable interface before the model |
| Bottom interface layers | 3 | Keeps the branch tips held while they grow |
| Tree branch distance | 2.0 | The gap between branches (the magic number) |
| Tree branch diameter | 1.0 | Thick enough to be reliable, thin enough to remove |
| Tree branch angle | 60 | Steeper angles here stop over-supporting |
| Prime tower | Off | Saves time, not needed for single miniatures |

The **branch distance** is the setting that made the biggest difference for me. It controls how far apart the support branches grow. Get it too low and the supports form a solid wall under the model; too high and they just don't grow where you need them. 2.0mm hit the balance where supports hold cleanly but pull away almost voluntarily.

## Keep the Model Standing at a Good Angle

Before any settings matter, the model needs to be oriented so it doesn't fight the printer. For a miniature with lots of accessories, tilt it back about 45° so the center of gravity sits over the base and the supports do the minimum work. Flipping it doesn't have to be the exact same every time — it depends on how the model's weight is distributed.

The point is to place supports underneath the model to hold it up, like crowd-surfers at a concert, rather than all over the model's front and face. Supports on visible surfaces are what create the scars you spend an hour sanding off.

## Print the Supports Coarser

Tree supports only need to hold the model, not look good. So print them faster and rougher. If your model is at 0.08mm layers, run the supports at a coarser layer height and fewer walls. This cuts print time noticeably.

A few other settings that helped me finish a batch of miniatures faster without hurting quality:

| Setting | Value |
|---|---|
| Wall loops | 1 for supports, keep the model's own higher |
| Sparse infill density | 35% |
| Sparse infill pattern | Cubic |
| Support top layers | 3 |

## Paint Supports On for Problem Models

Auto supports are fine for a simple soldier. For a sculpt with a cape, a chain, or delicate details, letting auto run everywhere is how you end up with supports plastered across a face. The fix is to paint supports on by hand.

In Cura, use the support **painting** tool and zoom right in. The trick is to think like a printer: brush supports only where the model actually needs holding up, and skip anywhere the support would be hard to remove. For a model at a 45° angle, that usually means the underside of the torso and limbs represented in green, and the visible front surfaces brushed with the "no support" color in pink.

It's tedious, but it's the single most reliable way to get a clean miniature. I do it for every hero model now and save the auto settings for rank-and-file infantry.

## Summary

- Tree supports with branch distance 2.0, branch diameter 1.0, angle 60
- Overhang threshold 20 so it doesn't over-support
- Top Z distance 0.25 with 3 top + 3 bottom interface layers
- Print supports coarser than the model to save time
- Paint supports on by hand for any detailed model

The day I stopped trusting auto supports for characters and started painting them on was the day my failure rate dropped and the sanding time shrank. The settings above are the starting point — print a test model, see where the supports stick, and nudge the Z distance or branch distance until they come off clean.
