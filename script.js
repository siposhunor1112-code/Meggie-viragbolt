/* ==========================================================
   Meggie Virágbolt – tartalom és működés
   Az alábbi SHOP, PRODUCTS és PRICELIST objektumok szerkesztésével
   frissíthetők az elérhetőségek, a nyitvatartás és az árak.
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

// Kártyák a Kínálat szekcióban
const PRODUCTS = [
  { cat: "csokor",  icon: "peony",  bg: ["#f3dcd4", "#e7c2b9"], ink: "#8e3a4f", title: "Bazsarózsa álom",   desc: "Szezonális bazsarózsák eukaliptusszal, laza, kerti stílusban kötve.", from: true, price: 14900, unit: "csokor" },
  { cat: "csokor",  icon: "rose",   bg: ["#efe3d3", "#dcc8ab"], ink: "#7a5a2e", title: "Klasszikus rózsacsokor", desc: "11 szál prémium rózsa zölddel, elegáns csomagolásban.",               from: false, price: 12900, unit: "csokor" },
  { cat: "csokor",  icon: "tulip",  bg: ["#f7e6c9", "#eed2a0"], ink: "#9a6a1e", title: "Tavaszi tulipán",   desc: "Színes tulipánok friss zölddel – egyszerű, vidám, mindig talál.",   from: true, price: 6900,  unit: "csokor" },
  { cat: "csokor",  icon: "sprig",  bg: ["#dfe6d9", "#c3d0ba"], ink: "#3f5a45", title: "Meggie válogatás",  desc: "A nap legszebb virágaiból a kötő szabad kezével – minden darab egyedi.", from: true, price: 8900,  unit: "csokor" },
  { cat: "szalas",  icon: "rose",   bg: ["#f1d4d6", "#e2aeb4"], ink: "#8e3a4f", title: "Rózsa",             desc: "Vörös, fehér, rózsaszín és különleges színekben, szálanként.",    from: true, price: 1200,  unit: "szál" },
  { cat: "szalas",  icon: "tulip",  bg: ["#f5e0cf", "#ebc3a3"], ink: "#9a5a2e", title: "Tulipán",           desc: "Szezonban, sokféle színben – 10 szálas kötegben kedvezőbb.",       from: true, price: 590,   unit: "szál" },
  { cat: "szalas",  icon: "peony",  bg: ["#ecdfe6", "#d9c1cf"], ink: "#6e3f5c", title: "Liliom",            desc: "Illatos, nagy virágú liliom – önmagában is látványos.",             from: true, price: 1900,  unit: "szál" },
  { cat: "noveny",  icon: "orchid", bg: ["#ece3f0", "#d6c6df"], ink: "#5e3f73", title: "Orchidea",          desc: "Lepkeorchidea kaspóban, egy- vagy kétágú kivitelben.",             from: true, price: 6490,  unit: "cserép" },
  { cat: "noveny",  icon: "pot",    bg: ["#dde6dc", "#bfd0bd"], ink: "#355442", title: "Zöldnövények",      desc: "Könnyen gondozható szobanövények irodába és otthonra.",            from: true, price: 3490,  unit: "cserép" },
  { cat: "alkalmi", icon: "peony",  bg: ["#f4e2dc", "#e3bfb3"], ink: "#8e3a4f", title: "Virágdoboz",        desc: "Díszdobozba rendezett virágok – ajándéknak a legelegánsabb választás.", from: true, price: 16900, unit: "doboz" },
  { cat: "alkalmi", icon: "sprig",  bg: ["#e2e2da", "#c9cabb"], ink: "#454a3a", title: "Koszorú",           desc: "Gyászkoszorú élő virágból, méltó és visszafogott kivitelben.",     from: true, price: 14900, unit: "db" },
  { cat: "alkalmi", icon: "rose",   bg: ["#f6ece4", "#e9d6c5"], ink: "#7a5a2e", title: "Menyasszonyi csokor", desc: "Az esküvő stílusához tervezve, személyes egyeztetés alapján.",   from: true, price: 24900, unit: "db" },
];

const CATEGORY_LABEL = { csokor: "Csokor", szalas: "Szálas", noveny: "Cserepes", alkalmi: "Alkalmi" };

// Az Árlista szekció tételei
const PRICELIST = [
  { group: "Szálas virágok", items: [
    ["Rózsa (normál)", "1 200 Ft / szál"],
    ["Rózsa (prémium, hosszú szár)", "1 900 Ft / szál"],
    ["Tulipán", "590 Ft / szál"],
    ["Gerbera", "790 Ft / szál"],
    ["Liliom", "1 900 Ft / szál"],
    ["Szezonális virág", "490 Ft-tól"],
  ]},
  { group: "Csokrok", items: [
    ["Kis csokor", "5 900 Ft-tól"],
    ["Közepes csokor", "9 900 Ft-tól"],
    ["Nagy, reprezentatív csokor", "16 900 Ft-tól"],
    ["11 szál rózsa zölddel", "12 900 Ft"],
    ["21 szál rózsa zölddel", "22 900 Ft"],
  ]},
  { group: "Cserepes növények", items: [
    ["Lepkeorchidea, egyágú", "6 490 Ft"],
    ["Lepkeorchidea, kétágú", "8 990 Ft"],
    ["Szobanövény (kicsi)", "3 490 Ft-tól"],
    ["Szobanövény (nagy)", "8 900 Ft-tól"],
  ]},
  { group: "Alkalmi és extrák", items: [
    ["Virágdoboz", "16 900 Ft-tól"],
    ["Gyászkoszorú", "14 900 Ft-tól"],
    ["Menyasszonyi csokor", "24 900 Ft-tól"],
    ["Ajándékkártya, üzenettel", "ingyenes"],
    ["Díszcsomagolás", "990 Ft-tól"],
  ]},
];

/* ---------- Segédfüggvények ---------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const huf = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0") + "\u00a0Ft";
const toMinutes = (hhmm) => { const [h, m] = hhmm.split(":").map(Number); return h * 60 + m; };

// Aktuális idő budapesti időzónában, a látogató helyétől függetlenül
function budapestNow() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Budapest", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false,
  }).formatToParts(new Date());
  const get = (t) => parts.find((p) => p.type === t).value;
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, minutes: (Number(get("hour")) % 24) * 60 + Number(get("minute")) };
}

/* ---------- Termékkártyák ---------- */
function renderProducts(filter = "all") {
  const wrap = $("#products");
  const list = PRODUCTS
    .filter((p) => filter === "all" || p.cat === filter)
    .sort((a, b) => a.price - b.price);
  wrap.innerHTML = list.map((p, i) => `
    <article class="card" style="animation-delay:${i * 60}ms">
      <div class="card__visual" style="background:radial-gradient(120% 90% at 50% 20%, ${p.bg[0]}, ${p.bg[1]}); color:${p.ink}">
        <span class="card__tag">${CATEGORY_LABEL[p.cat]}</span>
        <svg aria-hidden="true"><use href="#i-${p.icon}"/></svg>
      </div>
      <div class="card__body">
        <h3 class="card__title">${p.title}</h3>
        <p class="card__desc">${p.desc}</p>
        <div class="card__foot">
          <span class="card__price">${huf(p.price)}${p.from ? "<small>-tól</small>" : ""}</span>
          <span class="card__unit">/ ${p.unit}</span>
        </div>
      </div>
    </article>`).join("");
}

function initFilters() {
  $$(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      $$(".chip").forEach((c) => { c.classList.remove("is-active"); c.setAttribute("aria-selected", "false"); });
      chip.classList.add("is-active");
      chip.setAttribute("aria-selected", "true");
      renderProducts(chip.dataset.filter);
    });
  });
}

/* ---------- Árlista ---------- */
// Az árszöveg első számát adja vissza ("1 200 Ft / szál" → 1200, "ingyenes" → 0)
const priceValue = (text) => Number((text.match(/\d[\d\s]*/) || ["0"])[0].replace(/\s/g, ""));

function renderPricelist() {
  const groups = PRICELIST.map((g) => ({
    ...g,
    items: [...g.items].sort((a, b) => priceValue(a[1]) - priceValue(b[1])),
  }));
  $("#pricelist").innerHTML = groups.map((g) => `
    <div class="pgroup reveal">
      <h3>${g.group}</h3>
      ${g.items.map(([name, price]) => `
        <div class="prow">
          <span class="prow__name">${name}</span>
          <span class="prow__dots" aria-hidden="true"></span>
          <span class="prow__price">${price.replace(/ (?=\d{3})/g, " ")}</span>
        </div>`).join("")}
    </div>`).join("");
}

/* ---------- Nyitvatartás ---------- */
function renderHours() {
  const { day } = budapestNow();
  const order = [1, 2, 3, 4, 5, 6, 0];
  $("#hours").innerHTML = order.map((d) => {
    const h = SHOP.hours[d];
    return `<li class="${d === day ? "is-today" : ""}">
      <span>${DAY_NAMES[d]}</span>
      <span>${h ? `${h[0]} – ${h[1]}` : "Zárva"}</span>
    </li>`;
  }).join("");
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
  const s = openStatus();
  $$("[data-open-dot]").forEach((d) => {
    d.classList.toggle("is-open", s.open);
    d.classList.toggle("is-closed", !s.open);
  });
  $$("[data-open-text]").forEach((t) => (t.textContent = s.text));
}

/* ---------- Elérhetőségek ---------- */
function renderContact() {
  $$("[data-address]").forEach((el) => (el.textContent = SHOP.address));

  $$("[data-phone-link]").forEach((a) => {
    if (SHOP.phone) a.href = "tel:" + SHOP.phone.replace(/[^\d+]/g, "");
  });
  $$("[data-phone-text]").forEach((a) => {
    if (SHOP.phone) a.textContent = SHOP.phone;
    else a.replaceWith(document.createTextNode("Érdeklődjön személyesen a boltban"));
  });
  // Telefonszám hiányában a fejléc gomb a térképhez visz
  if (!SHOP.phone) $$(".nav__cta").forEach((a) => (a.textContent = "Útvonal"));

  $$("[data-email-link]").forEach((a) => {
    if (SHOP.email) { a.href = "mailto:" + SHOP.email; a.textContent = SHOP.email; }
    else a.closest(".fact").remove();
  });

  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
}

/* ---------- Navigáció ---------- */
function initNav() {
  const nav = $(".nav");
  const toggle = $(".nav__toggle");
  const menu = $("#mobile-menu");

  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 20);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const setMenu = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Menü bezárása" : "Menü megnyitása");
    menu.hidden = !open;
    nav.classList.toggle("is-scrolled", open || window.scrollY > 20);
  };
  toggle.addEventListener("click", () => setMenu(menu.hidden));
  $$("a", menu).forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  // Aktív menüpont kiemelése görgetéskor
  const links = $$(".nav__links a");
  const sections = links.map((a) => $(a.getAttribute("href"))).filter(Boolean);
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((a) => a.classList.toggle("is-current", a.getAttribute("href") === "#" + e.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((s) => spy.observe(s));
}

/* ---------- Térkép: csak kattintásra tölti be a Google Maps-et ---------- */
function initMap() {
  $$(".mapbox__load").forEach((btn) => {
    btn.addEventListener("click", () => {
      const f = document.createElement("iframe");
      f.title = "Meggie Virágbolt helye a térképen – Blaha Lujza tér";
      f.src = btn.dataset.mapSrc;
      f.referrerPolicy = "no-referrer-when-downgrade";
      btn.replaceWith(f);
    });
  });
}

/* ---------- Megjelenési animáció ---------- */
function initReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  $$(".reveal").forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 70}ms`;
    io.observe(el);
  });
}

/* ---------- Indítás ---------- */
document.documentElement.classList.remove("no-js");
renderProducts();
renderPricelist();
renderHours();
renderContact();
updateStatus();
setInterval(updateStatus, 60 * 1000);
initFilters();
initNav();
initMap();
initReveal();
