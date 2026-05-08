/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        night: '#030304',
        crimson: '#e1002d',
        blood: '#8f001f',
        bone: '#f7f3f3',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Cinzel', 'serif'],
      }
    },
  },
  plugins: [],
}
