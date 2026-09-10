import { getByType, PERIODS } from '../content/kb';
import { useLang } from '../i18n/LanguageContext';
import { loc } from '../model';
import { TimelineView } from '../components/exhibition/TimelineView';
import { MapView } from '../components/exhibition/MapView';
import { EntityLine } from '../components/common/EntityCard';
import { SectionHeading } from '../components/common/SectionHeading';

const fmt = (y: number) => (y < 0 ? `前${Math.abs(y)}` : `${y}`);

export function ExplorePage() {
  const { t } = useLang();
  const places = getByType('place');
  const cultures = getByType('culture');

  return (
    <div className="animate-fade-up">
      <header className="wrap pt-16 md:pt-24">
        <div className="eyebrow mb-4">Explore</div>
        <h1 className="text-display-lg">{t(loc('多维度探索', 'Explore by dimension'))}</h1>
        <p className="mt-5 max-w-2xl text-xl leading-relaxed text-ink-soft">
          {t(loc('同一段知识可以按时间、地点、文化与材料四个维度切分——选你今天感兴趣的那条轴。',
            'The same knowledge sliced four ways: time, place, culture, matter. Pick today’s axis.'))}
        </p>
      </header>

      {/* Time */}
      <section className="mt-20">
        <div className="wrap">
          <SectionHeading
            eyebrow={t(loc('维度 · 时间', 'Dimension · Time'))}
            title={t(loc('时间轴：从公元前 447 年到今天', 'Timeline: 447 BCE to today'))}
          />
          <TimelineView limit={30} />
        </div>
      </section>

      {/* Periods */}
      <section className="wrap mt-20">
        <SectionHeading eyebrow={t(loc('维度 · 时期', 'Dimension · Period'))} title={t(loc('历史时期', 'Historical periods'))} />
        <div className="grid gap-px border border-paper-edge bg-paper-edge md:grid-cols-2">
          {PERIODS.map(p => (
            <a key={p.id} href={`#/entity/period/${p.slug}`}
              className="group grid grid-cols-[7rem_1fr] items-baseline gap-4 bg-paper px-6 py-5 transition-colors hover:bg-paper-card">
              <span className="font-mono text-xs text-ink-mute tabular">
                {fmt(p.yearStart)}{p.yearEnd ? `–${fmt(p.yearEnd)}` : '–'}
              </span>
              <span>
                <span className="font-serif text-2xl transition-colors group-hover:text-cinnabar-deep">{t(p.name)}</span>
                <span className="mt-1 block line-clamp-1 text-sm text-ink-mute">{t(p.summary)}</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Map */}
      <section className="wrap mt-20">
        <SectionHeading
          eyebrow={t(loc('维度 · 地点', 'Dimension · Place'))}
          title={t(loc('地图：作品发生的地方', 'Map: where things happened'))}
        />
        <MapView items={places} />
      </section>

      {/* Cultures */}
      <section className="wrap mt-20">
        <SectionHeading eyebrow={t(loc('维度 · 文化', 'Dimension · Culture'))} title={t(loc('文化传统', 'Cultural traditions'))} />
        <div>
          {cultures.map((c, i) => <EntityLine key={c.id} e={c} index={i} />)}
        </div>
      </section>
    </div>
  );
}
