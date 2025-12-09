import type { Config } from 'tailwindcss'
import { hairlineWidth } from 'nativewind/theme'
import nativewindPreset from 'nativewind/preset'
import tailwindScrollbar from 'tailwind-scrollbar'
import tailwindcssAnimate from 'tailwindcss-animate'

export default {
  darkMode: 'class',
  content: [
    './app/(frontend)/**/*.{js,jsx,ts,tsx}',
    '../../packages/app/**/*.{js,jsx,ts,tsx}',
    '../../apps/expo/components/**/*.{js,jsx,ts,tsx}'
  ],
  extend: {
      borderWidth: {
        hairline: hairlineWidth(), // Defines a 'border-hairline' utility
      },
  },
  presets: [nativewindPreset],
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
  future: {
    hoverOnlyWhenSupported: true,
  },
} satisfies Config
