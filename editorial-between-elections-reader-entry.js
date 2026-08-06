(() => {
  const normalizedPath = window.location.pathname.replace(/\.html$/, "").replace(/\/$/, "") || "/";

  const installHomeEntry = () => {
    if (normalizedPath !== "/") return;
    const cover = document.querySelector(".cover-main");
    if (!cover || cover.querySelector("[data-reader-entry]")) return;

    const deck = cover.querySelector(".cover-deck");
    if (deck) {
      deck.textContent = "Vielleicht hattest du schon einmal eine Idee für deine Straße, deine Region oder das Land – und wusstest nicht, wo sie ernsthaft geprüft werden kann. Vote4Gov untersucht, warum zwischen einer Beobachtung und einer gemeinsamen Lösung so oft kein sichtbarer Weg liegt.";
    }

    const entry = document.createElement("section");
    entry.className = "reader-entry";
    entry.dataset.readerEntry = "";
    entry.setAttribute("aria-labelledby", "reader-entry-title");
    entry.innerHTML = `
      <p class="reader-entry-kicker">Vielleicht kennst du diesen Gedanken</p>
      <h2 id="reader-entry-title">Das müsste doch besser gehen.</h2>
      <p>Eine bessere Verbindung. Ein sichererer Schulweg. Ein leerstehender Ort, der anders genutzt werden könnte. Eine Regel, die niemand mehr versteht. Vielleicht hast du darüber gesprochen, nach der Zuständigkeit gesucht oder sogar geschrieben.</p>
      <div class="reader-entry-turn" aria-label="Der häufige Weg eines Anliegens">
        <strong>Und dann?</strong>
        <span>Eine Eingangsbestätigung. Ein anderer Ansprechpartner. Ein Formular ohne sichtbaren Verlauf. Oder gar keine Antwort.</span>
      </div>
      <p>Viele Menschen schauen deshalb nur noch zu. Nicht weil ihnen Politik oder ihre Umgebung gleichgültig wären, sondern weil große Versprechen Vertrauen verloren haben und öffentliches Engagement Zeit, Reichweite oder persönliches Risiko kosten kann.</p>
      <blockquote>Was fehlt, ist ein einfacher Weg von der Idee zur gemeinsamen, überprüfbaren Lösung.</blockquote>
    `;

    const byline = cover.querySelector(".journal-byline");
    if (byline) byline.insertAdjacentElement("afterend", entry);
    else if (deck) deck.insertAdjacentElement("afterend", entry);
    else cover.prepend(entry);

    const hookQuestion = cover.querySelector(".hook-question");
    if (hookQuestion) {
      hookQuestion.textContent = "Die Frage ist nicht nur, ob Menschen wählen, schreiben, protestieren oder an einzelnen Verfahren teilnehmen dürfen. Die Frage ist, ob aus einer Beobachtung, einer Idee oder einem Widerspruch ein nachvollziehbarer Weg bis zur begründeten Entscheidung entstehen kann.";
    }

    const betweenElectionsLink = cover.querySelector('a[href="/journal/zwischen-den-wahlen.html"]');
    if (betweenElectionsLink) betweenElectionsLink.textContent = "Den Weg zwischen den Wahlen vertiefen";
  };

  const installArticleEntry = () => {
    if (normalizedPath !== "/journal/zwischen-den-wahlen") return;
    const article = document.querySelector(".article-copy");
    if (!article || article.querySelector("[data-between-elections-reader-entry]")) return;

    const openingQuote = article.querySelector(":scope > blockquote");
    if (!openingQuote) return;

    const section = document.createElement("section");
    section.className = "between-elections-reader-entry";
    section.dataset.betweenElectionsReaderEntry = "";
    section.setAttribute("aria-labelledby", "between-elections-reader-title");
    section.innerHTML = `
      <p class="reader-entry-kicker">Vom Gedanken zur gemeinsamen Lösung</p>
      <h2 id="between-elections-reader-title">Vielleicht hattest du schon einmal eine Idee.</h2>
      <p>Für deine Straße, deine Region oder ein Problem, das längst mehr als einen Ort betrifft. Vielleicht hast du gesucht, wo man darüber abstimmen, Wissen ergänzen oder gemeinsam an einer Lösung arbeiten kann.</p>
      <div class="reader-path-grid">
        <article>
          <span>Was heute möglich ist</span>
          <h3>Schreiben, bitten, protestieren.</h3>
          <p>Du kannst einen Leserbrief verfassen, das Rathaus oder Abgeordnete anschreiben, eine Petition unterstützen, einer Initiative beitreten, demonstrieren oder öffentlich posten.</p>
        </article>
        <article>
          <span>Was selten einfach erreichbar ist</span>
          <h3>Gemeinsam prüfen und weiterarbeiten.</h3>
          <p>Ein Tisch mit Betroffenen, Fachleuten und Verantwortlichen, an dem Zuständigkeit, Quellen, Gegenpositionen, Lösungen und Umsetzung gemeinsam sichtbar werden.</p>
        </article>
      </div>
      <p>Viele Menschen schweigen nicht aus Desinteresse. Sie wissen nicht, was ihr Beitrag bewirkt, haben wenig Zeit oder möchten weder ihren Beruf noch ihre Familie zum Gegenstand einer öffentlichen Auseinandersetzung machen.</p>
      <div class="reader-decision-questions">
        <p class="reader-entry-kicker">Entscheidend ist</p>
        <ul>
          <li>Wie und wo kann ich mein Anliegen zeitsparend und verständlich einbringen?</li>
          <li>Muss ich mich öffentlich exponieren, damit es überhaupt wahrgenommen wird?</li>
          <li>Was bedeutet sichtbares Engagement für Arbeit, Kinder und Familie – und wann greift Schutz?</li>
          <li>Wird das Anliegen tatsächlich aufgenommen und ist erkennbar, wer zuständig ist?</li>
          <li>Wem wird es vorgestellt, wer prüft Quellen und Gegenpositionen und wer entscheidet?</li>
          <li>Erhalte ich eine nachvollziehbare Antwort und kann ich später erkennen, was daraus geworden ist?</li>
        </ul>
      </div>
      <blockquote>Du solltest keine Partei, keine Tausenden Follower und keinen jahrelangen persönlichen Einsatz brauchen, um eine gute Frage stellen und ihren weiteren Weg nachvollziehen zu können.</blockquote>
      <p class="reader-entry-closing">Nicht jede Idee wird umgesetzt. Nicht jeder Vorschlag überzeugt. Aber ein ernsthaftes Anliegen sollte sichtbar aufgenommen, geprüft, beantwortet und bis zu seiner Wirkung verfolgt werden können.</p>
    `;
    openingQuote.insertAdjacentElement("afterend", section);

    const position = article.querySelector(".author-position#position");
    if (position) {
      const heading = position.querySelector("h2");
      const paragraphs = position.querySelectorAll("p");
      if (heading) heading.textContent = "Ich will keine Demokratie permanenter Abstimmungen. Ich will einen sichtbaren Weg zwischen Idee und Entscheidung.";
      if (paragraphs[0]) paragraphs[0].textContent = "Politische Führung, Parlamente, Verwaltung, Expertise und Minderheitenschutz bleiben notwendig. Aber ein System ist nicht allein deshalb offen, weil Menschen wählen, demonstrieren oder ein Formular absenden dürfen.";
      if (paragraphs[1]) paragraphs[1].textContent = "Offen wird es dort, wo ein gewöhnlicher Mensch ein Anliegen ohne besondere Kontakte, große Reichweite oder unangemessenes persönliches Risiko einbringen kann – und anschließend nachvollzieht, wer es geprüft, entschieden, umgesetzt oder begründet abgelehnt hat.";
    }
  };

  const install = () => {
    installHomeEntry();
    installArticleEntry();
  };

  install();
  document.addEventListener("DOMContentLoaded", install, { once: true });
})();
