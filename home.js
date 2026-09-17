document.documentElement.classList.add("js-enabled");

const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const navigation = document.querySelector("[data-nav]");

const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 24);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if (menuButton && navigation) {
  const closeMenu = () => {
    menuButton.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
  };

  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(open));
    navigation.classList.toggle("is-open", open);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });
  window.addEventListener("keydown", (event) => { if (event.key === "Escape") closeMenu(); });
}

const enhanceHomeInformationArchitecture = () => {
  const nav = document.querySelector("[data-nav]");
  if (nav) {
    const missionLink = Array.from(nav.querySelectorAll("a")).find((link) => link.getAttribute("href") === "/hinter-der-idee.html" || link.textContent.trim() === "Mission");
    if (missionLink) {
      missionLink.href = "#mission";
      missionLink.textContent = "Mission";
    }
    Array.from(nav.querySelectorAll("a")).forEach((link) => {
      if (link.getAttribute("href") === "#voxy" || link.textContent.trim() === "Voxy") link.remove();
    });
  }

  const mission = document.querySelector("#mission");
  if (mission) {
    const legacyLink = mission.querySelector('a[href="/hinter-der-idee.html"]');
    if (legacyLink) {
      legacyLink.href = "/vision.html";
      legacyLink.textContent = "Vision und Systemfragen prüfen →";
    }
    if (!mission.querySelector("[data-mission-flow]")) {
      const flow = document.createElement("div");
      flow.className = "home-mission-flow";
      flow.dataset.missionFlow = "";
      flow.setAttribute("aria-label", "Vom Anliegen bis zur Wirkung");
      flow.innerHTML = `
        <div><span>01</span><strong>Anliegen</strong></div>
        <div><span>02</span><strong>Quellen & Fakten</strong></div>
        <div><span>03</span><strong>Gegenpositionen</strong></div>
        <div><span>04</span><strong>Debatte & Alternativen</strong></div>
        <div><span>05</span><strong>Entscheidung</strong></div>
        <div><span>06</span><strong>Wirkung & Rechenschaft</strong></div>`;
      mission.appendChild(flow);
    }
  }

  const responsibility = document.querySelector(".application-panel");
  if (responsibility && !responsibility.querySelector("[data-accountability-commitments]")) {
    const commitments = document.createElement("div");
    commitments.className = "accountability-commitments";
    commitments.dataset.accountabilityCommitments = "";
    commitments.innerHTML = `
      <p class="home-eyebrow">Überprüfbare Verpflichtungen</p>
      <ol>
        <li>Keine Entscheidung ohne nachvollziehbare Begründung.</li>
        <li>Keine Zuständigkeit ohne sichtbare Verantwortung.</li>
        <li>Keine politische Ebene ohne belegbaren Nutzen.</li>
        <li>Keine Selbstdarstellung als Ersatz für Ergebnisse.</li>
        <li>Keine Beteiligung, die anschließend folgenlos verschwindet.</li>
      </ol>`;
    responsibility.appendChild(commitments);
  }
};

enhanceHomeInformationArchitecture();

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: .08, rootMargin: "0px 0px -30px" });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const updateYear = () => document.querySelectorAll("[data-year]").forEach((year) => {
  year.textContent = String(new Date().getFullYear());
});
updateYear();
document.addEventListener("vote4gov:language-changed", () => {
  updateYear();
  queueMicrotask(enhanceHomeInformationArchitecture);
});
