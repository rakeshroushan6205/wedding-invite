/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#FBF6EC',
          dark: '#F3ECDC',
        },
        maroon: {
          DEFAULT: '#2B0A12',
          light: '#42121D',
        },
        gold: {
          DEFAULT: '#C8983E',
          light: '#E6C887',
          dark: '#9C7228',
        },
        rosegold: {
          DEFAULT: '#D9A8A0',
          light: '#F3DCD4',
        },
        bronze: '#6B3F1D',
        blush: '#F3DCD4',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"Jost"', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.35em',
      },
      backgroundImage: {
        'gold-radial': 'radial-gradient(circle at 50% 0%, rgba(200,152,62,0.25), transparent 60%)',
        'maroon-radial': 'radial-gradient(circle at 50% 50%, rgba(43,10,18,0.9), #1a0509 100%)',
      },
      boxShadow: {
        gold: '0 0 40px rgba(200,152,62,0.35)',
        luxury: '0 25px 60px -15px rgba(43,10,18,0.45)',
      },
      animation: {
        'spin-slow': 'spin 14s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'float-delayed': 'float 7s ease-in-out infinite 1.2s',
        shimmer: 'shimmer 2.8s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: 0.55, filter: 'blur(8px)' },
          '50%': { opacity: 1, filter: 'blur(14px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-18px) rotate(3deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
