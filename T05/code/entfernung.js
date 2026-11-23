// T5, nach Aufgabe 2 — Orte nach Entfernung sortiert.
// Haversine-Formel: Entfernung zweier Orte auf einer Kugel, in km.
// a und b sind Orte, also Objekte mit lat und lon.

const ERDRADIUS_KM = 6371;

// Ohne export: bleibt in diesem Modul. karte.js sieht sie nicht.
function gradZuBogenmass(grad) {
  return (grad * Math.PI) / 180;
}

export function entfernung(a, b) {
  const dLat = gradZuBogenmass(b.lat - a.lat);
  const dLon = gradZuBogenmass(b.lon - a.lon);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(gradZuBogenmass(a.lat)) *
      Math.cos(gradZuBogenmass(b.lat)) *
      Math.sin(dLon / 2) ** 2;
  return 2 * ERDRADIUS_KM * Math.asin(Math.sqrt(h));
}

// Alle Orte, die höchstens radiusKm vom Zentrum entfernt sind.
// <= statt <: Bei Radius 0 bleibt das Zentrum selbst drin.
// filter gibt eine neue Liste zurück, orte bleibt, wie es ist.
export function orteImUmkreis(orte, zentrum, radiusKm) {
  return orte.filter((ort) => entfernung(zentrum, ort) <= radiusKm);
}

// Neue Liste, der nächste Ort zuerst. Jeder Ort bekommt ein Feld km.
// Erst map: neue Liste mit neuen Objekten. Dann sort auf dieser neuen Liste.
// So bleibt orte, wie es ist, und die Entfernung wird nur einmal pro Ort gerechnet.
export function nachEntfernung(orte, zentrum) {
  return orte
    // .map((ort) => ({ ...ort, km: entfernung(zentrum, ort) }))
    // .sort((a, b) => a.km - b.km);
    // .map((ort) => ({ ort, km: entfernung(zentrum, ort) }))
    // .sort((a, b) => a.km - b.km)
    // .map(({ ort }) => ort);
    .map((ort) => ({ ...ort, km: entfernung(zentrum, ort) }))
    .sort((a, b) => a.km - b.km);
}
