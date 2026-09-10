import type { Entity } from '../../content/kb';
import { getByType } from '../../content/kb';
import { useLang } from '../../i18n/LanguageContext';
import { Link, entityPath } from '../../router/router';

const W = 1000;
const H = 500;
const project = (lat: number, lng: number) => ({
  x: ((lng + 180) / 360) * W,
  y: ((90 - lat) / 180) * H,
});

/**
 * Minimal equirectangular map (master plan §12 map mode). Graticule +
 * geo-located entities (places, buildings). No tile provider needed.
 */
export function MapView({ items }: { items?: Entity[] }) {
  const { t, lang } = useLang();
  const places = items ?? getByType('place');
  const located = places
    .map(e => ({ e, geo: (e as { geo?: { lat: number; lng: number } }).geo }))
    .filter((x): x is { e: Entity; geo: { lat: number; lng: number } } => !!x.geo);

  return (
    <div className="overflow-hidden border border-paper-edge bg-paper-card">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
        {/* graticule */}
        {[150, 250, 350].map(y => (
          <line key={y} x1={0} y1={y} x2={W} y2={y} stroke="#1a1815" strokeOpacity={0.07} />
        ))}
        {[200, 400, 600, 800].map(x => (
          <line key={x} x1={x} y1={0} x2={x} y2={H} stroke="#1a1815" strokeOpacity={0.07} />
        ))}
        {located.map(({ e, geo }) => {
          const { x, y } = project(geo.lat, geo.lng);
          return (
            <g key={e.id} className="cursor-pointer">
              <Link to={entityPath(e)}>
                <circle cx={x} cy={y} r={14} fill="#b3402a" fillOpacity={0.12} />
                <circle cx={x} cy={y} r={4.5} fill="#b3402a" />
                <text x={x + 10} y={y + 4} className="fill-ink font-serif" fontSize={14}>
                  {t(e.name)}
                </text>
              </Link>
            </g>
          );
        })}
      </svg>
      <p className="border-t border-paper-edge px-4 py-2.5 text-center text-[11px] text-ink-mute">
        {located.length} {lang === 'zh' ? '个地点标注于等距矩形投影' : 'locations on equirectangular projection'}
      </p>
    </div>
  );
}
