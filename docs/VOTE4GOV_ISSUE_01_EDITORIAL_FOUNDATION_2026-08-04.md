# Vote4Gov Review · Ausgabe 01 · Editorial Foundation

Stand: 2026-08-04

## Verbindlicher Produktstand

Vote4Gov ist eine wissenschaftlich-redaktionelle Untersuchungsebene. Vote4Gov führt keine eigene öffentliche Diskussion, Mitgliederverwaltung oder Abstimmung. Gesellschaftliche Vertiefung und Beteiligung werden ausschließlich an eDebatte übergeben.

## Titelseite

Die Titelseite beginnt mit der Leitfrage:

> Unsere Gesellschaft verändert sich jeden Tag. Warum darf sie politisch meist nur alle paar Jahre antworten?

Fünf redaktionelle Perspektiven ordnen politische Gesamtpakete, zeitlich gebündelte Sichtbarkeit, vorgegebene Verfahren, Medienlogik und Umfragen ein. Parlamente, Medien, Umfragen, Protest und Bürgerinitiativen werden nicht pauschal abgewertet.

## Atlas-Entscheidung

Ausgabe 01 ist im HTML, in der Navigation, im Footer, in der JavaScript-Runtime und in den Browserregressionen vollständig atlasfrei. Der bisherige Prototyp verband eine abstrakte Ökosystemgrafik mit Länderprofilen und erfüllte damit weder den Anspruch eines echten Weltatlas noch den einer belastbaren Vergleichsdatenbank.

Der Atlas darf erst als eigener Slice `VOTE4GOV-WORLD-ATLAS-FOUNDATION-01` zurückkehren. Mindestanforderungen sind echte Weltgeometrie oder gleichwertige zugängliche Kartengrundlage, stabile Länder-URLs, Suche, Vergleich, Originalquellen, lokale Begriffe, mobile Listenalternative und vollständige Barrierefreiheit.

## Sprache und Ausgabenstand

- kanonische Ausgabe: `01`
- kanonische Version: `1.0`
- deutsche Originalfassung
- zwölf auswählbare Interface- und Vorschau-Sprachen
- genau ein sichtbarer kompakter Sprachschalter
- automatische Übersetzungen bleiben als nicht redaktionell geprüft gekennzeichnet
- eine Interface-Auswahl darf einen deutschen Vollartikel nicht fälschlich als vollständig übersetzte Veröffentlichung ausgeben

Die zentralen Werte liegen in `site-config.js`. Der bisherige Sprach-Select bleibt vorübergehend als unsichtbare Zustandsbrücke erhalten, bis die Sprachruntime vollständig in ein einziges Datenmodul überführt ist.

## Transparenz und Beteiligung

- keine produktseitigen Analyse-, Werbe- oder Tracking-Cookies
- lokale Vormerkungen werden nicht als öffentliche Stimmen dargestellt
- das Öffnen eines eDebatte-Links löscht keine lokale Vormerkung
- unbestätigte Themen- und Fragenkennungen bleiben fail-closed
- KI-Ausgaben gelten nicht als Quelle
- Quellenwahl, Bewertung, Veröffentlichung und Verantwortung verbleiben bei Vote4Gov

## Qualitätssicherung

Der GitHub-Workflow prüft:

- Syntax aller JavaScript- und MJS-Dateien
- statische redaktionelle Architektur und interne Links
- atlasfreien Ausgabe-01-Vertrag
- eDebatte-Herkunft und fail-closed Handoff
- Desktop, Mobil, Tastatur, Touch, reduzierte Bewegung und 200-Prozent-Zoom
- zwölf Interface-/Vorschau-Sprachen, RTL und Sitzungsfortbestand
- visuelle Evidenz auf dem exakten PR-Head

## Bewusst offen

Vollständig veröffentlichte, redaktionell prüfbare Artikelübersetzungen bleiben ein eigener i18n- und Publikationsschritt. Der zukünftige Weltatlas und die allgemeine Publisher-/Agentur-Einbettung werden nicht als unfertige Bestandteile der Titelseite simuliert.
