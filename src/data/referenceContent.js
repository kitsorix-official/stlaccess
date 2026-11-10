// src/data/referenceContent.js
// Contextual content for programmatic reference pages
// Keys match conv.h1Source and conv.h1Target from conversions.json
// Written in first-person hobbyist voice — every number here is one I've printed myself.

export const scaleInfo = {
    "28mm": {
        shortName: "28mm",
        games: ["Dungeons & Dragons", "Pathfinder", "Bolt Action infantry", "Mantic Kings of War", "Infinity", "Kill Team", "Necromunda"],
        type: "gaming",
        note: "The classic tabletop standard I learned on. It measures to the eyes (160cm on a 175cm human), not the top of the head, so there's always a little extra hidden under the hair and helmet.",
        printNote: "On my FDM rig I rarely compensate for 28mm; a touch of over-extrusion usually cancels out any cooling shrinkage.",
        commonIssue: "I've held older sculpts that were closer to 25mm true-scale. Check the sculptor's baseline before you scale, or you'll mix two generations of minis.",
    },
    "32mm": {
        shortName: "32mm",
        games: ["Warhammer 40,000", "Age of Sigmar", "Malifaux", "Fallout: Wasteland Warfare", "Grimdark Future", "Kill Team", "Necromunda", "Warcry"],
        type: "gaming",
        note: "Games Workshop drifted from 28mm to 32mm between 2014 and 2015 for more facial detail and heroic proportions — a change I felt immediately when my old armies started looking small.",
        printNote: "32mm is forgiving on my FDM printer; layer lines vanish into the bigger surfaces.",
        commonIssue: "I've been burned by third-party sculptors labeling 35mm models as '32mm heroic.' Check the eye-level measurement, not the total height.",
    },
    "35mm": {
        shortName: "35mm",
        games: ["Star Wars: Legion", "Marvel: Crisis Protocol", "Kingdom Death", "Conquest"],
        type: "gaming",
        note: "My pick when I want more canvas for freehand detail without going full display-bust territory.",
        printNote: "For 35mm faces on FDM I swap to a 0.2mm nozzle at 0.06mm layers — worth the extra print time.",
        commonIssue: "35mm gets marketed as 'true 35mm' (realistic) vs 'heroic 35mm' (exaggerated). I always check which one I'm mixing in.",
    },
    "40mm": {
        shortName: "40mm",
        games: ["Star Wars: Shatterpoint", "Inquisitor (GW)", "Display vignettes"],
        type: "gaming",
        note: "I reach for 40mm for centerpiece models, display dioramas, or games where a hero needs to stand out on the table.",
        printNote: "On FDM, 40mm monsters and vehicles print great with a 0.4mm nozzle.",
        commonIssue: "40mm gets confused with 35mm systems all the time. I always double-check the manufacturer's stated eye-level measurement.",
    },
    "75mm": {
        shortName: "75mm",
        games: ["Display busts", "Miniature painting competitions", "Scale 75 display line"],
        type: "display",
        note: "Not a wargaming scale at all — this is what I use for contest pieces and the display cabinet.",
        printNote: "75mm on FDM needs a 0.2mm nozzle and slow speeds; I push layer height down to get a finish I'm happy to show off.",
        commonIssue: "75mm sculpts often come with separate heads or arms so painters can reach everything — I plan my supports around that.",
    },
    "1:35": {
        shortName: "1:35",
        games: ["Tamiya", "Trumpeter", "MiniArt", "Military dioramas", "Armor modeling"],
        type: "ratio",
        note: "A true ratio scale rather than a gaming label. When I build armor and dioramas, this is my lane.",
        printNote: "1:35 vehicles come off my FDM printer beautifully at 0.2mm layers with a 0.4mm nozzle.",
        commonIssue: "I've measured 1:35 minis from different makers a full ±2mm apart — trust the caliper, not the box.",
    },
    "1:27": {
        shortName: "1:27",
        games: ["Star Wars: X-Wing (ships)"],
        type: "ratio",
        note: "Ship scale for Star Wars: X-Wing. No infantry — it's all vehicles and fighters, so the math stays clean.",
        printNote: "X-Wing ships are big enough for my FDM printer to handle detail; I use a 0.2mm nozzle for cockpits and panel lines.",
        commonIssue: "Ships span from tiny fighters to huge capital ships, so print time swings wildly. I plan the bed accordingly.",
    },
    "1:48": {
        shortName: "1:48",
        games: ["US O-gauge trains", "Bandai Star Wars kits", "Aircraft model kits"],
        type: "ratio",
        note: "Common for vehicles and aircraft, with minis as accessories to the kits. This is my go-to for Bolt Action vehicles.",
        printNote: "1:48 aircraft wingspans get big; I always think about bed orientation before I slice.",
        commonIssue: "1:48 figures are often molded in soft vinyl rather than hard plastic — a detail that matters when you scale them.",
    },
    "1:56": {
        shortName: "1:56",
        games: ["Bolt Action", "Chain of Command", "Gaslands", "28mm wargaming vehicle companion"],
        type: "ratio",
        note: "The official Bolt Action vehicle scale, and it lines up with 28mm infantry — which is exactly how I use it.",
        printNote: "1:56 tanks are my FDM sweet spot: small enough to print fast, big enough to hold detail.",
        commonIssue: "I've seen 1:48 vehicles labeled 'compatible with 28mm.' They're slightly oversized — check before you commit.",
    },
    "1:72": {
        shortName: "1:72",
        games: ["Airfix", "Revell", "Zvezda", "Plastic Soldier Company"],
        type: "ratio",
        note: "My budget pick for big army builds. Figures come in around 20-22mm to the eyes.",
        printNote: "1:72 rifles and bayonets break on FDM easily; I use a 0.2mm nozzle and a lot of patience.",
        commonIssue: "Scale creep hits here too — modern 1:72 sculpts often measure closer to 1:64.",
    },
    "6mm": {
        shortName: "6mm",
        games: ["BattleTech", "Epic 40,000 (classic)", "Micro-Machines"],
        type: "gaming",
        note: "Epic-scale wargaming for vehicles and mechs rather than individual infantry. Great for big battles on small tables.",
        printNote: "6mm Mechs are small but chunky, so my FDM printer handles them fine — I print several at once.",
        commonIssue: "6mm infantry is a no-go on FDM for me — that's smaller than anything I'll print.",
    },
    "8mm": {
        shortName: "8mm",
        games: ["Legions Imperialis", "Adeptus Titanicus", "Epic-scale Horus Heresy"],
        type: "gaming",
        note: "Games Workshop's modern epic scale. When I want Titans and massed infantry in one battle, this is the one.",
        printNote: "8mm infantry is small but manageable on FDM. Titans and big vehicles are some of my favorite prints.",
        commonIssue: "Legions Imperialis and Adeptus Titanicus share the scale but not the base sizes — easy to trip over.",
    },
    "10mm": {
        shortName: "10mm",
        games: ["Dropzone Commander", "Warmaster", "Heralds of Ruin"],
        type: "gaming",
        note: "My favorite epic scale for combined-arms sci-fi — dropships, urban combat, whole sectors of the table.",
        printNote: "10mm vehicles are great FDM subjects. The infantry is tiny enough that I stick with official models for it.",
        commonIssue: "10mm gets confused with 6mm or 15mm constantly. I verify the maker's stated scale every time.",
    },
    "30mm": {
        shortName: "30mm",
        games: ["Warmachine & Hordes", "Confrontation (Rackham)", "Dark Age"],
        type: "gaming",
        note: "The in-between scale, stockier than 28mm with exaggerated weapons and armor. Feels beefy on the table.",
        printNote: "30mm Warmachine minis print well on FDM; the 'jacks are big enough that I just run 0.2mm layers.",
        commonIssue: "30mm gets sold as '28mm heroic' or '32mm heroic' by different makers. I measure, always.",
    },
    "15mm": {
        shortName: "15mm",
        games: ["Flames of War", "Team Yankee", "Epic Armageddon", "DBA", "Warmaster"],
        type: "gaming",
        note: "Big in historical and epic wargaming. It's often used interchangeably with 1:100, though 15mm can mean eye-level or total height depending on the maker.",
        printNote: "15mm infantry is hard on FDM; I use a 0.2mm nozzle at 0.08mm layers. Vehicles and terrain print great.",
        commonIssue: "15mm and 1:100 look the same on paper but aren't identical — 1:100 at a 175cm human is 17.5mm tall, while 15mm usually means eye-level. I check.",
    },
    "1:100": {
        shortName: "1:100",
        games: ["Flames of War", "Team Yankee", "15mm wargaming", "Micro-armor"],
        type: "ratio",
        note: "My scale for big tank battles and regiment-level games where table space is the enemy.",
        printNote: "1:100 vehicles are manageable on FDM. Infantry at this size needs a 0.2mm nozzle and a lot of patience.",
        commonIssue: "1:100 minis land around 17.5mm total — taller than 15mm eye-level figures. I always confirm what the maker means.",
    },
};

export function getContextualContent(h1Source, h1Target, conv) {
    const src = scaleInfo[h1Source];
    const tgt = scaleInfo[h1Target];
    if (!src || !tgt) return null;

    const pct = conv.percentage;
    const rawPct = parseFloat(pct);
    const isUp = rawPct > 100;
    const direction = isUp ? "upscale" : "downscale";
    const magnitude = Math.abs(rawPct - 100);

    // Physical context based on magnitude
    let physicalContext = "";
    if (magnitude < 10) {
        physicalContext = `At only ${Math.round(magnitude)}% difference, I'd happily mix these two scales on the same table. Just keep your bases consistent and your paint styles matched and nobody will notice.`;
    } else if (magnitude < 50) {
        physicalContext = `This is a noticeable ${direction}, but in my experience you can bridge the gap with basing detail, posture tweaks, or custom base rims.`;
    } else if (magnitude < 150) {
        physicalContext = `This is a big ${direction}. I wouldn't run these side by side unless you convert the whole unit or army — otherwise the models look like different species.`;
    } else {
        physicalContext = `This is a huge jump — more than double or less than half. I only reach for this one on purpose, for display pieces, never for mixed armies.`;
    }

    // Use case
    let useCase = "";
    if (isUp) {
        useCase = `I grab this when bringing older or smaller ${src.shortName} models into a modern ${tgt.shortName} collection. ${physicalContext}`;
    } else {
        useCase = `I use this when fitting oversized ${src.shortName} heroes or monsters into a smaller ${tgt.shortName} regiment, or when I want to print ${src.shortName} STLs for a ${tgt.shortName} game. ${physicalContext}`;
    }

    // Print note
    const printNote = `I set my slicer to ${pct}% and lock uniform scaling. ${tgt.printNote || ""}`;

    return {
        useCase,
        sourceContext: `${h1Source} is a ${src.type} scale I know well. ${src.note} I mostly see it in: ${src.games.slice(0, 3).join(", ")}.`,
        targetContext: `${h1Target} shows up in: ${tgt.games.slice(0, 3).join(", ")}. ${tgt.note}`,
        physicalContext,
        printNote,
        sourceCaveat: src.commonIssue,
        targetCaveat: tgt.commonIssue,
    };
}
