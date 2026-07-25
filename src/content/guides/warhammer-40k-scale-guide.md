---
title: "How to Scale Warhammer 40k Miniatures for 3D Printing: The Complete Guide"
description: "Everything you need to scale 3D printed Warhammer 40k miniatures. Primaris to Firstborn, 32mm heroic conversions, and slicer settings for FDM printers."
pubDate: "2026-07-05"
modDate: "2026-07-05"
tags: ["Warhammer 40k", "scale conversion", "32mm", "FDM printing", "slicer settings"]
---

Warhammer 40k has one of the most confusing scale landscapes in tabletop gaming. Between Primaris, Firstborn, older sculpts, and third-party proxies, knowing what percentage to type into your slicer is not always obvious.

This guide covers every common Warhammer 40k scale situation you will run into when 3D printing miniatures.

## The Two Scales of Warhammer 40k

Games Workshop uses two distinct scales depending on the model range:

- **Primaris / newer sculpts (2017+):** 32mm heroic scale, measured to the eyes (160cm on a 175cm baseline)
- **Firstborn / older sculpts (pre-2017):** 28mm true scale, also measured to the eyes

A Primaris Marine is roughly 14% taller than a Firstborn Marine. This is not scale creep—it is intentional. The Primaris range was designed with truer human proportions, which means longer legs and a taller frame.

## Conversion Cheat Sheet for Warhammer 40k

| Conversion | Formula | Slicer % |
|---|---|---|
| Firstborn (28mm) → Primaris (32mm) | 32 ÷ 28 | **114.3%** |
| Primaris (32mm) → Firstborn (28mm) | 28 ÷ 32 | **87.5%** |
| 28mm → 40mm (terminator / gravis) | 40 ÷ 28 | **142.9%** |
| 32mm → 40mm | 40 ÷ 32 | **125.0%** |
| 28mm → 75mm (display scale) | 75 ÷ 28 | **267.9%** |

## How to Scale a Primaris Proxy on FDM

Most Warhammer 40k STL files you find online are designed for 32mm heroic scale. Here is how to handle them on an FDM printer:

1. **Check the sculptor's baseline.** If the description says "32mm scale" or "heroic 32mm," you can print it as-is for a Primaris army.
2. **Measure eye level in your slicer.** Import the STL, use the measurement tool, and check the distance from the bottom of the foot to the eyes. If it is not 32mm (or close), scale it.
3. **Set your layer height to 0.08mm.** This is the sweet spot for 32mm heroic miniatures on FDM. Detail is good enough for tabletop distance, and print time stays reasonable.
4. **Use a 0.2mm nozzle for faces.** If you have one, swap to a 0.2mm nozzle for character models. The difference in facial detail is significant.

## What About Vehicles?

Warhammer 40k vehicles use a different scaling convention. A Rhino chassis is designed to look correct next to 32mm Primaris models. If you are printing a vehicle STL labelled "for 28mm," scale it up to 114.3% to match your Primaris force.

For larger vehicles like Baneblades or Titans, scale by comparison to a known reference model rather than using a formula. Vehicle proportions vary too much between sculptors for a universal percentage.

## Summary

- Primaris = 32mm heroic (print at 100%)
- Firstborn = 28mm true (scale up 114.3% to match Primaris)
- Print at 0.08mm layer height with a 0.4mm nozzle for rank-and-file
- Use a 0.2mm nozzle for characters and faces
- Scale vehicles by reference, not formula

All percentages on this site use the same 175cm human baseline with eye-level measurement. If your prints look too tall or too short, measure the eye height and adjust from there.
