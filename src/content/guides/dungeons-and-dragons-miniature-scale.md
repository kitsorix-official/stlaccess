---
title: "D&D Miniature Scale: What Size Are D&D Minis and How to 3D Print Them"
description: "The complete guide to Dungeons & Dragons miniature scale for 3D printing. 28mm true scale explained, FDM settings for D&D minis, and scaling between monster sizes."
pubDate: "2026-07-13"
modDate: "2026-07-13"
tags: ["Dungeons & Dragons", "28mm", "miniature scale", "FDM printing", "monster scaling"]
---

Dungeons & Dragons miniatures are 28mm true scale, measured to the eyes on a 175cm human baseline. But D&D has a unique challenge: you need to print everything from a 25mm goblin to a 150mm dragon, and they all need to look correct next to each other on the same table.

## Standard D&D Creature Sizes

D&D uses size categories that map to specific miniature heights:

| Size Category | Examples | Typical Height | Base Size |
|---|---|---|---|
| Tiny | Imp, sprite, rat | 10-15mm | 20mm |
| Small | Goblin, kobold, halfling | 20-24mm | 25mm |
| Medium | Human, elf, orc | 28-32mm | 25mm |
| Large | Ogre, troll, horse | 50-60mm | 50mm |
| Huge | Giant, dragon, beholder | 80-120mm | 75mm |
| Gargantuan | Ancient dragon, kraken | 150mm+ | 100mm+ |

A Medium creature in D&D is roughly equivalent to a 28mm true scale miniature. If you print a human fighter STL that is labelled "32mm," it will look slightly larger than an official D&D mini—not enough to be jarring, but noticeable if they stand next to each other.

## Scaling for D&D on FDM

D&D miniatures have a lot of small detail: faces, weapons, cloaks, and accessories. Here are the FDM settings I use:

| Creature Size | Nozzle | Layer Height | Print Time (estimate) |
|---|---|---|---|
| Small (goblin) | 0.2mm | 0.06mm | 3-4 hours |
| Medium (human) | 0.2mm or 0.4mm | 0.06mm or 0.08mm | 4-6 hours |
| Large (ogre) | 0.4mm | 0.1mm | 6-8 hours |
| Huge (giant) | 0.4mm | 0.12mm | 10-14 hours |
| Gargantuan (dragon) | 0.4mm | 0.2mm | 20+ hours |

## Converting Between Creature Sizes

If you find an STL for a Medium creature but want it as a Large-sized monster for a custom encounter:

| Conversion | Formula | Slicer % |
|---|---|---|
| Medium (28mm) → Large (56mm) | 56 ÷ 28 | **200%** |
| Medium (28mm) → Huge (112mm) | 112 ÷ 28 | **400%** |
| Small (22mm) → Medium (28mm) | 28 ÷ 22 | **127.3%** |
| Large (56mm) → Huge (112mm) | 112 ÷ 56 | **200%** |

## Printing D&D Miniatures in Bulk

If you are printing an entire party or a full encounter, batch printing saves time:

- Print multiple miniatures at once by arranging them on the build plate with at least 5mm of spacing between each model.
- Use the same layer height for all models in the batch. Switching between 0.06mm and 0.1mm per model wastes time on filament changes and recalibration.
- Print bases separately. Flat circular bases print in minutes and you can glue the miniatures on after removing supports.

## Common D&D Scaling Mistakes

**Printing a dragon at 100% when it was designed for 28mm scale.** A dragon STL labelled "for 28mm" is already the correct size for a Medium-scale game. If you want an Ancient dragon that towers over the party, scale it to 200-400%.

**Using a 0.4mm nozzle for tiny creatures.** A goblin's face at 0.2mm layer height with a 0.4mm nozzle will lack definition. Swap to a 0.2mm nozzle for anything Small or smaller.

**Scaling by bounding box.** A dragon with outstretched wings will have a huge bounding box that does not reflect its body size. Measure from foot to eye, ignore the wing span.

## Summary

- D&D uses 28mm true scale for Medium creatures
- Goblin = 22mm, Human = 28mm, Ogre = 56mm, Dragon = 112mm+
- Use a 0.2mm nozzle for Small and Medium creatures
- Print bases separately for faster batch production
- All percentages use the 175cm human baseline with eye-level measurement
