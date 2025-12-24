/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f1',
          100: '#dcf1de',
          200: '#bae3c0',
          300: '#8ecf98',
          400: '#5eb46c',
          500: '#3c9a4e',
          600: '#2c7c3d',
          700: '#256334',
          800: '#204f2d',
          900: '#1c4227',
          950: '#0c2615',
        },
        secondary: {
          50: '#faf7ed',
          100: '#f3edd3',
          200: '#e7d9a6',
          300: '#dac172',
          400: '#ceab50',
          500: '#bd9235',
          600: '#a0762c',
          700: '#7d5826',
          800: '#654624',
          900: '#543a22',
          950: '#302011',
        },
        accent: {
          50: '#f5f8fa',
          100: '#eaf1f5',
          200: '#d0e0e9',
          300: '#a5c4d4',
          400: '#73a3bc',
          500: '#5285a2',
          600: '#406b87',
          700: '#35566d',
          800: '#2f495c',
          900: '#2a3e4e',
          950: '#1a2935',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
      },
    },
  },
  plugins: [],
};