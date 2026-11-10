import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import site from '../data/site.json';
import tools from '../data/tools.json';

export const prerender = true;

const base = site.url;

const staticPages = ['', 'about', 'contact', 'faq', 'legal', 'privacy', 'terms'];

export const GET: APIRoute = async () => {
  const guides = await getCollection('guides');

  const urls = [
    ...staticPages.map((p) => (p === '' ? base : `${base}/${p}`)),
    `${base}/games`,
    `${base}/guides`,
    ...guides.map((g) => `${base}/guides/${g.id}`),
    `${base}/reference`,
    `${base}/tools`,
    ...tools
      .filter((t) => t.slug !== "stl-scale-engine" && t.slug !== "scale-reference")
      .map((t) => `${base}/tools/${t.slug}`),
  ];

  return new Response(urls.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
