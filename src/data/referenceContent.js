// src/data/referenceContent.js
// Contextual content for programmatic reference pages
// Keys match conv.h1Source and conv.h1Target from conversions.json

export const scaleInfo = {
    "28mm": {
        shortName: "28mm",
        games: ["Dungeons & Dragons", "Pathfinder", "Oldhammer", "Bolt Action infantry", "Mantic Kings of War"],
        type: "heroic fantasy and historical wargaming standard",
        note: "The classic tabletop standard. Measures to the eyes (160cm on a 175cm human), not the top of the head. Helmets, top-knots, and ornate headgear often add 2-4mm of perceived height.",
        resinOffset: "+1.5%",
        fdmNote: "FDM printers rarely need compensation; slight over-extrusion usually cancels any shrinkage.",
        commonIssue: "Older sculpts may be closer to 25mm true-scale. Always verify the sculptor's baseline before scaling.",
    },
    "32mm": {
        shortName: "32mm",
        games: ["Warhammer 40,000", "Age of Sigmar", "Infinity", "Malifaux", "Star Wars: Legion (early waves)"],
        type: "modern heroic standard",
        note: "Games Workshop shifted from 28mm to 32mm between 2014 and 2015 for more facial detail and heroic proportions. Non-GW sculptors often call this 'heroic 32mm' because limbs and weapons are slightly oversized.",
        resinOffset: "+1.5%",
        fdmNote: "32mm is forgiving on FDM; layer lines are less visible on larger surfaces.",
        commonIssue: "Some third-party sculptors label 35mm models as '32mm heroic.' Check eye-level measurement, not total height.",
    },
    "35mm": {
        shortName: "35mm",
        games: ["Star Wars: Legion (current)", "Kingdom Death", "Scale 75", "Boutique skirmish games"],
        type: "large heroic / boutique skirmish hybrid",
        note: "Popular with painters who want more canvas for freehand detail without entering true bust territory. Often sits between 32mm heroic and 40mm skirmish scales.",
        resinOffset: "+2%",
        fdmNote: "FDM at 35mm starts to show detail limitations on faces; consider 0.12mm layer height or resin for character models.",
        commonIssue: "35mm is sometimes marketed as 'true 35mm' (realistic proportions) vs 'heroic 35mm' (exaggerated). Verify before mixing.",
    },
    "40mm": {
        shortName: "40mm",
        games: ["Star Wars: Shatterpoint", "Inquisitor (GW specialist game)", "Heroic 40mm custom scenes", "Display vignettes"],
        type: "oversized hero / skirmish scale",
        note: "Used for centerpiece models, display dioramas, or games where individual heroes need to stand out. A 40mm figure has roughly twice the surface area of a 28mm model.",
        resinOffset: "+2%",
        fdmNote: "FDM works well at 40mm for monsters and vehicles; faces still benefit from resin.",
        commonIssue: "40mm bases can destabilize on uneven terrain. Consider magnetizing or weighting the base.",
    },
    "75mm": {
        shortName: "75mm",
        games: ["Display busts", "Figure painting competitions", "Scale 75 display line", "Cabinet showcase pieces"],
        type: "display / competition scale",
        note: "Not a tabletop wargaming scale. A 75mm figure is roughly 1:24 scale and designed for contest judging and display cabinets. Eyes and skin texture become the primary focus.",
        resinOffset: "+2.5%",
        fdmNote: "FDM is generally unsuitable for 75mm display pieces; resin is strongly recommended for surface quality.",
        commonIssue: "75mm sculpts often have separate heads or arms for easier painting access. Check assembly instructions before scaling a monolithic STL.",
    },
    "1:35": {
        shortName: "1:35",
        games: ["Tamiya", "Trumpeter", "MiniArt", "Military dioramas", "Armor modeling"],
        type: "military model kit standard",
        note: "A true ratio scale, not a 'gaming scale.' A 1:35 human is approximately 50mm tall to the top of the head and 45.7mm to the eyes. Vehicles and armor dominate this scale.",
        resinOffset: "+1%",
        fdmNote: "1:35 vehicles print beautifully on FDM at 0.2mm layers. Figures are better in resin.",
        commonIssue: "1:35 figures from different manufacturers can vary by plus or minus 2mm due to nationality and era differences in uniform and equipment.",
    },
    "1:48": {
        shortName: "1:48",
        games: ["US O-gauge trains", "Bandai Star Wars kits", "Aircraft model kits", "Die-cast vehicle collectors"],
        type: "quarter-scale / aircraft and vehicle standard",
        note: "Common for vehicles and aircraft. Figures in this scale are smaller than typical wargaming miniatures and are usually accessories to a vehicle kit rather than standalone game pieces.",
        resinOffset: "+1%",
        fdmNote: "1:48 aircraft wingspans can be large; plan bed orientation carefully to avoid supports on visible surfaces.",
        commonIssue: "1:48 figures are often molded in soft vinyl rather than hard plastic. If 3D printing replacements, use flexible resin or increase wall thickness.",
    },
    "1:56": {
        shortName: "1:56",
        games: ["Bolt Action", "Chain of Command", "Flames of War (vehicle scale)", "28mm wargaming vehicle companion"],
        type: "wargaming vehicle companion scale",
        note: "Often paired with 28mm infantry. Tanks and vehicles at 1:56 look correct next to 28mm figures because the vehicle scale accounts for ground clearance and hull height, not just eye level.",
        resinOffset: "+1.5%",
        fdmNote: "1:56 tanks are the sweet spot for FDM printing: large enough for detail, small enough to print quickly.",
        commonIssue: "Some manufacturers label 1:48 vehicles as 'compatible with 28mm.' They are slightly oversized. Stick to 1:56 for visual harmony.",
    },
    "1:72": {
        shortName: "1:72",
        games: ["Airfix", "Revell", "Zvezda", "Plastic Soldier Company", "Frostgrave Ghost Archipelago ships"],
        type: "small-scale military / budget army builds",
        note: "Popular for large army builds on a budget. Figures are roughly 20-22mm to the eyes. Entire platoons fit in a shoebox, making this scale ideal for travel and storage.",
        resinOffset: "+1%",
        fdmNote: "1:72 figures are challenging on FDM due to rifle barrels and bayonets. Resin or a 0.25mm nozzle is recommended.",
        commonIssue: "1:72 scale creep exists too: modern sculpts are often closer to 1:64. Check base-to-eye measurements before committing to a print.",
    },
    "1:100": {
        shortName: "1:100",
        games: ["Flames of War", "Team Yankee", "15mm wargaming", "Micro-armor"],
        type: "micro-armor / mass-battle standard",
        note: "Used for large tank battles and regiment-level games where table space is limited. Figures are approximately 15mm tall. A single A4 sheet of terrain can represent an entire battlefield.",
        resinOffset: "+1%",
        fdmNote: "1:100 is extremely challenging for FDM figures; vehicles are manageable. Resin is strongly preferred for infantry at this scale.",
        commonIssue: "1:100 and 15mm are often used interchangeably, but 15mm can mean 15mm to the eyes or 15mm total height. Our calculator uses eye-level baselines to eliminate ambiguity.",
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

    // Physical context based on magnitude - rewritten for direct voice
    let physicalContext = "";
    if (magnitude < 10) {
        physicalContext = `At only ${Math.round(magnitude)}% difference, these scales can mix on the same table without looking wrong. Keep bases consistent and paint styles matched.`;
    } else if (magnitude < 50) {
        physicalContext = `This ${direction} is noticeable but manageable. Most painters bridge the gap with basing detail, posture adjustments, or custom base rims.`;
    } else if (magnitude < 150) {
        physicalContext = `This is a big ${direction}. Models will look like different species next to each other unless you apply the conversion to the entire unit or army.`;
    } else {
        physicalContext = `This is a dramatic jump—more than double or less than half. The result is essentially a different model category. Use this only for deliberate artistic or display purposes, not mixed armies.`;
    }

    // Use case - rewritten with direct voice, no AI patterns
    let useCase = "";
    if (isUp) {
        useCase = `You need this when bringing older or smaller ${src.shortName} models into a modern ${tgt.shortName} collection. ${physicalContext}`;
    } else {
        useCase = `You need this when fitting oversized ${src.shortName} heroes or monsters into a smaller ${tgt.shortName} regiment, or when printing ${src.shortName} STL files for a ${tgt.shortName} game system. ${physicalContext}`;
    }

    // Resin note - simplified, no awkward construction
    const resinNote = `Apply ${pct}% uniform scaling in your slicer. For resin prints, add ${tgt.resinOffset} shrinkage compensation. ${tgt.fdmNote}`;

    return {
        useCase,
        sourceContext: `${h1Source} is the ${src.type}. ${src.note} Common systems: ${src.games.slice(0, 3).join(", ")}.`,
        targetContext: `${h1Target} is used by ${tgt.games.slice(0, 3).join(", ")}. ${tgt.note}`,
        physicalContext,
        resinNote,
        sourceCaveat: src.commonIssue,
        targetCaveat: tgt.commonIssue,
    };
}