// Submit sitemap URLs to IndexNow (Bing, Yandex, Seznam, Naver...).
// Run after a deploy is live:  npm run indexnow            (all sitemap URLs)
//                              npm run indexnow -- /calc/crochet /learn/foo   (specific paths)
import { readFileSync } from "node:fs";

const HOST = "makermarginsapp.com";
const KEY = "df6d5d586ea22a8465ae466e3f6c8696"; // public/<KEY>.txt must be deployed
const ORIGIN = `https://${HOST}`;

const args = process.argv.slice(2);
const urlList = args.length
  ? args.map((p) => (p.startsWith("http") ? p : ORIGIN + p))
  : [...readFileSync(new URL("../public/sitemap.xml", import.meta.url), "utf8")
      .matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${ORIGIN}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} (${urlList.length} URLs)`);
if (!res.ok) {
  console.log(await res.text());
  process.exit(1);
}
