# Vote4Gov Access Preview Refinement · 2026-08-02

## Produktkorrektur

Die erste Abo-Demonstration wirkte wie ein großflächiges Sprachraster und behauptete fälschlich, der Artikel sei nur mit Abo verfügbar. Das wurde korrigiert.

## Neuer Einstieg

- kein automatisches Öffnen nach Seitenaufruf; Hero und erste Bildschirmhöhe bleiben unmittelbar lesbar
- Öffnung ausschließlich über die sichtbare Handlung `Freier Zugang & Mitgliedschaft`
- Headline: `Wie möchten Sie weiterlesen?`
- keine falsche Bezahlschrankenbehauptung
- eine echte Vorschau der Titelgeschichte statt sechs paralleler Textkarten
- kompakte Sprachwahl mit Flagge und Sprachname
- Deutsch, Englisch, Französisch, Spanisch, Türkisch und Arabisch
- immer nur eine Sprachfassung sichtbar
- Arabisch mit RTL-Richtung
- Tastatursteuerung mit Pfeilen, Home und Ende
- klare Zugänge:
  - `Kostenfrei weiterlesen`
  - `VoiceOpenGov-Mitglied werden und mitgestalten`

## Redaktionelle Auflösung

Erst nach `Kostenfrei weiterlesen` erscheint die eigentliche Kritik an künstlichen Wissensbarrieren. Mitgliedschaft unterstützt Arbeit und Mitwirkung, schaltet aber kein Wissen frei.

## Datenschutz

Nach dem Öffnen des Artikels erscheint ein kompakter Hinweis statt einer fingierten Cookie-Einwilligung:

- keine Analyse-, Werbe- oder Tracking-Cookies in dieser statischen Ausgabe
- keine Verhaltensprofile
- kein Verkauf von Nutzungsdaten
- technisch notwendige Hosting- und Sicherheitsdaten bleiben transparent benannt
- nicht notwendige Datennutzung braucht getrennte, konkrete und widerrufbare Einwilligung

## Weltatlas

Der Atlas bleibt als verbindlicher Teil der Vote4Gov-Review sichtbar. Deutschland, Schweiz, Estland und Frankreich sind im normalen JavaScript-Betrieb über den Globus und die mobile Tabalternative auswählbar. Ohne JavaScript bleiben alle vier redaktionellen Arbeitsprofile in Dokumentreihenfolge lesbar. Navigation, redaktionelle Handlung und Footer behalten ihre Atlaslinks.

## eDebatte-Kontext

Der erste Artikel verwendet ausschließlich den vorbereiteten Vertrag `/topic/[slug]?v4g=<vote4gov-context-v1-bundle>`. Solange Public-Topic-Slug, kanonische produktive Vote4Gov-Quell-URL sowie stabile IDs für binäre These und offene Frage nicht bestätigt sind, bleibt der Link fail-closed und zeigt: `Der Themenkontext bei eDebatte wird vorbereitet.`

`/create`, `context_bundle`, `entry=context_handoff`, frei zusammengesetzte `source_url`-Parameter und Preview-Origins sind keine primäre Artikelhandlung. Lokale Vormerkungen werden durch eine Linköffnung weder gelöscht noch übertragen oder gezählt.

## Abnahme

- nur eine Artikelvorschau gleichzeitig sichtbar
- Sprachwechsel aktualisiert Titel und Vorschautext
- arabische Fassung verwendet RTL
- kostenlose Fortsetzung ist primäre Handlung
- Mitgliedschaft wird nicht als Voraussetzung dargestellt
- medienkritische Auflösung erscheint erst nach der freien Fortsetzung
- Datenschutzhinweis verlangt keine fingierte Tracking-Einwilligung
- Zugangsdialog öffnet nur nach bewusster Nutzeraktion und schließt per Escape mit Fokus-Rückgabe
- Atlas und Atlaslinks bleiben im JavaScript-Betrieb sichtbar
- DE, CH, EE und FR funktionieren mit Maus, Touch und Tastatur; ohne JavaScript bleiben alle Profile lesbar
- unvollständige Registrykonfiguration bleibt ohne primären eDebatte-Link sichtbar fail-closed

## Scope

Keine Änderung an eDebatte, VoiceOpenGov oder PR #557. Dieser Pass bleibt ausschließlich in Vote4Gov PR #9.
