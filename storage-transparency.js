(() => {
  const NOTICE_KEY = "vote4gov:storage-notice:v1";
  const PREFIX = "vote4gov:";

  const readJson = (storage, key) => {
    try {
      const value = storage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch { return null; }
  };

  const countTopics = (value) => {
    if (!value || typeof value !== "object") return 0;
    return Object.values(value).filter((item) => item && (item.stance || item.remembered)).length;
  };

  const currentSnapshot = () => {
    const sessionPulse = readJson(sessionStorage, "vote4gov:participation-pulse:v1");
    const devicePulse = readJson(localStorage, "vote4gov:participation-pulse:device:v1");
    const sessionTopics = countTopics(sessionPulse);
    const deviceTopics = countTopics(devicePulse);
    let accessibleCookies = 0;
    try { accessibleCookies = document.cookie ? document.cookie.split(";").filter(Boolean).length : 0; } catch { /* unavailable */ }
    return { sessionTopics, deviceTopics, accessibleCookies };
  };

  const banner = document.createElement("aside");
  banner.className = "storage-transparency-banner";
  banner.setAttribute("aria-labelledby", "storage-transparency-title");
  banner.innerHTML = `
    <div class="storage-transparency-inner">
      <div class="storage-transparency-icon" aria-hidden="true">i</div>
      <div class="storage-transparency-copy">
        <h2 id="storage-transparency-title">Transparent gespeichert – nicht verfolgt.</h2>
        <p>Vote4Gov nutzt lokalen Browserspeicher nur für gewählte Sprache, geöffnete Hinweise und Ihre noch nicht übertragenen Themenvormerkungen. Diese Angaben werden nicht als öffentliche Stimme gezählt und nicht an Vote4Gov übertragen.</p>
        <div class="storage-transparency-summary" aria-live="polite" data-storage-summary></div>
      </div>
      <div class="storage-transparency-controls">
        <button type="button" data-storage-details aria-expanded="false">Details</button>
        <button type="button" data-storage-clear>Lokale Daten löschen</button>
        <button type="button" class="primary" data-storage-dismiss disabled>Hinweis ausblenden</button>
      </div>
      <div class="storage-transparency-details" data-storage-details-panel hidden>
        <h3>Was diese Website lokal speichern kann</h3>
        <ul>
          <li><strong>Nur für diese Sitzung:</strong> dass der Zugangshinweis angezeigt wurde, die gewählte Lesesprache sowie Thema, lokale Einordnung und Zeitpunkt einer noch nicht übertragenen Vormerkung.</li>
          <li><strong>Nur nach „Auf diesem Gerät merken“:</strong> dieselben Themenvormerkungen in dauerhaftem lokalem Speicher, bis Sie sie löschen.</li>
          <li><strong>Dieser Transparenzhinweis:</strong> nach dem Abhaken nur für die laufende Sitzung, damit er nicht auf jeder Unterseite erneut groß erscheint.</li>
          <li><strong>Nicht durch den Vote4Gov-Seitencode gespeichert:</strong> Name, E-Mail-Adresse, Werbe-ID, geräteübergreifendes Profil oder Verlauf über andere Websites.</li>
          <li><strong>Technischer Betrieb:</strong> Hosting- und Sicherheitsanbieter können für Auslieferung und Schutz technisch notwendige Verbindungsdaten wie IP-Adresse und Zeitpunkt verarbeiten. Diese Daten sind nicht Teil der lokalen Vormerkung.</li>
        </ul>
        <p>Vote4Gov setzt für diese Funktionen keine Analyse-, Werbe- oder Tracking-Cookies. Der Löschbutton entfernt bekannte Vote4Gov-Einträge aus Session Storage, Local Storage und technisch zugängliche Cookies dieser Domain; HttpOnly- oder Infrastruktur-Cookies können nur vom jeweiligen Server beendet werden.</p>
      </div>
      <label class="storage-transparency-check">
        <input type="checkbox" data-storage-understood />
        <span>Ich habe verstanden: Lokale Vormerkungen sind keine öffentliche Abstimmung. Ohne Übertragung an eDebatte oder bewusstes Merken werden sie spätestens mit dem Ende der Sitzung verworfen.</span>
      </label>
    </div>`;
  document.body.appendChild(banner);

  const reopen = document.createElement("button");
  reopen.type = "button";
  reopen.className = "storage-transparency-reopen";
  reopen.textContent = "Lokaler Speicher";
  reopen.setAttribute("aria-label", "Transparenzhinweis zum lokalen Speicher erneut öffnen");
  reopen.hidden = true;
  document.body.appendChild(reopen);

  const summary = banner.querySelector("[data-storage-summary]");
  const checkbox = banner.querySelector("[data-storage-understood]");
  const dismiss = banner.querySelector("[data-storage-dismiss]");
  const detailsButton = banner.querySelector("[data-storage-details]");
  const detailsPanel = banner.querySelector("[data-storage-details-panel]");

  const refresh = () => {
    const { sessionTopics, deviceTopics, accessibleCookies } = currentSnapshot();
    summary.replaceChildren();
    const items = [
      `${sessionTopics} Vormerkung${sessionTopics === 1 ? "" : "en"} in dieser Sitzung`,
      `${deviceTopics} dauerhaft lokal gemerkt`,
      `${accessibleCookies} technisch zugängliche Cookie${accessibleCookies === 1 ? "" : "s"}`,
      "0 öffentliche Stimmen bei Vote4Gov",
    ];
    items.forEach((text) => {
      const chip = document.createElement("span");
      chip.textContent = text;
      summary.appendChild(chip);
    });
  };

  checkbox.addEventListener("change", () => { dismiss.disabled = !checkbox.checked; });
  detailsButton.addEventListener("click", () => {
    const open = detailsPanel.hidden;
    detailsPanel.hidden = !open;
    detailsButton.setAttribute("aria-expanded", String(open));
    detailsButton.textContent = open ? "Details schließen" : "Details";
    refresh();
  });
  dismiss.addEventListener("click", () => {
    if (!checkbox.checked) return;
    try { sessionStorage.setItem(NOTICE_KEY, JSON.stringify({ acknowledgedAt: new Date().toISOString() })); } catch { /* unavailable */ }
    banner.hidden = true;
    reopen.hidden = false;
  });
  reopen.addEventListener("click", () => {
    banner.hidden = false;
    reopen.hidden = true;
    checkbox.focus();
    refresh();
  });
  banner.querySelector("[data-storage-clear]").addEventListener("click", () => {
    try {
      [...Array(sessionStorage.length)].map((_, index) => sessionStorage.key(index)).filter((key) => key?.startsWith(PREFIX)).forEach((key) => sessionStorage.removeItem(key));
      [...Array(localStorage.length)].map((_, index) => localStorage.key(index)).filter((key) => key?.startsWith(PREFIX)).forEach((key) => localStorage.removeItem(key));
      document.cookie.split(";").forEach((cookie) => {
        const name = cookie.split("=")[0]?.trim();
        if (!name) return;
        document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
      });
    } finally {
      window.location.reload();
    }
  });

  document.addEventListener("click", () => window.setTimeout(refresh, 0));
  refresh();

  let acknowledged = false;
  try { acknowledged = Boolean(sessionStorage.getItem(NOTICE_KEY)); } catch { /* unavailable */ }
  if (acknowledged) {
    banner.hidden = true;
    reopen.hidden = false;
  }
})();
