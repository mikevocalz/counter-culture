/** @type {import('tailwindcss').Config} */
import nativewindPreset from 'nativewind/preset';
import tailwindScrollbar from 'tailwind-scrollbar';
import tailwindcssAnimate from 'tailwindcss-animate';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/app/design/src/**/*.{js,jsx,ts,tsx}',
    '../../packages/app/features/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [nativewindPreset],
  theme: {
    extend: {},
  },
  plugins: [
    tailwindScrollbar({
      nocompatible: true,
      preferredStrategy: 'pseudoelements',
    }),
    tailwindcssAnimate,
  ],
  variants: {
    scrollbar: ['rounded'],
  },
  important: 'html',
}
