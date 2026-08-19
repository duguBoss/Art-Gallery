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

// Ambient Museum Hall Soundscape
export function toggleAmbientSound(): boolean {
  try {
    const ctx = getAudioContext();

    if (isAmbientPlaying) {
      if (ambientGain) {
        ambientGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1);
        setTimeout(() => {
          ambientOsc1?.stop();
          ambientOsc2?.stop();
          ambientOsc1?.disconnect();
          ambientOsc2?.disconnect();
          ambientGain?.disconnect();
        }, 1000);
      }
      isAmbientPlaying = false;
      return false;
    } else {
      ambientGain = ctx.createGain();
      ambientGain.gain.setValueAtTime(0.0001, ctx.currentTime);
      ambientGain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 2);

      ambientOsc1 = ctx.createOscillator();
      ambientOsc2 = ctx.createOscillator();

      ambientOsc1.type = 'sine';
      ambientOsc1.frequency.setValueAtTime(110, ctx.currentTime); // A2

      ambientOsc2.type = 'triangle';
      ambientOsc2.frequency.setValueAtTime(164.81, ctx.currentTime); // E3

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(280, ctx.currentTime);

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