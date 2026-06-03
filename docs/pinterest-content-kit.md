# MakerMargins Pinterest Content Kit

The goal of this kit is to push real traffic to MakerMargins while organic SEO ages in. Pinterest is the highest-leverage channel for handmade niches — pins keep working for months, and the makers we're targeting (crochet, baking, jewelry, sewing, woodworking) live there.

## 1. Pinterest setup checklist

Do these once. None can be automated from code.

- [ ] Create a **Pinterest Business account** at business.pinterest.com (free).
- [ ] Add `makermarginsapp.com` as a **claimed website**. Pinterest gives you a verification string — paste it into `index.html`, replacing `REPLACE_WITH_PINTEREST_VERIFICATION_CODE` in the `<meta name="p:domain_verify" ...>` tag, then ship and click **Verify**.
- [ ] Run the canonical URL through the [Rich Pin Validator](https://developers.pinterest.com/tools/url-debugger/) once verification is live. We want "Article" rich pin type detected. The page already emits `og:type=article`, `og:title`, `og:description`, `og:image`, `og:image:width/height`, and Article JSON-LD on every public route.
- [ ] Apply for **rich pins** if not auto-approved after the validator passes.
- [ ] Set up a Pinterest **Tag** (their pixel) if/when we want to retarget — out of scope for the initial push.

## 2. Boards to create on the brand account

Five primary boards + two utility boards. Keep names plain — Pinterest search rewards literal language, not clever copy.

| Board | Description |
|---|---|
| Crochet Business Tips | Pricing, Etsy, listings, packaging, and selling crochet for profit. |
| Woodworking Shop Pricing | Pricing custom builds, shop rates, wholesale, and cost math for makers. |
| Handmade Jewelry Pricing | Sterling silver, beaded work, bench fees, and pricing for handmade jewelry sellers. |
| Home Bakery Business | Custom cake pricing, cookie pricing, bakery overhead, and cottage food math. |
| Sewing Business Pricing | Quilts, alterations, custom garments, and pricing for sewing pros. |
| MakerMargins Calculator | Direct calculator + free tool pins. (Brand board.) |
| Maker Money Mindset | Generic profitability, time-tracking, undercharging — cross-niche evergreen. |

Each niche pin should be saved to **its niche board + the brand board + the mindset board** when relevant. Pinning the same pin to 3–5 boards (with 24h+ between repins) extends reach without looking spammy.

## 3. Pin design specs

- **Aspect ratio**: 2:3 vertical. Pinterest crops anything else.
- **Pixel size**: 1000 × 1500 (already declared in `og:image:width/height`).
- **File**: PNG, < 200 KB if possible. Drop into `public/assets/pins/`.
- **Above-the-fold text**: First 30 chars of the pin's main headline must be readable on mobile (~360px wide preview). Use a large, bold, sans-serif at the top third.
- **Brand bar**: Bottom or top — small `makermarginsapp.com` and the niche color (we use the existing blue accent).
- **No faces / no logos taking up the top third** — Pinterest's algorithm prefers product/visual content.

### Templates to build in Canva

Build one **template per niche** in Canva (free). Reuse the layout for every pin in that niche; only the headline and accent image change.

| Template | Hero image suggestion |
|---|---|
| Crochet | Yarn balls + finished amigurumi / blanket macro shot |
| Woodworking | Hand-planed cutting board, sawdust, ruler |
| Jewelry | Bench pin with sterling wire, beads, pliers |
| Baking | Cake or cookie hero, dusted bench |
| Sewing | Quilt block stack, threads, scissors |

Free stock photo sources: Unsplash, Pexels, Pixabay (all license-clear for commercial pinning).

## 4. Pin titles and descriptions per page

Pinterest title = first 40 chars matter most. Description = treat like a tiny blog post: 300–500 chars, natural language, keyword-rich without keyword-stuffing.

### Homepage — `/`

- **Pin title:** Free Pricing Calculator for Makers
- **Pin description:** Stop guessing your prices. MakerMargins is a free pricing calculator that turns materials, labor, and overhead into retail AND wholesale prices in seconds. Built for handmade sellers — crochet, jewelry, woodworking, sewing, and home bakers. Save this for the next time you list a product. #makerlife #handmadebusiness #etsyseller
- **Pin image file:** `public/assets/pins/home-preview.png` (already exists)

### Niche calculator pages

| Slug | Pin title | Description |
|---|---|---|
| `/calc/crochet` | Crochet Pricing Calculator (Free) | Free crochet pricing calculator that handles yarn cost, labor hours, and Etsy fees so you can finally charge what your work is worth. Built for amigurumi, blankets, hats, and Etsy sellers. #crochetbusiness #amigurumi #etsycrochet |
| `/calc/woodworking` | Woodworking Pricing Calculator | Free pricing calculator for woodworkers. Plug in board-foot cost, shop rate, and overhead — get retail + wholesale prices instantly. Perfect for cutting boards, furniture, and custom builds. #woodworkingbusiness #craftsmanship |
| `/calc/jewelry` | Handmade Jewelry Pricing Calculator | Sterling spot price, beads, findings, bench time — this free calculator turns it all into a fair retail price plus wholesale. For wire wrappers, beaders, and silversmiths. #handmadejewelry #jewelryartist |
| `/calc/baking` | Custom Cake & Cookie Pricing Calculator | Free pricing calculator for home bakers and cottage food sellers. Tracks ingredient cost, decorating time, and overhead so you stop losing money on custom orders. #homebakery #cottagefood #cakepricing |
| `/calc/sewing` | Sewing Pricing Calculator (Quilts, Garments, Alterations) | Free pricing calculator for handmade sewing. Fabric yardage, thread, machine time, overhead — get retail + wholesale prices for quilts, dresses, and alterations. #sewingbusiness #quilting #handmadeclothing |

**Pin image files** (already exist): `crochet.png`, `woodworking.png`, `jewelry.png`, `baking.png`, `sewing.png`.

### Learn index — `/learn`

- **Pin title:** 15 Pricing Guides for Handmade Sellers
- **Pin description:** Real cost breakdowns for crochet, woodworking, jewelry, baking, and sewing. Worked examples, not guesses. Save this hub for whenever you're sizing a new product or rethinking your prices. #handmadebusiness #pricingformakers #etsysellertips
- **Pin image file:** create `public/assets/pins/learn-preview.png` (currently falls back to home-preview)

### Article pins (15)

Each article has a pin title (≤ 40 chars where possible), a 300–500 char description, and a target pin filename. To use a custom per-article pin, drop the file at `public/assets/pins/articles/{slug}.png` and add `pinImage: "/assets/pins/articles/{slug}.png"` to the article module. Until then, the article falls back to the niche pin automatically — that's fine for launch.

#### Crochet

**1. `crochet-amigurumi-pricing`** — *How Much to Charge for Amigurumi: Real Numbers for 2026*
- **Pin title:** How Much to Charge for Amigurumi (2026)
- **Description:** Most amigurumi sellers undercharge by 40%+. This guide breaks down real yarn cost per gram, time-per-stitch math, and what a 6-inch crocheted plush actually costs to make. Includes Etsy fee math so the retail price you set is the retail price you keep. #amigurumi #crochetbusiness #etsyseller

**2. `crochet-blanket-pricing`** — *How Much to Charge for a Crochet Blanket (Baby, Throw, Queen)*
- **Pin title:** Crochet Blanket Pricing by Size
- **Description:** A queen-sized crochet blanket can take 60+ hours. Pricing it as "yarn cost x 3" leaves $500 on the table. This guide shows real per-size pricing for baby blankets, throws, and queen blankets — with the labor math that makes the number honest. #crochetblanket #handmadeblanket #crochetersofinstagram

**3. `crochet-etsy-pricing`** — *Selling Crochet on Etsy: Pricing for Fees, Shipping, and Margin*
- **Pin title:** Etsy Crochet Pricing (Fees + Shipping)
- **Description:** Etsy takes 6.5% transaction + listing + offsite + payment fees. If you priced for materials and labor only, you're losing 15–18% to fees alone. This guide shows how to bake fees and shipping into your retail price without scaring buyers off. #etsyshop #crochetbusiness #etsyseller

#### Woodworking

**4. `woodworking-cutting-board-pricing`** — *How to Price Custom Cutting Boards (Real Lumber Costs + Labor Math)*
- **Pin title:** How to Price Custom Cutting Boards
- **Description:** Walnut at $14/bf, maple at $8, edge-grain assembly time, sanding to 220, food-safe finish — here's what a custom cutting board really costs to make, and what you should charge to clear $35–$50/hr for your shop time. #woodworkingbusiness #cuttingboard #handmadeshop

**5. `woodworking-shop-rate`** — *How to Set Your Woodworking Shop Rate (Hourly Wage + Overhead Math)*
- **Pin title:** How to Set Your Woodworking Shop Rate
- **Description:** Your shop rate isn't just your hourly wage. It's wage + tool wear + utilities + insurance + the time you spend not making product. This guide walks through the math for a one-person shop and shows why $25/hr is usually too low. #woodworker #shopmath #handmadebusiness

**6. `woodworking-wholesale-pricing`** — *Wholesale Woodworking Pricing: Margins, MSRP, and Retailer Math*
- **Pin title:** Wholesale Woodworking Pricing 101
- **Description:** Retailers expect 50% off MSRP. If your retail price isn't built for that gap, wholesale will lose you money. This guide shows the keystone math, what to negotiate, and when to walk away from a retailer ask. #woodworking #wholesale #handmadebusiness

#### Jewelry

**7. `jewelry-sterling-silver-pricing`** — *How to Price Handmade Sterling Silver Jewelry (Spot Price + Labor Math)*
- **Pin title:** Sterling Silver Jewelry Pricing Math
- **Description:** Sterling spot moves every day. If your prices don't, you're either losing margin or scaring customers. This guide shows a clean spot-price + labor + bench-time formula that survives metal market swings. #handmadejewelry #sterlingsilver #jewelrybusiness

**8. `jewelry-bench-fees`** — *Jewelry Bench Fees Explained: What to Charge for Your Studio Time*
- **Pin title:** Jewelry Bench Fees Explained
- **Description:** "I charge per piece" leaves money on the bench. Repairs, soldering, ring sizing, custom design time — they need a bench fee. This guide breaks down how to set a bench rate that respects your time and is still reasonable to a customer. #jewelryartist #benchwork #jewelrybusiness

**9. `jewelry-beaded-pricing`** — *How to Price Beaded Jewelry (Real Bead-Cost and Time Math)*
- **Pin title:** Beaded Jewelry Pricing (Bead Cost + Time)
- **Description:** Seed beads, findings, thread, time — beaded work is "cheap materials, expensive hours." Most beaders undercharge because they look only at material cost. This guide shows the right way to value the hours and price honestly. #beadedjewelry #jewelryartist #handmade

#### Baking

**10. `baking-custom-cake-pricing`** — *How to Price Custom Cakes (Tier-by-Tier Pricing for Home Bakers)*
- **Pin title:** Custom Cake Pricing Tier by Tier
- **Description:** Most home bakers price custom cakes by intuition and end up working for $8/hr. This guide breaks it down by tier — ingredients per serving, decorating time, overhead, and a clean per-serving price that respects your hours. #homebakery #cakepricing #cottagebakery

**11. `baking-cookie-pricing`** — *How to Price Decorated Cookies (Per Cookie and Per Dozen)*
- **Pin title:** Decorated Cookie Pricing (Real Math)
- **Description:** Royal icing detail can take 10–15 minutes per cookie. Charging $4 each means $16–$24/hr — barely scraping minimum wage. This guide shows per-cookie and per-dozen pricing that actually pays you for the detail. #cookiedecorating #royalicing #cookieseller

**12. `baking-bakery-overhead`** — *How to Calculate Bakery Overhead (Cottage and Storefront)*
- **Pin title:** How to Calculate Bakery Overhead
- **Description:** Flour and butter are obvious. Gas for the oven, dish soap, packaging, license fees, insurance, the hour you spent cleaning — most home bakers ignore all of it. This guide shows the line items and what they add up to as a % of revenue. #homebakery #cottagefood #bakingbusiness

#### Sewing

**13. `sewing-quilt-pricing`** — *How Much to Charge for a Handmade Quilt (Real Numbers by Size)*
- **Pin title:** Handmade Quilt Pricing by Size
- **Description:** A queen quilt takes 40–80 hours and $200+ in fabric. If you charge under $600 you're paying customers to take your work. This guide gives honest size-by-size pricing for handmade quilts. #quilting #handmadequilt #quiltersofinstagram

**14. `sewing-alterations-pricing`** — *How Much to Charge for Alterations (Tailor Pricing for 2026)*
- **Pin title:** Alterations Pricing Guide (2026)
- **Description:** Hem-pinning takes 5 minutes, taking in a wedding dress takes 5 hours. Flat-rate price lists let you commit to a turnaround without quoting every time. This guide shows what to charge for common alterations in 2026. #tailor #sewingbusiness #alterations

**15. `sewing-garment-pricing`** — *How to Price Custom Garments (Dresses, Shirts, Pants)*
- **Pin title:** Pricing Custom Garments (Dresses, Shirts)
- **Description:** Custom garments aren't quilts — fittings, muslins, and revisions add hours you didn't price. This guide walks through fabric + notion + labor + fitting overhead so your custom dress price actually clears profit. #customclothing #handmadefashion #sewing

## 5. Posting cadence

- **Pin volume:** 1–3 pins per day, 4–5 days/week. Pinterest favors steady output over bursts.
- **Variety:** Don't pin the same article every day. Rotate niches. Reuse old articles with fresh pin designs after 30 days.
- **Per article:** Create 3–5 different pin designs over time. Same destination URL, different image + headline. Pinterest treats them as separate pins and one will outperform the others.
- **Best times** (Eastern, anecdotally — verify with your own analytics after 30 days): 8–11pm weekdays, 2–4pm Saturdays.
- **Scheduling tool:** Pinterest's native scheduler is free and handles ~30 days out. Tailwind is the paid alternative; not needed until you outgrow Pinterest's built-in.

## 6. Launch sequence (first 30 days)

Week 1:
- Complete the setup checklist (account, claim domain, verify, rich-pin validator).
- Build the 5 Canva niche templates.
- Design pin #1 for each of the 5 niche calculator pages. Publish 1/day.

Week 2:
- Design 1 pin per article — start with the 5 "flagship" articles (one per niche): `crochet-amigurumi-pricing`, `woodworking-cutting-board-pricing`, `jewelry-sterling-silver-pricing`, `baking-custom-cake-pricing`, `sewing-quilt-pricing`. Publish 1/day.

Week 3:
- Design pins for the remaining 10 articles. Publish 2/day.
- Repin niche-page pins to the brand board ("MakerMargins Calculator").

Week 4:
- Review Pinterest analytics: which pins got the highest impressions, saves, outbound clicks?
- Make 2 fresh design variants for the top 3 pins.
- Cross-reference Pinterest outbound clicks with GA4 `referral` traffic from `pinterest.com` to confirm the funnel.

## 7. What we'll measure

Once pins are live, watch in GA4:
- **Acquisition → Traffic acquisition → Source/Medium = `pinterest.com / referral`** — sessions, engagement rate.
- **Custom event `article_pin_save`** — confirms users are using our own Save button, signal that content is pin-worthy on its own.
- **Conversion path:** `pinterest referral session` → `calculate` event. That's the path that matters for monetization (ads load, eventual affiliates).

If a Pinterest-sourced session has < 30% chance of triggering `calculate`, the pin promised something the page doesn't deliver — rework the pin headline or the article intro.

## 8. Files this kit touches in code

- `index.html` — `p:domain_verify` placeholder (replace with Pinterest's verification string).
- `src/components/PinterestMeta.jsx` — rich-pin meta (og:* + twitter:* + Article JSON-LD) emitted on every public route.
- `src/components/ShareToPinterest.jsx` — Save button used in calculator result card and at the bottom of every article.
- `public/assets/pins/` — pin images. Existing: `crochet.png`, `woodworking.png`, `jewelry.png`, `baking.png`, `sewing.png`, `home-preview.png`. Add: `learn-preview.png`, `articles/{slug}.png` (optional per-article overrides).
