// src/lib/freshness.ts
// Single-source freshness control.
//
// The site's "last updated" signals come from an EXPLICIT content-review date
// in site.json (`lastContentReview`), never from the build clock. Bump that
// field only when you actually review or update the content.
//
// Why: Google and Bing both now treat a fresh date with no fresh substance as
// a trust problem. Bing's grounding layer can actively EXCLUDE content that
// misrepresents freshness or contradicts its own timestamps, and Google's
// March 2026 guidance calls "a date change without fresh substance" a quality
// problem. Real review dates keep dateModified, visible dates, and sitemap
// lastmod honest — and therefore groundable.

import site from "../data/site.json";

function parseReviewDate(): Date | null {
  const raw = site.lastContentReview;
  if (!raw) return null;
  const d = new Date(raw);
  return Number.isNaN(d.valueOf()) ? null : d;
}

const reviewDate = parseReviewDate();

export function contentReviewDate(): Date | null {
  return reviewDate;
}

/** null when no explicit content review has been recorded. */
export function lastModifiedDate(): Date | null {
  return reviewDate;
}

/** ISO string, or null when no explicit content review has been recorded. */
export function lastModifiedISO(): string | null {
  return reviewDate ? reviewDate.toISOString() : null;
}

export function formatLongDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
