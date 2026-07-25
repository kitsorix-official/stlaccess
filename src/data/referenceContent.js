// src/data/referenceContent.js
// Contextual content for programmatic reference pages
// Keys match conv.h1Source and conv.h1Target from conversions.json

export const scaleInfo = {
    "28mm": {
        shortName: "28mm",
        games: ["Dungeons & Dragons", "Pathfinder", "Bolt Action infantry", "Mantic Kings of War", "Infinity", "Kill Team", "Necromunda"],
        type: "gaming",
        note: "The classic tabletop standard. Measures to the eyes (160cm on a 175cm human), not the top of the head.",
        printNote: "FDM rarely needs compensation; slight over-extrusion usually cancels any cooling shrinkage.",
        commonIssue: "Older sculpts may be closer to 25mm true-scale. Always check the sculptor's baseline before scaling.",
    },
    "32mm": {
        shortName: "32mm",
        games: ["Warhammer 40,000", "Age of Sigmar", "Malifaux", "Fallout: Wasteland Warfare", "Grimdark Future", "Kill Team", "Necromunda", "Warcry"],
        type: "gaming",
        note: "Games Workshop shifted from 28mm to 32mm between 2014 and 2015 for more facial detail and heroic proportions.",
        printNote: "32mm is forgiving on FDM; layer lines are less visible on larger surfaces.",
        commonIssue: "Some third-party sculptors label 35mm models as '32mm heroic.' Check eye-level measurement, not total height.",
    },
    "35mm": {
        shortName: "35mm",
        games: ["Star Wars: Legion", "Marvel: Crisis Protocol", "Kingdom Death", "Conquest"],
        type: "gaming",
        note: "Popular with painters who want more canvas for freehand detail without entering true bust territory.",
        printNote: "FDM at 35mm benefits from a 0.2mm nozzle at 0.06mm layer height for faces.",
        commonIssue: "35mm is sometimes marketed as 'true 35mm' (realistic proportions) vs 'heroic 35mm' (exaggerated). Check before mixing.",
    },
    "40mm": {
        shortName: "40mm",
        games: ["Star Wars: Shatterpoint", "Inquisitor (GW)", "Display vignettes"],
        type: "gaming",
        note: "Used for centerpiece models, display dioramas, or games where individual heroes need to stand out.",
        printNote: "FDM works well at 40mm for monsters and vehicles with a 0.4mm nozzle.",
        commonIssue: "40mm is sometimes confused with 35mm systems. Always check the manufacturer's stated eye-level measurement.",
    },
    "75mm": {
        shortName: "75mm",
        games: ["Display busts", "Figure painting competitions", "Scale 75 display line"],
        type: "display",
        note: "Not a tabletop wargaming scale. Designed for contest judging and display cabinets.",
        printNote: "75mm on FDM needs a 0.2mm nozzle and very slow print speeds for acceptable surface quality.",
        commonIssue: "75mm sculpts often have separate heads or arms for easier painting access.",
    },
    "1:35": {
        shortName: "1:35",
        games: ["Tamiya", "Trumpeter", "MiniArt", "Military dioramas", "Armor modeling"],
        type: "ratio",
        note: "A true ratio scale, not a 'gaming scale.' Vehicles and armor dominate this scale.",
        printNote: "1:35 vehicles print beautifully on FDM at 0.2mm layers with a 0.4mm nozzle.",
        commonIssue: "1:35 figures from different manufacturers can vary by ±2mm.",
    },
    "1:27": {
        shortName: "1:27",
        games: ["Star Wars: X-Wing (ships)"],
        type: "ratio",
        note: "Ship scale for Star Wars: X-Wing. No infantry-scale miniatures — all models are vehicles/ships.",
        printNote: "Ships are large enough for FDM to handle detail well. Use 0.2mm nozzle for cockpit and panel line detail.",
        commonIssue: "Ships vary greatly in size — from small fighters to huge capital ships. Plan print time accordingly.",
    },
    "1:48": {
        shortName: "1:48",
        games: ["US O-gauge trains", "Bandai Star Wars kits", "Aircraft model kits"],
        type: "ratio",
        note: "Common for vehicles and aircraft. Figures are usually accessories to vehicle kits.",
        printNote: "1:48 aircraft wingspans can be large; plan bed orientation carefully.",
        commonIssue: "1:48 figures are often molded in soft vinyl rather than hard plastic.",
    },
    "1:56": {
        shortName: "1:56",
        games: ["Bolt Action", "Chain of Command", "Gaslands", "28mm wargaming vehicle companion"],
        type: "ratio",
        note: "Often paired with 28mm infantry. Tanks and vehicles at 1:56 look correct next to 28mm figures.",
        printNote: "1:56 tanks are the sweet spot for FDM: large enough for detail, small enough to print quickly.",
        commonIssue: "Some manufacturers label 1:48 vehicles as 'compatible with 28mm.' They are slightly oversized.",
    },
    "1:72": {
        shortName: "1:72",
        games: ["Airfix", "Revell", "Zvezda", "Plastic Soldier Company"],
        type: "ratio",
        note: "Popular for large army builds on a budget. Figures are roughly 20-22mm to the eyes.",
        printNote: "1:72 figures are challenging on FDM due to rifle barrels and bayonets. A 0.2mm nozzle is recommended.",
        commonIssue: "1:72 scale creep exists: modern sculpts are often closer to 1:64.",
    },
    "6mm": {
        shortName: "6mm",
        games: ["BattleTech", "Epic 40,000 (classic)", "Micro-Machines"],
        type: "gaming",
        note: "Epic-scale wargaming focused on vehicles and mechs rather than individual infantry detail.",
        printNote: "6mm Mechs are small but chunky — FDM handles them well. Use 0.2mm nozzle and print multiple at once.",
        commonIssue: "6mm infantry is nearly impossible on FDM; resin is required for foot soldiers at this scale.",
    },
    "8mm": {
        shortName: "8mm",
        games: ["Legions Imperialis", "Adeptus Titanicus", "Epic-scale Horus Heresy"],
        type: "gaming",
        note: "Games Workshop's modern epic scale, successor to classic Epic. Focuses on Titans and massed infantry.",
        printNote: "8mm infantry is small but manageable on FDM. Titans and large vehicles are excellent FDM subjects.",
        commonIssue: "Legions Imperialis and Adeptus Titanicus use the same scale but different base sizes.",
    },
    "10mm": {
        shortName: "10mm",
        games: ["Dropzone Commander", "Warmaster", "Heralds of Ruin"],
        type: "gaming",
        note: "A popular epic scale for combined-arms sci-fi wargaming with dropships and urban combat.",
        printNote: "10mm vehicles are great FDM subjects. Infantry is very small and benefits from resin.",
        commonIssue: "10mm scale is often confused with 6mm or 15mm. Always check the manufacturer's stated scale.",
    },
    "30mm": {
        shortName: "30mm",
        games: ["Warmachine & Hordes", "Confrontation (Rackham)", "Dark Age"],
        type: "gaming",
        note: "Between 28mm and 32mm. Stockier proportions than 28mm with exaggerated weapons and armor.",
        printNote: "30mm Warmachine figures print well on FDM. Warjacks are large steam robots that print at 0.2mm layers.",
        commonIssue: "30mm is sometimes labeled as '28mm heroic' or '32mm heroic' by different manufacturers.",
    },
    "15mm": {
        shortName: "15mm",
        games: ["Flames of War", "Team Yankee", "Epic Armageddon", "DBA", "Warmaster"],
        type: "gaming",
        note: "Popular for historical and epic-scale wargaming. Often used interchangeably with 1:100 ratio scale, though 15mm can refer to either eye-level or total height depending on manufacturer.",
        printNote: "15mm infantry is challenging on FDM. Use 0.2mm nozzle at 0.08mm layer height. Vehicles and terrain are excellent FDM subjects.",
        commonIssue: "15mm and 1:100 are often used interchangeably, but they are not identical. 1:100 at 175cm human = 17.5mm total height, while 15mm can mean 15mm eye-level.",
    },
    "1:100": {
        shortName: "1:100",
        games: ["Flames of War", "Team Yankee", "15mm wargaming", "Micro-armor"],
        type: "ratio",
        note: "Used for large tank battles and regiment-level games where table space is limited.",
        printNote: "1:100 vehicles are manageable on FDM. Infantry at this scale is very challenging without a 0.2mm nozzle.",
        commonIssue: "1:100 figures are roughly 17.5mm total height — slightly taller than 15mm eye-level figures. Check what the manufacturer means.",
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
        physicalContext = `At only ${Math.round(magnitude)}% difference, these two scales are close enough to mix on the same table. Just keep bases consistent and paint styles matched.`;
    } else if (magnitude < 50) {
        physicalContext = `This is a noticeable ${direction}, but you can bridge the gap with basing detail, posture adjustments, or custom base rims.`;
    } else if (magnitude < 150) {
        physicalContext = `This is a big ${direction}. Models will look like different species next to each other unless you apply the conversion to the whole unit or army.`;
    } else {
        physicalContext = `This is a huge jump — more than double or less than half. The result is basically a different model category. Only use this for deliberate display purposes, not mixed armies.`;
    }

    // Use case
    let useCase = "";
    if (isUp) {
        useCase = `You will need this when bringing older or smaller ${src.shortName} models into a modern ${tgt.shortName} collection. ${physicalContext}`;
    } else {
        useCase = `You will need this when fitting oversized ${src.shortName} heroes or monsters into a smaller ${tgt.shortName} regiment, or when printing ${src.shortName} STL files for a ${tgt.shortName} game system. ${physicalContext}`;
    }

    // Print note
    const printNote = `Set your slicer to ${pct}%. ${tgt.printNote || ""}`;

    return {
        useCase,
        sourceContext: `${h1Source} is the ${src.type}. ${src.note} You will see it in: ${src.games.slice(0, 3).join(", ")}.`,
        targetContext: `${h1Target} shows up in: ${tgt.games.slice(0, 3).join(", ")}. ${tgt.note}`,
        physicalContext,
        printNote,
        sourceCaveat: src.commonIssue,
        targetCaveat: tgt.commonIssue,
    };
}
