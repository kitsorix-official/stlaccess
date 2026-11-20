# STL viewer keyword plan — 2026-11-20

Source: `/home/kitsorix/Downloads/KeywordStats_11_20_2026.csv` (Bing keyword export).

## Why a dedicated page

Before this pass there was no STL viewer page. `/stl-viewer` and `/stl-viewer/` both 301'd to `/learn/stl-files`, which is an educational pillar, not a tool. The export shows enough dedicated viewer demand to justify a canonical tool page:

| Keyword | Impressions | Treatment |
| --- | ---: | --- |
| `stl viewer` | 14,076 | Primary H1/title/direct answer |
| `stl` | 36,509 | Brand-adjacent context, not a separate thin page |
| `stl file viewer` | 2,180 | Direct answer + FAQ + tools catalogue |
| `stl viewer online` | 1,734 | Title + visible alias line |
| `online stl viewer` | 1,135 | Direct answer + visible alias line |
| `stl文件` | 4,642 | Covered in English FAQ, no locale variant |
| `stl文件怎么打开` | 2,443 | Covered in English FAQ, no locale variant |
| `.stl` | 1,764 | Copy and file-picker language |
| `obj viewer` / `fbx viewer` | 1,751 / 2,380 | Explicit unsupported-format FAQ |
| `step viewer online` / `stp viewer` | 1,423 / 6,330 | Explicit unsupported-format FAQ |
| `stl文件用什么软件打开` | 1,008 | Covered in English FAQ |
| `online stl viewer` | 1,135 | Visible alias line |
| `free stl viewer` | 473 | Title + H1 + FAQ |
| `stl reader` | 303 | Visible alias line + FAQ |
| `view stl` / `view stl online` | 407 / 75 | Direct answer + FAQ |
| `stl preview` / `open stl file online` | 43 / 45 | Direct answer + FAQ |
| `stl file opener` / `stl opener` | 72 / 166 | Visible alias line + FAQ |

## Implementation decisions

- Created `/tools/stl-viewer` as the single canonical page; `/stl-viewer`, `/stl-viewer/` and `/stl-viewer.html` now 301 to it.
- Built a browser-only viewer: file picker and drag-and-drop, ASCII + binary STL parsing, WebGL preview, orbit controls, Z-up/Y-up switch, wireframe/grid/bounds toggles, bounding box, triangle count, file size, format detection and volume estimate.
- Kept all file handling local with `File.arrayBuffer()`. No upload, account, cookie, server processing or stored model.
- Added `SoftwareApplication`, `HowTo` and `FAQPage` JSON-LD that matches the visible answer, steps and FAQ.
- Covered multilingual queries inside the English FAQ instead of creating `/en-gb`-style locale pages or generated `/answers/*` URLs.
- Treated OBJ/FBX/STEP/STP as honest non-support: the FAQ says the page reads STL only and suggests exporting to STL first.
- Linked the new tool from `/tools`, `/learn/stl-files`, the "how to open an STL file" guide, `llms.txt`, `llms-full.txt` and `/data/tools.json`.
- Updated the 3D Scale Visualizer catalogue copy from "Upload your own STL" to "Load your own STL locally" so the wording matches the actual local-only behaviour.

## QA

- 121 pages, 120 canonicals matching 120 sitemap URLs.
- New page canonical: `https://stlaccess.com/tools/stl-viewer`, sitemap `lastmod` `2026-11-20`.
- 0 invalid JSON-LD, 0 dangling `@id`, 0 FAQ fragment URLs.
- 0 broken internal links, 0 heading issues, 0 duplicate/missing titles or descriptions.
- 35/35 targeted keyword strings present in the rendered page copy/meta.
- CSP has no `unsafe-inline`, all inline hashes are covered, and the header line is 1,830 characters (Cloudflare limit: 2,000).
- Parser smoke test passed for synthetic binary STL, ASCII STL and invalid input.
