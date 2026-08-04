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
  await page.waitForTimeout(450);
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

const browser = await chromium.launch({ headless: true });
try {
  const desktop = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  const home = await openPage(desktop, "/");

  check(await home.locator(".cover-main h1").isVisible(), "desktop: hero is not immediately visible");
  check(!(await home.locator(".editorial-access-dialog").evaluate((dialog) => dialog.open)), "desktop: access dialog opened automatically");
  check(await home.locator(".editorial-privacy-sheet").getAttribute("hidden") !== null, "desktop: privacy disclosure opened automatically");
  check(await home.locator("#welt").isVisible(), "desktop: Atlas is hidden in JavaScript mode");
  check(await home.locator('a[href="#welt"]').count() >= 3, "desktop: Atlas links disappeared from navigation or footer");
  check(await home.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches), "desktop: reduced-motion preference was not active");
  await dismissStorageNotice(home);

  const globeTargets = home.locator("[data-atlas-globe]");
  check(await globeTargets.count() === 4, "desktop: Atlas does not expose four globe controls");
  const targetBoxes = [];
  for (let index = 0; index < await globeTargets.count(); index += 1) {
    const box = await globeTargets.nth(index).boundingBox();
    check(Boolean(box && box.width >= 48 && box.height >= 48), `desktop: globe target ${index + 1} is smaller than 48px`);
    if (box) targetBoxes.push(box);
  }
  for (let left = 0; left < targetBoxes.length; left += 1) {
    for (let right = left + 1; right < targetBoxes.length; right += 1) {
      const a = targetBoxes[left];
      const b = targetBoxes[right];
      const overlaps = a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
      check(!overlaps, `desktop: globe targets ${left + 1} and ${right + 1} overlap`);
    }
  }

  await home.locator("#welt").scrollIntoViewIfNeeded();
  for (const code of ["de", "ch", "ee", "fr"]) {
    const scrollBefore = await home.evaluate(() => scrollY);
    await home.locator(`[data-atlas-globe][data-atlas-country="${code}"]`).click();
    check(await home.locator(`[data-atlas-globe][data-atlas-country="${code}"]`).getAttribute("aria-pressed") === "true", `desktop mouse: ${code.toUpperCase()} was not pressed`);
    check(await home.locator(`[data-atlas-tab][data-atlas-country="${code}"]`).getAttribute("aria-selected") === "true", `desktop mouse: ${code.toUpperCase()} tab was not selected`);
    check(await home.locator(`[data-atlas-panel="${code}"]`).isVisible(), `desktop mouse: ${code.toUpperCase()} panel is hidden`);
    check(await home.evaluate(() => scrollY) === scrollBefore, `desktop mouse: ${code.toUpperCase()} selection forced scrolling`);
  }

  const firstTab = home.locator('[data-atlas-tab][data-atlas-country="de"]');
  await firstTab.focus();
  await home.keyboard.press("ArrowRight");
  check(await home.locator('[data-atlas-tab][data-atlas-country="ch"]').getAttribute("aria-selected") === "true", "keyboard: ArrowRight did not select CH");
  check(await home.locator('[data-atlas-tab][data-atlas-country="ch"]').evaluate((element) => element === document.activeElement), "keyboard: focus did not follow the selected Atlas tab");
  await home.keyboard.press("End");
  check(await home.locator('[data-atlas-tab][data-atlas-country="fr"]').getAttribute("aria-selected") === "true", "keyboard: End did not select FR");
  await home.keyboard.press("Home");
  check(await firstTab.getAttribute("aria-selected") === "true", "keyboard: Home did not select DE");

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
    check(await page.locator("#welt").isVisible(), `${viewport.width}px: Atlas is hidden`);
    await dismissStorageNotice(page);
    await page.locator("#welt").scrollIntoViewIfNeeded();
    const tabs = page.locator("[data-atlas-tab]");
    check(await tabs.count() === 4, `${viewport.width}px: mobile tab alternative is incomplete`);
    for (let index = 0; index < await tabs.count(); index += 1) {
      const box = await tabs.nth(index).boundingBox();
      check(Boolean(box && box.height >= 44), `${viewport.width}px: mobile Atlas tab ${index + 1} is smaller than 44px`);
    }
    for (const code of ["de", "ch", "ee", "fr"]) {
      await page.locator(`[data-atlas-tab][data-atlas-country="${code}"]`).tap();
      check(await page.locator(`[data-atlas-tab][data-atlas-country="${code}"]`).getAttribute("aria-selected") === "true", `${viewport.width}px touch: ${code.toUpperCase()} was not selected`);
      check(await page.locator(`[data-atlas-panel="${code}"]`).isVisible(), `${viewport.width}px touch: ${code.toUpperCase()} panel is hidden`);
    }
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
  for (const code of ["de", "ch", "ee", "fr"]) {
    check(await noJsPage.locator(`[data-atlas-panel="${code}"]`).isVisible(), `no-JS: ${code.toUpperCase()} profile is not readable`);
  }
  await noJs.close();
} finally {
  await browser.close();
}

if (failures.length) {
  console.error("Browser regression failed:\n");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Browser regression passed: desktop, mobile, touch, keyboard, deliberate privacy, reduced motion, 200% zoom and no-JS.");
