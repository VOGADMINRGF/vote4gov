(() => {
  const LANGUAGE_KEY = "vote4gov:language:v1";
  const QUICK = ["de", "en", "fr", "es", "tr", "ar"];

  const languages = {
    de: {
      flag: "🇩🇪", label: "Deutsch", dir: "ltr",
      ui: {
        choose: "Lesesprache wählen", close: "Hinweis schließen", kicker: "Vollständigen Beitrag öffnen",
        heading: "Wie möchten Sie weiterlesen?", lead: "Wählen Sie Ihre Lesesprache. Die vollständige Analyse bleibt für alle Menschen frei zugänglich.",
        story: "Titelgeschichte", minutes: "8 Minuten", sources: "Quellenoffen", free: "Kostenfrei weiterlesen",
        member: "VoiceOpenGov-Mitglied werden und mitgestalten", fineprint: "Keine Zahlung und keine Registrierung sind erforderlich. Mitgliedschaft unterstützt die Arbeit, schaltet aber kein Wissen frei.",
        revealKicker: "Die eigentliche Frage", revealHeading: "Kommt Ihnen diese Abfrage bekannt vor?",
        revealOne: "Gesellschaftlich relevantes Wissen sollte nicht an eine künstliche Zugangsschranke gebunden sein. Aufwendige redaktionelle Arbeit braucht Finanzierung. Quellen, Einordnung und demokratisch wichtige Informationen sollten dennoch nicht ausschließlich zahlenden Menschen offenstehen.",
        revealTwo: "Vote4Gov bleibt deshalb für alle frei. Eine VoiceOpenGov-Mitgliedschaft bedeutet Unterstützung und Mitwirkung – nicht das Freikaufen von Informationen.",
        openFull: "Beitrag vollständig öffnen", memberShort: "Mitglied werden und mitgestalten", more: "Weitere Sprachen",
        privacyKicker: "Datenschutz statt Einwilligungsroutine", privacyTitle: "Keine Tracking-Einwilligung erforderlich.",
        privacyOne: "Diese Vote4Gov-Ausgabe setzt keine Analyse-, Werbe- oder Tracking-Cookies ein, erstellt keine Verhaltensprofile und verkauft keine Nutzungsdaten. Technisch notwendige Hosting- und Sicherheitsdaten können anfallen und werden transparent beschrieben.",
        privacyTwo: "Nicht notwendige Datennutzung braucht eine getrennte, konkrete und aktive Einwilligung, die ebenso einfach widerrufen werden kann.",
        privacyLink: "Datenschutz prüfen", continue: "Weiterlesen",
        coverage: "Oberfläche und Vorschau werden automatisch umgestellt. Die vollständigen Artikel der Ausgabe 01 bleiben bis zur jeweiligen veröffentlichten Übersetzung in ihrer Originalsprache gekennzeichnet."
      },
      preview: {
        title: "Unsere Gesellschaft verändert sich jeden Tag. Warum darf sie politisch meist nur alle paar Jahre antworten?",
        paragraphs: [
          "Wir wählen politische Gesamtpakete, reagieren auf vorgegebene Fragen und erfahren gesellschaftliche Stimmung über Schlagzeilen und begrenzte Stichproben.",
          "Vote4Gov untersucht, wie diese Ordnung entstanden ist, was sie geleistet hat und weshalb demokratische Rückkopplung heute weiterentwickelt werden muss.",
          "Die Frage ist nicht, ob Parlamente, Medien oder Umfragen verschwinden sollen, sondern warum sie fast allein bestimmen, wie gesellschaftlicher Wille sichtbar wird."
        ]
      },
      nav: { "Titelseite": "Titelseite", "Quellen & Methode": "Quellen & Methode", "KI-Transparenz": "KI-Transparenz", "Korrektur": "Korrektur", "Kontakt": "Kontakt", "Ressorts": "Ressorts" }
    },
    en: {
      flag: "🇬🇧", label: "English", dir: "ltr",
      ui: {
        choose: "Choose reading language", close: "Close notice", kicker: "Open the full article",
        heading: "How would you like to continue reading?", lead: "Choose your reading language. The complete analysis remains freely accessible to everyone.",
        story: "Cover story", minutes: "8 minutes", sources: "Open sources", free: "Continue for free",
        member: "Join VoiceOpenGov and help shape it", fineprint: "No payment or registration is required. Membership supports the work but does not unlock knowledge.",
        revealKicker: "The real question", revealHeading: "Does this prompt look familiar?",
        revealOne: "Socially relevant knowledge should not be tied to an artificial access barrier. Serious editorial work needs funding, but sources, context and democratically important information should not be reserved exclusively for paying readers.",
        revealTwo: "Vote4Gov therefore remains free for everyone. VoiceOpenGov membership means support and participation, not buying access to information.",
        openFull: "Open the full article", memberShort: "Join and participate", more: "More languages",
        privacyKicker: "Privacy instead of consent routine", privacyTitle: "No tracking consent required.",
        privacyOne: "This Vote4Gov issue uses no analytics, advertising or tracking cookies, creates no behavioural profiles and sells no usage data. Technically necessary hosting and security data may still arise and are described transparently.",
        privacyTwo: "Non-essential data use requires separate, specific and active consent that can be withdrawn just as easily.",
        privacyLink: "Review privacy information", continue: "Continue reading",
        coverage: "The interface and preview switch automatically. Full Issue 01 articles remain clearly marked in their original language until the respective translation is published."
      },
      preview: {
        title: "Society changes every day. Why can it usually answer politically only every few years?",
        paragraphs: [
          "We elect political packages, respond to predefined questions and learn about public sentiment through headlines and limited samples.",
          "Vote4Gov examines how this order emerged, what it has achieved and why democratic feedback must now evolve further.",
          "The question is not whether parliaments, media or polls should disappear, but why they almost alone determine how public will becomes visible."
        ]
      },
      nav: { "Titelseite": "Front page", "Quellen & Methode": "Sources & method", "KI-Transparenz": "AI transparency", "Korrektur": "Corrections", "Kontakt": "Contact", "Ressorts": "Sections" }
    },
    fr: {
      flag: "🇫🇷", label: "Français", dir: "ltr",
      ui: {
        choose: "Choisir la langue de lecture", close: "Fermer l’avis", kicker: "Ouvrir l’article complet",
        heading: "Comment souhaitez-vous poursuivre votre lecture ?", lead: "Choisissez votre langue de lecture. L’analyse complète reste librement accessible à toutes et tous.",
        story: "Article de couverture", minutes: "8 minutes", sources: "Sources ouvertes", free: "Continuer gratuitement",
        member: "Rejoindre VoiceOpenGov et participer", fineprint: "Aucun paiement ni inscription n’est requis. L’adhésion soutient le travail mais ne débloque aucun savoir.",
        revealKicker: "La vraie question", revealHeading: "Cette demande vous semble-t-elle familière ?",
        revealOne: "Les connaissances socialement pertinentes ne devraient pas être liées à une barrière d’accès artificielle. Le travail éditorial exige des moyens, mais les sources, le contexte et les informations démocratiquement importantes ne devraient pas être réservés aux seules personnes qui paient.",
        revealTwo: "Vote4Gov reste donc gratuit pour toutes et tous. L’adhésion à VoiceOpenGov signifie soutien et participation, non l’achat d’un accès à l’information.",
        openFull: "Ouvrir l’article complet", memberShort: "Adhérer et participer", more: "Autres langues",
        privacyKicker: "La vie privée plutôt qu’une routine de consentement", privacyTitle: "Aucun consentement au suivi n’est nécessaire.",
        privacyOne: "Cette édition de Vote4Gov n’utilise aucun cookie d’analyse, de publicité ou de suivi, ne crée aucun profil comportemental et ne vend aucune donnée d’usage. Des données techniques nécessaires à l’hébergement et à la sécurité peuvent néanmoins être traitées et sont décrites en toute transparence.",
        privacyTwo: "Toute utilisation non nécessaire des données exige un consentement séparé, précis et actif, révocable tout aussi facilement.",
        privacyLink: "Consulter la confidentialité", continue: "Poursuivre la lecture",
        coverage: "L’interface et l’aperçu changent automatiquement. Les articles complets de l’Ausgabe 01 restent clairement signalés dans leur langue d’origine jusqu’à la publication de leur traduction."
      },
      preview: {
        title: "Notre société change chaque jour. Pourquoi ne peut-elle répondre politiquement que tous les quelques années ?",
        paragraphs: [
          "Nous élisons des ensembles politiques, répondons à des questions prédéfinies et découvrons l’opinion publique à travers des titres et des échantillons limités.",
          "Vote4Gov étudie l’origine de cet ordre, ses acquis et les raisons pour lesquelles la rétroaction démocratique doit aujourd’hui évoluer.",
          "La question n’est pas de supprimer les parlements, les médias ou les sondages, mais de comprendre pourquoi ils déterminent presque seuls la visibilité de la volonté collective."
        ]
      },
      nav: { "Titelseite": "Une", "Quellen & Methode": "Sources et méthode", "KI-Transparenz": "Transparence IA", "Korrektur": "Corrections", "Kontakt": "Contact", "Ressorts": "Rubriques" }
    },
    es: {
      flag: "🇪🇸", label: "Español", dir: "ltr",
      ui: {
        choose: "Elegir idioma de lectura", close: "Cerrar aviso", kicker: "Abrir el artículo completo",
        heading: "¿Cómo desea seguir leyendo?", lead: "Elija su idioma de lectura. El análisis completo seguirá siendo gratuito para todas las personas.",
        story: "Historia de portada", minutes: "8 minutos", sources: "Fuentes abiertas", free: "Seguir gratis",
        member: "Unirse a VoiceOpenGov y participar", fineprint: "No se requiere pago ni registro. La membresía apoya el trabajo, pero no desbloquea conocimiento.",
        revealKicker: "La verdadera pregunta", revealHeading: "¿Le resulta familiar esta solicitud?",
        revealOne: "El conocimiento socialmente relevante no debería depender de una barrera de acceso artificial. El trabajo editorial necesita financiación, pero las fuentes, el contexto y la información democráticamente importante no deberían reservarse únicamente a quienes pagan.",
        revealTwo: "Por eso Vote4Gov sigue siendo gratuito para todos. Ser miembro de VoiceOpenGov significa apoyar y participar, no comprar acceso a la información.",
        openFull: "Abrir el artículo completo", memberShort: "Unirse y participar", more: "Más idiomas",
        privacyKicker: "Privacidad en lugar de una rutina de consentimiento", privacyTitle: "No se requiere consentimiento para seguimiento.",
        privacyOne: "Esta edición de Vote4Gov no utiliza cookies de analítica, publicidad o seguimiento, no crea perfiles de comportamiento ni vende datos de uso. Aun así, pueden generarse datos técnicos necesarios para el alojamiento y la seguridad, que se describen con transparencia.",
        privacyTwo: "El uso no esencial de datos requiere un consentimiento separado, específico y activo que pueda retirarse con la misma facilidad.",
        privacyLink: "Revisar privacidad", continue: "Seguir leyendo",
        coverage: "La interfaz y la vista previa cambian automáticamente. Los artículos completos de la Ausgabe 01 permanecen identificados en su idioma original hasta que se publique cada traducción."
      },
      preview: {
        title: "Nuestra sociedad cambia cada día. ¿Por qué políticamente solo puede responder cada varios años?",
        paragraphs: [
          "Elegimos paquetes políticos, respondemos a preguntas predeterminadas y conocemos el estado de ánimo social mediante titulares y muestras limitadas.",
          "Vote4Gov analiza cómo surgió este orden, qué ha logrado y por qué la retroalimentación democrática debe seguir evolucionando.",
          "La cuestión no es eliminar parlamentos, medios o encuestas, sino entender por qué casi solo ellos determinan cómo se hace visible la voluntad social."
        ]
      },
      nav: { "Titelseite": "Portada", "Quellen & Methode": "Fuentes y método", "KI-Transparenz": "Transparencia de IA", "Korrektur": "Correcciones", "Kontakt": "Contacto", "Ressorts": "Secciones" }
    },
    tr: {
      flag: "🇹🇷", label: "Türkçe", dir: "ltr",
      ui: {
        choose: "Okuma dilini seçin", close: "Bildirimi kapat", kicker: "Yazının tamamını aç",
        heading: "Nasıl okumaya devam etmek istersiniz?", lead: "Okuma dilinizi seçin. Analizin tamamı herkes için ücretsiz erişilebilir kalır.",
        story: "Kapak konusu", minutes: "8 dakika", sources: "Açık kaynaklar", free: "Ücretsiz devam et",
        member: "VoiceOpenGov’a katıl ve katkıda bulun", fineprint: "Ödeme veya kayıt gerekmez. Üyelik çalışmayı destekler, bilgiyi ücretli olarak açmaz.",
        revealKicker: "Asıl soru", revealHeading: "Bu sorgu size tanıdık geliyor mu?",
        revealOne: "Toplumsal açıdan önemli bilgi yapay bir erişim engeline bağlanmamalıdır. Nitelikli editoryal çalışma finansman gerektirir; ancak kaynaklar, bağlam ve demokratik açıdan önemli bilgiler yalnızca ödeme yapanlara ayrılmamalıdır.",
        revealTwo: "Bu nedenle Vote4Gov herkes için ücretsiz kalır. VoiceOpenGov üyeliği bilgiye erişim satın almak değil, destek ve katılım anlamına gelir.",
        openFull: "Yazının tamamını aç", memberShort: "Üye ol ve katıl", more: "Diğer diller",
        privacyKicker: "Rutin onay yerine gizlilik", privacyTitle: "Takip izni gerekmiyor.",
        privacyOne: "Bu Vote4Gov sayısı analiz, reklam veya takip çerezleri kullanmaz; davranış profili oluşturmaz ve kullanım verisi satmaz. Barındırma ve güvenlik için teknik olarak gerekli veriler yine de oluşabilir ve şeffaf biçimde açıklanır.",
        privacyTwo: "Gerekli olmayan veri kullanımı, kolayca geri çekilebilen ayrı, belirli ve aktif bir onay gerektirir.",
        privacyLink: "Gizliliği incele", continue: "Okumaya devam et",
        coverage: "Arayüz ve önizleme otomatik olarak değişir. Ausgabe 01’in tam yazıları, ilgili çeviri yayımlanana kadar özgün dilinde açıkça işaretlenir."
      },
      preview: {
        title: "Toplumumuz her gün değişiyor. Neden siyaseten çoğunlukla yalnızca birkaç yılda bir yanıt verebiliyor?",
        paragraphs: [
          "Siyasi paketleri seçiyor, önceden belirlenmiş sorulara yanıt veriyor ve toplumsal eğilimleri manşetler ile sınırlı örneklemler üzerinden öğreniyoruz.",
          "Vote4Gov bu düzenin nasıl oluştuğunu, ne başardığını ve demokratik geri bildirimin neden bugün geliştirilmesi gerektiğini inceliyor.",
          "Soru parlamentoların, medyanın ya da anketlerin ortadan kalkması değil; toplumsal iradenin görünürlüğünü neden neredeyse yalnızca onların belirlediğidir."
        ]
      },
      nav: { "Titelseite": "Ana sayfa", "Quellen & Methode": "Kaynaklar ve yöntem", "KI-Transparenz": "Yapay zekâ şeffaflığı", "Korrektur": "Düzeltmeler", "Kontakt": "İletişim", "Ressorts": "Bölümler" }
    },
    ar: {
      flag: "🌍", label: "العربية", dir: "rtl",
      ui: {
        choose: "اختر لغة القراءة", close: "إغلاق الإشعار", kicker: "فتح المقال كاملاً",
        heading: "كيف ترغب في متابعة القراءة؟", lead: "اختر لغة القراءة. يظل التحليل الكامل متاحاً مجاناً للجميع.",
        story: "موضوع الغلاف", minutes: "8 دقائق", sources: "مصادر مفتوحة", free: "متابعة القراءة مجاناً",
        member: "انضم إلى VoiceOpenGov وشارك", fineprint: "لا يلزم دفع أو تسجيل. العضوية تدعم العمل ولا تجعل المعرفة خدمة مدفوعة.",
        revealKicker: "السؤال الحقيقي", revealHeading: "هل تبدو لك هذه النافذة مألوفة؟",
        revealOne: "لا ينبغي ربط المعرفة ذات الأهمية المجتمعية بحاجز وصول مصطنع. يحتاج العمل التحريري الجاد إلى تمويل، لكن المصادر والسياق والمعلومات المهمة ديمقراطياً لا ينبغي أن تكون متاحة فقط لمن يدفع.",
        revealTwo: "لذلك يبقى Vote4Gov مجانياً للجميع. عضوية VoiceOpenGov تعني الدعم والمشاركة، لا شراء الوصول إلى المعلومات.",
        openFull: "فتح المقال كاملاً", memberShort: "الانضمام والمشاركة", more: "لغات أخرى",
        privacyKicker: "الخصوصية بدلاً من روتين الموافقة", privacyTitle: "لا حاجة إلى موافقة على التتبع.",
        privacyOne: "لا تستخدم هذه النسخة من Vote4Gov ملفات تعريف ارتباط للتحليل أو الإعلان أو التتبع، ولا تنشئ ملفات سلوكية ولا تبيع بيانات الاستخدام. قد تنشأ بيانات تقنية ضرورية للاستضافة والأمان، ويتم شرحها بشفافية.",
        privacyTwo: "يتطلب أي استخدام غير ضروري للبيانات موافقة منفصلة ومحددة ونشطة يمكن سحبها بالسهولة نفسها.",
        privacyLink: "مراجعة الخصوصية", continue: "متابعة القراءة",
        coverage: "تتغير الواجهة والمعاينة تلقائياً. تبقى المقالات الكاملة في Ausgabe 01 مميزة بلغتها الأصلية حتى نشر ترجمتها."
      },
      preview: {
        title: "يتغير مجتمعنا كل يوم. فلماذا لا يستطيع التعبير سياسياً إلا مرة كل بضع سنوات؟",
        paragraphs: [
          "ننتخب حزمًا سياسية، ونجيب عن أسئلة محددة مسبقًا، ونتعرف إلى المزاج العام عبر العناوين والعينات المحدودة.",
          "يفحص Vote4Gov كيف نشأ هذا النظام، وما الذي حققه، ولماذا ينبغي تطوير آليات التغذية الراجعة الديمقراطية اليوم.",
          "السؤال ليس ما إذا كان ينبغي أن تختفي البرلمانات أو وسائل الإعلام أو الاستطلاعات، بل لماذا تكاد وحدها تحدد كيف تصبح الإرادة المجتمعية مرئية."
        ]
      },
      nav: { "Titelseite": "الصفحة الرئيسية", "Quellen & Methode": "المصادر والمنهج", "KI-Transparenz": "شفافية الذكاء الاصطناعي", "Korrektur": "التصحيحات", "Kontakt": "اتصال", "Ressorts": "الأقسام" }
    },
    it: {
      flag: "🇮🇹", label: "Italiano", dir: "ltr",
      ui: {
        choose: "Scegli la lingua di lettura", close: "Chiudi avviso", kicker: "Apri l’articolo completo",
        heading: "Come desidera continuare a leggere?", lead: "Scelga la lingua di lettura. L’analisi completa resta accessibile gratuitamente a tutti.",
        story: "Storia di copertina", minutes: "8 minuti", sources: "Fonti aperte", free: "Continua gratuitamente",
        member: "Unisciti a VoiceOpenGov e partecipa", fineprint: "Non sono richiesti pagamento o registrazione. L’adesione sostiene il lavoro ma non sblocca la conoscenza.",
        revealKicker: "La vera domanda", revealHeading: "Questa richiesta le sembra familiare?",
        revealOne: "La conoscenza socialmente rilevante non dovrebbe dipendere da una barriera artificiale. Il lavoro editoriale richiede finanziamenti, ma fonti, contesto e informazioni democraticamente importanti non dovrebbero essere riservati solo a chi paga.",
        revealTwo: "Vote4Gov resta quindi gratuito per tutti. L’adesione a VoiceOpenGov significa sostegno e partecipazione, non acquisto dell’accesso alle informazioni.",
        openFull: "Apri l’articolo completo", memberShort: "Aderisci e partecipa", more: "Altre lingue",
        privacyKicker: "Privacy invece di una routine di consenso", privacyTitle: "Nessun consenso al tracciamento richiesto.",
        privacyOne: "Questa edizione di Vote4Gov non usa cookie di analisi, pubblicità o tracciamento, non crea profili comportamentali e non vende dati d’uso. Possono comunque essere trattati dati tecnici necessari per hosting e sicurezza, descritti in modo trasparente.",
        privacyTwo: "L’uso non necessario dei dati richiede un consenso separato, specifico e attivo, revocabile con la stessa facilità.",
        privacyLink: "Consulta la privacy", continue: "Continua a leggere",
        coverage: "Interfaccia e anteprima cambiano automaticamente. Gli articoli completi dell’Ausgabe 01 restano indicati nella lingua originale finché non viene pubblicata la relativa traduzione."
      },
      preview: {
        title: "La società cambia ogni giorno. Perché politicamente può rispondere quasi solo ogni pochi anni?",
        paragraphs: [
          "Eleg­giamo pacchetti politici, rispondiamo a domande predefinite e conosciamo l’umore pubblico attraverso titoli e campioni limitati.",
          "Vote4Gov esamina come è nato questo ordine, cosa ha ottenuto e perché il riscontro democratico deve evolvere.",
          "La domanda non è se parlamenti, media o sondaggi debbano scomparire, ma perché determinano quasi da soli come diventa visibile la volontà collettiva."
        ]
      },
      nav: { "Titelseite": "Prima pagina", "Quellen & Methode": "Fonti e metodo", "KI-Transparenz": "Trasparenza IA", "Korrektur": "Correzioni", "Kontakt": "Contatti", "Ressorts": "Sezioni" }
    },
    pt: {
      flag: "🇵🇹", label: "Português", dir: "ltr",
      ui: {
        choose: "Escolher idioma de leitura", close: "Fechar aviso", kicker: "Abrir o artigo completo",
        heading: "Como gostaria de continuar a ler?", lead: "Escolha o seu idioma de leitura. A análise completa permanece gratuitamente acessível a todas as pessoas.",
        story: "Reportagem de capa", minutes: "8 minutos", sources: "Fontes abertas", free: "Continuar gratuitamente",
        member: "Juntar-se à VoiceOpenGov e participar", fineprint: "Não é necessário pagar nem registar-se. A adesão apoia o trabalho, mas não desbloqueia conhecimento.",
        revealKicker: "A verdadeira questão", revealHeading: "Este pedido parece-lhe familiar?",
        revealOne: "O conhecimento socialmente relevante não deve depender de uma barreira artificial. O trabalho editorial exige financiamento, mas fontes, contexto e informação democraticamente importante não devem ficar reservados apenas a quem paga.",
        revealTwo: "Por isso, Vote4Gov continua gratuito para todos. A adesão à VoiceOpenGov significa apoio e participação, não compra de acesso à informação.",
        openFull: "Abrir o artigo completo", memberShort: "Aderir e participar", more: "Mais idiomas",
        privacyKicker: "Privacidade em vez de uma rotina de consentimento", privacyTitle: "Não é necessário consentimento de rastreio.",
        privacyOne: "Esta edição da Vote4Gov não utiliza cookies de análise, publicidade ou rastreio, não cria perfis comportamentais e não vende dados de utilização. Podem ainda existir dados técnicos necessários para alojamento e segurança, descritos de forma transparente.",
        privacyTwo: "A utilização não essencial de dados exige consentimento separado, específico e ativo, que possa ser retirado com a mesma facilidade.",
        privacyLink: "Consultar privacidade", continue: "Continuar a ler",
        coverage: "A interface e a pré-visualização mudam automaticamente. Os artigos completos da Ausgabe 01 permanecem assinalados no idioma original até à publicação da respetiva tradução."
      },
      preview: {
        title: "A sociedade muda todos os dias. Porque é que politicamente só pode responder de poucos em poucos anos?",
        paragraphs: [
          "Elegemos pacotes políticos, respondemos a perguntas predefinidas e conhecemos o sentimento público através de manchetes e amostras limitadas.",
          "Vote4Gov analisa como esta ordem surgiu, o que alcançou e por que razão o retorno democrático deve evoluir.",
          "A questão não é eliminar parlamentos, meios de comunicação ou sondagens, mas compreender por que determinam quase sozinhos como a vontade coletiva se torna visível."
        ]
      },
      nav: { "Titelseite": "Capa", "Quellen & Methode": "Fontes e método", "KI-Transparenz": "Transparência da IA", "Korrektur": "Correções", "Kontakt": "Contacto", "Ressorts": "Secções" }
    },
    nl: {
      flag: "🇳🇱", label: "Nederlands", dir: "ltr",
      ui: {
        choose: "Leestaal kiezen", close: "Melding sluiten", kicker: "Volledig artikel openen",
        heading: "Hoe wilt u verder lezen?", lead: "Kies uw leestaal. De volledige analyse blijft voor iedereen vrij toegankelijk.",
        story: "Omslagverhaal", minutes: "8 minuten", sources: "Open bronnen", free: "Gratis verder lezen",
        member: "Word lid van VoiceOpenGov en doe mee", fineprint: "Betaling of registratie is niet nodig. Lidmaatschap ondersteunt het werk maar ontgrendelt geen kennis.",
        revealKicker: "De echte vraag", revealHeading: "Komt deze vraag u bekend voor?",
        revealOne: "Maatschappelijk relevante kennis mag niet aan een kunstmatige toegangsdrempel worden gekoppeld. Redactioneel werk vraagt financiering, maar bronnen, context en democratisch belangrijke informatie mogen niet uitsluitend voor betalende lezers zijn.",
        revealTwo: "Vote4Gov blijft daarom voor iedereen gratis. Lidmaatschap van VoiceOpenGov betekent steun en deelname, niet het kopen van toegang tot informatie.",
        openFull: "Volledig artikel openen", memberShort: "Lid worden en meedoen", more: "Meer talen",
        privacyKicker: "Privacy in plaats van een toestemmingsroutine", privacyTitle: "Geen toestemming voor tracking nodig.",
        privacyOne: "Deze Vote4Gov-uitgave gebruikt geen analyse-, advertentie- of trackingcookies, maakt geen gedragsprofielen en verkoopt geen gebruiksgegevens. Technisch noodzakelijke hosting- en beveiligingsgegevens kunnen wel ontstaan en worden transparant beschreven.",
        privacyTwo: "Niet-noodzakelijk datagebruik vereist afzonderlijke, specifieke en actieve toestemming die even eenvoudig kan worden ingetrokken.",
        privacyLink: "Privacy bekijken", continue: "Verder lezen",
        coverage: "De interface en voorvertoning schakelen automatisch om. Volledige artikelen van Ausgabe 01 blijven in hun oorspronkelijke taal gemarkeerd tot de betreffende vertaling is gepubliceerd."
      },
      preview: {
        title: "De samenleving verandert elke dag. Waarom kan zij politiek meestal maar eens in de paar jaar antwoorden?",
        paragraphs: [
          "We kiezen politieke totaalpakketten, reageren op vooraf bepaalde vragen en leren de publieke stemming kennen via koppen en beperkte steekproeven.",
          "Vote4Gov onderzoekt hoe deze orde ontstond, wat zij heeft bereikt en waarom democratische terugkoppeling verder moet worden ontwikkeld.",
          "De vraag is niet of parlementen, media of peilingen moeten verdwijnen, maar waarom zij bijna alleen bepalen hoe de maatschappelijke wil zichtbaar wordt."
        ]
      },
      nav: { "Titelseite": "Voorpagina", "Quellen & Methode": "Bronnen en methode", "KI-Transparenz": "AI-transparantie", "Korrektur": "Correcties", "Kontakt": "Contact", "Ressorts": "Rubrieken" }
    },
    pl: {
      flag: "🇵🇱", label: "Polski", dir: "ltr",
      ui: {
        choose: "Wybierz język czytania", close: "Zamknij komunikat", kicker: "Otwórz pełny artykuł",
        heading: "Jak chcesz kontynuować czytanie?", lead: "Wybierz język. Pełna analiza pozostaje bezpłatnie dostępna dla wszystkich.",
        story: "Temat okładkowy", minutes: "8 minut", sources: "Otwarte źródła", free: "Czytaj dalej bezpłatnie",
        member: "Dołącz do VoiceOpenGov i współtwórz", fineprint: "Płatność ani rejestracja nie są wymagane. Członkostwo wspiera pracę, ale nie odblokowuje wiedzy.",
        revealKicker: "Właściwe pytanie", revealHeading: "Czy ten komunikat wygląda znajomo?",
        revealOne: "Wiedza istotna społecznie nie powinna być związana ze sztuczną barierą dostępu. Rzetelna praca redakcyjna wymaga finansowania, lecz źródła, kontekst i demokratycznie ważne informacje nie powinny być dostępne wyłącznie dla płacących.",
        revealTwo: "Dlatego Vote4Gov pozostaje bezpłatny dla wszystkich. Członkostwo w VoiceOpenGov oznacza wsparcie i udział, a nie kupowanie dostępu do informacji.",
        openFull: "Otwórz pełny artykuł", memberShort: "Dołącz i uczestnicz", more: "Więcej języków",
        privacyKicker: "Prywatność zamiast rutynowej zgody", privacyTitle: "Zgoda na śledzenie nie jest wymagana.",
        privacyOne: "To wydanie Vote4Gov nie używa plików cookie do analityki, reklamy ani śledzenia, nie tworzy profili zachowań i nie sprzedaje danych o korzystaniu. Mogą jednak powstawać technicznie niezbędne dane hostingowe i bezpieczeństwa, opisane w sposób przejrzysty.",
        privacyTwo: "Niepotrzebne wykorzystanie danych wymaga osobnej, konkretnej i aktywnej zgody, którą równie łatwo można wycofać.",
        privacyLink: "Sprawdź prywatność", continue: "Czytaj dalej",
        coverage: "Interfejs i podgląd przełączają się automatycznie. Pełne artykuły Ausgabe 01 pozostają oznaczone w języku oryginalnym do czasu publikacji odpowiedniego tłumaczenia."
      },
      preview: {
        title: "Społeczeństwo zmienia się każdego dnia. Dlaczego politycznie może odpowiadać zazwyczaj tylko raz na kilka lat?",
        paragraphs: [
          "Wybieramy polityczne pakiety, odpowiadamy na z góry ustalone pytania i poznajemy nastroje społeczne poprzez nagłówki i ograniczone próby.",
          "Vote4Gov bada, jak powstał ten porządek, co osiągnął i dlaczego demokratyczne sprzężenie zwrotne musi się dalej rozwijać.",
          "Pytanie nie brzmi, czy parlamenty, media lub sondaże mają zniknąć, lecz dlaczego niemal wyłącznie one decydują o widoczności woli społecznej."
        ]
      },
      nav: { "Titelseite": "Strona główna", "Quellen & Methode": "Źródła i metoda", "KI-Transparenz": "Przejrzystość AI", "Korrektur": "Korekty", "Kontakt": "Kontakt", "Ressorts": "Działy" }
    },
    uk: {
      flag: "🇺🇦", label: "Українська", dir: "ltr",
      ui: {
        choose: "Оберіть мову читання", close: "Закрити повідомлення", kicker: "Відкрити повну статтю",
        heading: "Як ви хочете продовжити читання?", lead: "Оберіть мову. Повний аналіз залишається безкоштовно доступним для всіх.",
        story: "Головний матеріал", minutes: "8 хвилин", sources: "Відкриті джерела", free: "Читати безкоштовно",
        member: "Приєднатися до VoiceOpenGov і брати участь", fineprint: "Оплата чи реєстрація не потрібні. Членство підтримує роботу, але не відкриває знання за плату.",
        revealKicker: "Справжнє питання", revealHeading: "Це повідомлення здається вам знайомим?",
        revealOne: "Суспільно важливі знання не повинні залежати від штучного бар’єра доступу. Якісна редакційна робота потребує фінансування, але джерела, контекст і важлива для демократії інформація не мають бути доступними лише тим, хто платить.",
        revealTwo: "Тому Vote4Gov залишається безкоштовним для всіх. Членство у VoiceOpenGov означає підтримку та участь, а не купівлю доступу до інформації.",
        openFull: "Відкрити повну статтю", memberShort: "Приєднатися й брати участь", more: "Інші мови",
        privacyKicker: "Приватність замість формальної згоди", privacyTitle: "Згода на відстеження не потрібна.",
        privacyOne: "Цей випуск Vote4Gov не використовує аналітичні, рекламні чи відстежувальні файли cookie, не створює поведінкових профілів і не продає дані про використання. Технічно необхідні дані хостингу та безпеки можуть виникати й описуються прозоро.",
        privacyTwo: "Необов’язкове використання даних потребує окремої, конкретної й активної згоди, яку так само легко відкликати.",
        privacyLink: "Переглянути приватність", continue: "Продовжити читання",
        coverage: "Інтерфейс і попередній перегляд перемикаються автоматично. Повні статті Ausgabe 01 залишаються позначеними мовою оригіналу до публікації відповідного перекладу."
      },
      preview: {
        title: "Суспільство змінюється щодня. Чому політично воно зазвичай може відповісти лише раз на кілька років?",
        paragraphs: [
          "Ми обираємо політичні пакети, відповідаємо на заздалегідь визначені запитання і дізнаємося про суспільні настрої з заголовків та обмежених вибірок.",
          "Vote4Gov досліджує, як виник цей порядок, чого він досяг і чому демократичний зворотний зв’язок має розвиватися далі.",
          "Питання не в тому, чи мають зникнути парламенти, медіа або опитування, а чому майже лише вони визначають, як стає видимою суспільна воля."
        ]
      },
      nav: { "Titelseite": "Головна", "Quellen & Methode": "Джерела та метод", "KI-Transparenz": "Прозорість ШІ", "Korrektur": "Виправлення", "Kontakt": "Контакт", "Ressorts": "Розділи" }
    },
    ru: {
      flag: "🌐", label: "Русский", dir: "ltr",
      ui: {
        choose: "Выберите язык чтения", close: "Закрыть уведомление", kicker: "Открыть полную статью",
        heading: "Как вы хотите продолжить чтение?", lead: "Выберите язык. Полный анализ остаётся бесплатно доступным для всех.",
        story: "Главный материал", minutes: "8 минут", sources: "Открытые источники", free: "Читать бесплатно",
        member: "Вступить в VoiceOpenGov и участвовать", fineprint: "Оплата и регистрация не требуются. Членство поддерживает работу, но не открывает знания за плату.",
        revealKicker: "Настоящий вопрос", revealHeading: "Это окно кажется вам знакомым?",
        revealOne: "Общественно значимые знания не должны зависеть от искусственного барьера доступа. Качественная редакционная работа требует финансирования, однако источники, контекст и важная для демократии информация не должны быть доступны только тем, кто платит.",
        revealTwo: "Поэтому Vote4Gov остаётся бесплатным для всех. Членство в VoiceOpenGov означает поддержку и участие, а не покупку доступа к информации.",
        openFull: "Открыть полную статью", memberShort: "Вступить и участвовать", more: "Другие языки",
        privacyKicker: "Конфиденциальность вместо формальной галочки", privacyTitle: "Согласие на отслеживание не требуется.",
        privacyOne: "Этот выпуск Vote4Gov не использует аналитические, рекламные или отслеживающие cookie, не создаёт поведенческие профили и не продаёт данные об использовании. Технически необходимые данные хостинга и безопасности могут обрабатываться и описываются прозрачно.",
        privacyTwo: "Необязательное использование данных требует отдельного, конкретного и активного согласия, которое так же легко отозвать.",
        privacyLink: "Проверить конфиденциальность", continue: "Продолжить чтение",
        coverage: "Интерфейс и предварительный просмотр переключаются автоматически. Полные статьи Ausgabe 01 остаются отмеченными языком оригинала до публикации соответствующего перевода."
      },
      preview: {
        title: "Общество меняется каждый день. Почему политически оно обычно может ответить лишь раз в несколько лет?",
        paragraphs: [
          "Мы выбираем политические пакеты, отвечаем на заранее заданные вопросы и узнаём об общественных настроениях через заголовки и ограниченные выборки.",
          "Vote4Gov исследует, как возник этот порядок, чего он достиг и почему демократическая обратная связь должна развиваться дальше.",
          "Вопрос не в том, должны ли исчезнуть парламенты, СМИ или опросы, а в том, почему почти только они определяют, как становится видимой общественная воля."
        ]
      },
      nav: { "Titelseite": "Главная", "Quellen & Methode": "Источники и метод", "KI-Transparenz": "Прозрачность ИИ", "Korrektur": "Исправления", "Kontakt": "Контакт", "Ressorts": "Разделы" }
    },
    ro: {
      flag: "🇷🇴", label: "Română", dir: "ltr",
      ui: {
        choose: "Alegeți limba de lectură", close: "Închideți mesajul", kicker: "Deschideți articolul complet",
        heading: "Cum doriți să continuați lectura?", lead: "Alegeți limba de lectură. Analiza completă rămâne accesibilă gratuit tuturor.",
        story: "Subiect de copertă", minutes: "8 minute", sources: "Surse deschise", free: "Continuați gratuit",
        member: "Alăturați-vă VoiceOpenGov și participați", fineprint: "Nu sunt necesare plata sau înregistrarea. Calitatea de membru susține munca, dar nu deblochează cunoașterea.",
        revealKicker: "Întrebarea reală", revealHeading: "Vă este familiar acest mesaj?",
        revealOne: "Cunoașterea relevantă social nu ar trebui legată de o barieră artificială de acces. Munca editorială serioasă are nevoie de finanțare, însă sursele, contextul și informațiile importante pentru democrație nu ar trebui rezervate doar celor care plătesc.",
        revealTwo: "De aceea Vote4Gov rămâne gratuit pentru toți. Apartenența la VoiceOpenGov înseamnă sprijin și participare, nu cumpărarea accesului la informație.",
        openFull: "Deschideți articolul complet", memberShort: "Aderați și participați", more: "Mai multe limbi",
        privacyKicker: "Confidențialitate în locul unei rutine de consimțământ", privacyTitle: "Nu este necesar consimțământul pentru urmărire.",
        privacyOne: "Această ediție Vote4Gov nu folosește cookie-uri de analiză, publicitate sau urmărire, nu creează profiluri comportamentale și nu vinde date de utilizare. Pot apărea totuși date tehnice necesare găzduirii și securității, descrise transparent.",
        privacyTwo: "Utilizarea neesențială a datelor necesită un consimțământ separat, specific și activ, care poate fi retras la fel de ușor.",
        privacyLink: "Verificați confidențialitatea", continue: "Continuați lectura",
        coverage: "Interfața și previzualizarea se schimbă automat. Articolele complete din Ausgabe 01 rămân marcate în limba originală până la publicarea traducerii respective."
      },
      preview: {
        title: "Societatea se schimbă în fiecare zi. De ce poate răspunde politic, de obicei, doar o dată la câțiva ani?",
        paragraphs: [
          "Alegem pachete politice, răspundem la întrebări prestabilite și aflăm starea societății prin titluri și eșantioane limitate.",
          "Vote4Gov analizează cum a apărut această ordine, ce a realizat și de ce feedbackul democratic trebuie să evolueze.",
          "Întrebarea nu este dacă parlamentele, presa sau sondajele trebuie să dispară, ci de ce aproape numai ele determină cum devine vizibilă voința socială."
        ]
      },
      nav: { "Titelseite": "Prima pagină", "Quellen & Methode": "Surse și metodă", "KI-Transparenz": "Transparență IA", "Korrektur": "Corecturi", "Kontakt": "Contact", "Ressorts": "Secțiuni" }
    },
    zh: {
      flag: "🌏", label: "中文", dir: "ltr",
      ui: {
        choose: "选择阅读语言", close: "关闭提示", kicker: "打开完整文章",
        heading: "您希望如何继续阅读？", lead: "请选择阅读语言。完整分析仍向所有人免费开放。",
        story: "封面文章", minutes: "8 分钟", sources: "开放来源", free: "免费继续阅读",
        member: "加入 VoiceOpenGov 并参与共建", fineprint: "无需付费或注册。会员身份用于支持工作，而不是解锁知识。",
        revealKicker: "真正的问题", revealHeading: "您是否熟悉这种提示？",
        revealOne: "具有社会重要性的知识不应被人为的访问门槛限制。高质量编辑工作需要资金，但来源、背景和对民主重要的信息不应只向付费者开放。",
        revealTwo: "因此，Vote4Gov 对所有人保持免费。加入 VoiceOpenGov 意味着支持和参与，而不是购买信息访问权。",
        openFull: "打开完整文章", memberShort: "加入并参与", more: "更多语言",
        privacyKicker: "以隐私取代形式化同意", privacyTitle: "无需同意跟踪。",
        privacyOne: "本期 Vote4Gov 不使用分析、广告或跟踪 Cookie，不建立行为画像，也不出售使用数据。托管和安全所必需的技术数据仍可能产生，并将被透明说明。",
        privacyTwo: "非必要的数据使用必须获得单独、明确且主动的同意，并且撤回同意应同样容易。",
        privacyLink: "查看隐私说明", continue: "继续阅读",
        coverage: "界面和预览会自动切换。Ausgabe 01 的完整文章在相应译文发布前，仍会明确标注其原始语言。"
      },
      preview: {
        title: "社会每天都在变化。为什么在政治上通常只能每隔几年回应一次？",
        paragraphs: [
          "我们选择的是整体政治方案，回答预先设定的问题，并通过标题和有限样本了解社会情绪。",
          "Vote4Gov 研究这一秩序如何形成、取得了什么成果，以及为什么民主反馈机制需要继续发展。",
          "问题不在于议会、媒体或民调是否应当消失，而在于为什么几乎只有它们决定社会意志如何被看见。"
        ]
      },
      nav: { "Titelseite": "首页", "Quellen & Methode": "来源与方法", "KI-Transparenz": "人工智能透明度", "Korrektur": "更正", "Kontakt": "联系", "Ressorts": "栏目" }
    }
  };

  const supported = Object.keys(languages);
  const safeStorageGet = () => {
    try { return sessionStorage.getItem(LANGUAGE_KEY); } catch { return null; }
  };
  const safeStorageSet = (value) => {
    try { sessionStorage.setItem(LANGUAGE_KEY, value); } catch { /* storage unavailable */ }
  };

  const browserCode = (navigator.language || "de").toLowerCase().split("-")[0];
  let currentCode = supported.includes(safeStorageGet()) ? safeStorageGet() : (supported.includes(browserCode) ? browserCode : "de");
  let patchScheduled = false;

  const setText = (node, value) => { if (node && typeof value === "string") node.textContent = value; };

  const patchCommonShell = (language) => {
    document.querySelectorAll(".journal-nav a,.journal-footer a,.journal-footer strong,[data-journal-menu-button] span:first-child").forEach((node) => {
      if (!node.dataset.v4gOriginalText) node.dataset.v4gOriginalText = node.textContent.trim();
      const original = node.dataset.v4gOriginalText;
      if (language.nav[original]) node.textContent = language.nav[original];
      else if (languages.de.nav[original]) node.textContent = language.nav[original] || original;
    });
  };

  const ensureHeaderControl = () => {
    const top = document.querySelector(".journal-topline");
    if (!top || top.querySelector("[data-global-language-control]")) return;
    const control = document.createElement("div");
    control.className = "global-language-control";
    control.dataset.globalLanguageControl = "";
    const id = "global-reading-language";
    control.innerHTML = `<label for="${id}">Sprache · Ausgabe 01</label><select id="${id}" aria-label="Lesesprache für Ausgabe 01"></select>`;
    const select = control.querySelector("select");
    supported.forEach((code) => {
      const item = languages[code];
      const option = document.createElement("option");
      option.value = code;
      option.textContent = `${item.flag} ${item.label} · ${code.toUpperCase()}`;
      select.appendChild(option);
    });
    select.value = currentCode;
    select.addEventListener("change", () => applyLanguage(select.value));
    top.appendChild(control);
  };

  const patchPreviewDisclosure = (card, code) => {
    const note = card?.querySelector("[data-ai-translation-disclosure]");
    if (!note) return;
    note.textContent = code === "de"
      ? "KI-generierter Text · redaktionell verantwortete deutsche Originalfassung"
      : `KI-generiert · automatisch aus dem Deutschen nach ${languages[code].label} übersetzt · Übersetzung nicht redaktionell geprüft`;
  };

  const patchAccessDialog = (language, code) => {
    const dialog = document.querySelector(".editorial-access-dialog");
    if (!dialog) return;
    dialog.lang = code;
    dialog.dir = language.dir;
    dialog.dataset.selectedLanguage = code;

    const topline = dialog.querySelectorAll(".editorial-access-topline span");
    setText(topline[0], "Vote4Gov Review · Ausgabe 01 · " + (code === "de" ? "Freier Zugang" : language.ui.free));
    setText(topline[1], language.ui.choose);
    const close = dialog.querySelector("[data-access-close]");
    close?.setAttribute("aria-label", language.ui.close);

    const previewStage = dialog.querySelector('[data-access-stage="preview"]');
    setText(previewStage?.querySelector(".editorial-access-kicker"), language.ui.kicker);
    setText(previewStage?.querySelector("#editorial-access-title"), language.ui.heading);
    setText(previewStage?.querySelector(".editorial-access-lead"), language.ui.lead);

    const switcher = dialog.querySelector("[data-language-switch]");
    if (switcher && switcher.dataset.globalManaged !== "true") {
      switcher.dataset.globalManaged = "true";
      switcher.replaceChildren();
      switcher.setAttribute("aria-label", language.ui.choose);
      QUICK.forEach((quickCode) => {
        const item = languages[quickCode];
        const button = document.createElement("button");
        button.type = "button";
        button.role = "tab";
        button.dataset.language = quickCode;
        button.setAttribute("aria-controls", "editorial-preview");
        button.addEventListener("click", () => applyLanguage(quickCode));
        button.textContent = `${item.flag} ${item.label}`;
        switcher.appendChild(button);
      });
      const more = document.createElement("div");
      more.className = "editorial-language-more";
      more.dataset.languageMore = "";
      const id = "editorial-more-languages";
      more.innerHTML = `<label for="${id}"></label><select id="${id}"></select>`;
      const select = more.querySelector("select");
      const placeholder = document.createElement("option");
      placeholder.value = "";
      placeholder.disabled = true;
      placeholder.textContent = language.ui.more;
      select.appendChild(placeholder);
      supported.filter((item) => !QUICK.includes(item)).forEach((moreCode) => {
        const item = languages[moreCode];
        const option = document.createElement("option");
        option.value = moreCode;
        option.textContent = `${item.flag} ${item.label} · ${moreCode.toUpperCase()}`;
        select.appendChild(option);
      });
      select.addEventListener("change", () => applyLanguage(select.value));
      switcher.insertAdjacentElement("afterend", more);
    }

    const more = dialog.querySelector("[data-language-more]");
    setText(more?.querySelector("label"), language.ui.more);
    const moreSelect = more?.querySelector("select");
    if (moreSelect) {
      moreSelect.options[0].textContent = language.ui.more;
      moreSelect.value = QUICK.includes(code) ? "" : code;
    }

    switcher?.querySelectorAll("button").forEach((button) => {
      const active = button.dataset.language === code;
      button.setAttribute("aria-selected", String(active));
      button.setAttribute("aria-pressed", String(active));
      button.tabIndex = active || (!QUICK.includes(code) && button.dataset.language === "de") ? 0 : -1;
    });

    const card = dialog.querySelector("[data-preview-card]");
    if (card) {
      card.lang = code;
      card.dir = language.dir;
      card.dataset.sourceLanguage = "de";
      card.dataset.translationLanguage = code;
      if (code !== "de") card.dataset.automaticallyTranslated = "true";
      else delete card.dataset.automaticallyTranslated;
    }
    const meta = card?.querySelector(".editorial-preview-meta");
    if (meta) {
      const spans = [...meta.querySelectorAll("span")];
      while (spans.length < 4) {
        const span = document.createElement("span");
        meta.appendChild(span);
        spans.push(span);
      }
      setText(spans[0], language.ui.story);
      spans[1].dataset.issueNumber = "";
      setText(spans[1], "Ausgabe 01");
      setText(spans[2], language.ui.minutes);
      setText(spans[3], language.ui.sources);
    }
    setText(card?.querySelector("[data-preview-title]"), language.preview.title);
    const copy = card?.querySelector("[data-preview-copy]");
    if (copy) {
      copy.replaceChildren(...language.preview.paragraphs.map((value) => {
        const paragraph = document.createElement("p");
        paragraph.textContent = value;
        return paragraph;
      }));
    }
    patchPreviewDisclosure(card, code);

    setText(previewStage?.querySelector("[data-access-free]"), language.ui.free);
    setText(previewStage?.querySelector(".editorial-access-actions a"), language.ui.member);
    setText(previewStage?.querySelector(".editorial-access-fineprint"), language.ui.fineprint);
    let coverage = previewStage?.querySelector("[data-language-coverage-note]");
    if (previewStage && !coverage) {
      coverage = document.createElement("p");
      coverage.className = "language-coverage-note";
      coverage.dataset.languageCoverageNote = "";
      previewStage.querySelector(".editorial-access-fineprint")?.insertAdjacentElement("afterend", coverage);
    }
    setText(coverage, language.ui.coverage);

    const reveal = dialog.querySelector('[data-access-stage="reveal"]');
    setText(reveal?.querySelector(".editorial-access-kicker"), language.ui.revealKicker);
    setText(reveal?.querySelector("h2"), language.ui.revealHeading);
    const revealParagraphs = reveal ? [...reveal.children].filter((node) => node.tagName === "P" && !node.classList.contains("editorial-access-kicker")) : [];
    setText(revealParagraphs[0], language.ui.revealOne);
    setText(revealParagraphs[1], language.ui.revealTwo);
    setText(reveal?.querySelector("[data-access-continue]"), language.ui.openFull);
    setText(reveal?.querySelector(".editorial-access-actions a"), language.ui.memberShort);
  };

  const patchPrivacy = (language, code) => {
    const privacy = document.querySelector(".editorial-privacy-sheet");
    if (!privacy) return;
    privacy.lang = code;
    privacy.dir = language.dir;
    const content = privacy.querySelector(".editorial-privacy-grid > div:first-child");
    setText(content?.querySelector(":scope > span"), language.ui.privacyKicker);
    setText(content?.querySelector("h2"), language.ui.privacyTitle);
    const paragraphs = content ? [...content.children].filter((node) => node.tagName === "P") : [];
    setText(paragraphs[0], language.ui.privacyOne);
    setText(paragraphs[1], language.ui.privacyTwo);
    setText(content?.querySelector(".editorial-privacy-actions a"), language.ui.privacyLink);
    content?.querySelectorAll("[data-privacy-close]").forEach((button) => setText(button, language.ui.continue));
    privacy.querySelector(".editorial-privacy-close")?.setAttribute("aria-label", language.ui.close);
  };

  const patchStorageBanner = (language, code) => {
    const details = document.querySelector("[data-storage-details-panel] ul");
    if (details && !details.querySelector("[data-language-storage-detail]")) {
      const item = document.createElement("li");
      item.dataset.languageStorageDetail = "";
      details.prepend(item);
    }
    const detail = details?.querySelector("[data-language-storage-detail]");
    if (detail) detail.innerHTML = `<strong>Lesesprache:</strong> ${languages[code].label} (${code.toUpperCase()}) wird nur für diese Browsersitzung gespeichert, damit die Auswahl auf Unterseiten erhalten bleibt.`;
    const summary = document.querySelector("[data-storage-summary]");
    if (summary) {
      let chip = summary.querySelector("[data-language-storage-chip]");
      if (!chip) {
        chip = document.createElement("span");
        chip.dataset.languageStorageChip = "";
        summary.appendChild(chip);
      }
      chip.textContent = `Lesesprache: ${languages[code].label}`;
    }
  };

  const patchAll = () => {
    patchScheduled = false;
    const language = languages[currentCode] || languages.de;
    ensureHeaderControl();
    document.querySelectorAll("[data-global-language-control] select").forEach((select) => { select.value = currentCode; });
    patchCommonShell(language);
    patchAccessDialog(language, currentCode);
    patchPrivacy(language, currentCode);
    patchStorageBanner(language, currentCode);
  };

  const schedulePatch = () => {
    if (patchScheduled) return;
    patchScheduled = true;
    window.requestAnimationFrame(patchAll);
  };

  function applyLanguage(code) {
    if (!languages[code]) code = "de";
    currentCode = code;
    safeStorageSet(code);
    patchAll();
    document.dispatchEvent(new CustomEvent("vote4gov:languagechange", { detail: { code, automatic: code !== "de", issue: "01" } }));
  }

  const observer = new MutationObserver(schedulePatch);
  observer.observe(document.body, { childList: true, subtree: true });
  patchAll();
})();