import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import type { GalleryTheme } from '../types/theme';
import type { MainViewType } from './Navbar';
import type { DJIFocalLength } from './DJIFlightSpecsHUD';

interface Spatial3DCanvasProps {
  theme?: GalleryTheme;
  currentView?: MainViewType;
  focalLength?: DJIFocalLength;
  isWarping?: boolean;
}

export const Spatial3DCanvas: React.FC<Spatial3DCanvasProps> = ({
  theme = 'cozy-night',
  currentView = 'cinema',
  focalLength = '24mm',
  isWarping = false,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const currentViewRef = useRef(currentView);
  currentViewRef.current = currentView;
  const focalLengthRef = useRef(focalLength);
  focalLengthRef.current = focalLength;
  const warpRef = useRef(isWarping);
  warpRef.current = isWarping;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // 1. Scene & Perspective Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 2500);
    camera.position.set(0, 0, 480);

    // 2. High-performance Antialiased WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3. Theme Palettes (Hasselblad Titanium & Gold Accents)
    const getThemeColors = () => {
      switch (theme) {
        case 'cyber-neon':
          return { primary: 0x00f0ff, secondary: 0xbd00ff, gold: 0x00f0ff, metal: 0x141c2b, glass: 0x0066cc };
        case 'zen-mist':
          return { primary: 0x52b788, secondary: 0x74c69d, gold: 0x74c69d, metal: 0x16241c, glass: 0x22553b };
        case 'grand-salon':
          return { primary: 0xd4af37, secondary: 0xf3cf55, gold: 0xd4af37, metal: 0x241c14, glass: 0x7a5e1e };
        case 'ghibli-breeze':
          return { primary: 0x38bdf8, secondary: 0x34d399, gold: 0x38bdf8, metal: 0x1a2838, glass: 0x0284c7 };
        case 'cozy-night':
        default:
          return { primary: 0xf59e0b, secondary: 0xf97316, gold: 0xf59e0b, metal: 0x1f1915, glass: 0xb45309 };
      }
    };

    const palette = getThemeColors();

    // 4. Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(palette.primary, 2.0);
    keyLight.position.set(250, 300, 350);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(palette.secondary, 1.6);
    rimLight.position.set(-250, -250, -200);
    scene.add(rimLight);

    // 5. DJI Mavic 3 Pro Motorized Tri-Camera Gimbal Pod Group
    const gimbalPod = new THREE.Group();
    scene.add(gimbalPod);

    // 5a. Aerodynamic Gimbal Pod Shell (Carbon Magnesium Alloy)
    const podShellGeo = new THREE.BoxGeometry(100, 115, 80);
    const podShellMat = new THREE.MeshStandardMaterial({
      color: palette.metal,
      metalness: 0.9,
      roughness: 0.25,
    });
    const podShell = new THREE.Mesh(podShellGeo, podShellMat);
    gimbalPod.add(podShell);

    // 5b. Lens Glass Dome Material
    const lensGlassMat = new THREE.MeshPhysicalMaterial({
      color: palette.glass,
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.9,
      transparent: true,
      opacity: 0.9,
      ior: 1.65,
    });

    // 5c. Lens A: Main 24mm Hasselblad 4/3 CMOS Wide Lens (Bottom Large Aperture)
    const hasselbladGeo = new THREE.CylinderGeometry(28, 28, 22, 32);
    const hasselbladMat = new THREE.MeshStandardMaterial({ color: 0x101010, metalness: 0.95, roughness: 0.15 });
    const hasselbladBarrel = new THREE.Mesh(hasselbladGeo, hasselbladMat);
    hasselbladBarrel.rotation.x = Math.PI / 2;
    hasselbladBarrel.position.set(0, -22, 42);
    gimbalPod.add(hasselbladBarrel);

    // Hasselblad Golden Chamfer Ring
    const goldRingGeo = new THREE.TorusGeometry(28, 1.8, 16, 40);
    const goldRingMat = new THREE.MeshStandardMaterial({ color: palette.gold, metalness: 1.0, roughness: 0.1 });
    const goldRing = new THREE.Mesh(goldRingGeo, goldRingMat);
    goldRing.position.set(0, -22, 53);
    gimbalPod.add(goldRing);

    // Hasselblad Glass Dome
    const hasselGlassGeo = new THREE.SphereGeometry(26, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const hasselGlass = new THREE.Mesh(hasselGlassGeo, lensGlassMat);
    hasselGlass.rotation.x = Math.PI / 2;
    hasselGlass.position.set(0, -22, 51);
    gimbalPod.add(hasselGlass);

    // 5d. Lens B: 70mm Medium Telephoto Lens (Upper Left 3x Zoom)
    const tele70Geo = new THREE.CylinderGeometry(16, 16, 18, 32);
    const tele70Barrel = new THREE.Mesh(tele70Geo, hasselbladMat);
    tele70Barrel.rotation.x = Math.PI / 2;
    tele70Barrel.position.set(-24, 25, 42);
    gimbalPod.add(tele70Barrel);

    const tele70Glass = new THREE.Mesh(new THREE.SphereGeometry(15, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), lensGlassMat);
    tele70Glass.rotation.x = Math.PI / 2;
    tele70Glass.position.set(-24, 25, 50);
    gimbalPod.add(tele70Glass);

    // 5e. Lens C: 166mm Telephoto Lens (Upper Right 7x Zoom)
    const tele166Geo = new THREE.CylinderGeometry(16, 16, 18, 32);
    const tele166Barrel = new THREE.Mesh(tele166Geo, hasselbladMat);
    tele166Barrel.rotation.x = Math.PI / 2;
    tele166Barrel.position.set(24, 25, 42);
    gimbalPod.add(tele166Barrel);

    const tele166Glass = new THREE.Mesh(new THREE.SphereGeometry(15, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), lensGlassMat);
    tele166Glass.rotation.x = Math.PI / 2;
    tele166Glass.position.set(24, 25, 50);
    gimbalPod.add(tele166Glass);

    // 5f. 3-Axis Motorized Gimbal Mechanical Arm (U-Bracket)
    const armGeo = new THREE.TorusGeometry(82, 3.5, 16, 48, Math.PI);
    const armMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.85, roughness: 0.3 });
    const gimbalArm = new THREE.Mesh(armGeo, armMat);
    gimbalArm.rotation.z = Math.PI;
    gimbalArm.position.set(0, 30, 0);
    gimbalPod.add(gimbalArm);

    // 5g. Brushless Motor Hub Cylinder
    const motorGeo = new THREE.CylinderGeometry(18, 18, 24, 24);
    const motorMat = new THREE.MeshStandardMaterial({ color: palette.primary, metalness: 0.95, roughness: 0.2 });
    const motorHub = new THREE.Mesh(motorGeo, motorMat);
    motorHub.position.set(0, 112, 0);
    gimbalPod.add(motorHub);

    // 6. Laser Horizon Gyroscope Ring (DJI Fly Telemetry Level)
    const gyroGeo = new THREE.TorusGeometry(125, 1.2, 16, 64);
    const gyroMat = new THREE.MeshBasicMaterial({ color: palette.primary, transparent: true, opacity: 0.25 });
    const gyroRing = new THREE.Mesh(gyroGeo, gyroMat);
    gimbalPod.add(gyroRing);

    // 7. Ambient Airborne Floating Dust Particles
    const particleCount = 750;
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
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 8. Mouse Tracking & Window Resize
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - width / 2) * 0.0012;
      mouseY = (e.clientY - height / 2) * 0.0012;
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

    // 9. DJI Stage Orbit Angles
    const stageRotations: Record<string, { pitch: number; yaw: number; roll: number; posX: number; scale: number }> = {
      cinema: { pitch: -0.15, yaw: 0.1, roll: 0, posX: 140, scale: 1.15 },
      atoms: { pitch: 0.35, yaw: 0.65, roll: 0.15, posX: -150, scale: 1.3 },
      principles: { pitch: 0, yaw: 1.25, roll: 0, posX: 160, scale: 1.2 },
      styles: { pitch: -0.3, yaw: -0.6, roll: -0.15, posX: -140, scale: 1.1 },
      mediums: { pitch: 0.15, yaw: 2.8, roll: 0, posX: 150, scale: 1.15 },
      motion: { pitch: 0.5, yaw: 1.8, roll: 0.3, posX: -160, scale: 1.25 },
      atlas: { pitch: -0.2, yaw: 0.45, roll: 0.1, posX: 130, scale: 1.05 },
      'shapes-lab': { pitch: 0.2, yaw: 0.05, roll: -0.1, posX: 0, scale: 1.2 },
    };

    // 10. Animation Loop
    let animationFrameId: number;
    let curPitch = 0;
    let curYaw = 0;
    let curRoll = 0;
    let curScale = 1;
    let curPosX = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      const view = currentViewRef.current;
      const targetTransform = stageRotations[view] || stageRotations.cinema;
      const responsiveTargetX = width < 1024 ? 0 : targetTransform.posX;

      curPitch = THREE.MathUtils.lerp(curPitch, targetTransform.pitch + targetY, 0.05);
      curYaw = THREE.MathUtils.lerp(curYaw, targetTransform.yaw + targetX, 0.05);
      curRoll = THREE.MathUtils.lerp(curRoll, targetTransform.roll, 0.05);
      curScale = THREE.MathUtils.lerp(curScale, targetTransform.scale, 0.05);
      curPosX = THREE.MathUtils.lerp(curPosX, responsiveTargetX, 0.05);

      // Apply 3-Axis Gimbal Rotation
      gimbalPod.rotation.x = curPitch;
      gimbalPod.rotation.y = curYaw + (Date.now() * 0.00025);
      gimbalPod.rotation.z = curRoll;
      gimbalPod.scale.set(curScale, curScale, curScale);
      gimbalPod.position.x = curPosX;

      // Telemetry Gyro Ring
      gyroRing.rotation.z += 0.003;

      // DJI Hasselblad Focal Length FOV Tuning
      const focal = focalLengthRef.current;
      let targetFov = 50;
      let targetZ = 480;

      if (focal === '24mm') {
        targetFov = 55;
        targetZ = 480;
      } else if (focal === '70mm') {
        targetFov = 38;
        targetZ = 420;
      } else if (focal === '166mm') {
        targetFov = 24;
        targetZ = 340;
      }

      if (warpRef.current) {
        targetFov += 15;
        gimbalPod.rotation.y += 0.04;
      }

      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, 0.07);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.07);
      camera.updateProjectionMatrix();

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      renderer.dispose();
      podShellGeo.dispose();
      podShellMat.dispose();
      hasselbladGeo.dispose();
      hasselbladMat.dispose();
      goldRingGeo.dispose();
      goldRingMat.dispose();
      hasselGlassGeo.dispose();
      lensGlassMat.dispose();
      tele70Geo.dispose();
      tele166Geo.dispose();
      armGeo.dispose();
      armMat.dispose();
      motorGeo.dispose();
      motorMat.dispose();
      gyroGeo.dispose();
      gyroMat.dispose();
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
