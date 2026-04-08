---
task: 003
title: Niche-aware SEO and Calculator
status: pending
---

## Context
Routing is in place. `NicheCalculatorPage` passes `nicheConfig` to `<Calculator>`. SeoHead is still static.

## Objective
Make SeoHead and Calculator respond to niche config so each `/calc/:niche` page has unique SEO and sensible defaults.

## Scope

### SeoHead
- Accept optional `niche` prop (the niche config object).
- When `niche` is provided:
  - `<title>` → `niche.metaTitle`
  - `<meta description>` → `niche.metaDescription`
  - `canonical` → `https://craftprice.app/calc/${niche.slug}`
  - OG tags → niche-specific
  - JSON-LD `name` → `"CraftPrice — ${niche.name} Calculator"`, `description` → niche.metaDescription
- When no niche → keep current generic defaults.

### Calculator
- Accept optional `nicheConfig` prop.
- **H1**: Render an `<h1>` inside `<main>` area. If `nicheConfig` → `nicheConfig.h1`. If generic → "Craft Profit Calculator".
- **Default hourly wage**: If `nicheConfig.defaultHourlyWage` is set AND localStorage `cp_hourlyWage` is empty/absent → use it as the initial value. Otherwise localStorage wins.
- **Material placeholder**: Pass `nicheConfig.materialPlaceholder` as the placeholder for the first material row's Name input (default remains "e.g. Yarn").
- **Unit cost label**: Keep using `currency.symbol` — no niche change here.

### App.jsx
- Pass the niche object to `<SeoHead niche={...} />` from both the generic route (no prop) and `NicheCalculatorPage` (with prop).

## Non-goals
- No niche-specific material row templates
- No SSR / prerendering
