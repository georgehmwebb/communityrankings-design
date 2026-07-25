# Changelog

## 0.4.0
- Added `StatBar`: shared stat strip, number-first everywhere (standardises
  Telegram, which put the label above the number). Values stay per-site.
- Added `SiteFooter`: shared footer shell (brand block + columns + two-part
  bottom bar) using `cr-container`. Column link lists stay per-site (categories,
  methodology sub-pages, network column) — only layout/typography are unified.

## 0.3.0
- Added shared page container: `.cr-container` class + `--container-max`
  (72rem / 1152px) and `--container-pad` (1rem) tokens in tokens.css, plus a
  `max-w-page` utility in the preset. One content width for the whole network,
  defined once. Replaces each site's hand-picked wrapper width.

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
