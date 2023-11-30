/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#0d0a01",
        secondary: "#faa200",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimOrange: "rgba(255, 165, 0, 0.1)",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        playfair: ["Playfair Display", "sans-serif"],
      },
    },
    screens: {
      xs: "525px",
      ss: "620px",
      sm: "800px",
      md: "1025px",
      lg: "1200px",
      xl: "1500px",
    },
  },
  plugins: [],
};