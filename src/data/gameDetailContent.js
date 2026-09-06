// src/data/gameDetailContent.js
// Hand-authored, per-game detail content for the /games/[slug] spoke pages.
// Every string below is written by hand in a first-person hobbyist voice so each
// spoke page carries genuinely unique substance rather than template-spliced
// boilerplate. Kept deliberately short per game; the heavier "Deep Dive" blocks
// live in gameGuides.js and are appended on the spoke page too.

export const gameDetailContent = {
  "sci-fi-epic-32mm": {
    title: "How to Scale Sci-Fi Epic STL Proxies for 3D Printing",
    h1: "Sci-Fi Epic (32mm Heroic) Scale for 3D Printing",
    intro:
      "The modern sci-fi epic wargame is where most people first trip over the gap between sculpt generations. Modern heroic (32mm) soldiers sit at 32mm heroic scale, while older classic true-scale (28mm) sculpts and countless third-party proxy files are sized for 28mm. Getting a printed proxy to stand correctly next to your painted army means deciding which baseline your file was actually built on — then setting one clean slicer percentage instead of eyeballing it.",
    body: [
      "When I scale 32mm sci-fi STLs, I start by measuring eye level in the slicer rather than trusting the file's title. A file labelled 'heroic 32mm' that actually measures 35mm to the eyes will print oversized against a genuine modern heroic (32mm) sculpt, and no percentage math can fix a file built on a different reference point. I check the sculpt first, then apply the conversion.",
      "The single most common job is bringing 28mm classic true-scale (28mm) or proxy infantry up to 32mm. That is a 114.3% uniform scale on my Bambu Lab A1 Mini. For vehicles I prefer to scale against a known reference model rather than a formula — armoured transport chassis were designed around specific modern heroic (32mm) proportions and sculptor variation is too wide for a universal number.",
    ],
    printingIntro:
      "For rank-and-file infantry I use a 0.4mm nozzle at 0.08mm layers. Character models and anything with exposed faces earn a 0.2mm nozzle at 0.06mm layers. Vehicles and terrain tolerate 0.12mm layers without visible loss. Scale your STL to the percentage above, lock XYZ, and always print a single test piece before a full squad.",
    faq: [
      { name: "Is the sci-fi epic standard 28mm or 32mm scale?", text: "The modern sci-fi epic standard (2017 onward) is 32mm heroic scale measured to the eyes. Older classic true-scale (28mm) and classic sculpts are closer to 28mm true scale. Scale up 28mm STLs to 114.3% to match a modern heroic (32mm) army." },
      { name: "How do I scale a sci-fi proxy STL?", text: "Measure the file's eye level in your slicer first. If it is a 28mm classic true-scale (28mm) proxy aiming to stand next to modern heroic (32mm), apply a uniform 114.3% scale. If the file is already 32mm, print it as-is." },
      { name: "What is the best FDM profile for 32mm sci-fi infantry?", text: "A 0.4mm nozzle at 0.08mm layers handles rank-and-file well. Swap to a 0.2mm nozzle at 0.06mm layers for character models so faces and weapons stay crisp." },
    ],
  },
  "fantasy-epic-32mm": {
    title: "Scaling Modern Fantasy STL Files to 32mm Heroic Scale",
    h1: "Modern Fantasy Miniature Scale for 3D Printing",
    intro:
      "The modern fantasy wargame shares its 32mm heroic baseline with the 32mm sci-fi epic standard, which makes conversions predictable once you know where a file started. Old classic fantasy sculpts measure closer to 28mm, so the recurring question is whether your printed hero should tower over the old infantry block or sit level with it.",
    body: [
      "I treat modern fantasy conversions in two buckets. Files designed for the current 32mm range print as-is, while classic pre-2015 fantasy sculpts and the many '28mm fantasy' STLs get scaled up to 114.3% to match. It is the same number as the sci-fi epic standard because both ranges share the heroic 175cm baseline.",
      "Modern fantasy models have dramatic poses — flowing cloaks, extended banners, weapon arms swung wide. I always check the slicer's bounding box after scaling because a 14% upscale on a wide pose can push a model past the build plate on small beds. I plan orientation before I commit to supports.",
    ],
    printingIntro:
      "Character models get a 0.2mm nozzle at 0.06mm layers for clean edges on armor and chainmail. Centerpiece dragons, daemons, and undead warlords benefit from the same profile on the faces. FDM handles terrain and large monsters well at 0.1mm layers.",
    faq: [
      { name: "What scale is the modern fantasy wargame?", text: "The modern fantasy wargame uses 32mm heroic scale for new releases, the same baseline as the 32mm sci-fi epic standard. Modern sculpts are designed to this size." },
      { name: "How do I convert old classic fantasy STLs to the modern 32mm range?", text: "Scale pre-2015 28mm classic fantasy sculpts up by 114.3% to match the modern 32mm range. The two otherwise show a noticeable height gap." },
    ],
  },
  "classic-fantasy-28mm": {
    title: "Classic Fantasy 28mm: Ranked Regiments at True Scale",
    h1: "Classic Fantasy (28mm) Miniature Scale for 3D Printing",
    intro:
      "This classic fantasy range deliberately returns to the well-known 28mm scale, which makes it the odd one out against the modern fantasy wargame's 32mm. Ranking a regiment means every model needs to match its neighbours, so consistent scaling matters more than any single conversion.",
    body: [
      "Because the whole range lives at 28mm, I scale every file to a uniform 28mm eye level before I print a block. If I pull an STL from a modern 32mm designer I take it down to 87.5%. The satisfaction of a cleanly ranked regiment comes from that rigour, not from one star model.",
      "Bases matter a lot here. This range uses smaller bases than the modern sci-fi epic standard, so a 32mm-scaled file on a 28mm base crowds the footprint. I check base size against scale together rather than treating them as separate decisions.",
    ],
    printingIntro:
      "Ranked regiment models print best in batches at a consistent 0.4mm nozzle and 0.08mm layers. Characters and unit champions get a 0.2mm nozzle at 0.06mm. Cavalry and chariots print well at a 45-degree angle to keep support scarring off the horse flanks.",
    faq: [
      { name: "Is this scale 28mm or 32mm?", text: "This range is 28mm measured to the eyes, matching the original classic fantasy line. It is smaller than the modern fantasy wargame's 32mm." },
      { name: "Can I use 32mm modern fantasy STLs in a 28mm ranked range?", text: "Yes, but scale the 32mm file down by 87.5% to reach 28mm. Otherwise the model will look oversized in a ranked regiment." },
    ],
  },
  "fantasy-skirmish-25-28mm": {
    title: "Scaling Mythic Fantasy STL Proxies to a 25–28mm Collection",
    h1: "Mythic Fantasy (25–28mm) Miniature Scale for 3D Printing",
    intro:
      "This mythic fantasy setting spans two sculpt generations — older metal figures closer to 25mm and newer plastic kits at 28mm. Because both sizes play together, the hobby accepts the gap, which means you have some freedom when scaling proxies as long as you pick a baseline and stay consistent.",
    body: [
      "For named characters, proportions matter more than in any other range I print for. A 14% scale error on a face is jarring in a way it never is on an armoured soldier. I measure the eyes carefully and favour a 0.2mm nozzle so the sculpt's expression survives scaling.",
      "One quirk I hit repeatedly: metal minis in this setting run thinner than plastic and printed alternatives. When I replace a metal hero with a printed one I add about 3% rather than scale to the raw figure height, so the new model reads the same on the table.",
    ],
    printingIntro:
      "Facing accuracy is the priority, so I use a 0.2mm nozzle at 0.06mm layers for named characters. Rank-and-file warriors print fine at 0.4mm and 0.08mm. Always verify the eye line after scaling — it is the whole game for this range.",
    faq: [
      { name: "What scale is the mythic fantasy setting?", text: "The mythic fantasy setting is 28mm for modern plastic kits, with older metal minis closer to 25mm. Both are played together." },
      { name: "How much should I scale a printed named character?", text: "Start from a 28mm eye line, then add roughly 3% when replacing a thin metal sculpt with a printed one so it reads the same on the table." },
    ],
  },
  "ww2-platoon-28mm": {
    title: "WWII Platoon Scale: 28mm Infantry and the 1:56 Vehicle Question",
    h1: "WWII Platoon (28mm) Miniature Scale for 3D Printing",
    intro:
      "The WWII platoon wargame (28mm) pairs 28mm true-scale infantry with 1:56 vehicles, and this is where the famous 1:48 confusion lives. On paper the vehicle scale is 1:56, but in practice many players run Tamiya 1:48 kits because modern plastic infantry have crept larger and the bulkier hulls look right alongside them.",
    body: [
      "I split my WWII platoon prints into two jobs. Infantry get scaled to a strict 28mm true-scale eye line. Vehicles I scale to look correct under my infantry's geometry — and that often means 1:48 rather than 1:56, because squinting soldier proportions demand a beefier hull.",
      "The math is easy per figure, but the look is decided by the pair. I hang a test vehicle next to an infantry model before printing a motor pool. Numbers get you 90% of the way; the last 10% is eyeballing articulation and hull height, which no formula replaces.",
    ],
    printingIntro:
      "Rank-and-file infantry print at a 0.4mm nozzle and 0.1mm layers; officers and snipers get 0.06mm on a 0.2mm nozzle. Vehicles print fast and clean at 0.2mm layers. Bayonets and rifle barrels soften on FDM, so I orient those parts carefully.",
    faq: [
      { name: "Is the WWII platoon scale 28mm or 1:56?", text: "Both. Infantry are 28mm true scale to the eyes, and the official vehicle scale is 1:56. Many players prefer 1:48 Tamiya kits because they look correct next to bulkier modern plastic infantry." },
      { name: "How do I bring a 1:35 vehicle STL down for a WWII platoon game?", text: "Scale a 1:35 vehicle to 62.5% to reach 1:56. If you target 1:48 instead, use a smaller reduction so the hull lands in the 1:48 sweet spot." },
    ],
  },
  "classic-fantasy-rpg-28mm": {
    title: "Classic Fantasy RPG Miniature Scale: From Goblin to Ancient Dragon",
    h1: "Classic Fantasy RPG (28mm) Miniature Scale for 3D Printing",
    intro:
      "The classic fantasy RPG is the reverse of most games: there is no single scale. A Medium humanoid is 28mm, but monsters range from a 10mm rat to an ancient dragon larger than the whole table. Scaling quality comes from mapping the size classes to real dimensions before you start printing.",
    body: [
      "I keep a quick reference for the RPG size categories so any STL slots in correctly. Small and Medium stay near 28mm, Large pushes above, and Huge and Gargantuan scale by footprint rather than a fixed miniature height. Knowing the category prevents most sizing mistakes before they cost filament.",
      "Because a single session can mix goblins, a boss, and dungeon tiles, I print most monsters fast at a 0.4mm nozzle and reserve the 0.2mm nozzle for hero characters players will hold and inspect. That split keeps print time down without hurting the models that get the attention.",
    ],
    printingIntro:
      "Hero characters and named NPCs get a 0.2mm nozzle at 0.06mm layers for finer detail like spell effects and robes. Monsters and terrain print at a 0.4mm nozzle and 0.1mm layers for speed. Always scale to the RPG size category, not to a guess.",
    faq: [
      { name: "What scale are classic fantasy RPG miniatures?", text: "A Medium humanoid like a human is 28mm true scale to the eyes. Smaller and larger creatures map to the RPG size categories rather than a single number." },
      { name: "What does 28mm mean for a classic fantasy RPG?", text: "28mm represents a Medium creature such as a human, elf, or orc. Save this as your reference before scaling larger or smaller monsters." },
    ],
  },
  "sci-fi-mass-battle-35mm": {
    title: "35mm Sci-Fi Mass-Battle Scale for 3D Printing",
    h1: "Sci-Fi Mass-Battle Game (35mm) Miniature Scale for 3D Printing",
    intro:
      "The sci-fi mass-battle game sits at a 35mm eye-level scale, noticeably larger than the 32mm heroic standard but smaller than the 40mm sci-fi skirmish scale. This in-between size catches people out because an armoured trooper labelled '35mm' measures about 40mm to the top of its helmet — so the number on the box does not match the ruler.",
    body: [
      "When I scale 35mm mass-battle STLs I keep the eye-level reference front of mind. A file built for 32mm that I want to run as a 35mm trooper gets scaled up to 109.4%. The smooth armour surfaces of armoured troopers show layer lines easily, so the profile choice matters as much as the percentage.",
      "This game shares its 1:47 ratio with common sci-fi model kits around 1:48, which is useful for vehicles. I treat the 1:35 to 1:48 adjustment as a one-step conversion and verify the hull sits well next to my infantry before printing the chassis.",
    ],
    printingIntro:
      "The smooth armour rewards fine layers — I print at 0.06mm or finer for troopers. Walker vehicles print well on FDM at 0.1mm. Hold XYZ locked when scaling so proportions stay intact.",
    faq: [
      { name: "What scale is the sci-fi mass-battle game?", text: "It is 35mm eye-level scale (1:47). An armoured trooper measures about 35.7mm to the eyes and about 40mm to the top of the helmet." },
      { name: "How do I scale a 32mm STL up to the 35mm lane?", text: "Upscale a 32mm file by 109.4% to reach the 35mm eye level. Keep uniform scaling locked." },
    ],
  },
  "sci-fi-skirmish-40mm": {
    title: "Sci-Fi Skirmish 40mm Scale for 3D Printing",
    h1: "Sci-Fi Skirmish Game (40mm) Miniature Scale for 3D Printing",
    intro:
      "The sci-fi skirmish game deliberately chose a large 40mm scale to give painters expansive, smooth surfaces — so your printed characters need that extra height or they will read as small next to the official line. Bigger scale also means more material and longer prints, which changes how I plan a batch.",
    body: [
      "The scale decision is simple and the pain is real: everything costs more filament and takes longer. When I print 40mm skirmish characters I scale 35mm mass-battle STLs up by 114.3% and 28mm classics up by 142.9%. The larger canvas makes layer lines more visible on the flat armour panels, so I do not skimp on the profile.",
      "Because the villain tops out near 43mm total, I check bed orientation for faces and helmets immediately. Big, smooth surfaces show a single bad support scar far more than a small infantry model would.",
    ],
    printingIntro:
      "Print at 0.04–0.06mm layers with a 0.2mm nozzle for the cleanest surfaces on armor panels. Terrain and table pieces tolerate 0.08mm. Orient helmets and faces carefully to keep support marks off visible areas.",
    faq: [
      { name: "What scale is the sci-fi skirmish game?", text: "It is 40mm scale, the largest standard space-opera game scale, with the villain reaching about 43mm total height." },
      { name: "How does 40mm compare with the 35mm mass-battle scale?", text: "The 40mm scale is larger. A 35mm mass-battle STL scales up by 114.3% to match the 40mm baseline." },
    ],
  },
  "superhero-skirmish-35mm": {
    title: "Superhero Skirmish 35mm Scale for 3D Printing",
    h1: "Superhero Skirmish Game (35mm) Miniature Scale for 3D Printing",
    intro:
      "The superhero skirmish game uses a 35mm scale with larger-than-life proportions and a focus on recognizable faces and chest emblems. Getting a superhero proxy right is mostly about uniform scaling and protecting the facial detail through the print rather than any exotic percentage.",
    body: [
      "I scale everything to a clean 35mm baseline and keep the pose centered so extended arms and dynamic jumps stay on the plate. The glossy, stylized look of many superhero models means layer lines on large panels are easy to spot, so I bias toward fine layers even on grunt characters.",
      "The composition of a superhero pose matters more than the number. I run the percentage, then check the bounding box in the slicer before committing — a flying character with a raised leg can easily exceed the build volume after scaling.",
    ],
    printingIntro:
      "Use a 0.2mm nozzle at 0.06mm layers to keep faces and chest emblems crisp. Larger character models print well at 0.08mm where the extra speed is worth it. Always confirm the scaled bounding box fits your bed.",
    faq: [
      { name: "What scale is the superhero skirmish game?", text: "It is 35mm scale, though proportions are exaggerated heroic style for readability and painting." },
      { name: "How do I scale a proxy for the 35mm superhero lane?", text: "Set your STL to a 35mm baseline and lock uniform XYZ scaling. Keep poses centered so scaled models stay on the build plate." },
    ],
  },
  "gothic-pulp-skirmish-32mm": {
    title: "Gothic Pulp 32mm Scale for 3D Printing",
    h1: "Gothic Pulp Skirmish Game (32mm) Miniature Scale for 3D Printing",
    intro:
      "This gothic pulp skirmish game rides the 32mm heroic band but with a distinctly slim, stylized silhouette. The challenge is less the scale number and more the slender limbs and ornate bases, which are the first things to lose detail or snap on FDM.",
    body: [
      "I scale gothic pulp STLs to 32mm and immediately look for thin staffs, sword arms, and dangling relics. These print better oriented upright and sometimes need a slightly heavier support density than a store-bought model. The 32mm number is easy; the fragile artefacts are where the real work is.",
      "The bases are busy and characterful, and they add visible height under the figure. I factor the base into my eye-level check before scaling so the character, not the terrain on the base, sets the scale.",
    ],
    printingIntro:
      "A 0.2mm nozzle at 0.06mm layers protects the delicate detail on crew leaders and henchmen. Increase support contact for thin limbs, and always print a test piece before a full crew.",
    faq: [
      { name: "What scale is the gothic pulp skirmish game?", text: "It is 32mm heroic scale. Its models are known for slim, stylized silhouettes and ornate bases." },
      { name: "Why do my gothic pulp prints break?", text: "Thin staffs and extended weapon arms are fragile on FDM. Print upright with adequate support contact and a fine layer profile." },
    ],
  },
  "anime-sci-fi-skirmish-28mm": {
    title: "Anime Sci-Fi 28mm Scale for 3D Printing",
    h1: "Anime Sci-Fi Skirmish (28mm) Miniature Scale for 3D Printing",
    intro:
      "This anime sci-fi skirmish range uses 28mm true scale with realistic, restrained human proportions — the opposite of heroic bulk. Preserving those proportions through scaling is the goal, because an over-bulked proxy reads immediately wrong next to the official line.",
    body: [
      "I keep this range at a strict 28mm eye line and resist any urge to scale for detail. Its selling point is believable, athletic proportions, and adding 14% would turn a trained operative into a bodybuilder. I measure the eyes, apply the percentage, and stop.",
      "These sculpts carry a lot of fine gear — rifles, satchels, cables, and antennae. These thin details are exactly what FDM softens at speed, so I favour a fine nozzle and keep layer height down even on rank-and-file models.",
    ],
    printingIntro:
      "Print at a 0.2mm nozzle and 0.06mm layers to keep rifle barrels, cables, and antennae sharp. Scale to a strict 28mm eye line and avoid over-scaling for detail realism.",
    faq: [
      { name: "What scale is the anime sci-fi skirmish range?", text: "It is 28mm true scale with realistic human proportions rather than heroic exaggeration." },
      { name: "Best FDM settings for this sci-fi range?", text: "Use a fine 0.2mm nozzle at 0.06mm layers to protect the delicate gear detail the range is known for." },
    ],
  },
  "steampunk-fantasy-wargame-30mm": {
    title: "Steampunk Fantasy 30mm Scale for 3D Printing",
    h1: "Steampunk Fantasy Wargame (30mm) Miniature Scale for 3D Printing",
    intro:
      "This steampunk fantasy wargame sits at a stocky 30mm — the in-between scale that is neither true 28mm nor heroic 32mm. The heavily armoured war machines are big enough that FDM handles them well, but getting the infantry-and-machine pairing consistent takes a little planning.",
    body: [
      "The 30mm scale gives the armoured war machines physical presence that 28mm does not, so mixing sources means deciding whether your infantry should hit 30mm to match. I scale everything to a uniform 30mm baseline for a coherent force and keep that single number across an entire battle group.",
      "The war machines are chunky and print cleanly at broader profiles, which balances out the finer infantry work. I print the machines at 0.2mm layers and the troops at a finer profile, so my print time stays sane without sacrificing the faces and weapon detail on the characters.",
    ],
    printingIntro:
      "The war machines print well at a 0.4mm nozzle and 0.2mm layers. Infantry and characters get a 0.4mm nozzle at 0.08mm, or a 0.2mm nozzle for exposed faces. Scale the whole force to 30mm for consistency.",
    faq: [
      { name: "What scale is the steampunk fantasy wargame?", text: "It is 30mm scale, stockier than 28mm with exaggerated armor and weapons." },
      { name: "Should I scale a 30mm proxy up to 32mm?", text: "You can, but the range is designed at 30mm. Keeping everything at 30mm gives a more coherent force than guessing." },
    ],
  },
  "miniature-agnostic-skirmish-28mm": {
    title: "Miniature-Agnostic 28mm Skirmish Scale for 3D Printing",
    h1: "Miniature-Agnostic Skirmish (28mm) Miniature Scale for 3D Printing",
    intro:
      "The fantasy and sci-fi miniature-agnostic skirmish games both run at 28mm true scale, and their warbands are built from whatever modular kits you own. That mixing is the whole point — and it is exactly why scaling your 3D prints to a single 28mm baseline makes the warband cohere.",
    body: [
      "Because the games encourage mixing ranges and sculptors, the worst enemy is a 30mm model parked next to a 28mm one. I scale every printed piece to a strict 28mm eye line so whatever I add to the warband blends with what I already own. The consistency is what sells the group.",
      "The fantasy spellcasters and sci-fi crew both have a lot of small handheld objects — spell effects, blades, gear. These need a fine profile to avoid softening, so I treat infantry detail like the hero models in other games.",
    ],
    printingIntro:
      "Keep every print at a 28mm baseline for a coherent mixed warband. Use a 0.2mm nozzle at 0.06mm layers for wizards, crew leaders, and handheld detail; 0.4mm at 0.08mm works for rank-and-file.",
    faq: [
      { name: "What scale are the miniature-agnostic skirmish games?", text: "Both are 28mm true scale and are designed to be built from mixed miniature ranges." },
      { name: "Why do my modular warband pieces look uneven?", text: "Different sculptors drift from 28mm. Scale every printed piece to a strict 28mm eye line so the mixed warband coheres." },
    ],
  },
  "ranked-fantasy-mass-battle-28mm": {
    title: "Ranked Fantasy 28mm Scale for 3D Printing",
    h1: "Ranked Fantasy Mass-Battle (28mm) Miniature Scale for 3D Printing",
    intro:
      "This ranked fantasy mass-battle game runs at 28mm, where entire regiments of identical models share one footprint. Volume is the theme — you are scaling and printing many of the same figure, so the process has to be repeatable and consistent.",
    body: [
      "I set up one saved slicer profile per regiment and reuse it for every copy, which is what makes mass printing fast. Because all the models in a unit need to match, I scale the first STL to exactly 28mm, lock XYZ, and apply that same profile to the whole batch rather than re-adjusting per file.",
      "Regiment trays mean I rarely worry about per-model base variety, but I do check that every printed copy lands on the tray without overhang. Batch consistency beats chasing one perfect miniature here.",
    ],
    printingIntro:
      "Batch infantry prints at a 0.4mm nozzle and 0.08mm layers for speed and consistency. Save a single 28mm profile and reuse it across the whole regiment so every copy matches.",
    faq: [
      { name: "What scale is the ranked fantasy mass-battle game?", text: "It is a 28mm mass-battle fantasy game where entire regiments share a footprint." },
      { name: "How do I keep a regiment consistent when printing?", text: "Save one 28mm slicer profile, apply it to every copy of the STL, and print the whole batch with identical settings." },
    ],
  },
  "mech-tactical-6mm": {
    title: "Mech Tactical 6mm Scale for 3D Printing",
    h1: "Mech Tactical Game (6mm) Miniature Scale for 3D Printing",
    intro:
      "This mech tactical game runs at a small 6mm epic scale, which flips the usual advice upside down. The war machines are chunky enough that FDM handles them well, but they are small enough that judging detail at this size takes practice. Getting a war machine onto or off the arguably-irrelevant base is where most sizing conversations start.",
    body: [
      "At 6mm, my advice is to think about the war machine's silhouette rather than fine texture. The analog scale matters, but what reads on the table is the overall shape and stance. FDM at 6mm rewards building the profile correctly with a fine nozzle and a steady hand.",
      "I cluster small war machines onto a single build plate and print several in one go, which makes the per-machine time essentially irrelevant. Because they are small, support scarring is proportionally more damaging, so I favour orientations that minimize overhangs on arms and legs.",
    ],
    printingIntro:
      "6mm war machines are small but chunky, so a 0.2mm nozzle with fine layers keeps the profile clean. Print several at once on one plate for efficiency and prefer upright orientations to reduce supports.",
    faq: [
      { name: "What scale is the mech tactical game?", text: "The mech tactical standard is 6mm epic scale focused on vehicles and war machines rather than individual infantry." },
      { name: "Can an FDM printer handle 6mm war machines?", text: "Yes, the war machines are chunky enough to read well. Use a 0.2mm nozzle and print several at once on one plate." },
    ],
  },
  "ww2-company-15mm": {
    title: "15mm WWII Company Scale for 3D Printing",
    h1: "15mm WWII Company Wargame (1:100) Miniature Scale for 3D Printing",
    intro:
      "This 15mm WWII company wargame runs at 15mm / 1:100 scale, dominated by vehicles and armor with infantry as support. The scale is forgiving for tanks, which have chunky surfaces that FDM prints cleanly, but the maths needs care because 15mm and 1:100 are not always identical.",
    body: [
      "I check whether a file means 15mm to the eyes or 1:100 total height before scaling, because the two differ. Tanks and terrain in the 15mm scale are my favourite FDM subjects — they print fast and hold detail well. Infantry at this scale is fiddly, so I reserve the fine profile for them.",
      "Because most of my 15mm output is vehicles, I batch a motor pool on one plate and keep a single scale applied across the force so my tanks all relate to my infantry the same way.",
    ],
    printingIntro:
      "Vehicles and terrain print cleanly at a 0.4mm nozzle and 0.1–0.2mm layers. Infantry needs a fine 0.2mm nozzle at 0.08mm. Confirm whether your file is 15mm eye-level or 1:100 total height before scaling.",
    faq: [
      { name: "Is the 15mm company scale 1:100?", text: "Both terms are used. 15mm can mean eye-level while 1:100 means total height on a 175cm human, so confirm which your STL references." },
      { name: "Best FDM settings for 15mm WWII?", text: "Vehicles print well at a 0.4mm nozzle and 0.1–0.2mm layers. Reserve a fine nozzle for the fiddly infantry." },
    ],
  },
  "sci-fi-mass-battle-10mm": {
    title: "10mm Sci-Fi Mass-Battle Scale for 3D Printing",
    h1: "Sci-Fi Mass-Battle Game (10mm) Miniature Scale for 3D Printing",
    intro:
      "This 10mm sci-fi mass-battle game is a combined-arms game where dropships and vehicles dominate and infantry is tiny. The scale is great for FDM vehicles, but the small infantry is where the limits of a hobby printer start to show.",
    body: [
      "I print the vehicles — dropships, APCs, heavy armor — at a comfortable profile because their chunky panels handle FDM well. For the few stand-out infantry pieces I switch to a fine nozzle, and I am honest with myself that bulk infantry at 10mm is a struggle even on a good machine.",
      "The combined-arms nature means one force spans very different model sizes, so I set expectations per unit rather than hunting one universal profile. Keep the big stuff fast, the small detail fine.",
    ],
    printingIntro:
      "Vehicles and dropships print well at a 0.4mm nozzle and 0.1–0.2mm layers. The smaller infantry benefit from a 0.2mm nozzle. Batch prints by size to keep plates efficient.",
    faq: [
      { name: "What scale is the 10mm combined-arms game?", text: "It is 10mm scale for a combined-arms sci-fi game focused on vehicles and dropships." },
      { name: "Can FDM handle 10mm infantry?", text: "Vehicles print well; the small infantry is challenging. Use a fine nozzle for stand-out pieces and batch by model size." },
    ],
  },
  "epic-sci-fi-8mm": {
    title: "Epic Sci-Fi 8mm Scale for 3D Printing",
    h1: "Epic-Scale Sci-Fi Wargame (8mm) Miniature Scale for 3D Printing",
    intro:
      "This epic-scale sci-fi wargame is an 8mm epic scale where Titans and massed infantry share a table. It shares its scale with an epic Titan warfare range, but the two use different bases, so scaling a file correctly for one does not automatically mean it fits the other.",
    body: [
      "The big draw for FDM is the Titans and large vehicles, which are excellent subjects and print cleanly. The smaller infantry is the hard part — at 8mm it is manageable but rough, and I keep my expectations realistic about what a hobby nozzle can hold.",
      "The base-size difference between this game and the epic Titan warfare range is a real trap. I confirm the footprint for the specific game before scaling so my print sits on the right base rather than needing a re-scale after the fact.",
    ],
    printingIntro:
      "Titans and large vehicles print great on FDM. The 8mm infantry is manageable at a fine profile. Confirm the correct base size for your specific epic-scale game before scaling.",
    faq: [
      { name: "What scale is the epic-scale sci-fi wargame?", text: "It is an 8mm epic scale game. The epic Titan warfare range shares its scale but uses different base sizes." },
      { name: "Can FDM print this epic-scale game?", text: "Yes — Titans and vehicles are excellent FDM subjects. The tiny infantry is the limiting piece." },
    ],
  },
  "miniature-agnostic-sci-fi-32mm": {
    title: "Miniature-Agnostic Sci-Fi 32mm Scale for 3D Printing",
    h1: "Miniature-Agnostic Sci-Fi Wargame (32mm) Miniature Scale for 3D Printing",
    intro:
      "This miniature-agnostic sci-fi wargame is a free ruleset that leans heavily on 3D printing, so its community sends out a lot of STL proxies. It rides the common 32mm heroic band, which makes matching your files to their built baseline the main job.",
    body: [
      "Because the game is system-agnostic and players bring whatever they printed, I just keep everything at a clean 32mm heroic baseline. Most community STLs land there already, so the regular win is verifying the eye line rather than performing an exotic conversion.",
      "The variety of sculptors means baseline drift is the real issue. I measure every STL on import rather than trusting the file name, and I scale anything that drifts back to 32mm before it sits on the table next to the rest of the army.",
    ],
    printingIntro:
      "Print at a 0.4mm nozzle and 0.08mm layers for rank-and-file, finer for characters. Verify every community STL's eye line on import and scale to 32mm for a coherent force.",
    faq: [
      { name: "What scale is the miniature-agnostic sci-fi wargame?", text: "It uses a 32mm heroic baseline, matching the modern sci-fi epic standard." },
      { name: "Why do my community proxies not match?", text: "Different sculptors drift from 32mm. Measure each STL's eye line on import and scale it back to 32mm." },
    ],
  },
  "post-apocalyptic-32mm": {
    title: "Post-Apocalyptic 32mm Scale for 3D Printing",
    h1: "Post-Apocalyptic Wargame (32mm) Miniature Scale for 3D Printing",
    intro:
      "This post-apocalyptic wargame runs at 32mm and is a favourite for printing all the wasteland props — junk piles, raiders, and power-armoured survivors. The theme rewards adding terrain, so the real skill is keeping the figure scale consistent while you pour effort into the diorama bits.",
    body: [
      "I scale the character models to 32mm and treat the props and terrain as a separate, more forgiving job. Because wasteland stuff is meant to look rough and worn, FDM layer lines actually help the aesthetic on barrels, scrap, and structures.",
      "Power armor is the centerpiece of the range and deserves the same care as any hero model. I give the armored figures a fine profile so the plates read cleanly, and print the scruffier scenery faster.",
    ],
    printingIntro:
      "Character models, especially power armor, get a fine profile at 0.2mm and 0.06mm layers. Wasteland props and terrain print fast at a 0.4mm nozzle where layer lines add to the worn look.",
    faq: [
      { name: "What scale is the post-apocalyptic wargame?", text: "It is 32mm scale, matching common modern miniature ranges." },
      { name: "Does the wasteland theme hide print artifacts?", text: "Often yes — the worn, rough aesthetic suits FDM layer lines on terrain and props better than clean sci-fi armor." },
    ],
  },
  "vehicular-combat-1-56": {
    title: "Vehicular Combat Scale for 3D Printing: 1:64 Toy Cars",
    h1: "Vehicular Combat Game Miniature Scale for 3D Printing",
    intro:
      "This vehicular combat game is played with toy cars at right around 1:64 scale, and a huge part of the fun is converting and printing weaponized vehicles. The scale is dictated by the toy cars you use rather than a manufactured miniature line.",
    body: [
      "Because the game assumes you bring your own toy cars, my printing rule is to match whatever die-cast I have. I take the weapon and crew STLs and scale them to sit naturally on a given car's footprint rather than forcing an abstract percentage.",
      "Most of my vehicular combat prints are custom parts on top of a car — turrets, ramps, spikes, crew in turrets. I scale each part by comparing it to the physical car, which beats any formula because toy car sizes vary by manufacturer even within the same nominal scale.",
    ],
    printingIntro:
      "Print weapon and crew parts at a fine profile so they blend into the model. Scale each part against your actual toy car, since die-cast sizes vary by manufacturer even at the same nominal scale.",
    faq: [
      { name: "What scale does the vehicular combat game use?", text: "It uses toy cars around 1:64 scale, but the actual size depends on the die-cast cars you bring." },
      { name: "How do I scale vehicular combat parts?", text: "Scale weapon and crew STLs against your physical toy car, since die-cast sizes vary between manufacturers." },
    ],
  },
  "sci-fi-skirmish-32mm": {
    title: "Sci-Fi Skirmish 32mm Scale for 3D Printing",
    h1: "Sci-Fi Skirmish Game (32mm) Miniature Scale for 3D Printing",
    intro:
      "This sci-fi skirmish game is the small-squad branch of the 32mm heroic standard, and it is a magnet for printed proxies and terrain. Because squads are small and heavily converted, per-model care matters more than in a mass battle.",
    body: [
      "I treat operatives like characters: scale to 32mm and use a fine profile on each, because you handle and inspect a full squad closely. The small roster also means terrain and one-off props get printed more, so I keep a fast profile for scenery.",
      "Modelling for advantage is an open question in skirmish, but I keep it simple and scale every operative to the same 32mm baseline so the whole squad reads as one coherent unit rather than a collection of differently-sized prints.",
    ],
    printingIntro:
      "Scale every operative to 32mm and print at a 0.2mm nozzle and 0.06mm layers for a close-inspectable squad. Use a faster profile for the terrain this skirmish game demands.",
    faq: [
      { name: "What scale is the sci-fi skirmish game?", text: "It uses the same 32mm heroic scale as the sci-fi epic standard, played with small squads." },
      { name: "Should each operative scale the same?", text: "Yes — keep every operative at a 32mm baseline so the squad reads as one coherent unit." },
    ],
  },
  "gang-skirmish-32mm": {
    title: "Gang Skirmish 32mm Scale for 3D Printing",
    h1: "Gang Warfare Skirmish Game (32mm) Miniature Scale for 3D Printing",
    intro:
      "This gang warfare skirmish game is famous for its immense, multi-level hive-city terrain almost as much as its gangs. It is one of the best games for 3D printing because both the underhive scenery and the gang squads submit well to the printer.",
    body: [
      "I scale every gang model to 32mm and separately treat the terrain as a bulk job. Hive terrain is dense, modular, and full of walkways and gantries, which FDM prints in volume far cheaper than buying kits. Layer lines blend into the industrial, worn aesthetic of the underhive.",
      "Gangs are small enough to give each model a fine profile, and the flavor of the game rewards details like masks, cables, and scavenged gear surviving the print. I keep the gang and the terrain on different profiles so I am not slow-printing an entire hive at character settings.",
    ],
    printingIntro:
      "Print gang models at a 0.2mm nozzle and 0.06mm layers to keep the scavenged detail crisp. Bulk hive terrain prints fast at a 0.4mm nozzle where layer lines fit the industrial look.",
    faq: [
      { name: "What scale is the gang warfare skirmish game?", text: "It is a 32mm skirmish game centered on gangs and dense hive-terrain battles." },
      { name: "Is this gang game good for 3D printing?", text: "Extremely — both the gangs and the modular hive terrain print well, and layer lines suit the worn industrial aesthetic." },
    ],
  },
  "fantasy-skirmish-32mm": {
    title: "Fantasy Skirmish 32mm Scale for 3D Printing",
    h1: "Fantasy Skirmish Game (32mm) Miniature Scale for 3D Printing",
    intro:
      "This fantasy skirmish game is the fast, brutal sibling to the modern fantasy wargame, using the same 32mm heroic baseline. A warband is only a handful of models, which makes scaling cohesion and per-model print quality the whole game.",
    body: [
      "I scale every fantasy skirmish warrior to a clean 32mm heroic baseline so the warband coheres, and give each model the fine profile of a character. Because the roster is small, the time cost of detail is low and well worth it.",
      "Cross-range mixing is more forgiving here than in the modern fantasy wargame because models are loosely keyed to warbands. That said, I still measure each STL's eye line on import — the sculptors that make fantasy skirmish STLs drift from 32mm constantly.",
    ],
    printingIntro:
      "Scale the whole warband to 32mm and print every model at a 0.2mm nozzle and 0.06mm layers for the detail a small roster deserves. Terrain can run faster at 0.4mm.",
    faq: [
      { name: "What scale is the fantasy skirmish game?", text: "It uses the same 32mm heroic scale as the modern fantasy wargame, played as a small warband skirmish game." },
      { name: "Do fantasy skirmish STLs match the 32mm modern fantasy range?" , text: "They share the same basis, but sculptors drift. Measure each STL's eye line and scale to a 32mm baseline for cohesion." },
    ],
  },
  "sci-fi-dogfight-1-27": {
    title: "Sci-Fi Dogfight 1:27 Scale for 3D Printing",
    h1: "Sci-Fi Dogfight Game (1:27) Miniature Scale for 3D Printing",
    intro:
      "This sci-fi dogfight game is a 1:27 ship-to-ship game with no infantry at all, which makes it a different kind of 3D printing problem entirely. The scale governs hull and fighter sizes, and the real variables are clean panel lines and avoiding support damage on small wings.",
    body: [
      "At 1:27 the fighters are large enough for FDM to handle detail well, but the small wings and fins are vulnerable. I print fighters upright on their sterns or with careful orientation so cockpit and panel lines survive, and I use a fine profile for the hero fighters players will inspect closely.",
      "The huge size spread — from small fighters to capital ships — is the real planning challenge. I scale by the 1:27 ratio and then confirm each model fits the build plate before printing, because a capital ship can easily be a multi-plate job.",
    ],
    printingIntro:
      "Use a 0.2mm nozzle for cockpit and panel-line detail on fighters. Orient wings and fins carefully to avoid support damage, and confirm large ships fit before printing.",
    faq: [
      { name: "What scale is the dogfight game?", text: "It is a 1:27 ship-scale game. All models are vehicles and fighters rather than infantry." },
      { name: "How do I print a 1:27 ship without support marks?", text: "Orient the hull to keep cockpit and wings clear of supports, use a fine nozzle for detail, and check large ships fit your bed." },
    ],
  },
  "fantasy-mass-battle-35mm": {
    title: "Fantasy Mass-Battle 35mm Scale for 3D Printing",
    h1: "Fantasy Mass-Battle Game (35mm) Miniature Scale for 3D Printing",
    intro:
      "This fantasy mass-battle game sits at 35mm, larger than the 28–32mm mainstream, which makes matching its scale the primary job when you print proxies. The big models give painters room for detail, and FDM handles the larger surfaces well.",
    body: [
      "I scale 35mm fantasy files to a 35mm baseline and appreciate that the larger canvas hides layer lines better than smaller ranges. The trade-off is material cost — each model uses more filament, so I factor that into how I plan a unit rather than printing on a whim.",
      "The 35mm size also means these models land close to the 35mm sci-fi mass-battle lane, but I never assume the two are interchangeable. I scale from a clean 35mm baseline and check the eye line rather than reusing a percentage from another game.",
    ],
    printingIntro:
      "The larger 35mm scale hides layer lines well, so a 0.4mm nozzle at 0.08mm layers balances speed and quality. Characters still get a fine profile for faces. Watch the material cost, since each model is big.",
    faq: [
      { name: "What scale is this fantasy mass-battle game?", text: "It is a 35mm fantasy mass-battle game, larger than the 28–32mm mainstream ranges." },
      { name: "Does 35mm fantasy match the 35mm sci-fi mass-battle scale?", text: "Both are around 35mm, but never assume interchangeability — scale each proxy from a clean 35mm baseline by eye line." },
    ],
  },
};