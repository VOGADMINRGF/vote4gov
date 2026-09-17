const loadStyle = (href) => {
  if (document.querySelector(`link[href^="${href}"]`)) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
};

const loadScript = (src) => {
  if (document.querySelector(`script[src^="${src}"]`)) return;
  const script = document.createElement("script");
  script.src = src;
  script.async = false;
  document.head.appendChild(script);
};

loadStyle("/image-tuning.css?v=20260801-1");
loadStyle("/accessibility.css?v=20260801-1");
loadStyle("/brand-shell.css?v=20260802-1");
loadStyle("/editorial-interruptions.css?v=20260802-2");
loadStyle("/ai-transparency.css?v=20260802-1");
loadStyle("/participation-pulse.css?v=20260802-1");
loadStyle("/storage-transparency.css?v=20260802-1");
loadStyle("/global-language.css?v=20260804-1");
window.VOTE4GOV_PRIVACY_MODE = true;

const loadSharedReviewRuntime = () => {
  loadScript("/editorial-interruptions.js?v=20260917-1");
  loadScript("/site-config.js?v=20260917-1");
  loadScript("/ai-transparency.js?v=20260804-2");
  loadScript("/vote4gov-handoff.js?v=20260803-1");
  loadScript("/participation-pulse.js?v=20260804-2");
  loadScript("/storage-transparency.js?v=20260802-1");
};

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", loadSharedReviewRuntime, { once: true });
else loadSharedReviewRuntime();

const canonicalHrefRewrites = new Map([
  ["https://compdemocracy.org/Polis/", "https://compdemocracy.org/polis/"],
  ["https://www.bsi.bund.de/DE/Themen/Oeffentliche-Verwaltung/Moderner-Staat/Online-Wahlen/online-wahlen_node.html", "https://www.bsi.bund.de/EN/Themen/Oeffentliche-Verwaltung/Moderner-Staat/Online-Wahlen/online-wahlen.html"],
]);
document.querySelectorAll("a[href]").forEach((link) => {
  const replacement = canonicalHrefRewrites.get(link.href);
  if (replacement) link.href = replacement;
});

const year = document.querySelector("[data-year]");
if (year) year.textContent = String(new Date().getFullYear());

document.querySelectorAll(".journal-nav").forEach((journalNav, index) => {
  const links = journalNav.querySelector(".journal-nav-inner");
  if (!links || journalNav.querySelector("[data-journal-menu-button]")) return;
  const linksId = links.id || `journal-navigation-${index + 1}`;
  links.id = linksId;
  const button = document.createElement("button");
  button.type = "button";
  button.className = "journal-menu-button";
  button.dataset.journalMenuButton = "";
  button.setAttribute("aria-controls", linksId);
  button.setAttribute("aria-expanded", "false");
  button.innerHTML = '<span>Ressorts</span><span aria-hidden="true">☰</span>';
  links.before(button);
  journalNav.classList.add("journal-nav-enhanced");

  const close = () => {
    button.setAttribute("aria-expanded", "false");
    links.classList.remove("is-open");
  };
  button.addEventListener("click", () => {
    const open = button.getAttribute("aria-expanded") !== "true";
    button.setAttribute("aria-expanded", String(open));
    links.classList.toggle("is-open", open);
  });
  links.querySelectorAll("a").forEach((link) => link.addEventListener("click", close));
  window.addEventListener("keydown", (event) => { if (event.key === "Escape") close(); });
});

document.querySelectorAll(".article-page .article-meta").forEach((meta) => {
  if (meta.querySelector("[data-ai-role]")) return;
  const disclosure = document.createElement("a");
  disclosure.href = "/quellen.html#ki-transparenz";
  disclosure.dataset.aiRole = "";
  disclosure.className = "article-ai-role";
  disclosure.textContent = "KI-Rolle: Rechercheunterstützung · Struktur · Sprachfassung";
  disclosure.setAttribute("aria-label", "KI-Transparenz: Rechercheunterstützung, Struktur und Sprachfassung. Verfahren öffnen.");
  meta.appendChild(disclosure);
});
