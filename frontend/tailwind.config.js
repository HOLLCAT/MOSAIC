/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: '#4A5783',
        purpleHover: '#6B81A3',
      },
      screens: {
        'xs': '475px',
        ...defaultTheme.screens,
      },
      fontSize: {
        xsm: '0.7rem',
        
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
