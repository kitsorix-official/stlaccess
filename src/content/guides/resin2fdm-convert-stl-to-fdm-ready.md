---
title: "Resin2FDM: Convert Resin-Supported STLs to FDM-Ready in Blender"
description: "How to take a resin-presupported STL from any sculptor and make it print clean on an FDM printer using the Resin2FDM Blender add-on — split, assign, thicken supports, and slice for cleanup."
tldr: "Split the pre-supported STL into loose parts, assign the mini, thicken the resin supports to 0.05-0.2mm so FDM picks them up, generate a level cube, export mini + supports separately, then print supports at 0.16mm layers with 2 walls."
pubDate: "2026-08-30"
faq:
  - question: What is Resin2FDM and do I need it?
    answer: >-
      It's a Blender add-on that turns a resin-presupported STL into an
      FDM-friendly print. It splits the model into the miniature and its
      supports, thickens the fragile resin supports so an FDM nozzle can
      actually print them, and keeps the parts aligned so they separate
      cleanly in the slicer. Resin2FDM Lite is free via the Gumroad link in
      the tutorial videos; Resin2FDM Advanced is available to Painted4Combat's
      Patreon supporters and adds automatic support detection plus a bunch of
      convenience features.
  - question: How much should I thicken the supports?
    answer: >-
      Usually 0.05-0.2mm. Resin supports are often a millimeter or less thick —
      too thin for an FDM slicer to pick up or strong enough to survive a
      print. Each sculptor differs: I found Bite the Bullet models want about
      0.05mm while Puppets War wanted around 0.07mm. Do a test print or two to
      find the balance between a successful print and easy removal.
  - question: Do FDM-specific pre-supported files need thickening?
    answer: >-
      No. Files sold as FDM-ready (for example Artisan Guild's) skip the
      thicken step entirely because their supports are already built for an
      FDM nozzle. Only thicken when you're converting a resin pre-supported
      file.
  - question: Should I print the supports at the same layer height as the model?
    answer: >-
      No, print them coarser and faster. After splitting the mini from its
      supports in the slicer, set the support layer height to 0.16mm (double
      the model's) and drop the supports to 2 walls. They print much faster and
      rarely rip, as long as supports are laying down at a slower speed so they
      don't snap off mid-print.
tags: ["Resin2FDM", "Blender", "support settings", "FDM printing", "miniature printing"]
---

Every sculptor seems to release pre-supported files these days. The catch: most of those supports are designed for a resin printer. They're a fine lattice a millimeter or less in diameter, laid down by a laser. Drop that same file in an FDM slicer and the supports are too thin for the nozzle to print or too weak to survive layer after layer.

You don't need to abandon those files. With the Resin2FDM Blender add-on you can convert a resin pre-supported STL into a clean FDM print in a few minutes. I've used this workflow to print models from half a dozen different sculptors on my Bambu Lab A1 Mini, and it's become my default for any pre-supported STL.

## Why Resin Supports Don't Work on FDM

Resin supports are designed to snap off with bare fingers and leave almost no trace — they're thin, light, and touch the model at tiny points. An FDM printer lays down molten plastic through a 0.2mm or 0.4mm nozzle. It can't resolve a 0.5mm support tower the way a resin UV light can, and even if it tries, the tower is too fragile to support the weight of a 20-gram plastic model over hours of printing.

Resin2FDM fixes the two real problems:

1. **It thickens the supports** so the slicer recognizes them and they survive the print.
2. **It keeps the mini and supports aligned** so you can print them at different speeds and layer heights, then pull them apart cleanly.

## What You Need

- **Blender** 4.2 or newer (I use 4.5).
- **Resin2FDM** — **Lite** is free from the creator's Gumroad; **Advanced** (with automatic support detection and extra features) is for Patreon supporters. Install as an add-on: Edit → Preferences → Add-ons → Install from Disk, then select the ZIP (no need to unzip it). The current release is v1.5.
- **A resin pre-supported STL** — the model and its supports in one file.
- Your normal FDM slicer (Orca Slicer, Bambu Studio, Cura — the workflow is the same).

## The Workflow

### 1. Prepare and import

Open Blender, press **N** to bring up the toolbar, and open the Resin2FDM tab. Hit **Prepare Scene** — it removes Blender's default cube, camera, and lamp that would otherwise interfere. Then **Import STL** and load your miniature.

Sometimes a model imports rotated 90°. If yours isn't sitting flat, select it, go to the Item tab, and set the rotation to 90 or -90 until it sits on the plate.

### 2. Split by loose parts

Click **Split by Loose Parts**. This separates the model into the miniature and all its tiny support pieces. Usually you get one object for the mini and a pile of objects for the supports. Sometimes a sculptor's model splits into several disconnected chunks too — that's normal, just select all of the mini's parts.

### 3. Assign the miniature

Select the mini (or all of its parts) and click **Assign Miniature**. Blender merges your selection into one "miniature" object and groups the rest together as the supports. This tells the tool which is which for the steps that follow.

### 4. Thicken the supports

This is the heart of the workflow. Resin supports are too thin for FDM, so you bulk them up. Open **Thicken Supports**, enter a value, preview it, then **Apply Modifier**.

- **Resin pre-supports:** start around **0.05mm** and test. Different sculptors need different values — I found Bite the Bullet likes 0.05mm while Puppets War wanted 0.07mm.
- **FDM-ready pre-supports** (Artisan Guild and similar): skip this step entirely, they're already built for FDM.
- A value between **0.1 and 0.2** is a common sweet spot for thicker-style sculptors. There's real trial and error here — the tool shows you an estimated thickest-tower size to compare models.

Applying the thickness matters. If you skip it, the next step won't work right.

### 5. Generate the level cube

Click **Generate Level Cube**. It adds a small piece of material under the miniature that sits flush with the bottom of the supports. Its job: when you separate the mini from its supports in the slicer, the mini doesn't drop to the build plate and misalign.

This is exactly why you had to apply the thickness first — the cube has to account for it, or the two parts end up slightly off.

### 6. Export

Export the miniature and supports as **separate STL files**, or as a **single 3MF** if you've enabled that export option. Newer versions of Resin2FDM (v1.5 and up) can bake the support settings straight into the 3MF, so the supports are already configured for fast printing when you open it in the slicer. Name things clearly — e.g. `knight-miniature` and `knight-supports`.

## Slicing for Clean Miniature + Support Separation

Now the part that saves print time. In Orca Slicer or Bambu Studio:

1. **Drop both files into the slicer together.** When it asks to import as one model with multiple parts, say **yes** (for STL). This keeps the mini and supports lined up.
2. **Right-click → Split to Objects.** Now the mini and supports are separate so you can tune them independently.
3. **Select the supports** and set their **layer height to 0.16mm** (double or more than the model's), walls down to **2**, and speeds around **50mm/s**. The supports print way faster, and 50mm/s keeps them from snapping off.
4. **Make sure auto-supports are OFF.** Resin2FDM replaces it with the pre-generated supports.
5. The **level cube** prevents the mini from dropping to the plate when you split them apart.

## Printer Settings

I run this on my Bambu Lab A1 Mini with a **0.2mm nozzle**. Any printer that handles a 0.2mm nozzle will work — the workflow is about how you prepare the file, not a specific machine.

A few notes from my own prints:
- The model itself stays at your normal miniature layer height (0.06mm on a 0.2mm nozzle for me).
- Keep the supported angle reasonable — tilt models back so you're not placing supports on faces. Designed In Layers's method of running the support simulation slowly and checking for floating sections applies here too, just after the Resin2FDM pass.
- Supports that don't touch important visible areas remove with almost no scarring. The whole point of this workflow is that the support breakthrough is tiny and in non-visible spots.

## Summary

- Resin pre-supports are too thin for FDM — thicken them 0.05-0.2mm per sculptor.
- Split, assign, thicken, level cube applies in that exact order — skipping the apply step breaks the cube.
- Export mini and supports separately; re-import as one multi-part model.
- Print the supports at 0.16mm with 2 walls and 50mm/s so they're fast and durable.
- FDM-ready files (Artisan Guild) skip the thickening step.

The first time I converted a pre-supported file I expected a mess. Instead I got a power-armoured soldier that came off the plate clean, with supports that snapped off in seconds and left almost no trace. Those resin files aren't a dead end on an FDM printer — they just need a minute in Blender first.
