// Aggregates article modules. Each article is a separate file so editing
// one doesn't pollute the diff with unrelated content. Add new articles
// by importing the module and pushing it into ARTICLES.

import crochetAmigurumi from "./crochet-amigurumi-pricing.js";
import crochetBlanket from "./crochet-blanket-pricing.js";
import crochetEtsy from "./crochet-etsy-pricing.js";
import woodworkingCuttingBoards from "./woodworking-cutting-board-pricing.js";
import woodworkingShopRate from "./woodworking-shop-rate.js";
import woodworkingWholesale from "./woodworking-wholesale-pricing.js";
import jewelrySterling from "./jewelry-sterling-silver-pricing.js";
import jewelryBenchFees from "./jewelry-bench-fees.js";
import jewelryBeaded from "./jewelry-beaded-pricing.js";
import bakingCustomCakes from "./baking-custom-cake-pricing.js";
import bakingCookies from "./baking-cookie-pricing.js";
import bakingOverhead from "./baking-bakery-overhead.js";
import sewingQuilts from "./sewing-quilt-pricing.js";
import sewingAlterations from "./sewing-alterations-pricing.js";
import sewingGarments from "./sewing-garment-pricing.js";

export const ARTICLES = [
  crochetAmigurumi,
  crochetBlanket,
  crochetEtsy,
  woodworkingCuttingBoards,
  woodworkingShopRate,
  woodworkingWholesale,
  jewelrySterling,
  jewelryBenchFees,
  jewelryBeaded,
  bakingCustomCakes,
  bakingCookies,
  bakingOverhead,
  sewingQuilts,
  sewingAlterations,
  sewingGarments,
];

export const ARTICLE_BY_SLUG = Object.fromEntries(
  ARTICLES.map((a) => [a.slug, a])
);

export function getArticle(slug) {
  return ARTICLE_BY_SLUG[slug] ?? null;
}

export function getArticlesByNiche(nicheSlug) {
  return ARTICLES.filter((a) => a.niche === nicheSlug);
}
