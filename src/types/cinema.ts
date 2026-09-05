export interface CameraRigSetup {
  lens: string; // e.g. "35mm Anamorphic T/1.8"
  shutter: string; // e.g. "1/48 at 24fps (180° Shutter Angle)"
  lighting: string; // e.g. "Low-Key Volumetric Rim Lighting"
  mood: string; // e.g. "Cinematic Melancholy & Neon Coldness"
  movement: string; // e.g. "Slow Dolly Forward along Z-axis"
}

export interface BehindTheScenesData {
  atomId?: string;
  atomName: string;
  principleName: string;
  styleName: string;
  whyItWorks: string;
}

export interface CinemaScene {
  id: string;
  sceneNumber: string; // e.g. "SCENE 01"
  act: string; // e.g. "ACT I · THE ESTABLISHING SHOT"
  title: string;
  titleEn: string;
  locationAndTime: string; // e.g. "TOKYO SHIBUYA · 02:45 AM · RAIN"
  scriptPrompt: string; // Film-script style prompt
  cameraRig: CameraRigSetup;
  coverImage: string;
  videoUrl?: string;
  colorPalette: string[];
  accentColor: string;
  durationSeconds: number; // e.g. 18
  behindTheScenes: BehindTheScenesData;
}
