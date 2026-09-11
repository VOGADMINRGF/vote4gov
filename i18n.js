(() => {
  const SUPPORTED = [
    ["de", "Deutsch"], ["en", "English"], ["fr", "Français"], ["es", "Español"],
    ["it", "Italiano"], ["pt", "Português"], ["nl", "Nederlands"], ["pl", "Polski"],
    ["cs", "Čeština"], ["sk", "Slovenčina"], ["hu", "Magyar"], ["ro", "Română"],
    ["bg", "Български"], ["hr", "Hrvatski"], ["sl", "Slovenščina"], ["el", "Ελληνικά"],
    ["sv", "Svenska"], ["da", "Dansk"], ["fi", "Suomi"], ["et", "Eesti"],
    ["lv", "Latviešu"], ["lt", "Lietuvių"], ["ga", "Gaeilge"], ["mt", "Malti"],
    ["uk", "Українська"], ["tr", "Türkçe"], ["ar", "العربية"]
  ];

  const DEFAULT = "de";
  const RTL = new Set(["ar"]);
  const storageKey = "vote4gov-language";

  const lookup = (obj, path) => path.split(".").reduce((value, key) => value?.[key], obj);
  const normalize = (value) => {
    const code = String(value || "").toLowerCase().split("-")[0];
    return SUPPORTED.some(([supported]) => supported === code) ? code : null;
  };

  const resolveLanguage = () => {
    const url = new URL(window.location.href);
    return normalize(url.searchParams.get("lang"))
      || normalize(localStorage.getItem(storageKey))
      || normalize(navigator.languages?.[0] || navigator.language)
      || DEFAULT;
  };

  const loadCatalog = async () => {
    const response = await fetch("/locales/catalog.json", { cache: "no-cache" });
    if (!response.ok) throw new Error(`i18n catalog: ${response.status}`);
    return response.json();
  };

  const apply = (catalog, lang) => {
    const fallback = catalog[DEFAULT] || {};
    const active = catalog[lang] || fallback;
    const get = (key) => lookup(active, key) ?? lookup(fallback, key);

    document.documentElement.lang = lang;
    document.documentElement.dir = RTL.has(lang) ? "rtl" : "ltr";
    document.body?.classList.toggle("is-rtl", RTL.has(lang));

    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const value = get(node.dataset.i18n);
      if (typeof value === "string") node.textContent = value;
    });
    document.querySelectorAll("[data-i18n-html]").forEach((node) => {
      const value = get(node.dataset.i18nHtml);
      if (typeof value === "string") node.innerHTML = value;
    });
    document.querySelectorAll("[data-i18n-alt]").forEach((node) => {
      const value = get(node.dataset.i18nAlt);
      if (typeof value === "string") node.setAttribute("alt", value);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((node) => {
      const value = get(node.dataset.i18nAria);
      if (typeof value === "string") node.setAttribute("aria-label", value);
    });

    const title = get("meta.title");
    const description = get("meta.description");
    if (title) document.title = title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && description) metaDescription.setAttribute("content", description);

    const url = new URL(window.location.href);
    if (lang === DEFAULT) url.searchParams.delete("lang");
    else url.searchParams.set("lang", lang);
    history.replaceState({}, "", url);
    localStorage.setItem(storageKey, lang);
  };

  const mountSwitcher = (catalog, lang) => {
    document.querySelectorAll("[data-language-switcher]").forEach((host) => {
      host.innerHTML = "";
      const label = document.createElement("label");
      label.className = "language-switcher";
      const sr = document.createElement("span");
      sr.className = "sr-only";
      sr.textContent = "Language";
      const select = document.createElement("select");
      select.setAttribute("aria-label", "Language");
      SUPPORTED.forEach(([code, name]) => {
        const option = document.createElement("option");
        option.value = code;
        option.textContent = name;
        option.selected = code === lang;
        select.append(option);
      });
      select.addEventListener("change", () => {
        const next = select.value;
        apply(catalog, next);
        document.querySelectorAll("[data-language-switcher] select").forEach((other) => { other.value = next; });
      });
      label.append(sr, select);
      host.append(label);
    });
  };

  const init = async () => {
    const hasTranslatableContent = document.querySelector("[data-i18n],[data-i18n-html],[data-i18n-alt],[data-i18n-aria]");
    if (!hasTranslatableContent) return;
    try {
      const catalog = await loadCatalog();
      const lang = resolveLanguage();
      apply(catalog, lang);
      mountSwitcher(catalog, lang);
    } catch (error) {
      console.warn("Vote4Gov i18n fallback to German", error);
    }
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
