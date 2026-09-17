(() => {
  if (!document.body.classList.contains("journal-home") || document.documentElement.dataset.visionV3 === "ready") return;
  document.documentElement.dataset.visionV3 = "ready";

  const shell = document.querySelector(".journal-shell");
  if (shell && !document.querySelector(".v3-global-nav")) {
    const globalNav = document.createElement("nav");
    globalNav.className = "v3-global-nav";
    globalNav.setAttribute("aria-label", "Vote4Gov Hauptbereiche");
    globalNav.innerHTML = `
      <div class="v3-global-nav-inner">
        <a class="v3-global-nav-brand" href="/">vote<i>4</i>gov</a>
        <div class="v3-global-nav-links">
          <a href="/">Start</a>
          <a href="/vision.html" aria-current="page">Vision / Review</a>
          <a href="/regionen.html">Regionen</a>
          <a href="/ueber-mich.html">Person</a>
          <a href="https://www.edebatte.org/" target="_blank" rel="noreferrer">eDebatte ↗</a>
          <a class="v3-join" href="https://www.voiceopengov.org/mitglied-werden" target="_blank" rel="noreferrer">Mitmachen ↗</a>
        </div>
      </div>`;
    shell.before(globalNav);
  }

  const journalNav = document.querySelector(".journal-nav");
  if (journalNav && !document.querySelector(".v3-trust-strip")) {
    const trust = document.createElement("div");
    trust.className = "v3-trust-strip";
    trust.innerHTML = `
      <div class="v3-trust-strip-inner">
        <div class="v3-trust-points" aria-label="Redaktionelle Grundsätze">
          <span>Primärquellen zuerst</span><span>Gegenposition sichtbar</span><span>Versioniert</span><span>Korrigierbar</span><span>Keine Wahlempfehlung</span>
        </div>
        <div class="v3-trust-actions"><a href="/quellen.html">Methode prüfen</a><a href="mailto:rgf@voiceopengov.org?subject=Vote4Gov%20Korrektur">Korrektur melden</a></div>
      </div>`;
    journalNav.after(trust);
  }

  const byline = document.querySelector(".journal-byline");
  if (byline && !document.querySelector(".v3-version-ledger")) {
    const ledger = document.createElement("div");
    ledger.className = "v3-version-ledger";
    ledger.setAttribute("aria-label", "Versions- und Methodenstatus");
    ledger.innerHTML = `<span>Stand 17.09.2026</span><span>Version 1.0</span><a href="/quellen.html">Quellenstand</a><a href="mailto:rgf@voiceopengov.org?subject=Vote4Gov%20Korrektur">Korrektur</a>`;
    byline.after(ledger);
  }

  const sectionKinds = new Map([
    ["geschichte", ["Befund", "befund"]],
    ["digitalwende", ["Analyse", "analyse"]],
    ["strukturen", ["Prüfrahmen", "analyse"]],
    ["medien", ["Analyse", "analyse"]],
    ["infrastruktur", ["Modell & Umsetzung", "umsetzung"]],
    ["oekosystem", ["Rollenmodell", "modell"]],
    ["methode", ["Methode", "methode"]],
  ]);

  sectionKinds.forEach(([label, kind], id) => {
    const section = document.getElementById(id);
    const head = section?.querySelector(".journal-section-title");
    if (!head || head.querySelector(".v3-section-state")) return;
    const badge = document.createElement("span");
    badge.className = "v3-section-state";
    badge.dataset.kind = kind;
    badge.textContent = label;
    head.prepend(badge);
  });
})();
