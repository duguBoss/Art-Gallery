import React, { useEffect, useState } from 'react';

export const SpotlightEffect: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isActive) setIsActive(true);
    };

    const handleMouseLeave = () => {
      setIsActive(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isActive]);

  return (
    <div 
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-700 ease-out"
      style={{ opacity: isActive ? 1 : 0 }}
    >
      {/* Dynamic Museum Torch / Ambient Spotlight */}
      <div 
        className="absolute w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          background: 'radial-gradient(circle, rgba(236, 196, 87, 0.04) 0%, rgba(212, 163, 39, 0.015) 45%, rgba(0, 0, 0, 0) 70%)',
          mixBlendMode: 'screen',
        }}
      />
    </div>
  );
};
