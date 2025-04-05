/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        first: "var(--first)",
        second: "var(--second)",
        third: "var(--third)",
        fourth: "var(--fourth)",
        fifth: "var(--fifth)",
        six: "var(--six)",
        seven: "var(--seven)",
        eight: "var(--eight)",
        default: "var(--default)", // Default color
      },
    },
  },
  plugins: [],
};
