/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.vue',
    './pages/**/*.vue',
    './layouts/**/*.vue',
    './app.vue',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'), 'prettier-plugin-tailwindcss'],
}
