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
  await page.waitForTimeout(650);
  check(runtimeErrors.length === 0, `${path}: runtime errors: ${runtimeErrors.join(" | ")}`);
  return page;
}

async function dismissStorageNotice(page) {
  const banner = page.locator(".storage-transparency-banner");
  if (!(await banner.isVisible())) return;
  await banner.locator("[data-storage-understood]").check();
  await banner.locator("[data-storage-dismiss]").click();
  check(!(await banner.isVisible()), "storage notice could not be dismissed through its explicit local action");
}

async function checkAtlasFree(page, label) {
  check(await page.locator("#welt").count() === 0, `${label}: retired Atlas section is still present`);
  check(await page.locator('[href="#welt"]').count() === 0, `${label}: retired Atlas anchor is still linked`);
  check(await page.locator("[data-atlas],[data-atlas-country],[data-atlas-panel],[data-atlas-tab],[data-atlas-globe]").count() === 0, `${label}: retired Atlas runtime markers are still present`);
  check(await page.getByText("Weltatlas", { exact: true }).count() === 0, `${label}: retired Weltatlas label is still visible`);
}

const browser = await chromium.launch({ headless: true });
try {
  const desktop = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  const home = await openPage(desktop, "/");

  check(await home.locator(".cover-main h1").isVisible(), "desktop: hero is not immediately visible");
  check(await home.locator(".journal-topline").getByText("Ausgabe 01", { exact: true }).count() === 1, "desktop: issue 01 is not canonical in the source UI");
  check(await home.getByText("Ausgabe 02", { exact: false }).count() === 0, "desktop: stale issue 02 copy is visible");
  check(await home.locator(".journal-topline").getByText("International vergleichend", { exact: true }).count() === 1, "desktop: international-comparison scope is missing");
  check(await home.locator('.cover-story a[href="/journal/geschichte-der-demokratie.html"]').count() >= 1, "desktop: primary hero route does not open the democracy-history article");
  await checkAtlasFree(home, "desktop");

  check(!(await home.locator(".editorial-access-dialog").evaluate((dialog) => dialog.open)), "desktop: access dialog opened automatically");
  check(await home.locator(".editorial-privacy-sheet").getAttribute("hidden") !== null, "desktop: privacy disclosure opened automatically");
  check(await home.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches), "desktop: reduced-motion preference was not active");

  const compactLanguage = home.locator(".v4g-language-trigger");
  check(await compactLanguage.count() === 1, "desktop: exactly one compact language trigger is required");
  check(!(await home.locator(".global-language-control").isVisible()), "desktop: duplicate legacy language selector is still visible");
  if (await compactLanguage.count()) {
    check(await compactLanguage.isVisible(), "desktop: compact language trigger is not visible");
    check((await compactLanguage.textContent())?.includes("01"), "desktop: language trigger does not identify issue 01");
  }

  await dismissStorageNotice(home);

  const trigger = home.locator("[data-access-open]");
  const privacyTrigger = home.locator('.cover-story [data-privacy-open]');
  check(await trigger.isVisible(), "desktop: deliberate access trigger is missing");
  check(await privacyTrigger.isVisible(), "desktop: deliberate privacy trigger is missing");
  await trigger.click();
  check(await home.locator(".editorial-access-dialog").evaluate((dialog) => dialog.open), "desktop: deliberate action did not open the access dialog");
  check(await home.locator("[data-access-free]").isVisible(), "desktop: equal free-access action is missing");
  await home.keyboard.press("Escape");
  check(!(await home.locator(".editorial-access-dialog").evaluate((dialog) => dialog.open)), "keyboard: Escape did not close the access dialog");
  check(await home.locator(".editorial-privacy-sheet").getAttribute("hidden") !== null, "keyboard: closing access opened a follow-up privacy overlay");
  check(await trigger.evaluate((element) => element === document.activeElement), "keyboard: dialog close did not restore focus to its trigger");

  await trigger.click();
  await home.locator("[data-access-free]").click();
  await home.locator("[data-access-continue]").click();
  await home.waitForTimeout(250);
  check(!(await home.locator(".editorial-access-dialog").evaluate((dialog) => dialog.open)), "desktop: complete access action did not close the dialog");
  check(await home.locator(".editorial-privacy-sheet").getAttribute("hidden") !== null, "desktop: complete access action opened a forced privacy overlay");

  await privacyTrigger.click();
  check(await home.locator(".editorial-privacy-sheet").isVisible(), "desktop: deliberate privacy action did not open the disclosure");
  check(await privacyTrigger.getAttribute("aria-expanded") === "true", "desktop: privacy trigger did not expose expanded state");
  check(await home.locator(".editorial-privacy-sheet [data-privacy-close]").first().evaluate((element) => element === document.activeElement), "desktop: privacy disclosure did not receive focus");
  await home.keyboard.press("Escape");
  check(!(await home.locator(".editorial-privacy-sheet").isVisible()), "keyboard: Escape did not close the privacy disclosure");
  check(await privacyTrigger.getAttribute("aria-expanded") === "false", "keyboard: privacy trigger remained expanded after close");
  check(await privacyTrigger.evaluate((element) => element === document.activeElement), "keyboard: privacy close did not restore focus");

  for (const topicId of ["free-knowledge-access", "tracking-explicit-consent"]) {
    const widget = home.locator(`[data-participation-pulse="${topicId}"]`);
    check(await widget.count() === 1, `desktop: ${topicId} pulse is missing`);
    check(await widget.locator('a[href*="/create"]').count() === 0, `desktop: ${topicId} exposes an unregistered /create handoff`);
    check(await widget.locator('[data-pulse-action="edebate"][aria-disabled="true"]').count() === 1, `desktop: ${topicId} does not fail closed`);
  }

  await home.setViewportSize({ width: 720, height: 450 });
  check(await home.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1), "200% zoom: homepage has horizontal overflow");
  await home.close();

  const article = await openPage(desktop, "/journal/geschichte-der-demokratie.html");
  check(await article.locator('.edebatte-handoff[data-handoff-state="preparing"]').count() === 1, "article: missing fail-closed handoff state");
  check(await article.getByText("Der Themenkontext bei eDebatte wird vorbereitet.", { exact: true }).count() >= 1, "article: honest preparing copy is missing");
  check(await article.locator('a[href*="/create"], a[href*="context_bundle"], a[href*="source_url"]').count() === 0, "article: a forbidden primary handoff is active");
  const resolution = await article.evaluate(() => globalThis.Vote4GovHandoff.getArticleHandoff({ articleId: "history-democracy", locale: "de" }));
  check(resolution.ok === false && resolution.status === "preparing", "article: incomplete release did not fail closed");
  check(resolution.missing.includes("topicSlug") && resolution.missing.includes("sourceUrl"), "article: fail-closed state does not report unconfirmed routing values");
  check(resolution.missing.includes("binaryQuestionId") && resolution.missing.includes("openQuestionId"), "article: fail-closed state does not report both question IDs");
  const questionKinds = await article.evaluate(() => globalThis.Vote4GovHandoff.ARTICLE_RELEASES["history-democracy"].questions.map((question) => question.kind));
  check(questionKinds.join(",") === "binary_thesis,open_question", "article: binary and open question contracts are not separate");

  await article.locator('[data-participation-pulse="history-democracy"] [data-pulse-action="agree"]').click();
  const localBefore = await article.evaluate(() => sessionStorage.getItem("vote4gov:participation-pulse:v1"));
  check(Boolean(localBefore?.includes("history-democracy")), "article: local reservation was not persisted");
  await article.evaluate(() => {
    const link = document.createElement("a");
    link.href = "https://www.edebatte.org/";
    link.target = "_blank";
    link.textContent = "eDebatte";
    document.body.appendChild(link);
    link.addEventListener("click", (event) => event.preventDefault());
    link.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    link.remove();
  });
  const localAfter = await article.evaluate(() => sessionStorage.getItem("vote4gov:participation-pulse:v1"));
  check(localAfter === localBefore, "article: opening an eDebatte link deleted the local reservation");
  await article.locator('[data-participation-pulse="history-democracy"] [data-pulse-action="agree"]').click();
  await article.setViewportSize({ width: 720, height: 450 });
  check(await article.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1), "200% zoom: article has horizontal overflow");
  await article.close();
  await desktop.close();

  for (const viewport of [{ width: 390, height: 844 }, { width: 320, height: 700 }]) {
    const mobile = await browser.newContext({ viewport, screen: viewport, hasTouch: true, reducedMotion: "reduce" });
    const page = await openPage(mobile, "/");
    check(await page.locator(".cover-main h1").isVisible(), `${viewport.width}px: hero is not immediately visible`);
    check(!(await page.locator(".editorial-access-dialog").evaluate((dialog) => dialog.open)), `${viewport.width}px: access dialog opened automatically`);
    check(await page.locator(".editorial-privacy-sheet").getAttribute("hidden") !== null, `${viewport.width}px: privacy disclosure opened automatically`);
    await checkAtlasFree(page, `${viewport.width}px`);
    check(await page.locator(".v4g-language-trigger").count() === 1, `${viewport.width}px: compact language trigger is missing or duplicated`);
    await dismissStorageNotice(page);
    const mobilePrivacyTrigger = page.locator('.cover-story [data-privacy-open]');
    await mobilePrivacyTrigger.tap();
    check(await page.locator(".editorial-privacy-sheet").isVisible(), `${viewport.width}px: privacy disclosure did not open deliberately`);
    await page.keyboard.press("Escape");
    check(!(await page.locator(".editorial-privacy-sheet").isVisible()), `${viewport.width}px: privacy disclosure did not close by Escape`);
    check(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1), `${viewport.width}px: homepage has horizontal overflow`);
    await mobile.close();
  }

  const noJs = await browser.newContext({ viewport: { width: 390, height: 844 }, javaScriptEnabled: false });
  const noJsPage = await openPage(noJs, "/");
  check(await noJsPage.locator(".cover-main h1").isVisible(), "no-JS: hero is not readable");
  check(await noJsPage.getByText("Ausgabe 01", { exact: true }).count() >= 1, "no-JS: issue 01 is not present in static HTML");
  await checkAtlasFree(noJsPage, "no-JS");
  await noJs.close();
} finally {
  await browser.close();
}

if (failures.length) {
  console.error("Browser regression failed:\n");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Browser regression passed: atlas-free issue 01, desktop, mobile, keyboard, privacy, participation, reduced motion, 200% zoom and no-JS.");
