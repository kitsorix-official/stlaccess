// scripts/export-data.mjs
// Exports the canonical structured data as open, versioned files in public/data/
// (served at https://stlaccess.com/data/*).
//
// Running `npm run export:data` regenerates these from src/data/*.json. The files
// are the machine-readable source of truth that llms.txt, the Scale Standard page,
// and third parties all link to. Keep them in sync with any data change
// (standing rule: docs update in the same commit as data).
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = (p) => join(root, "src", "data", p);
const outDir = join(root, "public", "data");

const CC_BY_4_0 =
  "Creative Commons Attribution 4.0 International (CC BY 4.0)\n" +
  "https://creativecommons.org/licenses/by/4.0/legalcode\n\n" +
  "You are free to share and adapt this dataset for any purpose, provided you\n" +
  "give appropriate credit to STLACCESS (https://stlaccess.com) and indicate\n" +
  "if changes were made. Full legal code at the URL above.\n";

function csvEscape(value) {
  const s = String(value ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function toCsv(rows, keys) {
  const header = keys.join(",");
  const lines = rows.map((row) => keys.map((k) => csvEscape(row[k])).join(","));
  return [header, ...lines].join("\n") + "\n";
}

function write(name, contents) {
  const target = join(outDir, name);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, contents);
  console.log(`  ${name}`);
}

console.log("Exporting open datasets → public/data/");

// --- Scale baselines (16 scales) ---
const baselines = JSON.parse(readFileSync(src("scaleBaselines.json"), "utf8"));
const baselineRows = Object.entries(baselines).map(([scale, b]) => ({
  scale,
  shortName: b.shortName,
  type: b.type,
  eyeLevelMm: b.eyeLevelMm,
  topOfHeadMm: b.topOfHeadMm,
  ratioEquivalent: b.ratioEquivalent,
  games: Array.isArray(b.games) ? b.games.join(" | ") : "",
  note: b.note ?? "",
}));
const baselineKeys = ["scale", "shortName", "type", "eyeLevelMm", "topOfHeadMm", "ratioEquivalent", "games", "note"];
write("scale-baselines.json", JSON.stringify(baselines, null, 2) + "\n");
write("scale-baselines.csv", toCsv(baselineRows, baselineKeys));

// --- Conversion matrix (46 conversions) ---
const matrix = JSON.parse(readFileSync(src("conversionMatrix.json"), "utf8"));
const matrixKeys = ["slug", "title", "description", "percentage", "math", "sourceLabel", "sourceValue", "targetLabel", "targetValue", "h1Source", "h1Target", "subtext", "popular", "topHeadPercentage"];
write("conversion-matrix.json", JSON.stringify(matrix, null, 2) + "\n");
write("conversion-matrix.csv", toCsv(matrix, matrixKeys));

// --- FDM profiles (26) ---
const profiles = JSON.parse(readFileSync(src("fdmProfiles.json"), "utf8"));
const profileKeys = ["slug", "name", "shortName", "scale", "ratioScale", "measurementMethod", "eyeLevelMm", "genre", "baseSizes", "description", "metaDescription", "scaleNotes", "printingTips", "popularWith"];
write("fdm-profiles.json", JSON.stringify(profiles, null, 2) + "\n");
write("fdm-profiles.csv", toCsv(profiles, profileKeys));

// --- License + manifest ---
write(
  "LICENSE",
  CC_BY_4_0
);
write(
  "index.json",
  JSON.stringify(
    {
      name: "STLACCESS open datasets",
      description:
        "Miniature scale baselines, conversion percentages, and FDM printing profiles published by STLACCESS under CC BY 4.0.",
      license: "https://creativecommons.org/licenses/by/4.0/",
      homepage: "https://stlaccess.com/scale-standard",
      files: [
        { path: "scale-baselines.json", format: "application/json", description: "16 scale baselines (eye level / top of head mm, ratio equivalent)" },
        { path: "scale-baselines.csv", format: "text/csv", description: "Same as above, CSV" },
        { path: "conversion-matrix.json", format: "application/json", description: "46 verified scale conversions with math" },
        { path: "conversion-matrix.csv", format: "text/csv", description: "Same as above, CSV" },
        { path: "fdm-profiles.json", format: "application/json", description: "26 anonymized FDM printing profile scale guides" },
        { path: "fdm-profiles.csv", format: "text/csv", description: "Same as above, CSV" },
      ],
    },
    null,
    2
  ) + "\n"
);

console.log("Done.");