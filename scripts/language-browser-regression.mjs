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
  await page.waitForSelector("[data-global-language-control] select", { state: "visible" });
  await page.waitForTimeout(350);
  check(runtimeErrors.length === 0, `${path}: runtime errors: ${runtimeErrors.join(" | ")}`);
  return page;
}

async function chooseLanguage(page, code) {
  await page.evaluate((language) => {
    const select = document.querySelector("[data-global-language-control] select");
    if (!(select instanceof HTMLSelectElement)) throw new Error("language selector missing");
    select.value = language;
    select.dispatchEvent(new Event("change", { bubbles: true }));
  }, code);
  await page.waitForFunction((language) => document.documentElement.dataset.readingLanguage === language, code);
  await page.waitForTimeout(120);
}

const browser = await chromium.launch({ headless: true });
try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const home = await openPage(context, "/");
  const selector = home.locator("[data-global-language-control] select");
  const languageControl = home.locator(".global-language-control");

  check(await selector.locator("option").count() === 12, "language selector must expose exactly 12 reviewed interface/preview locales");
  check(await languageControl.count() === 1 && await languageControl.isVisible(), "exactly one visible compact language selector is required");
  check((await languageControl.textContent())?.includes("Ausgabe 01"), "language selector must identify issue 01");
  check(await home.locator(".v4g-language-trigger").count() === 0, "duplicate language trigger is present");
  check(await home.evaluate(() => globalThis.Vote4GovConfig?.issue?.number) === "01", "canonical issue config is missing");
  check(await home.evaluate(() => globalThis.Vote4GovConfig?.language?.supported?.length) === 12, "canonical language config is incomplete");
  check(await home.evaluate(() => document.documentElement.lang) === "de", "source document language must remain German");
  check(await home.evaluate(() => document.documentElement.dataset.sourceLanguage) === "de", "source-language metadata is missing");
  check(await home.evaluate(() => document.documentElement.dataset.translationCoverage) === "interface-preview", "translation coverage must be limited and explicit");

  await chooseLanguage(home, "ar");
  check(await selector.inputValue() === "ar", "Arabic was not selected");
  check(await home.evaluate(() => document.documentElement.lang) === "de", "Arabic UI selection incorrectly relabelled the German source document");
  check(await home.evaluate(() => document.documentElement.dataset.translationReviewed) === "false", "automatic/non-reviewed locale must not be marked reviewed");
  check(await home.locator(".editorial-access-dialog").getAttribute("lang") === "ar", "access dialog language is not Arabic");
  check(await home.locator(".editorial-access-dialog").getAttribute("dir") === "rtl", "Arabic access dialog is not RTL");
  check(await home.locator(".editorial-privacy-sheet").getAttribute("dir") === "rtl", "Arabic privacy disclosure is not RTL");
  check((await home.locator('.cover-story [data-privacy-open]').textContent())?.includes("الخصوصية"), "Arabic privacy trigger was not localized");

  const accessTrigger = home.locator("[data-access-open]");
  await accessTrigger.click();
  const quickTabs = home.locator(".editorial-language-switch button[data-language]");
  check(await quickTabs.count() === 6, "quick language selector must expose six primary locales");
  const arabicTab = home.locator('.editorial-language-switch button[data-language="ar"]');
  check(await arabicTab.getAttribute("aria-selected") === "true", "Arabic quick tab is not selected");
  await arabicTab.focus();
  await home.keyboard.press("Home");
  check(await home.locator('.editorial-language-switch button[data-language="de"]').getAttribute("aria-selected") === "true", "Home did not select the first quick language");
  await home.keyboard.press("End");
  check(await arabicTab.getAttribute("aria-selected") === "true", "End did not select the last quick language");
  await home.keyboard.press("ArrowLeft");
  check(await home.locator('.editorial-language-switch button[data-language="tr"]').getAttribute("aria-selected") === "true", "ArrowLeft did not select the previous quick language");
  await home.keyboard.press("Escape");

  await chooseLanguage(home, "zh");
  check(await selector.inputValue() === "zh", "Chinese was not selected from the extended locale list");
  await accessTrigger.click();
  check((await home.locator("[data-preview-title]").textContent())?.includes("社会每天都在变化"), "Chinese preview was not rendered");
  check(await home.locator(".editorial-access-dialog").getAttribute("dir") === "ltr", "Chinese interface incorrectly inherited RTL");
  await home.keyboard.press("Escape");

  await chooseLanguage(home, "ar");
  await home.reload({ waitUntil: "networkidle" });
  await home.waitForSelector("[data-global-language-control] select", { state: "visible" });
  await home.waitForFunction(() => document.documentElement.dataset.readingLanguage === "ar");
  check(await home.locator("[data-global-language-control] select").inputValue() === "ar", "reading language did not persist within the browser session");
  check(await home.locator(".editorial-access-dialog").getAttribute("dir") === "rtl", "RTL state did not survive reload");

  await chooseLanguage(home, "de");
  check(await home.evaluate(() => document.documentElement.dataset.translationReviewed) === "true", "German source locale must be marked reviewed");
  check(await home.locator(".editorial-access-dialog").getAttribute("dir") === "ltr", "German restore did not clear RTL");

  const article = await openPage(context, "/journal/geschichte-der-demokratie.html");
  const sourceTitle = await article.locator("h1").textContent();
  await chooseLanguage(article, "en");
  check(await article.locator("h1").textContent() === sourceTitle, "interface language selection silently translated the full source article");
  check(await article.evaluate(() => document.documentElement.lang) === "de", "article source language was relabelled after interface switch");
  check(await article.evaluate(() => document.documentElement.dataset.translationCoverage) === "interface-preview", "article does not disclose limited translation coverage");

  await article.close();
  await home.close();
  await context.close();
} finally {
  await browser.close();
}

if (failures.length) {
  console.error("Language browser regression failed:\n");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Language browser regression passed: one visible selector, 12 locales, RTL, keyboard, persistence and source-language truth.");
