(() => {
  const home = document.body.classList.contains("journal-home");
  if (!home) return;

  const atlasSection = document.querySelector("#welt");
  if (atlasSection) atlasSection.remove();

  document.querySelectorAll('a[href="#welt"]').forEach((link) => {
    if (link.closest(".journal-nav")) {
      link.remove();
      return;
    }
    link.href = "/journal/geschichte-der-demokratie.html";
    link.textContent = "Demokratiegeschichte lesen";
  });

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

  const dialog = document.createElement("dialog");
  dialog.className = "editorial-access-dialog";
  dialog.setAttribute("aria-labelledby", "editorial-access-title");
  dialog.innerHTML = `
    <div class="editorial-access-shell">
      <div class="editorial-access-topline"><span>Vote4Gov Review · Zugang</span><span>Eine vertraute Unterbrechung</span></div>
      <p class="editorial-access-kicker">Alle Berichte weiterlesen</p>
      <h2 id="editorial-access-title">Dieser Artikel ist nur mit Abo verfügbar.</h2>
      <p class="editorial-access-lead">Eine kurze Vorschau ist in mehreren Sprachen sichtbar. Für den vollständigen Bericht wählen Sie bitte einen Zugang.</p>
      <div class="editorial-language-preview" aria-label="Mehrsprachige Kurzvorschau">
        <article lang="de"><span>Deutsch</span><p>Demokratie verändert sich nicht im Takt eines Nachrichtenzyklus.</p></article>
        <article lang="en"><span>English</span><p>Democracy does not change at the pace of a news cycle.</p></article>
        <article lang="fr"><span>Français</span><p>La démocratie ne suit pas le rythme du cycle médiatique.</p></article>
        <article lang="es"><span>Español</span><p>La democracia no cambia al ritmo de las noticias.</p></article>
        <article lang="tr"><span>Türkçe</span><p>Demokrasi haber döngüsünün hızında değişmez.</p></article>
        <article lang="ar" dir="rtl"><span>العربية</span><p>الديمقراطية لا تتغير وفق إيقاع دورة الأخبار.</p></article>
      </div>
      <div class="editorial-fade-lines" aria-hidden="true"><i></i><i></i><i></i></div>
      <div class="editorial-access-actions" data-access-actions>
        <a class="editorial-access-button primary" href="https://www.voiceopengov.org/" target="_blank" rel="noreferrer">VoiceOpenGov-Mitglied werden</a>
        <button class="editorial-access-button" type="button" data-access-without-subscription>Ohne Abo weiterlesen</button>
      </div>
      <p class="editorial-access-fineprint">Keine Zahlung und keine Registrierung sind erforderlich. Diese Abfrage ist eine redaktionelle Demonstration.</p>
      <div class="editorial-access-reveal" data-access-reveal hidden>
        <h3>Kommt Ihnen diese Unterbrechung bekannt vor?</h3>
        <p><strong>Gesellschaftlich relevantes Wissen sollte nicht hinter einer künstlichen Zugangsschranke enden.</strong> Mitgliedschaften können unabhängige Arbeit finanzieren. Der Zugang zu Quellen, Einordnung und demokratisch relevanten Informationen darf davon aber nicht abhängig sein.</p>
        <p>Unser Angebot ist für VoiceOpenGov-Mitglieder kostenfrei – und für alle anderen ebenfalls. Mitgliedschaft bedeutet Mitwirkung und Unterstützung, nicht das Freikaufen von Wissen.</p>
        <div class="editorial-access-actions"><button class="editorial-access-button primary" type="button" data-access-continue>Kostenfrei weiterlesen</button></div>
      </div>
    </div>`;
  document.body.appendChild(dialog);

  const privacy = document.createElement("aside");
  privacy.className = "editorial-privacy-sheet";
  privacy.hidden = true;
  privacy.setAttribute("role", "dialog");
  privacy.setAttribute("aria-labelledby", "editorial-privacy-title");
  privacy.innerHTML = `
    <div class="editorial-privacy-grid">
      <div>
        <span>Datenschutz statt Einwilligungsroutine</span>
        <h2 id="editorial-privacy-title">Keine Cookie-Zustimmung nötig.</h2>
        <p>Diese statische Vote4Gov-Ausgabe setzt keine Analyse-, Werbe- oder Tracking-Cookies ein, erstellt keine Verhaltensprofile und verkauft keine Nutzungsdaten. Technisch notwendige Hosting- und Sicherheitsdaten können anfallen und werden transparent beschrieben.</p>
        <p>Nicht notwendige Datennutzung soll nicht durch voreingestellte Banner normalisiert werden. Sie braucht eine getrennte, konkrete und aktive Einwilligung, die ebenso einfach widerrufen werden kann.</p>
        <div class="editorial-privacy-actions">
          <a href="https://www.voiceopengov.org/datenschutz" target="_blank" rel="noreferrer">Datenschutz prüfen</a>
          <button type="button" data-privacy-close>Weiterlesen</button>
        </div>
      </div>
      <button class="editorial-privacy-close" type="button" aria-label="Datenschutzhinweis schließen" data-privacy-close>×</button>
    </div>`;
  document.body.appendChild(privacy);

  const showPrivacy = () => {
    privacy.hidden = false;
    privacy.querySelector("[data-privacy-close]")?.focus();
  };

  dialog.querySelector("[data-access-without-subscription]")?.addEventListener("click", () => {
    dialog.querySelector("[data-access-actions]")?.setAttribute("hidden", "");
    dialog.querySelector("[data-access-reveal]")?.removeAttribute("hidden");
    dialog.querySelector("[data-access-continue]")?.focus();
  });

  dialog.querySelector("[data-access-continue]")?.addEventListener("click", () => {
    dialog.close();
    window.setTimeout(showPrivacy, 180);
  });

  privacy.querySelectorAll("[data-privacy-close]").forEach((button) => {
    button.addEventListener("click", () => { privacy.hidden = true; });
  });

  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    dialog.close();
    window.setTimeout(showPrivacy, 180);
  });

  window.setTimeout(() => {
    if (typeof dialog.showModal === "function") dialog.showModal();
  }, 350);
})();
