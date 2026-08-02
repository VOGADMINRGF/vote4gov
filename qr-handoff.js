(() => {
  const qrIcon = `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 14h2v2h-2zM14 18h2v2h-2zM18 18h2v2h-2z"/></svg>`;
  const canonicalOrigin = "https://vote4gov.eu";

  const canonicalize = (value) => {
    const url = new URL(value, window.location.href);
    return `${canonicalOrigin}${url.pathname}${url.search}`;
  };

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
    let status = document.querySelector("[data-qr-status]");
    if (!status) {
      status = document.createElement("div");
      status.dataset.qrStatus = "";
      status.setAttribute("role", "status");
      status.setAttribute("aria-live", "polite");
      status.style.cssText = "position:fixed;z-index:180;left:50%;bottom:22px;transform:translateX(-50%);max-width:min(90vw,620px);padding:12px 17px;border:1px solid rgba(24,207,200,.5);border-radius:999px;background:#07111f;color:#f8fafc;box-shadow:0 18px 60px rgba(0,0,0,.48);font:700 13px ui-sans-serif,system-ui;text-align:center";
      document.body.appendChild(status);
    }
    status.textContent = message;
    window.clearTimeout(status._removeTimer);
    status._removeTimer = window.setTimeout(() => status.remove(), 3200);
  };

  const ensureDialog = () => {
    let dialog = document.querySelector("[data-qr-dialog]");
    if (dialog) return dialog;

    dialog = document.createElement("dialog");
    dialog.className = "qr-dialog";
    dialog.dataset.qrDialog = "";
    dialog.innerHTML = `
      <div class="qr-dialog-inner">
        <div class="qr-dialog-head">
          <div><p class="qr-dialog-kicker">Teilbarer Anlassraum</p><h2 data-qr-title>QR-Code</h2></div>
          <button class="qr-close" type="button" aria-label="QR-Dialog schließen" data-qr-close>×</button>
        </div>
        <p class="qr-dialog-copy">Scannen, um diesen konkreten Raum auf einem Smartphone zu öffnen oder bei Veranstaltungen sichtbar zu teilen.</p>
        <div class="qr-stage"><img data-qr-image alt="" /></div>
        <a class="qr-link" data-qr-link href="#"></a>
        <div class="qr-dialog-actions">
          <button class="qr-trigger" type="button" data-qr-copy>${qrIcon}<span>Link kopieren</span></button>
          <button class="qr-trigger" type="button" data-qr-share>${qrIcon}<span>Raum teilen</span></button>
        </div>
        <p class="qr-privacy">Der QR-Code wird erst nach deinem Klick über einen externen QR-Bilddienst erzeugt. Dabei erhält der Dienst technisch die Zieladresse. Der Anlassraum selbst und der Link funktionieren ohne diesen Dienst.</p>
      </div>`;
    document.body.appendChild(dialog);

    dialog.querySelector("[data-qr-close]").addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener("keydown", (event) => {
      if (event.key === "Escape") dialog.close();
    });
    return dialog;
  };

  const openQr = (url, title) => {
    const canonicalUrl = canonicalize(url);
    const dialog = ensureDialog();
    const image = dialog.querySelector("[data-qr-image]");
    const link = dialog.querySelector("[data-qr-link]");
    const copyButton = dialog.querySelector("[data-qr-copy]");
    const shareButton = dialog.querySelector("[data-qr-share]");

    dialog.querySelector("[data-qr-title]").textContent = title;
    image.alt = `QR-Code zu ${title}`;
    image.src = `https://api.qrserver.com/v1/create-qr-code/?size=230x230&format=svg&margin=8&data=${encodeURIComponent(canonicalUrl)}`;
    link.href = canonicalUrl;
    link.textContent = canonicalUrl;

    copyButton.onclick = async () => {
      const copied = await copyText(canonicalUrl);
      announce(copied ? "Link zum Anlassraum kopiert." : "Link konnte nicht automatisch kopiert werden.");
    };

    shareButton.hidden = typeof navigator.share !== "function";
    shareButton.onclick = async () => {
      try {
        await navigator.share({ title, text: "Öffentlicher Vote4Gov-Anlassraum", url: canonicalUrl });
      } catch (error) {
        if (error?.name !== "AbortError") announce("Teilen war auf diesem Gerät nicht möglich.");
      }
    };

    if (typeof dialog.showModal === "function") dialog.showModal();
    else window.open(canonicalUrl, "_blank", "noopener,noreferrer");
  };

  const makeTrigger = (url, title, label = "QR-Code") => {
    const button = document.createElement("button");
    button.className = "qr-trigger";
    button.type = "button";
    button.innerHTML = `${qrIcon}<span>${label}</span>`;
    button.setAttribute("aria-label", `${label} für ${title} anzeigen`);
    button.addEventListener("click", () => openQr(url, title));
    return button;
  };

  document.querySelectorAll(".thesis-invite").forEach((invite) => {
    if (invite.querySelector(".qr-trigger")) return;
    const link = invite.querySelector("a[href*='/anlassraeume/']");
    if (!link) return;
    const title = invite.querySelector("strong")?.textContent?.trim() || "Vote4Gov-Anlassraum";
    const actions = document.createElement("div");
    actions.className = "thesis-invite-actions";
    link.insertAdjacentElement("beforebegin", actions);
    actions.append(link, makeTrigger(link.href, title));
  });

  const roomKey = document.body.dataset.anlassraum;
  if (roomKey) {
    const canonicalUrl = canonicalize(window.location.href);
    const roomTitle = document.querySelector(".room-hero h1")?.textContent?.trim() || document.title.replace(" – Vote4Gov", "");
    const heroActions = document.querySelector(".room-actions");
    if (heroActions && !heroActions.querySelector(".qr-trigger")) heroActions.appendChild(makeTrigger(canonicalUrl, roomTitle, "QR-Code anzeigen"));

    const aside = document.querySelector(".room-aside");
    const contribution = document.querySelector(".room-contribution");
    if (aside && !aside.querySelector(".room-qr-card")) {
      const card = document.createElement("div");
      card.className = "room-qr-card";
      card.innerHTML = `<span>Für Gespräche und Veranstaltungen</span><strong>Diesen Anlassraum direkt teilen</strong><p>Der QR-Code führt genau zu dieser These, ihren Gegenpositionen, Quellen und Prüfaufträgen.</p>`;
      card.appendChild(makeTrigger(canonicalUrl, roomTitle, "QR-Code öffnen"));
      if (contribution) contribution.insertAdjacentElement("beforebegin", card);
      else aside.appendChild(card);
    }
  }

  const indexHead = document.querySelector(".room-index-head");
  if (indexHead && !document.querySelector(".room-index-qr")) {
    const overviewUrl = canonicalize("/anlassraeume.html");
    const panel = document.createElement("div");
    panel.className = "room-index-qr";
    panel.innerHTML = `<div><strong>Alle Anlassräume als gemeinsamer Einstieg</strong><p>Geeignet für Veranstaltungen, Präsentationen und gedruckte Materialien.</p></div>`;
    panel.appendChild(makeTrigger(overviewUrl, "Alle Vote4Gov-Anlassräume", "Übersicht als QR-Code"));
    indexHead.insertAdjacentElement("afterend", panel);
  }
})();