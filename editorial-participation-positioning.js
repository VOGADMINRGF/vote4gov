(() => {
  const ARTICLE_ID = "history-democracy";
  const ISSUE = "01";
  const CONTEXT_VERSION = "vote4gov-context-v1";
  const PATH = "/journal/geschichte-der-demokratie";
  const isHistoryArticle = window.location.pathname.replace(/\.html$/, "") === PATH;

  document.querySelectorAll('a[href="/#welt"], a[href="#welt"]').forEach((link) => link.remove());
  if (!isHistoryArticle) return;

  const thesis = "Demokratische Beteiligung sollte zwischen Wahlen kontinuierlich möglich sein – ohne Repräsentation, Rechte und Rechtsstaatlichkeit zu ersetzen.";
  const deeperQuestion = "Welche Perspektive, Quelle oder Gegenposition fehlt in dieser Analyse?";

  const encodeBase64Url = (value) => {
    try {
      const bytes = new TextEncoder().encode(JSON.stringify(value));
      let binary = "";
      bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
      return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
    } catch {
      return "";
    }
  };

  const readState = (storage, key) => {
    try {
      const value = storage.getItem(key);
      return value ? JSON.parse(value) : {};
    } catch {
      return {};
    }
  };

  const collectArticleResponses = () => {
    const merged = {
      ...readState(localStorage, "vote4gov:participation-pulse:device:v1"),
      ...readState(sessionStorage, "vote4gov:participation-pulse:v1"),
    };
    return Object.values(merged)
      .filter((item) => item && item.path === window.location.pathname && (item.stance || item.remembered))
      .slice(0, 12)
      .map((item) => ({
        questionId: String(item.topicId || "").slice(0, 120),
        prompt: String(item.title || "").slice(0, 500),
        response: item.stance === "agree" || item.stance === "disagree" ? item.stance : null,
        remembered: Boolean(item.remembered),
        updatedAt: item.updatedAt || null,
      }));
  };

  const contextualUrl = (rawUrl) => {
    const url = new URL(rawUrl, window.location.href);
    const bundle = {
      version: CONTEXT_VERSION,
      source: "vote4gov",
      articleId: ARTICLE_ID,
      issue: ISSUE,
      locale: document.documentElement.lang || "de",
      sourceUrl: `${window.location.origin}${window.location.pathname}`,
      questions: collectArticleResponses(),
    };
    url.searchParams.set("source", "vote4gov");
    url.searchParams.set("entry", "context_handoff");
    url.searchParams.set("article_id", ARTICLE_ID);
    url.searchParams.set("issue", ISSUE);
    url.searchParams.set("source_url", bundle.sourceUrl);
    const encoded = encodeBase64Url(bundle);
    if (encoded) url.searchParams.set("context_bundle", encoded);
    return url.toString();
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

  const updateHandoff = () => {
    const handoff = document.querySelector(".edebatte-handoff");
    if (!handoff) return;
    handoff.dataset.topicId = ARTICLE_ID;
    handoff.dataset.contextVersion = CONTEXT_VERSION;
    handoff.querySelector("h2")?.replaceChildren(deeperQuestion);
    const paragraph = handoff.querySelector("p");
    if (paragraph) paragraph.textContent = "Die schnelle Einordnung ist noch keine öffentliche Stimme. Wer Quellen ergänzen, eine Gegenposition entwickeln oder Wirkung und nächste Schritte bearbeiten möchte, wechselt mit dem Artikelkontext zu eDebatte.";
    const link = handoff.querySelector("a.edebatte-link");
    if (link) {
      link.dataset.contextHandoff = CONTEXT_VERSION;
      link.dataset.articleId = ARTICLE_ID;
      link.dataset.issue = ISSUE;
      link.href = contextualUrl(link.href);
      link.textContent = "Kontext bei eDebatte weiterbearbeiten ↗";
    }
  };

  const updatePulse = () => {
    document.querySelectorAll(`[data-participation-pulse="${ARTICLE_ID}"]`).forEach((widget) => {
      widget.dataset.contextVersion = CONTEXT_VERSION;
      const heading = widget.querySelector("h3");
      if (heading) heading.textContent = thesis;
      const fineprint = widget.querySelector(".participation-pulse-fineprint");
      if (fineprint) fineprint.textContent = "Erste lokale Einordnung, noch keine öffentliche Abstimmung. Bei eDebatte können alle Fragen des Artikels zusammengefasst, schnell beantwortet oder mit Quellen, Gegenpositionen und Wirkungsarbeit vertieft werden.";
      const link = widget.querySelector("a.participation-pulse-edebate");
      if (link) {
        link.dataset.contextHandoff = CONTEXT_VERSION;
        link.href = contextualUrl(link.href);
        const label = link.querySelector("span");
        if (label) label.textContent = "Bei eDebatte vertiefen";
        link.style.color = "#f8fafc";
      }
      const status = widget.querySelector("[data-pulse-status]");
      if (status?.textContent.includes("lokale Vormerkung wurde hier beendet")) {
        status.textContent = "eDebatte wurde geöffnet. Ihre lokale Vormerkung bleibt erhalten, bis die Übernahme dort bestätigt oder von Ihnen gelöscht wird.";
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

  document.addEventListener("click", (event) => {
    const link = event.target.closest('a.participation-pulse-edebate[data-context-handoff]');
    if (!link) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    const target = contextualUrl(link.href);
    window.open(target, "_blank", "noopener,noreferrer");
    const status = link.closest("[data-participation-pulse]")?.querySelector("[data-pulse-status]");
    if (status) status.textContent = "eDebatte wurde mit dem Artikelkontext geöffnet. Ihre lokale Vormerkung bleibt erhalten, bis eDebatte die Übernahme bestätigt oder Sie sie löschen.";
  }, true);
})();
