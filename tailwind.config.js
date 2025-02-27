module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: "class",
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
