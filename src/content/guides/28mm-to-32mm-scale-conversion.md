---
title: "How to Scale 28mm to 32mm (114.3% Slicer Percentage, Explained)"
description: "What percent for 28mm to 32mm? 114.3% with XYZ locked. The math behind the conversion, the exact slicer steps for Chitubox, Lychee, Cura, and PrusaSlicer, and how to verify it on a test print."
tldr: "Type 114.3% into your slicer with X, Y, and Z locked. That's 32mm ÷ 28mm × 100, measured to eye level on a 175cm baseline. Measured to the top of the head the number is 116.1%. Print one test piece and check it with calipers (a PARKSIDE with 0.01mm resolution costs under 15 euro) before you commit to a full squad."
pubDate: 2026-08-15
modDate: 2026-08-15
faq:
  - question: What percentage do I scale 28mm to 32mm?
    answer: >-
      114.3% measured to eye level. This is the most common tabletop
      conversion there is — the jump from true 28mm scale (D&D, Bolt
      Action, classic Warhammer Fantasy) to the 32mm heroic scale used by
      modern Warhammer 40,000 and Age of Sigmar.
  - question: How do I scale a 28mm STL up to 32mm?
    answer: >-
      Import the STL, select the model, lock the X/Y/Z axes (chain link in
      Chitubox, uniform scaling toggle in Lychee, padlock in Cura and
      PrusaSlicer), then type 114.3 into the scale field and apply. The
      model grows by 14.3% in every direction.
  - question: Why is 28mm to 32mm a 14.3% increase?
    answer: >-
      Because both scales measure a 175cm human to the eyes (160cm), and
      the percentage is simply target ÷ source × 100. 32 ÷ 28 = 1.143, so
      you scale by 114.3%. No other magic in the number.
  - question: Is 28mm to 32mm measured to the top of the head?
    answer: >-
      No. Measured to the top of the head the percentage is 116.1%,
      because the skull adds a fixed height to both figures. Gaming scales
      are conventionally measured to eye level, which is why 114.3% is the
      default.
tags: ["scale conversion", "28mm", "32mm", "slicer settings", "percentage"]
---

Of all the conversions I get asked about, this is the one. Someone prints a D&D party, realises it looks tiny next to a Warhammer army, and starts searching "28mm to 32mm scale up" — and the answer is the same every time: **114.3%, typed into your slicer with the axes locked.**

This guide walks through the math so the number sticks, shows the exact clicks in the four slicers I use, and gives you a calculator you can play with right here. If you need the reverse (shrinking a 32mm mini down to 28mm), I've got a dedicated [32mm to 28mm guide](/guides/32mm-to-28mm-scale-conversion) for that too.

## What Percentage Do I Scale 28mm to 32mm?

### The number: 114.3%

Type **114.3%** into your slicer's scale field — with X, Y, and Z locked — and a true 28mm miniature becomes a true 32mm miniature. That's the whole answer. It's also the most searched scale conversion in the tabletop space, and for good reason: it's the jump between the two biggest scales in the hobby.

On the [175cm human baseline](/guides/175cm-baseline) I use for every conversion on this site, a 28mm figure measures 28mm from the bottom of the feet to eye level, and a 32mm figure measures 32mm to the eyes. The percentage is just target divided by source: **32 ÷ 28 = 1.143, which is 114.3%**. The same formula drives the [slicer percentage calculator](/tools/slicer-percentage-calculator) and every row on the [scale conversion chart](/reference).

If you want to play with the numbers yourself, here's the exact calculator I use before every batch — enter your own source and target heights in millimetres and it gives you the slicer percentage instantly.

<div class="my-8 rounded-2xl border border-[#ff6b35]/30 bg-slate-900/40 p-6 md:p-8" aria-labelledby="scale-calc-heading">
  <div class="flex items-center gap-2 mb-4">
    <i class="fa-solid fa-calculator text-[#ff6b35] text-lg" aria-hidden="true"></i>
    <h3 id="scale-calc-heading" class="text-sm font-black uppercase tracking-widest text-white">Scale calculator</h3>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
    <label class="block">
      <span class="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">Source height (mm)</span>
      <input type="number" id="calcSource" value="28" min="1" step="0.1" class="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white focus:border-[#ff6b35] focus:ring-1 focus:ring-[#ff6b35] focus:outline-none transition-all" />
    </label>
    <label class="block">
      <span class="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">Target height (mm)</span>
      <input type="number" id="calcTarget" value="32" min="1" step="0.1" class="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white focus:border-[#ff6b35] focus:ring-1 focus:ring-[#ff6b35] focus:outline-none transition-all" />
    </label>
    <div class="flex flex-col justify-end">
      <span class="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">Slicer percentage</span>
      <output id="calcResult" class="text-3xl font-black font-heading text-[#ff6b35]">114.3%</output>
    </div>
  </div>
  <p class="text-xs text-slate-500">Same math as the <a href="/tools/slicer-percentage-calculator" class="text-[#ff6b35] hover:text-white transition-colors font-semibold">slicer percentage calculator</a>: target ÷ source × 100.</p>
</div>
<script is:inline>
  function updateScaleCalc() {
    var src = parseFloat(document.getElementById('calcSource').value);
    var tgt = parseFloat(document.getElementById('calcTarget').value);
    var out = document.getElementById('calcResult');
    if (!isFinite(src) || !isFinite(tgt) || src <= 0 || tgt <= 0) { out.textContent = '—'; return; }
    out.textContent = (tgt / src * 100).toFixed(1) + '%';
  }
  document.getElementById('calcSource').addEventListener('input', updateScaleCalc);
  document.getElementById('calcTarget').addEventListener('input', updateScaleCalc);
</script>

### Why 114.3% and not something round?

Honestly, the even numbers would be easier to remember, but scale math doesn't work that way. 28mm and 32mm are both measurements of the *same* 175cm human at different magnifications, so the ratio between them is fixed: 32/28. You can't round 114.3% to 115% without shifting every figure off the eye line by a fraction of a millimetre. It won't ruin a print, but if you're batch-scaling an army, 114.3% keeps everyone exactly in proportion.

The one thing that *does* change the number is how you measure. A 28mm gaming figure measured to the top of the head is about **30.5mm**, and a 32mm heroic figure is about **34.5mm** — so measured top-of-head, the conversion is **116.1%** instead. Every scale on the [miniature scale conversion chart](/reference) shows both numbers, because sculptors disagree about which one matters. Gaming convention says the eyes, so I use 114.3% as my default and I suggest you do the same.

## How Do I Scale a 28mm Mini to 32mm in My Slicer?

### The five-step routine I use every time

1. **Import the STL** and let the slicer finish its auto-arrangement.
2. **Select the model** and open the scale/transform tool.
3. **Lock the axes** — the chain link in Chitubox, the uniform scaling toggle in Lychee, the padlock in Cura and PrusaSlicer.
4. **Type 114.3** into any of the three scale fields (they all share one value once locked).
5. **Apply**, then sanity-check the model height against the base so you haven't scaled the base into a UFO.

The one mistake I see constantly in the community is scaling without locking the axes. If you type 114.3 only into the X field, your 14.3% taller miniature is also 14.3% *wider* — and, because the Z field was left at 100, the whole model flattens. Locked axes means everything grows together and the proportions stay exactly as the sculptor intended.

### Where the scale field lives in Chitubox, Lychee, Cura, and PrusaSlicer

Chitubox and Lychee I covered in depth in my [Chitubox & Lychee scaling guide](/guides/chitubox-lychee-scaling-guide), but the short version: Chitubox is `T` → Transform → Scale, and Lychee is Transform → Uniform Scaling. Both show the current X/Y/Z dimensions in millimetres, so you can verify the height before and after.

Cura and PrusaSlicer work the same way under different names. In Cura, select the model and the Scale tool (or press `S`), then make sure the padlock between the X/Y/Z boxes is closed before entering 114.3. In PrusaSlicer, it's the Scale button in the left toolbar — the three fields are locked by default, so you only type the number once. In every case the Z-axis readout after applying should show roughly 32mm for a 28mm-sourced figure, plus whatever the base contributes.

## Is 28mm to 32mm Really a 14.3% Difference?

### Eye-level vs top-of-head measurement

I find this trips up more people than anything else. When you hold a 28mm and a 32mm miniature side by side, the 32mm figure doesn't look 14.3% bigger — it looks almost a third bigger. That's partly the heroic proportions (bigger heads, hands, and weapons) and partly because the difference compounds in three dimensions: 114.3% in every axis is **1.143³ ≈ 1.49**, so the 32mm figure has nearly *50% more volume* than the 28mm figure. Same for the reverse — [drop a model to 87.5%](/guides/32mm-to-28mm-scale-conversion) and it loses about a third of its volume.

That volume jump is exactly why Games Workshop moved from 28mm to 32mm between 2014 and 2015: the extra material gives a painter more surface for detail and makes a model read better at arm's length. If you're scaling a D&D STL up to stand next to a Primaris army, 114.3% is right — the slight sculpting differences fade once the model has the same bulk as its neighbours.

### Why a 32mm hero looks so much bigger than the math suggests

The other half of the illusion is proportion. Most 32mm-scale sculpts are *heroic* — the head is about 1:6 of the total height instead of the realistic 1:7.5, and hands and weapons are oversized too. So when you compare a true-scale 28mm sculpt against a heroic 32mm sculpt, you're seeing two differences at once: the scale jump *and* the proportion style. That's worth knowing before you print a whole proxy squad: the percentage gets the height right, but the *feel* of the model still depends on the sculptor's style. My [miniature scale identifier](/tools/miniature-scale-identifier) can tell you whether an unlabelled STL is true-scale or heroic so you're not scaling from the wrong starting point.

## What Does 28mm and 32mm Mean in Real Terms?

### The 175cm human baseline

Both numbers come from measuring the same average human — 175cm tall, eyes at 160cm — and then scaling that figure so either the eye line or the top of the head lands on the stated millimetre count. 28mm to the eyes at 1:56, 32mm to the eyes at 1:50. The shorthand is "the eyes", but what it really means is "this miniature is the same height, at the table, as a real person standing next to the model kit at the stated scale." I've written the whole methodology out in the [175cm baseline guide](/guides/175cm-baseline), including why eye-level and top-of-head scales can't be mixed without a conversion step.

### D&D vs Warhammer: which scale do you actually play?

This is the fork in the road. True 28mm is the language of D&D, Bolt Action, and most historical games. 32mm heroic is the language of modern Warhammer 40,000, Age of Sigmar, and most current skirmish games. Play one system and you never need this conversion. Play both — or print STLs from one ecosystem for use in the other, which is what nearly everyone I know does — and 114.3% becomes your best friend.

If you're mostly a D&D player, my [D&D miniature scale guide](/guides/dnd-miniature-scale-guide) has the full size-category chart. If you're on the Warhammer side and want to know exactly where your army sits, the [Warhammer 40k scale page](/games/warhammer-40000) breaks down the Firstborn/Primaris difference — which, conveniently, is the same 28mm-to-32mm jump this guide covers.

## Where Does the 28mm to 32mm Conversion Break Down?

### Sculptor scale creep and the caliper test

Every conversion on this site assumes the *source* model is honestly 28mm. In practice, "28mm" can mean anything from 25mm true-scale to 32mm labelled as 28mm — I've held both. So my rule is: measure before you trust. Select the model in your slicer and read the Z-height, then compare it to the eye-level number in the chart. If a claimed 28mm figure already reads 32mm to the eyes, the sculptor was working in 32mm the whole time and scaling it by 114.3% would be wrong.

The second honest limit is the print itself. Scaling a 28mm STL up by 14.3% hides print artefacts — bigger layer lines look smoother relative to the model, and fine detail gets more forgiving. That's one more reason this conversion is so popular. If you're scaling the *other* way and shrinking a 32mm hero down, detail gets denser and support points get pickier; I cover that properly in the [downscale guide](/guides/32mm-to-28mm-scale-conversion) with the settings I use to keep faces clean at 87.5%.

That's the whole conversion. 114.3%, axes locked, one test print, and you're done. If you want the master list of every scale jump in the hobby — 15mm to 28mm, 1:72 to 32mm, 1:35 to 28mm and the rest — the full [miniature scale conversion chart](/reference) has them all in one table, calculated on the same 175cm baseline.
