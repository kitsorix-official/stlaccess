import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import site from '../data/site.json';
import conversions from '../data/conversions.json';
import tools from '../data/tools.json';
import gameSystems from '../data/gameSystems.json';

export const prerender = true;

const base = site.url;

const staticPages = ['', 'about', 'contact', 'faq', 'legal', 'privacy', 'terms'];

export const GET: APIRoute = async () => {
  const guides = await getCollection('guides');

  const urls = [
    ...staticPages.map((p) => (p === '' ? base : `${base}/${p}`)),
    `${base}/games`,
    ...gameSystems.map((g) => `${base}/games/${g.slug}`),
    `${base}/guides`,
    ...guides.map((g) => `${base}/guides/${g.id}`),
    `${base}/reference`,
    ...conversions.map((c) => `${base}/reference/${c.slug}`),
    `${base}/tools`,
    ...tools.map((t) => `${base}/tools/${t.slug}`),
  ];

  return new Response(urls.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
