/* ==========================================================
   Meggie Virágbolt – tartalom és működés
   Az alábbi SHOP és PRODUCTS objektumok szerkesztésével
   frissíthetők az elérhetőségek, a nyitvatartás és a kollekció.
   ========================================================== */

const SHOP = {
  // Ha phone/email null, a weboldal nem mutatja.
  phone: "+36 1 211 4035",
  email: null,            // pl. "hello@meggieviragbolt.hu"
  address: "1085 Budapest, Blaha Lujza tér 1–3. (metró aluljáró)",
  // Nyitvatartás: 0 = vasárnap … 6 = szombat. null = zárva.
  hours: {
    1: ["08:00", "20:00"],
    2: ["08:00", "20:00"],
    3: ["08:00", "20:00"],
    4: ["08:00", "20:00"],
    5: ["08:00", "20:00"],
    6: ["08:00", "19:00"],
    0: ["09:00", "17:00"],
  },
};

const DAY_NAMES = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];

// A Kollekció kártyái. bloom: peony | rose | anemone | bud; palette: lásd PALETTES
// A "price" csak a sorrendet adja (olcsóbbtól a drágábbig), az oldalon nem jelenik meg.
const PRODUCTS = [
  { cat: "csokor",  bloom: "peony",   palette: "blush",   seed: 2,  title: "Bazsarózsa álom",       desc: "Szezonális bazsarózsák eukaliptusszal, laza, kerti stílusban kötve.", from: true,  price: 14900, unit: "csokor" },
  { cat: "csokor",  bloom: "rose",    palette: "cherry",  seed: 8,  title: "Klasszikus rózsacsokor", desc: "11 szál prémium rózsa zölddel, elegáns csomagolásban.",               from: false, price: 12900, unit: "csokor" },
  { cat: "csokor",  bloom: "anemone", palette: "apricot", seed: 5,  title: "Tavaszi tulipán",       desc: "Színes tulipánok friss zölddel – egyszerű, vidám, mindig talál.",     from: true,  price: 6900,  unit: "csokor" },
  { cat: "csokor",  bloom: "peony",   palette: "cream",   seed: 13, title: "Meggie válogatás",      desc: "A nap legszebb virágaiból, a kötő szabad kezével – minden darab egyedi.", from: true, price: 8900, unit: "csokor" },
  { cat: "szalas",  bloom: "rose",    palette: "blush",   seed: 3,  title: "Rózsa",                 desc: "Vörös, fehér, rózsaszín és különleges színekben, szálanként.",        from: true,  price: 1200,  unit: "szál" },
  { cat: "szalas",  bloom: "bud",     palette: "apricot", seed: 6,  title: "Tulipán",               desc: "Szezonban, sokféle színben – tíz szálas kötegben kedvezőbb.",         from: true,  price: 590,   unit: "szál" },
  { cat: "szalas",  bloom: "anemone", palette: "ivory",   seed: 9,  title: "Liliom",                desc: "Illatos, nagy virágú liliom – önmagában is látványos.",               from: true,  price: 1900,  unit: "szál" },
  { cat: "noveny",  bloom: "anemone", palette: "lilac",   seed: 4,  title: "Orchidea",              desc: "Lepkeorchidea kaspóban, egy- vagy kétágú kivitelben.",                from: true,  price: 6490,  unit: "cserép" },
  { cat: "noveny",  bloom: "leaf",    palette: "sage",    seed: 12, title: "Zöldnövények",          desc: "Könnyen gondozható szobanövények irodába és otthonra.",               from: true,  price: 3490,  unit: "cserép" },
  { cat: "alkalmi", bloom: "peony",   palette: "cherry",  seed: 7,  title: "Virágdoboz",            desc: "Díszdobozba rendezett virágok – ajándéknak a legelegánsabb választás.", from: true, price: 16900, unit: "doboz" },
  { cat: "alkalmi", bloom: "anemone", palette: "ivory",   seed: 17, title: "Koszorú",               desc: "Gyászkoszorú élő virágból, méltó és visszafogott kivitelben.",        from: true,  price: 14900, unit: "db" },
  { cat: "alkalmi", bloom: "rose",    palette: "cream",   seed: 10, title: "Menyasszonyi csokor",   desc: "Az esküvő stílusához tervezve, személyes egyeztetés alapján.",        from: true,  price: 24900, unit: "db" },
];

const CARD_TINTS = ["#efd2c9", "#f1ddd2", "#ecd0cf", "#f3e0d6"];

const CATEGORY_LABEL = { csokor: "Csokor", szalas: "Szálas", noveny: "Cserepes", alkalmi: "Alkalmi" };

/* ---------- Segédfüggvények ---------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const toMinutes = (hhmm) => { const [h, m] = hhmm.split(":").map(Number); return h * 60 + m; };
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ==========================================================
   Festményszerű virágok – kódból generált SVG
   ========================================================== */
const PALETTES = {
  //        legvilágosabb → legsötétebb, közép
  blush:   { c: ["#fbece7", "#f2cbc2", "#dc9c96", "#a9565f"], mid: "#6d1a28" },
  cherry:  { c: ["#eeb2b5", "#c9586a", "#93263a", "#5a101e"], mid: "#2a070e" },
  cream:   { c: ["#fffaf1", "#f3e4c9", "#dcc096", "#a88453"], mid: "#6b5330" },
  apricot: { c: ["#fdeadb", "#f6c7a4", "#e79c78", "#b5634a"], mid: "#5e2518" },
  ivory:   { c: ["#fdfbf6", "#eee8dd", "#d2c9b9", "#9f9585"], mid: "#1c1b19" },
  lilac:   { c: ["#f4ebf5", "#dfcae3", "#b898c2", "#77568b"], mid: "#3a2346" },
  sage:    { c: ["#d4dccd", "#a5b39e", "#74866d", "#465641"], mid: "#2f3a2b" },
};

function rng(seed) {
  let a = seed * 9301 + 49297;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Felfelé mutató szirom, enyhén bemetszett heggyel
function petalPath(L, W) {
  const f = (n) => n.toFixed(1);
  return `M0 0 C${f(W)} ${f(-.25 * L)} ${f(1.05 * W)} ${f(-.85 * L)} ${f(.45 * W)} ${f(-L)} Q0 ${f(-.9 * L)} ${f(-.45 * W)} ${f(-L)} C${f(-1.05 * W)} ${f(-.85 * L)} ${f(-W)} ${f(-.25 * L)} 0 0Z`;
}
function leafPath(L, W) {
  const f = (n) => n.toFixed(1);
  return `M0 0 C${f(W)} ${f(-.3 * L)} ${f(W * .6)} ${f(-.8 * L)} 0 ${f(-L)} C${f(-W * .6)} ${f(-.8 * L)} ${f(-W)} ${f(-.3 * L)} 0 0Z`;
}

let bloomUid = 0;
function makeBloom(type = "peony", paletteName = "blush", seed = 1) {
  const P = PALETTES[paletteName] || PALETTES.blush;
  const r = rng(seed);
  const id = "b" + (++bloomUid);
  const [c0, c1, c2, c3] = P.c;
  const defs = [];
  const body = [];

  const grad = (gid, stops, radius) => {
    defs.push(`<radialGradient id="${id}${gid}" cx="0" cy="0" r="${radius}" gradientUnits="userSpaceOnUse">${
      stops.map(([o, c, op = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${op}"/>`).join("")}</radialGradient>`);
    return `url(#${id}${gid})`;
  };

  const ring = (n, L, W, fill, opts = {}) => {
    const off = r() * 360;
    for (let i = 0; i < n; i++) {
      const a = off + (i * 360) / n + (r() - .5) * (opts.jitter ?? 14);
      const s = .9 + r() * .18;
      body.push(`<g transform="rotate(${a.toFixed(1)}) scale(${s.toFixed(2)})"><path d="${petalPath(L, W)}" fill="${fill}" stroke="${c3}" stroke-opacity=".22" stroke-width=".5"/><path d="M0 -4 L0 ${(-L * .62).toFixed(1)}" stroke="${c3}" stroke-opacity=".12" stroke-width=".6"/></g>`);
    }
  };

  if (type === "peony") {
    const rings = [[9, 94, 36], [8, 80, 33], [8, 65, 29], [7, 50, 24], [7, 36, 19], [6, 24, 14], [5, 14, 9]];
    rings.forEach(([n, L, W], k) => {
      const t = k / (rings.length - 1);
      ring(n, L, W, grad("p" + k, [[0, t > .6 ? P.mid : c3], [.45, t > .4 ? c3 : c2], [1, t > .5 ? c1 : c0]], L));
    });
  } else if (type === "rose") {
    const g = grad("r", [[0, P.mid], [.35, c3], [.75, c2], [1, c1]], 96);
    const g2 = grad("r2", [[0, c3], [.6, c1], [1, c0]], 96);
    const n = 26;
    for (let i = 0; i < n; i++) {
      const t = i / n;
      const L = 94 * Math.pow(1 - t, .75) + 6;
      const a = i * 137.5 + (r() - .5) * 10;
      body.push(`<g transform="rotate(${a.toFixed(1)})"><path d="${petalPath(L, L * .62)}" fill="${i < 8 ? g2 : g}" stroke="${c3}" stroke-opacity=".28" stroke-width=".5"/></g>`);
    }
  } else if (type === "anemone") {
    const g = grad("a", [[0, c3], [.3, c2], [.7, c1], [1, c0]], 96);
    const n = 6 + Math.floor(r() * 2);
    ring(n, 94, 58, g, { jitter: 10 });
    ring(n, 70, 44, grad("a2", [[0, c3], [.5, c1], [1, c0, .85]], 72), { jitter: 18 });
    body.push(`<circle r="19" fill="${P.mid}"/>`);
    for (let i = 0; i < 34; i++) {
      const a = r() * Math.PI * 2, d = 19 + r() * 10;
      body.push(`<circle cx="${(Math.cos(a) * d).toFixed(1)}" cy="${(Math.sin(a) * d).toFixed(1)}" r="${(1 + r() * 1.6).toFixed(1)}" fill="${P.mid}" opacity="${(.5 + r() * .5).toFixed(2)}"/>`);
    }
    body.push(`<circle r="7" fill="${c3}" opacity=".6"/>`);
  } else if (type === "bud") {
    const g = grad("u", [[0, P.mid], [.5, c3], [1, c1]], 80);
    [-24, 22, -8, 10, 0].forEach((a) => body.push(`<g transform="translate(0 50) rotate(${a + (r() - .5) * 6})"><path d="${petalPath(88, 26)}" fill="${g}" stroke="${c3}" stroke-opacity=".25" stroke-width=".5"/></g>`));
    const s = PALETTES.sage.c;
    [-50, 50].forEach((a) => body.push(`<g transform="translate(0 52) rotate(${a})"><path d="${leafPath(42, 12)}" fill="${s[2]}"/></g>`));
  } else if (type === "leaf") {
    const s = PALETTES.sage.c;
    const g = `<linearGradient id="${id}l" x1="0" y1="0" x2="0" y2="-1" gradientUnits="objectBoundingBox"><stop offset="0" stop-color="${s[3]}"/><stop offset="1" stop-color="${s[1]}"/></linearGradient>`;
    defs.push(g);
    body.push(`<path d="M-10 96 C0 40 10 -20 40 -90" fill="none" stroke="${s[3]}" stroke-width="1.6"/>`);
    for (let i = 0; i < 7; i++) {
      const t = i / 7;
      const x = -10 + 50 * Math.pow(t, 1.3), y = 96 - 186 * t;
      const side = i % 2 ? 1 : -1;
      const L = 58 - t * 28;
      body.push(`<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${side * (55 + r() * 15)})"><path d="${leafPath(L, L * .34)}" fill="url(#${id}l)" opacity="${(.85 + r() * .15).toFixed(2)}"/></g>`);
    }
  }

  const soft = type === "leaf" ? "" : ` filter="url(#${id}f)"`;
  defs.push(`<filter id="${id}f" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="2" seed="${seed}"/><feDisplacementMap in="SourceGraphic" scale="5"/><feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#000" flood-opacity=".22"/></filter>`);
  const fit = type === "bud" ? ` transform="scale(1.45) translate(0 -6)"` : "";
  return `<svg viewBox="-110 -110 220 220" aria-hidden="true" focusable="false"><defs>${defs.join("")}</defs><g${fit}><g${soft}>${body.join("")}</g></g></svg>`;
}

function bloomSlotHTML(type, palette, seed) {
  const spinCls = type === "leaf" || type === "bud" ? "" : ` spin${seed % 2 ? " rev" : ""}`;
  return `<div class="bloom-wrap${spinCls}" style="width:100%;height:100%">${makeBloom(type, palette, seed || 1)}</div>`;
}

function renderBloomSlots() {
  $$("[data-bloom]").forEach((el) => {
    el.innerHTML = bloomSlotHTML(el.dataset.bloom, el.dataset.palette, Number(el.dataset.seed));
  });
}

/* ---------- Kollekció ---------- */
function productsHTML(filter = "all") {
  const list = PRODUCTS
    .filter((p) => filter === "all" || p.cat === filter)
    .sort((a, b) => a.price - b.price);
  return list.map((p, i) => {
    // Minden kártya ugyanabból a meleg púder-rózsa családból kap hátteret
    const bg = CARD_TINTS[i % CARD_TINTS.length];
    return `
    <article class="card" style="animation-delay:${i * 70}ms">
      <div class="card__art" style="background:radial-gradient(90% 70% at 50% 42%, #fcf5f1, ${bg} 120%)">
        <span class="card__cat">${CATEGORY_LABEL[p.cat]}</span>
        <span class="card__idx">${String(i + 1).padStart(2, "0")}</span>
        <div class="bloom-wrap">${makeBloom(p.bloom, p.palette, p.seed)}</div>
      </div>
      <div class="card__body">
        <h3 class="card__title">${p.title}</h3>
        <p class="card__desc">${p.desc}</p>
      </div>
    </article>`;
  }).join("");
}

function renderProducts(filter = "all") {
  const rail = $("#products");
  rail.innerHTML = productsHTML(filter);
  rail.scrollLeft = 0;
}

function initCollection() {
  $$(".tabs button").forEach((b) => b.addEventListener("click", () => {
    $$(".tabs button").forEach((x) => { x.classList.remove("is-active"); x.setAttribute("aria-pressed", "false"); });
    b.classList.add("is-active"); b.setAttribute("aria-pressed", "true");
    renderProducts(b.dataset.filter);
  }));

  const rail = $("#products");
  // Egy kártya szélessége + a tényleges rés (a rés a képernyőmérettől függ)
  const cardStep = () => {
    const card = $(".card", rail);
    const gap = parseFloat(getComputedStyle(rail).columnGap) || 0;
    return card ? card.getBoundingClientRect().width + gap : 320;
  };
  $$("[data-rail]").forEach((b) => b.addEventListener("click", () => {
    rail.scrollBy({ left: cardStep() * Number(b.dataset.rail), behavior: "smooth" });
  }));

  // Húzással görgetés egérrel
  let down = false, startX = 0, startLeft = 0, moved = false;
  rail.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "mouse") return;
    down = true; moved = false; startX = e.clientX; startLeft = rail.scrollLeft;
  });
  window.addEventListener("pointermove", (e) => {
    if (!down) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 4) { moved = true; rail.classList.add("is-drag"); }
    rail.scrollLeft = startLeft - dx;
  });
  window.addEventListener("pointerup", () => {
    if (!down) return;
    down = false; rail.classList.remove("is-drag");
    if (moved) {
      const w = cardStep();
      rail.scrollTo({ left: Math.round(rail.scrollLeft / w) * w, behavior: "smooth" });
    }
  });
}

/* ---------- Alkalmak: egeret követő virág ---------- */
function initCursorBloom() {
  const el = $(".cursor-bloom");
  if (!el || reduceMotion || !window.matchMedia("(hover: hover)").matches) return;
  const cache = {};
  let x = 0, y = 0, cx = 0, cy = 0, raf = null;
  const loop = () => {
    cx += (x - cx) * .14; cy += (y - cy) * .14;
    el.style.left = cx + "px"; el.style.top = cy + "px";
    raf = Math.abs(x - cx) + Math.abs(y - cy) > .5 ? requestAnimationFrame(loop) : null;
  };
  $$(".occ").forEach((row, i) => {
    row.addEventListener("mouseenter", (e) => {
      const key = row.dataset.bloomPreview + row.dataset.palette;
      if (!cache[key]) cache[key] = makeBloom(row.dataset.bloomPreview, row.dataset.palette, 30 + i);
      el.innerHTML = `<div class="bloom-wrap spin" style="width:100%;height:100%">${cache[key]}</div>`;
      if (!el.classList.contains("is-on")) { cx = x = e.clientX; cy = y = e.clientY; }
      el.classList.add("is-on");
    });
    row.addEventListener("mouseleave", () => el.classList.remove("is-on"));
    row.addEventListener("mousemove", (e) => { x = e.clientX; y = e.clientY; if (!raf) raf = requestAnimationFrame(loop); });
  });
}

/* ---------- Nyitvatartás ---------- */
// Aktuális idő budapesti időzónában, a látogató helyétől függetlenül
function budapestNow() {
  try {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Budapest", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false,
    }).formatToParts(new Date());
    const get = (t) => parts.find((p) => p.type === t).value;
    const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
    const minutes = (Number(get("hour")) % 24) * 60 + Number(get("minute"));
    if (day < 0 || Number.isNaN(minutes)) throw new Error("hiányos időzóna-adat");
    return { day, minutes };
  } catch (err) {
    // Tartalék: ha a böngésző nem ismeri az időzónát, kézzel számolunk
    // (CET, nyári időszámítás március utolsó vasárnapjától október utolsó vasárnapjáig)
    const now = new Date();
    const y = now.getUTCFullYear();
    const lastSunday = (month) => { const d = new Date(Date.UTC(y, month + 1, 0, 1)); d.setUTCDate(d.getUTCDate() - d.getUTCDay()); return d; };
    const summer = now >= lastSunday(2) && now < lastSunday(9);
    const t = new Date(now.getTime() + (summer ? 2 : 1) * 3600e3);
    return { day: t.getUTCDay(), minutes: t.getUTCHours() * 60 + t.getUTCMinutes() };
  }
}

function hoursHTML(today = -1) {
  return [1, 2, 3, 4, 5, 6, 0].map((d) => {
    const h = SHOP.hours[d];
    return `<li class="${d === today ? "is-today" : ""}"><span>${DAY_NAMES[d]}</span><span>${h ? `${h[0]} – ${h[1]}` : "Zárva"}</span></li>`;
  }).join("");
}

function renderHours() {
  $("#hours").innerHTML = hoursHTML(budapestNow().day);
}

function openStatus() {
  const { day, minutes } = budapestNow();
  const today = SHOP.hours[day];
  if (today && minutes >= toMinutes(today[0]) && minutes < toMinutes(today[1])) {
    return { open: true, text: `Most nyitva · ma ${today[1]}-ig` };
  }
  if (today && minutes < toMinutes(today[0])) {
    return { open: false, text: `Most zárva · ma ${today[0]}-kor nyitunk` };
  }
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    if (SHOP.hours[d]) {
      const when = i === 1 ? "holnap" : DAY_NAMES[d].toLowerCase();
      return { open: false, text: `Most zárva · ${when} ${SHOP.hours[d][0]}-kor nyitunk` };
    }
  }
  return { open: false, text: "Most zárva" };
}

function updateStatus() {
  renderHours();
  const s = openStatus();
  $$("[data-open-dot]").forEach((d) => { d.classList.toggle("is-open", s.open); d.classList.toggle("is-closed", !s.open); });
  $$("[data-open-text]").forEach((t) => (t.textContent = s.text));
  const today = SHOP.hours[budapestNow().day];
  $$("[data-today-hours]").forEach((t) => (t.textContent = today ? `${today[0]} – ${today[1]}` : "Ma zárva"));
}

/* ---------- Elérhetőségek ---------- */
function renderContact() {
  $$("[data-address]").forEach((el) => (el.textContent = SHOP.address));
  if (SHOP.phone) {
    const tel = "tel:" + SHOP.phone.replace(/[^\d+]/g, "");
    $$("[data-phone-link]").forEach((a) => (a.href = tel));
    const shown = SHOP.phone.replace(/ /g, "\u00a0"); // nem törhető szóköz: a szám nem esik két sorba
    $$("[data-phone-text]").forEach((a) => (a.textContent = shown));
    $$("[data-phone-text-plain]").forEach((a) => (a.textContent = shown));
  } else {
    $$("[data-phone-text], .ccard--wine, .actionbar [data-phone-link]").forEach((a) => a.remove());
    $$(".actionbar").forEach((bar) => (bar.style.gridTemplateColumns = "1fr"));
  }
  $$("[data-email-link]").forEach((a) => {
    const row = a.closest("[data-email-row]");
    if (SHOP.email) { a.href = "mailto:" + SHOP.email; a.textContent = SHOP.email; if (row) row.hidden = false; }
    else if (row) row.remove();
  });
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
}

/* ---------- A bolt fotója: ha nem tölthető be, rajzolt virág kerül a helyére ---------- */
function initStorePhoto() {
  const img = $(".store__photo img");
  if (!img) return;
  const fail = () => { img.closest(".store__photo").classList.add("is-empty"); img.remove(); };
  if (img.complete && img.naturalWidth === 0 && img.currentSrc) fail();
  else img.addEventListener("error", fail, { once: true });
}

/* ---------- Térkép: csak kattintásra tölti be a Google Maps-et ---------- */
function initMap() {
  $$(".mapbox__load").forEach((btn) => btn.addEventListener("click", () => {
    const f = document.createElement("iframe");
    f.title = "Meggie Virágbolt helye a térképen – Blaha Lujza tér";
    f.src = btn.dataset.mapSrc;
    f.referrerPolicy = "no-referrer-when-downgrade";
    btn.replaceWith(f);
  }));
}

/* ---------- Navigáció ---------- */
function initNav() {
  const nav = $(".nav");
  const toggle = $(".nav__toggle");
  const menu = $("#menu");
  const hero = $(".hero");
  // Érintőképernyőn a fejléc mindig látszik: a telefonos görgetés (lendület, visszapattanás,
  // címsor-átméreteződés) miatt az elrejtés ugrálna. Egérrel görgetve csak határozott mozdulatra rejtjük.
  // Néhány telefon (pl. egyes Samsungok) tévesen egeresnek vallja magát, ezért a keskeny kijelzőt és
  // bármilyen érintőképernyőt is telefonnak tekintünk. Elforgatáskor is újraértékelődik.
  const phoneLike = window.matchMedia("(hover: none), (pointer: coarse), (max-width: 900px)");
  const isPhoneLike = () => phoneLike.matches || navigator.maxTouchPoints > 0;
  const HIDE_AFTER = 80, SHOW_AFTER = 40;
  let lastY = window.scrollY, travel = 0;

  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const y = Math.min(Math.max(window.scrollY, 0), Math.max(max, 0)); // a visszapattanást figyelmen kívül hagyjuk
    const dy = y - lastY;
    lastY = y;
    if (!menu.hidden) return;
    // A sötét→világos váltásnál 60px „holtsáv”: apró rezgésre nem kapcsolgat oda-vissza
    const edge = hero.offsetHeight - 90;
    const pastHero = nav.classList.contains("is-solid") ? y > edge - 60 : y > edge;
    nav.classList.toggle("is-solid", pastHero);
    if (isPhoneLike() || !pastHero) { nav.classList.remove("is-hidden"); travel = 0; return; }
    // Irányváltáskor újraindul a számlálás; csak elég hosszú, egyirányú mozdulat vált
    travel = (dy > 0) === (travel > 0) ? travel + dy : dy;
    if (travel > HIDE_AFTER) nav.classList.add("is-hidden");
    else if (travel < -SHOW_AFTER) nav.classList.remove("is-hidden");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const setMenu = (open, restoreFocus = true) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Menü bezárása" : "Menü megnyitása");
    menu.hidden = !open;
    document.documentElement.classList.toggle("menu-open", open);
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      nav.classList.remove("is-solid", "is-hidden");
      const first = $("a", menu);
      if (first) first.focus({ preventScroll: true });
    } else {
      onScroll();
      if (restoreFocus) toggle.focus({ preventScroll: true });
    }
  };
  toggle.addEventListener("click", () => setMenu(menu.hidden));
  $$("a", menu).forEach((a) => a.addEventListener("click", () => setMenu(false, false)));
  document.addEventListener("keydown", (e) => {
    if (menu.hidden) return;
    if (e.key === "Escape") setMenu(false);
    // Tab-billentyű a nyitott menün belül marad
    if (e.key === "Tab") {
      const items = [toggle, ...$$("a", menu)];
      const i = items.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); items[items.length - 1].focus(); }
      else if (!e.shiftKey && i === items.length - 1) { e.preventDefault(); items[0].focus(); }
    }
  });
  // Ha a képernyő kiszélesedik (pl. tablet elforgatása), a mobilmenü bezárul
  const wide = window.matchMedia("(min-width: 901px)");
  const onWide = (e) => { if (e.matches && !menu.hidden) setMenu(false, false); };
  if (wide.addEventListener) wide.addEventListener("change", onWide); else if (wide.addListener) wide.addListener(onWide);

  // Aktív menüpont kiemelése görgetéskor
  const links = $$(".nav__links a");
  const spy = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) links.forEach((a) => a.classList.toggle("is-current", a.getAttribute("href") === "#" + e.target.id));
  }), { rootMargin: "-45% 0px -50% 0px" });
  links.map((a) => $(a.getAttribute("href"))).filter(Boolean).forEach((s) => spy.observe(s));
}

/* ---------- Hero parallaxis ---------- */
function initParallax() {
  // Telefonon/tableten kikapcsolva: simább görgetés, kevesebb akkumulátor
  if (reduceMotion || navigator.maxTouchPoints > 0 || window.matchMedia("(hover: none), (pointer: coarse), (max-width: 900px)").matches) return;
  const slots = $$(".hero .bloom-slot");
  const depth = [.35, .6, .2, .8, .5, .45, .25];
  let ticking = false;
  const apply = () => {
    const y = window.scrollY;
    if (y < window.innerHeight * 1.2) {
      slots.forEach((s, i) => (s.style.transform = `translate3d(0, ${(-y * depth[i % depth.length]).toFixed(1)}px, 0)${s.classList.contains("b7") ? " scaleX(-1)" : ""}`));
    }
    ticking = false;
  };
  window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(apply); } }, { passive: true });
}

/* ---------- Megjelenési animációk ---------- */
function initReveal() {
  $$(".hero [data-anim]").forEach((el, i) => (el.style.transitionDelay = `${200 + i * 140}ms`));
  requestAnimationFrame(() => requestAnimationFrame(() => document.documentElement.classList.add("is-loaded")));

  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
  }), { threshold: .12, rootMargin: "0px 0px -60px 0px" });
  $$(".reveal, .store__photo").forEach((el, i) => {
    el.style.transitionDelay = `${(i % 3) * 90}ms`;
    io.observe(el);
  });
}

/* ---------- Indítás ---------- */
// (A tools/prerender.js ezt a fájlt böngésző nélkül is betölti, akkor az indítás kimarad.)
if (typeof document !== "undefined" && !window.__PRERENDER__) {
  // Minden rész külön indul: ha egy hibázna (pl. régi böngészőben), a többi és a szöveg akkor is megjelenik
  const safely = (fn) => { try { fn(); } catch (err) { console.error(err); } };
  document.documentElement.classList.remove("no-js");
  [renderBloomSlots, renderProducts, renderContact, updateStatus,
   initCollection, initCursorBloom, initStorePhoto, initMap, initNav, initParallax, initReveal].forEach(safely);
  setInterval(() => safely(updateStatus), 60 * 1000);
  document.addEventListener("visibilitychange", () => { if (!document.hidden) safely(updateStatus); });
  // Végső biztosíték: a beúszó elemek semmiképp ne maradjanak láthatatlanok
  setTimeout(() => {
    document.documentElement.classList.add("is-loaded");
    if (!("IntersectionObserver" in window)) $$(".reveal, .store__photo").forEach((el) => el.classList.add("is-in"));
  }, 2500);
}
