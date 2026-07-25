import { NETWORK, resolveCurrentSiteId, type NetworkSiteId } from '../network';

export type NetworkStripProps = {
  /**
   * Which site this build is. Defaults to NEXT_PUBLIC_SITE_ID. The matching
   * card is marked "you are here" and rendered non-clickable — it is never
   * omitted and never a self-link.
   */
  currentSiteId?: NetworkSiteId;
  /** Where "How the network works →" points. Defaults to the hub. */
  howItWorksUrl?: string;
  className?: string;
};

/**
 * Server component (no "use client") so every cross-site link is a real anchor
 * present in the SSR HTML — verify with `curl -A "Googlebot" <site>`.
 */
export function NetworkStrip({
  currentSiteId,
  howItWorksUrl = 'https://communityrankings.com/how-it-works',
  className = '',
}: NetworkStripProps) {
  const current = resolveCurrentSiteId(currentSiteId);

  return (
    <section
      className={`border-t border-line py-16 ${className}`}
      aria-labelledby="cr-network-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-faint">
              The network
            </p>
            <h2
              id="cr-network-heading"
              className="font-serif text-3xl leading-tight text-primary"
            >
              Part of the{' '}
              <span className="italic text-accent">CommunityRankings</span>{' '}
              network.
            </h2>
          </div>
          <a
            href={howItWorksUrl}
            className="hidden shrink-0 font-mono text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-accent sm:inline"
          >
            How the network works →
          </a>
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {NETWORK.map((site) => {
            const isCurrent = site.id === current;

            const inner = (
              <div className="flex h-full flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span
                    aria-hidden
                    className="grid h-8 w-8 place-items-center rounded-control bg-surface-overlay font-mono text-sm text-accent"
                  >
                    {site.monogram}
                  </span>
                  {isCurrent && (
                    <span className="rounded-pill border border-line bg-surface-overlay px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                      You are here
                    </span>
                  )}
                </div>

                <p className="text-[15px]">
                  <span className="font-semibold text-primary">
                    {site.nameLead}
                  </span>
                  <span className="text-muted">{site.nameTail}</span>
                </p>

                <p className="text-sm leading-snug text-muted">{site.tagline}</p>

                {!isCurrent && (
                  <span className="mt-auto pt-1 font-mono text-xs uppercase tracking-[0.14em] text-accent">
                    Visit →
                  </span>
                )}
              </div>
            );

            const cardClass =
              'block h-full rounded-card border border-line bg-surface-raised p-5 shadow-card';

            return (
              <li key={site.id}>
                {isCurrent ? (
                  <div
                    className={`${cardClass} opacity-90`}
                    aria-current="page"
                  >
                    {inner}
                  </div>
                ) : (
                  <a
                    href={site.url}
                    className={`${cardClass} transition-colors hover:border-accent`}
                  >
                    {inner}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default NetworkStrip;
