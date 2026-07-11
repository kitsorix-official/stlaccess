// src/data/faqContent.js
// Single source of truth for all FAQ data across the site.

export const faqData = [
  {
    category: "Methodology",
    questions: [
      {
        q: "Do you measure miniatures to the eyes or to the top of the head?",
        a: `I measure to the <span class="text-[#ff6b35] font-semibold">eyes at 160cm</span> on a 175cm human baseline. This is what most of the fantasy and sci-fi hobby uses because helmets, top-knots, and headgear vary. Historical military kits often use top-of-head (175cm). The stlscale converter lets you pick either method.`,
      },
      {
        q: "Why is scale so inconsistent between manufacturers?",
        a: `Because nobody agreed on where to put the ruler. Some sculptors measure to the eyes, some to the crown. Some account for base thickness, some do not. A "28mm" miniature from 2010 is often smaller than a "28mm" miniature from 2024. I built the <span class="text-[#ff6b35] font-semibold">175cm human baseline</span> to cut through the noise and give everyone the same starting point.`,
      },
      {
        q: "Can a 28mm and 32mm miniature be the same physical size?",
        a: `Sometimes. A 28mm miniature measured to the eyes is roughly 30-32mm to the top of the head once you add the forehead and a helmet. So a "28mm" figure can stand 32mm tall. This is why labels are unreliable. Measure the eye level with <span class="text-[#ff6b35] font-semibold">digital calipers</span> if you want to know what you actually have.`,
      },
      {
        q: "How do I check scale without printing the whole model?",
        a: `Import the STL into your slicer and measure the eye height against the 175cm baseline. For a 28mm figure, the eyes should sit at <span class="text-[#ff6b35] font-semibold">28mm above the base</span>. For 32mm, 32mm. If the model has a dynamic pose with a raised weapon, measure from the foot contact point to the eyes, not from the lowest point of the bounding box.`,
      },
    ]
  },
  {
    category: "Sci-fi and fantasy",
    questions: [
      {
        q: "Are Primaris Space Marines 32mm or 28mm?",
        a: `Primaris models are <span class="text-[#ff6b35] font-semibold">32mm to the top of the head</span>, which is roughly 28mm to the eyes. This matches the standard 1:56 ratio. They are taller than older "Firstborn" Marines because the legs and torsos are proportioned like a real human, not compressed.`,
      },
      {
        q: "Does '32mm' mean model height or base diameter?",
        a: `It usually means model height, but Games Workshop also uses 32mm as a <span class="text-[#ff6b35] font-semibold">base diameter</span> for newer models. Do not confuse the two. A 32mm base is a plastic disc. A 32mm model is the figure standing on it. The stlscale converter handles height, not base size.`,
      },
      {
        q: "Can I use the same STL file for both 28mm and 32mm games?",
        a: `No. A file designed for 28mm will look like a child next to 32mm figures, and a 32mm file will tower over 28mm ones. You need to scale it. Use <span class="text-[#ff6b35] font-semibold">114.3%</span> to go from 28mm to 32mm, or <span class="text-[#ff6b35] font-semibold">87.5%</span> to go the other way. The proportions also change: 32mm heroic has bigger heads and hands relative to the body.`,
      },
      {
        q: "How do I mix Necromunda models (32-35mm) with standard 28mm?",
        a: `Scale the Necromunda models down to 87.5% to match 28mm, or scale your 28mm collection up to 114.3% to match 32mm. Do not mix them without scaling. A 35mm Necromunda ganger next to a 28mm Guardsman looks like a giant. I have made this mistake. It is fixable, but you need to commit to one baseline for the whole force.`,
      },
    ]
  },
  {
    category: "Historical and vehicles",
    questions: [
      {
        q: "What vehicle scale works with 28mm Bolt Action infantry?",
        a: `Officially 1:56. In practice, <span class="text-[#ff6b35] font-semibold">1:48 Tamiya kits</span> often look better because modern Bolt Action plastics are closer to 30-32mm than true 28mm. A true 1:56 tank looks small next to chunky heroic infantry. Try both if you have them. I use 1:48 for my Bolt Action motor pool and nobody has complained at tournaments.`,
      },
      {
        q: "Will 1:48 infantry look too tall next to 28mm figures?",
        a: `Yes. True 1:48 figures are about 35mm tall. They will tower over 28mm tabletop miniatures. If you have 1:48 figures you want to use, scale them down to <span class="text-[#ff6b35] font-semibold">76.8%</span> to match 28mm eye level. Or just use them as officers and heroes who are supposed to be tall.`,
      },
      {
        q: "Why are there so few 1:56 vehicle STLs available?",
        a: `Most historical vehicle designers work in 1:35 for traditional model kits. 1:56 is a wargaming niche. You can downscale a 1:35 vehicle STL to <span class="text-[#ff6b35] font-semibold">62.5%</span> to get a 1:56 equivalent. On FDM the detail may soften at that reduction, but a 0.2mm nozzle helps preserve it.`,
      },
    ]
  },
  {
    category: "FDM printing and slicers",
    questions: [
      {
        q: "Should I scale by bounding box height?",
        a: `No. A model with a raised sword or horn will have a tall bounding box that has nothing to do with the figure's actual scale. Always measure from <span class="text-[#ff6b35] font-semibold">foot contact point to eye level</span>. Ignore weapons, banners, and dynamic poses. The stlscale converter uses this foot-to-eye method automatically.`,
      },
      {
        q: "Does FDM filament shrink and affect scale?",
        a: `PLA and PETG can shrink <span class="text-[#ff6b35] font-semibold">0.2% to 0.5%</span> as they cool from printing temperature. This is small enough that it rarely matters for miniature scaling, but if you need maximum accuracy, print a temperature tower and measure the result. I do not add compensation for FDM because over-extrusion and cooling shrinkage tend to cancel each other out.`,
      },
      {
        q: "Can FDM print miniatures at 28mm and 32mm scale?",
        a: `Yes. FDM at 28mm and 32mm works well with a <span class="text-[#ff6b35] font-semibold">0.2mm nozzle</span> at 0.06mm layer height. The detail is good enough for tabletop use. With a 0.4mm nozzle at 0.1mm layers, faces lose definition but armour, weapons, and terrain still look great. I print all my own models on a <span class="text-[#ff6b35] font-semibold">Bambu Lab A1 Mini</span> with PLA. The percentages on this site match what I get on my own prints.`,
      },
      {
        q: "Which slicer should I use for scale conversions?",
        a: `<span class="text-[#ff6b35] font-semibold">Bambu Studio</span>, <span class="text-[#ff6b35] font-semibold">PrusaSlicer</span>, and <span class="text-[#ff6b35] font-semibold">Cura</span> all have a uniform scale field. Enter the percentage from stlscale, lock the XYZ proportions, and slice. The math is the same in every slicer. For FDM, check the preview before slicing — supports can add a few millimeters to the bounding box.`,
      },
    ]
  },
];
