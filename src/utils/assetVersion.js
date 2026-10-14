import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const hashes = new Map();

/**
 * Cache-busting URL for a static file in `public/`, keyed by the file's
 * content hash — e.g. assetVersion('js/observatory.js') returns
 * "/js/observatory.js?v=1a2b3c4d".
 *
 * Cloudflare Pages serves /js/* with its own 4-hour cache and overrides the
 * Cache-Control set in public/_headers, so a plain /js/... URL can keep a
 * browser on an old build for hours after a deploy. Because the query string
 * changes whenever the file's bytes change, the browser is forced to fetch the
 * new copy on the very first page load after a deploy.
 */
export function assetVersion(publicPath) {
  if (!hashes.has(publicPath)) {
    const file = resolve(process.cwd(), 'public', publicPath);
    const digest = createHash('sha1').update(readFileSync(file)).digest('hex').slice(0, 8);
    hashes.set(publicPath, digest);
  }

  return `/${publicPath}?v=${hashes.get(publicPath)}`;
}
