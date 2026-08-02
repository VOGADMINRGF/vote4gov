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

  for (const match of html.matchAll(/<a\b[^>]*class=["'][^"']*\bedebatte-link\b[^"']*["'][^>]*href=["']([^"']+)["']/gi)) {
    const href = match[1].replaceAll("&amp;", "&");
    if (!href.startsWith("https://www.edebatte.org/")) fail(file, "eDebatte handoff points outside edebatte.org");
    if (!href.includes("source=vote4gov")) fail(file, "eDebatte handoff lacks Vote4Gov origin metadata");
  }
}

const indexPath = join(root, "index.html");
const indexHtml = await readFile(indexPath, "utf8");
for (const requiredText of [
  "Unsere Gesellschaft verändert sich jeden Tag. Warum darf sie politisch meist nur alle paar Jahre antworten?",
  "Politische Gesamtpakete",
  "Zeitlich gebündelt",
  "Vorgegebene Verfahren",
  "Medienlogik",
  "Umfragen",
  "Grundgesamtheit",
  "Auswahlverfahren",
  "Stichprobengröße",
  "Erhebungsmethode",
  "Feldzeit",
  "Frageformulierung",
  "Gewichtung",
  "Unsicherheitsbereich",
  "Auftraggeber",
  "Nichtantworten oder Ausschöpfung",
  "KI-Ausgaben gelten nicht als Quelle",
]) {
  if (!indexHtml.includes(requiredText)) fail(indexPath, `missing editorial requirement: ${requiredText}`);
}
for (const code of ["de", "ch", "ee", "fr"]) {
  if (!indexHtml.includes(`data-atlas-panel="${code}"`)) fail(indexPath, `missing atlas panel ${code}`);
  if (!indexHtml.includes(`data-atlas-country="${code}" data-atlas-tab`)) fail(indexPath, `missing mobile atlas tab ${code}`);
  if (!indexHtml.includes(`data-atlas-country="${code}" data-atlas-globe`)) fail(indexPath, `missing globe control ${code}`);
}
for (const layer of ["Ereignis oder Primärinformation", "Journalistische Auswahl", "Nachricht", "Kontext und Einordnung", "Kommentar oder Meinung", "Prognose", "Umfrage oder Stichprobenergebnis"]) {
  if (!indexHtml.includes(layer)) fail(indexPath, `missing information layer: ${layer}`);
}

const sourcesPath = join(root, "quellen.html");
const sourcesHtml = await readFile(sourcesPath, "utf8");
if (!sourcesHtml.includes('id="ki-transparenz"') || !sourcesHtml.includes("KI-Ausgaben gelten nicht als Quelle")) {
  fail(sourcesPath, "reusable AI transparency disclosure is missing");
}

const scriptPath = join(root, "script.js");
const script = await readFile(scriptPath, "utf8");
for (const marker of ["data-atlas-announcer", "aria-selected", "ArrowRight", "data-ai-role", "data-journal-menu-button"]) {
  if (!script.includes(marker)) fail(scriptPath, `missing interaction marker ${marker}`);
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
