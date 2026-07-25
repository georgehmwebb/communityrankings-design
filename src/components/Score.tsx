export type ScoreDelta = {
  /** Signed value — drives colour: > 0 green (up), < 0 red (down), 0 muted. */
  value: number;
  /**
   * The coloured display text the site already shows, e.g. "-2.4%" or "+74".
   * If omitted, the signed value is rendered. This is where each site keeps its
   * own delta meaning/format (percentage vs rank change) — the component never
   * reinterprets it, it only colours it.
   */
  label?: string;
  /** Muted trailing text shown after the delta, e.g. "7d". */
  suffix?: string;
};

export type ScoreProps = {
  /** The composite score, e.g. 89.14. A pre-formatted string is fine too. */
  value: number | string;
  delta?: ScoreDelta;
  /** 'lg' = big main-list score; 'sm' = compact hero/widget score. */
  size?: 'sm' | 'lg';
  /**
   * 'stacked' = score above delta, right-aligned (main leaderboard list).
   * 'inline'  = delta then score on one line (compact hero widget).
   */
  layout?: 'stacked' | 'inline';
  className?: string;
};

const SCORE_SIZE = {
  lg: 'text-3xl',
  sm: 'text-lg',
} as const;

const DELTA_SIZE = {
  lg: 'text-xs',
  sm: 'text-[11px]',
} as const;

function deltaColour(value: number): string {
  if (value > 0) return 'text-positive';
  if (value < 0) return 'text-negative';
  return 'text-faint';
}

function DeltaText({ delta, size }: { delta: ScoreDelta; size: 'sm' | 'lg' }) {
  const text =
    delta.label ?? (delta.value > 0 ? `+${delta.value}` : `${delta.value}`);
  return (
    <span className={`font-mono tabular-nums ${DELTA_SIZE[size]}`}>
      <span className={deltaColour(delta.value)}>{text}</span>
      {delta.suffix ? (
        <span className="ml-1 text-faint">{delta.suffix}</span>
      ) : null}
    </span>
  );
}

/**
 * Shared score display for every site in the network. Renders the composite
 * score in mono + tabular-nums in the site's accent colour, with the delta in
 * green (up) / red (down) / muted (zero). Server component (no "use client").
 *
 * The score typography and delta colour are standardised network-wide; the
 * delta's UNITS stay per-site (pass them via delta.label / delta.suffix).
 */
export function Score({
  value,
  delta,
  size = 'lg',
  layout = 'stacked',
  className = '',
}: ScoreProps) {
  const scoreEl = (
    <span
      className={`font-mono tabular-nums leading-none text-accent ${SCORE_SIZE[size]}`}
    >
      {value}
    </span>
  );

  if (layout === 'inline') {
    return (
      <span className={`inline-flex items-baseline gap-2 ${className}`}>
        {delta ? <DeltaText delta={delta} size={size} /> : null}
        {scoreEl}
      </span>
    );
  }

  return (
    <span className={`inline-flex flex-col items-end gap-1 ${className}`}>
      {scoreEl}
      {delta ? <DeltaText delta={delta} size={size} /> : null}
    </span>
  );
}

export default Score;
