import process from "node:process";

const playwrightModule = process.env.PLAYWRIGHT_MODULE || "playwright";
const { chromium } = await import(playwrightModule);
const baseUrl = process.env.VOTE4GOV_BASE_URL || "http://127.0.0.1:4173";
const failures = [];

function check(condition, message) {
  if (!condition) failures.push(message);
}

async function openPage(context, path) {
  const page = await context.newPage();
  const runtimeErrors = [];
  page.on("pageerror", (error) => runtimeErrors.push(error.message));
  await page.goto(`${baseUrl}${path}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  check(runtimeErrors.length === 0, `${path}: runtime errors: ${runtimeErrors.join(" | ")}`);
  return page;
}

async function checkAtlasFree(page, label) {
  check(await page.locator("#welt").count() === 0, `${label}: retired Atlas section exists`);
  check(await page.locator('[href="#welt"]').count() === 0, `${label}: retired Atlas anchor exists`);
  check(await page.locator("[data-atlas],[data-atlas-country],[data-atlas-panel],[data-atlas-tab],[data-atlas-globe]").count() === 0, `${label}: retired Atlas runtime markers exist`);
}

async function checkSingleVisibleLanguageControl(page, label) {
  const visible = page.locator('.global-language-control[data-language-ui="canonical"]:visible');
  check(await visible.count() === 1, `${label}: exactly one visible canonical language selector is required`);
  check(await page.locator(".v4g-language-trigger:visible").count() === 0, `${label}: duplicate language trigger is visible`);
  check(await page.locator('.global-language-control select:visible').count() === 1, `${label}: exactly one visible language select is required`);
}

const browser = await chromium.launch({ headless: true });
try {
  const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });

  const campaign = await openPage(desktop, "/");
  check(await campaign.locator(".home-hero h1").isVisible(), "campaign desktop: hero is not visible");
  check((await campaign.locator("#hero-title").textContent())?.includes("Fragen, die"), "campaign desktop: review-first primary claim is missing");
  check(await campaign.locator('nav a[href="/vision.html"]').count() === 1, "campaign desktop: vision route is missing");
  check(await campaign.locator('nav a[href="/systemfragen.html"]').count() === 1, "campaign desktop: system questions route is missing");
  check(await campaign.locator('nav a[href="/systeme-laender.html"]').count() === 1, "campaign desktop: systems/countries route is missing");
  check(await campaign.locator('nav a[href="/regionen.html"]').count() === 0, "campaign desktop: territorial regions route is still primary navigation");
  check(await campaign.locator('#mission').count() === 1, "campaign desktop: role/mission section is missing");
  check(await campaign.locator('.home-mission-flow').count() === 1, "campaign desktop: system-question flow is missing");
  check(await campaign.locator('.accountability-commitments').count() === 1, "campaign desktop: editorial commitments are missing");
  check(await campaign.locator('#systemfragen').count() === 1, "campaign desktop: system-question preview is missing");
  check((await campaign.locator('#mission').textContent())?.includes("VoiceOpenGov verbindet Menschen und Regionen"), "campaign desktop: VoiceOpenGov territorial role is not explicit");
  check(await campaign.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1), "campaign desktop: horizontal overflow");
  await campaign.close();

  const questions = await openPage(desktop, "/systemfragen.html");
  check(await questions.getByText("Unbequem fragen. Fair gegenprüfen.", { exact: true }).isVisible(), "system questions: hero is missing");
  check(await questions.getByText("These:", { exact: true }).count() >= 1, "system questions: thesis marker is missing");
  check(await questions.getByText("Gegenposition:", { exact: true }).count() >= 1, "system questions: counterposition marker is missing");
  check(await questions.getByText("Prüfmaßstab:", { exact: true }).count() >= 1, "system questions: test-criterion marker is missing");
  check((await questions.locator("body").textContent())?.includes("Keine Regionalbewegung"), "system questions: VoiceOpenGov boundary is missing");
  await questions.close();

  const systems = await openPage(desktop, "/systeme-laender.html");
  check(await systems.getByText("Länder vergleichen, ohne sie zu Community-Strukturen zu machen.", { exact: true }).isVisible(), "systems/countries: analytical framing is missing");
  check((await systems.locator("body").textContent())?.includes("Keine territoriale Organisation"), "systems/countries: territorial boundary is missing");
  await systems.close();

  const vision = await openPage(desktop, "/vision.html");
  check(await vision.locator(".cover-main h1").isVisible(), "vision desktop: hero is not visible");
  check(await vision.getByText("Ausgabe 01", { exact: true }).count() >= 1, "vision desktop: issue 01 is missing");
  check(await vision.getByText("Ausgabe 02", { exact: false }).count() === 0, "vision desktop: issue 02 is visible");
  await checkAtlasFree(vision, "vision desktop");
  await checkSingleVisibleLanguageControl(vision, "vision desktop");
  check(await vision.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1), "vision desktop: horizontal overflow");
  await vision.setViewportSize({ width: 720, height: 450 });
  check(await vision.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1), "vision 200% zoom: horizontal overflow");
  await vision.close();

  const article = await openPage(desktop, "/journal/geschichte-der-demokratie.html");
  check(await article.locator('.edebatte-handoff[data-handoff-state="preparing"]').count() === 1, "article: fail-closed handoff state is missing");
  check(await article.getByText("Der Themenkontext bei eDebatte wird vorbereitet.", { exact: true }).count() >= 1, "article: preparing copy is missing");
  check(await article.locator('a[href*="/create"],a[href*="context_bundle"],a[href*="source_url"]').count() === 0, "article: forbidden primary handoff is active");
  await article.close();
  await desktop.close();

  for (const viewport of [{ width: 390, height: 844 }, { width: 320, height: 700 }]) {
    const mobile = await browser.newContext({ viewport, screen: viewport, hasTouch: true, reducedMotion: "reduce" });
    for (const path of ["/", "/systemfragen.html", "/systeme-laender.html", "/vision.html"]) {
      const page = await openPage(mobile, path);
      check(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1), `${viewport.width}px ${path}: horizontal overflow`);
      if (path === "/vision.html") {
        await checkAtlasFree(page, `${viewport.width}px vision`);
        await checkSingleVisibleLanguageControl(page, `${viewport.width}px vision`);
      }
      await page.close();
    }
    await mobile.close();
  }

  const noJs = await browser.newContext({ viewport: { width: 390, height: 844 }, javaScriptEnabled: false });
  const noJsCampaign = await openPage(noJs, "/");
  check(await noJsCampaign.locator(".home-hero h1").isVisible(), "campaign no-JS: hero is not readable");
  check((await noJsCampaign.locator("#hero-title").textContent())?.includes("Fragen, die"), "campaign no-JS: review-first primary claim is missing");
  check(await noJsCampaign.locator('.home-mission-flow').count() === 1, "campaign no-JS: static mission/system flow is missing");
  check(await noJsCampaign.locator('.accountability-commitments').count() === 1, "campaign no-JS: static commitments are missing");
  await noJsCampaign.close();
  const noJsVision = await openPage(noJs, "/vision.html");
  check(await noJsVision.locator(".cover-main h1").isVisible(), "vision no-JS: hero is not readable");
  await checkAtlasFree(noJsVision, "vision no-JS");
  await noJs.close();
} finally {
  await browser.close();
}

if (failures.length) {
  console.error("Browser regression failed:\n");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Browser regression passed: review-first campaign, system questions, systems/countries boundary, atlas-free vision, desktop, mobile, 200% zoom and no-JS.");
