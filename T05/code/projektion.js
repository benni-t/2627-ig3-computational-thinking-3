// T5, Schritt 1 — die Projektion als eigenes Modul.
// Nur reine Funktionen: Sie rechnen mit ihren Parametern und ändern nichts.
// Darum läuft dieses Modul auch in Node, ohne Browser.

export function lonZuX(lon, breite, ausschnitt) {
  return ((lon - ausschnitt.west) / (ausschnitt.ost - ausschnitt.west)) * breite;
}

// nord - lat, weil y auf dem Bildschirm nach unten wächst.
export function latZuY(lat, hoehe, ausschnitt) {
  return ((ausschnitt.nord - lat) / (ausschnitt.nord - ausschnitt.sued)) * hoehe;
}

// faktor > 1 zoomt hinein. Jeder Rand rückt um den Faktor an den Punkt heran,
// der Punkt selbst bleibt an seiner Stelle.
export function zoomeAusschnitt(ausschnitt, punkt, faktor) {
  return {
    west: punkt.lon - (punkt.lon - ausschnitt.west) / faktor,
    ost: punkt.lon + (ausschnitt.ost - punkt.lon) / faktor,
    nord: punkt.lat + (ausschnitt.nord - punkt.lat) / faktor,
    sued: punkt.lat - (punkt.lat - ausschnitt.sued) / faktor,
  };
}
