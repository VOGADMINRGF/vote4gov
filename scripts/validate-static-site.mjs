import { readFile, readdir, stat } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import process from "node:process";

const root = process.cwd();
const failures = [];

async function walk(directory) {
  const entries = await readdir(directory);
  const files = [];
  for (const entry of entries) {
    if ([".git", "node_modules", "artifacts"].includes(entry)) continue;
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
const vercelPath = join(root, "vercel.json");
const vercel = JSON.parse(await readFile(vercelPath, "utf8"));
const redirects = vercel.redirects ?? [];
const redirectSources = new Set(redirects.map((item) => item.source));

function fail(file, message) {
  failures.push(`${relative(root, file)}: ${message}`);
}

function localTargetExists(href) {
  const path = href.split("#")[0].split("?")[0];
  if (!path || path === "/") return true;
  if (redirectSources.has(path)) return true;
  const clean = path.replace(/^\/+|\/+$/g, "");
  if (!clean) return true;
  return fileSet.has(clean) || fileSet.has(`${clean}.html`) || fileSet.has(`${clean}/index.html`);
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
  for (const match of html.matchAll(/src\s*=\s*["']([^"']+)["']/gi)) {
    const src = match[1];
    if (/^(https?:|data:)/i.test(src)) continue;
    if (!localTargetExists(src)) fail(file, `broken local asset ${src}`);
  }

  if (!legacy && /href\s*=\s*["'][^"']*\/anlassraeume/i.test(html)) {
    fail(file, "active editorial page still links to a Vote4Gov Anlassraum");
  }

  if (rel.startsWith("journal/")) {
    const markers = ["article-meta", "article-sources", "edebatte-handoff"];
    if (rel !== "journal/geschichte-der-demokratie.html") markers.push("edebatte-link");
    for (const marker of markers) if (!html.includes(marker)) fail(file, `missing required article marker ${marker}`);
    if (rel !== "journal/geschichte-der-demokratie.html" && !html.includes("https://www.edebatte.org/")) {
      fail(file, "article lacks direct eDebatte handoff");
    }
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
  "Mein Blick auf Demokratie, Staat und politische Ordnung.",
  "Fragen, die",
  "Vote4Gov ist mein öffentlicher Denk- und Entwurfsraum.",
  "Vote4Gov spricht für mich.",
  "VoiceOpenGov",
  "eDebatte",
  "Geschichte &amp; Weltvergleich",
  "Meine kritischen Thesen",
  "Mein Ordnungsmodell",
  "Vote4Gov · mein Blick",
  "VoiceOpenGov · die Bewegung",
  "eDebatte · das unabhängige Instrument",
  "Meine Regeln für starke Thesen",
  'id="mission"',
  'id="ordnungsmodell"',
  "/vision.html",
  "/systemfragen.html",
  "/systeme-laender.html",
  "/ueber-mich.html",
]) {
  if (!indexHtml.includes(requiredText)) fail(indexPath, `missing start-page requirement: ${requiredText}`);
}
for (const forbidden of ["/regionen.html", "/de/deutschland/", "/de/europa/", "/de/weltweit/"]) {
  if (indexHtml.includes(forbidden)) fail(indexPath, `territorial community route remains on Vote4Gov start page: ${forbidden}`);
}

const systemQuestionsPath = join(root, "systemfragen.html");
const systemQuestions = await readFile(systemQuestionsPath, "utf8");
for (const marker of ["Meine These:", "Stärkster Einwand:", "Prüfmaßstab:", "Meine Position ist kein eDebatte-Ergebnis", "eDebatte bleibt unabhängig", "These bei eDebatte gegenprüfen"]) {
  if (!systemQuestions.includes(marker)) fail(systemQuestionsPath, `missing personal system-thesis contract marker: ${marker}`);
}

const systemsCountriesPath = join(root, "systeme-laender.html");
const systemsCountries = await readFile(systemsCountriesPath, "utf8");
for (const marker of ["Was lässt sich aus anderen politischen Ordnungen lernen", "Deutschland", "Europa", "International", "Vier Regeln für meinen Weltvergleich", "Regionale Community, Teams und politische Präsenz gehören zu VoiceOpenGov"]) {
  if (!systemsCountries.includes(marker)) fail(systemsCountriesPath, `missing world-comparison contract marker: ${marker}`);
}

const homeCssPath = join(root, "home.css");
const homeCss = await readFile(homeCssPath, "utf8");
const homeScriptPath = join(root, "home.js");
const homeScript = await readFile(homeScriptPath, "utf8");
if (!homeCss.includes(".home-page .reveal") || !homeCss.includes(".js-enabled .home-page .reveal:not(.is-visible)")) {
  fail(homeCssPath, "campaign reveal effects must preserve visible content without JavaScript");
}
if (!homeScript.includes('classList.add("js-enabled")')) fail(homeScriptPath, "campaign script must opt in to reveal effects");

const visionPath = join(root, "vision.html");
const visionHtml = await readFile(visionPath, "utf8");
for (const requiredText of [
  "Unsere Gesellschaft verändert sich jeden Tag. Warum darf sie politisch meist nur alle paar Jahre antworten?",
  "Ausgabe 01",
  "International vergleichend",
  "Demokratiegeschichte lesen",
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
  if (!visionHtml.includes(requiredText)) fail(visionPath, `missing editorial requirement: ${requiredText}`);
}
for (const forbidden of ["Ausgabe 02", "Weltatlas", "Atlas-Prototyp", 'href="#welt"', 'id="welt"', "data-atlas-globe"]) {
  if (visionHtml.includes(forbidden)) fail(visionPath, `issue 01 must remain atlas-free: ${forbidden}`);
}
for (const orderedSection of ["I · Geschichte", "II · Digitalwende", "III · Institutionen", "IV · Medien", "V · Infrastruktur", "VI · Ökosystem", "VII · Methode"]) {
  if (!visionHtml.includes(orderedSection)) fail(visionPath, `missing atlas-free section order: ${orderedSection}`);
}

const sourcesPath = join(root, "quellen.html");
const sourcesHtml = await readFile(sourcesPath, "utf8");
if (!sourcesHtml.includes('id="ki-transparenz"') || !sourcesHtml.includes("KI-Ausgaben gelten nicht als Quelle")) {
  fail(sourcesPath, "reusable AI transparency disclosure is missing");
}

const scriptPath = join(root, "script.js");
const script = await readFile(scriptPath, "utf8");
for (const marker of ["data-ai-role", "data-journal-menu-button"]) if (!script.includes(marker)) fail(scriptPath, `missing interaction marker ${marker}`);
for (const forbidden of ["data-atlas-announcer", "data-atlas-globe", "selectAtlasCountry", "atlas-enhanced"]) if (script.includes(forbidden)) fail(scriptPath, `retired Atlas runtime remains in shared script: ${forbidden}`);

const configPath = join(root, "site-config.js");
const configScript = await readFile(configPath, "utf8");
for (const marker of ['number: "01"', 'label: "Ausgabe 01"', 'version: "1.0"', 'source: "de"', 'storageKey: "vote4gov:language:v1"']) {
  if (!configScript.includes(marker)) fail(configPath, `missing canonical configuration marker ${marker}`);
}

const aiPath = join(root, "ai-transparency.js");
const aiScript = await readFile(aiPath, "utf8");
for (const marker of ["/site-config.js", "/on-device-translation.js", "/global-language.js", "/language-ui-unifier.js"]) {
  if (!aiScript.includes(marker)) fail(aiPath, `missing ordered language/configuration load ${marker}`);
}

const historyPath = join(root, "journal/geschichte-der-demokratie.html");
const historyHtml = await readFile(historyPath, "utf8");
for (const forbidden of ["/create", "context_bundle", "entry=context_handoff", "source_url"]) {
  if (historyHtml.includes(forbidden)) fail(historyPath, `history article still exposes forbidden primary handoff ${forbidden}`);
}
if (!historyHtml.includes("Der Themenkontext bei eDebatte wird vorbereitet.")) fail(historyPath, "history article lacks the honest fail-closed handoff state");

if (!redirects.some((item) => item.source === "/anlassraeume/:path*" && item.destination.includes("edebatte.org"))) {
  fail(vercelPath, "legacy Vote4Gov room redirect to eDebatte is missing");
}
if (!redirects.some((item) => item.source === "/hinter-der-idee" && item.destination === "/#mission" && item.permanent === true)) {
  fail(vercelPath, "retired mission route must permanently redirect to the consolidated mission section");
}
if (JSON.stringify(vercel).includes("X-Frame-Options")) fail(vercelPath, "X-Frame-Options blocks supported embed cards");
if (!JSON.stringify(vercel).includes("frame-ancestors *")) fail(vercelPath, "embed frame-ancestors policy is missing");

const northStarPath = join(root, "docs/VOTE4GOV_NORTH_STAR.md");
const northStar = await readFile(northStarPath, "utf8");
for (const principle of [
  "weder Partei noch eigene Beteiligungs- oder Abstimmungsplattform",
  "Alle Diskussionen, Korrekturen mit gesellschaftlichem Inhalt und Abstimmungen finden ausschließlich bei eDebatte statt",
  "Vote4Gov bewirbt und begründet. VoiceOpenGov verbindet. eDebatte beteiligt.",
]) {
  if (!northStar.includes(principle)) fail(northStarPath, `missing canonical principle: ${principle}`);
}

if (failures.length) {
  console.error("Static quality validation failed:\n");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log(`Static quality validation passed for ${htmlFiles.length} HTML files: personal Vote4Gov system view, falsifiable theses, world comparison, vision issue 01 and routing contracts.`);