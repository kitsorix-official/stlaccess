// Export canonical structured data as open, versioned files in public/data/.
// Run with `npm run export:data` after any change in src/data/*.json.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = (file) => join(root, "src", "data", file);
const outputDir = join(root, "public", "data");

const license =
  "Creative Commons Attribution 4.0 International (CC BY 4.0)\n" +
  "https://creativecommons.org/licenses/by/4.0/legalcode\n\n" +
  "You are free to share and adapt these datasets for any purpose, provided you\n" +
  "give appropriate credit to STLACCESS (https://stlaccess.com) and indicate if\n" +
  "changes were made. Full legal code at the URL above.\n";

function readJson(file) {
  return JSON.parse(readFileSync(source(file), "utf8"));
}

function csvValue(value) {
  if (value == null) return "";
  let text;
  if (Array.isArray(value)) {
    text = value.join(" | ");
  } else if (typeof value === "object") {
    text = JSON.stringify(value);
  } else {
    text = String(value);
  }
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function toCsv(rows, keys) {
  return [keys.join(","), ...rows.map((row) => keys.map((key) => csvValue(row[key])).join(","))].join("\n") + "\n";
}

function write(name, contents) {
  const target = join(outputDir, name);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, contents);
  console.log(`  ${name}`);
}

const scales = readJson("scales.json");
const conversions = readJson("conversions.json");
const gameSystems = readJson("gameSystems.json");
const materialDensities = readJson("materialDensities.json");
const filamentPresets = readJson("filamentPresets.json");
const tools = readJson("tools.json");

const scaleEntries = Object.entries(scales).map(([key, value]) => ({ scale: key, ...value }));
const scaleKeys = ["scale", "shortName", "type", "eyeLevelMm", "topOfHeadMm", "ratioEquivalent", "games", "note", "printNote", "commonIssue"];

const conversionKeys = ["slug", "title", "description", "percentage", "math", "sourceLabel", "sourceValue", "targetLabel", "targetValue", "h1Source", "h1Target", "subtext", "popular", "topHeadPercentage"];

const gameKeys = ["slug", "name", "shortName", "scale", "ratioScale", "measurementMethod", "eyeLevelMm", "publisher", "genre", "yearIntroduced", "baseSizes", "description", "metaDescription", "scaleNotes", "relatedConversions", "printingTips", "popularWith"];

const densityKeys = ["name", "density", "family", "notes"];
const presetKeys = ["name", "price", "weight", "type", "brands"];
const toolKeys = ["slug", "name", "shortDescription", "url", "features", "category", "featured"];

console.log("Exporting open datasets → public/data/");

write("LICENSE", license);
write("scale-baselines.json", JSON.stringify(scales, null, 2) + "\n");
write("scale-baselines.csv", toCsv(scaleEntries, scaleKeys));
write("conversion-matrix.json", JSON.stringify(conversions, null, 2) + "\n");
write("conversion-matrix.csv", toCsv(conversions, conversionKeys));
write("game-systems.json", JSON.stringify(gameSystems, null, 2) + "\n");
write("game-systems.csv", toCsv(gameSystems, gameKeys));
write("material-densities.json", JSON.stringify(materialDensities, null, 2) + "\n");
write("material-densities.csv", toCsv(materialDensities, densityKeys));
write("filament-presets.json", JSON.stringify(filamentPresets, null, 2) + "\n");
write("filament-presets.csv", toCsv(filamentPresets, presetKeys));
write("tools.json", JSON.stringify(tools, null, 2) + "\n");

write(
  "index.json",
  JSON.stringify(
    {
      name: "STLACCESS open datasets",
      description: "Scale baselines, conversion percentages, game system scales, material densities, filament presets and tools published by STLACCESS under CC BY 4.0.",
      license: "https://creativecommons.org/licenses/by/4.0/",
      homepage: "https://stlaccess.com/methodology",
      generatedFrom: "src/data/*.json",
      files: [
        { path: "scale-baselines.json", format: "application/json", count: scaleEntries.length, description: "Scale baselines with eye-level and top-of-head millimetre values" },
        { path: "scale-baselines.csv", format: "text/csv", count: scaleEntries.length, description: "Same data as CSV" },
        { path: "conversion-matrix.json", format: "application/json", count: conversions.length, description: "Every verified scale conversion with its math" },
        { path: "conversion-matrix.csv", format: "text/csv", count: conversions.length, description: "Same data as CSV" },
        { path: "game-systems.json", format: "application/json", count: gameSystems.length, description: "Game system scales and print notes" },
        { path: "game-systems.csv", format: "text/csv", count: gameSystems.length, description: "Same data as CSV" },
        { path: "material-densities.json", format: "application/json", count: materialDensities.length, description: "Filament and resin densities in g/cm³" },
        { path: "material-densities.csv", format: "text/csv", count: materialDensities.length, description: "Same data as CSV" },
        { path: "filament-presets.json", format: "application/json", count: filamentPresets.length, description: "Filament price and weight presets" },
        { path: "filament-presets.csv", format: "text/csv", count: filamentPresets.length, description: "Same data as CSV" },
        { path: "tools.json", format: "application/json", count: tools.length, description: "Browser-only tools and their canonical URLs" },
      ],
    },
    null,
    2
  ) + "\n"
);

console.log("Done.");
