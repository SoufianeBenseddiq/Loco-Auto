/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js"
  ],
  theme: {
    extend: {
      screens: {
        'xmin-screen':'450px',
        'min-screen': '840px',
        'l-screen':'890px',
        'xl-screen':'950px',
        '2xl-screen':'1000px',
        '3xl-screen':'1100px',
      },
    },
  },
  plugins: [],
  // darkMode: '',
}