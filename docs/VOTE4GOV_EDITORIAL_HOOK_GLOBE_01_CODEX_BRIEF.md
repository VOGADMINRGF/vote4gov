# VOTE4GOV-EDITORIAL-HOOK-GLOBE-01 · Codex Brief

## Arbeitsrahmen

Arbeite ausschließlich im Repository `VOGADMINRGF/vote4gov` auf dem bestehenden Branch:

`fix/vote4gov-editorial-hook-globe-01`

Erstelle keinen weiteren Branch und keinen weiteren Pull Request. Der bestehende Draft-PR ist der einzige PR für diesen Arbeitsstrang.

Lies vor Änderungen vollständig:

1. `docs/VOTE4GOV_NORTH_STAR.md`
2. `index.html`
3. `journal.css`
4. `script.js`
5. `quellen.html`
6. `.github/workflows/static-editorial-quality.yml`
7. alle bestehenden Dateien unter `journal/`, soweit sie von Navigation, Wiederholungen oder redaktionellen Hinweisen betroffen sind.

Prüfe anschließend den aktuellen Arbeitsbaum und vorhandene offene PRs auf Scope- oder Dateikollisionen. Keine unverbundenen Änderungen übernehmen.

## Verbindliche Produktrolle

Vote4Gov ist die wissenschaftlich-redaktionelle Begründungs- und Reflexionsebene des Ökosystems. Es untersucht weltweit Geschichte, Leistungen, Grenzen und Fehlentwicklungen demokratischer Systeme.

- Vote4Gov formuliert und belegt Thesen.
- VoiceOpenGov ist die Mitgliederbewegung mit 50 Grundfragen als Fundament.
- eDebatte ist der autarke Systemkern für Quellen, Gegenpositionen, Dossiers, Runden, Abstimmungen, Ergebnisse und Wirkung.
- Diskussion und Abstimmung finden ausschließlich in eDebatte statt.
- Vote4Gov darf keine eigene Beteiligungsplattform, Kommentarwelt oder Nachrichtenmaschine werden.

Die Seite darf wie eine hochwertige internationale Zeitung oder Review wirken. Sie darf aber nicht als tägliches Empörungsmedium, Wahlkampfseite oder Anti-Parteien-Portal erscheinen.

## Ziel des Passes

Die Titelseite muss Leserinnen und Leser innerhalb der ersten Bildschirmhöhe unmittelbar abholen und die zentrale demokratische Spannung verständlich machen:

> Unsere Gesellschaft verändert sich jeden Tag. Warum darf sie politisch meist nur alle paar Jahre antworten?

Vote4Gov soll klar zeigen, dass heutige demokratische Willensbildung häufig geprägt ist durch:

- die Wahl politischer Gesamtpakete statt einzelner Sachfragen,
- zeitlich begrenzte Protestbewegungen und Bürgerinitiativen,
- vorformulierte Ja/Nein- oder Multiple-Choice-Fragen,
- digitale Beteiligung, die oft erst nach Festlegung von Thema, Verfahren und Antwortoptionen beginnt,
- Medien- und Nachrichtenlogiken, in denen Schlagzeile, Nachricht, Einordnung, Kommentar, Prognose und redaktionelle Auswahl nicht immer ausreichend unterscheidbar sind,
- Umfragen mit begrenzten Stichproben, deren Aussagekraft, Auswahlverfahren, Erhebungsweg und Unsicherheit für Leserinnen und Leser nicht immer sichtbar genug werden,
- gesellschaftliche Dynamik, die schneller verläuft als Wahlperioden, institutionelle Rückkopplung und zeitlich gebündelte Beteiligungsformate.

Die Kritik bleibt wissenschaftlich anschlussfähig. Keine pauschale Abwertung von Parlamenten, Medien, Umfragen, Parteien, Protest oder Bürgerinitiativen. Jede Form besitzt legitime Funktionen und Grenzen.

## Priorität 1 · Neuer redaktioneller Einstieg

Überarbeite Hero und unmittelbaren Einstieg der Startseite. Der erste Eindruck soll nicht mit abstrakter Produkt- oder Systembeschreibung beginnen, sondern mit einer starken gesellschaftlichen Beobachtung.

Verbindlicher inhaltlicher Kern:

### Hauptzeile

`Unsere Gesellschaft verändert sich jeden Tag. Warum darf sie politisch meist nur alle paar Jahre antworten?`

### Einordnung

Formuliere eine präzise, gut lesbare Unterzeile entlang dieses Sinns:

`Wir wählen politische Gesamtpakete, reagieren auf vorgegebene Fragen und erfahren gesellschaftliche Stimmung über Schlagzeilen und begrenzte Stichproben. Vote4Gov untersucht weltweit, wie diese Ordnung entstanden ist, was sie geleistet hat und warum demokratische Mitwirkung heute weitergehen muss.`

Die Formulierung darf redaktionell verfeinert werden, die Aussage darf nicht abgeschwächt oder in Produktmarketing umgeschrieben werden.

### Unmittelbare Beweisfelder

Baue direkt nach oder innerhalb des Einstiegs eine sehr kompakte, visuell hochwertige Übersicht mit fünf unterscheidbaren Feldern:

1. **Politische Gesamtpakete**  
   Gewählt wird ein Bündel aus Personen, Programmen und späteren Kompromissen. Einfluss auf einzelne Sachentscheidungen bleibt begrenzt.

2. **Zeitlich gebündelte Beteiligung**  
   Protest, Bürgerinitiative und Kampagne können Themen sichtbar machen, bleiben aber häufig an Anlass, Mobilisierung und Zeitfenster gebunden.

3. **Vorgegebene Verfahren**  
   Bei vielen Beteiligungsformaten stehen Frage, Zuständigkeit, Phase und Antwortoptionen bereits fest, bevor Menschen einbezogen werden.

4. **Medien und Nachrichtenlogik**  
   Schlagzeile, Auswahl, Einordnung, Kommentar und Prognose prägen öffentliche Wahrnehmung unterschiedlich und müssen klarer unterscheidbar sein.

5. **Umfragen und Stichproben**  
   Einige Hundert oder Tausend Befragte können methodisch wertvolle Aussagen ermöglichen. Sie sind aber nicht automatisch der Wille von Millionen Menschen. Stichprobe, Erhebungsweg, Fragestellung, Ausschöpfung, Unsicherheit und Auftraggeber gehören sichtbar zur Aussage.

Abschließende Leitfrage im Einstieg:

> Die Frage ist nicht, ob Parlamente, Medien, Umfragen oder Protest abgeschafft werden sollten. Die Frage ist, warum sie fast allein bestimmen, wie gesellschaftlicher Wille sichtbar wird.

## Priorität 2 · Globus wirklich funktionsfähig machen

Der Demokratie-Globus muss als interaktiver Einstieg funktionieren und darf kein rein dekoratives Element bleiben.

Mindestanforderungen:

- Länderpunkte sind per Maus, Touch und Tastatur bedienbar.
- Aktiver Zustand ist visuell und per `aria-pressed` oder gleichwertigem Muster erkennbar.
- Klick oder Tastaturauswahl aktualisiert zuverlässig die zugehörige Länderkarte.
- Deutschland, Schweiz, Estland und Frankreich funktionieren mindestens vollständig.
- Auf schmalen Displays existiert eine robuste Länderlisten- oder Tab-Alternative.
- Ohne JavaScript bleiben die wichtigsten Inhalte lesbar.
- Keine globale Demokratie-Rangliste.
- Jedes Profil unterscheidet mindestens:
  - historische Entwicklung,
  - repräsentative Struktur,
  - direkte Beteiligung,
  - digitale Verfahren,
  - dokumentierte Stärke,
  - dokumentierte Grenze,
  - Quellen- beziehungsweise Prüfstatus.
- Nicht geprüfte oder nur prototypische Angaben müssen sichtbar als solche gekennzeichnet werden.
- Prüfe, ob derzeit Selektoren, Datenattribute, doppelte Elemente oder CSS-Überlagerungen die Interaktion verhindern.
- Keine neue schwere Karten- oder Globe-Abhängigkeit einführen. Die statische Website soll leicht, schnell und wartbar bleiben.

## Priorität 3 · Ökosystem-CI und Zeitungscharakter verbinden

Die derzeitige redaktionelle Richtung ist grundsätzlich richtig, wirkt aber noch nicht vollständig wie ein Teil desselben Ökosystems.

Erhalte die eigenständige Zeitungs-/Review-Ästhetik, gleiche jedoch folgende Elemente sichtbar an die gemeinsame Ökosystem-DNA an:

- Blau/Türkis-Farben und Kontrastlogik,
- Vote4Gov-Logo und Markenabstände,
- Header- und Footer-Grundsystem,
- Button-Radien und Interaktionszustände,
- Fokuszustände,
- Grundtypografie und Lesbarkeit,
- Karten- und Panelraster,
- mobile Navigation.

Vote4Gov darf redaktionell eigenständiger bleiben durch:

- große Leitartikel-Typografie,
- Ressortzeilen,
- Datums-, Quellen- und Versionszeilen,
- Zeitungsspalten,
- hervorgehobene Zitate,
- Artikelserien,
- Media- und Embed-Karten.

Vermeide eine bloße Kopie von eDebatte-Oberflächen. Ziel ist erkennbare Verwandtschaft, nicht Identität.

## Priorität 4 · Doppelungen reduzieren

Die aktuelle Startseite enthält inhaltliche Wiederholungen. Führe einen Redundanz-Pass durch.

- Wiederhole dieselbe Rollenformel nicht in mehreren nahezu identischen Abschnitten.
- Wiederhole die Aussagen zu Wahlen, Beteiligung, Quellen, eDebatte und Civic Tech nicht mehrfach ohne neue Erkenntnis.
- Jeder Abschnitt braucht eine eigenständige redaktionelle Funktion.
- Kürze oder verbinde Abschnitte, anstatt lediglich Texte umzuschreiben.
- Die Seite soll breit und substanziell bleiben, aber klarer geführt und schneller erfassbar werden.
- Bestehende Artikel nicht ersatzlos entwerten; die Startseite soll auf vertiefende Artikel verweisen, statt deren gesamten Inhalt zu duplizieren.

## Priorität 5 · Medienkritik fachlich sauber darstellen

Ergänze einen kompakten, visuell starken redaktionellen Block über die öffentliche Informationsordnung.

Unterscheide ausdrücklich:

- Ereignis oder Primärinformation,
- journalistische Auswahl,
- Nachricht,
- Kontext und Einordnung,
- Kommentar oder Meinung,
- Prognose,
- Umfrage oder Stichprobenergebnis.

Der Text darf nicht behaupten, Medien seien grundsätzlich manipulativ oder Umfragen grundsätzlich wertlos. Er soll zeigen, dass unterschiedliche Qualitäts- und Subjektivitätsebenen bestehen und für Nutzerinnen und Nutzer sichtbarer werden sollten.

Bei Umfragen muss kenntlich werden, dass Aussagekraft nicht allein von der absoluten Teilnehmerzahl abhängt. Methodische Qualität kann auch bei kleineren Stichproben hoch sein. Sichtbar sein sollten jedoch mindestens:

- Grundgesamtheit,
- Auswahlverfahren,
- Stichprobengröße,
- Erhebungsmethode,
- Feldzeit,
- genaue Frageformulierung,
- Gewichtung,
- Unsicherheitsbereich,
- Auftraggeber,
- Nichtantworten beziehungsweise Ausschöpfung, soweit verfügbar.

Keine erfundenen Zahlen oder pauschalen Behauptungen verwenden.

## Priorität 6 · KI-Nutzung professionell kennzeichnen

Vote4Gov darf transparent zeigen, dass KI zur Rechercheunterstützung, Strukturierung, Übersetzung oder Sprachfassung eingesetzt wird. Die Kennzeichnung darf nicht defensiv oder wie ein Qualitätsmangel wirken.

Verbindlicher Grundsatz:

> KI wird für ein besseres Nutzungserlebnis und effizientere redaktionelle Arbeit eingesetzt. Sie ersetzt weder Quellen noch menschliche Verantwortung.

Baue einen wiederverwendbaren redaktionellen Hinweis ein, sinngemäß:

`Dieser Beitrag wurde unter Verwendung KI-gestützter Recherche-, Strukturierungs-, Übersetzungs- oder Sprachwerkzeuge erstellt. Quellenwahl, Bewertung, Schlussfolgerungen, Veröffentlichung und Verantwortung liegen bei Vote4Gov. KI-Ausgaben gelten nicht als Quelle.`

Anforderungen:

- Der Hinweis ist auf der Startseite oder Methodenseite gut auffindbar.
- Artikel erhalten eine kompakte Kennzeichnung, welche Rolle KI hatte: Rechercheunterstützung, Struktur, Übersetzung oder Sprachfassung.
- Keine Behauptung automatischer Faktenprüfung.
- Keine KI-Ausgabe als Primär- oder Sekundärquelle behandeln.
- Redaktionelle Verantwortung und Korrekturweg bleiben sichtbar.

## Priorität 7 · Routing und Rollen schützen

- Vote4Gov-interne Beteiligung, Kommentare oder Abstimmungen nicht neu einführen.
- Alle Diskussions-, Widerspruchs- und QR-CTAs führen zu eDebatte.
- Herkunftsmetadaten für Vote4Gov bleiben erhalten.
- VoiceOpenGov wird als Bewegung mit 50 Grundfragen korrekt eingeordnet, aber nicht zum alleinigen Rückspiegelungsort von eDebatte gemacht.
- eDebatte bleibt autark und der alleinige Beteiligungskern.
- Bestehende Legacy-Redirects für alte Anlassraum-URLs dürfen nicht beschädigt werden.

## Nicht im Scope

- keine vollständige Recherche aller Länder der Welt,
- keine neue Datenbank oder API,
- keine Benutzerkonten,
- keine neue Mitgliedschaftslogik,
- keine VoiceOpenGov-Implementierung,
- keine eDebatte-Implementierung,
- keine tägliche News-Pipeline,
- keine externe Analytics- oder Tracking-Lösung,
- kein umfangreiches Framework-Rewrite,
- kein automatisches Publizieren.

## Technische und redaktionelle Qualitätsanforderungen

- semantisches HTML,
- vollständige Tastaturbedienbarkeit,
- sichtbare Fokuszustände,
- gute Kontraste,
- robuste Darstellung ab 320 px,
- keine horizontale Scrollbar,
- keine ungefangenen JavaScript-Fehler,
- progressive Enhancement,
- vorhandene CI-Prüfung erweitern, falls dadurch die neue Globus- oder Routinglogik sinnvoll abgesichert werden kann,
- keine nicht belegten Zukunftsfunktionen als produktiv darstellen,
- keine Quelle erfinden,
- keine pauschale Demokratie-, Medien-, Parteien- oder Umfragenabwertung.

## Erwartete Dateien

Voraussichtlich relevant:

- `index.html`
- `journal.css`
- `script.js`
- `quellen.html`
- ausgewählte Dateien unter `journal/`
- `docs/VOTE4GOV_NORTH_STAR.md` nur bei tatsächlich notwendiger Präzisierung
- `.github/workflows/static-editorial-quality.yml` oder ergänzende kleine Prüfskripte

Begrenze den Scope auf tatsächlich notwendige Dateien.

## Abnahme

Vor Abschluss mindestens prüfen:

1. Startseite Desktop und mobil.
2. Hero vermittelt die gesellschaftliche Spannung innerhalb der ersten Bildschirmhöhe.
3. Globus/Ländersteuerung funktioniert per Maus, Touch und Tastatur.
4. Deutschland, Schweiz, Estland und Frankreich aktualisieren die Inhaltskarte korrekt.
5. Mobile Länderalternative funktioniert.
6. Keine ungewollten Vote4Gov-internen Beteiligungslinks.
7. eDebatte-CTAs und Herkunftsparameter bleiben korrekt.
8. Alte Anlassraum-URLs leiten weiterhin zu eDebatte um.
9. KI-Nutzung ist professionell, eindeutig und nicht defensiv gekennzeichnet.
10. Medien- und Umfragenabschnitt trennt Befund, Methode und Bewertung sauber.
11. Redundanzen auf der Startseite wurden sichtbar reduziert.
12. Links und JavaScript sind fehlerfrei.
13. `git diff --check` ist sauber.
14. vorhandene GitHub-Qualitätsprüfung ist grün.
15. Vercel-Preview ist grün.

## Abschlussbericht

Berichte am Ende knapp und konkret:

- Root Cause des defekten Globus,
- umgesetzte Hero-/Einstiegslogik,
- entfernte oder zusammengeführte Doppelungen,
- CI-Angleichung,
- Medien-/Umfragenkennzeichnung,
- KI-Transparenz,
- ausgeführte Tests und Checks,
- bewusst offene Punkte,
- Commit-SHA und Status des bestehenden Draft-PR.
