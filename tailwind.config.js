/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "var(--text)",
        "text-h": "var(--text-h)",
        bg: "var(--bg)",
        border: "var(--border)",
        accent: "var(--accent)",
      },
      boxShadow: {
        custom: "var(--shadow)",
      },
      fontFamily: {
        sans: "var(--sans)",
        mono: "var(--mono)",
      },
    },
  },
  plugins: [],
};