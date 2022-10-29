/** @type {import('tailwindcss').Config} */

const colors = require('./colors')
module.exports = {
  content: ["./src/**/*.{html,jsx,tsx}"],
  darkMode: 'class', //false, // or 'media' or 'class'
  theme: {
    fontSize: {
      'xs': '.75rem',
      'sm': '.875rem',
      'tiny': '.875rem',
       'base': '1rem',
       'lg': '1.125rem',
       'xl': '1.25rem',
       '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
       '5xl': '3rem',
       '6xl': '4rem',
      '7xl': '5rem',
    },
    extend: {
      colors: {
        gray: colors.gray,
        blue: colors.blue,
        green: colors.green,
        yellow: colors.yellow,
        orange: colors.orange,
        red: colors.red,
      },
    },
    backgroundColor: {
      // white: 'var(--color-text-white)',
      white: colors.white,
      primary: colors.blue[600],
      primaryLightHover: colors.blue[200],
      primaryLightDefault: colors.blue[100],
      primaryLight: colors.blue[100],
      seriousLight: colors.orange[100],
      successLight: colors.green[100],
      error: colors.red[600],
      errorLight: colors.red[100],
      warningLight: colors.yellow[100],
      strong: colors.gray[400],
      medium: colors.gray[300],
      element: colors.gray[200],
      main: colors.gray[100],
    },
    textColor: {
      white: colors.white,
      primary: colors.blue[600],
      danger: colors.red[600],
      warning: colors.red[600],
      success: colors.green[600],
      serious: colors.orange[600],
      strong: colors.gray[800],
      medium: colors.gray[700],
      weak: colors.gray[600],
      holder: colors.gray[500],
      disable: colors.gray[400],
    },
    borderColor: {
      primary: colors.blue[600],
      strong: colors.gray[400],
      medium: colors.gray[300],
    },
  },
  plugins: [],
}
