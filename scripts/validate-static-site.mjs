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
    const markers = ["article-meta", "article-sources", "edebatte-handoff"];
    if (rel !== "journal/geschichte-der-demokratie.html") markers.push("edebatte-link");
    for (const marker of markers) {
      if (!html.includes(marker)) fail(file, `missing required article marker ${marker}`);
    }
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
  if (!indexHtml.includes(requiredText)) fail(indexPath, `missing editorial requirement: ${requiredText}`);
}

for (const forbidden of [
  "Ausgabe 02",
  "Weltatlas",
  "Atlas-Prototyp",
  'href="#welt"',
  'id="welt"',
  "data-atlas",
  "data-atlas-country",
  "data-atlas-panel",
  "data-atlas-tab",
  "data-atlas-globe",
]) {
  if (indexHtml.includes(forbidden)) fail(indexPath, `issue 01 must remain atlas-free: ${forbidden}`);
}

for (const orderedSection of [
  "I · Geschichte",
  "II · Digitalwende",
  "III · Institutionen",
  "IV · Medien",
  "V · Infrastruktur",
  "VI · Ökosystem",
  "VII · Methode",
]) {
  if (!indexHtml.includes(orderedSection)) fail(indexPath, `missing atlas-free section order: ${orderedSection}`);
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
for (const marker of ["data-ai-role", "data-journal-menu-button"]) {
  if (!script.includes(marker)) fail(scriptPath, `missing interaction marker ${marker}`);
}
for (const forbidden of ["data-atlas-announcer", "data-atlas-globe", "selectAtlasCountry", "atlas-enhanced"]) {
  if (script.includes(forbidden)) fail(scriptPath, `retired Atlas runtime remains in shared script: ${forbidden}`);
}

const configPath = join(root, "site-config.js");
const configScript = await readFile(configPath, "utf8");
for (const marker of [
  'number: "01"',
  'label: "Ausgabe 01"',
  'version: "1.0"',
  'source: "de"',
  'storageKey: "vote4gov:language:v1"',
  'visibleInIssue: false',
  'futureSlice: "VOTE4GOV-WORLD-ATLAS-FOUNDATION-01"',
]) {
  if (!configScript.includes(marker)) fail(configPath, `missing canonical configuration marker ${marker}`);
}

const aiPath = join(root, "ai-transparency.js");
const aiScript = await readFile(aiPath, "utf8");
for (const marker of ["/site-config.js", "/on-device-translation.js", "/global-language.js", "/language-ui-unifier.js"]) {
  if (!aiScript.includes(marker)) fail(aiPath, `missing ordered language/configuration load ${marker}`);
}

const unifierPath = join(root, "language-ui-unifier.js");
const unifier = await readFile(unifierPath, "utf8");
for (const marker of ["global-language-control", "v4g-language-trigger", "data-language-state-bridge", "data-language-ui"]) {
  if (!unifier.includes(marker)) fail(unifierPath, `missing single-language-control marker ${marker}`);
}

const interruptionScriptPath = join(root, "editorial-interruptions.js");
const interruptionScript = await readFile(interruptionScriptPath, "utf8");
for (const marker of ["accessTrigger.dataset.accessOpen", "aria-haspopup", "showModal"]) {
  if (!interruptionScript.includes(marker)) fail(interruptionScriptPath, `missing deliberate dialog trigger marker ${marker}`);
}
if (/setTimeout[\s\S]{0,180}showModal/u.test(interruptionScript)) {
  fail(interruptionScriptPath, "access dialog must not open from a timer");
}
if (/atlasSection|#welt|data-atlas/u.test(interruptionScript)) {
  fail(interruptionScriptPath, "access layer must not carry retired Atlas cleanup logic");
}

const historyPath = join(root, "journal/geschichte-der-demokratie.html");
const historyHtml = await readFile(historyPath, "utf8");
for (const forbidden of ["/create", "context_bundle", "entry=context_handoff", "source_url"]) {
  if (historyHtml.includes(forbidden)) fail(historyPath, `history article still exposes forbidden primary handoff ${forbidden}`);
}
if (!historyHtml.includes("Der Themenkontext bei eDebatte wird vorbereitet.")) {
  fail(historyPath, "history article lacks the honest fail-closed handoff state");
}

const handoffPath = join(root, "vote4gov-handoff.js");
const handoffScript = await readFile(handoffPath, "utf8");
for (const marker of [
  'CONTEXT_VERSION = "vote4gov-context-v1"',
  'CANONICAL_EDEBATTE_ORIGIN = "https://www.edebatte.org"',
  'articleId: "history-democracy"',
  'issue: "01"',
  'kind: "binary_thesis"',
  'kind: "open_question"',
  'searchParams.set("v4g"',
]) {
  if (!handoffScript.includes(marker)) fail(handoffPath, `missing handoff contract marker ${marker}`);
}
for (const forbidden of ["context_bundle", "entry=context_handoff", "source_url", "window.location.origin", 'searchParams.set("source"']) {
  if (handoffScript.includes(forbidden)) fail(handoffPath, `handoff contract contains forbidden value ${forbidden}`);
}
if (!/topicSlug:\s*["']{2}/u.test(handoffScript) || !/sourceUrl:\s*["']{2}/u.test(handoffScript)) {
  fail(handoffPath, "unconfirmed topic slug and canonical source URL must remain explicitly empty");
}
if ((handoffScript.match(/questionId:\s*["']{2}/gu) || []).length !== 2) {
  fail(handoffPath, "binary and open question IDs must both remain explicitly unconfirmed");
}
if (/questions:\s*release\.questions[\s\S]{0,220}\b(prompt|response|remembered|updatedAt)\b/u.test(handoffScript)) {
  fail(handoffPath, "handoff bundle must not transmit browser prompts or local participation state");
}

const pulsePath = join(root, "participation-pulse.js");
const pulseScript = await readFile(pulsePath, "utf8");
if (/edebate\.addEventListener\(["']click["'][\s\S]{0,220}(delete state|removeItem|clearTopic)/u.test(pulseScript)) {
  fail(pulsePath, "opening eDebatte must not delete local participation state");
}
if (!pulseScript.includes("Eine Linköffnung überträgt oder zählt keine lokale Vormerkung")) {
  fail(pulsePath, "local non-transfer truth is missing");
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

console.log(`Static quality validation passed for ${htmlFiles.length} HTML files: issue 01, atlas-free source, language UI and routing contracts.`);
