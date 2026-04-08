---
task: 002
title: Routing infrastructure
status: pending
---

## Context
`react-router-dom` is installed and `nicheConfig.js` exists. App currently renders `<Calculator />` directly.

## Objective
Add client-side routing so `/calc/:niche` renders a niche-configured calculator and `/` renders the generic one.

## Scope
1. **main.jsx** — wrap the app in `<BrowserRouter>`.
2. **App.jsx** — replace the direct `<Calculator />` render with `<Routes>`:
   - `path="/"` → existing generic page (no niche prop)
   - `path="/calc/:niche"` → `<NicheCalculatorPage />`
   - `path="*"` → `<Navigate to="/" replace />`
3. **Create `src/pages/NicheCalculatorPage.jsx`**:
   - Read `:niche` from `useParams()`
   - Look up via `getNiche(slug)`
   - If not found → `<Navigate to="/" replace />`
   - If found → render `<Calculator nicheConfig={config} />`
4. **Header brand** — change `<h1>CraftPrice</h1>` to a `<Link to="/">` wrapped in a `<span>` or `<p>` (it should NOT be H1 — H1 will come from the page). Keep visual styling the same.

## Non-goals
- Don't modify Calculator or SeoHead internals yet — just pass the prop through.
- Calculator can ignore `nicheConfig` for now; it will be wired in task 003.

## Caveats
- Vite needs a fallback config for SPA routing in dev/preview. Add `appType: 'spa'` if not already the default (it is in Vite 8).
