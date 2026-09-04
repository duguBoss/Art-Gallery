import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import type { AIImageCase } from '../types/art';
import { THEME_OPTIONS, type GalleryTheme } from '../types/theme';
import { 
  Play, Pause, ChevronLeft, ChevronRight, Maximize2, 
  Copy, Check, Volume2, VolumeX, Sliders, X, Sparkles, Compass, Eye, Filter, Layers, Shapes
} from 'lucide-react';
import { playSpotlightClick, playSuccessChime, playMuseumFootstep, playGalleryBell, toggleAmbientSound } from '../utils/audio';
import { getShapeDataUri, type ShapeConfig } from '../utils/shapeGenerators';

interface ThreeSpatialGalleryProps {
  imageCases: AIImageCase[];
  currentTheme?: GalleryTheme;
  onSelectTheme?: (theme: GalleryTheme) => void;
  customProjectedShape?: { svg: string; title: string } | null;
  onOpenShapesStudio?: () => void;
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
  customProjectedShape,
  onOpenShapesStudio,
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

  // Compute Book of Shapes generative piece for this theme / custom projection
  const shapeCase = useMemo<AIImageCase>(() => {
    if (customProjectedShape) {
      const dataUri = `data:image/svg+xml;utf8,${encodeURIComponent(customProjectedShape.svg)}`;
      return {
        id: 'shape-custom-projected',
        title: `《${customProjectedShape.title}》· 展厅中央光影装置`,
        enTitle: 'Custom Generative SVG Installation',
        category: activeThemeOption.featuredCategories[0] || '形态之书',
        badge: '用户定制 · Book of Shapes',
        description: '你在“形态之书 · 纯粹矢量数学工坊”中实时微调参数生成的生成式数学几何矢量装置，已光影投射至 3D 展厅中央主展位。',
        coverImage: dataUri,
        imageUrl: dataUri,
        tags: ['形态之书', '定制投影', '算法几何', '纯净矢量', 'BookOfShapes'],
        fullPrompt: 'custom algorithmic generative vector art, Book of Shapes style, mathematical precision, crisp vector SVG linework, minimalist bauhaus composition --v 6.0 --ar 1:1',
        promptBlocks: {
          subject: 'custom algorithmic generative vector art, Book of Shapes style, mathematical precision',
          style: 'Minimalist Bauhaus algorithmic geometry',
          texture: 'crisp vector SVG linework, high resolution vector',
          lighting: 'gallery ambient spotlight illumination',
          composition: 'centered generative mathematical pattern',
          parameters: '--v 6.0 --ar 1:1 --no raster, blur'
        },
        colorSwatches: [
          { name: '主题色', hex: activeThemeOption.accentColor },
          { name: '深底色', hex: activeThemeOption.previewColor },
        ],
        promptRecipe: {
          mjPrompt: 'custom algorithmic generative vector art, Book of Shapes style, mathematical precision, crisp vector SVG linework, minimalist bauhaus composition --v 6.0',
          positiveKeywords: ['generative art', 'vector linework', 'book of shapes', 'mathematical precision', 'minimalist'],
          negativeKeywords: ['raster blur', 'pixelated', 'low resolution', 'messy sketch'],
          parameters: '--v 6.0 --ar 1:1',
        },
        techniqueGuide: {
          medium: '纯净 SVG 矢量绘制 (Scalable Vector Graphics)',
          brushwork: '数学参数化方程精确几何采样',
          lighting: '3D 展厅定向聚光灯实时照射',
          composition: '中心对称 / 黄金分割递缩'
        }
      };
    }

    let config: ShapeConfig;
    let title = '';
    let enTitle = '';
    let desc = '';
    let tags: string[] = [];
    let subject = '';

    if (currentTheme === 'cozy-night') {
      config = {
        type: 'joy-division',
        density: 8,
        strokeWidth: 1.8,
        variance: 0.65,
        rotation: 0,
        colorScheme: '#E07A5F',
        accentColor: '#F2CC8F',
        bgColor: '#1A1410',
        seed: 1919,
      };
      title = '脉冲波形与暖光声场 · PSR 1919';
      enTitle = 'Pulsar PSR Waveforms Resonance';
      desc = '源于阿雷西博射电望远镜对人类首颗脉冲星 PSR B1919+21 的无线电电平记录。在暖夜壁炉与琥珀灯光映照下，高斯包络函数平滑叠织出宛如山脊的深空声波。';
      tags = ['形态之书', '高斯波形', '射电脉冲星', '温暖声场', 'BookOfShapes'];
      subject = 'Joy Division Unknown Pleasures inspired stacked radio pulsar waveforms, PSR B1919+21 data visualization, topographical ridge lines';
    } else if (currentTheme === 'zen-mist') {
      config = {
        type: 'brockmann-arcs',
        density: 7,
        strokeWidth: 2.2,
        variance: 0.55,
        rotation: 45,
        colorScheme: '#52B788',
        accentColor: '#D8F3DC',
        bgColor: '#121A15',
        seed: 88,
      };
      title = '布罗克曼雨痕同心弧 · 禅径';
      enTitle = 'Brockmann Modernist Arcs in Zen Rain';
      desc = '致敬瑞士现代主义平面设计大师布罗克曼。同心圆环被精确的角速度与间隙切割，如空山竹雨滴落在青石水潭泛起的幽静涟漪。';
      tags = ['形态之书', '布罗克曼同心弧', '瑞士平面设计', '水墨禅意', 'BookOfShapes'];
      subject = 'Josef Müller-Brockmann modernist Swiss graphic design, concentric broken radial arcs, geometric constructivism, precision drafting';
    } else if (currentTheme === 'cyber-neon') {
      config = {
        type: 'interference-mesh',
        density: 8,
        strokeWidth: 1.4,
        variance: 0.35,
        rotation: 15,
        colorScheme: '#00F0FF',
        accentColor: '#FF007F',
        bgColor: '#060913',
        seed: 2077,
      };
      title = '莫尔干涉频纹与轴测晶格 · 赛博光栅';
      enTitle = 'Moiré Interference & Cyber Mesh';
      desc = '微小相角偏差的双层微密光栅相互旋转干涉，在湿漉霓虹街町的冷调全息立面上，投射出深邃而具催眠感的宏观物理光通量波纹。';
      tags = ['形态之书', '莫尔干涉', '等角晶格', '赛博霓虹', 'BookOfShapes'];
      subject = 'Moiré pattern interference mesh, optical illusion concentric grid distortion, hypnotic wave frequencies, overlapping rotated line grids';
    } else if (currentTheme === 'grand-salon') {
      config = {
        type: 'sacred-polygons',
        density: 6,
        strokeWidth: 2.0,
        variance: 0.45,
        rotation: 0,
        colorScheme: '#DFB15B',
        accentColor: '#FAF0CA',
        bgColor: '#1C150F',
        seed: 1618,
      };
      title = '斐波那契黄金分割多边形 · 殿堂勋章';
      enTitle = 'Sacred Fibonacci Polygons Medallion';
      desc = '沿黄金分割比向内递缩并以恒定角速度旋转的嵌套多边形，在卢浮古典拱顶与科林斯柱廊下，宛如文艺复兴数学大师手绘的神圣几何图腾。';
      tags = ['形态之书', '斐波那契螺旋', '神圣几何', '殿堂金叶', 'BookOfShapes'];
      subject = 'sacred geometry nested rotating polygons, Fibonacci golden ratio scaling, star tetrahedron diagonals, ancient hermetic mathematical diagram';
    } else {
      config = {
        type: 'flow-streamlines',
        density: 7,
        strokeWidth: 1.6,
        variance: 0.5,
        rotation: 0,
        colorScheme: '#3A86FF',
        accentColor: '#80ED99',
        bgColor: '#0F1A1C',
        seed: 777,
      };
      title = '麦浪流场引力矢量线 · 夏风轨迹';
      enTitle = 'Curl Flow Streamlines in Summer Breeze';
      desc = '二维向量场梯度积分前进追踪柔性气流，宛如吉卜力动画中吹拂金黄麦浪与碧绿草甸的无形夏风，在露天画架上化作轻盈跳跃的丝绸轨迹。';
      tags = ['形态之书', '流场流线', '气动矢量', '夏日微风', 'BookOfShapes'];
      subject = 'algorithmic vector flow field streamlines, generative fluid dynamics, organic curving lines, wind vector field visualization';
    }

    const dataUri = getShapeDataUri(config, 1024);

    return {
      id: `shape-${config.type}`,
      title,
      enTitle,
      category: activeThemeOption.featuredCategories[0] || '形态之书',
      badge: '形态之书 · 算法矢量',
      description: desc,
      coverImage: dataUri,
      imageUrl: dataUri,
      tags,
      fullPrompt: `${subject}, vector linework, stroke width ${config.strokeWidth}px, density ${config.density}, mathematically precise generative SVG art, by Nikolaj Sokolowski Book of Shapes --v 6.0 --ar 1:1`,
      promptBlocks: {
        subject,
        style: 'Book of Shapes generative Bauhaus vector',
        texture: 'mathematically precise vector SVG, clean lines, Book of Shapes style by Nikolaj Sokolowski',
        lighting: `${activeThemeOption.name} ambient lighting and track spotlight`,
        composition: 'pure mathematical generative geometry',
        parameters: '--ar 1:1 --v 6.0 --no blur, raster'
      },
      colorSwatches: [
        { name: '主要线条', hex: config.colorScheme },
        { name: '高光强调', hex: config.accentColor },
        { name: '基底暗色', hex: config.bgColor },
      ],
      promptRecipe: {
        mjPrompt: `${subject}, vector linework, stroke width ${config.strokeWidth}px, density ${config.density}, mathematically precise generative SVG art, by Nikolaj Sokolowski Book of Shapes --v 6.0`,
        positiveKeywords: ['generative vector', 'book of shapes', 'algorithmic geometry', 'mathematical precision', 'minimalism'],
        negativeKeywords: ['photorealistic messy texture', 'raster noise', 'low quality'],
        parameters: '--v 6.0 --ar 1:1',
      },
      techniqueGuide: {
        medium: '纯净 SVG 矢量绘制 (Scalable Vector Graphics)',
        brushwork: '数学参数化方程精确几何采样',
        lighting: '3D 展厅定向聚光灯实时照射',
        composition: '中心对称 / 黄金分割递缩'
      }
    };
  }, [currentTheme, customProjectedShape, activeThemeOption]);

  // Curate display cases: Prepend signature Book of Shapes piece to the wall exhibits!
  const displayedCases = useMemo(() => {
    let baseList = imageCases;
    if (filterByScene) {
      const cats = activeThemeOption.featuredCategories;
      const matched = imageCases.filter((c) => cats.includes(c.category));
      if (matched.length > 0) {
        if (matched.length < 6) {
          const others = imageCases.filter((c) => !cats.includes(c.category));
          baseList = [...matched, ...others].slice(0, 9);
        } else {
          baseList = matched.slice(0, 9);
        }
      }
    }
    return [shapeCase, ...baseList];
  }, [imageCases, activeThemeOption, filterByScene, shapeCase]);

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

    // =========================================================================
    // 2. BUILD DISTINCT 3D ARCHITECTURAL WORLD PER THEME
    // =========================================================================
    const archStyle = s3d.architecturalStyle;
    const wallSlots: { pos: THREE.Vector3; rot: THREE.Euler; cPos: THREE.Vector3; cLook: THREE.Vector3 }[] = [];

    // --- Scene 1: Cabin (暖夜微光 · 壁炉老木屋) ---
    if (archStyle === 'cabin') {
      // 1. Slanted Timber Roof / Low warm cabin ceiling
      const roofLGeo = new THREE.PlaneGeometry(36, 20);
      const roofMat = new THREE.MeshStandardMaterial({ color: 0x1a120b, roughness: 0.9 });
      const roofL = new THREE.Mesh(roofLGeo, roofMat);
      roofL.position.set(-8, 5.5, 0);
      roofL.rotation.set(0, 0, Math.PI / 6);
      scene.add(roofL);

      const roofR = new THREE.Mesh(roofLGeo, roofMat);
      roofR.position.set(8, 5.5, 0);
      roofR.rotation.set(0, 0, -Math.PI / 6);
      scene.add(roofR);

      // Heavy rustic wood crossbeams
      const beamGeo = new THREE.BoxGeometry(28, 0.4, 0.4);
      const beamMat = new THREE.MeshStandardMaterial({ color: 0x24170e, roughness: 0.8 });
      for (let bz = -12; bz <= 12; bz += 6) {
        const beam = new THREE.Mesh(beamGeo, beamMat);
        beam.position.set(0, 4.8, bz);
        scene.add(beam);
      }

      // 2. Real 3D Stone Fireplace with dancing firelight
      const hearthGroup = new THREE.Group();
      hearthGroup.position.set(0, 0, -11.5);
      
      const hearthBaseGeo = new THREE.BoxGeometry(6.5, 3.8, 2.0);
      const hearthMat = new THREE.MeshStandardMaterial({ color: 0x2a1e16, roughness: 0.95 });
      const hearthBase = new THREE.Mesh(hearthBaseGeo, hearthMat);
      hearthBase.position.y = 1.9;
      hearthGroup.add(hearthBase);

      const chimneyGeo = new THREE.BoxGeometry(2.4, 4.0, 1.8);
      const chimney = new THREE.Mesh(chimneyGeo, hearthMat);
      chimney.position.set(0, 4.8, 0);
      hearthGroup.add(chimney);

      // Fireplace pit cavity
      const firePitGeo = new THREE.BoxGeometry(3.0, 1.8, 1.2);
      const firePitMat = new THREE.MeshBasicMaterial({ color: 0x0a0604 });
      const firePit = new THREE.Mesh(firePitGeo, firePitMat);
      firePit.position.set(0, 1.0, 0.5);
      hearthGroup.add(firePit);

      // Fire glowing embers
      const emberGeo = new THREE.DodecahedronGeometry(0.5);
      const emberMat = new THREE.MeshBasicMaterial({ color: 0xff4500 });
      const ember = new THREE.Mesh(emberGeo, emberMat);
      ember.position.set(0, 0.8, 0.5);
      hearthGroup.add(ember);

      // Fire light flickering
      const fireLight = new THREE.PointLight(0xff7722, 2.8, 15);
      fireLight.position.set(0, 1.2, 0.8);
      hearthGroup.add(fireLight);

      scene.add(hearthGroup);

      // 3. Wooden Walls and Partitions
      const wallMat = new THREE.MeshStandardMaterial({ map: wallTexture, roughness: 0.9 });
      const createCabinWall = (w: number, h: number, x: number, y: number, z: number, ry: number) => {
        const wall = new THREE.Mesh(new THREE.PlaneGeometry(w, h), wallMat);
        wall.position.set(x, y, z);
        wall.rotation.y = ry;
        scene.add(wall);
        return wall;
      };

      createCabinWall(28, 6, 0, 3, -12, 0);
      createCabinWall(28, 6, 0, 3, 12, Math.PI);
      createCabinWall(24, 6, -14, 3, 0, Math.PI / 2);
      createCabinWall(24, 6, 14, 3, 0, -Math.PI / 2);

      // Bookshelves partitions
      const shelfGeo = new THREE.BoxGeometry(4.5, 4.2, 0.8);
      const shelfMat = new THREE.MeshStandardMaterial({ color: 0x22150d, roughness: 0.7 });
      const shelfL = new THREE.Mesh(shelfGeo, shelfMat);
      shelfL.position.set(-6, 2.1, -4);
      scene.add(shelfL);

      const shelfR = new THREE.Mesh(shelfGeo, shelfMat);
      shelfR.position.set(6, 2.1, -4);
      scene.add(shelfR);

      // Cabin Artwork Positions (Above Fireplace, Wooden Walls, Cozy Nook)
      wallSlots.push(
        { pos: new THREE.Vector3(0, 3.2, -10.4), rot: new THREE.Euler(0, 0, 0), cPos: new THREE.Vector3(0, 2.8, -6.5), cLook: new THREE.Vector3(0, 3.0, -10.4) },
        { pos: new THREE.Vector3(-6, 2.9, -3.4), rot: new THREE.Euler(0, 0, 0), cPos: new THREE.Vector3(-6, 2.8, 0.2), cLook: new THREE.Vector3(-6, 2.8, -3.4) },
        { pos: new THREE.Vector3(6, 2.9, -3.4), rot: new THREE.Euler(0, 0, 0), cPos: new THREE.Vector3(6, 2.8, 0.2), cLook: new THREE.Vector3(6, 2.8, -3.4) },
        { pos: new THREE.Vector3(-13.8, 3.0, -5), rot: new THREE.Euler(0, Math.PI / 2, 0), cPos: new THREE.Vector3(-9.8, 2.8, -5), cLook: new THREE.Vector3(-13.8, 2.8, -5) },
        { pos: new THREE.Vector3(-13.8, 3.0, 5), rot: new THREE.Euler(0, Math.PI / 2, 0), cPos: new THREE.Vector3(-9.8, 2.8, 5), cLook: new THREE.Vector3(-13.8, 2.8, 5) },
        { pos: new THREE.Vector3(13.8, 3.0, -5), rot: new THREE.Euler(0, -Math.PI / 2, 0), cPos: new THREE.Vector3(9.8, 2.8, -5), cLook: new THREE.Vector3(13.8, 2.8, -5) },
        { pos: new THREE.Vector3(13.8, 3.0, 5), rot: new THREE.Euler(0, -Math.PI / 2, 0), cPos: new THREE.Vector3(9.8, 2.8, 5), cLook: new THREE.Vector3(13.8, 2.8, 5) },
        { pos: new THREE.Vector3(0, 3.0, 11.8), rot: new THREE.Euler(0, Math.PI, 0), cPos: new THREE.Vector3(0, 2.8, 7.8), cLook: new THREE.Vector3(0, 2.8, 11.8) }
      );
    } 
    // --- Scene 2: Zen Pavilion (空山新雨 · 东方水墨水榭) ---
    else if (archStyle === 'zen-pavilion') {
      // 1. Water Basin (Reflective dark jade water)
      const waterGeo = new THREE.PlaneGeometry(36, 36);
      const waterMat = new THREE.MeshStandardMaterial({ color: 0x0a1410, roughness: 0.1, metalness: 0.9 });
      const water = new THREE.Mesh(waterGeo, waterMat);
      water.rotation.x = -Math.PI / 2;
      water.position.y = -0.3;
      scene.add(water);

      // Elevated Slate Deck (悬空临水木台)
      const deckGeo = new THREE.BoxGeometry(26, 0.4, 26);
      const deckMat = new THREE.MeshStandardMaterial({ map: floorTexture, roughness: 0.85 });
      const deck = new THREE.Mesh(deckGeo, deckMat);
      deck.position.set(0, 0, 0);
      scene.add(deck);

      // Eaves & Curved Roof Overhang (青瓦飞檐长廊)
      const roofGeo = new THREE.ConeGeometry(22, 4, 4);
      const roofMat = new THREE.MeshStandardMaterial({ color: 0x0f1612, roughness: 0.9 });
      const roof = new THREE.Mesh(roofGeo, roofMat);
      roof.position.set(0, 8.5, 0);
      roof.rotation.y = Math.PI / 4;
      scene.add(roof);

      // 2. Traditional Moon Gate Wall (经典圆形月亮门拱墙)
      const moonWallGeo = new THREE.BoxGeometry(10, 6, 0.4);
      const moonMat = new THREE.MeshStandardMaterial({ color: 0x152019, roughness: 0.95 });
      const moonWallL = new THREE.Mesh(new THREE.BoxGeometry(3.5, 6, 0.4), moonMat);
      moonWallL.position.set(-4.5, 3, -4);
      scene.add(moonWallL);

      const moonWallR = new THREE.Mesh(new THREE.BoxGeometry(3.5, 6, 0.4), moonMat);
      moonWallR.position.set(4.5, 3, -4);
      scene.add(moonWallR);

      // Moon Gate Ring (圆形木质拱门框)
      const ringGeo = new THREE.TorusGeometry(2.4, 0.15, 16, 32);
      const ringMat = new THREE.MeshStandardMaterial({ color: 0x2b1e15, roughness: 0.5 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(0, 3, -4);
      scene.add(ring);

      // 3. Wabi-sabi Rock Garden Sculpture (中庭枯山水石笋)
      const rockGeo = new THREE.DodecahedronGeometry(1.2, 1);
      const rockMat = new THREE.MeshStandardMaterial({ color: 0x1d2720, roughness: 0.9 });
      const rock1 = new THREE.Mesh(rockGeo, rockMat);
      rock1.position.set(0, 0.8, -8);
      rock1.scale.set(1.1, 2.2, 0.9);
      scene.add(rock1);

      // Zen Screen Panels (细木格栅与宣纸屏风)
      const screenGeo = new THREE.BoxGeometry(0.1, 4.5, 6.0);
      const screenMat = new THREE.MeshStandardMaterial({ color: 0x18261e, roughness: 0.8 });
      const screenW = new THREE.Mesh(screenGeo, screenMat);
      screenW.position.set(-10, 2.25, 0);
      scene.add(screenW);

      const screenE = new THREE.Mesh(screenGeo, screenMat);
      screenE.position.set(10, 2.25, 0);
      scene.add(screenE);

      // Zen Artwork Placements (Along screen walls & beyond moon gate)
      wallSlots.push(
        { pos: new THREE.Vector3(-4.5, 3.2, -3.7), rot: new THREE.Euler(0, 0, 0), cPos: new THREE.Vector3(-4.5, 3.0, 0.2), cLook: new THREE.Vector3(-4.5, 3.0, -3.7) },
        { pos: new THREE.Vector3(4.5, 3.2, -3.7), rot: new THREE.Euler(0, 0, 0), cPos: new THREE.Vector3(4.5, 3.0, 0.2), cLook: new THREE.Vector3(4.5, 3.0, -3.7) },
        { pos: new THREE.Vector3(0, 3.5, -12.5), rot: new THREE.Euler(0, 0, 0), cPos: new THREE.Vector3(0, 3.2, -7.5), cLook: new THREE.Vector3(0, 3.3, -12.5) },
        { pos: new THREE.Vector3(-9.8, 3.2, 0), rot: new THREE.Euler(0, Math.PI / 2, 0), cPos: new THREE.Vector3(-5.8, 3.0, 0), cLook: new THREE.Vector3(-9.8, 3.0, 0) },
        { pos: new THREE.Vector3(9.8, 3.2, 0), rot: new THREE.Euler(0, -Math.PI / 2, 0), cPos: new THREE.Vector3(5.8, 3.0, 0), cLook: new THREE.Vector3(9.8, 3.0, 0) },
        { pos: new THREE.Vector3(-4.5, 3.2, 8), rot: new THREE.Euler(0, Math.PI, 0), cPos: new THREE.Vector3(-4.5, 3.0, 4), cLook: new THREE.Vector3(-4.5, 3.0, 8) },
        { pos: new THREE.Vector3(4.5, 3.2, 8), rot: new THREE.Euler(0, Math.PI, 0), cPos: new THREE.Vector3(4.5, 3.0, 4), cLook: new THREE.Vector3(4.5, 3.0, 8) }
      );
    }
    // --- Scene 3: Cyber Street (赛博雨夜 · 霓虹全息街町) ---
    else if (archStyle === 'cyber-street') {
      // 1. Skyscraper Walls (高耸深巷建筑立面 Height: 14m)
      const towerMatL = new THREE.MeshStandardMaterial({ color: 0x060a14, roughness: 0.3, metalness: 0.7 });
      const towerL = new THREE.Mesh(new THREE.BoxGeometry(6, 16, 36), towerMatL);
      towerL.position.set(-11, 8, 0);
      scene.add(towerL);

      const towerR = new THREE.Mesh(new THREE.BoxGeometry(6, 16, 36), towerMatL);
      towerR.position.set(11, 8, 0);
      scene.add(towerR);

      // Overpass Highway Bridge (上方悬空高架桥)
      const bridgeGeo = new THREE.BoxGeometry(22, 1.2, 5.0);
      const bridgeMat = new THREE.MeshStandardMaterial({ color: 0x081020, metalness: 0.9, roughness: 0.2 });
      const bridge = new THREE.Mesh(bridgeGeo, bridgeMat);
      bridge.position.set(0, 9.5, -4);
      scene.add(bridge);

      // 2. Glowing Neon Columns & Holographic Bilboards (3D 全息霓虹灯柱)
      const pillarGeo = new THREE.CylinderGeometry(0.3, 0.3, 10, 16);
      const neonCyanMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
      const neonPinkMat = new THREE.MeshBasicMaterial({ color: 0xff007f });

      const pillar1 = new THREE.Mesh(pillarGeo, neonCyanMat);
      pillar1.position.set(-7.5, 5, -8);
      scene.add(pillar1);

      const pillar2 = new THREE.Mesh(pillarGeo, neonPinkMat);
      pillar2.position.set(7.5, 5, -8);
      scene.add(pillar2);

      const pillar3 = new THREE.Mesh(pillarGeo, neonPinkMat);
      pillar3.position.set(-7.5, 5, 8);
      scene.add(pillar3);

      const pillar4 = new THREE.Mesh(pillarGeo, neonCyanMat);
      pillar4.position.set(7.5, 5, 8);
      scene.add(pillar4);

      // Hanging Industrial Ventilation Ducts (金属工业管道)
      const ductGeo = new THREE.CylinderGeometry(0.6, 0.6, 16, 16);
      const ductMat = new THREE.MeshStandardMaterial({ color: 0x111c2e, metalness: 0.9, roughness: 0.3 });
      const duct = new THREE.Mesh(ductGeo, ductMat);
      duct.rotation.z = Math.PI / 2;
      duct.position.set(0, 7.5, 4);
      scene.add(duct);

      // Street Artwork Positions (Hung on towering cyber facades & end of alley)
      wallSlots.push(
        { pos: new THREE.Vector3(-7.8, 3.6, -10), rot: new THREE.Euler(0, Math.PI / 2, 0), cPos: new THREE.Vector3(-3.5, 3.2, -10), cLook: new THREE.Vector3(-7.8, 3.4, -10) },
        { pos: new THREE.Vector3(-7.8, 3.6, -3), rot: new THREE.Euler(0, Math.PI / 2, 0), cPos: new THREE.Vector3(-3.5, 3.2, -3), cLook: new THREE.Vector3(-7.8, 3.4, -3) },
        { pos: new THREE.Vector3(-7.8, 3.6, 5), rot: new THREE.Euler(0, Math.PI / 2, 0), cPos: new THREE.Vector3(-3.5, 3.2, 5), cLook: new THREE.Vector3(-7.8, 3.4, 5) },
        { pos: new THREE.Vector3(7.8, 3.6, -10), rot: new THREE.Euler(0, -Math.PI / 2, 0), cPos: new THREE.Vector3(3.5, 3.2, -10), cLook: new THREE.Vector3(7.8, 3.4, -10) },
        { pos: new THREE.Vector3(7.8, 3.6, -3), rot: new THREE.Euler(0, -Math.PI / 2, 0), cPos: new THREE.Vector3(3.5, 3.2, -3), cLook: new THREE.Vector3(7.8, 3.4, -3) },
        { pos: new THREE.Vector3(7.8, 3.6, 5), rot: new THREE.Euler(0, -Math.PI / 2, 0), cPos: new THREE.Vector3(3.5, 3.2, 5), cLook: new THREE.Vector3(7.8, 3.4, 5) },
        { pos: new THREE.Vector3(0, 4.0, -17.5), rot: new THREE.Euler(0, 0, 0), cPos: new THREE.Vector3(0, 3.5, -12.5), cLook: new THREE.Vector3(0, 3.8, -17.5) },
        { pos: new THREE.Vector3(0, 4.0, 17.5), rot: new THREE.Euler(0, Math.PI, 0), cPos: new THREE.Vector3(0, 3.5, 12.5), cLook: new THREE.Vector3(0, 3.8, 17.5) }
      );
    }
    // --- Scene 4: Grand Salon (永恒殿堂 · 卢浮古典双列拱柱大厅) ---
    else if (archStyle === 'grand-salon') {
      // 1. Vaulted Classical Ceiling (高挑半圆拱顶)
      const archGeo = new THREE.CylinderGeometry(14, 14, 36, 32, 1, true, Math.PI, Math.PI);
      const archMat = new THREE.MeshStandardMaterial({ color: 0x1f1610, roughness: 0.85, side: THREE.BackSide });
      const archCeiling = new THREE.Mesh(archGeo, archMat);
      archCeiling.rotation.x = Math.PI / 2;
      archCeiling.position.set(0, 4, 0);
      scene.add(archCeiling);

      // 2. Colonnade of Corinthian Columns (宏伟双列大理石拱柱群)
      const colGeo = new THREE.CylinderGeometry(0.7, 0.8, 8, 24);
      const colMat = new THREE.MeshStandardMaterial({ color: 0x3a291b, roughness: 0.35, metalness: 0.2 });
      const colCapGeo = new THREE.BoxGeometry(2.0, 0.5, 2.0);

      [-6, 6].forEach((cx) => {
        for (let cz = -12; cz <= 12; cz += 6) {
          const col = new THREE.Mesh(colGeo, colMat);
          col.position.set(cx, 4, cz);
          scene.add(col);

          const capTop = new THREE.Mesh(colCapGeo, colMat);
          capTop.position.set(cx, 8, cz);
          scene.add(capTop);

          const capBottom = new THREE.Mesh(colCapGeo, colMat);
          capBottom.position.set(cx, 0.25, cz);
          scene.add(capBottom);
        }
      });

      // Classical Statue Pedestals in center (大理石古典雕塑台座)
      const pedGeo = new THREE.BoxGeometry(1.6, 1.2, 1.6);
      const ped1 = new THREE.Mesh(pedGeo, colMat);
      ped1.position.set(0, 0.6, -6);
      scene.add(ped1);

      const ped2 = new THREE.Mesh(pedGeo, colMat);
      ped2.position.set(0, 0.6, 6);
      scene.add(ped2);

      // Salon Perimeter Walls
      const wallMat = new THREE.MeshStandardMaterial({ map: wallTexture, roughness: 0.8 });
      const createSalonWall = (w: number, h: number, x: number, y: number, z: number, ry: number) => {
        const wall = new THREE.Mesh(new THREE.PlaneGeometry(w, h), wallMat);
        wall.position.set(x, y, z);
        wall.rotation.y = ry;
        scene.add(wall);
      };
      createSalonWall(30, 8, 0, 4, -18, 0);
      createSalonWall(30, 8, 0, 4, 18, Math.PI);
      createSalonWall(36, 8, -14, 4, 0, Math.PI / 2);
      createSalonWall(36, 8, 14, 4, 0, -Math.PI / 2);

      // Grand Salon Art Placements (Symmetric Grand Hall)
      wallSlots.push(
        { pos: new THREE.Vector3(0, 4.2, -17.6), rot: new THREE.Euler(0, 0, 0), cPos: new THREE.Vector3(0, 3.8, -12.5), cLook: new THREE.Vector3(0, 4.0, -17.6) },
        { pos: new THREE.Vector3(-13.6, 4.0, -9), rot: new THREE.Euler(0, Math.PI / 2, 0), cPos: new THREE.Vector3(-9.0, 3.6, -9), cLook: new THREE.Vector3(-13.6, 3.8, -9) },
        { pos: new THREE.Vector3(-13.6, 4.0, 0), rot: new THREE.Euler(0, Math.PI / 2, 0), cPos: new THREE.Vector3(-9.0, 3.6, 0), cLook: new THREE.Vector3(-13.6, 3.8, 0) },
        { pos: new THREE.Vector3(-13.6, 4.0, 9), rot: new THREE.Euler(0, Math.PI / 2, 0), cPos: new THREE.Vector3(-9.0, 3.6, 9), cLook: new THREE.Vector3(-13.6, 3.8, 9) },
        { pos: new THREE.Vector3(13.6, 4.0, -9), rot: new THREE.Euler(0, -Math.PI / 2, 0), cPos: new THREE.Vector3(9.0, 3.6, -9), cLook: new THREE.Vector3(13.6, 3.8, -9) },
        { pos: new THREE.Vector3(13.6, 4.0, 0), rot: new THREE.Euler(0, -Math.PI / 2, 0), cPos: new THREE.Vector3(9.0, 3.6, 0), cLook: new THREE.Vector3(13.6, 3.8, 0) },
        { pos: new THREE.Vector3(13.6, 4.0, 9), rot: new THREE.Euler(0, -Math.PI / 2, 0), cPos: new THREE.Vector3(9.0, 3.6, 9), cLook: new THREE.Vector3(13.6, 3.8, 9) },
        { pos: new THREE.Vector3(0, 4.2, 17.6), rot: new THREE.Euler(0, Math.PI, 0), cPos: new THREE.Vector3(0, 3.8, 12.5), cLook: new THREE.Vector3(0, 4.0, 17.6) }
      );
    }
    // --- Scene 5: Meadow Pavilion (夏日晴风 · 云海草甸露天展廊) ---
    else {
      // 1. Open-air Deck (露天木质平展台)
      const deckGeo = new THREE.BoxGeometry(24, 0.4, 24);
      const deckMat = new THREE.MeshStandardMaterial({ map: floorTexture, roughness: 0.6 });
      const deck = new THREE.Mesh(deckGeo, deckMat);
      deck.position.set(0, 0, 0);
      scene.add(deck);

      // Surrounding Green Meadow Terrain (四周连绵起伏青草丘陵)
      const hillGeo = new THREE.PlaneGeometry(80, 80, 24, 24);
      const hillMat = new THREE.MeshStandardMaterial({ color: 0x76b852, roughness: 0.95 });
      const hill = new THREE.Mesh(hillGeo, hillMat);
      hill.rotation.x = -Math.PI / 2;
      hill.position.y = -0.2;
      scene.add(hill);

      // 2. Open Wooden Pergola Pillars (露天白色木质凉亭立柱与横梁，无封闭屋顶，阳光直泻)
      const postGeo = new THREE.CylinderGeometry(0.18, 0.18, 5, 12);
      const postMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 });
      [-8, 8].forEach((px) => {
        for (let pz = -8; pz <= 8; pz += 8) {
          const post = new THREE.Mesh(postGeo, postMat);
          post.position.set(px, 2.5, pz);
          scene.add(post);
        }
      });

      // Pergola open lattice beams (顶部透光木格架)
      const latticeGeo = new THREE.BoxGeometry(18, 0.12, 0.2);
      for (let lz = -8; lz <= 8; lz += 2) {
        const lattice = new THREE.Mesh(latticeGeo, postMat);
        lattice.position.set(0, 5, lz);
        scene.add(lattice);
      }

      // 3. Independent Wooden Exhibition Easels (独立立式木画架结构)
      const easelStandGeo = new THREE.BoxGeometry(4.0, 3.0, 0.2);
      const easelMat = new THREE.MeshStandardMaterial({ color: 0xecd9be, roughness: 0.7 });

      const createEaselStand = (x: number, z: number, ry: number) => {
        const stand = new THREE.Mesh(easelStandGeo, easelMat);
        stand.position.set(x, 2.6, z);
        stand.rotation.y = ry;
        scene.add(stand);
      };

      createEaselStand(0, -6, 0);
      createEaselStand(-6, 0, Math.PI / 2);
      createEaselStand(6, 0, -Math.PI / 2);
      createEaselStand(0, 6, Math.PI);
      createEaselStand(-6, -6, Math.PI / 4);
      createEaselStand(6, -6, -Math.PI / 4);

      // Meadow Art Placements (On open airy easel stands under blue sky)
      wallSlots.push(
        { pos: new THREE.Vector3(0, 2.8, -5.8), rot: new THREE.Euler(0, 0, 0), cPos: new THREE.Vector3(0, 2.7, -2.2), cLook: new THREE.Vector3(0, 2.7, -5.8) },
        { pos: new THREE.Vector3(-5.8, 2.8, 0), rot: new THREE.Euler(0, Math.PI / 2, 0), cPos: new THREE.Vector3(-2.2, 2.7, 0), cLook: new THREE.Vector3(-5.8, 2.7, 0) },
        { pos: new THREE.Vector3(5.8, 2.8, 0), rot: new THREE.Euler(0, -Math.PI / 2, 0), cPos: new THREE.Vector3(2.2, 2.7, 0), cLook: new THREE.Vector3(5.8, 2.7, 0) },
        { pos: new THREE.Vector3(0, 2.8, 5.8), rot: new THREE.Euler(0, Math.PI, 0), cPos: new THREE.Vector3(0, 2.7, 2.2), cLook: new THREE.Vector3(0, 2.7, 5.8) },
        { pos: new THREE.Vector3(-5.8, 2.8, -5.8), rot: new THREE.Euler(0, Math.PI / 4, 0), cPos: new THREE.Vector3(-2.8, 2.7, -2.8), cLook: new THREE.Vector3(-5.8, 2.7, -5.8) },
        { pos: new THREE.Vector3(5.8, 2.8, -5.8), rot: new THREE.Euler(0, -Math.PI / 4, 0), cPos: new THREE.Vector3(2.8, 2.7, -2.8), cLook: new THREE.Vector3(5.8, 2.7, -5.8) }
      );
    }

    const textureLoader = new THREE.TextureLoader();
    const spots: ArtworkSpot[] = [];
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

      // Asynchronously load real image texture or Book of Shapes SVG
      if (cData.imageUrl.startsWith('data:image/svg+xml')) {
        const svgImg = new Image();
        svgImg.onload = () => {
          const cvs = document.createElement('canvas');
          cvs.width = 1024;
          cvs.height = 1024;
          const sctx = cvs.getContext('2d')!;
          sctx.drawImage(svgImg, 0, 0, 1024, 1024);
          const svgTex = new THREE.CanvasTexture(cvs);
          svgTex.colorSpace = THREE.SRGBColorSpace;
          canvasMat.map = svgTex;
          canvasMat.needsUpdate = true;
        };
        svgImg.src = cData.imageUrl;
      } else {
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
      }

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

  // When custom shape is projected from Book of Shapes Studio, glide camera directly to slot 0
  useEffect(() => {
    if (customProjectedShape && spotsRef.current.length > 0) {
      flyToArtwork(0);
    }
  }, [customProjectedShape]);

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
          {/* Quick jump to Book of Shapes centerpiece installation */}
          <button
            onClick={() => {
              playSpotlightClick();
              flyToArtwork(0);
            }}
            className={`px-3 py-1.5 rounded-full text-[11px] font-mono border transition-all cursor-pointer flex items-center gap-1.5 backdrop-blur-md shadow-lg hover:scale-105 active:scale-95 ${
              activeIdx === 0
                ? 'bg-amber-500 text-black font-bold border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                : 'bg-black/60 text-stone-200 border-white/20 hover:text-white hover:bg-white/10'
            }`}
            title="镜头立即切至中央 Book of Shapes 算法矢量艺术装置"
          >
            <Shapes className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">形态之书装置</span>
          </button>

          {/* Quick jump to Shapes Studio if handler provided */}
          {onOpenShapesStudio && (
            <button
              onClick={() => {
                playSpotlightClick();
                onOpenShapesStudio();
              }}
              className="px-3 py-1.5 rounded-full text-[11px] font-mono border transition-all cursor-pointer flex items-center gap-1.5 backdrop-blur-md shadow-lg bg-black/60 text-amber-300 border-amber-500/40 hover:bg-amber-500/20 hover:scale-105 active:scale-95"
              title="打开形态之书 · 纯粹矢量数学工坊，自定义微调几何参数"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">进入矢量工坊</span>
            </button>
          )}

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
          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            <div className="flex items-center gap-2.5">
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

            {/* Special Book of Shapes Quick Actions */}
            {activeCase.id.startsWith('shape-') && onOpenShapesStudio && (
              <button
                onClick={() => {
                  playSpotlightClick();
                  onOpenShapesStudio();
                }}
                className="w-full py-2 px-3 rounded-xl font-mono text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-2 bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30 active:scale-98 shadow-md"
              >
                <Shapes className="w-3.5 h-3.5 text-amber-400" />
                <span>📐 打开形态之书工坊 · 微调本装置参数</span>
              </button>
            )}
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
          {/* Dynamic Architectural Floorplan Overlay per Scene Theme */}
          {currentTheme === 'cozy-night' ? (
            <>
              {/* Cozy Cabin: Slanted timber walls & central stone fireplace */}
              <div className="absolute inset-x-3 top-2 bottom-2 border border-amber-800/40 rounded-sm" />
              {/* Fireplace Hearth Icon */}
              <div className="absolute left-1/2 top-2 -translate-x-1/2 w-10 h-3 bg-red-900/60 border border-orange-500/50 rounded-xs flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-ping" />
              </div>
              {/* Wooden beam lines */}
              <div className="absolute inset-y-2 left-1/3 w-px bg-amber-900/30" />
              <div className="absolute inset-y-2 right-1/3 w-px bg-amber-900/30" />
              {/* Reading corner sofa */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-3 bg-amber-950/70 border border-amber-700/40 rounded-sm" />
            </>
          ) : currentTheme === 'zen-mist' ? (
            <>
              {/* Zen Pavilion: Water pond with central moon gate */}
              <div className="absolute inset-2 border border-emerald-900/40 bg-emerald-950/20" />
              {/* Moon Gate Circle */}
              <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border border-emerald-500/50 border-dashed" />
              {/* Rock Garden */}
              <div className="absolute left-1/2 top-2/3 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-stone-700/80 border border-emerald-400/30" />
              {/* Partition screens */}
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-0.5 h-10 bg-emerald-700/40" />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 w-0.5 h-10 bg-emerald-700/40" />
            </>
          ) : currentTheme === 'cyber-neon' ? (
            <>
              {/* Cyber Street: Towering Alley facades & High-tech highway bridge */}
              <div className="absolute inset-y-0 left-0 w-8 bg-slate-900/90 border-r border-cyan-500/30" />
              <div className="absolute inset-y-0 right-0 w-8 bg-slate-900/90 border-l border-cyan-500/30" />
              {/* Overpass Bridge */}
              <div className="absolute inset-x-8 top-1/3 h-2.5 bg-blue-950/80 border-y border-pink-500/40" />
              {/* Neon Pillars */}
              <span className="absolute left-10 top-4 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00f0ff]" />
              <span className="absolute right-10 top-4 w-1.5 h-1.5 rounded-full bg-pink-500 shadow-[0_0_6px_#ec4899]" />
              <span className="absolute left-10 bottom-4 w-1.5 h-1.5 rounded-full bg-pink-500 shadow-[0_0_6px_#ec4899]" />
              <span className="absolute right-10 bottom-4 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00f0ff]" />
            </>
          ) : currentTheme === 'grand-salon' ? (
            <>
              {/* Grand Louvre Salon: Vaulted arch hall & double row of columns */}
              <div className="absolute inset-x-2 top-2 bottom-2 border-2 border-yellow-700/30 rounded-t-3xl" />
              {/* Columns on left row */}
              <span className="absolute left-7 top-6 w-2 h-2 rounded-full bg-amber-600/70 border border-yellow-400/40" />
              <span className="absolute left-7 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-amber-600/70 border border-yellow-400/40" />
              <span className="absolute left-7 bottom-6 w-2 h-2 rounded-full bg-amber-600/70 border border-yellow-400/40" />
              {/* Columns on right row */}
              <span className="absolute right-7 top-6 w-2 h-2 rounded-full bg-amber-600/70 border border-yellow-400/40" />
              <span className="absolute right-7 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-amber-600/70 border border-yellow-400/40" />
              <span className="absolute right-7 bottom-6 w-2 h-2 rounded-full bg-amber-600/70 border border-yellow-400/40" />
              {/* Center statue pedestals */}
              <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-yellow-500/50 rounded-xs" />
              <div className="absolute left-1/2 top-2/3 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-yellow-500/50 rounded-xs" />
            </>
          ) : (
            <>
              {/* Summer Meadow: Open air wooden terrace & easel stands */}
              <div className="absolute inset-4 rounded-xl border border-sky-600/40 bg-sky-200/10" />
              {/* Open Pergola posts */}
              <span className="absolute left-5 top-5 w-1.5 h-1.5 rounded-full bg-white border border-sky-400" />
              <span className="absolute right-5 top-5 w-1.5 h-1.5 rounded-full bg-white border border-sky-400" />
              <span className="absolute left-5 bottom-5 w-1.5 h-1.5 rounded-full bg-white border border-sky-400" />
              <span className="absolute right-5 bottom-5 w-1.5 h-1.5 rounded-full bg-white border border-sky-400" />
              {/* Central wooden table */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-4 bg-amber-800/40 rounded-sm border border-amber-600/30" />
            </>
          )}

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
