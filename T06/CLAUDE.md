# Kartenwerkzeug

Eine Karte mit einer eigenen Sammlung von Orten. Man sieht die Orte auf einer
Weltkarte, stellt Ausschnitt und Zoom ein und sucht Orte im Umkreis.

Ich lerne damit zwei Dinge: mit Claude Code arbeiten und verstehen, wie ein
Frontend-Framework funktioniert. Erkläre kurz, was du änderst und warum.

Das Projekt wächst Schritt für Schritt. Jeder Schritt führt ein Konzept mit
Namen ein, damit der Code nachvollziehbar bleibt:

- Zustand und Reaktivität: `ref`, `computed`, die Oberfläche folgt den Daten (jetzt)
- Orte als Einträge mit fester `id`: anlegen, auswählen, löschen
- Persistenz: Die Orte bleiben nach dem Neuladen erhalten
- Fremde Daten: mit `fetch` laden, mit Lade- und Fehlerzuständen

Nur bauen, was gerade dran ist. Nichts aus späteren Themen vorwegnehmen.

## Wo was liegt

- `nuxt/`: das aktuelle Projekt. Nur hier arbeiten
- `T01/` bis `T05/`: frühere Stände, nicht ändern
- `nuxt/app/app.vue`: die ganze Oberfläche, eine Komponente
- `nuxt/app/lib/`: reine Funktionen (`projektion.js`, `entfernung.js`), ohne DOM.
  Werden mit `import` ausdrücklich importiert
- `nuxt/app/orte.json`: die Daten. Jeder Ort hat `id`, `name`, `lat`, `lon`, `farbe`.
  Keine Felder dazu erfinden

## Stack

- Nuxt 4 mit dem Ordner `app/`, nicht die Struktur von Nuxt 3
- Vue mit `<script setup>`, keine Options API
- JavaScript, kein TypeScript
- `ssr: false` in `nuxt/nuxt.config.ts` bleibt so

## Regeln

- Eine Änderung pro Schritt. Erst sagen, was du vorhast, dann ändern
- Wenn etwas unklar ist: fragen, nicht raten
- Nur ändern, worum ich bitte. Nichts nebenbei umbauen oder aufräumen
- Keine Pakete installieren
- Vorhandene Funktionen aus `nuxt/app/lib/` benutzen, nicht neu schreiben
- Namen und Kommentare auf Deutsch, wie im übrigen Code
- Prüfen: im Ordner `nuxt/` `npm run dev`, dann die Prüffälle in der Konsole des Browsers