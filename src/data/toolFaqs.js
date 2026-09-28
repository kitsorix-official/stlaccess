// src/data/toolFaqs.js
// Per-tool FAQ content. Rendered on each calculator page and reused for the
// FAQPage JSON-LD graph in src/pages/3d-math/[slug].astro.

export const slicerFaq = [
  {
    question: "What percentage do I type for 28mm to 32mm?",
    answer: "114.3%. That is 32mm (target) divided by 28mm (source) times 100. It is the single most common conversion on this site — the jump from true 28mm to the heroic 32mm scale used by the modern sci-fi epic and fantasy wargames."
  },
  {
    question: "How does the percentage formula work?",
    answer: "(Target Height ÷ Source Height) × 100 = Percentage. A 32mm model scaled down to 28mm needs 28 ÷ 32 × 100 = 87.5%. Enter that number as a uniform scale factor in your slicer and the math is done."
  },
  {
    question: "Should I measure to eye level or top of head?",
    answer: "Eye level, unless you are working with a historical kit. Gaming scales like 28mm and 32mm measure a 175cm human to the eyes at 160cm. Top of head adds roughly 8-10% for the forehead, helmet, and hair, and is mostly used by ratio model kits."
  },
  {
    question: "Do I need to lock the X, Y, and Z axes?",
    answer: "Yes. Enter the percentage as a uniform scale factor in Chitubox, Lychee, PrusaSlicer, or Cura and make sure all three axes scale together. Scaling one axis alone stretches the model and ruins the proportions."
  },
  {
    question: "Does material shrinkage affect the percentage?",
    answer: "Barely. PLA and PETG shrink about 0.2-0.5% as they cool, which is smaller than normal print variation, so I do not add compensation on FDM. If you want maximum accuracy, print a test piece and measure it with calipers first."
  },
  {
    question: "What is the easiest way to convert scales in my slicer?",
    answer: "Import the STL, select the model, open the scale tool, and type the percentage. Always confirm the model's source scale first — if the STL was designed for 32mm and you want 28mm, the number to type is 87.5%, not 114.3%."
  }
];

export const filamentFaq = [
  {
    question: "How much does one gram of filament cost?",
    answer: "Divide the roll price by the roll weight. A $19.99, 1000g roll of mid-range PLA costs about $0.020 per gram. A typical 32mm miniature uses 5-15g of PLA, so the filament for one mini usually costs well under $0.50."
  },
  {
    question: "Why is premium filament so much more expensive per gram?",
    answer: "Premium and specialty filaments — like Bambu Lab PLA-CF at roughly $0.032/g — cost more because of the additives, tighter tolerances, and finishing. For a single tabletop miniature the difference is only a few cents."
  },
  {
    question: "How many grams does a typical miniature print use?",
    answer: "Most 28-40mm miniatures use 5-15g of filament including supports, depending on size and infill. Vehicles and terrain can jump to 50-200g. Your slicer shows the exact estimate, so check the weight readout before you slice."
  },
  {
    question: "Should I include electricity in my cost estimate?",
    answer: "It depends on your rate and printer. A 60W printer running 3 hours at $0.15/kWh adds about $0.03. That is noise on a single mini but adds up on a long, high-wattage print, so the calculator gives you the option."
  },
  {
    question: "How do I find out how much filament a print uses?",
    answer: "Look at your slicer's estimated filament usage — Chitubox, Lychee, and PrusaSlicer all report grams before you slice. Add the purge tower and support material to that number, then enter it into the calculator."
  },
  {
    question: "Is PETG worth the extra cost over PLA?",
    answer: "For miniatures, PLA is usually the better value — it is cheaper and prints crisper detail, and the strength difference rarely matters on a tabletop model. PETG shines for terrain and functional parts that take abuse."
  }
];

export const referenceBarFaq = [
  {
    question: "How do I use the reference bar in Lychee or Chitubox?",
    answer: "Import the STL bar next to your model of unknown scale, then measure the model's height against the 5mm tick marks. Match a figure's eye level to the end tab — or just read the ticks directly — and you have the height in millimetres."
  },
  {
    question: "What is the end tab on the bar for?",
    answer: "The end tab is exactly as tall as a figure at your chosen scale, measured to eye level. Stand it next to an infantry model and if the model lines up with the tab, it matches that scale."
  },
  {
    question: "Why can't I tell the scale from the STL file itself?",
    answer: "STL files store geometry without units — no inches, millimetres, or scale label. Your slicer assumes millimetres, which is why an unknown file can come out any size. Measuring the imported model against the bar is the reliable fix."
  },
  {
    question: "What percentage do I type after I measure my model?",
    answer: "Once you know the model's height, open the Scale Calculator for the exact percentage between your source and target scales. This tool is step one of that chain."
  },
  {
    question: "Why doesn't my model match any scale cleanly?",
    answer: "Heroic-proportioned sculpts, creatures, and models between two standards often sit off the classic numbers. Treat a match within about 5% as strong, and anything further out as a sign the sculpt is stylised rather than strict."
  },
  {
    question: "Which bar length should I download?",
    answer: "50mm covers most infantry and vehicle work. Pick 30mm for small epic-scale models, and 75-100mm if you are measuring terrain, large monsters, or 75mm display pieces."
  }
];

export const euImportCostFaq = [
  {
    question: "Why is there an extra €3 fee on my 3D printing parts order from outside the EU?",
    answer: "Under EU customs regulations, the previous low-value exemption threshold was replaced by a flat €3 customs duty per distinct product category on parcels valued under €150. The €150 duty-free allowance was abolished on 1 July 2026, and the flat €3 rate applies per item line — based on tariff classification — until 1 July 2028, when normal customs tariff rates return."
  },
  {
    question: "How is import VAT calculated on international 3D printer parts?",
    answer: "EU import VAT is calculated on the cumulative total of your item price, shipping costs, and the applied customs duty combined. At 21% VAT, a €24.99 spool with €4.99 shipping and €3.00 duty is taxed on €32.98 — that is €6.93 of VAT, not €5.25. Calculating VAT on the goods price alone is the most common mistake people make when estimating an import."
  },
  {
    question: "Does the €3 customs duty apply per spool or per parcel?",
    answer: "Per item line, not per parcel and not per quantity. Three spools of the same PLA share one tariff classification, so they count as one category and one €3 duty. Add a heater block to the same order and it is classified separately — two categories, €6 of duty. That is why the calculator asks for the number of distinct product categories rather than the number of items."
  },
  {
    question: "Do I pay the customs duty myself at the door?",
    answer: "Usually not directly. The €3 duty is collected from the seller, platform, or carrier involved in the sale and transport — customers are generally spared an extra payment at delivery. In practice the cost is typically folded into the price you already paid. The duty exists either way, so it belongs in your cost comparison between EU and non-EU shops."
  },
  {
    question: "Which VAT rate applies to my order?",
    answer: "Import VAT is charged at the standard rate of the member state where the goods are consumed — from 17% in Luxembourg to 27% in Hungary. The dropdown covers all 27 EU countries. Rates change, so if you are comparing large orders, confirm your country's current standard rate before committing."
  },
  {
    question: "What about the extra handling fee couriers keep mentioning?",
    answer: "A separate EU handling fee on e-commerce parcels is expected no later than 1 November 2026, with the exact amount still to be set by delegated act — industry estimates put it between €2 and €4 per parcel. It is a fee, not a customs duty, and this calculator does not include it yet. Treat the result here as the cost before that fee lands."
  }
];

export const filamentDensityFaq = [
  {
    question: "How do you calculate filament weight from volume?",
    answer: "Weight = Volume × Density. A 10 cm³ solid model printed in PLA at 1.24 g/cm³ weighs 10 × 1.24 = 12.4 g. Enter your dimensions or volume, pick the material, and the calculator does that multiplication for you — including the hollow shell and infill math for FDM."
  },
  {
    question: "What is the density of PLA, PETG, ABS, and resin?",
    answer: "PLA is 1.24 g/cm³, PETG 1.27, ABS 1.04, ASA 1.07, TPU 1.21, and Nylon about 1.14. Standard resin sits near 1.10 g/cm³, ABS-like resin around 1.15. Denser material means a heavier print at the same volume — a solid ABS part is about 16% lighter than the same part in PLA."
  },
  {
    question: "Why does hollow + infill cut the weight so much?",
    answer: "Most FDM prints are shells, not solids. The calculator takes the outer volume, subtracts the interior behind your wall thickness, then fills only a percentage of what is left. A 50mm cube printed with a 1.2mm wall at 15% infill uses a small fraction of the filament the same cube would take fully solid."
  },
  {
    question: "Will this tell me if I have enough filament left on the spool?",
    answer: "Yes. Enter your spool price and weight and the tool reports how many prints of that size a full 1kg spool delivers, plus the cost of this one. For the full cost breakdown with electricity, hand the grams over to the Filament Cost Calculator."
  },
  {
    question: "How accurate is the print time estimate?",
    answer: "It is a baseline, not a slicer replacement. Time = material volume × a minutes-per-cm³ constant for the Draft, Normal, or Fine preset. Real times move with layer height, wall count, infill pattern, supports, and speed profiles, so treat the number as a planning figure and take the slicer's estimate as the final word."
  },
  {
    question: "Does colour or additives change the density?",
    answer: "Colour dyes make no practical difference — pigments are a tiny fraction of the mix, so two colours of the same PLA weigh the same. Fillers do matter: carbon-fiber and glass-filled blends such as PLA-CF run slightly denser than the base polymer, which is why they are listed separately."
  }
];

export const resinShrinkageFaq = [
  {
    question: "How do I calculate shrinkage compensation for resin?",
    answer: "Compensation is 1 divided by the shrink factor, where the shrink factor is 1 minus your shrink percentage. For a 2% shrinkage that is 1 ÷ 0.98 = 102.04%, so you type 102.04% into the slicer. The same shrink rate applied to a 25mm slot means modelling it at 25 ÷ 0.98 = 25.51mm."
  },
  {
    question: "Why not just add the shrink percentage to 100%?",
    answer: "Because 1 + 2% = 1.02 assumes the shrink happens after scaling, which is not what happens — you scale a part that then shrinks by 2%, and those two operations do not commute. The exact answer is the reciprocal, 1.020408. The gap is 0.04% in scale, which is invisible on a display piece and exactly the amount that stops a 0.5mm pin sliding into its socket."
  },
  {
    question: "How much does resin actually shrink?",
    answer: "Standard photopolymer resin shrinks roughly 0.3% in XY and around 0.9% in Z, with tough and ABS-like resins slightly higher and flexible resins the worst at 0.7% in XY. FDM filaments sit lower — PLA around 0.3% in XY and almost nothing in Z, because every layer is bonded to the one below it. Treat all of these as starting points, not specifications."
  },
  {
    question: "Why does resin shrink more in Z than in XY?",
    answer: "Each layer cures against a build platform held at a fixed distance, so the fresh layer is pulled tight to the plate while the rest of the part is still relaxing. FDM inverts the pattern entirely: the Z axis is dimensionally locked by layer bonding, and the contraction shows up in XY from thermal stress and tension in the extrusion."
  },
  {
    question: "Should I compensate a miniature standing on a round base?",
    answer: "Usually not. On a 32mm figure, 0.3% is 0.1mm, which is well inside normal print variation and far below what you can see. Compensation earns its keep on mating parts — a pin and a socket, a cap that has to seat, a wall panel that has to meet a corner post at a tight tolerance. If the part has to fit something, measure it; if it just has to stand there, leave it alone."
  },
  {
    question: "What is the most accurate way to find my shrink rate?",
    answer: "Print a coupon and measure it. A 20mm cube costs almost nothing and takes four minutes on FDM. Measure with calipers, then enter the nominal size and your reading into the Measured tab — the tool back-solves the real shrink factor for your brand, batch, wall count, and cure time. Resin keeps creeping after it comes off the plate, so measure again the next day before trusting the number."
  },
  {
    question: "Does shrinkage compensation change the scale of the model?",
    answer: "Only in the sense that it changes the size — it does not change the proportion between features. Shrinkage is near-isotropic, so scaling up by 1.02 to hit a target diameter does not make your miniature's arms longer relative to its body. It is a dimensional fix, not a scale change. If you need a different tabletop scale as well, that is the scale engine's job and the two multiplications stack."
  }
];

export const miniatureResinFaq = [
  {
    question: "How much resin does a 28mm miniature use?",
    answer: "Roughly 5ml to 12ml hollowed, and closer to 20ml solid. A 28×20×40mm bounding box is 22.4ml, but hollowed at a 1.5mm wall with a solid base it holds about 6ml. That is a 73% saving over solid, and it is why hollowing is the default on every slicer worth using."
  },
  {
    question: "How do I calculate the cost of resin for one miniature?",
    answer: "Work out your cost per millilitre, then multiply. A 1kg bottle at $19.99 is 1000ml at $0.020/ml, so a 6ml hollowed miniature with 15% waste is 6.9ml, or about $0.14. A hundred of them consumes 690ml and costs $13.80 in resin — though you still had to buy a whole bottle."
  },
  {
    question: "How much waste should I allow for supports?",
    answer: "15% is a sensible floor for a small hollowed figure: the raft, the supports themselves, the purge down the cup, and the occasional failed hollow that slumps. Terrain, flying models, and anything with a large unsupported flat want 25–40%, because that is where failures cluster. Nothing in a slicer estimate accounts for the rag you wipe the cup with."
  },
  {
    question: "How much does a hollowed 28mm miniature weigh?",
    answer: "About 6.7g. A 6ml hollowed part at 1.12 g/ml comes to 6.7g, and the same model printed solid is closer to 25g. The weight is a useful sanity check in the hand — if a hollowed 28mm feels like 20g, it is not hollow, and you are printing twice the resin you think you are."
  },
  {
    question: "Should I mix resin brands to save money?",
    answer: "No. Different resins have different shrinkage, different cure times, and different shelf lives, and mixing them gives you a blend with the worst of all three properties. The one bottle per brand rule is about consistency, not just storage — a batch that behaves predictably is worth more than a bottle you got half off."
  },
  {
    question: "Is resin or filament cheaper for a whole army?",
    answer: "Per millilitre, resin wins on miniatures. A 1kg PLA roll at $19.99 is $0.020/g, and a 28mm mini at 12g hollowed is $0.24 of filament against about $0.14 in resin. The gap widens as you scale up: resin wins harder on small figures, while filament wins outright on terrain and anything where print time matters more than surface finish."
  }
];

export const layerResolutionFaq = [
  {
    question: "What layer height should I print a miniature at?",
    answer: "0.20mm for most FDM miniatures. Halving it to 0.10mm halves the step size and doubles the layer count, and on anything that is not a sphere or a hooded cloak the difference disappears under primer. Spend the resolution on the model features that actually show stepping, not evenly across every print."
  },
  {
    question: "Does halving the layer height halve the stair-stepping?",
    answer: "Yes, exactly. Every layer contributes one step of precisely your layer height, so 0.2mm steps are 0.2mm and 0.1mm steps are 0.1mm. The step size scales linearly with layer height in every direction, which is why the faceting number in the calculator moves with it rather than staying stubbornly proportional."
  },
  {
    question: "What is the 45° overhang rule?",
    answer: "On FDM, surfaces steeper than about 45° from the build plate need support. The extruded layer has no support structure underneath it to hold it to the plate, so past 45° the plastic droops into the layer below and cures in the wrong shape. The real limit moves with material — PLA manages 55°, TPU gives up around 40° — and with nozzle size, since a wider nozzle bridges the gap better."
  },
  {
    question: "Why does resin need drainage holes instead of support?",
    answer: "Because liquid resin is held up by the build platform, not by anything extruded below it. Every angle prints unsupported at full quality, including a completely flat ceiling. What that ceiling needs is somewhere for uncured resin to go — two 2mm holes let it drain instead of pooling and curing into a bump you have to sand off."
  },
  {
    question: "Does a thinner layer height make prints look better?",
    answer: "It makes them look smoother, which is different. Thinner layers fix geometric stair-stepping, but the ridges and valleys your extruder leaves on top of every step come from nozzle diameter and flow, not layer height. A 0.08mm print with a 0.4mm nozzle still needs sanding to clear the seam line, which is why the calculator warns that geometry is only half of surface quality."
  },
  {
    question: "Is 0.02mm layer height worth it on resin?",
    answer: "Rarely. Going from 0.05mm to 0.02mm buys 0.03mm of Z resolution and costs 2.5× the exposure count, most of which is light bleeding between layers on anything but a fresh vat. The bigger resin win is in XY, where your LCD panel is usually finer than your layer height — which is why 0.05mm resin already looks glassy on a curve where 0.05mm FDM still looks visibly layered."
  }
];
