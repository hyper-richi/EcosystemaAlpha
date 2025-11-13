/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // все твои компоненты
  ],
  theme: {
    extend: {},
  },
  safelist: [
    "bg-slate-950",
    "text-slate-50",
    "font-sans",
    "text-base",
    "antialiased",
  ],
  plugins: [],
};
