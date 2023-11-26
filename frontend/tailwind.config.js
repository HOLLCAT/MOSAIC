/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: '#4A5783',
        purpleHover: '#6B81A3',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
