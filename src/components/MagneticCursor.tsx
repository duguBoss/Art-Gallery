import React, { useEffect, useState } from 'react';

export const MagneticCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let animId: number;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPos({ x: targetX, y: targetY });
      if (!isVisible) setIsVisible(true);

      // Check if hovering over clickable element
      const target = e.target as HTMLElement;
      const isClickable = Boolean(
        target.closest('button') || 
        target.closest('a') || 
        target.closest('[role="button"]') ||
        target.closest('.cursor-pointer') ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A'
      );
      setIsHovered(isClickable);
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);
    const handleMouseLeave = () => setIsVisible(false);

    // Spring Lerp Loop for trailing outer ring
    const renderLoop = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      setTrailingPos({ x: currentX, y: currentY });
      animId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden lg:block select-none" aria-hidden="true">
      {/* Dynamic Torch Halo */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-300 pointer-events-none"
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          width: isHovered ? '450px' : '300px',
          height: isHovered ? '450px' : '300px',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.06) 0%, rgba(255, 255, 255, 0.01) 40%, rgba(0,0,0,0) 70%)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Trailing Elastic Fluid Ring */}
      <div
        className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border pointer-events-none transition-all duration-200 ${
          isHovered
            ? 'w-16 h-16 border-amber-300 bg-amber-400/10 shadow-lg shadow-amber-400/20 backdrop-blur-[0.5px]'
            : isMouseDown
            ? 'w-6 h-6 border-amber-400 bg-amber-400/30'
            : 'w-10 h-10 border-white/40 bg-white/[0.03]'
        }`}
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          transform: `translate(-50%, -50%) scale(${isMouseDown ? 0.8 : isHovered ? 1.15 : 1})`,
        }}
      />

      {/* Center Precise Dot */}
      <div
        className="absolute w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400 pointer-events-none shadow-sm shadow-amber-300"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
        }}
      />
    </div>
  );
};
