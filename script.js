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

const canonicalHrefRewrites = new Map([
  ["https://compdemocracy.org/Polis/", "https://compdemocracy.org/polis/"],
  ["https://www.bsi.bund.de/DE/Themen/Oeffentliche-Verwaltung/Moderner-Staat/Online-Wahlen/online-wahlen_node.html", "https://www.bsi.bund.de/EN/Themen/Oeffentliche-Verwaltung/Moderner-Staat/Online-Wahlen/online-wahlen.html"],
]);
document.querySelectorAll("a[href]").forEach((link) => {
  const replacement = canonicalHrefRewrites.get(link.href);
  if (replacement) link.href = replacement;
});

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
    focus: "Repräsentation und direkte Mitwirkung",
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
atlasButtons.forEach((button) => button.addEventListener("click", () => selectAtlasCountry(button.dataset.atlasCountry)));

const year = document.querySelector("[data-year]");
if (year) year.textContent = String(new Date().getFullYear());

const menuButton = document.querySelector("[data-menu-button]");
const nav = document.querySelector("[data-nav]");
if (menuButton && nav) {
  const closeMenu = () => {
    menuButton.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
  };
  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
  });
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  window.addEventListener("keydown", (event) => { if (event.key === "Escape") closeMenu(); });
}

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -40px" });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const copyText = async (value) => {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    const input = document.createElement("textarea");
    input.value = value;
    input.setAttribute("readonly", "");
    input.style.cssText = "position:fixed;opacity:0;pointer-events:none";
    document.body.appendChild(input);
    input.select();
    const copied = document.execCommand("copy");
    input.remove();
    return copied;
  }
};

const announce = (message) => {
  const previous = document.querySelector("[data-journal-status]");
  if (previous) previous.remove();
  const status = document.createElement("div");
  status.dataset.journalStatus = "";
  status.setAttribute("role", "status");
  status.style.cssText = "position:fixed;z-index:200;left:50%;bottom:22px;transform:translateX(-50%);max-width:min(90vw,620px);padding:12px 17px;border:1px solid rgba(24,207,200,.5);border-radius:999px;background:#07111f;color:#f8fafc;box-shadow:0 18px 60px rgba(0,0,0,.48);font:700 13px ui-sans-serif,system-ui;text-align:center";
  status.textContent = message;
  document.body.appendChild(status);
  window.setTimeout(() => status.remove(), 3300);
};

document.querySelectorAll("[data-copy-link]").forEach((button) => {
  button.addEventListener("click", async () => {
    const value = button.dataset.copyLink || window.location.href;
    announce((await copyText(value)) ? "Link kopiert." : "Link konnte nicht automatisch kopiert werden.");
  });
});

document.querySelectorAll("[data-share-page]").forEach((button) => {
  button.addEventListener("click", async () => {
    if (!navigator.share) {
      announce((await copyText(window.location.href)) ? "Link kopiert." : "Teilen ist auf diesem Gerät nicht verfügbar.");
      return;
    }
    try {
      await navigator.share({ title: document.title, url: window.location.href });
    } catch (error) {
      if (error?.name !== "AbortError") announce("Teilen war nicht möglich.");
    }
  });
});

const qrIcon = `<svg viewBox="0 0 24 24" aria-hidden="true" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 14h2v2h-2zM14 18h2v2h-2zM18 18h2v2h-2z"/></svg>`;

const ensureQrDialog = () => {
  let dialog = document.querySelector("[data-edebatte-qr-dialog]");
  if (dialog) return dialog;
  dialog = document.createElement("dialog");
  dialog.dataset.edebatteQrDialog = "";
  dialog.style.cssText = "width:min(92vw,520px);padding:0;border:1px solid rgba(24,207,200,.45);border-radius:20px;background:#07111f;color:#f8fafc;box-shadow:0 35px 120px rgba(0,0,0,.65)";
  dialog.innerHTML = `<div style="padding:27px"><div style="display:flex;justify-content:space-between;gap:20px"><div><p style="margin:0;color:#18cfc8;font:900 10px ui-sans-serif;letter-spacing:.14em;text-transform:uppercase">Beteiligung findet bei eDebatte statt</p><h2 data-edebatte-qr-title style="margin:9px 0 0;font:600 34px/1.02 Georgia,serif">QR-Code</h2></div><button type="button" data-edebatte-qr-close aria-label="Dialog schließen" style="width:40px;height:40px;border:1px solid #526273;border-radius:50%;background:transparent;color:#fff;font-size:20px">×</button></div><p style="color:#b7c4d2">Der QR-Code öffnet direkt den zugehörigen eDebatte-Einstieg. Vote4Gov sammelt selbst keine Beiträge und führt keine Abstimmungen durch.</p><div style="display:grid;place-items:center;min-height:260px;margin-top:20px;padding:20px;border-radius:16px;background:#fff"><img data-edebatte-qr-image width="230" height="230" alt="" /></div><a data-edebatte-qr-link style="display:block;margin-top:14px;color:#8edbff;overflow-wrap:anywhere"></a><p style="color:#8092a7;font-size:11px">Das QR-Bild wird erst nach deinem Klick über einen externen QR-Bilddienst erzeugt. Dabei erhält der Dienst technisch die Zieladresse.</p></div>`;
  document.body.appendChild(dialog);
  dialog.querySelector("[data-edebatte-qr-close]").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
  return dialog;
};

const openEdebateQr = (url, title) => {
  const dialog = ensureQrDialog();
  const image = dialog.querySelector("[data-edebatte-qr-image]");
  const link = dialog.querySelector("[data-edebatte-qr-link]");
  dialog.querySelector("[data-edebatte-qr-title]").textContent = title;
  image.alt = `QR-Code zu ${title} bei eDebatte`;
  image.src = `https://api.qrserver.com/v1/create-qr-code/?size=230x230&format=svg&margin=8&data=${encodeURIComponent(url)}`;
  link.href = url;
  link.textContent = url;
  if (typeof dialog.showModal === "function") dialog.showModal();
  else window.open(url, "_blank", "noopener,noreferrer");
};

document.querySelectorAll("a.edebatte-link").forEach((link) => {
  if (link.parentElement?.querySelector("[data-edebatte-qr]")) return;
  const button = document.createElement("button");
  button.type = "button";
  button.dataset.edebatteQr = "";
  button.className = "journal-button";
  button.innerHTML = `${qrIcon}<span style="margin-left:7px">QR-Code</span>`;
  const title = link.dataset.qrTitle || "Diskussion und Prüfung";
  button.setAttribute("aria-label", `QR-Code für ${title} anzeigen`);
  button.addEventListener("click", () => openEdebateQr(link.href, title));
  link.insertAdjacentElement("afterend", button);
});
