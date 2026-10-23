// Discovery audit.
//
// Fails the check if the live tools are not reachable from a page. Two tiers:
//
//   content  : /, the four tool pages, and everything under /archive/
//              -> must link all four tools inside <main>, not just chrome
//   utility  : about, contact, legal, terms, privacy, support, embed, 404
//              -> must also link all four inside <main>
//
// "Inside <main>" is measured after stripping <header>, <nav> and <footer>, so
// a footer link alone does not count for content pages.

import fs from "node:fs";
import path from "node:path";

const DIST = "dist";

const TOOLS = {
  "stl-viewer": "/stl-viewer/",
  "stl-scale-inspector": "/stl-scale-inspector/",
  "stl-converter": "/stl-converter/",
  "stl-printability-checker": "/stl-printability-checker/",
};

const EXCLUDED = new Set(["/widget/"]);

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

function routeFor(file) {
  const rel = path.relative(DIST, file).replace(/\\/g, "/");
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) return `/${rel.slice(0, -"index.html".length)}`;
  return `/${rel.replace(/\.html$/, "")}`;
}

function inMain(html) {
  const start = html.indexOf("<main");
  const end = html.lastIndexOf("</main>");
  if (start === -1 || end === -1) return "";
  return html
    .slice(start, end)
    .replace(/<header\b[\s\S]*?<\/header>/gi, "")
    .replace(/<nav\b[\s\S]*?<\/nav>/gi, "")
    .replace(/<footer\b[\s\S]*?<\/footer>/gi, "");
}

function countToolLinks(html) {
  const counts = {};
  for (const [slug, href] of Object.entries(TOOLS)) {
    const escaped = href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    counts[slug] = (html.match(new RegExp(`href="${escaped}"`, "g")) || []).length;
  }
  return counts;
}

function tierFor(route) {
  if (route === "/") return "content";
  if (Object.values(TOOLS).includes(route)) return "content";
  if (route.startsWith("/archive/")) return "content";
  if (route === "/404") return "utility";
  return "utility";
}

const pages = walk(DIST)
  .map((file) => {    const html = fs.readFileSync(file, "utf8");
    const route = routeFor(file);
    const counts = countToolLinks(html);
    const body = inMain(html);
    return {
      route,
      tier: tierFor(route),
      total: counts,
      inMain: body ? countToolLinks(body) : {},
      hasMain: body.length > 0,
    };
  })
  .filter((page) => !EXCLUDED.has(page.route))
  .sort((a, b) => a.route.localeCompare(b.route));

const failures = [];

// --- Relation graph integrity -------------------------------------------------
// A typo in toolGraph.json would silently drop a CTA or a related-guide card,
// so validate every reference against the actual content files.
const graphPath = "src/data/toolGraph.json";
if (fs.existsSync(graphPath)) {
  const graph = JSON.parse(fs.readFileSync(graphPath, "utf8"));
  const contentSlugs = {
    guides: fs.existsSync("src/content/guides")
      ? fs.readdirSync("src/content/guides").filter((f) => f.endsWith(".md")).map((f) => f.replace(/\.md$/, ""))
      : [],
    fdm: fs.existsSync("src/content/fdm")
      ? fs.readdirSync("src/content/fdm").filter((f) => f.endsWith(".md")).map((f) => f.replace(/\.md$/, ""))
      : [],
  };
  const toolSlugs = new Set(Object.keys(TOOLS));

  for (const [collection, map] of Object.entries({ guides: graph.guideCtas, fdm: graph.fdmCtas })) {
    for (const [slug, ctas] of Object.entries(map ?? {})) {
      if (!contentSlugs[collection].includes(slug)) {
        failures.push(`toolGraph: ${collection} CTA points at missing content "${slug}"`);
      }
      for (const cta of ctas) {
        if (!toolSlugs.has(cta.tool)) {
          failures.push(`toolGraph: ${collection}/${slug} CTA uses unknown tool "${cta.tool}"`);
        }
      }
    }
  }

  for (const [tool, refs] of Object.entries(graph.toolGuides ?? {})) {
    if (!toolSlugs.has(tool)) {
      failures.push(`toolGraph: toolGuides has unknown tool "${tool}"`);
      continue;
    }
    for (const ref of refs) {
      if (!contentSlugs[ref.collection]?.includes(ref.slug)) {
        failures.push(`toolGraph: toolGuides/${tool} points at missing ${ref.collection} "${ref.slug}"`);
      }
    }
  }
}

for (const page of pages) {
  const slugs = Object.keys(TOOLS);
  if (page.tier === "content") {
    // A tool page does not need to link itself inside main, but every other
    // tool must be reachable there.
    const isToolPage = Object.values(TOOLS).includes(page.route);
    const required = isToolPage
      ? slugs.filter((slug) => TOOLS[slug] !== page.route)
      : slugs;
    for (const slug of required) {
      if (!page.hasMain || (page.inMain[slug] ?? 0) === 0) {
        failures.push(`${page.route}  missing in-body link to ${slug}`);
      }
    }
  } else {
    // Utility pages still get an in-body strip, so the footer is not the only
    // way to reach the tools.
    for (const slug of Object.keys(TOOLS)) {
      if (!page.hasMain || (page.inMain[slug] ?? 0) === 0) {
        failures.push(`${page.route}  missing in-body link to ${slug}`);
      }
    }
  }
}

const content = pages.filter((page) => page.tier === "content");
const quiet = process.argv.includes("--quiet");
console.log(`Discovery audit: ${pages.length} pages (${content.length} content pages)`);

if (!quiet) {
  console.log("");
  const widths = Object.keys(TOOLS);
  console.log(
    "route".padEnd(58) +
      widths.map((slug) => slug.replace("stl-", "").slice(0, 10).padStart(11)).join("")
  );
  for (const page of pages) {
    const row = widths
      .map((slug) => String(page.inMain[slug] ?? 0).padStart(11))
      .join("");
    console.log(page.route.padEnd(58) + row);
  }
}

if (failures.length > 0) {
  console.error(`\nFAIL: ${failures.length} discovery gap(s)\n`);
  for (const failure of failures) console.error(`  ${failure}`);
  process.exit(1);
}

console.log("PASS: every content page links the tools in-body.");
