/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor:{
        "main-bg":"#0d1b2a",
      },
      colors:{
       "text-color":"#f6fff8"
      }
    },
  },
  plugins: [],
}
