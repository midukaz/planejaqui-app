/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f9f1e7',
          100: '#f3e3d4',
          200: '#edd5c0',
          300: '#e4c0a2',
          400: '#d7a67b',
          500: '#c38b56',
          600: '#a97043',
          700: '#855535',
          800: '#68412c',
          900: '#563523'
        }
      }
    },
  },
  plugins: [],
};
