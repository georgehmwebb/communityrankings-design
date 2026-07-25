# Changelog

## 0.2.0
- Added `Score` component: mono + tabular-nums score in the site accent colour,
  with green-up / red-down / muted-zero delta. `size` (sm/lg) and `layout`
  (stacked/inline) props cover both the compact hero widget and the main list.
  Delta units stay per-site via `label` / `suffix`.

## 0.1.0
- Two-layer token system (`tokens.css` + per-site theme files).
- Tailwind v3 preset mapping semantic tokens to utilities.
- Network registry (`network.ts`) as single source of truth for cross-links.
- `NetworkStrip` server component (renders all four properties, marks current).
