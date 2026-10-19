/**
 * export-llms.mjs — generates public/llms-full.txt (the full-text archive of
 * the site for AI tools) at build time from the same content collections that
 * power the live guides and FDM articles, so it can never drift from the site.
 *
 * Run via `npm run export:llms` before `astro build` (see package.json build).
 */

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outPath = join(root, 'public', 'llms-full.txt');

const SITE = 'https://stlaccess.com';

function parseFrontmatter(md) {
  const match = md.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { fm: {}, body: md };
  const fmRaw = match[1];
  const body = md.slice(match[0].length);
  const fm = {};
  for (const line of fmRaw.split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z]+):\s*(.*)$/);
    if (!kv) continue;
    let value = kv[2].trim();
    // Frontmatter strings are double-quoted; unquote for display.
    if (value.startsWith('"')) {
      try {
        value = JSON.parse(value);
      } catch {
        /* keep raw */
      }
    }
    fm[kv[1]] = value;
  }
  return { fm, body: body.trim() };
}

function collect(dir, basePath) {
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const slug = f.replace(/\.md$/, '');
      const md = readFileSync(join(dir, f), 'utf8');
      const { fm, body } = parseFrontmatter(md);
      return { slug, fm, body, url: `${SITE}${basePath}/${slug}` };
    })
    .sort((a, b) => {
      // 175cm-baseline first in Guides (it's the canonical reference),
      // otherwise alphabetical by slug.
      if (a.slug === '175cm-baseline') return -1;
      if (b.slug === '175cm-baseline') return 1;
      return a.slug.localeCompare(b.slug);
    });
}

function articleBlock(a) {
  const lines = [];
  lines.push(`### ${a.fm.title || a.slug}`);
  lines.push('');
  lines.push(`Source: ${a.url}`);
  if (a.fm.pubDate) lines.push(`Published: ${a.fm.pubDate}`);
  if (a.fm.modDate && a.fm.modDate !== a.fm.pubDate) lines.push(`Updated: ${a.fm.modDate}`);
  lines.push('');
  if (a.fm.description) lines.push(`**Description:** ${a.fm.description}`);
  lines.push('');
  if (a.fm.tldr) lines.push(`**Direct answer:** ${a.fm.tldr}`);
  lines.push('');
  lines.push(a.body);
  return lines.join('\n');
}

const guides = collect(join(root, 'src', 'content', 'guides'), '/guides');
const fdm = collect(join(root, 'src', 'content', 'fdm'), '/fdm');

const header = `# STLACCESS — Full Content Archive

Full text of https://stlaccess.com: the STL scale standard, ${guides.length}
scale-conversion guides, and ${fdm.length} FDM printing articles. Every
conversion starts from a 175cm human baseline measured to eye level (160cm);
the slicer percentage is always (target standard mm ÷ source standard mm) × 100.

## Reference

- **STLACCESS Scale Standard** — https://stlaccess.com/archive/scale-standard/
  (175cm baseline, eyes at 160cm, gaming scales to eye level, ratio scales to top of head)
- **Open datasets (CC BY 4.0)** — https://stlaccess.com/data/index.json
  (JSON + CSV: 16 baselines, 46 conversions, 26 FDM profiles)
- **Miniature Size Chart** — https://stlaccess.com/archive/miniature-size-chart/ (46 verified conversions)
- **Embeddable converter widget** — https://stlaccess.com/embed/

`;

const guidesSection = `## Guides (${guides.length})

${guides.map(articleBlock).join('\n\n---\n\n')}

`;

const fdmSection = `## FDM Articles (${fdm.length})

${fdm.map(articleBlock).join('\n\n---\n\n')}

`;

const footer = `---

_Generated at build time from src/content (guides + fdm). Numbers are maintained
against scaleBaselines.json / conversionMatrix.json / fdmProfiles.json. See the
index at https://stlaccess.com/llms.txt for the full site map._
`;

writeFileSync(outPath, header + guidesSection + fdmSection + footer, 'utf8');
console.log(`[export-llms] Wrote ${outPath} (${guides.length} guides, ${fdm.length} FDM articles).`);