---
task: 001
title: Niche config and dependency
status: pending
---

## Context
CraftPrice needs per-niche `/calc/:niche` routes with unique SEO. No router exists yet.

## Objective
1. Install `react-router-dom`.
2. Create `src/config/nicheConfig.js` exporting a map of 5 niches.

## Scope — nicheConfig shape
Each entry keyed by slug (`crochet`, `woodworking`, `jewelry`, `baking`, `sewing`):
- `slug` — URL segment
- `name` — display name (e.g. "Crochet")
- `h1` — full H1 title (e.g. "Crochet Profit Calculator")
- `metaTitle` — `<title>` tag (e.g. "CraftPrice | Crochet Profit Calculator")
- `metaDescription` — unique ~155-char description
- `defaultHourlyWage` — number (e.g. 15 for crochet, 25 for woodworking)
- `materialPlaceholder` — hint text for first material name input (e.g. "e.g. Yarn" for crochet, "e.g. Lumber" for woodworking)

Export both the map (`NICHES`) and a lookup helper: `getNiche(slug)` returning the entry or `null`.

## Non-goals
- No routing changes yet
- No component changes yet
