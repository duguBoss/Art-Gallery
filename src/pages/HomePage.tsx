import { useState } from 'react';
import { ArrowRight, Shuffle } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext';
import { Link } from '../router/router';
import { scene } from '../lib/urls';
import {
  ALL, featured, getById, randomEntity, LESSONS, PRACTICES, PRODUCTS, EXHIBITIONS,
} from '../content/kb';
import { loc } from '../model';
import { SectionHeading } from '../components/common/SectionHeading';
import { EntityFigure, EntityText, EntityLine } from '../components/common/EntityCard';
import { AtlasView } from '../components/exhibition/AtlasView';
import { TimelineView } from '../components/exhibition/TimelineView';
import { NetworkGraph } from '../components/exhibition/NetworkGraph';
import { AdSlot } from '../components/common/AdSlot';

export function HomePage() {
  const { t, u } = useLang();

  // Today's discovery — one weighted-random entity, resamplable
  const [discovery, setDiscovery] = useState(() =>
    randomEntity(e => !!e.image && !!e.summary && (e.weight ?? 0) >= 80),
  );
  const rediscovery = () =>
    setDiscovery(randomEntity(e => !!e.image && !!e.summary && (e.weight ?? 0) >= 70 && e.id !== discovery.id));

  const exhibitions = EXHIBITIONS.slice().sort((a, b) => (b.weight ?? 0) - (a.weight ?? 0));
  const featuredWorks = featured(undefined, 5);
  const lessons = LESSONS.slice().sort((a, b) => a.order - b.order).slice(0, 4);
  const practices = PRACTICES.slice(0, 3);

  return (
    <div className="animate-fade-up">
      {/* ====================================================== 1. HERO */}
      <section className="wrap pt-16 md:pt-24">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <div className="eyebrow mb-6">{u('home.heroKicker')}</div>
            <h1 className="text-display-xl whitespace-pre-line text-balance">
              {u('home.heroTitle')}
            </h1>
            <p className="mt-8 max-w-xl text-xl leading-relaxed text-ink-soft">{u('home.heroLead')}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/gallery" className="btn-primary">
                {u('home.heroCta1')} <ArrowRight size={15} />
              </Link>
              <Link to="/knowledge" className="btn-ghost">{u('nav.knowledge')}</Link>
            </div>
            <div className="mt-12 flex items-center gap-6 border-t border-ink/10 pt-6 text-sm text-ink-mute">
              <span><strong className="font-serif text-2xl text-ink">{ALL.length}+</strong> {t(loc('个知识条目', 'entries'))}</span>
              <span><strong className="font-serif text-2xl text-ink">14</strong> {t(loc('个知识域', 'domains'))}</span>
              <span><strong className="font-serif text-2xl text-cinnabar">{t(loc('免费', 'free'))}</strong></span>
            </div>
          </div>
          <div className="md:col-span-5">
            <figure>
              <div className="overflow-hidden bg-paper-deep">
                <img
                  src={scene('louvre_hall.jpg')}
                  alt="Museum hall"
                  className="aspect-[3/4] w-full object-cover"
                />
              </div>
              <figcaption className="mt-3 text-xs leading-relaxed text-ink-mute">
                {t(loc('像走进一座没有闭馆时间的博物馆。', 'A museum that never closes.'))}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ============================================== 2. TODAY'S DISCOVERY */}
      <section className="wrap mt-24 md:mt-32">
        <SectionHeading
          eyebrow={u('home.todayKicker')}
          title={t(discovery.name)}
          lead={t(discovery.summary)}
          to={discovery.type === 'exhibition' ? `/exhibition/${discovery.slug}` : `/entity/${discovery.type}/${discovery.slug}`}
          toLabel={u('common.readMore')}
        />
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          {discovery.image && (
            <figure className="md:col-span-7">
              <div className="overflow-hidden bg-paper-deep">
                <img src={discovery.image.url} alt={t(discovery.image.caption) || t(discovery.name)}
                  className="max-h-[70vh] w-full object-cover" />
              </div>
              {discovery.image.caption && (
                <figcaption className="mt-3 text-xs text-ink-mute">{t(discovery.image.caption)}</figcaption>
              )}
            </figure>
          )}
          <div className="flex flex-col justify-between md:col-span-5">
            <div>
              <div className="eyebrow mb-4">{t(discovery.tagline ?? loc('策展推荐', 'Curator’s pick'))}</div>
              {discovery.body?.[0] && (
                <p className="font-serif text-2xl leading-snug text-ink">{t(discovery.body[0])}</p>
              )}
            </div>
            <button onClick={rediscovery} className="btn-ghost mt-10 self-start">
              <Shuffle size={15} /> {u('home.surprise')}
            </button>
          </div>
        </div>
      </section>

      {/* ============================================== 3. VISUAL JOURNEY (network) */}
      <section className="mt-24 bg-paper-deep py-20 md:mt-32">
        <div className="wrap">
          <SectionHeading
            eyebrow={u('home.journeyTitle')}
            title={t(loc('从一件作品走向整个世界', 'From one work to the whole world'))}
            lead={u('home.journeyLead')}
            to="/entity/work/david"
            toLabel={u('common.readMore')}
          />
          <NetworkGraph center={getById('work-david')!} max={13} />
        </div>
      </section>

      {/* ============================================== 4. KNOWLEDGE ATLAS */}
      <section className="wrap mt-24 md:mt-32">
        <SectionHeading
          eyebrow={u('home.atlasTitle')}
          title={t(loc('十四个知识域，同一张地图', 'Fourteen domains, one map'))}
          lead={u('home.atlasLead')}
          to="/knowledge"
          toLabel={u('nav.knowledge')}
        />
        <AtlasView />
      </section>

      {/* ============================================== 5. TIMELINE */}
      <section className="mt-24 md:mt-32">
        <div className="wrap">
          <SectionHeading
            eyebrow={u('home.timelineTitle')}
            title={t(loc('三千年，一条轴', 'Three millennia on one axis'))}
            to="/explore"
            toLabel={u('nav.explore')}
          />
        </div>
        <div className="wrap">
          <TimelineView limit={20} />
        </div>
      </section>

      {/* ============================================== 6. CROSS-DISCIPLINE */}
      <section className="wrap mt-24 md:mt-32">
        <SectionHeading
          eyebrow={u('home.connectionsTitle')}
          title={t(loc('“光”连接的五件事', 'Five things “light” connects'))}
          lead={t(loc('同一个概念贯穿绘画、建筑、电影与界面——这正是图谱存在的理由。',
            'One concept runs through painting, architecture, cinema and interface — why the graph exists.'))}
          to="/exhibition/the-light-travels"
          toLabel={t(loc('看完整策展', 'See the full exhibition'))}
        />
        <div className="grid gap-8 md:grid-cols-4">
          {['c-light', 'work-calling-matthew', 'building-bauhaus-dessau', 'atom-rim-light'].map(id => (
            <EntityText key={id} e={getById(id)!} />
          ))}
        </div>
      </section>

      <AdSlot variant="inline" />

      {/* ============================================== 7. FEATURED EXHIBITIONS */}
      <section className="wrap mt-20 md:mt-28">
        <SectionHeading
          eyebrow={u('home.exhibitionTitle')}
          title={t(loc('策展不是陈列，是论证', 'Exhibitions are arguments, not displays'))}
        />
        <div className="space-y-px border border-paper-edge bg-paper-edge">
          {exhibitions.map((ex, i) => (
            <Link key={ex.id} to={`/exhibition/${ex.slug}`}
              className="group grid gap-6 bg-paper p-8 transition-colors hover:bg-paper-card md:grid-cols-12 md:items-center md:gap-10 md:p-12">
              <span className="font-serif text-6xl text-ink/15 tabular md:col-span-1">{String(i + 1).padStart(2, '0')}</span>
              <div className="md:col-span-7">
                <h3 className="font-serif text-3xl leading-tight transition-colors group-hover:text-cinnabar-deep md:text-4xl">
                  {t(ex.name)}
                </h3>
                <p className="mt-3 max-w-xl leading-relaxed text-ink-soft">{t(ex.summary)}</p>
              </div>
              {ex.image && (
                <div className="overflow-hidden bg-paper-deep md:col-span-4">
                  <img src={ex.image.url} alt="" loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* ============================================== 8. GALLERY preview */}
      <section className="wrap mt-24 md:mt-32">
        <SectionHeading
          eyebrow={u('nav.gallery')}
          title={t(loc('墙上的作品', 'Works on the wall'))}
          to="/gallery"
          toLabel={u('common.viewAll')}
        />
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {featuredWorks.map((e, i) => <EntityFigure key={e.id} e={e} index={i} />)}
        </div>
      </section>

      {/* ============================================== 9. LEARN */}
      <section className="mt-24 bg-ink py-20 text-paper md:mt-32">
        <div className="wrap">
          <div className="mb-12 flex flex-col gap-4 border-b border-paper/20 pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="eyebrow mb-3 !text-paper/50">{u('home.learnTitle')}</div>
              <h2 className="font-serif text-4xl md:text-5xl">
                {t(loc('学习像逛博物馆，而不是逛课程市场', 'Learn like a museum, not a course marketplace'))}
              </h2>
            </div>
            <Link to="/learn" className="text-sm text-paper/70 underline-offset-4 hover:text-paper hover:underline">
              {u('common.viewAll')} →
            </Link>
          </div>
          <div className="grid gap-px bg-paper/15 md:grid-cols-2">
            {lessons.map(l => (
              <Link key={l.id} to={`/entity/lesson/${l.slug}`}
                className="group bg-ink p-8 transition-colors hover:bg-[#26231e]">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-xs text-paper/40 tabular">
                    {l.path === 'foundations' ? 'F' : l.path === 'history' ? 'H' : 'D'}{String(l.order).padStart(2, '0')}
                  </span>
                  <span className="text-xs text-paper/40">{l.durationMin} {u('common.minutes')}</span>
                </div>
                <h3 className="mt-4 font-serif text-2xl leading-tight text-paper transition-colors group-hover:text-ochre-light">
                  {t(l.name)}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-paper/60">{t(l.summary)}</p>
              </Link>
            ))}
          </div>
          <p className="mt-6 text-sm text-paper/50">{u('common.knowledgeFree')} · {t(loc('没有付费墙，没有结业证书，只有好内容。', 'No paywalls, no certificates — just good content.'))}</p>
        </div>
      </section>

      {/* ============================================== 10. PRACTICE */}
      <section className="wrap mt-24 md:mt-32">
        <SectionHeading
          eyebrow={u('home.practiceTitle')}
          title={t(loc('眼睛会了，手也要会', 'The eye learns; so must the hand'))}
          lead={t(loc('十分钟到半小时的小练习，每一个都连着具体作品。', 'Ten-to-thirty-minute exercises, each tied to real works.'))}
          to="/practice"
          toLabel={u('common.viewAll')}
        />
        <div>
          {practices.map((p, i) => (
            <EntityLine key={p.id} e={p} index={i}
              meta={`${p.minutes} ${u('common.minutes')}`} />
          ))}
        </div>
      </section>

      {/* ============================================== 11. PRODUCTS */}
      <section className="wrap mt-24 md:mt-32">
        <SectionHeading
          eyebrow={u('home.productsTitle')}
          title={t(loc('为创作者省下的十小时', 'Ten saved hours for makers'))}
          lead={u('home.productsNote')}
          to="/products"
          toLabel={u('nav.products')}
        />
        <div className="grid gap-8 md:grid-cols-4">
          {PRODUCTS.map(p => (
            <Link key={p.id} to={`/entity/product/${p.slug}`}
              className="group flex flex-col border border-paper-edge bg-paper-card p-6 transition-colors hover:border-ink/40">
              <span className="eyebrow">{t(p.category)}</span>
              <h3 className="mt-3 font-serif text-2xl leading-snug transition-colors group-hover:text-cinnabar-deep">
                {t(p.name)}
              </h3>
              <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-soft">{t(p.summary)}</p>
              <span className="mt-5 font-serif text-3xl">¥{p.priceCny}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ============================================== 12. SUPPORT band */}
      <section className="mt-24 md:mt-32">
        <div className="wrap">
          <div className="border border-ink bg-paper-deep px-8 py-16 text-center md:py-20">
            <div className="eyebrow mb-4">{u('home.supportTitle')}</div>
            <h2 className="mx-auto max-w-3xl text-display-md text-balance">
              {t(loc('知识永远免费。\n如果它帮到了你，帮它活下去。',
                'Knowledge stays free forever.\nIf it helped you, help it survive.'))}
            </h2>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to="/support" className="btn-primary">{u('nav.support')} <ArrowRight size={15} /></Link>
              <Link to="/about" className="btn-ghost">{u('nav.about')}</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
