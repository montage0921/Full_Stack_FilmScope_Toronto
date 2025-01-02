/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgBlack: "rgb(30,41,59)",
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
