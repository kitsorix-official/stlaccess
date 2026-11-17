// Shared information architecture for the four STLACCESS learning pillars.
// Used by the homepage, guides index, individual guide pages and llms-full.txt.

export interface LearningTrack {
  key: string;
  title: string;
  shortTitle: string;
  path: string;
  description: string;
  toolPath: string;
  toolName: string;
}

export const learningTracks: LearningTrack[] = [
  {
    key: "scale",
    title: "Miniature scale & conversion math",
    shortTitle: "Scale & math",
    path: "/learn/scale",
    description: "Eye level vs top of head, the 175cm baseline and the exact slicer percentage for every conversion.",
    toolPath: "/tools/slicer-percentage-calculator",
    toolName: "Slicer Percentage Calculator",
  },
  {
    key: "fdm",
    title: "FDM miniature printing",
    shortTitle: "FDM printing",
    path: "/learn/fdm",
    description: "Nozzles, layer heights, supports, wall generators and the print settings I actually use on my A1 Mini.",
    toolPath: "/tools/filament-density-calculator",
    toolName: "Filament Density Calculator",
  },
  {
    key: "resin",
    title: "Resin to FDM conversion",
    shortTitle: "Resin → FDM",
    path: "/learn/resin-to-fdm",
    description: "Split pre-supported resin STLs, thicken the supports and export parts that slice cleanly on FDM.",
    toolPath: "/tools/reference-bar-generator",
    toolName: "Scale Reference Bar Generator",
  },
  {
    key: "stl",
    title: "STL file fundamentals",
    shortTitle: "STL files",
    path: "/learn/stl-files",
    description: "What an STL contains, how to open and inspect one, and why models import at the wrong size.",
    toolPath: "/tools/miniature-scale-identifier",
    toolName: "Miniature Scale Identifier",
  },
];

export const gameSystemsTrack: LearningTrack = {
  key: "games",
  title: "Game system scales",
  shortTitle: "Game systems",
  path: "/games",
  description: "Scale answers for individual tabletop systems, from 28mm fantasy RPGs to 8mm epic sci-fi.",
  toolPath: "/tools/miniature-scale-identifier",
  toolName: "Miniature Scale Identifier",
};

// A guide can belong to more than one pillar. The first key is the primary
// grouping used on /guides; the full array drives sibling links in articles.
const guidePillars: Record<string, string[]> = {
  "175cm-baseline": ["scale", "stl"],
  "28mm-to-32mm-scale-conversion": ["scale"],
  "32mm-to-28mm-scale-conversion": ["scale"],
  "how-to-measure-miniature-scale": ["scale", "stl"],
  "real-world-objects-to-28mm": ["scale", "games"],
  "real-world-objects-to-32mm": ["scale", "games"],
  "fdm-miniature-printing-guide": ["fdm"],
  "arachne-vs-classic-wall-generator-miniatures": ["fdm", "resin"],
  "cura-tree-support-settings-miniatures": ["fdm", "resin"],
  "fdm-vs-resin-miniatures": ["fdm", "resin"],
  "upscaling-3d-prints-detail-limit": ["fdm"],
  "filament-density-weight-cost": ["fdm"],
  "best-budget-3d-printers-wargaming": ["fdm"],
  "resin2fdm-convert-stl-to-fdm-ready": ["resin"],
  "resin2fdm-support-thickness": ["resin", "fdm"],
  "how-to-open-an-stl-file": ["stl"],
  "why-stl-looks-small-in-slicer": ["stl", "scale"],
  "chitubox-lychee-scaling-guide": ["stl", "scale"],
  "dnd-miniature-scale-guide": ["games", "scale"],
  "star-wars-legion-scale-guide": ["games", "scale"],
  "classic-fantasy-rpg-miniature-scale-guide": ["games", "scale"],
  "sci-fi-mass-battle-35mm-scale-guide": ["games", "scale"],
};

const allTracks = [...learningTracks, gameSystemsTrack];

export function getGuidePillars(slug: string): LearningTrack[] {
  const keys = guidePillars[slug] ?? ["stl"];
  return keys
    .map((key) => allTracks.find((track) => track.key === key))
    .filter((track): track is LearningTrack => Boolean(track));
}

export function getPrimaryGuidePillar(slug: string): LearningTrack {
  return getGuidePillars(slug)[0] ?? learningTracks[3];
}

export function getTrackByKey(key: string): LearningTrack | undefined {
  return allTracks.find((track) => track.key === key);
}
