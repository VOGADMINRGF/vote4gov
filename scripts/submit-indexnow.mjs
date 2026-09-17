import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";

const site = "https://www.vote4gov.eu";
const host = "www.vote4gov.eu";
const key = "a04d8ddb6a8327053367da5a8da2734d";
const keyLocation = `${site}/${key}.txt`;
const [before, after] = process.argv.slice(2);
const repo = process.env.GITHUB_REPOSITORY;
const sha = process.env.GITHUB_SHA || after;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function allSitemapUrls(xml) {
  return [...xml.matchAll(/<loc>(https:\/\/www\.vote4gov\.eu\/[^<]*)<\/loc>/g)].map((match) => match[1]);
}

function cleanPublicUrl(path) {
  if (path === "index.html") return `${site}/`;
  if (!path.endsWith(".html")) return null;
  if (path.startsWith("embed/") || path.startsWith("de/")) return null;
  const clean = path.slice(0, -5);
  return `${site}/${clean}`;
}

async function readVercelState() {
  if (!repo || !sha) return null;
  const headers = {
    accept: "application/vnd.github+json",
    "user-agent": "vote4gov-indexnow",
  };
  if (process.env.GITHUB_TOKEN) headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const response = await fetch(`https://api.github.com/repos/${repo}/commits/${sha}/status`, { headers });
  if (!response.ok) throw new Error(`GitHub commit status HTTP ${response.status}`);
  const payload = await response.json();
  return payload.statuses?.find((status) => status.context === "Vercel")?.state ?? null;
}

if (!repo || !sha) {
  console.log("IndexNow: no exact GitHub commit context; no URLs submitted.");
  process.exit(0);
}

let vercelState = null;
for (let attempt = 1; attempt <= 18; attempt += 1) {
  vercelState = await readVercelState();
  if (vercelState === "success" || vercelState === "failure" || vercelState === "error") break;
  console.log(`IndexNow: Vercel status ${vercelState ?? "pending"}; retry ${attempt}/18.`);
  await sleep(10_000);
}

if (vercelState !== "success") {
  console.log(`IndexNow: exact commit is not successfully deployed by Vercel (${vercelState ?? "unknown"}); no URLs submitted.`);
  process.exit(0);
}

let keyVerified = false;
for (let attempt = 1; attempt <= 6; attempt += 1) {
  const response = await fetch(`${keyLocation}?deployment=${encodeURIComponent(sha)}`, {
    headers: { "cache-control": "no-cache", "user-agent": "vote4gov-indexnow" },
  }).catch(() => null);
  if (response?.ok && (await response.text()).trim() === key) {
    keyVerified = true;
    break;
  }
  if (attempt < 6) await sleep(5_000);
}

if (!keyVerified) {
  console.log("IndexNow: production domain does not yet expose the verification key; no URLs submitted.");
  process.exit(0);
}

const sitemap = await readFile("sitemap.xml", "utf8");
const allUrls = allSitemapUrls(sitemap);
let changedFiles = [];

try {
  const validBefore = before && !/^0+$/.test(before);
  if (validBefore && after) {
    changedFiles = execFileSync("git", ["diff", "--name-only", before, after], { encoding: "utf8" })
      .split("\n")
      .map((value) => value.trim())
      .filter(Boolean);
  }
} catch (error) {
  console.warn(`IndexNow: unable to resolve exact changed files (${error.message}); using sitemap URLs.`);
}

const broadChange = !changedFiles.length || changedFiles.some((path) =>
  path === "sitemap.xml" ||
  path === "vercel.json" ||
  path === "script.js" ||
  path === "home.js" ||
  path === "site-config.js" ||
  path === "scripts/enrich-public-discovery.mjs" ||
  path === "llms.txt" ||
  path === "robots.txt" ||
  path.startsWith("assets/") ||
  path.endsWith(".css")
);

const urls = broadChange
  ? allUrls
  : [...new Set(changedFiles.map(cleanPublicUrl).filter(Boolean))];

if (!urls.length) {
  console.log("IndexNow: no changed canonical public URLs to submit.");
  process.exit(0);
}

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation, urlList: urls }),
});

if (!response.ok) {
  const body = await response.text().catch(() => "");
  throw new Error(`IndexNow submission failed: HTTP ${response.status}${body ? ` ${body}` : ""}`);
}

console.log(`IndexNow accepted ${urls.length} deployed canonical URL(s) for ${sha} with HTTP ${response.status}.`);
