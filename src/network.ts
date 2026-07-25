/**
 * The CommunityRankings network — single source of truth.
 *
 * Every site in the network renders its cross-links from THIS array, so the set
 * of properties, their order, names and taglines are identical everywhere and
 * adding a future site is a one-line change here.
 */

export type NetworkSiteId = 'hub' | 'discord' | 'telegram' | 'rumble';

export type NetworkSite = {
  id: NetworkSiteId;
  /** Bold-weight leading segment of the wordmark, e.g. "Discord". */
  nameLead: string;
  /** Muted trailing segment of the wordmark, e.g. "Rankings". */
  nameTail: string;
  url: string;
  /** ONE canonical tagline per site — no per-site variants. */
  tagline: string;
  /** Single-letter monogram shown in the card's badge. */
  monogram: string;
  isHub: boolean;
};

export const NETWORK: NetworkSite[] = [
  {
    id: 'hub',
    nameLead: 'Community',
    nameTail: 'Rankings',
    url: 'https://communityrankings.com',
    tagline: 'Find your community on Discord, Telegram or Rumble.',
    monogram: 'C',
    isHub: true,
  },
  {
    id: 'discord',
    nameLead: 'Discord',
    nameTail: 'Rankings',
    url: 'https://discord-rankings.com',
    tagline: 'The Discord servers worth joining.',
    monogram: 'D',
    isHub: false,
  },
  {
    id: 'telegram',
    nameLead: 'Telegram',
    nameTail: 'Rankings',
    url: 'https://telegramrankings.com',
    tagline: 'The Telegram channels worth following.',
    monogram: 'T',
    isHub: false,
  },
  {
    id: 'rumble',
    nameLead: 'Rumble',
    nameTail: 'Rankings',
    url: 'https://rumblerankings.com',
    tagline: 'The Rumble creators worth watching.',
    monogram: 'R',
    isHub: false,
  },
];

/** URL of the hub, for footer "back to hub" links etc. */
export const HUB_URL =
  NETWORK.find((s) => s.isHub)?.url ?? 'https://communityrankings.com';

/** The site the current build represents, if resolvable from the environment. */
export function resolveCurrentSiteId(
  explicit?: NetworkSiteId,
): NetworkSiteId | undefined {
  if (explicit) return explicit;
  const fromEnv = process.env.NEXT_PUBLIC_SITE_ID as NetworkSiteId | undefined;
  return fromEnv;
}

/** Every site except the current one — handy for footer link lists. */
export function siblingsOf(currentId?: NetworkSiteId): NetworkSite[] {
  return NETWORK.filter((s) => s.id !== currentId);
}
