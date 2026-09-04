/**
 * Book of Shapes Generative Engine
 * Inspired by Nikolaj Sokolowski's https://bookofshapes.com
 * Algorithmic, minimal, and mathematical SVG generators across grid, radial, noise, flow, isometric, distortion, and organic categories.
 */

export type ShapeCategory = 
  | 'quarter-arc-truchet'
  | 'brockmann-arcs'
  | 'joy-division'
  | 'lissajous-field'
  | 'flow-streamlines'
  | 'isometric-cube-grid'
  | 'interference-mesh'
  | 'sacred-polygons';

export interface ShapeConfig {
  type: ShapeCategory;
  density: number;       // 1 to 10
  strokeWidth: number;   // 0.5 to 6
  variance: number;      // 0 to 1 (chaos/frequency)
  rotation: number;      // 0 to 360 deg
  colorScheme: string;   // primary stroke color
  accentColor: string;   // secondary accent color
  bgColor: string;       // background color
  seed: number;
}

export interface ShapeDefinition {
  id: ShapeCategory;
  name: string;
  enName: string;
  categoryTag: 'grid' | 'radial' | 'noise' | 'flow' | 'isometric' | 'distortion';
  description: string;
  designPhilosophy: string;
  defaultConfig: Partial<ShapeConfig>;
  suggestedPrompt: string;
}

export const SHAPE_CATALOG: ShapeDefinition[] = [
  {
    id: 'quarter-arc-truchet',
    name: '方圆特鲁歇迷宫',
    enName: 'Quarter-Arc Truchet',
    categoryTag: 'grid',
    description: '18世纪法国塞巴斯蒂安·特鲁歇发明的模块化瓷砖算法。相邻圆弧在边界处切向平滑闭合，形成无限延伸的诗意连续迷宫。',
    designPhilosophy: '极简数学网格 · 模块化曲率 · 连续无尽流向',
    defaultConfig: { density: 6, strokeWidth: 2, variance: 0.5 },
    suggestedPrompt: 'minimalist generative vector art, quarter-arc truchet tile pattern, continuous curving labyrinth, Bauhaus graphic design, crisp precision vector SVG lines, mathematical harmony, by Nikolaj Sokolowski',
  },
  {
    id: 'brockmann-arcs',
    name: '布罗克曼同心弧',
    enName: 'Brockmann Modernist Arcs',
    categoryTag: 'radial',
    description: '致敬瑞士国际主义平面设计大师约瑟夫·米勒-布罗克曼。同心圆环被精确的角速度与间隙切割，呈现出严谨与韵律的对峙。',
    designPhilosophy: '瑞士平面设计学派 · 纯粹几何角动量 · 现代主义理性美',
    defaultConfig: { density: 7, strokeWidth: 2.5, variance: 0.6 },
    suggestedPrompt: 'Josef Müller-Brockmann modernist Swiss graphic design, concentric broken radial arcs, geometric constructivism, precision drafting, minimal poster art, clean lines, monochrome with warm amber accent',
  },
  {
    id: 'joy-division',
    name: '脉冲星波形山脊',
    enName: 'Pulsar PSR Waveforms',
    categoryTag: 'noise',
    description: '源自阿雷西博射电望远镜对人类首颗脉冲星 PSR B1919+21 的无线电电平记录。高斯包络线叠加扰动谐波，形成如山峦般的深空回响。',
    designPhilosophy: '射电天文波形 · 堆叠折线包络 · 宇宙深空噪音',
    defaultConfig: { density: 8, strokeWidth: 1.5, variance: 0.7 },
    suggestedPrompt: 'Joy Division Unknown Pleasures inspired stacked radio pulsar waveforms, PSR B1919+21 data visualization, topographical ridge lines, Gaussian envelope, minimalist data art, vector line illustration',
  },
  {
    id: 'lissajous-field',
    name: '利萨如谐振力场',
    enName: 'Lissajous Resonance Field',
    categoryTag: 'distortion',
    description: '正交双向简谐振动的数学轨迹。频率比值与相位微调引发不可预测的优美交织环，呈现振动与时间的物理几何。',
    designPhilosophy: '简谐振动轨迹 · 频率相位差 · 物理声波几何',
    defaultConfig: { density: 5, strokeWidth: 1.8, variance: 0.4 },
    suggestedPrompt: 'Lissajous resonance curve pattern, complex harmonograph drawings, mathematical physics vector art, intersecting harmonic oscillations, thin luminous wireframes, dark background, generative algorithmic beauty',
  },
  {
    id: 'flow-streamlines',
    name: '流场引力矢量线',
    enName: 'Curl Flow Streamlines',
    categoryTag: 'flow',
    description: '模拟微弱气流与引力奇点穿透介质时的流线追踪。沿二维向量场梯度积分前进，展现如风中丝绸般的柔性张力。',
    designPhilosophy: '向量场积分线 · 气动流线 · 有机自然流动',
    defaultConfig: { density: 6, strokeWidth: 1.5, variance: 0.5 },
    suggestedPrompt: 'algorithmic vector flow field streamlines, generative fluid dynamics, organic curving lines, wind vector field visualization, elegant silk trajectories, high aesthetic minimalism, fine line vector',
  },
  {
    id: 'isometric-cube-grid',
    name: '等角阶梯晶格',
    enName: 'Isometric Axonometric Cubes',
    categoryTag: 'isometric',
    description: '30度轴测正交投影构建的三维空间结构。结合明暗顶面与侧立面虚实线框，创造埃舍尔式的视错觉建筑微缩。',
    designPhilosophy: '轴测等角透视 · 埃舍尔视错觉 · 极简建筑解构',
    defaultConfig: { density: 5, strokeWidth: 2, variance: 0.5 },
    suggestedPrompt: 'isometric axonometric cube grid, architectural wireframe perspective, Escher optical geometry, stepped geometric modular blocks, Bauhaus structural minimalism, clean vector SVG art',
  },
  {
    id: 'interference-mesh',
    name: '莫尔干涉频纹',
    enName: 'Moiré Interference Mesh',
    categoryTag: 'distortion',
    description: '两个微小角度旋转的微密网格相互重叠，因空间光通量周期性阻挡而产生的宏观波纹，是光与眼睛的干涉魔术。',
    designPhilosophy: '莫尔干涉光学 · 微小相角偏差 · 动态催眠纹理',
    defaultConfig: { density: 7, strokeWidth: 1.2, variance: 0.3 },
    suggestedPrompt: 'Moiré pattern interference mesh, optical illusion concentric grid distortion, hypnotic wave frequencies, overlapping rotated line grids, op art minimalism, vector algorithmic precision',
  },
  {
    id: 'sacred-polygons',
    name: '斐波那契嵌套多边形',
    enName: 'Sacred Fibonacci Polygons',
    categoryTag: 'radial',
    description: '沿黄金比例向内递缩并以定常角速度旋转的嵌套正多边形。每层顶点的连线织出神圣几何的星茫结构。',
    designPhilosophy: '黄金分割螺旋 · 神圣几何网格 · 旋转同心嵌套',
    defaultConfig: { density: 6, strokeWidth: 1.8, variance: 0.4 },
    suggestedPrompt: 'sacred geometry nested rotating polygons, Fibonacci golden ratio scaling, star tetrahedron diagonals, ancient hermetic mathematical diagram, minimalist clean vector lines, luminous gold accents',
  },
];

function pseudoRandom(seed: number) {
  const s = Math.sin(seed) * 10000;
  return s - Math.floor(s);
}

export function generateShapeSvg(config: ShapeConfig, size = 600): string {
  const {
    type,
    density,
    strokeWidth,
    variance,
    rotation,
    colorScheme,
    accentColor,
    bgColor,
    seed,
  } = config;

  let content = '';

  switch (type) {
    case 'quarter-arc-truchet': {
      const gridSize = Math.max(3, Math.min(16, Math.round(density * 1.4)));
      const cellSize = size / gridSize;
      const paths: string[] = [];

      for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
          const x = c * cellSize;
          const y = r * cellSize;
          const cellSeed = seed * 1000 + r * 37 + c * 17;
          const rand = pseudoRandom(cellSeed);
          const orientation = rand > 0.5 ? 1 : 0;
          const isAccent = pseudoRandom(cellSeed + 99) > 0.82;
          const stroke = isAccent ? accentColor : colorScheme;

          if (orientation === 1) {
            const p1 = `M ${x} ${y + cellSize / 2} A ${cellSize / 2} ${cellSize / 2} 0 0 1 ${x + cellSize / 2} ${y}`;
            const p2 = `M ${x + cellSize / 2} ${y + cellSize} A ${cellSize / 2} ${cellSize / 2} 0 0 1 ${x + cellSize} ${y + cellSize / 2}`;
            paths.push(`<path d="${p1}" stroke="${stroke}" stroke-width="${strokeWidth}" fill="none" stroke-linecap="round"/>`);
            paths.push(`<path d="${p2}" stroke="${stroke}" stroke-width="${strokeWidth}" fill="none" stroke-linecap="round"/>`);
          } else {
            const p1 = `M ${x + cellSize / 2} ${y} A ${cellSize / 2} ${cellSize / 2} 0 0 1 ${x + cellSize} ${y + cellSize / 2}`;
            const p2 = `M ${x} ${y + cellSize / 2} A ${cellSize / 2} ${cellSize / 2} 0 0 1 ${x + cellSize / 2} ${y + cellSize}`;
            paths.push(`<path d="${p1}" stroke="${stroke}" stroke-width="${strokeWidth}" fill="none" stroke-linecap="round"/>`);
            paths.push(`<path d="${p2}" stroke="${stroke}" stroke-width="${strokeWidth}" fill="none" stroke-linecap="round"/>`);
          }

          if (variance > 0.6 && pseudoRandom(cellSeed + 43) > 0.7) {
            paths.push(`<circle cx="${x + cellSize / 2}" cy="${y + cellSize / 2}" r="${strokeWidth * 1.2}" fill="${accentColor}" />`);
          }
        }
      }
      content = paths.join('\n');
      break;
    }

    case 'brockmann-arcs': {
      const ringCount = Math.round(5 + density * 2.2);
      const cx = size / 2;
      const cy = size / 2;
      const maxRadius = (size / 2) * 0.9;
      const paths: string[] = [];

      for (let i = 1; i <= ringCount; i++) {
        const radius = (maxRadius / ringCount) * i;
        const segmentCount = Math.round(2 + (i % 4) + variance * 4);
        let currentAngle = (seed * 17 + i * 25) % 360;

        for (let s = 0; s < segmentCount; s++) {
          const arcSpan = (360 / segmentCount) * (0.35 + variance * 0.45);
          const startRad = (currentAngle * Math.PI) / 180;
          const endRad = ((currentAngle + arcSpan) * Math.PI) / 180;

          const x1 = cx + radius * Math.cos(startRad);
          const y1 = cy + radius * Math.sin(startRad);
          const x2 = cx + radius * Math.cos(endRad);
          const y2 = cy + radius * Math.sin(endRad);

          const largeArcFlag = arcSpan > 180 ? 1 : 0;
          const isAccent = (i + s) % 5 === 0;
          const curStroke = isAccent ? accentColor : colorScheme;
          const weight = isAccent ? strokeWidth * 1.5 : strokeWidth;

          paths.push(
            `<path d="M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}" stroke="${curStroke}" stroke-width="${weight}" fill="none" stroke-linecap="round" />`
          );

          currentAngle += (360 / segmentCount);
        }
      }

      paths.push(`<line x1="${cx - 16}" y1="${cy}" x2="${cx + 16}" y2="${cy}" stroke="${accentColor}" stroke-width="${strokeWidth}" />`);
      paths.push(`<line x1="${cx}" y1="${cy - 16}" x2="${cx}" y2="${cy + 16}" stroke="${accentColor}" stroke-width="${strokeWidth}" />`);
      content = paths.join('\n');
      break;
    }

    case 'joy-division': {
      const lineCount = Math.round(12 + density * 3);
      const paths: string[] = [];
      const padding = size * 0.12;
      const availableHeight = size - padding * 2;
      const lineSpacing = availableHeight / lineCount;
      const stepX = 8;
      const width = size - padding * 2;

      for (let i = 0; i < lineCount; i++) {
        const baseY = padding + i * lineSpacing;
        let d = `M ${padding} ${baseY}`;
        const isMiddle = i > lineCount * 0.15 && i < lineCount * 0.9;

        for (let x = 0; x <= width; x += stepX) {
          const currentX = padding + x;
          const normX = (x - width / 2) / (width * 0.28);
          const envelope = Math.exp(-0.5 * normX * normX);

          let elevation = 0;
          if (isMiddle) {
            const freq = 0.05 + variance * 0.08;
            const noise = 
              Math.sin(x * freq + seed + i * 1.3) * 0.6 +
              Math.sin(x * freq * 2.3 + i) * 0.3 +
              Math.cos(x * 0.15 + seed * 2) * 0.2;
            elevation = noise * envelope * (30 + variance * 45);
          }

          const currentY = baseY - Math.max(0, elevation);
          d += ` L ${currentX.toFixed(1)} ${currentY.toFixed(1)}`;
        }

        const stroke = (i % 6 === 0) ? accentColor : colorScheme;
        paths.push(`<path d="${d}" stroke="${stroke}" stroke-width="${strokeWidth}" fill="${bgColor}" stroke-linecap="round" stroke-linejoin="round" />`);
      }
      content = paths.join('\n');
      break;
    }

    case 'lissajous-field': {
      const paths: string[] = [];
      const curves = Math.round(2 + density * 0.8);
      const cx = size / 2;
      const cy = size / 2;
      const radiusX = size * 0.4;
      const radiusY = size * 0.4;

      for (let c = 0; c < curves; c++) {
        const a = Math.round(2 + (c % 4));
        const b = Math.round(3 + (c % 3));
        const phase = (c * (Math.PI / curves)) + (seed * 0.1) + (variance * Math.PI);
        const points: string[] = [];
        const samples = 400;

        for (let i = 0; i <= samples; i++) {
          const t = (i / samples) * Math.PI * 2;
          const x = cx + radiusX * Math.sin(a * t + phase) * (1 - c * 0.06);
          const y = cy + radiusY * Math.sin(b * t) * (1 - c * 0.06);
          points.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
        }

        const isAccent = c === 0;
        const curStroke = isAccent ? accentColor : colorScheme;
        const opacity = Math.max(0.3, 1 - (c * 0.1));
        paths.push(`<path d="${points.join(' ')}" stroke="${curStroke}" stroke-width="${strokeWidth}" stroke-opacity="${opacity.toFixed(2)}" fill="none" />`);
      }
      content = paths.join('\n');
      break;
    }

    case 'flow-streamlines': {
      const paths: string[] = [];
      const streamCount = Math.round(20 + density * 8);
      const steps = 45;
      const stepLength = 12;

      for (let s = 0; s < streamCount; s++) {
        const sSeed = seed * 100 + s * 19;
        let x = size * 0.1 + pseudoRandom(sSeed) * (size * 0.8);
        let y = size * 0.1 + pseudoRandom(sSeed + 1) * (size * 0.8);

        let d = `M ${x.toFixed(1)} ${y.toFixed(1)}`;
        let points = 0;

        for (let step = 0; step < steps; step++) {
          const nx = x / size;
          const ny = y / size;
          const angle = 
            Math.sin(nx * 5 + seed * 0.1) * Math.PI * (1 + variance) +
            Math.cos(ny * 4 + s * 0.05) * Math.PI * variance;

          x += Math.cos(angle) * stepLength;
          y += Math.sin(angle) * stepLength;

          if (x < 10 || x > size - 10 || y < 10 || y > size - 10) break;
          d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
          points++;
        }

        if (points > 3) {
          const isAccent = s % 7 === 0;
          const stroke = isAccent ? accentColor : colorScheme;
          const opacity = 0.4 + pseudoRandom(sSeed + 3) * 0.55;
          paths.push(`<path d="${d}" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-opacity="${opacity.toFixed(2)}" fill="none" stroke-linecap="round" />`);
        }
      }
      content = paths.join('\n');
      break;
    }

    case 'isometric-cube-grid': {
      const paths: string[] = [];
      const gridSize = Math.round(3 + density * 0.8);
      const side = (size / gridSize) * 0.38;
      const angle = (30 * Math.PI) / 180;
      const dx = side * Math.cos(angle);
      const dy = side * Math.sin(angle);
      const cx = size / 2;
      const cy = size / 2;

      for (let q = -gridSize; q <= gridSize; q++) {
        for (let r = -gridSize; r <= gridSize; r++) {
          const posX = cx + (q - r) * dx;
          const posY = cy + (q + r) * dy * 0.85;

          if (posX < 20 || posX > size - 20 || posY < 20 || posY > size - 20) continue;

          const cellSeed = seed * 50 + q * 13 + r * 7;
          const heightLevel = Math.floor(pseudoRandom(cellSeed) * 3) + 1;
          const hOffset = heightLevel * dy * 1.5;

          const px = posX;
          const py = posY - hOffset;

          const topPath = `M ${px} ${py - side} L ${px + dx} ${py - dy} L ${px} ${py} L ${px - dx} ${py - dy} Z`;
          const leftPath = `M ${px - dx} ${py - dy} L ${px} ${py} L ${px} ${py + side} L ${px - dx} ${py + side - dy} Z`;
          const rightPath = `M ${px} ${py} L ${px + dx} ${py - dy} L ${px + dx} ${py + side - dy} L ${px} ${py + side} Z`;

          const isAccent = (q + r) % 4 === 0;
          const stroke = isAccent ? accentColor : colorScheme;

          paths.push(`<path d="${topPath}" stroke="${stroke}" stroke-width="${strokeWidth}" fill="none" />`);
          paths.push(`<path d="${leftPath}" stroke="${stroke}" stroke-width="${strokeWidth}" fill="none" stroke-opacity="0.8" />`);
          paths.push(`<path d="${rightPath}" stroke="${stroke}" stroke-width="${strokeWidth}" fill="none" stroke-opacity="0.6" />`);
        }
      }
      content = paths.join('\n');
      break;
    }

    case 'interference-mesh': {
      const paths: string[] = [];
      const lines = Math.round(24 + density * 6);
      const spacing = size / lines;
      const rotAngle = (3 + variance * 12) * (Math.PI / 180);

      for (let i = 0; i <= lines; i++) {
        const y = i * spacing;
        paths.push(`<line x1="0" y1="${y}" x2="${size}" y2="${y}" stroke="${colorScheme}" stroke-width="${strokeWidth}" stroke-opacity="0.75" />`);
      }

      const cx = size / 2;
      const cy = size / 2;
      paths.push(`<g transform="rotate(${((rotAngle * 180) / Math.PI).toFixed(2)}, ${cx}, ${cy})">`);
      for (let i = -lines * 0.5; i <= lines * 1.5; i++) {
        const y = i * spacing;
        paths.push(`  <line x1="-${size * 0.5}" y1="${y}" x2="${size * 1.5}" y2="${y}" stroke="${accentColor}" stroke-width="${strokeWidth}" stroke-opacity="0.75" />`);
      }
      paths.push(`</g>`);
      content = paths.join('\n');
      break;
    }

    case 'sacred-polygons': {
      const paths: string[] = [];
      const rings = Math.round(5 + density * 1.5);
      const sides = Math.round(5 + variance * 7);
      const cx = size / 2;
      const cy = size / 2;
      const maxRadius = size * 0.44;

      for (let r = 1; r <= rings; r++) {
        const radius = maxRadius * Math.pow(r / rings, 0.85);
        const ringRotation = (r * (12 + variance * 20) * Math.PI) / 180;
        const pts: { x: number; y: number }[] = [];

        for (let s = 0; s < sides; s++) {
          const a = (s * 2 * Math.PI) / sides + ringRotation;
          pts.push({
            x: cx + radius * Math.cos(a),
            y: cy + radius * Math.sin(a),
          });
        }

        const d = pts.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ') + ' Z';
        const isAccent = r % 2 === 0;
        const stroke = isAccent ? accentColor : colorScheme;

        paths.push(`<path d="${d}" stroke="${stroke}" stroke-width="${strokeWidth}" fill="none" />`);

        if (r === Math.floor(rings / 2) && sides <= 8) {
          for (let i = 0; i < sides; i++) {
            const next = (i + 2) % sides;
            paths.push(`<line x1="${pts[i].x.toFixed(1)}" y1="${pts[i].y.toFixed(1)}" x2="${pts[next].x.toFixed(1)}" y2="${pts[next].y.toFixed(1)}" stroke="${accentColor}" stroke-width="${strokeWidth * 0.8}" stroke-opacity="0.5" />`);
          }
        }
      }
      content = paths.join('\n');
      break;
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="100%" height="100%">
  <rect width="${size}" height="${size}" fill="${bgColor}" />
  <g transform="rotate(${rotation}, ${size / 2}, ${size / 2})">
${content}
  </g>
</svg>`;
}

export function getShapeDataUri(config: ShapeConfig, size = 1024): string {
  const svg = generateShapeSvg(config, size);
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
