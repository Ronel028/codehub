const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.jsx",
  ],
  theme: {
    screens: {
      '2xsm': '375px',
      'xsm': '425px',
      '3xl': '2000px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        'primary': '#161A30',
        'secondary': '#31304D',
        'light-gray': '#B6BBC4',
        'light': '#F0ECE5',
        'very-light': '#F8F9FA',
        'soft-light': '#F9F9F9',
        'dark-gray': '#2D2D2D',
        'meduim-gray': '#5A5A5A',
        'vibrant-blue': '#0073E6',
        'muted-accent': '#005BB5',
        'gray-light': '#E0E0E0'
      },
    },
    fontFamily: {
      "nunito-sans": ["Nunito Sans", "sans-serif"],
      "source-pro-code": ["Source Code Pro", "sans-serif"],
      "courier-prime": ["Courier Prime", "sans-serif"]
    },
    backgroundImage: {
      'homepage': 'url("/public/images/tech.jpg")'
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

