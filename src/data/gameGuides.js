// Game-specific guide content merged into the consolidated /games page.
// Each entry is keyed by the game slug from gameSystems.json and rendered as
// a "Deep Dive" block inside that game's section. HTML strings keep tables,
// lists, and inline emphasis intact.

export const gameGuides = {
  "warhammer-40000": {
    title: "Primaris vs Firstborn",
    intro: "Warhammer 40k has one of the most confusing scale landscapes in tabletop gaming. Between Primaris, Firstborn, older sculpts, and third-party proxies, knowing what percentage to type into your slicer is not always obvious.",
    blocks: [
      {
        heading: "The Two Scales of Warhammer 40k",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">Games Workshop uses two distinct scales depending on the model range:</p>
          <ul class="space-y-2 text-sm text-slate-300">
            <li><strong class="text-white">Primaris / newer sculpts (2017+):</strong> 32mm heroic scale, measured to the eyes (160cm on a 175cm baseline)</li>
            <li><strong class="text-white">Firstborn / older sculpts (pre-2017):</strong> 28mm true scale, also measured to the eyes</li>
          </ul>
          <p class="text-sm text-slate-400 leading-relaxed mt-4">A Primaris Marine is roughly 14% taller than a Firstborn Marine. This is not scale creep — it is intentional. The Primaris range was designed with truer human proportions, which means longer legs and a taller frame.</p>
        `
      },
      {
        heading: "Conversion Cheat Sheet",
        html: `
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-white/5">
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Conversion</th>
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Formula</th>
                  <th scope="col" class="text-right py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Slicer %</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-white/5"><td class="py-2 px-3 text-slate-300">Firstborn (28mm) → Primaris (32mm)</td><td class="py-2 px-3 font-mono text-slate-500">32 ÷ 28</td><td class="py-2 px-3 text-right font-mono font-bold text-white">114.3%</td></tr>
                <tr class="border-b border-white/5"><td class="py-2 px-3 text-slate-300">Primaris (32mm) → Firstborn (28mm)</td><td class="py-2 px-3 font-mono text-slate-500">28 ÷ 32</td><td class="py-2 px-3 text-right font-mono font-bold text-white">87.5%</td></tr>
                <tr class="border-b border-white/5"><td class="py-2 px-3 text-slate-300">28mm → 40mm (terminator / gravis)</td><td class="py-2 px-3 font-mono text-slate-500">40 ÷ 28</td><td class="py-2 px-3 text-right font-mono font-bold text-white">142.9%</td></tr>
                <tr class="border-b border-white/5"><td class="py-2 px-3 text-slate-300">32mm → 40mm</td><td class="py-2 px-3 font-mono text-slate-500">40 ÷ 32</td><td class="py-2 px-3 text-right font-mono font-bold text-white">125.0%</td></tr>
                <tr><td class="py-2 px-3 text-slate-300">28mm → 75mm (display scale)</td><td class="py-2 px-3 font-mono text-slate-500">75 ÷ 28</td><td class="py-2 px-3 text-right font-mono font-bold text-white">267.9%</td></tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        heading: "How to Scale a Primaris Proxy on FDM",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">Most Warhammer 40k STL files you find online are designed for 32mm heroic scale. Here is how to handle them on an FDM printer:</p>
          <ol class="list-decimal list-inside space-y-2 text-sm text-slate-300">
            <li><strong class="text-white">Check the sculptor's baseline.</strong> If the description says "32mm scale" or "heroic 32mm," you can print it as-is for a Primaris army.</li>
            <li><strong class="text-white">Measure eye level in your slicer.</strong> Import the STL, use the measurement tool, and check the distance from the bottom of the foot to the eyes. If it is not 32mm (or close), scale it.</li>
            <li><strong class="text-white">Set your layer height to 0.08mm.</strong> This is the sweet spot for 32mm heroic miniatures on FDM. Detail is good enough for tabletop distance, and print time stays reasonable.</li>
            <li><strong class="text-white">Use a 0.2mm nozzle for faces.</strong> If you have one, swap to a 0.2mm nozzle for character models. The difference in facial detail is significant.</li>
          </ol>
        `
      },
      {
        heading: "What About Vehicles?",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">Warhammer 40k vehicles use a different scaling convention. A Rhino chassis is designed to look correct next to 32mm Primaris models. If you are printing a vehicle STL labelled "for 28mm," scale it up to 114.3% to match your Primaris force.</p>
          <p class="text-sm text-slate-400 leading-relaxed">For larger vehicles like Baneblades or Titans, scale by comparison to a known reference model rather than using a formula. Vehicle proportions vary too much between sculptors for a universal percentage.</p>
        `
      }
    ]
  },
  "bolt-action": {
    title: "The 1:56 vehicle scale, explained",
    intro: "Bolt Action infantry are 28mm true scale, but the vehicles are a separate 1:56 ratio. Here is how the two pair up and what it means for your slicer.",
    blocks: [
      {
        heading: "What Scale Is Bolt Action?",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">Bolt Action infantry are <strong class="text-white">28mm true scale</strong>, measured to the eyes (160cm on a 175cm human baseline). This is the same convention used by older Warhammer 40k Firstborn models, D&D miniatures, and most historical wargaming ranges.</p>
          <p class="text-sm text-slate-400 leading-relaxed">The vehicle scale for Bolt Action is <strong class="text-white">1:56</strong>. This ratio means that 1 millimetre on the model equals 56 millimetres in real life. A 3-metre-tall Sherman tank should measure approximately 53.5mm on the tabletop.</p>
        `
      },
      {
        heading: "Why 1:56 Works with 28mm Infantry",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed">The 1:56 vehicle scale is paired with 28mm infantry because both use the same reference point. A 175cm human in 1:56 scale is approximately 31.25mm tall to the top of the head, which puts the eye level at about 28mm. The math lines up.</p>
        `
      },
      {
        heading: "FDM Settings for Bolt Action Miniatures",
        html: `
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-white/5">
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Component</th>
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Nozzle</th>
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Layer Height</th>
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-white/5"><td class="py-2 px-3 text-slate-300">Infantry (rank and file)</td><td class="py-2 px-3 font-mono text-slate-500">0.4mm</td><td class="py-2 px-3 font-mono text-slate-500">0.1mm</td><td class="py-2 px-3 text-slate-400">Good enough for tabletop. Bayonets may soften.</td></tr>
                <tr class="border-b border-white/5"><td class="py-2 px-3 text-slate-300">Infantry (characters/officers)</td><td class="py-2 px-3 font-mono text-slate-500">0.2mm</td><td class="py-2 px-3 font-mono text-slate-500">0.06mm</td><td class="py-2 px-3 text-slate-400">Better facial detail, cleaner rifle barrels</td></tr>
                <tr class="border-b border-white/5"><td class="py-2 px-3 text-slate-300">Vehicles (tanks/trucks)</td><td class="py-2 px-3 font-mono text-slate-500">0.4mm</td><td class="py-2 px-3 font-mono text-slate-500">0.2mm</td><td class="py-2 px-3 text-slate-400">Print fast, detail holds well at this scale</td></tr>
                <tr><td class="py-2 px-3 text-slate-300">Terrain (buildings/walls)</td><td class="py-2 px-3 font-mono text-slate-500">0.4mm</td><td class="py-2 px-3 font-mono text-slate-500">0.2mm</td><td class="py-2 px-3 text-slate-400">Use grid infill for strength</td></tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        heading: "Converting Non-28mm STLs for Bolt Action",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">Most vehicle STL files are designed for 1:35 scale (traditional model kits). Here is how to convert them:</p>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-white/5">
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Source Scale</th>
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Target Scale</th>
                  <th scope="col" class="text-right py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Slicer %</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-white/5"><td class="py-2 px-3 text-slate-300">1:35 vehicle</td><td class="py-2 px-3 text-slate-300">1:56 vehicle</td><td class="py-2 px-3 text-right font-mono font-bold text-white">62.5%</td></tr>
                <tr class="border-b border-white/5"><td class="py-2 px-3 text-slate-300">1:48 vehicle</td><td class="py-2 px-3 text-slate-300">1:56 vehicle</td><td class="py-2 px-3 text-right font-mono font-bold text-white">85.7%</td></tr>
                <tr class="border-b border-white/5"><td class="py-2 px-3 text-slate-300">1:72 vehicle</td><td class="py-2 px-3 text-slate-300">1:56 vehicle</td><td class="py-2 px-3 text-right font-mono font-bold text-white">128.6%</td></tr>
                <tr class="border-b border-white/5"><td class="py-2 px-3 text-slate-300">32mm infantry</td><td class="py-2 px-3 text-slate-300">28mm infantry</td><td class="py-2 px-3 text-right font-mono font-bold text-white">87.5%</td></tr>
                <tr><td class="py-2 px-3 text-slate-300">35mm infantry</td><td class="py-2 px-3 text-slate-300">28mm infantry</td><td class="py-2 px-3 text-right font-mono font-bold text-white">80.0%</td></tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        heading: "Common Bolt Action Printing Mistakes",
        html: `
          <ul class="space-y-3 text-sm text-slate-300">
            <li><strong class="text-white">Printing vehicles at 100% when they are designed for 1:35.</strong> A 1:35 tank printed at full size will be nearly twice as long as it should be next to your 28mm infantry. Always check the STL description for the intended scale.</li>
            <li><strong class="text-white">Scaling infantry by total height instead of eye level.</strong> A model with a raised arm or tall helmet will have a misleading bounding box. Measure from the foot contact point to the eyes, use that as your reference dimension.</li>
            <li><strong class="text-white">Using 100% infill on vehicles.</strong> Most Bolt Action vehicles are hollow in the real kit. For 3D prints, use 15-20% grid infill. It saves filament and the model will still be durable enough for regular handling.</li>
          </ul>
        `
      }
    ]
  },
  "dungeons-and-dragons": {
    title: "D&D creature sizes, from Tiny to Gargantuan",
    intro: "D&D miniatures are 28mm true scale for a Medium creature — but you need everything from a 25mm goblin to a 150mm dragon to look correct next to each other on the same table.",
    blocks: [
      {
        heading: "Standard D&D Creature Sizes",
        html: `
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-white/5">
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Size Category</th>
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Examples</th>
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Typical Height</th>
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Base Size</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-white/5"><td class="py-2 px-3 font-semibold text-white">Tiny</td><td class="py-2 px-3 text-slate-300">Imp, sprite, rat</td><td class="py-2 px-3 text-slate-300">10-15mm</td><td class="py-2 px-3 text-slate-400">20mm</td></tr>
                <tr class="border-b border-white/5"><td class="py-2 px-3 font-semibold text-white">Small</td><td class="py-2 px-3 text-slate-300">Goblin, kobold, halfling</td><td class="py-2 px-3 text-slate-300">20-24mm</td><td class="py-2 px-3 text-slate-400">25mm</td></tr>
                <tr class="border-b border-white/5"><td class="py-2 px-3 font-semibold text-white">Medium</td><td class="py-2 px-3 text-slate-300">Human, elf, orc</td><td class="py-2 px-3 text-slate-300">28-32mm</td><td class="py-2 px-3 text-slate-400">25mm</td></tr>
                <tr class="border-b border-white/5"><td class="py-2 px-3 font-semibold text-white">Large</td><td class="py-2 px-3 text-slate-300">Ogre, troll, horse</td><td class="py-2 px-3 text-slate-300">50-60mm</td><td class="py-2 px-3 text-slate-400">50mm</td></tr>
                <tr class="border-b border-white/5"><td class="py-2 px-3 font-semibold text-white">Huge</td><td class="py-2 px-3 text-slate-300">Giant, dragon, beholder</td><td class="py-2 px-3 text-slate-300">80-120mm</td><td class="py-2 px-3 text-slate-400">75mm</td></tr>
                <tr><td class="py-2 px-3 font-semibold text-white">Gargantuan</td><td class="py-2 px-3 text-slate-300">Ancient dragon, kraken</td><td class="py-2 px-3 text-slate-300">150mm+</td><td class="py-2 px-3 text-slate-400">100mm+</td></tr>
              </tbody>
            </table>
          </div>
          <p class="text-sm text-slate-400 leading-relaxed mt-4">A Medium creature in D&D is roughly equivalent to a 28mm true scale miniature. If you print a human fighter STL that is labelled "32mm," it will look slightly larger than an official D&D mini — not enough to be jarring, but noticeable if they stand next to each other.</p>
        `
      },
      {
        heading: "Scaling for D&D on FDM",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">D&D miniatures have a lot of small detail: faces, weapons, cloaks, and accessories. Here are the FDM settings I use:</p>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-white/5">
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Creature Size</th>
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Nozzle</th>
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Layer Height</th>
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Print Time (estimate)</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-white/5"><td class="py-2 px-3 text-slate-300">Small (goblin)</td><td class="py-2 px-3 font-mono text-slate-500">0.2mm</td><td class="py-2 px-3 font-mono text-slate-500">0.06mm</td><td class="py-2 px-3 text-slate-400">3-4 hours</td></tr>
                <tr class="border-b border-white/5"><td class="py-2 px-3 text-slate-300">Medium (human)</td><td class="py-2 px-3 font-mono text-slate-500">0.2mm or 0.4mm</td><td class="py-2 px-3 font-mono text-slate-500">0.06mm or 0.08mm</td><td class="py-2 px-3 text-slate-400">4-6 hours</td></tr>
                <tr class="border-b border-white/5"><td class="py-2 px-3 text-slate-300">Large (ogre)</td><td class="py-2 px-3 font-mono text-slate-500">0.4mm</td><td class="py-2 px-3 font-mono text-slate-500">0.1mm</td><td class="py-2 px-3 text-slate-400">6-8 hours</td></tr>
                <tr class="border-b border-white/5"><td class="py-2 px-3 text-slate-300">Huge (giant)</td><td class="py-2 px-3 font-mono text-slate-500">0.4mm</td><td class="py-2 px-3 font-mono text-slate-500">0.12mm</td><td class="py-2 px-3 text-slate-400">10-14 hours</td></tr>
                <tr><td class="py-2 px-3 text-slate-300">Gargantuan (dragon)</td><td class="py-2 px-3 font-mono text-slate-500">0.4mm</td><td class="py-2 px-3 font-mono text-slate-500">0.2mm</td><td class="py-2 px-3 text-slate-400">20+ hours</td></tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        heading: "Converting Between Creature Sizes",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">If you find an STL for a Medium creature but want it as a Large-sized monster for a custom encounter:</p>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-white/5">
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Conversion</th>
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Formula</th>
                  <th scope="col" class="text-right py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Slicer %</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-white/5"><td class="py-2 px-3 text-slate-300">Medium (28mm) → Large (56mm)</td><td class="py-2 px-3 font-mono text-slate-500">56 ÷ 28</td><td class="py-2 px-3 text-right font-mono font-bold text-white">200%</td></tr>
                <tr class="border-b border-white/5"><td class="py-2 px-3 text-slate-300">Medium (28mm) → Huge (112mm)</td><td class="py-2 px-3 font-mono text-slate-500">112 ÷ 28</td><td class="py-2 px-3 text-right font-mono font-bold text-white">400%</td></tr>
                <tr class="border-b border-white/5"><td class="py-2 px-3 text-slate-300">Small (22mm) → Medium (28mm)</td><td class="py-2 px-3 font-mono text-slate-500">28 ÷ 22</td><td class="py-2 px-3 text-right font-mono font-bold text-white">127.3%</td></tr>
                <tr><td class="py-2 px-3 text-slate-300">Large (56mm) → Huge (112mm)</td><td class="py-2 px-3 font-mono text-slate-500">112 ÷ 56</td><td class="py-2 px-3 text-right font-mono font-bold text-white">200%</td></tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        heading: "Printing D&D Miniatures in Bulk",
        html: `
          <ul class="space-y-3 text-sm text-slate-300">
            <li>Print multiple miniatures at once by arranging them on the build plate with at least 5mm of spacing between each model.</li>
            <li>Use the same layer height for all models in the batch. Switching between 0.06mm and 0.1mm per model wastes time on filament changes and recalibration.</li>
            <li>Print bases separately. Flat circular bases print in minutes and you can glue the miniatures on after removing supports.</li>
          </ul>
        `
      },
      {
        heading: "Common D&D Scaling Mistakes",
        html: `
          <ul class="space-y-3 text-sm text-slate-300">
            <li><strong class="text-white">Printing a dragon at 100% when it was designed for 28mm scale.</strong> A dragon STL labelled "for 28mm" is already the correct size for a Medium-scale game. If you want an Ancient dragon that towers over the party, scale it to 200-400%.</li>
            <li><strong class="text-white">Using a 0.4mm nozzle for tiny creatures.</strong> A goblin's face at 0.2mm layer height with a 0.4mm nozzle will lack definition. Swap to a 0.2mm nozzle for anything Small or smaller.</li>
            <li><strong class="text-white">Scaling by bounding box.</strong> A dragon with outstretched wings will have a huge bounding box that does not reflect its body size. Measure from foot to eye, ignore the wing span.</li>
          </ul>
        `
      }
    ]
  },
  "age-of-sigmar": {
    title: "Old Fantasy, new plastic — the 28mm to 32mm jump",
    intro: "Age of Sigmar sits at 32mm heroic, but most Fantasy collections are full of older 28mm models. Knowing which side of that line your STLs sit on is the whole game when you are printing a mixed AoS force.",
    blocks: [
      {
        heading: "Where AoS Sits in Scale",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">Every new Age of Sigmar release since 2015 is <strong class="text-white">32mm heroic scale</strong>, measured to the eyes — the same convention as modern Warhammer 40k Primaris. Older Warhammer Fantasy Battle miniatures (pre-2015) are <strong class="text-white">28mm heroic</strong>. Both ranges still share tables in AoS, and the size gap is part of the range's history.</p>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-white/5">
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Conversion</th>
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Formula</th>
                  <th scope="col" class="text-right py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Slicer %</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-white/5"><td class="py-2 px-3 text-slate-300">Old Fantasy (28mm) → Modern AoS (32mm)</td><td class="py-2 px-3 font-mono text-slate-500">32 ÷ 28</td><td class="py-2 px-3 text-right font-mono font-bold text-white">114.3%</td></tr>
                <tr><td class="py-2 px-3 text-slate-300">Modern AoS (32mm) → Classic Fantasy (28mm)</td><td class="py-2 px-3 font-mono text-slate-500">28 ÷ 32</td><td class="py-2 px-3 text-right font-mono font-bold text-white">87.5%</td></tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        heading: "Mixing Old Fantasy and New Plastic",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">If your force is mostly new plastic, treat 32mm as your anchor and scale any older 28mm Fantasy STLs up at 114.3%. If you are printing a classic regimental army to sit next to 2015-era sculpts, you usually want to keep it at 32mm to hold the line — an undersized rank reads instantly across the table.</p>
          <p class="text-sm text-slate-400 leading-relaxed">The reverse matters too. A modern AoS STL dropped into a classic 28mm collection will tower over the old metal heroes; bring it down at 87.5% if you want it to blend in.</p>
        `
      },
      {
        heading: "FDM Settings for AoS",
        html: `
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-white/5">
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Model Type</th>
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Nozzle</th>
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Layer Height</th>
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-white/5"><td class="py-2 px-3 text-slate-300">Characters and heroes</td><td class="py-2 px-3 font-mono text-slate-500">0.2mm</td><td class="py-2 px-3 font-mono text-slate-500">0.06mm</td><td class="py-2 px-3 text-slate-400">Sharpest edges on armor and faces</td></tr>
                <tr class="border-b border-white/5"><td class="py-2 px-3 text-slate-300">Rank-and-file infantry</td><td class="py-2 px-3 font-mono text-slate-500">0.4mm</td><td class="py-2 px-3 font-mono text-slate-500">0.08mm</td><td class="py-2 px-3 text-slate-400">Good balance of speed and detail</td></tr>
                <tr class="border-b border-white/5"><td class="py-2 px-3 text-slate-300">Monsters and centerpieces</td><td class="py-2 px-3 font-mono text-slate-500">0.4mm</td><td class="py-2 px-3 font-mono text-slate-500">0.1mm</td><td class="py-2 px-3 text-slate-400">Big surfaces hide layer lines well</td></tr>
                <tr><td class="py-2 px-3 text-slate-300">Terrain</td><td class="py-2 px-3 font-mono text-slate-500">0.4mm</td><td class="py-2 px-3 font-mono text-slate-500">0.2mm</td><td class="py-2 px-3 text-slate-400">Use grid infill for strength</td></tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        heading: "Scaling Centrepiece Models",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">Big centerpiece monsters are where AoS scale really shows. If a dragon or daemon STL is designed for a smaller lane and you want it to dominate the board, the validated steps up from the 32mm lane are what I reach for: 234.4% takes a 32mm hero into full display territory, and 109.4% steps it up to the Legion and MCP lane for a slightly larger presence next to those systems.</p>
        `
      },
      {
        heading: "Common AoS Scaling Mistakes",
        html: `
          <ul class="space-y-3 text-sm text-slate-300">
            <li><strong class="text-white">Printing 28mm Fantasy STLs at full size in a 32mm army.</strong> If the sculptor says "28mm," you need the 114.3% step to sit level with modern plastic.</li>
            <li><strong class="text-white">Running a 0.4mm nozzle on character faces.</strong> AoS heroes carry most of their personality in the face and helmet trim — swap to a 0.2mm nozzle at 0.06mm layers.</li>
            <li><strong class="text-white">Measuring to the top of a helmet.</strong> Scale is set by eye level. A tall helmet or hair tuft will give you a misleading bounding box — measure foot to eyes in the slicer.</li>
          </ul>
        `
      }
    ]
  },
  "warhammer-the-old-world": {
    title: "28mm ranked regiments for the Old World",
    intro: "The Old World deliberately rebuilt its plastic range at the classic 28mm fantasy scale. If you are printing an army for it, the numbers are the old-school ones — not the 32mm of modern Age of Sigmar.",
    blocks: [
      {
        heading: "The Deliberate Return to 28mm",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">Games Workshop designed the new Old World kits at <strong class="text-white">28mm heroic scale</strong> to match the original Warhammer Fantasy Battle range. That means decades of classic Citadel miniatures, older metal sculpts, and fresh 3D printed proxies all sit together in the same ranked units without looking off.</p>
          <p class="text-sm text-slate-400 leading-relaxed">This is smaller than Age of Sigmar's 32mm. Mixing the two ranges on one table produces a visible size difference — which is exactly why you need to know which lane your STL was designed in.</p>
        `
      },
      {
        heading: "The Old World vs AoS Gap",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">When I pull a modern AoS STL into an Old World army, I convert it down to the 28mm lane. The reverse is just as common — old Fantasy STLs scaled up for a 32mm collection:</p>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-white/5">
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Conversion</th>
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Formula</th>
                  <th scope="col" class="text-right py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Slicer %</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-white/5"><td class="py-2 px-3 text-slate-300">Old World (28mm) → AoS (32mm)</td><td class="py-2 px-3 font-mono text-slate-500">32 ÷ 28</td><td class="py-2 px-3 text-right font-mono font-bold text-white">114.3%</td></tr>
                <tr><td class="py-2 px-3 text-slate-300">AoS (32mm) → Old World (28mm)</td><td class="py-2 px-3 font-mono text-slate-500">28 ÷ 32</td><td class="py-2 px-3 text-right font-mono font-bold text-white">87.5%</td></tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        heading: "Batch Printing Ranked Regiments",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">Old World armies are built from ranked blocks, so your printing strategy is volume first:</p>
          <ol class="list-decimal list-inside space-y-2 text-sm text-slate-300">
            <li><strong class="text-white">Print infantry blocks at 0.4mm nozzle and 0.08mm layers.</strong> Twenty models at high detail beats five models at perfect detail.</li>
            <li><strong class="text-white">Batch by height.</strong> Rank-and-file troops are close enough in height that one build plate layout works for the whole unit.</li>
            <li><strong class="text-white">Print movement trays separately.</strong> They take a fraction of the time and glue onto printed bases cleanly.</li>
            <li><strong class="text-white">Reserve the 0.2mm nozzle for unit champions and characters.</strong> That is where your detail budget belongs.</li>
          </ol>
        `
      },
      {
        heading: "Converting Out of the 28mm Lane",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">The validated steps out of 28mm cover the common side projects: 125.0% brings a classic Fantasy model up to the Legion and MCP lane, and 178.6% scales it into the 1:35 model-kit world for display or terrain work.</p>
        `
      },
      {
        heading: "Common Old World Mistakes",
        html: `
          <ul class="space-y-3 text-sm text-slate-300">
            <li><strong class="text-white">Printing 32mm AoS STLs at full size into a 28mm army.</strong> They will read as oversized next to the classic range — bring them down at 87.5%.</li>
            <li><strong class="text-white">Measuring helmeted troopers to the top of the head.</strong> Eye level is the reference. Pick it with the measurement tool, not the bounding box.</li>
            <li><strong class="text-white">Mixing 25mm metal and 32mm plastic in one ranked unit.</strong> Keep each unit internally consistent and the Old World look holds together.</li>
          </ul>
        `
      }
    ]
  },
  "middle-earth-strategy-battle-game": {
    title: "25mm metals and 28mm plastics in one army",
    intro: "MESBG is the one mainstream game where 25mm and 28mm miniatures fight side by side on purpose. Printing a proxy to fit means deciding which generation of the range you are matching before you touch the slicer.",
    blocks: [
      {
        heading: "The Two Scales in One Range",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">Older metal miniatures from the original Lord of the Rings range measure closer to <strong class="text-white">25mm</strong>, while the newer plastic releases are <strong class="text-white">28mm</strong>. Both are legal in the same army, and the community has accepted the size difference as part of the range's history. Hobbits and Goblins are intentionally smaller than Men — that is proportion, not inconsistency.</p>
          <p class="text-sm text-slate-400 leading-relaxed">That means your anchor is whatever generation dominates your collection, not a universal number.</p>
        `
      },
      {
        heading: "Pick Your Anchor",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">If your force is mostly modern plastic, anchor at 28mm. If it is mostly classic metal, you will end up closer to 25mm in practice. The validated 28mm lane references that bracket the modern GW side are still my sanity check:</p>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-white/5">
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Conversion</th>
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Formula</th>
                  <th scope="col" class="text-right py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Slicer %</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-white/5"><td class="py-2 px-3 text-slate-300">MESBG (28mm) → Modern GW (32mm)</td><td class="py-2 px-3 font-mono text-slate-500">32 ÷ 28</td><td class="py-2 px-3 text-right font-mono font-bold text-white">114.3%</td></tr>
                <tr><td class="py-2 px-3 text-slate-300">Modern GW (32mm) → MESBG (28mm)</td><td class="py-2 px-3 font-mono text-slate-500">28 ÷ 32</td><td class="py-2 px-3 text-right font-mono font-bold text-white">87.5%</td></tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        heading: "Film-Accurate Proportions",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">MESBG miniatures use realistic proportions, not heroic exaggeration — heads and hands are smaller than a GW model of the same height. When I print a proxy of a named character, faces matter because they are based on actors. I run a 0.2mm nozzle at 0.06mm layers and put supports on the back and undersides so nothing touches the face.</p>
          <p class="text-sm text-slate-400 leading-relaxed">The metal range is thinner than the plastics, so a printed replacement often looks right without adding bulk. Compare the torso width, not just the height, when you are deciding whether a proxy matches.</p>
        `
      },
      {
        heading: "Vehicles and Display Pieces",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">Two validated steps are useful for MESBG side projects: 178.6% takes a 28mm model into the 1:35 model-kit lane for vehicles and terrain displays, and 267.9% pushes a favorite hero all the way to display scale for the cabinet.</p>
        `
      },
      {
        heading: "Common MESBG Mistakes",
        html: `
          <ul class="space-y-3 text-sm text-slate-300">
            <li><strong class="text-white">Scaling to 32mm by accident.</strong> A 114.3% up-scale is right for matching modern GW, not for matching a MESBG collection anchored at 28mm.</li>
            <li><strong class="text-white">Trusting a "25mm" label on a modern proxy.</strong> Check the eye level in the slicer against the metal miniature you are replacing.</li>
            <li><strong class="text-white">Skipping facial detail on named characters.</strong> This is the one range where recognizable faces carry the game.</li>
          </ul>
        `
      }
    ]
  },
  "star-wars-legion": {
    title: "35mm eye level — why Stormtroopers tower over Space Marines",
    intro: "Legion is 35mm to the eyes (35.7mm on my 175cm baseline), which puts it bigger than Warhammer 40k and smaller than Shatterpoint. Getting proxies to match means working from that eye-level number, not the top of the helmet.",
    blocks: [
      {
        heading: "What 35mm Actually Means",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">Legion's 35mm designation is an <strong class="text-white">eye-level measurement</strong>. A Stormtrooper's eyes sit 35.7mm above the base, and the full miniature reaches about 40mm to the top of the helmet. That works out to roughly 1:47 scale on a 1678mm eye-height reference — and it is why Bandai and Revell's 1:48 Star Wars kits sit so close to the range.</p>
          <p class="text-sm text-slate-400 leading-relaxed">The takeaway: measure to the eyes in your slicer. If you measure to the top of the helmet you will undersize every proxy.</p>
        `
      },
      {
        heading: "Converting GW-Scale Proxies",
        html: `
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-white/5">
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Conversion</th>
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Formula</th>
                  <th scope="col" class="text-right py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Slicer %</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-white/5"><td class="py-2 px-3 text-slate-300">GW (32mm) → Legion (35mm)</td><td class="py-2 px-3 font-mono text-slate-500">35.0 ÷ 32.0</td><td class="py-2 px-3 text-right font-mono font-bold text-white">109.4%</td></tr>
                <tr><td class="py-2 px-3 text-slate-300">Legion (35mm) → GW (32mm)</td><td class="py-2 px-3 font-mono text-slate-500">32.0 ÷ 35.0</td><td class="py-2 px-3 text-right font-mono font-bold text-white">91.4%</td></tr>
              </tbody>
            </table>
          </div>
          <p class="text-sm text-slate-400 leading-relaxed mt-4">Most third-party Legion proxies are sculpted at 32mm heroic. Print those at 109.4% and lock uniform scaling so the proportions stay intact.</p>
        `
      },
      {
        heading: "Legion vs Classic 28mm",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">The jump from classic 28mm systems into Legion is bigger than it looks on paper: 125.0% up from 28mm, or 80.0% down if you are scaling Legion STLs for a 28mm game. Either way, the models end up clearly different in bulk, not just height.</p>
        `
      },
      {
        heading: "FDM and Smooth Armor",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">Stormtrooper and Clone Trooper armor is made of smooth, unbroken panels — exactly the surface where FDM layer lines show. I print infantry at 0.06mm layers or finer, and vehicles like the AT-ST and AT-RT at 0.1mm. When I scale a proxy, I enable the chain-link lock in my slicer so the ratio stays uniform across all three axes.</p>
        `
      },
      {
        heading: "Common Legion Mistakes",
        html: `
          <ul class="space-y-3 text-sm text-slate-300">
            <li><strong class="text-white">Measuring to the top of the helmet.</strong> Legion is an eye-level scale — add the helmet and you undersize every print.</li>
            <li><strong class="text-white">Mixing Legion with Shatterpoint.</strong> Shatterpoint is 40mm. If you want a Legion model to stand with one, the validated step is 114.3% (35mm → 40mm), and even then the bulk reads differently.</li>
            <li><strong class="text-white">Trusting a "32mm" label on a Legion proxy.</strong> Verify the eye-level height in the slicer before committing to a long print.</li>
          </ul>
        `
      }
    ]
  },
  "star-wars-shatterpoint": {
    title: "40mm — the biggest Star Wars scale",
    intro: "Shatterpoint is 40mm to the eyes, a deliberate step up from Legion's 35mm for more painting surface. When I bring a proxy up to that lane, I am scaling against the largest standard Star Wars game on the market.",
    blocks: [
      {
        heading: "Why 40mm",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">Atomic Mass Games chose 40mm for Shatterpoint so painters get large, smooth surfaces for blending and highlighting — a real departure from the smaller scales used in Legion and MCP. Characters like Dooku measure roughly 42.75mm in total height. The tradeoff is real: bigger scale means more resin or filament per model, so I factor material cost before I commit to a full squad.</p>
        `
      },
      {
        heading: "Bringing Legion and GW Models Up",
        html: `
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-white/5">
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Conversion</th>
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Formula</th>
                  <th scope="col" class="text-right py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Slicer %</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-white/5"><td class="py-2 px-3 text-slate-300">Legion (35mm) → Shatterpoint (40mm)</td><td class="py-2 px-3 font-mono text-slate-500">40 ÷ 35</td><td class="py-2 px-3 text-right font-mono font-bold text-white">114.3%</td></tr>
                <tr><td class="py-2 px-3 text-slate-300">GW (32mm) → Shatterpoint (40mm)</td><td class="py-2 px-3 font-mono text-slate-500">40 ÷ 32</td><td class="py-2 px-3 text-right font-mono font-bold text-white">125.0%</td></tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        heading: "Classic 28mm to Shatterpoint",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">Bringing a classic 28mm STL all the way up to 40mm is a 142.9% step. That is a large enough jump that I check the model's proportions after scaling — fine detail like hair strands and thin sabers scale up well, but anything sculpted with exaggerated heroic features can start to look cartoonish at this size.</p>
        `
      },
      {
        heading: "FDM at 40mm",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">Shatterpoint's big smooth surfaces reward fine layer heights — 0.04-0.06mm on resin for the best finish. On FDM, 0.08mm is acceptable for the characters and the terrain pieces. I orient helmets and faces carefully so support marks never land on visible panels.</p>
        `
      },
      {
        heading: "Common Shatterpoint Mistakes",
        html: `
          <ul class="space-y-3 text-sm text-slate-300">
            <li><strong class="text-white">Treating 40mm as 35mm.</strong> The numbers are close enough that a Legion proxy printed at full size looks noticeably small next to official Shatterpoint sculpts.</li>
            <li><strong class="text-white">Scaling Legion proxies down instead of up.</strong> If you own Legion STLs and want Shatterpoint, the direction is 114.3% up, not down.</li>
            <li><strong class="text-white">Measuring to the top of a hood or helmet.</strong> Eye level is the reference. Hooded characters like Dooku make this mistake easy to make.</li>
          </ul>
        `
      }
    ]
  },
  "marvel-crisis-protocol": {
    title: "True-scale 35mm superheroes",
    intro: "MCP is 35mm true scale — realistic proportions with no heroic exaggeration. That is the opposite of the 32mm heroic STL most sculptors release, so getting a proxy to fit means respecting the lane, not the label.",
    blocks: [
      {
        heading: "True Scale vs Heroic Scale",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">MCP characters look like realistic humans at 35mm — heads and hands are proportioned naturally, not enlarged for readability like a Games Workshop miniature. Hulk and Thanos come across as bigger because they are on larger bases and sculpted bulkier, not because the scale changes. This is the key difference from 32mm heroic.</p>
        `
      },
      {
        heading: "Converting from 32mm",
        html: `
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-white/5">
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Conversion</th>
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Formula</th>
                  <th scope="col" class="text-right py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Slicer %</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-white/5"><td class="py-2 px-3 text-slate-300">GW (32mm) → MCP (35mm)</td><td class="py-2 px-3 font-mono text-slate-500">35.0 ÷ 32.0</td><td class="py-2 px-3 text-right font-mono font-bold text-white">109.4%</td></tr>
                <tr><td class="py-2 px-3 text-slate-300">MCP (35mm) → GW (32mm)</td><td class="py-2 px-3 font-mono text-slate-500">32.0 ÷ 35.0</td><td class="py-2 px-3 text-right font-mono font-bold text-white">91.4%</td></tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        heading: "Shatterpoint and Display Lanes",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">Two validated steps out of the MCP lane are worth knowing: 114.3% takes a 35mm model up to Shatterpoint scale, and 214.3% pushes a favorite hero into display territory for the cabinet.</p>
        `
      },
      {
        heading: "FDM Settings for Superheroes",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">MCP characters have dynamic poses — capes, energy effects, and floating heroes. I print character models with a 0.2mm nozzle at 0.06mm layers. The larger scale means fewer visible layer lines at standard settings than a 28mm mini, and terrain like cars and rubble prints great on FDM at 0.1mm layers.</p>
        `
      },
      {
        heading: "Common MCP Mistakes",
        html: `
          <ul class="space-y-3 text-sm text-slate-300">
            <li><strong class="text-white">Using 32mm heroic STLs at full size.</strong> Next to true-scale 35mm characters, a heroic 32mm proxy reads noticeably smaller and bulkier.</li>
            <li><strong class="text-white">Scaling by bounding box.</strong> Capes and energy trails inflate the bounding box — measure foot to eye, ignore the dramatic bits.</li>
            <li><strong class="text-white">Over-printing terrain.</strong> The game needs scatter, but rank-and-file thugs on the board read fine at 0.1mm layers. Spend the fine-layer budget on named characters.</li>
          </ul>
        `
      }
    ]
  },
  "malifaux": {
    title: "32mm heroic, with faces that matter",
    intro: "Malifaux is 32mm heroic like modern Games Workshop, but Wyrd's sculpts exaggerate heads and expressions more than anyone else in the hobby. When you print proxies, that is a feature — it just means faces get your detail budget.",
    blocks: [
      {
        heading: "Malifaux in the 32mm Family",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">Malifaux miniatures are <strong class="text-white">32mm heroic scale</strong>, compatible in size with modern Warhammer 40k and Age of Sigmar. The artistic style is more exaggerated than GW — larger heads and more expressive faces designed to carry a character's personality across the table. Since the 4th Edition relaunch the range is produced in high-quality plastic.</p>
        `
      },
      {
        heading: "Converting Classic 28mm STLs",
        html: `
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-white/5">
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Conversion</th>
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Formula</th>
                  <th scope="col" class="text-right py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Slicer %</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-white/5"><td class="py-2 px-3 text-slate-300">Classic (28mm) → Malifaux (32mm)</td><td class="py-2 px-3 font-mono text-slate-500">32 ÷ 28</td><td class="py-2 px-3 text-right font-mono font-bold text-white">114.3%</td></tr>
                <tr><td class="py-2 px-3 text-slate-300">Malifaux (32mm) → Classic (28mm)</td><td class="py-2 px-3 font-mono text-slate-500">28 ÷ 32</td><td class="py-2 px-3 text-right font-mono font-bold text-white">87.5%</td></tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        heading: "Faces and Expression Detail",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">Malifaux is known for expressive faces and intricate clothing detail. I use a 0.2mm nozzle at 0.06mm layers for the best results on character models, and I strongly recommend resin for this range — the fine detail on accessories and weapons is exactly what FDM softens first. The 4th Edition plastic range is also well suited to kitbashing with printed alternative parts.</p>
        `
      },
      {
        heading: "Legion/MCP and Display Lanes",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">If you want a Malifaux model to stand in the Legion and MCP lane, the validated step is 109.4% (32mm → 35mm). For a display piece in the cabinet, 234.4% takes the same model to 75mm territory.</p>
        `
      },
      {
        heading: "Common Malifaux Mistakes",
        html: `
          <ul class="space-y-3 text-sm text-slate-300">
            <li><strong class="text-white">Buying "28mm heroic" proxies and printing them at full size.</strong> They will sit short next to official 32mm Malifaux sculpts — use the 114.3% step.</li>
            <li><strong class="text-white">Running a 0.4mm nozzle on faces.</strong> Wyrd's whole identity is in the expressions. Use a 0.2mm nozzle or resin.</li>
            <li><strong class="text-white">Assuming "32mm" on a label means 32mm eye level.</strong> Measure it in the slicer — third-party "32mm heroic" files vary.</li>
          </ul>
        `
      }
    ]
  },
  "infinity": {
    title: "28mm with anime proportions",
    intro: "Infinity says 28mm but the models measure closer to 29-30mm with slim, realistic proportions. That quirk is why printed proxies so often look wrong even at the 'right' scale.",
    blocks: [
      {
        heading: "The Infinity Scale Quirk",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">Infinity models are nominally <strong class="text-white">28mm</strong> but measure closer to 29-30mm in practice thanks to scale creep across the range. The proportions are the bigger tell: leaner, more realistic than heroic 28mm, with smaller heads and hands relative to the body. Two ranges can share a "28mm" label and look nothing alike on the table.</p>
        `
      },
      {
        heading: "Match the Metal, Not the Label",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">The reliable way is the caliper. I measure the eye level of a reference Corvus Belli metal miniature, then check my printed proxy against that number — not against the "28mm" printed on the file page. Most third-party Infinity proxies are sculpted slim and land close to the range as-is; if anything, I scale up a touch rather than down. The validated 114.3% step (28mm → 32mm) overshoots Infinity's real-world 29-30mm, so treat Infinity as its own lane and verify with a measurement.</p>
        `
      },
      {
        heading: "Converting to Other Lanes",
        html: `
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-white/5">
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Conversion</th>
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Formula</th>
                  <th scope="col" class="text-right py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Slicer %</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-white/5"><td class="py-2 px-3 text-slate-300">Infinity (28mm) → Heroic (32mm)</td><td class="py-2 px-3 font-mono text-slate-500">32 ÷ 28</td><td class="py-2 px-3 text-right font-mono font-bold text-white">114.3%</td></tr>
                <tr class="border-b border-white/5"><td class="py-2 px-3 text-slate-300">Heroic (32mm) → Infinity (28mm)</td><td class="py-2 px-3 font-mono text-slate-500">28 ÷ 32</td><td class="py-2 px-3 text-right font-mono font-bold text-white">87.5%</td></tr>
                <tr><td class="py-2 px-3 text-slate-300">Infinity (28mm) → Legion/MCP (35mm)</td><td class="py-2 px-3 font-mono text-slate-500">35 ÷ 28</td><td class="py-2 px-3 text-right font-mono font-bold text-white">125.0%</td></tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        heading: "FDM Reality Check",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">Infinity models are famous for thin rifle barrels, flowing hair, and delicate equipment — all of it a struggle on FDM. I strongly recommend resin for this range. If you do print on FDM, use a 0.2mm nozzle at 0.04-0.06mm layers and attach supports to undersides and backs so nothing touches the hair or the weapon.</p>
        `
      },
      {
        heading: "Common Infinity Mistakes",
        html: `
          <ul class="space-y-3 text-sm text-slate-300">
            <li><strong class="text-white">Scaling to the 28mm label instead of the actual model.</strong> Measure eye level against a reference mini before slicing.</li>
            <li><strong class="text-white">FDM on thin weapons and hair.</strong> They break and soften at this scale. Resin is the right tool.</li>
            <li><strong class="text-white">Mixing with heroic 28mm ranges.</strong> The bulk difference reads immediately. Keep Infinity armies in the slim lane.</li>
          </ul>
        `
      }
    ]
  },
  "warmachine-hordes": {
    title: "30mm — the scale creep you cannot label",
    intro: "Warmachine launched as 28mm and Privateer Press now calls the range 30mm. Printing proxies means accepting that '30mm' is not a conversion target — it is a bracket between 28mm and 32mm.",
    blocks: [
      {
        heading: "28mm, 30mm, or Both?",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">Warmachine was originally marketed as <strong class="text-white">28mm</strong> and reclassified to <strong class="text-white">30mm</strong> around the time Hordes launched. The miniatures use chunky heroic proportions — exaggerated weapons and armor, beefy silhouettes. Both labels are accepted in the community, and the range's own models span the bracket depending on when they were sculpted.</p>
        `
      },
      {
        heading: "Where Printed Proxies Land",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">Most STL files are labeled either "28mm heroic" or "32mm heroic." Warmachine's 30mm sits between the two. In practice I treat Warmachine as <strong class="text-white">28mm heroic</strong> when I print proxies, then verify with the caliper against a reference 'jack or infantry model. If a file runs big or small, I adjust by a touch and re-measure — the label is a starting point, not the answer.</p>
        `
      },
      {
        heading: "The Bracket in Numbers",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">There is no validated "30mm" conversion in the matrix, so the two validated references that bracket the lane are the ones I use:</p>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-white/5">
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Conversion</th>
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Formula</th>
                  <th scope="col" class="text-right py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Slicer %</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-white/5"><td class="py-2 px-3 text-slate-300">Classic (28mm) → Heroic (32mm)</td><td class="py-2 px-3 font-mono text-slate-500">32 ÷ 28</td><td class="py-2 px-3 text-right font-mono font-bold text-white">114.3%</td></tr>
                <tr><td class="py-2 px-3 text-slate-300">Heroic (32mm) → Classic (28mm)</td><td class="py-2 px-3 font-mono text-slate-500">28 ÷ 32</td><td class="py-2 px-3 text-right font-mono font-bold text-white">87.5%</td></tr>
              </tbody>
            </table>
          </div>
          <p class="text-sm text-slate-400 leading-relaxed mt-4">Scaling a Warmachine proxy all the way to strict 32mm usually overshoots a real army — that step is the top of the bracket, not the middle.</p>
        `
      },
      {
        heading: "FDM Settings for 'Jacks",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">Warmachine's bulky mechanical designs are forgiving on FDM — flat armor panels hide layer lines, and warjacks are big enough that I run a 0.4mm nozzle at 0.1mm layers for the machines. Heavy infantry and characters get a 0.2mm nozzle at 0.06mm. The metal originals are heavy, so printed resin alternatives are noticeably lighter and easier to transport.</p>
        `
      },
      {
        heading: "Common Warmachine Mistakes",
        html: `
          <ul class="space-y-3 text-sm text-slate-300">
            <li><strong class="text-white">Forcing a 30mm army to strict 32mm scale.</strong> Your proxies will read oversized next to the range — stay in the 28mm heroic lane.</li>
            <li><strong class="text-white">Measuring to the top of a 'jack's cab.</strong> Eye level is the reference even on machines; the cab is usually a raised detail, not the scale point.</li>
            <li><strong class="text-white">FDM for infantry when resin is available.</strong> The heavy troops have a lot of small trim that FDM softens first.</li>
          </ul>
        `
      }
    ]
  },
  "frostgrave-stargrave": {
    title: "Miniature-agnostic and printing-friendly",
    intro: "Frostgrave and Stargrave have no locked range — any 28mm or 32mm miniature works. For a printer that is the best possible ruleset, as long as you keep each warband internally consistent.",
    blocks: [
      {
        heading: "The 'Any Miniature' Rule",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">The official Frostgrave miniatures (produced by Warlord Games) are <strong class="text-white">28mm true scale</strong>, but the game is explicitly miniature-agnostic — any 28mm or 32mm miniatures work. Stargrave leans toward 28mm sci-fi but accepts the same range. That flexibility makes both games a natural fit for a 3D printed collection.</p>
        `
      },
      {
        heading: "Pick an Anchor and Stay Consistent",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">The only real rule is internal consistency. Pick 28mm or 32mm for a warband and hold it across every model in the group. The validated step between the lanes is:</p>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-white/5">
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Conversion</th>
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Formula</th>
                  <th scope="col" class="text-right py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Slicer %</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-white/5"><td class="py-2 px-3 text-slate-300">Frostgrave (28mm) → Modern (32mm)</td><td class="py-2 px-3 font-mono text-slate-500">32 ÷ 28</td><td class="py-2 px-3 text-right font-mono font-bold text-white">114.3%</td></tr>
                <tr><td class="py-2 px-3 text-slate-300">Modern (32mm) → Frostgrave (28mm)</td><td class="py-2 px-3 font-mono text-slate-500">28 ÷ 32</td><td class="py-2 px-3 text-right font-mono font-bold text-white">87.5%</td></tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        heading: "What to Print",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">This is one of the best games for 3D printing experimentation. I print warbands in batches at 0.4mm nozzle and 0.08mm layers for playability, and save the 0.2mm nozzle at 0.06mm for wizards and named characters. Terrain is half the game — frozen ruins for Frostgrave, sci-fi corridors for Stargrave — and it prints great on FDM at 0.1mm layers.</p>
        `
      },
      {
        heading: "Mixing Ranges",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">If you want to pull in a Legion or MCP miniature as a guest star, the validated step up from the 28mm lane is 125.0%. That lands the model in the 35mm lane alongside them rather than trying to squeeze a bigger sculpt down to your warband's scale.</p>
        `
      },
      {
        heading: "Common Frostgrave Mistakes",
        html: `
          <ul class="space-y-3 text-sm text-slate-300">
            <li><strong class="text-white">Mixing 25mm metals with 32mm STLs in one warband.</strong> Each warband should look like it came from the same place — pick one lane and stick to it.</li>
            <li><strong class="text-white">Spending hours on a rank-and-file thug.</strong> Playability models read fine at 0.08mm layers. Reserve the fine detail for wizards and captains.</li>
            <li><strong class="text-white">Skipping terrain.</strong> Frostgrave and Stargrave are terrain games. The board sells the theme more than any single model.</li>
          </ul>
        `
      }
    ]
  },
  "kings-of-war": {
    title: "Regiments at 28mm, printed fast",
    intro: "Kings of War is 28mm and accepts any range, but you need whole regiments. This is the one game where volume beats detail — the printing strategy is batches, not individual heroes.",
    blocks: [
      {
        heading: "The 28mm Mantic Baseline",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">Kings of War uses standard <strong class="text-white">28mm fantasy scale</strong>. Mantic's own miniatures run slightly smaller than Games Workshop's heroic 28mm, but the difference is minimal on the table. Because the game uses regiment-based movement, the unit footprint matters more than the exact height of any single model — a fact that takes a lot of pressure off your slicing.</p>
        `
      },
      {
        heading: "Batch Printing for Regiments",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">You need entire regiments, not single characters. I print infantry in large batches at 0.4mm nozzle and 0.1mm layers for speed, and treat the movement trays as printable pieces — Mantic's trays clone cleanly. Rank-and-file troops are viewed from several feet away, so the quality bar is lower than any skirmish game.</p>
        `
      },
      {
        heading: "Converting 32mm STLs Down",
        html: `
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-white/5">
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Conversion</th>
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Formula</th>
                  <th scope="col" class="text-right py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Slicer %</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-white/5"><td class="py-2 px-3 text-slate-300">AoS/40k (32mm) → KoW (28mm)</td><td class="py-2 px-3 font-mono text-slate-500">28 ÷ 32</td><td class="py-2 px-3 text-right font-mono font-bold text-white">87.5%</td></tr>
                <tr><td class="py-2 px-3 text-slate-300">KoW (28mm) → AoS/40k (32mm)</td><td class="py-2 px-3 font-mono text-slate-500">32 ÷ 28</td><td class="py-2 px-3 text-right font-mono font-bold text-white">114.3%</td></tr>
              </tbody>
            </table>
          </div>
          <p class="text-sm text-slate-400 leading-relaxed mt-4">Most fantasy STLs are 32mm heroic. Bring those down at 87.5% to keep a KoW regiment consistent with Mantic's slightly-slimmer 28mm look.</p>
        `
      },
      {
        heading: "Characters and Champions",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">Unit champions and characters are where the detail budget belongs. I print those at 0.2mm nozzle and 0.06mm layers so they read as individuals in the block. Everything else is production work.</p>
        `
      },
      {
        heading: "Common Kings of War Mistakes",
        html: `
          <ul class="space-y-3 text-sm text-slate-300">
            <li><strong class="text-white">Obsessing over individual scale inside a ranked block.</strong> Footprint and base size carry the unit. Height differences of a model or two vanish at table distance.</li>
            <li><strong class="text-white">Solid infill on rank-and-file.</strong> Grid infill saves filament and the models are strong enough for handling — you are printing dozens of them.</li>
            <li><strong class="text-white">Fine layers on everyone.</strong> Running a whole regiment at 0.06mm is a waste of hours when the unit reads the same at 0.1mm.</li>
          </ul>
        `
      }
    ]
  },
  "battletech": {
    title: "6mm 'mechs — from 30 to 55mm tall",
    intro: "BattleTech is 6mm (about 1:285), but a 'mech's height depends on its weight class, so Light 'mechs run 30mm tall and Assaults run 55mm. Printing proxies is about matching Catalyst's modern sculpts, not a strict ratio.",
    blocks: [
      {
        heading: "Why '6mm' Is a Moving Target",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">BattleTech 'mechs represent machines 9-15 meters tall. At 1:285 scale a 12-meter 'mech should be about 42mm tall, but the actual range varies a lot. Catalyst's modern sculpts run closer to 1:265 (slightly larger than true ratio), while older Iron Wind Metals miniatures are smaller and closer to the original math. The scale is a family, not a single number.</p>
        `
      },
      {
        heading: "Match the Range, Not the Math",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">The reliable approach is to pick one official miniature as your reference and match its height. I keep a single Catalyst 'mech on the bench and measure every printed proxy against it. Consistency within a lance matters more than hitting a strict 1:285 ratio — the game is hex-based and scale-perfect models are the least of your worries.</p>
        `
      },
      {
        heading: "FDM vs Resin at This Size",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">'Mechs are small but dense with detail — cockpit glass, weapon barrels, and antennas all need to read. I print the machines on resin at 0.2mm nozzle and 0.04-0.06mm layers, and save FDM for terrain and hex tiles. Magnetizing bases makes transport easier, since small models shift around in a case.</p>
        `
      },
      {
        heading: "Reference Conversions",
        html: `
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-white/5">
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Conversion</th>
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Formula</th>
                  <th scope="col" class="text-right py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Slicer %</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-white/5"><td class="py-2 px-3 text-slate-300">1:100 → 1:35 (micro scale up)</td><td class="py-2 px-3 font-mono text-slate-500">50.0 ÷ 17.5</td><td class="py-2 px-3 text-right font-mono font-bold text-white">285.7%</td></tr>
                <tr><td class="py-2 px-3 text-slate-300">1:72 → 1:35 (small scale to model kit)</td><td class="py-2 px-3 font-mono text-slate-500">50.0 ÷ 24.3</td><td class="py-2 px-3 text-right font-mono font-bold text-white">205.7%</td></tr>
              </tbody>
            </table>
          </div>
          <p class="text-sm text-slate-400 leading-relaxed mt-4">These are the validated reference steps I use when a printed model spans the small-scale ranges. They rarely apply to 'mechs directly — your reference miniature is the better guide.</p>
        `
      },
      {
        heading: "Common BattleTech Mistakes",
        html: `
          <ul class="space-y-3 text-sm text-slate-300">
            <li><strong class="text-white">Scaling a Light and an Assault to the same height.</strong> Weight class differences are real and add to the game's readability.</li>
            <li><strong class="text-white">Scaling to strict 1:285 math.</strong> You will undersize modern Catalyst sculpts — match the range instead.</li>
            <li><strong class="text-white">FDM on cockpits and antennas.</strong> At 6mm those details need resin, or they come out as blobs.</li>
          </ul>
        `
      }
    ]
  },
  "flames-of-war": {
    title: "15mm (1:100) — companies, not squads",
    intro: "Flames of War is 15mm at 1:100, where a standard game fields dozens of tanks and hundreds of infantry on one table. Conversions here are about whole platoons, so the percentages matter more than any single model.",
    blocks: [
      {
        heading: "The 1:100 Convention",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">At 15mm (1:100), Flames of War miniatures are small enough to field dozens of vehicles and hundreds of infantry on a single table. The eye level works out to about 16mm on my 175cm baseline. One distinction I always check: a strict 1:100 ratio gives 17.5mm to the top of the head, while "15mm" usually means eye level — the two look similar on paper but are not identical.</p>
        `
      },
      {
        heading: "Bringing 15mm Up to 28mm and 32mm",
        html: `
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-white/5">
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Conversion</th>
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Formula</th>
                  <th scope="col" class="text-right py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Slicer %</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-white/5"><td class="py-2 px-3 text-slate-300">15mm (1:100) → 28mm tabletop</td><td class="py-2 px-3 font-mono text-slate-500">28.0 ÷ 17.5</td><td class="py-2 px-3 text-right font-mono font-bold text-white">160.0%</td></tr>
                <tr><td class="py-2 px-3 text-slate-300">15mm (1:100) → 32mm heroic</td><td class="py-2 px-3 font-mono text-slate-500">32.0 ÷ 17.5</td><td class="py-2 px-3 text-right font-mono font-bold text-white">182.9%</td></tr>
              </tbody>
            </table>
          </div>
          <p class="text-sm text-slate-400 leading-relaxed mt-4">Use these when you want a FoW tank or soldier upscaled into a 28mm game — the jump is large, so check the proportions after scaling.</p>
        `
      },
      {
        heading: "The Model-Kit Jump",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">The validated step from 1:100 up to the 1:35 model-kit lane is 285.7%. It is a huge jump — more for display and diorama work than for tabletop play, where the 15mm size is the point.</p>
        `
      },
      {
        heading: "FDM Reality at 15mm",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">15mm miniatures reward batch printing — you need entire platoons. I print infantry on resin at 0.2mm nozzle and 0.06mm layers, and vehicles on FDM at 0.08mm. Magnetizing vehicle bases helps with transport. At this scale, basing has a proportionally huge visual impact, so flocking and static grass do more work than your print settings.</p>
        `
      },
      {
        heading: "Common Flames of War Mistakes",
        html: `
          <ul class="space-y-3 text-sm text-slate-300">
            <li><strong class="text-white">Treating "15mm" and "1:100" as identical.</strong> They are close but not the same — confirm which convention your STL uses before converting.</li>
            <li><strong class="text-white">FDM infantry at this scale.</strong> The rifles and webbing are too fine. Resin is the tool for 15mm men.</li>
            <li><strong class="text-white">Mixing in 20mm (1:72) ranges.</strong> They read noticeably larger next to 15mm. Keep a platoon in one scale.</li>
          </ul>
        `
      }
    ]
  },
  "dropzone-commander": {
    title: "10mm combined arms — print the machines",
    intro: "Dropzone Commander is 10mm, where infantry are barely bigger than a grain of rice and the game is won by tanks and dropships. The printing strategy is simple: resin the infantry, FDM the vehicles.",
    blocks: [
      {
        heading: "The 10mm Scale",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">Dropzone Commander is <strong class="text-white">10mm scale (1:160)</strong>. Individual infantry are barely larger than a grain of rice, so the game's visual impact comes from vehicle mass and formation density rather than individual detail. TTCombat's range is consistent within itself, which makes cross-faction mixing straightforward.</p>
        `
      },
      {
        heading: "Print the Vehicles, Resin the Infantry",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">FDM genuinely struggles with 10mm infantry — the bodies, weapons, and details are too fine. I print infantry on resin at 0.2mm nozzle and 0.04mm layers. The vehicles are the stars of this game, and they print well on FDM at 0.06mm layers with a 0.4mm nozzle.</p>
        `
      },
      {
        heading: "Reference Conversions",
        html: `
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-white/5">
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Conversion</th>
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Formula</th>
                  <th scope="col" class="text-right py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Slicer %</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-white/5"><td class="py-2 px-3 text-slate-300">1:100 → 1:35 (scale up reference)</td><td class="py-2 px-3 font-mono text-slate-500">50.0 ÷ 17.5</td><td class="py-2 px-3 text-right font-mono font-bold text-white">285.7%</td></tr>
                <tr><td class="py-2 px-3 text-slate-300">1:72 → 1:35 (small scale reference)</td><td class="py-2 px-3 font-mono text-slate-500">50.0 ÷ 24.3</td><td class="py-2 px-3 text-right font-mono font-bold text-white">205.7%</td></tr>
              </tbody>
            </table>
          </div>
          <p class="text-sm text-slate-400 leading-relaxed mt-4">These are the validated reference steps I use when a printed model spans the small-scale ranges — useful sanity checks when a file lands between conventions.</p>
        `
      },
      {
        heading: "Basing and Batch Painting",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">At 10mm, cohesion wins over detail. I give each faction a single base color and batch-paint the infantry in one pass, then use washes for shading. Magnetizing vehicle bases keeps the force easy to transport.</p>
        `
      },
      {
        heading: "Common Dropzone Mistakes",
        html: `
          <ul class="space-y-3 text-sm text-slate-300">
            <li><strong class="text-white">FDM on infantry.</strong> At 10mm it is a waste of filament — resin or stick to official infantry.</li>
            <li><strong class="text-white">Mixing 10mm with 15mm Flames of War models.</strong> They are close enough to feel wrong together and different enough to notice.</li>
            <li><strong class="text-white">Over-detailing single models.</strong> The table reads as formations. Spend time on the vehicles, not one soldier.</li>
          </ul>
        `
      }
    ]
  },
  "legions-imperialis": {
    title: "8mm epic — Titans next to 28mm infantry",
    intro: "Legions Imperialis is 8mm, tuned so a Titan is roughly the physical size of a 28mm infantry model. That dramatic contrast is the point — and it means you should never 'fix' it by scaling up.",
    blocks: [
      {
        heading: "The 8mm Epic Scale",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">Legions Imperialis is <strong class="text-white">8mm scale (1:200)</strong>, matching the older Adeptus Titanicus range. Individual Space Marines are tiny but recognizable, and massed formations of hundreds of models fit on a single table. It is Games Workshop's return to epic-scale warfare, set during the Horus Heresy.</p>
        `
      },
      {
        heading: "The Contrast Is Intentional",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">The scale is designed so a Titan miniature is roughly the same physical size as a 28mm infantry model. That size contrast between the tiny Marine line and the looming Titans is the whole point of the game — do not scale a Titan up "so it feels big." Also, Legions Imperialis and Adeptus Titanicus share the scale but not the base sizes, so keep the bases straight when you print replacements.</p>
        `
      },
      {
        heading: "Resin for Infantry, FDM for the Big Stuff",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">At 8mm, resin printing is essential for infantry — FDM cannot reliably produce the detail. I print infantry at 0.2mm nozzle and 0.04mm layers. Vehicles and Titans are larger and more forgiving, and FDM handles them fine. For painting at this size, contrast paints and washes beat layer-by-layer highlighting every time.</p>
        `
      },
      {
        heading: "Reference Conversions",
        html: `
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-white/5">
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Conversion</th>
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Formula</th>
                  <th scope="col" class="text-right py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Slicer %</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-white/5"><td class="py-2 px-3 text-slate-300">1:100 → 1:35 (scale up reference)</td><td class="py-2 px-3 font-mono text-slate-500">50.0 ÷ 17.5</td><td class="py-2 px-3 text-right font-mono font-bold text-white">285.7%</td></tr>
                <tr><td class="py-2 px-3 text-slate-300">1:72 → 1:35 (small scale reference)</td><td class="py-2 px-3 font-mono text-slate-500">50.0 ÷ 24.3</td><td class="py-2 px-3 text-right font-mono font-bold text-white">205.7%</td></tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        heading: "Common Legions Imperialis Mistakes",
        html: `
          <ul class="space-y-3 text-sm text-slate-300">
            <li><strong class="text-white">FDM on the infantry.</strong> 8mm Marines need resin or they come out as blobs.</li>
            <li><strong class="text-white">Scaling Titans up for drama.</strong> The scale contrast is the design. Leave the numbers alone.</li>
            <li><strong class="text-white">Confusing Legions Imperialis and Adeptus Titanicus bases.</strong> Same scale, different base sizes — print to the right one for the game you play.</li>
          </ul>
        `
      }
    ]
  },
  "one-page-rules-grimdark-future": {
    title: "The 32mm rule-agnostic playground",
    intro: "Grimdark Future has no official range — it is built for printed and proxy collections. That means you set the scale, and the only rule that matters is keeping one scale across your whole force.",
    blocks: [
      {
        heading: "No Official Range, No Wrong Answer",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">Grimdark Future is miniature-agnostic by design — it works with whatever you own. The 32mm recommendation aligns with modern Games Workshop and the majority of 3D printed STL files, but a 28mm classic collection works just as well. What the rules actually care about is base sizes, not model heights.</p>
        `
      },
      {
        heading: "Pick a Standard for Your Army",
        html: `
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-white/5">
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Conversion</th>
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Formula</th>
                  <th scope="col" class="text-right py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Slicer %</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-white/5"><td class="py-2 px-3 text-slate-300">Classic (28mm) → GDF standard (32mm)</td><td class="py-2 px-3 font-mono text-slate-500">32 ÷ 28</td><td class="py-2 px-3 text-right font-mono font-bold text-white">114.3%</td></tr>
                <tr><td class="py-2 px-3 text-slate-300">GDF standard (32mm) → Classic (28mm)</td><td class="py-2 px-3 font-mono text-slate-500">28 ÷ 32</td><td class="py-2 px-3 text-right font-mono font-bold text-white">87.5%</td></tr>
              </tbody>
            </table>
          </div>
          <p class="text-sm text-slate-400 leading-relaxed mt-4">Commit to one lane for the whole army. The only real scale mistake in this game is switching mid-force.</p>
        `
      },
      {
        heading: "Base Sizes Drive the Rules",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">Grimdark Future's unit categories are keyed to base sizes — infantry, heavy infantry, cavalry, and so on. The game is forgiving about visual consistency precisely because the bases do the rules work. Print your models to fit the correct base category and the army plays correctly even if the sculpts vary.</p>
        `
      },
      {
        heading: "FDM Settings",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">Since there are no official models to match, print whatever you want. I use a 0.2mm nozzle at 0.06mm layers for characters and a 0.4mm nozzle at 0.1mm for rank-and-file. PLA with high fan from the first few layers gives clean overhangs on capes and weapon barrels.</p>
        `
      },
      {
        heading: "Common Grimdark Future Mistakes",
        html: `
          <ul class="space-y-3 text-sm text-slate-300">
            <li><strong class="text-white">Mixing 28mm and 32mm mid-army.</strong> The rules do not care, but the table will look inconsistent. Pick one lane.</li>
            <li><strong class="text-white">Ignoring the base size chart.</strong> It drives the rules — a proxy on the wrong base category changes how it plays.</li>
            <li><strong class="text-white">Over-investing in rank-and-file detail.</strong> Across-the-table models read fine at 0.1mm. Spend detail on heroes and monsters.</li>
          </ul>
        `
      }
    ]
  },
  "fallout-wasteland-warfare": {
    title: "32mm for the whole wasteland",
    intro: "Fallout: Wasteland Warfare is 32mm across every faction — Power Armor, Raiders, and Deathclaws all share one scale. And the weathered post-apocalyptic aesthetic is the most FDM-forgiving look in the hobby.",
    blocks: [
      {
        heading: "One Scale for the Wasteland",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">Every Fallout: Wasteland Warfare miniature is <strong class="text-white">32mm scale</strong>, matching modern Warhammer and Malifaux. The range mixes pre-assembled PVC minis (starter sets) with multi-part resin kits. Creature models like Deathclaws are significantly larger physically, but they hold the same scale as the human characters.</p>
        `
      },
      {
        heading: "Converting 28mm STLs",
        html: `
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-white/5">
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Conversion</th>
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Formula</th>
                  <th scope="col" class="text-right py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Slicer %</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-white/5"><td class="py-2 px-3 text-slate-300">Classic (28mm) → Fallout (32mm)</td><td class="py-2 px-3 font-mono text-slate-500">32 ÷ 28</td><td class="py-2 px-3 text-right font-mono font-bold text-white">114.3%</td></tr>
                <tr><td class="py-2 px-3 text-slate-300">Fallout (32mm) → Classic (28mm)</td><td class="py-2 px-3 font-mono text-slate-500">28 ÷ 32</td><td class="py-2 px-3 text-right font-mono font-bold text-white">87.5%</td></tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        heading: "The Forgiving Weathered Look",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">The post-apocalyptic theme is a gift for FDM printers. Rust, grime, scratches, and radiation damage are thematically correct — they hide layer lines naturally. I lean into weathering on everything and it looks intentional rather than like a print artifact.</p>
        `
      },
      {
        heading: "FDM Settings",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">I print characters at 0.2mm nozzle and 0.06mm layers, and Power Armor suits at 0.08mm with a 0.4mm nozzle — the big flat panels hide the layers well. Terrain, which is a major part of the game, prints great on FDM at 0.1mm layers.</p>
        `
      },
      {
        heading: "Common Fallout Mistakes",
        html: `
          <ul class="space-y-3 text-sm text-slate-300">
            <li><strong class="text-white">Printing "28mm scale" STLs at full size next to official 32mm models.</strong> Use the 114.3% step to sit level with the range.</li>
            <li><strong class="text-white">Painting FDM models clean and pristine.</strong> The layer lines show on flat Power Armor. Weather it and it looks like it belongs in the wasteland.</li>
            <li><strong class="text-white">Skipping terrain.</strong> Ruined buildings and vehicles are a big part of the game and the best FDM print targets in the whole range.</li>
          </ul>
        `
      }
    ]
  },
  "gaslands": {
    title: "1:56 die-cast mayhem",
    intro: "Gaslands is played with Hot Wheels and Matchbox cars, which the rules map to 1:56 — the same ratio as 28mm infantry. The printing fun is the add-ons, not the cars.",
    blocks: [
      {
        heading: "The Die-Cast Convention",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">Gaslands uses modified die-cast cars — Hot Wheels and Matchbox run around 1:64 in real terms, and the game maps them to <strong class="text-white">1:56</strong> so they sit naturally with 28mm infantry. The game uses template-based movement rather than measuring tape, so exact vehicle scale matters less than it does in a measuring game.</p>
        `
      },
      {
        heading: "Adding Infantry and Printed Gear",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">The 1:56 mapping means 28mm infantry and 1:56 vehicles share the same table without looking off. The 3D printing playground is the kitbash gear: weapon mounts, roll cages, armor plates, spike strips, and terrain scatter all print beautifully and bolt onto the die-cast cars.</p>
        `
      },
      {
        heading: "Reference Conversions",
        html: `
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-white/5">
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Conversion</th>
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Formula</th>
                  <th scope="col" class="text-right py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Slicer %</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-white/5"><td class="py-2 px-3 text-slate-300">1:56 vehicle → 28mm infantry</td><td class="py-2 px-3 font-mono text-slate-500">28.0 ÷ 31.3</td><td class="py-2 px-3 text-right font-mono font-bold text-white">89.6%</td></tr>
                <tr class="border-b border-white/5"><td class="py-2 px-3 text-slate-300">1:56 vehicle → 32mm heroic</td><td class="py-2 px-3 font-mono text-slate-500">32.0 ÷ 31.3</td><td class="py-2 px-3 text-right font-mono font-bold text-white">102.4%</td></tr>
                <tr><td class="py-2 px-3 text-slate-300">28mm infantry → 1:35 model kit</td><td class="py-2 px-3 font-mono text-slate-500">50.0 ÷ 28.0</td><td class="py-2 px-3 text-right font-mono font-bold text-white">178.6%</td></tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        heading: "Printing the Kitbash Parts",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">Weapon mounts and spikes are small and get handled constantly, so I print accessories at 0.2mm nozzle and 0.06mm layers, and I lean on resin for the small parts so they survive the game. Terrain scatter is a FDM job at 0.1mm layers. The game rewards creative kitbashing over precision painting, so print liberally.</p>
        `
      },
      {
        heading: "Common Gaslands Mistakes",
        html: `
          <ul class="space-y-3 text-sm text-slate-300">
            <li><strong class="text-white">Treating every die-cast car as exactly 1:56.</strong> Hot Wheels vary. Check the car against your 28mm infantry before you build around it.</li>
            <li><strong class="text-white">Scaling infantry to the car instead of 28mm.</strong> The 1:56 mapping is the convention — infantry stay at 28mm.</li>
            <li><strong class="text-white">Printing the armor plates in brittle PLA.</strong> Parts that glue to die-cast bodies take knocks. Resin or PETG holds up better.</li>
          </ul>
        `
      }
    ]
  },
  "kill-team": {
    title: "40k's skirmish scale — same 32mm",
    intro: "Kill Team is the same 32mm heroic scale as Warhammer 40k, and every operative you print doubles as a 40k model. The difference is the detail budget: fewer models, more per model.",
    blocks: [
      {
        heading: "Same 32mm as 40k",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">Kill Team uses the same <strong class="text-white">32mm heroic scale</strong> as Warhammer 40,000. Every operative you print is fully usable in a standard 40k army at the same base size, and vice versa. The real difference is squad composition — Kill Team fields individual specialists with custom loadouts, so each model carries more personality than a rank-and-file trooper.</p>
        `
      },
      {
        heading: "Detail Per Operative",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">Fewer models means you can afford higher quality per model. Resin is ideal for specialist operatives with fine weapons and accessories. On FDM, a 0.2mm nozzle at 0.06mm layers gets you most of the way there — sniper scopes, cables, and grenades all read cleanly.</p>
        `
      },
      {
        heading: "Converting Classic 28mm STLs",
        html: `
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-white/5">
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Conversion</th>
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Formula</th>
                  <th scope="col" class="text-right py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Slicer %</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-white/5"><td class="py-2 px-3 text-slate-300">Classic (28mm) → Kill Team (32mm)</td><td class="py-2 px-3 font-mono text-slate-500">32 ÷ 28</td><td class="py-2 px-3 text-right font-mono font-bold text-white">114.3%</td></tr>
                <tr><td class="py-2 px-3 text-slate-300">Kill Team (32mm) → Classic (28mm)</td><td class="py-2 px-3 font-mono text-slate-500">28 ÷ 32</td><td class="py-2 px-3 text-right font-mono font-bold text-white">87.5%</td></tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        heading: "Terrain-Heavy Boards",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">Kill Team boards are terrain-heavy — ruined walls, walkways, and scatter dominate the table. This is pure FDM territory: 0.4mm nozzle at 0.1mm layers, and you can churn out a full board in a weekend. Print terrain for speed and the operatives for detail.</p>
        `
      },
      {
        heading: "Common Kill Team Mistakes",
        html: `
          <ul class="space-y-3 text-sm text-slate-300">
            <li><strong class="text-white">Printing "28mm true scale" operatives at full size.</strong> They will sit short next to official 32mm Kill Team models — use the 114.3% step.</li>
            <li><strong class="text-white">A 0.4mm nozzle on specialist faces.</strong> These are character models. Use a 0.2mm nozzle or resin.</li>
            <li><strong class="text-white">Forgetting your Kill Team doubles as a 40k force.</strong> Match the scale you play in both games or you will reprint everything.</li>
          </ul>
        `
      }
    ]
  },
  "necromunda": {
    title: "32mm gangers in the underhive",
    intro: "Necromunda is 32mm like 40k, but the game lives in gang identity — faces, gear, and the vertical industrial board. Printing proxies is about character detail and terrain volume.",
    blocks: [
      {
        heading: "The 32mm Gang Standard",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">Necromunda uses the same <strong class="text-white">32mm heroic scale</strong> as Warhammer 40,000. Gangers, hangers-on, and hired guns all sit at 32mm. The size differences you see between gangs — Goliaths are massive brutes, Eschers are lean, Van Saars are tech-heavy — are design choices, not scale drift. All of them share the same eye-level reference.</p>
        `
      },
      {
        heading: "Converting Classic 28mm Gangers",
        html: `
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-white/5">
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Conversion</th>
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Formula</th>
                  <th scope="col" class="text-right py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Slicer %</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-white/5"><td class="py-2 px-3 text-slate-300">Classic (28mm) → Necromunda (32mm)</td><td class="py-2 px-3 font-mono text-slate-500">32 ÷ 28</td><td class="py-2 px-3 text-right font-mono font-bold text-white">114.3%</td></tr>
                <tr><td class="py-2 px-3 text-slate-300">Necromunda (32mm) → Classic (28mm)</td><td class="py-2 px-3 font-mono text-slate-500">28 ÷ 32</td><td class="py-2 px-3 text-right font-mono font-bold text-white">87.5%</td></tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        heading: "Faces and Individual Characters",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">Every ganger is a character — Necromunda campaigns build stories around individual models. I print gangers at 0.2mm nozzle and 0.06mm layers so the faces read, and I recommend resin for the gangers themselves. The models have distinctive silhouettes and a lot of small gear detail that FDM softens.</p>
        `
      },
      {
        heading: "Vertical Terrain",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">Necromunda is a vertical game. Sector Mechanicus platforms, pipe networks, and walkways dominate the board — and you need a lot of it. This is where FDM shines: 0.4mm nozzle at 0.1mm layers and you can build out a multi-level board in reasonable time. FDM for the board, resin for the gangers is the split I use.</p>
        `
      },
      {
        heading: "Common Necromunda Mistakes",
        html: `
          <ul class="space-y-3 text-sm text-slate-300">
            <li><strong class="text-white">Printing different gangs at different scales.</strong> The whole game lives in the underhive together — keep every gang at 32mm.</li>
            <li><strong class="text-white">FDM for the gangers.</strong> The gear and faces are the selling point. Resin them.</li>
            <li><strong class="text-white">Underestimating terrain volume.</strong> The board is half the game and eats plastic by the plateful. Budget for it.</li>
          </ul>
        `
      }
    ]
  },
  "warcry": {
    title: "32mm warbands, fast fantasy skirmish",
    intro: "Warcry is 32mm like Age of Sigmar, and warband play means a handful of models per side — easy to print at high quality without a huge time investment.",
    blocks: [
      {
        heading: "Same 32mm as AoS",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">Warcry uses the same <strong class="text-white">32mm heroic scale</strong> as Age of Sigmar, and the models are fully interchangeable at the same base size. The warband format means you need a fraction of the models of a full AoS army — a dozen fighters per warband is typical. That makes it an excellent entry point for 3D printing a complete collection.</p>
        `
      },
      {
        heading: "Converting Classic 28mm Fantasy",
        html: `
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-white/5">
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Conversion</th>
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Formula</th>
                  <th scope="col" class="text-right py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Slicer %</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-white/5"><td class="py-2 px-3 text-slate-300">Classic (28mm) → Warcry (32mm)</td><td class="py-2 px-3 font-mono text-slate-500">32 ÷ 28</td><td class="py-2 px-3 text-right font-mono font-bold text-white">114.3%</td></tr>
                <tr><td class="py-2 px-3 text-slate-300">Warcry (32mm) → Classic (28mm)</td><td class="py-2 px-3 font-mono text-slate-500">28 ÷ 32</td><td class="py-2 px-3 text-right font-mono font-bold text-white">87.5%</td></tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        heading: "FDM Settings for Warbands",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">Warband characters print well on FDM at 0.2mm nozzle and 0.06mm layers. Rank-and-file fighters tolerate a 0.4mm nozzle at 0.08mm layers. Since the model count is low, running everything at the fine settings is affordable — I usually split the difference and fine-print the leaders only.</p>
        `
      },
      {
        heading: "Dramatic Terrain",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">Warcry boards are terrain-heavy and dramatic — ruined temples, chaos shrines, and rocky outcrops are as much a part of the game as the fighters. All of it is excellent FDM territory at 0.4mm nozzle and 0.1mm layers. Build the battlefield on FDM and resin the warband.</p>
        `
      },
      {
        heading: "Common Warcry Mistakes",
        html: `
          <ul class="space-y-3 text-sm text-slate-300">
            <li><strong class="text-white">Mixing 28mm Old World models with 32mm warband fighters.</strong> In a small skirmish game the size gap reads fast. Keep the warband in one lane.</li>
            <li><strong class="text-white">Scaling by bounding box.</strong> Dynamic poses with sweeping weapons inflate the box. Measure foot to eye.</li>
            <li><strong class="text-white">Over-engineering rank-and-file prints.</strong> Warcry's best quality-per-model ratio is on leaders and champions, not the chaff.</li>
          </ul>
        `
      }
    ]
  },
  "star-wars-x-wing": {
    title: "1:27 ships, no infantry to confuse the math",
    intro: "X-Wing is pure ship scale — 1:27 ratio, with no infantry to muddy the reference. It is the cleanest conversion on the site, and the printing advice is all about smooth hulls and big build plates.",
    blocks: [
      {
        heading: "The 1:27 Convention",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">X-Wing is <strong class="text-white">1:27 ratio scale</strong>, used across every ship in the game — no infantry at all. For a human-sized reference that works out to roughly 59.3mm eye level and 64.8mm to the top of the head. Ships range from a TIE Fighter you can hold in your palm to the Millennium Falcon that fills most of the table, so the math stays clean but the print sizes swing wildly.</p>
        `
      },
      {
        heading: "Printing the Ships",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">1:27 ships are large enough for FDM to handle detail well. I use a 0.2mm nozzle at 0.08mm layers for cockpit glass, panel lines, and engine details, and a 0.4mm nozzle at 0.12mm layers for large ships like the Falcon when speed matters. Star Wars hulls are smooth and show layer lines easily, so print at the finest layer height you have patience for, and orient engines and cockpits upward to keep supports on hidden undersides.</p>
        `
      },
      {
        heading: "Reference Conversions",
        html: `
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-white/5">
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Conversion</th>
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Formula</th>
                  <th scope="col" class="text-right py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Slicer %</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-white/5"><td class="py-2 px-3 text-slate-300">1:48 → 1:35 (quarter scale up)</td><td class="py-2 px-3 font-mono text-slate-500">50.0 ÷ 36.5</td><td class="py-2 px-3 text-right font-mono font-bold text-white">137.1%</td></tr>
                <tr><td class="py-2 px-3 text-slate-300">1:72 → 1:35 (small scale up)</td><td class="py-2 px-3 font-mono text-slate-500">50.0 ÷ 24.3</td><td class="py-2 px-3 text-right font-mono font-bold text-white">205.7%</td></tr>
              </tbody>
            </table>
          </div>
          <p class="text-sm text-slate-400 leading-relaxed mt-4">There is no validated 1:27-to-1:35 pair in the matrix, so when I scale a Bandai or Revell ship kit (1:48) I use the 137.1% reference step and verify against an official X-Wing model.</p>
        `
      },
      {
        heading: "Matching the Pre-Painted Plastic",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">The best reference is an official ship on your shelf. Measure its hull length with calipers and scale your printed ship to match — the labels on ship STLs vary as much as any other range. Before you slice a big Rebel Transport or Star Destroyer, check the bed dimensions: these prints can be wide as well as long.</p>
        `
      },
      {
        heading: "Common X-Wing Mistakes",
        html: `
          <ul class="space-y-3 text-sm text-slate-300">
            <li><strong class="text-white">Treating the scale like an infantry scale.</strong> X-Wing is 1:27 ship ratio — the 28mm/32mm conventions do not apply.</li>
            <li><strong class="text-white">Scaling every ship to the same length.</strong> Weight and class differences are part of the game's balance. Match each hull to its official model.</li>
            <li><strong class="text-white">Forgetting the bed on large ships.</strong> The Falcon and its friends are wide prints. Check bed orientation before slicing.</li>
          </ul>
        `
      }
    ]
  },
  "conquest": {
    title: "35mm mass battle — a head taller than GW",
    intro: "Conquest is 35mm, the same lane as Star Wars: Legion, and noticeably bigger than 32mm Warhammer. For an army that is a feature — it just means your conversions have to respect the lane.",
    blocks: [
      {
        heading: "Conquest in the 35mm Lane",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">Conquest is <strong class="text-white">35mm scale</strong>, the same as Star Wars: Legion. The miniatures use more realistic proportions than Games Workshop's heroic 32mm, and they stand noticeably taller next to GW models. Parabellum built the range for rank-and-file mass battle with an alternating activation twist, so the 35mm presence is part of the army identity.</p>
        `
      },
      {
        heading: "Converting from 32mm GW",
        html: `
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-white/5">
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Conversion</th>
                  <th scope="col" class="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Formula</th>
                  <th scope="col" class="text-right py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Slicer %</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-white/5"><td class="py-2 px-3 text-slate-300">GW (32mm) → Conquest (35mm)</td><td class="py-2 px-3 font-mono text-slate-500">35.0 ÷ 32.0</td><td class="py-2 px-3 text-right font-mono font-bold text-white">109.4%</td></tr>
                <tr><td class="py-2 px-3 text-slate-300">Conquest (35mm) → GW (32mm)</td><td class="py-2 px-3 font-mono text-slate-500">32.0 ÷ 35.0</td><td class="py-2 px-3 text-right font-mono font-bold text-white">91.4%</td></tr>
              </tbody>
            </table>
          </div>
          <p class="text-sm text-slate-400 leading-relaxed mt-4">If you are mixing Conquest with a 32mm game, scale the Conquest models down at 91.4% to match.</p>
        `
      },
      {
        heading: "Down to Classic 28mm",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">Bringing Conquest proxies down to the classic 28mm lane is a 80.0% step. It is a large drop, so I check the proportions after scaling — realistic 35mm sculpts hold their detail well, but armor trim and faces need a re-look at the smaller size.</p>
        `
      },
      {
        heading: "FDM Settings",
        html: `
          <p class="text-sm text-slate-400 leading-relaxed mb-4">The 35mm scale gives you more canvas for detail than 32mm. I print characters and unit champions at 0.2mm nozzle and 0.06mm layers, rank-and-file troops at 0.4mm nozzle and 0.08mm, and large monsters and cavalry at 0.1mm — the bigger scale means fewer visible layer lines even at moderate settings.</p>
        `
      },
      {
        heading: "Common Conquest Mistakes",
        html: `
          <ul class="space-y-3 text-sm text-slate-300">
            <li><strong class="text-white">Scaling Conquest down to 32mm.</strong> You lose the range's presence next to its peers. If it must mix, accept the visible step at 91.4%.</li>
            <li><strong class="text-white">Mixing with AoS 32mm and wondering why Conquest looks big.</strong> It is. The lane is 35mm.</li>
            <li><strong class="text-white">Measuring to the top of a helmet.</strong> Eye level is the reference — helmeted rank-and-file make this easy to get wrong.</li>
          </ul>
        `
      }
    ]
  }
};

export function gameGuideSearch(slug) {
  const guide = gameGuides[slug];
  if (!guide) return '';
  return `${guide.title} ${guide.blocks.map((b) => b.heading).join(' ')}`;
}
