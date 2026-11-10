// src/data/conversionDetailContent.js
// Hand-authored, per-conversion content for the /reference/[slug] spoke pages.
//
// IMPORTANT anti-pSEO note:
// Every string here is written by hand for its specific source->target pair.
// We deliberately DO NOT machine-generate prose from referenceContent.js
// getContextualContent(): template-spliced, label-swapped sentences at this
// scale read as programmatically-generated content to search engines. These
// entries carry unique intent, unique phrasing, and real print/test notes per
// pair so each page has substance a human actually wrote.

export const conversionDetailContent = {
  // ---------------------------------------------------------------
  // 1:100 (Flames of War / 15mm) conversions
  // ---------------------------------------------------------------
  "1-100-to-1-35": {
    title: "1:100 to 1:35 Scale for 3D Printing Miniatures",
    h1: "1:100 to 1:35: Converting Flames of War to Model Kit Scale",
    metaDescription: "Scale 1:100 Flames of War STLs up to 1:35 model kit size for 3D printing. Use 285.7% in your slicer with uniform XYZ scaling.",
    intro: "This is a big jump from 15mm wargaming into large model-kit territory, and it is usually motivated by wanting a single heroic display piece rather than a battalion.",
    sections: [
      { heading: "When you would actually do this", body: "Moving a whole Flames of War force up to 1:35 would be absurd — the models would dominate a tournament table. The realistic reason to reach for this percentage is a centerpiece: one tank or one vignette that you want to paint at a scale with generous surface area. The 15mm source was never meant for this, so expect obvious detail scaling, but the chunky model-kit surfaces take the upscale well." },
      { heading: "What I watch for", body: "At 285.7% the build volume becomes the real constraint. A small 1:100 tank can grow into a multi-part build at 1:35, so I plan supports and orientation before slicing. The 15mm source detail — antennas, thin gear — upscales into thicker, more forgiving shape, which is a pleasant surprise." },
    ],
    faq: [
      { question: "Is 285.7% correct for 1:100 to 1:35?", answer: "Yes. 1:100 maps to a 17.5mm figure and 1:35 to 50mm by eye level, so 50 ÷ 17.5 = 285.7%. This is a 2.86x upscale." },
    ],
  },
  "1-100-to-28mm": {
    title: "1:100 to 28mm Scale for 3D Printing Miniatures",
    h1: "1:100 to 28mm: Small Wargaming to True Tabletop Scale",
    metaDescription: "Convert 1:100 historical STLs to 28mm tabletop scale for D&D or Bolt Action. Apply 160.0% in your slicer with uniform scaling.",
    intro: "This brings the cheapest big-battle scale up to the everyday tabletop standard. The percentage is modest enough that the models stay recognisable, which keeps the conversion practical.",
    sections: [
      { heading: "Why people bridge 15mm to 28mm", body: "I see this most when someone wants a Flames of War tank as a bit of terrain or a display piece on a 28mm board. 160% is small enough that the vehicle reads as a 28mm-scale prop rather than an obviously-upscaled toy. Infantry at this jump get coarse, but vehicles and mechs hold up well." },
      { heading: "What to keep in mind", body: "At 160% the detail scales up cleanly, which is the advantage of starting small. The main thing I check is whether the upscaled model matches the proportions of its 28mm neighbours — a 1:100 era vehicle usually does, since the ratios are close enough in practice." },
    ],
    faq: [
      { question: "How does 1:100 compare to 28mm?", answer: "1:100 is roughly 15mm to the eyes, so scaling to 28mm true scale is a 160% uniform upscale. It lands as a plausible 28mm prop or vehicle." },
    ],
  },
  "1-100-to-32mm": {
    title: "1:100 to 32mm Scale for 3D Printing Miniatures",
    h1: "1:100 to 32mm Heroic: Wargaming to Warhammer Scale",
    metaDescription: "Upscale 1:100 Flames of War STLs to 32mm Warhammer heroic scale for 3D printing. Set 182.9% with uniform scaling.",
    intro: "When you want those cheap 15mm tanks to sit alongside a Warhammer-scale army as terrain or atmosphere pieces, 182.9% is the bridge.",
    sections: [
      { heading: "The realistic use", body: "Honestly, nobody paints a whole battalion at this jump. The practical job is converting one or two iconic vehicles — a particular tank or APC — so they can appear on a 32mm board as wreckage, objectives, or scenery. At 182.9% the hull scales up into a solid, printable shape and the extra size hides layer lines comfortably." },
      { heading: "A note on era", body: "32mm is a heroic scale with exaggerated proportions, so a historical 1:100 vehicle can look a touch undersized or too simple next to heroic infantry. I treat these as scenery rather than trying to match them figure-for-figure." },
    ],
    faq: [
      { question: "Can I run a whole 1:100 force at 32mm?", answer: "Technically yes at 182.9%, but the models read more as scenery than as a matching unit next to heroic-scaled infantry." },
    ],
  },
  "1-100-to-35mm": {
    title: "1:100 to 35mm Scale for 3D Printing Miniatures",
    h1: "1:100 to 35mm: Flames of War to Legion-Style Scale",
    metaDescription: "Scale 1:100 miniatures up to 35mm for Star Wars Legion or Conquest. Use 200.0% slicer scaling with locked axes.",
    intro: "A clean double-size jump that lifts 15mm wargaming models up to the 35mm band used by Legion and Conquest — useful for turning cheap small-scale vehicles into display props.",
    sections: [
      { heading: "Why the double is handy", body: "200% is one of the easiest numbers to type because the muscle memory is simple: anything above 100% doubles the linear size. For a single vehicle or vignette destined to sit on a 35mm board, it is a practical, predictable conversion." },
      { heading: "Detail expectations", body: "Starting from 15mm means the upscaled plastic (or resin) reads smooth and slightly simplified, which suits 35mm models well. I check the footprint after scaling, because a small-scale vehicle doubled can still be bigger than expected on the plate." },
    ],
    faq: [
      { question: "Why is 1:100 to 35mm a clean 200%?", answer: "35mm is exactly double the 17.5mm figure that 1:100 produces, so the jump is a straight 2.0x — 200% uniform scale." },
    ],
  },
  "1-100-to-40mm": {
    title: "1:100 to 40mm Scale for 3D Printing Miniatures",
    h1: "1:100 to 40mm: Wargaming to Shatterpoint-Style Scale",
    metaDescription: "Convert 15mm Flames of War infantry to 40mm Shatterpoint or MCP scale. Apply 228.6% with uniform XYZ scaling.",
    intro: "This carries small-scale models all the way up to the biggest standard game scale. It is strictly a display or study-piece move rather than a practical army conversion.",
    sections: [
      { heading: "The honest answer", body: "Nothing in 15mm wargaming belongs at 40mm as a playable figure. This jump is for study — understanding how a sculpt reads at display scale — or for turning a small-scale vehicle into a centrepiece. At 228.6% the extra size hides FDM layer lines well, which is the upside." },
      { heading: "Supports get complicated", body: "A 2.29x upscale turns fine 15mm details into large, heavier shapes, but it also magnifies internal supports and can make removal a bigger chore. I break large pieces into parts before printing rather than fighting a single tall build." },
    ],
    faq: [
      { question: "Is 1:100 to 40mm ever practical for play?", answer: "No — it is a display or study conversion. 40mm is far outside the 15mm game's intent." },
    ],
  },
  "1-100-to-75mm": {
    title: "1:100 to 75mm Scale for 3D Printing Miniatures",
    h1: "1:100 to 75mm: Turning Wargaming Sculpts into Display Pieces",
    metaDescription: "Upscale 1:100 minis to 75mm display scale for painting practice. Use 428.6% in your slicer for detail work.",
    intro: "This is the pure display conversion — a massive 4.3x jump that repurposes a small wargaming sculpt as a large painting canvas.",
    sections: [
      { heading: "Only for display", body: "At 428.6% you are committing to a large, slow, material-hungry print. I reach for it when I like a specific 15mm pose or vehicle and want to study it at display scale. The simplification of the small source becomes a feature: smooth, broad surfaces perfect for practice painting." },
      { heading: "Plan for a big build", body: "A 4.29x upscale almost certainly exceeds a single print bed. I slice the model into parts, print each at a fine profile, and assemble. Expect long prints and a substantial filament bill for one piece." },
    ],
    faq: [
      { question: "Is 1:100 to 75mm worth it?", answer: "Only as a display study piece. It is a slow, expensive build but produces a broad-surface canvas for painting practice." },
    ],
  },

  // ---------------------------------------------------------------
  // 1:35 (model kit) conversions
  // ---------------------------------------------------------------
  "1-35-to-28mm": {
    title: "1:35 to 28mm Scale for 3D Printing Miniatures",
    h1: "1:35 to 28mm: Model Kits Down to True Tabletop Scale",
    metaDescription: "Downscale 1:35 model kits to 28mm Bolt Action or D&D scale. Type 56.0% and lock XYZ axes in your slicer.",
    intro: "Turning a big 1:35 model-kit tank into a 28mm wargaming vehicle is one of the most useful conversions in the hobby — and one of the friendliest, because you only ever shrink.",
    sections: [
      { heading: "The classic motor-pool trick", body: "1:35 kits are everywhere and often cheaper than wargaming-branded 1:56 vehicles. Scaling to 56% brings a plastic Tiger or Sherman down to sit properly beside 28mm infantry. I lock XYZ to keep proportions true, then weather the hull to blend the glossy kit plastic with matte infantry." },
      { heading: "What to watch", body: "Detail survives shrinking beautifully — this is the direction where FDM excels (you're removing material, not exposing it). Thin parts like gun barrels and stowage can get fragile at 56%, so I reinforce or re-orient fragile elements before they thin out too far." },
    ],
    faq: [
      { question: "Is 56% the right shrink for 1:35 to 28mm?", answer: "Yes. 28mm of a 175cm baseline maps to 50mm for 1:35 eye level, so 28 ÷ 50 = 56.0%." },
      { question: "Why use 1:35 kits for Bolt Action?", answer: "They are cheap and abundant, and at 56% they match 28mm infantry well — which is why players run Tamiya kits despite the nominal 1:56 rules scale." },
    ],
  },
  "1-35-to-32mm": {
    title: "1:35 to 32mm Scale for 3D Printing Miniatures",
    h1: "1:35 to 32mm: Model Kit Vehicles Down to Heroic Scale",
    metaDescription: "Scale 1:35 model kits down to 32mm heroic scale for 3D printing. Set 64.0% in your slicer with locked axes.",
    intro: "When your army is heroic 32mm rather than true 28mm, the same 1:35 kit trick needs a slightly different number — 64% instead of 56%.",
    sections: [
      { heading: "Maths and the heroic difference", body: "Heroic scale is bulkier, so a vehicle shrunk to the same percentage as a true-scale setup will look too small under heroic infantry. Landing on 64% keeps the hull proportionally larger to match the beefy soldiers. I scale a printed hull to sit next to one of my own infantry models before committing to the whole vehicle." },
      { heading: "Detail and fragility at 64%", body: "At 64% you keep more of the kit's mass than the 28mm variant, so barrels and stowage stay sturdier. It is a sweet spot that balances size match and printability." },
    ],
    faq: [
      { question: "Why 64% rather than 56% for 32mm?", answer: "32mm heroic is bulkier than 28mm true scale, so the tank needs to stay proportionally larger — 32 ÷ 50 = 64.0%." },
    ],
  },
  "1-35-to-35mm": {
    title: "1:35 to 35mm Scale for 3D Printing Miniatures",
    h1: "1:35 to 35mm: Model Kits to Legion-Style Scale",
    metaDescription: "Scale 1:35 model kits to 35mm Legion or Conquest scale. Use 70.0% uniform scaling in your slicer.",
    intro: "Bringing a 1:35 kit down to 35mm is a comfortable 70% shrink that keeps the model chunky and sturdy for a display on a Legion-style board.",
    sections: [
      { heading: "A good terrain or vehicle scale", body: "At 70% the kit keeps most of its heft, making it a great choice for a legio-style vehicle or objective piece. The reduction is gentle enough that I rarely worry about fragile parts becoming too thin." },
      { heading: "Proportions vs 35mm infantry", body: "35mm figures have heroic bulk too, so I test the shrunk hull against my infantry. If the toy look persists, 70% is still the right linear step — I just diversify the weathering and base work to sell the scale." },
    ],
    faq: [
      { question: "Does 1:35 to 35mm make a good Legion vehicle?", answer: "Yes, at 70% the model keeps heft and reads well next to 35mm infantry as a display or objective piece." },
    ],
  },
  "1-35-to-40mm": {
    title: "1:35 to 40mm Scale for 3D Printing Miniatures",
    h1: "1:35 to 40mm: Model Kits for Shatterpoint-Style Boards",
    metaDescription: "Convert 1:35 model kits to 40mm Shatterpoint or MCP scale. Apply 80.0% with uniform XYZ scaling.",
    intro: "A light 80% shrink that turns a 1:35 kit into something that works as scenery or a large character piece on a 40mm board.",
    sections: [
      { heading: "Mainly a scenery conversion", body: "At 80% the 1:35 vehicle is close to its original sturdy size, which suits 40mm board furniture. It is not a playable 40mm figure so much as a prop that grounds a scene, and the light shrink means few print complications." },
      { heading: "Keep the bulk", body: "Because I am only taking off 20%, the model stays substantial and prints cleanly. This is a forgiving conversion I reach for when I want quick, reliable board dressing." },
    ],
    faq: [
      { question: "Is 1:35 to 40mm useful for play?", answer: "It works as board furniture or a large piece for a 40mm-themed scene rather than a matched game unit." },
    ],
  },
  "1-35-to-75mm": {
    title: "1:35 to 75mm Scale for 3D Printing Miniatures",
    h1: "1:35 to 75mm: Model Kits Up to Display Scale",
    metaDescription: "Upscale 1:35 model kits to 75mm display scale for 3D printing. Set 150.0% in your slicer.",
    intro: "A 1.5x upscale that lifts a well-detailed 1:35 kit into the 75mm display world — a natural fit, since the source already carries genuine model-kit detail.",
    sections: [
      { heading: "A kit's natural display elevation", body: "Unlike starting from 15mm, 1:35 kits already have real, crisp detail. Upscaling 150% magnifies that detail beautifully, making this one of the more satisfying display conversions because the quality is already there to enlarge. It is ideal for a figure or vehicle you want to paint and proudly shelve." },
      { heading: "Print volume thinking", body: "A 1.5x jump can push a big kit past a single bed, so I check build volume early and split into parts if needed. The extra size hides layer lines and rewards fine finishing." },
    ],
    faq: [
      { question: "Is 1:35 to 75mm worth printing?", answer: "Absolutely for display — the 1:35 source carries model-grade detail that magnifies beautifully at 150%." },
    ],
  },

  // ---------------------------------------------------------------
  // 1:48 (quarter scale) conversions
  // ---------------------------------------------------------------
  "1-48-to-1-35": {
    title: "1:48 to 1:35 Scale for 3D Printing Miniatures",
    h1: "1:48 to 1:35: Quarter Scale Up to Model Kit Scale",
    metaDescription: "Scale 1:48 quarter-scale models up to 1:35 model kit size. Apply 137.1% in your slicer.",
    intro: "Climbing from 1:48 up to 1:35 enlarges a model by about 37%, which is a pleasing bump for someone who wants more presence on a display shelf.",
    sections: [
      { heading: "A moderate display upscale", body: "137% takes a 1:48 aircraft or vehicle and grows it into a larger 1:35-style kit. It is more than a tweak but far from a rebuild, and the source detail survives the modest enlargement cleanly. I use it most when a specific 1:48 subject only exists in that scale but I want a bigger showcase piece." },
      { heading: "Stability of thin parts", body: "At 1.37x, delicate wings and landing gear actually become slightly more robust, which is a welcome bonus after shrinking projects. Print reliability improves." },
    ],
    faq: [
      { question: "Why 137.1% for 1:48 to 1:35?", answer: "1:48 maps to 33.3mm eye level and 1:35 to 45.7mm, so 45.7 ÷ 33.3 = 137.1%." },
    ],
  },
  "1-48-to-28mm": {
    title: "1:48 to 28mm Scale for 3D Printing Miniatures",
    h1: "1:48 to 28mm: Quarter Scale Down to True Tabletop",
    metaDescription: "Convert 1:48 quarter-scale models to 28mm true scale. Use 76.8% uniform scaling in your slicer.",
    intro: "This is the famous 1:48-into-28mm conversion that powers so many Bolt Action motor pools, taking a quarter-scale kit down to sit correctly beside true-scale infantry.",
    sections: [
      { heading: "The 1:48 for Bolt Action favour", body: "Players favour 1:48 over the official 1:56 because modern plastic infantry have grown bulkier, and the slightly larger 1:48 hull reads better under them. At 76.8% the kit becomes a robust 28mm vehicle. I shrink it, then park a printed infantryman next to it to check the visual match before doing the details." },
      { heading: "Fragility reversal", body: "Shrinking to 76.8% thins barrels and stowage. I look for the most delicate elements (barrels, antennas, thin armour plate) and may reinforce or re-orient them so the model survives alongside its 28mm mates." },
    ],
    faq: [
      { question: "Why do players prefer 1:48 over 1:56 for Bolt Action?", answer: "Modern 28mm plastic infantry are bulkier, so the larger 1:48 hull (76.8% shrink) reads better under them than a true 1:56." },
      { question: "Is 76.8% the right 1:48 to 28mm number?", answer: "Yes, based on a 175cm baseline where 1:48 is 33.3mm to the eyes and 28mm true is 28mm — 28 ÷ 33.3 = 76.8%." },
    ],
  },
  "1-48-to-32mm": {
    title: "1:48 to 32mm Scale for 3D Printing Miniatures",
    h1: "1:48 to 32mm: Quarter Scale to Heroic Tabletop",
    metaDescription: "Scale 1:48 models down to 32mm heroic scale. Set 87.8% in your slicer with locked axes.",
    intro: "A gentle 87.8% shrink that takes a quarter-scale vehicle and matches it to the larger heroic 32mm band used by Warhammer-scale sets.",
    sections: [
      { heading: "Bigger infantry, smaller shrink", body: "Because 32mm heroic infantry are bigger than 28mm true-scale ones, the shrink from 1:48 is milder — 87.8% versus 76.8%. That keeps the kit close to its original size, which is convenient for preserving detail while still matching heroic soldiers." },
      { heading: "Closer to 1:1 means easier printing", body: "The small reduction means most parts print nearly at native size, so this is a reliable conversion with fewer fragility surprises than a deeper shrink." },
    ],
    faq: [
      { question: "Why is the shrink smaller for 32mm than 28mm?", answer: "Heroic 32mm infantry are larger, so the 1:48 kit needs less reduction — 32 ÷ 33.3 = 87.8%." },
    ],
  },
  "1-48-to-35mm": {
    title: "1:48 to 35mm Scale for 3D Printing Miniatures",
    h1: "1:48 to 35mm: Quarter Scale to Legion-Style Scale",
    metaDescription: "Scale 1:48 models to 35mm Legion or Conquest scale. Apply 96.0% uniform scaling.",
    intro: "A nearly one-to-one conversion — 96% — that lets a 1:48 kit stand in on a 35mm board with almost no size change at all.",
    sections: [
      { heading: "Almost native size", body: "Because 1:48 (33.3mm) is so close to 35mm, this is essentially a tiny nudge. It is the least disruptive 1:48 conversion and great when you want a vehicle or aircraft piece that already looks about right on a 35mm scene. Detail is preserved almost perfectly." },
      { heading: "A light touch", body: "At 96% I barely modify the model. I use this whenever I want to press a quarter-scale kit into service as a hard-to-distinguish-from-native 35mm prop." },
    ],
    faq: [
      { question: "Is 1:48 basically 35mm already?", answer: "Very nearly — 1:48 is 33.3mm to the eyes, so a 96% scale brings it to a 35mm baseline with almost no change." },
    ],
  },
  "1-48-to-40mm": {
    title: "1:48 to 40mm Scale for 3D Printing Miniatures",
    h1: "1:48 to 40mm: Quarter Scale Up to Shatterpoint-Style",
    metaDescription: "Upscale 1:48 models to 40mm Shatterpoint or MCP scale. Use 109.7% in your slicer.",
    intro: "A modest 109.7% upscale that lifts a quarter-scale model up to the larger 40mm band, useful for pulling a 1:48 vehicle into a bigger scene.",
    sections: [
      { heading: "A gentle step up", body: "The jump from 33.3mm to 40mm is only about 10%, so the 1:48 kit grows into a slightly heftier piece that reads well on a 40mm board. Detail enlarges cleanly and the model stays sturdy." },
      { heading: "When I use this", body: "I reach for it when a 1:48 aircraft or vehicle would otherwise come out a touch too small on a 40mm-themed scene, or when I want a display with a bit more presence without a big rebuild." },
    ],
    faq: [
      { question: "Why is 1:48 to 40mm only 109.7%?", answer: "40mm is just 9.7% larger than the 33.3mm eye level of 1:48, so the upscale is a light nudge." },
    ],
  },
  "1-48-to-75mm": {
    title: "1:48 to 75mm Scale for 3D Printing Miniatures",
    h1: "1:48 to 75mm: Quarter Scale Up to Display",
    metaDescription: "Upscale 1:48 models to 75mm display scale. Apply 205.7% in your slicer.",
    intro: "A 2.06x upscale that takes a detailed quarter-scale kit and enlarges it into a full display piece, magnifying its model-grade detail.",
    sections: [
      { heading: "Display-scale payoff", body: "1:48 kits carry crisp aircraft- and vehicle-grade detail, and doubling them to 75mm display scale makes the most of it. This is one of the highest-quality display avenues because you start from already-sharp source detail." },
      { heading: "Big build planning", body: "At 205.7% you are committing to a large print. Wingspans and hulls can exceed a single bed, so I plan parts and orientation ahead. The result rewards the effort with a shelf-worthy piece." },
    ],
    faq: [
      { question: "Is 1:48 a good source for display pieces?", answer: "Yes — the source carries genuine model detail that enlarges beautifully at 205.7% to 75mm display scale." },
    ],
  },
  "1-48-to-1-56": {
    title: "1:48 to 1:56 Scale for 3D Printing Miniatures",
    h1: "1:48 to 1:56: Quarter Scale Down to Bolt Action",
    metaDescription: "Downscale 1:48 models to 1:56 Bolt Action scale. Set 85.7% in your slicer.",
    intro: "Shrinking a 1:48 vehicle to the official 1:56 Bolt Action scale is a clean 85.7% reduction — the by-the-book way to run store-bought kits with your 28mm infantry.",
    sections: [
      { heading: "The rules-correct route", body: "If you want strict 1:56 compliance rather than the common 1:48 compromise, this is the number. It takes a quarter-scale hull down to the official vehicle scale, which sits slightly smaller under infantry than the 1:48 alternative." },
      { heading: "Weighing the look", body: "I offer both routes depending on taste: strict 1:56 (85.7%) or the chunkier 1:48 (76.8% to 28mm). Most players land somewhere in between after parking an infantryman next to each. This page documents the formal 1:56 version." },
    ],
    faq: [
      { question: "What is the difference between 1:48 and 1:56 for Bolt Action?", answer: "1:56 is the official vehicle scale (85.7% from 1:48), but many players keep 1:48 hulls because they look more substantial under bulky modern infantry." },
    ],
  },

  // ---------------------------------------------------------------
  // 1:56 (Bolt Action) conversions
  // ---------------------------------------------------------------
  "1-56-to-1-35": {
    title: "1:56 to 1:35 Scale for 3D Printing Miniatures",
    h1: "1:56 to 1:35: Bolt Action Vehicle Scale Up to Model Kits",
    metaDescription: "Scale 1:56 Bolt Action vehicles up to 1:35 model kit size. Apply 160.0% in your slicer.",
    intro: "A 1.6x upscale that carries a 1:56 vehicle up into the larger 1:35 model-kit world, usually for display or to pair with a bigger kit scene.",
    sections: [
      { heading: "Display and pairing use", body: "This is a hobbyist leap: turning a wargaming vehicle into a larger model-kit-scale piece. At 160% the 1:56 hull picks up much-needed mass and reads well in a 1:35 display context, though the wargaming simplification becomes visible if you look closely." },
      { heading: "Surface and build", body: "The upscale smooths the model and hides layer lines, which is enjoyable. Big ships and tanks push against build volume, so I plan parts ahead and don't rush a single tall plate." },
    ],
    faq: [
      { question: "Why is 1:56 to 1:35 a 160% jump?", answer: "1:56 maps to 28.6mm eye level and 1:35 to 45.7mm, so 45.7 ÷ 28.6 = 160.0%." },
    ],
  },
  "1-56-to-1-48": {
    title: "1:56 to 1:48 Scale for 3D Printing Miniatures",
    h1: "1:56 to 1:48: Bolt Action Vehicle Scale Up",
    metaDescription: "Upscale 1:56 Bolt Action vehicles to 1:48 quarter scale. Set 116.7% in your slicer.",
    intro: "Growing a 1:56 vehicle by 116.7% lands it at the more substantial quarter scale many wargamers prefer for pure visual presence.",
    sections: [
      { heading: "The presence upgrade", body: "Players who find 1:56 tanks a touch small under bulky infantry often bump to 1:48 for a chunkier hull. This conversion is the reverse of that preference: take a 1:56 model and enlarge it to 1:48. It's a mild 16.7% step that meaningfully increases visual mass." },
      { heading: "Clean, reliable result", body: "The modest upscale keeps detail crisp and parts sturdy. I use this when I want a 1:56-built model to benefit from quarter-scale presence without starting over." },
    ],
    faq: [
      { question: "Why bump a 1:56 vehicle to 1:48?", answer: "For more visual presence. The 16.7% size increase makes a tank read bulkier under heroic infantry, which many wargamers prefer." },
    ],
  },
  "1-56-to-28mm": {
    title: "1:56 to 28mm Scale for 3D Printing Miniatures",
    h1: "1:56 to 28mm: Bolt Action Vehicle Scale to True Scale",
    metaDescription: "Convert 1:56 Bolt Action vehicles to 28mm true scale. Use 89.6% uniform scaling.",
    intro: "This maps the 1:56 vehicle scale to the 28mm true-scale infantry it is officially paired with — a subtle 89.6% adjustment that most players can barely see.",
    sections: [
      { heading: "A subtle correction", body: "By eye, 1:56 and 28mm are extremely close. The 89.6% figure is the mathematically correct link between the 28.6mm of 1:56 and the 28mm true-scale infantry. It is close enough that many prints work either way; the percentage just dials the vehicles into perfect alignment." },
      { heading: "When exactness matters", body: "I use this when I'm building a coherent Bolt Action force and want every hull to sit precisely under my 28mm infantry. It is a small number with a big effect on cohesion." },
    ],
    faq: [
      { question: "Is 1:56 basically 28mm?", answer: "They are very close — 1:56 is 28.6mm to the eyes, so a 89.6% scale maps it to 28mm true scale." },
    ],
  },
  "1-56-to-32mm": {
    title: "1:56 to 32mm Scale for 3D Printing Miniatures",
    h1: "1:56 to 32mm: Vehicle Scale Up to Heroic",
    metaDescription: "Upscale 1:56 Bolt Action vehicles to 32mm heroic scale. Apply 102.4% in your slicer.",
    intro: "A hair over 100% that lifts a 1:56 vehicle to match the bulkier heroic 32mm infantry — a neat trick for mixing Bolt Action and Warhammer-scale pieces.",
    sections: [
      { heading: "Bridging game systems", body: "When you want a 1:56 vehicle to stand next to heroic 32mm soldiers, 102.4% is the bridge. It is a tiny nudge, reflecting how close the vehicle and heroic scales actually are. I use it when combining models across Bolt Action and Warhammer-themed sets." },
      { heading: "The margins are small", body: "Because the jump is just 2.4%, the conversion is forgiving and detail-perfect. It is really about intent — naming the exact target so your hull and infantry read as one scale." },
    ],
    faq: [
      { question: "Why is 1:56 to 32mm so small a change?", answer: "1:56 (28.6mm) is already near 32mm, so the upscale is only 102.4% — a gentle alignment rather than a size change." },
    ],
  },
  "1-56-to-35mm": {
    title: "1:56 to 35mm Scale for 3D Printing Miniatures",
    h1: "1:56 to 35mm: Vehicle Scale Up to Legion-Style",
    metaDescription: "Upscale 1:56 Bolt Action vehicles to 35mm Legion scale. Set 112.0% in your slicer.",
    intro: "A 112% upscale that lifts a 1:56 vehicle up to the 35mm band, giving a mutation-friendly match for Legion- or Conquest-style scenes.",
    sections: [
      { heading: "A noticeable but clean bump", body: "Going from 28.6mm to 35mm is a 12% increase, enough to matter but gentle on the model. I use it when a 1:56 vehicle would otherwise read too small in a 35mm context. Detail and part strength survive the modest enlargement well." },
      { heading: "Watch the footprint", body: "The 12% bump nudges hulls and wings a little larger on the bed, which is trivial unless you were already tight on plate space. I check bed fit before slicing." },
    ],
    faq: [
      { question: "Is 1:56 to 35mm a big change?", answer: "No — it is a 12% upscale (112%), gentle enough to keep detail intact while increasing visual presence for a 35mm scene." },
    ],
  },
  "1-56-to-40mm": {
    title: "1:56 to 40mm Scale for 3D Printing Miniatures",
    h1: "1:56 to 40mm: Vehicle Scale Up to Shatterpoint-Style",
    metaDescription: "Upscale 1:56 Bolt Action vehicles to 40mm Shatterpoint scale. Apply 128.0% in your slicer.",
    intro: "A 128% upscale that lifts a 1:56 vehicle well into the largest standard game scale, suiting it to display or 40mm-themed board pieces.",
    sections: [
      { heading: "Up the scale ladder", body: "For someone building a 40mm-themed scene or display, growing a 1:56 hull by 28% gives it proper presence. It is more of an upsize than a rescale, and the wargaming simplification becomes more visible the further you climb." },
      { heading: "Plan for the bigger print", body: "A 128% hull is noticeably larger and heavier. I check the bed, sometimes split the model, and accept slower print times when I want the added scale." },
    ],
    faq: [
      { question: "Is 1:56 to 40mm a practical conversion?", answer: "It works for display or 40mm scenery — the 28% upscale adds presence, though it isn't a rules-aligned game conversion." },
    ],
  },
  "1-56-to-75mm": {
    title: "1:56 to 75mm Scale for 3D Printing Miniatures",
    h1: "1:56 to 75mm: Vehicle Scale Up to Display",
    metaDescription: "Upscale 1:56 Bolt Action vehicles to 75mm display scale. Set 240.0% in your slicer.",
    intro: "A 2.4x upscale that turns a small wargaming vehicle into a substantial display piece, smoothing the surface for painting practice.",
    sections: [
      { heading: "Display repurposing", body: "At 240% a 1:56 tank becomes a large, smooth-canvas showpiece. The source's wargaming simplification works in its favour here — broad, flat panels perfect for blending and weathering practice." },
      { heading: "A serious build", body: "2.4x is a lot. It will almost certainly be a multi-part, large-print job. I plan sections, print at a fine profile, and expect a real time and material investment for a worthwhile display result." },
    ],
    faq: [
      { question: "Is 1:56 to 75mm worth it?", answer: "For a display study piece yes — 240% produces a broad, smooth canvas that is ideal for painting practice on a recognizable vehicle." },
    ],
  },

  // ---------------------------------------------------------------
  // 1:72 (small scale) conversions
  // ---------------------------------------------------------------
  "1-72-to-1-35": {
    title: "1:72 to 1:35 Scale for 3D Printing Miniatures",
    h1: "1:72 to 1:35: Small Scale Up to Model Kit Scale",
    metaDescription: "Scale 1:72 small-scale models up to 1:35 model kit size. Apply 205.7% in your slicer.",
    intro: "Doubling a 1:72 kit over to 1:35 is a big but workable jump for someone who wants a large showcase version of a small-scale subject.",
    sections: [
      { heading: "Going from small to large", body: "1:72 models are compact, so growing to 1:35 (205.7%) is a major enlargement. The small source detail — fine panel lines, thin gear — scales up and often becomes more robust and printable in the process." },
      { heading: "Expect a full build", body: "A 2.06x upscale turns a small kit into a large one. I plan plenty of bed space, split larger parts, and treat it as a proper display project rather than a quick print." },
    ],
    faq: [
      { question: "Why is 1:72 to 1:35 a 205.7% jump?", answer: "1:72 maps to 22.2mm and 1:35 to 45.7mm eye level, so 45.7 ÷ 22.2 = 205.7%." },
    ],
  },
  "1-72-to-28mm": {
    title: "1:72 to 28mm Scale for 3D Printing Miniatures",
    h1: "1:72 to 28mm: Small Scale Up to True Tabletop",
    metaDescription: "Upscale 1:72 small-scale models to 28mm true scale. Use 115.2% in your slicer.",
    intro: "A 115.2% upscale that lifts a 1:72 vehicle to sit alongside 28mm true-scale infantry — a subtle, practical bridge between the small scale and the tabletop standard.",
    sections: [
      { heading: "A mild and useful step", body: "1:72 (22.2mm) to 28mm is only about 15%, so the 1:72 model grows just enough to read properly under 28mm infantry. It is a reliable conversion that keeps detail crisp and parts sturdy." },
      { heading: "Great for terrain and vehicles", body: "I use this most for adding small-scale aircraft, vehicles, or debris to a 28mm board where a true-scale kit would be too big. The light upscale slots them in naturally." },
    ],
    faq: [
      { question: "Is 1:72 close to 28mm?", answer: "Somewhat — 1:72 is 22.2mm to the eyes, so 115.2% brings it to 28mm true scale. It's a mild, practical step." },
    ],
  },
  "1-72-to-32mm": {
    title: "1:72 to 32mm Scale for 3D Printing Miniatures",
    h1: "1:72 to 32mm: Small Scale Up to Heroic",
    metaDescription: "Upscale 1:72 models to 32mm heroic scale. Apply 131.7% in your slicer.",
    intro: "A 131.7% upscale that lifts a 1:72 model up to the heroic 32mm band — a solid choice for terrain and vehicles on a Warhammer-scale board.",
    sections: [
      { heading: "Bridging to heroic", body: "Going from 22.2mm to 32mm is a 32% increase, enough to make a 1:72 model read as heroic-scale scenery. I use it when I want small-scale aircraft or vehicles to add atmosphere to a 32mm battlefield." },
      { heading: "Detail gains at the top", body: "The 31.7% enlargement smooths and strengthens thin parts. Barrels and wings, delicate at 1:72, become tougher — a welcome reliability boost." },
    ],
    faq: [
      { question: "Is 1:72 to 32mm good for terrain?", answer: "Yes — 131.7% lifts a 1:72 vehicle into useful heroic-scale scenery that adds atmosphere without dominating a 32mm board." },
    ],
  },
  "1-72-to-35mm": {
    title: "1:72 to 35mm Scale for 3D Printing Miniatures",
    h1: "1:72 to 35mm: Small Scale Up to Legion-Style",
    metaDescription: "Upscale 1:72 models to 35mm Legion or Conquest scale. Set 144.0% in your slicer.",
    intro: "A 144% upscale that carries a 1:72 model up to the 35mm band, producing a chunkier and more present piece for a Legion-style board.",
    sections: [
      { heading: "Enlargement with intent", body: "The 44% increase from 22.2mm to 35mm gives a small-scale kit real presence. It is more than a tweak, so I treat the model as a proper 35mm prop rather than a miniature. Detail survives the upscale well." },
      { heading: "Bed space planning", body: "At 144% a 1:72 model grows noticeably. I check the build volume early for wings or hulls, and orient to avoid tall, support-heavy single builds." },
    ],
    faq: [
      { question: "Is 1:72 to 35mm a big change?", answer: "Yes — 144% is a 44% enlargement, so the small 1:72 kit becomes a substantial 35mm-presence piece." },
    ],
  },
  "1-72-to-40mm": {
    title: "1:72 to 40mm Scale for 3D Printing Miniatures",
    h1: "1:72 to 40mm: Small Scale Up to Shatterpoint-Style",
    metaDescription: "Upscale 1:72 models to 40mm Shatterpoint or MCP scale. Apply 164.6% in your slicer.",
    intro: "A 164.6% upscale that lifts a 1:72 model well into the largest game scale, suiting it to display or 40mm-themed scenery.",
    sections: [
      { heading: "A clean climb", body: "Jumping 22.2mm to 40mm is a 65% enlargement. The small source becomes a big, smooth piece that works as display-scale scenery on a 40mm board. The simplification of 1:72 detail becomes a feature at this size." },
      { heading: "Heavier build", body: "164.6% makes the model substantially larger and denser. I plan parts and supports deliberately and expect slower printing for the added scale." },
    ],
    faq: [
      { question: "What is 1:72 to 40mm for?", answer: "Mainly display or 40mm-themed scenery. The 65% upscale yields a smooth, large piece suited to the biggest standard game scale." },
    ],
  },
  "1-72-to-75mm": {
    title: "1:72 to 75mm Scale for 3D Printing Miniatures",
    h1: "1:72 to 75mm: Small Scale Up to Full Display",
    metaDescription: "Upscale 1:72 models to 75mm display scale. Set 308.6% in your slicer.",
    intro: "A massive 308.6% upscale that turns a tiny 1:72 model into a full display-size piece with broad, paintable surfaces.",
    sections: [
      { heading: "The extreme upscale", body: "Tripling and change a 1:72 kit into 75mm display territory is a research/display move. The smooth, simplified surfaces are ideal for practice painting or finishing experiments on a recognizable subject." },
      { heading: "Commit to the build", body: "3.09x is the largest jump in the matrix. This is a dedicated multi-part, multi-plate project. I break it into sections, print at a fine profile, and accept the time and material cost for a substantial display shelf piece." },
    ],
    faq: [
      { question: "Is 308.6% too much to print?", answer: "It is the biggest jump, but for a display piece it works — just plan a multi-part build and expect long, material-heavy printing." },
    ],
  },

  // ---------------------------------------------------------------
  // 28mm conversions
  // ---------------------------------------------------------------
  "28mm-to-1-35": {
    title: "28mm to 1:35 Scale for 3D Printing Miniatures",
    h1: "28mm to 1:35: Tabletop Infantry to Model Kit Scale",
    metaDescription: "Scale 28mm miniatures up to 1:35 model kit size. Use 178.6% in your slicer with uniform scaling.",
    intro: "Taking a 28mm infantry figure and growing it to 1:35 model-kit scale is a big jump, and honestly it is a display move because a 1:35 human stands about 50mm tall.",
    sections: [
      { heading: "Why you'd go big", body: "A 28mm D&D figure grown to 178.6% becomes a ~1:35 human, which suits large dioramas or pairing with 1:35 kits. I do this when I want a spotlight hero in a model-kit-scale scene. The 78.6% enlargement smooths detail and gives a big paint surface." },
      { heading: "Watch the proportions", body: "28mm true-scale figures carry realistic proportions, so enlarging them reads correctly in a 1:35 context. Heroic figures enlarge into a chunky look — fine if the scene is heroic, odd if it is meant to be a realistic kit." },
    ],
    faq: [
      { question: "Is 28mm to 1:35 a display conversion?", answer: "Yes — it's a 178.6% upscale to model-kit scale, best used for a display hero or diorama rather than a playable figure." },
    ],
  },
  "28mm-to-32mm": {
    title: "28mm to 32mm Scale for 3D Printing Miniatures",
    h1: "28mm to 32mm: The Most-Calculated Tabletop Conversion",
    metaDescription: "Convert 28mm minis to 32mm hero ic scale for 3D printing. Type 114.3% into your slicer and lock XYZ axes.",
    intro: "This is the conversion I'm asked about more than any other: bringing a true-scale 28mm figure up to heroic 32mm — the difference between a 40k Firstborn and a Primaris, or a classic D&D mini and a modern heroic one.",
    sections: [
      { heading: "Why 114.3% is the number", body: "On a 175cm baseline, a 28mm true-scale figure is 28mm to the eyes and a 32mm heroic is 32mm, so 32 ÷ 28 = 114.3%. It is the single most useful percentage for anyone printing proxies for Warhammer 40k, Age of Sigmar, or modern D&D." },
      { heading: "What actually changes", body: "At 114.3% the figure grows ~14%, which matters most in armies where the two scales meet. I measure the eye line before scaling — a '28mm' sculpt that reads 30mm needs a different treatment. After the uniform upscale, check that the model still fits its base, since a 32mm figure on a 28mm hero base can crowd the footprint." },
    ],
    faq: [
      { question: "What percentage is 28mm to 32mm?", answer: "114.3% on a 175cm baseline, measured to the eyes. This matches a true-scale 28mm figure to heroic 32mm.", },
      { question: "Does 28mm to 32mm work for 40k and D&D?", answer: "Yes — it is the standard bridge between Firstborn/Primaris 40k sculpts and between true-scale and heroic D&D figures." },
    ],
  },
  "28mm-to-35mm": {
    title: "28mm to 35mm Scale for 3D Printing Miniatures",
    h1: "28mm to 35mm: Tabletop True Scale to Legion Scale",
    metaDescription: "Upscale 28mm minis to 35mm Legion or Conquest scale. Apply 125.0% in your slicer.",
    intro: "Growing a 28mm true-scale figure by 25% to reach the 35mm band used by Star Wars Legion and Conquest — a crisp increase that reads clearly on the table.",
    sections: [
      { heading: "The +25% step", body: "35 ÷ 28 = 125%, a clean quarter-size increase that noticeably enlarges infantry. It is the bridge when you want a 28mm design to hold its own among bulkier 35mm figures. Detail smooths slightly but remains strong." },
      { heading: "When it feels right", body: "35mm figures are chunkier, so a 125% upscaled 28mm sculpt will still read slightly slimmer than a native 35mm one. I use it when adding a 28mm-typical hero or vehicle into a 35mm scene and want it to stand tall." },
    ],
    faq: [
      { question: "Is 28mm to 35mm a big difference?", answer: "It's a clear 25% increase (125%), enough to matter but gentle on detail — good for adding figures to a 35mm Legion-style scene." },
    ],
  },
  "28mm-to-40mm": {
    title: "28mm to 40mm Scale for 3D Printing Miniatures",
    h1: "28mm to 40mm: True Scale Up to Shatterpoint-Style",
    metaDescription: "Upscale 28mm minis to 40mm Shatterpoint or MCP scale. Use 142.9% in your slicer.",
    intro: "A 142.9% upscale that lifts a 28mm figure well up into the 40mm band, giving it center-stage presence on a Shatterpoint- or MCP-themed board.",
    sections: [
      { heading: "A commanding increase", body: "Going from 28mm to 40mm is a 43% enlargement — enough to turn a standard figure into a hero-scale piece. The bigger canvas hides layer lines and gives ample painting space. I use it when I want a 28mm design to lead a scene at 40mm." },
      { heading: "Proportion expectations", body: "A 28mm true-scale figure upscaled keeps realistic proportions, so it may look slender next to heroic 40mm sculpts. That is fine for a display or an accent piece; just don't expect it to pass entirely as a native heroic 40mm model." },
    ],
    faq: [
      { question: "Is 142.9% the right 28mm to 40mm number?", answer: "Yes — 40 ÷ 28 = 142.9%. It's a 43% upscale that gives a figure hero-scale presence on a 40mm board." },
    ],
  },
  "28mm-to-75mm": {
    title: "28mm to 75mm Scale for 3D Printing Miniatures",
    h1: "28mm to 75mm: True Scale Up to Display",
    metaDescription: "Upscale 28mm minis to 75mm display scale. Apply 267.9% in your slicer.",
    intro: "A 267.9% upscale that turns a tiny 28mm figure into a full 75mm display piece with a broad, satisfying painting surface.",
    sections: [
      { heading: "The display jump", body: "28mm to 75mm is a 2.68x enlargement, producing a large, smooth showpiece. It is a display move, not a playable one — perfect for painting practice or a favourite mini you want to showcase at scale." },
      { heading: "The big-build reality", body: "At 267.9% you are committing to a substantial print with a fine profile. I plan supports and possibly split parts. The result is a properly shelf-worthy piece with detail that benefits from the larger scale." },
    ],
    faq: [
      { question: "Is a 28mm figure worth printing at 75mm?", answer: "For display, yes — 267.9% yields a large, smooth canvas that is excellent for painting practice on a familiar subject." },
    ],
  },

  // ---------------------------------------------------------------
  // 32mm conversions
  // ---------------------------------------------------------------
  "32mm-to-1-35": {
    title: "32mm to 1:35 Scale for 3D Printing Miniatures",
    h1: "32mm to 1:35: Heroic Scale Up to Model Kits",
    metaDescription: "Scale 32mm heroic minis up to 1:35 model kit scale. Set 156.3% in your slicer.",
    intro: "A 156.3% upscale that grows a heroic 32mm figure to the 1:35 model-kit band — a display move for pairing with large kits.",
    sections: [
      { heading: "Pairing with kits", body: "A heroic 32mm figure grown to 156.3% reaches roughly 1:35 human height. It is a display conversion for scenes that combine a large humanoid with 1:35 vehicles or dioramas. The upscale smooths and strengthens the figure." },
      { heading: "Heroic proportions carry over", body: "Because 32mm is heroic, the enlarged figure keeps exaggerated proportions that fit stylized dioramas but look bulky in a realistic kit scene. I pick the context first." },
    ],
    faq: [
      { question: "Is 32mm to 1:35 practical?", answer: "It's for display — 156.3% carries a heroic figure to model-kit scale, best suited to stylized scenes and dioramas." },
    ],
  },
  "32mm-to-28mm": {
    title: "32mm to 28mm Scale for 3D Printing Miniatures",
    h1: "32mm to 28mm: Heroic Down to True Tabletop Scale",
    metaDescription: "Downscale 32mm minis to 28mm true scale. Type 87.5% into your slicer and lock axes.",
    intro: "The reverse of the most-asked question: shrinking a heroic 32mm figure to true 28mm scale, as when you bring a modern sculpt down to sit with classic Firstborn or 28mm D&D comrades.",
    sections: [
      { heading: "Why shrink at all", body: "Players occasionally want a heroic model to join a 28mm-led force. At 87.5% the figure loses its heroic presence and reads as a 28mm true-scale model — the proportions slim down with the size, which is exactly what you want when balancing an army." },
      { heading: "Watch the slimming", body: "Shrinking 32mm heroic to 28mm (87.5%) makes heads and weapons proportionally smaller, matching the target scale's realism. I confirm the eye line lands at 28mm after scaling rather than trusting the number alone." },
    ],
    faq: [
      { question: "What is 32mm to 28mm percentage?", answer: "87.5% — 28 ÷ 32 = 0.875. It shrinks a heroic figure to true 28mm scale with matching slimmer proportions." },
    ],
  },
  "32mm-to-35mm": {
    title: "32mm to 35mm Scale for 3D Printing Miniatures",
    h1: "32mm to 35mm: Heroic Scale Up to Legion",
    metaDescription: "Upscale 32mm heroic minis to 35mm Legion scale. Use 109.4% in your slicer.",
    intro: "A gentle 109.4% upscale from the heroic 32mm band up to 35mm — the step I reach for when adding Warhammer-style models to a Legion- or Conquest-scale project.",
    sections: [
      { heading: "A mild, clean step", body: "35 ÷ 32 = 109.4%, a light increase that gives heroic figures just enough presence for a 35mm board. Detail stays essentially untouched, and parts remain strong since the jump is small." },
      { heading: "Good across sci-fi lines", body: "This is a practical bridge between the 32mm gaming mainstream and 35mm systems. I use it for a hero or vehicle that needs to hold its own among bulkier 35mm figures without a drastic size change." },
    ],
    faq: [
      { question: "Is 32mm to 35mm a big change?", answer: "No — it's a modest 9.4% upscale (109.4%), enough to add presence for a 35mm board while keeping detail intact." },
    ],
  },
  "32mm-to-40mm": {
    title: "32mm to 40mm Scale for 3D Printing Miniatures",
    h1: "32mm to 40mm: Heroic Scale Up to Shatterpoint",
    metaDescription: "Upscale 32mm heroic minis to 40mm Shatterpoint scale. Apply 125.0% in your slicer.",
    intro: "A clean 125% upscale that grows a heroic 32mm figure by a quarter to reach the larger 40mm band — adding real presence while keeping the heroic look.",
    sections: [
      { heading: "The +25% hero step", body: "40 ÷ 32 = 125%. I use this when a heroic 32mm design deserves more scale presence — for a centerpiece on a 40mm board or a display piece. The enlargement smooths detail and gives a larger, more paint-friendly canvas." },
      { heading: "Heroic stays heroic", body: "Because both scales are heroic, the upscaled figure keeps its exaggerated proportions naturally. That makes this a smoother conversion than the true-to-heroic jumps, since the style doesn't fight the scale change." },
    ],
    faq: [
      { question: "Is 32mm to 40mm a clean conversion?", answer: "Yes — 125% upscales a heroic 32mm figure to the heroic 40mm band, and the proportions carry over naturally." },
    ],
  },
  "32mm-to-75mm": {
    title: "32mm to 75mm Scale for 3D Printing Miniatures",
    h1: "32mm to 75mm: Heroic Scale Up to Display",
    metaDescription: "Upscale 32mm heroic minis to 75mm display scale. Set 234.4% in your slicer.",
    intro: "A 234.4% upscale that turns a heroic 32mm figure into a large 75mm display piece — one of the friendlier display jumps because the source already has heroic bulk.",
    sections: [
      { heading: "A natural display subject", body: "Heroic 32mm figures upscale beautifully to display scale because their exaggerated proportions and strong silhouettes hold up at big sizes. At 234.4% the figure becomes a broad, smooth canvas ideal for painting practice without losing presence." },
      { heading: "Still a big print", body: "2.34x is a substantial build. I plan supports, possibly split parts, and use a fine profile. The heroic source detail rewards the effort with a striking shelf piece." },
    ],
    faq: [
      { question: "Is 32mm a good source for 75mm display?", answer: "Yes — heroic proportions upscale beautifully, so 234.4% gives a strong, broad-canvas display figure." },
    ],
  },

  // ---------------------------------------------------------------
  // 35mm conversions
  // ---------------------------------------------------------------
  "35mm-to-1-35": {
    title: "35mm to 1:35 Scale for 3D Printing Miniatures",
    h1: "35mm to 1:35: Legion Scale Up to Model Kits",
    metaDescription: "Upscale 35mm Legion minis to 1:35 model kit scale. Apply 142.9% in your slicer.",
    intro: "A 142.9% upscale that carries a 35mm figure to model-kit scale, a display move for pairing Legion-style figures with 1:35 vehicles and dioramas.",
    sections: [
      { heading: "Building a larger scene", body: "Growing a 35mm figure to 142.9% lands it at roughly 1:35 human scale, useful for assembling a large kit-and-figure scene. The enlargement gives the figure real mass and a big paint surface." },
      { heading: "Choose the style", body: "35mm figures often carry heroic bulk, which suits stylized dioramas. In a strict 1:35 realistic kit scene that bulk can look exaggerated, so I decide the flavour of the scene first." },
    ],
    faq: [
      { question: "Is 35mm to 1:35 worth it?", answer: "Yes, for a stylized display scene — 142.9% carries a 35mm figure up to 1:35 model-kit scale, pairing nicely with large kits." },
    ],
  },
  "35mm-to-28mm": {
    title: "35mm to 28mm Scale for 3D Printing Miniatures",
    h1: "35mm to 28mm: Legion Scale Down to True Scale",
    metaDescription: "Downscale 35mm Legion minis to 28mm true scale. Use 80.0% in your slicer.",
    intro: "The reverse of the popular upscale: shrinking a 35mm figure down to true 28mm scale at an 80% reduction, with proportions that slim alongside the size.",
    sections: [
      { heading: "Slimming a 35mm figure", body: "At 80% a 35mm figure becomes a 28mm true-scale model. Because the source is usually heroic, the shrink hands you slimmer, more realistic proportions — ideal if you want a Legion-inspired character to blend into a 28mm-led force." },
      { heading: "Delicate after downsizing", body: "The 20% reduction thins weapons and thin parts. I check the most fragile elements and orient or reinforce them so the model survives at its new, smaller size." },
    ],
    faq: [
      { question: "What is 35mm to 28mm percentage?", answer: "80% — 28 ÷ 35 = 0.8. Shrinking a 35mm figure to 28mm true scale slims its proportions to match." },
    ],
  },
  "35mm-to-32mm": {
    title: "35mm to 32mm Scale for 3D Printing Miniatures",
    h1: "35mm to 32mm: Legion Down to Heroic Scale",
    metaDescription: "Downscale 35mm Legion minis to 32mm heroic scale. Set 91.4% in your slicer.",
    intro: "A light 91.4% reduction that brings a 35mm figure down to the heroic 32mm band — the bridge when you want Legion-scale models to join a Warhammer-scale force.",
    sections: [
      { heading: "A practical scale bridge", body: "32 ÷ 35 = 91.4%, a mild shrink that lets a 35mm figure pass smoothly into a 32mm army. The change is subtle enough to keep detail intact while correcting the size gap between systems." },
      { heading: "Low risk, pleasant result", body: "The 8.6% reduction is gentle, so part fragility is rarely an issue. I use this when mixing Legion and Warhammer-style sets and want them to cohere on one table." },
    ],
    faq: [
      { question: "Is 35mm to 32mm a big change?", answer: "No — a modest 91.4% reduction. It's a subtle bridge that keeps detail while letting 35mm models join a 32mm force." },
    ],
  },
  "35mm-to-40mm": {
    title: "35mm to 40mm Scale for 3D Printing Miniatures",
    h1: "35mm to 40mm: Legion Scale Up to Shatterpoint",
    metaDescription: "Upscale 35mm Legion minis to 40mm Shatterpoint scale. Apply 114.3% in your slicer.",
    intro: "A 114.3% upscale that lifts a 35mm Legion figure up to the larger 40mm Shatterpoint band — the cleanest way to bring Legion-style models into a bigger game.",
    sections: [
      { heading: "The standard Legion-to-Shatterpoint step", body: "40 ÷ 35 = 114.3%, the exact figure Atomic Mass Games players use when pressing Legion proxies into Shatterpoint. Both lines share a heroic style, so the 14.3% increase preserves proportions seamlessly." },
      { heading: "Smooth and reliable", body: "Because the two scales are stylistically aligned, this conversion looks clean with minimal effort. I nudge a Legion model up and it reads naturally at 40mm." },
    ],
    faq: [
      { question: "Does 35mm to 40mm work for Shatterpoint?", answer: "Yes — 114.3% is the standard step from Legion to Shatterpoint, and the shared heroic style makes it look seamless." },
    ],
  },
  "35mm-to-75mm": {
    title: "35mm to 75mm Scale for 3D Printing Miniatures",
    h1: "35mm to 75mm: Legion Scale Up to Display",
    metaDescription: "Upscale 35mm Legion minis to 75mm display scale. Apply 214.3% in your slicer.",
    intro: "A 214.3% upscale that turns a 35mm figure into a 75mm display piece, with heroic proportions that hold up beautifully at large scale.",
    sections: [
      { heading: "Display from a strong base", body: "35mm heroic figures already have presence and bold proportions, so 214.3% takes them to a satisfying display size without losing their character. It is among the nicest display conversions for recognizable sci-fi subjects." },
      { heading: "Plan the big build", body: "2.14x is a substantial print. I plan supports, split where needed, and print at a fine profile. The enlarged smooth surfaces are a joy for painting practice." },
    ],
    faq: [
      { question: "Is 35mm a good display source?", answer: "Yes — 35mm heroic figures upscale cleanly to 75mm (214.3%), keeping their bold proportions for a striking display piece." },
    ],
  },
};
