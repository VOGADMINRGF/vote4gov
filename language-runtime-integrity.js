(() => {
  const STORAGE_KEY = "vote4gov:language:v1";
  const SOURCE_LANGUAGE = "de";
  const META = {
    de: { name:"Deutsch",dir:"ltr",issue:"Ausgabe 01",access:"Freier Zugang",privacy:"Datenschutz & Speicher",privacyInside:"Datenschutz transparent prüfen",privacyKicker:"Datenschutz statt Einwilligungsroutine",ai:"KI-generierter Text · redaktionell verantwortete deutsche Originalfassung" },
    en: { name:"English",dir:"ltr",issue:"Issue 01",access:"Free access",privacy:"Privacy & storage",privacyInside:"Review privacy transparently",privacyKicker:"Privacy instead of consent routines",ai:"AI-generated text · automatically translated from German into English · translation not editorially reviewed" },
    fr: { name:"Français",dir:"ltr",issue:"Édition 01",access:"Accès libre",privacy:"Confidentialité et stockage",privacyInside:"Consulter la confidentialité",privacyKicker:"La confidentialité sans automatisme de consentement",ai:"Texte généré par IA · traduit automatiquement de l’allemand vers le français · traduction non relue par la rédaction" },
    es: { name:"Español",dir:"ltr",issue:"Edición 01",access:"Acceso libre",privacy:"Privacidad y almacenamiento",privacyInside:"Revisar la privacidad",privacyKicker:"Privacidad en lugar de rutinas de consentimiento",ai:"Texto generado por IA · traducido automáticamente del alemán al español · traducción no revisada editorialmente" },
    tr: { name:"Türkçe",dir:"ltr",issue:"Sayı 01",access:"Ücretsiz erişim",privacy:"Gizlilik ve depolama",privacyInside:"Gizliliği şeffafça incele",privacyKicker:"Onay rutini yerine gizlilik",ai:"Yapay zekâ tarafından üretilen metin · Almancadan Türkçeye otomatik çevrildi · editoryal olarak incelenmedi" },
    ar: { name:"العربية",dir:"rtl",issue:"العدد 01",access:"وصول مجاني",privacy:"الخصوصية والتخزين",privacyInside:"مراجعة الخصوصية بشفافية",privacyKicker:"الخصوصية بدلاً من روتين الموافقة",ai:"نص مولّد بالذكاء الاصطناعي · تُرجم آلياً من الألمانية إلى العربية · لم تراجعه هيئة التحرير" },
    it: { name:"Italiano",dir:"ltr",issue:"Edizione 01",access:"Accesso libero",privacy:"Privacy e archiviazione",privacyInside:"Consulta la privacy",privacyKicker:"Privacy invece di consensi automatici",ai:"Testo generato con IA · tradotto automaticamente dal tedesco all’italiano · traduzione non revisionata dalla redazione" },
    pt: { name:"Português",dir:"ltr",issue:"Edição 01",access:"Acesso livre",privacy:"Privacidade e armazenamento",privacyInside:"Consultar privacidade",privacyKicker:"Privacidade em vez de rotinas de consentimento",ai:"Texto gerado por IA · traduzido automaticamente do alemão para português · tradução sem revisão editorial" },
    nl: { name:"Nederlands",dir:"ltr",issue:"Editie 01",access:"Vrije toegang",privacy:"Privacy en opslag",privacyInside:"Privacy transparant bekijken",privacyKicker:"Privacy in plaats van toestemmingsroutines",ai:"Door AI gegenereerde tekst · automatisch uit het Duits naar het Nederlands vertaald · niet redactioneel beoordeeld" },
    pl: { name:"Polski",dir:"ltr",issue:"Wydanie 01",access:"Bezpłatny dostęp",privacy:"Prywatność i pamięć",privacyInside:"Sprawdź prywatność",privacyKicker:"Prywatność zamiast rutynowej zgody",ai:"Tekst wygenerowany przez AI · automatycznie przetłumaczony z niemieckiego na polski · bez redakcyjnej weryfikacji" },
    uk: { name:"Українська",dir:"ltr",issue:"Випуск 01",access:"Вільний доступ",privacy:"Приватність і зберігання",privacyInside:"Переглянути приватність",privacyKicker:"Приватність замість формальної згоди",ai:"Текст створено за допомогою ШІ · автоматично перекладено з німецької українською · редакційно не перевірено" },
    zh: { name:"中文",dir:"ltr",issue:"第 01 期",access:"免费访问",privacy:"隐私与存储",privacyInside:"透明查看隐私说明",privacyKicker:"以隐私取代例行同意",ai:"人工智能生成文本 · 由德语自动翻译为中文 · 未经编辑审核" },
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

  const setVisualAndAccessibleLabel = (selector, value) => {
    document.querySelectorAll(selector).forEach((element) => {
      element.dataset.localizedCopy = value;
      element.setAttribute("aria-label", value);
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
    setVisualAndAccessibleLabel(".editorial-access-topline span:first-child", `Vote4Gov Review · ${meta.issue} · ${meta.access}`);
    setVisualAndAccessibleLabel("[data-issue-number]", meta.issue);
    setVisualAndAccessibleLabel("[data-ai-translation-disclosure]", meta.ai);
    setVisualAndAccessibleLabel(".editorial-privacy-grid > div:first-child > span", meta.privacyKicker);

    const select = document.querySelector("[data-global-language-control] select");
    if (select) select.setAttribute("aria-label", `${meta.name} · ${meta.issue}`);

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
