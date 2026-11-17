---
title: "Filament Density: Convert Print Volume to Grams and Cost"
description: "Use material density to turn a model's cm³ into grams, grams into cost, and hollow prints into a realistic filament estimate."
tldr: "Weight = volume × density. A 10cm³ solid PLA print weighs 12.4g because PLA is 1.24g/cm³; PETG at 1.27g/cm³ weighs 12.7g. For hollow FDM prints, count the walls plus the infill percentage of the interior, then multiply grams by your price per gram."
pubDate: 2026-11-17
modDate: 2026-11-17
faq:
  - question: How do I calculate filament weight from volume?
    answer: >-
      Multiply volume in cm³ by density in g/cm³. Ten cubic centimetres of
      PLA at 1.24g/cm³ weighs 12.4g. Your slicer reports the volume in the
      preview, so you do not have to measure the model yourself.
  - question: What is the density of PLA and PETG?
    answer: >-
      PLA is typically 1.24g/cm³ and PETG about 1.27g/cm³. ABS is lighter at
      1.04g/cm³. Brand-to-brand variation is small — roughly ±2% — and colour
      pigments make no practical difference.
  - question: How do I calculate the weight of a hollow FDM print?
    answer: >-
      Subtract the interior behind your wall thickness from the outer volume,
      then add back the infill percentage of that interior. Material volume
      = (outer − inner) + (inner × infill %). Multiply the result by density.
  - question: How much does a 32mm miniature cost in filament?
    answer: >-
      A typical 28–40mm miniature uses 5–15g including supports. At a
      mid-range PLA price of about $0.02/g, that is roughly $0.10–$0.30 in
      filament. Check your slicer's gram estimate for the actual number.
  - question: Does density tell me print time?
    answer: >-
      No. Density converts volume to mass. Print time depends on layer height,
      wall count, infill pattern, speed and supports. Use the slicer estimate
      for time and density math for weight and material cost.
  - question: Why is PLA-CF heavier than ordinary PLA?
    answer: >-
      Carbon-fibre filler raises the density from about 1.24g/cm³ to around
      1.27g/cm³. The same printed volume therefore weighs a little more,
      even though the shape is identical.
tags: ["filament", "density", "cost", "FDM", "math"]
---

Slicers give you two numbers that matter before a print: **volume in cm³** and **filament used in grams**. Density is the bridge between them. Once you have grams, your roll price gives you the cost.

The formula is simple:

> **grams = cm³ × g/cm³**

A solid 10cm³ model in PLA at 1.24g/cm³ weighs `10 × 1.24 = 12.4g`. The same model in ABS at 1.04g/cm³ weighs 10.4g — about 16% lighter for the same shape.

## Material density reference

| Material | Density (g/cm³) | Typical use |
| --- | ---: | --- |
| PLA | 1.24 | Miniatures, crisp detail, everyday printing |
| PETG | 1.27 | Terrain and parts that need toughness |
| ABS | 1.04 | Enclosed printing, lightweight parts |
| ASA | 1.07 | UV-stable outdoor parts |
| TPU | 1.21 | Flexible banners, tires, tracks |
| Nylon (PA12) | 1.14 | Strong functional parts |
| Polycarbonate | 1.20 | High-heat parts |
| PLA-CF | 1.27 | Stiff, filled PLA |
| Standard resin | 1.10 | Solid miniature prints |
| ABS-like resin | 1.15 | Tougher resin miniatures |

These are typical values. The full list is also in the [machine-readable dataset](/data/material-densities.json).

## Hollow prints need shell math

Most FDM prints are not solid. For a hollow model:

1. Take the **outer volume** from the slicer.
2. Estimate the **inner volume** behind your wall thickness.
3. Add back the **infill fraction** of that inner volume.

> **material cm³ = (outer − inner) + (inner × infill %)**

A 50mm cube has an outer volume of 125cm³. With a 1.2mm wall, the interior is roughly 88cm³. At 15% infill, material volume is `(125 − 88) + (88 × 0.15) = 46.2cm³`. In PLA that is about **57g**, not the 155g a solid cube would weigh.

My [Filament Density Calculator](/tools/filament-density-calculator) does the geometry, shell math and spool cost in your browser. It never uploads your dimensions.

## Turn grams into cost

Divide the roll price by the roll weight, then multiply by the grams your print uses:

> **cost = grams × (roll price ÷ roll weight)**

A $19.99, 1000g roll costs about **$0.020/g**. A 10g miniature is roughly **$0.20** in filament. Add electricity separately if you want the full picture; the [Filament Cost Calculator](/tools/filament-cost-calculator) does that with your printer's power draw and local rate.

## Worked example — a 32mm miniature

- Slicer volume: **6cm³** including supports
- Material: PLA at **1.24g/cm³**
- Weight: `6 × 1.24 = 7.4g`
- Roll: $19.99 for 1000g → **$0.020/g**
- Filament cost: `7.4 × 0.020 = $0.15`

That is the number I use when comparing a 0.2mm nozzle print with a 0.4mm nozzle print. The finer nozzle costs a little more time, but often less support material.

## What the estimate does not include

Density math is about material, not process:

- purge tower and prime line waste;
- brims, rafts and elephant-foot compensation;
- over-extrusion from a poorly calibrated flow rate;
- moisture and foaming in old filament;
- printer time, failure risk and electricity.

Your slicer's gram readout already includes most of the toolpaths. Use that number when it is available and use the geometry estimate only before slicing.

## Where this fits

This is FDM math, not scale math — the 175cm human baseline does not affect density. It belongs in the [FDM printing pillar](/learn/fdm), beside the [FDM miniature printing guide](/guides/fdm-miniature-printing-guide). The measurement rules that *do* use the baseline are on the [methodology page](/methodology).
