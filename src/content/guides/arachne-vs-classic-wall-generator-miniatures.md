---
title: "Arachne vs Classic Wall Generator: Which Is Sharper for Miniatures?"
description: "Arachne is supposed to make tighter details than the classic wall generator, but on test miniatures classic often prints fine detail sharper. A practical comparison for 28-32mm FDM prints."
tldr: "Arachne varies wall thickness to keep thin features crisp, so on paper it should win every time. But in repeated test prints of the same miniature, the classic wall generator kept the fine detail (like individual beard strands) sharper. Test both on your own machine and choose for the detail you care about."
pubDate: "2026-08-30"
faq:
  - question: Which wall generator is better for miniatures, Arachne or Classic?
    answer: >-
      It depends on your machine and model, and you should test both. Arachne
      is designed to vary wall thickness so it should be sharper, but in my
      test prints the classic generator held fine detail like beards and
      trim better. Run the same miniature through both and pick the sharper
      one — it won't always be Arachne.
  - question: What is the Arachne wall generator in Cura?
    answer: >-
      Arachne (also in Bambu Studio) is a smarter wall generator that varies
      the thickness of walls to follow the model's shape, so thin features like
      a sword blade or an individual strand of hair get their own wall instead
      of being merged into a neighbor. It's also faster to slice than the
      older classic generator.
  - question: Why did classic produce better detail than Arachne in my test?
    answer: >-
      Arachne optimises for wall thickness, which is great for strength and
      speed but doesn't always preserve the finest line detail on a model. In
      repeated tests on the same miniature the classic generator kept thin,
      closely spaced features like individual hair strands distinct, while
      Arachne blended them. That's the opposite of what the marketing says,
      which is exactly why you should test.
  - question: Does the wall generator change how prints look after primer?
    answer: >-
      The gap shrinks a lot once you prime and paint, but it doesn't vanish
      completely. Fine details that come off the plate fuzzy are still fuzzy
      after a coat of filler primer. If sharp lines matter to you, choosing
      the right generator at the start saves you sanding later.
tags: ["Arachne", "wall generator", "slicer settings", "FDM printing", "miniature printing"]
---

You'd expect the newer, smarter wall generator to win every time. Arachne varies the width of each wall to match the model, so a thin sword blade or a strand of hair gets its own wall instead of being absorbed into a neighbor. It even slices faster. The conclusion writes itself, right?

Wrong. When I ran the same miniature through both generators, the classic one kept the fine detail sharper. That's not how it's supposed to work, and it took a proper side-by-side to convince me.

## What Each Generator Does

**Arachne** (available in Cura and Bambu Studio) is the newer approach. It looks at the model's shape and adjusts the wall thickness on the fly, so narrow features get a dedicated wall rather than being rounded into whatever's next to them. It's also noticeably faster to slice. On paper, that makes it strictly better for detail.

**Classic** is the old way. It lays down a fixed number of constant-width walls. Thin features that fall between walls just get merged into their neighbor or dropped. Everything I read said that should make it worse — yet the test prints disagreed.

## The Test: Same Model, Both Generators

I sliced an identical miniature with each generator, same filament, same machine, same every other setting, and printed them back to back. I was specifically looking at the beard, which has fine, closely packed strands that should be the perfect stress test for Arachne.

With the **classic** generator, each strand of the beard was clearly visible when printed — sharp and distinct.

With **Arachne**, those same strands lost their definition. They blended together into a mushier surface. It produced tighter-looking details on the flat parts, but the fine line detail that makes a face read as high quality was worse.

That's the reverse of what you'd predict, and I'd love to know exactly why — it goes against the logic of the tool. But the outcome was consistent across every test miniature I ran. So I went with the classic generator for fine detail.

## What Actually Matters for Miniatures

The takeaway isn't "classic is always better." It's that the default "newer equals better" assumption doesn't hold for fine miniature detail, and the only way to know is to test on your own machine.

A few things that matter more than the generator choice:

- **Layer height.** This swamps the wall generator difference. At 0.06mm on a 0.2mm nozzle, even a mediocre generator produces a clean miniature. At 0.2mm layers, no generator saves you.
- **Nozzle size.** A 0.2mm nozzle resolves fine detail far better than a 0.4mm one, regardless of generator.
- **Cooling.** Maximum fan on small layers keeps overhangs sharp, which is half the battle on minis.
- **Orientation.** Face the detail you care about up and away from supports, so the generator has clean geometry to work with.

## How to Test For Yourself

1. Pick one detailed miniature, ideally one with fine, closely spaced features (a beard, fur, or trim works well).
2. Slice it once with Arachne and once with classic, keeping everything else identical.
3. Print both back to back.
4. Compare the fine detail under good light — not at arm's length, but close enough to judge the strand definition.

Do this before you trust either generator for your whole army. My result was classic wins for fine detail; yours might genuinely be Arachne if your printer and filament behave differently.

## Summary

- Arachne varies wall width for sharp, fast slicing — the theory says it should win.
- In test prints, classic kept fine line detail like beard strands sharper.
- Layer height, nozzle size, and orientation outweigh the generator choice.
- Run your own side-by-side; the winner may surprise you.

I still use Arachne for terrain and big flat pieces where its speed shines. For miniatures where fine detail is the whole point, I've gone back to classic until I dig into why it keeps winning. Either way, don't take the slicer's default on faith — the sharpest tool for your specific mini is the one you prove works on your own printer.
