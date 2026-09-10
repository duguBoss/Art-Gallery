import type { AnalysisBlock } from '../../model/entity';
import { useLang } from '../../i18n/LanguageContext';

/**
 * Renders the discipline-specific analysis sequence (master plan §13).
 * Blocks are authored per work — painting reads composition → color →
 * light → brushwork; architecture reads site → plan → structure.
 */
export function DetailAnalysis({ blocks }: { blocks: AnalysisBlock[] }) {
  const { t } = useLang();
  return (
    <div className="space-y-16">
      {blocks.map((b, i) => (
        <section key={b.id} className="grid gap-6 md:grid-cols-12">
          {/* block label rail */}
          <div className="md:col-span-3">
            <div className="flex items-center gap-3 md:sticky md:top-24">
              <span className="index-num tabular">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="font-serif text-xl text-ink md:text-2xl">{t(b.title)}</h3>
            </div>
          </div>

          <div className="md:col-span-9">
            {b.kind === 'text' && b.body && (
              <p className="max-w-measure text-lg leading-relaxed text-ink-soft">{t(b.body)}</p>
            )}

            {b.kind === 'quote' && b.body && <p className="pull-quote">{t(b.body)}</p>}

            {b.kind === 'list' && b.items && (
              <ul className="space-y-3">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-4 border-b border-paper-edge pb-3 text-base text-ink-soft">
                    <span className="index-num mt-1.5 tabular">{j + 1}</span>
                    <span className="leading-relaxed">{t(it)}</span>
                  </li>
                ))}
              </ul>
            )}

            {b.kind === 'process' && (
              <div>
                {b.body && <p className="mb-6 max-w-measure text-lg leading-relaxed text-ink-soft">{t(b.body)}</p>}
                {b.items && (
                  <ol className="space-y-0">
                    {b.items.map((it, j) => (
                      <li key={j} className="flex items-baseline gap-4 border-t border-ink/15 py-4">
                        <span className="index-num tabular">{String(j + 1).padStart(2, '0')}</span>
                        <span className="font-serif text-xl text-ink">{t(it)}</span>
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            )}

            {(b.kind === 'image' || b.kind === 'annotation') && b.image && (
              <figure className="space-y-4">
                <div className="relative overflow-hidden bg-paper-deep">
                  <img src={b.image.url} alt="" loading="lazy" className="w-full" />
                  {b.markers?.map((mk, j) => (
                    <div
                      key={j}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${mk.x}%`, top: `${mk.y}%` }}
                    >
                      <span className="block h-3.5 w-3.5 rounded-full border-2 border-paper bg-cinnabar" />
                      <span className="absolute left-5 top-1/2 w-44 -translate-y-1/2 border border-ink/15 bg-paper/95 px-2.5 py-1.5 text-xs leading-snug text-ink shadow-sm">
                        {t(mk.label)}
                      </span>
                    </div>
                  ))}
                </div>
                {b.body && <figcaption className="max-w-measure text-base leading-relaxed text-ink-soft">{t(b.body)}</figcaption>}
              </figure>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
