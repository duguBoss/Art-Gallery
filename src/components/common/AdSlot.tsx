/**
 * Ad slot — master plan §30. Rules honored here:
 *  - clearly labeled, never disguised as content;
 *  - never interrupts the reading column (placed between sections);
 *  - static placeholder until a real network id is configured.
 * Ads are optional income; knowledge never sits behind them.
 */
export function AdSlot({
  variant = 'inline',
  className = '',
}: {
  variant?: 'inline' | 'footer' | 'search' | 'mobile';
  className?: string;
}) {
  const height = variant === 'footer' ? 'h-24' : variant === 'mobile' ? 'h-20 md:hidden' : 'h-28';
  return (
    <aside
      aria-label="advertisement"
      className={`my-12 flex ${height} items-center justify-center border border-dashed border-ink/15 bg-paper-card/60 ${className}`}
    >
      <span className="eyebrow">广告 · Advertisement</span>
    </aside>
  );
}
