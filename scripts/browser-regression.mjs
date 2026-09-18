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
  check((await campaign.locator("#hero-title").textContent())?.includes("Fragen, die"), "campaign desktop: personal-system primary claim is missing");
  check(await campaign.locator(".home-portrait > img").isVisible(), "campaign desktop: author portrait is not visible");
  check(await campaign.locator('nav a[href="/vision.html"]').count() === 1, "campaign desktop: vision route is missing");
  check(await campaign.locator('nav a[href="/systemfragen.html"]').count() === 1, "campaign desktop: personal theses route is missing");
  check(await campaign.locator('nav a[href="/systeme-laender.html"]').count() === 1, "campaign desktop: world comparison route is missing");
  check(await campaign.locator('nav a[href="/regionen.html"]').count() === 0, "campaign desktop: territorial regions route is still primary navigation");
  check(await campaign.locator('#mission').count() === 1, "campaign desktop: personal view section is missing");
  check(await campaign.locator('.home-mission-flow').count() === 1, "campaign desktop: history-to-draft flow is missing");
  check(await campaign.locator('.accountability-commitments').count() === 1, "campaign desktop: public commitments are missing");
  check(await campaign.locator('#systemfragen').count() === 1, "campaign desktop: personal theses preview is missing");
  check(await campaign.locator('#ordnungsmodell').count() === 1, "campaign desktop: personal order model is missing");
  check((await campaign.locator('#mission').textContent())?.includes("Vote4Gov spricht für mich"), "campaign desktop: personal authorship is not explicit");
  const campaignText = await campaign.locator("body").textContent();
  check(campaignText?.includes("eDebatte · unabhängiger Prüf- und Entscheidungsraum"), "campaign desktop: independent eDebatte role is not explicit");
  check(campaignText?.includes("VoiceOpenGov · Bewegung & Repräsentation"), "campaign desktop: VoiceOpenGov movement role is not explicit");
  check(campaignText?.includes("gültig abgeschlossener eDebatte-Entscheid bindet die zuständige VoiceOpenGov-Repräsentation"), "campaign desktop: valid eDebatte-to-VOG mandate binding is missing");
  check(campaignText?.includes("Entwürfe, laufende Debatten und informelle Stimmungsbilder binden nicht"), "campaign desktop: draft/nonbinding boundary is missing");
  check(campaignText?.includes("Meine persönliche Überzeugung auf Vote4Gov wird dadurch nicht automatisch umgeschrieben"), "campaign desktop: personal belief boundary is missing");
  check(!campaignText?.includes("entscheidet seinen eigenen Programmstand aber nach den eigenen Governance-Regeln"), "campaign desktop: retired VOG self-governance boundary remains");
  check(await campaign.locator('a[href="https://www.voiceopengov.org/mitmachen"]').count() >= 1, "campaign desktop: canonical VoiceOpenGov participation handoff is missing");
  check(await campaign.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1), "campaign desktop: horizontal overflow");

  await campaign.setViewportSize({ width: 2560, height: 1440 });
  await campaign.waitForTimeout(150);
  const wideShellBox = await campaign.locator(".home-shell.home-stack").boundingBox();
  check(Boolean(wideShellBox && wideShellBox.width >= 1800), "campaign wide desktop: content rail is still too narrow");
  check(Boolean(wideShellBox && wideShellBox.width <= 1900), "campaign wide desktop: content rail exceeds intended reading width");
  const wideQuestionColumns = await campaign.locator("#systemfragen .vision-grid").evaluate((element) =>
    getComputedStyle(element).gridTemplateColumns.split(" ").filter(Boolean).length
  );
  check(wideQuestionColumns >= 3, "campaign wide desktop: system-thesis grid does not use the wider layout");
  check(await campaign.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1), "campaign wide desktop: horizontal overflow");
  await campaign.close();

  const questions = await openPage(desktop, "/systemfragen.html");
  check(await questions.getByText("Das ist mein Blick. Widerspruch gehört dazu.", { exact: true }).isVisible(), "system questions: personal hero is missing");
  check(await questions.getByText("Meine These:", { exact: true }).count() >= 1, "system questions: personal thesis marker is missing");
  check(await questions.getByText("Stärkster Einwand:", { exact: true }).count() >= 1, "system questions: strongest-objection marker is missing");
  check(await questions.getByText("Prüfmaßstab:", { exact: true }).count() >= 1, "system questions: test-criterion marker is missing");
  const questionsText = await questions.locator("body").textContent();
  check(questionsText?.includes("eDebatte bleibt unabhängig"), "system questions: eDebatte independence boundary is missing");
  check(questionsText?.includes("Gültige eDebatte-Entscheidungen binden die zuständige VoiceOpenGov-Repräsentation"), "system questions: valid VOG mandate heading is missing");
  check(questionsText?.includes("gültig abgeschlossenes eDebatte-Ergebnis wird innerhalb seines definierten sachlichen und regionalen Geltungsbereichs zum aktuellen VoiceOpenGov-Repräsentationsmandat"), "system questions: scoped mandate rule is missing");
  check(questionsText?.includes("verändert aber nicht automatisch meine persönliche Überzeugung auf Vote4Gov"), "system questions: personal belief separation is missing");
  check(!questionsText?.includes("VoiceOpenGov entscheidet seinen eigenen Programmstand"), "system questions: retired VOG own-program boundary remains");
  check(!questionsText?.includes("Ein eDebatte-Ergebnis bindet VoiceOpenGov aber nicht automatisch"), "system questions: retired nonbinding eDebatte doctrine remains");
  await questions.close();

  const systems = await openPage(desktop, "/systeme-laender.html");
  check(await systems.getByText("Was lässt sich aus anderen politischen Ordnungen lernen – und was nicht?", { exact: true }).isVisible(), "world comparison: personal analytical framing is missing");
  check((await systems.locator("body").textContent())?.includes("Vier Regeln für meinen Weltvergleich"), "world comparison: personal comparison method is missing");
  check((await systems.locator("body").textContent())?.includes("Regionale Community, Teams und politische Präsenz gehören zu VoiceOpenGov"), "world comparison: VoiceOpenGov territorial boundary is missing");
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
      if (path === "/") {
        const portraitWrap = page.locator(".home-portrait");
        const portraitOpacity = await portraitWrap.evaluate((element) => getComputedStyle(element).opacity);
        check(Number(portraitOpacity) >= 0.99, `${viewport.width}px campaign: author portrait reveal keeps the block visually hidden`);
        const portrait = page.locator(".home-portrait > img");
        check(await portrait.isVisible(), `${viewport.width}px campaign: author portrait is hidden`);
        const box = await portrait.boundingBox();
        check(Boolean(box && box.width >= 180 && box.height >= 350), `${viewport.width}px campaign: author portrait renders too small`);
        const signature = page.locator(".home-portrait .home-signature");
        check(await signature.isVisible(), `${viewport.width}px campaign: author signature is hidden`);
        const signatureBox = await signature.boundingBox();
        check(Boolean(signatureBox && signatureBox.x >= -1 && signatureBox.x + signatureBox.width <= viewport.width + 1), `${viewport.width}px campaign: author signature drifts outside viewport`);
        const authorCaption = page.locator(".home-portrait > p");
        check(await authorCaption.isVisible(), `${viewport.width}px campaign: author caption is hidden`);
        const captionBox = await authorCaption.boundingBox();
        check(Boolean(captionBox && captionBox.x >= -1 && captionBox.x + captionBox.width <= viewport.width + 1), `${viewport.width}px campaign: author caption drifts outside viewport`);
      }
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
  check((await noJsCampaign.locator("#hero-title").textContent())?.includes("Fragen, die"), "campaign no-JS: personal-system primary claim is missing");
  check(await noJsCampaign.locator(".home-portrait > img").isVisible(), "campaign no-JS: author portrait is hidden");
  check(await noJsCampaign.locator('.home-mission-flow').count() === 1, "campaign no-JS: static personal-view flow is missing");
  check(await noJsCampaign.locator('#ordnungsmodell').count() === 1, "campaign no-JS: personal order model is missing");
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

console.log("Browser regression passed: personal Vote4Gov role, independent eDebatte plus valid scoped VOG mandate boundary, mobile author portrait, falsifiable theses, world comparison boundary, atlas-free vision, desktop, mobile, 200% zoom and no-JS.");