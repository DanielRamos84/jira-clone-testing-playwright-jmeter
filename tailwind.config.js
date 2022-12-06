/** @type {import('tailwindcss').Config} */
// import plugin from 'tailwindcss/plugin'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    colors: {
      "primary-main": "#0052cc",
      "primary-main-dark": "#3e8bfe",
      "primary-light": "#deebff",
      "primary-light-dark": "#002b4c",
      "primary-main-hover": "#005ce6",
      "primary-light-hover": "#c5dcff",
      "secondary-main": "#403294",
      "secondary-light": "#EAE6FF",
      "success-main": "#00875A",
      "success-light": "#00a16b",
      "warn-main": "#FFAB00",
      "error-main": "red",
      "error-main-dark": "#fe4c4c",
      "error-light": "#ffe5e5",
      "error-light-dark": "#2c0202",
      "error-dark": "#b30000",
      "error-dark-dark": "red",
      "error-hover": "#fdd8d8",
      "error-hover-dark": "#fe6f6f",
      "white": "#fff",
      "black": "#000",
      "grey-100": "#fafbfc",
      "grey-200": "#f4f5f7",
      "grey-300": "#ebecf0",
      "grey-400": "#e0e1e6",
      "grey-500": "#dddddd",
      "grey-600": "#d3d3d3",
      "dark-100": "#444",
      "dark-200": "#3d3d3d",
      "dark-300": "#333",
      "dark-500": "#222",
      "font-main": "#172b4d",
      "font-main-dark": "#E3FCEF",
      "font-light": "#5e6c84",
      "font-light-dark": "#838a86",
      "font-grey": "#676767",
      "font-success-main": "#006644",
      "font-success-main-dark": "#00c382",
      "font-success-light": "#E3FCEF",
      "icon": "#344563",
      "focus": "#4c9aff",
      "transparent": "transparent",
    },
    fontFamily: {
      "primary-light": ["CircularStdLight", "sans-serif"],
      "primary": ["CircularStdMedium", "sans-serif"],
      "primary-bold": ["CircularStdBold", "sans-serif"],
      "primary-black": ["CircularStdBlack", "sans-serif"],
    },
    boxShadow: {
      "xs": "rgba(0,0,0, 0.2) 0px 1px 1px, rgba(0,0,0, 0.2) 0px 0px 1px",
      "sm": "rgba(9, 30, 66, 0.25) 0px 1px 1px 0px, rgba(9, 30, 66, 0.31) 0px 0px 1px 0px",
      "md": "0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)",
      "lg": "rgba(14, 18, 22, 0.35) 0px 10px 38px -10px, rgba(14, 18, 22, 0.2) 0px 10px 20px -15px",
      "blue": "5px 5px 20px 1px rgba(0, 82, 204, 0.2)",
      "dialog-overlay": "rgba(0,0,0,0.45)",
    },
    extend: {
      fontSize: {
        "2xs": ["0.75rem", "1rem"],
        "xs": ["0.8125rem", "1rem"],
      },
      gridTemplateColumns: {
        'auto-400': 'repeat(auto-fit, 400px)',
      }
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    plugin(({ addUtilities }) => addUtilities({
      ".flex-center": {
        "justify-content": "center",
        "align-items": "center",
      }
    })),
  ],
}
