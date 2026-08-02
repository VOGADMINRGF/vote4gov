const loadStyle = (href) => {
  if (document.querySelector(`link[href^="${href}"]`)) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
};

loadStyle("/image-tuning.css?v=20260801-1");
loadStyle("/accessibility.css?v=20260801-1");
loadStyle("/brand-shell.css?v=20260802-1");
loadStyle("/participation-rooms.css?v=20260802-1");
loadStyle("/qr-handoff.css?v=20260802-1");

const brand = document.querySelector(".site-header .brand");
if (brand) {
  brand.classList.add("ecosystem-brand");
  brand.setAttribute("aria-label", "Vote4Gov Startseite");
  brand.innerHTML = `
    <picture>
      <source media="(prefers-color-scheme: light)" srcset="/assets/brand/vote4gov-logo-light.svg" />
      <img src="/assets/brand/vote4gov-logo-dark.svg" alt="Vote4Gov – Weiterdenken" width="420" height="96" />
    </picture>
  `;
}

const canonicalHrefRewrites = new Map([
  ["https://compdemocracy.org/Polis/", "https://compdemocracy.org/polis/"],
  ["https://www.bsi.bund.de/DE/Themen/Oeffentliche-Verwaltung/Moderner-Staat/Online-Wahlen/online-wahlen_node.html", "https://www.bsi.bund.de/EN/Themen/Oeffentliche-Verwaltung/Moderner-Staat/Online-Wahlen/online-wahlen.html"],
]);
document.querySelectorAll("a[href]").forEach((link) => {
  const replacement = canonicalHrefRewrites.get(link.href);
  if (replacement) link.href = replacement;
});

const atlasProfiles = {
  de: {
    title: "Deutschland",
    intro: "Das Profil untersucht nicht nur Wahlen, sondern auch die Wege zwischen kommunaler Betroffenheit, föderaler Zuständigkeit und europäischer Mitwirkung.",
    question: "Wie greifen Bund, Länder, Kommunen und europäische Zuständigkeiten ineinander – und wo kann Beteiligung verständlicher werden?",
    focus: "politische Ebenen und Rückkopplung",
    language: "Originalquellen plus mehrsprachige Lesefassung",
  },
  ch: {
    title: "Schweiz",
    intro: "Das Profil fragt, wie repräsentative Institutionen, föderale Ebenen und direktdemokratische Instrumente im politischen Alltag zusammenspielen.",
    question: "Welche Voraussetzungen machen wiederkehrende Abstimmungen verständlich, zugänglich und institutionell wirksam?",
    focus: "Zusammenspiel von Repräsentation und direkter Mitwirkung",
    language: "mehrsprachige Begriffe im jeweiligen Rechtskontext",
  },
  ee: {
    title: "Estland",
    intro: "Das Profil betrachtet die Verbindung von digitaler Staatlichkeit, Identität, Vertrauen, öffentlicher Infrastruktur und demokratischer Kontrolle.",
    question: "Welche technischen und institutionellen Grundlagen braucht digitale Beteiligung, damit Bequemlichkeit nicht auf Kosten von Vertrauen geht?",
    focus: "digitale Voraussetzungen und öffentliche Kontrolle",
    language: "Originalquellen, Übersetzungsstatus und Begriffserklärung",
  },
  fr: {
    title: "Frankreich",
    intro: "Das Profil untersucht das Verhältnis von nationaler Steuerung, regionalen Ebenen, politischer Repräsentation und zusätzlicher Bürgerbeteiligung.",
    question: "Wie können nationale Entscheidungsfähigkeit und regionale Rückkopplung verbunden werden, ohne Zuständigkeiten zu verwischen?",
    focus: "Zentralität, Regionen und Beteiligungswege",
    language: "lokale Fachbegriffe plus verständliche Lesefassung",
  },
};

const atlasButtons = document.querySelectorAll("[data-atlas-country]");
const atlasTitle = document.querySelector("[data-atlas-title]");
const atlasIntro = document.querySelector("[data-atlas-intro]");
const atlasQuestion = document.querySelector("[data-atlas-question]");
const atlasFocus = document.querySelector("[data-atlas-focus]");
const atlasLanguage = document.querySelector("[data-atlas-language]");

const selectAtlasCountry = (code) => {
  const profile = atlasProfiles[code];
  if (!profile) return;
  if (atlasTitle) atlasTitle.textContent = profile.title;
  if (atlasIntro) atlasIntro.textContent = profile.intro;
  if (atlasQuestion) atlasQuestion.textContent = profile.question;
  if (atlasFocus) atlasFocus.textContent = profile.focus;
  if (atlasLanguage) atlasLanguage.textContent = profile.language;
  atlasButtons.forEach((button) => {
    const active = button.dataset.atlasCountry === code;
    button.classList.toggle("is-active", active);
    if (button.matches("button")) button.setAttribute("aria-pressed", String(active));
  });
};

atlasButtons.forEach((button) => {
  button.addEventListener("click", () => selectAtlasCountry(button.dataset.atlasCountry));
});

const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const nav = document.querySelector("[data-nav]");
const year = document.querySelector("[data-year]");
const closeMenu = () => {
  if (!menuButton || !nav) return;
  menuButton.setAttribute("aria-expanded", "false");
  nav.classList.remove("is-open");
};

if (year) year.textContent = String(new Date().getFullYear());
if (header) {
  const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 20);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}
if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    nav.classList.toggle("is-open", !isOpen);
  });
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px" },
  );
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const qrHandoffScript = document.createElement("script");
qrHandoffScript.src = "/qr-handoff.js?v=20260802-1";
qrHandoffScript.defer = true;
document.head.appendChild(qrHandoffScript);
