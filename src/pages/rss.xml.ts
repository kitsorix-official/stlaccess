import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
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
  const posts = (await getCollection("guides")).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  const items = posts
    .map(
      (post) => `    <item>
      <title>${escapeXml(post.data.title)}</title>
      <link>${site.url}/guides/${post.id}</link>
      <description>${escapeXml(post.data.description)}</description>
      <pubDate>${post.data.pubDate.toUTCString()}</pubDate>
      <guid>${site.url}/guides/${post.id}</guid>
    </item>`
    )
    .join('\n');

  const lastBuildDate = posts[0]?.data.pubDate.toUTCString() ?? new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${site.rssChannelTitle}</title>
    <link>${site.url}/guides</link>
    <description>${site.rssChannelDescription}</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
