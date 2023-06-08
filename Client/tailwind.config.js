/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        fira: ['Fira Sans', 'Arial', 'sans-serif'],
        viga: ['Viga', 'Arial', 'sans-serif'], 
      }
    },
  },
  plugins: [],
}
