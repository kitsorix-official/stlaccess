---
title: "Upscaling 3D Prints: How Big Can You Enlarge a 32mm Miniature Before Losing Detail?"
description: "How much can you enlarge a 32mm miniature on FDM before losing detail? Layer line visibility, nozzle settings, and slicer tips for clean upscaling on my Bambu Lab A1 Mini."
tldr: "On FDM, a 32mm model upscales to about 50mm (156%) before layer lines get distracting. A 0.2mm nozzle at 0.08mm layers pushes the comfortable ceiling to about 80mm. Check the polygon count before going past that."
pubDate: 2026-06-25
faq:
  - question: How much can I upscale a 32mm miniature before losing detail?
    answer: >-
      On FDM, about 50mm (156%) before layer lines become distracting on flat
      surfaces. A 0.2mm nozzle at 0.08mm layers pushes the comfortable ceiling
      to roughly 80mm. I pushed way past that with a 200mm bust on my A1 Mini
      and the ridges were unmistakable.
  - question: How do I reduce visible layer lines when upscaling a print?
    answer: >-
      Print at a finer layer height: 0.04-0.08mm with a 0.2mm nozzle keeps the
      lines thin when the model is blown up 2-6x. Variable layer height also
      helps keep the faces smooth while hidden areas run thicker.
  - question: What limits upscaling beyond about 75mm?
    answer: >-
      The original model's polygon density. A model designed for 32mm may have
      too few polygons to look smooth at 200mm — apply a subdivision modifier
      (two iterations) in Blender or MeshLab before slicing. I learned this one
      by printing a faceted 200mm bust straight from a 32mm file.
  - question: Does upscaling need a bigger nozzle?
    answer: >-
      No, the opposite. A 0.2mm nozzle at thin layers keeps layer lines from
      turning into ridges when a model is blown up. A 0.4mm nozzle at 0.2mm
      layers looks rough at any size — upscaling just makes it worse.
tags: ["upscaling", "FDM printing", "detail", "layer height"]
---

The short answer: on FDM, you can upscale a 32mm miniature to about **50mm (156%)** before layer lines start to dominate. Beyond that, expect visible ridges and real sanding work.

I know because I blew right past that ceiling. I decided a favorite 32mm model would make a perfect 200mm display bust, scaled it up in my slicer, and let my Bambu Lab A1 Mini run for days. The result was a bust with ridges you could feel with a fingernail and faceted armor plates that looked like low-poly art. The model was fine. My assumptions about upscaling were not.

## Why Upscaling Makes Layer Lines Visible

Imagine a 0.08mm layer line on a 32mm model. At 1:1 scale, that line is 0.08mm thick — essentially invisible to the naked eye at arm's length.

Now upscale that model to 200mm (625%). That same layer line is now 0.5mm thick — a visible ridge you can feel with your fingernail. That is exactly what my bust felt like.

The math:

```
layer_height × (target_height ÷ source_height) = effective_layer_visibility
```

What happens in practice at 0.08mm layers:

| Source | Target | Scale % | Layer line at 0.08mm |
|--------|--------|---------|---------------------|
| 32mm | 32mm | 100% | 0.08mm (invisible) |
| 32mm | 50mm | 156% | 0.12mm (barely visible) |
| 32mm | 80mm | 250% | 0.2mm (visible) |
| 32mm | 125mm | 391% | 0.31mm (obvious) |
| 32mm | 200mm | 625% | 0.5mm (very rough) |

## Mitigation: Lower Your Layer Height

The most effective fix is to print at a finer layer height. This is the single change that saved my second attempt at the bust:

| Layer Height | Max upsized height before lines are visible |
|-------------|--------------------------------------------|
| 0.12mm (standard) | ~35mm |
| 0.08mm (fine) | ~50mm |
| 0.04mm (ultra-fine, 0.2mm nozzle) | ~80mm |

If you want a comfortable 75mm display piece on FDM, that means 0.04mm layers with a 0.2mm nozzle — and a lot of patience, because that is slow going. My A1 Mini handles 0.04mm fine, but a full bust is a multi-day print.

## Why FDM Limits Upscaling

FDM introduces two problems when upscaling — and I live with both on my A1 Mini:

1. **Z-axis banding** — the mechanical movement of the gantry amplifies slight imperfections, creating visible horizontal bands on tall prints. A 32mm mini hides them; a 200mm bust puts them front and center.
2. **Overhang degradation** — details that were crisp at 32mm become stair-stepped at larger sizes because the same angle creates wider steps.

If you must upscale miniatures on FDM, print at 0.08mm layer height with a 0.2mm nozzle. This halves the visible layer lines compared to a standard 0.4mm nozzle at 0.2mm layer height.

## The Practical Limit for Display Pieces

For a display-quality 32mm → 80mm upscale on FDM, this is the recipe I'd re-run for my bust:

1. **Use a 0.2mm nozzle**
2. **Slice at 0.04-0.08mm** layer height
3. **Enable variable layer height** in your slicer to use thicker layers on hidden areas and thinner on faces
4. **Acetone vapour smooth** ABS or ASA prints (do not use on PLA)

The variable layer height setting alone hides most of the banding — the helmet and pauldrons get thin layers, while the cape and base run thick and fast.

## Beyond 75mm: The Bust Range

If you want to go beyond 75mm (say, a 200mm display bust from a 32mm source file), the limiting factor is no longer layer lines — it is the original model's polygon density. A model designed for 32mm printing may have too few polygons to look smooth at 200mm. My first 200mm bust looked faceted not because of my printer, but because the source mesh was never meant to be that big.

Check the model in Blender or MeshLab before printing. If you can see faceted edges at the target size, apply a subdivision modifier (two iterations is usually enough) to smooth the geometry before slicing. That step alone would have saved my first bust.

## Summary

- **FDM, 32mm → 50mm (156%):** Fine with a 0.2mm nozzle at 0.08mm. Manageable lines.
- **FDM, 32mm → 80mm (250%):** Needs 0.04mm layers and variable layer height. Expect sanding.
- **FDM, 32mm → 200mm+ (625%):** Visible ridges even with optimal settings. Check polygon count and be ready for serious post-processing.
- **Always check the polygon density** before committing a big upscale to a long print.

For more on how scales relate and the baseline measurements used, see the [scale reference library](/reference) or use the [STL scale engine](/) to calculate any conversion.
