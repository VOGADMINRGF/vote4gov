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
  await page.waitForTimeout(700);
  check(runtimeErrors.length === 0, `${path}: runtime errors: ${runtimeErrors.join(" | ")}`);
  return page;
}

async function dismissStorageNotice(page) {
  const banner = page.locator(".storage-transparency-banner");
  if (!(await banner.isVisible())) return;
  await banner.locator("[data-storage-understood]").check();
  await banner.locator("[data-storage-dismiss]").click();
  check(!(await banner.isVisible()), "storage notice could not be dismissed");
}

async function checkAtlasFree(page, label) {
  check(await page.locator("#welt").count() === 0, `${label}: retired Atlas section exists`);
  check(await page.locator('[href="#welt"]').count() === 0, `${label}: retired Atlas anchor exists`);
  check(await page.locator("[data-atlas],[data-atlas-country],[data-atlas-panel],[data-atlas-tab],[data-atlas-globe]").count() === 0, `${label}: retired Atlas runtime markers exist`);
  check(await page.getByText("Weltatlas", { exact: true }).count() === 0, `${label}: retired Weltatlas label is visible`);
}

async function checkSingleVisibleLanguageControl(page, label) {
  const controls = page.locator(".global-language-control");
  const visibleControls = page.locator('.global-language-control[data-language-ui="canonical"]:visible');
  check(await visibleControls.count() === 1, `${label}: exactly one visible canonical language selector is required`);
  check(await page.locator(".v4g-language-trigger:visible").count() === 0, `${label}: duplicate language trigger is visible`);
  check(await controls.locator("select:visible").count() === 1, `${label}: exactly one visible language select is required`);
  if (await visibleControls.count() === 1) {
    check((await visibleControls.textContent())?.includes("Ausgabe 01"), `${label}: language selector does not identify issue 01`);
  }
}

const browser = await chromium.launch({ headless: true });
try {
  const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  const home = await openPage(desktop, "/");

  check(await home.locator(".cover-main h1").isVisible(), "desktop: hero is not visible");
  check(await home.getByText("Ausgabe 01", { exact: true }).count() >= 1, "desktop: issue 01 is missing");
  check(await home.getByText("Ausgabe 02", { exact: false }).count() === 0, "desktop: issue 02 is visible");
  check(await home.getByText("International vergleichend", { exact: true }).count() === 1, "desktop: international comparison label is missing");
  check(await home.locator('.cover-story a[href="/journal/geschichte-der-demokratie.html"]').count() >= 1, "desktop: hero does not link to democracy history");
  await checkAtlasFree(home, "desktop");
  await checkSingleVisibleLanguageControl(home, "desktop");

  check(!(await home.locator(".editorial-access-dialog").evaluate((dialog) => dialog.open)), "desktop: access dialog opened automatically");
  check(await home.locator(".editorial-privacy-sheet").getAttribute("hidden") !== null, "desktop: privacy disclosure opened automatically");
  check(await home.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches), "desktop: reduced motion is not active");

  await dismissStorageNotice(home);

  const accessTrigger = home.locator("[data-access-open]");
  const privacyTrigger = home.locator('.cover-story [data-privacy-open]');
  check(await accessTrigger.isVisible(), "desktop: access trigger is missing");
  check(await privacyTrigger.isVisible(), "desktop: privacy trigger is missing");

  await accessTrigger.click();
  check(await home.locator(".editorial-access-dialog").evaluate((dialog) => dialog.open), "desktop: access trigger did not open dialog");
  check(await home.locator("[data-access-free]").isVisible(), "desktop: free-access action is missing");
  await home.keyboard.press("Escape");
  check(!(await home.locator(".editorial-access-dialog").evaluate((dialog) => dialog.open)), "desktop: Escape did not close access dialog");
  check(await accessTrigger.evaluate((element) => element === document.activeElement), "desktop: access dialog did not restore focus");
  check(await home.locator(".editorial-privacy-sheet").getAttribute("hidden") !== null, "desktop: closing access opened privacy automatically");

  await privacyTrigger.click();
  check(await home.locator(".editorial-privacy-sheet").isVisible(), "desktop: privacy trigger did not open disclosure");
  await home.keyboard.press("Escape");
  check(!(await home.locator(".editorial-privacy-sheet").isVisible()), "desktop: Escape did not close privacy disclosure");
  check(await privacyTrigger.evaluate((element) => element === document.activeElement), "desktop: privacy disclosure did not restore focus");

  for (const topicId of ["free-knowledge-access", "tracking-explicit-consent"]) {
    const widget = home.locator(`[data-participation-pulse="${topicId}"]`);
    check(await widget.count() === 1, `desktop: ${topicId} pulse is missing`);
    check(await widget.locator('a[href*="/create"]').count() === 0, `desktop: ${topicId} exposes /create`);
    check(await widget.locator('[data-pulse-action="edebate"][aria-disabled="true"]').count() === 1, `desktop: ${topicId} does not fail closed`);
  }

  await home.setViewportSize({ width: 720, height: 450 });
  check(await home.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1), "desktop 200% zoom: horizontal overflow");
  await home.close();

  const article = await openPage(desktop, "/journal/geschichte-der-demokratie.html");
  check(await article.locator('.edebatte-handoff[data-handoff-state="preparing"]').count() === 1, "article: fail-closed handoff state is missing");
  check(await article.getByText("Der Themenkontext bei eDebatte wird vorbereitet.", { exact: true }).count() >= 1, "article: preparing copy is missing");
  check(await article.locator('a[href*="/create"],a[href*="context_bundle"],a[href*="source_url"]').count() === 0, "article: forbidden primary handoff is active");

  const resolution = await article.evaluate(() => globalThis.Vote4GovHandoff.getArticleHandoff({ articleId: "history-democracy", locale: "de" }));
  check(resolution.ok === false && resolution.status === "preparing", "article: incomplete release did not fail closed");
  check(resolution.missing.includes("topicSlug") && resolution.missing.includes("sourceUrl"), "article: missing routing values are not reported");
  check(resolution.missing.includes("binaryQuestionId") && resolution.missing.includes("openQuestionId"), "article: missing question IDs are not reported");

  const questionKinds = await article.evaluate(() => globalThis.Vote4GovHandoff.ARTICLE_RELEASES["history-democracy"].questions.map((question) => question.kind));
  check(questionKinds.join(",") === "binary_thesis,open_question", "article: question contracts are not separated");

  const agree = article.locator('[data-participation-pulse="history-democracy"] [data-pulse-action="agree"]');
  await agree.click();
  const localBefore = await article.evaluate(() => sessionStorage.getItem("vote4gov:participation-pulse:v1"));
  check(Boolean(localBefore?.includes("history-democracy")), "article: local reservation was not stored");
  await article.evaluate(() => {
    const link = document.createElement("a");
    link.href = "https://www.edebatte.org/";
    link.target = "_blank";
    document.body.appendChild(link);
    link.addEventListener("click", (event) => event.preventDefault());
    link.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    link.remove();
  });
  const localAfter = await article.evaluate(() => sessionStorage.getItem("vote4gov:participation-pulse:v1"));
  check(localAfter === localBefore, "article: opening eDebatte deleted local reservation");
  await agree.click();
  await article.setViewportSize({ width: 720, height: 450 });
  check(await article.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1), "article 200% zoom: horizontal overflow");
  await article.close();
  await desktop.close();

  for (const viewport of [{ width: 390, height: 844 }, { width: 320, height: 700 }]) {
    const mobile = await browser.newContext({ viewport, screen: viewport, hasTouch: true, reducedMotion: "reduce" });
    const page = await openPage(mobile, "/");
    check(await page.locator(".cover-main h1").isVisible(), `${viewport.width}px: hero is not visible`);
    check(!(await page.locator(".editorial-access-dialog").evaluate((dialog) => dialog.open)), `${viewport.width}px: access dialog opened automatically`);
    check(await page.locator(".editorial-privacy-sheet").getAttribute("hidden") !== null, `${viewport.width}px: privacy disclosure opened automatically`);
    await checkAtlasFree(page, `${viewport.width}px`);
    await checkSingleVisibleLanguageControl(page, `${viewport.width}px`);
    await dismissStorageNotice(page);

    const mobilePrivacyTrigger = page.locator('.cover-story [data-privacy-open]');
    await mobilePrivacyTrigger.tap();
    check(await page.locator(".editorial-privacy-sheet").isVisible(), `${viewport.width}px: privacy disclosure did not open`);
    await page.keyboard.press("Escape");
    check(!(await page.locator(".editorial-privacy-sheet").isVisible()), `${viewport.width}px: privacy disclosure did not close`);
    check(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1), `${viewport.width}px: horizontal overflow`);
    await mobile.close();
  }

  const noJs = await browser.newContext({ viewport: { width: 390, height: 844 }, javaScriptEnabled: false });
  const noJsPage = await openPage(noJs, "/");
  check(await noJsPage.locator(".cover-main h1").isVisible(), "no-JS: hero is not readable");
  check(await noJsPage.getByText("Ausgabe 01", { exact: true }).count() >= 1, "no-JS: issue 01 is missing");
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

console.log("Browser regression passed: atlas-free issue 01, one visible language selector, desktop, mobile, keyboard, privacy, participation, reduced motion, 200% zoom and no-JS.");
