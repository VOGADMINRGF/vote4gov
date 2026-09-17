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

const retiredSelfGovernanceSignals = [
  "entscheidet seinen eigenen Programmstand aber nach den eigenen Governance-Regeln",
  "VoiceOpenGov entscheidet seinen eigenen Programmstand",
  "Ein eDebatte-Ergebnis bindet VoiceOpenGov aber nicht automatisch",
  "entscheidet den VoiceOpenGov-Programmstand aber nicht automatisch",
  "VoiceOpenGov entwickelt seinen eigenen Programmstand über die eigene demokratische Governance",
  "Ein eDebatte-Ergebnis bindet VoiceOpenGov **nicht automatisch**",
  "Eine VoiceOpenGov-Position entsteht oder ändert sich erst nach den eigenen veröffentlichten VoiceOpenGov-Governance-Regeln",
];

function forbidRetiredSelfGovernance(file, content) {
  for (const forbidden of retiredSelfGovernanceSignals) {
    if (content.includes(forbidden)) fail(file, `retired VOG self-governance signal remains: ${forbidden}`);
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
  "eDebatte · unabhängiger Prüf- und Entscheidungsraum",
  "VoiceOpenGov · Bewegung &amp; Repräsentation",
  "gültig abgeschlossener eDebatte-Entscheid bindet die zuständige VoiceOpenGov-Repräsentation",
  "Entwürfe, laufende Debatten und informelle Stimmungsbilder binden nicht",
  "Meine persönliche Überzeugung auf Vote4Gov wird dadurch nicht automatisch umgeschrieben",
  "gültig abgeschlossenes Verfahren erzeugt einen verbindlichen VOG-Repräsentationsauftrag",
  "Meine Regeln für starke Thesen",
  'id="mission"',
  'id="ordnungsmodell"',
  "/vision.html",
  "/systemfragen.html",
  "/systeme-laender.html",
  "/ueber-mich.html",
  "https://www.voiceopengov.org/mitmachen",
]) {
  if (!indexHtml.includes(requiredText)) fail(indexPath, `missing start-page requirement: ${requiredText}`);
}
for (const forbidden of [
  "/regionen.html",
  "/de/deutschland/",
  "/de/europa/",
  "/de/weltweit/",
  "https://www.voiceopengov.org/mitglied-werden",
  '"sameAs":["https://www.voiceopengov.org/","https://www.edebatte.org/"]',
]) {
  if (indexHtml.includes(forbidden)) fail(indexPath, `retired or misleading homepage signal remains: ${forbidden}`);
}
forbidRetiredSelfGovernance(indexPath, indexHtml);
for (const seoMarker of [
  'rel="canonical" href="https://www.vote4gov.eu/"',
  'name="author" content="Ricky Gerd Fleischer"',
  '<title>Ricky Gerd Fleischer | Vote4Gov – Demokratie &amp; Systemfragen</title>',
  'property="og:title" content="Ricky Gerd Fleischer | Vote4Gov – Demokratie & Systemfragen"',
  'property="og:image"',
  'name="twitter:card" content="summary_large_image"',
  'name="twitter:image"',
  'rel="preload" as="image" href="/assets/hero-ricky-cutout.png"',
  'fetchpriority="high" loading="eager"',
  '"@type":"Person"',
  '"@type":"WebPage"',
  '"author":{"@id":"https://www.vote4gov.eu/#person"}',
  '"knowsAbout":["Demokratiegeschichte","Bürgerbeteiligung","politische Repräsentation","digitale Demokratie","institutionelle Reformen"]',
]) {
  if (!indexHtml.includes(seoMarker)) fail(indexPath, `missing homepage SEO/performance marker: ${seoMarker}`);
}

const aboutPath = join(root, "ueber-mich.html");
const aboutHtml = await readFile(aboutPath, "utf8");
for (const marker of [
  '"@type":"ProfilePage"',
  '"mainEntity":{"@type":"Person"',
  '"@id":"https://www.vote4gov.eu/#person"',
  "Ricky Gerd Fleischer – Über mich | Vote4Gov",
  "eDebatte als unabhängiger Evidenz-, Beteiligungs- und Entscheidungsraum",
  "gültig abgeschlossene eDebatte-Entscheidungen innerhalb ihres definierten Geltungsbereichs repräsentiert",
  "gültig abgeschlossener eDebatte-Entscheid bindet die zuständige VoiceOpenGov-Repräsentation",
  "ohne meine persönliche Überzeugung auf Vote4Gov automatisch zu verändern",
]) {
  if (!aboutHtml.includes(marker)) fail(aboutPath, `missing profile/entity marker: ${marker}`);
}
if (aboutHtml.includes('"sameAs":["https://www.voiceopengov.org/","https://www.edebatte.org/"]')) {
  fail(aboutPath, "ProfilePage must not claim VoiceOpenGov or eDebatte are the same Person entity");
}
forbidRetiredSelfGovernance(aboutPath, aboutHtml);

const systemQuestionsPath = join(root, "systemfragen.html");
const systemQuestions = await readFile(systemQuestionsPath, "utf8");
for (const marker of [
  "Meine These:",
  "Stärkster Einwand:",
  "Prüfmaßstab:",
  "Meine Position ist kein eDebatte-Ergebnis",
  "eDebatte bleibt unabhängig",
  "Gültige eDebatte-Entscheidungen binden die zuständige VoiceOpenGov-Repräsentation",
  "gültig abgeschlossenes eDebatte-Ergebnis wird innerhalb seines definierten sachlichen und regionalen Geltungsbereichs zum aktuellen VoiceOpenGov-Repräsentationsmandat",
  "verändert aber nicht automatisch meine persönliche Überzeugung auf Vote4Gov",
  "These bei eDebatte gegenprüfen",
]) {
  if (!systemQuestions.includes(marker)) fail(systemQuestionsPath, `missing personal system-thesis contract marker: ${marker}`);
}
forbidRetiredSelfGovernance(systemQuestionsPath, systemQuestions);

const systemsCountriesPath = join(root, "systeme-laender.html");
const systemsCountries = await readFile(systemsCountriesPath, "utf8");
for (const marker of ["Was lässt sich aus anderen politischen Ordnungen lernen", "Deutschland", "Europa", "International", "Vier Regeln für meinen Weltvergleich", "Regionale Community, Teams und politische Präsenz gehören zu VoiceOpenGov"]) {
  if (!systemsCountries.includes(marker)) fail(systemsCountriesPath, `missing world-comparison contract marker: ${marker}`);
}

const homeCssPath = join(root, "home.css");
const homeCss = await readFile(homeCssPath, "utf8");
const homeConsolidationPath = join(root, "home-consolidation.css");
const homeConsolidationCss = await readFile(homeConsolidationPath, "utf8");
const homeScriptPath = join(root, "home.js");
const homeScript = await readFile(homeScriptPath, "utf8");
if (!homeCss.includes(".home-page .reveal") || !homeCss.includes(".js-enabled .home-page .reveal:not(.is-visible)")) {
  fail(homeCssPath, "campaign reveal effects must preserve visible content without JavaScript");
}
if (!homeScript.includes('classList.add("js-enabled")')) fail(homeScriptPath, "campaign script must opt in to reveal effects");
for (const marker of ["@media(max-width:820px)", ".home-portrait>img{display:block!important", "object-fit:contain", "@media(max-width:620px)"]) {
  if (!homeConsolidationCss.includes(marker)) fail(homeConsolidationPath, `mobile author portrait contract missing: ${marker}`);
}

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

const readmePath = join(root, "README.md");
const readme = await readFile(readmePath, "utf8");
for (const principle of [
  "Vote4Gov denkt und hinterfragt.",
  "eDebatte prüft, beteiligt und bildet den gültigen Mehrheitswillen ab.",
  "VoiceOpenGov vertritt und verantwortet dessen politische Umsetzung.",
  "Ein nach den veröffentlichten Regeln gültig abgeschlossenes eDebatte-Ergebnis bindet VoiceOpenGov",
  "VoiceOpenGov darf ein gültiges eDebatte-Mehrheitsmandat nicht durch eine interne Gegenposition ersetzen.",
]) {
  if (!readme.includes(principle)) fail(readmePath, `missing canonical README principle: ${principle}`);
}
forbidRetiredSelfGovernance(readmePath, readme);

const northStarPath = join(root, "docs/VOTE4GOV_NORTH_STAR.md");
const northStar = await readFile(northStarPath, "utf8");
for (const principle of [
  "Vote4Gov = Ricky: persönlicher Systemblick, Thesen und Ordnungsentwurf.",
  "eDebatte = unabhängiger Evidenz-, Dossier-, Beteiligungs- und Entscheidungsraum, den unterschiedliche Akteure nutzen können.",
  "VoiceOpenGov = politische Bürgerbewegung sowie Repräsentations- und Umsetzungsschicht für gültige eDebatte-Mandate.",
  "Vote4Gov ist **keine Partei**",
  "Ein nach den veröffentlichten Regeln gültig abgeschlossener eDebatte-Entscheidungssnapshot bindet die zuständige VoiceOpenGov-Repräsentation",
  "VoiceOpenGov darf ein solches gültiges Mandat nicht durch eine interne Gegenposition ersetzen.",
  "Ein Draft, laufender Prozess, unvollständige Abstimmung oder informelles Stimmungsbild bindet VoiceOpenGov **nicht**.",
  "Ein gültiges eDebatte-Ergebnis verändert Rickys persönliche Vote4Gov-Überzeugung **nicht automatisch**.",
  "Auf Mobilgeräten darf das Autorenporträt der Vote4Gov-Startseite nicht ausgeblendet werden.",
]) {
  if (!northStar.includes(principle)) fail(northStarPath, `missing canonical principle: ${principle}`);
}
forbidRetiredSelfGovernance(northStarPath, northStar);
for (const forbidden of [
  "eDebatte entscheidet → VoiceOpenGov muss übernehmen.",
  "Kein Automatismus `eDebatte → VoiceOpenGov`",
]) {
  if (northStar.includes(forbidden)) fail(northStarPath, `retired anti-binding doctrine remains: ${forbidden}`);
}

const sitemapPath = join(root, "sitemap.xml");
const sitemap = await readFile(sitemapPath, "utf8");
for (const url of ["https://www.vote4gov.eu/", "https://www.vote4gov.eu/vision", "https://www.vote4gov.eu/systemfragen", "https://www.vote4gov.eu/systeme-laender", "https://www.vote4gov.eu/ueber-mich"]) {
  if (!sitemap.includes(`<loc>${url}</loc>`)) fail(sitemapPath, `missing canonical sitemap URL: ${url}`);
}

if (failures.length) {
  console.error("Static quality validation failed:\n");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log(`Static quality validation passed for ${htmlFiles.length} HTML files: personal Vote4Gov role, clean Ricky person entity, independent eDebatte plus valid scoped VOG mandate boundary, mobile author portrait, SEO metadata, world comparison and vision issue 01.`);