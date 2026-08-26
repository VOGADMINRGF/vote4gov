(() => {
  const cover = document.querySelector(".cover-story#leitfrage");
  if (!cover || document.querySelector("[data-system-question-foundation]")) return;

  const section = document.createElement("section");
  section.className = "system-question-foundation";
  section.id = "systemfrage";
  section.dataset.systemQuestionFoundation = "";
  section.innerHTML = `
    <div class="journal-shell">
      <p class="system-question-kicker">Systemfrage · Demokratie weiterdenken</p>
      <h2>Vielleicht brauchen wir keine neue Ideologie. Vielleicht brauchen wir eine neue Art, Demokratie zu organisieren.</h2>
      <p class="system-question-lead">Vote4Gov untersucht nicht, wie Demokratie ersetzt werden soll. Die offene Frage ist, ob die heute weltweit verbreiteten Verfahren von Repräsentation, Parteien, periodischen Wahlen und punktueller Beteiligung bereits die bestmögliche Form demokratischer Selbstregierung im 21. Jahrhundert darstellen – oder ob Demokratie selbst weiterentwickelt werden muss.</p>

      <div class="system-question-grid" role="list" aria-label="Vier Grundfragen zur demokratischen Systementwicklung">
        <article role="listitem"><span>01 · Begriff</span><h3>Was meinen wir heute überhaupt mit Demokratie?</h3><p>Grundrechte, Rechtsstaat, Wahlen, Repräsentation, Mehrheiten, Minderheitenschutz und Beteiligung gehören zusammen – sind aber nicht dasselbe.</p></article>
        <article role="listitem"><span>02 · Organisation</span><h3>Muss demokratische Willensbildung dauerhaft über Parteien organisiert sein?</h3><p>Parteien erfüllen zentrale Funktionen. Vote4Gov prüft trotzdem, welche anderen Formen ergänzen können, ohne Verantwortung oder Rechtsstaatlichkeit aufzulösen.</p></article>
        <article role="listitem"><span>03 · Zeit</span><h3>Warum bleibt politische Rückbindung periodisch, obwohl Gesellschaft dauerhaft vernetzt ist?</h3><p>Digitale Kommunikation schafft keine gute Demokratie automatisch. Sie verändert aber die Voraussetzungen, unter denen seltene Rückkopplung früher technisch notwendig erschien.</p></article>
        <article role="listitem"><span>04 · Entscheidung</span><h3>Wie werden aus Beteiligung nachvollziehbare Entscheidungen statt nur mehr Meinungen?</h3><p>Quellen, Gegenpositionen, Zielkonflikte, Zuständigkeit, Folgen und Verantwortlichkeit müssen sichtbar bleiben – auch wenn das Ergebnis unbequem ist.</p></article>
      </div>

      <div class="system-question-principle">Nicht Demokratie abschaffen. Demokratie überprüfbar weiterentwickeln.</div>

      <div class="system-question-roles" aria-label="Rollen im Vote4Gov-Ökosystem">
        <article><strong>Vote4Gov</strong><span>stellt die Systemfrage, vergleicht Geschichte, Institutionen und Modelle.</span></article>
        <article><strong>VoiceOpenGov</strong><span>organisiert Menschen und gesellschaftliche Beteiligung als eigenständige Bewegung.</span></article>
        <article><strong>eDebatte</strong><span>bildet die getrennte Infrastruktur für Quellen, Gegenpositionen, Dossiers und überprüfbare Beteiligung.</span></article>
        <article><strong>Voxy</strong><span>erklärt, strukturiert und übersetzt. Voxy entscheidet nicht.</span></article>
      </div>

      <div class="system-question-actions">
        <a class="journal-button primary" href="/journal/digitale-zeitenwende-politische-zeitlupe.html">Systemfrage vertiefen</a>
        <a class="journal-button" href="https://www.voiceopengov.org/" target="_blank" rel="noreferrer">Zur Bewegung VoiceOpenGov ↗</a>
      </div>
    </div>`;

  cover.insertAdjacentElement("afterend", section);

  if (!document.querySelector('script[data-vote4gov-structured-data="foundation"]')) {
    const structured = document.createElement("script");
    structured.type = "application/ld+json";
    structured.dataset.vote4govStructuredData = "foundation";
    structured.textContent = JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://vote4gov.eu/#website",
        name: "Vote4Gov Review",
        url: "https://vote4gov.eu/",
        description: "International comparative review of democratic systems, institutions, public discourse and the question of how democracy can evolve in the 21st century.",
        inLanguage: ["de", "en", "fr", "es", "tr", "ar"],
        about: [
          { "@type": "Thing", name: "Democracy" },
          { "@type": "Thing", name: "Democratic participation" },
          { "@type": "Thing", name: "Representative democracy" },
          { "@type": "Thing", name: "Digital democracy" }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "@id": "https://vote4gov.eu/#issue-01-cover",
        headline: "Unsere Gesellschaft verändert sich jeden Tag. Warum darf sie politisch meist nur alle paar Jahre antworten?",
        description: "Vote4Gov untersucht international vergleichend, wie demokratische Rückbindung entstanden ist, was sie leistet und wie Demokratie im 21. Jahrhundert weiterentwickelt werden kann.",
        mainEntityOfPage: "https://vote4gov.eu/",
        isPartOf: { "@id": "https://vote4gov.eu/#website" },
        inLanguage: "de",
        about: [
          "democratic systems",
          "political participation",
          "representative democracy",
          "digital democracy"
        ],
        publisher: {
          "@type": "Organization",
          name: "Vote4Gov Review",
          url: "https://vote4gov.eu/"
        }
      }
    ]).replace(/</g, "\\u003c");
    document.head.appendChild(structured);
  }
})();
