import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import type { GalleryTheme } from '../types/theme';
import type { MainViewType } from './Navbar';
import { CHAPTER_LIST } from './ChapterDock';

interface Spatial3DCanvasProps {
  theme?: GalleryTheme;
  currentView?: MainViewType;
  isWarping?: boolean;
}

export const Spatial3DCanvas: React.FC<Spatial3DCanvasProps> = ({
  theme = 'cozy-night',
  currentView = 'cinema',
  isWarping = false,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const currentViewRef = useRef(currentView);
  currentViewRef.current = currentView;
  const warpRef = useRef(isWarping);
  warpRef.current = isWarping;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // 1. Scene & Perspective Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 2000);
    camera.position.set(0, 0, 480);

    // 2. High-performance Antialiased WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3. Theme-based Chromatic Palettes
    const getThemeColors = () => {
      switch (theme) {
        case 'cyber-neon':
          return { primary: 0x00f0ff, secondary: 0xbd00ff, glass: 0x0088ff, metal: 0x182030 };
        case 'zen-mist':
          return { primary: 0x52b788, secondary: 0x74c69d, glass: 0x2d6a4f, metal: 0x1a2620 };
        case 'grand-salon':
          return { primary: 0xd4af37, secondary: 0xf3cf55, glass: 0x8c7326, metal: 0x282018 };
        case 'ghibli-breeze':
          return { primary: 0x38bdf8, secondary: 0x34d399, glass: 0x0284c7, metal: 0x1e293b };
        case 'cozy-night':
        default:
          return { primary: 0xf59e0b, secondary: 0xf97316, glass: 0xd97706, metal: 0x241a14 };
      }
    };

    const palette = getThemeColors();

    // 4. Lighting Rig for Insta360 Camera Lens
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(palette.primary, 1.8);
    keyLight.position.set(200, 300, 400);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(palette.secondary, 1.5);
    rimLight.position.set(-250, -200, -150);
    scene.add(rimLight);

    // 5. Central 3D Insta360 Dual-Lens Camera Rig Group
    const cameraRig = new THREE.Group();
    scene.add(cameraRig);

    // 5a. Main Titanium Obsidian Camera Chassis
    const chassisGeo = new THREE.CylinderGeometry(55, 55, 130, 32);
    const chassisMat = new THREE.MeshStandardMaterial({
      color: palette.metal,
      metalness: 0.85,
      roughness: 0.25,
    });
    const chassisMesh = new THREE.Mesh(chassisGeo, chassisMat);
    cameraRig.add(chassisMesh);

    // 5b. Front Fisheye Convex Lens Dome
    const frontLensGeo = new THREE.SphereGeometry(46, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const lensMat = new THREE.MeshPhysicalMaterial({
      color: palette.glass,
      metalness: 0.2,
      roughness: 0.05,
      transmission: 0.85,
      transparent: true,
      opacity: 0.85,
      ior: 1.65,
    });
    const frontLens = new THREE.Mesh(frontLensGeo, lensMat);
    frontLens.position.set(0, 20, 24);
    frontLens.rotation.x = Math.PI / 2;
    cameraRig.add(frontLens);

    // 5c. Rear Fisheye Convex Lens Dome
    const rearLens = new THREE.Mesh(frontLensGeo, lensMat);
    rearLens.position.set(0, 20, -24);
    rearLens.rotation.x = -Math.PI / 2;
    cameraRig.add(rearLens);

    // 5d. Knurled Optical Aperture Bezel Rings
    const ringGeo = new THREE.TorusGeometry(48, 2.5, 16, 40);
    const ringMat = new THREE.MeshStandardMaterial({
      color: palette.primary,
      metalness: 0.9,
      roughness: 0.1,
      wireframe: true,
    });
    const frontRing = new THREE.Mesh(ringGeo, ringMat);
    frontRing.position.set(0, 20, 26);
    cameraRig.add(frontRing);

    const rearRing = new THREE.Mesh(ringGeo, ringMat);
    rearRing.position.set(0, 20, -26);
    cameraRig.add(rearRing);

    // 5e. Rotating 360 Laser Gyroscope Gimbal Rings
    const gyroGeo1 = new THREE.TorusGeometry(85, 1.2, 16, 60);
    const gyroMat1 = new THREE.MeshBasicMaterial({ color: palette.primary, transparent: true, opacity: 0.35 });
    const gyroRing1 = new THREE.Mesh(gyroGeo1, gyroMat1);
    cameraRig.add(gyroRing1);

    const gyroGeo2 = new THREE.TorusGeometry(105, 1.2, 16, 60);
    const gyroMat2 = new THREE.MeshBasicMaterial({ color: palette.secondary, transparent: true, opacity: 0.25 });
    const gyroRing2 = new THREE.Mesh(gyroGeo2, gyroMat2);
    gyroRing2.rotation.x = Math.PI / 2;
    cameraRig.add(gyroRing2);

    // Initial position: slightly offset so text remains readable
    cameraRig.position.set(0, 0, 0);

    // 6. 3D Cosmic Atmosphere Dust Particles
    const particleCount = 800;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 1400;
      particlePos[i * 3 + 1] = (Math.random() - 0.5) * 1000;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 1200;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: palette.primary,
      size: 2,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 7. Mouse Orbit Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - width / 2) * 0.0015;
      mouseY = (e.clientY - height / 2) * 0.0015;
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

    // 8. Stage-Target Rotation Angles for Insta360 Showcase
    const stageRotations: Record<string, { x: number; y: number; z: number; scale: number; posX: number }> = {
      cinema: { x: 0.1, y: 0.2, z: 0, scale: 1.1, posX: 140 },
      atoms: { x: 0.5, y: 0.8, z: 0.2, scale: 1.25, posX: -150 },
      principles: { x: 0, y: Math.PI / 2, z: 0.15, scale: 1.15, posX: 160 },
      styles: { x: -0.4, y: 1.2, z: -0.3, scale: 1.05, posX: -140 },
      mediums: { x: 0.2, y: Math.PI, z: 0, scale: 1.1, posX: 150 },
      motion: { x: 0.6, y: 2.4, z: 0.4, scale: 1.2, posX: -160 },
      atlas: { x: -0.2, y: 0.6, z: 0.1, scale: 1.0, posX: 130 },
      'shapes-lab': { x: 0.3, y: 0.1, z: -0.2, scale: 1.15, posX: 0 },
    };

    // 9. Animation Loop
    let animationFrameId: number;
    let currentRotX = 0;
    let currentRotY = 0;
    let currentRotZ = 0;
    let currentScale = 1;
    let currentPosX = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Mouse Lerp
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Get target rotation for active stage
      const view = currentViewRef.current;
      const targetTransform = stageRotations[view] || stageRotations.cinema;

      // Responsive positioning: on smaller screens, center the model
      const responsiveTargetX = width < 1024 ? 0 : targetTransform.posX;

      currentRotX = THREE.MathUtils.lerp(currentRotX, targetTransform.x + targetY, 0.05);
      currentRotY = THREE.MathUtils.lerp(currentRotY, targetTransform.y + targetX, 0.05);
      currentRotZ = THREE.MathUtils.lerp(currentRotZ, targetTransform.z, 0.05);
      currentScale = THREE.MathUtils.lerp(currentScale, targetTransform.scale, 0.05);
      currentPosX = THREE.MathUtils.lerp(currentPosX, responsiveTargetX, 0.05);

      cameraRig.rotation.x = currentRotX;
      cameraRig.rotation.y = currentRotY + (Date.now() * 0.0003); // Subtle organic rotation
      cameraRig.rotation.z = currentRotZ;
      cameraRig.scale.set(currentScale, currentScale, currentScale);
      cameraRig.position.x = currentPosX;

      // Gimbal rings counter-rotation
      gyroRing1.rotation.z += 0.004;
      gyroRing2.rotation.y += 0.005;

      // Warp speed acceleration effect
      if (warpRef.current) {
        camera.fov = THREE.MathUtils.lerp(camera.fov, 68, 0.1);
        cameraRig.rotation.y += 0.05;
      } else {
        camera.fov = THREE.MathUtils.lerp(camera.fov, 50, 0.08);
      }
      camera.updateProjectionMatrix();

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      renderer.dispose();
      chassisGeo.dispose();
      chassisMat.dispose();
      frontLensGeo.dispose();
      lensMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      gyroGeo1.dispose();
      gyroMat1.dispose();
      gyroGeo2.dispose();
      gyroMat2.dispose();
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
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-90 transition-opacity duration-700" 
      aria-hidden="true"
    />
  );
};
