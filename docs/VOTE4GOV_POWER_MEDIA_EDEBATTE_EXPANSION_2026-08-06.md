# Vote4Gov – Macht verstehen, Medien anschließen, eDebatte vertiefen

Stand: 2026-08-06

Status: verbindlicher Ausbauvertrag für den laufenden Branch `fix/vote4gov-editorial-hook-globe-01` / Draft-PR #9. Kein Parallelprodukt, keine zweite Landingpage, kein Merge- oder Production-Go.

## 1. Produktentscheidung

Vote4Gov wird als persönliche, quellenoffene gesellschaftliche Denkwerkstatt und zugleich als sichtbares Referenzmodell für modernen Journalismus ausgebaut.

Vote4Gov darf eine klare Autorenposition vertreten. Diese Position wird jedoch niemals als Fakt, Mehrheitswille oder eDebatte-Ergebnis ausgegeben.

Die feste Leserichtung lautet:

```text
Was wurde gesagt?
→ Was ist nachweisbar?
→ Welche Deutungen sind möglich?
→ Wo positioniert sich Ricky Fleischer?
→ Welche Gegenposition trägt?
→ Welche Optionen folgen daraus?
→ Wie wird die These bei eDebatte geprüft, ergänzt und beteiligt?
→ Was wurde entschieden und was geschah danach?
```

Vote4Gov erklärt und positioniert. eDebatte prüft, strukturiert, beteiligt und führt die Fallbiografie weiter. VoiceOpenGov verbindet Menschen, Mitglieder und Umsetzung.

## 2. Neue redaktionelle Leitserie

### Serientitel

**Wie Macht funktioniert – und wie Demokratie mit ihr wachsen kann**

### Leitthese

> Ich will politische Führung nicht schwächen. Ich will sie nachvollziehbar machen. Ein Staat braucht Menschen, die entscheiden können. Eine Demokratie braucht Bürger, die währenddessen sehen, prüfen, widersprechen und korrigieren können.

### Auftaktartikel

**Was muss man können, um Macht zu bekommen – und was, um sie gut auszuüben?**

Unterzeile:

> Politiker, Journalisten und ehemalige Insider beschreiben Aufstieg, Loyalität, Verwaltung, Kommunikation und persönliche Abhängigkeit. Ich gehe nicht mit jeder Diagnose mit. Aber die wiederkehrenden Mechanismen verdienen eine überprüfbare öffentliche Untersuchung.

### Vorgesehene Artikelstrecke

1. Welche Fähigkeiten belohnt das politische System?
2. Warum verändert sich Sprache mit wachsender Macht?
3. Wem ist ein Abgeordneter tatsächlich verpflichtet?
4. Wenn Minister führen, aber der Apparat weiß
5. Wie Verfahren Entscheidungen prägen, bevor abgestimmt wird
6. Warum Transparenz mehr sein muss als veröffentlichte Dokumente
7. Warum ich keine Demokratie der permanenten Abwahl will
8. Das Amt darf stark sein – aber niemals unsichtbar
9. Vom Wahlversprechen zur öffentlichen Entscheidungsbiografie
10. Eine Demokratie, die während der Amtszeit nicht schweigt
11. Mehrheit ohne Erkenntnis ist nur eine Zahl
12. Kontinuierliche demokratische Rückbindung als Systementwurf

## 3. Feste Artikelarchitektur

Jeder große Artikel erhält dieselben sichtbaren Ebenen.

### A. Persönlicher Ausgangspunkt

Kennzeichnung: `Meine Position`

- Warum beschäftigt mich die Frage?
- Wo widerspreche ich etablierten Reformvorschlägen?
- Welche demokratische Grundannahme vertrete ich?

### B. Gesagt

Kennzeichnung: `In der Quelle gesagt`

- Originalquelle
- Sprecher/Urheber
- vollständiger Quellenausschnitt oder zulässiger Auszug
- Zeit-, Seiten- oder Absatzbezug
- Transkriptions-/Übersetzungsstatus

### C. Geprüft

Kennzeichnung: `Nachweisstand`

- exakt gestützt
- teilweise gestützt
- persönliche Erfahrung
- thematisch ähnlich, aber keine Bestätigung
- externe Primärquelle vorhanden
- offen / noch nicht geprüft

### D. Gedeutet

Kennzeichnung: `Mögliche Lesarten`

Mindestens:

- stärkste Lesart für die These
- plausible alternative Erklärung
- Grenze der Generalisierung

### E. Gegenposition

Kennzeichnung: `Stärkster Einwand`

Kein Strohmann. Die Gegenposition muss so formuliert sein, dass ihre Vertreter sie wiedererkennen könnten.

### F. Meine Antwort

Kennzeichnung: `Warum ich dennoch anders schließe`

Persönliche Schlussfolgerung des Autors. Keine Objektivitätsbehauptung.

### G. Optionen

Kennzeichnung: `Was könnte sich ändern?`

Jede Option enthält:

- Wirkannahme
- Voraussetzungen
- Risiken/Nebenfolgen
- Zuständigkeit
- Reversibilität/Pilotfähigkeit
- Prüftermin oder Wirkungskriterium

### H. eDebatte

Kennzeichnung: `Bei eDebatte prüfen und weiterführen`

- kanonischer Topic-Slug
- stabile Thesis-/Question-IDs
- Source-Referenz
- Originalsprache und Lesesprache
- Handoff-Bundle
- Veröffentlichungs-/Freigabestatus

Ohne reale IDs bleibt der Einstieg sichtbar fail-closed: `Die öffentliche eDebatte zu dieser These wird vorbereitet.`

## 4. These als wiederverwendbare Medieneinheit

Jede veröffentlichte Vote4Gov-These erhält ein maschinenlesbares und visuell einbettbares `Thesis Card`-Artefakt.

### Inhalt

- `thesis_id`
- prägnante These
- Autorposition / Fremdzitat / Forschungsfrage
- Prüfstatus
- wichtigste Quelle
- stärkste Gegenposition
- offene Frage
- Link zum vollständigen Vote4Gov-Artikel
- Link zum kanonischen eDebatte-Fall
- letzter fachlicher Stand
- Sprache / Übersetzungsstatus

### Darstellungsvarianten

- kompakte Textkarte
- 16:9 Medienkarte
- 1:1 Social-/Vereinskarte
- 9:16 mobile Story-Karte
- zitierfähiges Embed für Redaktionen, Vereine, Initiativen und Blogs
- QR-Fassung mit sichtbarem Zieltext

### Embed-Prinzip

Ein Medienhaus kann die Karte auf seiner Seite einbetten. Der eigene Artikel bleibt beim Medium. Die Karte führt transparent weiter zu:

1. Vote4Gov: Autorposition, Quellen und journalistische Einordnung
2. eDebatte: lebendes Dossier, Gegenpositionen, offene Fragen, Beteiligung und Monitoring

Das Embed darf keine versteckte Analyse, Profilbildung oder automatische Stimme auslösen.

## 5. Media Desk 2.0

Der vorhandene Media Desk wird vom Download-/Hinweisbereich zum echten Publisher-Gateway erweitert.

### Publisher-Angebot

- These auswählen
- Format auswählen
- Sprache auswählen
- Vorschau öffnen
- Embed-Code kopieren
- QR herunterladen/anzeigen
- Quellen- und Aktualisierungsstatus prüfen
- eDebatte-Fortschritt abonnieren, nur nach ausdrücklicher Zustimmung

### Redaktionsnutzen

Medien erhalten:

- zitierfähige Kurzfassung
- direkte Primärquellenanker
- sichtbare Trennung von Nachricht, Einordnung und Meinung
- stärkste Gegenposition
- offene Fragen
- Änderungs- und Korrekturhistorie
- lebenden Anschluss statt Artikel-Endpunkt

### Kleine Organisationen

Vereine, Bürgerinitiativen, Schulen und Kommunen erhalten dieselbe Funktion ohne eigene technische Integration: Copy/Paste-Embed, Link und QR.

## 6. eDebatte-Handoff: harte Regeln

Jede aktive Vote4Gov-These muss einen kanonischen eDebatte-Kontext besitzen. Der Handoff nutzt ausschließlich den zentralen Registry-/Bundle-Vertrag.

### Keine erfundenen Ziele

Kein freier `/create`-Link, kein improvisierter Topic-Slug, keine aus dem Artikeltitel gebaute Frage-ID.

### Minimales Handoff-Bundle

```text
contract_version
article_id
thesis_id
topic_slug
question_ids[]
source_refs[]
original_language
reading_language
editorial_revision
```

Nicht enthalten:

- lokale Zustimmung/Ablehnung
- Accountdaten
- Cookies/Tokens
- Prompts/Completions
- politische Profile
- PII
- Berechtigungen

### Rückkanal von eDebatte zu Vote4Gov

Vote4Gov zeigt nach Freigabe:

- `Dossier wird aufgebaut`
- `Quellenprüfung offen`
- `Gegenposition ergänzt`
- `Beteiligung geöffnet`
- `Ergebnis liegt vor`
- `institutionelle Reaktion dokumentiert`
- `Monitoring aktiv`

Vote4Gov übernimmt niemals automatisch eDebatte-Inhalte als neue redaktionelle Wahrheit. Änderungen werden reviewfähig eingespielt.

## 7. Sichtbare Trennung der demokratischen Ebenen

Jeder Themenraum muss folgende Zustände auseinanderhalten:

1. **Gesagt** – dokumentierte Aussage
2. **Geprüft** – Evidenz- und Quellenstand
3. **Gedeutet** – Interpretation
4. **Abgewogen** – Werte, Folgen und Optionen
5. **Bevorzugt** – Beteiligungs-/Präferenzergebnis
6. **Entschieden** – zuständige institutionelle Entscheidung
7. **Umgesetzt** – realer Vollzug
8. **Gelernt** – Wirkung, Korrektur, erneute Prüfung

Besonders wichtig:

```text
gesellschaftlicher Output ≠ institutioneller Beschluss
```

Bei Abweichung ist sichtbar:

- übernommen
- teilweise übernommen
- abgelehnt
- vertagt
- rechtlich nicht möglich
- finanziell/operativ blockiert
- alternative Umsetzung

Jeweils mit Begründung, Zuständigkeit und nächstem Ereignis.

## 8. Landingpage-Integration

Die bestehende Magazin- und Ausgabenlogik bleibt erhalten. Keine neue Hero-Grundarchitektur.

### Ergänzungen innerhalb des vorhandenen Aufbaus

1. Nach dem bestehenden Titelblock ein kompakter persönlicher Manifest-Satz:

> Ich möchte nicht, dass du mir glaubst. Ich möchte, dass du sehen kannst, was gesagt wurde, was davon trägt, wo ich widerspreche – und wie wir die Frage gemeinsam weiterprüfen.

2. Neuer Schwerpunktblock nach `Institutionen` oder als Leitstrecke der nächsten Ausgabe:

**Macht verstehen**

- Selektion
- Loyalität
- Information
- Entscheidung
- Kontrolle
- Lernen

3. Neue Leitgrafik als reine HTML/CSS-Informationsarchitektur:

```text
Quelle → Aussage → Prüfung → Deutung → Option → Beteiligung → Entscheidung → Wirkung
```

Keine abstrakte dekorative Grafik ohne funktionale Aussage.

4. Jede Startseiten-Story zeigt künftig einen Status-Chip:

- Autorenposition
- Quellenanalyse
- offene Forschungsfrage
- extern geprüfter Fakt
- eDebatte vorbereitet
- eDebatte aktiv
- Monitoring aktiv

5. Im Medienabschnitt wird der Übergang vom Artikel zum lebenden Dossier demonstriert.

## 9. Erster Referenzfall: politische Macht und Glaubwürdigkeit

### Kernfrage

**Belohnt das politische System teilweise andere Fähigkeiten für den Aufstieg als für gute und glaubwürdige Amtsführung?**

### Teilthesen

1. Ein großer Teil politischer Arbeit kann in innerparteiliche Macht- und Netzwerkarbeit fließen.
2. Aufstieg verlangt ein Gespür für Mehrheiten, Loyalitäten und Organisation.
3. Listen- und Karriereabhängigkeiten können die Rückbindung an Bürger verändern.
4. Mit wachsender politischer Ebene verändern sich Sprache, Bezugsgruppen und Rechtfertigungsdruck.
5. Machtgewinn und gute Amtsführung verlangen teilweise unterschiedliche Kompetenzprofile.
6. Materielle und berufliche Abhängigkeit kann Konformität fördern.

Alle sechs Teilthesen starten als `open_hypothesis` oder `personal_experience`, soweit keine unabhängige Evidenz vorliegt.

### Persönliche Vote4Gov-Position

Keine automatische Amtszeitbegrenzung als Universallösung. Erfahrung ist nicht das Problem. Unsichtbare, unkontrollierte und nicht rückgekoppelte Macht ist das Problem.

Vorzugsrichtung:

- kontinuierliche öffentliche Rückbindung
- sichtbare Entscheidungsbiografien
- Begründungspflicht bei Abweichungen
- offene Evidenz- und Optionsräume
- klare Mandate und Ergebnisarten
- Monitoring bis zur Wirkung
- Korrektur ohne institutionellen Gesichtsverlust

## 10. Designprinzipien

- bestehende hochwertige Magazinästhetik beibehalten
- persönliche Stimme deutlich, aber nicht boulevardesk
- große Typografie für Leitfragen, kleine präzise Provenienz
- Gegenposition gleichwertig sichtbar
- Status und Evidenz nicht über Farben allein erklären
- Mobile zuerst lesbar; kein Kartenfriedhof
- lange Inhalte mit Sprungmarken, Kurzfassung und `3-Minuten-Ansicht`
- keine Scheingenauigkeit oder Wahrheitsscores
- keine künstliche Paywall oder Wissensschranke

## 11. Technische Umsetzungsslices

### Slice 1 – Editorial Contract

- Article-/Thesis-Metadatenvertrag
- Status-/Layer-Taxonomie
- fail-closed eDebatte Registry
- statische Validierung

### Slice 2 – Auftaktartikel

- vollständiger Artikel zur Kernfrage
- sechs Teilthesen
- Quellen-/Gegenpositions-/Meinungsblöcke
- eDebatte-Handoff zunächst fail-closed

### Slice 3 – Landingpage-Erweiterung

- `Macht verstehen`-Schwerpunkt
- Leitgrafik
- Status-Chips
- neue Artikelverlinkung

### Slice 4 – Publisher Embed

- Thesis Card
- responsive iframe/web-component oder statisches Embed
- Copy-Code
- No-Tracking-/Accessibility-Vertrag

### Slice 5 – Media Desk 2.0

- Auswahl, Vorschau, Embed, QR, Quellenstatus
- kleine Organisationen gleichwertig unterstützen

### Slice 6 – eDebatte Aktivierung

Erst nach realen Topic-/Question-/Source-IDs und fachlicher Freigabe.

## 12. Abnahmekriterien

- jede aktive These besitzt eindeutige stabile ID
- jede Tatsachenbehauptung besitzt Quelle oder sichtbaren offenen Status
- persönliche Meinung ist als solche gekennzeichnet
- stärkste Gegenposition ist vorhanden
- eDebatte-Handoff ist zentral und fail-closed
- keine lokale Vormerkung wird als öffentliche Stimme übertragen
- gesellschaftlicher Output und institutionelle Entscheidung sind getrennt
- Embed funktioniert ohne Tracking und ohne JavaScript-Zwang als Link-Fallback
- Desktop, Mobile, Tastatur, Screenreader, RTL und 200-%-Zoom geprüft
- keine neue parallele i18n-, Quellen- oder Beteiligungswahrheit
- CI prüft IDs, interne Links, Statuswerte und verbotene freie `/create`-Übergaben

## 13. Nicht-Ziele

- keine Parteiseite
- keine Wahlempfehlung
- kein Politiker-Bashing
- keine Behauptung, aus wenigen Interviews das politische System bewiesen zu haben
- keine Abstimmung über Tatsachen
- keine automatische Veröffentlichung aus KI- oder eDebatte-Ausgaben
- keine Abschaffung repräsentativer Führung als implizites Produktziel

## 14. Kernsatz

> Vote4Gov zeigt, wie eine persönliche politische Position zugleich klar, medial nutzbar und überprüfbar sein kann. eDebatte macht aus dem Artikel keinen Endpunkt, sondern eine lesbare gesellschaftliche Fallbiografie.