// Single source of truth for the filament density calculator FAQ.
// Used both by the visible FAQ in FilamentDensityTool.astro and by the
// FAQPage JSON-LD on /tools/filament-density-calculator, so the markup
// always matches what the visitor can actually read on the page.
const filamentDensityFaq = [
  {
    question: "How do you calculate filament weight from volume?",
    answer: "Weight = volume × density. A 10cm³ solid model in PLA at 1.24g/cm³ weighs 12.4g. For a hollow FDM print, subtract the interior behind the wall thickness, then add only the chosen infill percentage of what remains.",
  },
  {
    question: "What is the density of PLA, PETG, ABS and resin?",
    answer: "PLA is 1.24g/cm³, PETG 1.27, ABS 1.04, ASA 1.07, TPU 1.21 and nylon about 1.14. Standard resin sits near 1.10 and ABS-like resin around 1.15. Denser material means a heavier print at the same volume.",
  },
  {
    question: "Why does hollow + infill cut the weight so much?",
    answer: "Most FDM prints are shells, not solids. The calculator takes the outer volume, subtracts the cavity behind your wall thickness, and fills only a fraction of that cavity. A 50mm cube with a 1.2mm wall at 15% infill uses a small fraction of the filament a solid cube would need.",
  },
  {
    question: "Does colour or additives change density?",
    answer: "Colour pigment makes no practical difference. Fillers do: carbon-fibre blends such as PLA-CF are slightly denser than base PLA, which is why they have their own preset in the table below.",
  },
  {
    question: "How accurate is the print time estimate?",
    answer: "It is a planning baseline, not a slicer replacement. Time is material volume multiplied by a minutes-per-cm³ constant for the chosen quality preset. Supports, wall count, infill pattern and speed profiles all move the real number, so take the slicer estimate as final.",
  },
];

export default filamentDensityFaq;
