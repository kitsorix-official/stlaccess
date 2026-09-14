---
title: "How to Sand, Paint, and Post-Process FDM 3D Prints Like a Pro"
description: "Turn rough, ridged FDM prints into smooth, professional parts — surgical support removal, the 120-to-400 grit progression, filler priming and the spray-sand-repeat cycle, then painting and locking in your FDM miniatures."
tldr: "Snip supports off in small chunks, don't peel. Sand 120 then 220 then 400 grit (wet-sand once past 400 to avoid heat gumming). Fill layer valleys with high-build filler primer, spray-sand-repeat. Never skip primer before painting — mist black or grey. Dry-brush and wash FDM minis, finish with a clear protective coat."
pubDate: "2026-09-14"
faq:
  - question: Can you sand and paint FDM 3D prints?
    answer: >-
      Yes, absolutely. Work through 120-grit to knock down seams and support
      scars, then 220-grit and 400-grit to remove micro-scratches. Always lay
      down a primer base coat before painting — raw printed plastic is slick
      and hydrophobic, so acrylics bead up or peel off under masking tape
      without one.
  - question: How do I get rid of layer lines on FDM prints?
    answer: >-
      Sanding alone only shaves the peaks; it doesn't fill the trenches between
      layers. Bridge the valleys with a high-build automotive filler primer,
      then repeat the spray-sand cycle until the surface is a uniform chalky
      grey. For deep gaps use UV-curing resin or quick-drying hobby putty.
  - question: Can I smooth PLA prints with acetone?
    answer: >-
      No. Acetone vapor smoothing works wonders for ABS but turns PLA into a
      sticky, ruined blob. Stick to mechanical sanding, filler primer, and wet
      sanding for PLA — don't risk melting your print with hardware store
      solvents.
tags: ["FDM printing", "post-processing", "sanding", "painting miniatures"]
---

I still remember pulling my very first miniature off the build plate of my old Ender 3. I was riding high, entirely convinced I had just birthed a masterpiece. Then I walked over to the window, the harsh afternoon sunlight hit the side of the model, and my heart sank. It didn't look like a heroic tabletop warrior; it looked like a tiny, plastic topographical map of the Swiss Alps. Every single layer line was screaming for attention.

If you've ever wondered—*can you sand FDM prints?* or *can you paint FDM prints?*—you're likely staring at your own ridged plastic mountain right now. The short answer is yes, absolutely. But if you try to slap acrylic paint straight onto raw, textured plastic without a plan, you're going to end up with a sticky, gummy mess that hides all your hard work.

Over the years, through an embarrassing amount of trial, error, and ruined prints, I've figured out how to turn ugly, ridged plastic into smooth, professional-grade models, props, and miniatures. Let's dive into how I do it.

## Preparing Your Print: Removing Supports & Pre-Sanding

My worst mistake? Early on, I used to yank supports off my prints with my bare hands like I was opening a stubborn bag of potato chips. I ended up tearing chunks out of cloaks, snapping off swords, and gouging permanent craters into the main walls of the print.

Now, I treat support removal as a surgical operation:

* **The Right Tooling:** I keep a pair of sharp flush cutters, a curved hobby knife, and a deburring tool right at my desk.
* **Patience Over Power:** Snip away supports in small chunks rather than trying to peel them off in one satisfying sweep. Let the plastic break away naturally along the Z-axis.

Once the supports are gone, it's time for the first round of physical flattening. This is where your grit progression matters. I don't publish percentages or techniques I haven't personally ruined a batch of prints trying out first, and I learned the hard way that jumping straight to fine sandpaper is a waste of time.

Start aggressive. I kick things off with a **120-grit** sandpaper to knock down major seam lines and stubborn support scars. From there, I step up to **220-grit** and **400-grit** to smooth out the micro-scratches.

* **Dry vs. Wet Sanding:** If you're working with PLA, dry sanding creates a ton of friction heat that can actually melt or gum up your plastic if you press too hard. I prefer wet sanding with a little bowl of water and a drop of dish soap once I hit the 400-grit stage. It keeps the dust down, prevents the paper from clogging, and gives you a buttery-smooth tactile feedback.

## Smoothing & Layer Line Removal (Filling the Gaps)

Even after rigorous sanding, FDM layer stepping stubbornly remains in the micro-valleys. Sanding alone just shaves down the peaks; it doesn't fill the trenches.

To bridge those gaps, you need a filler.

* **High-Build Primers:** My absolute go-to weapon is an automotive filler primer (like Rust-Oleum Filler Primer). It's thick, it goes on heavy, and it's specifically designed to bite into imperfections.
* **The Spray, Sand, Repeat Cycle:** Spray a light, even coat across your print, let it cure fully, and then sand it back down. The primer will fill the tiny layer valleys while sanding completely exposes the plastic peaks. You'll know you're making progress when the surface turns into a uniform, chalky grey field.
* **Putties for Deep Flaws:** For massive gaps, layer separation, or deep seam lines from multi-part STL files, I use a dab of UV-curing resin or quick-drying acrylic hobby putty. Hit it with a UV flashlight, sand it flat in thirty seconds, and move on.

*(Quick note on chemical smoothing: While acetone vapor smoothing works wonders for ABS, it doesn't do much for PLA except turn it into a sticky, ruined blob. If you're printing exclusively in PLA, stick to mechanical sanding and priming—don't risk melting your print with hardware store solvents.)*

## Painting FDM Prints

Can you paint FDM prints straight off the build plate? Technically, yes. Practically, it looks awful. Raw 3D printing plastic is notoriously hydrophobic and slick; standard acrylics will bead up or peel right off under masking tape.

* **Never Skip the Primer Base:** Once your surface is sanded smooth and wiped free of dust, lay down a dedicated primer base coat. I usually choose my primer color strategically: matte black if I'm painting a dark fantasy miniature and want built-in shadows in the recesses, or light grey if I'm working on a vibrant prop that needs bright topcoats.
* **Laying Down the Color:** Whether you're using a standard airbrush or rattle cans, keep your passes thin and consistent. Drowning your model in thick paint kills the scale factor and ruins all the clean geometry your slicer worked so hard to generate.
* **Techniques for FDM Miniatures:** Painting miniatures printed on an FDM machine requires a different mindset than resin prints. You aren't going to get microscopic details. Instead, lean into **dry brushing** and **acrylic washes**. A heavy dry brush over a dark undercoat will catch the raised edges of your layers and actually make the model pop, turning a limitation of the medium into a stylistic choice.
* **Locking It In:** Always finish with a clear protective coat (matte, satin, or gloss depending on the material). It seals the acrylics and protects your finished piece from chipping when handling.

## Specialty Finishing Tricks: Clear FDM Filaments

One of the trickiest projects I ever tackled was printing functional transparent windows and glowing sci-fi energy cores using clear PETG and clear PLA. The core problem? Light refraction gets completely scrambled by internal infill lines and external layer ridges.

If you want to achieve genuine optical transparency with clear FDM filaments, standard settings won't cut it:

* **The Slicing Strategy:** Turn your infill up to 100%, or alternatively, drop your infill to 0% with 4 to 6 solid perimeters so light passes through a hollow, clean tube rather than a mesh web.
* **The Ultra-Sanding Routine:** You have to take your sanding progression all the way up to ultra-fine grits (**2000-grit and above**), followed by a plastic polishing compound.
* **The Clear Coat Secret:** Even after wet sanding, clear filament will look slightly frosted or hazy. The ultimate trick to bring back crystal-clear transparency is giving the print a light misting of clear gloss spray or brushing on a thin, self-leveling layer of clear UV resin. It fills in the microscopic micro-scratches instantly, turning frosted plastic transparent like glass.

## Conclusion & Recommended Starter Kit

Post-processing FDM prints isn't about rushing to the finish line; it's a zen, low-pressure part of the hobby where a messy plastic blob finally transforms into something you're genuinely proud to put on a shelf.

If you're building your own workspace workbench, skip the expensive specialized kits and grab this simple, reliable starter loadout:

* **Flush cutters and a sharp hobby knife** for clean support removal.
* **A sandpaper variety pack** covering 120, 220, 400, and 800 grits.
* **A can of automotive high-build filler primer**.
* **Basic acrylic hobby paints** and a few flat synthetic brushes.
* **Safety gear** (a basic dust mask and safety glasses—trust me, you do not want to inhale microscopic plastic dust while sanding).

Take your time, embrace the learning curve, and happy printing!