(() => {
  let moving = false;
  const mobileQuery = window.matchMedia("(max-width: 760px)");

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

      const nav = document.querySelector(".journal-nav");
      const navInner = nav?.querySelector(".journal-nav-inner");
      const menuButton = nav?.querySelector("[data-journal-menu-button]");

      if (mobileQuery.matches && nav) {
        control.classList.remove("in-sticky-nav");
        control.classList.add("mobile-nav-language");
        if (control.parentElement !== nav) {
          if (menuButton) menuButton.insertAdjacentElement("afterend", control);
          else nav.appendChild(control);
        }
      } else {
        control.classList.remove("mobile-nav-language");
        control.classList.add("in-sticky-nav");
        if (navInner && control.parentElement !== navInner) navInner.appendChild(control);
        else if (!navInner && control.parentElement !== document.body) document.body.appendChild(control);
      }
    } finally {
      moving = false;
    }
  };

  enforceSingleLanguageUi();
  const observer = new MutationObserver(enforceSingleLanguageUi);
  observer.observe(document.body, { childList: true, subtree: true });
  document.addEventListener("vote4gov:languagechange", () => queueMicrotask(enforceSingleLanguageUi));
  mobileQuery.addEventListener?.("change", enforceSingleLanguageUi);
})();
