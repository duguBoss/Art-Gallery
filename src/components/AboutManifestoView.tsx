import React from 'react';
import { ShieldAlert, CheckCircle2 } from 'lucide-react';
import { playSpotlightClick } from '../utils/audio';
import { useLanguage } from '../context/LanguageContext';

interface AboutManifestoViewProps {
  onExploreArchive: () => void;
}

export const AboutManifestoView: React.FC<AboutManifestoViewProps> = ({
  onExploreArchive,
}) => {
  const { lang, t } = useLanguage();

  const systemFlow = [
    { label: lang === 'zh' ? '01 光影几何 (LIGHT)' : 'LIGHT', desc: t('about.step1') },
    { label: lang === 'zh' ? '02 色彩色谱 (COLOR)' : 'COLOR', desc: t('about.step2') },
    { label: lang === 'zh' ? '03 空间透视 (SPACE)' : 'SPACE', desc: t('about.step3') },
    { label: lang === 'zh' ? '04 光学句法 (CAMERA)' : 'CAMERA', desc: t('about.step4') },
    { label: lang === 'zh' ? '05 运镜动量 (MOVEMENT)' : 'MOVEMENT', desc: t('about.step5') },
    { label: lang === 'zh' ? '06 心理共鸣 (EMOTION)' : 'EMOTION', desc: t('about.step6') },
  ];

  const antiAiRulesZh = [
    '严禁紫蓝渐变与廉价的霓虹色差 (Chromatic Aberration)。',
    '严禁拟物毛玻璃、悬浮模糊卡片与伪 3D 悬浮球体。',
    '严禁通用 Pinterest 风格的无意义瀑布流图片堆砌。',
    '严禁缺乏语义目的的虚假科幻 HUD 仪表盘。',
    '恪守严格的瑞士国际 12 栏排版网格与发丝细线 (0.14 浅透明度)。',
    '极度克制的美学调色：#11110F 暗房底色 + #D8FF3E 强酸黄绿 (Acid Chartreuse)。',
  ];

  const antiAiRulesEn = [
    'NO purple-blue gradients or cheap chromatic aberration.',
    'NO glassmorphism, floating blurred cards, or 3D blobs.',
    'NO generic Pinterest-style masonry image dump.',
    'NO fake sci-fi HUD telemetry dashboards without semantic purpose.',
    'STRICT Swiss 12-column grid and hairline borders (0.14 opacity).',
    'Aesthetic restrained palette: #11110F Darkroom Canvas + #D8FF3E Acid Chartreuse.',
  ];

  const activeRules = lang === 'zh' ? antiAiRulesZh : antiAiRulesEn;

  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-12 lg:py-20 text-[#F2F0E8] animate-fadeIn">
      {/* Top Banner */}
      <div className="border-b border-[#F2F0E8]/10 pb-6 mb-12">
        <div className="text-[11px] font-mono tracking-widest text-[#D8FF3E] uppercase mb-1">
          {t('about.tag')}
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight uppercase">
          {t('about.title')}
        </h1>
        <p className="text-sm font-mono text-[#8B887F] mt-2 max-w-xl">
          {t('about.subtitle')}
        </p>
      </div>

      {/* Monumental Manifesto Core */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-[#F2F0E8]/10 pb-16 mb-16">
        <div className="lg:col-span-6 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F2F0E8] leading-tight">
            {t('about.h1')}<br />
            <span className="text-[#D8FF3E]">{t('about.h2')}</span>
          </h2>

          <p className="text-base text-[#8B887F] leading-relaxed font-sans">
            {t('about.p1')}
          </p>
          <p className="text-base text-[#8B887F] leading-relaxed font-sans">
            {t('about.p2')}
          </p>

          <div className="pt-4">
            <button
              onClick={() => {
                playSpotlightClick();
                onExploreArchive();
              }}
              className="px-6 py-3.5 bg-[#D8FF3E] text-[#11110F] text-xs font-mono font-bold uppercase tracking-wider hover:bg-white transition-colors cursor-pointer"
            >
              {t('about.discoverArchive')}
            </button>
          </div>
        </div>

        {/* Vertical System Flow Pipeline */}
        <div className="lg:col-span-6 border border-[#F2F0E8]/15 bg-[#141412] p-8 font-mono space-y-4">
          <div className="text-xs text-[#D8FF3E] uppercase tracking-widest border-b border-[#F2F0E8]/10 pb-2">
            {t('about.anatomy')}
          </div>

          <div className="space-y-4 pt-2">
            {systemFlow.map((step, idx) => (
              <div key={step.label} className="flex items-start gap-4 group">
                <div className="text-xs text-[#D8FF3E] font-bold shrink-0 pt-0.5">
                  0{idx + 1}
                </div>
                <div className="space-y-0.5">
                  <div className="text-sm font-bold text-[#F2F0E8] tracking-wider uppercase group-hover:text-[#D8FF3E] transition-colors">
                    {step.label}
                  </div>
                  <div className="text-xs text-[#8B887F] font-sans">
                    {step.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#F2F0E8]/10 text-center text-xs text-[#D8FF3E] font-bold tracking-widest">
            ↓ RESULT: VISUAL ATLAS
          </div>
        </div>
      </div>

      {/* The Anti-AI Design Constitution */}
      <div className="border border-[#F2F0E8]/15 bg-[#161614] p-8 lg:p-12 space-y-8">
        <div className="flex items-center gap-3 border-b border-[#F2F0E8]/10 pb-4">
          <ShieldAlert className="w-5 h-5 text-[#D8FF3E]" />
          <div>
            <div className="text-xs font-mono text-[#D8FF3E] uppercase">{t('about.constitution')}</div>
            <h3 className="text-2xl font-bold uppercase tracking-tight text-[#F2F0E8]">
              {t('about.principlesTitle')}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          {activeRules.map((rule, idx) => (
            <div key={idx} className="flex items-start gap-3 border border-[#F2F0E8]/10 p-4 bg-[#11110F]">
              <CheckCircle2 className="w-4 h-4 text-[#D8FF3E] shrink-0 mt-0.5" />
              <span className="text-[#8B887F] leading-relaxed">
                {rule}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-[#F2F0E8]/10 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-[#8B887F] gap-2">
          <span>{t('about.curatedBy')}</span>
          <span className="text-[#D8FF3E]">{t('about.swissEdition')}</span>
        </div>
      </div>
    </div>
  );
};
