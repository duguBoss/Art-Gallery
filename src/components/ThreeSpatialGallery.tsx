import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import type { AIImageCase } from '../types/art';
import { THEME_OPTIONS, type GalleryTheme } from '../types/theme';
import { 
  Play, Pause, ChevronLeft, ChevronRight, Maximize2, 
  Copy, Check, Volume2, VolumeX, Sliders, X, Sparkles, Compass, Eye, Filter, Layers
} from 'lucide-react';
import { playSpotlightClick, playSuccessChime, playMuseumFootstep, playGalleryBell, toggleAmbientSound } from '../utils/audio';

interface ThreeSpatialGalleryProps {
  imageCases: AIImageCase[];
  currentTheme?: GalleryTheme;
  onSelectTheme?: (theme: GalleryTheme) => void;
}

interface ArtworkSpot {
  caseData: AIImageCase;
  position: THREE.Vector3;
  rotation: THREE.Euler;
  cameraPos: THREE.Vector3;
  cameraLookAt: THREE.Vector3;
  mesh?: THREE.Group;
  spotlight?: THREE.SpotLight;
}

export const ThreeSpatialGallery: React.FC<ThreeSpatialGalleryProps> = ({ 
  imageCases,
  currentTheme = 'cozy-night',
  onSelectTheme,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  // Active artwork index
  const [activeIdx, setActiveIdx] = useState(0);
  const [isAutoTour, setIsAutoTour] = useState(false);
  const [tourProgress, setTourProgress] = useState(0);

  // UI state
  const [isPlacardOpen, setIsPlacardOpen] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [ambientPlaying, setAmbientPlaying] = useState(false);
  const [filterByScene, setFilterByScene] = useState<boolean>(true);

  // Mini-map camera tracking state
  const [camRadar, setCamRadar] = useState({ x: 0, z: 0, angle: 0 });

  // Get active theme option & 3D configs
  const activeThemeOption = useMemo(() => {
    return THEME_OPTIONS.find((t) => t.id === currentTheme) || THEME_OPTIONS[0];
  }, [currentTheme]);

  // Curate display cases: Prioritize matching theme categories if filterByScene is active
  const displayedCases = useMemo(() => {
    if (!filterByScene) return imageCases;
    const cats = activeThemeOption.featuredCategories;
    const matched = imageCases.filter((c) => cats.includes(c.category));
    if (matched.length > 0) {
      // Append others at the end if fewer than 6
      if (matched.length < 6) {
        const others = imageCases.filter((c) => !cats.includes(c.category));
        return [...matched, ...others].slice(0, 10);
      }
      return matched.slice(0, 10);
    }
    return imageCases;
  }, [imageCases, activeThemeOption, filterByScene]);

  // Refs for 3D engine
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const spotsRef = useRef<ArtworkSpot[]>([]);
  const currentCamPos = useRef(new THREE.Vector3(0, 3.2, 7));
  const targetCamPos = useRef(new THREE.Vector3(0, 3.2, 7));
  const currentLookAt = useRef(new THREE.Vector3(0, 3.2, 0));
  const targetLookAt = useRef(new THREE.Vector3(0, 3.2, 0));
  const mouseTilt = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number | null>(null);

  // Dynamic mesh/light refs for theme morphing
  const floorMeshRef = useRef<THREE.Mesh | null>(null);
  const ceilingMeshRef = useRef<THREE.Mesh | null>(null);
  const wallMeshesRef = useRef<THREE.Mesh[]>([]);
  const benchMeshRef = useRef<THREE.Mesh | null>(null);
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
  const keyLightRef = useRef<THREE.PointLight | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);

  const activeSpot = spotsRef.current[activeIdx] || null;
  const activeCase = activeSpot?.caseData || displayedCases[activeIdx] || displayedCases[0];

  // Helper to generate procedural floor texture matching current theme
  const createFloorTexture = (theme: GalleryTheme) => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    if (theme === 'zen-mist') {
      // Zen Dark Slate & Bamboo Lines
      ctx.fillStyle = '#111613';
      ctx.fillRect(0, 0, 512, 512);
      ctx.strokeStyle = '#1d2a23';
      ctx.lineWidth = 3;
      for (let y = 0; y < 512; y += 64) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(512, y);
        ctx.stroke();
      }
      for (let x = 0; x < 512; x += 128) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 512);
        ctx.stroke();
      }
    } else if (theme === 'cyber-neon') {
      // Cyber Neon Wet Grid Asphalt
      ctx.fillStyle = '#050811';
      ctx.fillRect(0, 0, 512, 512);
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.25)';
      ctx.lineWidth = 1.5;
      for (let y = 0; y < 512; y += 32) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(512, y);
        ctx.stroke();
      }
      for (let x = 0; x < 512; x += 32) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 512);
        ctx.stroke();
      }
      // Glowing Cyan Crossings
      ctx.fillStyle = '#00ffff';
      for (let x = 0; x < 512; x += 64) {
        for (let y = 0; y < 512; y += 64) {
          ctx.fillRect(x - 2, y - 2, 4, 4);
        }
      }
    } else if (theme === 'grand-salon') {
      // Baroque Grand Louvre Royal Parquet Marble
      ctx.fillStyle = '#221811';
      ctx.fillRect(0, 0, 512, 512);
      ctx.strokeStyle = '#3e2e1f';
      ctx.lineWidth = 2.5;
      for (let d = -512; d < 1024; d += 64) {
        ctx.beginPath();
        ctx.moveTo(d, 0);
        ctx.lineTo(d + 512, 512);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(d, 512);
        ctx.lineTo(d + 512, 0);
        ctx.stroke();
      }
    } else if (theme === 'ghibli-breeze') {
      // Ghibli Light Wood Plank / Tatami
      ctx.fillStyle = '#dfd6c5';
      ctx.fillRect(0, 0, 512, 512);
      ctx.strokeStyle = '#c5b8a1';
      ctx.lineWidth = 2;
      for (let y = 0; y < 512; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(512, y);
        ctx.stroke();
      }
      for (let x = 0; x < 512; x += 120) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 512);
        ctx.stroke();
      }
    } else {
      // Cozy Night: Herringbone Dark Wood Floor
      ctx.fillStyle = '#17110c';
      ctx.fillRect(0, 0, 512, 512);
      ctx.strokeStyle = '#271c14';
      ctx.lineWidth = 2;
      for (let y = 0; y < 512; y += 32) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(512, y);
        ctx.stroke();
      }
      for (let x = 0; x < 512; x += 64) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 512);
        ctx.stroke();
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(12, 12);
    return tex;
  };

  // Helper to generate wall plaster texture
  const createWallTexture = (theme: GalleryTheme) => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;

    if (theme === 'zen-mist') {
      ctx.fillStyle = '#161e19';
    } else if (theme === 'cyber-neon') {
      ctx.fillStyle = '#0a1020';
    } else if (theme === 'grand-salon') {
      ctx.fillStyle = '#2b1e15';
    } else if (theme === 'ghibli-breeze') {
      ctx.fillStyle = '#f4f8fa';
    } else {
      ctx.fillStyle = '#211a14';
    }
    ctx.fillRect(0, 0, 256, 256);

    // Add subtle noise
    for (let i = 0; i < 2200; i++) {
      const x = Math.random() * 256;
      const y = Math.random() * 256;
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.035)';
      ctx.fillRect(x, y, 2, 2);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(8, 4);
    return tex;
  };

  // =========================================================================
  // 1. SETUP THREE.JS SPATIAL ART GALLERY ENVIRONMENT
  // =========================================================================
  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const s3d = activeThemeOption.scene3D;

    // --- Scene & Fog ---
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(s3d.fogColor);
    scene.fog = new THREE.FogExp2(s3d.fogColor, s3d.fogDensity);

    // --- Camera ---
    const camera = new THREE.PerspectiveCamera(58, width / height, 0.1, 100);
    camera.position.set(0, 3.2, 7);
    cameraRef.current = camera;

    // --- Renderer ---
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = currentTheme === 'ghibli-breeze' ? 1.05 : 1.18;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    mountRef.current.appendChild(renderer.domElement);

    // --- Procedural Textures ---
    const floorTexture = createFloorTexture(currentTheme);
    const wallTexture = createWallTexture(currentTheme);

    // --- Architecture Geometry ---
    // Floor
    const floorGeo = new THREE.PlaneGeometry(36, 36);
    const floorMat = new THREE.MeshStandardMaterial({
      map: floorTexture,
      roughness: currentTheme === 'cyber-neon' ? 0.15 : 0.4,
      metalness: currentTheme === 'cyber-neon' ? 0.6 : 0.15,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = 0;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);
    floorMeshRef.current = floorMesh;

    // Ceiling
    const ceilingMat = new THREE.MeshStandardMaterial({ 
      color: s3d.ceilingColor, 
      roughness: 0.9 
    });
    const ceilingMesh = new THREE.Mesh(floorGeo, ceilingMat);
    ceilingMesh.rotation.x = Math.PI / 2;
    ceilingMesh.position.y = 7;
    scene.add(ceilingMesh);
    ceilingMeshRef.current = ceilingMesh;

    // Walls
    const wallMat = new THREE.MeshStandardMaterial({
      map: wallTexture,
      roughness: s3d.wallRoughness,
    });

    const walls: THREE.Mesh[] = [];
    const createWall = (w: number, h: number, x: number, y: number, z: number, ry: number) => {
      const wallGeo = new THREE.PlaneGeometry(w, h);
      const wall = new THREE.Mesh(wallGeo, wallMat);
      wall.position.set(x, y, z);
      wall.rotation.y = ry;
      wall.receiveShadow = true;
      scene.add(wall);
      walls.push(wall);
      return wall;
    };

    // Outer Perimeter Walls
    createWall(36, 7, 0, 3.5, -18, 0); // North
    createWall(36, 7, 0, 3.5, 18, Math.PI); // South
    createWall(36, 7, -18, 3.5, 0, Math.PI / 2); // West
    createWall(36, 7, 18, 3.5, 0, -Math.PI / 2); // East

    // Inner Partitions (Creating Exhibition Room Zones)
    createWall(10, 7, -5, 3.5, -6, 0);
    createWall(10, 7, 5, 3.5, -6, 0);
    createWall(10, 7, -5, 3.5, 6, Math.PI);
    createWall(10, 7, 5, 3.5, 6, Math.PI);
    wallMeshesRef.current = walls;

    // Central Gallery Bench (3D Mesh matching theme)
    const benchGeo = new THREE.BoxGeometry(3.6, 0.6, 1.4);
    const benchMat = new THREE.MeshStandardMaterial({ 
      color: s3d.benchColor, 
      roughness: currentTheme === 'cyber-neon' ? 0.2 : 0.5,
      metalness: currentTheme === 'cyber-neon' ? 0.7 : 0.1
    });
    const bench = new THREE.Mesh(benchGeo, benchMat);
    bench.position.set(0, 0.3, 0);
    bench.castShadow = true;
    bench.receiveShadow = true;
    scene.add(bench);
    benchMeshRef.current = bench;

    // --- Base Lighting ---
    const ambientLight = new THREE.AmbientLight(s3d.ambientLightColor, s3d.ambientLightIntensity);
    scene.add(ambientLight);
    ambientLightRef.current = ambientLight;

    const keyFill = new THREE.PointLight(s3d.keyLightColor, s3d.keyLightIntensity, 22);
    keyFill.position.set(0, 5.5, 0);
    scene.add(keyFill);
    keyLightRef.current = keyFill;

    // --- Floating Volumetric Atmosphere Particles (Sparks / Motes / Rain / Pollen) ---
    const particleGeo = new THREE.BufferGeometry();
    const pCount = s3d.particleCount;
    const pPos = new Float32Array(pCount * 3);
    for (let p = 0; p < pCount * 3; p += 3) {
      pPos[p] = (Math.random() - 0.5) * 32;     // x: -16 to 16
      pPos[p + 1] = Math.random() * 6.5 + 0.5; // y: 0.5 to 7.0
      pPos[p + 2] = (Math.random() - 0.5) * 32; // z: -16 to 16
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));

    const particleMat = new THREE.PointsMaterial({
      color: s3d.particleColor,
      size: s3d.particleSize,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // =========================================================================
    // 2. CREATE 3D PHYSICAL PAINTING MESHES & DIRECTIONAL SPOTLIGHTS
    // =========================================================================
    const textureLoader = new THREE.TextureLoader();
    const spots: ArtworkSpot[] = [];

    // Curate up to 10 exhibition slots on gallery walls
    const wallSlots = [
      // Central North Wall (Room 01 - Hero Art)
      { pos: new THREE.Vector3(0, 3.4, -5.9), rot: new THREE.Euler(0, 0, 0), cPos: new THREE.Vector3(0, 3.2, -1.8), cLook: new THREE.Vector3(0, 3.2, -5.9) },
      // Left North Wall
      { pos: new THREE.Vector3(-6, 3.4, -5.9), rot: new THREE.Euler(0, 0, 0), cPos: new THREE.Vector3(-6, 3.2, -1.8), cLook: new THREE.Vector3(-6, 3.2, -5.9) },
      // Right North Wall
      { pos: new THREE.Vector3(6, 3.4, -5.9), rot: new THREE.Euler(0, 0, 0), cPos: new THREE.Vector3(6, 3.2, -1.8), cLook: new THREE.Vector3(6, 3.2, -5.9) },
      // Far North Main Wall
      { pos: new THREE.Vector3(0, 3.6, -17.8), rot: new THREE.Euler(0, 0, 0), cPos: new THREE.Vector3(0, 3.4, -13.5), cLook: new THREE.Vector3(0, 3.4, -17.8) },
      // West Gallery Wall (Room 02)
      { pos: new THREE.Vector3(-17.8, 3.4, -6), rot: new THREE.Euler(0, Math.PI / 2, 0), cPos: new THREE.Vector3(-13.5, 3.2, -6), cLook: new THREE.Vector3(-17.8, 3.2, -6) },
      { pos: new THREE.Vector3(-17.8, 3.4, 6), rot: new THREE.Euler(0, Math.PI / 2, 0), cPos: new THREE.Vector3(-13.5, 3.2, 6), cLook: new THREE.Vector3(-17.8, 3.2, 6) },
      // East Gallery Wall (Room 03)
      { pos: new THREE.Vector3(17.8, 3.4, -6), rot: new THREE.Euler(0, -Math.PI / 2, 0), cPos: new THREE.Vector3(13.5, 3.2, -6), cLook: new THREE.Vector3(17.8, 3.2, -6) },
      { pos: new THREE.Vector3(17.8, 3.4, 6), rot: new THREE.Euler(0, -Math.PI / 2, 0), cPos: new THREE.Vector3(13.5, 3.2, 6), cLook: new THREE.Vector3(17.8, 3.2, 6) },
      // South Partition Walls (Room 04)
      { pos: new THREE.Vector3(-4, 3.4, 5.9), rot: new THREE.Euler(0, Math.PI, 0), cPos: new THREE.Vector3(-4, 3.2, 1.8), cLook: new THREE.Vector3(-4, 3.2, 5.9) },
      { pos: new THREE.Vector3(4, 3.4, 5.9), rot: new THREE.Euler(0, Math.PI, 0), cPos: new THREE.Vector3(4, 3.2, 1.8), cLook: new THREE.Vector3(4, 3.2, 5.9) },
    ];

    const slotCount = Math.min(wallSlots.length, displayedCases.length);

    for (let i = 0; i < slotCount; i++) {
      const slot = wallSlots[i];
      const cData = displayedCases[i];

      const artGroup = new THREE.Group();
      artGroup.position.copy(slot.pos);
      artGroup.rotation.copy(slot.rot);

      // Outer Frame (Walnut wood / Gilded edge / Cyber Titanium)
      const frameW = 3.6;
      const frameH = 2.4;
      const frameD = 0.12;

      const frameGeo = new THREE.BoxGeometry(frameW, frameH, frameD);
      const frameMat = new THREE.MeshStandardMaterial({
        color: s3d.frameColor,
        roughness: s3d.frameRoughness,
        metalness: s3d.frameMetalness,
      });
      const frameMesh = new THREE.Mesh(frameGeo, frameMat);
      frameMesh.castShadow = true;
      frameMesh.receiveShadow = true;
      artGroup.add(frameMesh);

      // Mat Board
      const matGeo = new THREE.PlaneGeometry(frameW - 0.24, frameH - 0.24);
      const matMat = new THREE.MeshStandardMaterial({ 
        color: currentTheme === 'cyber-neon' ? 0x080d1a : 0xf5eee4, 
        roughness: 0.8 
      });
      const matMesh = new THREE.Mesh(matGeo, matMat);
      matMesh.position.z = frameD / 2 + 0.005;
      artGroup.add(matMesh);

      // Canvas Texture Plane
      const canvasW = frameW - 0.55;
      const canvasH = frameH - 0.55;
      const canvasGeo = new THREE.PlaneGeometry(canvasW, canvasH);

      // Procedural fallback texture while loading
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = 512;
      tempCanvas.height = 340;
      const tctx = tempCanvas.getContext('2d')!;
      tctx.fillStyle = currentTheme === 'ghibli-breeze' ? '#e2ecf1' : '#1c1510';
      tctx.fillRect(0, 0, 512, 340);
      tctx.fillStyle = activeThemeOption.accentColor;
      tctx.font = 'bold 22px serif';
      tctx.textAlign = 'center';
      tctx.fillText(cData.title, 256, 170);
      const tempTexture = new THREE.CanvasTexture(tempCanvas);

      const canvasMat = new THREE.MeshStandardMaterial({
        map: tempTexture,
        roughness: 0.35,
      });
      const canvasMesh = new THREE.Mesh(canvasGeo, canvasMat);
      canvasMesh.position.z = frameD / 2 + 0.015;
      artGroup.add(canvasMesh);

      // Asynchronously load real image texture
      textureLoader.load(
        cData.imageUrl,
        (loadedTex) => {
          loadedTex.colorSpace = THREE.SRGBColorSpace;
          canvasMat.map = loadedTex;
          canvasMat.needsUpdate = true;
        },
        undefined,
        () => {
          console.warn('Procedural fallback used for', cData.title);
        }
      );

      // Dedicated Track Spotlight (Tuned to theme color)
      const spotLight = new THREE.SpotLight(
        s3d.spotlightColor, 
        i === 0 ? s3d.spotlightIntensity : 1.0, 
        11, 
        Math.PI / 4, 
        0.4, 
        1.2
      );
      const spotOffset = new THREE.Vector3(0, 2.2, 2.8).applyEuler(slot.rot);
      spotLight.position.copy(slot.pos).add(spotOffset);
      spotLight.target = frameMesh;
      spotLight.castShadow = true;
      spotLight.shadow.mapSize.width = 512;
      spotLight.shadow.mapSize.height = 512;
      scene.add(spotLight);

      scene.add(artGroup);

      spots.push({
        caseData: cData,
        position: slot.pos,
        rotation: slot.rot,
        cameraPos: slot.cPos,
        cameraLookAt: slot.cLook,
        mesh: artGroup,
        spotlight: spotLight,
      });
    }

    spotsRef.current = spots;

    // Reset or clamp active index
    const validIdx = activeIdx < spots.length ? activeIdx : 0;
    setActiveIdx(validIdx);
    if (spots[validIdx]) {
      targetCamPos.current.copy(spots[validIdx].cameraPos);
      targetLookAt.current.copy(spots[validIdx].cameraLookAt);
      currentCamPos.current.copy(spots[validIdx].cameraPos);
      currentLookAt.current.copy(spots[validIdx].cameraLookAt);
    }

    // =========================================================================
    // 3. RENDER LOOP WITH CAMERA LERP & FLOATING PARTICLES
    // =========================================================================
    const animate = () => {
      // Lerp camera position & target
      const lerpSpeed = 0.045;
      currentCamPos.current.lerp(targetCamPos.current, lerpSpeed);
      currentLookAt.current.lerp(targetLookAt.current, lerpSpeed);

      // Micro parallax tilt from mouse
      const tiltX = mouseTilt.current.x * 0.35;
      const tiltY = mouseTilt.current.y * 0.25;

      camera.position.set(
        currentCamPos.current.x + tiltX,
        currentCamPos.current.y + tiltY,
        currentCamPos.current.z
      );
      camera.lookAt(currentLookAt.current);

      // Animate floating particles
      if (particlesRef.current) {
        const pPositions = particlesRef.current.geometry.attributes.position.array as Float32Array;
        const speed = s3d.particleSpeed;
        for (let j = 1; j < pPositions.length; j += 3) {
          pPositions[j] += speed;
          if (pPositions[j] > 7.0) {
            pPositions[j] = 0.5;
          }
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
        particlesRef.current.rotation.y += 0.0008;
      }

      // Update radar state for mini-map
      setCamRadar({
        x: camera.position.x,
        z: camera.position.z,
        angle: Math.atan2(currentLookAt.current.x - camera.position.x, currentLookAt.current.z - camera.position.z),
      });

      renderer.render(scene, camera);
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    // Resize Handler
    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      renderer.dispose();
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [displayedCases, currentTheme, activeThemeOption]);

  // =========================================================================
  // 4. FLY CAMERA TO SELECTED ARTWORK SPOT
  // =========================================================================
  const flyToArtwork = (idx: number) => {
    const spots = spotsRef.current;
    if (!spots[idx]) return;

    setActiveIdx(idx);
    playMuseumFootstep();
    playGalleryBell(480 + (idx % 6) * 20);

    // Dim all spotlights, boost active spotlight
    const maxSpotIntensity = activeThemeOption.scene3D.spotlightIntensity;
    spots.forEach((sp, i) => {
      if (sp.spotlight) {
        sp.spotlight.intensity = i === idx ? maxSpotIntensity : 0.8;
      }
    });

    targetCamPos.current.copy(spots[idx].cameraPos);
    targetLookAt.current.copy(spots[idx].cameraLookAt);
    setTourProgress(0);
  };

  // Auto Tour Timer (5s per painting)
  useEffect(() => {
    if (!isAutoTour || spotsRef.current.length <= 1) {
      setTourProgress(0);
      return;
    }

    const intervalMs = 50;
    const totalDurationMs = 5000;
    const stepIncrement = (intervalMs / totalDurationMs) * 100;

    const timer = setInterval(() => {
      setTourProgress((prev) => {
        if (prev >= 100) {
          const nextIdx = (activeIdx + 1) % spotsRef.current.length;
          flyToArtwork(nextIdx);
          return 0;
        }
        return prev + stepIncrement;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isAutoTour, activeIdx]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === 'Space') {
        e.preventDefault();
        setIsAutoTour((prev) => !prev);
        playSpotlightClick();
      } else if (e.key === 'ArrowRight') {
        flyToArtwork((activeIdx + 1) % spotsRef.current.length);
      } else if (e.key === 'ArrowLeft') {
        flyToArtwork((activeIdx - 1 + spotsRef.current.length) % spotsRef.current.length);
      } else if (e.key === 'f' || e.key === 'F') {
        setIsLightboxOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsLightboxOpen(false);
        setIsDrawerOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIdx]);

  // Mouse Parallax Tracker
  const handleMouseMove = (e: React.MouseEvent) => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    mouseTilt.current = {
      x: (e.clientX / w - 0.5) * 2,
      y: -(e.clientY / h - 0.5) * 2,
    };
  };

  const handleCopyPrompt = () => {
    if (!activeCase) return;
    playSpotlightClick();
    navigator.clipboard.writeText(activeCase.fullPrompt || '');
    playSuccessChime();
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2200);
  };

  const handleToggleAmbient = () => {
    const isNow = toggleAmbientSound(currentTheme);
    setAmbientPlaying(isNow);
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="relative w-full h-[88vh] sm:h-[90vh] overflow-hidden select-none text-white bg-black font-sans"
    >
      {/* 1. REAL-TIME THREE.JS 3D WEBGL CANVAS CONTAINER */}
      <div ref={mountRef} className="absolute inset-0 z-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* 2. TOP MINIMALIST MUSEUM CONTROL BAR (Floating Glass) */}
      <header className="absolute top-4 inset-x-4 sm:inset-x-8 z-20 flex items-center justify-between pointer-events-none gap-2">
        {/* Brand & Active Scene Info */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="px-3 py-1.5 rounded-full bg-black/65 backdrop-blur-xl border border-white/20 shadow-2xl flex items-center gap-2">
            <div 
              className="w-2.5 h-2.5 rounded-full animate-pulse shadow-[0_0_8px_currentColor]" 
              style={{ color: activeThemeOption.accentColor, backgroundColor: activeThemeOption.accentColor }} 
            />
            <span className="font-serif font-black tracking-wider text-xs uppercase hidden md:inline">
              ART GALLERY · {activeThemeOption.enName}
            </span>
            <span className="font-serif font-bold text-xs md:hidden">
              {activeThemeOption.name}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-amber-300 border border-white/15">
              ROOM 0{Math.floor(activeIdx / 3) + 1}
            </span>
          </div>

          {/* Quick Scenario Preset Chips */}
          <div className="hidden lg:flex items-center gap-1.5 p-1 rounded-full bg-black/55 backdrop-blur-xl border border-white/15">
            {THEME_OPTIONS.map((opt) => {
              const isSelected = opt.id === currentTheme;
              return (
                <button
                  key={opt.id}
                  onClick={() => {
                    playSpotlightClick();
                    onSelectTheme?.(opt.id);
                  }}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-serif transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-white/20 text-white font-bold shadow-md border border-white/30'
                      : 'text-stone-400 hover:text-white hover:bg-white/10'
                  }`}
                  style={{
                    color: isSelected ? opt.accentColor : undefined,
                  }}
                  title={`${opt.name} · ${opt.atmosphere}`}
                >
                  <span 
                    className="w-1.5 h-1.5 rounded-full" 
                    style={{ backgroundColor: opt.accentColor }} 
                  />
                  <span>{opt.name}</span>
                </button>
              );
            })}
          </div>

          {/* Curated Theme Artwork Filter Toggle */}
          <button
            onClick={() => {
              playSpotlightClick();
              setFilterByScene((prev) => !prev);
            }}
            className={`px-2.5 py-1.5 rounded-full text-[11px] font-mono border transition-all cursor-pointer flex items-center gap-1.5 backdrop-blur-md ${
              filterByScene
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                : 'bg-black/50 text-stone-400 border-white/15 hover:text-white'
            }`}
            title="切换：仅展出当前场景专属流派作品 / 展出全部典藏作品"
          >
            <Filter className="w-3 h-3" />
            <span className="hidden sm:inline">{filterByScene ? '场景专属展' : '全部典藏'}</span>
          </button>
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Ambient Soundscape */}
          <button
            onClick={handleToggleAmbient}
            className={`p-2 rounded-full backdrop-blur-md border transition-all cursor-pointer shadow-lg ${
              ambientPlaying 
                ? 'bg-amber-500/25 border-amber-400/50 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.4)]' 
                : 'bg-black/60 border-white/15 text-stone-300 hover:text-white hover:bg-white/10'
            }`}
            title={`展厅静谧音效 · ${activeThemeOption.name}声景`}
          >
            {ambientPlaying ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Auto Tour Mode Button */}
          <button
            onClick={() => {
              playSpotlightClick();
              setIsAutoTour((prev) => !prev);
            }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-sans font-bold shadow-xl transition-all cursor-pointer hover:scale-105 active:scale-95"
            style={{
              backgroundColor: isAutoTour ? '#DC2626' : '#E07A5F',
              color: '#FFFFFF',
              boxShadow: isAutoTour ? '0 0 20px rgba(220,38,38,0.6)' : '0 0 20px rgba(224,122,95,0.4)',
            }}
            title="快捷键：按空格键 Space 开始/暂停"
          >
            {isAutoTour ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>暂停巡礼 (Space)</span>
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>自动漫步巡礼</span>
              </>
            )}
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={() => {
              playSpotlightClick();
              setIsLightboxOpen(true);
            }}
            className="p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-stone-300 hover:text-white transition-all cursor-pointer shadow-lg hover:bg-white/10"
            title="超清全屏鉴赏 (F)"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Auto Tour Glowing Progress Bar */}
      {isAutoTour && (
        <div className="absolute top-0 inset-x-0 h-1 bg-black/40 overflow-hidden z-30">
          <div 
            className="h-full bg-amber-500 transition-all duration-75 ease-linear shadow-[0_0_10px_#f59e0b]"
            style={{ width: `${tourProgress}%` }}
          />
        </div>
      )}

      {/* 3. LEFT VERTICAL ROOM DOTS INDICATOR (Reference Panel 2) */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-3.5 pointer-events-auto p-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10">
        {spotsRef.current.map((_, idx) => (
          <button
            key={idx}
            onClick={() => flyToArtwork(idx)}
            className={`transition-all duration-300 cursor-pointer rounded-full relative group ${
              activeIdx === idx 
                ? 'w-3 h-3 bg-amber-400 shadow-[0_0_12px_#fbbf24] scale-125' 
                : 'w-2 h-2 bg-white/40 hover:bg-white/80'
            }`}
          >
            <span className="absolute left-6 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/20">
              0{idx + 1} · {spotsRef.current[idx]?.caseData.badge}
            </span>
          </button>
        ))}
      </div>

      {/* 4. RIGHT FLOATING FROSTED GLASS PLACARD (Reference Panel 2 & 5) */}
      {isPlacardOpen && activeCase && (
        <aside 
          className="absolute right-4 sm:right-8 top-20 sm:top-24 w-80 sm:w-96 max-h-[70vh] overflow-y-auto rounded-2xl p-6 backdrop-blur-2xl border shadow-2xl text-left z-20 space-y-4 animate-placard-slide"
          style={{
            backgroundColor: 'rgba(18, 14, 10, 0.78)',
            borderColor: 'rgba(255, 255, 255, 0.15)',
            boxShadow: `0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px ${activeThemeOption.glowColor}`,
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/15 pb-3">
            <div className="flex items-center gap-1.5">
              <span 
                className="text-[10px] font-mono font-bold tracking-widest uppercase"
                style={{ color: activeThemeOption.accentColor }}
              >
                EXHIBITION PLACARD · {activeThemeOption.name}
              </span>
            </div>
            <button
              onClick={() => setIsPlacardOpen(false)}
              className="p-1 rounded-full text-stone-400 hover:text-white transition-colors cursor-pointer"
              title="收起展签"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Title & Metadata */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span 
                className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
                style={{
                  backgroundColor: `${activeThemeOption.accentColor}22`,
                  color: activeThemeOption.accentColor,
                  borderColor: `${activeThemeOption.accentColor}44`,
                }}
              >
                {activeCase.badge}
              </span>
              <span className="text-xs font-mono text-stone-400">
                {activeCase.category} · 2026 典藏
              </span>
            </div>
            <h2 className="text-2xl font-serif font-black text-white tracking-tight leading-snug">
              {activeCase.title}
            </h2>
            <p className="text-[11px] font-mono text-stone-400">
              The Museum of Digital Arts · {activeThemeOption.sceneTitle}
            </p>
          </div>

          {/* Curator Aesthetics Quote */}
          <blockquote 
            className="text-xs font-serif italic text-stone-200 leading-relaxed pl-3 py-0.5"
            style={{
              borderLeft: `2px solid ${activeThemeOption.accentColor}`,
            }}
          >
            "{activeCase.description}"
          </blockquote>

          {/* Action Buttons */}
          <div className="pt-2 border-t border-white/10 flex items-center gap-2.5">
            <button
              onClick={handleCopyPrompt}
              className="flex-1 py-2 px-3 rounded-xl font-sans text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-lg hover:brightness-110 active:scale-98"
              style={{
                backgroundColor: copiedPrompt ? '#10B981' : activeThemeOption.accentColor,
                color: '#14100D',
              }}
            >
              {copiedPrompt ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedPrompt ? '已复制 Prompt' : '一键复制 Prompt'}</span>
            </button>

            <button
              onClick={() => setIsDrawerOpen(true)}
              className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-xs font-sans font-semibold transition-all cursor-pointer flex items-center gap-1 hover:scale-105 active:scale-95"
            >
              <Sliders className="w-3.5 h-3.5" style={{ color: activeThemeOption.accentColor }} />
              <span>配方</span>
            </button>
          </div>
        </aside>
      )}

      {/* Toggle Placard Floating Pill (when placard is closed) */}
      {!isPlacardOpen && (
        <button
          onClick={() => setIsPlacardOpen(true)}
          className="absolute right-6 top-24 z-20 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 text-xs font-serif font-bold shadow-xl hover:bg-white/10 cursor-pointer flex items-center gap-1.5"
          style={{ color: activeThemeOption.accentColor }}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>展开展签档案</span>
        </button>
      )}

      {/* 5. BOTTOM-RIGHT 2D MINI-MAP RADAR (Exact Reference Panel 3 match!) */}
      <div 
        className="absolute right-4 sm:right-8 bottom-28 sm:bottom-24 z-20 p-3 rounded-2xl bg-black/75 backdrop-blur-xl border border-white/15 shadow-2xl text-left hidden md:block"
        style={{
          boxShadow: `0 10px 30px rgba(0, 0, 0, 0.7), 0 0 20px ${activeThemeOption.glowColor}`,
        }}
      >
        <div className="flex items-center justify-between text-[9px] font-mono text-stone-400 mb-2 border-b border-white/10 pb-1">
          <span className="flex items-center gap-1 font-bold" style={{ color: activeThemeOption.accentColor }}>
            <Compass className="w-3 h-3" />
            <span>{activeThemeOption.enName.toUpperCase()} · RADAR</span>
          </span>
          <span className="text-stone-400">ROOM 0{Math.floor(activeIdx / 3) + 1}</span>
        </div>

        {/* 2D Architectural Floorplan Canvas with theme-specific backdrop */}
        <div 
          className="relative w-36 h-28 rounded-lg border border-white/10 overflow-hidden"
          style={{
            backgroundColor: currentTheme === 'zen-mist' ? '#0d1310' : currentTheme === 'cyber-neon' ? '#040711' : currentTheme === 'grand-salon' ? '#18110b' : currentTheme === 'ghibli-breeze' ? '#c8d6df' : '#140f0c',
          }}
        >
          {/* Partition Wall Lines */}
          <div className="absolute inset-x-4 top-1/3 h-0.5 bg-white/20" />
          <div className="absolute inset-x-4 bottom-1/3 h-0.5 bg-white/20" />
          <div className="absolute inset-y-4 left-1/2 w-0.5 bg-white/10" />

          {/* Central Bench in radar */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-2 bg-stone-700 rounded-xs" />

          {/* Artwork Pins on Walls */}
          {spotsRef.current.map((sp, i) => {
            const mapX = ((sp.position.x + 18) / 36) * 144;
            const mapY = ((sp.position.z + 18) / 36) * 112;
            const isActive = i === activeIdx;

            return (
              <button
                key={i}
                onClick={() => flyToArtwork(i)}
                className={`absolute w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all cursor-pointer ${
                  isActive ? 'scale-150 z-20 shadow-md' : 'bg-white/40 hover:bg-white'
                }`}
                style={{ 
                  left: `${mapX}px`, 
                  top: `${mapY}px`,
                  backgroundColor: isActive ? activeThemeOption.accentColor : undefined,
                  boxShadow: isActive ? `0 0 10px ${activeThemeOption.accentColor}` : undefined,
                }}
                title={sp.caseData.title}
              />
            );
          })}

          {/* Live Camera Position & Viewing Cone Radar */}
          {(() => {
            const camX = ((camRadar.x + 18) / 36) * 144;
            const camY = ((camRadar.z + 18) / 36) * 112;
            const deg = (camRadar.angle * 180) / Math.PI;

            return (
              <div 
                className="absolute w-3 h-3 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30"
                style={{ left: `${camX}px`, top: `${camY}px` }}
              >
                {/* Camera dot */}
                <span 
                  className="w-2.5 h-2.5 rounded-full block" 
                  style={{
                    backgroundColor: activeThemeOption.accentColor,
                    boxShadow: `0 0 8px ${activeThemeOption.accentColor}`,
                  }}
                />
                {/* Viewing cone triangle */}
                <div 
                  className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[14px] absolute left-1/2 -top-3.5 -translate-x-1/2 origin-bottom"
                  style={{ 
                    borderBottomColor: `${activeThemeOption.accentColor}55`,
                    transform: `rotate(${deg}deg)`,
                  }}
                />
              </div>
            );
          })()}
        </div>
      </div>

      {/* 6. BOTTOM CENTERED FLOATING CAROUSEL STRIP (Reference Panel 4 match!) */}
      <footer className="absolute bottom-4 inset-x-4 sm:inset-x-8 z-20 flex flex-col items-center gap-2 pointer-events-none">
        
        {/* Floating Controller Pill */}
        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-black/75 backdrop-blur-2xl border border-white/20 shadow-2xl pointer-events-auto">
          <button
            onClick={() => flyToArtwork((activeIdx - 1 + spotsRef.current.length) % spotsRef.current.length)}
            className="p-1.5 rounded-full hover:bg-white/15 transition-all text-stone-300 hover:text-white cursor-pointer active:scale-95"
            title="上一幅作品 (←)"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="text-xs font-mono px-2 text-amber-300 font-bold">
            0{activeIdx + 1} / 0{spotsRef.current.length}
          </span>

          <button
            onClick={() => flyToArtwork((activeIdx + 1) % spotsRef.current.length)}
            className="p-1.5 rounded-full hover:bg-white/15 transition-all text-stone-300 hover:text-white cursor-pointer active:scale-95"
            title="下一幅作品 (→)"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Thumbnail Filmstrip Carousel (Exact match to panel 4!) */}
        <div className="flex items-center gap-2.5 overflow-x-auto max-w-full px-4 py-1.5 scrollbar-none pointer-events-auto">
          {spotsRef.current.map((sp, idx) => {
            const isCur = idx === activeIdx;
            return (
              <button
                key={idx}
                onClick={() => flyToArtwork(idx)}
                className={`relative shrink-0 w-16 sm:w-20 aspect-[16/10] rounded-lg overflow-hidden border transition-all duration-300 cursor-pointer ${
                  isCur 
                    ? 'ring-2 scale-110' 
                    : 'opacity-50 hover:opacity-100 border-white/20 hover:scale-105'
                }`}
                style={{
                  borderColor: isCur ? activeThemeOption.accentColor : undefined,
                  boxShadow: isCur ? `0 0 16px ${activeThemeOption.accentColor}` : undefined,
                }}
              >
                <img
                  src={sp.caseData.imageUrl}
                  alt={sp.caseData.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0.5 right-1 text-[8px] font-mono px-1 rounded bg-black/80 text-white font-bold">
                  0{idx + 1}
                </span>
              </button>
            );
          })}
        </div>
      </footer>

      {/* 7. SLIDE-OUT PROMPT RECIPE DRAWER */}
      {isDrawerOpen && activeCase && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="flex-1" onClick={() => setIsDrawerOpen(false)} />

          <div className="w-full max-w-lg h-full overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl text-left border-l border-white/15 bg-[#120e0a]/95 backdrop-blur-2xl animate-placard-slide text-stone-200">
            <div className="flex items-center justify-between border-b border-white/15 pb-4">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-amber-400" />
                <h2 className="text-lg font-serif font-black text-white">
                  策展档案与 AI 提示词积木拆解
                </h2>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 rounded-full border border-white/15 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Artwork Mini Card */}
            <div className="p-3.5 rounded-xl border border-white/10 bg-white/5 flex items-center gap-4">
              <img
                src={activeCase.imageUrl}
                alt={activeCase.title}
                className="w-20 h-20 object-cover rounded-lg border border-white/20 shadow-md shrink-0"
              />
              <div className="space-y-1">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-amber-300">
                  {activeCase.badge} · {activeCase.category}
                </span>
                <h3 className="text-sm font-bold text-white">{activeCase.title}</h3>
                <p className="text-xs text-stone-400 line-clamp-2">
                  {activeCase.description}
                </p>
              </div>
            </div>

            {/* Full Prompt */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-300">
                  完整提示词 (Full Prompt)
                </span>
                <button
                  onClick={handleCopyPrompt}
                  className="flex items-center gap-1 text-xs font-bold text-amber-400 cursor-pointer hover:opacity-80"
                >
                  {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPrompt ? '已复制！' : '一键复制'}</span>
                </button>
              </div>
              <div className="p-3.5 rounded-xl border border-white/15 bg-black/60 font-mono text-xs leading-relaxed select-all text-stone-200">
                {activeCase.fullPrompt}
              </div>
            </div>

            {/* Prompt Blocks */}
            {activeCase.promptBlocks && (
              <div className="space-y-3 pt-2 border-t border-white/10">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  模块化提示词积木解析 (Prompt Blocks)
                </h4>

                <div className="p-3 rounded-lg border border-white/10 bg-white/5 space-y-1">
                  <div className="text-[11px] font-bold text-amber-400">[1. 核心主体 · Subject]</div>
                  <div className="text-xs font-mono text-stone-300">{activeCase.promptBlocks.subject}</div>
                </div>

                <div className="p-3 rounded-lg border border-white/10 bg-white/5 space-y-1">
                  <div className="text-[11px] font-bold text-amber-400">[2. 艺术基底 · Style Base]</div>
                  <div className="text-xs font-mono text-stone-300">{activeCase.promptBlocks.style}</div>
                </div>

                <div className="p-3 rounded-lg border border-white/10 bg-white/5 space-y-1">
                  <div className="text-[11px] font-bold text-amber-400">[3. 材质与笔触 · Texture]</div>
                  <div className="text-xs font-mono text-stone-300">{activeCase.promptBlocks.texture}</div>
                </div>

                <div className="p-3 rounded-lg border border-white/10 bg-white/5 space-y-1">
                  <div className="text-[11px] font-bold text-amber-400">[4. 光影氛围 · Lighting]</div>
                  <div className="text-xs font-mono text-stone-300">{activeCase.promptBlocks.lighting}</div>
                </div>

                <div className="p-3 rounded-lg border border-white/10 bg-white/5 space-y-1">
                  <div className="text-[11px] font-bold text-amber-400">[5. 构图视角 · Composition]</div>
                  <div className="text-xs font-mono text-stone-300">{activeCase.promptBlocks.composition}</div>
                </div>

                <div className="p-3 rounded-lg border border-white/10 bg-white/5 space-y-1">
                  <div className="text-[11px] font-bold text-amber-400">[6. 模型参数 · Parameters]</div>
                  <div className="text-xs font-mono text-stone-300">{activeCase.promptBlocks.parameters}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 8. FULLSCREEN LIGHTBOX */}
      {isLightboxOpen && activeCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 md:p-8 animate-fadeIn">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-5 right-5 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer z-50"
            title="关闭全屏 (Esc)"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-6xl w-full max-h-[90vh] flex flex-col items-center justify-center">
            <img
              src={activeCase.imageUrl}
              alt={activeCase.title}
              className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl border border-white/20 animate-curtain-sweep"
            />
            <div className="mt-4 text-center space-y-1 text-white">
              <h3 className="text-xl font-serif font-black">{activeCase.title}</h3>
              <p className="text-xs opacity-70 font-sans">{activeCase.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
