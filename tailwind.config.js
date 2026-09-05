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
        gallery: {
          950: '#070709',
          900: '#0f1013',
          850: '#15161b',
          800: '#1c1e25',
          700: '#2a2d37',
          600: '#3d4251',
          500: '#565d71',
          400: '#7f88a3',
          300: '#adb7d4',
          200: '#d5dcfa',
          100: '#eaeffe',
          50: '#f6f8ff',
        },
        gold: {
          300: '#f6d884',
          400: '#ecc457',
          500: '#d4a327',
          600: '#aa7d14',
          700: '#7d590a',
        },
        accent: {
          crimson: '#e11d48',
          emerald: '#10b981',
          violet: '#8b5cf6',
          amber: '#f59e0b',
          cyan: '#06b6d4',
          rose: '#f43f5e',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['"Cinzel"', '"Playfair Display"', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
      },
      boxShadow: {
        'gallery': '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 20px 0 rgba(212, 163, 39, 0.08)',
        'gallery-lg': '0 30px 60px -20px rgba(0, 0, 0, 0.9), 0 0 35px 0 rgba(212, 163, 39, 0.15)',
        'glow-gold': '0 0 25px rgba(212, 163, 39, 0.4)',
        'glow-cyan': '0 0 25px rgba(6, 182, 212, 0.4)',
      }
    },
  },
  plugins: [],
}