(() => {
  const STORAGE_KEY = "vote4gov:language:v1";
  const SOURCE_LANGUAGE = "de";
  const ISSUE = "01";
  const MAX_TEXT_LENGTH = 4000;
  const CONCURRENCY = 4;

  const languages = {
    de: { flag: "🇩🇪", name: "Deutsch", dir: "ltr" },
    en: { flag: "🇬🇧", name: "English", dir: "ltr" },
    fr: { flag: "🇫🇷", name: "Français", dir: "ltr" },
    es: { flag: "🇪🇸", name: "Español", dir: "ltr" },
    tr: { flag: "🇹🇷", name: "Türkçe", dir: "ltr" },
    ar: { flag: "🌍", name: "العربية", dir: "rtl" },
    it: { flag: "🇮🇹", name: "Italiano", dir: "ltr" },
    pt: { flag: "🇵🇹", name: "Português", dir: "ltr" },
    nl: { flag: "🇳🇱", name: "Nederlands", dir: "ltr" },
    pl: { flag: "🇵🇱", name: "Polski", dir: "ltr" },
    uk: { flag: "🇺🇦", name: "Українська", dir: "ltr" },
    zh: { flag: "🇨🇳", name: "中文", dir: "ltr" },
  };

  const fallback = {
    en: {
      "Ihre erste Einordnung": "Your first assessment",
      "Zustimmen": "Agree",
      "Widersprechen": "Disagree",
      "Später prüfen": "Review later",
      "Zu eDebatte": "Go to eDebatte",
      "Keine öffentliche Abstimmung: Erst bei eDebatte wird eine Beteiligung übertragen, eingeordnet und – je nach Verfahren – gezählt.": "Not a public vote: participation is only transferred, contextualised and—depending on the process—counted at eDebatte.",
      "Sollte nicht notwendiges Tracking nur nach ausdrücklicher Zustimmung zulässig sein?": "Should non-essential tracking only be permitted after explicit consent?",
      "Sollten demokratisch relevante Informationen grundsätzlich frei zugänglich sein?": "Should democratically relevant information generally be freely accessible?",
      "Demokratische Beteiligung sollte zwischen Wahlen kontinuierlich möglich sein – ohne Repräsentation, Rechte und Rechtsstaatlichkeit zu ersetzen.": "Democratic participation should remain possible between elections—without replacing representation, rights or the rule of law.",
      "Welche Perspektive, Quelle oder Gegenposition fehlt in dieser Analyse?": "Which perspective, source or counter-position is missing from this analysis?",
    },
    fr: {
      "Ihre erste Einordnung": "Votre première appréciation",
      "Zustimmen": "Approuver",
      "Widersprechen": "Contester",
      "Später prüfen": "Examiner plus tard",
      "Zu eDebatte": "Aller sur eDebatte",
      "Keine öffentliche Abstimmung: Erst bei eDebatte wird eine Beteiligung übertragen, eingeordnet und – je nach Verfahren – gezählt.": "Il ne s’agit pas d’un vote public : la participation n’est transmise, contextualisée et, selon la procédure, comptée que sur eDebatte.",
      "Sollte nicht notwendiges Tracking nur nach ausdrücklicher Zustimmung zulässig sein?": "Le suivi non essentiel ne devrait-il être autorisé qu’après un consentement explicite ?",
      "Sollten demokratisch relevante Informationen grundsätzlich frei zugänglich sein?": "Les informations importantes pour la démocratie devraient-elles être librement accessibles ?",
      "Demokratische Beteiligung sollte zwischen Wahlen kontinuierlich möglich sein – ohne Repräsentation, Rechte und Rechtsstaatlichkeit zu ersetzen.": "La participation démocratique devrait rester possible entre les élections, sans remplacer la représentation, les droits ni l’État de droit.",
      "Welche Perspektive, Quelle oder Gegenposition fehlt in dieser Analyse?": "Quelle perspective, source ou position contraire manque dans cette analyse ?",
    },
    es: {
      "Ihre erste Einordnung": "Su primera valoración",
      "Zustimmen": "De acuerdo",
      "Widersprechen": "En desacuerdo",
      "Später prüfen": "Revisar más tarde",
      "Zu eDebatte": "Ir a eDebatte",
      "Keine öffentliche Abstimmung: Erst bei eDebatte wird eine Beteiligung übertragen, eingeordnet und – je nach Verfahren – gezählt.": "No es una votación pública: la participación solo se transfiere, contextualiza y, según el procedimiento, se cuenta en eDebatte.",
      "Sollte nicht notwendiges Tracking nur nach ausdrücklicher Zustimmung zulässig sein?": "¿Debería permitirse el seguimiento no esencial únicamente tras un consentimiento expreso?",
      "Sollten demokratisch relevante Informationen grundsätzlich frei zugänglich sein?": "¿Debería ser libre el acceso a la información relevante para la democracia?",
      "Demokratische Beteiligung sollte zwischen Wahlen kontinuierlich möglich sein – ohne Repräsentation, Rechte und Rechtsstaatlichkeit zu ersetzen.": "La participación democrática debería ser posible entre elecciones, sin sustituir la representación, los derechos ni el Estado de derecho.",
      "Welche Perspektive, Quelle oder Gegenposition fehlt in dieser Analyse?": "¿Qué perspectiva, fuente o posición contraria falta en este análisis?",
    },
    tr: {
      "Ihre erste Einordnung": "İlk değerlendirmeniz",
      "Zustimmen": "Katılıyorum",
      "Widersprechen": "Katılmıyorum",
      "Später prüfen": "Daha sonra incele",
      "Zu eDebatte": "eDebatte’ye git",
      "Keine öffentliche Abstimmung: Erst bei eDebatte wird eine Beteiligung übertragen, eingeordnet und – je nach Verfahren – gezählt.": "Bu bir kamu oylaması değildir: katılım yalnızca eDebatte’de aktarılır, bağlama yerleştirilir ve sürece göre sayılır.",
      "Sollte nicht notwendiges Tracking nur nach ausdrücklicher Zustimmung zulässig sein?": "Gerekli olmayan izleme yalnızca açık onaydan sonra mı mümkün olmalıdır?",
      "Sollten demokratisch relevante Informationen grundsätzlich frei zugänglich sein?": "Demokrasi açısından önemli bilgiler genel olarak ücretsiz erişilebilir olmalı mı?",
      "Demokratische Beteiligung sollte zwischen Wahlen kontinuierlich möglich sein – ohne Repräsentation, Rechte und Rechtsstaatlichkeit zu ersetzen.": "Demokratik katılım, temsilin, hakların ve hukuk devletinin yerini almadan seçimler arasında da mümkün olmalıdır.",
      "Welche Perspektive, Quelle oder Gegenposition fehlt in dieser Analyse?": "Bu analizde hangi bakış açısı, kaynak veya karşı görüş eksik?",
    },
    ar: {
      "Ihre erste Einordnung": "تقييمك الأول",
      "Zustimmen": "أوافق",
      "Widersprechen": "لا أوافق",
      "Später prüfen": "مراجعة لاحقًا",
      "Zu eDebatte": "الانتقال إلى eDebatte",
      "Keine öffentliche Abstimmung: Erst bei eDebatte wird eine Beteiligung übertragen, eingeordnet und – je nach Verfahren – gezählt.": "هذه ليست عملية تصويت عامة: لا تُنقل المشاركة وتُوضَع في سياقها وتُحتسب، بحسب الإجراء، إلا في eDebatte.",
      "Sollte nicht notwendiges Tracking nur nach ausdrücklicher Zustimmung zulässig sein?": "هل ينبغي السماح بالتتبع غير الضروري فقط بعد موافقة صريحة؟",
      "Sollten demokratisch relevante Informationen grundsätzlich frei zugänglich sein?": "هل ينبغي أن تكون المعلومات المهمة ديمقراطيًا متاحة بحرية؟",
      "Demokratische Beteiligung sollte zwischen Wahlen kontinuierlich möglich sein – ohne Repräsentation, Rechte und Rechtsstaatlichkeit zu ersetzen.": "ينبغي أن تظل المشاركة الديمقراطية ممكنة بين الانتخابات من دون أن تحل محل التمثيل والحقوق وسيادة القانون.",
      "Welche Perspektive, Quelle oder Gegenposition fehlt in dieser Analyse?": "ما المنظور أو المصدر أو الرأي المضاد المفقود في هذا التحليل؟",
    },
    it: { "Ihre erste Einordnung":"La sua prima valutazione", "Zustimmen":"D’accordo", "Widersprechen":"In disaccordo", "Später prüfen":"Esamina più tardi", "Zu eDebatte":"Vai a eDebatte" },
    pt: { "Ihre erste Einordnung":"A sua primeira avaliação", "Zustimmen":"Concordar", "Widersprechen":"Discordar", "Später prüfen":"Rever mais tarde", "Zu eDebatte":"Ir para eDebatte" },
    nl: { "Ihre erste Einordnung":"Uw eerste beoordeling", "Zustimmen":"Eens", "Widersprechen":"Oneens", "Später prüfen":"Later bekijken", "Zu eDebatte":"Naar eDebatte" },
    pl: { "Ihre erste Einordnung":"Twoja pierwsza ocena", "Zustimmen":"Zgadzam się", "Widersprechen":"Nie zgadzam się", "Später prüfen":"Sprawdź później", "Zu eDebatte":"Przejdź do eDebatte" },
    uk: { "Ihre erste Einordnung":"Ваша перша оцінка", "Zustimmen":"Погоджуюся", "Widersprechen":"Не погоджуюся", "Später prüfen":"Перевірити пізніше", "Zu eDebatte":"Перейти до eDebatte" },
    zh: { "Ihre erste Einordnung":"您的初步判断", "Zustimmen":"赞同", "Widersprechen":"反对", "Später prüfen":"稍后查看", "Zu eDebatte":"前往 eDebatte" },
  };

  const originalText = new WeakMap();
  const originalAttributes = new WeakMap();
  const translationCache = new Map();
  let activeLanguage = readLanguage();
  let activeTranslator = null;
  let translatorLanguage = null;
  let runId = 0;
  let statusNode = null;
  let trigger = null;
  let dialog = null;

  function readLanguage() {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY);
      return languages[stored] ? stored : SOURCE_LANGUAGE;
    } catch {
      return SOURCE_LANGUAGE;
    }
  }

  function writeLanguage(code) {
    try { sessionStorage.setItem(STORAGE_KEY, code); } catch { /* unavailable */ }
  }

  function normalizeIssue(root = document.body) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      if (node.nodeValue?.includes("Ausgabe 02")) node.nodeValue = node.nodeValue.replaceAll("Ausgabe 02", "Ausgabe 01");
    });
    root.querySelectorAll?.("[aria-label],[title]").forEach((element) => {
      ["aria-label", "title"].forEach((name) => {
        const value = element.getAttribute(name);
        if (value?.includes("Ausgabe 02")) element.setAttribute(name, value.replaceAll("Ausgabe 02", "Ausgabe 01"));
      });
    });
  }

  function excluded(node) {
    const parent = node.parentElement;
    if (!parent) return true;
    if (parent.closest("script,style,noscript,svg,code,pre,textarea,[data-no-translate],.v4g-language-dialog,.v4g-language-trigger,.global-language-control")) return true;
    if (parent.closest(".editorial-access-dialog") && !parent.closest(".participation-pulse")) return true;
    return false;
  }

  function meaningful(value) {
    const compact = value.trim();
    return compact.length > 1 && compact.length <= MAX_TEXT_LENGTH && /[\p{L}]/u.test(compact);
  }

  function capture(root = document.body) {
    if (!root) return;
    normalizeIssue(root);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (excluded(node) || originalText.has(node) || !meaningful(node.nodeValue || "")) continue;
      originalText.set(node, node.nodeValue);
    }

    root.querySelectorAll?.("[aria-label],[title],[placeholder]").forEach((element) => {
      if (element.closest("[data-no-translate],.v4g-language-dialog,.v4g-language-trigger,.global-language-control")) return;
      const values = {};
      ["aria-label", "title", "placeholder"].forEach((name) => {
        const value = element.getAttribute(name);
        if (value && meaningful(value)) values[name] = value.replaceAll("Ausgabe 02", "Ausgabe 01");
      });
      if (Object.keys(values).length && !originalAttributes.has(element)) originalAttributes.set(element, values);
    });
  }

  function restoreGerman() {
    document.querySelectorAll("body *").forEach(() => {});
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const original = originalText.get(node);
      if (original !== undefined) node.nodeValue = original.replaceAll("Ausgabe 02", "Ausgabe 01");
    }
    document.querySelectorAll("[aria-label],[title],[placeholder]").forEach((element) => {
      const values = originalAttributes.get(element);
      if (!values) return;
      Object.entries(values).forEach(([name, value]) => element.setAttribute(name, value));
    });
  }

  function setStatus(message, state = "working") {
    if (!statusNode) {
      statusNode = document.createElement("div");
      statusNode.className = "v4g-translation-status";
      statusNode.setAttribute("role", "status");
      statusNode.setAttribute("aria-live", "polite");
      document.body.appendChild(statusNode);
    }
    statusNode.dataset.state = state;
    statusNode.textContent = message;
    statusNode.hidden = false;
    if (state === "done") window.setTimeout(() => { if (statusNode) statusNode.hidden = true; }, 3200);
  }

  function updateDocumentLanguage(code) {
    const meta = languages[code] || languages.de;
    document.documentElement.lang = code;
    document.documentElement.dir = meta.dir;
    document.documentElement.dataset.translationMode = code === SOURCE_LANGUAGE ? "original" : "automatic";
    document.documentElement.dataset.translationReviewed = code === SOURCE_LANGUAGE ? "true" : "false";
    document.documentElement.dataset.issue = ISSUE;
    if (trigger) {
      trigger.innerHTML = `<span aria-hidden="true">🌐</span><strong>${code.toUpperCase()}</strong><span>· ${ISSUE}</span>`;
      trigger.setAttribute("aria-label", `${meta.name} · Ausgabe ${ISSUE} · Sprache ändern`);
    }
  }

  function applyFallback(code, root = document.body) {
    const dictionary = fallback[code] || {};
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const original = originalText.get(node);
      if (!original || excluded(node)) continue;
      const leading = original.match(/^\s*/)?.[0] || "";
      const trailing = original.match(/\s*$/)?.[0] || "";
      const core = original.trim();
      if (dictionary[core]) node.nodeValue = `${leading}${dictionary[core]}${trailing}`;
    }
  }

  function collectTextNodes(root = document.body) {
    const nodes = [];
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (excluded(node)) continue;
      const original = originalText.get(node);
      if (original && meaningful(original)) nodes.push(node);
    }
    return nodes;
  }

  async function translateValue(translator, value, code) {
    const leading = value.match(/^\s*/)?.[0] || "";
    const trailing = value.match(/\s*$/)?.[0] || "";
    const core = value.trim().replaceAll("Ausgabe 02", "Ausgabe 01");
    if (!core || code === SOURCE_LANGUAGE) return value;
    const key = `${code}\u0000${core}`;
    if (!translationCache.has(key)) translationCache.set(key, translator.translate(core));
    const translated = await translationCache.get(key);
    return `${leading}${translated}${trailing}`;
  }

  async function translateNodes(nodes, translator, code, currentRun) {
    let cursor = 0;
    let completed = 0;
    async function worker() {
      while (cursor < nodes.length && currentRun === runId) {
        const node = nodes[cursor++];
        const source = originalText.get(node);
        if (!source || !node.isConnected) continue;
        try { node.nodeValue = await translateValue(translator, source, code); } catch { /* retain source */ }
        completed += 1;
        if (completed % 12 === 0 || completed === nodes.length) {
          const percent = nodes.length ? Math.round((completed / nodes.length) * 100) : 100;
          setStatus(`Automatische Übersetzung auf diesem Gerät: ${percent}%`);
        }
      }
    }
    await Promise.all(Array.from({ length: Math.min(CONCURRENCY, nodes.length || 1) }, worker));
  }

  async function translateAttributes(translator, code, currentRun) {
    const elements = [...document.querySelectorAll("[aria-label],[title],[placeholder]")];
    for (const element of elements) {
      if (currentRun !== runId) return;
      const values = originalAttributes.get(element);
      if (!values || element.closest("[data-no-translate],.v4g-language-dialog,.v4g-language-trigger,.global-language-control")) continue;
      for (const [name, value] of Object.entries(values)) {
        try { element.setAttribute(name, (await translateValue(translator, value, code)).trim()); } catch { /* retain source */ }
      }
    }
  }

  function createTranslator(code) {
    if (!("Translator" in self) || code === SOURCE_LANGUAGE) return null;
    return self.Translator.create({
      sourceLanguage: SOURCE_LANGUAGE,
      targetLanguage: code,
      monitor(monitor) {
        monitor.addEventListener("downloadprogress", (event) => {
          setStatus(`Lokales Sprachmodell wird geladen: ${Math.round(event.loaded * 100)}%`);
        });
      },
    });
  }

  async function applyLanguage(code, { translatorPromise = null } = {}) {
    if (!languages[code]) code = SOURCE_LANGUAGE;
    activeLanguage = code;
    writeLanguage(code);
    updateDocumentLanguage(code);
    capture();
    const currentRun = ++runId;

    if (code === SOURCE_LANGUAGE) {
      activeTranslator?.destroy?.();
      activeTranslator = null;
      translatorLanguage = null;
      restoreGerman();
      setStatus("Deutsche Originalfassung · Ausgabe 01", "done");
      return;
    }

    applyFallback(code);
    setStatus("Automatische Übersetzung wird lokal vorbereitet …");

    try {
      const promise = translatorPromise || createTranslator(code);
      if (!promise) throw new Error("translator-unavailable");
      const translator = await promise;
      if (currentRun !== runId) { translator.destroy?.(); return; }
      activeTranslator?.destroy?.();
      activeTranslator = translator;
      translatorLanguage = code;
      const nodes = collectTextNodes();
      await translateNodes(nodes, translator, code, currentRun);
      await translateAttributes(translator, code, currentRun);
      if (currentRun === runId) setStatus("Automatisch auf diesem Gerät übersetzt · nicht redaktionell geprüft", "done");
    } catch {
      activeTranslator = null;
      translatorLanguage = null;
      setStatus("Volltextübersetzung ist in diesem Browser nicht lokal verfügbar. Bekannte Bedienelemente wurden übersetzt.", "done");
    }
  }

  function requestLanguage(code) {
    const translatorPromise = createTranslator(code);
    const existing = document.querySelector(".global-language-control select");
    if (existing && existing.value !== code) {
      existing.value = code;
      existing.dispatchEvent(new Event("change", { bubbles: true }));
      if (translatorPromise) applyLanguage(code, { translatorPromise });
      else applyLanguage(code);
      return;
    }
    applyLanguage(code, { translatorPromise });
    document.dispatchEvent(new CustomEvent("vote4gov:languagechange", {
      detail: { code, automatic: code !== SOURCE_LANGUAGE, issue: ISSUE },
    }));
  }

  function installSelector() {
    if (document.querySelector(".v4g-language-trigger")) return;
    trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "v4g-language-trigger";
    updateDocumentLanguage(activeLanguage);

    dialog = document.createElement("dialog");
    dialog.className = "v4g-language-dialog";
    dialog.setAttribute("aria-labelledby", "v4g-language-title");
    dialog.innerHTML = `
      <div class="v4g-language-dialog-shell">
        <div class="v4g-language-dialog-head">
          <div><span>Vote4Gov Review · Ausgabe ${ISSUE}</span><h2 id="v4g-language-title">Lesesprache wählen</h2></div>
          <button type="button" data-language-close aria-label="Sprachauswahl schließen">×</button>
        </div>
        <p>Die vollständige Seite und neu eingeblendete Fragen werden – soweit der Browser es unterstützt – direkt auf diesem Gerät übersetzt. Es werden dafür keine Texte an Vote4Gov oder einen Übersetzungsdienst übertragen.</p>
        <div class="v4g-language-grid"></div>
        <p class="v4g-language-note">KI-gestützte automatische Übersetzung · nicht redaktionell geprüft. Die deutsche Fassung bleibt die Originalfassung.</p>
      </div>`;

    const grid = dialog.querySelector(".v4g-language-grid");
    Object.entries(languages).forEach(([code, language]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.languageCode = code;
      button.innerHTML = `<span aria-hidden="true">${language.flag}</span><strong>${language.name}</strong><small>${code.toUpperCase()}</small>`;
      button.addEventListener("click", () => {
        requestLanguage(code);
        dialog.close();
      });
      grid.appendChild(button);
    });

    trigger.addEventListener("click", () => {
      if (activeLanguage !== SOURCE_LANGUAGE && translatorLanguage !== activeLanguage) {
        const translatorPromise = createTranslator(activeLanguage);
        applyLanguage(activeLanguage, { translatorPromise });
      }
      if (typeof dialog.showModal === "function") dialog.showModal();
    });
    dialog.querySelector("[data-language-close]").addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });

    const nav = document.querySelector(".journal-nav-inner");
    const navCta = nav?.querySelector(".journal-nav-cta");
    if (nav) nav.insertBefore(trigger, navCta || null);
    else document.body.appendChild(trigger);
    document.body.appendChild(dialog);
  }

  function translateAdded(root) {
    capture(root);
    if (activeLanguage === SOURCE_LANGUAGE) return;
    applyFallback(activeLanguage, root);
    if (!activeTranslator || translatorLanguage !== activeLanguage) return;
    const nodes = collectTextNodes(root);
    const currentRun = runId;
    translateNodes(nodes, activeTranslator, activeLanguage, currentRun).catch(() => {});
  }

  normalizeIssue();
  capture();
  installSelector();
  updateDocumentLanguage(activeLanguage);

  document.addEventListener("vote4gov:languagechange", (event) => {
    const code = event.detail?.code;
    if (!languages[code] || code === activeLanguage) return;
    const translatorPromise = createTranslator(code);
    applyLanguage(code, { translatorPromise });
  });

  const observer = new MutationObserver((records) => {
    records.forEach((record) => record.addedNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) translateAdded(node);
      else if (node.nodeType === Node.TEXT_NODE && node.parentElement) translateAdded(node.parentElement);
    }));
    normalizeIssue();
    installSelector();
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
