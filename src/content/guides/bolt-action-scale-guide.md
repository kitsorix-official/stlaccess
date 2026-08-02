---
title: "Bolt Action 28mm Scale: The Complete Guide to 3D Printing Historical Miniatures"
description: "How to 3D print historical miniatures for Bolt Action at true 28mm scale. Infantry, vehicles, terrain, and the 1:56 ratio explained for FDM printers."
tldr: "Bolt Action infantry are 28mm true scale (eye level); vehicles are 1:56. Convert a 1:35 vehicle with 62.5%, a 1:48 with 85.7%. Print infantry at 0.1mm layers, vehicles at 0.2mm."
pubDate: "2026-07-07"
modDate: "2026-07-07"
tags: ["Bolt Action", "28mm", "historical wargaming", "vehicle scale", "FDM printing"]
---

Bolt Action is one of the most popular historical wargames, and it uses a specific scale convention that matters when you are 3D printing miniatures. This guide covers infantry scaling, vehicle compatibility, and FDM settings that work for World War II tabletop gaming.

## What Scale Is Bolt Action?

Bolt Action infantry are **28mm true scale**, measured to the eyes (160cm on a 175cm human baseline). This is the same convention used by older Warhammer 40k Firstborn models, D&D miniatures, and most historical wargaming ranges.

The vehicle scale for Bolt Action is **1:56**. This ratio means that 1 millimetre on the model equals 56 millimetres in real life. A 3-metre-tall Sherman tank should measure approximately 53.5mm on the tabletop.

## Why 1:56 Works with 28mm Infantry

The 1:56 vehicle scale is paired with 28mm infantry because both use the same reference point. A 175cm human in 1:56 scale is approximately 31.25mm tall to the top of the head, which puts the eye level at about 28mm. The math lines up.

## FDM Settings for Bolt Action Miniatures

| Component | Nozzle | Layer Height | Notes |
|---|---|---|---|
| Infantry (rank and file) | 0.4mm | 0.1mm | Good enough for tabletop. Bayonets may soften. |
| Infantry (characters/officers) | 0.2mm | 0.06mm | Better facial detail, cleaner rifle barrels |
| Vehicles (tanks/trucks) | 0.4mm | 0.2mm | Print fast, detail holds well at this scale |
| Terrain (buildings/walls) | 0.4mm | 0.2mm | Use grid infill for strength |

## Converting Non-28mm STLs for Bolt Action

Most vehicle STL files are designed for 1:35 scale (traditional model kits). Here is how to convert them:

| Source Scale | Target Scale | Slicer % |
|---|---|---|
| 1:35 vehicle | 1:56 vehicle | **62.5%** |
| 1:48 vehicle | 1:56 vehicle | **85.7%** |
| 1:72 vehicle | 1:56 vehicle | **128.6%** |
| 32mm infantry | 28mm infantry | **87.5%** |
| 35mm infantry | 28mm infantry | **80.0%** |

## Common Bolt Action Printing Mistakes

**Mistake 1: Printing vehicles at 100% when they are designed for 1:35.** A 1:35 tank printed at full size will be nearly twice as long as it should be next to your 28mm infantry. Always check the STL description for the intended scale.

**Mistake 2: Scaling infantry by total height instead of eye level.** A model with a raised arm or tall helmet will have a misleading bounding box. Measure from the foot contact point to the eyes, use that as your reference dimension.

**Mistake 3: Using 100% infill on vehicles.** Most Bolt Action vehicles are hollow in the real kit. For 3D prints, use 15-20% grid infill. It saves filament and the model will still be durable enough for regular handling.

## Summary

- Bolt Action infantry = 28mm true scale (eye-level measurement)
- Bolt Action vehicles = 1:56 ratio scale
- Print vehicles at 0.2mm layer height, infantry at 0.1mm
- Use 62.5% to convert 1:35 vehicles to 1:56
- All percentages use the 175cm human baseline
