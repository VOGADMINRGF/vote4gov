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
  const deviceTopicIds = new Set(Object.keys(deviceState));
  const state = { ...deviceState, ...sessionState };

  const writeDeviceState = () => {
    try {
      const deviceOnly = Object.fromEntries([...deviceTopicIds]
        .filter((topicId) => state[topicId])
        .map((topicId) => [topicId, state[topicId]]));
      if (Object.keys(deviceOnly).length) localStorage.setItem(DEVICE_KEY, JSON.stringify(deviceOnly));
      else localStorage.removeItem(DEVICE_KEY);
    } catch { /* storage may be unavailable */ }
  };

  const persistSession = () => {
    try {
      const sessionOnly = Object.fromEntries(Object.entries(state)
        .filter(([topicId, item]) => !deviceTopicIds.has(topicId) && item && (item.stance || item.remembered)));
      if (Object.keys(sessionOnly).length) sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionOnly));
      else sessionStorage.removeItem(SESSION_KEY);
    } catch { /* storage may be unavailable */ }
  };

  const persistDevice = () => {
    pending.forEach((_, topicId) => deviceTopicIds.add(topicId));
    writeDeviceState();
    persistSession();
  };

  const makePending = (topicId) => {
    deviceTopicIds.delete(topicId);
    writeDeviceState();
    const current = state[topicId];
    if (current?.stance || current?.remembered) pending.set(topicId, current);
    else pending.delete(topicId);
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
      if (action === "edebate") return;
      const selected = (action === "agree" && current.stance === "agree")
        || (action === "disagree" && current.stance === "disagree")
        || (action === "remember" && current.remembered === true);
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    const status = widget.querySelector("[data-pulse-status]");
    if (!status) return;
    const savedOnDevice = deviceTopicIds.has(topicId);
    if (current.stance === "agree") status.textContent = savedOnDevice
      ? "Auf diesem Gerät gemerkt: Zustimmung. Noch nicht öffentlich gezählt."
      : "Lokal vorgemerkt: Zustimmung. Noch nicht öffentlich gezählt.";
    else if (current.stance === "disagree") status.textContent = savedOnDevice
      ? "Auf diesem Gerät gemerkt: Widerspruch. Noch nicht öffentlich gezählt."
      : "Lokal vorgemerkt: Widerspruch. Noch nicht öffentlich gezählt.";
    else if (current.remembered) status.textContent = savedOnDevice
      ? "Auf diesem Gerät für später gemerkt. Noch nicht an eDebatte übertragen."
      : "Für diese Sitzung vorgemerkt. Noch nicht an eDebatte übertragen.";
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
      <p class="participation-pulse-fineprint">Keine öffentliche Abstimmung: Eine Linköffnung überträgt oder zählt keine lokale Vormerkung. Eine spätere Beteiligung erfolgt ausschließlich bewusst bei eDebatte.</p>`;

    const actions = widget.querySelector(".participation-pulse-actions");
    const agree = createButton("agree", "Zustimmen");
    const disagree = createButton("disagree", "Widersprechen");
    const remember = createButton("remember", "Später prüfen");
    const edebate = document.createElement(edebateUrl ? "a" : "span");
    edebate.className = "participation-pulse-action participation-pulse-edebate";
    edebate.dataset.pulseAction = "edebate";
    if (edebateUrl) {
      edebate.href = edebateUrl;
      edebate.target = "_blank";
      edebate.rel = "noreferrer";
      edebate.innerHTML = `${icons.edebate}<span>Zu eDebatte</span>`;
    } else {
      edebate.dataset.handoffPreparing = "";
      edebate.setAttribute("aria-disabled", "true");
      edebate.innerHTML = `${icons.edebate}<span>eDebatte-Kontext wird vorbereitet</span>`;
    }
    actions.append(agree, disagree, remember, edebate);

    const update = (action) => {
      const current = state[topicId] || { topicId, path: window.location.pathname, title, edebateUrl };
      current.topicId = topicId;
      current.path = window.location.pathname;
      current.title = title;
      current.edebateUrl = widget.querySelector("a.participation-pulse-edebate")?.href || edebateUrl || null;
      if (action === "agree" || action === "disagree") current.stance = current.stance === action ? null : action;
      if (action === "remember") current.remembered = !current.remembered;
      current.updatedAt = new Date().toISOString();
      state[topicId] = current;
      makePending(topicId);
      renderState(widget, topicId);
    };

    agree.addEventListener("click", () => update("agree"));
    disagree.addEventListener("click", () => update("disagree"));
    remember.addEventListener("click", () => update("remember"));

    const existing = state[topicId];
    if (existing && existing.edebateUrl !== (edebateUrl || null)) {
      existing.edebateUrl = edebateUrl || null;
      state[topicId] = existing;
      writeDeviceState();
      persistSession();
    }
    renderState(widget, topicId);
    if ((existing?.stance || existing?.remembered) && !deviceTopicIds.has(topicId)) pending.set(topicId, existing);
    return widget;
  };

  const installArticleWidgets = () => {
    document.querySelectorAll(".edebatte-handoff:not([data-pulse-installed])").forEach((handoff) => {
      const link = handoff.querySelector("a.edebatte-link") || handoff.querySelector('a[href*="edebatte.org"]');
      handoff.dataset.pulseInstalled = "true";
      const topicId = handoff.dataset.topicId || topicFromLink(link) || slugFromPath();
      const title = handoff.querySelector("h2")?.textContent.trim() || document.querySelector("h1")?.textContent.trim() || "Wie ordnen Sie diese These ein?";
      const configured = globalThis.Vote4GovHandoff?.getArticleHandoff({
        articleId: topicId,
        locale: document.documentElement.lang || "de",
      });
      const edebateUrl = configured?.ok ? configured.url : (link?.href || null);
      handoff.insertAdjacentElement("beforebegin", createWidget({ topicId, title, edebateUrl }));
    });
  };

  const installInterruptionWidgets = () => {
    const reveal = document.querySelector('.editorial-access-reveal:not([data-pulse-installed])');
    if (reveal) {
      reveal.dataset.pulseInstalled = "true";
      const widget = createWidget({
        topicId: "free-knowledge-access",
        title: "Sollten demokratisch relevante Informationen grundsätzlich frei zugänglich sein?",
        edebateUrl: null,
        compact: true,
      });
      reveal.querySelector(".editorial-access-actions")?.insertAdjacentElement("beforebegin", widget);
    }

    const privacy = document.querySelector('.editorial-privacy-sheet:not([data-pulse-installed])');
    if (privacy) {
      privacy.dataset.pulseInstalled = "true";
      const widget = createWidget({
        topicId: "tracking-explicit-consent",
        title: "Sollte nicht notwendiges Tracking nur nach ausdrücklicher Zustimmung zulässig sein?",
        edebateUrl: null,
        compact: true,
      });
      privacy.querySelector(".editorial-privacy-actions")?.insertAdjacentElement("beforebegin", widget);
    }
  };

  const discardPending = () => {
    [...pending.keys()].forEach((topicId) => { delete state[topicId]; });
    pending.clear();
    persistSession();
  };

  const firstPendingHandoff = () => [...pending.values()]
    .find((item) => typeof item?.edebateUrl === "string" && item.edebateUrl.startsWith("https://www.edebatte.org/"));

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
          <button type="button" class="participation-exit-primary" data-exit-edebate disabled>eDebatte-Kontext wird vorbereitet</button>
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
      const first = firstPendingHandoff();
      if (!first?.edebateUrl) return;
      window.open(first.edebateUrl, "_blank", "noopener,noreferrer");
      pending.clear();
      persistSession();
      continueNavigation();
    });
    dialog.querySelector("[data-exit-remember]").addEventListener("click", () => {
      persistDevice();
      pending.clear();
      persistSession();
      continueNavigation();
    });
    dialog.querySelector("[data-exit-discard]").addEventListener("click", () => {
      discardPending();
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
    const handoff = firstPendingHandoff();
    const handoffButton = dialog.querySelector("[data-exit-edebate]");
    if (handoffButton) {
      handoffButton.disabled = !handoff;
      handoffButton.textContent = handoff ? "Bei eDebatte weiter" : "eDebatte-Kontext wird vorbereitet";
    }
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
