# Meggie Virágbolt – weboldal

Statikus, egyoldalas weboldal a Blaha Lujza téri aluljáróban található Meggie Virágboltnak.
Nincs szükség build lépésre: a `public/` mappa bármilyen statikus tárhelyen kiszolgálható. Élesben a Cloudflare Workers tölti ki a `main` ágról, minden feltöltés után automatikusan.
Éles cím: https://meggieviragbolt.com (a `www.` változat is működik).

## Fájlok

- `public/` – maga a weboldal (ez kerül ki a netre):
  - `index.html` – az oldal szerkezete és szövegei
  - `styles.css` – megjelenés (színek a `:root` változókban)
  - `script.js` – elérhetőség, nyitvatartás és a kollekció
  - `assets/` – ikonok és a bolt fotója
  - `assets/photos/` – a virágfotók (nyitókép, „A pultról” galéria, alkalmak), WebP formátumban
  - `robots.txt` – a keresőknek
  - `sitemap.xml` – oldaltérkép a Google-nek (Search Console-ba beküldhető)
  - `_headers` – biztonsági fejlécek (Cloudflare alkalmazza, nem jelenik meg az oldalon)
- `wrangler.jsonc` – Cloudflare-beállítás (a `public/` mappát teszi ki)
- `tools/prerender.js` – beírja az adatokat a `public/index.html`-be (lásd lent)

## Megjelenés

- Betűtípusok: Bodoni Moda (címek) és Jost (szöveg), saját tárhelyről: `public/assets/fonts/` (SIL Open Font License)
- Színek: meggy-színcsalád – sötét bor (a nyitókép, a menü, a kollekció és a lábléc háttere), mély bor (szöveg, gombok), rózsaszín és púder – a `public/styles.css` elején, a `:root` részekben
- Képek: valódi fotók a `public/assets/photos/` mappában. Új fotó cseréjekor tartsd meg a fájlnevet, vagy írd át az `index.html`-ben.
- Kódból rajzolt virág (`makeBloom` a `public/script.js`-ben) már csak a bolt fotójának tartalékaként jelenik meg; színek: a `PALETTES` objektumban

## Az oldal részei

1. Nyitókép – tulipánfotó, élő nyitvatartás-jelzés, Hívás és Útvonal gomb
2. Gyorsinfó – cím, nyitvatartás, megállók
3. Alkalmak, 4. Kollekció (lista kategóriánként)
5. A bolt – fotó, elérhetőség, heti nyitvatartás
6. Képek a pultról – fotógaléria az oldal végén

## Domain

A teljes webcím (`https://meggieviragbolt.com`) a `public/index.html` fejében (canonical, megosztási kép, cégadatok), a `public/robots.txt`-ben és a `public/sitemap.xml`-ben szerepel. Domainváltáskor mindhárom helyen cserélni kell.

## Tartalom szerkesztése

A `public/script.js` elején található objektumok módosításával frissíthetők az adatok:

- `SHOP.phone`, `SHOP.email` – telefonszám és e-mail (ha `null`, az oldal nem mutatja)
- `SHOP.social` – Facebook, Instagram és TikTok profil-link (ha `null`, nem jelenik meg); a bolt résznél, a láblécben és a mobilmenüben látszik, és a keresőknek szóló adatokba (`sameAs`) is bekerül
- `SHOP.hours` – nyitvatartás napokra bontva; az oldal ez alapján jelzi élőben, hogy a bolt nyitva van-e (budapesti idő szerint)
- `PRODUCTS` – a Kollekció listája (név, leírás, kategória); az árak nem jelennek meg az oldalon, a `price` mező csak a sorrendet adja a kategórián belül


### Adatmódosítás után (ajánlott)

A kollekció, a nyitvatartás és az elérhetőségek az `index.html`-be is be vannak írva,
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
