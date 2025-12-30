/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  // NativeWind v2 doesn't require a preset
  theme: {
    extend: {
      colors: {
        primary: {
          blue: "#0c64e0",
        },
        dark: "#141419",
        grey: {
          DEFAULT: "#939393",
          15: "rgba(147, 147, 147, 0.15)",
          30: "rgba(147, 147, 147, 0.3)",
          45: "rgba(147, 147, 147, 0.45)",
          60: "rgba(147, 147, 147, 0.6)",
        },
        white: "#ffffff",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};

