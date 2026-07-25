# @communityrankings/design

Shared design tokens, per-site themes, and components for the CommunityRankings
network — **DiscordRankings**, **TelegramRankings**, **RumbleRankings**, and the
**CommunityRankings** hub. One source of truth so the sites stop drifting apart.

---

## How it works (the mechanism)

**Ship source, transpile in each app.** This package publishes raw `.ts` / `.tsx`
/ `.css` — no build step, no `dist/`. Each Next.js site transpiles it at its own
build via `transpilePackages`. That means a change here is picked up by every
site with one `npm update`, and there's nothing to compile or publish to npm.

**Distribution is a git dependency.** No private npm registry, no Netlify auth
token. Sites install straight from the GitHub repo and pin a tag:

```bash
npm install github:<your-gh-user>/communityrankings-design#v0.1.0
```

> Replace `<your-gh-user>` with your GitHub username/org. If the repo is private,
> Netlify needs read access — add a deploy key or use the GitHub App connection
> (one-time). Prefer pinning a **tag** (`#v0.1.0`) over `#main` so a Netlify
> rebuild can't silently pull an unreleased change.

**Two-layer tokens.** The whole colour system derives from one hue per site:

```
themes/rumble.css   ->  sets   --hue: 150   (green)      \
themes/telegram.css ->  sets   --hue: 232   (blue)        |  Layer 1 (per site)
themes/discord.css  ->  sets   --hue: 276   (blurple)    /
                                    |
tokens.css  ->  --surface-raised, --line-subtle, --accent, --text-muted …
                (identical everywhere, all derived from --hue)   Layer 2 (shared)
```

Change one hue and the entire site re-themes while the relationships between
colours stay locked. Up/down status colours (green/red deltas) are **fixed** and
never follow the accent.

---

## Installing in a site

### 1. Add the dependency

```bash
npm install github:<your-gh-user>/communityrankings-design#v0.1.0
```

### 2. Transpile the package (`next.config.js`)

```js
const nextConfig = {
  transpilePackages: ['@communityrankings/design'],
};
module.exports = nextConfig;
```

### 3. Identify the site

Set an env var in Netlify (and `.env.local` for dev):

```
NEXT_PUBLIC_SITE_ID=rumble        # one of: hub | discord | telegram | rumble
```

### 4. Import tokens + theme (`app/globals.css`, at the very top)

```css
@import '@communityrankings/design/tokens.css';
@import '@communityrankings/design/themes/rumble.css';   /* the site's own theme */

@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 5. Add the Tailwind preset (`tailwind.config.ts`)

```ts
import crPreset from '@communityrankings/design/tailwind-preset';

export default {
  presets: [crPreset],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    // IMPORTANT: include the package so its component classes aren't purged
    './node_modules/@communityrankings/design/src/**/*.{ts,tsx}',
  ],
};
```

Now `bg-surface-raised`, `text-muted`, `border-line`, `text-accent`,
`text-positive`, `font-serif`, `rounded-card` etc. all resolve to this site's theme.

### 6. Fonts contract (`app/layout.tsx`)

The package does **not** load fonts (next/font must run in the app). It expects
each app to expose the three faces on these exact variable names:

```tsx
import { Inter, Instrument_Serif, JetBrains_Mono } from 'next/font/google';

const sans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-serif', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

That's the whole typography fix — same three faces, same variable names, wired
identically. (While you're here on TelegramRankings, delete the leftover
Plus Jakarta Sans `@import`.)

---

## Using the components

### NetworkStrip

Drop it in above the footer on every site:

```tsx
import { NetworkStrip } from '@communityrankings/design';

// currentSiteId defaults to NEXT_PUBLIC_SITE_ID, so this is usually enough:
<NetworkStrip />
```

- Renders **all four** properties, hub first, then discord → telegram → rumble.
- The current site's card shows **"You are here"**, is non-clickable, and
  produces no self-link. Every other card is a real `<a href>` in the SSR HTML.
- Themed automatically — green on Rumble, blue on Telegram, blurple on Discord.

Footer links can come from the same registry:

```tsx
import { siblingsOf, HUB_URL } from '@communityrankings/design';

const others = siblingsOf(process.env.NEXT_PUBLIC_SITE_ID as any);
// render <a href={HUB_URL}>CommunityRankings</a> + others in the "The Network" column
```

---

## Releasing an update

```bash
# make changes, then:
npm version patch          # or minor / major — bumps package.json + tags
git push && git push --tags
```

Then in each site:

```bash
npm install github:<your-gh-user>/communityrankings-design#v0.1.1
git commit -am "chore: bump design system to v0.1.1" && git push   # triggers Netlify
```

Because sites pin a tag, updates are deliberate: nothing changes on a site until
you bump its pinned version. Roll one site first, eyeball it, then the rest.

---

## Verifying it worked

```bash
# tokens applied + accent correct per site
open http://localhost:3000   # backgrounds dark, accent = site hue

# cross-site links survive SSR (matters given the prerender history)
curl -s -A "Googlebot" https://rumblerankings.com | grep -o 'communityrankings.com'
```

Add a `/design` route to each site that renders every token swatch + the shared
components — it makes drift obvious at a glance next time you compare tabs.

---

## Migration backlog (next components to lift in)

The token layer + `NetworkStrip` prove the mechanism. Bring the rest in once
this is validated on one site, in the order the visible drift lives:

1. `NetworkStrip` ✅ (this release)
2. `SiteFooter` — the four-column footer incl. the "The Network" column
3. `StatBar` — the indexed / categories / snapshots / tracking-since row
4. `LeaderboardRow` — score in **mono** everywhere (Discord currently renders
   scores in serif italic — the biggest single inconsistency)
5. `CategoryCard` — shared shell with a data slot
6. `MethodologyBlock` — port Discord's inline weighted-component version to all

## Adding a future site

One object in `src/network.ts`, one theme file in `src/themes/`, one
`NEXT_PUBLIC_SITE_ID` value. Nothing else.
