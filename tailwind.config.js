module.exports = {
  content: ["./src/**/*.{js,css}"],
  theme: {
    fontFamily: {
      'sans': 'Orbitron, sans-serif'
    },
    extend: {},
    variants: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};