/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.vue',
    './pages/**/*.vue',
    './layouts/**/*.vue',
    './app.vue'
  ],
  theme: {
    extend: {
      fontFamily: {
        // thai: ['Noto Sans Thai', 'sans']
        // thai: ['Kanit', 'sans']
        thai: ['Prompt', 'sans']
      }
    }
  },
  plugins: [require('@tailwindcss/forms'), 'prettier-plugin-tailwindcss']
}
