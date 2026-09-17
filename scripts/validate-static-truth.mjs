import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";

const failures = [];
const fail = (message) => failures.push(message);
const text = async (path) => readFile(path, "utf8");
const exists = async (path) => {
  try { await access(path, constants.F_OK); return true; } catch { return false; }
};

const index = await text("index.html");
for (const marker of [
  'href="#mission"',
  'data-mission-flow',
  'data-accountability-commitments',
  'home-three-condensed',
  '/global-language.js',
  '/global-language.css',
]) {
  if (!index.includes(marker)) fail(`index.html missing static marker ${marker}`);
}
for (const forbidden of [
  '/hinter-der-idee.html',
  '/i18n.js',
  '/i18n.css',
  'data-i18n-html',
]) {
  if (index.includes(forbidden)) fail(`index.html still contains retired runtime/route ${forbidden}`);
}

const homeJs = await text("home.js");
for (const forbidden of ["home-consolidation.css", "enhanceHomeInformationArchitecture", "data-mission-flow", "data-accountability-commitments"]) {
  if (homeJs.includes(forbidden)) fail(`home.js still generates static architecture: ${forbidden}`);
}

for (const retired of ["i18n.js", "i18n.css", "vision-v3.js"]) {
  if (await exists(retired)) fail(`retired runtime still exists: ${retired}`);
}

const vision = await text("vision.html");
for (const marker of [
  'rel="canonical" href="https://www.vote4gov.eu/vision"',
  'property="og:url" content="https://www.vote4gov.eu/vision"',
  'property="og:image"',
  '/vision-v3.css',
  'class="v3-global-nav"',
  'class="v3-trust-strip"',
  'class="v3-version-ledger"',
  'data-issue-updated',
  'data-issue-version',
  'data-kind="befund"',
  'data-kind="analyse"',
  'data-kind="umsetzung"',
  'data-kind="modell"',
  'data-kind="methode"',
]) {
  if (!vision.includes(marker)) fail(`vision.html missing static V3/SEO marker ${marker}`);
}
if (vision.includes("vision-v3.js")) fail("vision.html still references runtime Vision DOM injection");

const config = await text("site-config.js");
for (const marker of ['version: "1.0"', 'publishedAt: "2026-09-17"', 'updatedAt: "2026-09-17"', "data-issue-version", "data-issue-updated"]) {
  if (!config.includes(marker)) fail(`site-config.js missing central issue marker ${marker}`);
}
if (config.includes("vision-v3.js") || config.includes("vision-v3.css")) fail("site-config.js still dynamically loads Vision V3 assets");

const visionCss = await text("vision-v3.css");
for (const marker of [".information-layers article", "grid-template-columns:58px", ".v3-global-nav", ".v3-trust-strip"]) {
  if (!visionCss.includes(marker)) fail(`vision-v3.css missing editorial flow marker ${marker}`);
}

for (const path of ["regionen.html", "ueber-mich.html"]) {
  const source = await text(path);
  if (source.includes('href="/hinter-der-idee') || source.includes('href="/hinter-der-idee.html')) fail(`${path} still links to retired mission route`);
}

if (failures.length) {
  console.error("Static truth validation failed:\n");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Static truth validation passed: landing, language runtime, Vision V3, version source, SEO and legacy mission cleanup.");
