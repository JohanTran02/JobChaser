import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "selector",
  theme: {
    extend: {
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('current', '&.active');
    }),
  ],
}

