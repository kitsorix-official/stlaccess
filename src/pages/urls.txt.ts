import type { APIRoute } from 'astro';
import site from '../data/site.json';
import tools from '../data/tools.json';

export const prerender = true;

const base = site.url;

const staticPages = ['', 'about', 'contact', 'faq', 'legal', 'privacy', 'terms'];

export const GET: APIRoute = async () => {
  const urls = [
    ...staticPages.map((p) => (p === '' ? base : `${base}/${p}`)),
    `${base}/fdm-printing-profiles`,
    `${base}/fdm`,
    `${base}/miniature-size-chart`,
    `${base}/calculator`,
    ...tools
      .filter((t) => t.slug !== "stl-scale-engine" && t.slug !== "scale-reference")
      .map((t) => `${base}/calculator/${t.slug}`),
  ];

  return new Response(urls.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};