const owner = process.env.GITHUB_REPOSITORY.split('/')[0];
const repo = process.env.GITHUB_REPOSITORY.split('/')[1];
const sha = process.env.GITHUB_SHA;
const token = process.env.GITHUB_TOKEN;

const TIMEOUT_MS = Number(process.env.INDEXNOW_WAIT_TIMEOUT_MS || 10 * 60 * 1000);
const INTERVAL_MS = Number(process.env.INDEXNOW_WAIT_INTERVAL_MS || 15 * 1000);

const API = 'https://api.github.com';
const headers = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
};
if (token) headers.Authorization = `Bearer ${token}`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function poll() {
  const checkRes = await fetch(`${API}/repos/${owner}/${repo}/commits/${sha}/check-runs?per_page=100`, { headers });
  if (checkRes.ok) {
    const { check_runs: runs = [] } = await checkRes.json();
    for (const run of runs.filter((r) => /pages|deploy/i.test(r.name))) {
      if (run.status === 'completed') {
        return run.conclusion === 'success'
          ? { found: true, ok: true, name: run.name }
          : { found: true, ok: false, name: run.name, conclusion: run.conclusion };
      }
    }
  }

  const statusRes = await fetch(`${API}/repos/${owner}/${repo}/commits/${sha}/status`, { headers });
  if (statusRes.ok) {
    const { statuses = [] } = await statusRes.json();
    for (const s of statuses.filter((s) => /pages|deploy/i.test(s.context || ''))) {
      if (s.state === 'success') return { found: true, ok: true, name: s.context };
      if (s.state === 'failure' || s.state === 'error') {
        return { found: true, ok: false, name: s.context, conclusion: s.state };
      }
    }
  }

  return { found: false, ok: true };
}

const start = Date.now();
while (Date.now() - start < TIMEOUT_MS) {
  const result = await poll();
  if (result.found) {
    if (result.ok) {
      console.log(`Deployment confirmed: ${result.name}`);
      process.exit(0);
    }
    console.error(`Deployment ${result.name} finished with "${result.conclusion}"; aborting IndexNow submission.`);
    process.exit(1);
  }
  await sleep(INTERVAL_MS);
}

console.warn(`Timeout after ${TIMEOUT_MS}ms waiting for Cloudflare Pages deployment; proceeding without confirmation.`);
process.exit(0);
