// Cloudflare Worker: a titkosítatlan (http://) kéréseket https://-re irányítja,
// minden mást változatlanul a public/ mappa fájljaiból szolgál ki.
// Csak a wrangler.jsonc-ben megadott címeknél fut le (és a nem létező címeknél);
// a képek, betűk, stílus- és szkriptfájlok közvetlenül, a Worker nélkül mennek ki.
//
// Videók (/assets/video/*): a Safari (iPhone, iPad, Mac) csak akkor játssza le a videót,
// ha a szerver részletekben (Range kérés → 206 Partial Content) is ki tudja szolgálni.
// A statikus fájlkiszolgáló mindig a teljes fájlt küldi, ezért a kért részt itt vágjuk ki.
// Ha ez bármiért nem sikerül, a teljes fájl megy ki, ahogy eddig.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.protocol === "http:") {
      url.protocol = "https:";
      return new Response(null, {
        status: 301,
        headers: {
          Location: url.toString(),
          "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
        },
      });
    }
    if (url.pathname.startsWith("/assets/video/")) {
      try {
        return await serveVideo(request, env);
      } catch (err) {
        console.error("video range handling failed:", err);
        const res = await env.ASSETS.fetch(request);
        const h = new Headers(res.headers);
        h.set("X-Video-Serve", "fallback");
        return new Response(res.body, { status: res.status, statusText: res.statusText, headers: h });
      }
    }
    return env.ASSETS.fetch(request);
  },
};

// A teljes fájlt kéri le (Range nélkül), és ha a böngésző csak egy részt kért, azt adja vissza.
async function serveVideo(request, env) {
  const range = request.headers.get("Range");
  const plain = new Headers(request.headers);
  plain.delete("Range");
  const full = await env.ASSETS.fetch(new Request(request.url, { method: request.method, headers: plain }));

  const headers = new Headers(full.headers);
  if (full.status !== 200 || !full.body) {
    headers.set("X-Video-Serve", "passthrough");
    return new Response(full.body, { status: full.status, statusText: full.statusText, headers });
  }

  // A fájlkiszolgáló a Workeren belül nem mindig ad Content-Length-et; ilyenkor beolvassuk
  // a fájlt, hogy tudjuk a méretét (a videók néhány MB-osak, ez belefér a Worker memóriájába).
  let size = Number(full.headers.get("Content-Length"));
  let buffer = null;
  if (!Number.isFinite(size) || size <= 0) {
    buffer = await full.arrayBuffer();
    size = buffer.byteLength;
  }
  headers.set("Accept-Ranges", "bytes");

  const r = range ? parseRange(range, size) : null;
  if (r === "unsatisfiable") {
    if (!buffer) await full.body.cancel();
    return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${size}`, "Accept-Ranges": "bytes", "X-Video-Serve": "unsatisfiable" } });
  }
  if (r === null) {
    // Nincs Range, vagy érthetetlen / több részből álló kérés: a teljes fájl megy ki (ezt a szabvány megengedi).
    headers.set("X-Video-Serve", buffer ? "full-buffered" : "full");
    return new Response(buffer ?? full.body, { status: 200, headers });
  }

  const length = r.end - r.start + 1;
  headers.set("Content-Range", `bytes ${r.start}-${r.end}/${size}`);
  headers.set("Content-Length", String(length));
  if (buffer) {
    headers.set("X-Video-Serve", "range-buffered");
    return new Response(new Uint8Array(buffer, r.start, length), { status: 206, headers });
  }
  headers.set("X-Video-Serve", "range");
  const { readable, writable } = new FixedLengthStream(length);
  sliceStream(full.body, r.start, length).pipeTo(writable).catch((err) => console.error("video slice stream failed:", err));
  return new Response(readable, { status: 206, headers });
}

// "bytes=START-END", "bytes=START-" vagy "bytes=-UTOLSÓ_N" → { start, end } (zárt intervallum).
// null: nem értelmezhető vagy több tartomány; "unsatisfiable": a fájlon kívül esik.
function parseRange(header, size) {
  const m = /^bytes=(\d*)-(\d*)$/.exec(String(header).trim());
  if (!m || (m[1] === "" && m[2] === "")) return null;
  let start;
  let end;
  if (m[1] === "") {
    const suffix = Number(m[2]);
    if (suffix === 0) return "unsatisfiable";
    start = Math.max(size - suffix, 0);
    end = size - 1;
  } else {
    start = Number(m[1]);
    end = m[2] === "" ? size - 1 : Math.min(Number(m[2]), size - 1);
  }
  if (start >= size || start > end) return "unsatisfiable";
  return { start, end };
}

// A bájtfolyamból kihagyja az első `start` bájtot, és pontosan `length` bájtot ad tovább.
function sliceStream(body, start, length) {
  let skipped = 0;
  let sent = 0;
  return body.pipeThrough(new TransformStream({
    transform(chunk, controller) {
      let from = 0;
      if (skipped < start) {
        const skip = Math.min(start - skipped, chunk.byteLength);
        skipped += skip;
        from = skip;
        if (from >= chunk.byteLength) return;
      }
      const take = Math.min(chunk.byteLength - from, length - sent);
      if (take > 0) {
        controller.enqueue(chunk.subarray(from, from + take));
        sent += take;
      }
      if (sent >= length) controller.terminate();
    },
  }));
}
