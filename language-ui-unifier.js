(() => {
  const config = globalThis.Vote4GovConfig;
  const issue = config?.issue?.number || "01";

  const unify = () => {
    const legacy = document.querySelector(".global-language-control");
    if (legacy) {
      legacy.hidden = true;
      legacy.setAttribute("aria-hidden", "true");
      legacy.setAttribute("data-language-state-bridge", "true");
    }

    const triggers = [...document.querySelectorAll(".v4g-language-trigger")];
    triggers.slice(1).forEach((trigger) => trigger.remove());
    const trigger = triggers[0];
    if (trigger) {
      trigger.dataset.languageUi = "canonical";
      trigger.setAttribute("data-language-ui", "canonical");
      trigger.setAttribute("aria-controls", "v4g-language-dialog");
      if (!trigger.textContent?.includes(issue)) {
        const code = document.documentElement.dataset.readingLanguage || config?.language?.source || "de";
        trigger.innerHTML = `<span aria-hidden="true">🌐</span><strong>${code.toUpperCase()}</strong><span>· ${issue}</span>`;
      }
    }

    const dialog = document.querySelector(".v4g-language-dialog");
    if (dialog && !dialog.id) dialog.id = "v4g-language-dialog";
  };

  unify();
  const observer = new MutationObserver(unify);
  observer.observe(document.body, { childList: true, subtree: true });
  document.addEventListener("vote4gov:languagechange", () => queueMicrotask(unify));
})();
