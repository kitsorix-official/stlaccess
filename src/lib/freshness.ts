// src/lib/freshness.ts
// Site freshness control.
//
// "Last updated" signals use the explicit content-review date from site.json
// by default, NOT the build date. Rebuilding the site is a deployment event,
// not a content edit, and falsely bumping every <lastmod> erodes trust with
// search engines and answer engines.
//
// Content pages should pass their own `modDate` (see `guides/[slug].astro`).
// `contentReviewDate()` exposes the same site-wide review date for bookkeeping.

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

/** Site-wide content review date, falling back to the build date. */
export function lastModifiedDate(): Date {
  return reviewDate ?? buildDate;
}

/** ISO string of the site-wide content review date. */
export function lastModifiedISO(): string {
  return lastModifiedDate().toISOString();
}

export function formatLongDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
