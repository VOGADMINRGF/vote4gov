(() => {
  const root = document.documentElement;
  const config = globalThis.Vote4GovConfig;
  const issue = config?.issue?.number || "01";
  const sourceLanguage = (root.dataset.sourceLanguage || config?.language?.source || "de").toLowerCase();
  const pageLanguage = (root.lang || sourceLanguage).toLowerCase().split("-")[0];
  const automaticTranslation = root.dataset.translationMode === "automatic" || pageLanguage !== sourceLanguage;
  const translationReviewed = root.dataset.translationReviewed === "true";

  const upsertMeta = (name, content) => {
    let meta = document.head.querySelector(`meta[name="${name}"]`);
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = name;
      document.head.appendChild(meta);
    }
    meta.content = content;
  };

  root.dataset.aiGenerated = "true";
  root.dataset.aiEditorialResponsibility = "Vote4Gov";
  root.dataset.sourceLanguage = sourceLanguage;
  root.dataset.issue = issue;
  if (automaticTranslation) root.dataset.automaticallyTranslated = "true";

  upsertMeta("ai-content-disclosure", "ai-generated; human-editorial-control; editorial-responsibility=Vote4Gov");
  upsertMeta("ai-translation-disclosure", automaticTranslation
    ? `automatic-ai-translation; source-language=${sourceLanguage}; editorial-review=${translationReviewed ? "reviewed" : "not-reviewed"}`
    : `original-language=${sourceLanguage}; no-automatic-translation-on-this-page`);

  const statusText = automaticTranslation
    ? `KI-generierter Inhalt · automatisch aus dem Deutschen übersetzt · ${translationReviewed ? "Übersetzung redaktionell geprüft" : "Übersetzung nicht redaktionell geprüft"}`
    : "KI-generierter Inhalt · redaktionell bearbeitet · Vote4Gov trägt die redaktionelle Verantwortung";

  if (!document.querySelector("[data-ai-disclosure-bar]")) {
    const bar = document.createElement("aside");
    bar.className = "ai-transparency-bar";
    bar.dataset.aiDisclosureBar = "";
    bar.setAttribute("aria-label", "Transparenzhinweis zu KI-generierten Inhalten");
    bar.innerHTML = `<div class="ai-transparency-inner"><span class="ai-transparency-mark" aria-hidden="true">KI</span><p>${statusText}.</p><a href="/ki-transparenz.html">Wie KI und Übersetzungen gekennzeichnet werden</a></div>`;
    const skipLink = document.querySelector(".skip-link");
    if (skipLink) skipLink.insertAdjacentElement("afterend", bar);
    else document.body.prepend(bar);
  }

  document.querySelectorAll(".article-page .article-meta").forEach((meta) => {
    let disclosure = meta.querySelector("[data-ai-role]");
    if (!disclosure) {
      disclosure = document.createElement("a");
      disclosure.dataset.aiRole = "";
      disclosure.className = "article-ai-role";
      meta.appendChild(disclosure);
    }
    disclosure.href = "/ki-transparenz.html";
    disclosure.textContent = automaticTranslation
      ? `KI-generiert · automatisch übersetzt · ${translationReviewed ? "redaktionell geprüft" : "nicht redaktionell geprüft"}`
      : "KI-generiert · redaktionell bearbeitet · menschlich verantwortet";
    disclosure.setAttribute("aria-label", `${disclosure.textContent}. Transparenzverfahren öffnen.`);
  });

  const installPreviewDisclosure = (dialog) => {
    if (!dialog || dialog.dataset.aiDisclosureInstalled === "true") return;
    const card = dialog.querySelector("[data-preview-card]");
    const switcher = dialog.querySelector("[data-language-switch]");
    if (!card || !switcher) return;
    dialog.dataset.aiDisclosureInstalled = "true";

    const note = document.createElement("p");
    note.className = "ai-translation-disclosure";
    note.dataset.aiTranslationDisclosure = "";
    note.setAttribute("role", "status");
    note.setAttribute("aria-live", "polite");
    card.appendChild(note);

    const refresh = () => {
      const active = switcher.querySelector('[aria-selected="true"]');
      const code = active?.dataset.language || dialog.dataset.selectedLanguage || sourceLanguage;
      const translated = code !== sourceLanguage;
      card.dataset.aiGenerated = "true";
      card.dataset.sourceLanguage = sourceLanguage;
      card.dataset.translationLanguage = code;
      if (translated) {
        card.dataset.automaticallyTranslated = "true";
        note.textContent = "KI-generiert · automatisch aus dem Deutschen übersetzt · Übersetzung nicht redaktionell geprüft";
      } else {
        delete card.dataset.automaticallyTranslated;
        note.textContent = "KI-generierter Text · redaktionell verantwortete deutsche Originalfassung";
      }
    };

    switcher.addEventListener("click", () => window.setTimeout(refresh, 0));
    switcher.addEventListener("keydown", () => window.setTimeout(refresh, 0));
    document.addEventListener("vote4gov:languagechange", refresh);
    const observer = new MutationObserver(refresh);
    observer.observe(switcher, { subtree: true, attributes: true, attributeFilter: ["aria-selected"] });
    refresh();
  };

  const findPreview = () => installPreviewDisclosure(document.querySelector(".editorial-access-dialog"));
  findPreview();
  const bodyObserver = new MutationObserver(findPreview);
  bodyObserver.observe(document.body, { childList: true, subtree: true });

  const ensureStyle = (href) => {
    if (document.querySelector(`link[href^="${href}"]`)) return;
    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = href;
    document.head.appendChild(style);
  };

  const ensureScript = (src) => {
    if (document.querySelector(`script[src^="${src}"]`)) return;
    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    document.head.appendChild(script);
  };

  ensureScript("/site-config.js?v=20260804-1");
  ensureStyle("/global-language.css?v=20260804-2");
  ensureStyle("/header-plain-language.css?v=20260806-1");
  ensureStyle("/editorial-between-elections-reader-entry.css?v=20260806-1");
  ensureScript("/on-device-translation.js?v=20260804-2");
  ensureScript("/global-language.js?v=20260804-2");
  ensureScript("/language-ui-unifier.js?v=20260806-1");
  ensureScript("/language-runtime-integrity.js?v=20260804-1");
  ensureScript("/header-plain-language.js?v=20260806-1");
  ensureScript("/editorial-between-elections-reader-entry.js?v=20260806-1");
  ensureScript("/editorial-participation-positioning.js?v=20260804-1");
})();
