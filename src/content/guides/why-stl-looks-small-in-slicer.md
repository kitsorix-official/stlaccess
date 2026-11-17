---
title: "Why Your STL Looks Tiny in Chitubox, Lychee or Cura"
description: "STL files have no units. Here are the four reasons a model imports at the wrong size and the exact checks I use before scaling."
tldr: "An STL stores unitless coordinates, so your slicer assumes millimetres. If the file was exported in inches it appears 25.4× too small — scale it by 2540%. Otherwise check for scale already baked in, eye level vs top of head, and a base inflating the bounding box."
pubDate: 2026-11-17
modDate: 2026-11-17
faq:
  - question: Why does my STL import tiny into Lychee or Chitubox?
    answer: >-
      The usual cause is an inch export read as millimetres. One inch stored
      as one unit becomes 1mm in the slicer, so the model looks 25.4 times
      too small. Type 2540 into the uniform scale field and re-measure. If
      that overshoots, the file has a different scale baked in instead.
  - question: Does an STL file store millimetres?
    answer: >-
      No. An STL stores triangle coordinates with no unit label. The slicer
      interprets those numbers as millimetres by default. That is why two
      files with the same nominal scale can import at different sizes.
  - question: How do I check the real size of an STL before printing?
    answer: >-
      Import it, read the bounding box, and compare the height with the
      sculptor's stated convention. A 28mm humanoid should read about 28mm
      foot-to-eye and 30–32mm to the crown. If you only have the total height,
      the Miniature Scale Identifier will suggest the likely scale.
  - question: Why is my 32mm miniature only 30mm tall in the slicer?
    answer: >-
      32mm usually refers to eye level on a heroic-proportioned figure, not
      the top of the head or the highest point of a weapon. Measure to the
      eyes and ignore the base, horns and weapons. A top-of-head measurement
      for a 32mm sculpt is typically around 34.5mm in my baseline.
  - question: Should I scale by 2540% for every small import?
    answer: >-
      Only when the measured dimensions are about 1/25.4 of the advertised
      size. A model that is 2mm tall instead of 32mm needs 1600%, not 2540%.
      Always calculate (target ÷ measured) × 100 from the bounding box first.
  - question: Can a base make an STL look the wrong scale?
    answer: >-
      Yes. A scenic base adds 5–10mm to the Z height, so a 32mm figure on a
      thick base can measure 40mm and appear oversized. Split or hide the
      base in the slicer, then measure the figure itself.
tags: ["STL files", "troubleshooting", "slicers", "scale", "beginners"]
---

Your STL looks tiny because the file has no unit system. Chitubox, Lychee, Cura and PrusaSlicer all assume the triangle coordinates are millimetres. If the model was exported using inches, or scaled before export, the number in the dimension field is not the size the sculptor intended.

## The 60-second diagnosis

1. Write down the **advertised scale** from the listing.
2. Import the file and write down the **measured Z height** from the bounding box.
3. Decide what the height should be at that scale. A 28mm humanoid is about 30.5mm to the crown; a 32mm heroic figure is about 34.5mm.
4. Calculate `(target ÷ measured) × 100`.
5. Apply that percentage with **X, Y and Z locked**, then re-measure.

For a 1.26mm figure that should be 32mm tall, the calculation is `32 ÷ 1.26 × 100 = 2540%`. That is the classic inch-export signature.

## Cause 1 — inch coordinates read as millimetres

This is the most dramatic failure. A model exported in inches stores 1 inch as `1.0`. The slicer reads `1.0` as 1mm, so the model appears 25.4 times too small.

- **Symptom:** a human figure is 1–2mm tall.
- **Fix:** uniform scale to **2540%**.
- **Verify:** the new height should match the listing within a few percent.

I hit this with a vehicle STL and spent an hour assuming the slicer was broken. It was the export units.

## Cause 2 — scale baked into the file

Some sculptors export a “32mm” model at 16mm so it fits a preferred plate layout. The label describes the intended printed size, not the stored coordinates.

- **Symptom:** the model is roughly half, a third or a quarter of the expected height.
- **Fix:** calculate the percentage from the measured height. Do not assume 2540%.
- **Verify:** compare against the [miniature size chart](/miniature-size-chart).

## Cause 3 — eye level vs top of head

Gaming scales measure to the **eyes** on a 175cm human with eyes at 160cm. Ratio scales measure to the **top of the head** at 175cm. Mixing them shifts numbers by around 5–10%.

- A “28mm” figure measures about 28mm to the eyes and 30.5mm to the crown.
- A “32mm” heroic figure measures about 32mm to the eyes and 34.5mm to the crown.
- A 1:56 ratio figure measures about 31.3mm to the crown.

If your model is within that range, it may already be correct. Measure to the eyes before changing anything. The rules are explained in [how to measure miniature scale](/guides/how-to-measure-miniature-scale) and on the [methodology page](/methodology).

## Cause 4 — the base or pose is inflating the height

The slicer's bounding box measures the highest triangle, not the figure's eye line. Scenic bases, raised swords, horns, banners and flying poses can all add millimetres.

- Hide or separate the base, then measure the body.
- In a dynamic pose, measure from the foot contact point to the eye position.
- If the model includes supports, hide them before reading the size.

## When the unit really is inches

Use this quick reference:

| Measured height | Expected height | Percentage |
| --- | ---: | ---: |
| 1.10mm | 28mm | 2545% |
| 1.26mm | 32mm | 2540% |
| 1.38mm | 35mm | 2536% |
| 1.57mm | 40mm | 2548% |

Small differences come from rounding in the slicer's readout. Apply the percentage, then measure again rather than trusting the table blindly.

## My repeatable check

I print a [scale reference bar](/tools/reference-bar-generator) and import it beside the unknown model. The bar's end tab is exactly one figure height at the chosen scale, and the 5mm ticks make the mismatch obvious on screen. Once I know the height, I use the [Slicer Percentage Calculator](/tools/slicer-percentage-calculator) or the [Miniature Scale Identifier](/tools/miniature-scale-identifier), then print one test miniature and measure it with calipers.

## Related reading

- [How to open an STL file](/guides/how-to-open-an-stl-file)
- [Chitubox and Lychee scaling guide](/guides/chitubox-lychee-scaling-guide)
- [STL file fundamentals](/learn/stl-files)
- [Scale & conversion math](/learn/scale)
