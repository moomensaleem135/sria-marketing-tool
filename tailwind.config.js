/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/*/.{js,jsx,ts,tsx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js'
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['var(--font-primary)']
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('tailwind-scrollbar')]
};
