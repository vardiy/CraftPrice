# MakerMargins

Free pricing / profit calculator for handmade sellers: crochet, woodworking, jewelry, baking, sewing.
Live at **https://makermarginsapp.com** (repo: `vardiy/CraftPrice`; the project was renamed from CraftPrice).

Users enter materials, labor hours, hourly wage, overhead % and target margin, and get total cost,
retail price and wholesale price. Results export as a PDF or a Bill of Materials CSV.
A `/learn` section of long-form pricing articles brings in search and Pinterest traffic and links back to the calculators.

## Stack

| Piece | Choice |
|---|---|
| UI | React 19, React Router 6, Tailwind CSS 4, lucide-react icons |
| Build | Vite 8 + `vite-react-ssg` (pre-renders every route to static HTML) |
| SEO head | `react-helmet-async` (title, meta, canonical, JSON-LD, Open Graph / Pinterest rich pins) |
| Analytics | GA4 via `react-ga4`, Consent Mode v2 + consent banner |
| Export | `jspdf` (PDF), plain CSV |
| Hosting | Vercel (`vercel.json`: `cleanUrls`, no trailing slash, SPA fallback) |

## Commands

```bash
npm install        # .npmrc sets legacy-peer-deps (needed for vite-react-ssg)
npm run dev        # Vite dev server (client-only, no SSG)
npm run build      # vite-react-ssg build -> dist/ (one .html per route)
npm run preview    # serve dist/
npm run lint
```

Pushing to `main` deploys through Vercel.

## Routes

| Path | Page | Notes |
|---|---|---|
| `/` | `LandingPage` | Hero, niche cards, how-it-works, FAQ (FAQPage JSON-LD) |
| `/calc/:niche` | `NicheCalculatorPage` | `crochet`, `woodworking`, `jewelry`, `baking`, `sewing`. Calculator + niche content (intro, mistakes, worked example, FAQ) + related articles |
| `/learn` | `LearnIndexPage` | Article hub grouped by niche |
| `/learn/:slug` | `ArticlePage` | 15 articles (3 per niche), Article JSON-LD, CTA to the niche calculator |
| `*` | redirects to `/` | Unknown URLs get a real 404 from Vercel because only pre-rendered routes exist |

The pre-rendered route list is in `vite.config.js` (`ssgOptions.includedRoutes`). **Add new routes there and in `public/sitemap.xml`**, since the sitemap is hand-maintained.

## Layout

```
src/
  App.jsx                 routes, layout shell, PageTracker (GA page views)
  main.jsx                ViteReactSSG entry
  components/
    Calculator.jsx        reducer-based calculator, PDF/CSV export, `calculate` event
    ResultCard.jsx        cost / retail / wholesale display
    SeoHead.jsx           title, description, canonical, SoftwareApplication JSON-LD
    PinterestMeta.jsx     og:* tags + pin image per page
    ShareToPinterest.jsx  "Save to Pinterest" button
    ConsentBanner.jsx     analytics consent banner
    SettingsModal.jsx     currency picker
    AdSlot.jsx            AdSense slot (unused until AdSense is approved)
  config/
    nicheConfig.js        per-niche calculator defaults + meta title/description
    nicheContent.js       per-niche long-form copy (intro, mistakes, worked example, FAQ)
  content/articles/       one file per article; register new ones in index.js
  context/SettingsContext.jsx   currency (localStorage)
  hooks/useAnalytics.js   GA4 init, consent, trackEvent
  utils/exportPdf.js, exportCsv.js
public/
  sitemap.xml, robots.txt
  assets/pins/            1000x1500 Pinterest images per page
docs/pinterest-content-kit.md   Pinterest setup, boards, pin copy, posting plan
misc/coding-team/       original task specs for the programmatic SEO work
```

## Pricing math (`Calculator.jsx` → `calculate`)

```
materials  = Σ qty × unit cost
labor      = hours × hourly wage
overhead   = (materials + labor) × overhead%
total cost = materials + labor + overhead
retail     = total cost / (1 − margin%)      # true margin, not markup
wholesale  = total cost × 1.5
```

Hourly wage and margin persist in localStorage (`cp_hourlyWage`, `cp_profitMargin`).

## Analytics

GA4 property `G-7409PQ6GLE`. Enhanced Measurement is on (scroll, outbound clicks, downloads).
Page views are sent manually by `PageTracker` on each route change.

Custom events: `calculate`, `pdf_download`, `csv_download`, `article_cta_click`,
`article_niche_tag_click`, `related_article_click`, `niche_to_article_click`,
`niche_to_niche_click`, `learn_index_article_click`, `learn_index_calc_click`.

Consent Mode v2 defaults `analytics_storage` to `denied` in the EEA/UK/CH (Google resolves the region by IP)
and `granted` elsewhere. The consent banner shows only for browsers in a Europe time zone.

## Adding content

- **Article:** create `src/content/articles/<slug>.js` (copy an existing one), import it in
  `src/content/articles/index.js`, add the URL to `public/sitemap.xml`. The SSG route list picks it up automatically.
- **Niche:** add an entry to `nicheConfig.js` and `nicheContent.js`, add the slug to `NICHE_SLUGS`
  in `vite.config.js`, add a pin image and a sitemap entry.

See [PLAN.md](PLAN.md) for status and next steps.
