// src/lib/freshness.ts
// Build-time freshness stamps. Astro evaluates these once when the site is
// built, so every deploy carries today's date as the "last updated" signal —
// even when the content itself hasn't changed. This keeps the pages (and the
// dateModified/lastmod signals in JSON-LD, RSS, and the sitemap) fresh for
// Google and Bing on every push.

const buildTime = new Date();

export function lastModifiedDate(): Date {
  return buildTime;
}

export function lastModifiedISO(): string {
  return buildTime.toISOString();
}

export function formatLongDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
