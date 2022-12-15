/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    "bg-black",
    "bg-white",
    "bg-yellow-300",
    "bg-red-400",
    "text-teal-400",
    "aspect-square",
    "text-teal-400",
    "flex",
    "justify-center",
    "content-center",
    "flex-col", 
    "text-center"
  ]
}
