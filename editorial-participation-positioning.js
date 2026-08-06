(() => {
  const ARTICLE_ID = "history-democracy";
  const ISSUE = "01";
  const CONTEXT_VERSION = "vote4gov-context-v1";
  const PATH = "/journal/geschichte-der-demokratie";
  const isHistoryArticle = window.location.pathname.replace(/\.html$/, "") === PATH;
  if (!isHistoryArticle) return;

  const thesis = "Demokratische Beteiligung sollte zwischen Wahlen kontinuierlich möglich sein – ohne Repräsentation, Rechte und Rechtsstaatlichkeit zu ersetzen.";
  const browserPrompt = "Welche Perspektive, Quelle oder Gegenposition fehlt in dieser Analyse?";
  const handoff = globalThis.Vote4GovHandoff?.getArticleHandoff({
    articleId: ARTICLE_ID,
    locale: document.documentElement.lang || "de",
  }) || {
    ok: false,
    status: "preparing",
    message: "Der Themenkontext bei eDebatte wird vorbereitet.",
  };

  const articleCopy = document.querySelector(".article-copy");
  if (articleCopy && !articleCopy.dataset.participationPositioningUpdated) {
    const roleParagraph = [...articleCopy.querySelectorAll(":scope > p")]
      .find((paragraph) => paragraph.textContent.includes("Vote4Gov selbst bleibt Untersuchung und These"));
    if (roleParagraph) {
      roleParagraph.textContent = "Aus dieser Analyse folgt die Rolle des Ökosystems: VoiceOpenGov entwickelt in 50 Grundfragen ein gemeinsames demokratisches Fundament. eDebatte stellt den autarken Raum bereit, in dem allgemeine und VOG-bezogene Themen durch Quellen, Gegenpositionen, Beratung und gegebenenfalls Abstimmung bearbeitet werden.";
      const participationPosition = document.createElement("p");
      participationPosition.innerHTML = "Vote4Gov ist keine eigenständige Beteiligungsplattform. Die Review erprobt jedoch bewusst niedrigschwellige Umfragen und Einordnungen innerhalb redaktioneller Beiträge – als Einladung an Medienhäuser, Vereine, Initiativen und andere öffentliche Akteure, analoge wie digitale Reichweite nicht nur für Reaktionen, sondern für gemeinsame Meinungsbildung zu nutzen. Statt drei isolierter Smileys können Leserinnen und Leser <strong>zustimmen, widersprechen, etwas vormerken oder bei eDebatte direkt am Thema, an Gegenpositionen, Quellen und möglichen Wirkungen weiterarbeiten</strong>.";
      roleParagraph.insertAdjacentElement("afterend", participationPosition);
    }
    articleCopy.dataset.participationPositioningUpdated = "true";
  }

  const renderHandoffAction = (element) => {
    if (handoff.ok) {
      const link = document.createElement("a");
      link.className = element.className.replace("handoff-pending", "").trim();
      link.dataset.contextHandoff = CONTEXT_VERSION;
      link.dataset.articleId = ARTICLE_ID;
      link.dataset.issue = ISSUE;
      link.href = handoff.url;
      link.target = "_blank";
      link.rel = "noreferrer";
      link.textContent = "Kontext bei eDebatte weiterbearbeiten ↗";
      element.replaceWith(link);
      return;
    }
    if (element.tagName === "A") {
      const replacement = document.createElement("span");
      replacement.className = `${element.className} handoff-pending`.trim();
      replacement.dataset.vote4govHandoffStatus = "";
      replacement.setAttribute("aria-disabled", "true");
      replacement.textContent = handoff.message;
      element.replaceWith(replacement);
      return;
    }
    element.setAttribute("aria-disabled", "true");
    if (element.textContent !== handoff.message) element.textContent = handoff.message;
  };

  const updateHandoff = () => {
    const section = document.querySelector(".edebatte-handoff");
    if (!section) return;
    section.dataset.topicId = ARTICLE_ID;
    section.dataset.contextVersion = CONTEXT_VERSION;
    section.dataset.handoffState = handoff.ok ? "ready" : "preparing";
    const heading = section.querySelector("h2");
    if (heading && heading.textContent !== browserPrompt) heading.replaceChildren(browserPrompt);
    const paragraph = section.querySelector("p");
    if (paragraph) {
      const copy = handoff.ok
        ? "Die schnelle Einordnung ist noch keine öffentliche Stimme. Der Link öffnet ausschließlich den bestätigten Artikelkontext; eine Beteiligung beginnt erst durch eine bewusste Aktion bei eDebatte."
        : "Die schnelle Einordnung bleibt lokal und ist keine öffentliche Stimme. Topic-Slug, Quell-URL und stabile Frage-IDs werden erst nach ausdrücklicher Freigabe aktiviert.";
      if (paragraph.textContent !== copy) paragraph.textContent = copy;
    }
    document.querySelectorAll("[data-vote4gov-handoff-status]").forEach(renderHandoffAction);
  };

  const updatePulse = () => {
    document.querySelectorAll(`[data-participation-pulse="${ARTICLE_ID}"]`).forEach((widget) => {
      widget.dataset.contextVersion = CONTEXT_VERSION;
      widget.dataset.handoffState = handoff.ok ? "ready" : "preparing";
      const heading = widget.querySelector("h3");
      if (heading && heading.textContent !== thesis) heading.textContent = thesis;
      const fineprint = widget.querySelector(".participation-pulse-fineprint");
      const fineprintCopy = "Erste lokale Einordnung, noch keine öffentliche Abstimmung. Eine Linköffnung überträgt oder zählt diese Vormerkung nicht; löschen können Sie sie nur durch eine ausdrückliche lokale Aktion.";
      if (fineprint && fineprint.textContent !== fineprintCopy) fineprint.textContent = fineprintCopy;
      const action = widget.querySelector(".participation-pulse-edebate");
      if (!action) return;
      if (handoff.ok && action.tagName !== "A") {
        const link = document.createElement("a");
        link.className = action.className;
        link.dataset.pulseAction = "edebate";
        link.dataset.contextHandoff = CONTEXT_VERSION;
        link.href = handoff.url;
        link.target = "_blank";
        link.rel = "noreferrer";
        link.innerHTML = `${action.querySelector("svg")?.outerHTML || ""}<span>Bei eDebatte vertiefen</span>`;
        action.replaceWith(link);
      } else if (!handoff.ok) {
        action.setAttribute("aria-disabled", "true");
        const label = action.querySelector("span");
        if (label && label.textContent !== "eDebatte-Kontext wird vorbereitet") {
          label.replaceChildren("eDebatte-Kontext wird vorbereitet");
        }
      }
    });
  };

  updateHandoff();
  updatePulse();
  const observer = new MutationObserver(() => {
    updateHandoff();
    updatePulse();
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
