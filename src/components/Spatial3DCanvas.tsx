import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import type { GalleryTheme } from '../types/theme';

interface Spatial3DCanvasProps {
  theme?: GalleryTheme;
  isWarping?: boolean;
}

export const Spatial3DCanvas: React.FC<Spatial3DCanvasProps> = ({
  theme = 'cozy-night',
  isWarping = false,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const warpRef = useRef(isWarping);
  warpRef.current = isWarping;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 2000);
    camera.position.z = 450;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Color based on theme
    const getThemeColor = () => {
      switch (theme) {
        case 'cyber-neon':
          return { primary: 0x00f0ff, secondary: 0xbd00ff, particles: 0x70d6ff };
        case 'zen-mist':
          return { primary: 0x52b788, secondary: 0x74c69d, particles: 0xa0b9ab };
        case 'grand-salon':
          return { primary: 0xd4af37, secondary: 0xf3cf55, particles: 0xfdf7ec };
        case 'ghibli-breeze':
          return { primary: 0x60a5fa, secondary: 0x34d399, particles: 0xdbeafe };
        case 'cozy-night':
        default:
          return { primary: 0xe07a5f, secondary: 0xf4a261, particles: 0xf7efe8 };
      }
    };

    const colors = getThemeColor();

    // 1. Interactive 3D Cosmic Dust Particles
    const particleCount = 1000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 1400;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1400;
      scales[i] = Math.random() * 2.5 + 0.8;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    const particleMaterial = new THREE.PointsMaterial({
      color: colors.particles,
      size: 2.2,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);

    // 2. Floating 3D Geometric Polyhedra (Museum Kinetic Sculpture)
    const wireMaterial1 = new THREE.MeshBasicMaterial({
      color: colors.primary,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });

    const wireMaterial2 = new THREE.MeshBasicMaterial({
      color: colors.secondary,
      wireframe: true,
      transparent: true,
      opacity: 0.09,
    });

    // Object A: Icosahedron
    const icosahedron = new THREE.Mesh(new THREE.IcosahedronGeometry(120, 1), wireMaterial1);
    icosahedron.position.set(-350, 120, -100);
    scene.add(icosahedron);

    // Object B: Torus Knot
    const torusKnot = new THREE.Mesh(new THREE.TorusKnotGeometry(75, 18, 80, 12), wireMaterial2);
    torusKnot.position.set(380, -140, -150);
    scene.add(torusKnot);

    // Object C: Octahedron
    const octahedron = new THREE.Mesh(new THREE.OctahedronGeometry(90, 0), wireMaterial1);
    octahedron.position.set(280, 220, -250);
    scene.add(octahedron);

    // 3. Mouse Coordinate Smooth Tracking (Gyroscope Parallax)
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - width / 2) * 0.25;
      mouseY = (e.clientY - height / 2) * 0.25;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    let scrollY = 0;
    let targetScrollY = 0;

    const handleScroll = () => {
      targetScrollY = window.scrollY || document.documentElement.scrollTop;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Animation Loop
    let animationFrameId: number;
    let warpVelocity = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Mouse & Scroll Lerp
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;
      scrollY += (targetScrollY - scrollY) * 0.05;

      camera.position.x = targetX * 0.4;
      camera.position.y = -targetY * 0.4 - (scrollY * 0.08);
      camera.position.z = 450 - ((scrollY * 0.25) % 400);
      camera.lookAt(scene.position);

      // Optical Camera Dolly-Zoom (Apple-grade cinematic lens rack)
      const scrollSpeed = Math.abs(targetScrollY - scrollY);
      const targetFov = warpRef.current ? 75 : (60 + Math.min(scrollSpeed * 0.04, 12));
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, 0.08);
      camera.updateProjectionMatrix();

      // Warp speed acceleration when transitioning
      if (warpRef.current) {
        warpVelocity = THREE.MathUtils.lerp(warpVelocity, 48, 0.09);
      } else {
        warpVelocity = THREE.MathUtils.lerp(warpVelocity, 0.4, 0.05);
      }

      // Slowly rotate 3D polyhedra with scroll speed boost
      const scrollRotationBoost = scrollY * 0.0001;
      icosahedron.rotation.x += 0.002 + scrollRotationBoost;
      icosahedron.rotation.y += 0.003 + scrollRotationBoost;

      torusKnot.rotation.x += 0.003 + scrollRotationBoost;
      torusKnot.rotation.y += 0.002 + scrollRotationBoost;

      octahedron.rotation.y += 0.0025 + scrollRotationBoost;
      octahedron.rotation.z += 0.0015 + scrollRotationBoost;

      // Particle subtle organic drift
      const positionsArr = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        // Move forward along Z
        positionsArr[i * 3 + 2] += warpVelocity;
        if (positionsArr[i * 3 + 2] > 600) {
          positionsArr[i * 3 + 2] = -800;
        }
      }
      geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);

      // Clean up Three.js resources
      geometry.dispose();
      particleMaterial.dispose();
      wireMaterial1.dispose();
      wireMaterial2.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [theme]);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-80 transition-opacity duration-700" 
      aria-hidden="true"
    />
  );
};
