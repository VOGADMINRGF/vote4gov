import process from "node:process";

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const baseUrl = process.env.VOTE4GOV_BASE_URL || "http://127.0.0.1:4173";
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };

const browser = await chromium.launch({ headless: true });
try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });

  const home = await context.newPage();
  await home.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
  await home.waitForTimeout(500);
  const homeLanguage = home.locator('.global-language-control[data-language-ui="canonical"]:visible');
  check(await homeLanguage.count() === 1, "homepage must expose exactly one shared canonical language control");
  check(await home.locator('script[src*="i18n.js"],link[href*="i18n.css"]').count() === 0, "homepage still loads retired i18n assets");
  check(await home.locator('a[href="#mission"]').count() >= 1, "homepage static mission anchor is missing");
  check(await home.locator('[data-mission-flow]').count() === 1, "homepage static mission flow is missing");
  check(await home.locator('[data-accountability-commitments]').count() === 1, "homepage static commitments are missing");
  if (await homeLanguage.count() === 1) {
    const select = homeLanguage.locator("select");
    await select.selectOption("en");
    const stored = await home.evaluate(() => sessionStorage.getItem("vote4gov:language:v1"));
    check(stored === "en", "homepage shared language control does not persist to the canonical session key");
  }
  await home.close();

  const vision = await context.newPage();
  await vision.goto(`${baseUrl}/vision.html`, { waitUntil: "networkidle" });
  await vision.waitForTimeout(700);
  check(await vision.locator(".v3-global-nav").count() === 1, "Vision global navigation must exist statically");
  check(await vision.locator(".v3-trust-strip").count() === 1, "Vision trust strip must exist statically");
  check(await vision.locator(".v3-section-state").count() >= 7, "Vision semantic section labels are incomplete");
  check((await vision.locator("[data-issue-version]").textContent())?.includes("1.0"), "Vision version is not populated from site-config");
  check((await vision.locator("[data-issue-updated]").textContent())?.includes("17.09.2026"), "Vision editorial date is not populated from site-config");

  const loaded = await vision.evaluate(() => performance.getEntriesByType("resource").map((entry) => entry.name));
  check(!loaded.some((url) => url.includes("vision-v3.js")), "Vision still loads retired DOM-injection JavaScript");

  const layers = vision.locator(".information-layers article");
  check(await layers.count() === 7, "media information chain must contain seven layers");
  const positions = await layers.evaluateAll((nodes) => nodes.map((node) => node.getBoundingClientRect().top));
  check(positions.every((top, index) => index === 0 || top > positions[index - 1]), "desktop media information layers must read as a vertical sequence");
  check(await vision.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1), "Vision has horizontal overflow after finalization");
  await vision.close();

  await context.close();
} finally {
  await browser.close();
}

if (failures.length) {
  console.error("Static truth browser validation failed:\n");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("Static truth browser validation passed: shared language state, static landing/Vision architecture, centralized version metadata and vertical media flow.");
