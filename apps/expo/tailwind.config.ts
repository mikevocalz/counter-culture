/** @type {import('tailwindcss').Config} */
const { hairlineWidth } = require('nativewind/theme');
         
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    '../../packages/app/**/*.{js,ts,tsx}',
    '../../packages/app/components/**/*.{js,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
      screens: {
      sm: '480px',
      smd: '546px',
      mdl: '600px', // Changed from default 768px
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
    future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [require('tailwindcss-animate')],
};