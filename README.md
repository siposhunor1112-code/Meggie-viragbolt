# Meggie Virágbolt – weboldal

Statikus, egyoldalas weboldal a Blaha Lujza téri aluljáróban található Meggie Virágboltnak.
Nincs szükség build lépésre: az `index.html` bármilyen tárhelyen (GitHub Pages, Netlify, Vercel) közvetlenül kiszolgálható.

## Fájlok

- `index.html` – az oldal szerkezete és szövegei
- `styles.css` – megjelenés (színek a `:root` változókban)
- `script.js` – elérhetőség, nyitvatartás, termékek és árlista
- `assets/favicon.svg` – ikon

## Tartalom szerkesztése

A `script.js` elején található objektumok módosításával frissíthetők az adatok:

- `SHOP.phone`, `SHOP.email` – telefonszám és e-mail (ha `null`, az oldal nem mutatja)
- `SHOP.hours` – nyitvatartás napokra bontva; az oldal ez alapján jelzi élőben, hogy a bolt nyitva van-e (budapesti idő szerint)
- `PRODUCTS` – a Kínálat kártyái (név, leírás, ár, kategória)
- `PRICELIST` – az Árlista szekció tételei

> A telefonszám, e-mail, nyitvatartás és az árak jelenleg **helykitöltő értékek** – élesítés előtt cseréld a valós adatokra.

## Helyi megtekintés

```sh
python3 -m http.server 8000
# majd: http://localhost:8000
```
