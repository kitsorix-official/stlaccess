import type { APIRoute } from 'astro';
import site from '../data/site.json';

export const prerender = true;

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const GET: APIRoute = async () => {
  const lastBuildDate = new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.rssChannelTitle)}</title>
    <link>${site.url}/fdm</link>
    <description>${escapeXml(site.rssChannelDescription)}</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml"/>
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};