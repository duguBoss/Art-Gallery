import type { ReactNode } from 'react';
import { Link } from '../../router/router';

/** Editorial section heading: small eyebrow, serif title, standfirst, optional link. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  to,
  toLabel,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  to?: string;
  toLabel?: string;
}) {
  return (
    <div className="mb-10 flex flex-col gap-4 border-b border-ink/10 pb-6 md:mb-14 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {eyebrow && <div className="eyebrow mb-3">{eyebrow}</div>}
        <h2 className="text-display-md text-balance">{title}</h2>
        {lead && <p className="mt-3 text-base leading-relaxed text-ink-soft">{lead}</p>}
      </div>
      {to && (
        <Link to={to} className="link-editorial shrink-0 text-sm">
          {toLabel ?? '查看全部'} →
        </Link>
      )}
    </div>
  );
}

export function IndexLabel({ n, label }: { n: string | number; label?: ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <span className="index-num tabular">{String(n).padStart(2, '0')}</span>
      <span className="h-px w-8 bg-ink/25" />
      {label && <span className="eyebrow">{label}</span>}
    </div>
  );
}
