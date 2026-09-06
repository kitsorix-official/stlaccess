---
title: "FDM Miniature Printing: Complete Guide to Layer Height, Nozzles, and Settings"
description: "Best FDM settings for tabletop miniatures — nozzles, layer heights, orientation tips, and post-processing for 28mm and 32mm models. Tested on my Bambu Lab A1 Mini."
tldr: "You do not need a resin printer. 0.2mm nozzle at 0.06mm layers for characters; 0.4mm at 0.08mm for rank-and-file. PLA, 100% fan, tilt 15-20°, tree supports, filler primer."
pubDate: "2026-07-09"
modDate: "2026-08-15"
faq:
  - question: What are the best FDM settings for printing tabletop miniatures?
    answer: >-
      Use a 0.2mm nozzle at 0.06mm layer height for character models and a
      0.4mm nozzle at 0.08mm for rank-and-file infantry. I settled on PLA or
      PLA+, 100% fan from layer 3, and tree supports after hundreds of prints
      on my Bambu Lab A1 Mini.
  - question: Do I need a resin printer to get good-looking miniatures?
    answer: >-
      No. With a 0.2mm nozzle, 0.06mm layers, and a coat of filler primer,
      FDM miniatures look great at arm's length and survive normal tabletop
      handling. I run FDM only on my Bambu Lab A1 Mini, and that's all I
      need.
  - question: How do I fix stringing on FDM miniature prints?
    answer: >-
      Enable retraction — 5mm at 40mm/s for Bowden, 1mm at 30mm/s for direct
      drive — and raise travel speed to 200mm/s so the nozzle crosses gaps
      quickly. I spent a whole evening fighting strings before I realized my
      travel speed was the culprit.
  - question: How do I stop supports from fusing to the model?
    answer: >-
      Reduce support interface density to 50% and increase the support Z
      distance to 0.2mm. The supports still hold the model but break away
      cleanly instead of scarring the surface. This is the setting that ended
      my snapped-bayonet streak.
tags: ["FDM printing", "slicer settings", "miniature printing", "layer height", "nozzle size"]
---

You do not need a resin printer to print good-looking tabletop miniatures. I've proven it to myself a hundred times over on my Bambu Lab A1 Mini, mostly in PLA and PETG. With the right FDM settings, 28mm and 32mm models come off the plate looking sharp at arm's length and surviving normal tabletop handling.

I didn't start here. Back in 2017 I was fighting a cheap entry-level FDM printer that spent more time clogging and peeling off the bed than actually printing. I almost gave up on the whole hobby. What kept me going was figuring out that the printer wasn't the problem — my settings were. Every setting in this guide is something I dialed in by ruining prints first, and I want you to skip that part.

## The Ideal FDM Setup for Miniatures

After hundreds of miniatures on my A1 Mini, here is the setup I keep coming back to:

| Component | Recommendation | Why |
|---|---|---|
| Nozzle | 0.2mm for characters, 0.4mm for rank-and-file | Smaller nozzle = finer detail, longer print time |
| Layer height | 0.06mm (0.2mm nozzle) or 0.08mm (0.4mm nozzle) | Balances detail against print duration |
| Filament | PLA or PLA+ | Easy to print, low shrinkage, good layer adhesion |
| Cooling | 100% fan from layer 3 | Sharp overhangs need maximum cooling at small layer heights |

I used to run everything through a 0.4mm nozzle because swapping nozzles felt like a hassle. Then I printed a power-armoured soldier with a 0.4mm nozzle at 0.08mm and squinted at the visible faceting on the helmet. The same model with a 0.2mm nozzle at 0.06mm layers looked like a different sculpt entirely. Now the 0.2mm nozzle only comes off for terrain and batch infantry.

## Bambu Lab A1/Mini Settings for Miniatures

Every number in this guide was dialed in on my Bambu Lab A1 Mini, so here is the whole machine-specific setup in one place. Nozzle, layer height, filament, and cooling come from the setup table above — these are the settings particular to the A1 and A1 Mini:

| Setting | Value | Why |
|---|---|---|
| Retraction | 1mm at 30mm/s | Direct drive, so short retraction is all it needs |
| Travel speed | 200mm/s | Crosses open gaps fast so stringing never gets a chance |
| Model tilt | 15-20 degrees backward | Hides layer lines on the face and chest |
| Supports | Tree (organic) | Touch the model at fewer points, leave less scarring |
| Flat bases | 5mm brim | Stops the corners from lifting on the textured plate |
| Plate prep | Clean plate, dry filament | Auto leveling only helps if the plate is clean |

Bambu Studio's built-in profiles are a solid base, but do not trust the default 0.4mm nozzle layer heights for miniatures — the defaults assume big parts, not 32mm soldiers. I always swap to the 0.2mm nozzle for characters and let the print run long. The A1 Mini's automatic leveling and vibration compensation handle the rest; my only job is to keep the plate clean and the filament dry.

If you're on a different printer, the layer heights and cooling advice in this guide transfer over fine — the retraction numbers are the direct-drive-specific part.

## Best Layer Heights for Detail

The single most important setting for miniature quality is layer height. Here is what I've learned at each range:

| Layer Height | Result | Best For |
|---|---|---|
| 0.04mm | Cast-quality finish, very slow (12+ hours for 32mm) | Display pieces, competition models |
| 0.06mm | Excellent detail, 6-8 hours for 32mm | Character models, officers, heroes |
| 0.08mm | Good detail, 4-5 hours for 32mm | Rank-and-file infantry, monsters |
| 0.12mm | Noticeable layer lines, 2-3 hours | Terrain, vehicles, test prints |
| 0.2mm | Very rough, fast | Large terrain, bases, quick prototypes |

My rule of thumb is simple: every hero in my army gets the 0.2mm nozzle at 0.06mm, because I'll paint them and display them and they deserve it. Rank-and-file squads get 0.08mm so I can actually field a full unit without waiting a week. The difference at arm's length is minor, and after primer it nearly vanishes.

## Orientation Matters

I learned orientation the expensive way. My first proper character print came out with obvious layer lines running straight across the face — because I'd dropped the model flat on the plate. How you orient the model affects surface quality more than any setting:

- **Tilt the model 15-20 degrees backward.** This hides layer lines on the front of the model (chest, face) and puts them on the back where they are less visible. This one tip changed more of my prints than any filament or nozzle change.
- **Place the most detailed surface facing up.** The top surface of an FDM print is always cleaner than the bottom (which rests on supports). Faces and pauldrons up, ugly support contact hidden underneath.
- **Use tree (organic) supports.** They touch the model at fewer points and leave less scarring than standard supports. My first standard supports left divots in a shoulder pad that took an hour of sanding and filling to repair.

## Post-Processing for FDM Miniatures

Three steps that transform an FDM miniature from okay to tabletop-ready:

1. **Remove supports carefully.** Flush cutters are better than pulling. Clip supports away from the model in small pieces rather than ripping them off. This prevents snapped bayonets and stretched plastic. Ask me how many spear tips I've sacrificed to impatience.

2. **Sand the layer lines (optional).** For character models, a quick pass with 400-grit sandpaper on flat surfaces (shoulder pads, helmet tops) removes visible layer lines. Avoid sanding faces and detail areas — I sanded a cape once and rounded off every fold.

3. **Prime with filler primer.** A coat of automotive filler primer fills micro-gaps between layers and gives you a smooth painting surface. Spray from 20cm away in quick passes. One coat is usually enough for 0.06mm layer heights. This is the cheapest magic trick in the hobby — it makes FDM prints read as store-bought plastic until you're close enough to count layers.

## Common FDM Miniature Problems

**Stringing between arms and body.** This happens when the nozzle moves across an open gap. I fought it for a full evening before realizing my travel speed was too slow. Fix it by enabling retraction (5mm at 40mm/s for Bowden, 1mm at 30mm/s for direct drive) and increasing travel speed to 200mm/s. My A1 Mini is direct drive, so 1mm at 30mm/s is my starting point.

**Supports fusing to the model.** Reduce support interface density to 50% and increase the support Z distance to 0.2mm. The supports will still hold the model up but will break away much more cleanly. This is the setting that ended my snapped-bayonet streak — I used to lose one weapon per squad to fused supports.

**Warped bases.** Print the base flat on the build plate with a brim. A 5mm brim around a 25mm or 32mm base prevents the corners from lifting during printing. I print my bases flat even when the model is tilted, because a warped base wobbles on the table and there is no fixing it after the fact.

## Summary

- 0.2mm nozzle at 0.06mm layer height for characters
- 0.4mm nozzle at 0.08mm layer height for rank-and-file
- Tilt models 15-20 degrees, use tree supports
- Filler primer hides remaining layer lines
- PLA works great—no special filament needed

I dialed all of this in the slow way so you don't have to. If your first FDM miniature doesn't look like a store-bought plastic miniature, that's normal — mine didn't either. Print another one with these settings and the difference will surprise you.
