// Components
export { NetworkStrip, default as NetworkStripDefault } from './components/NetworkStrip';
export type { NetworkStripProps } from './components/NetworkStrip';

export { Score, default as ScoreDefault } from './components/Score';
export type { ScoreProps, ScoreDelta } from './components/Score';

export { StatBar, default as StatBarDefault } from './components/StatBar';
export type { StatBarProps, Stat } from './components/StatBar';

export { SiteFooter, default as SiteFooterDefault } from './components/SiteFooter';
export type { SiteFooterProps, FooterColumn, FooterLink } from './components/SiteFooter';

// Registry + helpers
export {
  NETWORK,
  HUB_URL,
  resolveCurrentSiteId,
  siblingsOf,
} from './network';
export type { NetworkSite, NetworkSiteId } from './network';
