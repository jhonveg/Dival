/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'trans': "#ff58333",
        'dival': "rgb(0, 159, 226)"

      }
    },
  },
  plugins: [],
}