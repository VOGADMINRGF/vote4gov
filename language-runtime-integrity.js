(() => {
  const STORAGE_KEY = "vote4gov:language:v1";
  const SOURCE_LANGUAGE = "de";
  const META = {
    de: { name: "Deutsch", dir: "ltr", privacy: "Datenschutz & Speicher", privacyInside: "Datenschutz transparent prüfen" },
    en: { name: "English", dir: "ltr", privacy: "Privacy & storage", privacyInside: "Review privacy transparently" },
    fr: { name: "Français", dir: "ltr", privacy: "Confidentialité et stockage", privacyInside: "Consulter la confidentialité" },
    es: { name: "Español", dir: "ltr", privacy: "Privacidad y almacenamiento", privacyInside: "Revisar la privacidad" },
    tr: { name: "Türkçe", dir: "ltr", privacy: "Gizlilik ve depolama", privacyInside: "Gizliliği şeffafça incele" },
    ar: { name: "العربية", dir: "rtl", privacy: "الخصوصية والتخزين", privacyInside: "مراجعة الخصوصية بشفافية" },
    it: { name: "Italiano", dir: "ltr", privacy: "Privacy e archiviazione", privacyInside: "Consulta la privacy" },
    pt: { name: "Português", dir: "ltr", privacy: "Privacidade e armazenamento", privacyInside: "Consultar privacidade" },
    nl: { name: "Nederlands", dir: "ltr", privacy: "Privacy en opslag", privacyInside: "Privacy transparant bekijken" },
    pl: { name: "Polski", dir: "ltr", privacy: "Prywatność i pamięć", privacyInside: "Sprawdź prywatność" },
    uk: { name: "Українська", dir: "ltr", privacy: "Приватність і зберігання", privacyInside: "Переглянути приватність" },
    zh: { name: "中文", dir: "ltr", privacy: "隐私与存储", privacyInside: "透明查看隐私说明" },
  };

  let scheduled = false;

  const safeStoredLanguage = () => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (META[stored]) return stored;
    } catch { /* session storage may be unavailable */ }
    const browser = (navigator.language || SOURCE_LANGUAGE).toLowerCase().split("-")[0];
    return META[browser] ? browser : SOURCE_LANGUAGE;
  };

  const selectedLanguage = () => {
    const value = document.querySelector("[data-global-language-control] select")?.value;
    return META[value] ? value : safeStoredLanguage();
  };

  const setLocalizedText = (selector, value) => {
    document.querySelectorAll(selector).forEach((element) => {
      if (element.textContent !== value) element.textContent = value;
    });
  };

  const bindQuickLanguageKeyboard = () => {
    document.querySelectorAll(".editorial-language-switch").forEach((switcher) => {
      const buttons = [...switcher.querySelectorAll("button[data-language]")];
      buttons.forEach((button, index) => {
        if (button.dataset.keyboardBound === "true") return;
        button.dataset.keyboardBound = "true";
        button.addEventListener("keydown", (event) => {
          let nextIndex;
          if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % buttons.length;
          else if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + buttons.length) % buttons.length;
          else if (event.key === "Home") nextIndex = 0;
          else if (event.key === "End") nextIndex = buttons.length - 1;
          else return;
          event.preventDefault();
          buttons[nextIndex].focus();
          buttons[nextIndex].click();
        });
      });
    });
  };

  const applyLanguageIntegrity = (requested = selectedLanguage()) => {
    const code = META[requested] ? requested : SOURCE_LANGUAGE;
    const meta = META[code];
    const root = document.documentElement;

    root.dataset.sourceLanguage = SOURCE_LANGUAGE;
    root.dataset.readingLanguage = code;
    root.dataset.translationCoverage = "interface-preview";
    root.dataset.translationReviewed = code === SOURCE_LANGUAGE ? "true" : "false";

    document.querySelectorAll([
      "[data-global-language-control]",
      ".journal-topline",
      ".journal-nav-inner",
      ".journal-footer",
      ".editorial-access-dialog",
      ".editorial-privacy-sheet",
      ".storage-transparency-banner",
    ].join(",")).forEach((element) => {
      element.lang = code;
      element.dir = meta.dir;
    });

    const privacyTrigger = document.querySelector('.cover-story [data-privacy-open]');
    if (privacyTrigger) {
      privacyTrigger.textContent = meta.privacy;
      privacyTrigger.setAttribute("aria-label", `${meta.privacy} · ${meta.name}`);
    }
    setLocalizedText(".editorial-access-dialog [data-privacy-open]", meta.privacyInside);

    const select = document.querySelector("[data-global-language-control] select");
    if (select) select.setAttribute("aria-label", `${meta.name} · Lesesprache für Ausgabe 01`);

    bindQuickLanguageKeyboard();
  };

  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      applyLanguageIntegrity();
    });
  };

  document.addEventListener("vote4gov:languagechange", (event) => {
    applyLanguageIntegrity(event.detail?.code);
  });

  const observer = new MutationObserver(schedule);
  observer.observe(document.body, { childList: true, subtree: true });
  schedule();
})();
