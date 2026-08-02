const loadStyle = (href) => {
  if (document.querySelector(`link[href^="${href}"]`)) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
};

loadStyle("/image-tuning.css?v=20260801-1");
loadStyle("/accessibility.css?v=20260801-1");
loadStyle("/brand-shell.css?v=20260802-1");
loadStyle("/participation-network.css?v=20260802-1");

const brand = document.querySelector(".site-header .brand");
if (brand) {
  brand.classList.add("ecosystem-brand");
  brand.setAttribute("aria-label", "Vote4Gov Startseite");
  brand.innerHTML = `
    <picture>
      <source media="(prefers-color-scheme: light)" srcset="/assets/brand/vote4gov-logo-light.svg" />
      <img src="/assets/brand/vote4gov-logo-dark.svg" alt="Vote4Gov – Weiterdenken" width="420" height="96" />
    </picture>
  `;
}

const atlasProfiles = {
  de: {
    title: "Deutschland",
    intro: "Das Profil untersucht nicht nur Wahlen, sondern auch die Wege zwischen kommunaler Betroffenheit, föderaler Zuständigkeit und europäischer Mitwirkung.",
    question: "Wie greifen Bund, Länder, Kommunen und europäische Zuständigkeiten ineinander – und wo kann Beteiligung verständlicher werden?",
    focus: "politische Ebenen und Rückkopplung",
    language: "Originalquellen plus mehrsprachige Lesefassung",
  },
  ch: {
    title: "Schweiz",
    intro: "Das Profil fragt, wie repräsentative Institutionen, föderale Ebenen und direktdemokratische Instrumente im politischen Alltag zusammenspielen.",
    question: "Welche Voraussetzungen machen wiederkehrende Abstimmungen verständlich, zugänglich und institutionell wirksam?",
    focus: "Zusammenspiel von Repräsentation und direkter Mitwirkung",
    language: "mehrsprachige Begriffe im jeweiligen Rechtskontext",
  },
  ee: {
    title: "Estland",
    intro: "Das Profil betrachtet die Verbindung von digitaler Staatlichkeit, Identität, Vertrauen, öffentlicher Infrastruktur und demokratischer Kontrolle.",
    question: "Welche technischen und institutionellen Grundlagen braucht digitale Beteiligung, damit Bequemlichkeit nicht auf Kosten von Vertrauen geht?",
    focus: "digitale Voraussetzungen und öffentliche Kontrolle",
    language: "Originalquellen, Übersetzungsstatus und Begriffserklärung",
  },
  fr: {
    title: "Frankreich",
    intro: "Das Profil untersucht das Verhältnis von nationaler Steuerung, regionalen Ebenen, politischer Repräsentation und zusätzlicher Bürgerbeteiligung.",
    question: "Wie können nationale Entscheidungsfähigkeit und regionale Rückkopplung verbunden werden, ohne Zuständigkeiten zu verwischen?",
    focus: "Zentralität, Regionen und Beteiligungswege",
    language: "lokale Fachbegriffe plus verständliche Lesefassung",
  },
};

const atlasButtons = document.querySelectorAll("[data-atlas-country]");
const atlasTitle = document.querySelector("[data-atlas-title]");
const atlasIntro = document.querySelector("[data-atlas-intro]");
const atlasQuestion = document.querySelector("[data-atlas-question]");
const atlasFocus = document.querySelector("[data-atlas-focus]");
const atlasLanguage = document.querySelector("[data-atlas-language]");

const selectAtlasCountry = (code) => {
  const profile = atlasProfiles[code];
  if (!profile) return;
  if (atlasTitle) atlasTitle.textContent = profile.title;
  if (atlasIntro) atlasIntro.textContent = profile.intro;
  if (atlasQuestion) atlasQuestion.textContent = profile.question;
  if (atlasFocus) atlasFocus.textContent = profile.focus;
  if (atlasLanguage) atlasLanguage.textContent = profile.language;
  atlasButtons.forEach((button) => {
    const active = button.dataset.atlasCountry === code;
    button.classList.toggle("is-active", active);
    if (button.matches("button")) button.setAttribute("aria-pressed", String(active));
  });
};

atlasButtons.forEach((button) => {
  button.addEventListener("click", () => selectAtlasCountry(button.dataset.atlasCountry));
});

const topicRooms = {
  atlas: {
    kicker: "Themenraum 01 · Demokratie-Atlas",
    title: "Welche demokratischen Systeme sollten wir zuerst vergleichbar machen?",
    lead: "Dieser Raum sammelt Länderwünsche, Primärquellen, lokale Begriffserklärungen und Einwände gegen vereinfachende Systemvergleiche.",
    question: "Welche Informationen braucht ein Länderprofil, damit es verständlich wird, ohne die politische und rechtliche Eigenart des Landes zu verzerren?",
    status: "Prototyp · Länderprofile und Methodik offen",
    need: "Gesucht: offizielle Quellen, lokale Perspektiven, Übersetzungsfragen und Vorschläge für erste Länderprofile.",
  },
  beteiligung: {
    kicker: "Themenraum 02 · Beteiligung heute",
    title: "Was fehlt zwischen einer Umfrage und echter demokratischer Mitwirkung?",
    lead: "Dieser Raum prüft die These, dass viele Beteiligungsangebote zu spät beginnen, zu enge Antwortkorridore setzen und nach dem Klick zu wenig Wirkung zeigen.",
    question: "Welche Beteiligungsverfahren funktionieren heute bereits gut – und an welcher Stelle verlieren Menschen dennoch Einfluss, Orientierung oder Rückmeldung?",
    status: "These offen · Gegenbeispiele ausdrücklich gesucht",
    need: "Gesucht: kommunale Praxis, gute Gegenbeispiele, Erfahrungen mit geringer Beteiligung und nachweisbarer Wirkung.",
  },
  ordnung: {
    kicker: "Themenraum 03 · Neue demokratische Ordnung",
    title: "Wie kann kontinuierliche Beteiligung rechtsstaatlich und alltagstauglich werden?",
    lead: "Die Vision verbindet regionale Anliegen, mehrsprachige Verständigung, direkte Mitwirkung und klare institutionelle Grenzen.",
    question: "Welche Teile dieser Ordnung müssen unverhandelbar sein – und welche sollten Regionen, Staaten oder Gemeinschaften selbst gestalten können?",
    status: "Normativer Entwurf · Prinzipien werden geprüft",
    need: "Gesucht: verfassungsrechtliche Einwände, Governance-Modelle, Mindeststandards und alternative Ordnungsprinzipien.",
  },
  befaehigung: {
    kicker: "Themenraum 04 · Bürgerzentrierter Zugang",
    title: "Wie beginnt Beteiligung bei einem Menschen statt bei einem Formular?",
    lead: "Ein Anliegen soll in Alltagssprache beginnen dürfen. Das Verfahren übernimmt die Aufgabe, Zuständigkeit, Wissen und passende Beteiligungsform verständlich zu erschließen.",
    question: "Welche Unterstützung befähigt Menschen wirklich – und ab wann wird Erklärung zur Bevormundung oder algorithmischen Vorentscheidung?",
    status: "Interaktionsentwurf · Schutz vor Bevormundung offen",
    need: "Gesucht: UX-Erfahrungen, Barrierefreiheit, Moderationsregeln, Datenschutz und Grenzen automatischer Einordnung.",
  },
  qualitaet: {
    kicker: "Themenraum 05 · Beteiligungspass",
    title: "Wann darf ein Beteiligungsergebnis als politisch aussagekräftig gelten?",
    lead: "Prozentzahlen brauchen Kontext: Reichweite, Vielfalt, Informationsgrundlage, Verifikation, Wirkung und bekannte Lücken.",
    question: "Welche Kennzahlen schaffen Ehrlichkeit, ohne Menschen zu vermessen oder sensible Daten unnötig zu sammeln?",
    status: "Messrahmen · Datenschutz und Aussagekraft offen",
    need: "Gesucht: Statistik, Repräsentativität, Datenschutz, qualitative Evaluation und Beispiele ehrlicher Ergebnisdarstellung.",
  },
  grenzenlos: {
    kicker: "Themenraum 06 · Grenzüberschreitende Beteiligung",
    title: "Wie können lokale Anliegen über Grenzen hinweg gemeinsam lernen?",
    lead: "Ähnliche Probleme sollen über Regionen und Sprachen verbunden werden, ohne Zuständigkeiten, Rechtslagen und lokale Kontexte zu verwischen.",
    question: "Wann entsteht aus vergleichbaren regionalen Anliegen ein legitimer gemeinsamer Themenraum – und wann wäre eine grenzüberschreitende Aggregation irreführend?",
    status: "Zielbild · Legitimität und Zuständigkeit offen",
    need: "Gesucht: europäische Praxis, transnationale Beteiligung, föderale Erfahrungen und Kriterien für faire Zusammenführung.",
  },
  gegenfragen: {
    kicker: "Themenraum 07 · Scheitern mitdenken",
    title: "Welche Gefahr könnte die gesamte Idee untragbar machen?",
    lead: "Manipulation, digitale Spaltung, permanente Mehrheiten, Überforderung und intransparente KI dürfen nicht als nachträgliche Detailfragen behandelt werden.",
    question: "Welcher Einwand wird bislang unterschätzt – und welche Schutzmaßnahme wäre notwendig, bevor ein Verfahren politische Wirkung erhalten darf?",
    status: "Kritikraum · harte Gegenargumente priorisiert",
    need: "Gesucht: Red-Teaming, Missbrauchsszenarien, Minderheitenschutz, Sicherheits- und Governance-Anforderungen.",
  },
  quellen: {
    kicker: "Themenraum 08 · Quellen und Korrektur",
    title: "Welche Aussage auf Vote4Gov ist unvollständig, überholt oder falsch?",
    lead: "Quellenoffenheit bedeutet, dass Korrekturen nicht als Störung behandelt werden. Dieser Raum sammelt Primärquellen, Gegenpositionen und methodische Hinweise.",
    question: "Welche Quelle oder Perspektive verändert die Einordnung eines Themas wesentlich?",
    status: "Fortlaufender Review · Korrekturen offen",
    need: "Gesucht: Primärquellen, wissenschaftliche Gegenpositionen, Übersetzungsfehler und Hinweise auf veraltete Angaben.",
  },
  "civic-tech": {
    kicker: "Themenraum · Offene Civic-Tech",
    title: "Was können offene Beteiligungssysteme voneinander lernen?",
    lead: "Die Landschaft wird nicht als Wettbewerb gerahmt. Verglichen werden Ausgangspunkt, Beteiligungstiefe, Transparenz, Wirkung und die Lücke vor einem bereits eröffneten Verfahren.",
    question: "Welche vorhandene Lösung, Funktion oder dokumentierte Grenze fehlt in unserer Einordnung?",
    status: "Öffentliche Markt- und Methodenbeobachtung",
    need: "Gesucht: Projektdokumentation, Praxisberichte, Korrekturen und faire Kriterien für den Vergleich.",
  },
  parteienfrage: {
    kicker: "Themenraum · Partei oder Infrastruktur",
    title: "Braucht demokratische Erneuerung eine Partei?",
    lead: "Parteien eröffnen institutionellen Zugang und unterliegen demokratischen Regeln. Ein offener Beteiligungsraum kann freier sein, besitzt aber nicht dieselben parlamentarischen Rechte.",
    question: "Wann schützt eine Parteistruktur demokratische Verantwortung – und wann verengt sie eine offene gesellschaftliche Idee zu früh?",
    status: "Alternative These · juristische und politische Prüfung offen",
    need: "Gesucht: Verfassungsrecht, Parteienpraxis, Bewegungsforschung, Gegenargumente und alternative Organisationsmodelle.",
  },
};

const roomUrl = (topic) => {
  const url = new URL("/themenraum", window.location.origin);
  url.searchParams.set("thema", topic);
  return url.toString();
};

const resonanceTargets = [
  ["atlas", "atlas"],
  ["beteiligung", "beteiligung"],
  ["ordnung", "ordnung"],
  ["befaehigung", "befaehigung"],
  ["qualitaet", "qualitaet"],
  ["grenzenlos", "grenzenlos"],
  ["gegenfragen", "gegenfragen"],
  ["quellen", "quellen"],
];

const createResonanceCall = (topic) => {
  const room = topicRooms[topic];
  if (!room) return null;
  const element = document.createElement("aside");
  element.className = "resonance-call reveal";
  element.setAttribute("aria-label", `Beteiligung zu ${room.title}`);
  element.innerHTML = `
    <div class="resonance-call-inner">
      <div>
        <p class="resonance-kicker">Aus Stellungnahme wird Themenraum</p>
        <h3>${room.question}</h3>
        <p>${room.need}</p>
      </div>
      <div class="resonance-actions">
        <a class="resonance-button primary" href="${roomUrl(topic)}">Im Themenraum mitdenken</a>
        <button class="resonance-button" type="button" data-qr-open data-topic="${topic}">QR-Code anzeigen</button>
      </div>
    </div>
    <div class="resonance-meta"><span>Gegenargumente willkommen</span><span>Quellen offen</span><span>eigener teilbarer Raum</span><span>Entwurf lokal speicherbar</span></div>
  `;
  return element;
};

if (document.querySelector("main#main") && !document.body.hasAttribute("data-topic-room-page")) {
  resonanceTargets.forEach(([sectionId, topic]) => {
    const target = document.getElementById(sectionId);
    if (!target || document.querySelector(`[data-resonance-for="${topic}"]`)) return;
    const call = createResonanceCall(topic);
    if (!call) return;
    call.dataset.resonanceFor = topic;
    target.insertAdjacentElement("afterend", call);
  });

  const sources = document.getElementById("quellen");
  if (sources && !document.querySelector(".resonance-network-intro")) {
    const network = document.createElement("section");
    network.className = "resonance-network-intro reveal";
    network.innerHTML = `
      <div class="resonance-network-intro-grid">
        <div><p class="section-label">Zwei zusätzliche Prüfpfade</p><h2>Offenes Wissen und institutionelle Wirkung gehören zusammen.</h2></div>
        <div>
          <p>Bestehende Open-Source-Projekte werden öffentlich und fair eingeordnet. Gleichzeitig bleibt die Frage offen, ob demokratische Erneuerung zuerst eine Partei, eine Bewegung oder eine unabhängige Infrastruktur braucht.</p>
          <div class="resonance-network-links">
            <a href="/offene-civic-tech.html"><span>Open Source würdigen und vergleichen</span><strong>Offene Civic-Tech-Landschaft →</strong></a>
            <a href="/partei-oder-infrastruktur.html"><span>Recht und politische Wirkung trennen</span><strong>Partei oder Infrastruktur? →</strong></a>
          </div>
        </div>
      </div>
    `;
    sources.insertAdjacentElement("beforebegin", network);
  }
}

const ensureQrDialog = () => {
  let dialog = document.querySelector("[data-qr-dialog]");
  if (dialog) return dialog;
  dialog = document.createElement("dialog");
  dialog.className = "qr-dialog";
  dialog.dataset.qrDialog = "";
  dialog.innerHTML = `
    <div class="qr-dialog-inner">
      <div class="qr-dialog-head"><div><p class="section-label">Später oder gemeinsam öffnen</p><h2 data-qr-title>Themenraum per QR-Code</h2></div><button class="qr-close" type="button" aria-label="Dialog schließen" data-qr-close>×</button></div>
      <p>Der Code führt direkt in den themenspezifischen Raum. Er eignet sich für Veranstaltungen, Gespräche, Ausdrucke und den Wechsel vom Desktop zum Smartphone.</p>
      <div class="qr-stage"><img data-qr-image alt="" /></div>
      <p class="qr-privacy">Datenschutz-Hinweis: Das QR-Bild wird erst nach deinem Klick von einem externen QR-Dienst geladen. Der eigentliche Themenraum funktioniert ohne diesen Dienst.</p>
      <a class="qr-link" data-qr-link href="#"></a>
    </div>
  `;
  document.body.appendChild(dialog);
  dialog.querySelector("[data-qr-close]").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  return dialog;
};

const openQrDialog = (topic) => {
  const room = topicRooms[topic] || topicRooms.beteiligung;
  const url = roomUrl(topicRooms[topic] ? topic : "beteiligung");
  const dialog = ensureQrDialog();
  const image = dialog.querySelector("[data-qr-image]");
  const link = dialog.querySelector("[data-qr-link]");
  dialog.querySelector("[data-qr-title]").textContent = room.title;
  image.alt = `QR-Code zum Themenraum: ${room.title}`;
  image.src = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&format=svg&data=${encodeURIComponent(url)}`;
  link.href = url;
  link.textContent = url;
  if (typeof dialog.showModal === "function") dialog.showModal();
  else window.open(url, "_blank", "noopener,noreferrer");
};

document.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-qr-open]");
  if (!trigger) return;
  const params = new URLSearchParams(window.location.search);
  openQrDialog(trigger.dataset.topic || params.get("thema") || "beteiligung");
});

const toast = (message) => {
  const old = document.querySelector("[data-toast]");
  if (old) old.remove();
  const node = document.createElement("div");
  node.dataset.toast = "";
  node.setAttribute("role", "status");
  node.style.cssText = "position:fixed;z-index:120;left:50%;bottom:24px;transform:translateX(-50%);max-width:min(92vw,620px);padding:13px 18px;border:1px solid rgba(24,207,200,.45);border-radius:999px;background:#07111f;color:#f8fafc;box-shadow:0 18px 60px rgba(0,0,0,.45);font:700 13px ui-sans-serif,system-ui;text-align:center";
  node.textContent = message;
  document.body.appendChild(node);
  window.setTimeout(() => node.remove(), 3600);
};

const initTopicRoom = () => {
  if (!document.body.hasAttribute("data-topic-room-page")) return;
  const params = new URLSearchParams(window.location.search);
  const topic = topicRooms[params.get("thema")] ? params.get("thema") : "beteiligung";
  const room = topicRooms[topic];
  const setText = (selector, value) => {
    const node = document.querySelector(selector);
    if (node) node.textContent = value;
  };
  setText("[data-room-kicker]", room.kicker);
  setText("[data-room-title]", room.title);
  setText("[data-room-lead]", room.lead);
  setText("[data-room-question]", room.question);
  setText("[data-room-status]", room.status);
  setText("[data-room-need]", room.need);
  document.title = `${room.title} – Vote4Gov`;

  const form = document.querySelector("[data-contribution-form]");
  if (!form) return;
  const fields = {
    type: form.querySelector("[data-contribution-type]"),
    region: form.querySelector("[data-contribution-region]"),
    language: form.querySelector("[data-contribution-language]"),
    source: form.querySelector("[data-contribution-source]"),
    text: form.querySelector("[data-contribution-text]"),
  };
  const storageKey = `vote4gov-room-draft-${topic}`;
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "null");
    if (saved) Object.entries(fields).forEach(([key, input]) => { if (input && saved[key] !== undefined) input.value = saved[key]; });
  } catch { /* local drafts are optional */ }

  const buildContribution = () => {
    const region = fields.region.value.trim() || "nicht angegeben";
    const language = fields.language.value.trim() || "nicht angegeben";
    const source = fields.source.value.trim() || "keine Quelle angegeben";
    const text = fields.text.value.trim() || "Noch kein Text eingegeben.";
    return [
      `# Vote4Gov Themenraum: ${room.title}`,
      "",
      `Beitragsart: ${fields.type.value}`,
      `Region/Bezug: ${region}`,
      `Originalsprache: ${language}`,
      `Quelle: ${source}`,
      "",
      text,
      "",
      `Themenraum: ${roomUrl(topic)}`,
      `Arbeitsstand: ${room.status}`,
    ].join("\n");
  };

  const updatePreview = () => {
    setText("[data-preview-label]", fields.type.value);
    setText("[data-preview-title]", room.title);
    setText("[data-preview-text]", buildContribution());
    try {
      localStorage.setItem(storageKey, JSON.stringify(Object.fromEntries(Object.entries(fields).map(([key, input]) => [key, input.value]))));
    } catch { /* local drafts are optional */ }
  };

  Object.values(fields).forEach((field) => field.addEventListener("input", updatePreview));
  Object.values(fields).forEach((field) => field.addEventListener("change", updatePreview));
  updatePreview();

  const copyContribution = async () => {
    const value = buildContribution();
    try {
      await navigator.clipboard.writeText(value);
      toast("Beitrag kopiert. Du behältst die Kontrolle über die Veröffentlichung.");
      return true;
    } catch {
      const temp = document.createElement("textarea");
      temp.value = value;
      temp.style.position = "fixed";
      temp.style.opacity = "0";
      document.body.appendChild(temp);
      temp.select();
      const ok = document.execCommand("copy");
      temp.remove();
      if (ok) toast("Beitrag kopiert.");
      return ok;
    }
  };

  form.querySelector("[data-contribution-copy]").addEventListener("click", copyContribution);
  form.querySelector("[data-contribution-share]").addEventListener("click", async () => {
    if (navigator.share) {
      try { await navigator.share({ title: room.title, text: room.question, url: roomUrl(topic) }); }
      catch { /* user cancelled */ }
    } else {
      try { await navigator.clipboard.writeText(roomUrl(topic)); toast("Link zum Themenraum kopiert."); }
      catch { window.prompt("Link kopieren:", roomUrl(topic)); }
    }
  });
  form.querySelector("[data-contribution-email]").addEventListener("click", () => {
    const subject = encodeURIComponent(`Vote4Gov Themenraum – ${room.title}`);
    const body = encodeURIComponent(buildContribution());
    window.location.href = `mailto:rgf@voiceopengov.org?subject=${subject}&body=${body}`;
  });
  form.querySelector("[data-contribution-practice]").addEventListener("click", async () => {
    await copyContribution();
    toast("Beitrag kopiert. eDebatte wird als praktische Beteiligungsumgebung geöffnet.");
    window.setTimeout(() => window.open("https://www.edebatte.org/create", "_blank", "noopener,noreferrer"), 250);
  });
};

initTopicRoom();

const sourcesNote = document.querySelector(".sources-page .note-box");
if (sourcesNote && !document.querySelector(".resonance-network-intro")) {
  const related = document.createElement("section");
  related.className = "resonance-network-intro";
  related.innerHTML = `
    <div class="resonance-network-intro-grid">
      <div><p class="section-label">Vertiefende Prüfräume</p><h2>Quellen sollen nicht nur gelesen, sondern angefochten werden können.</h2></div>
      <div><p>Die offene Civic-Tech-Landschaft und die Parteienfrage erhalten eigene, teilbare Themenräume mit strukturierter Korrektur- und Gegenargumentfunktion.</p><div class="resonance-network-links"><a href="/offene-civic-tech.html"><span>Projekte, Fähigkeiten und Grenzen</span><strong>Civic-Tech prüfen →</strong></a><a href="/partei-oder-infrastruktur.html"><span>Recht, Freiheit und institutionelle Wirkung</span><strong>Parteienfrage prüfen →</strong></a></div></div>
    </div>
  `;
  sourcesNote.insertAdjacentElement("afterend", related);
}

const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const nav = document.querySelector("[data-nav]");
const year = document.querySelector("[data-year]");
const closeMenu = () => {
  if (!menuButton || !nav) return;
  menuButton.setAttribute("aria-expanded", "false");
  nav.classList.remove("is-open");
};

if (year) year.textContent = String(new Date().getFullYear());
if (header) {
  const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 20);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}
if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    nav.classList.toggle("is-open", !isOpen);
  });
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px" },
  );
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
