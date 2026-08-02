(() => {
  const SESSION_KEY = "vote4gov:participation-pulse:v1";
  const DEVICE_KEY = "vote4gov:participation-pulse:device:v1";
  const pending = new Map();
  let pendingNavigation = null;

  const safeParse = (value, fallback = {}) => {
    try { return value ? JSON.parse(value) : fallback; } catch { return fallback; }
  };

  const sessionState = safeParse(sessionStorage.getItem(SESSION_KEY));
  const deviceState = safeParse(localStorage.getItem(DEVICE_KEY));
  const state = { ...deviceState, ...sessionState };

  const persistSession = () => {
    try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(state)); } catch { /* storage may be unavailable */ }
  };

  const persistDevice = () => {
    try {
      localStorage.setItem(DEVICE_KEY, JSON.stringify(state));
      sessionStorage.removeItem(SESSION_KEY);
    } catch { /* storage may be unavailable */ }
  };

  const clearTopic = (topicId) => {
    delete state[topicId];
    pending.delete(topicId);
    persistSession();
  };

  const topicFromLink = (link) => {
    try {
      const url = new URL(link?.href || "", window.location.href);
      return url.searchParams.get("source_id") || url.searchParams.get("origin_id") || null;
    } catch { return null; }
  };

  const slugFromPath = () => {
    const path = window.location.pathname.replace(/^\/+|\/+$/g, "");
    return path ? path.replace(/\.html$/, "") : "vote4gov-home";
  };

  const icons = {
    agree: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10v10H3V10h4Zm3 10V9.2l3.2-6.1c.3-.6 1-.9 1.6-.7.8.2 1.2 1 .9 1.8L15 8h5.2c1.5 0 2.6 1.4 2.2 2.8l-2 7.5c-.3 1-1.2 1.7-2.2 1.7H10Z"/></svg>',
    disagree: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 14V4H3v10h4Zm3-10v10.8l3.2 6.1c.3.6 1 .9 1.6.7.8-.2 1.2-1 .9-1.8L15 16h5.2c1.5 0 2.6-1.4 2.2-2.8l-2-7.5c-.3-1-1.2-1.7-2.2-1.7H10Z"/></svg>',
    remember: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h12v18l-6-4-6 4V3Z"/></svg>',
    edebate: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h9v2H7v10h10v-7h2v9H5V5Zm8-2h8v8h-2V6.4l-8.3 8.3-1.4-1.4L17.6 5H13V3Z"/></svg>',
  };

  const createButton = (action, label) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "participation-pulse-action";
    button.dataset.pulseAction = action;
    button.innerHTML = `${icons[action]}<span>${label}</span>`;
    return button;
  };

  const renderState = (widget, topicId) => {
    const current = state[topicId] || {};
    widget.querySelectorAll("[data-pulse-action]").forEach((button) => {
      const action = button.dataset.pulseAction;
      const selected = (action === "agree" && current.stance === "agree")
        || (action === "disagree" && current.stance === "disagree")
        || (action === "remember" && current.remembered === true);
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    const status = widget.querySelector("[data-pulse-status]");
    if (!status) return;
    if (current.stance === "agree") status.textContent = "Lokal vorgemerkt: Zustimmung. Noch nicht öffentlich gezählt.";
    else if (current.stance === "disagree") status.textContent = "Lokal vorgemerkt: Widerspruch. Noch nicht öffentlich gezählt.";
    else if (current.remembered) status.textContent = "Für später auf diesem Gerät vorgemerkt. Noch nicht an eDebatte übertragen.";
    else status.textContent = "Ihre Auswahl bleibt zunächst nur in diesem Browser und wird nicht als Stimme gezählt.";
  };

  const createWidget = ({ topicId, title, edebateUrl, compact = false }) => {
    const widget = document.createElement("section");
    widget.className = `participation-pulse${compact ? " participation-pulse-compact" : ""}`;
    widget.dataset.participationPulse = topicId;
    widget.innerHTML = `
      <div class="participation-pulse-heading">
        <span class="participation-pulse-kicker">Ihre erste Einordnung</span>
        <h3>${title}</h3>
      </div>
      <div class="participation-pulse-actions" role="group" aria-label="Lokale Einordnung zu diesem Thema"></div>
      <p class="participation-pulse-status" data-pulse-status aria-live="polite"></p>
      <p class="participation-pulse-fineprint">Keine öffentliche Abstimmung: Erst bei eDebatte wird eine Beteiligung übertragen, eingeordnet und – je nach Verfahren – gezählt.</p>`;

    const actions = widget.querySelector(".participation-pulse-actions");
    const agree = createButton("agree", "Zustimmen");
    const disagree = createButton("disagree", "Widersprechen");
    const remember = createButton("remember", "Später prüfen");
    const edebate = document.createElement("a");
    edebate.className = "participation-pulse-action participation-pulse-edebate";
    edebate.dataset.pulseAction = "edebate";
    edebate.href = edebateUrl;
    edebate.target = "_blank";
    edebate.rel = "noreferrer";
    edebate.innerHTML = `${icons.edebate}<span>Zu eDebatte</span>`;
    actions.append(agree, disagree, remember, edebate);

    const update = (action) => {
      const current = state[topicId] || { topicId, path: window.location.pathname, title, edebateUrl };
      if (action === "agree" || action === "disagree") {
        current.stance = current.stance === action ? null : action;
      }
      if (action === "remember") current.remembered = !current.remembered;
      current.updatedAt = new Date().toISOString();
      state[topicId] = current;
      if (current.stance || current.remembered) pending.set(topicId, current);
      else pending.delete(topicId);
      persistSession();
      renderState(widget, topicId);
    };

    agree.addEventListener("click", () => update("agree"));
    disagree.addEventListener("click", () => update("disagree"));
    remember.addEventListener("click", () => update("remember"));
    edebate.addEventListener("click", () => {
      clearTopic(topicId);
      widget.querySelector("[data-pulse-status]").textContent = "eDebatte wurde geöffnet. Die lokale Vormerkung wurde hier beendet.";
    });

    renderState(widget, topicId);
    const existing = state[topicId];
    if (existing?.stance || existing?.remembered) pending.set(topicId, existing);
    return widget;
  };

  const installArticleWidgets = () => {
    document.querySelectorAll(".edebatte-handoff:not([data-pulse-installed])").forEach((handoff) => {
      const link = handoff.querySelector("a.edebatte-link") || handoff.querySelector('a[href*="edebatte.org"]');
      if (!link) return;
      handoff.dataset.pulseInstalled = "true";
      const topicId = handoff.dataset.topicId || topicFromLink(link) || slugFromPath();
      const title = handoff.querySelector("h2")?.textContent.trim() || document.querySelector("h1")?.textContent.trim() || "Wie ordnen Sie diese These ein?";
      handoff.insertAdjacentElement("beforebegin", createWidget({ topicId, title, edebateUrl: link.href }));
    });
  };

  const installInterruptionWidgets = () => {
    const reveal = document.querySelector('.editorial-access-reveal:not([data-pulse-installed])');
    if (reveal) {
      reveal.dataset.pulseInstalled = "true";
      const url = "https://www.edebatte.org/create?source=vote4gov&source_id=free-knowledge-access&title=Sollten%20demokratisch%20relevante%20Informationen%20frei%20zug%C3%A4nglich%20sein%3F";
      const widget = createWidget({ topicId: "free-knowledge-access", title: "Sollten demokratisch relevante Informationen grundsätzlich frei zugänglich sein?", edebateUrl: url, compact: true });
      reveal.querySelector(".editorial-access-actions")?.insertAdjacentElement("beforebegin", widget);
    }

    const privacy = document.querySelector('.editorial-privacy-sheet:not([data-pulse-installed])');
    if (privacy) {
      privacy.dataset.pulseInstalled = "true";
      const url = "https://www.edebatte.org/create?source=vote4gov&source_id=tracking-explicit-consent&title=Sollte%20nicht%20notwendiges%20Tracking%20nur%20nach%20ausdr%C3%BCcklicher%20Zustimmung%20zul%C3%A4ssig%20sein%3F";
      const widget = createWidget({ topicId: "tracking-explicit-consent", title: "Sollte nicht notwendiges Tracking nur nach ausdrücklicher Zustimmung zulässig sein?", edebateUrl: url, compact: true });
      privacy.querySelector(".editorial-privacy-actions")?.insertAdjacentElement("beforebegin", widget);
    }
  };

  const ensureExitDialog = () => {
    let dialog = document.querySelector("[data-pulse-exit-dialog]");
    if (dialog) return dialog;
    dialog = document.createElement("dialog");
    dialog.className = "participation-exit-dialog";
    dialog.dataset.pulseExitDialog = "";
    dialog.setAttribute("aria-labelledby", "participation-exit-title");
    dialog.innerHTML = `
      <div class="participation-exit-shell">
        <p class="participation-pulse-kicker">Lokale Vormerkung</p>
        <h2 id="participation-exit-title">Ihre Einordnung wurde noch nicht an eDebatte übertragen.</h2>
        <p>Vote4Gov speichert keine öffentliche Stimme. Ohne Übertragung oder ausdrückliches Merken wird Ihre Auswahl beim Schließen dieser Sitzung verworfen.</p>
        <div class="participation-exit-actions">
          <button type="button" class="participation-exit-primary" data-exit-edebate>Bei eDebatte weiter</button>
          <button type="button" data-exit-remember>Auf diesem Gerät merken</button>
          <button type="button" data-exit-discard>Ohne Übertragung fortfahren</button>
        </div>
        <p class="participation-pulse-fineprint">Beim Schließen eines Browser-Tabs kann technisch nur der Hinweis des Browsers angezeigt werden; ein frei gestaltetes Fenster ist dort nicht zuverlässig möglich.</p>
      </div>`;
    document.body.appendChild(dialog);

    const continueNavigation = () => {
      const target = pendingNavigation;
      pendingNavigation = null;
      dialog.close();
      if (target) window.location.assign(target);
    };

    dialog.querySelector("[data-exit-edebate]").addEventListener("click", () => {
      const first = [...pending.values()][0];
      if (first?.edebateUrl) window.open(first.edebateUrl, "_blank", "noopener,noreferrer");
      pending.clear();
      Object.keys(state).forEach((key) => { if (state[key]?.stance || state[key]?.remembered) delete state[key]; });
      persistSession();
      continueNavigation();
    });
    dialog.querySelector("[data-exit-remember]").addEventListener("click", () => {
      persistDevice();
      pending.clear();
      continueNavigation();
    });
    dialog.querySelector("[data-exit-discard]").addEventListener("click", () => {
      pending.clear();
      Object.keys(state).forEach((key) => { if (state[key]?.stance || state[key]?.remembered) delete state[key]; });
      persistSession();
      continueNavigation();
    });
    dialog.addEventListener("cancel", (event) => {
      event.preventDefault();
      pendingNavigation = null;
      dialog.close();
    });
    return dialog;
  };

  document.addEventListener("click", (event) => {
    if (pending.size === 0) return;
    const link = event.target.closest("a[href]");
    if (!link || link.target === "_blank" || link.hasAttribute("download") || link.href.startsWith("mailto:") || link.href.startsWith("tel:")) return;
    const url = new URL(link.href, window.location.href);
    if (url.origin !== window.location.origin || (url.pathname === window.location.pathname && url.hash)) return;
    event.preventDefault();
    pendingNavigation = link.href;
    const dialog = ensureExitDialog();
    if (typeof dialog.showModal === "function") dialog.showModal();
  });

  window.addEventListener("beforeunload", (event) => {
    if (pending.size === 0) return;
    event.preventDefault();
    event.returnValue = "";
  });

  installArticleWidgets();
  installInterruptionWidgets();
  const observer = new MutationObserver(() => {
    installArticleWidgets();
    installInterruptionWidgets();
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
