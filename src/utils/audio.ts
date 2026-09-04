// Synthesized Audio System for Art Gallery Immersion
let audioCtx: AudioContext | null = null;
let ambientGain: GainNode | null = null;
let ambientOsc1: OscillatorNode | null = null;
let ambientOsc2: OscillatorNode | null = null;
let isAmbientPlaying = false;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Footsteps on polished wooden museum floor
export function playMuseumFootstep() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(80, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.12);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(350, ctx.currentTime);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  } catch (e) {
    // silent
  }
}

// Gentle museum bell / placard focus chime
export function playGalleryBell(freq = 520) {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.3);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.8);
  } catch (e) {
    // silent
  }
}

// Spotlight switch click
export function playSpotlightClick() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch (e) {
    // silent
  }
}

// Success Chime
export function playSuccessChime() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    [523.25, 659.25, 783.99].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);

      gain.gain.setValueAtTime(0.06, now + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.6);
    });
  } catch (e) {
    // silent
  }
}

// Ambient Museum Hall Soundscape customized per theme
export function toggleAmbientSound(theme: string = 'cozy-night'): boolean {
  try {
    const ctx = getAudioContext();

    if (isAmbientPlaying) {
      if (ambientGain) {
        ambientGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
        setTimeout(() => {
          ambientOsc1?.stop();
          ambientOsc2?.stop();
          ambientOsc1?.disconnect();
          ambientOsc2?.disconnect();
          ambientGain?.disconnect();
          ambientGain = null;
        }, 800);
      }
      isAmbientPlaying = false;
      return false;
    } else {
      ambientGain = ctx.createGain();
      ambientGain.gain.setValueAtTime(0.0001, ctx.currentTime);
      ambientGain.gain.exponentialRampToValueAtTime(0.035, ctx.currentTime + 1.8);

      ambientOsc1 = ctx.createOscillator();
      ambientOsc2 = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();

      if (theme === 'zen-mist') {
        // Oriental Zen: Bamboo rain, high serene harmonics
        ambientOsc1.type = 'sine';
        ambientOsc1.frequency.setValueAtTime(146.83, ctx.currentTime); // D3
        ambientOsc2.type = 'sine';
        ambientOsc2.frequency.setValueAtTime(220, ctx.currentTime); // A3
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(320, ctx.currentTime);
      } else if (theme === 'cyber-neon') {
        // Cyberpunk: Low synth drone with pulse
        ambientOsc1.type = 'sawtooth';
        ambientOsc1.frequency.setValueAtTime(65.41, ctx.currentTime); // C2
        ambientOsc2.type = 'square';
        ambientOsc2.frequency.setValueAtTime(98, ctx.currentTime); // G2
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(180, ctx.currentTime);
      } else if (theme === 'grand-salon') {
        // Grand Salon: Baroque chamber organ chord
        ambientOsc1.type = 'triangle';
        ambientOsc1.frequency.setValueAtTime(130.81, ctx.currentTime); // C3
        ambientOsc2.type = 'triangle';
        ambientOsc2.frequency.setValueAtTime(196, ctx.currentTime); // G3
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(400, ctx.currentTime);
      } else if (theme === 'ghibli-breeze') {
        // Ghibli Meadow: Light uplifting breeze chord
        ambientOsc1.type = 'sine';
        ambientOsc1.frequency.setValueAtTime(174.61, ctx.currentTime); // F3
        ambientOsc2.type = 'triangle';
        ambientOsc2.frequency.setValueAtTime(261.63, ctx.currentTime); // C4
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, ctx.currentTime);
      } else {
        // Cozy Night: Deep warm fireplace cello drone
        ambientOsc1.type = 'sine';
        ambientOsc1.frequency.setValueAtTime(110, ctx.currentTime); // A2
        ambientOsc2.type = 'triangle';
        ambientOsc2.frequency.setValueAtTime(164.81, ctx.currentTime); // E3
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(260, ctx.currentTime);
      }

      ambientOsc1.connect(filter);
      ambientOsc2.connect(filter);
      filter.connect(ambientGain);
      ambientGain.connect(ctx.destination);

      ambientOsc1.start();
      ambientOsc2.start();

      isAmbientPlaying = true;
      return true;
    }
  } catch (e) {
    return false;
  }
}