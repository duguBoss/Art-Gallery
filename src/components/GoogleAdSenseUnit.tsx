import React, { useEffect, useRef, useState } from 'react';

interface GoogleAdSenseUnitProps {
  slotId?: string;
  format?: 'auto' | 'fluid' | 'horizontal' | 'rectangle';
  layoutKey?: string;
  variant?: 'banner' | 'feed-card' | 'sidebar';
  className?: string;
}

export const GoogleAdSenseUnit: React.FC<GoogleAdSenseUnitProps> = ({
  slotId = '6251177852119516',
  format = 'auto',
  layoutKey,
  variant = 'banner',
  className = '',
}) => {
  const adRef = useRef<HTMLModElement | null>(null);
  const [adPushed, setAdPushed] = useState(false);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && !adPushed) {
        // @ts-ignore
        const adsbygoogle = window.adsbygoogle || [];
        adsbygoogle.push({});
        setAdPushed(true);
      }
    } catch (e) {
      console.warn('Google AdSense render fallback triggered:', e);
    }
  }, [adPushed]);

  if (variant === 'feed-card') {
    return (
      <div 
        className={`group relative rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden p-6 flex flex-col justify-between transition-all duration-300 hover:border-amber-500/30 ${className}`}
        style={{ minHeight: '360px' }}
      >
        {/* Subtle Luxury Corner Label */}
        <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.25em] text-amber-300/80 uppercase">
              GALLERY PATRON · 赞助展位
            </span>
          </div>
          <span className="text-[9px] font-mono text-white/30 tracking-widest uppercase">
            ADS · SPONSORED
          </span>
        </div>

        {/* Ad Container */}
        <div className="flex-1 flex items-center justify-center relative overflow-hidden my-2 min-h-[220px]">
          <ins
            ref={adRef}
            className="adsbygoogle"
            style={{ display: 'block', width: '100%', height: '100%', minHeight: '200px' }}
            data-ad-client="ca-pub-6251177852119516"
            data-ad-slot={slotId}
            data-ad-format={format}
            data-full-width-responsive="true"
            {...(layoutKey ? { 'data-ad-layout-key': layoutKey } : {})}
          />

          {/* Aesthetic Museum Placeholder if ad is loading/blocked */}
          <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-center p-4 opacity-40 group-hover:opacity-70 transition-opacity -z-10">
            <div className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-xs font-serif text-amber-200/60 mb-2">
              AP
            </div>
            <p className="text-xs font-serif italic text-white/70 tracking-wide">
              Art Patronage Initiative
            </p>
            <p className="text-[10px] font-mono text-white/30 tracking-widest mt-1 uppercase">
              Support Continuous Curation
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/30">
          <span>持续支持画廊开源研究</span>
          <span>CURATED ARCHIVE</span>
        </div>
      </div>
    );
  }

  // Default Banner Variant (Curated Exhibition Patron Display)
  return (
    <div className={`w-full max-w-7xl mx-auto px-4 sm:px-8 my-10 ${className}`}>
      <div className="relative rounded-2xl border border-white/10 bg-gradient-to-r from-white/[0.02] via-white/[0.04] to-white/[0.02] p-4 sm:p-6 overflow-hidden backdrop-blur-sm shadow-xl shadow-black/20">
        {/* Header Ribbon */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="text-[10px] font-mono tracking-[0.25em] text-amber-200/90 uppercase">
              EXHIBITION PATRON · 策展支持展位
            </span>
          </div>
          <span className="text-[9px] font-mono text-white/30 tracking-widest uppercase">
            GOOGLE AD · VERIFIED
          </span>
        </div>

        {/* Ad Body */}
        <div className="min-h-[90px] sm:min-h-[100px] flex items-center justify-center relative overflow-hidden">
          <ins
            ref={adRef}
            className="adsbygoogle"
            style={{ display: 'block', width: '100%', minHeight: '90px' }}
            data-ad-client="ca-pub-6251177852119516"
            data-ad-slot={slotId}
            data-ad-format={format}
            data-full-width-responsive="true"
          />

          {/* Aesthetic Fallback Artwork Label if loading / ad-blocked */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-between px-6 opacity-40 -z-10">
            <div className="text-left">
              <span className="text-[10px] font-mono text-amber-400/80 tracking-widest block uppercase">
                SPONSOR THE ARCHIVE
              </span>
              <span className="text-sm font-serif italic text-white/70">
                赋能视觉艺术与影视语言的开源探索
              </span>
            </div>
            <div className="hidden sm:block text-right">
              <span className="text-[10px] font-mono text-white/40 tracking-widest block uppercase">
                PARTNER SHOWCASE
              </span>
              <span className="text-xs font-mono text-white/20">
                16:9 CINEMA & VISUAL ATLAS
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
