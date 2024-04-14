import { transform } from 'typescript'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      keyframes: {
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        slideInRight: 'slideInRight 0.5s ease-in-out forwards',
        slideInLeft: 'slideInLeft 0.5s ease-in-out forwards',
      },
    },
  },
  plugins: [require('daisyui')],
}
