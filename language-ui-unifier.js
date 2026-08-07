(() => {
  let moving = false;

  const enforceSingleLanguageUi = () => {
    if (moving) return;
    moving = true;
    try {
      document.querySelectorAll(".v4g-language-trigger").forEach((trigger) => trigger.remove());
      document.querySelectorAll("[data-language-placeholder]").forEach((placeholder) => placeholder.remove());

      const controls = [...document.querySelectorAll(".global-language-control")];
      controls.slice(1).forEach((control) => control.remove());
      const control = controls[0];
      if (!control) return;

      control.hidden = false;
      control.removeAttribute("aria-hidden");
      control.removeAttribute("data-language-state-bridge");
      control.setAttribute("data-language-ui", "canonical");
      control.classList.remove("mobile-sticky");
      control.classList.add("in-sticky-nav");

      const nav = document.querySelector(".journal-nav-inner");
      if (nav && control.parentElement !== nav) nav.appendChild(control);
      else if (!nav && control.parentElement !== document.body) document.body.appendChild(control);
    } finally {
      moving = false;
    }
  };

  enforceSingleLanguageUi();
  const observer = new MutationObserver(enforceSingleLanguageUi);
  observer.observe(document.body, { childList: true, subtree: true });
  document.addEventListener("vote4gov:languagechange", () => queueMicrotask(enforceSingleLanguageUi));
})();
