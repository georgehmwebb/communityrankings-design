// Components
export { NetworkStrip, default as NetworkStripDefault } from './components/NetworkStrip';
export type { NetworkStripProps } from './components/NetworkStrip';

// Registry + helpers
export {
  NETWORK,
  HUB_URL,
  resolveCurrentSiteId,
  siblingsOf,
} from './network';
export type { NetworkSite, NetworkSiteId } from './network';
