import { useMemo } from 'react';
import type { Entity } from '../../content/kb';
import { neighbors } from '../../content/kb';
import { useLang } from '../../i18n/LanguageContext';
import { useRouter } from '../../router/router';
import { entityPath } from '../../router/router';

const W = 760;
const H = 620;
const CX = W / 2;
const CY = H / 2;
const R = 230;

/**
 * Radial relation graph (master plan §23). Relations are first-class
 * data: this reads the same kb graph as entity pages, rendered as a
 * constellation centered on one entity. Deterministic layout — no
 * physics engine needed at this scale.
 */
export function NetworkGraph({ center, max = 14 }: { center: Entity; max?: number }) {
  const { t } = useLang();
  const { navigate } = useRouter();

  const nodes = useMemo(() => {
    const ns = neighbors(center.id).slice(0, max);
    return ns.map((n, i) => {
      const angle = (i / Math.max(ns.length, 1)) * Math.PI * 2 - Math.PI / 2;
      return {
        ...n,
        x: CX + R * Math.cos(angle),
        y: CY + R * Math.sin(angle) * 0.82,
      };
    });
  }, [center.id, max]);

  const go = (e: Entity) => navigate(entityPath(e));

  return (
    <div className="overflow-hidden border border-paper-edge bg-paper-card">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
        {/* edges */}
        {nodes.map(n => (
          <line
            key={`e-${n.entity.id}`}
            x1={CX}
            y1={CY}
            x2={n.x}
            y2={n.y}
            stroke="#1a1815"
            strokeOpacity={0.18}
            strokeWidth={1}
          />
        ))}
        {/* satellites */}
        {nodes.map(n => {
          const label = t(n.entity.name);
          const left = n.x < CX;
          return (
            <g
              key={n.entity.id}
              className="cursor-pointer"
              onClick={() => go(n.entity)}
            >
              <circle cx={n.x} cy={n.y} r={6} fill="#f7f4ec" stroke="#1a1815" strokeWidth={1.2} />
              <text
                x={n.x + (left ? -12 : 12)}
                y={n.y + 4}
                textAnchor={left ? 'end' : 'start'}
                className="fill-ink font-serif"
                fontSize={15}
              >
                {label.length > 12 ? label.slice(0, 11) + '…' : label}
              </text>
            </g>
          );
        })}
        {/* center */}
        <g className="cursor-pointer" onClick={() => go(center)}>
          <circle cx={CX} cy={CY} r={34} fill="#1a1815" />
          <text
            x={CX}
            y={CY + 5}
            textAnchor="middle"
            className="fill-paper font-serif"
            fontSize={15}
            fontWeight={600}
          >
            {t(center.name).slice(0, 6)}
          </text>
        </g>
      </svg>
      <p className="border-t border-paper-edge px-4 py-2.5 text-center text-[11px] text-ink-mute">
        点击任意节点漫游关系网络 · Click any node to wander the graph
      </p>
    </div>
  );
}
