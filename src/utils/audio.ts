// Web Audio API pure synthesizer for gallery soundscape & micro-interactions

let audioCtx: AudioContext | null = null;
let ambientOsc1: OscillatorNode | null = null;
let ambientOsc2: OscillatorNode | null = null;
let ambientGain: GainNode | null = null;
let isAmbientPlaying = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Gentle resonance bell when opening modal or changing hall
export function playGalleryBell(freq = 440) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.5, ctx.currentTime + 1.2);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 1.2);
  } catch {
    // Ignore audio errors silently
  }
}

// Crisp spotlight shutter / tactile click
export function playSpotlightClick() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.06);

    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.06);
  } catch {
    // Ignore audio errors silently
  }
}

// Success chime on prompt copy
export function playSuccessChime() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    [523.25, 659.25, 783.99].forEach((f, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + idx * 0.08);

      gain.gain.setValueAtTime(0.04, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.4);
    });
  } catch {
    // Ignore
  }
}

// Toggle Museum Ambient White Noise / Tone
export function toggleAmbientSound(enable?: boolean): boolean {
  try {
    const ctx = getAudioContext();
    if (!ctx) return false;

    if (enable === undefined) {
      enable = !isAmbientPlaying;
    }

    if (enable && !isAmbientPlaying) {
      // Start ambient dual sine drone (55Hz and 110Hz warm overtone)
      ambientGain = ctx.createGain();
      ambientGain.gain.setValueAtTime(0.001, ctx.currentTime);
      ambientGain.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 2.0);

      ambientOsc1 = ctx.createOscillator();
      ambientOsc1.type = 'sine';
      ambientOsc1.frequency.setValueAtTime(55, ctx.currentTime); // Low A

      ambientOsc2 = ctx.createOscillator();
      ambientOsc2.type = 'triangle';
      ambientOsc2.frequency.setValueAtTime(110.5, ctx.currentTime); // Subtle detune

      ambientOsc1.connect(ambientGain);
      ambientOsc2.connect(ambientGain);
      ambientGain.connect(ctx.destination);

      ambientOsc1.start();
      ambientOsc2.start();
      isAmbientPlaying = true;
      return true;
    } else if (!enable && isAmbientPlaying) {
      if (ambientGain) {
        ambientGain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 1.0);
        setTimeout(() => {
          try {
            ambientOsc1?.stop();
            ambientOsc2?.stop();
            ambientOsc1?.disconnect();
            ambientOsc2?.disconnect();
            ambientGain?.disconnect();
          } catch {}
          ambientOsc1 = null;
          ambientOsc2 = null;
          ambientGain = null;
        }, 1000);
      }
      isAmbientPlaying = false;
      return false;
    }
  } catch {
    return false;
  }
  return isAmbientPlaying;
}
