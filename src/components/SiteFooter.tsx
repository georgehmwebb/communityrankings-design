export type FooterLink = { label: string; href: string };
export type FooterColumn = { heading: string; links: FooterLink[] };

export type SiteFooterProps = {
  brand: {
    /** Bold leading segment, e.g. "Rumble". */
    lead: string;
    /** Muted trailing segment, e.g. "Rankings". */
    tail: string;
    blurb: string;
    monogram?: string;
  };
  /**
   * Each site passes its OWN columns (browse / methodology / network / connect).
   * Link lists are legitimately different per site (categories, methodology
   * sub-pages, the network column from the registry) and are NOT homogenised —
   * the shell only standardises layout, typography and spacing.
   */
  columns: FooterColumn[];
  /** e.g. "© 2026 RumbleRankings · … · Not affiliated with Rumble Inc." */
  bottomLeft: string;
  /** e.g. "Methodology v3.3 · Build … · Sync daily 04:00 UTC" */
  bottomRight?: string;
  className?: string;
};

/**
 * Shared footer shell for every site. Server component (no "use client") so all
 * links are real anchors in the SSR HTML. Uses `cr-container` so its width
 * matches the rest of the page.
 */
export function SiteFooter({
  brand,
  columns,
  bottomLeft,
  bottomRight,
  className = '',
}: SiteFooterProps) {
  return (
    <footer className={`border-t border-line ${className}`}>
      <div className="cr-container py-14">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          <div className="lg:w-72 lg:shrink-0">
            {brand.monogram ? (
              <span className="mb-3 inline-grid h-8 w-8 place-items-center rounded-control bg-surface-overlay font-mono text-sm text-accent">
                {brand.monogram}
              </span>
            ) : null}
            <p className="text-[15px]">
              <span className="font-semibold text-primary">{brand.lead}</span>
              <span className="text-muted">{brand.tail}</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              {brand.blurb}
            </p>
          </div>

          <div className="grid flex-1 gap-8 [grid-template-columns:repeat(auto-fit,minmax(140px,1fr))]">
            {columns.map((col, i) => (
              <nav key={i} aria-label={col.heading}>
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
                  {col.heading}
                </p>
                <ul className="space-y-2">
                  {col.links.map((l, j) => (
                    <li key={j}>
                      <a
                        href={l.href}
                        className="text-sm text-muted transition-colors hover:text-accent"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-faint sm:flex-row sm:items-center sm:justify-between">
          <span>{bottomLeft}</span>
          {bottomRight ? <span>{bottomRight}</span> : null}
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
