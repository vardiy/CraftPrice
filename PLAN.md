# MakerMargins: Plan

_Last updated: 2026-10-23_

## Where things stand

**Built and live** (makermarginsapp.com on Vercel):
- Calculator with per-niche defaults for 5 niches, PDF export and BOM CSV export
- 5 niche calculator pages with long-form content (intro, mistakes, worked example, FAQ)
- `/learn` hub plus 15 pricing articles (3 per niche)
- SSG pre-render of every route, canonical tags, sitemap, robots, FAQ/Article/SoftwareApplication JSON-LD
- Pinterest rich-pin meta, pin images, Save to Pinterest button
- GA4 with Consent Mode v2 and conversion-path click events

**Not done:**
- Pinterest: `p:domain_verify` in `index.html` is still `REPLACE_WITH_PINTEREST_VERIFICATION_CODE`. The content kit in `docs/` was never executed.
- AdSense: `AdSlot` uses `ca-pub-XXXXXXXXXXXXXXXX` and the AdSense script is never loaded, so every page shows empty grey ad boxes.
- No Google Search Console or GA work since the canonical fix on 2026-07-18.

## Traffic baseline (Apr 1 – Oct 22, 2026)

| Source | Numbers |
|---|---|
| GA4 (property 531672056) | 36 sessions, 14 users, 153 page views. 72% "Direct" (mostly us testing). 6 `calculate` events |
| Search Console | 9 clicks, 1,140 impressions, 0.8% CTR, avg position 14.1 |
| Indexing | **5 of 25 known URLs indexed**: `/` and 4 articles. 9 "crawled, not indexed", 8 "discovered, not indexed", 3 redirects |
| Sitemap | Submitted May 1, **last read Jul 10**, before the clean-URL canonical fix shipped |

Pages with impressions (position): crochet-blanket 191 (9.2), cookie 169 (10.2), quilt 154 (9.0),
alterations 119 (59.7), custom-cake 91 (11.0), cutting-board 73 (7.3), beaded 63 (12.9).
**No calculator page and not `/learn` is indexed.**

Queries are long-tail "how much does X cost" questions ("average cost of custom beaded necklaces",
"cost to tailor a shirt", "bulk discounts for decorated cookies by the dozen") plus brand searches.

### What the data says

1. **The bottleneck is indexing, not ranking.** Google found the pages but kept 80% out of the index.
   Indexed articles already sit around position 7–12. Each one that gets indexed and reaches page 1 counts.
2. **GA undercounts.** Consent defaults to `denied` for every visitor worldwide, so anyone who ignores
   the banner sends only cookieless pings. At this volume GA won't model them, so they never appear in reports.
   Search Console is the reliable source for now.
3. **There is no off-site distribution yet.** Referral and social traffic are effectively zero, and a new
   domain with no backlinks is why Google is slow to index it.

## Next steps (priority order)

### P0: fix measurement and indexing (code + console, ~1 day)
- [x] **Region-scoped consent**: default `analytics_storage: denied` only for EEA/UK/CH
      (`region: [...]` in the `consent default` call), granted elsewhere. Banner shows only for Europe time zones.
- [ ] Add a GA4 internal-traffic filter (or exclude our IP) so testing stops polluting Direct.
- [ ] Mark `calculate`, `pdf_download`, `csv_download` as **key events** in GA4.
- [x] Bump sitemap `lastmod`. **Still to do (you, after deploy):** resubmit the sitemap in Search Console, and use **URL Inspection → Request indexing**
      on the 5 `/calc/*` pages and `/learn`.
- [x] Remove `AdSlot` from the calculator until AdSense is approved (component kept for later): the empty grey boxes hurt UX and page-quality signals.
- [ ] Optional: enable Vercel Web Analytics (cookieless) as a second, consent-independent traffic count.

### P1: make existing pages win clicks (~2–3 days)
- [x] **Keyword-first titles** on the home and calculator pages, with H1s renamed to "Pricing Calculator". Today: `MakerMargins | Crochet Profit Calculator`. People search "pricing calculator"
      and "how much to charge for". Example: `Crochet Pricing Calculator: How Much to Charge (Free) | MakerMargins`.
- [x] Rewrite meta descriptions on the position 7–12 articles (plus beaded jewelry) (blanket, cookie, quilt, cutting board, cake)
      so they answer the query with a number. CTR is 0–1% at those positions, and 3–5% is realistic.
- [ ] Make calculator pages more distinct from each other (unique worked examples per product type, price
      tables), which is likely why they're "crawled, not indexed".
- [x] Footer links to every calculator and `/learn` on all pages.
- [ ] More internal links: homepage → each article.
- [ ] Long-tail queries: "cost to tailor a shirt" (position 87) is consumer intent and the alterations article is written
      for sellers, so it's probably not worth chasing. The beaded-necklace cost query (position 16) is a better fit.

### P2: get links and distribution (ongoing)
- [ ] Execute the Pinterest kit (`docs/pinterest-content-kit.md`): verify the domain, create boards, pin 3–5 a week.
      This channel doesn't depend on Google indexing.
- [ ] Post genuinely useful answers (not drive-by links) in r/crochet, r/Etsy, r/EtsySellers, r/woodworking,
      r/cakedecorating, r/sewing, and in Etsy forum / Facebook seller groups.
- [ ] List the tool in free-tool directories and maker resource roundups (Product Hunt, AlternativeTo,
      "best Etsy seller tools" posts) to earn the first backlinks.
- [ ] Build an **embeddable calculator widget** (iframe + "Powered by MakerMargins" link) for craft bloggers.

### P3: expand once indexing improves
- [ ] New niches with search demand: candles, soap, resin, knitting, embroidery, pottery, 3D printing,
      stickers/print-on-demand. Each one needs real unique content, not a template copy.
- [ ] Etsy fee calculator as a standalone page (high-volume query, and it ties into the existing Etsy article).
- [ ] Monthly check: Search Console impressions/indexed count, GA `calculate` events.

## Success targets (by 2027-01-31)
- 15+ of 25 URLs indexed, including all 5 calculator pages
- 100+ Search Console clicks/month
- `calculate` key event tracked, with 25%+ of sessions reaching it
