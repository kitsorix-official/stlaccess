/**
 * Simulates Netlify `_redirects` resolution to catch two failure modes:
 *
 *   1. LOOPS    - a redirect chain that returns to a URL already visited.
 *   2. SHADOWING - a redirect rule that matches a path for which a real page
 *                  also exists. Netlify applies `_redirects` before static
 *                  files, so a matching rule wins and the page is unreachable.
 *
 * Netlify semantics modelled here:
 *   - Rules are evaluated top to bottom; the FIRST match wins.
 *   - `*` is a splat matching zero or more characters (not `/`).
 *   - `:splat` in the target is substituted with what `*` captured.
 *   - A matched rule redirects even if a file exists at that path.
 *
 * Usage: node scripts/check-redirects.mjs
 */
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/** Parse `_redirects`, ignoring comments and blank lines. */
function parseRules(file) {
  return readFileSync(file, "utf8")
    .split("\n")
    .map((raw) => raw.trim())
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => {
      const [from, to, ...rest] = line.split(/\s+/);
      return { from, to, status: Number(rest[0] || 301) };
    });
}

/** Does `from` match `path`? Returns the splat capture, or null. */
function match(rule, path) {
  const starAt = rule.from.indexOf("*");
  if (starAt === -1) return rule.from === path ? "" : null;

  const prefix = rule.from.slice(0, starAt);
  const suffix = rule.from.slice(starAt + 1);
  if (!path.startsWith(prefix)) return null;
  if (suffix && !path.endsWith(suffix)) return null;

  const captured = path.slice(prefix.length, suffix ? path.length - suffix.length : undefined);
  return path.length >= prefix.length + suffix.length ? captured : null;
}

/** Apply the first matching rule, mirroring Netlify's precedence. */
function resolveOnce(path, rules) {
  for (const rule of rules) {
    const captured = match(rule, path);
    if (captured === null) continue;
    let target = rule.to;
    if (target.includes(":splat")) target = target.replace(":splat", captured);
    // Preserve a trailing slash if the incoming path had one.
    if (path.endsWith("/") && !target.endsWith("/")) target += "/";
    return { rule, target };
  }
  return null;
}

/** Follow the chain from `start`, returning the chain and whether it loops. */
function follow(start, rules) {
  const chain = [start];
  const seen = new Set([start]);
  let current = start;

  for (let hop = 0; hop < 25; hop++) {
    const hit = resolveOnce(current, rules);
    if (!hit) return { chain, loop: null };

    current = hit.target;
    chain.push(current);
    if (seen.has(current)) return { chain, loop: current };
    seen.add(current);
  }
  return { chain, loop: null };
}

/** Every URL the site serves as a real static page. */
function listBuiltPages(dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) listBuiltPages(full, acc);
    else if (entry.endsWith(".html")) acc.push(full);
  }
  return acc;
}

const rules = parseRules(join(root, "public", "_redirects"));
const built = listBuiltPages(join(root, "dist"));
const builtPaths = new Set(
  built.map((f) => "/" + f.slice(join(root, "dist").length + 1).replace(/index\.html$/, "").replace(/\.html$/, "")),
);

// 1. Loop + chain-length check across every redirect rule's target space.
let failures = 0;
console.log("Redirect chain resolution:\n");

for (const rule of rules) {
  // Probe with a concrete path in place of any splat.
  const probe = rule.from.replace("*", "sample-probe");
  const { chain, loop } = follow(probe, rules);
  const hops = chain.length - 1;

  if (loop) {
    console.log(`  LOOP  ${rule.from}\n        ${chain.join(" -> ")}`);
    failures++;
  } else if (hops >= 4) {
    console.log(`  DEEP  ${rule.from} (${hops} hops)\n        ${chain.join(" -> ")}`);
  }
}

// 2. Shadowing check: does any rule intercept a page that actually exists?
console.log("\nShadowing check (rules that would intercept a real built page):\n");
let shadowed = 0;
for (const path of [...builtPaths].sort()) {
  const candidates = [path, path.replace(/\/$/, "")];
  for (const p of candidates) {
    if (!p || p === "/") continue;
    const hit = resolveOnce(p, rules);
    if (hit) {
      console.log(`  SHADOWED  ${p}  ->  ${hit.target}   (rule: ${hit.rule.from})`);
      shadowed++;
    }
  }
}

// 3. Confirm the restored guides are actually reachable.
console.log("\nRestored guide reachability:\n");
const guides = [...builtPaths].filter((p) => p.startsWith("/guides")).sort();
let unreachable = 0;
for (const p of guides) {
  const probe = p === "/guides/" ? "/guides" : p.replace(/\/$/, "");
  const hit = resolveOnce(probe, rules);
  if (hit) {
    console.log(`  BLOCKED   ${probe} -> ${hit.target}  (rule: ${hit.rule.from})`);
    unreachable++;
  } else {
    console.log(`  ok        ${p} serves a real page`);
  }
}

console.log(`\n${failures} loop(s), ${shadowed} shadowed page(s), ${unreachable} blocked guide(s).`);
if (failures || shadowed || unreachable) {
  console.error("\nFAILED: redirect config is not safe.");
  process.exit(1);
}
console.log("PASS: no loops, no shadowing, all guides reachable.");