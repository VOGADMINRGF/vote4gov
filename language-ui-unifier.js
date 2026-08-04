(() => {
  const enforceSingleLanguageUi = () => {
    document.querySelectorAll(".v4g-language-trigger").forEach((trigger) => trigger.remove());
    const control = document.querySelector(".global-language-control");
    if (!control) return;
    control.hidden = false;
    control.removeAttribute("aria-hidden");
    control.removeAttribute("data-language-state-bridge");
    control.setAttribute("data-language-ui", "canonical");
  };

  enforceSingleLanguageUi();
  const observer = new MutationObserver(enforceSingleLanguageUi);
  observer.observe(document.body, { childList: true, subtree: true });
  document.addEventListener("vote4gov:languagechange", () => queueMicrotask(enforceSingleLanguageUi));
})();
