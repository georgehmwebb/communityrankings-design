/**
 * CommunityRankings shared Tailwind preset (v3).
 *
 * Add to each site's tailwind.config.ts:
 *   import crPreset from '@communityrankings/design/tailwind-preset'
 *   export default { presets: [crPreset], content: [...] }
 *
 * Colours map to the CSS variables defined in tokens.css, so utilities like
 * `bg-surface-raised` / `text-muted` / `border-line` resolve to the current
 * site's theme automatically. Fonts reference the --font-* variables that each
 * app must expose via next/font (see README).
 *
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: 'var(--surface-base)',
          raised: 'var(--surface-raised)',
          overlay: 'var(--surface-overlay)',
        },
        line: {
          DEFAULT: 'var(--line-subtle)',
          strong: 'var(--line-strong)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)',
          fg: 'var(--accent-fg)',
        },
        primary: 'var(--text-primary)',
        muted: 'var(--text-muted)',
        faint: 'var(--text-faint)',
        positive: 'var(--positive)',
        negative: 'var(--negative)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'ui-serif', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      borderRadius: {
        card: 'var(--radius-card)',
        control: 'var(--radius-control)',
        pill: 'var(--radius-pill)',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
      },
      borderColor: {
        DEFAULT: 'var(--line-subtle)',
      },
    },
  },
}
