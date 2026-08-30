// src/lib/freshness.ts
// Site freshness control.
//
// "Last updated" signals (sitemap <lastmod>, visible "Last updated" text, and
// JSON-LD dateModified/datePublished) are derived from the BUILD DATE, which is
// captured once at module load time. Because the content is bulk-edited as a
// whole, treating every page's freshness as "today" stays accurate whenever a
// build is deployed.
//
// The explicit content-review date in site.json (`lastContentReview`) is still
// available via `contentReviewDate()` for any semantic bookkeeping that needs
// to know when content was last manually reviewed, separately from the build.

import site from "../data/site.json";

function parseReviewDate(): Date | null {
  const raw = site.lastContentReview;
  if (!raw) return null;
  const d = new Date(raw);
  return Number.isNaN(d.valueOf()) ? null : d;
}

const reviewDate = parseReviewDate();

// Captured once per build, so every page in a single build reports the same
// freshness value rather than drifting between module loads.
const buildDate = new Date();

/** Explicit content-review date from site.json, if one has been recorded. */
export function contentReviewDate(): Date | null {
  return reviewDate;
}

/** The date this build was generated. Used for all "last updated" signals. */
export function lastModifiedDate(): Date {
  return buildDate;
}

/** ISO string of the build date. */
export function lastModifiedISO(): string {
  return buildDate.toISOString();
}

export function formatLongDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
