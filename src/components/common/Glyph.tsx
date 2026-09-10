import {
  Palette, Building2, PenTool, Hammer, Camera, Clapperboard, Film,
  Gamepad2, Cpu, Shirt, Factory, Eye, Atom, Landmark,
  type LucideIcon,
} from 'lucide-react';

/** Maps domain glyph names (content data) to lucide components. */
const GLYPHS: Record<string, LucideIcon> = {
  palette: Palette,
  'building-2': Building2,
  'pen-tool': PenTool,
  hammer: Hammer,
  camera: Camera,
  clapperboard: Clapperboard,
  film: Film,
  'gamepad-2': Gamepad2,
  cpu: Cpu,
  shirt: Shirt,
  factory: Factory,
  eye: Eye,
  atom: Atom,
  landmark: Landmark,
};

export function Glyph({ name, size = 20, className }: { name: string; size?: number; className?: string }) {
  const Icon = GLYPHS[name] ?? Eye;
  return <Icon size={size} className={className} strokeWidth={1.5} />;
}
