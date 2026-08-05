#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

const ENDPOINT = 'https://api.indexnow.org/indexnow';
const SITEMAP_PATH = path.join(repoRoot, 'dist', 'sitemap.xml');
const KEY_DIR = path.join(repoRoot, 'public');
const MANIFEST_PATH = path.join(repoRoot, '.indexnow', 'last-submitted.json');

const force = process.argv.includes('--force');
const dryRun = process.argv.includes('--dry-run');

function loadSiteUrl() {
  const site = JSON.parse(fs.readFileSync(path.join(repoRoot, 'src', 'data', 'site.json'), 'utf8'));
  return site.url.replace(/\/+$/, '');
}

function resolveKey(siteUrl) {
  const files = fs.readdirSync(KEY_DIR).filter((f) => /^[A-Za-z0-9_-]{8,128}\.txt$/.test(f));
  if (files.length === 0) {
    throw new Error(`No IndexNow key file found in ${KEY_DIR}/ (expected <key>.txt)`);
  }
  const fileName = files[0];
  const key = fs.readFileSync(path.join(KEY_DIR, fileName), 'utf8').trim();
  const host = new URL(siteUrl).host;
  return { key, host, keyLocation: `${siteUrl}/${fileName}` };
}

async function verifyKeyLocation({ key, keyLocation }) {
  let res;
  try {
    res = await fetch(keyLocation);
  } catch (err) {
    throw new Error(`Could not reach ${keyLocation}: ${err.message}`);
  }
  if (!res.ok) {
    throw new Error(`Key file at ${keyLocation} returned HTTP ${res.status} — build and deploy before submitting.`);
  }
  const body = (await res.text()).trim();
  if (body !== key) {
    throw new Error(`Key file at ${keyLocation} does not contain the key.`);
  }
}

function readSitemapUrls() {
  const xml = fs.readFileSync(SITEMAP_PATH, 'utf8');
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  return [...new Set(urls)];
}

function loadManifest() {
  if (fs.existsSync(MANIFEST_PATH)) {
    return JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  }
  return { submitted: {} };
}

async function submitBatch(payload) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`IndexNow returned HTTP ${res.status}: ${body}`);
  }
}

async function main() {
  const siteUrl = loadSiteUrl();
  const { key, host, keyLocation } = resolveKey(siteUrl);
  const urls = readSitemapUrls();
  const manifest = loadManifest();

  const current = new Set(urls);
  const removed = Object.keys(manifest.submitted).filter((u) => !current.has(u));

  const toSubmit = force ? urls : urls.filter((u) => !(u in manifest.submitted));

  console.log(`Host:        ${host}`);
  console.log(`Key file:    ${keyLocation}`);
  console.log(`Sitemap URLs: ${urls.length}`);
  console.log(`To submit:   ${toSubmit.length}${force ? ' (--force: all URLs)' : ' (new/changed only)'}`);
  if (removed.length) console.log(`Removed from manifest: ${removed.length}`);

  if (dryRun) {
    console.log('\nDry run — no request sent.');
    if (toSubmit.length) console.log(toSubmit.join('\n'));
    return;
  }

  if (toSubmit.length === 0) {
    console.log('\nNo new URLs to submit. Use --force to resubmit everything.');
    return;
  }

  await verifyKeyLocation({ key, keyLocation });

  const now = new Date().toISOString();
  for (let i = 0; i < toSubmit.length; i += 9000) {
    const urlList = toSubmit.slice(i, i + 9000);
    await submitBatch({ host, key, keyLocation, urlList });
    console.log(`\nSubmitted ${urlList.length} URLs (HTTP 200 OK)`);
  }

  for (const u of toSubmit) manifest.submitted[u] = now;
  for (const u of removed) delete manifest.submitted[u];
  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`Manifest updated: ${MANIFEST_PATH}`);
}

main().catch((err) => {
  console.error(`[indexnow] ${err.message}`);
  process.exit(1);
});
