/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Museum-paper palette (master plan §18-20): warm ground, ink text.
        paper: {
          DEFAULT: '#f7f4ec',   // main warm white ground
          deep: '#efe9dc',      // slightly deeper section ground
          card: '#fbf9f4',      // lifted surface
          edge: '#e4ddcd',      // hairline borders
        },
        ink: {
          DEFAULT: '#1a1815',   // primary text / headings
          soft: '#453f37',      // secondary text
          mute: '#847c6e',      // captions, eyebrows
          faint: '#b4ac9d',     // disabled / placeholders
        },
        cinnabar: {
          DEFAULT: '#b3402a',   // vermillion accent — used sparingly, 5%
          deep: '#8f2f1e',
          soft: '#d9705c',
        },
        sage: {
          DEFAULT: '#5c6b58',
          deep: '#43503f',
        },
        ochre: {
          DEFAULT: '#a8762e',
          light: '#d9b26a',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Noto Serif SC"', 'Georgia', '"Songti SC"', 'serif'],
        sans: ['Inter', '"Noto Sans SC"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 7vw, 6.5rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.25rem, 5vw, 4.25rem)', { lineHeight: '1.05', letterSpacing: '-0.015em' }],
        'display-md': ['clamp(1.75rem, 3.2vw, 2.75rem)', { lineHeight: '1.12', letterSpacing: '-0.01em' }],
      },
      maxWidth: {
        'measure': '68ch',
        'editorial': '1320px',
      },
      letterSpacing: {
        'eyebrow': '0.22em',
      },
      transitionTimingFunction: {
        'museum': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
}
