// T5, nach Aufgabe 2 — unter der Karte eine Liste, der nächste Ort zuerst.
// Neu: <ol id="liste"> in index.html. zeichnen() schreibt die Liste jedes Mal neu.

import { lonZuX, latZuY, zoomeAusschnitt } from "./projektion.js";
import { entfernung, orteImUmkreis, nachEntfernung } from "./entfernung.js";

const AUSSCHNITT = { west: -180, ost: 180, nord: 90, sued: -90 };
const ZOOMPUNKT = { lat: 48.8, lon: 9.79 }; // Schwäbisch Gmünd

// Prüffälle, Ergebnis vorher bekannt. Stehen lassen, sie kosten nichts.
const gmuend = { lat: 48.8, lon: 9.79 };
const stuttgart = { lat: 48.7758, lon: 9.1829 };
console.log("Gmünd → Stuttgart:", entfernung(gmuend, stuttgart).toFixed(1), "km, erwartet 44.6");

const response = await fetch("orte.json");
const orte = await response.json();

console.log("Radius 0:", orteImUmkreis(orte, ZOOMPUNKT, 0).map((ort) => ort.name), "erwartet nur Gmünd");
console.log("Radius 50:", orteImUmkreis(orte, ZOOMPUNKT, 50).map((ort) => ort.name), "erwartet Gmünd, Stuttgart");
console.log("Reihenfolge:", nachEntfernung(orte, ZOOMPUNKT).map((ort) => ort.id).join(", "));
console.log("orte unverändert:", orte.map((ort) => ort.id).join(", "));

const sliderBreite = document.querySelector("#breite");
const sliderZoom = document.querySelector("#zoom");
const sliderRadius = document.querySelector("#radius");
const radiusWert = document.querySelector("#radiusWert");
const karte = document.querySelector("#karte");
const liste = document.querySelector("#liste");

function zeichnen() {
  const breite = Number(sliderBreite.value);
  const hoehe = breite / 2;
  const faktor = 2 ** Number(sliderZoom.value); // 0 → 1×, 1 → 2×, 7 → 128×
  const ausschnitt = zoomeAusschnitt(AUSSCHNITT, ZOOMPUNKT, faktor);
  const radius = Number(sliderRadius.value);
  const imUmkreis = orteImUmkreis(orte, ZOOMPUNKT, radius);
  const orteNachEntfernung = nachEntfernung(imUmkreis, ZOOMPUNKT);

  console.log(orteNachEntfernung);

  radiusWert.textContent = radius + " km";

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${breite}" height="${hoehe}">
  <rect width="${breite}" height="${hoehe}" fill="#f4f1ea" stroke="#222"/>`;

  for (const ort of imUmkreis) {
    const x = lonZuX(ort.lon, breite, ausschnitt);
    const y = latZuY(ort.lat, hoehe, ausschnitt);
    svg += `
  <circle cx="${x}" cy="${y}" r="4" fill="${ort.farbe}"/>
  <text x="${x + 8}" y="${y + 4}" font-family="sans-serif" font-size="11">${ort.name}</text>`;
  }

  svg += `
</svg>`;

  karte.innerHTML = svg;

  // Wie beim SVG: Text sammeln, dann einmal ins DOM schreiben.
  let listenElemente = "";
  for (const ort of orteNachEntfernung) {
    listenElemente += `<li>${ort.name} – ${ort.km.toFixed(1)} km</li>`;
  }

  liste.innerHTML = listenElemente;
}

sliderBreite.addEventListener("input", zeichnen);
sliderZoom.addEventListener("input", zeichnen);
sliderRadius.addEventListener("input", zeichnen);

zeichnen();
