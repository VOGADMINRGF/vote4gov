import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";

const site = "https://www.vote4gov.eu";
const host = "www.vote4gov.eu";
const key = "a04d8ddb6a8327053367da5a8da2734d";
const keyLocation = `${site}/${key}.txt`;
const [before, after] = process.argv.slice(2);

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
  console.warn(`IndexNow: unable to resolve exact changed files (${error.message}); submitting sitemap URLs instead.`);
}

const broadChange = !changedFiles.length || changedFiles.some((path) =>
  path === "sitemap.xml" ||
  path === "vercel.json" ||
  path === "script.js" ||
  path === "home.js" ||
  path === "site-config.js" ||
  path === "scripts/enrich-public-discovery.mjs" ||
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

console.log(`IndexNow accepted ${urls.length} changed canonical URL(s) with HTTP ${response.status}.`);
