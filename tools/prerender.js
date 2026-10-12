/* ==========================================================
   Előre beírja az index.html-be a kollekciót,
   a nyitvatartást és a virágrajzokat, hogy JavaScript nélkül
   (pl. telefonos fájlelőnézetben, keresőknél) is látszódjanak.
   A böngészőben a script.js ezeket úgyis frissen újrarajzolja.

   Futtatás az árak / adatok módosítása után:  node tools/prerender.js
   ========================================================== */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..", "public");
const htmlPath = path.join(root, "index.html");
const src = fs.readFileSync(path.join(root, "script.js"), "utf8");

const sandbox = { console, window: { __PRERENDER__: true, matchMedia: () => ({ matches: false }) } };
vm.createContext(sandbox);
vm.runInContext(src + "\n;globalThis.__api = { bloomSlotHTML, categoriesHTML, hoursHTML, SHOP };", sandbox);
const api = sandbox.__api;

let html = fs.readFileSync(htmlPath, "utf8");
const mark = (inner) => `<!--pr-->${inner}<!--/pr-->`;
const strip = /(<!--pr-->[\s\S]*?<!--\/pr-->)?/.source;

// Virágok a data-bloom elemekben
html = html.replace(
  new RegExp(`(<div[^>]*data-bloom="(\\w+)"[^>]*data-palette="(\\w+)"[^>]*data-seed="(\\d+)"[^>]*>)${strip}(</div>)`, "g"),
  (m, open, type, pal, seed, old, close) => open + mark(api.bloomSlotHTML(type, pal, Number(seed))) + close,
);

// Tárolók, amelyeket a script tölt fel
const fill = (idAttr, tag, content) => {
  const re = new RegExp(`(<${tag}[^>]*${idAttr}[^>]*>)${strip}(</${tag}>)`);
  if (!re.test(html)) throw new Error("Nem található: " + idAttr);
  html = html.replace(re, (m, open, old, close) => open + mark(content) + close);
};
fill('id="products"', "div", api.categoriesHTML());
fill('id="hours"', "ul", api.hoursHTML());

// Elérhetőségek: telefonszám, hívás-linkek, cím, évszám
const { SHOP } = api;
if (SHOP.phone) {
  const tel = "tel:" + SHOP.phone.replace(/[^\d+]/g, "");
  html = html.replace(/(<a\b[^>]*\bdata-phone-link\b[^>]*\bhref=")[^"]*(")/g, `$1${tel}$2`);
  const shown = SHOP.phone.replace(/ /g, "\u00a0"); // nem törhető szóköz
  html = html.replace(/(<(\w+)\b[^>]*\bdata-phone-text(?:-plain)?\b[^>]*>)[^<]*(<\/\2>)/g, `$1${shown}$3`);
}
html = html.replace(/(<(\w+)\b[^>]*\bdata-address\b[^>]*>)[^<]*(<\/\2>)/g, `$1${SHOP.address}$3`);
if (SHOP.email) {
  html = html.replace(/(<a\b[^>]*\bdata-email-link\b[^>]*\bhref=")[^"]*("[^>]*>)[^<]*(<\/a>)/, `$1mailto:${SHOP.email}$2${SHOP.email}$3`)
             .replace(/(<div\b[^>]*\bdata-email-row\b[^>]*?) hidden>/, "$1>");
}
html = html.replace(/(<span data-year>)[^<]*(<\/span>)/g, `$1${new Date().getFullYear()}$2`);

// Verziószám a CSS/JS hivatkozásokban: ha a fájl változik, a böngésző biztosan az újat tölti le
const crypto = require("crypto");
for (const file of ["styles.css", "script.js"]) {
  const v = crypto.createHash("sha1").update(fs.readFileSync(path.join(root, file))).digest("hex").slice(0, 8);
  html = html.replace(new RegExp(`((?:href|src)="${file.replace(".", "\\.")})(\\?v=[0-9a-f]+)?"`, "g"), `$1?v=${v}"`);
}

fs.writeFileSync(htmlPath, html);
console.log("Kész: index.html frissítve (" + Math.round(html.length / 1024) + " KB)");
