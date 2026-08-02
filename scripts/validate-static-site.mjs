import { readFile, readdir, stat } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import process from "node:process";

const root = process.cwd();
const failures = [];

async function walk(directory) {
  const entries = await readdir(directory);
  const files = [];
  for (const entry of entries) {
    if ([".git", "node_modules"].includes(entry)) continue;
    const full = join(directory, entry);
    const info = await stat(full);
    if (info.isDirectory()) files.push(...await walk(full));
    else files.push(full);
  }
  return files;
}

const files = await walk(root);
const htmlFiles = files.filter((file) => extname(file) === ".html");
const fileSet = new Set(files.map((file) => relative(root, file).replaceAll("\\", "/")));

function fail(file, message) {
  failures.push(`${relative(root, file)}: ${message}`);
}

function localTargetExists(href) {
  const path = href.split("#")[0].split("?")[0];
  if (!path || path === "/") return true;
  const clean = path.replace(/^\//, "");
  if (!clean) return true;
  if (fileSet.has(clean)) return true;
  if (fileSet.has(`${clean}.html`)) return true;
  if (fileSet.has(`${clean}/index.html`)) return true;
  return false;
}

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const rel = relative(root, file).replaceAll("\\", "/");
  const legacy = rel === "anlassraeume.html" || rel.startsWith("anlassraeume/");

  for (const match of html.matchAll(/href\s*=\s*["']([^"']+)["']/gi)) {
    const href = match[1];
    if (/^(https?:|mailto:|tel:|data:|javascript:|#)/i.test(href)) continue;
    if (!localTargetExists(href)) fail(file, `broken internal link ${href}`);
  }

  if (!legacy && /href\s*=\s*["'][^"']*\/anlassraeume/i.test(html)) {
    fail(file, "active editorial page still links to a Vote4Gov Anlassraum");
  }

  if (rel.startsWith("journal/")) {
    for (const marker of ["article-meta", "article-sources", "edebatte-handoff", "edebatte-link"]) {
      if (!html.includes(marker)) fail(file, `missing required article marker ${marker}`);
    }
    if (!html.includes("https://www.edebatte.org/")) fail(file, "article lacks direct eDebatte handoff");
  }
}

const vercelPath = join(root, "vercel.json");
const vercel = JSON.parse(await readFile(vercelPath, "utf8"));
const redirects = vercel.redirects ?? [];
if (!redirects.some((item) => item.source === "/anlassraeume/:path*" && item.destination.includes("edebatte.org"))) {
  fail(vercelPath, "legacy Vote4Gov room redirect to eDebatte is missing");
}
if (JSON.stringify(vercel).includes("X-Frame-Options")) {
  fail(vercelPath, "X-Frame-Options blocks the explicitly supported embed cards");
}
if (!JSON.stringify(vercel).includes("frame-ancestors *")) {
  fail(vercelPath, "embed frame-ancestors policy is missing");
}

const northStarPath = join(root, "docs/VOTE4GOV_NORTH_STAR.md");
const northStar = await readFile(northStarPath, "utf8");
for (const principle of [
  "keine eigene Beteiligungs- oder Abstimmungsplattform",
  "Alle Diskussionen, Korrekturen mit gesellschaftlichem Inhalt und Abstimmungen finden ausschließlich bei eDebatte statt",
  "Vote4Gov untersucht. VoiceOpenGov verbindet. eDebatte beteiligt.",
]) {
  if (!northStar.includes(principle)) fail(northStarPath, `missing canonical principle: ${principle}`);
}

if (failures.length) {
  console.error("Static quality validation failed:\n");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Static quality validation passed for ${htmlFiles.length} HTML files.`);
