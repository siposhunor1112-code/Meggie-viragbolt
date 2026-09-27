# Meggie Virágbolt – weboldal

Statikus, egyoldalas weboldal a Blaha Lujza téri aluljáróban található Meggie Virágboltnak.
Nincs szükség build lépésre: a `public/` mappa bármilyen statikus tárhelyen kiszolgálható. Élesben a Cloudflare Workers tölti ki a `main` ágról, minden feltöltés után automatikusan.

## Fájlok

- `public/` – maga a weboldal (ez kerül ki a netre):
  - `index.html` – az oldal szerkezete és szövegei
  - `styles.css` – megjelenés (színek a `:root` változókban)
  - `script.js` – elérhetőség, nyitvatartás, termékek és árlista
  - `assets/` – ikonok és a bolt fotója
  - `robots.txt` – a keresőknek
- `wrangler.jsonc` – Cloudflare-beállítás (a `public/` mappát teszi ki)
- `tools/prerender.js` – beírja az adatokat a `public/index.html`-be (lásd lent)

## Megjelenés

- Betűtípusok: Bodoni Moda (címek) és Jost (szöveg), saját tárhelyről: `public/assets/fonts/` (SIL Open Font License)
- Színek: egyetlen meggy-színcsalád (bor, meggypiros, rózsa, púder) – a `public/styles.css` elején, a `:root` részben
- A virágképek kódból készülnek (`makeBloom` a `public/script.js`-ben); típusok: `peony`, `rose`, `anemone`, `bud`, `leaf`, színek: a `PALETTES` objektumban

## Tartalom szerkesztése

A `public/script.js` elején található objektumok módosításával frissíthetők az adatok:

- `SHOP.phone`, `SHOP.email` – telefonszám és e-mail (ha `null`, az oldal nem mutatja)
- `SHOP.hours` – nyitvatartás napokra bontva; az oldal ez alapján jelzi élőben, hogy a bolt nyitva van-e (budapesti idő szerint)
- `PRODUCTS` – a Kollekció kártyái (név, leírás, ár, kategória, virágrajz típusa és színe)
- `PRICELIST` – az Árlista szekció tételei

> Az árak jelenleg **tájékoztató mintaértékek** – élesítés előtt egyeztesd a bolttal.

### Adatmódosítás után (ajánlott)

Az árlista, a kollekció, a nyitvatartás és az elérhetőségek az `index.html`-be is be vannak írva,
hogy JavaScript nélkül (pl. telefonos fájlelőnézetben vagy keresőknél) is látszódjanak.
A `public/script.js` módosítása után frissítsd ezt a beírt változatot is:

```sh
node tools/prerender.js
```

(Ha kimarad, a böngészőben akkor is a friss adatok jelennek meg, csak JavaScript nélkül a régiek.)

## Helyi megtekintés

```sh
python3 -m http.server 8000 -d public
# majd: http://localhost:8000
```
