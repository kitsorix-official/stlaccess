import type { APIRoute } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
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

interface FeedItem {
  title: string;
  url: string;
  description: string;
  pubDate: Date;
}

function toItem(entry: CollectionEntry<'guides'> | CollectionEntry<'fdm'>, base: string): FeedItem {
  return {
    title: entry.data.title,
    url: `${site.url}${base}/${entry.id}/`,
    description: entry.data.description,
    pubDate: entry.data.pubDate,
  };
}

export const GET: APIRoute = async () => {
  const [guides, fdm] = await Promise.all([
    getCollection('guides'),
    getCollection('fdm'),
  ]);

  const items = [
    ...guides.map((entry) => toItem(entry, '/archive/guides')),
    ...fdm.map((entry) => toItem(entry, '/archive/fdm')),
  ].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  const lastBuildDate = new Date().toUTCString();

  const itemsXml = items
    .map(
      (item) => `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${item.url}</link>
      <guid isPermaLink="true">${item.url}</guid>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${item.pubDate.toUTCString()}</pubDate>
    </item>`
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.rssChannelTitle)}</title>
    <link>${site.url}/</link>
    <description>${escapeXml(site.rssChannelDescription)}</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml"/>${itemsXml}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
