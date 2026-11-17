---
title: "How to Open an STL File (Browser, Slicer or CAD)"
description: "An STL stores triangles, not units. Here is how to open one in a browser, slicer or CAD tool — and what to check before you print."
tldr: "Open an STL in a browser viewer for a quick look, in your slicer to measure and print, or in Blender/MeshLab if you need to edit the mesh. An STL contains only surface triangles — no units, no scale and no colour — so always check the bounding box before you trust the size."
pubDate: 2026-11-17
modDate: 2026-11-17
faq:
  - question: What is the easiest way to open an STL file?
    answer: >-
      Drag it into a browser-based STL viewer for a quick look, or import it
      into your slicer if you need measurements. Both read binary and ASCII
      STL files. Nothing needs to be installed for a browser viewer, and no
      upload is required for tools that parse the file locally.
  - question: Can a browser open an STL file?
    answer: >-
      Yes. Modern browser viewers use WebGL to render the triangles in an
      STL. They are good for checking orientation, missing parts and the
      bounding box. They cannot reliably tell you the intended scale, because
      the file has no unit information.
  - question: Why does my STL open at the wrong size?
    answer: >-
      STL coordinates are unitless. Your slicer assumes millimetres, so a file
      exported in inches will appear 25.4 times too small. Files with scale
      already baked in, or sculpted to a different measurement convention,
      can also look wrong. Check the bounding box and compare it with the
      scale listed by the sculptor.
  - question: What is the difference between ASCII STL and binary STL?
    answer: >-
      ASCII STL stores each triangle as readable text and is much larger.
      Binary STL stores the same triangle data in a compact fixed-size format.
      Both describe the same geometry, so viewers and slicers open either one.
      Binary is the normal export choice.
  - question: Do I need Blender to open an STL?
    answer: >-
      No. Blender is only needed when you want to edit the mesh: split a base,
      thicken supports or repair normals. For viewing, measuring and printing,
      a slicer or browser viewer is faster.
  - question: Can an STL store colour or material?
    answer: >-
      The classic STL format cannot. It stores only triangle geometry. Colour,
      material and print settings live in formats such as 3MF, OBJ with an MTL
      file, or the slicer project itself. A multicolour print needs separate
      STL bodies or a format that carries material data.
tags: ["STL files", "beginners", "file basics", "browser tools", "3D printing"]
---

An STL file opens in three places: a **browser viewer** for a quick visual check, a **slicer** for measuring and printing, and a **CAD or mesh editor** when you need to change the geometry. The format itself is deliberately simple, which is why the same file can look correct in one program and tiny in another.

## What an STL actually contains

An STL describes the outside surface of a model as a list of triangles. Each triangle stores three corner coordinates and a surface normal. That is the whole file.

It does **not** store:

- millimetres, inches or any other unit;
- a scale label such as “28mm heroic”;
- colour, material or print settings;
- a reliable distinction between the figure, its base and its supports.

That is why the number you see when you import one is only a measurement in your slicer's default units — not a statement of the sculptor's intent. My full measurement rules are on the [methodology page](/methodology).

## Open it in a browser

Use this when you just want to see the model:

1. Open a viewer that parses STL files locally in the browser.
2. Choose the file, or drop it onto the viewport.
3. Orbit around the model and check for missing limbs, stray supports or a sculpt that is floating above its base.
4. Read the viewer's bounding box if it offers one.

A browser check is also the fastest way to confirm that the download is not a resized preview or a support-only file. My [3D Scale Visualizer](/tools/3d-scale-visualizer) does this without uploading your file.

## Open it in a slicer

Use this when you are getting ready to print:

1. Import the STL into Chitubox, Lychee, Cura, PrusaSlicer or Bambu Studio.
2. Select the model and read the **X / Y / Z dimensions** before touching the scale tool.
3. Compare those dimensions with the scale the sculptor stated. A true 28mm humanoid should be about 28mm foot-to-eye and roughly 31–32mm to the top of the head.
4. Only then apply a percentage, with X, Y and Z locked together.
5. Re-check the bounding box after scaling, then generate supports and slice.

If your resin slicer's scale controls are unfamiliar, follow the [Chitubox and Lychee scaling guide](/guides/chitubox-lychee-scaling-guide).

## Open it in Blender or MeshLab

Use a mesh editor when the file needs repair or conversion:

- **Split** an integral base from the figure so you can scale only the miniature.
- **Recalculate normals** if the surface renders inside-out or black.
- **Thicken resin supports** for FDM using the Resin2FDM workflow.
- **Repair non-manifold edges** before printing a model that has holes.

Blender is not a viewer replacement. It is slower to open and easier to accidentally modify, so I only use it when the slicer cannot do the job.

## ASCII vs binary STL

| Format | What it looks like | When you see it |
| --- | --- | --- |
| Binary STL | Compact file, often a few MB | Normal slicer and marketplace exports |
| ASCII STL | Readable text beginning with `solid` | Scripts, teaching examples and some CAD exports |

Both contain the same triangle geometry. If a program refuses an ASCII file, re-export it as binary; if it refuses binary, re-export as ASCII. The geometry has not changed.

## If the model opens at the wrong size

Work through these in order:

1. **Unit mismatch.** An inch-exported file interpreted as millimetres appears 25.4 times too small. Scale it by **2540%** with all axes locked.
2. **Scale already baked in.** The sculptor may have exported a 32mm sculpt at half size. Compare the measured height with the listing.
3. **Wrong measurement convention.** Eye level and top of head are not the same height. A “28mm” figure is about 30.5mm to the crown in my baseline.
4. **Base included in the bounding box.** A scenic base can add 5–10mm and make the model look larger than it is.
5. **Dynamic pose.** Weapons, horns and raised arms inflate the Z value. Measure to the eyes or crown, not the highest triangle.

The full diagnostic routine is in [why your STL looks tiny in the slicer](/guides/why-stl-looks-small-in-slicer). If you only know the height, the [Miniature Scale Identifier](/tools/miniature-scale-identifier) will name the likely scale.

## My pre-print checklist

- Does the model look complete in the browser viewport?
- Did I record the bounding box **before** scaling?
- Does the listed scale match the measurement convention I used?
- Are X, Y and Z locked for the percentage I entered?
- Did I re-measure after scaling?

If all five pass, the file is ready to slice. If not, fix the measurement first — no slicer setting will rescue an incorrectly scaled model.

## How I checked this

I use the same routine on every download: open locally in a browser viewer, read the bounding box in the slicer, compare it with the sculptor's stated scale, then print one test piece and measure it with a PARKSIDE digital caliper (0.01mm resolution). The [miniature size chart](/miniature-size-chart) holds the numbers I compare against.
