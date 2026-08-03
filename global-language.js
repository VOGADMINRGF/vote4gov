(() => {
  const KEY = "vote4gov:language:v1";
  const QUICK = ["de", "en", "fr", "es", "tr", "ar"];
  const ISSUE = "Ausgabe 01";

  const L = {
    de: {f:"🇩🇪",n:"Deutsch",d:"ltr",a:"Freier Zugang",choose:"Lesesprache wählen",close:"Hinweis schließen",k:"Vollständigen Beitrag öffnen",h:"Wie möchten Sie weiterlesen?",lead:"Wählen Sie Ihre Lesesprache. Die vollständige Analyse bleibt für alle Menschen frei zugänglich.",story:"Titelgeschichte",min:"8 Minuten",src:"Quellenoffen",free:"Kostenfrei weiterlesen",member:"VoiceOpenGov-Mitglied werden und mitgestalten",fine:"Keine Zahlung und keine Registrierung sind erforderlich. Mitgliedschaft unterstützt die Arbeit, schaltet aber kein Wissen frei.",more:"Weitere Sprachen",rt:"Kommt Ihnen diese Abfrage bekannt vor?",r1:"Gesellschaftlich relevantes Wissen sollte nicht an eine künstliche Zugangsschranke gebunden sein. Aufwendige redaktionelle Arbeit braucht Finanzierung. Quellen, Einordnung und demokratisch wichtige Informationen sollten dennoch nicht ausschließlich zahlenden Menschen offenstehen.",r2:"Vote4Gov bleibt deshalb für alle frei. Eine VoiceOpenGov-Mitgliedschaft bedeutet Unterstützung und Mitwirkung – nicht das Freikaufen von Informationen.",open:"Beitrag vollständig öffnen",ps:"Keine Tracking-Einwilligung erforderlich.",p1:"Diese Vote4Gov-Ausgabe setzt keine Analyse-, Werbe- oder Tracking-Cookies ein, erstellt keine Verhaltensprofile und verkauft keine Nutzungsdaten. Technisch notwendige Hosting- und Sicherheitsdaten können anfallen und werden transparent beschrieben.",p2:"Nicht notwendige Datennutzung braucht eine getrennte, konkrete und aktive Einwilligung, die ebenso einfach widerrufen werden kann.",plink:"Datenschutz prüfen",cont:"Weiterlesen",coverage:"Oberfläche und Vorschau werden automatisch umgestellt. Vollständige Artikel bleiben bis zur veröffentlichten Übersetzung klar in ihrer Originalsprache gekennzeichnet.",pt:"Unsere Gesellschaft verändert sich jeden Tag. Warum darf sie politisch meist nur alle paar Jahre antworten?",pp:["Wir wählen politische Gesamtpakete, reagieren auf vorgegebene Fragen und erfahren gesellschaftliche Stimmung über Schlagzeilen und begrenzte Stichproben.","Vote4Gov untersucht, wie diese Ordnung entstanden ist, was sie geleistet hat und weshalb demokratische Rückkopplung heute weiterentwickelt werden muss.","Die Frage ist nicht, ob Parlamente, Medien oder Umfragen verschwinden sollen, sondern warum sie fast allein bestimmen, wie gesellschaftlicher Wille sichtbar wird."],nav:{"Titelseite":"Titelseite","Quellen & Methode":"Quellen & Methode","KI-Transparenz":"KI-Transparenz","Korrektur":"Korrektur","Kontakt":"Kontakt","Ressorts":"Ressorts"}},
    en: {f:"🇬🇧",n:"English",d:"ltr",a:"Free access",choose:"Choose reading language",close:"Close notice",k:"Open the full article",h:"How would you like to continue reading?",lead:"Choose your reading language. The complete analysis remains freely accessible to everyone.",story:"Cover story",min:"8 minutes",src:"Open sources",free:"Continue for free",member:"Join VoiceOpenGov and help shape it",fine:"No payment or registration is required. Membership supports the work but does not unlock knowledge.",more:"More languages",rt:"Does this prompt look familiar?",r1:"Socially relevant knowledge should not be tied to an artificial access barrier. Serious editorial work needs funding, but sources, context and democratically important information should not be reserved exclusively for paying readers.",r2:"Vote4Gov therefore remains free for everyone. VoiceOpenGov membership means support and participation, not buying access to information.",open:"Open the full article",ps:"No tracking consent required.",p1:"This Vote4Gov issue uses no analytics, advertising or tracking cookies, creates no behavioural profiles and sells no usage data. Technically necessary hosting and security data may still arise and are described transparently.",p2:"Non-essential data use requires separate, specific and active consent that can be withdrawn just as easily.",plink:"Review privacy information",cont:"Continue reading",coverage:"The interface and preview switch automatically. Full articles remain clearly marked in their original language until the respective translation is published.",pt:"Society changes every day. Why can it usually answer politically only every few years?",pp:["We elect political packages, respond to predefined questions and learn about public sentiment through headlines and limited samples.","Vote4Gov examines how this order emerged, what it has achieved and why democratic feedback must now evolve further.","The question is not whether parliaments, media or polls should disappear, but why they almost alone determine how public will becomes visible."],nav:{"Titelseite":"Front page","Quellen & Methode":"Sources & method","KI-Transparenz":"AI transparency","Korrektur":"Corrections","Kontakt":"Contact","Ressorts":"Sections"}},
    fr: {f:"🇫🇷",n:"Français",d:"ltr",a:"Accès libre",choose:"Choisir la langue de lecture",close:"Fermer l’avis",k:"Ouvrir l’article complet",h:"Comment souhaitez-vous poursuivre votre lecture ?",lead:"Choisissez votre langue de lecture. L’analyse complète reste librement accessible à toutes et tous.",story:"Article de couverture",min:"8 minutes",src:"Sources ouvertes",free:"Continuer gratuitement",member:"Rejoindre VoiceOpenGov et participer",fine:"Aucun paiement ni inscription n’est requis. L’adhésion soutient le travail mais ne débloque aucun savoir.",more:"Autres langues",rt:"Cette demande vous semble-t-elle familière ?",r1:"Les connaissances socialement pertinentes ne devraient pas dépendre d’une barrière d’accès artificielle. Le travail éditorial exige des moyens, mais les sources, le contexte et les informations démocratiquement importantes ne devraient pas être réservés aux seules personnes qui paient.",r2:"Vote4Gov reste donc gratuit pour toutes et tous. L’adhésion à VoiceOpenGov signifie soutien et participation, non l’achat d’un accès à l’information.",open:"Ouvrir l’article complet",ps:"Aucun consentement au suivi n’est nécessaire.",p1:"Cette édition de Vote4Gov n’utilise aucun cookie d’analyse, de publicité ou de suivi, ne crée aucun profil comportemental et ne vend aucune donnée d’usage. Des données techniques nécessaires à l’hébergement et à la sécurité peuvent néanmoins être traitées et sont décrites en toute transparence.",p2:"Toute utilisation non nécessaire des données exige un consentement séparé, précis et actif, révocable tout aussi facilement.",plink:"Consulter la confidentialité",cont:"Poursuivre la lecture",coverage:"L’interface et l’aperçu changent automatiquement. Les articles complets restent clairement signalés dans leur langue d’origine jusqu’à la publication de leur traduction.",pt:"Notre société change chaque jour. Pourquoi ne peut-elle répondre politiquement que tous les quelques années ?",pp:["Nous élisons des ensembles politiques, répondons à des questions prédéfinies et découvrons l’opinion publique à travers des titres et des échantillons limités.","Vote4Gov étudie l’origine de cet ordre, ses acquis et les raisons pour lesquelles la rétroaction démocratique doit aujourd’hui évoluer.","La question n’est pas de supprimer les parlements, les médias ou les sondages, mais de comprendre pourquoi ils déterminent presque seuls la visibilité de la volonté collective."],nav:{"Titelseite":"Une","Quellen & Methode":"Sources et méthode","KI-Transparenz":"Transparence IA","Korrektur":"Corrections","Kontakt":"Contact","Ressorts":"Rubriques"}},
    es: {f:"🇪🇸",n:"Español",d:"ltr",a:"Acceso libre",choose:"Elegir idioma de lectura",close:"Cerrar aviso",k:"Abrir el artículo completo",h:"¿Cómo desea seguir leyendo?",lead:"Elija su idioma de lectura. El análisis completo seguirá siendo gratuito para todas las personas.",story:"Historia de portada",min:"8 minutos",src:"Fuentes abiertas",free:"Seguir gratis",member:"Unirse a VoiceOpenGov y participar",fine:"No se requiere pago ni registro. La membresía apoya el trabajo, pero no desbloquea conocimiento.",more:"Más idiomas",rt:"¿Le resulta familiar esta solicitud?",r1:"El conocimiento socialmente relevante no debería depender de una barrera de acceso artificial. El trabajo editorial necesita financiación, pero las fuentes, el contexto y la información democráticamente importante no deberían reservarse únicamente a quienes pagan.",r2:"Por eso Vote4Gov sigue siendo gratuito para todos. Ser miembro de VoiceOpenGov significa apoyar y participar, no comprar acceso a la información.",open:"Abrir el artículo completo",ps:"No se requiere consentimiento para seguimiento.",p1:"Esta edición de Vote4Gov no utiliza cookies de analítica, publicidad o seguimiento, no crea perfiles de comportamiento ni vende datos de uso. Aun así, pueden generarse datos técnicos necesarios para el alojamiento y la seguridad, que se describen con transparencia.",p2:"El uso no esencial de datos requiere un consentimiento separado, específico y activo que pueda retirarse con la misma facilidad.",plink:"Revisar privacidad",cont:"Seguir leyendo",coverage:"La interfaz y la vista previa cambian automáticamente. Los artículos completos permanecen identificados en su idioma original hasta que se publique cada traducción.",pt:"Nuestra sociedad cambia cada día. ¿Por qué políticamente solo puede responder cada varios años?",pp:["Elegimos paquetes políticos, respondemos a preguntas predeterminadas y conocemos el estado de ánimo social mediante titulares y muestras limitadas.","Vote4Gov analiza cómo surgió este orden, qué ha logrado y por qué la retroalimentación democrática debe seguir evolucionando.","La cuestión no es eliminar parlamentos, medios o encuestas, sino entender por qué casi solo ellos determinan cómo se hace visible la voluntad social."],nav:{"Titelseite":"Portada","Quellen & Methode":"Fuentes y método","KI-Transparenz":"Transparencia de IA","Korrektur":"Correcciones","Kontakt":"Contacto","Ressorts":"Secciones"}},
    tr: {f:"🇹🇷",n:"Türkçe",d:"ltr",a:"Ücretsiz erişim",choose:"Okuma dilini seçin",close:"Bildirimi kapat",k:"Yazının tamamını aç",h:"Nasıl okumaya devam etmek istersiniz?",lead:"Okuma dilinizi seçin. Analizin tamamı herkes için ücretsiz erişilebilir kalır.",story:"Kapak konusu",min:"8 dakika",src:"Açık kaynaklar",free:"Ücretsiz devam et",member:"VoiceOpenGov’a katıl ve katkıda bulun",fine:"Ödeme veya kayıt gerekmez. Üyelik çalışmayı destekler, bilgiyi ücretli olarak açmaz.",more:"Diğer diller",rt:"Bu sorgu size tanıdık geliyor mu?",r1:"Toplumsal açıdan önemli bilgi yapay bir erişim engeline bağlanmamalıdır. Nitelikli editoryal çalışma finansman gerektirir; ancak kaynaklar, bağlam ve demokratik açıdan önemli bilgiler yalnızca ödeme yapanlara ayrılmamalıdır.",r2:"Bu nedenle Vote4Gov herkes için ücretsiz kalır. VoiceOpenGov üyeliği bilgiye erişim satın almak değil, destek ve katılım anlamına gelir.",open:"Yazının tamamını aç",ps:"Takip izni gerekmiyor.",p1:"Bu Vote4Gov sayısı analiz, reklam veya takip çerezleri kullanmaz; davranış profili oluşturmaz ve kullanım verisi satmaz. Barındırma ve güvenlik için teknik olarak gerekli veriler yine de oluşabilir ve şeffaf biçimde açıklanır.",p2:"Gerekli olmayan veri kullanımı, kolayca geri çekilebilen ayrı, belirli ve aktif bir onay gerektirir.",plink:"Gizliliği incele",cont:"Okumaya devam et",coverage:"Arayüz ve önizleme otomatik olarak değişir. Tam yazılar, ilgili çeviri yayımlanana kadar özgün dilinde açıkça işaretlenir.",pt:"Toplumumuz her gün değişiyor. Neden siyaseten çoğunlukla yalnızca birkaç yılda bir yanıt verebiliyor?",pp:["Siyasi paketleri seçiyor, önceden belirlenmiş sorulara yanıt veriyor ve toplumsal eğilimleri manşetler ile sınırlı örneklemler üzerinden öğreniyoruz.","Vote4Gov bu düzenin nasıl oluştuğunu, ne başardığını ve demokratik geri bildirimin neden bugün geliştirilmesi gerektiğini inceliyor.","Soru parlamentoların, medyanın ya da anketlerin ortadan kalkması değil; toplumsal iradenin görünürlüğünü neden neredeyse yalnızca onların belirlediğidir."],nav:{"Titelseite":"Ana sayfa","Quellen & Methode":"Kaynaklar ve yöntem","KI-Transparenz":"Yapay zekâ şeffaflığı","Korrektur":"Düzeltmeler","Kontakt":"İletişim","Ressorts":"Bölümler"}},
    ar: {f:"🌍",n:"العربية",d:"rtl",a:"وصول مجاني",choose:"اختر لغة القراءة",close:"إغلاق الإشعار",k:"فتح المقال كاملاً",h:"كيف ترغب في متابعة القراءة؟",lead:"اختر لغة القراءة. يظل التحليل الكامل متاحاً مجاناً للجميع.",story:"موضوع الغلاف",min:"8 دقائق",src:"مصادر مفتوحة",free:"متابعة القراءة مجاناً",member:"انضم إلى VoiceOpenGov وشارك",fine:"لا يلزم دفع أو تسجيل. العضوية تدعم العمل ولا تجعل المعرفة خدمة مدفوعة.",more:"لغات أخرى",rt:"هل تبدو لك هذه النافذة مألوفة؟",r1:"لا ينبغي ربط المعرفة ذات الأهمية المجتمعية بحاجز وصول مصطنع. يحتاج العمل التحريري الجاد إلى تمويل، لكن المصادر والسياق والمعلومات المهمة ديمقراطياً لا ينبغي أن تكون متاحة فقط لمن يدفع.",r2:"لذلك يبقى Vote4Gov مجانياً للجميع. عضوية VoiceOpenGov تعني الدعم والمشاركة، لا شراء الوصول إلى المعلومات.",open:"فتح المقال كاملاً",ps:"لا حاجة إلى موافقة على التتبع.",p1:"لا تستخدم هذه النسخة من Vote4Gov ملفات تعريف ارتباط للتحليل أو الإعلان أو التتبع، ولا تنشئ ملفات سلوكية ولا تبيع بيانات الاستخدام. قد تنشأ بيانات تقنية ضرورية للاستضافة والأمان، ويتم شرحها بشفافية.",p2:"يتطلب أي استخدام غير ضروري للبيانات موافقة منفصلة ومحددة ونشطة يمكن سحبها بالسهولة نفسها.",plink:"مراجعة الخصوصية",cont:"متابعة القراءة",coverage:"تتغير الواجهة والمعاينة تلقائياً. تبقى المقالات الكاملة مميزة بلغتها الأصلية حتى نشر ترجمتها.",pt:"يتغير مجتمعنا كل يوم. فلماذا لا يستطيع التعبير سياسياً إلا مرة كل بضع سنوات؟",pp:["ننتخب حزمًا سياسية، ونجيب عن أسئلة محددة مسبقًا، ونتعرف إلى المزاج العام عبر العناوين والعينات المحدودة.","يفحص Vote4Gov كيف نشأ هذا النظام، وما الذي حققه، ولماذا ينبغي تطوير آليات التغذية الراجعة الديمقراطية اليوم.","السؤال ليس ما إذا كان ينبغي أن تختفي البرلمانات أو وسائل الإعلام أو الاستطلاعات، بل لماذا تكاد وحدها تحدد كيف تصبح الإرادة المجتمعية مرئية."],nav:{"Titelseite":"الصفحة الرئيسية","Quellen & Methode":"المصادر والمنهج","KI-Transparenz":"شفافية الذكاء الاصطناعي","Korrektur":"التصحيحات","Kontakt":"اتصال","Ressorts":"الأقسام"}},
    it: {f:"🇮🇹",n:"Italiano",d:"ltr",a:"Accesso libero",choose:"Scegli la lingua",close:"Chiudi avviso",k:"Apri l’articolo completo",h:"Come desidera continuare a leggere?",lead:"Scelga la lingua di lettura. L’analisi completa resta accessibile gratuitamente a tutti.",story:"Storia di copertina",min:"8 minuti",src:"Fonti aperte",free:"Continua gratuitamente",member:"Unisciti a VoiceOpenGov e partecipa",fine:"Non sono richiesti pagamento o registrazione. L’adesione sostiene il lavoro ma non sblocca la conoscenza.",more:"Altre lingue",rt:"Questa richiesta le sembra familiare?",r1:"La conoscenza socialmente rilevante non dovrebbe dipendere da una barriera artificiale. Il lavoro editoriale richiede finanziamenti, ma fonti, contesto e informazioni democraticamente importanti non dovrebbero essere riservati solo a chi paga.",r2:"Vote4Gov resta quindi gratuito per tutti. L’adesione a VoiceOpenGov significa sostegno e partecipazione, non acquisto dell’accesso alle informazioni.",open:"Apri l’articolo completo",ps:"Nessun consenso al tracciamento richiesto.",p1:"Questa edizione di Vote4Gov non usa cookie di analisi, pubblicità o tracciamento, non crea profili comportamentali e non vende dati d’uso. Possono comunque essere trattati dati tecnici necessari per hosting e sicurezza, descritti in modo trasparente.",p2:"L’uso non necessario dei dati richiede un consenso separato, specifico e attivo, revocabile con la stessa facilità.",plink:"Consulta la privacy",cont:"Continua a leggere",coverage:"Interfaccia e anteprima cambiano automaticamente. Gli articoli completi restano indicati nella lingua originale finché non viene pubblicata la relativa traduzione.",pt:"La società cambia ogni giorno. Perché politicamente può rispondere quasi solo ogni pochi anni?",pp:["Eleg­giamo pacchetti politici, rispondiamo a domande predefinite e conosciamo l’umore pubblico attraverso titoli e campioni limitati.","Vote4Gov esamina come è nato questo ordine, cosa ha ottenuto e perché il riscontro democratico deve evolvere.","La domanda non è se parlamenti, media o sondaggi debbano scomparire, ma perché determinano quasi da soli come diventa visibile la volontà collettiva."],nav:{"Titelseite":"Prima pagina","Quellen & Methode":"Fonti e metodo","KI-Transparenz":"Trasparenza IA","Korrektur":"Correzioni","Kontakt":"Contatti","Ressorts":"Sezioni"}},
    pt: {f:"🇵🇹",n:"Português",d:"ltr",a:"Acesso livre",choose:"Escolher idioma",close:"Fechar aviso",k:"Abrir o artigo completo",h:"Como gostaria de continuar a ler?",lead:"Escolha o seu idioma. A análise completa permanece gratuitamente acessível a todas as pessoas.",story:"Reportagem de capa",min:"8 minutos",src:"Fontes abertas",free:"Continuar gratuitamente",member:"Juntar-se à VoiceOpenGov e participar",fine:"Não é necessário pagar nem registar-se. A adesão apoia o trabalho, mas não desbloqueia conhecimento.",more:"Mais idiomas",rt:"Este pedido parece-lhe familiar?",r1:"O conhecimento socialmente relevante não deve depender de uma barreira artificial. O trabalho editorial exige financiamento, mas fontes, contexto e informação democraticamente importante não devem ficar reservados apenas a quem paga.",r2:"Por isso, Vote4Gov continua gratuito para todos. A adesão à VoiceOpenGov significa apoio e participação, não compra de acesso à informação.",open:"Abrir o artigo completo",ps:"Não é necessário consentimento de rastreio.",p1:"Esta edição da Vote4Gov não utiliza cookies de análise, publicidade ou rastreio, não cria perfis comportamentais e não vende dados de utilização. Podem ainda existir dados técnicos necessários para alojamento e segurança, descritos de forma transparente.",p2:"A utilização não essencial de dados exige consentimento separado, específico e ativo, que possa ser retirado com a mesma facilidade.",plink:"Consultar privacidade",cont:"Continuar a ler",coverage:"A interface e a pré-visualização mudam automaticamente. Os artigos completos permanecem assinalados no idioma original até à publicação da respetiva tradução.",pt:"A sociedade muda todos os dias. Porque é que politicamente só pode responder de poucos em poucos anos?",pp:["Elegemos pacotes políticos, respondemos a perguntas predefinidas e conhecemos o sentimento público através de manchetes e amostras limitadas.","Vote4Gov analisa como esta ordem surgiu, o que alcançou e por que razão o retorno democrático deve evoluir.","A questão não é eliminar parlamentos, meios de comunicação ou sondagens, mas compreender por que determinam quase sozinhos como a vontade coletiva se torna visível."],nav:{"Titelseite":"Capa","Quellen & Methode":"Fontes e método","KI-Transparenz":"Transparência da IA","Korrektur":"Correções","Kontakt":"Contacto","Ressorts":"Secções"}},
    nl: {f:"🇳🇱",n:"Nederlands",d:"ltr",a:"Vrije toegang",choose:"Leestaal kiezen",close:"Melding sluiten",k:"Volledig artikel openen",h:"Hoe wilt u verder lezen?",lead:"Kies uw leestaal. De volledige analyse blijft voor iedereen vrij toegankelijk.",story:"Omslagverhaal",min:"8 minuten",src:"Open bronnen",free:"Gratis verder lezen",member:"Word lid van VoiceOpenGov en doe mee",fine:"Betaling of registratie is niet nodig. Lidmaatschap ondersteunt het werk maar ontgrendelt geen kennis.",more:"Meer talen",rt:"Komt deze vraag u bekend voor?",r1:"Maatschappelijk relevante kennis mag niet aan een kunstmatige toegangsdrempel worden gekoppeld. Redactioneel werk vraagt financiering, maar bronnen, context en democratisch belangrijke informatie mogen niet uitsluitend voor betalende lezers zijn.",r2:"Vote4Gov blijft daarom voor iedereen gratis. Lidmaatschap van VoiceOpenGov betekent steun en deelname, niet het kopen van toegang tot informatie.",open:"Volledig artikel openen",ps:"Geen toestemming voor tracking nodig.",p1:"Deze Vote4Gov-uitgave gebruikt geen analyse-, advertentie- of trackingcookies, maakt geen gedragsprofielen en verkoopt geen gebruiksgegevens. Technisch noodzakelijke hosting- en beveiligingsgegevens kunnen wel ontstaan en worden transparant beschreven.",p2:"Niet-noodzakelijk datagebruik vereist afzonderlijke, specifieke en actieve toestemming die even eenvoudig kan worden ingetrokken.",plink:"Privacy bekijken",cont:"Verder lezen",coverage:"De interface en voorvertoning schakelen automatisch om. Volledige artikelen blijven in hun oorspronkelijke taal gemarkeerd tot de vertaling is gepubliceerd.",pt:"De samenleving verandert elke dag. Waarom kan zij politiek meestal maar eens in de paar jaar antwoorden?",pp:["We kiezen politieke totaalpakketten, reageren op vooraf bepaalde vragen en leren de publieke stemming kennen via koppen en beperkte steekproeven.","Vote4Gov onderzoekt hoe deze orde ontstond, wat zij heeft bereikt en waarom democratische terugkoppeling verder moet worden ontwikkeld.","De vraag is niet of parlementen, media of peilingen moeten verdwijnen, maar waarom zij bijna alleen bepalen hoe de maatschappelijke wil zichtbaar wordt."],nav:{"Titelseite":"Voorpagina","Quellen & Methode":"Bronnen en methode","KI-Transparenz":"AI-transparantie","Korrektur":"Correcties","Kontakt":"Contact","Ressorts":"Rubrieken"}},
    pl: {f:"🇵🇱",n:"Polski",d:"ltr",a:"Bezpłatny dostęp",choose:"Wybierz język",close:"Zamknij komunikat",k:"Otwórz pełny artykuł",h:"Jak chcesz kontynuować czytanie?",lead:"Wybierz język. Pełna analiza pozostaje bezpłatnie dostępna dla wszystkich.",story:"Temat okładkowy",min:"8 minut",src:"Otwarte źródła",free:"Czytaj dalej bezpłatnie",member:"Dołącz do VoiceOpenGov i współtwórz",fine:"Płatność ani rejestracja nie są wymagane. Członkostwo wspiera pracę, ale nie odblokowuje wiedzy.",more:"Więcej języków",rt:"Czy ten komunikat wygląda znajomo?",r1:"Wiedza istotna społecznie nie powinna być związana ze sztuczną barierą dostępu. Rzetelna praca redakcyjna wymaga finansowania, lecz źródła, kontekst i demokratycznie ważne informacje nie powinny być dostępne wyłącznie dla płacących.",r2:"Dlatego Vote4Gov pozostaje bezpłatny dla wszystkich. Członkostwo w VoiceOpenGov oznacza wsparcie i udział, a nie kupowanie dostępu do informacji.",open:"Otwórz pełny artykuł",ps:"Zgoda na śledzenie nie jest wymagana.",p1:"To wydanie Vote4Gov nie używa plików cookie do analityki, reklamy ani śledzenia, nie tworzy profili zachowań i nie sprzedaje danych o korzystaniu. Mogą jednak powstawać technicznie niezbędne dane hostingowe i bezpieczeństwa, opisane w sposób przejrzysty.",p2:"Niepotrzebne wykorzystanie danych wymaga osobnej, konkretnej i aktywnej zgody, którą równie łatwo można wycofać.",plink:"Sprawdź prywatność",cont:"Czytaj dalej",coverage:"Interfejs i podgląd przełączają się automatycznie. Pełne artykuły pozostają oznaczone w języku oryginalnym do czasu publikacji tłumaczenia.",pt:"Społeczeństwo zmienia się każdego dnia. Dlaczego politycznie może odpowiadać zazwyczaj tylko raz na kilka lat?",pp:["Wybieramy polityczne pakiety, odpowiadamy na z góry ustalone pytania i poznajemy nastroje społeczne poprzez nagłówki i ograniczone próby.","Vote4Gov bada, jak powstał ten porządek, co osiągnął i dlaczego demokratyczne sprzężenie zwrotne musi się dalej rozwijać.","Pytanie nie brzmi, czy parlamenty, media lub sondaże mają zniknąć, lecz dlaczego niemal wyłącznie one decydują o widoczności woli społecznej."],nav:{"Titelseite":"Strona główna","Quellen & Methode":"Źródła i metoda","KI-Transparenz":"Przejrzystość AI","Korrektur":"Korekty","Kontakt":"Kontakt","Ressorts":"Działy"}},
    uk: {f:"🇺🇦",n:"Українська",d:"ltr",a:"Вільний доступ",choose:"Оберіть мову",close:"Закрити повідомлення",k:"Відкрити повну статтю",h:"Як ви хочете продовжити читання?",lead:"Оберіть мову. Повний аналіз залишається безкоштовно доступним для всіх.",story:"Головний матеріал",min:"8 хвилин",src:"Відкриті джерела",free:"Читати безкоштовно",member:"Приєднатися до VoiceOpenGov і брати участь",fine:"Оплата чи реєстрація не потрібні. Членство підтримує роботу, але не відкриває знання за плату.",more:"Інші мови",rt:"Це повідомлення здається вам знайомим?",r1:"Суспільно важливі знання не повинні залежати від штучного бар’єра доступу. Якісна редакційна робота потребує фінансування, але джерела, контекст і важлива для демократії інформація не мають бути доступними лише тим, хто платить.",r2:"Тому Vote4Gov залишається безкоштовним для всіх. Членство у VoiceOpenGov означає підтримку та участь, а не купівлю доступу до інформації.",open:"Відкрити повну статтю",ps:"Згода на відстеження не потрібна.",p1:"Цей випуск Vote4Gov не використовує аналітичні, рекламні чи відстежувальні файли cookie, не створює поведінкових профілів і не продає дані про використання. Технічно необхідні дані хостингу та безпеки можуть виникати й описуються прозоро.",p2:"Необов’язкове використання даних потребує окремої, конкретної й активної згоди, яку так само легко відкликати.",plink:"Переглянути приватність",cont:"Продовжити читання",coverage:"Інтерфейс і попередній перегляд перемикаються автоматично. Повні статті залишаються позначеними мовою оригіналу до публікації перекладу.",pt:"Суспільство змінюється щодня. Чому політично воно зазвичай може відповісти лише раз на кілька років?",pp:["Ми обираємо політичні пакети, відповідаємо на заздалегідь визначені запитання і дізнаємося про суспільні настрої з заголовків та обмежених вибірок.","Vote4Gov досліджує, як виник цей порядок, чого він досяг і чому демократичний зворотний зв’язок має розвиватися далі.","Питання не в тому, чи мають зникнути парламенти, медіа або опитування, а чому майже лише вони визначають, як стає видимою суспільна воля."],nav:{"Titelseite":"Головна","Quellen & Methode":"Джерела та метод","KI-Transparenz":"Прозорість ШІ","Korrektur":"Виправлення","Kontakt":"Контакт","Ressorts":"Розділи"}},
    zh: {f:"🌏",n:"中文",d:"ltr",a:"免费访问",choose:"选择阅读语言",close:"关闭提示",k:"打开完整文章",h:"您希望如何继续阅读？",lead:"请选择阅读语言。完整分析仍向所有人免费开放。",story:"封面文章",min:"8 分钟",src:"开放来源",free:"免费继续阅读",member:"加入 VoiceOpenGov 并参与共建",fine:"无需付费或注册。会员身份用于支持工作，而不是解锁知识。",more:"更多语言",rt:"您是否熟悉这种提示？",r1:"具有社会重要性的知识不应被人为的访问门槛限制。高质量编辑工作需要资金，但来源、背景和对民主重要的信息不应只向付费者开放。",r2:"因此，Vote4Gov 对所有人保持免费。加入 VoiceOpenGov 意味着支持和参与，而不是购买信息访问权。",open:"打开完整文章",ps:"无需同意跟踪。",p1:"本期 Vote4Gov 不使用分析、广告或跟踪 Cookie，不建立行为画像，也不出售使用数据。托管和安全所必需的技术数据仍可能产生，并将被透明说明。",p2:"非必要的数据使用必须获得单独、明确且主动的同意，并且撤回同意应同样容易。",plink:"查看隐私说明",cont:"继续阅读",coverage:"界面和预览会自动切换。完整文章在相应译文发布前仍会明确标注其原始语言。",pt:"社会每天都在变化。为什么在政治上通常只能每隔几年回应一次？",pp:["我们选择的是整体政治方案，回答预先设定的问题，并通过标题和有限样本了解社会情绪。","Vote4Gov 研究这一秩序如何形成、取得了什么成果，以及为什么民主反馈机制需要继续发展。","问题不在于议会、媒体或民调是否应当消失，而在于为什么几乎只有它们决定社会意志如何被看见。"],nav:{"Titelseite":"首页","Quellen & Methode":"来源与方法","KI-Transparenz":"人工智能透明度","Korrektur":"更正","Kontakt":"联系","Ressorts":"栏目"}}
  };

  const codes = Object.keys(L);
  const read = () => { try { return sessionStorage.getItem(KEY); } catch { return null; } };
  const write = (v) => { try { sessionStorage.setItem(KEY, v); } catch {} };
  const browser = (navigator.language || "de").toLowerCase().split("-")[0];
  let code = codes.includes(read()) ? read() : (codes.includes(browser) ? browser : "de");
  let scheduled = false;
  let observer;

  const text = (el, value) => { if (el && el.textContent !== value) el.textContent = value; };

  const header = () => {
    const top = document.querySelector(".journal-topline");
    if (!top || top.querySelector("[data-global-language-control]")) return;
    const wrap = document.createElement("div");
    wrap.className = "global-language-control";
    wrap.dataset.globalLanguageControl = "";
    wrap.innerHTML = '<label for="global-reading-language">Sprache · Ausgabe 01</label><select id="global-reading-language" aria-label="Lesesprache für Ausgabe 01"></select>';
    const select = wrap.querySelector("select");
    codes.forEach((c) => {
      const o = document.createElement("option");
      o.value = c;
      o.textContent = `${L[c].f} ${L[c].n} · ${c.toUpperCase()}`;
      select.appendChild(o);
    });
    select.addEventListener("change", () => apply(select.value));
    top.appendChild(wrap);
  };

  const shell = (lang) => {
    document.querySelectorAll(".journal-nav a,.journal-footer a,.journal-footer strong,[data-journal-menu-button] span:first-child").forEach((el) => {
      if (!el.dataset.v4gOriginalText) el.dataset.v4gOriginalText = el.textContent.trim();
      const original = el.dataset.v4gOriginalText;
      if (lang.nav[original]) text(el, lang.nav[original]);
      else if (L.de.nav[original]) text(el, original);
    });
  };

  const languageControls = (dialog, lang) => {
    const switcher = dialog.querySelector("[data-language-switch]");
    if (!switcher) return;
    if (switcher.dataset.globalManaged !== "true") {
      switcher.dataset.globalManaged = "true";
      switcher.replaceChildren();
      QUICK.forEach((c) => {
        const b = document.createElement("button");
        b.type = "button";
        b.role = "tab";
        b.dataset.language = c;
        b.setAttribute("aria-controls", "editorial-preview");
        b.textContent = `${L[c].f} ${L[c].n}`;
        b.addEventListener("click", () => apply(c));
        switcher.appendChild(b);
      });
      const more = document.createElement("div");
      more.className = "editorial-language-more";
      more.dataset.languageMore = "";
      more.innerHTML = '<label for="editorial-more-languages"></label><select id="editorial-more-languages"></select>';
      const select = more.querySelector("select");
      const placeholder = document.createElement("option");
      placeholder.value = "";
      placeholder.disabled = true;
      select.appendChild(placeholder);
      codes.filter((c) => !QUICK.includes(c)).forEach((c) => {
        const o = document.createElement("option");
        o.value = c;
        o.textContent = `${L[c].f} ${L[c].n} · ${c.toUpperCase()}`;
        select.appendChild(o);
      });
      select.addEventListener("change", () => apply(select.value));
      switcher.insertAdjacentElement("afterend", more);
    }
    switcher.setAttribute("aria-label", lang.choose);
    switcher.querySelectorAll("button").forEach((b) => {
      const active = b.dataset.language === code;
      b.setAttribute("aria-selected", String(active));
      b.setAttribute("aria-pressed", String(active));
      b.tabIndex = active || (!QUICK.includes(code) && b.dataset.language === "de") ? 0 : -1;
    });
    const more = dialog.querySelector("[data-language-more]");
    text(more?.querySelector("label"), lang.more);
    const select = more?.querySelector("select");
    if (select) {
      text(select.options[0], lang.more);
      select.value = QUICK.includes(code) ? "" : code;
    }
  };

  const dialog = (lang) => {
    const d = document.querySelector(".editorial-access-dialog");
    if (!d) return;
    d.lang = code;
    d.dir = lang.d;
    d.dataset.selectedLanguage = code;
    const top = d.querySelectorAll(".editorial-access-topline span");
    text(top[0], `Vote4Gov Review · ${ISSUE} · ${lang.a}`);
    text(top[1], lang.choose);
    d.querySelector("[data-access-close]")?.setAttribute("aria-label", lang.close);
    languageControls(d, lang);

    const stage = d.querySelector('[data-access-stage="preview"]');
    text(stage?.querySelector(".editorial-access-kicker"), lang.k);
    text(stage?.querySelector("#editorial-access-title"), lang.h);
    text(stage?.querySelector(".editorial-access-lead"), lang.lead);
    text(stage?.querySelector("[data-access-free]"), lang.free);
    text(stage?.querySelector(".editorial-access-actions a"), lang.member);
    text(stage?.querySelector(".editorial-access-fineprint"), lang.fine);

    const card = d.querySelector("[data-preview-card]");
    if (card) { card.lang = code; card.dir = lang.d; card.dataset.translationLanguage = code; }
    const meta = card?.querySelector(".editorial-preview-meta");
    if (meta) {
      const spans = [...meta.querySelectorAll("span")];
      while (spans.length < 4) { const s = document.createElement("span"); meta.appendChild(s); spans.push(s); }
      text(spans[0], lang.story); text(spans[1], ISSUE); spans[1].dataset.issueNumber = ""; text(spans[2], lang.min); text(spans[3], lang.src);
    }
    text(card?.querySelector("[data-preview-title]"), lang.pt);
    const copy = card?.querySelector("[data-preview-copy]");
    if (copy) {
      const current = [...copy.querySelectorAll(":scope > p")].map((p) => p.textContent);
      if (JSON.stringify(current) !== JSON.stringify(lang.pp)) {
        copy.replaceChildren(...lang.pp.map((v) => { const p = document.createElement("p"); p.textContent = v; return p; }));
      }
    }
    const ai = card?.querySelector("[data-ai-translation-disclosure]");
    text(ai, code === "de" ? "KI-generierter Text · redaktionell verantwortete deutsche Originalfassung" : `KI-generiert · automatisch aus dem Deutschen nach ${lang.n} übersetzt · Übersetzung nicht redaktionell geprüft`);

    let note = stage?.querySelector("[data-language-coverage-note]");
    if (stage && !note) { note = document.createElement("p"); note.className = "language-coverage-note"; note.dataset.languageCoverageNote = ""; stage.querySelector(".editorial-access-fineprint")?.insertAdjacentElement("afterend", note); }
    text(note, lang.coverage);

    const reveal = d.querySelector('[data-access-stage="reveal"]');
    text(reveal?.querySelector(".editorial-access-kicker"), code === "de" ? "Die eigentliche Frage" : lang.k);
    text(reveal?.querySelector("h2"), lang.rt);
    const rp = reveal ? [...reveal.children].filter((n) => n.tagName === "P" && !n.classList.contains("editorial-access-kicker")) : [];
    text(rp[0], lang.r1); text(rp[1], lang.r2);
    text(reveal?.querySelector("[data-access-continue]"), lang.open);
    text(reveal?.querySelector(".editorial-access-actions a"), lang.member);
  };

  const privacy = (lang) => {
    const p = document.querySelector(".editorial-privacy-sheet");
    if (!p) return;
    p.lang = code; p.dir = lang.d;
    const c = p.querySelector(".editorial-privacy-grid > div:first-child");
    text(c?.querySelector(":scope > span"), code === "de" ? "Datenschutz statt Einwilligungsroutine" : lang.choose);
    text(c?.querySelector("h2"), lang.ps);
    const ps = c ? [...c.children].filter((n) => n.tagName === "P") : [];
    text(ps[0], lang.p1); text(ps[1], lang.p2);
    text(c?.querySelector(".editorial-privacy-actions a"), lang.plink);
    c?.querySelectorAll("[data-privacy-close]").forEach((b) => text(b, lang.cont));
  };

  const storage = (lang) => {
    const list = document.querySelector("[data-storage-details-panel] ul");
    if (list) {
      let li = list.querySelector("[data-language-storage-detail]");
      if (!li) { li = document.createElement("li"); li.dataset.languageStorageDetail = ""; list.prepend(li); }
      const value = `<strong>Lesesprache:</strong> ${lang.n} (${code.toUpperCase()}) wird nur für diese Browsersitzung gespeichert, damit die Auswahl auf Unterseiten erhalten bleibt.`;
      if (li.innerHTML !== value) li.innerHTML = value;
    }
    const summary = document.querySelector("[data-storage-summary]");
    if (summary) {
      let chip = summary.querySelector("[data-language-storage-chip]");
      if (!chip) { chip = document.createElement("span"); chip.dataset.languageStorageChip = ""; summary.appendChild(chip); }
      text(chip, `Lesesprache: ${lang.n}`);
    }
  };

  const patch = () => {
    scheduled = false;
    observer?.disconnect();
    const lang = L[code] || L.de;
    header();
    document.querySelectorAll("[data-global-language-control] select").forEach((s) => { if (s.value !== code) s.value = code; });
    shell(lang); dialog(lang); privacy(lang); storage(lang);
    observer?.observe(document.body, {childList:true,subtree:true});
  };

  const schedule = () => { if (!scheduled) { scheduled = true; requestAnimationFrame(patch); } };
  const apply = (next) => { code = L[next] ? next : "de"; write(code); patch(); document.dispatchEvent(new CustomEvent("vote4gov:languagechange", {detail:{code,automatic:code!=="de",issue:"01"}})); };

  observer = new MutationObserver(schedule);
  observer.observe(document.body, {childList:true,subtree:true});
  patch();
})();