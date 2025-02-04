/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgBlack: "rgb(30,41,59)",
        dateCardGray: "rgb(244,244,244)",
      },
      fontFamily: {
        libre: ['"Libre Franklin"', "sans-serif"],
      },
    },
  },
  plugins: [],
  variants: {
    extend: {
      display: ["focus-group"],
    },
  },
};
