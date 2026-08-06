(() => {
  const home = document.body.classList.contains("journal-home");
  if (!home) return;

  document.querySelectorAll("[data-edebatte-qr]").forEach((button) => {
    const replacement = button.cloneNode(true);
    replacement.removeAttribute("data-edebatte-qr");
    replacement.dataset.copyEdebateLink = "";
    replacement.innerHTML = "Link kopieren";
    replacement.setAttribute("aria-label", "eDebatte-Link kopieren");
    button.replaceWith(replacement);
    replacement.addEventListener("click", async () => {
      const link = replacement.parentElement?.querySelector("a.edebatte-link");
      if (!link) return;
      try {
        await navigator.clipboard.writeText(link.href);
        replacement.textContent = "Link kopiert";
      } catch {
        window.open(link.href, "_blank", "noopener,noreferrer");
      }
    });
  });

  const previews = {
    de: {
      flag: "🇩🇪",
      label: "Deutsch",
      lang: "de",
      dir: "ltr",
      title: "Unsere Gesellschaft verändert sich jeden Tag. Warum darf sie politisch meist nur alle paar Jahre antworten?",
      paragraphs: [
        "Wir wählen politische Gesamtpakete, reagieren auf vorgegebene Fragen und erfahren gesellschaftliche Stimmung über Schlagzeilen und begrenzte Stichproben.",
        "Vote4Gov untersucht, wie diese Ordnung entstanden ist, was sie geleistet hat und weshalb demokratische Rückkopplung heute weiterentwickelt werden muss.",
        "Die Frage ist nicht, ob Parlamente, Medien oder Umfragen verschwinden sollen, sondern warum sie fast allein bestimmen, wie gesellschaftlicher Wille sichtbar wird.",
      ],
    },
    en: {
      flag: "🇬🇧",
      label: "English",
      lang: "en",
      dir: "ltr",
      title: "Society changes every day. Why can it usually answer politically only every few years?",
      paragraphs: [
        "We elect political packages, respond to predefined questions and learn about public sentiment through headlines and limited samples.",
        "Vote4Gov examines how this order emerged, what it has achieved and why democratic feedback must now evolve further.",
        "The question is not whether parliaments, media or polls should disappear, but why they almost alone determine how public will becomes visible.",
      ],
    },
    fr: {
      flag: "🇫🇷",
      label: "Français",
      lang: "fr",
      dir: "ltr",
      title: "Notre société change chaque jour. Pourquoi ne peut-elle répondre politiquement que tous les quelques années ?",
      paragraphs: [
        "Nous élisons des ensembles politiques, répondons à des questions prédéfinies et découvrons l’opinion publique à travers des titres et des échantillons limités.",
        "Vote4Gov étudie l’origine de cet ordre, ses acquis et les raisons pour lesquelles la rétroaction démocratique doit aujourd’hui évoluer.",
        "La question n’est pas de supprimer les parlements, les médias ou les sondages, mais de comprendre pourquoi ils déterminent presque seuls la visibilité de la volonté collective.",
      ],
    },
    es: {
      flag: "🇪🇸",
      label: "Español",
      lang: "es",
      dir: "ltr",
      title: "Nuestra sociedad cambia cada día. ¿Por qué políticamente solo puede responder cada varios años?",
      paragraphs: [
        "Elegimos paquetes políticos, respondemos a preguntas predeterminadas y conocemos el estado de ánimo social mediante titulares y muestras limitadas.",
        "Vote4Gov analiza cómo surgió este orden, qué ha logrado y por qué la retroalimentación democrática debe seguir evolucionando.",
        "La cuestión no es eliminar parlamentos, medios o encuestas, sino entender por qué casi solo ellos determinan cómo se hace visible la voluntad social.",
      ],
    },
    tr: {
      flag: "🇹🇷",
      label: "Türkçe",
      lang: "tr",
      dir: "ltr",
      title: "Toplumumuz her gün değişiyor. Neden siyaseten çoğunlukla yalnızca birkaç yılda bir yanıt verebiliyor?",
      paragraphs: [
        "Siyasi paketleri seçiyor, önceden belirlenmiş sorulara yanıt veriyor ve toplumsal eğilimleri manşetler ile sınırlı örneklemler üzerinden öğreniyoruz.",
        "Vote4Gov bu düzenin nasıl oluştuğunu, ne başardığını ve demokratik geri bildirimin neden bugün geliştirilmesi gerektiğini inceliyor.",
        "Soru parlamentoların, medyanın ya da anketlerin ortadan kalkması değil; toplumsal iradenin görünürlüğünü neden neredeyse yalnızca onların belirlediğidir.",
      ],
    },
    ar: {
      flag: "🌍",
      label: "العربية",
      lang: "ar",
      dir: "rtl",
      title: "يتغير مجتمعنا كل يوم. فلماذا لا يستطيع التعبير سياسياً إلا مرة كل بضع سنوات؟",
      paragraphs: [
        "ننتخب حزمًا سياسية، ونجيب عن أسئلة محددة مسبقًا، ونتعرف إلى المزاج العام عبر العناوين والعينات المحدودة.",
        "يفحص Vote4Gov كيف نشأ هذا النظام، وما الذي حققه، ولماذا ينبغي تطوير آليات التغذية الراجعة الديمقراطية اليوم.",
        "السؤال ليس ما إذا كان ينبغي أن تختفي البرلمانات أو وسائل الإعلام أو الاستطلاعات، بل لماذا تكاد وحدها تحدد كيف تصبح الإرادة المجتمعية مرئية.",
      ],
    },
  };

  const dialog = document.createElement("dialog");
  dialog.id = "editorial-access-dialog";
  dialog.className = "editorial-access-dialog";
  dialog.setAttribute("aria-labelledby", "editorial-access-title");
  dialog.innerHTML = `
    <div class="editorial-access-shell">
      <button class="editorial-access-close" type="button" aria-label="Hinweis schließen" data-access-close>×</button>
      <div class="editorial-access-topline"><span>Vote4Gov Review · Freier Zugang</span><span>Lesesprache wählen</span></div>

      <section class="editorial-access-stage" data-access-stage="preview">
        <p class="editorial-access-kicker">Vollständigen Beitrag öffnen</p>
        <h2 id="editorial-access-title">Wie möchten Sie weiterlesen?</h2>
        <p class="editorial-access-lead">Wählen Sie Ihre Lesesprache. Die vollständige Analyse bleibt für alle Menschen frei zugänglich.</p>

        <div class="editorial-language-switch" role="tablist" aria-label="Sprache der Artikelvorschau wählen" data-language-switch></div>

        <article class="editorial-preview-card" id="editorial-preview" role="tabpanel" aria-live="polite" data-preview-card>
          <div class="editorial-preview-meta"><span data-preview-kicker>Titelgeschichte</span><span>8 Minuten</span><span>Quellenoffen</span></div>
          <h3 data-preview-title></h3>
          <div class="editorial-preview-copy" data-preview-copy></div>
        </article>

        <div class="editorial-access-actions">
          <button class="editorial-access-button primary" type="button" data-access-free>Kostenfrei weiterlesen</button>
          <a class="editorial-access-button" href="https://www.voiceopengov.org/" target="_blank" rel="noreferrer">VoiceOpenGov-Mitglied werden und mitgestalten</a>
          <button class="editorial-access-button" type="button" data-privacy-open>Datenschutz transparent prüfen</button>
        </div>
        <p class="editorial-access-fineprint">Keine Zahlung und keine Registrierung sind erforderlich. Mitgliedschaft unterstützt die Arbeit, schaltet aber kein Wissen frei.</p>
      </section>

      <section class="editorial-access-stage editorial-access-reveal" data-access-stage="reveal" hidden>
        <p class="editorial-access-kicker">Die eigentliche Frage</p>
        <h2>Kommt Ihnen diese Abfrage bekannt vor?</h2>
        <p><strong>Gesellschaftlich relevantes Wissen sollte nicht an eine künstliche Zugangsschranke gebunden sein.</strong> Aufwendige redaktionelle Arbeit braucht Finanzierung. Quellen, Einordnung und demokratisch wichtige Informationen sollten dennoch nicht ausschließlich zahlenden Nutzerinnen und Nutzern offenstehen.</p>
        <p>Vote4Gov bleibt deshalb für alle frei. Eine VoiceOpenGov-Mitgliedschaft bedeutet Unterstützung und Mitwirkung – nicht das Freikaufen von Informationen.</p>
        <div class="editorial-access-actions">
          <button class="editorial-access-button primary" type="button" data-access-continue>Beitrag vollständig öffnen</button>
          <a class="editorial-access-button" href="https://www.voiceopengov.org/" target="_blank" rel="noreferrer">Mitglied werden und mitgestalten</a>
          <button class="editorial-access-button" type="button" data-privacy-open>Datenschutz transparent prüfen</button>
        </div>
      </section>
    </div>`;
  document.body.appendChild(dialog);

  const triggerHost = document.querySelector(".cover-story .journal-actions");
  let accessTrigger = null;
  let privacyTrigger = null;
  if (triggerHost) {
    accessTrigger = document.createElement("button");
    accessTrigger.type = "button";
    accessTrigger.className = "journal-button editorial-access-trigger";
    accessTrigger.dataset.accessOpen = "";
    accessTrigger.setAttribute("aria-haspopup", "dialog");
    accessTrigger.setAttribute("aria-controls", dialog.id);
    accessTrigger.textContent = "Freier Zugang & Mitgliedschaft";
    triggerHost.appendChild(accessTrigger);

    privacyTrigger = document.createElement("button");
    privacyTrigger.type = "button";
    privacyTrigger.className = "journal-button editorial-access-trigger";
    privacyTrigger.dataset.privacyOpen = "";
    privacyTrigger.setAttribute("aria-controls", "editorial-privacy-sheet");
    privacyTrigger.setAttribute("aria-expanded", "false");
    privacyTrigger.textContent = "Datenschutz & Speicher";
    triggerHost.appendChild(privacyTrigger);
  }

  const languageSwitch = dialog.querySelector("[data-language-switch]");
  const previewCard = dialog.querySelector("[data-preview-card]");
  const previewTitle = dialog.querySelector("[data-preview-title]");
  const previewCopy = dialog.querySelector("[data-preview-copy]");

  const setLanguage = (code, { focus = false } = {}) => {
    const preview = previews[code] || previews.de;
    previewCard.lang = preview.lang;
    previewCard.dir = preview.dir;
    previewTitle.textContent = preview.title;
    previewCopy.replaceChildren(...preview.paragraphs.map((text) => {
      const paragraph = document.createElement("p");
      paragraph.textContent = text;
      return paragraph;
    }));

    languageSwitch.querySelectorAll("button").forEach((button) => {
      const active = button.dataset.language === code;
      button.setAttribute("aria-selected", String(active));
      button.tabIndex = active ? 0 : -1;
      if (active && focus) button.focus();
    });
  };

  Object.entries(previews).forEach(([code, preview], index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.role = "tab";
    button.dataset.language = code;
    button.setAttribute("aria-controls", "editorial-preview");
    button.setAttribute("aria-selected", "false");
    button.tabIndex = index === 0 ? 0 : -1;
    button.textContent = `${preview.flag} ${preview.label}`;
    button.addEventListener("click", () => setLanguage(code));
    button.addEventListener("keydown", (event) => {
      const buttons = [...languageSwitch.querySelectorAll("button")];
      const current = buttons.indexOf(button);
      let next;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (current + 1) % buttons.length;
      else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (current - 1 + buttons.length) % buttons.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = buttons.length - 1;
      else return;
      event.preventDefault();
      setLanguage(buttons[next].dataset.language, { focus: true });
    });
    languageSwitch.appendChild(button);
  });

  const browserLanguage = (navigator.language || "de").toLowerCase().split("-")[0];
  setLanguage(previews[browserLanguage] ? browserLanguage : "de");

  const privacy = document.createElement("aside");
  privacy.id = "editorial-privacy-sheet";
  privacy.className = "editorial-privacy-sheet";
  privacy.hidden = true;
  privacy.setAttribute("role", "region");
  privacy.setAttribute("aria-labelledby", "editorial-privacy-title");
  privacy.innerHTML = `
    <div class="editorial-privacy-grid">
      <div>
        <span>Datenschutz statt Einwilligungsroutine</span>
        <h2 id="editorial-privacy-title">Keine Tracking-Einwilligung erforderlich.</h2>
        <p>Diese statische Vote4Gov-Ausgabe setzt keine Analyse-, Werbe- oder Tracking-Cookies ein, erstellt keine Verhaltensprofile und verkauft keine Nutzungsdaten. Technisch notwendige Hosting- und Sicherheitsdaten können anfallen und werden transparent beschrieben.</p>
        <p>Nicht notwendige Datennutzung braucht eine getrennte, konkrete und aktive Einwilligung, die ebenso einfach widerrufen werden kann.</p>
        <div class="editorial-privacy-actions">
          <a href="https://www.voiceopengov.org/datenschutz" target="_blank" rel="noreferrer">Datenschutz prüfen</a>
          <button type="button" data-privacy-close>Weiterlesen</button>
        </div>
      </div>
      <button class="editorial-privacy-close" type="button" aria-label="Datenschutzhinweis schließen" data-privacy-close>×</button>
    </div>`;
  document.body.appendChild(privacy);

  let privacyReturnFocus = privacyTrigger;

  const closeAccess = () => {
    if (dialog.open) dialog.close();
  };

  const showPrivacy = (trigger = privacyTrigger || accessTrigger) => {
    privacyReturnFocus = trigger || privacyTrigger || accessTrigger;
    privacy.hidden = false;
    privacyTrigger?.setAttribute("aria-expanded", "true");
    privacy.querySelector("[data-privacy-close]")?.focus();
  };

  const hidePrivacy = ({ restoreFocus = true } = {}) => {
    if (privacy.hidden) return;
    privacy.hidden = true;
    privacyTrigger?.setAttribute("aria-expanded", "false");
    if (restoreFocus && privacyReturnFocus instanceof HTMLElement) privacyReturnFocus.focus();
  };

  dialog.querySelector("[data-access-free]")?.addEventListener("click", () => {
    dialog.querySelector('[data-access-stage="preview"]')?.setAttribute("hidden", "");
    dialog.querySelector('[data-access-stage="reveal"]')?.removeAttribute("hidden");
    dialog.querySelector("[data-access-continue]")?.focus();
  });

  dialog.querySelector("[data-access-continue]")?.addEventListener("click", closeAccess);
  dialog.querySelector("[data-access-close]")?.addEventListener("click", closeAccess);

  dialog.querySelectorAll("[data-privacy-open]").forEach((button) => {
    button.addEventListener("click", () => {
      closeAccess();
      requestAnimationFrame(() => showPrivacy(privacyTrigger || accessTrigger));
    });
  });

  privacyTrigger?.addEventListener("click", () => {
    if (privacy.hidden) showPrivacy(privacyTrigger);
    else hidePrivacy();
  });

  privacy.querySelectorAll("[data-privacy-close]").forEach((button) => {
    button.addEventListener("click", () => hidePrivacy());
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || privacy.hidden) return;
    event.preventDefault();
    hidePrivacy();
  });

  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeAccess();
  });

  accessTrigger?.addEventListener("click", () => {
    hidePrivacy({ restoreFocus: false });
    dialog.querySelector('[data-access-stage="preview"]')?.removeAttribute("hidden");
    dialog.querySelector('[data-access-stage="reveal"]')?.setAttribute("hidden", "");
    if (typeof dialog.showModal === "function") dialog.showModal();
  });
})();
