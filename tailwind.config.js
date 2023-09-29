/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: "Cairo, sans-serif",
    },
    extend: {
      height: {
        screen: "100dvh",
      },
      colors: {
        body: "#f7f2e9",
      },
    },
  },
  plugins: [],
};
