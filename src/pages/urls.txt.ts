import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import site from '../data/site.json';
import tools from '../data/tools.json';

export const prerender = true;

const base = site.url;

// Root (foreground) pages. Trailing slashes match trailingSlash: 'always'.
const staticPages = ['', 'stl-viewer', 'stl-scale-inspector', 'stl-converter', 'stl-printability-checker', 'about', 'contact', 'embed', 'legal', 'privacy', 'terms'];

// Archived legacy sections (indexable, unlinked from the nav).
const archiveHubs = ['archive/guides', 'archive/fdm', 'archive/fdm-printing-profiles', 'archive/miniature-size-chart', 'archive/3d-math', 'archive/scale-standard', 'archive/faq'];

export const GET: APIRoute = async () => {
  const [guides, fdm] = await Promise.all([
    getCollection('guides'),
    getCollection('fdm'),
  ]);

  // Archive calculator detail pages come from tools.json; the scale engine
  // and size chart are not under /archive/3d-math/, and the three new
  // client-side utilities are foreground pages already listed above.
  const archiveTools = tools.filter(
    (t) => !['stl-scale-engine', 'scale-reference', 'stl-viewer', 'stl-converter', 'stl-printability-checker'].includes(t.slug)
  );

  const urls = [
    ...staticPages.map((p) => (p === '' ? `${base}/` : `${base}/${p}/`)),
    ...archiveHubs.map((p) => `${base}/${p}/`),
    ...archiveTools.map((t) => `${base}${t.url}`),
    ...guides.map((g) => `${base}/archive/guides/${g.id}/`),
    ...fdm.map((a) => `${base}/archive/fdm/${a.id}/`),
  ];

  return new Response(urls.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
