(() => {
  const KEY = "vote4gov:language:v1";
  const control = document.querySelector("[data-home-language-control]");
  const select = control?.querySelector("select");
  if (!control || !select) return;

  const UI = {
    de:{label:"Lesesprache",coverage:"Navigation und Oberfläche werden umgestellt. Die veröffentlichte Originalfassung bleibt Deutsch.",nav:{vision:"Vision",mission:"Mission",regions:"Regionen",person:"Person",edebatte:"eDebatte",join:"Mitmachen",contact:"Kontakt"}},
    en:{label:"Reading language",coverage:"Navigation and interface switch language. The published source version remains German.",nav:{vision:"Vision",mission:"Mission",regions:"Regions",person:"Person",edebatte:"eDebatte",join:"Join",contact:"Contact"}},
    fr:{label:"Langue de lecture",coverage:"La navigation et l’interface changent de langue. La version source publiée reste en allemand.",nav:{vision:"Vision",mission:"Mission",regions:"Régions",person:"Personne",edebatte:"eDebatte",join:"Participer",contact:"Contact"}},
    es:{label:"Idioma de lectura",coverage:"La navegación y la interfaz cambian de idioma. La versión fuente publicada sigue en alemán.",nav:{vision:"Visión",mission:"Misión",regions:"Regiones",person:"Persona",edebatte:"eDebatte",join:"Participar",contact:"Contacto"}},
    tr:{label:"Okuma dili",coverage:"Gezinme ve arayüz dili değişir. Yayımlanan kaynak sürüm Almanca kalır.",nav:{vision:"Vizyon",mission:"Misyon",regions:"Bölgeler",person:"Kişi",edebatte:"eDebatte",join:"Katıl",contact:"İletişim"}},
    ar:{label:"لغة القراءة",coverage:"تتغير لغة التنقل والواجهة. وتبقى النسخة الأصلية المنشورة بالألمانية.",nav:{vision:"الرؤية",mission:"المهمة",regions:"المناطق",person:"الشخص",edebatte:"eDebatte",join:"شارك",contact:"اتصال"}},
    it:{label:"Lingua di lettura",coverage:"Navigazione e interfaccia cambiano lingua. La versione originale pubblicata resta in tedesco.",nav:{vision:"Visione",mission:"Missione",regions:"Regioni",person:"Persona",edebatte:"eDebatte",join:"Partecipa",contact:"Contatto"}},
    pt:{label:"Idioma de leitura",coverage:"A navegação e a interface mudam de idioma. A versão original publicada continua em alemão.",nav:{vision:"Visão",mission:"Missão",regions:"Regiões",person:"Pessoa",edebatte:"eDebatte",join:"Participar",contact:"Contato"}},
    nl:{label:"Leestaal",coverage:"Navigatie en interface schakelen van taal. De gepubliceerde brontekst blijft Duits.",nav:{vision:"Visie",mission:"Missie",regions:"Regio's",person:"Persoon",edebatte:"eDebatte",join:"Meedoen",contact:"Contact"}},
    pl:{label:"Język czytania",coverage:"Nawigacja i interfejs zmieniają język. Opublikowana wersja źródłowa pozostaje po niemiecku.",nav:{vision:"Wizja",mission:"Misja",regions:"Regiony",person:"Osoba",edebatte:"eDebatte",join:"Dołącz",contact:"Kontakt"}},
    uk:{label:"Мова читання",coverage:"Навігація та інтерфейс змінюють мову. Опублікована оригінальна версія залишається німецькою.",nav:{vision:"Бачення",mission:"Місія",regions:"Регіони",person:"Про мене",edebatte:"eDebatte",join:"Долучитися",contact:"Контакт"}},
    zh:{label:"阅读语言",coverage:"导航与界面会切换语言。已发布的原始版本仍为德语。",nav:{vision:"愿景",mission:"使命",regions:"地区",person:"人物",edebatte:"eDebatte",join:"参与",contact:"联系"}}
  };

  const read = () => {
    try { return sessionStorage.getItem(KEY) || "de"; } catch { return "de"; }
  };
  const write = (code) => { try { sessionStorage.setItem(KEY, code); } catch {} };

  const apply = (next) => {
    const code = UI[next] ? next : "de";
    const lang = UI[code];
    write(code);
    document.documentElement.dataset.readingLanguage = code;
    document.documentElement.dataset.translationCoverage = "interface-preview";
    document.documentElement.dataset.translationMode = code === "de" ? "original" : "automatic-interface-preview";
    document.documentElement.dataset.translationReviewed = String(code === "de");
    select.value = code;
    select.setAttribute("aria-label", lang.label);
    const label = control.querySelector("[data-home-language-label]");
    if (label) label.textContent = lang.label;
    const coverage = control.querySelector("[data-home-language-coverage]");
    if (coverage) {
      coverage.textContent = lang.coverage;
      coverage.hidden = code === "de";
    }
    document.querySelectorAll("[data-home-nav]").forEach((link) => {
      const key = link.dataset.homeNav;
      if (lang.nav[key]) link.textContent = lang.nav[key];
    });
    document.dispatchEvent(new CustomEvent("vote4gov:languagechange", { detail: { code, automatic: code !== "de", issue: "01" } }));
  };

  select.addEventListener("change", () => apply(select.value));
  apply(read());
})();
