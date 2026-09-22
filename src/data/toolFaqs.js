// src/data/toolFaqs.js
// Per-tool FAQ content. Rendered on each calculator page and reused for the
// FAQPage JSON-LD graph in src/pages/calculator/[slug].astro.

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
