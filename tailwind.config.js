/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          50: '#e0f7fa',   // Very light cyan
          100: '#b2ebf2',
          200: '#80deea',
          300: '#4dd0e1',
          400: '#26c6da',
          500: '#00bcd4',   // Core primary color
          600: '#00acc1',
          700: '#0097a7',
          800: '#00838f',
          900: '#006064',
        },
        'accent': {
          50: '#fbe9e7',   // Very light orange/peach
          100: '#ffccbc',
          200: '#ffab91',
          300: '#ff8a65',
          400: '#ff7043',
          500: '#ff5722',   // Core accent color
          600: '#f4511e',
          700: '#e64a19',
          800: '#d84315',
          900: '#bf360c',
        },
        'background-light': '#f0f4f8', // A soft, light background gray-blue
        'text-dark': '#374151',     // A dark gray for main text
        'text-muted': '#6b7280',    // A lighter gray for secondary text
      },
    },
  },
  plugins: [],
}
