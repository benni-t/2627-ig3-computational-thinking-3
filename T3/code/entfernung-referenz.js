const ERDRADIUS_KM = 6371;

function gradZuBogenmass(grad) {
  return (grad * Math.PI) / 180;
}

function entfernung(a, b) {
  const dLat = gradZuBogenmass(b.lat - a.lat);
  const dLon = gradZuBogenmass(b.lon - a.lon);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(gradZuBogenmass(a.lat)) *
      Math.cos(gradZuBogenmass(b.lat)) *
      Math.sin(dLon / 2) ** 2;
  return 2 * ERDRADIUS_KM * Math.asin(Math.sqrt(h));
}

const gmuend = { name: "Schwäbisch Gmünd", lat: 48.8, lon: 9.79 };
const stuttgart = { name: "Stuttgart", lat: 48.7758, lon: 9.1829 };
const kapstadt = { name: "Kapstadt", lat: -33.92, lon: 18.42 };
const nullpunkt = { name: "Nullpunkt", lat: 0, lon: 0 };
const einbreitengrad = { name: "Ein Breitengrad", lat: 1, lon: 0 };
const einlaengengrad = { name: "Ein Längengrad Äquator", lat: 0, lon: 1 };
const einlaengengradgmuend = { name: "Ein Längengrad Äquator", lat: 48.8, lon: 10.79 };

console.log(entfernung(gmuend, stuttgart))
console.log(entfernung(stuttgart, gmuend))
console.log(entfernung(gmuend, gmuend))
console.log(entfernung(nullpunkt, einbreitengrad))
console.log(entfernung(nullpunkt, einlaengengrad))
console.log(entfernung(gmuend, einlaengengradgmuend))