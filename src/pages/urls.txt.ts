import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import site from '../data/site.json';
import tools from '../data/tools.json';

export const prerender = true;

const base = site.url;

const staticPages = ['', 'about', 'contact', 'faq', 'legal', 'privacy', 'terms'];

export const GET: APIRoute = async () => {
  const [guides, fdm] = await Promise.all([
    getCollection('guides'),
    getCollection('fdm'),
  ]);

  const urls = [
    ...staticPages.map((p) => (p === '' ? `${base}/` : `${base}/${p}`)),
    `${base}/fdm-printing-profiles`,
    `${base}/fdm`,
    `${base}/miniature-size-chart`,
    `${base}/3d-math`,
    `${base}/guides`,
    ...tools
      .filter((t) => t.slug !== 'stl-scale-engine' && t.slug !== 'scale-reference')
      .map((t) => `${base}/3d-math/${t.slug}`),
    ...guides.map((g) => `${base}/guides/${g.id}`),
    ...fdm.map((a) => `${base}/fdm/${a.id}`),
  ];

  return new Response(urls.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
