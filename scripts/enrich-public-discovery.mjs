import { readFile, readdir, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";

const root = process.cwd();
const journalDir = join(root, "journal");
const site = "https://www.vote4gov.eu";
const defaultImage = `${site}/assets/hero-earth-v2.webp`;
const markerStart = "<!-- vote4gov-discovery:start -->";
const markerEnd = "<!-- vote4gov-discovery:end -->";

const monthMap = new Map([
  ["januar", "01"], ["februar", "02"], ["märz", "03"], ["maerz", "03"],
  ["april", "04"], ["mai", "05"], ["juni", "06"], ["juli", "07"],
  ["august", "08"], ["september", "09"], ["oktober", "10"],
  ["november", "11"], ["dezember", "12"],
]);

function decodeHtml(value = "") {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&nbsp;", " ")
    .replaceAll("&ndash;", "–")
    .replaceAll("&mdash;", "—")
    .replaceAll("&auml;", "ä")
    .replaceAll("&ouml;", "ö")
    .replaceAll("&uuml;", "ü")
    .replaceAll("&Auml;", "Ä")
    .replaceAll("&Ouml;", "Ö")
    .replaceAll("&Uuml;", "Ü")
    .replaceAll("&szlig;", "ß");
}

function stripTags(value = "") {
  return decodeHtml(value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim());
}

function attr(value = "") {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function jsonForHtml(value) {
  return JSON.stringify(value).replaceAll("<", "\\u003c");
}

function extractMeta(html, name) {
  const byName = html.match(new RegExp(`<meta\\s+[^>]*name=["']${name}["'][^>]*content=["']([^"']*)["'][^>]*>`, "i"));
  if (byName) return decodeHtml(byName[1]);
  const reversed = html.match(new RegExp(`<meta\\s+[^>]*content=["']([^"']*)["'][^>]*name=["']${name}["'][^>]*>`, "i"));
  return reversed ? decodeHtml(reversed[1]) : "";
}

function extractTitle(html) {
  return stripTags(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || "Vote4Gov Review");
}

function extractDate(html) {
  const match = stripTags(html).match(/\b(\d{1,2})\.\s+(Januar|Februar|März|Maerz|April|Mai|Juni|Juli|August|September|Oktober|November|Dezember)\s+(20\d{2})\b/i);
  if (!match) return null;
  const month = monthMap.get(match[2].toLowerCase());
  return month ? `${match[3]}-${month}-${String(match[1]).padStart(2, "0")}` : null;
}

function extractAuthor(html) {
  if (/Ricky\s+G(?:erd|\.)\s+Fleischer/i.test(html)) {
    return { type: "Person", name: "Ricky Gerd Fleischer", id: `${site}/#person` };
  }
  if (/Vote4Gov\s+Redaktion/i.test(html)) {
    return { type: "Organization", name: "Vote4Gov Redaktion", id: `${site}/#review` };
  }
  return { type: "Organization", name: "Vote4Gov Review", id: `${site}/#review` };
}

function extractCitations(html) {
  const sources = html.match(/<section\b[^>]*class=["'][^"']*\barticle-sources\b[^"']*["'][^>]*>([\s\S]*?)<\/section>/i)?.[1] || "";
  const urls = [...sources.matchAll(/href=["'](https?:\/\/[^"']+)["']/gi)]
    .map((match) => decodeHtml(match[1]))
    .filter((url) => !url.startsWith(site));
  return [...new Set(urls)];
}

function removeGeneratedBlock(html) {
  const pattern = new RegExp(`${markerStart}[\\s\\S]*?${markerEnd}\\s*`, "g");
  return html.replace(pattern, "");
}

function buildDiscoveryBlock({ url, title, description, datePublished, author, citations }) {
  const graph = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    mainEntityOfPage: url,
    url,
    headline: title,
    description,
    inLanguage: "de",
    image: defaultImage,
    author: author.type === "Person"
      ? { "@type": "Person", "@id": author.id, name: author.name, url: `${site}/ueber-mich` }
      : { "@type": "Organization", "@id": author.id, name: author.name, url: site },
    publisher: { "@type": "Organization", "@id": `${site}/#review`, name: "Vote4Gov Review", url: site },
    isPartOf: { "@type": "WebSite", "@id": `${site}/#website`, name: "Vote4Gov", url: `${site}/` },
    ...(datePublished ? { datePublished } : {}),
    ...(citations.length ? { citation: citations } : {}),
  };

  return `${markerStart}\n` +
    `  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1" />\n` +
    `  <meta name="author" content="${attr(author.name)}" />\n` +
    `  <link rel="canonical" href="${attr(url)}" />\n` +
    `  <link rel="alternate" type="application/rss+xml" title="Vote4Gov Review RSS" href="${site}/feed.xml" />\n` +
    `  <link rel="alternate" type="application/feed+json" title="Vote4Gov Review JSON Feed" href="${site}/feed.json" />\n` +
    `  <meta property="og:url" content="${attr(url)}" />\n` +
    `  <meta property="og:image" content="${attr(defaultImage)}" />\n` +
    `  <meta property="og:image:alt" content="Vote4Gov Review" />\n` +
    (datePublished ? `  <meta property="article:published_time" content="${datePublished}" />\n` : "") +
    `  <meta name="twitter:card" content="summary_large_image" />\n` +
    `  <meta name="twitter:title" content="${attr(title)}" />\n` +
    `  <meta name="twitter:description" content="${attr(description)}" />\n` +
    `  <meta name="twitter:image" content="${attr(defaultImage)}" />\n` +
    `  <script type="application/ld+json">${jsonForHtml(graph)}</script>\n` +
    `${markerEnd}`;
}

function toRfc822(date) {
  if (!date) return null;
  return new Date(`${date}T12:00:00Z`).toUTCString();
}

function xml(value = "") {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");
}

const files = (await readdir(journalDir)).filter((name) => name.endsWith(".html")).sort();
const articles = [];

for (const file of files) {
  const path = join(journalDir, file);
  let html = removeGeneratedBlock(await readFile(path, "utf8"));
  const slug = basename(file, ".html");
  const url = `${site}/journal/${slug}`;
  const title = extractTitle(html);
  const description = extractMeta(html, "description") || title;
  const datePublished = extractDate(html);
  const author = extractAuthor(html);
  const citations = extractCitations(html);
  const block = buildDiscoveryBlock({ url, title, description, datePublished, author, citations });

  if (!html.includes("</head>")) throw new Error(`${file}: missing </head>`);
  html = html.replace("</head>", `${block}\n</head>`);
  await writeFile(path, html, "utf8");
  articles.push({ file, slug, url, title, description, datePublished, author, citations });
}

articles.sort((a, b) => (b.datePublished || "0000-00-00").localeCompare(a.datePublished || "0000-00-00") || a.title.localeCompare(b.title));

const rssItems = articles.map((article) => {
  const published = toRfc822(article.datePublished);
  return `  <item>\n    <title>${xml(article.title)}</title>\n    <link>${xml(article.url)}</link>\n    <guid isPermaLink="true">${xml(article.url)}</guid>\n    <description>${xml(article.description)}</description>\n    <author>${xml(article.author.name)}</author>${published ? `\n    <pubDate>${published}</pubDate>` : ""}\n  </item>`;
}).join("\n");

const rss = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n<channel>\n  <title>Vote4Gov Review</title>\n  <link>${site}/</link>\n  <description>Persönliche Systemthesen, Demokratiegeschichte, Weltvergleich, Quellen und Gegenpositionen von Vote4Gov.</description>\n  <language>de-DE</language>\n  <atom:link href="${site}/feed.xml" rel="self" type="application/rss+xml" />\n${rssItems}\n</channel>\n</rss>\n`;
await writeFile(join(root, "feed.xml"), rss, "utf8");

const jsonFeed = {
  version: "https://jsonfeed.org/version/1.1",
  title: "Vote4Gov Review",
  home_page_url: `${site}/`,
  feed_url: `${site}/feed.json`,
  description: "Persönliche Systemthesen, Demokratiegeschichte, Weltvergleich, Quellen und Gegenpositionen von Vote4Gov.",
  language: "de",
  authors: [{ name: "Vote4Gov Review", url: `${site}/` }],
  items: articles.map((article) => ({
    id: article.url,
    url: article.url,
    title: article.title,
    summary: article.description,
    ...(article.datePublished ? { date_published: `${article.datePublished}T12:00:00Z` } : {}),
    authors: [{ name: article.author.name, ...(article.author.type === "Person" ? { url: `${site}/ueber-mich` } : {}) }],
    ...(article.citations.length ? { _citations: article.citations } : {}),
  })),
};
await writeFile(join(root, "feed.json"), `${JSON.stringify(jsonFeed, null, 2)}\n`, "utf8");

console.log(`Discovery enrichment written for ${articles.length} journal articles; feed.xml and feed.json generated.`);
