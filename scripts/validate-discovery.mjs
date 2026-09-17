import { readFile, readdir } from "node:fs/promises";
import { basename, join } from "node:path";

const root = process.cwd();
const site = "https://www.vote4gov.eu";
const failures = [];

function check(condition, message) {
  if (!condition) failures.push(message);
}

const journalDir = join(root, "journal");
const journalFiles = (await readdir(journalDir)).filter((name) => name.endsWith(".html")).sort();
check(journalFiles.length >= 10, `expected at least 10 journal articles, found ${journalFiles.length}`);

for (const file of journalFiles) {
  const html = await readFile(join(journalDir, file), "utf8");
  const slug = basename(file, ".html");
  const canonical = `${site}/journal/${slug}`;
  const required = [
    "<!-- vote4gov-discovery:start -->",
    `rel=\"canonical\" href=\"${canonical}\"`,
    `property=\"og:url\" content=\"${canonical}\"`,
    'name="robots" content="index,follow,max-image-preview:large,max-snippet:-1"',
    'name="author" content="',
    'name="twitter:card" content="summary_large_image"',
    'type="application/ld+json"',
    '"@type":"Article"',
    `"mainEntityOfPage":"${canonical}"`,
    `"url":"${canonical}"`,
    'href="https://www.vote4gov.eu/feed.xml"',
    'href="https://www.vote4gov.eu/feed.json"',
  ];
  for (const marker of required) check(html.includes(marker), `${file}: missing discovery marker ${marker}`);

  check(!html.includes("VoiceOpenGov folgt gültigen eDebatte-Mandaten"), `${file}: retired eDebatte->VOG binding remains`);
  check(!html.includes("verpflichtet seine politische Repräsentation an gültige eDebatte-Mandate"), `${file}: retired eDebatte->VOG binding remains`);

  const sourceSection = html.match(/<section\b[^>]*class=["'][^"']*\barticle-sources\b[^"']*["'][^>]*>([\s\S]*?)<\/section>/i)?.[1] || "";
  if (/href=["']https?:\/\//i.test(sourceSection)) {
    check(html.includes('"citation":['), `${file}: linked external sources exist but Article JSON-LD has no citation array`);
  }
}

const robots = await readFile(join(root, "robots.txt"), "utf8");
check(/User-agent:\s*OAI-SearchBot[\s\S]*?Allow:\s*\//i.test(robots), "robots.txt must explicitly allow OAI-SearchBot");
check(robots.includes("Sitemap: https://www.vote4gov.eu/sitemap.xml"), "robots.txt sitemap is missing or non-canonical");

const llms = await readFile(join(root, "llms.txt"), "utf8");
for (const marker of [
  "Vote4Gov is the personal public thought and design space of Ricky Gerd Fleischer",
  "VoiceOpenGov decides its own program state under its own governance rules",
  "eDebatte is independent",
  "https://www.vote4gov.eu/feed.xml",
  "https://www.vote4gov.eu/feed.json",
]) {
  check(llms.includes(marker), `llms.txt missing boundary/discovery marker: ${marker}`);
}

const rss = await readFile(join(root, "feed.xml"), "utf8");
check(rss.includes("<rss version=\"2.0\""), "feed.xml is not RSS 2.0");
check((rss.match(/<item>/g) || []).length === journalFiles.length, "feed.xml item count must match journal article count");

const jsonFeed = JSON.parse(await readFile(join(root, "feed.json"), "utf8"));
check(jsonFeed.version === "https://jsonfeed.org/version/1.1", "feed.json must use JSON Feed 1.1");
check(jsonFeed.items?.length === journalFiles.length, "feed.json item count must match journal article count");

if (failures.length) {
  console.error("Discovery validation failed:\n");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Discovery validation passed for ${journalFiles.length} journal articles, RSS, JSON Feed, OAI-SearchBot and llms.txt boundaries.`);
