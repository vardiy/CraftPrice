// Aggregates article modules. Each article is a separate file so editing
// one doesn't pollute the diff with unrelated content. Add new articles
// by importing the module and pushing it into ARTICLES.

import crochetAmigurumi from "./crochet-amigurumi-pricing.js";
import woodworkingCuttingBoards from "./woodworking-cutting-board-pricing.js";
import jewelrySterling from "./jewelry-sterling-silver-pricing.js";
import bakingCustomCakes from "./baking-custom-cake-pricing.js";
import sewingQuilts from "./sewing-quilt-pricing.js";

export const ARTICLES = [
  crochetAmigurumi,
  woodworkingCuttingBoards,
  jewelrySterling,
  bakingCustomCakes,
  sewingQuilts,
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
