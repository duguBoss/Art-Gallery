import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import type { GalleryTheme } from '../types/theme';
import type { MainViewType } from './Navbar';

interface Spatial3DCanvasProps {
  theme?: GalleryTheme;
  currentView?: MainViewType;
}

export const Spatial3DCanvas: React.FC<Spatial3DCanvasProps> = ({
  theme = 'cozy-night',
  currentView = 'cinema',
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const currentViewRef = useRef(currentView);
  currentViewRef.current = currentView;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // 1. Scene & Perspective Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 3000);
    camera.position.set(0, 0, 800);

    // 2. High-performance Antialiased WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3. Theme-based subtle atmospheric color palette
    const getThemeColors = () => {
      switch (theme) {
        case 'cyber-neon':
          return { primary: 0x00f0ff, secondary: 0xbd00ff };
        case 'zen-mist':
          return { primary: 0x52b788, secondary: 0x74c69d };
        case 'grand-salon':
          return { primary: 0xd4af37, secondary: 0xf3cf55 };
        case 'ghibli-breeze':
          return { primary: 0x38bdf8, secondary: 0x34d399 };
        case 'cozy-night':
        default:
          return { primary: 0xf59e0b, secondary: 0xf97316 };
      }
    };

    const palette = getThemeColors();

    // 4. Subtle Ambient Atmospheric Stardust (Apple/DJI luxury deep space feeling)
    const particleCount = 1200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 2400;
      particlePos[i * 3 + 1] = (Math.random() - 0.5) * 1800;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 1800;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));

    const particleMat = new THREE.PointsMaterial({
      color: palette.primary,
      size: 2.2,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 5. Mouse Parallax Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - width / 2) * 0.0004;
      mouseY = (e.clientY - height / 2) * 0.0004;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // 6. Subtle Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      targetX += (mouseX - targetX) * 0.03;
      targetY += (mouseY - targetY) * 0.03;

      // Gentle stardust rotation & drift
      particles.rotation.y += 0.0002;
      particles.rotation.x = targetY * 0.4;
      particles.rotation.z = targetX * 0.4;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [theme]);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-80" 
      aria-hidden="true"
    />
  );
};
