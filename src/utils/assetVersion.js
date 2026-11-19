// Build-time cache-busting for self-hosted public assets.
//
// Cloudflare can hold /js/* at the edge even when Cache-Control says
// revalidate. Adding a short content hash to the URL makes every changed
// script a new cache key, so visitors never keep an old calculator overnight.

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

export function fileHash(filePath) {
  try {
    return crypto
      .createHash("sha256")
      .update(fs.readFileSync(filePath))
      .digest("hex")
      .slice(0, 12);
  } catch {
    return null;
  }
}

export function assetVersion(publicPath, baseDir = path.join(process.cwd(), "public")) {
  const relative = publicPath.replace(/^\/+/, "").split("?")[0];
  return fileHash(path.join(baseDir, relative));
}

export function versionedAsset(publicPath, baseDir) {
  const version = assetVersion(publicPath, baseDir);
  if (!version) return publicPath;
  const separator = publicPath.includes("?") ? "&" : "?";
  return `${publicPath}${separator}v=${version}`;
}
