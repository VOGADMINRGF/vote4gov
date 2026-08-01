const loadStyle = (href) => {
  if (document.querySelector(`link[href^="${href}"]`)) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
};

loadStyle("/image-tuning.css?v=20260801-1");
loadStyle("/accessibility.css?v=20260801-1");
loadStyle("/ecosystem-brand.css?v=20260801-1");

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

const existingFooter = document.querySelector("footer");
if (existingFooter && !document.querySelector(".ecosystem-footer-band")) {
  const ecosystem = document.createElement("section");
  ecosystem.className = "ecosystem-footer-band";
  ecosystem.setAttribute("aria-labelledby", "ecosystem-heading");
  ecosystem.innerHTML = `
    <div class="ecosystem-footer-inner">
      <p class="ecosystem-kicker">Ein Ökosystem. Vier klare Rollen.</p>
      <h2 id="ecosystem-heading">Verstehen. Verbinden. Weiterdenken. Orientieren.</h2>
      <p class="ecosystem-intro">Eigenständige Angebote mit gemeinsamer Designsprache, Transparenz und einer klaren Grenze: eDebatte bleibt offen für alle.</p>
      <div class="ecosystem-grid">
        <a class="ecosystem-card" href="https://www.edebatte.org">
          <span class="ecosystem-role">Verstehen</span><strong class="ecosystem-name">eDebatte</strong><span class="ecosystem-description">Offene Infrastruktur für nachvollziehbare Erkenntnis und Beteiligung.</span>
        </a>
        <a class="ecosystem-card" href="https://www.voiceopengov.org">
          <span class="ecosystem-role">Verbinden</span><strong class="ecosystem-name">VoiceOpenGov</strong><span class="ecosystem-description">Internationale Mitgliederbewegung für nachvollziehbare Entscheidungen.</span>
        </a>
        <a class="ecosystem-card is-current" href="https://www.vote4gov.eu" aria-current="page">
          <span class="ecosystem-role">Weiterdenken</span><strong class="ecosystem-name">Vote4Gov</strong><span class="ecosystem-description">Gesellschaftliche Denkwerkstatt für demokratische Mitbestimmung im digitalen Zeitalter.</span>
        </a>
        <a class="ecosystem-card" href="https://www.edebatte.org">
          <span class="ecosystem-role">Orientieren</span><strong class="ecosystem-name">Voxy</strong><span class="ecosystem-description">Erklärt, strukturiert und verbindet. Entscheidet nicht.</span>
        </a>
      </div>
    </div>
  `;
  existingFooter.before(ecosystem);
}

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
