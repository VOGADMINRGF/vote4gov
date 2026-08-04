import { mkdir } from "node:fs/promises";
import process from "node:process";

const playwrightModule = process.env.PLAYWRIGHT_MODULE || "playwright";
const { chromium } = await import(playwrightModule);
const baseUrl = process.env.VOTE4GOV_BASE_URL || "http://127.0.0.1:4173";
const outputDir = process.env.VOTE4GOV_VISUAL_DIR || "artifacts/visual-evidence";

await mkdir(outputDir, { recursive: true });

async function dismissStorageNotice(page) {
  const banner = page.locator(".storage-transparency-banner");
  if (!(await banner.isVisible())) return;
  await banner.locator("[data-storage-understood]").check();
  await banner.locator("[data-storage-dismiss]").click();
}

async function prepare(page, path = "/") {
  await page.goto(`${baseUrl}${path}`, { waitUntil: "networkidle" });
  await page.waitForSelector("[data-global-language-control] select", { state: "visible" });
  await dismissStorageNotice(page);
  await page.waitForTimeout(200);
}

const browser = await chromium.launch({ headless: true });
try {
  const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  const home = await desktop.newPage();
  await prepare(home);
  await home.screenshot({ path: `${outputDir}/01-home-desktop.png`, fullPage: true });

  await home.locator("[data-access-open]").click();
  await home.locator(".editorial-access-dialog").screenshot({ path: `${outputDir}/02-access-dialog-de.png` });
  await home.keyboard.press("Escape");

  await home.locator("[data-global-language-control] select").selectOption("ar");
  await home.waitForFunction(() => document.documentElement.dataset.readingLanguage === "ar");
  await home.locator("[data-access-open]").click();
  await home.locator(".editorial-access-dialog").screenshot({ path: `${outputDir}/03-access-dialog-ar-rtl.png` });
  await home.keyboard.press("Escape");

  await home.locator('.cover-story [data-privacy-open]').click();
  await home.locator(".editorial-privacy-sheet").screenshot({ path: `${outputDir}/04-privacy-ar-rtl.png` });
  await home.keyboard.press("Escape");

  const article = await desktop.newPage();
  await prepare(article, "/journal/geschichte-der-demokratie.html");
  await article.screenshot({ path: `${outputDir}/05-article-desktop.png`, fullPage: true });
  await article.close();
  await home.close();
  await desktop.close();

  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, screen: { width: 390, height: 844 }, hasTouch: true, reducedMotion: "reduce" });
  const mobileHome = await mobile.newPage();
  await prepare(mobileHome);
  await mobileHome.screenshot({ path: `${outputDir}/06-home-mobile.png`, fullPage: true });
  await mobileHome.locator("[data-access-open]").tap();
  await mobileHome.locator(".editorial-access-dialog").screenshot({ path: `${outputDir}/07-access-dialog-mobile.png` });
  await mobileHome.close();
  await mobile.close();
} finally {
  await browser.close();
}

console.log(`Visual evidence written to ${outputDir}`);
