// Cloudflare Worker: a titkosítatlan (http://) kéréseket https://-re irányítja,
// minden mást változatlanul a public/ mappa fájljaiból szolgál ki.
// Csak a wrangler.jsonc-ben megadott oldalaknál fut le (és a nem létező címeknél);
// a képek, betűk, stílus- és szkriptfájlok közvetlenül, a Worker nélkül mennek ki.
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
    return env.ASSETS.fetch(request);
  },
};
