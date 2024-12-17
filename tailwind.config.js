/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.jsx",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#161A30',
        'secondary': '#31304D',
        'light-gray': '#B6BBC4',
        'light': '#F0ECE5',
      },
    },
    fontFamily: {
      "nunito-sans": ["Nunito Sans", "sans-serif"],
      "source-pro-code": ["Source Code Pro", "sans-serif"],
      "courier-prime": ["Courier Prime", "sans-serif"]
    },
    backgroundImage: {
      'homepage': 'url("/public/images/code-bg.jpg")'
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

