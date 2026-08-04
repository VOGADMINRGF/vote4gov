(() => {
  const mobileQuery = matchMedia("(max-width:760px)");
  let moving = false;

  const enforceSingleLanguageUi = () => {
    if (moving) return;
    moving = true;
    try {
      document.querySelectorAll(".v4g-language-trigger").forEach((trigger) => trigger.remove());

      const controls = [...document.querySelectorAll(".global-language-control:not([data-language-placeholder])")];
      controls.slice(1).forEach((control) => control.remove());
      const control = controls[0];
      if (!control) return;

      control.hidden = false;
      control.removeAttribute("aria-hidden");
      control.removeAttribute("data-language-state-bridge");
      control.setAttribute("data-language-ui", "canonical");

      const top = document.querySelector(".journal-topline");
      if (mobileQuery.matches) {
        if (top && !top.querySelector("[data-language-placeholder]")) {
          const placeholder = document.createElement("span");
          placeholder.hidden = true;
          placeholder.dataset.globalLanguageControl = "";
          placeholder.dataset.languagePlaceholder = "";
          placeholder.setAttribute("aria-hidden", "true");
          top.appendChild(placeholder);
        }
        control.classList.add("mobile-floating");
        if (control.parentElement !== document.body) document.body.appendChild(control);
      } else {
        document.querySelectorAll("[data-language-placeholder]").forEach((placeholder) => placeholder.remove());
        control.classList.remove("mobile-floating");
        if (top && control.parentElement !== top) top.appendChild(control);
      }
    } finally {
      moving = false;
    }
  };

  enforceSingleLanguageUi();
  const observer = new MutationObserver(enforceSingleLanguageUi);
  observer.observe(document.body, { childList: true, subtree: true });
  mobileQuery.addEventListener?.("change", enforceSingleLanguageUi);
  document.addEventListener("vote4gov:languagechange", () => queueMicrotask(enforceSingleLanguageUi));
})();
