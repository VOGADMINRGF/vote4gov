(() => {
  const config = Object.freeze({
    issue: Object.freeze({
      number: "01",
      label: "Ausgabe 01",
      version: "1.0",
    }),
    language: Object.freeze({
      source: "de",
      storageKey: "vote4gov:language:v1",
      quick: Object.freeze(["de", "en", "fr", "es", "tr", "ar"]),
      supported: Object.freeze(["de", "en", "fr", "es", "tr", "ar", "it", "pt", "nl", "pl", "uk", "zh"]),
    }),
    atlas: Object.freeze({
      visibleInIssue: false,
      futureSlice: "VOTE4GOV-WORLD-ATLAS-FOUNDATION-01",
    }),
  });

  globalThis.Vote4GovConfig = config;
  document.documentElement.dataset.issue = config.issue.number;
  document.documentElement.dataset.issueVersion = config.issue.version;
  document.documentElement.dataset.sourceLanguage = config.language.source;

  const markCanonicalLanguageControl = () => {
    document.querySelectorAll("[data-global-language-control]").forEach((control) => {
      control.dataset.languageUi = "canonical";
    });
  };

  markCanonicalLanguageControl();
  const languageControlObserver = new MutationObserver(() => markCanonicalLanguageControl());
  languageControlObserver.observe(document.body, { childList: true, subtree: true });

  if (!document.querySelector('link[href^="/system-question.css"]')) {
    const systemQuestionStyle = document.createElement("link");
    systemQuestionStyle.rel = "stylesheet";
    systemQuestionStyle.href = "/system-question.css?v=20260826-1";
    document.head.appendChild(systemQuestionStyle);
  }

  if (!document.querySelector('script[src^="/system-question.js"]')) {
    const systemQuestionScript = document.createElement("script");
    systemQuestionScript.src = "/system-question.js?v=20260826-1";
    systemQuestionScript.defer = true;
    document.head.appendChild(systemQuestionScript);
  }

  if (document.body.classList.contains("journal-home")) {
    if (!document.querySelector('link[href^="/vision-v3.css"]')) {
      const visionStyle = document.createElement("link");
      visionStyle.rel = "stylesheet";
      visionStyle.href = "/vision-v3.css?v=20260917-1";
      document.head.appendChild(visionStyle);
    }
    if (!document.querySelector('script[src^="/vision-v3.js"]')) {
      const visionScript = document.createElement("script");
      visionScript.src = "/vision-v3.js?v=20260917-1";
      visionScript.defer = true;
      document.head.appendChild(visionScript);
    }
  }
})();