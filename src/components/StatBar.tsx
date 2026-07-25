export type Stat = {
  /** The figure, e.g. "813", "21,009", "4.4M+", "Jul 2026". Pass the live value. */
  value: string;
  /** e.g. "Channels indexed". */
  label: string;
  /** Small sub-note, e.g. "daily 04:00 UTC", "and counting". */
  note?: string;
};

export type StatBarProps = {
  /** Usually four. Values stay per-site (they're live figures); only the
   *  typography and ordering are standardised. */
  stats: Stat[];
  className?: string;
};

/**
 * Shared stat strip. Number-first everywhere (value on top, label below) — this
 * standardises Telegram, which previously put the label above the number.
 * Server component (no "use client").
 */
export function StatBar({ stats, className = '' }: StatBarProps) {
  return (
    <div
      className={`grid grid-cols-2 rounded-card border border-line divide-line sm:grid-cols-4 sm:divide-x ${className}`}
    >
      {stats.map((s, i) => (
        <div key={i} className="p-5">
          <div className="font-mono tabular-nums text-3xl leading-none text-primary">
            {s.value}
          </div>
          <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            {s.label}
          </div>
          {s.note ? <div className="mt-1 text-xs text-faint">{s.note}</div> : null}
        </div>
      ))}
    </div>
  );
}

export default StatBar;
