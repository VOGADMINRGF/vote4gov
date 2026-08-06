(() => {
  const root = document.documentElement;
  const sourceLanguage = globalThis.Vote4GovConfig?.language?.source || "de";

  const discloseCoverage = () => {
    const readingLanguage = root.dataset.readingLanguage || sourceLanguage;
    root.dataset.translationCoverage = "interface-preview";
    root.dataset.translationMode = readingLanguage === sourceLanguage ? "original" : "automatic-interface-preview";
    root.dataset.translationReviewed = readingLanguage === sourceLanguage ? "true" : "false";
  };

  discloseCoverage();
  document.addEventListener("vote4gov:languagechange", discloseCoverage);
})();
