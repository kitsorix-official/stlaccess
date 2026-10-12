/**
 * Validates the workflow coupling data in src/data/trainCouplings.json against
 * the actual build output.
 *
 * The whole point of the coupling layer is that it is data-driven, which means
 * a typo in a route silently produces a dead link instead of a build error.
 * This catches that:
 *
 *   1. every coupling key is a real built route
 *   2. every prev/next target is a real built route
 *   3. every coupling names a station that exists
 *   4. every content page is covered (no page left as a dead end)
 *   5. no coupling points at a utility page or a section index
 *
 * Run after `npm run build`. See
 * ~/Documents/STLACCESS_Workflow_Fixes_Backlog.md section 5.
 *
 * Usage: npm run check:couplings
 */
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/** Utility pages and section indexes deliberately carry no couplings. */
const NON_CONTENT = new Set([
  "/404",
  "/about",
  "/contact",
  "/faq",
  "/legal",
  "/privacy",
  "/terms",
  "/3d-math",
  "/fdm",
  "/guides",
]);

/** Every built HTML route, normalised the same way Layout normalises pathnames. */
function builtRoutes() {
  const routes = new Set();
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith(".html")) {
        let p = "/" + relative(join(root, "dist"), full);
        p = p.replace(/\/index\.html$/, "/").replace(/\.html$/, "");
        if (p === "/index" || p === "") p = "/";
        routes.add(p);
      }
    }
  };
  walk(join(root, "dist"));
  return routes;
}

const { stations, couplings, gaps } = JSON.parse(
  readFileSync(join(root, "src/data/trainCouplings.json"), "utf8"),
);

const built = builtRoutes();
const problems = [];

for (const [route, coupling] of Object.entries(couplings)) {
  if (!built.has(route)) problems.push(`key is not a built route: ${route}`);
  if (!stations[coupling.station])
    problems.push(`${route}: unknown station "${coupling.station}"`);
  if (!("prev" in coupling) || !("next" in coupling))
    problems.push(`${route}: missing prev/next array`);
  for (const target of [...(coupling.prev ?? []), ...(coupling.next ?? [])]) {
    if (!built.has(target)) problems.push(`${route} -> target not built: ${target}`);
  }
}

const covered = new Set(Object.keys(couplings));
const content = [...built].filter((r) => !NON_CONTENT.has(r));

for (const route of content) {
  if (!covered.has(route)) problems.push(`content page has no coupling: ${route}`);
}
for (const route of covered) {
  if (NON_CONTENT.has(route)) problems.push(`coupling on a non-content page: ${route}`);
  if (!content.includes(route)) problems.push(`coupling routes to nothing: ${route}`);
}

console.log(`stations:  ${Object.keys(stations).length}`);
console.log(`couplings: ${covered.size}`);
console.log(`content:   ${content.length}`);
console.log(`gaps:      ${gaps?.length ?? 0}`);

if (problems.length) {
  console.error(`\nFAIL: ${problems.length} coupling problem(s)`);
  for (const p of problems) console.error("  " + p);
  process.exit(1);
}

console.log("\nPASS: all couplings resolve and every content page is covered.");
