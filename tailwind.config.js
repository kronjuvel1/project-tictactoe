/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  daisyui: {
    themes: ["light", "dark", "lofi"],
  },
  theme: {
    extend: {
      boxShadow: {
        'shadow-custom': '0 0 0 1px',
      }
    },
  },
  plugins: [require("daisyui")],
}

