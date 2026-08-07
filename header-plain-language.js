(() => {
  const dictionaries = {
    de: {
      review: "Vote4Gov Review", issue: "Ausgabe 01", sources: "Quellen offen", compare: "International vergleichend", noRecommendation: "Keine Wahlempfehlung",
      ai: "Mit KI erstellt und redaktionell geprüft.", aiLink: "So arbeiten wir mit KI",
      storageTitle: "Deine Angaben bleiben auf diesem Gerät.", storageLead: "Vote4Gov verfolgt dich nicht. Nicht gesendete Vormerkungen bleiben nur hier und zählen nicht als öffentliche Stimme.",
      more: "Mehr erfahren", less: "Weniger anzeigen", clear: "Lokale Angaben löschen", close: "Hinweis schließen", reopen: "Lokale Angaben", detailsTitle: "Was wird gespeichert?",
      details: ["Nicht gesendete Vormerkungen bleiben zunächst nur in diesem Browser.", "Sie sind keine öffentliche Stimme und werden nicht automatisch an Vote4Gov oder eDebatte gesendet.", "Vote4Gov verwendet dafür keine Analyse-, Werbe- oder Tracking-Cookies.", "Für Hosting und Sicherheit können technisch notwendige Verbindungsdaten anfallen.", "Du kannst die lokalen Angaben jederzeit über den Löschbutton entfernen."],
      session: n => `${n} ${n === 1 ? "Vormerkung" : "Vormerkungen"} in dieser Sitzung`, device: n => `${n} auf diesem Gerät gemerkt`, cookies: n => `${n} Vote4Gov-${n === 1 ? "Cookie" : "Cookies"}`, publicVotes: "0 öffentliche Stimmen bei Vote4Gov"
    },
    en: {
      review: "Vote4Gov Review", issue: "Issue 01", sources: "Open sources", compare: "International comparison", noRecommendation: "No voting recommendation",
      ai: "Created with AI and reviewed by editors.", aiLink: "How we use AI",
      storageTitle: "Your information stays on this device.", storageLead: "Vote4Gov does not track you. Unsent notes stay here and do not count as a public vote.",
      more: "Learn more", less: "Show less", clear: "Delete local information", close: "Close notice", reopen: "Local information", detailsTitle: "What is stored?",
      details: ["Unsent notes initially stay only in this browser.", "They are not public votes and are not sent automatically to Vote4Gov or eDebatte.", "Vote4Gov uses no analytics, advertising or tracking cookies for this.", "Hosting and security providers may process technically necessary connection data.", "You can delete local information at any time."],
      session: n => `${n} ${n === 1 ? "note" : "notes"} in this session`, device: n => `${n} saved on this device`, cookies: n => `${n} Vote4Gov ${n === 1 ? "cookie" : "cookies"}`, publicVotes: "0 public votes at Vote4Gov"
    },
    fr: {
      review: "Vote4Gov Review", issue: "Édition 01", sources: "Sources ouvertes", compare: "Comparaison internationale", noRecommendation: "Aucune consigne de vote",
      ai: "Créé avec l’IA et vérifié par la rédaction.", aiLink: "Notre usage de l’IA",
      storageTitle: "Vos informations restent sur cet appareil.", storageLead: "Vote4Gov ne vous suit pas. Les notes non envoyées restent ici et ne comptent pas comme vote public.",
      more: "En savoir plus", less: "Afficher moins", clear: "Supprimer les données locales", close: "Fermer", reopen: "Données locales", detailsTitle: "Que conservons-nous ?",
      details: ["Les notes non envoyées restent d’abord dans ce navigateur.", "Elles ne sont pas des votes publics et ne sont pas envoyées automatiquement à Vote4Gov ou eDebatte.", "Vote4Gov n’utilise aucun cookie d’analyse, de publicité ou de suivi pour cela.", "Des données techniques nécessaires peuvent être traitées pour l’hébergement et la sécurité.", "Vous pouvez supprimer les données locales à tout moment."],
      session: n => `${n} note${n === 1 ? "" : "s"} dans cette session`, device: n => `${n} enregistrée${n === 1 ? "" : "s"} sur cet appareil`, cookies: n => `${n} cookie${n === 1 ? "" : "s"} Vote4Gov`, publicVotes: "0 vote public sur Vote4Gov"
    },
    es: {
      review: "Vote4Gov Review", issue: "Edición 01", sources: "Fuentes abiertas", compare: "Comparación internacional", noRecommendation: "Sin recomendación de voto",
      ai: "Creado con IA y revisado por la redacción.", aiLink: "Cómo usamos la IA",
      storageTitle: "Tus datos permanecen en este dispositivo.", storageLead: "Vote4Gov no te rastrea. Las notas no enviadas permanecen aquí y no cuentan como voto público.",
      more: "Más información", less: "Mostrar menos", clear: "Borrar datos locales", close: "Cerrar aviso", reopen: "Datos locales", detailsTitle: "¿Qué se guarda?",
      details: ["Las notas no enviadas permanecen primero en este navegador.", "No son votos públicos y no se envían automáticamente a Vote4Gov ni a eDebatte.", "Vote4Gov no utiliza cookies de analítica, publicidad o seguimiento para ello.", "El alojamiento y la seguridad pueden requerir datos técnicos de conexión.", "Puedes borrar los datos locales en cualquier momento."],
      session: n => `${n} ${n === 1 ? "nota" : "notas"} en esta sesión`, device: n => `${n} guardada${n === 1 ? "" : "s"} en este dispositivo`, cookies: n => `${n} ${n === 1 ? "cookie" : "cookies"} de Vote4Gov`, publicVotes: "0 votos públicos en Vote4Gov"
    },
    tr: {
      review: "Vote4Gov Review", issue: "Sayı 01", sources: "Açık kaynaklar", compare: "Uluslararası karşılaştırma", noRecommendation: "Oy tavsiyesi yok",
      ai: "Yapay zekâ ile oluşturuldu ve editörlerce kontrol edildi.", aiLink: "Yapay zekâyı nasıl kullanıyoruz",
      storageTitle: "Bilgileriniz bu cihazda kalır.", storageLead: "Vote4Gov sizi takip etmez. Gönderilmemiş notlar burada kalır ve kamuoyu oyu sayılmaz.",
      more: "Daha fazla bilgi", less: "Daha az göster", clear: "Yerel bilgileri sil", close: "Bildirimi kapat", reopen: "Yerel bilgiler", detailsTitle: "Ne saklanır?",
      details: ["Gönderilmemiş notlar önce yalnızca bu tarayıcıda kalır.", "Bunlar kamuoyu oyu değildir ve Vote4Gov veya eDebatte’ye otomatik olarak gönderilmez.", "Vote4Gov bunun için analiz, reklam veya takip çerezleri kullanmaz.", "Barındırma ve güvenlik için teknik bağlantı verileri işlenebilir.", "Yerel bilgileri istediğiniz zaman silebilirsiniz."],
      session: n => `Bu oturumda ${n} not`, device: n => `Bu cihazda ${n} kayıt`, cookies: n => `${n} Vote4Gov çerezi`, publicVotes: "Vote4Gov’da 0 kamuoyu oyu"
    },
    ar: {
      review: "مراجعة Vote4Gov", issue: "الإصدار 01", sources: "مصادر مفتوحة", compare: "مقارنة دولية", noRecommendation: "لا توصية انتخابية",
      ai: "أُنشئ بمساعدة الذكاء الاصطناعي وراجعته هيئة التحرير.", aiLink: "كيف نستخدم الذكاء الاصطناعي",
      storageTitle: "تبقى معلوماتك على هذا الجهاز.", storageLead: "لا يتتبعك Vote4Gov. تبقى الملاحظات غير المرسلة هنا ولا تُحتسب تصويتًا عامًا.",
      more: "معرفة المزيد", less: "عرض أقل", clear: "حذف المعلومات المحلية", close: "إغلاق الإشعار", reopen: "المعلومات المحلية", detailsTitle: "ما الذي يُحفظ؟",
      details: ["تبقى الملاحظات غير المرسلة في هذا المتصفح أولًا.", "ليست تصويتًا عامًا ولا تُرسل تلقائيًا إلى Vote4Gov أو eDebatte.", "لا يستخدم Vote4Gov ملفات تعريف ارتباط للتحليل أو الإعلان أو التتبع لهذا الغرض.", "قد تتطلب الاستضافة والأمان بيانات اتصال تقنية ضرورية.", "يمكنك حذف المعلومات المحلية في أي وقت."],
      session: n => `${n} ملاحظة في هذه الجلسة`, device: n => `${n} محفوظة على هذا الجهاز`, cookies: n => `${n} ملف تعريف ارتباط لـ Vote4Gov`, publicVotes: "0 أصوات عامة في Vote4Gov"
    },
    it: {
      review: "Vote4Gov Review", issue: "Edizione 01", sources: "Fonti aperte", compare: "Confronto internazionale", noRecommendation: "Nessuna indicazione di voto",
      ai: "Creato con l’IA e verificato dalla redazione.", aiLink: "Come usiamo l’IA", storageTitle: "I tuoi dati restano su questo dispositivo.", storageLead: "Vote4Gov non ti traccia. Le note non inviate restano qui e non contano come voto pubblico.",
      more: "Scopri di più", less: "Mostra meno", clear: "Elimina dati locali", close: "Chiudi", reopen: "Dati locali", detailsTitle: "Cosa viene salvato?",
      details: ["Le note non inviate restano inizialmente in questo browser.", "Non sono voti pubblici e non vengono inviate automaticamente.", "Vote4Gov non usa cookie di analisi, pubblicità o tracciamento per questo.", "Hosting e sicurezza possono richiedere dati tecnici.", "Puoi eliminare i dati locali in qualsiasi momento."],
      session: n => `${n} note in questa sessione`, device: n => `${n} salvate sul dispositivo`, cookies: n => `${n} cookie Vote4Gov`, publicVotes: "0 voti pubblici su Vote4Gov"
    },
    pt: {
      review: "Vote4Gov Review", issue: "Edição 01", sources: "Fontes abertas", compare: "Comparação internacional", noRecommendation: "Sem recomendação de voto",
      ai: "Criado com IA e revisto pela redação.", aiLink: "Como usamos IA", storageTitle: "Os seus dados ficam neste dispositivo.", storageLead: "A Vote4Gov não o acompanha. Notas não enviadas ficam aqui e não contam como voto público.",
      more: "Saber mais", less: "Mostrar menos", clear: "Apagar dados locais", close: "Fechar", reopen: "Dados locais", detailsTitle: "O que é guardado?",
      details: ["Notas não enviadas ficam primeiro neste navegador.", "Não são votos públicos e não são enviadas automaticamente.", "A Vote4Gov não usa cookies de análise, publicidade ou rastreio para isto.", "Alojamento e segurança podem exigir dados técnicos.", "Pode apagar os dados locais a qualquer momento."],
      session: n => `${n} notas nesta sessão`, device: n => `${n} guardadas neste dispositivo`, cookies: n => `${n} cookies Vote4Gov`, publicVotes: "0 votos públicos na Vote4Gov"
    },
    nl: {
      review: "Vote4Gov Review", issue: "Editie 01", sources: "Open bronnen", compare: "Internationale vergelijking", noRecommendation: "Geen stemadvies",
      ai: "Gemaakt met AI en gecontroleerd door de redactie.", aiLink: "Hoe we AI gebruiken", storageTitle: "Je gegevens blijven op dit apparaat.", storageLead: "Vote4Gov volgt je niet. Niet-verzonden notities blijven hier en tellen niet als openbare stem.",
      more: "Meer informatie", less: "Minder tonen", clear: "Lokale gegevens wissen", close: "Melding sluiten", reopen: "Lokale gegevens", detailsTitle: "Wat wordt opgeslagen?",
      details: ["Niet-verzonden notities blijven eerst in deze browser.", "Ze zijn geen openbare stemmen en worden niet automatisch verzonden.", "Vote4Gov gebruikt hiervoor geen analyse-, advertentie- of trackingcookies.", "Hosting en beveiliging kunnen technische gegevens vereisen.", "Je kunt lokale gegevens altijd wissen."],
      session: n => `${n} notities in deze sessie`, device: n => `${n} op dit apparaat bewaard`, cookies: n => `${n} Vote4Gov-cookies`, publicVotes: "0 openbare stemmen bij Vote4Gov"
    },
    pl: {
      review: "Vote4Gov Review", issue: "Wydanie 01", sources: "Otwarte źródła", compare: "Porównanie międzynarodowe", noRecommendation: "Bez rekomendacji wyborczej",
      ai: "Utworzono z pomocą AI i sprawdzono redakcyjnie.", aiLink: "Jak korzystamy z AI", storageTitle: "Twoje dane pozostają na tym urządzeniu.", storageLead: "Vote4Gov Cię nie śledzi. Niewysłane notatki pozostają tutaj i nie są głosem publicznym.",
      more: "Dowiedz się więcej", less: "Pokaż mniej", clear: "Usuń dane lokalne", close: "Zamknij", reopen: "Dane lokalne", detailsTitle: "Co zapisujemy?",
      details: ["Niewysłane notatki pozostają najpierw w tej przeglądarce.", "Nie są głosami publicznymi i nie są wysyłane automatycznie.", "Vote4Gov nie używa do tego plików cookie analitycznych, reklamowych ani śledzących.", "Hosting i bezpieczeństwo mogą wymagać danych technicznych.", "Dane lokalne możesz usunąć w każdej chwili."],
      session: n => `${n} notatek w tej sesji`, device: n => `${n} zapisanych na urządzeniu`, cookies: n => `${n} plików cookie Vote4Gov`, publicVotes: "0 głosów publicznych w Vote4Gov"
    },
    uk: {
      review: "Vote4Gov Review", issue: "Випуск 01", sources: "Відкриті джерела", compare: "Міжнародне порівняння", noRecommendation: "Без виборчої рекомендації",
      ai: "Створено за допомогою ШІ та перевірено редакцією.", aiLink: "Як ми використовуємо ШІ", storageTitle: "Ваші дані залишаються на цьому пристрої.", storageLead: "Vote4Gov не відстежує вас. Ненадіслані нотатки залишаються тут і не є публічним голосом.",
      more: "Докладніше", less: "Показати менше", clear: "Видалити локальні дані", close: "Закрити", reopen: "Локальні дані", detailsTitle: "Що зберігається?",
      details: ["Ненадіслані нотатки спочатку залишаються в цьому браузері.", "Вони не є публічними голосами й не надсилаються автоматично.", "Vote4Gov не використовує для цього аналітичні, рекламні або трекінгові cookie.", "Для хостингу та безпеки можуть бути потрібні технічні дані.", "Локальні дані можна видалити будь-коли."],
      session: n => `${n} нотаток у цій сесії`, device: n => `${n} збережено на пристрої`, cookies: n => `${n} cookie Vote4Gov`, publicVotes: "0 публічних голосів у Vote4Gov"
    },
    zh: {
      review: "Vote4Gov 评论", issue: "第 01 期", sources: "开放来源", compare: "国际比较", noRecommendation: "不提供投票建议",
      ai: "由人工智能辅助生成并经编辑审核。", aiLink: "我们如何使用人工智能", storageTitle: "你的信息只保留在这台设备上。", storageLead: "Vote4Gov 不会跟踪你。未发送的记录只保留在这里，也不算公开投票。",
      more: "了解更多", less: "收起", clear: "删除本地信息", close: "关闭提示", reopen: "本地信息", detailsTitle: "保存了什么？",
      details: ["未发送的记录首先只保留在此浏览器中。", "它们不是公开投票，也不会自动发送。", "Vote4Gov 不会为此使用分析、广告或跟踪 Cookie。", "托管和安全可能需要处理必要的技术连接数据。", "你可以随时删除本地信息。"],
      session: n => `本次会话中有 ${n} 条记录`, device: n => `此设备上保存 ${n} 条`, cookies: n => `${n} 个 Vote4Gov Cookie`, publicVotes: "Vote4Gov 上有 0 个公开投票"
    }
  };

  let applying = false;
  const setText = (node, value) => { if (node && node.textContent !== value) node.textContent = value; };
  const setHtml = (node, value) => { if (node && node.innerHTML !== value) node.innerHTML = value; };

  const language = () => {
    const code = document.documentElement.dataset.readingLanguage || document.documentElement.lang || "de";
    return String(code).toLowerCase().split("-")[0];
  };
  const dictionary = () => dictionaries[language()] || dictionaries.en;

  const readJson = (storage, key) => {
    try { const value = storage.getItem(key); return value ? JSON.parse(value) : null; }
    catch { return null; }
  };
  const countTopics = value => value && typeof value === "object" ? Object.values(value).filter(item => item && (item.stance || item.remembered)).length : 0;
  const snapshot = () => {
    const sessionTopics = countTopics(readJson(sessionStorage, "vote4gov:participation-pulse:v1"));
    const deviceTopics = countTopics(readJson(localStorage, "vote4gov:participation-pulse:device:v1"));
    let vote4govCookies = 0;
    try {
      vote4govCookies = document.cookie ? document.cookie.split(";").map(item => item.split("=")[0]?.trim()).filter(name => name?.startsWith("vote4gov_") || name?.startsWith("v4g_")).length : 0;
    } catch { vote4govCookies = 0; }
    return { sessionTopics, deviceTopics, vote4govCookies };
  };

  const applyTopline = d => {
    const groups = document.querySelectorAll(".journal-topline > div");
    setHtml(groups[0], `<strong>${d.review}</strong><span>${d.issue}</span>`);
    setHtml(groups[1], `<span>${d.sources}</span><span>${d.compare}</span><span>${d.noRecommendation}</span>`);
  };

  const applyAiBar = d => {
    const bar = document.querySelector("[data-ai-disclosure-bar]");
    if (!bar) return;
    setText(bar.querySelector("p"), d.ai);
    setText(bar.querySelector("a"), d.aiLink);
  };

  const applyStorage = d => {
    const banner = document.querySelector(".storage-transparency-banner");
    if (!banner) return;
    const detailsButton = banner.querySelector("[data-storage-details]");
    const dismissButton = banner.querySelector("[data-storage-dismiss]");
    const checkbox = banner.querySelector("[data-storage-understood]");

    setText(banner.querySelector("#storage-transparency-title"), d.storageTitle);
    setText(banner.querySelector(".storage-transparency-copy > p"), d.storageLead);
    setText(detailsButton, detailsButton?.getAttribute("aria-expanded") === "true" ? d.less : d.more);
    setText(banner.querySelector("[data-storage-clear]"), d.clear);
    setText(dismissButton, d.close);

    if (checkbox && !checkbox.checked) checkbox.checked = true;
    if (dismissButton?.disabled) dismissButton.disabled = false;
    const checkLabel = banner.querySelector(".storage-transparency-check");
    if (checkLabel && !checkLabel.hidden) checkLabel.hidden = true;

    const detailsHtml = `<h3>${d.detailsTitle}</h3><ul>${d.details.map(item => `<li>${item}</li>`).join("")}</ul>`;
    setHtml(banner.querySelector("[data-storage-details-panel]"), detailsHtml);

    const summary = banner.querySelector("[data-storage-summary]");
    if (summary) {
      const { sessionTopics, deviceTopics, vote4govCookies } = snapshot();
      const values = [d.session(sessionTopics), d.device(deviceTopics), d.cookies(vote4govCookies), d.publicVotes];
      const current = [...summary.children].map(item => item.textContent).join("|");
      if (current !== values.join("|")) {
        summary.replaceChildren(...values.map(value => {
          const chip = document.createElement("span");
          chip.textContent = value;
          return chip;
        }));
      }
    }

    const reopen = document.querySelector(".storage-transparency-reopen");
    setText(reopen, d.reopen);
    if (reopen?.getAttribute("aria-label") !== d.reopen) reopen?.setAttribute("aria-label", d.reopen);
    banner.dataset.plainLanguage = "true";
  };

  const apply = () => {
    if (applying) return;
    applying = true;
    try {
      const d = dictionary();
      applyTopline(d);
      applyAiBar(d);
      applyStorage(d);
    } finally { applying = false; }
  };

  apply();
  const observer = new MutationObserver(() => queueMicrotask(apply));
  observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["aria-expanded"] });
  document.addEventListener("vote4gov:languagechange", () => queueMicrotask(apply));
  document.addEventListener("click", () => window.setTimeout(apply, 0));
})();
