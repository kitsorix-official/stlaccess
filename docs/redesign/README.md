# STLACCESS — calm / in-app redesign

**Status:** Phase 1 evidence pack, 2026-10-30. Phase 2 mockups live in `mockups/`.
Work is local only. Nothing has been committed, pushed, or applied to the live app.

## What this business actually is

The brief was written for a multi-tenant SaaS. STLACCESS is not one:

| Brief assumption | Reality here |
| --- | --- |
| PostHog / GA / DB analytics | No analytics service, no database. A custom cookie-free observer writes page views to a Google Sheet. |
| Tenants, customers, accounts | None. No login, no accounts, no customer records. |
| Prices, billing | None. The site is donation-funded, crypto-only. |
| Uploads / server processing | None. All four tools run in the browser with `FileReader`, WebGL, and Blob downloads. |
| Sidebar + area tabs | Today: a flat top nav with four tools and a Support link. |
| Emails / messages to customers | None. There is a contact form and a feedback prompt, nothing outbound. |

The redesign therefore **adapts** the brief: calm surfaces, one obvious next action, URL-persisted
state, summary-first results, nothing disappearing, mobile-first. It does **not** invent tenants,
prices, consent banners, or analytics infrastructure.

## Files

| File | What it answers |
| --- | --- |
| `1-usage-audit.md` | What we can and cannot measure, the provisional screen ranking, and the metrics to add before Phase 4. |
| `2-page-forensics.md` | Numbered fix list per screen, with file references and severity. |
| `3-numbers-audit.md` | Every published number checked against the JSON source of truth. Four issues, listed but **not** fixed. |
| `4-route-map.md` | All 49 routes + 404, every action, redirects, and proposed Phase 3 area ownership. |
| `mockups/index.html` | Phase 2: three directions, six screens, desktop + phone, side by side, real data. |

## Data caveats (read before trusting any ranking)

- The observer export and the Bing AI citation CSVs from the 2026-10-24 export are **no longer on
  disk** (checked 2026-10-30). Figures from that export are marked as historical and directional.
- The observer records only `page`, `agent`, `source`, `source_name`, `referrer`. It does **not**
  record time on page, clicks, rage clicks, dead clicks, or device class.
- No usage ranking below is presented as measured. The ranking is evidence-weighted (Bing intent +
  internal-link graph + task criticality) and must be confirmed with a fresh observer export before
  the Phase 4 build order is locked.
- The numbers audit is fully reproducible: it reads `src/data/*.json` and recomputes with the same
  `toFixed(1)` rounding the browser uses.

## Approval gates

1. **Phase 2:** choose direction A, B, or C. Nothing is built until you choose.
2. **Numbers:** the four data issues in `3-numbers-audit.md` need explicit approval before any value
   changes. They are listed, not applied.
3. **Design:** Phase 3 (areas, search, route-manifest test) starts only after the direction is chosen.
